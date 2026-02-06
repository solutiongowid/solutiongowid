import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { name, company, email, timestamp } = body;

    // 필수 필드 검증
    if (!name || !company || !email) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    // Google Sheets Apps Script Web App URL
    // 사용자가 Google Apps Script를 배포한 후 여기에 URL을 입력해야 합니다.
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || '';

    if (!GOOGLE_SCRIPT_URL) {
      console.error('GOOGLE_SCRIPT_URL environment variable is not set');
      
      // 개발 환경에서는 콘솔에만 로그 출력
      if (process.env.NODE_ENV === 'development') {
        console.log('Form Data:', { name, company, email, timestamp });
        return NextResponse.json({ 
          success: true, 
          message: 'Development mode: Data logged to console' 
        });
      }
      
      return NextResponse.json(
        { error: 'Google Sheets 연동이 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    // Google Sheets에 데이터 전송
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        company,
        email,
        timestamp,
      }),
    });

    if (!response.ok) {
      throw new Error('Google Sheets 저장에 실패했습니다.');
    }

    const result = await response.json();

    return NextResponse.json({ 
      success: true, 
      message: '정보가 성공적으로 제출되었습니다.',
      data: result 
    });

  } catch (error) {
    console.error('Error in report-download API:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
