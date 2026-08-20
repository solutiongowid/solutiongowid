'use client';

import Image from 'next/image';

export default function FnbFinanceWebinarThankYouPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff8f4', padding: '2rem', textAlign: 'center' }}>
      <a href="https://gowid.com" target="_blank" rel="noopener noreferrer" style={{ marginBottom: '2.5rem' }}>
        <Image src="/gowid-logotype.png" alt="GOWID" width={84} height={28} style={{ objectFit: 'contain' }} />
      </a>
      <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🎉</div>
      <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: '800', color: '#111', marginBottom: '1rem', lineHeight: '1.3' }}>
        신청이 완료되었습니다!
      </h1>
      <p style={{ fontSize: '1.0625rem', color: '#666', lineHeight: '1.8', marginBottom: '2.5rem', maxWidth: '480px' }}>
        웨비나 녹화본을 이메일로 보내드리겠습니다.<br />
        조금만 기다려 주세요.
      </p>
      <div style={{
        background: '#fff', border: '1px solid rgba(255,107,53,0.18)',
        borderRadius: '1rem', padding: '1.5rem 2rem', marginBottom: '2.5rem',
        maxWidth: '360px', width: '100%',
      }}>
        <p style={{ fontSize: '0.875rem', color: '#888', marginBottom: '0.75rem', fontWeight: '600' }}>행사 정보</p>
        <p style={{ fontSize: '1rem', color: '#222', fontWeight: '700', marginBottom: '0.25rem' }}>
          F&amp;B 브랜드의 현금 공백
        </p>
        <p style={{ fontSize: '0.9375rem', color: '#555' }}>2026년 8월 19일 (수) 진행 완료</p>
        <p style={{ fontSize: '0.9375rem', color: '#555' }}>신청 시 녹화본 제공</p>
      </div>
      <a
        href="/event/fnb-finance-webinar"
        style={{
          fontSize: '0.9375rem', color: '#FF6B35', textDecoration: 'underline', fontWeight: '600',
        }}
      >
        행사 페이지로 돌아가기
      </a>
    </div>
  );
}
