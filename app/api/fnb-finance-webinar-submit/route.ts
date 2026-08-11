import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/10485854/460jlwc/';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      companyName,
      department,
      position,
      annualRevenue,
      businessType,
      email,
      phone,
      question,
      agreePrivacy,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
    } = body;

    if (!name || !companyName || !position || !annualRevenue || !businessType || !email || !phone || !agreePrivacy) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    // leads는 뷰이며 message/utm_*/job_name 등 일부 컬럼은 insert해도 실제로 저장되지 않으므로,
    // 확인된 안전 컬럼(notes)에 부가 정보를 사람이 읽기 좋은 문자열로 함께 담는다.
    const notesParts = [
      department && `부서: ${department}`,
      `연매출: ${annualRevenue}`,
      question && `사전 질문: ${question}`,
      utm_source && `utm_source: ${utm_source}`,
      utm_medium && `utm_medium: ${utm_medium}`,
      utm_campaign && `utm_campaign: ${utm_campaign}`,
      utm_content && `utm_content: ${utm_content}`,
      utm_term && `utm_term: ${utm_term}`,
    ].filter(Boolean);

    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          contact_name: name,
          company_name: companyName,
          job_name: department || null,
          job_title: position,
          email,
          phone_number: phone,
          campaign: 'fnb-finance-webinar',
          campaign_detail: businessType,
          lead_source: 'webinar',
          funnel_stage: 'new',
          message: question || null,
          notes: notesParts.length ? notesParts.join(' | ') : null,
          utm_source: utm_source || null,
          utm_medium: utm_medium || null,
          utm_campaign: utm_campaign || null,
          utm_content: utm_content || null,
          utm_term: utm_term || null,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: '데이터 저장에 실패했습니다.' },
        { status: 500 }
      );
    }

    // Zapier Webhook (슬랙 알림)
    try {
      await fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          name,
          email,
          phone,
          department,
          position,
          annualRevenue: annualRevenue || '',
          businessType: businessType || '',
          question,
          timestamp: new Date().toISOString(),
          utm_source: utm_source || '',
          utm_medium: utm_medium || '',
          utm_campaign: utm_campaign || '',
          utm_content: utm_content || '',
          utm_term: utm_term || '',
        }),
      });
    } catch (err) {
      console.error('Zapier webhook error:', err);
    }

    return NextResponse.json({
      success: true,
      message: '신청이 완료되었습니다.',
      data,
    });
  } catch (error) {
    console.error('Error in fnb-finance-webinar-submit API:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
