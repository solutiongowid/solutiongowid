import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase';

// TODO: 스티비 연동용 Zapier Catch Hook URL 입력
const ZAPIER_WEBHOOK_URL = '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      companyName,
      name,
      position,
      department,
      email,
      phone,
      annualBilling,
      agreeMarketing,
      timestamp,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      gclid,
      fbclid,
    } = body;

    if (!companyName || !name || !position || !department || !email || !phone || !annualBilling) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    if (!agreeMarketing) {
      return NextResponse.json(
        { error: '마케팅 활용 동의가 필요합니다.' },
        { status: 400 }
      );
    }

    const notes = [
      department ? `부서: ${department}` : null,
      annualBilling ? `연 취급고: ${annualBilling}` : null,
      utm_term ? `utm_term: ${utm_term}` : null,
      gclid ? `gclid: ${gclid}` : null,
      fbclid ? `fbclid: ${fbclid}` : null,
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
          lead_source: utm_source || 'lead-form-agency',
          lead_source_detail: utm_medium || null,
          campaign: 'agency-cashflow-report-2026',
          campaign_detail: utm_campaign || null,
          funnel_stage: 'new',
          lead_type: 'potential',
          notes,
          utm_source: utm_source || null,
          utm_medium: utm_medium || null,
          utm_campaign: utm_campaign || null,
          utm_content: utm_content || null,
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
      await fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: companyName,
          name,
          position,
          department,
          email,
          phone,
          annual_billing: annualBilling,
          utm_source: utm_source || '',
          utm_medium: utm_medium || '',
          utm_campaign: utm_campaign || '',
          utm_content: utm_content || '',
          utm_term: utm_term || '',
          gclid: gclid || '',
          fbclid: fbclid || '',
          landing_page: 'lead-form-agency',
          report_name: '광고대행사 현금흐름 벤치마크 리포트 2026',
          timestamp,
        }),
      }).catch((err) => console.error('Zapier webhook error:', err));
    }

    return NextResponse.json({
      success: true,
      message: '신청이 완료되었습니다.',
    });
  } catch (error) {
    console.error('Error in lead-form-agency-submit API:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
