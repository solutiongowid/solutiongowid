'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ReportPreviewCarousel from './ReportPreviewCarousel';
import SurveyForm from './SurveyForm';

export default function TechDecision2026Page() {
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
                    <span className="desktop-title">테크 기업의 사건과<br/>의사결정 리포트 2026</span>
                    <span className="mobile-title">테크 기업의 사건과<br/>의사결정 리포트 2026</span>
                  </strong>
                </h1>
                <div className="report-subtitle">
                  고위드 <br className="desktop-br"/>
                  국내 테크 기업 569곳의 계좌·고용 기록 55개월 실측<br/>다섯 상황 속 인원 결정과 열여덟 달 뒤 결과 분석
                </div>
                <button onClick={openModal} className="report-button-primary">
                  무료 다운로드
                </button>
              </div>
              <div className="report-header-image-wrapper">
                <Image
                  src="/techdecision_thumbnail.png"
                  alt="테크 기업의 사건과 의사결정 리포트 2026 표지"
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
                    <div>매출이 꺾이거나 통장이 말랐을 때 인건비부터 줄여야 하는지 고민하는 대표</div>
                  </div>
                  <div className="report-recommendation-item">
                    <div className="report-recommendation-digit">2</div>
                    <div>투자나 지원금을 받고 채용 계획을 세우는 CFO/재무 담당자</div>
                  </div>
                  <div className="report-recommendation-item">
                    <div className="report-recommendation-digit">3</div>
                    <div>&ldquo;지금 사람을 줄여도 되는지&rdquo;를 감이 아니라 숫자로 판단하고 싶은 경영진</div>
                  </div>
                  <div className="report-recommendation-item">
                    <div className="report-recommendation-digit">4</div>
                    <div>인건비 효율(LER) 기준으로 채용·감원 의사결정을 검토하고 싶은 스타트업 재무팀</div>
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
                  비용을 줄여야 할 때 보통 항목부터 봅니다.<br className="desktop-br"/>
                  임대료를 줄일지, 광고를 멈출지, 구독을 정리할지 순서로 갑니다.<br/>
                  <strong>그런데 결과를 가른 건 그 순서가 아니라 인건비, 그중에서도 사람 수였습니다.</strong>
                </p>
                <p>
                  고위드는 국내 테크 기업 569곳의 계좌 거래, 세금계산서,<br className="desktop-br"/>
                  국민연금 고용 기록을 2022년 1월부터 2026년 7월까지 55개월간 추적했습니다.<br/>
                  매출 급락, 현금 고갈, 투자 유치, 지원사업 선정, 매출 급등 —<br className="desktop-br"/>
                  다섯 상황이 왔을 때 인원을 늘렸는지 줄였는지에 따라 열여덟 달 뒤 결과가 어떻게 갈렸는지 봤습니다.
                </p>
                <p>
                  고위드는 언제 사람을 지켜야 하는지, 무엇부터 손대면 안 되는지,<br className="desktop-br"/>
                  그리고 그 판단을 감이 아니라 숫자로 내리는 법을<br/>
                  정리했습니다.
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
                  성격이 완전히 다른 다섯 상황입니다.<br/>
                  국내 테크 기업 569곳 — 통장과 세금계산서, 고용 기록이 공통된 패턴을 보여줬습니다.
                </p>
                <p>
                  <strong>발견 1. 다섯 상황 모두에서 사람을 줄인 회사가 가장 아래였습니다</strong> — 매출이 꺾였을 때, 통장이 말랐을 때, 투자를 받았을 때, 지원사업에 붙었을 때, 매출이 늘었을 때. 서른두 개 통제 비교에서 역전은 한 번도 없었습니다.
                </p>
                <p>
                  <strong>발견 2. 가장 흔한 선택이 가장 나쁜 선택이었습니다</strong> — 사람이 빠지고 남은 사람의 인당만 오르는 상태가 네 상황 모두에서 가장 흔했고, 동시에 폐업률이 8퍼센트로 가장 높았습니다.
                </p>
                <p>
                  <strong>발견 3. 줄여도 되는지는 인건비 효율(LER)이 답합니다</strong> — LER 2.0을 넘는 회사는 사람 수를 늘리든 줄이든 회복률 차이가 3.7%p였지만, 그 아래인 회사는 줄이는 순간 회복률이 최대 30.4%p 떨어졌습니다.
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
                <strong>우리 회사는 지금<br/>사람을 줄여도 되는 상태일까요?</strong>
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
