'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AgencyLeadForm, { AgencyUtmParams } from './LeadForm';

export default function AgencyLeadFormPage() {
  const [utmParams, setUtmParams] = useState<AgencyUtmParams>({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
    gclid: '',
    fbclid: '',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
      utm_term: params.get('utm_term') || '',
      gclid: params.get('gclid') || '',
      fbclid: params.get('fbclid') || '',
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
                  광고대행사 현금흐름<br/>
                  벤치마크 리포트 2026
                </strong>
              </h1>
              <div className="report-subtitle">
                국내 광고대행사 160개사<br className="mobile-br" />
                결제·계좌·세금계산서·재무제표 데이터 분석<br className="mobile-br" />
                분명 흑자인데, 통장은 왜 비어갈까요
              </div>

              <div className="lead-form-cover-wrapper">
                <Image
                  src="/lead-form-agency-cover.png"
                  alt="광고대행사 현금흐름 벤치마크 리포트 2026"
                  width={600}
                  height={320}
                  priority
                  className="report-cover-image"
                />
              </div>

              <ul className="lead-form-bullets">
                <li>
                  <span className="lead-form-bullet-check" style={{ background: '#3A92D1' }}>✓</span>
                  <span>광고대행사 160개사의 결제·계좌·세금계산서와 DART 공시 재무제표 분석</span>
                </li>
                <li>
                  <span className="lead-form-bullet-check" style={{ background: '#3A92D1' }}>✓</span>
                  <span>취급고 규모별 GP마진·1인당 GP·인건비율·영업이익률 벤치마크 + 7문항 자가진단 체크리스트</span>
                </li>
                <li>
                  <span className="lead-form-bullet-check" style={{ background: '#3A92D1' }}>✓</span>
                  <span>통장 잔고는 중앙값 16일치, 입금은 40일 뒤 — 흑자도산이 이 산업에 유독 잦은 이유</span>
                </li>
              </ul>
            </div>

            <div className="lead-form-side">
              <AgencyLeadForm utmParams={utmParams} />
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
