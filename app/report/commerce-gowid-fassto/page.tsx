'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ReportPreviewCarousel from './ReportPreviewCarousel';
import SurveyForm from './SurveyForm';

export default function CommerceGowidFasstоPage() {
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
                    <span className="desktop-title">이커머스 성장효율<br/>벤치마크 리포트</span>
                    <span className="mobile-title">이커머스 성장효율<br/>벤치마크 리포트</span>
                  </strong>
                </h1>
                <div className="report-subtitle">
                  파스토 x 고위드,<br/>
                  약 1,000개 이커머스 기업의 2년간 비용 구조 분석
                </div>
                <button onClick={openModal} className="report-button-primary">
                  무료 다운로드
                </button>
              </div>
              <div className="report-header-image-wrapper">
                <Image
                  src="/slide_01.png"
                  alt="이커머스 성장효율 벤치마크 리포트"
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
                    <div>매출 10~100억 이커머스 기업 대표/CFO/COO</div>
                  </div>
                  <div className="report-recommendation-item">
                    <div className="report-recommendation-digit">2</div>
                    <div>이커머스 투자자, 물류·풀필먼트 관계자</div>
                  </div>
                  <div className="report-recommendation-item">
                    <div className="report-recommendation-digit">3</div>
                    <div>비용 구조가 정상인지 벤치마크가 궁금한 대표</div>
                  </div>
                  <div className="report-recommendation-item">
                    <div className="report-recommendation-digit">4</div>
                    <div>매출은 느는데 남는 게 없어 원인을 찾고 싶은 분</div>
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
                  매출은 상승하는데, 남는 것이 별로 없다.<br/>
                  숫자는 예쁘게 나오는데, 이거 계속 되는 거 맞을까?
                </p>
                <p>
                  이커머스를 하다 보면 누구나 한 번은 이 질문을 합니다.<br/>
                  "우리, 제대로 크고 있는 거 맞아?"
                </p>
                <p>
                  고위드와 파스토는 약 1,000개 이커머스 기업의 2년간 결제·물류 데이터를 분석하여,<br className="desktop-br"/>
                  매출이 커질수록 비용 구조가 어떻게 변하는지,<br className="desktop-br"/>
                  어디서 무너지고, 어디서 돌파하는지를 숫자로 정리했습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3단계 프레임워크 섹션 */}
        <section className="report-section report-section-about">
          <div className="report-container">
            <div className="report-feature-content">
              <h2 className="report-h2 for-feature">이커머스 기업이<br/>반드시 거치는 3단계</h2>
              <div className="report-feature-description">
                <p>
                  매출이 커져도 수익은 자동으로 따라오지 않습니다.<br/>
                  약 1,000개사 · 2년 추적 — 답은 No였습니다.
                </p>
                <p>
                  <strong>1단계 채널 확장기 (30~70억)</strong> — 공헌이익률 33%로 건강해 보이지만,<br className="desktop-br"/>
                  수수료와 물류비 비효율의 씨앗이 뿌려지는 구간입니다.
                </p>
                <p>
                  <strong>2단계 죽음의 계곡 (70~100억)</strong> — 100원 팔아서 6원 남는 구간.<br className="desktop-br"/>
                  공헌이익률 5.6%, 변동비율 94.4%. 1단계에서 방치한 비효율이 한 번에 터집니다.
                </p>
                <p>
                  <strong>3단계 구조 최적화 (100~150억)</strong> — 계곡을 넘긴 기업의 공헌이익률은 27%로 회복됩니다.<br className="desktop-br"/>
                  원가 -27%, 물류비 -0.7%. 비용을 줄인 게 아니라 구조를 바꾼 결과입니다.
                </p>
                <p>
                  같은 매출에서 출발해도 결과는 정반대였습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 파트너 소개 섹션 */}
        <section className="report-section report-section-feature">
          <div className="report-container">
            <div className="report-feature-content">
              <h2 className="report-h2 for-feature">파스토 x 고위드</h2>
              <div className="report-feature-description">
                <p>
                  <strong>파스토</strong>는 이커머스 전문 풀필먼트 서비스입니다.<br/>
                  업계 평균 매출 대비 물류비 4.2%, 단 1.4%만 들도록 만들어 드립니다.<br/>
                  입고·출고·반품 전 과정을 최적화해 물류비를 줄이고 운영 속도를 높입니다.
                </p>
                <p>
                  <strong>고위드</strong>는 성장 기업에 최적의 혜택을 연결하고 효율적인 비용관리 솔루션을 제공하는 핀테크 서비스입니다.<br/>
                  비용 구조를 모르면 계곡이 보이지 않습니다. 고위드 법인카드로 원가·물류·수수료·광고비를 실시간으로 파악하세요.
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
                <strong>우리 회사는 지금 어디에 있을까요?<br/>약 1,000개 회사 데이터로 확인하세요</strong>
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
