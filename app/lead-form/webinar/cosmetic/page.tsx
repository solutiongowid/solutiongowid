'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import WebinarCosmeticLeadForm from './LeadForm';

export default function WebinarCosmeticLeadFormPage() {
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
                  AI CFO 시대,<br/>
                  K-뷰티의 경영 가시성<br/>
                  라운드테이블 다시보기
                </strong>
              </h1>
              <div className="report-subtitle">
                매출은 늘어도 통장이 마르는 이유<br/>
                재무 가시성 × 데이터·AI로 마진·공헌이익·현금을<br className="mobile-br" />
                실시간으로 잇는 방법, 라운드테이블 녹화본
              </div>

              <div className="lead-form-cover-wrapper">
                <Image
                  src="/lead-form-webinar-cosmetic-cover.png"
                  alt="AI CFO 시대, K-뷰티의 경영 가시성 라운드테이블 다시보기"
                  width={600}
                  height={336}
                  priority
                  className="report-cover-image"
                />
              </div>

              <ul className="lead-form-bullets">
                <li>
                  <span className="lead-form-bullet-check">✓</span>
                  <span>코스메틱 브랜드 178곳 재무 데이터 분석 — 규모별 고정비 구조와 현금 체력의 상관관계</span>
                </li>
                <li>
                  <span className="lead-form-bullet-check">✓</span>
                  <span>매출 500억~2,000억 &apos;마의 구간&apos;, 채널·SKU 폭증을 마진·공헌이익 실시간 대시보드로 잡는 법</span>
                </li>
                <li>
                  <span className="lead-form-bullet-check">✓</span>
                  <span>흑자인데 현금은 마르는 이유 — 현금전환주기(CCC) 70일 진단과 효율화·성장투자·현금순환 3단계 해법</span>
                </li>
              </ul>
            </div>

            <div className="lead-form-side">
              <WebinarCosmeticLeadForm utmParams={utmParams} />
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
