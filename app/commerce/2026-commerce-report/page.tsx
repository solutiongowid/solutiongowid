'use client';

import { useState } from 'react';
import Image from 'next/image';
import DownloadModal from './DownloadModal';
import ReportPreviewCarousel from './ReportPreviewCarousel';

export default function CommerceReportPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                    <span className="desktop-title">커머스 벤치마크 리포트 2026</span>
                    <span className="mobile-title">커머스 벤치마크<br/>리포트 2026</span>
                  </strong>
                </h1>
                <div className="report-subtitle">
                  탑티어 커머스 기업들의 성장 공식,<br/>
                  387개 커머스 기업의 재무 데이터에서 답을 찾다
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
                  src="/image 50.png" 
                  alt="커머스 벤치마크 리포트 2026"
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
                    <div>광고비 대비 매출 회수 기간을 개선하고 싶은 커머스 대표</div>
                  </div>
                  <div className="report-recommendation-item">
                    <div className="report-recommendation-digit">2</div>
                    <div>매출 규모별 공헌이익 벤치마크가 궁금한 대표</div>
                  </div>
                  <div className="report-recommendation-item">
                    <div className="report-recommendation-digit">3</div>
                    <div>인원 증가 시 재무 구조 변화를 예측하고 싶은 대표</div>
                  </div>
                  <div className="report-recommendation-item">
                    <div className="report-recommendation-digit">4</div>
                    <div>데이터 기반으로 투자 우선순위를 정하고 싶은 대표</div>
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
                  이 과정에서 광고비가 언제 집행되어 매출 회수까지 얼마나 걸리는지, 매출 규모마다 공헌이익이 어떻게 변하는지, 인원이 늘 때 재무 구조가 어떻게 달라지는지를 직접 확인해왔습니다.
                </p>
                <p>
                  성장한 기업과 쇠퇴한 기업을 가른 건 매출 규모가 아니었습니다. 효율성이었습니다.
                </p>
                <p>
                  같은 투자를 해도 누군가는 성장하고, 누군가는 적자가 커집니다.
                </p>
                <p>
                  그 차이가 어디서 오는지, 어떤 순서로 움직여야 하는지를 데이터 기반으로 정리했습니다.
                </p>
                <p>
                  어디에 투자를 해야할지, 무엇을 먼저 고치는 게 좋을지 오늘도 현장에서 치열하게 고민하고 계신 커머스 기업의 대표님께 이 리포트가 판단의 기준이 되길 바랍니다.
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
                  특히 커머스 기업을 위한 최대 83일 결제 기한 연장, 높은 한도, 최고 수준의 페이백 혜택으로<br/>
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
                <strong>커머스 기업의 성장 기준,<br/>지금 바로 확인하세요</strong>
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

      {/* 다운로드 모달 */}
      <DownloadModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
