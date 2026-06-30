import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase';

const ZAPIER_IT_CONSULTING_HOOK_URL = 'https://hooks.zapier.com/hooks/catch/10485854/42cujal/';
const STORAGE_BUCKET = 'lead-form-files';

async function uploadToStorage(base64Data: string, originalName: string, prefix: string): Promise<string | null> {
  try {
    const mimeMatch = base64Data.match(/^data:([\w/]+);base64,/);
    const contentType = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
    const rawBase64 = base64Data.replace(/^data:[\w/]+;base64,/, '');
    const buffer = Buffer.from(rawBase64, 'base64');
    const ext = originalName.split('.').pop() || 'bin';
    const storagePath = `${prefix}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { data, error } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .upload(storagePath, buffer, { contentType, upsert: false });

    if (error) {
      console.error('Storage upload error:', error);
      return null;
    }

    const { data: urlData } = supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  } catch (err) {
    console.error('File upload error:', err);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      service,
      companyName,
      contactName,
      email,
      phone,
      // Google Workspace fields
      gEdition,
      gPlan,
      gCount,
      gFile,
      gFileName,
      gNote,
      // Microsoft 365 fields
      mEdition,
      mPlan,
      mCount,
      mTeams,
      mCopilot,
      mFile,
      mFileName,
      mNote,
      // UTM
      timestamp,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
    } = body;

    if (!service || !companyName || !contactName || !email) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식을 입력해주세요.' },
        { status: 400 }
      );
    }

    // 파일 업로드 → URL 획득
    let fileUrl: string | null = null;
    const fileData = service === 'Google Workspace' ? gFile : mFile;
    const fileName = service === 'Google Workspace' ? gFileName : mFileName;
    if (fileData && fileName) {
      fileUrl = await uploadToStorage(fileData, fileName, 'it-consulting');
    }

    // Supabase leads 테이블 insert
    const noteParts: string[] = [`서비스: ${service}`];
    if (service === 'Google Workspace') {
      if (gEdition) noteParts.push(`에디션: ${gEdition}`);
      if (gPlan) noteParts.push(`요금제: ${gPlan}`);
      if (gCount) noteParts.push(`사용자 수: ${gCount}`);
      if (fileUrl) noteParts.push(`첨부파일: ${fileUrl}`);
      if (gNote) noteParts.push(`추가 문의: ${gNote}`);
    } else {
      if (mEdition) noteParts.push(`에디션: ${mEdition}`);
      if (mPlan) noteParts.push(`요금제: ${mPlan}`);
      if (mCount) noteParts.push(`사용자 수: ${mCount}`);
      if (mTeams) noteParts.push(`Teams: ${mTeams}`);
      if (mCopilot) noteParts.push(`Copilot: ${mCopilot}`);
      if (fileUrl) noteParts.push(`첨부파일: ${fileUrl}`);
      if (mNote) noteParts.push(`추가 문의: ${mNote}`);
    }
    if (utm_content) noteParts.push(`utm_content: ${utm_content}`);

    const notes = noteParts.join(' | ');

    const { error: supabaseError } = await supabaseAdmin
      .from('leads')
      .insert([{
        company_name: companyName,
        contact_name: contactName,
        email,
        phone_number: phone || null,
        lead_source: utm_source || 'lead-form-it-consulting',
        lead_source_detail: utm_medium || null,
        campaign: 'it-consulting-lead-form',
        campaign_detail: utm_campaign || null,
        funnel_stage: 'new',
        lead_type: 'potential',
        notes,
      }]);

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
    }

    // Zapier에는 URL만 전송
    const zapierPayload: Record<string, string> = {
      service,
      company_name: companyName,
      contact_name: contactName,
      email,
      phone: phone || '',
      utm_source: utm_source || '',
      utm_medium: utm_medium || '',
      utm_campaign: utm_campaign || '',
      utm_content: utm_content || '',
      landing_page: 'lead-form-it-consulting',
      timestamp: timestamp || '',
    };

    if (service === 'Google Workspace') {
      zapierPayload.g_edition = gEdition || '';
      zapierPayload.g_plan = gPlan || '';
      zapierPayload.g_count = gCount || '';
      zapierPayload.g_note = gNote || '';
      zapierPayload.g_file_url = fileUrl || '';
      zapierPayload.g_file_name = gFileName || '';
    } else {
      zapierPayload.m_edition = mEdition || '';
      zapierPayload.m_plan = mPlan || '';
      zapierPayload.m_count = mCount || '';
      zapierPayload.m_teams = mTeams || '';
      zapierPayload.m_copilot = mCopilot || '';
      zapierPayload.m_note = mNote || '';
      zapierPayload.m_file_url = fileUrl || '';
      zapierPayload.m_file_name = mFileName || '';
    }

    await fetch(ZAPIER_IT_CONSULTING_HOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(zapierPayload),
    }).catch((err) => console.error('Zapier webhook error:', err));

    return NextResponse.json({ success: true, message: '신청이 완료되었습니다.' });
  } catch (error) {
    console.error('Error in lead-form-it-consulting-submit API:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
