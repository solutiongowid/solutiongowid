'use client';

export default function AgencyFinanceWebinarThankYouPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F5F3EC', padding: '2rem', textAlign: 'center' }}>
      <a href="https://gowid.com" target="_blank" rel="noopener noreferrer" style={{ marginBottom: '2.5rem', fontSize: '1.125rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#141A21', textDecoration: 'none' }}>
        GOWID
      </a>
      <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🎉</div>
      <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: '800', color: '#141A21', marginBottom: '1rem', lineHeight: '1.3' }}>
        신청이 완료되었습니다!
      </h1>
      <p style={{ fontSize: '1.0625rem', color: '#5e6670', lineHeight: '1.8', marginBottom: '2.5rem', maxWidth: '480px' }}>
        웨비나 접속 링크를 이메일로 보내드리겠습니다.<br />
        8월 25일(화) 오후 4시에 뵙겠습니다.
      </p>
      <div style={{
        background: '#fff', border: '1px solid rgba(14,159,110,0.20)',
        borderRadius: '1rem', padding: '1.5rem 2rem', marginBottom: '2.5rem',
        maxWidth: '360px', width: '100%',
      }}>
        <p style={{ fontSize: '0.875rem', color: '#8d9199', marginBottom: '0.75rem', fontWeight: '600' }}>행사 정보</p>
        <p style={{ fontSize: '1rem', color: '#222A33', fontWeight: '700', marginBottom: '0.25rem' }}>
          광고대행, 재무를 읽는 순서
        </p>
        <p style={{ fontSize: '0.9375rem', color: '#5e6670' }}>2026년 8월 25일 (화) 오후 4시</p>
        <p style={{ fontSize: '0.9375rem', color: '#5e6670' }}>온라인 Zoom</p>
      </div>
      <a
        href="/event/agency-finance-webinar"
        style={{
          fontSize: '0.9375rem', color: '#0E9F6E', textDecoration: 'underline', fontWeight: '600',
        }}
      >
        행사 페이지로 돌아가기
      </a>
    </div>
  );
}
