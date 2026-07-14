'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import FashionLeadForm from './LeadForm';

export default function FashionLeadFormPage() {
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

      <header className="report-header lead-form-header-section" style={{ background: 'linear-gradient(135deg, #f0f9f4 0%, #ffffff 100%)' }}>
        <div className="report-container">
          <div className="lead-form-grid">
            <div className="lead-form-hero">
              <h1 className="report-h1 lead-form-fashion-h1">
                <strong>
                  라이프·패션 브랜드를<br/>
                  위한 벤치마크 리포트 2026
                </strong>
              </h1>
              <div className="report-subtitle">
                버는 돈, 남기는 돈, 쥐는 돈<br/>
                라이프·패션 121개사 + 정점 브랜드 20개사<br className="mobile-br" />
                2개년 재무제표 직접 분석
              </div>

              <div className="lead-form-cover-wrapper">
                <Image
                  src="/lead-form-fashion-cover.png"
                  alt="라이프·패션 브랜드 벤치마크 리포트 2026"
                  width={600}
                  height={417}
                  priority
                  className="report-cover-image"
                />
              </div>

              <ul className="lead-form-bullets">
                <li>
                  <span className="lead-form-bullet-check" style={{ background: '#329451' }}>✓</span>
                  <span>라이프·패션 121개사 2년 재무제표 직접 분석</span>
                </li>
                <li>
                  <span className="lead-form-bullet-check" style={{ background: '#329451' }}>✓</span>
                  <span>GP율·OP율·운전자본 구간별 기준선 및 내 회사 자가진단 체크리스트</span>
                </li>
                <li>
                  <span className="lead-form-bullet-check" style={{ background: '#329451' }}>✓</span>
                  <span>커버낫 8년 20배, 무신사 6년 12배 — 정점 브랜드 20곳의 성장 곡선 실측</span>
                </li>
              </ul>
            </div>

            <div className="lead-form-side">
              <FashionLeadForm utmParams={utmParams} />
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
