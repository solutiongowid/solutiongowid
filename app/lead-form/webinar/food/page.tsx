'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import WebinarFoodLeadForm from './LeadForm';

export default function WebinarFoodLeadFormPage() {
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

      <header className="report-header lead-form-header-section" style={{ background: 'linear-gradient(135deg, #fff8f4 0%, #ffffff 100%)' }}>
        <div className="report-container">
          <div className="lead-form-grid">
            <div className="lead-form-hero">
              <h1 className="report-h1">
                <strong>
                  푸드 브랜드 현금흐름<br/>
                  라이브세션 다시보기
                </strong>
              </h1>
              <div className="report-subtitle">
                버는 돈, 남기는 돈, 쥐는 돈<br/>
                매출은 늘어도 통장이 마르는 이유<br className="mobile-br" />
                48개사 데이터로 풀어낸 라이브세션 녹화본
              </div>

              <div className="lead-form-cover-wrapper">
                <Image
                  src="/lead-form-webinar-food-cover.png"
                  alt="푸드 브랜드 현금흐름 라이브세션 다시보기"
                  width={600}
                  height={315}
                  priority
                  className="report-cover-image"
                />
              </div>

              <ul className="lead-form-bullets">
                <li>
                  <span className="lead-form-bullet-check" style={{ background: '#FF6B35' }}>✓</span>
                  <span>푸드 브랜드 48개사 재무제표 2년치 해부 — 매출·GP·OP·현금 생존 사다리 진단</span>
                </li>
                <li>
                  <span className="lead-form-bullet-check" style={{ background: '#FF6B35' }}>✓</span>
                  <span>매출 100~200억 확장의 함정, 배달앱·새벽배송·대형유통 세 지갑이 현금을 묶는 구조</span>
                </li>
                <li>
                  <span className="lead-form-bullet-check" style={{ background: '#FF6B35' }}>✓</span>
                  <span>네 칸을 다 막은 8곳의 공식 — 공헌이익 31.7%, 런웨이 18.6개월 자가진단 체크리스트</span>
                </li>
              </ul>
            </div>

            <div className="lead-form-side">
              <WebinarFoodLeadForm utmParams={utmParams} />
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
