import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

// Zapier -> Stibee 참석 안내 메일 발송
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/10485854/44ehrab/';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      companyName,
      position,
      email,
      phone,
      agreePrivacy,
      webinar_type,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
    } = body;

    if (!name || !companyName || !position || !email || !phone || !agreePrivacy) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          contact_name: name,
          company_name: companyName,
          job_title: position,
          email,
          phone_number: phone,
          campaign: webinar_type || 'tight-finance-management-07',
          lead_source: 'webinar',
          funnel_stage: 'new',
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

    // Zapier Webhook (참석 완료 안내 메일 - Stibee 발송용)
    if (ZAPIER_WEBHOOK_URL) {
      try {
        await fetch(ZAPIER_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            companyName,
            name,
            email,
            phone,
            position,
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
    }

    return NextResponse.json({
      success: true,
      message: '신청이 완료되었습니다.',
      data,
    });
  } catch (error) {
    console.error('Error in tight-finance-management-submit API:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
