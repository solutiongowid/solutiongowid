'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ReportPreviewCarousel from './ReportPreviewCarousel';
import SurveyForm from './SurveyForm';

export default function TechStartupReportPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [utmParams, setUtmParams] = useState({ utm_source: '', utm_medium: '', utm_campaign: '' });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
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
              <button
                onClick={openModal}
                className="report-nav-button"
              >
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
                  <span className="desktop-title">테크 스타트업<br/>벤치마크 리포트 2026</span>
                  <span className="mobile-title">테크 스타트업<br/>벤치마크 리포트 2026</span>
                </strong>
              </h1>
              <div className="report-subtitle">
                695개 테크 스타트업의 지출 데이터에서 답을 찾다
              </div>
              <button
                onClick={openModal}
                className="report-button-primary"
              >
                무료 다운로드
              </button>
            </div>
            <div className="report-header-image-wrapper">
              <Image
                src="/villagebaby_thumb_blog_02 1.png"
                alt="테크 스타트업 벤치마크 리포트 2026"
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
                  <div>비용 대비 매출 비율(BM)을 개선하고 싶은 테크 스타트업 대표</div>
                </div>
                <div className="report-recommendation-item">
                  <div className="report-recommendation-digit">2</div>
                  <div>런웨이와 지출 구조 벤치마크가 궁금한 CTO·CFO</div>
                </div>
                <div className="report-recommendation-item">
                  <div className="report-recommendation-digit">3</div>
                  <div>인건비·외주비 배분 최적화를 고민하는 대표</div>
                </div>
                <div className="report-recommendation-item">
                  <div className="report-recommendation-digit">4</div>
                  <div>데이터 기반으로 투자 유치 타이밍을 정하고 싶은 대표</div>
                </div>
              </div>
            </div>
            <div className="report-recommendation-right">
              <ReportPreviewCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* 리포트 소개 섹션 */}
      <section className="report-section report-section-feature">
        <div className="report-container">
          <div className="report-feature-content">
            <h2 className="report-h2 for-feature">이 리포트가<br/>세상에 나온 이유</h2>
            <div className="report-feature-description">
              <p>
                고위드는 3천 개 이상의 스타트업과 함께하며 <br className="desktop-br"/>
                법인카드와 지출관리 서비스를 제공하고 있습니다.
              </p>
              <p>
                이 과정에서 비용이 매출의 몇 배인지, 현금이 언제 바닥나는지, 성장 기업과 쇠퇴 기업의 지출 구조가 어떻게 다른지를 직접 확인해왔습니다.
              </p>
              <p>
                성장한 기업과 쇠퇴한 기업을 가른 건 지출 총액이 아니었습니다. 어디에 쓰느냐였습니다.
              </p>
              <p>
                같은 1인당 월 지출 555만원을 쓰더라도 누군가는 성장하고, 누군가는 쇠퇴합니다.
              </p>
              <p>
                그 차이가 어디서 오는지, 어떤 순서로 움직여야 하는지를 695개 테크 스타트업의 실제 데이터로 정리했습니다.
              </p>
              <p>
                BM을 어떻게 통제해야 할지, 런웨이를 어떻게 확보해야 할지 오늘도 현장에서 치열하게 고민하고 계신 테크 스타트업 대표님께 이 리포트가 판단의 기준이 되길 바랍니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 고위드 소개 섹션 */}
      <section className="report-section report-section-about">
        <div className="report-container">
          <div className="report-feature-content">
            <h2 className="report-h2 for-feature">고위드 소개</h2>
            <div className="report-feature-description">
              <p>
                고위드는 성장 기업에 최적의 혜택을 연결하고 효율적인 비용관리 솔루션을 제공하는 핀테크 서비스입니다.<br/>
                3천 개 이상의 스타트업과 함께하며 법인카드 발급부터 지출 관리, 세무 정산까지 원스톱으로 지원합니다.
              </p>
              <p>
                특히 AI·테크 스타트업을 위한 최대 83일 결제 기한 연장, 높은 한도, 최고 수준의 페이백 혜택으로<br/>
                현금 흐름 개선에 실질적인 도움을 드리고 있습니다.
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
              <strong>테크 스타트업의 성장 기준,<br/>지금 바로 확인하세요</strong>
            </h3>
            <button
              onClick={openModal}
              className="report-button-cta"
            >
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
