import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { company, name, title, phone, utm_source, utm_medium, utm_campaign } = body;

    if (!company || !name || !title || !phone) {
      return NextResponse.json({ error: '필수 항목을 모두 입력해주세요.' }, { status: 400 });
    }

    const { error: supabaseError } = await supabaseAdmin
      .from('leads')
      .insert([{
        company_name: company,
        contact_name: name,
        job_title: title,
        phone_number: phone,
        campaign: 'cosmetic-round-table',
        campaign_detail: '2026-07-09',
        lead_source: utm_source || 'event-landing',
        lead_source_detail: utm_medium || null,
        industry_category: '코스메틱',
        funnel_stage: 'new',
        lead_type: 'potential',
      }]);

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
      return NextResponse.json({ error: '데이터 저장 중 오류가 발생했습니다.' }, { status: 500 });
    }

    await fetch('https://hooks.zapier.com/hooks/catch/10485854/42ecrsw/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company_name: company,
        contact_name: name,
        job_title: title,
        phone_number: phone,
        campaign: 'cosmetic-round-table',
        event_date: '2026-07-09',
        utm_source: utm_source || '',
        utm_medium: utm_medium || '',
        utm_campaign: utm_campaign || '',
        landing_page: 'cosmetic-round-table',
        timestamp: new Date().toISOString(),
      }),
    }).catch((err) => console.error('Zapier webhook error:', err));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in cosmetic-round-table-submit:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
