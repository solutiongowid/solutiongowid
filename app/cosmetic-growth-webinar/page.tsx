'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './page.module.css';

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
        { text: "'성장처럼 보이는 구조적 왜곡'을 커머스 기업의 실제 데이터로 점검", bold: true },
      ],
    },
    {
      num: '02',
      title: 'SKU·채널·현금 — 숫자로 보는 진짜 수익의 디테일',
      speaker: '문미성 리드 · GoWid 고객전략팀',
      points: [
        '올리브영 프로모션 후 남는 돈, 쿠팡 로켓그로스의 실제 마진',
        '히트 상품이 사실은 적자인 경우 — 공헌이익 재산출',
        '선생산·선매입, 광고비 선집행, 채널별 정산 시차가 겹치는 현금 압박 구간',
        { text: '수익과 현금 흐름을 함께 재설계하는 프레임워크 제시', bold: true },
      ],
    },
    {
      num: '03',
      title: '마케팅 전략이 수익 구조를 결정한다',
      speaker: '조효식 팀장 · 인덴트코퍼레이션 마케팅팀',
      points: [
        '신제품 런칭 중심 전략, UGC·인플루언서 확산, 프로모션 반복, 히트 SKU 의존 — 각 패턴 분석',
        'ROAS가 높아도 이익이 줄어드는 구간은 어디인가',
        '어떤 전략이 구조적으로 건강한지',
        { text: '26년에 집중해야 할 마케팅 포트폴리오 제시', bold: true },
      ],
    },
    {
      num: '04',
      title: '오래 가는 코스메틱 브랜드는 무엇이 다른가',
      speaker: '조효식 팀장 · 인덴트코퍼레이션 마케팅팀',
      points: [
        '단기 매출 vs 장기 브랜드 — 전략의 결정적 차이',
        '코스메틱 브랜드 대표가 지금 점검해야 할 체크리스트',
        { text: '26년 하반기를 준비하는 실행 가이드', bold: true },
      ],
    },
  ];

  return (
    <div className={styles.page}>
      {/* Hero Thumbnail */}
      <section className={styles.hero}>
        <Image
          src="/cosmetic-webinar-thumbnail.png"
          alt="고속 성장 코스메틱 브랜드의 성공 포뮬러 - GoWid x 인덴트코퍼레이션 웨비나"
          width={1200}
          height={630}
          priority
          className={styles.heroImg}
        />
      </section>

      {/* CTA 1 */}
      <section className={styles.ctaSection}>
        <button onClick={scrollToApply} className={styles.ctaButton}>무료 참가 신청하기</button>
        <p className={styles.ctaSub}>2026. 3. 19(목) 오후 4시 · 온라인(Zoom) · 무료</p>
      </section>

      {/* Pain Point */}
      <section className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.container}>
          <p className={styles.sectionLabel}>PROBLEM</p>
          <p className={styles.painQuote}>
            매출은 올랐는데,<br /><span className={styles.green}>왜 남는 게 없을까요?</span>
          </p>
          <p className={styles.sectionDesc}>
            광고 최적화, 멀티 채널 입점, 신제품 사이클 가속 — 공식대로 했는데 체감 수익이 줄어든 코스메틱 브랜드가 늘고 있습니다.
          </p>
          <div className={styles.painList}>
            <div className={styles.painItem}>
              <strong>광고비가 매출보다 빠르게 증가</strong>하고 있는데, 줄이면 매출이 빠질까 걱정입니다.
            </div>
            <div className={styles.painItem}>
              <strong>히트 SKU에 프로모션이 몰리며 마진이 눌리고</strong>, 정작 수익에 기여하는 상품이 뭔지 모호합니다.
            </div>
            <div className={styles.painItem}>
              <strong>채널 확장 후 오히려 현금이 빠듯해지는 구조</strong> — 흑자인데 통장 잔고는 늘 빠듯합니다.
            </div>
          </div>
        </div>
      </section>

      {/* Solution Intro */}
      <section className={`${styles.section} ${styles.blackBg}`}>
        <div className={styles.container}>
          <p className={styles.sectionLabel}>SOLUTION</p>
          <h2 className={styles.sectionTitle}>
            &lsquo;성장처럼 보이는 구조적 왜곡&rsquo;을 짚고,<br />26년에 진짜 집중해야 할 전략을 해부합니다.
          </h2>
          <p className={styles.sectionDesc}>
            고위드와 인덴트코퍼레이션이 <strong style={{ color: '#fff' }}>수익 구조 × 마케팅 전략</strong> 양쪽에서 실전 데이터를 기반으로 답을 드립니다.
          </p>
        </div>
      </section>

      {/* Target Audience */}
      <section className={`${styles.section} ${styles.blackBg}`}>
        <div className={styles.container}>
          <p className={styles.sectionLabel}>WHO SHOULD ATTEND</p>
          <h2 className={styles.sectionTitle}>이런 분들께 추천합니다</h2>
          <div className={styles.targetGrid}>
            {[
              <>매출은 성장하는데 <strong>실제 이익이 줄어드는 느낌</strong>을 받고 있는 코스메틱 브랜드 대표</>,
              <>올리브영·쿠팡·자사몰 등 <strong>멀티 채널 운영 중</strong> 채널별 실제 수익성을 점검하고 싶은 경영진</>,
              <><strong>히트 상품 의존, 프로모션 반복</strong> 패턴에서 벗어나 지속 가능한 성장 전략을 찾는 마케팅 리더</>,
              <>광고비 선집행·선매입으로 <strong>현금 흐름이 빠듯해진</strong> 재무·운영 담당자</>,
              <>26년 마케팅 포트폴리오와 수익 구조를 <strong>동시에 재설계</strong>하고 싶은 코스메틱 브랜드 실무진</>,
            ].map((text, i) => (
              <div key={i} className={styles.targetItem}>
                <div className={styles.targetCheck}>
                  <svg viewBox="0 0 14 14" fill="none" width="14" height="14"><path d="M3 7L6 10L11 4" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <p className={styles.targetText}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timetable */}
      <section className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.container}>
          <p className={styles.sectionLabel}>TIMETABLE</p>
          <h2 className={styles.sectionTitle}>프로그램 안내</h2>
          <div className={styles.timetable}>
            {[
              { time: '16:00 – 16:05', title: '오프닝' },
              { time: '16:05 – 16:20', session: 'Session 01', title: '매출은 올랐는데, 왜 남는 게 없는가?', speaker: '문미성 리드 · GoWid 고객전략팀' },
              { time: '16:20 – 16:40', session: 'Session 02', title: 'SKU·채널·현금 — 숫자로 보는 진짜 수익의 디테일', speaker: '문미성 리드 · GoWid 고객전략팀' },
              { time: '16:40 – 17:00', session: 'Session 03', title: '마케팅 전략이 수익 구조를 결정한다', speaker: '조효식 팀장 · 인덴트코퍼레이션 마케팅팀' },
              { time: '17:00 – 17:15', session: 'Session 04', title: '오래 가는 코스메틱 브랜드는 무엇이 다른가', speaker: '조효식 팀장 · 인덴트코퍼레이션 마케팅팀' },
              { time: '17:15 – 17:40', title: '실무 Q&A 및 클로징' },
            ].map((item, i) => (
              <div key={i} className={styles.ttItem}>
                <div className={styles.ttTime}>{item.time}</div>
                <div className={styles.ttContent}>
                  {item.session && <div className={styles.ttSession}>{item.session}</div>}
                  <div className={styles.ttTitle}>{item.title}</div>
                  {item.speaker && <div className={styles.ttSpeaker}>{item.speaker}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Session Detail */}
      <section className={`${styles.section} ${styles.blackBg}`}>
        <div className={styles.container}>
          <p className={styles.sectionLabel}>SESSIONS</p>
          <h2 className={styles.sectionTitle}>세션 상세 안내</h2>
          {sessions.map((s, i) => (
            <div key={i} className={styles.sessionCard}>
              <span className={styles.sessionNum}>SESSION {s.num}</span>
              <h3 className={styles.sessionTitle}>{s.title}</h3>
              <p className={styles.sessionSpeaker}>{s.speaker}</p>
              <ul className={styles.sessionPoints}>
                {s.points.map((point, j) => (
                  <li key={j}>
                    {typeof point === 'string' ? point : <strong>{point.text}</strong>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA 2 */}
      <section className={styles.ctaSectionMid}>
        <p className={styles.ctaMidText}>수익 구조 × 마케팅 전략,</p>
        <p className={styles.ctaMidText}>실전 데이터로 답을 드립니다.</p>
        <button onClick={scrollToApply} className={styles.ctaButton} style={{ marginTop: '24px' }}>무료 참가 신청하기</button>
      </section>

      {/* Speaker */}
      <section className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.container}>
          <p className={styles.sectionLabel}>SPEAKERS</p>
          <h2 className={styles.sectionTitle}>연사 소개</h2>
          <div className={styles.speakerGrid}>
            {[
              { name: '문미성', role: '리드 · 고객전략팀', company: 'GoWid', initial: '문' },
              { name: '조효식', role: '팀장 · 마케팅팀', company: '인덴트코퍼레이션', initial: '조' },
            ].map((s, i) => (
              <div key={i} className={styles.speakerCard}>
                <div className={styles.speakerAvatar}>{s.initial}</div>
                <h3 className={styles.speakerName}>{s.name}</h3>
                <p className={styles.speakerRole}>{s.role}</p>
                <p className={styles.speakerCompany}>{s.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className={`${styles.section} ${styles.blackBg}`}>
        <div className={styles.container}>
          <p className={styles.sectionLabel}>BENEFITS</p>
          <h2 className={styles.sectionTitle}>참석자 혜택</h2>
          <div className={styles.benefitGrid}>
            {[
              { icon: '📄', title: '커머스 벤치마크\n리포트 2026', desc: 'PDF 무료 제공' },
              { icon: '💳', title: '고위드 법인카드\n한도 사전 조회', desc: '1:1 자금 운영 상담권' },
              { icon: '🔍', title: '마케팅 전략 진단\n1:1 무료 상담권', desc: '인덴트코퍼레이션 제공' },
              { icon: '📥', title: '웨비나 발표 자료\nPDF 제공', desc: '당일 참석자 대상' },
            ].map((b, i) => (
              <div key={i} className={styles.benefitCard}>
                <div className={styles.benefitIcon}>{b.icon}</div>
                <h4 className={styles.benefitTitle}>{b.title}</h4>
                <p className={styles.benefitDesc}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company */}
      <section className={`${styles.section} ${styles.darkBg}`}>
        <div className={styles.container}>
          <p className={styles.sectionLabel}>HOSTED BY</p>
          <h2 className={styles.sectionTitle}>주최 기업 소개</h2>
          <div className={styles.companyGrid}>
            <div className={styles.companyCard}>
              <p className={`${styles.companyLogo} ${styles.green}`}>GoWid</p>
              <p className={styles.companyDesc}>
                커머스 기업 전용 법인카드·자금 운영 솔루션을 제공하는 핀테크 기업. 387개 커머스 기업의 실제 재무 데이터를 분석하며, 성장하면서도 돈이 남는 구조를 만들 수 있도록 돕습니다.
              </p>
            </div>
            <div className={styles.companyCard}>
              <p className={styles.companyLogo}>indent</p>
              <p className={styles.companyDesc}>
                B2B 세일즈 자동화 플랫폼 &lsquo;리캐치&rsquo;를 운영하는 마케팅 테크 기업. 다수의 코스메틱 브랜드와 협업하며 축적한 데이터 기반 마케팅 전략 인사이트를 공유합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${styles.section} ${styles.blackBg}`}>
        <div className={styles.container}>
          <p className={styles.sectionLabel}>FAQ</p>
          <h2 className={styles.sectionTitle}>자주 묻는 질문</h2>
          <div>
            {faqs.map((faq, i) => (
              <div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ''}`}>
                <button className={styles.faqQuestion} onClick={() => toggleFaq(i)}>
                  {faq.q}
                  <svg className={styles.faqArrow} width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6L8 10L12 6" stroke="#888" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                <div className={styles.faqAnswer}>
                  <p className={styles.faqAnswerInner}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Form */}
      <section className={styles.formSection} id="apply">
        <div className={styles.formWrapper}>
          <h2 className={styles.formTitle}>지금 무료로 신청하세요</h2>
          <p className={styles.formSub}>2026. 3. 19(목) 오후 4시 · 참가자 모집은 조기 마감될 수 있습니다.</p>
          <div className={styles.formEmbed}>
            <iframe
              src="https://growth.recatch.cc/workflows/yrpgficjik"
              style={{ width: '100%', minHeight: '700px', border: 'none' }}
              title="웨비나 신청 폼"
            />
          </div>
        </div>
      </section>

      {/* Notice */}
      <section className={styles.noticeSection}>
        <div className={styles.container}>
          <p className={styles.noticeTitle}>유의사항</p>
          <ul className={styles.noticeList}>
            <li>본 행사는 온라인(Zoom)에서 진행되며, 참가 확정자분들께 접속 링크를 안내드립니다.</li>
            <li>참가비가 없는 무료 행사입니다.</li>
            <li>웨비나 종료 후 녹화본을 신청자 전원에게 발송해 드립니다.</li>
            <li>참가자 모집은 조기 마감될 수 있습니다.</li>
            <li>실시간 Q&A 시간에 자유롭게 질문하고 연사의 답변을 받으실 수 있습니다.</li>
            <li>참석자 혜택은 광고성 정보 수신 및 제3자 제공 동의를 한 당일 참석자에게 제공합니다.</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>GoWid x 인덴트코퍼레이션 &copy; 2026</p>
      </footer>
    </div>
  );
}