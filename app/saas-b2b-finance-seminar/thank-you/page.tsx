'use client';

export default function SaasB2bFinanceSeminarThankYouPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f7ff', padding: '2rem', textAlign: 'center' }}>
      <a href="https://gowid.com" target="_blank" rel="noopener noreferrer" style={{ marginBottom: '2.5rem', fontSize: '1.125rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#111', textDecoration: 'none' }}>
        GOWID
      </a>
      <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🎉</div>
      <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: '800', color: '#111', marginBottom: '1rem', lineHeight: '1.3' }}>
        신청이 접수되었습니다!
      </h1>
      <p style={{ fontSize: '1.0625rem', color: '#666', lineHeight: '1.8', marginBottom: '2.5rem', maxWidth: '480px' }}>
        정원 30명 중 추첨으로 참석자를 확정하며,<br />
        신청하신 연락처로 결과를 개별 안내드립니다.
      </p>
      <div style={{
        background: '#fff', border: '1px solid rgba(52,87,213,0.18)',
        borderRadius: '1rem', padding: '1.5rem 2rem', marginBottom: '2.5rem',
        maxWidth: '360px', width: '100%',
      }}>
        <p style={{ fontSize: '0.875rem', color: '#888', marginBottom: '0.75rem', fontWeight: '600' }}>행사 정보</p>
        <p style={{ fontSize: '1rem', color: '#222', fontWeight: '700', marginBottom: '0.25rem' }}>
          테크 기업의 자금 관리 공식
        </p>
        <p style={{ fontSize: '0.9375rem', color: '#555' }}>2026년 8월 20일 (목) 오후 6시~8시</p>
        <p style={{ fontSize: '0.9375rem', color: '#555' }}>고위드 사옥 14층 대회의실 · 서울</p>
      </div>
      <a
        href="/saas-b2b-finance-seminar"
        style={{
          fontSize: '0.9375rem', color: '#3457D5', textDecoration: 'underline', fontWeight: '600',
        }}
      >
        행사 페이지로 돌아가기
      </a>
    </div>
  );
}
