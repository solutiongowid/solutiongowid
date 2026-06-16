'use client';

import Image from 'next/image';
import ReportPreviewCarousel from './ReportPreviewCarousel';

const GOOGLE_FORM_URL = 'https://forms.gle/5xKYkD1oQPw7GAc79';

export default function AgencyGowidLgcnsPage() {
  return (
    <div className="report-page">
      {/* 네비게이션 */}
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
            <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className="report-nav-button">
              무료 다운로드
            </a>
          </div>
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <header className="report-header">
        <div className="report-container">
          <div className="report-header-content">
            <div className="report-header-text-wrapper">
              <h1 className="report-h1">
                <strong>
                  <span className="desktop-title">광고대행사를 위한<br/>AX 밀도 경영 리포트</span>
                  <span className="mobile-title">광고대행사를 위한<br/>AX 밀도 경영 리포트</span>
                </strong>
              </h1>
              <div className="report-subtitle">
                LG CNS × 고위드<br/>
                국내 광고대행사 재무 데이터 × AI 전환<br className="desktop-br"/>밀도·수익성 분석
              </div>
              <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className="report-button-primary">
                무료 다운로드
              </a>
            </div>
            <div className="report-header-image-wrapper">
              <Image
                src="/agency-lgcns-cover.png"
                alt="광고대행사를 위한 AX 밀도 경영 리포트"
                width={600}
                height={450}
                priority
                className="report-cover-image"
              />
            </div>
          </div>
        </div>
      </header>

      {/* 추천 대상 섹션 */}
      <section className="report-section report-section-recommendations">
        <div className="report-container">
          <div className="report-recommendation-content">
            <div className="report-recommendation-left">
              <h2 className="report-h2">이런 분들께 추천합니다</h2>
              <div className="report-recommendation-list">
                <div className="report-recommendation-item">
                  <div className="report-recommendation-digit">1</div>
                  <div>"AI 툴을 도입했는데도 팀 효율과 수익성이 기대만큼 오르지 않는다"고 느끼는 광고대행사 대표</div>
                </div>
                <div className="report-recommendation-item">
                  <div className="report-recommendation-digit">2</div>
                  <div>"AX 전환에 예산을 투입했더니 오히려 운영 비용이 늘었다"고 겪은 CFO/COO</div>
                </div>
                <div className="report-recommendation-item">
                  <div className="report-recommendation-digit">3</div>
                  <div>매출은 유지되는데 수익률이 계속 낮아지는 이유가 궁금한 광고대행사 경영진</div>
                </div>
                <div className="report-recommendation-item">
                  <div className="report-recommendation-digit">4</div>
                  <div>AI 툴 활용은 알지만 조직 전체의 AX 밀도를 높이는 전략이 없는 팀장/PM</div>
                </div>
              </div>
            </div>
            <div className="report-recommendation-right">
              <ReportPreviewCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* 이 리포트를 시작하며 */}
      <section className="report-section report-section-feature">
        <div className="report-container">
          <div className="report-feature-content">
            <h2 className="report-h2 for-feature">이 리포트를<br/>시작하며</h2>
            <div className="report-feature-description">
              <p>
                AI 전환 비용이 늘면 많은 광고대행사가 가장 먼저 인력 구조를 조정합니다.<br/>
                그러나 국내 광고대행사의 재무 데이터는,<br className="desktop-br"/>
                흑자와 적자를 가른 선행 조건이 인력 수가 아니라 AX 밀도였다는 점을 보여줍니다.
              </p>
              <p>
                연매출 성장 구간을 안정적으로 통과한 대행사는<br className="desktop-br"/>
                AI를 도입한 '순서'와 '밀도'에서 차이를 만들었습니다.
              </p>
              <p>
                LG CNS와 고위드는 국내 광고대행사의 재무제표와<br className="desktop-br"/>
                AI 툴 활용 밀도 데이터를 결합해 분석하여,<br className="desktop-br"/>
                어디서 무너지고, 어떤 순서로 정비해야 돌파하는지를 숫자로 정리했습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 데이터가 보여준 3가지 핵심 발견 */}
      <section className="report-section report-section-about">
        <div className="report-container">
          <div className="report-feature-content">
            <h2 className="report-h2 for-feature">데이터가 보여준<br/>3가지 핵심 발견</h2>
            <div className="report-feature-description">
              <p>
                매출이 늘어도 수익은 자동으로 따라오지 않습니다.<br/>
                국내 광고대행사 데이터 — 공통된 패턴을 보여줬습니다.
              </p>
              <p>
                <strong>발견 1. 이중 부담 구조</strong> — 인건비율 평균 58%, AI 툴 비용 8%. 매출의 66%가 두 항목에 묶여 있어, 한쪽만 조정해서는 수익률이 반등하기 어렵습니다.
              </p>
              <p>
                <strong>발견 2. 흑자와 적자를 가른 것은 AI 도입이 아닌 AX 밀도</strong> — 흑자 대행사의 1인당 AI 업무 처리량은 적자의 3.2배였지만, AI 툴 구독 비용 격차는 고작 1.3%p. 그 밀도 차이가 공헌이익률 12.4%p 격차로 이어졌습니다.
              </p>
              <p>
                <strong>발견 3. 순서가 결과를 갈랐다</strong> — 같은 매출에서 출발했지만, AX 밀도를 먼저 높인 대행사는 2년 뒤 매출 31% 성장 + 흑자 유지, AX 밀도 없이 AI 툴 비용만 늘린 대행사는 영업이익률이 18.0%p 하락했습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LG CNS × 고위드 */}
      <section className="report-section report-section-feature">
        <div className="report-container">
          <div className="report-feature-content">
            <h2 className="report-h2 for-feature">LG CNS × 고위드</h2>
            <div className="report-feature-description">
              <p>
                <strong>LG CNS</strong>는 국내 주요 기업의 디지털 전환을 이끌어온 IT 서비스 전문 기업입니다.<br className="desktop-br"/>
                광고대행사의 AX 전환 수준을 진단하고, 조직별 AI 활용 밀도 데이터를 체계적으로 분석해<br className="desktop-br"/>
                실질적인 업무 효율화 전략을 설계합니다.
              </p>
              <p>
                <strong>고위드</strong>는 성장 기업에 최적의 혜택과 효율적인 비용 관리 솔루션을 제공하는 핀테크 서비스입니다.<br/>
                AX 밀도를 모르면 순서가 보이지 않습니다. 고위드 법인카드로 AI 툴 비용·인건비·운영 지출을 한눈에 확인하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="report-section report-section-cta">
        <div className="report-container">
          <div className="report-cta-content">
            <h3 className="report-h3">
              <strong>우리 회사의 AX 밀도,<br/>지금 어디에 위치할까요?</strong>
            </h3>
            <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className="report-button-cta">
              무료 다운로드
            </a>
          </div>
        </div>
      </section>

      {/* 푸터 */}
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
