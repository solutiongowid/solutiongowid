'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AiSaasLeadForm from './LeadForm';

export default function AiSaasLeadFormPage() {
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

      <header className="report-header lead-form-header-section" style={{ background: 'linear-gradient(135deg, #f0f6ff 0%, #ffffff 100%)' }}>
        <div className="report-container">
          <div className="lead-form-grid">
            <div className="lead-form-hero">
              <h1 className="report-h1">
                <strong>
                  스타트업을 위한<br/>
                  SaaS·AI 비용 분석 리포트 2026
                </strong>
              </h1>
              <div className="report-subtitle">
                1,600개 스타트업 실결제 데이터 기반<br className="mobile-br" />
                우리 회사는 비슷한 규모, 업종에서 많이 쓰는 편일까?
              </div>

              <div className="lead-form-cover-wrapper">
                <Image
                  src="/lead-form-ai-saas-cover.png"
                  alt="스타트업 SaaS·AI 비용 분석 리포트 2026"
                  width={600}
                  height={338}
                  priority
                  className="report-cover-image"
                />
              </div>

              <ul className="lead-form-bullets">
                <li>
                  <span className="lead-form-bullet-check" style={{ background: '#3B82F6' }}>✓</span>
                  <span>1,600개 스타트업 SaaS·AI 실결제 데이터 직접 분석</span>
                </li>
                <li>
                  <span className="lead-form-bullet-check" style={{ background: '#3B82F6' }}>✓</span>
                  <span>규모·업종별 SaaS·AI 지출 기준선 및 우리 회사 자가진단</span>
                </li>
                <li>
                  <span className="lead-form-bullet-check" style={{ background: '#3B82F6' }}>✓</span>
                  <span>비용 최적화 여지가 큰 항목 우선순위 인사이트</span>
                </li>
              </ul>
            </div>

            <div className="lead-form-side">
              <AiSaasLeadForm utmParams={utmParams} />
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
