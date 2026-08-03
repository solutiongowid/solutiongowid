'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AgencyLeadForm, { AgencyUtmParams } from './LeadForm';

const HIGHLIGHTS = [
  { value: '16일치', label: '통장 잔고 중앙값 (94개사)' },
  { value: '61%', label: '한 달을 못 버티는 잔고 비중' },
  { value: '19.6%', label: 'GP마진 중앙값 (56개사)' },
];

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

      <header className="report-header lead-form-header-section" style={{ background: 'linear-gradient(135deg, #F0F4E3 0%, #ffffff 100%)' }}>
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
                광고대행사 160개사 세금계산서·통장 실측 데이터 기반<br className="mobile-br" />
                분명 흑자인데, 통장은 왜 비어갈까?
              </div>

              <div className="lead-form-cover-wrapper">
                <Image
                  src="/lead-form-agency-cover.png"
                  alt="광고대행사 현금흐름 벤치마크 리포트 2026"
                  width={600}
                  height={425}
                  priority
                  className="report-cover-image"
                />
              </div>

              <ul className="lead-form-bullets">
                <li>
                  <span className="lead-form-bullet-check" style={{ background: '#3A4A32' }}>✓</span>
                  <span>취급고가 아닌 &lsquo;실질 GP&rsquo; 구하는 법과 규모별 마진 벤치마크</span>
                </li>
                <li>
                  <span className="lead-form-bullet-check" style={{ background: '#3A4A32' }}>✓</span>
                  <span>인건비율 60% 선과 적자 전환 구간, GP 대비 운영비 기준선</span>
                </li>
                <li>
                  <span className="lead-form-bullet-check" style={{ background: '#3A4A32' }}>✓</span>
                  <span>현금 갭·운전자금 공식, 카드 한도 천장과 7문항 자가진단</span>
                </li>
              </ul>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  marginTop: '0.25rem',
                }}
              >
                {HIGHLIGHTS.map((item) => (
                  <div
                    key={item.value}
                    style={{
                      flex: '1 1 8rem',
                      background: 'rgba(255, 255, 255, 0.85)',
                      border: '1px solid rgba(35, 45, 29, 0.12)',
                      borderRadius: '0.75rem',
                      padding: '0.875rem 1rem',
                    }}
                  >
                    <div style={{ fontSize: '1.375rem', fontWeight: 700, color: '#232D1D', lineHeight: 1.2 }}>
                      {item.value}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: '#5f6a58', marginTop: '0.25rem', lineHeight: 1.4 }}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
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
