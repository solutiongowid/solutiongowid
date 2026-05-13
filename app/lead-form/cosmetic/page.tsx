'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LeadForm from './LeadForm';

export default function CosmeticLeadFormPage() {
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
                  연매출 30~80억<br/>
                  뷰티 브랜드를 위한<br/>
                  성장 효율 리포트
                </strong>
              </h1>
              <div className="report-subtitle">
                화해 × 고위드<br/>
                141개 뷰티 기업 재무 데이터 × 화장품 브랜드<br className="desktop-br"/>21,232개 리뷰·유입 분석
              </div>

              <div className="lead-form-cover-wrapper">
                <Image
                  src="/hwahae_cover.png"
                  alt="연매출 30~80억 뷰티 브랜드를 위한 성장 효율 리포트"
                  width={600}
                  height={450}
                  priority
                  className="report-cover-image"
                />
              </div>

              <ul className="lead-form-bullets">
                <li>
                  <span className="lead-form-bullet-check">✓</span>
                  <span>141개 뷰티/코스메틱 기업 재무 데이터 분석</span>
                </li>
                <li>
                  <span className="lead-form-bullet-check">✓</span>
                  <span>화장품 브랜드 21,232개 리뷰·유입 데이터</span>
                </li>
                <li>
                  <span className="lead-form-bullet-check">✓</span>
                  <span>흑자와 적자를 가른 원가율 정비 순서</span>
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
