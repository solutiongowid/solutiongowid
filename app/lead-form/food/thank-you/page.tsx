'use client';

import { useEffect } from 'react';
import Image from 'next/image';

type FbqFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: FbqFn;
  }
}

export default function FoodLeadFormThankYouPage() {
  useEffect(() => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', {
        content_name: 'lead-form-food',
        content_category: 'food-report',
      });
    }
  }, []);

  return (
    <div className="report-page">
      <nav className="report-nav">
        <div className="report-container">
          <div className="report-nav-content">
            <a href="https://gowid.com" className="report-brand" target="_blank" rel="noopener noreferrer">
              <Image
                src="/Group 626579.png"
                alt="GOWID"
                width={84}
                height={28}
                priority
              />
            </a>
          </div>
        </div>
      </nav>

      <main className="thank-you-main" style={{ background: 'linear-gradient(135deg, #fff8f4 0%, #ffffff 100%)' }}>
        <div className="report-container">
          <div className="thank-you-content">
            <div className="thank-you-check" aria-hidden="true">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="40" fill="#FF6B35" />
                <path
                  d="M24 41.5L34.5 52L56 30"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h1 className="thank-you-title">신청이 완료되었습니다</h1>
            <p className="thank-you-description">
              제출해주신 이메일 주소로 리포트를 발송해드렸습니다.<br/>
              메일함을 확인해주세요.
            </p>
            <p className="thank-you-note">
              메일이 보이지 않는다면 스팸함도 확인해주세요.
            </p>
          </div>

          <div style={{
            marginTop: '3rem',
            maxWidth: '560px',
            marginLeft: 'auto',
            marginRight: 'auto',
            background: 'white',
            border: '1.5px solid rgba(255, 107, 53, 0.25)',
            borderRadius: '1rem',
            padding: '2rem',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#FF6B35', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
              7월 8일 (수) 오후 7시 · 라이브 세션
            </div>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#1a1a1a', margin: '0 0 1rem', lineHeight: 1.4 }}>
              푸드 브랜드를 위한<br/>
              라이브 세션도 신청해보세요!
            </h2>
            <p style={{ fontSize: '1rem', color: '#555', lineHeight: 1.65, margin: '0 0 0.75rem' }}>
              버는 돈, 남기는 돈, 쥐는 돈을 라이브로 풀어드립니다.<br/>
              강남구 도산대로 317 호림아트센터 14층 현장 + 온라인 병행
            </p>
            <a
              href="/event/food-finance-live"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                marginTop: '1.25rem',
                padding: '0.875rem 2rem',
                background: 'linear-gradient(135deg, #FF6B35 0%, #e55a25 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 700,
                boxShadow: '0 4px 16px rgba(255, 107, 53, 0.3)',
              }}
            >
              라이브세션 신청하기 →
            </a>
          </div>
        </div>
      </main>

      <footer className="report-footer">
        <div className="report-container">
          <div className="report-footer-content">
            <div>@GOWID ⓒ2026. All Rights Reserved</div>
            <div className="report-footer-divider">|</div>
            <div>
              <a
                href="https://www.notion.so/teamgowid/2026-ver-2e98db64698e8086ac85e01f29c32587"
                target="_blank"
                rel="noopener noreferrer"
                className="report-footer-link"
              >
                개인정보 처리방침
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
