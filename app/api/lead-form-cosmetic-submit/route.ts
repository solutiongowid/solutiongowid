import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase';

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
      annualRevenue,
      agreeMarketing,
      timestamp,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
    } = body;

    if (!companyName || !name || !position || !department || !email || !phone || !annualRevenue) {
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
      annualRevenue ? `연매출: ${annualRevenue}` : null,
      utm_content ? `utm_content: ${utm_content}` : null,
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
          lead_source: utm_source || 'lead-form-cosmetic',
          lead_source_detail: utm_medium || null,
          campaign: 'cosmetic-lead-form',
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

    fetch('https://hooks.zapier.com/hooks/catch/10485854/4ye7nyq/', {
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
        utm_campaign: utm_campaign || '',
        utm_content: utm_content || '',
        landing_page: 'lead-form-cosmetic',
        timestamp,
      }),
    }).catch((err) => console.error('Zapier webhook error:', err));

    return NextResponse.json({
      success: true,
      message: '신청이 완료되었습니다.',
    });
  } catch (error) {
    console.error('Error in lead-form-cosmetic-submit API:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
