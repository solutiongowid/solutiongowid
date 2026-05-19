import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const trim = (v: unknown) => (typeof v === 'string' ? v.slice(0, 2000) : '');

    const name = trim(body.name);
    const company = trim(body.company);
    const biz = trim(body.biz);
    const email = trim(body.email);
    const phone = trim(body.phone);

    if (!name || !company || !biz || !email) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    const utm_source = trim(body.utm_source);
    const utm_medium = trim(body.utm_medium);
    const utm_campaign = trim(body.utm_campaign);
    const utm_content = trim(body.utm_content);
    const utm_term = trim(body.utm_term);
    const gclid = trim(body.gclid);
    const fbclid = trim(body.fbclid);

    const notes = [
      biz ? `사업자등록번호: ${biz}` : null,
      utm_content ? `utm_content: ${utm_content}` : null,
      utm_term ? `utm_term: ${utm_term}` : null,
      gclid ? `gclid: ${gclid}` : null,
      fbclid ? `fbclid: ${fbclid}` : null,
    ].filter(Boolean).join(' | ') || null;

    const { error: supabaseError } = await supabaseAdmin.from('leads').insert([
      {
        company_name: company,
        contact_name: name,
        email,
        phone_number: phone || null,
        lead_source: utm_source || 'card-api-landing',
        lead_source_detail: utm_medium || null,
        campaign: 'card-api-landing',
        campaign_detail: utm_campaign || null,
        funnel_stage: 'new',
        lead_type: 'potential',
        notes,
        biz_number: biz || null,
        source: trim(body.source) || 'card-api-landing',
        name,
        company,
        phone: phone || null,
        message: trim(body.msg) || null,
        user_agent: trim(body.user_agent) || null,
        referrer: trim(body.referrer) || null,
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
        utm_content: utm_content || null,
        utm_term: utm_term || null,
        gclid: gclid || null,
        fbclid: fbclid || null,
      },
    ]);

    if (supabaseError) {
      console.error('Supabase error (card-api-landing-submit):', supabaseError);
      return NextResponse.json(
        { error: '데이터 저장 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: '신청이 완료되었습니다.' });
  } catch (error) {
    console.error('Error in card-api-landing-submit API:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
