'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ReportPreviewCarousel from './ReportPreviewCarousel';
import SurveyForm from './SurveyForm';

export default function BeautyGowidHwahaeePage() {
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
                    <span className="desktop-title">연매출 30~80억<br/>뷰티 브랜드를 위한<br/>성장 효율 리포트</span>
                    <span className="mobile-title">연매출 30~80억<br/>뷰티 브랜드를 위한<br/>성장 효율 리포트</span>
                  </strong>
                </h1>
                <div className="report-subtitle">
                  화해 × 고위드,<br/>
                  141개 뷰티 기업 재무 데이터 × 화장품 브랜드 21,232개 리뷰·유입 분석
                </div>
                <button onClick={openModal} className="report-button-primary">
                  무료 다운로드
                </button>
              </div>
              <div className="report-header-image-wrapper">
                {/* TODO: 커버 이미지 경로 교체 */}
                <Image
                  src="/hwahae_cover.png"
                  alt="연매출 30~80억 뷰티 브랜드를 위한 성장 효율 리포트"
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
                    <div>"광고비를 줄였더니 매출이 같이 빠졌다"고 느끼는 뷰티 브랜드 대표</div>
                  </div>
                  <div className="report-recommendation-item">
                    <div className="report-recommendation-digit">2</div>
                    <div>"광고비를 늘렸더니 손실 폭이 더 깊어졌다"고 겪은 CFO/COO</div>
                  </div>
                  <div className="report-recommendation-item">
                    <div className="report-recommendation-digit">3</div>
                    <div>매출은 늘었는데 흑자 전환이 더딘 이유가 궁금한 뷰티 기업 대표</div>
                  </div>
                  <div className="report-recommendation-item">
                    <div className="report-recommendation-digit">4</div>
                    <div>성과형 유료 광고에만 의존하는 구조가 걱정되는 마케팅 담당자</div>
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
                  적자가 발생하면 많은 뷰티 브랜드가 가장 먼저 광고비를 조정합니다.<br/>
                  그러나 141개 뷰티/코스메틱 기업의 재무 데이터는,<br className="desktop-br"/>
                  흑자와 적자를 가른 선행 조건이 광고비가 아니라 원가율이었다는 점을 보여줍니다.
                </p>
                <p>
                  70억 원의 매출 구간을 안정적으로 통과한 기업은<br className="desktop-br"/>
                  비용 구조를 정비한 '순서'에서 차이를 만들었습니다.
                </p>
                <p>
                  고위드와 화해는 141개 뷰티/코스메틱 기업의 재무제표와<br className="desktop-br"/>
                  화장품 브랜드 21,232개의 리뷰·유입 데이터를 결합해 분석하여,<br className="desktop-br"/>
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
                  매출이 커져도 수익은 자동으로 따라오지 않습니다.<br/>
                  141개사 · 화장품 브랜드 21,232개 — 데이터가 공통된 패턴을 보여줬습니다.
                </p>
                <p>
                  <strong>발견 1. 뷰티 업종의 이중 부담 구조</strong> — 원가율 평균 40%, 광고비율 19%.<br className="desktop-br"/>
                  매출의 59%가 두 항목에 묶여 있어, 한쪽만 조정해서는 공헌이익률이 반등하기 어렵습니다.
                </p>
                <p>
                  <strong>발견 2. 흑자와 적자를 가른 것은 광고비가 아닌 원가율</strong> — 적자 기업의 광고비율은 흑자의 3.5배(5.2% → 18.0%)였지만,<br className="desktop-br"/>
                  원가율 격차는 고작 2.7%p. 그 2.7%p가 공헌이익률 10.1%p 격차로 이어졌습니다.
                </p>
                <p>
                  <strong>발견 3. 순서가 결과를 갈랐다</strong> — 같은 매출에서 출발했지만,<br className="desktop-br"/>
                  원가율을 먼저 정비한 기업은 2년 뒤 매출 33% 성장 + 흑자 유지,<br className="desktop-br"/>
                  원가율을 방치하고 광고비를 늘린 기업은 영업이익률이 17.0%p 하락했습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 파트너 소개 섹션 */}
        <section className="report-section report-section-feature">
          <div className="report-container">
            <div className="report-feature-content">
              <h2 className="report-h2 for-feature">화해 × 고위드</h2>
              <div className="report-feature-description">
                <p>
                  <strong>화해</strong>는 21,232개 화장품 브랜드의 리뷰·유입 데이터를 보유한 뷰티 전문 플랫폼입니다.<br/>
                  리뷰 자산이 단기 광고비를 대체하는 축적형 광고 구조를 만들어,<br/>
                  운영 6개월 뒤에도 82%의 유입이 유지되는 선순환을 설계합니다.
                </p>
                <p>
                  <strong>고위드</strong>는 성장 기업에 최적의 혜택을 연결하고 효율적인 비용관리 솔루션을 제공하는 핀테크 서비스입니다.<br/>
                  원가율을 모르면 순서가 보이지 않습니다. 고위드 법인카드로 원가·수수료·광고비를 실시간으로 가시화하세요.
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
                <strong>우리 브랜드의 원가율,<br/>지금 어디에 있을까요?</strong>
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
