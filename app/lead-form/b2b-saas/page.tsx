'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import B2bSaasLeadForm from './LeadForm';

export default function B2bSaasLeadFormPage() {
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

      <header className="report-header lead-form-header-section" style={{ background: 'linear-gradient(135deg, #eef6fc 0%, #ffffff 100%)' }}>
        <div className="report-container">
          <div className="lead-form-grid">
            <div className="lead-form-hero">
              <h1 className="report-h1">
                <strong>
                  B2B 소프트웨어를 위한<br/>
                  벤치마크 리포트 2026
                </strong>
              </h1>
              <div className="report-subtitle">
                국내 B2B 소프트웨어 582개사<br className="mobile-br" />
                세금계산서·법인카드·고용 데이터 2년 추적<br className="mobile-br" />
                성장률은 비슷해도 갈린 것은 유지율이었습니다
              </div>

              <div className="lead-form-cover-wrapper">
                <Image
                  src="/lead-form-b2b-saas-cover.png"
                  alt="B2B 소프트웨어 벤치마크 리포트 2026"
                  width={600}
                  height={320}
                  priority
                  className="report-cover-image"
                />
              </div>

              <ul className="lead-form-bullets">
                <li>
                  <span className="lead-form-bullet-check" style={{ background: '#3A92D1' }}>✓</span>
                  <span>B2B 소프트웨어 582개사 거래처 단위 매출 데이터 2년 분석</span>
                </li>
                <li>
                  <span className="lead-form-bullet-check" style={{ background: '#3A92D1' }}>✓</span>
                  <span>반복매출 비중별 4개 그룹 NRR·성장 분해·인당 매출 벤치마크 + 5문항 자가진단 체크리스트</span>
                </li>
                <li>
                  <span className="lead-form-bullet-check" style={{ background: '#3A92D1' }}>✓</span>
                  <span>성장률은 비슷해도 유지율은 2배 차이 — 첫 12개월에 승부가 나는 이유</span>
                </li>
              </ul>
            </div>

            <div className="lead-form-side">
              <B2bSaasLeadForm utmParams={utmParams} />
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
