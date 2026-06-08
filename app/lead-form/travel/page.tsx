'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LeadForm from './LeadForm';

export default function TravelLeadFormPage() {
  const [utmParams, setUtmParams] = useState({ utm_source: '', utm_medium: '', utm_campaign: '', utm_content: '' });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
    });
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

      <header className="report-header lead-form-header-section">
        <div className="report-container">
          <div className="lead-form-grid">
            <div className="lead-form-hero">
              <h1 className="report-h1">
                <strong>
                  여행·OTA 기업<br/>
                  현금흐름 리포트
                </strong>
              </h1>
              <div className="report-subtitle">
                고위드 × 소스라이브<br/>
                50개 여행 기업 25개월 결제 데이터 <br className="desktop-br"/>× 광고비–매출 구조 분석
              </div>

              <div className="lead-form-cover-wrapper">
                <Image
                  src="/lead-form-travel-cover.png"
                  alt="2026 여행 OTA 현금흐름 리포트"
                  width={600}
                  height={450}
                  priority
                  className="report-cover-image"
                />
              </div>

              <ul className="lead-form-bullets">
                <li>
                  <span className="lead-form-bullet-check">✓</span>
                  <span>50개 여행 기업의 25개월 카드 결제 데이터 분석</span>
                </li>
                <li>
                  <span className="lead-form-bullet-check">✓</span>
                  <span>5-6월 광고비를 유지한 기업의 7-8월 매출 2.27배 성장 구조</span>
                </li>
                <li>
                  <span className="lead-form-bullet-check">✓</span>
                  <span>현금 위기 노출도 자가진단 체크리스트</span>
                </li>
              </ul>
            </div>

            <div className="lead-form-side">
              <LeadForm utmParams={utmParams} />
            </div>
          </div>
        </div>
      </header>

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
