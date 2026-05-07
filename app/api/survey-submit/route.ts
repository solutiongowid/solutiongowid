import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { companyName, name, position, department, email, phone, annualRevenue, timestamp, utm_source, utm_medium, utm_campaign, utm_content } = body;

    // 필수 필드 검증
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

    // Supabase leads 테이블에 데이터 저장
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
          campaign: utm_campaign || 'commerce-gowid-fassto',
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

    await fetch('https://hooks.zapier.com/hooks/catch/10485854/4y47xse/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyName, name, position, department, email, phone, annualRevenue, timestamp, utm_source, utm_medium, utm_campaign, utm_content }),
    }).catch((err) => console.error('Zapier error:', err));

    return NextResponse.json({
      success: true,
      message: '정보가 성공적으로 제출되었습니다.',
    });

  } catch (error) {
    console.error('Error in survey-submit API:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
