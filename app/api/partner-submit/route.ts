import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      companyName,
      position,
      name,
      phone,
      email,
      usesGowid,
      companyWebsite,
      partnerType,
      cooperationInterests,
      otherCooperation,
      howFound,
      otherHowFound,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
    } = body;

    if (!companyName || !position || !name || !phone || !email) {
      return NextResponse.json(
        { error: '필수 정보를 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    const { error: supabaseError } = await supabase
      .from('partners')
      .insert([
        {
          company_name: companyName,
          position,
          name,
          phone,
          email,
          uses_gowid: usesGowid ?? null,
          company_website: companyWebsite || null,
          partner_type: partnerType || null,
          cooperation_interests: cooperationInterests || [],
          other_cooperation: otherCooperation || null,
          how_found: howFound || null,
          other_how_found: otherHowFound || null,
          utm_source: utm_source || null,
          utm_medium: utm_medium || null,
          utm_campaign: utm_campaign || null,
          utm_content: utm_content || null,
        },
      ]);

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
      return NextResponse.json(
        { error: supabaseError.message },
        { status: 500 }
      );
    }

    // Zapier webhook — fire-and-forget, Supabase 성공 후 전송
    try {
      await fetch('https://hooks.zapier.com/hooks/catch/10485854/4ofm5wk/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: companyName,
          position,
          name,
          phone,
          email,
          uses_gowid: usesGowid ?? null,
          company_website: companyWebsite || null,
          partner_type: partnerType || null,
          cooperation_interests: cooperationInterests || [],
          other_cooperation: otherCooperation || null,
          how_found: howFound || null,
          other_how_found: otherHowFound || null,
          utm_source: utm_source || null,
          utm_medium: utm_medium || null,
          utm_campaign: utm_campaign || null,
          utm_content: utm_content || null,
        }),
      });
    } catch (zapierError) {
      console.error('Zapier webhook error:', zapierError);
      // Zapier 실패해도 폼 제출 성공으로 처리
    }

    return NextResponse.json({
      success: true,
      message: '파트너 신청이 완료되었습니다.',
    });
  } catch (error) {
    console.error('Error in partner-submit API:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
