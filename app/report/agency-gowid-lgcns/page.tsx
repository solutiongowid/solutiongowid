import Image from 'next/image';
import ReportGallery from './ReportGallery';

const PDF_PATH = '/agency_ax_report.pdf';
const PDF_FILENAME = '광고대행사를 위한 AX 밀도 경영 리포트.pdf';

export default function AgencyGowidLgcnsPage() {
  return (
    <div className="report-page agency-report">
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
            <a href={PDF_PATH} download={PDF_FILENAME} className="report-nav-button">
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
                <span className="desktop-title">
                  <strong>광고대행사</strong>를 위한<br/>
                  <strong>AX 밀도 경영 리포트</strong>
                </span>
                <span className="mobile-title">
                  <strong>광고대행사</strong>를 위한<br/>
                  <strong>AX 밀도 경영 리포트</strong>
                </span>
              </h1>
              <div className="report-subtitle">
                LG CNS × 고위드<br/>
                국내 광고대행사 재무 데이터 × AI 전환<br className="desktop-br"/>밀도·수익성 분석
              </div>
              <a href={PDF_PATH} download={PDF_FILENAME} className="report-button-primary">
                무료 다운로드
              </a>
            </div>
            <div className="report-header-image-wrapper">
              <Image
                src="/agency_cover.png"
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
          <h2 className="report-h2">이런 분들께 추천합니다</h2>
          <div className="report-recommendation-list">
            <div className="report-recommendation-item">
              <svg className="report-recommendation-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="report-recommendation-text">
                &ldquo;AI 툴을 도입했는데도 팀 효율과 수익성이 기대만큼 오르지 않는다&rdquo;고 느끼는 <strong>광고대행사 대표</strong>
              </p>
            </div>
            <div className="report-recommendation-item">
              <svg className="report-recommendation-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
              <p className="report-recommendation-text">
                &ldquo;AX 전환에 예산을 투입했더니 오히려 운영 비용이 늘었다&rdquo;고 겪은 <strong>CFO/COO</strong>
              </p>
            </div>
            <div className="report-recommendation-item">
              <svg className="report-recommendation-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
              <p className="report-recommendation-text">
                매출은 유지되는데 수익률이 계속 낮아지는 이유가 궁금한 <strong>광고대행사 경영진</strong>
              </p>
            </div>
            <div className="report-recommendation-item">
              <svg className="report-recommendation-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
              <p className="report-recommendation-text">
                AI 툴 활용은 알지만 조직 전체의 AX 밀도를 높이는 전략이 없는 <strong>팀장/PM</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 갤러리 섹션 */}
      <section className="report-section report-section-gallery">
        <ReportGallery />
      </section>

      {/* 인트로 섹션 */}
      <section className="report-section report-section-feature">
        <div className="report-container">
          <div className="report-feature-content">
            <h2 className="report-h2 for-feature">이 리포트를<br/>시작하며</h2>
            <div className="report-feature-description">
              <p>
                AI 전환 비용이 늘면 많은 광고대행사가 가장 먼저 인력 구조를 조정합니다.<br/>
                그러나 국내 광고대행사의 재무 데이터는,<br className="desktop-br"/>
                흑자와 적자를 가른 선행 조건이 <strong>인력 수가 아니라 AX 밀도</strong>였다는 점을 보여줍니다.
              </p>
              <p>
                연매출 성장 구간을 안정적으로 통과한 대행사는<br className="desktop-br"/>
                AI를 도입한 <strong>&lsquo;순서&rsquo;와 &lsquo;밀도&rsquo;</strong>에서 차이를 만들었습니다.
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

      {/* 핵심 발견 섹션 */}
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

      {/* 파트너 소개 섹션 */}
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
            <a href={PDF_PATH} download={PDF_FILENAME} className="report-button-cta">
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
