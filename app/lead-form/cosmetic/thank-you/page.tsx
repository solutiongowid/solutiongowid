'use client';

import { useEffect } from 'react';
import Image from 'next/image';

type FbqFn = (...args: unknown[]) => void;
type LintrkFn = (action: string, data: { conversion_id: string | number }) => void;

declare global {
  interface Window {
    fbq?: FbqFn;
    lintrk?: LintrkFn;
  }
}

export default function CosmeticLeadFormThankYouPage() {
  useEffect(() => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', {
        content_name: 'lead-form-cosmetic',
        content_category: 'beauty-report',
      });
    }

    const linkedinConversionId = process.env.NEXT_PUBLIC_LINKEDIN_LEAD_CONVERSION_ID;
    if (linkedinConversionId && typeof window.lintrk === 'function') {
      window.lintrk('track', { conversion_id: linkedinConversionId });
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
          </div>

          <div className="thank-you-webinar-card">
            <div className="thank-you-webinar-date">5/20 (수) 오후 4시 · 라이브 세션</div>
            <h2 className="thank-you-webinar-title">
              뷰티 브랜드를 위한<br/>
              현금 흐름 구조 재설계 웨비나도<br/>
              신청해보세요!
            </h2>
            <p className="thank-you-webinar-description">
              아누아, 데이지크, 비플레인 등<br/>
              고위드 178개 뷰티 브랜드는 어떻게 현금 흐름을<br/>
              관리하는 지 구체적으로 다뤄드립니다.
            </p>
            <p className="thank-you-webinar-description">
              라이브 세션의 주제는<br/>
              <strong>‘뷰티 브랜드의 현금 흐름 구조 재설계 방법’</strong>입니다.
            </p>
            <a
              href="https://www.solutiongowid.com/cosmetic/corporate-card-webinar"
              target="_blank"
              rel="noopener noreferrer"
              className="thank-you-webinar-cta"
            >
              웨비나 신청페이지 바로가기 →
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
