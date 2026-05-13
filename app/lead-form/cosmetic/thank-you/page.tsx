'use client';

import { useEffect } from 'react';
import Image from 'next/image';

export default function CosmeticLeadFormThankYouPage() {
  useEffect(() => {
    // TODO: Meta Pixel / GA4 전환 이벤트 발행
    // fbq('track', 'Lead');
    // gtag('event', 'conversion', { send_to: 'AW-XXX/YYY' });
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

      <main className="thank-you-main">
        <div className="report-container">
          <div className="thank-you-content">
            <div className="thank-you-check" aria-hidden="true">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="40" fill="#5BC500" />
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

            <div className="thank-you-cta-group">
              <a
                href="https://gowid.com"
                target="_blank"
                rel="noopener noreferrer"
                className="thank-you-cta-primary"
              >
                고위드 홈으로
              </a>
              <a
                href="/report/beauty-gowid-hwahae"
                className="thank-you-cta-secondary"
              >
                리포트 미리보기
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
