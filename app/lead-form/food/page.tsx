'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import FoodLeadForm from './LeadForm';

export default function FoodLeadFormPage() {
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
                  푸드 브랜드를 위한<br/>
                  벤치마크 리포트 2026
                </strong>
              </h1>
              <div className="report-subtitle">
                버는 돈, 남기는 돈, 쥐는 돈<br/>
                식품 119개사 + D2C 38개사 양년 재무제표 직접 분석
              </div>

              <div className="lead-form-cover-wrapper">
                <Image
                  src="/lead-form-food-cover.png"
                  alt="푸드 브랜드 벤치마크 리포트 2026"
                  width={600}
                  height={450}
                  priority
                  className="report-cover-image"
                />
              </div>

              <ul className="lead-form-bullets">
                <li>
                  <span className="lead-form-bullet-check" style={{ background: '#FF6B35' }}>✓</span>
                  <span>식품 119개사·D2C 38개사 재무제표 직접 분석 (매출·GP·OP·현금 네 칸)</span>
                </li>
                <li>
                  <span className="lead-form-bullet-check" style={{ background: '#FF6B35' }}>✓</span>
                  <span>GP율·OP율·운전자본 구간별 기준선 및 내 회사 자가진단 체크리스트</span>
                </li>
                <li>
                  <span className="lead-form-bullet-check" style={{ background: '#FF6B35' }}>✓</span>
                  <span>번영한 17곳이 다르게 한 것 — 마진 → 성장 → 재고 순서의 실증 데이터</span>
                </li>
              </ul>
            </div>

            <div className="lead-form-side">
              <FoodLeadForm utmParams={utmParams} />
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
