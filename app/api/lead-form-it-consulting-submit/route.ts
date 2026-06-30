import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase';

const ZAPIER_IT_CONSULTING_HOOK_URL = 'ZAPIER_IT_CONSULTING_HOOK_URL_HERE';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '12mb',
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      service,
      companyName,
      contactName,
      email,
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

    const noteParts: string[] = [`서비스: ${service}`];

    if (service === 'Google Workspace') {
      if (gEdition) noteParts.push(`에디션: ${gEdition}`);
      if (gPlan) noteParts.push(`요금제: ${gPlan}`);
      if (gCount) noteParts.push(`사용자 수: ${gCount}`);
      if (gNote) noteParts.push(`추가 문의: ${gNote}`);
    } else {
      if (mEdition) noteParts.push(`에디션: ${mEdition}`);
      if (mPlan) noteParts.push(`요금제: ${mPlan}`);
      if (mCount) noteParts.push(`사용자 수: ${mCount}`);
      if (mTeams) noteParts.push(`Teams: ${mTeams}`);
      if (mCopilot) noteParts.push(`Copilot: ${mCopilot}`);
      if (mNote) noteParts.push(`추가 문의: ${mNote}`);
    }

    if (utm_content) noteParts.push(`utm_content: ${utm_content}`);

    const notes = noteParts.join(' | ');

    const { error: supabaseError } = await supabaseAdmin
      .from('leads')
      .insert([
        {
          company_name: companyName,
          contact_name: contactName,
          email,
          lead_source: utm_source || 'lead-form-it-consulting',
          lead_source_detail: utm_medium || null,
          campaign: 'it-consulting-lead-form',
          campaign_detail: utm_campaign || null,
          funnel_stage: 'new',
          lead_type: 'potential',
          notes,
        },
      ]);

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
    }

    const zapierPayload: Record<string, string> = {
      service,
      company_name: companyName,
      contact_name: contactName,
      email,
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
      if (gFile) {
        zapierPayload.g_file_name = gFileName || '';
        zapierPayload.g_file_data = gFile;
      }
    } else {
      zapierPayload.m_edition = mEdition || '';
      zapierPayload.m_plan = mPlan || '';
      zapierPayload.m_count = mCount || '';
      zapierPayload.m_teams = mTeams || '';
      zapierPayload.m_copilot = mCopilot || '';
      zapierPayload.m_note = mNote || '';
      if (mFile) {
        zapierPayload.m_file_name = mFileName || '';
        zapierPayload.m_file_data = mFile;
      }
    }

    await fetch(ZAPIER_IT_CONSULTING_HOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(zapierPayload),
    }).catch((err) => console.error('Zapier webhook error:', err));

    return NextResponse.json({
      success: true,
      message: '신청이 완료되었습니다.',
    });
  } catch (error) {
    console.error('Error in lead-form-it-consulting-submit API:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
