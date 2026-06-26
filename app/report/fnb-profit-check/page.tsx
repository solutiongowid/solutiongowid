'use client';

import Image from 'next/image';
import ReportPreviewCarousel from './ReportPreviewCarousel';

const FORM_URL = 'https://forms.gle/B4EAoGGt5FoTFh487';

export default function FnbProfitCheckPage() {
  const openForm = () => window.open(FORM_URL, '_blank');

  return (
    <div className="report-page fnb-report">
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
            <button onClick={openForm} className="report-nav-button">
              무료 다운로드
            </button>
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
                  <span className="desktop-title">차액가맹금 환급 이후,<br/>외식 프랜차이즈 본사가<br/>점검해야 할 수익구조</span>
                  <span className="mobile-title">차액가맹금<br/>환급 이후,<br/>외식 프랜차이즈<br/>본사 수익구조 점검</span>
                </strong>
              </h1>
              <div className="report-subtitle">
                고위드<br/>
                외식 식자재 공급사 345곳<br/>
                본사-가맹점 거래량 34,613건 분석
              </div>
              <button onClick={openForm} className="report-button-primary">
                무료 다운로드
              </button>
            </div>
            <div className="report-header-image-wrapper">
              <Image
                src="/fnb_cover.png"
                alt="차액가맹금 환급 이후 외식 프랜차이즈 본사 수익구조 리포트 표지"
                width={560}
                height={420}
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
                  <div>차액가맹금 환급 이후 본사 수익이 줄어든 <strong>프랜차이즈 본사 대표</strong></div>
                </div>
                <div className="report-recommendation-item">
                  <div className="report-recommendation-digit">2</div>
                  <div>영업이익이 계속 줄어드는 이유를 파악하지 못한 <strong>사업본부장</strong></div>
                </div>
                <div className="report-recommendation-item">
                  <div className="report-recommendation-digit">3</div>
                  <div>식자재 공급 의존도가 높은 본사 수익 구조를 재점검하고 싶은 <strong>CFO</strong></div>
                </div>
                <div className="report-recommendation-item">
                  <div className="report-recommendation-digit">4</div>
                  <div>가맹점 수가 늘어도 본사 손익이 개선되지 않아 고민인 <strong>가맹사업부장</strong></div>
                </div>
              </div>
            </div>
            <div className="report-recommendation-right">
              <ReportPreviewCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* 인트로 섹션 */}
      <section className="report-section report-section-feature">
        <div className="report-container">
          <div className="report-feature-content">
            <h2 className="report-h2 for-feature">이 리포트를<br/>시작하며</h2>
            <div className="report-feature-description">
              <p>
                차액가맹금 환급 의무화 이후, 많은 외식 프랜차이즈 본사가<br className="desktop-br"/>
                기존 수익 구조의 한계를 마주하고 있습니다.<br/>
                그러나 데이터는, 흑자와 적자를 가른 조건이<br className="desktop-br"/>
                가맹점 수나 광고비가 아닌 &lsquo;본사 수익 채널의 구성&rsquo;이었다는 점을 보여줍니다.
              </p>
              <p>
                외식 식자재 공급사 345곳, 본사-가맹점 거래량 34,613건 —<br className="desktop-br"/>
                2024~2025년 2년간 발행된 세금계산서 데이터를 분석한 결과,<br className="desktop-br"/>
                환급 이슈 이전부터 이미 본사 매출은 줄고 있었습니다.
              </p>
              <p>
                고위드는 어디서 무너지고, 어떤 순서로 수익 구조를 정비해야<br className="desktop-br"/>
                돌파할 수 있는지를 숫자로 정리했습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 발견 섹션 */}
      <section className="report-section report-section-about">
        <div className="report-container">
          <div className="report-feature-content">
            <h2 className="report-h2 for-feature">데이터가 보여준<br/>3가지 핵심 발견</h2>
            <div className="report-feature-description">
              <p>
                가맹점이 늘어도 수익은 자동으로 따라오지 않습니다.<br/>
                345개 식자재 공급사 · 34,613건 거래 데이터가 공통된 패턴을 보여줬습니다.
              </p>
              <p>
                <strong>발견 1. 본사 수익의 61.5%가 차액가맹금 채널에 집중돼 있습니다</strong> — 한국 본사 10곳 중 6곳이 차액가맹금 채널에 수익을 집중하고 있습니다. 차액가맹금 비율이 61.5%에 달해, 환급 이슈 하나가 본사 전체 손익에 직격탄이 됩니다.
              </p>
              <p>
                <strong>발견 2. 외부 공시 기준 차액가맹금이 &lsquo;낮다&rsquo;고 보이는 본사는 드뭅니다</strong> — 공정위 공시 평균(중앙값 P50) 35만 원이지만, 실거래 기준 상위 5%(P95)는 2,696만 원으로 공정위 평균 2,600만 원과 유사합니다. 공시값만 보면 안전해 보이지만, 실제 부담은 훨씬 큽니다.
              </p>
              <p>
                <strong>발견 3. 환급 이슈 이전부터 본사 매출은 줄고 있었습니다</strong> — 2024~2025년 본사 총 공급액이 이미 -11.3% 감소했고, 가맹점당 공급액도 -9.9% 하락했습니다. 환급이 원인이 아니라, 구조적 매출 감소가 먼저였습니다.
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
              <strong>우리 본사의 수익 구조,<br/>지금 어디에 있을까요?</strong>
            </h3>
            <button onClick={openForm} className="report-button-cta">
              무료 다운로드
            </button>
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
