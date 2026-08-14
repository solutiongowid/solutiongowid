'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ReportPreviewCarousel from './ReportPreviewCarousel';
import SurveyForm from './SurveyForm';

export default function AiMlBenchmarkPage() {
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
                    <span className="desktop-title">AI 머신러닝 기업<br/>벤치마크 리포트 2026</span>
                    <span className="mobile-title">AI 머신러닝 기업<br/>벤치마크 리포트 2026</span>
                  </strong>
                </h1>
                <div className="report-subtitle">
                  고위드<br/>
                  국내 AI·ML 기업 494곳의 통장·세금계산서 실측<br className="desktop-br"/>투자금 잔존율 · 서버비 증가율 분석
                </div>
                <button onClick={openModal} className="report-button-primary">
                  무료 다운로드
                </button>
              </div>
              <div className="report-header-image-wrapper">
                <Image
                  src="/aiml_cover.png"
                  alt="2026 AI·ML 기업 벤치마크 리포트 표지"
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
                    <div>&ldquo;매출은 늘었는데 통장은 작년보다 얇다&rdquo;고 느끼는 AI·ML 기업 대표</div>
                  </div>
                  <div className="report-recommendation-item">
                    <div className="report-recommendation-digit">2</div>
                    <div>&ldquo;클라우드·모델 API 청구서가 매달 오르는데 이유를 설명 못 한다&rdquo;는 CFO/재무 담당자</div>
                  </div>
                  <div className="report-recommendation-item">
                    <div className="report-recommendation-digit">3</div>
                    <div>다음 라운드까지 버틸 수 있냐는 질문에 개월 수로 답하지 못하는 경영진</div>
                  </div>
                  <div className="report-recommendation-item">
                    <div className="report-recommendation-digit">4</div>
                    <div>투자금 소진 속도를 관리하고 서버비 절감 순서를 세우고 싶은 스타트업 재무팀</div>
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
                  AI 기업에서는 손익계산서의 순서가 작동하지 않습니다.<br className="desktop-br"/>
                  적자인 회사에게 영업이익은 성장 단계의 표시일 뿐이고,<br/>
                  <strong>서버비는 통장 잔고에서 직접 빠지는 돈</strong>이 됩니다.
                </p>
                <p>
                  고위드 법인카드와 계좌를 함께 쓰는 국내 AI·딥테크 법인 494곳의<br className="desktop-br"/>
                  통장 잔고와 세금계산서 매입을 직접 세어,<br/>
                  받은 투자금이 얼마나 남았고 서버비가 얼마나 빠르게 크는지 실측했습니다.
                </p>
                <p>
                  고위드는 얼마가 남았는지, 얼마나 빨리 나가는지,<br className="desktop-br"/>
                  그것이 매출로 회수되는지, 그리고 무엇부터 손대야 하는지를<br/>
                  숫자로 정리했습니다.
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
                  투자를 많이 받았다고 시간을 산 것은 아닙니다.<br/>
                  국내 AI·ML 기업 494곳 — 통장과 세금계산서가 공통된 패턴을 보여줬습니다.
                </p>
                <p>
                  <strong>발견 1. 큰 라운드는 시간을 사주지 않습니다</strong> — 누적 투자금 300억 이상 기업의 잔존율은 12개월 만에 11.4%로 떨어졌고, 30억 미만 기업은 24개월이 지나도 32.6%가 남았습니다. 네 구간 모두 역전이 없습니다.
                </p>
                <p>
                  <strong>발견 2. 서버비가 매출보다 빨리 큽니다</strong> — 같은 494곳에서 서버비는 중앙값 1.75배가 됐는데 매출은 1.28배에 그쳤습니다. 274곳 중 60.9%에서 서버비 증가율이 매출 증가율을 앞질렀습니다.
                </p>
                <p>
                  <strong>발견 3. 열에 여덟이 영업 적자입니다</strong> — 서버비를 매출의 10% 이상 쓰는 92곳 중 95.7%가 영업 적자였습니다. 적자 기업에게 서버비는 원가율로 관리되는 비용이 아니라, 통장에서 직접 빠지는 돈입니다.
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
                <strong>우리 회사의 투자금 잔존율,<br/>지금 어디에 있을까요?</strong>
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
