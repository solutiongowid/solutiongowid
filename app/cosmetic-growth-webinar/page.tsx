'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function CosmeticGrowthWebinarPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToApply = () => {
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
  };

  const faqs = [
    { q: '웨비나는 어디서 진행되나요?', a: 'Zoom 온라인으로 진행됩니다. 신청 완료 시 이메일로 참여 링크가 발송됩니다.' },
    { q: '참여 비용이 있나요?', a: '완전 무료입니다.' },
    { q: '참석하지 못하면 녹화본을 받을 수 있나요?', a: '네, 신청하신 분들께 웨비나 종료 후 녹화본을 이메일로 발송해 드립니다.' },
    { q: '어떤 업종에 적합한 웨비나인가요?', a: '코스메틱·뷰티 브랜드를 중심으로 구성했지만, 커머스 기업이라면 업종 불문하고 도움이 됩니다.' },
    { q: '사전 질문은 어떻게 활용되나요?', a: '신청 시 남겨주신 질문을 분석하여 웨비나 인트로에서 주요 관심사를 먼저 다루고, Q&A 시간에 집중 답변해 드립니다.' },
  ];

  const sessions = [
    {
      num: '01',
      title: '매출은 올랐는데, 왜 남는 게 없는가?',
      speaker: '문미성 리드 · GoWid 고객전략팀',
      points: [
        '광고비가 매출보다 빠르게 증가하는 구간 진단',
        '히트 SKU에 프로모션이 몰리며 마진이 눌리는 구조',
        '채널 확장 후 오히려 현금이 빠듯해진 실제 사례',
      ],
      highlight: "'성장처럼 보이는 구조적 왜곡'을 커머스 기업의 실제 데이터로 점검",
    },
    {
      num: '02',
      title: 'SKU·채널·현금 — 숫자로 보는 진짜 수익의 디테일',
      speaker: '문미성 리드 · GoWid 고객전략팀',
      points: [
        '올리브영 프로모션 후 남는 돈, 쿠팡 로켓그로스의 실제 마진',
        '히트 상품이 사실은 적자인 경우 — 공헌이익 재산출',
        '선생산·선매입, 광고비 선집행, 채널별 정산 시차가 겹치는 현금 압박 구간',
      ],
      highlight: '수익과 현금 흐름을 함께 재설계하는 프레임워크 제시',
    },
    {
      num: '03',
      title: '마케팅 전략이 수익 구조를 결정한다',
      speaker: '조효식 팀장 · 인덴트코퍼레이션 마케팅팀',
      points: [
        '신제품 런칭 중심 전략, UGC·인플루언서 확산, 프로모션 반복, 히트 SKU 의존 — 각 패턴 분석',
        'ROAS가 높아도 이익이 줄어드는 구간은 어디인가',
        '어떤 전략이 구조적으로 건강한지',
      ],
      highlight: '26년에 집중해야 할 마케팅 포트폴리오 제시',
    },
    {
      num: '04',
      title: '오래 가는 코스메틱 브랜드는 무엇이 다른가',
      speaker: '조효식 팀장 · 인덴트코퍼레이션 마케팅팀',
      points: [
        '단기 매출 vs 장기 브랜드 — 전략의 결정적 차이',
        '코스메틱 브랜드 대표가 지금 점검해야 할 체크리스트',
      ],
      highlight: '26년 하반기를 준비하는 실행 가이드',
    },
  ];

  const timetable = [
    { time: '16:00 – 16:05', title: '오프닝' },
    { time: '16:05 – 16:20', session: 'Session 01', title: '매출은 올랐는데, 왜 남는 게 없는가?', speaker: '문미성 리드 · GoWid' },
    { time: '16:20 – 16:40', session: 'Session 02', title: 'SKU·채널·현금 — 숫자로 보는 진짜 수익의 디테일', speaker: '문미성 리드 · GoWid' },
    { time: '16:40 – 17:00', session: 'Session 03', title: '마케팅 전략이 수익 구조를 결정한다', speaker: '조효식 팀장 · 인덴트코퍼레이션' },
    { time: '17:00 – 17:15', session: 'Session 04', title: '오래 가는 코스메틱 브랜드는 무엇이 다른가', speaker: '조효식 팀장 · 인덴트코퍼레이션' },
    { time: '17:15 – 17:40', title: '실무 Q&A 및 클로징' },
  ];

  return (
    <>
      <style jsx global>{`
        .cw-page {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
          background: #111111;
          color: #ffffff;
        }
        .cw-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(17, 17, 17, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          z-index: 1000;
          padding: 1rem 0;
        }
        .cw-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        @media (max-width: 768px) {
          .cw-container { padding: 0 1.5rem; }
        }
        .cw-nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .cw-nav-button {
          background: #5CDB5C;
          color: #111111;
          border: none;
          padding: 0.75rem 1.75rem;
          border-radius: 12px;
          font-size: 0.9375rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
        }
        .cw-nav-button:hover {
          background: #4CC94C;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(92, 219, 92, 0.3);
        }
        .cw-hero {
          padding-top: 60px;
          background: #1a1a1a;
        }
        .cw-hero img {
          width: 100%;
          height: auto;
          display: block;
        }
        .cw-section {
          padding: 5rem 0;
        }
        @media (max-width: 768px) {
          .cw-section { padding: 3rem 0; }
        }
        .cw-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #5CDB5C;
          letter-spacing: 1px;
          margin-bottom: 0.75rem;
        }
        .cw-h2 {
          font-size: 2.5rem;
          line-height: 1.2;
          color: #ffffff;
          font-weight: 700;
          margin: 0 0 1.5rem 0;
        }
        @media (max-width: 768px) {
          .cw-h2 { font-size: 1.75rem; margin: 0 0 1.25rem 0; }
        }
        .cw-pain-quote {
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.45;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 768px) {
          .cw-pain-quote { font-size: 1.5rem; }
        }
        .cw-desc {
          font-size: 1.0625rem;
          line-height: 1.75;
          color: #b0b0b0;
          margin-bottom: 2rem;
        }
        .cw-pain-item {
          background: #222222;
          border-left: 3px solid #5CDB5C;
          padding: 1.25rem 1.5rem;
          border-radius: 0 0.5rem 0.5rem 0;
          font-size: 1rem;
          line-height: 1.6;
          color: #d0d0d0;
          margin-bottom: 0.875rem;
        }
        .cw-pain-item strong { color: #ffffff; }
        .cw-target-item {
          display: flex;
          align-items: flex-start;
          gap: 0.875rem;
          padding: 1.125rem 1.25rem;
          background: #1a1a1a;
          border-radius: 0.625rem;
          margin-bottom: 0.75rem;
        }
        .cw-check {
          flex-shrink: 0;
          width: 1.5rem;
          height: 1.5rem;
          background: #5CDB5C;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 0.125rem;
        }
        .cw-target-text {
          font-size: 1rem;
          line-height: 1.6;
          color: #d0d0d0;
        }
        .cw-target-text strong { color: #ffffff; }
        .cw-tt-item {
          display: flex;
          gap: 1.25rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid #2a2a2a;
          align-items: flex-start;
        }
        .cw-tt-item:last-child { border-bottom: none; }
        .cw-tt-time {
          flex-shrink: 0;
          width: 130px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #5CDB5C;
          padding-top: 0.125rem;
        }
        @media (max-width: 768px) {
          .cw-tt-time { width: 100px; font-size: 0.8125rem; }
        }
        .cw-tt-session {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #888888;
          margin-bottom: 0.25rem;
        }
        .cw-tt-title {
          font-size: 1.0625rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }
        @media (max-width: 768px) {
          .cw-tt-title { font-size: 0.9375rem; }
        }
        .cw-tt-speaker {
          font-size: 0.875rem;
          color: #888888;
        }
        .cw-session-card {
          background: #1a1a1a;
          border-radius: 0.75rem;
          padding: 2rem;
          margin-bottom: 1.25rem;
        }
        @media (max-width: 768px) {
          .cw-session-card { padding: 1.5rem 1.25rem; }
        }
        .cw-session-num {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          color: #111111;
          background: #5CDB5C;
          padding: 0.25rem 0.75rem;
          border-radius: 1.25rem;
          margin-bottom: 0.875rem;
        }
        .cw-session-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          line-height: 1.4;
        }
        .cw-session-speaker {
          font-size: 0.875rem;
          color: #5CDB5C;
          margin-bottom: 1.125rem;
        }
        .cw-session-points {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .cw-session-points li {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: #b0b0b0;
          padding-left: 1.125rem;
          position: relative;
          margin-bottom: 0.625rem;
        }
        .cw-session-points li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.625rem;
          width: 0.375rem;
          height: 0.375rem;
          background: #5CDB5C;
          border-radius: 50%;
        }
        .cw-session-points li strong { color: #ffffff; }
        .cw-cta-section {
          text-align: center;
          padding: 3.5rem 2rem;
        }
        .cw-cta-button {
          display: inline-block;
          background: #5CDB5C;
          color: #111111;
          font-size: 1.125rem;
          font-weight: 700;
          padding: 1.125rem 3.5rem;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(92, 219, 92, 0.3);
        }
        .cw-cta-button:hover {
          background: #4CC94C;
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(92, 219, 92, 0.4);
        }
        .cw-speaker-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .cw-speaker-grid { grid-template-columns: 1fr; }
        }
        .cw-speaker-card {
          background: #222222;
          border-radius: 0.75rem;
          padding: 2rem 1.5rem;
          text-align: center;
        }
        .cw-speaker-avatar {
          width: 6rem;
          height: 6rem;
          border-radius: 50%;
          background: #333333;
          margin: 0 auto 1.125rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.25rem;
          color: #5CDB5C;
          font-weight: 800;
        }
        .cw-speaker-name {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 0.25rem 0;
        }
        .cw-speaker-role {
          font-size: 0.875rem;
          color: #888888;
          margin: 0 0 0.375rem 0;
        }
        .cw-speaker-company {
          font-size: 0.875rem;
          font-weight: 600;
          color: #5CDB5C;
          margin: 0;
        }
        .cw-benefit-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .cw-benefit-grid { grid-template-columns: 1fr; }
        }
        .cw-benefit-card {
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 0.75rem;
          padding: 1.75rem 1.375rem;
        }
        .cw-benefit-icon {
          font-size: 1.75rem;
          margin-bottom: 0.875rem;
        }
        .cw-benefit-title {
          font-size: 1rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          line-height: 1.4;
          white-space: pre-line;
        }
        .cw-benefit-desc {
          font-size: 0.875rem;
          color: #888888;
          line-height: 1.5;
          margin: 0;
        }
        .cw-company-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .cw-company-grid { grid-template-columns: 1fr; }
        }
        .cw-company-card {
          background: #222222;
          border-radius: 0.75rem;
          padding: 2rem 1.5rem;
        }
        .cw-company-logo {
          font-size: 1.375rem;
          font-weight: 800;
          margin: 0 0 0.875rem 0;
        }
        .cw-company-desc {
          font-size: 0.9375rem;
          line-height: 1.7;
          color: #b0b0b0;
          margin: 0;
        }
        .cw-faq-item {
          border-bottom: 1px solid #2a2a2a;
        }
        .cw-faq-question {
          width: 100%;
          background: none;
          border: none;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          text-align: left;
          padding: 1.5rem 0;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: inherit;
          transition: color 0.2s;
        }
        .cw-faq-question:hover { color: #5CDB5C; }
        .cw-faq-arrow {
          flex-shrink: 0;
          transition: transform 0.2s;
          margin-left: 1rem;
        }
        .cw-faq-open .cw-faq-arrow { transform: rotate(180deg); }
        .cw-faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        .cw-faq-open .cw-faq-answer { max-height: 200px; }
        .cw-faq-answer-inner {
          padding: 0 0 1.5rem;
          font-size: 0.9375rem;
          line-height: 1.7;
          color: #b0b0b0;
        }
        .cw-form-embed {
          background: #ffffff;
          border-radius: 0.75rem;
          overflow: hidden;
          min-height: 700px;
        }
        .cw-notice-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .cw-notice-list li {
          font-size: 0.875rem;
          line-height: 1.6;
          color: #666666;
          padding-left: 0.875rem;
          position: relative;
          margin-bottom: 0.5rem;
        }
        .cw-notice-list li::before {
          content: '·';
          position: absolute;
          left: 0;
          color: #666666;
        }
        .cw-footer {
          background: #111111;
          border-top: 1px solid #1a1a1a;
          padding: 2rem 0;
          text-align: center;
        }
        .cw-footer-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          font-size: 0.875rem;
          color: #555555;
        }
        .cw-footer-link {
          color: #666;
          text-decoration: none;
          transition: color 0.3s;
        }
        .cw-footer-link:hover { color: #5CDB5C; }
      `}</style>

      <div className="cw-page">
        {/* 네비게이션 */}
        <nav className="cw-nav">
          <div className="cw-container">
            <div className="cw-nav-content">
              <a href="https://gowid.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                <Image src="/Group 626579.png" alt="GOWID" width={84} height={28} priority />
              </a>
              <button className="cw-nav-button" onClick={scrollToApply}>
                무료 신청하기
              </button>
            </div>
          </div>
        </nav>

        {/* 히어로 썸네일 */}
        <header className="cw-hero">
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Image
              src="/cosmetic-webinar-thumbnail.png"
              alt="고속 성장 코스메틱 브랜드의 성공 포뮬러 - GoWid x 인덴트코퍼레이션 웨비나"
              width={1200}
              height={630}
              priority
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </header>

        {/* CTA 1 */}
        <div className="cw-cta-section" style={{ background: '#111111' }}>
          <button className="cw-cta-button" onClick={scrollToApply}>무료 참가 신청하기</button>
          <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: '#888888' }}>2026. 3. 19(목) 오후 4시 · 온라인(Zoom) · 무료</p>
        </div>

        {/* Pain Point */}
        <section className="cw-section" style={{ background: '#1a1a1a' }}>
          <div className="cw-container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <p className="cw-label">PROBLEM</p>
              <p className="cw-pain-quote">
                매출은 올랐는데,<br /><span style={{ color: '#5CDB5C' }}>왜 남는 게 없을까요?</span>
              </p>
              <p className="cw-desc">
                광고 최적화, 멀티 채널 입점, 신제품 사이클 가속 — 공식대로 했는데 체감 수익이 줄어든 코스메틱 브랜드가 늘고 있습니다.
              </p>
              <div className="cw-pain-item">
                <strong>광고비가 매출보다 빠르게 증가</strong>하고 있는데, 줄이면 매출이 빠질까 걱정입니다.
              </div>
              <div className="cw-pain-item">
                <strong>히트 SKU에 프로모션이 몰리며 마진이 눌리고</strong>, 정작 수익에 기여하는 상품이 뭔지 모호합니다.
              </div>
              <div className="cw-pain-item">
                <strong>채널 확장 후 오히려 현금이 빠듯해지는 구조</strong> — 흑자인데 통장 잔고는 늘 빠듯합니다.
              </div>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="cw-section" style={{ background: '#111111' }}>
          <div className="cw-container">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <p className="cw-label">SOLUTION</p>
              <h2 className="cw-h2" style={{ textAlign: 'center' }}>
                &lsquo;성장처럼 보이는 구조적 왜곡&rsquo;을 짚고,<br />26년에 진짜 집중해야 할 전략을 해부합니다.
              </h2>
              <p className="cw-desc" style={{ maxWidth: '640px', margin: '0 auto' }}>
                고위드와 인덴트코퍼레이션이 <strong style={{ color: '#fff' }}>수익 구조 × 마케팅 전략</strong> 양쪽에서 실전 데이터를 기반으로 답을 드립니다.
              </p>
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="cw-section" style={{ background: '#111111', paddingTop: 0 }}>
          <div className="cw-container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <p className="cw-label">WHO SHOULD ATTEND</p>
              <h2 className="cw-h2">이런 분들께 추천합니다</h2>
              {[
                <>매출은 성장하는데 <strong>실제 이익이 줄어드는 느낌</strong>을 받고 있는 코스메틱 브랜드 대표</>,
                <>올리브영·쿠팡·자사몰 등 <strong>멀티 채널 운영 중</strong> 채널별 실제 수익성을 점검하고 싶은 경영진</>,
                <><strong>히트 상품 의존, 프로모션 반복</strong> 패턴에서 벗어나 지속 가능한 성장 전략을 찾는 마케팅 리더</>,
                <>광고비 선집행·선매입으로 <strong>현금 흐름이 빠듯해진</strong> 재무·운영 담당자</>,
                <>26년 마케팅 포트폴리오와 수익 구조를 <strong>동시에 재설계</strong>하고 싶은 코스메틱 브랜드 실무진</>,
              ].map((text, i) => (
                <div key={i} className="cw-target-item">
                  <div className="cw-check">
                    <svg viewBox="0 0 14 14" fill="none" width="14" height="14"><path d="M3 7L6 10L11 4" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <p className="cw-target-text">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timetable */}
        <section className="cw-section" style={{ background: '#1a1a1a' }}>
          <div className="cw-container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <p className="cw-label">TIMETABLE</p>
              <h2 className="cw-h2">프로그램 안내</h2>
              <div>
                {timetable.map((item, i) => (
                  <div key={i} className="cw-tt-item">
                    <div className="cw-tt-time">{item.time}</div>
                    <div>
                      {item.session && <div className="cw-tt-session">{item.session}</div>}
                      <div className="cw-tt-title">{item.title}</div>
                      {item.speaker && <div className="cw-tt-speaker">{item.speaker}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Session Detail */}
        <section className="cw-section" style={{ background: '#111111' }}>
          <div className="cw-container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <p className="cw-label">SESSIONS</p>
              <h2 className="cw-h2">세션 상세 안내</h2>
              {sessions.map((s, i) => (
                <div key={i} className="cw-session-card">
                  <span className="cw-session-num">SESSION {s.num}</span>
                  <h3 className="cw-session-title">{s.title}</h3>
                  <p className="cw-session-speaker">{s.speaker}</p>
                  <ul className="cw-session-points">
                    {s.points.map((point, j) => (
                      <li key={j}>{point}</li>
                    ))}
                    <li><strong>{s.highlight}</strong></li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA 2 - Mid */}
        <div className="cw-cta-section" style={{ background: '#1a1a1a' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p style={{ fontSize: '1.375rem', fontWeight: '700', marginBottom: '0.375rem' }}>수익 구조 × 마케팅 전략,</p>
            <p style={{ fontSize: '1.375rem', fontWeight: '700', marginBottom: '1.5rem' }}>실전 데이터로 답을 드립니다.</p>
            <button className="cw-cta-button" onClick={scrollToApply}>무료 참가 신청하기</button>
          </div>
        </div>

        {/* Speaker */}
        <section className="cw-section" style={{ background: '#1a1a1a' }}>
          <div className="cw-container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <p className="cw-label">SPEAKERS</p>
              <h2 className="cw-h2">연사 소개</h2>
              <div className="cw-speaker-grid">
                {[
                  { name: '문미성', role: '리드 · 고객전략팀', company: 'GoWid', initial: '문' },
                  { name: '조효식', role: '팀장 · 마케팅팀', company: '인덴트코퍼레이션', initial: '조' },
                ].map((s, i) => (
                  <div key={i} className="cw-speaker-card">
                    <div className="cw-speaker-avatar">{s.initial}</div>
                    <h3 className="cw-speaker-name">{s.name}</h3>
                    <p className="cw-speaker-role">{s.role}</p>
                    <p className="cw-speaker-company">{s.company}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="cw-section" style={{ background: '#111111' }}>
          <div className="cw-container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <p className="cw-label">BENEFITS</p>
              <h2 className="cw-h2">참석자 혜택</h2>
              <div className="cw-benefit-grid">
                {[
                  { icon: '📄', title: '커머스 벤치마크\n리포트 2026', desc: 'PDF 무료 제공' },
                  { icon: '💳', title: '고위드 법인카드\n한도 사전 조회', desc: '1:1 자금 운영 상담권' },
                  { icon: '🔍', title: '마케팅 전략 진단\n1:1 무료 상담권', desc: '인덴트코퍼레이션 제공' },
                  { icon: '📥', title: '웨비나 발표 자료\nPDF 제공', desc: '당일 참석자 대상' },
                ].map((b, i) => (
                  <div key={i} className="cw-benefit-card">
                    <div className="cw-benefit-icon">{b.icon}</div>
                    <h4 className="cw-benefit-title">{b.title}</h4>
                    <p className="cw-benefit-desc">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Company */}
        <section className="cw-section" style={{ background: '#1a1a1a' }}>
          <div className="cw-container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <p className="cw-label">HOSTED BY</p>
              <h2 className="cw-h2">주최 기업 소개</h2>
              <div className="cw-company-grid">
                <div className="cw-company-card">
                  <p className="cw-company-logo" style={{ color: '#5CDB5C' }}>GoWid</p>
                  <p className="cw-company-desc">
                    커머스 기업 전용 법인카드·자금 운영 솔루션을 제공하는 핀테크 기업. 387개 커머스 기업의 실제 재무 데이터를 분석하며, 성장하면서도 돈이 남는 구조를 만들 수 있도록 돕습니다.
                  </p>
                </div>
                <div className="cw-company-card">
                  <p className="cw-company-logo">indent</p>
                  <p className="cw-company-desc">
                    B2B 세일즈 자동화 플랫폼 &lsquo;리캐치&rsquo;를 운영하는 마케팅 테크 기업. 다수의 코스메틱 브랜드와 협업하며 축적한 데이터 기반 마케팅 전략 인사이트를 공유합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="cw-section" style={{ background: '#111111' }}>
          <div className="cw-container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <p className="cw-label">FAQ</p>
              <h2 className="cw-h2">자주 묻는 질문</h2>
              <div>
                {faqs.map((faq, i) => (
                  <div key={i} className={`cw-faq-item ${openFaq === i ? 'cw-faq-open' : ''}`}>
                    <button className="cw-faq-question" onClick={() => toggleFaq(i)}>
                      {faq.q}
                      <svg className="cw-faq-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6L8 10L12 6" stroke="#888" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                    <div className="cw-faq-answer">
                      <p className="cw-faq-answer-inner">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Apply Form */}
        <section className="cw-section" id="apply" style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #111111 100%)', paddingBottom: '5rem' }}>
          <div className="cw-container">
            <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
              <h2 className="cw-h2" style={{ textAlign: 'center' }}>지금 무료로 신청하세요</h2>
              <p style={{ fontSize: '1rem', color: '#888888', marginBottom: '2.25rem' }}>
                2026. 3. 19(목) 오후 4시 · 참가자 모집은 조기 마감될 수 있습니다.
              </p>
              <div className="cw-form-embed">
                <iframe
                  src="https://growth.recatch.cc/workflows/yrpgficjik"
                  style={{ width: '100%', minHeight: '700px', border: 'none' }}
                  title="웨비나 신청 폼"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Notice */}
        <section style={{ background: '#111111', padding: '3rem 0', borderTop: '1px solid #2a2a2a' }}>
          <div className="cw-container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <p style={{ fontSize: '0.9375rem', fontWeight: '700', color: '#888888', marginBottom: '1rem' }}>유의사항</p>
              <ul className="cw-notice-list">
                <li>본 행사는 온라인(Zoom)에서 진행되며, 참가 확정자분들께 접속 링크를 안내드립니다.</li>
                <li>참가비가 없는 무료 행사입니다.</li>
                <li>웨비나 종료 후 녹화본을 신청자 전원에게 발송해 드립니다.</li>
                <li>참가자 모집은 조기 마감될 수 있습니다.</li>
                <li>실시간 Q&A 시간에 자유롭게 질문하고 연사의 답변을 받으실 수 있습니다.</li>
                <li>참석자 혜택은 광고성 정보 수신 및 제3자 제공 동의를 한 당일 참석자에게 제공합니다.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="cw-footer">
          <div className="cw-container">
            <div className="cw-footer-content">
              <div>GoWid x 인덴트코퍼레이션 &copy; 2026</div>
              <div style={{ color: '#444' }}>|</div>
              <a
                href="https://www.notion.so/teamgowid/2026-ver-2e98db64698e8086ac85e01f29c32587"
                target="_blank"
                rel="noopener noreferrer"
                className="cw-footer-link"
              >
                개인정보 처리방침
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}