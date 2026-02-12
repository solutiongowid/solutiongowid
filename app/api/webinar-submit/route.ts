import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyName, name, email, phone, revenueRange, timestamp } = body;

    if (!companyName || !name || !email || !phone || !revenueRange) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_WEBINAR_URL || '';

    if (!GOOGLE_SCRIPT_URL) {
      console.error('GOOGLE_SCRIPT_WEBINAR_URL environment variable is not set');

      if (process.env.NODE_ENV === 'development') {
        console.log('Webinar Data:', { companyName, name, email, phone, revenueRange, timestamp });
        return NextResponse.json({
          success: true,
          message: 'Development mode: Data logged to console',
        });
      }

      return NextResponse.json(
        { error: 'Google Sheets 연동이 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyName, name, email, phone, revenueRange, timestamp }),
    });

    if (!response.ok) {
      throw new Error('Google Sheets 저장에 실패했습니다.');
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      message: '웨비나 신청이 완료되었습니다.',
      data: result,
    });
  } catch (error) {
    console.error('Error in webinar-submit API:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
