import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { companyName, name, position, email, phone, timestamp } = body;

    // 필수 필드 검증
    if (!companyName || !name || !position || !email || !phone) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    // Supabase에 데이터 저장
    const { error: supabaseError } = await supabase
      .from('report_downloads')
      .insert([
        {
          company_name: companyName,
          name,
          position,
          email,
          phone,
        },
      ]);

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
    }

    // Google Sheets Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_SURVEY_URL || '';

    // Google Sheets에 데이터 전송 (설정된 경우에만)
    if (GOOGLE_SCRIPT_URL) {
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, name, position, email, phone, timestamp }),
      }).catch((err) => console.error('Google Sheets error:', err));
    }

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
