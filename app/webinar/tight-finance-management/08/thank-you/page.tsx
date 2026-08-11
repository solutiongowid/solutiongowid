'use client';

import Image from 'next/image';

export default function TightFinanceManagement08ThankYouPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fcf5', padding: '2rem', textAlign: 'center' }}>
      <a href="https://gowid.com" target="_blank" rel="noopener noreferrer" style={{ marginBottom: '2.5rem' }}>
        <Image src="/gowid-logotype.png" alt="GOWID" width={84} height={28} style={{ objectFit: 'contain' }} />
      </a>
      <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🎉</div>
      <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: '800', color: '#111', marginBottom: '1rem', lineHeight: '1.3' }}>
        신청해주셔서 감사합니다!
      </h1>
      <p style={{ fontSize: '1.0625rem', color: '#666', lineHeight: '1.8', marginBottom: '2.5rem', maxWidth: '480px' }}>
        신청이 완료되었습니다.<br />
        아래 링크에서 웨비나 일정을 등록할 수 있습니다.<br />
        링크는 신청하신 메일을 통해서도 확인하실 수 있습니다.
      </p>
      <div style={{
        background: '#fff', border: '1px solid rgba(91, 197, 0, 0.18)',
        borderRadius: '1rem', padding: '1.5rem 2rem', marginBottom: '2.5rem',
        maxWidth: '360px', width: '100%',
      }}>
        <p style={{ fontSize: '0.875rem', color: '#888', marginBottom: '0.75rem', fontWeight: '600' }}>웨비나 정보</p>
        <p style={{ fontSize: '1rem', color: '#222', fontWeight: '700', marginBottom: '0.25rem' }}>
          재무 담당자를 위한 타이트 파이낸스, 지출관리
        </p>
        <p style={{ fontSize: '0.9375rem', color: '#555' }}>2026년 8월 20일 (목) 오전 11:00 – 12:00</p>
        <p style={{ fontSize: '0.9375rem', color: '#555' }}>온라인 ZOOM</p>
      </div>
      <a
        href="https://us06web.zoom.us/j/85055086306"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block', background: '#5BC500', color: '#fff', fontSize: '1rem', fontWeight: '700',
          padding: '0.875rem 2.5rem', borderRadius: '0.75rem', textDecoration: 'none',
          boxShadow: '0 4px 20px rgba(91, 197, 0, 0.25)', marginBottom: '1.5rem',
        }}
      >
        ZOOM 등록하기
      </a>
      <a
        href="/webinar/tight-finance-management/08"
        style={{
          fontSize: '0.9375rem', color: '#5BC500', textDecoration: 'underline', fontWeight: '600',
        }}
      >
        웨비나 페이지로 돌아가기
      </a>
    </div>
  );
}
