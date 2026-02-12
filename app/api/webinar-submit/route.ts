import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyName, name, email, phone, revenueRange } = body;

    if (!companyName || !name || !email || !phone || !revenueRange) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('webinar_registrations')
      .insert([
        {
          company_name: companyName,
          name,
          email,
          phone,
          revenue_range: revenueRange,
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

    return NextResponse.json({
      success: true,
      message: '웨비나 신청이 완료되었습니다.',
      data,
    });
  } catch (error) {
    console.error('Error in webinar-submit API:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
