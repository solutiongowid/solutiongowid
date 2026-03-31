import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      companyName,
      department,
      position,
      email,
      phone,
      question,
      agreePrivacy,
      timestamp,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      webinar_type,
    } = body;

    if (!name || !companyName || !department || !position || !email || !phone || !agreePrivacy) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('corporate_card_webinar')
      .insert([
        {
          webinar_type: webinar_type || 'commerce',
          name,
          company_name: companyName,
          department,
          position,
          email,
          phone,
          question: question || null,
          agree_privacy: agreePrivacy,
          submitted_at: timestamp || new Date().toISOString(),
          utm_source: utm_source || null,
          utm_medium: utm_medium || null,
          utm_campaign: utm_campaign || null,
          utm_content: utm_content || null,
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

    // Zapier Webhook 호출 (슬랙 알림용)
    try {
      await fetch('https://hooks.zapier.com/hooks/catch/10485854/uxmyyc2/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          name,
          email,
          phone,
          department,
          position,
          question,
          timestamp,
          utm_source: utm_source || '',
          utm_medium: utm_medium || '',
          utm_campaign: utm_campaign || '',
          utm_content: utm_content || '',
          webinar: `corporate-card-webinar-${webinar_type || 'commerce'}`,
        }),
      });
    } catch (err) {
      console.error('Zapier webhook error:', err);
    }

    return NextResponse.json({
      success: true,
      message: '웨비나 신청이 완료되었습니다.',
      data,
    });
  } catch (error) {
    console.error('Error in corporate-card-webinar-submit API:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
