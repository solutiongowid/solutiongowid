'use client';

import { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';

export default function FoodFinanceLivePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [utmParams, setUtmParams] = useState({ utm_source: '', utm_medium: '', utm_campaign: '', utm_content: '', utm_term: '' });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
      utm_term: params.get('utm_term') || '',
    });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    department: '',
    position: '',
    annualRevenue: '',
    attendanceType: '',
    email: '',
    phone: '',
    question: '',
    agreePrivacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSubmitError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setSubmitError('');

    if (!formData.name.trim()) { setSubmitError('이름을 입력해주세요.'); return; }
    if (!formData.companyName.trim()) { setSubmitError('회사명을 입력해주세요.'); return; }
    if (!formData.department.trim()) { setSubmitError('부서를 입력해주세요.'); return; }
    if (!formData.position.trim()) { setSubmitError('직급을 입력해주세요.'); return; }
    if (!formData.annualRevenue) { setSubmitError('연매출을 선택해주세요.'); return; }
    if (!formData.attendanceType) { setSubmitError('온/오프라인 참석 방식을 선택해주세요.'); return; }
    if (!formData.email.trim()) { setSubmitError('회사 이메일을 입력해주세요.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { setSubmitError('올바른 이메일 형식을 입력해주세요.'); return; }
    if (!formData.phone.trim()) { setSubmitError('전화번호를 입력해주세요.'); return; }
    if (!formData.agreePrivacy) { setSubmitError('개인정보 처리방침 및 마케팅 수신 동의가 필요합니다.'); return; }

    setIsSubmitting(true);
    try {
      const submitData = {
        name: formData.name,
        companyName: formData.companyName,
        department: formData.department,
        position: formData.position,
        annualRevenue: formData.annualRevenue,
        attendanceType: formData.attendanceType,
        email: formData.email,
        phone: formData.phone,
        question: formData.question,
        agreePrivacy: formData.agreePrivacy,
        webinar_type: 'food-finance-live',
        ...Object.fromEntries(Object.entries(utmParams).filter(([, v]) => v)),
      };

      const response = await fetch('/api/corporate-card-webinar-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '제출에 실패했습니다.');

      window.location.href = '/event/food-finance-live/thank-you';
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const accentColor = '#FF6B35';
  const accentLight = 'rgba(255, 107, 53, 0.08)';
  const accentBorder = 'rgba(255, 107, 53, 0.18)';

  return (
    <>
      <div className="report-page" style={{ background: '#ffffff', color: '#222' }}>
        {/* 네비게이션 */}
        <nav className="report-nav" style={{ background: 'rgba(255, 255, 255, 0.97)', borderBottom: '1px solid #e8e8e8' }}>
          <div className="report-container">
            <div className="report-nav-content">
              <a href="https://gowid.com" className="report-brand" target="_blank" rel="noopener noreferrer">
                <Image src="/gowid-logotype.png" alt="GOWID" width={84} height={28} priority style={{ objectFit: 'contain' }} />
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                  className="report-nav-button"
                  onClick={openModal}
                  style={{ background: accentColor, color: '#fff', cursor: 'pointer' }}
                >
                  무료 라이브세션 신청하기
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* 히어로 섹션 */}
        <header className="report-header" style={{ background: 'linear-gradient(180deg, #fff8f4 0%, #ffffff 100%)', padding: '8rem 0 5rem' }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <span className="badge" style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem', background: accentLight, color: accentColor, border: `1px solid ${accentBorder}` }}>
                  7월 8일 (수) 오후 7시 | 강남구 도산대로 317 호림아트센터 14층
                </span>
              </div>
              <h1 className="report-h1" style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#111' }}>
                <strong>
                  푸드 브랜드 —<br />버는 돈, 남기는 돈,<br />쥐는 돈
                </strong>
              </h1>
              <p className="report-subtitle" style={{ textAlign: 'center', marginBottom: '1rem', color: '#666' }}>
                생존을 넘어 번영한 기업의 매출, GP, OP 그리고 현금 관리법
              </p>
              <p style={{ textAlign: 'center', marginBottom: '2.5rem', color: '#999', fontStyle: 'italic', fontSize: '0.9375rem' }}>
                푸드 브랜드 48개사 재무를 2년간 해부했습니다.
              </p>
              <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Image
                  src="/food-finance-live-thumbnail.png"
                  alt="푸드 브랜드 — 버는 돈, 남기는 돈, 쥐는 돈 - GoWid 라이브세션"
                  width={1200}
                  height={630}
                  priority
                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '1rem', border: '1px solid #e0e0e0' }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* 행사 소개 */}
        <section className="report-section" style={{ background: '#fff8f4', padding: '5rem 0' }}>
          <div className="report-container">
            <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
              <h2 className="report-h2" style={{ color: '#111', textAlign: 'center', marginBottom: '1.5rem' }}>
                매출은 오르는데, 왜 통장은 비어갈까요?
              </h2>
              <p style={{ fontSize: '1.0625rem', color: '#333', lineHeight: '1.9', marginBottom: '2rem' }}>
                푸드 브랜드가 성장할수록 부딪히는 세 가지 구조 문제입니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', maxWidth: '640px', margin: '0 auto 2rem', textAlign: 'left' }}>
                {[
                  <>푸드 브랜드 <strong>4곳 중 1곳이 팔수록 손해</strong> (공헌이익 마이너스)</>,
                  <><strong>매출 100~200억 구간에서 가장 많이 무너집니다</strong> (확장의 함정)</>,
                  <>매출 1원이 <strong>배달앱·새벽배송·대형유통 세 지갑</strong>을 거쳐 들어오는 사이 현금이 마릅니다</>,
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: accentLight, border: `1px solid ${accentBorder}`, borderRadius: '0.75rem' }}>
                    <div style={{ flexShrink: 0, width: '1.5rem', height: '1.5rem', background: accentColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg viewBox="0 0 14 14" fill="none" width="14" height="14"><path d="M3 7L6 10L11 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <p style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1.05rem)', lineHeight: '1.6', color: '#222', margin: 0 }}>{text}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '1.0625rem', color: '#333', lineHeight: '1.9' }}>
                매출→GP→OP→현금 <strong>&lsquo;생존 사다리&rsquo;</strong>로 내 회사 돈이 <em>어느 칸에서 새는지</em> 짚고,<br />
                살아남은 8곳의 공식을 데이터로 풀어드립니다.
              </p>
            </div>
          </div>
        </section>

        {/* 이런 분들께 추천합니다 */}
        <section className="report-section" style={{ background: '#ffffff' }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '1rem', color: '#111', wordBreak: 'keep-all' }}>이런 분들께 추천합니다</h2>
              <p style={{ fontSize: '1rem', color: '#888', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                아래에 해당하신다면, 이 라이브세션이 답이 됩니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '600px', margin: '0 auto' }}>
                {[
                  <>매출은 느는데 남는 게 없는 <strong>푸드 브랜드 대표</strong></>,
                  <>배달앱·새벽배송·대형유통 <strong>멀티채널 운영 경영진</strong></>,
                  <>원재료·식자재 매입 결제로 <strong>현금이 빠듯한 재무·운영 담당</strong></>,
                  <>100~200억 확장을 앞두고 <strong>수익성이 걱정되는 성장기 브랜드</strong></>,
                  <>공헌이익·런웨이를 <strong>정확히 계산해본 적 없는</strong> 창업가</>,
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: accentLight, border: `1px solid ${accentBorder}`, borderRadius: '0.75rem', padding: '1rem 1.25rem', textAlign: 'left' }}>
                    <div style={{ flexShrink: 0, width: '1.5rem', height: '1.5rem', background: accentColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg viewBox="0 0 14 14" fill="none" width="14" height="14"><path d="M3 7L6 10L11 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <p style={{ fontSize: 'clamp(0.85rem, 2vw, 1.05rem)', lineHeight: '1.6', color: '#222', margin: 0 }}>{text}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={openModal}
                className="report-button-primary"
                style={{ marginTop: '2.5rem', background: accentColor, color: '#fff', boxShadow: '0 4px 20px rgba(255, 107, 53, 0.25)', cursor: 'pointer' }}
              >
                무료 라이브세션 신청하기
              </button>
            </div>
          </div>
        </section>

        {/* 프로그램 안내 */}
        <section className="report-section" style={{ background: '#ffffff' }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '3rem', color: '#111' }}>프로그램 안내</h2>

              {/* PC */}
              <div className="cosmetic-timetable-pc" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '1rem', padding: '1rem 0', borderBottom: `1px solid ${accentBorder}` }}>
                  <div style={{ fontSize: '1rem', color: '#888' }}>시간</div>
                  <div style={{ fontSize: '1rem', color: '#888' }}>세션</div>
                </div>
                {[
                  { time: '19:00 ~ 19:05', title: '오프닝 — 영업흑자인데 통장은 왜 마를까', speaker: '연사 전원' },
                  { time: '19:05 ~ 19:25', session: 'Session 01', title: '생존 사다리: 매출·GP·OP·현금', speakerName: '문미성', speakerCompany: '고위드', details: ['돈이 새는 네 칸의 지도 (매출→GP→OP→현금)', '"진짜 진단은 숫자가 아니라 층간 갭에 있다"', 'GP 직접 계산법 — 내 회사 숫자로 그 자리에서', '푸드 4곳 중 1곳이 팔수록 손해인 이유 (CM 마이너스 25%)'] },
                  { time: '19:25 ~ 19:50', session: 'Session 02', title: '어디서 새는가: 확장의 함정과 흑자 도산', speakerName: '문미성 · 김병권', speakerCompany: '고위드', details: ['매출 100~200억, 가장 많이 무너지는 구간 (Decline 66.7%)', '같은 매출, 구조만 다른 두 회사 — A사 vs B사 시뮬레이션', '매출 1원이 거치는 세 지갑 (배달앱 7일·새벽배송 60일·대형유통 90일)', '런웨이 직접 계산 — 내 회사는 몇 개월 버티나'] },
                  { time: '19:50 ~ 20:05', session: 'Session 03', title: '살아남은 8곳의 공식', speakerName: '문미성', speakerCompany: '고위드', details: ['네 칸을 다 막은 공식: 공헌이익 31.7% · 런웨이 18.6개월', '3대 변곡점: 데뷔 구간 / 확장의 함정 / B2B 안정화', '현장 자가진단 — 내 회사는 어느 칸에서 새나'] },
                  { time: '20:05 ~ 20:15', title: 'Q&A', speaker: '연사 전원' },
                  { time: '20:15~', title: '(현장) 네트워킹 · 리포트 배포 · 다과' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '1rem', padding: '1.25rem 0', borderBottom: '1px solid #e0e0e0', alignItems: item.details ? 'start' : 'center' }}>
                    <div style={{ fontSize: '1.0625rem', fontWeight: '600', color: '#222' }}>{item.time}</div>
                    <div>
                      {item.session && <div style={{ fontSize: '1rem', fontWeight: '700', color: accentColor, marginBottom: '0.25rem' }}>{item.session}</div>}
                      <div style={{ fontSize: '1.0625rem', color: '#222', marginBottom: item.details ? '0.5rem' : '0' }}>{item.title}</div>
                      {item.speakerName && <div style={{ fontSize: '0.875rem', color: '#888', marginBottom: '0.5rem' }}>{item.speakerName} · {item.speakerCompany}</div>}
                      {item.speaker && !item.speakerName && <div style={{ fontSize: '0.875rem', color: '#888' }}>{item.speaker}</div>}
                      {item.details && (
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {item.details.map((d, j) => (
                            <li key={j} style={{ fontSize: '0.9375rem', lineHeight: '1.6', color: '#777', paddingLeft: '0.875rem', position: 'relative', marginBottom: '0.25rem' }}>
                              <span style={{ position: 'absolute', left: 0, top: '0.5rem', width: '0.3rem', height: '0.3rem', background: accentColor, borderRadius: '50%', display: 'block' }} />
                              {d}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* 모바일 */}
              <div className="cosmetic-timetable-mobile" style={{ marginBottom: '3rem' }}>
                {[
                  { time: '19:00 ~ 19:05', title: '오프닝 — 영업흑자인데 통장은 왜 마를까', speaker: '연사 전원' },
                  { time: '19:05 ~ 19:25', session: 'Session 01', title: '생존 사다리: 매출·GP·OP·현금', speakerName: '문미성', speakerCompany: '고위드', details: ['돈이 새는 네 칸의 지도 (매출→GP→OP→현금)', 'GP 직접 계산법 — 내 회사 숫자로 그 자리에서', '푸드 4곳 중 1곳이 팔수록 손해인 이유 (CM -25%)'] },
                  { time: '19:25 ~ 19:50', session: 'Session 02', title: '어디서 새는가: 확장의 함정과 흑자 도산', speakerName: '문미성 · 김병권', speakerCompany: '고위드', details: ['100~200억 Decline 66.7%', 'A사 vs B사 시뮬레이션', '세 지갑 (7일·60일·90일)', '런웨이 직접 계산'] },
                  { time: '19:50 ~ 20:05', session: 'Session 03', title: '살아남은 8곳의 공식', speakerName: '문미성', speakerCompany: '고위드', details: ['공헌이익 31.7% · 런웨이 18.6개월', '3대 변곡점 / 현장 자가진단'] },
                  { time: '20:05 ~ 20:15', title: 'Q&A', speaker: '연사 전원' },
                  { time: '20:15~', title: '(현장) 네트워킹 · 리포트 배포 · 다과' },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '1.25rem 0', borderBottom: '1px solid #e0e0e0' }}>
                    <div style={{ fontSize: '0.8125rem', color: '#888', marginBottom: '0.25rem' }}>{item.time}</div>
                    {item.session && <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: accentColor, marginBottom: '0.375rem' }}>{item.session}</div>}
                    <div style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#222', marginBottom: item.details ? '0.375rem' : '0' }}>{item.title}</div>
                    {item.speakerName && <div style={{ fontSize: '0.8125rem', color: '#888', marginBottom: '0.5rem' }}>{item.speakerName} · {item.speakerCompany}</div>}
                    {item.speaker && !item.speakerName && <div style={{ fontSize: '0.8125rem', color: '#888' }}>{item.speaker}</div>}
                    {item.details && (
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {item.details.map((d, j) => (
                          <li key={j} style={{ fontSize: '0.875rem', lineHeight: '1.6', color: '#777', paddingLeft: '0.75rem', position: 'relative', marginBottom: '0.2rem' }}>
                            <span style={{ position: 'absolute', left: 0, top: '0.4rem', width: '0.25rem', height: '0.25rem', background: accentColor, borderRadius: '50%', display: 'block' }} />
                            {d}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 참석자 혜택 */}
        <section className="report-section" style={{ background: '#fff8f4' }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '2rem', color: '#111' }}>참석자 혜택</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { icon: '📊', title: '푸드 브랜드 벤치마크\n리포트 2026 PDF', desc: '48개사 재무 해부, 무료 배포' },
                  { icon: '🧮', title: '현금 생존 자가진단 양식', desc: 'GP·런웨이 직접 계산' },
                  { icon: '🤝', title: '고위드 법인카드\n한도 사전 조회 + 1:1 상담', desc: '자금운영 상담권 제공' },
                  { icon: '📄', title: '발표 자료 PDF 제공', desc: '당일 참석자 대상' },
                ].map((b, i) => (
                  <div key={i} style={{ background: '#fff', border: `1px solid ${accentBorder}`, borderRadius: '0.75rem', padding: '1.5rem 1.25rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{b.icon}</div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#222', marginBottom: '0.375rem', lineHeight: '1.4', whiteSpace: 'pre-line' }}>{b.title}</h4>
                    <p style={{ fontSize: '0.875rem', color: '#888', margin: 0 }}>{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="report-section" style={{ background: '#ffffff' }}>
          <div className="report-container">
            <div style={{ maxWidth: '640px', margin: '0 auto' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '2rem', color: '#111' }}>자주 묻는 질문</h2>
              {[
                { q: '진행 방식이 어떻게 되나요?', a: '온라인 라이브 송출과 현장 소수 초청을 병행합니다. 신청 완료 시 이메일로 참여 방법을 안내드립니다.' },
                { q: '참여 비용이 있나요?', a: '완전 무료입니다.' },
                { q: '참석하지 못하면 녹화본을 받을 수 있나요?', a: '네, 라이브세션 종료 후 신청자 전원에게 녹화본을 이메일로 발송해 드립니다.' },
                { q: '어떤 업종에 적합한 라이브세션인가요?', a: '푸드·식품 브랜드를 중심으로 구성했지만, 원재료 선매입·플랫폼 정산 시차 등 커머스 업종의 현금 흐름 이슈가 있다면 카테고리 불문 도움이 됩니다.' },
                { q: '사전 질문은 어떻게 활용되나요?', a: '신청 시 남겨주신 질문을 분석하여 본론 및 Q&A 시간에 우선 다뤄드립니다.' },
              ].map((faq, i) => (
                <div key={i} style={{ borderBottom: '1px solid #e0e0e0' }}>
                  <button
                    onClick={() => toggleFaq(i)}
                    style={{ width: '100%', background: 'none', border: 'none', color: '#222', fontSize: '1rem', fontWeight: '600', textAlign: 'left', padding: '1.5rem 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'inherit' }}
                  >
                    {faq.q}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginLeft: '1rem', transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      <path d="M4 6L8 10L12 6" stroke="#aaa" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div style={{ maxHeight: openFaq === i ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                    <p style={{ padding: '0 0 1.5rem', fontSize: '0.9375rem', lineHeight: '1.7', color: '#666' }}>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 최종 CTA */}
        <section className="report-section report-section-cta" style={{ background: '#fff8f4', textAlign: 'center' }}>
          <div className="report-container">
            <div className="report-cta-content">
              <h3 className="report-h3" style={{ color: '#111' }}>
                <strong>수익 구조 × 현금 흐름,<br />푸드 48개사 실전 데이터로 답을 드립니다.</strong>
              </h3>
              <button
                onClick={openModal}
                className="report-button-cta"
                style={{ background: accentColor, color: '#fff', boxShadow: '0 4px 20px rgba(255, 107, 53, 0.25)', cursor: 'pointer' }}
              >
                무료 라이브세션 신청하기
              </button>
            </div>
          </div>
        </section>

        {/* 유의사항 */}
        <section style={{ background: '#ffffff', padding: '3rem 0', borderTop: '1px solid #e0e0e0' }}>
          <div className="report-container">
            <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'left' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#aaa', marginBottom: '1rem' }}>유의사항</p>
              {[
                '온라인 라이브 + 현장 병행 진행이며, 참가 확정자분들께 접속 링크를 안내드립니다.',
                '참가비가 없는 무료 행사입니다.',
                '라이브세션 종료 후 녹화본을 신청자 전원에게 발송해 드립니다.',
                '현장 정원이 한정되어 있어 조기 마감될 수 있습니다.',
                '참석자 혜택은 광고성 정보 수신 및 제3자 제공 동의를 한 당일 참석자에게 제공합니다.',
              ].map((notice, i) => (
                <p key={i} style={{ fontSize: '0.8125rem', lineHeight: '1.6', color: '#999', marginBottom: '0.375rem' }}>
                  <span>· </span>{notice}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="report-footer" style={{ background: '#fff8f4', borderTop: '1px solid #e0e0e0' }}>
          <div className="report-container">
            <div className="report-footer-content">
              <div style={{ color: '#888' }}>gowid &copy; 2026</div>
              <div className="report-footer-divider" style={{ color: '#ccc' }}>|</div>
              <div>
                <a href="https://www.notion.so/teamgowid/2026-ver-2e98db64698e8086ac85e01f29c32587" target="_blank" rel="noopener noreferrer" className="report-footer-link" style={{ color: '#888' }}>
                  개인정보 처리방침
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* 신청 모달 */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px', padding: 0 }}>
            <button className="modal-close" onClick={closeModal} aria-label="닫기">✕</button>
            <div className="modal-header">
              <h2 className="modal-title">무료 라이브세션 신청</h2>
              <p className="modal-description">7월 8일(수) 오후 7시 | 강남구 도산대로 317 호림아트센터 14층</p>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div style={{ background: '#fff8f4', border: `1px solid ${accentBorder}`, borderRadius: '0.75rem', padding: '1.25rem 1.5rem', marginBottom: '1.75rem', fontSize: '0.9rem', color: '#444', lineHeight: '1.7' }}>
                <p style={{ margin: '0 0 0.75rem' }}>안녕하세요,<br /><strong>푸드 브랜드 — 버는 돈, 남기는 돈, 쥐는 돈</strong><br />라이브세션에 관심을 가져주셔서 진심으로 감사드립니다.</p>
                <p style={{ margin: '0 0 0.75rem' }}>본 행사는<br /><strong>푸드 브랜드 대표, 재무 운영 담당, 멀티채널 운영 담당자</strong> 분들을 위한 자리입니다.</p>
                <p style={{ margin: '0 0 0.75rem' }}>🚀 장소 제약으로 인해 오프라인 참석은 신청 후 별도 추첨을 통해 확정됩니다.</p>
                <p style={{ margin: '0 0 0.75rem', fontSize: '0.8rem', color: '#888' }}>*오프라인 신청 후 추첨에서 확정되지 않으실 경우 자동으로 온라인 참석으로 안내드립니다.</p>
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '600', color: accentColor }}>🎁 참가신청자 전원 세미나 자료 제공</p>
              </div>
              {submitError && <div className="form-error">{submitError}</div>}
              <div className="form-group">
                <label htmlFor="name" className="form-label">이름 <span className="required">*</span></label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-input" placeholder="홍길동" required />
              </div>
              <div className="form-group">
                <label htmlFor="companyName" className="form-label">회사명 <span className="required">*</span></label>
                <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className="form-input" placeholder="회사명을 입력해주세요" required />
              </div>
              <div className="form-group">
                <label htmlFor="department" className="form-label">부서 <span className="required">*</span></label>
                <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} className="form-input" placeholder="마케팅팀, 경영기획팀 등" required />
              </div>
              <div className="form-group">
                <label htmlFor="position" className="form-label">직급 <span className="required">*</span></label>
                <input type="text" id="position" name="position" value={formData.position} onChange={handleChange} className="form-input" placeholder="대표, 팀장, 매니저 등" required />
              </div>
              <div className="form-group">
                <label htmlFor="annualRevenue" className="form-label">연매출 <span className="required">*</span></label>
                <select id="annualRevenue" name="annualRevenue" value={formData.annualRevenue} onChange={handleChange} className="form-input" required>
                  <option value="">선택해주세요</option>
                  <option value="10억 미만">10억 미만</option>
                  <option value="10억 ~ 30억">10억 ~ 30억</option>
                  <option value="30억 ~ 50억">30억 ~ 50억</option>
                  <option value="50억 ~ 100억">50억 ~ 100억</option>
                  <option value="100억 ~ 300억">100억 ~ 300억</option>
                  <option value="300억 이상">300억 이상</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">회사 이메일 <span className="required">*</span></label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="contact@company.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="form-label">전화번호 <span className="required">*</span></label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="form-input" placeholder="010-1234-5678" required />
              </div>
              <div className="form-group">
                <label htmlFor="attendanceType" className="form-label">온/오프라인 참석 선택 <span className="required">*</span></label>
                <p style={{ fontSize: '0.8rem', color: '#888', lineHeight: '1.6', marginBottom: '0.625rem' }}>업계 핵심 관계자들과의 네트워킹 시간이 마련되어 있습니다. 최종 선정 여부는 제출해주신 연락처를 통해 안내드릴 예정입니다.</p>
                <select id="attendanceType" name="attendanceType" value={formData.attendanceType} onChange={handleChange} className="form-input" required>
                  <option value="">선택해주세요</option>
                  <option value="오프라인">오프라인 참석 (추첨)</option>
                  <option value="온라인">온라인 참석</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="question" className="form-label">궁금하신 점을 편하게 남겨주세요!</label>
                <textarea id="question" name="question" value={formData.question} onChange={handleChange} className="form-input" placeholder="자유롭게 작성해주세요" rows={3} style={{ resize: 'vertical', fontFamily: 'inherit' }} />
              </div>
              <div className="form-group-checkbox" style={{ marginTop: '0.5rem' }}>
                <label className="checkbox-label">
                  <input type="checkbox" name="agreePrivacy" checked={formData.agreePrivacy} onChange={handleChange} className="checkbox-input" required />
                  <span className="checkbox-text">개인정보 처리방침 및 마케팅 수신에 동의합니다 (필수)</span>
                </label>
                <p style={{ fontSize: '0.75rem', color: '#999', lineHeight: '1.5', marginTop: '0.5rem', paddingLeft: '1.625rem' }}>
                  금번 수집하는 개인정보는 라이브세션 콘텐츠 준비 및 안내 용도로 사용됩니다. 라이브세션 이후 관련 서비스 소개를 위해 연락드릴 수 있습니다.
                </p>
              </div>
              <div style={{ position: 'relative', zIndex: 10, pointerEvents: isSubmitting ? 'none' : 'auto' }}>
                <button type="submit" disabled={isSubmitting} className="form-submit-button" style={{ background: accentColor }}>
                  {isSubmitting ? '제출 중...' : '라이브세션 신청하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
