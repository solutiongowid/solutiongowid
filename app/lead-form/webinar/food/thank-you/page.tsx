'use client';

import { useEffect } from 'react';
import Image from 'next/image';

type FbqFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: FbqFn;
  }
}

export default function WebinarFoodLeadFormThankYouPage() {
  useEffect(() => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', {
        content_name: 'lead-form-webinar-food',
        content_category: 'food-webinar-recording',
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
              아래 버튼을 눌러 라이브세션 녹화본을 바로 확인하세요.
            </p>

            <div className="thank-you-cta-group">
              <a
                href="https://drive.google.com/drive/folders/1FheB2IMzD9yowh3m6tFcGA4VOydzjhOo?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="thank-you-cta-primary"
                style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #e55a25 100%)', boxShadow: '0 4px 16px rgba(255, 107, 53, 0.3)' }}
              >
                녹화본 바로보기
              </a>
            </div>
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
