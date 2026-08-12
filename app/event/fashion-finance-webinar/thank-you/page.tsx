'use client';

export default function FashionFinanceSeminarThankYouPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F7F4ED', padding: '2rem', textAlign: 'center' }}>
      <a href="https://gowid.com" target="_blank" rel="noopener noreferrer" style={{ marginBottom: '2.5rem', fontSize: '1.125rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#141312', textDecoration: 'none' }}>
        GOWID
      </a>
      <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🎉</div>
      <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: '800', color: '#141312', marginBottom: '1rem', lineHeight: '1.3' }}>
        신청이 완료되었습니다!
      </h1>
      <p style={{ fontSize: '1.0625rem', color: '#6d6a64', lineHeight: '1.8', marginBottom: '2.5rem', maxWidth: '480px' }}>
        웨비나 접속 링크를 이메일로 보내드리겠습니다.<br />
        8월 26일(수) 오후 4시에 뵙겠습니다.
      </p>
      <div style={{
        background: '#fff', border: '1px solid rgba(190,123,44,0.22)',
        borderRadius: '1rem', padding: '1.5rem 2rem', marginBottom: '2.5rem',
        maxWidth: '360px', width: '100%',
      }}>
        <p style={{ fontSize: '0.875rem', color: '#948F84', marginBottom: '0.75rem', fontWeight: '600' }}>행사 정보</p>
        <p style={{ fontSize: '1rem', color: '#1F1E1D', fontWeight: '700', marginBottom: '0.25rem' }}>
          라이프·패션 브랜드 — 버는 돈, 남기는 돈, 쥐는 돈
        </p>
        <p style={{ fontSize: '0.9375rem', color: '#555' }}>2026년 8월 26일 (수) 오후 4시 ~ 5시 30분</p>
        <p style={{ fontSize: '0.9375rem', color: '#555' }}>온라인 Zoom</p>
      </div>
      <a
        href="/event/fashion-finance-webinar"
        style={{
          fontSize: '0.9375rem', color: '#BE7B2C', textDecoration: 'underline', fontWeight: '600',
        }}
      >
        행사 페이지로 돌아가기
      </a>
    </div>
  );
}
