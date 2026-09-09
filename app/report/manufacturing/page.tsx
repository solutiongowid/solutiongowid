'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ReportPreviewCarousel from './ReportPreviewCarousel';
import SurveyForm from './SurveyForm';

export default function ManufacturingBenchmarkPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
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
              <button onClick={openModal} className="report-nav-button">
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
                    <span className="desktop-title">제조 산업 현금흐름<br/>벤치마크 리포트 2026</span>
                    <span className="mobile-title">제조 산업 현금흐름<br/>벤치마크 리포트 2026</span>
                  </strong>
                </h1>
                <div className="report-subtitle">
                  고위드 <br className="desktop-br"/>
                  국내 하드웨어/제조 116개사의 재무제표·통장 데이터 실측<br/>영업흑자 71%가 현금유출, 회수까지 중앙값 109일
                </div>
                <button onClick={openModal} className="report-button-primary">
                  무료 다운로드
                </button>
              </div>
              <div className="report-header-image-wrapper">
                <Image
                  src="/manufacturing_cover.png"
                  alt="제조 산업 현금흐름 벤치마크 리포트 2026 표지"
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
                    <div>자재·금형·외주 대금은 매달 나가지만, 매출은 수주 단위로 몰려서 들어오는 대표</div>
                  </div>
                  <div className="report-recommendation-item">
                    <div className="report-recommendation-digit">2</div>
                    <div>결산서는 분명 흑자인데 통장 잔고는 늘 빠듯한 CFO/재무 담당자</div>
                  </div>
                  <div className="report-recommendation-item">
                    <div className="report-recommendation-digit">3</div>
                    <div>투자도 받았고 매출도 크지만, 실제로 쓸 수 있는 운전자금은 생각보다 적은 경영진</div>
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
                  작년에 분명 이익이 났습니다. 재무제표에도 흑자로 나옵니다.<br className="desktop-br"/>
                  그런데 자재값을 낼 때가 되면 통장 잔고부터 확인하게 됩니다.<br/>
                  <strong>물건을 만들 때 자금이 먼저 나가고 판매대금은 한참 뒤에 들어오기 때문에, 돈이 재고와 매출채권에 묶여 있는 것입니다.</strong>
                </p>
                <p>
                  고위드가 하드웨어/제조 116개사의 재무제표와 통장 데이터를 살펴봤습니다.<br className="desktop-br"/>
                  영업이익이 흑자인 회사 열 곳 중 일곱 곳은 지난 12개월 동안 영업활동에서 현금이 빠져나갔습니다.<br/>
                  매출 → 매출총이익 → 영업이익 → 현금흐름의 순서로, 이 시차가 어디서 생기고 어떻게 커지는지 짚어봤습니다.
                </p>
                <p>
                  그래서 하드웨어/제조는 손익계산서보다 통장에서 먼저 문제가 나타납니다.<br className="desktop-br"/>
                  경영의 문제가 아니라, 생산 과정에서 현금이 먼저 나가는 산업 구조 때문입니다.<br/>
                  이 시간 차이를 관리하는 법을 정리했습니다.
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
                  성격이 다른 116개사, 하지만 공통된 패턴이 있었습니다.<br/>
                  국내 하드웨어/제조 기업의 재무제표와 통장 데이터가 같은 신호를 보여줬습니다.
                </p>
                <p>
                  <strong>발견 1. 흑자와 현금은 다른 말입니다</strong> — 2025년 영업흑자를 낸 41개사 중 29개사(71%)는 최근 12개월 통장의 영업 현금흐름이 마이너스였습니다. 손익계산서는 흑자였지만, 영업활동에서는 돈이 빠져나가고 있었습니다.
                </p>
                <p>
                  <strong>발견 2. 회수까지 중앙값 109일, 완충 여력은 나흘치입니다</strong> — 돈이 나간 뒤 돌아오기까지 기업별 중앙값 109일이 걸리는데, 신용 한도로 버틸 수 있는 일수는 중앙값 4일, 잔고 일수 하위 25%는 24일치뿐입니다.
                </p>
                <p>
                  <strong>발견 3. 성장 자금은 설비가 아니라 운전자본으로 갑니다</strong> — 매출이 늘어난 65개사 중 51개사(78%)는 운전자본도 함께 늘었고, 늘어난 매출 1원마다 0.11원이 추가로 묶였습니다. 반면 설비투자는 영업지출의 0.8%에 불과합니다.
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
                <strong>우리 회사의 잔고 일수는<br/>지금 며칠치일까요?</strong>
              </h3>
              <button onClick={openModal} className="report-button-cta">
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

      {/* 설문 폼 모달 */}
      <SurveyForm isOpen={isModalOpen} onClose={closeModal} utmParams={utmParams} />
    </>
  );
}
