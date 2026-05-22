import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  const supabaseAdmin = createClient(
    'https://hcaevdnfemmesbojgvim.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  try {
    const body = await request.json();
    const { company_name, contact_name, email, utm_source, utm_medium, utm_campaign, utm_content, utm_term } = body;

    if (!company_name || !contact_name || !email) {
      return NextResponse.json({ error: '모든 필드를 입력해주세요.' }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from('leads').insert({
      company_name,
      contact_name,
      email,
      lead_source: utm_source || 'kpi-finder-cosmetic',
      lead_source_detail: utm_medium || null,
      campaign: utm_campaign || 'KPI Finder 코스메틱',
      campaign_detail: [utm_content, utm_term].filter(Boolean).join(' / ') || null,
      funnel_stage: 'new',
      lead_category: 'valid',
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'DB 저장 실패' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('kpi-lead API error:', err);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
