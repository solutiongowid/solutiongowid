import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase';

// TODO: 스티비 발송용 Zapier 웹훅 URL로 교체 (담당자가 웹훅 ID 전달 예정)
const ZAPIER_WEBHOOK_URL = '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { companyName, name, position, department, email, phone, annualRevenue, timestamp, utm_source, utm_medium, utm_campaign, utm_content } = body;

    if (!companyName || !name || !position || !email || !phone) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    const notes = [
      department ? `부서: ${department}` : null,
      annualRevenue ? `연매출: ${annualRevenue}` : null,
    ].filter(Boolean).join(' | ') || null;

    const { error: supabaseError } = await supabaseAdmin
      .from('leads')
      .insert([
        {
          company_name: companyName,
          contact_name: name,
          job_title: position,
          email,
          phone_number: phone,
          lead_source: utm_source || 'report-download',
          lead_source_detail: utm_medium || null,
          campaign: utm_campaign || 'tech-decision-2026',
          campaign_detail: utm_campaign || null,
          funnel_stage: 'new',
          lead_type: 'potential',
          notes,
        },
      ]);

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
      return NextResponse.json(
        { error: '데이터 저장 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    if (ZAPIER_WEBHOOK_URL) {
      fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: companyName,
          name,
          position,
          department,
          email,
          phone,
          annual_revenue: annualRevenue,
          utm_source: utm_source || '',
          utm_medium: utm_medium || '',
          utm_campaign: utm_campaign || 'tech-decision-2026',
          utm_content: utm_content || '',
          timestamp,
        }),
      }).catch((err) => console.error('Zapier webhook error:', err));
    } else {
      console.warn('ZAPIER_WEBHOOK_URL (tech-decision-2026) is not set — skipping Stibee report email trigger.');
    }

    return NextResponse.json({
      success: true,
      message: '정보가 성공적으로 제출되었습니다.',
    });

  } catch (error) {
    console.error('Error in survey-submit-tech-decision-2026 API:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
