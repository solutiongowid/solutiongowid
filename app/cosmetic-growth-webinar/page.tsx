'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function CosmeticGrowthWebinarPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="report-page" style={{ background: '#111111', color: '#ffffff' }}>
        {/* 네비게이션 */}
        <nav className="report-nav" style={{ background: 'rgba(17, 17, 17, 0.95)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="report-container">
            <div className="report-nav-content">
              <a href="https://gowid.com" className="report-brand" target="_blank" rel="noopener noreferrer">
                <Image src="/Group 626579.png" alt="GOWID" width={84} height={28} priority />
              </a>
              <button className="report-nav-button" onClick={openModal} style={{ background: '#5CDB5C', color: '#111' }}>
                무료 웨비나 신청하기
              </button>
            </div>
          </div>
        </nav>

        {/* 히어로 섹션 - 썸네일 */}
        <header className="report-header" style={{ background: '#111111', padding: '8rem 0 5rem' }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <span className="badge" style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem', background: 'rgba(92, 219, 92, 0.1)', color: '#5CDB5C' }}>3월 19일 (목) 오후 4시 | 온라인 웨비나</span>
              </div>
              <h1 className="report-h1" style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#fff' }}>
                <strong>
                  고속 성장 코스메틱<br />브랜드의 성공 포뮬러
                </strong>
              </h1>
              <p className="report-subtitle" style={{ textAlign: 'center', marginBottom: '2.5rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', color: '#b0b0b0', fontStyle: 'italic', whiteSpace: 'nowrap' }}>
                1~3월, 해봤으니 감이 왔다. 26년 전략을 해부하고, 진짜 되는 곳에 집중하자
              </p>
              <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Image
                  src="/cosmetic-webinar-thumbnail.png"
                  alt="고속 성장 코스메틱 브랜드의 성공 포뮬러 - GoWid x 인덴트코퍼레이션 웨비나"
                  width={1200}
                  height={630}
                  priority
                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '1rem' }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* 도입부 - Pain Point */}
        <section className="report-section" style={{ background: '#1a1a1a', padding: '5rem 0' }}>
          <div className="report-container">
            <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
              <h2 className="report-h2" style={{ color: '#fff', textAlign: 'center', marginBottom: '1.5rem' }}>행사 소개</h2>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#5CDB5C', lineHeight: '1.45', marginBottom: '2.5rem', whiteSpace: 'nowrap' }}>
                &ldquo;매출은 올랐는데, 왜 남는 게 없을까요?&rdquo;
              </h2>
              <p style={{ fontSize: '1.0625rem', color: '#fff', lineHeight: '1.9', marginBottom: '1.5rem' }}>
                광고 최적화, 멀티 채널 입점, 신제품 사이클 가속 -<br />
                공식대로 했는데 체감 수익이 줄어든<br />
                코스메틱 브랜드가 늘고 있습니다.
              </p>
              <p style={{ fontSize: '1.0625rem', color: '#fff', lineHeight: '1.9', marginBottom: '1.5rem' }}>
                광고비가 매출보다 빠르게 증가하고, 히트 SKU에<br />
                프로모션이 몰리며 마진이 눌리고,<br />
                채널 확장 후 오히려 현금이 빠듯해진 구조.
              </p>
              <p style={{ fontSize: '1.0625rem', color: '#fff', lineHeight: '1.9' }}>
                고위드와 인덴트코퍼레이션과 함께<br />
                &lsquo;성장처럼 보이는 구조적 왜곡&rsquo;을 짚고,<br />
                26년에 진짜 되는 전략에 집중하세요.
              </p>
            </div>
          </div>
        </section>

        {/* 이런 분들께 추천합니다 */}
        <section className="report-section" style={{ background: '#111111' }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '1rem', color: '#fff', wordBreak: 'keep-all' }}>이런 분들께 추천합니다</h2>
              <p style={{ fontSize: '1rem', color: '#888', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                아래에 해당하신다면, 이 웨비나가 답이 됩니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '600px', margin: '0 auto' }}>
                {[
                  <>매출은 성장하는데 <strong>실제 이익이 줄어드는 느낌</strong>을<br />받고 있는 코스메틱 브랜드 대표</>,
                  <>올리브영·쿠팡·자사몰 등 <strong>멀티 채널 운영 중</strong><br />채널별 실제 수익성을 점검하고 싶은 경영진</>,
                  <><strong>히트 상품 의존, 프로모션 반복</strong> 패턴에서 벗어나<br />지속 가능한 성장 전략을 찾는 마케팅 리더</>,
                  <>광고비 선집행·선매입으로 <strong>현금 흐름이 빠듯해진</strong><br />재무·운영 담당자</>,
                  <>26년 마케팅 포트폴리오와 수익 구조를<br /><strong>동시에 재설계</strong>하고 싶은 코스메틱 브랜드 실무진</>,
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: 'rgba(92, 219, 92, 0.06)', border: '1px solid rgba(92, 219, 92, 0.15)', borderRadius: '0.75rem', padding: '1rem 1.25rem', textAlign: 'left' }}>
                    <div style={{ flexShrink: 0, width: '1.5rem', height: '1.5rem', background: '#5CDB5C', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg viewBox="0 0 14 14" fill="none" width="14" height="14"><path d="M3 7L6 10L11 4" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <p style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1.2rem)', lineHeight: '1.6', color: '#fff', margin: 0 }}>{text}</p>
                  </div>
                ))}
              </div>

              <button onClick={openModal} className="report-button-primary" style={{ marginTop: '2.5rem', background: '#5CDB5C', color: '#111', boxShadow: '0 4px 20px rgba(92, 219, 92, 0.3)' }}>
                무료 웨비나 신청하기
              </button>
            </div>
          </div>
        </section>

        {/* 발표 기업 소개 */}
        <section className="report-section" style={{ background: '#111111' }}>
          <div className="report-container">
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '2rem', color: '#fff' }}>발표 기업 소개</h2>
              <div className="cosmetic-company-grid">
                <div style={{ background: '#1a1a1a', borderRadius: '0.75rem', padding: '2rem 1.5rem' }}>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <Image src="/Group 626579.png" alt="GOWID" width={84} height={28} />
                  </div>
                  <p style={{ fontSize: '0.9375rem', lineHeight: '1.7', color: '#b0b0b0' }}>
                    커머스 기업 전용 법인카드·자금 운영 솔루션을 제공하는 핀테크 기업. 387개 커머스 기업의 실제 재무 데이터를 분석하며, 성장하면서도 돈이 남는 구조를 만들 수 있도록 돕습니다.
                  </p>
                </div>
                <div style={{ background: '#1a1a1a', borderRadius: '0.75rem', padding: '2rem 1.5rem' }}>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <Image src="/indent-logo.png" alt="indent" width={100} height={28} style={{ objectFit: 'contain' }} />
                  </div>
                  <p style={{ fontSize: '0.9375rem', lineHeight: '1.7', color: '#b0b0b0' }}>
                    B2B 세일즈 자동화 플랫폼 &lsquo;리캐치&rsquo;를 운영하는 마케팅 테크 기업. 다수의 코스메틱 브랜드와 협업하며 축적한 데이터 기반 마케팅 전략 인사이트를 공유합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 프로그램 & 세션 상세 */}
        <section className="report-section" style={{ background: '#1a1a1a' }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '3rem', color: '#fff' }}>프로그램 안내</h2>

              {/* 타임테이블 - PC */}
              <div className="cosmetic-timetable-pc" style={{ marginBottom: '3rem' }}>
                {/* 헤더 */}
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 160px', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid #333' }}>
                  <div style={{ fontSize: '1rem', color: '#888' }}>시간</div>
                  <div style={{ fontSize: '1rem', color: '#888' }}>세션</div>
                  <div style={{ fontSize: '1rem', color: '#888' }}>연사</div>
                </div>
                {[
                  { time: '16:00 ~ 16:05', title: '오프닝', speaker: '연사 전원' },
                  {
                    time: '16:05 ~ 16:20', session: 'Session 01', title: '매출은 올랐는데, 왜 남는 게 없는가?', speakerName: '문미성 리드', speakerCompany: '고위드',
                    details: ['광고비가 매출보다 빠르게 증가하는 구간 진단', '히트 SKU에 프로모션이 몰리며 마진이 눌리는 구조', '채널 확장 후 오히려 현금이 빠듯해진 실제 사례'],
                    highlight: "'성장처럼 보이는 구조적 왜곡'을 커머스 기업의 실제 데이터로 점검",
                  },
                  {
                    time: '16:20 ~ 16:40', session: 'Session 02', title: 'SKU·채널·현금 숫자로 보는 진짜 수익', speakerName: '문미성 리드', speakerCompany: '고위드',
                    details: ['올리브영 프로모션 후 남는 돈, 쿠팡 로켓그로스 실제 마진', '히트 상품이 사실은 적자인 경우 — 공헌이익 재산출', '선매입·광고비 선집행, 채널별 정산 시차가 겹치는 현금 압박'],
                    highlight: '수익과 현금 흐름을 함께 재설계하는 프레임워크 제시',
                  },
                  {
                    time: '16:40 ~ 17:00', session: 'Session 03', title: "잘되는 코스메틱 기업의 '판관비'에 숨은 디테일", speakerName: '조효식 팀장', speakerCompany: '인덴트코퍼레이션',
                    details: ['K뷰티 = 인플루언서 마케팅, 하지만 구체적인 방법론은 모두 다르다.', '성장세가 높은 곳들이 비용을 배분하는 방식은?', '스몰브랜드의 숨은 과제, 채용문제의 해결책은 AI 에이전트'],
                  },
                  { time: '17:00 ~ 17:10', title: '실무 Q&A 및 패널토크', speaker: '연사 전원' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 160px', gap: '1rem', padding: '1.25rem 0', borderBottom: '1px solid #2a2a2a', alignItems: item.details ? 'start' : 'center' }}>
                    <div style={{ fontSize: '1.0625rem', fontWeight: '600', color: '#fff' }}>{item.time}</div>
                    <div>
                      {item.session && <div style={{ fontSize: '1rem', fontWeight: '700', color: '#5CDB5C', marginBottom: '0.25rem' }}>{item.session}</div>}
                      <div style={{ fontSize: '1.0625rem', color: '#fff', marginBottom: item.details ? '0.75rem' : '0' }}>{item.title}</div>
                      {item.details && (
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {item.details.map((d, j) => (
                            <li key={j} style={{ fontSize: '0.9375rem', lineHeight: '1.6', color: '#999', paddingLeft: '0.875rem', position: 'relative', marginBottom: '0.25rem' }}>
                              <span style={{ position: 'absolute', left: 0, top: '0.5rem', width: '0.3rem', height: '0.3rem', background: '#5CDB5C', borderRadius: '50%', display: 'block' }} />
                              {d}
                            </li>
                          ))}
                          {item.highlight && (
                            <li style={{ fontSize: '0.9375rem', lineHeight: '1.6', color: '#999', paddingLeft: '0.875rem', position: 'relative' }}>
                              <span style={{ position: 'absolute', left: 0, top: '0.5rem', width: '0.3rem', height: '0.3rem', background: '#5CDB5C', borderRadius: '50%', display: 'block' }} />
                              {item.highlight}
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                    <div>
                      {item.speaker ? (
                        <div style={{ fontSize: '1.0625rem', color: '#999' }}>{item.speaker}</div>
                      ) : (
                        <>
                          <div style={{ fontSize: '1.0625rem', fontWeight: '600', color: '#5CDB5C' }}>{item.speakerName}</div>
                          <div style={{ fontSize: '1rem', color: '#999' }}>{item.speakerCompany}</div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* 타임테이블 - 모바일 */}
              <div className="cosmetic-timetable-mobile" style={{ marginBottom: '3rem' }}>
                {[
                  { time: '16:00 ~ 16:05', title: '오프닝', speaker: '연사 전원' },
                  {
                    time: '16:05 ~ 16:20', session: 'Session 01', title: '매출은 올랐는데, 왜 남는 게 없는가?', speakerName: '문미성 리드', speakerCompany: '고위드',
                    details: ['광고비가 매출보다 빠르게 증가하는 구간 진단', '히트 SKU에 프로모션이 몰리며 마진이 눌리는 구조', '채널 확장 후 오히려 현금이 빠듯해진 실제 사례'],
                    highlight: "'성장처럼 보이는 구조적 왜곡'을 커머스 기업의 실제 데이터로 점검",
                  },
                  {
                    time: '16:20 ~ 16:40', session: 'Session 02', title: 'SKU·채널·현금 숫자로 보는 진짜 수익', speakerName: '문미성 리드', speakerCompany: '고위드',
                    details: ['올리브영 프로모션 후 남는 돈, 쿠팡 로켓그로스 실제 마진', '히트 상품이 사실은 적자인 경우 — 공헌이익 재산출', '선매입·광고비 선집행, 채널별 정산 시차가 겹치는 현금 압박'],
                    highlight: '수익과 현금 흐름을 함께 재설계하는 프레임워크 제시',
                  },
                  {
                    time: '16:40 ~ 17:00', session: 'Session 03', title: "잘되는 코스메틱 기업의 '판관비'에 숨은 디테일", speakerName: '조효식 팀장', speakerCompany: '인덴트코퍼레이션',
                    details: ['K뷰티 = 인플루언서 마케팅, 하지만 구체적인 방법론은 모두 다르다.', '성장세가 높은 곳들이 비용을 배분하는 방식은?', '스몰브랜드의 숨은 과제, 채용문제의 해결책은 AI 에이전트'],
                  },
                  { time: '17:00 ~ 17:10', title: '실무 Q&A 및 패널토크', speaker: '연사 전원' },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '1.25rem 0', borderBottom: '1px solid #2a2a2a' }}>
                    <div style={{ fontSize: '0.8125rem', color: '#888', marginBottom: '0.25rem' }}>{item.time}</div>
                    {item.session && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
                        <span style={{ fontSize: '0.8125rem', fontWeight: '700', color: '#5CDB5C' }}>{item.session}</span>
                        <span style={{ fontSize: '0.8125rem', color: '#999' }}><span style={{ color: '#5CDB5C', fontWeight: '600' }}>{item.speakerName}</span> · {item.speakerCompany}</span>
                      </div>
                    )}
                    <div style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#fff', marginBottom: item.details ? '0.75rem' : '0' }}>{item.title}</div>
                    {item.details && (
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {item.details.map((d, j) => (
                          <li key={j} style={{ fontSize: '0.875rem', lineHeight: '1.6', color: '#999', paddingLeft: '0.75rem', position: 'relative', marginBottom: '0.2rem' }}>
                            <span style={{ position: 'absolute', left: 0, top: '0.4rem', width: '0.25rem', height: '0.25rem', background: '#5CDB5C', borderRadius: '50%', display: 'block' }} />
                            {d}
                          </li>
                        ))}
                        {item.highlight && (
                          <li style={{ fontSize: '0.875rem', lineHeight: '1.6', color: '#999', paddingLeft: '0.75rem', position: 'relative' }}>
                            <span style={{ position: 'absolute', left: 0, top: '0.4rem', width: '0.25rem', height: '0.25rem', background: '#5CDB5C', borderRadius: '50%', display: 'block' }} />
                            {item.highlight}
                          </li>
                        )}
                      </ul>
                    )}
                    {!item.details && item.speaker && <div style={{ fontSize: '0.8125rem', color: '#999', marginTop: '0.125rem' }}>{item.speaker}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 참석자 혜택 */}
        <section className="report-section" style={{ background: '#111111' }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '2rem', color: '#fff' }}>참석자 혜택</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { icon: '📄', title: '커머스 벤치마크\n리포트 2026', desc: 'PDF 무료 제공' },
                  { icon: '💳', title: '고위드 법인카드\n한도 사전 조회', desc: '1:1 자금 운영 상담권' },
                  { icon: '🔍', title: '마케팅 전략 진단\n무료 상담권', desc: '인덴트 제공' },
                  { icon: '📥', title: '웨비나 발표 자료\nPDF 제공', desc: '당일 참석자 대상' },
                ].map((b, i) => (
                  <div key={i} style={{ background: '#222', border: '1px solid #2a2a2a', borderRadius: '0.75rem', padding: '1.5rem 1.25rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{b.icon}</div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#fff', marginBottom: '0.375rem', lineHeight: '1.4', whiteSpace: 'pre-line' }}>{b.title}</h4>
                    <p style={{ fontSize: '0.875rem', color: '#888', margin: 0 }}>{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="report-section" style={{ background: '#1a1a1a' }}>
          <div className="report-container">
            <div style={{ maxWidth: '640px', margin: '0 auto' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '2rem', color: '#fff' }}>자주 묻는 질문</h2>
              {[
                { q: '웨비나는 어디서 진행되나요?', a: 'Zoom 온라인으로 진행됩니다. 신청 완료 시 이메일로 참여 링크가 발송됩니다.' },
                { q: '참여 비용이 있나요?', a: '완전 무료입니다.' },
                { q: '참석하지 못하면 녹화본을 받을 수 있나요?', a: '네, 신청하신 분들께 웨비나 종료 후 녹화본을 이메일로 발송해 드립니다.' },
                { q: '어떤 업종에 적합한 웨비나인가요?', a: '코스메틱·뷰티 브랜드를 중심으로 구성했지만, 커머스 기업이라면 업종 불문하고 도움이 됩니다.' },
                { q: '사전 질문은 어떻게 활용되나요?', a: '신청 시 남겨주신 질문을 분석하여 웨비나 인트로에서 주요 관심사를 먼저 다루고, Q&A 시간에 집중 답변해 드립니다.' },
              ].map((faq, i) => (
                <div key={i} style={{ borderBottom: '1px solid #333' }}>
                  <button
                    onClick={() => toggleFaq(i)}
                    style={{
                      width: '100%', background: 'none', border: 'none', color: '#fff',
                      fontSize: '1rem', fontWeight: '600', textAlign: 'left', padding: '1.5rem 0',
                      cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      fontFamily: 'inherit', transition: 'color 0.2s',
                    }}
                  >
                    {faq.q}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginLeft: '1rem', transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      <path d="M4 6L8 10L12 6" stroke="#888" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div style={{ maxHeight: openFaq === i ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                    <p style={{ padding: '0 0 1.5rem', fontSize: '0.9375rem', lineHeight: '1.7', color: '#b0b0b0' }}>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 최종 CTA (= report-section-cta 패턴) */}
        <section className="report-section report-section-cta" style={{ background: '#111111', textAlign: 'center' }}>
          <div className="report-container">
            <div className="report-cta-content">
              <p style={{ fontSize: '1rem', color: '#888', margin: '0 0 0.5rem 0' }}>
                수익 구조 × 마케팅 전략,<br /> 실전 데이터로 답을 드립니다.
              </p>
              <h3 className="report-h3" style={{ color: '#fff' }}>
                <strong>성장을 원하는 커머스라면,<br /> 이번 웨비나를 놓치지마세요.</strong>
              </h3>
              <button onClick={openModal} className="report-button-cta" style={{ background: '#5CDB5C', color: '#111', boxShadow: '0 4px 20px rgba(92, 219, 92, 0.3)' }}>
                무료 웨비나 신청하기
              </button>
            </div>
          </div>
        </section>

        {/* 유의사항 */}
        <section style={{ background: '#111111', padding: '3rem 0', borderTop: '1px solid #2a2a2a' }}>
          <div className="report-container">
            <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'left' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#666', marginBottom: '1rem' }}>유의사항</p>
              {[
                '본 행사는 온라인(Zoom)에서 진행되며, 참가 확정자분들께 접속 링크를 안내드립니다.',
                '참가비가 없는 무료 행사입니다.',
                '웨비나 종료 후 녹화본을 신청자 전원에게 발송해 드립니다.',
                '참가자 모집은 조기 마감될 수 있습니다.',
                '실시간 Q&A 시간에 자유롭게 질문하고 연사의 답변을 받으실 수 있습니다.',
                '참석자 혜택은 광고성 정보 수신 및 제3자 제공 동의를 한 당일 참석자에게 제공합니다.',
              ].map((notice, i) => (
                <p key={i} style={{ fontSize: '0.8125rem', lineHeight: '1.6', color: '#555', marginBottom: '0.375rem' }}>
                  <span>· </span>
                  {notice}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="report-footer" style={{ background: '#0a0a0a', borderTop: '1px solid #1a1a1a' }}>
          <div className="report-container">
            <div className="report-footer-content">
              <div>GoWid x 인덴트코퍼레이션 &copy; 2026</div>
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

      {/* 리캐치 폼 모달 */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px', padding: 0 }}>
            <button className="modal-close" onClick={closeModal} aria-label="닫기">✕</button>
            <div style={{ padding: '1.5rem 1.5rem 0' }}>
              <h2 className="modal-title">무료 웨비나 신청</h2>
              <p className="modal-description">3월 19일(목) 오후 4시 | 고속 성장 코스메틱 브랜드의 성공 포뮬러</p>
            </div>
            <div style={{ padding: '1rem 0 0', minHeight: '500px' }}>
              <iframe
                src="https://growth.recatch.cc/workflows/yrpgficjik"
                style={{ width: '100%', minHeight: '500px', border: 'none' }}
                title="웨비나 신청 폼"
                allow="forms"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}