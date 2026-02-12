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
                  <span className="desktop-title">성장한 18%가<br />가장 먼저 한 것</span>
                  <span className="mobile-title">성장한 18%가<br />가장 먼저 한 것</span>
                </strong>
              </h1>
              <p className="report-subtitle" style={{ textAlign: 'center', marginBottom: '2.5rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                392개 커머스 데이터 × 우리 회사 한도로 만드는,<br />
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
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              <div style={{ fontSize: '1.25rem', lineHeight: '2', color: '#333', fontWeight: '400' }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  리포트에서 공식은 확인하셨습니다.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  공헌이익률 <strong style={{ color: '#1a1a1a' }}>30%</strong>.
                  인당 매출 <strong style={{ color: '#1a1a1a' }}>3.5억</strong>.
                  <br />효율이 유지되는 범위 내에서 투자.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  그런데 한 가지가 남아 있습니다.
                </p>
                <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a1a1a', lineHeight: '1.6' }}>
                  &ldquo;우리 회사 숫자로 보면,<br />
                  지금 뭘 먼저 해야 하는가.&rdquo;
                </p>
                <p style={{ marginTop: '1.5rem' }}>
                  이 웨비나는 그 답을 <strong className="gradient-text">우리 회사 한도 기준으로</strong> 보여드립니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 웨비나 확인 사항 섹션 */}
        <section className="report-section report-section-recommendations">
          <div className="report-container">
            <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '3rem' }}>이 웨비나에서 확인하실 것</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
              {/* 카드 1 */}
              <div className="feature-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div className="report-recommendation-digit">1</div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#1a1a1a' }}>매출 구간별, 성장한 기업이<br />가장 먼저 한 것</h3>
                </div>
                <p style={{ fontSize: '0.9375rem', lineHeight: '1.7', color: '#555' }}>
                  10억 미만 / 10~30억 / 30~100억 / 100억+<br /><br />
                  같은 구간에서 성장한 기업과 쇠퇴한 기업의 첫 번째 의사결정이 달랐습니다. 리포트에 담지 못한 구간별 실행 데이터를 공개합니다.
                </p>
              </div>
              {/* 카드 2 */}
              <div className="feature-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div className="report-recommendation-digit">2</div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#1a1a1a' }}>우리 회사 한도로 만드는<br />실행 시나리오</h3>
                </div>
                <p style={{ fontSize: '0.9375rem', lineHeight: '1.7', color: '#555' }}>
                  사전에 산출된 한도를 기준으로, 광고비에 집중할 때 vs 매입에 집중할 때 3개월 후 현금 흐름이 어떻게 달라지는지. 내 숫자로 확인합니다.
                </p>
              </div>
              {/* 카드 3 */}
              <div className="feature-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div className="report-recommendation-digit">3</div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#1a1a1a' }}>실제 커머스 기업의<br />Before/After</h3>
                </div>
                <p style={{ fontSize: '0.9375rem', lineHeight: '1.7', color: '#555' }}>
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
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '1rem' }}>맞춤 시나리오를 준비합니다</h2>
              <p style={{ fontSize: '1.0625rem', color: '#555', marginBottom: '3rem', lineHeight: '1.6' }}>
                이 웨비나는 참석자 전원에게 매출 구간 × 한도 기반의<br />
                맞춤 실행 시나리오를 제공합니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '520px', margin: '0 auto' }}>
                {/* Step 1 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: '#fff', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                  <div style={{ flexShrink: 0, width: '3rem', height: '3rem', borderRadius: '50%', background: 'linear-gradient(135deg, #5BC500, #4a9f00)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '1.125rem' }}>1</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '700', color: '#1a1a1a', marginBottom: '0.25rem' }}>웨비나 신청</div>
                    <div style={{ fontSize: '0.875rem', color: '#777' }}>아래 버튼에서 간단히 신청</div>
                  </div>
                </div>
                {/* Arrow */}
                <div style={{ textAlign: 'center', color: '#ccc', fontSize: '1.5rem' }}>↓</div>
                {/* Step 2 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: '#fff', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                  <div style={{ flexShrink: 0, width: '3rem', height: '3rem', borderRadius: '50%', background: 'linear-gradient(135deg, #5BC500, #4a9f00)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '1.125rem' }}>2</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '700', color: '#1a1a1a', marginBottom: '0.25rem' }}>오픈채팅방에서 카드 신청 + 한도 산출</div>
                    <div style={{ fontSize: '0.875rem', color: '#777' }}>한도 산출 무료, 사용 의무 없음</div>
                  </div>
                </div>
                {/* Arrow */}
                <div style={{ textAlign: 'center', color: '#ccc', fontSize: '1.5rem' }}>↓</div>
                {/* Step 3 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: '#fff', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '2px solid #5BC500' }}>
                  <div style={{ flexShrink: 0, width: '3rem', height: '3rem', borderRadius: '50%', background: 'linear-gradient(135deg, #5BC500, #4a9f00)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '1.125rem' }}>3</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '700', color: '#1a1a1a', marginBottom: '0.25rem' }}>2/26 웨비나에서 맞춤 시나리오 확인</div>
                    <div style={{ fontSize: '0.875rem', color: '#777' }}>내 한도 기반 실행 플랜 제공</div>
                  </div>
                </div>
              </div>
              <button onClick={openModal} className="report-button-primary" style={{ marginTop: '3rem' }}>
                웨비나 신청하기
              </button>
            </div>
          </div>
        </section>

        {/* 신뢰 섹션 */}
        <section className="report-section" style={{ background: '#ffffff' }}>
          <div className="report-container">
            <div style={{ textAlign: 'center' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '1rem' }}>392개 기업을 분석한 팀이,<br />이번엔 우리 회사를 봅니다.</h2>
              <p style={{ fontSize: '1.0625rem', color: '#777', marginBottom: '2.5rem' }}>3,500개+ 기업이 고위드와 함께 성장하고 있습니다</p>
              {/* 고객 로고 플레이스홀더 */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', opacity: 0.4, marginBottom: '1rem' }}>
                {['Partner A', 'Partner B', 'Partner C', 'Partner D', 'Partner E'].map((name) => (
                  <div key={name} style={{ width: '120px', height: '48px', background: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#999' }}>
                    {name}
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.75rem', color: '#bbb' }}>* 실제 고객 로고로 교체 필요</p>
            </div>
          </div>
        </section>

        {/* 최종 CTA 섹션 */}
        <section className="report-section report-section-cta">
          <div className="report-container">
            <div className="report-cta-content">
              <p style={{ fontSize: '1.0625rem', color: '#777', margin: '0 0 0.5rem 0' }}>
                리포트가 진단이었다면, 웨비나는 처방입니다.
              </p>
              <h3 className="report-h3">
                <strong>2월 26일, 내 한도로 만드는<br />실행 플랜을 확인하세요.</strong>
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
