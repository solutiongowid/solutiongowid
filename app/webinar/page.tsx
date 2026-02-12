'use client';

import { useState } from 'react';
import Image from 'next/image';
import WebinarForm from './WebinarForm';

export default function WebinarPage() {
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
                <Image src="/Group 626579.png" alt="GOWID" width={84} height={28} priority />
              </a>
              <button onClick={openModal} className="report-nav-button">
                웨비나 신청하기
              </button>
            </div>
          </div>
        </nav>

        {/* 히어로 섹션 */}
        <header className="report-header" style={{ background: 'linear-gradient(135deg, #f8fcf5 0%, #ffffff 50%, #f0fbe6 100%)' }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <span className="badge" style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem' }}>2월 26일 (목) 오후 X시 | 온라인 라이브</span>
              </div>
              <h1 className="report-h1" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <strong>
                  성장한 18%가<br />가장 먼저 한 것
                </strong>
              </h1>
              <p className="report-subtitle" style={{ textAlign: 'center', marginBottom: '2.5rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                392개 커머스 데이터 ×<br className="desktop-br" /> 우리 회사 한도로 만드는,<br />
                매출 구간별 실행 플랜
              </p>
              <button onClick={openModal} className="report-button-primary" style={{ alignSelf: 'center' }}>
                웨비나 신청하기
              </button>
            </div>
          </div>
        </header>

        {/* 도입부 섹션 */}
        <section className="report-section" style={{ background: '#ffffff' }}>
          <div className="report-container">
            <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
              {/* 상단 텍스트 */}
              <p style={{ fontSize: '1.125rem', color: '#555', marginBottom: '1rem', lineHeight: '1.8' }}>
                리포트에서 공식은 확인하셨습니다.
              </p>
              <p style={{ fontSize: '0.8125rem', color: '#999', marginBottom: '2rem', lineHeight: '1.6' }}>
                💡 혹시 아직 리포트를 확인하지 못하셨다면?{' '}
                <a href="https://www.solutiongowid.com/commerce/2026-commerce-report-v2" target="_blank" rel="noopener noreferrer" style={{ color: '#5BC500', textDecoration: 'underline', fontWeight: '500' }}>
                  2026 벤치마크 리포트 다운하기
                </a>
              </p>

              {/* 핵심 지표 카드 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ background: '#f8fcf5', borderRadius: '1rem', padding: '1.5rem 1rem', border: '1px solid rgba(91, 197, 0, 0.15)' }}>
                  <div style={{ fontSize: '0.8125rem', color: '#777', marginBottom: '0.375rem' }}>공헌이익률</div>
                  <div className="gradient-text" style={{ fontSize: '2rem', fontWeight: '800', lineHeight: '1' }}>30%</div>
                </div>
                <div style={{ background: '#f8fcf5', borderRadius: '1rem', padding: '1.5rem 1rem', border: '1px solid rgba(91, 197, 0, 0.15)' }}>
                  <div style={{ fontSize: '0.8125rem', color: '#777', marginBottom: '0.375rem' }}>인당 매출</div>
                  <div className="gradient-text" style={{ fontSize: '2rem', fontWeight: '800', lineHeight: '1' }}>3.5억</div>
                </div>
              </div>
              <p style={{ fontSize: '0.9375rem', color: '#999', marginBottom: '2.5rem' }}>
                효율이 유지되는 범위 내에서 투자.
              </p>

              {/* 구분선 */}
              <div style={{ width: '40px', height: '2px', background: '#e0e0e0', margin: '0 auto 2.5rem' }} />

              {/* 질문 */}
              <p style={{ fontSize: '1rem', color: '#555', marginBottom: '1.5rem' }}>
                그런데 한 가지가 남아 있습니다.
              </p>
              <div style={{ background: '#fafafa', borderLeft: '3px solid #5BC500', borderRadius: '0 0.75rem 0.75rem 0', padding: '1.5rem 1.75rem', marginBottom: '2rem' }}>
                <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1a1a1a', lineHeight: '1.6', margin: 0 }}>
                  &ldquo;우리 회사 숫자로 보면,<br />
                  지금 뭘 먼저 해야 하는가.&rdquo;
                </p>
              </div>

              {/* 결론 */}
              <p style={{ fontSize: '1.0625rem', color: '#333', lineHeight: '1.8' }}>
                이 웨비나는 그 답을<br />
                <strong className="gradient-text" style={{ fontSize: '1.125rem' }}>우리 회사 한도 기준으로</strong> 보여드립니다.
              </p>
            </div>
          </div>
        </section>

        {/* 웨비나 확인 사항 섹션 */}
        <section className="report-section report-section-recommendations">
          <div className="report-container">
            <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '3rem', whiteSpace: 'nowrap' }}>이 웨비나에서 확인하실 것</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
              {/* 카드 1 */}
              <div className="feature-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div className="report-recommendation-digit">1</div>
                  <h3 style={{ fontSize: '1.0625rem', fontWeight: '700', color: '#1a1a1a', lineHeight: '1.5' }}>매출 구간별,<br />성장한 기업이 가장 먼저 한 것</h3>
                </div>
                <p style={{ fontSize: '0.875rem', lineHeight: '1.7', color: '#555' }}>
                  <span style={{ whiteSpace: 'nowrap' }}>10억 미만</span> / <span style={{ whiteSpace: 'nowrap' }}>10~30억</span> / <span style={{ whiteSpace: 'nowrap' }}>30~100억</span> / <span style={{ whiteSpace: 'nowrap' }}>100억+</span><br /><br />
                  같은 구간에서 성장한 기업과 쇠퇴한 기업의 첫 번째 의사결정이 달랐습니다. 리포트에 담지 못한 구간별 실행 데이터를 공개합니다.
                </p>
              </div>
              {/* 카드 2 */}
              <div className="feature-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div className="report-recommendation-digit">2</div>
                  <h3 style={{ fontSize: '1.0625rem', fontWeight: '700', color: '#1a1a1a', lineHeight: '1.5' }}>우리 회사 한도로 만드는<br />실행 시나리오</h3>
                </div>
                <p style={{ fontSize: '0.875rem', lineHeight: '1.7', color: '#555' }}>
                  사전에 산출된 한도를 기준으로, 광고비에 집중할 때 vs 매입에 집중할 때 3개월 후 현금 흐름이 어떻게 달라지는지. 내 숫자로 확인합니다.
                </p>
              </div>
              {/* 카드 3 */}
              <div className="feature-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div className="report-recommendation-digit">3</div>
                  <h3 style={{ fontSize: '1.0625rem', fontWeight: '700', color: '#1a1a1a', lineHeight: '1.5' }}>실제 커머스 기업의<br />Before/After</h3>
                </div>
                <p style={{ fontSize: '0.875rem', lineHeight: '1.7', color: '#555' }}>
                  같은 고민을 하다 실행에 옮긴 기업의 이야기. 어떤 상황에서 어떤 선택을 했고, 결과는 어땠는지. 수치로 보여드립니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 맞춤 시나리오 준비 섹션 */}
        <section className="report-section report-section-feature">
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '1rem', wordBreak: 'keep-all' }}>맞춤 시나리오를 준비합니다</h2>
              <p style={{ fontSize: '1rem', color: '#555', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                이 웨비나는 참석자 전원에게 매출 구간 × 한도 기반의<br />
                맞춤 실행 시나리오를 제공합니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '520px', margin: '0 auto' }}>
                {/* Step 1 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#fff', borderRadius: '1rem', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                  <div style={{ flexShrink: 0, width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'linear-gradient(135deg, #5BC500, #4a9f00)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '1rem' }}>1</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '0.9375rem', marginBottom: '0.125rem' }}>웨비나 신청</div>
                    <div style={{ fontSize: '0.8125rem', color: '#777' }}>아래 버튼에서 간단히 신청</div>
                  </div>
                </div>
                <div style={{ textAlign: 'center', color: '#ccc', fontSize: '1.25rem' }}>↓</div>
                {/* Step 2 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#fff', borderRadius: '1rem', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                  <div style={{ flexShrink: 0, width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'linear-gradient(135deg, #5BC500, #4a9f00)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '1rem' }}>2</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '0.9375rem', marginBottom: '0.125rem' }}>오픈채팅방에서 한도 산출<br />+ 카드 신청</div>
                    <div style={{ fontSize: '0.8125rem', color: '#777' }}>한도 산출 무료, 사용 의무 없음</div>
                  </div>
                </div>
                <div style={{ textAlign: 'center', color: '#ccc', fontSize: '1.25rem' }}>↓</div>
                {/* Step 3 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#fff', borderRadius: '1rem', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '2px solid #5BC500' }}>
                  <div style={{ flexShrink: 0, width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'linear-gradient(135deg, #5BC500, #4a9f00)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '1rem' }}>3</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '0.9375rem', marginBottom: '0.125rem' }}>2/26 웨비나에서<br />맞춤 시나리오 확인</div>
                    <div style={{ fontSize: '0.8125rem', color: '#777' }}>내 한도 기반 실행 플랜 제공</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 신뢰 섹션 */}
        <section className="report-section" style={{ background: '#ffffff' }}>
          <div className="report-container">
            <div style={{ textAlign: 'center' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '1.625rem' }}>392개 기업을 분석한 팀이,<br />이번엔 우리 회사를 봅니다.</h2>
              <p style={{ fontSize: '1rem', color: '#777', marginBottom: '2.5rem' }}>3,500개+ 기업이 고위드와 함께 성장하고 있습니다</p>
              <div className="webinar-logo-grid" style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap', alignItems: 'center', opacity: 0.7 }}>
                {[
                  { src: '/logo-dasique.png', alt: 'dasique' },
                  { src: '/logo-anua v2.png', alt: 'anua' },
                  { src: '/logo-elleven.png', alt: 'elleven' },
                  { src: '/logo-athome.png', alt: 'athome' },
                  { src: '/logo-egnis v2.png', alt: 'egnis' },
                  { src: '/logo-mynormal.png', alt: 'mynormal' },
                ].map((logo) => (
                  <div key={logo.alt} style={{ width: '100px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image src={logo.src} alt={logo.alt} width={100} height={32} style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '32px' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 최종 CTA 섹션 */}
        <section className="report-section report-section-cta">
          <div className="report-container">
            <div className="report-cta-content">
              <p style={{ fontSize: '1rem', color: '#777', margin: '0 0 0.5rem 0' }}>
                리포트가 진단이었다면,<br className="desktop-br" /> 웨비나는 처방입니다.
              </p>
              <h3 className="report-h3">
                <strong>2월 26일,<br className="desktop-br" /> 내 한도로 만드는<br />실행 플랜을 확인하세요.</strong>
              </h3>
              <button onClick={openModal} className="report-button-cta">
                웨비나 신청하기
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

      {/* 웨비나 신청 모달 */}
      <WebinarForm isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
