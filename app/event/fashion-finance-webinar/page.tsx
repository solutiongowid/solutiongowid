'use client';

import { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';

export default function FashionFinanceSeminarPage() {
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
    position: '',
    annualRevenue: '',
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
    if (!formData.companyName.trim()) { setSubmitError('브랜드·회사명을 입력해주세요.'); return; }
    if (!formData.position.trim()) { setSubmitError('직함을 입력해주세요.'); return; }
    if (!formData.annualRevenue) { setSubmitError('연매출을 선택해주세요.'); return; }
    if (!formData.email.trim()) { setSubmitError('회사 이메일을 입력해주세요.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { setSubmitError('올바른 이메일 형식을 입력해주세요.'); return; }
    if (!formData.phone.trim()) { setSubmitError('연락처를 입력해주세요.'); return; }
    if (!formData.agreePrivacy) { setSubmitError('개인정보 처리방침 및 마케팅 수신 동의가 필요합니다.'); return; }

    setIsSubmitting(true);
    try {
      const submitData = {
        name: formData.name,
        companyName: formData.companyName,
        position: formData.position,
        annualRevenue: formData.annualRevenue,
        email: formData.email,
        phone: formData.phone,
        question: formData.question,
        agreePrivacy: formData.agreePrivacy,
        webinar_type: 'fashion-finance-webinar',
        ...Object.fromEntries(Object.entries(utmParams).filter(([, v]) => v)),
      };

      const response = await fetch('/api/fashion-finance-webinar-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '제출에 실패했습니다.');

      window.location.href = '/event/fashion-finance-webinar/thank-you';
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const accentColor = '#BE7B2C';
  const accentLight = 'rgba(190, 123, 44, 0.08)';
  const accentBorder = 'rgba(190, 123, 44, 0.22)';
  const tint = '#F7F4ED';
  const ink = '#1F1E1D';
  const inkStrong = '#141312';

  return (
    <>
      <div className="report-page" style={{ background: '#ffffff', color: ink, wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
        {/* 네비게이션 */}
        <nav className="report-nav" style={{ background: 'rgba(255, 255, 255, 0.97)', borderBottom: '1px solid #e8e4da' }}>
          <div className="report-container">
            <div className="report-nav-content">
              <a href="https://gowid.com" className="report-brand" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.125rem', fontWeight: 800, letterSpacing: '-0.02em', color: inkStrong, textDecoration: 'none' }}>
                GOWID
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                  className="report-nav-button"
                  onClick={openModal}
                  style={{ background: accentColor, color: '#fff', cursor: 'pointer' }}
                >
                  무료 웨비나 신청하기
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* 히어로 섹션 */}
        <header className="report-header" style={{ background: `linear-gradient(180deg, ${tint} 0%, #ffffff 100%)`, padding: '8rem 0 5rem' }}>
          <div className="report-container">
            <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <span className="badge" style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem', background: accentLight, color: accentColor, border: `1px solid ${accentBorder}` }}>
                  8월 26일(수) 오후 4시 · 온라인 Zoom
                </span>
              </div>
              <h1 className="report-h1" style={{ textAlign: 'center', marginBottom: '1rem', color: inkStrong }}>
                <strong>라이프·패션 브랜드 온라인 웨비나</strong>
              </h1>
              <p style={{ margin: '0 0 1.125rem', color: '#3a3835', fontSize: '1.5rem', fontWeight: 700, lineHeight: '1.5', textAlign: 'center' }}>
                고위드 패션 브랜드 벤치마크 리포트를<br className="mobile-only-br" /> 낱낱이 해석해 드립니다.
              </p>
              <p style={{ margin: '0 0 1.5rem', fontSize: '1.25rem', fontWeight: 700, color: accentColor, lineHeight: '1.5', textAlign: 'center' }}>
                주제: 버는 돈, 남기는 돈, 쥐는 돈
              </p>
              <p style={{ margin: '0 0 0.625rem', color: '#5f5c56', fontSize: '1.0625rem', lineHeight: '1.7', textAlign: 'center' }}>
                매출도 마진도 좋아졌지만 56%는 적자였습니다.
              </p>
              <p style={{ margin: '0 0 1.25rem', color: '#8a857c', fontSize: '0.9375rem', lineHeight: '1.6', textAlign: 'center' }}>
                * 121개 브랜드의 2개년 재무제표와 160개 브랜드의 42개월 현금흐름이 보여준 결과
              </p>
              <p style={{ margin: '0 0 2.5rem', color: '#948F84', fontSize: '0.9375rem', lineHeight: '1.6', textAlign: 'center' }}>
                온라인 Zoom · 90분 · 참가비 무료 · <b style={{ color: accentColor, fontWeight: 700 }}>녹화본 제공</b>
              </p>
              <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Image
                  src="/fashion-finance-webinar-thumbnail.png"
                  alt="라이프·패션 브랜드 웨비나 - GOWID"
                  width={1200}
                  height={630}
                  priority
                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '1rem', border: '1px solid #e0e0e0' }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* 문제 제기 */}
        <section className="report-section" style={{ background: tint }}>
          <div className="report-container">
            <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
              <h2 className="report-h2" style={{ color: inkStrong, textAlign: 'center', marginBottom: '1.5rem' }}>
                버는 돈도, 남기는 돈도 늘었습니다.<br /><br />그런데 &lsquo;쥐는 돈(계좌에 남은 현금)&rsquo;은<br />줄었습니다.
              </h2>
              <p style={{ fontSize: '1.0625rem', color: '#333', lineHeight: '1.9', marginBottom: '2rem' }}>
                리포트에서는 같은 121개 브랜드의 2024년과 2025년을 비교했습니다.<br />
                그리고 매출 1원이 GP·OP·현금으로 내려오는 길을 네 층으로 나눠본 결과를 안내드립니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', maxWidth: '660px', margin: '0 auto 2rem', textAlign: 'left' }}>
                {[
                  <><strong>버는 돈</strong> — 매출 중앙값 +22.1%, 매출총이익률 56.7%→59.9%</>,
                  <><strong>남기는 돈</strong> — 마진은 좋아졌지만 68곳(56%)은 영업적자</>,
                  <><strong>쥐는 돈</strong> — 매출에 묶인 운전자본 17.4%→18.3%</>,
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '1.0625rem', lineHeight: '1.7', color: '#333' }}>
                    <div style={{ flexShrink: 0, width: '1.35rem', height: '1.35rem', marginTop: '0.25rem', background: accentColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.7rem', fontWeight: 700 }}>{i + 1}</div>
                    <p style={{ margin: 0 }}>{text}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '1.0625rem', color: '#333', lineHeight: '1.9' }}>
                웨비나에서는 리포트에서 보여드린 시장의 숫자를 <strong>우리 브랜드에 도입하여 위치를 찾아보겠습니다.</strong><br />
                네 가지 층 중 마진이 새는 부분을 파악하면, <strong>무엇부터 바꿔야 진짜 쥐는 돈이 생기는지 선명해집니다.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* 타깃 */}
        <section className="report-section" style={{ background: '#ffffff' }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '1rem', color: inkStrong }}>우리 브랜드 이야기라면 신청해 보세요.</h2>
              <p style={{ fontSize: '1rem', color: '#948F84', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                아래 4가지 중 하나 이상 해당된다면
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '640px', margin: '0 auto' }}>
                {[
                  '매출은 늘지만 이익이 남지 않는 브랜드',
                  '마진은 좋은데 현금이 줄어드는 이유를 찾고 싶은 브랜드',
                  '사입과 자체 제작 사이에서 소싱 구조를 고민하는 브랜드',
                  '다음 시즌의 매입 물량과 자금을 함께 결정해야 하는 대표·재무 담당자',
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: accentLight, border: `1px solid ${accentBorder}`, borderRadius: '0.75rem', padding: '1rem 1.25rem', textAlign: 'left' }}>
                    <div style={{ flexShrink: 0, width: '1.5rem', height: '1.5rem', background: accentColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>✓</div>
                    <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: ink, margin: 0 }}>{text}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={openModal}
                className="report-button-primary"
                style={{ marginTop: '2.5rem', background: accentColor, color: '#fff', boxShadow: '0 4px 20px rgba(190, 123, 44, 0.22)', cursor: 'pointer' }}
              >
                무료 웨비나 신청하기
              </button>
            </div>
          </div>
        </section>

        {/* 세션 구성 */}
        <section className="report-section" style={{ background: '#ffffff' }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '3rem', color: inkStrong }}>세션 구성</h2>

              {/* PC */}
              <div className="cosmetic-timetable-pc" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '1rem', padding: '1rem 0', borderBottom: `1px solid ${accentBorder}` }}>
                  <div style={{ fontSize: '1rem', color: '#948F84' }}>시간</div>
                  <div style={{ fontSize: '1rem', color: '#948F84' }}>세션</div>
                </div>
                {[
                  { time: '16:00 ~ 16:05', title: '오프닝', speaker: '백소연 · 고위드' },
                  { time: '16:05 ~ 16:35', session: '1부', title: '패션업의 현금흐름', speakerName: '문미성 · 고위드', details: ['기업은 고객과의 신뢰를 구조화해 현금을 만듭니다', '시즌이 도는 업의 생리, 매입은 매출보다 한 달 먼저 나갑니다', '매출에서 현금까지 읽는 순서, 매일·매주·매월 루틴', '라이프·패션 브랜드의 관리회계와 경영 가시성, 그리고 AX'] },
                  { time: '16:35 ~ 17:15', session: '2부', title: '121사가 남긴 네 층의 기록', speakerName: '백소연 · 고위드', details: ['30억 미만은 38.7% 성장하는데 10곳 중 7곳이 적자입니다', '급여를 3.8%p 줄였는데 수수료와 광고가 절반 넘게 되가져갔습니다', '인당 매출 2억이 생사선, 2억 미만은 86%가 적자입니다', '제조형은 운전자본 24.8%, 사입형은 12.6%. 마진의 가격은 현금입니다', '네 층을 다 막은 13곳, 그리고 내 숫자로 위치를 찾는 백분위표'] },
                  { time: '17:15 ~ 17:30', title: '질의응답', speaker: '연사 전원' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '1rem', padding: '1.25rem 0', borderBottom: '1px solid #E3DED3', alignItems: item.details ? 'start' : 'center' }}>
                    <div style={{ fontSize: '1.0625rem', fontWeight: '600', color: ink }}>{item.time}</div>
                    <div>
                      {item.session && <div style={{ fontSize: '1rem', fontWeight: '700', color: accentColor, marginBottom: '0.25rem' }}>{item.session}</div>}
                      <div style={{ fontSize: '1.0625rem', color: ink, marginBottom: (item.details || item.speaker || item.speakerName) ? '0.25rem' : '0' }}>{item.title}</div>
                      {item.speakerName && <div style={{ fontSize: '0.875rem', color: '#948F84', marginBottom: '0.5rem' }}>{item.speakerName}</div>}
                      {item.speaker && !item.speakerName && <div style={{ fontSize: '0.875rem', color: '#948F84' }}>{item.speaker}</div>}
                      {item.details && (
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {item.details.map((d, j) => (
                            <li key={j} style={{ fontSize: '0.9375rem', lineHeight: '1.6', color: '#6d6a64', paddingLeft: '0.875rem', position: 'relative', marginBottom: '0.25rem' }}>
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
                  { time: '16:00 ~ 16:05', title: '오프닝', speaker: '백소연 · 고위드' },
                  { time: '16:05 ~ 16:35', session: '1부', title: '패션업의 현금흐름', speakerName: '문미성 · 고위드', details: ['매입은 매출보다 한 달 먼저 나갑니다', '매출에서 현금까지 읽는 순서', '관리회계와 경영 가시성, 그리고 AX'] },
                  { time: '16:35 ~ 17:15', session: '2부', title: '121사가 남긴 네 층의 기록', speakerName: '백소연 · 고위드', details: ['30억 미만 38.7% 성장, 7곳이 적자', '인당 매출 2억이 생사선', '제조형 24.8% vs 사입형 12.6% 운전자본', '네 층을 다 막은 13곳과 백분위표'] },
                  { time: '17:15 ~ 17:30', title: '질의응답', speaker: '연사 전원' },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '1.25rem 0', borderBottom: '1px solid #E3DED3' }}>
                    <div style={{ fontSize: '0.8125rem', color: '#948F84', marginBottom: '0.25rem' }}>{item.time}</div>
                    {item.session && <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: accentColor, marginBottom: '0.375rem' }}>{item.session}</div>}
                    <div style={{ fontSize: '0.9375rem', fontWeight: '600', color: ink, marginBottom: item.details ? '0.375rem' : '0' }}>{item.title}</div>
                    {item.speakerName && <div style={{ fontSize: '0.8125rem', color: '#948F84', marginBottom: '0.5rem' }}>{item.speakerName}</div>}
                    {item.speaker && !item.speakerName && <div style={{ fontSize: '0.8125rem', color: '#948F84' }}>{item.speaker}</div>}
                    {item.details && (
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {item.details.map((d, j) => (
                          <li key={j} style={{ fontSize: '0.875rem', lineHeight: '1.6', color: '#6d6a64', paddingLeft: '0.75rem', position: 'relative', marginBottom: '0.2rem' }}>
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

        {/* 제공 사항 */}
        <section className="report-section" style={{ background: tint }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '2rem', color: inkStrong }}>다음 4가지를 제공합니다.</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { ico: '01', title: '직접 듣는 리포트 해석', desc: '20페이지를 90분에, 질문까지' },
                  { ico: '02', title: '자가진단 백분위표', desc: '다섯 숫자로 우리 브랜드 위치 확인' },
                  { ico: '03', title: '소싱 구조별 기준선', desc: '사입형과 제조형의 운전자본 정상 범위' },
                  { ico: '04', title: '한도 사전 조회 + 1:1 상담', desc: '우리 브랜드 42개월 현금 곡선 진단' },
                ].map((b, i) => (
                  <div key={i} style={{ background: '#fff', border: `1px solid ${accentBorder}`, borderRadius: '0.75rem', padding: '1.5rem 1.25rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 800, letterSpacing: '0.04em', color: accentColor, marginBottom: '0.75rem' }}>{b.ico}</div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: ink, marginBottom: '0.375rem', lineHeight: '1.4' }}>{b.title}</h4>
                    <p style={{ fontSize: '0.875rem', color: '#948F84', margin: 0 }}>{b.desc}</p>
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
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '2rem', color: inkStrong }}>자주 묻는 질문</h2>
              {[
                { q: '진행 방식이 어떻게 되나요?', a: '온라인 Zoom 라이브로 90분간 진행합니다. 신청 완료 시 이메일로 접속 링크를 안내합니다.' },
                { q: '참가 비용이 있나요?', a: '참가비는 없습니다.' },
                { q: '참석하지 못하면 녹화본을 받을 수 있나요?', a: '네, 종료 후 신청자 전원에게 녹화본을 이메일로 발송합니다.' },
                { q: '리포트는 어떤 데이터로 만들었나요?', a: '세 겹의 데이터를 썼습니다. 라이프·패션 브랜드 121사의 2024·2025 재무제표를 1:1로 대응시켜 네 층의 변화를 보고, 160사의 은행 입출금 42개월로 층과 층 사이의 시차를 확인하고, DART 공시로 정점 브랜드 20사의 성장 곡선을 복원했습니다. 개별 기업은 비식별 처리했고, 소멸·이탈 기업도 실패로 집계해 생존 왜곡을 통제했습니다.' },
                { q: '리포트를 읽지 않았는데 따라갈 수 있나요?', a: '따라가실 수 있습니다. 1부에서 패션업 현금흐름의 전제를 처음부터 짚습니다. 아직 리포트를 받지 않으셨다면 신청과 함께 보내드리니 미리 읽어보셔도 좋습니다.' },
                { q: '규모가 작은 브랜드인데 도움이 될까요?', a: '도움이 됩니다. 리포트 표본의 절반 가까이가 매출 30억 미만이고, 그 구간이 성장은 가장 가파른데 적자 비율도 가장 높습니다. 자가진단 백분위표는 규모와 무관하게 다섯 숫자만 있으면 위치가 나옵니다.' },
              ].map((faq, i) => (
                <div key={i} style={{ borderBottom: '1px solid #E3DED3' }}>
                  <button
                    onClick={() => toggleFaq(i)}
                    style={{ width: '100%', background: 'none', border: 'none', color: ink, fontSize: '1rem', fontWeight: '600', textAlign: 'left', padding: '1.5rem 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'inherit' }}
                  >
                    {faq.q}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginLeft: '1rem', transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      <path d="M4 6L8 10L12 6" stroke="#aaa" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div style={{ maxHeight: openFaq === i ? '360px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                    <p style={{ padding: '0 0 1.5rem', fontSize: '0.9375rem', lineHeight: '1.7', color: '#6d6a64' }}>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 최종 CTA */}
        <section className="report-section report-section-cta" style={{ background: tint, textAlign: 'center' }}>
          <div className="report-container">
            <div className="report-cta-content">
              <h3 className="report-h3" style={{ color: inkStrong }}>
                <strong>매출 1천억 이상 브랜드로 가는 길의<br />시작을 함께하겠습니다.</strong>
              </h3>
              <button
                onClick={openModal}
                className="report-button-cta"
                style={{ background: accentColor, color: '#fff', boxShadow: '0 4px 20px rgba(190, 123, 44, 0.22)', cursor: 'pointer' }}
              >
                무료 웨비나 신청하기
              </button>
            </div>
          </div>
        </section>

        {/* 유의사항 */}
        <section style={{ background: '#ffffff', padding: '3rem 0', borderTop: '1px solid #E3DED3' }}>
          <div className="report-container">
            <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'left' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#aca69a', marginBottom: '1rem' }}>유의사항</p>
              {[
                '온라인(Zoom)에서 진행하며, 신청자에게 접속 링크를 이메일로 안내합니다.',
                '참가비는 없습니다.',
                '웨비나 종료 후 녹화본을 신청자 전원에게 발송합니다.',
                '리포트를 아직 받지 않으신 분께는 신청과 함께 보내드립니다.',
                '발표 자료는 광고성 정보 수신 및 제3자 제공에 동의한 참석자에게 제공합니다.',
              ].map((notice, i) => (
                <p key={i} style={{ fontSize: '0.8125rem', lineHeight: '1.6', color: '#948F84', marginBottom: '0.375rem' }}>
                  <span>· </span>{notice}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="report-footer" style={{ background: tint, borderTop: '1px solid #E3DED3' }}>
          <div className="report-container">
            <div className="report-footer-content">
              <div style={{ color: '#948F84' }}>gowid &copy; 2026</div>
              <div className="report-footer-divider" style={{ color: '#ccc' }}>|</div>
              <div>
                <a href="https://www.notion.so/teamgowid/2026-ver-2e98db64698e8086ac85e01f29c32587" target="_blank" rel="noopener noreferrer" className="report-footer-link" style={{ color: '#948F84' }}>
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
              <h2 className="modal-title">무료 웨비나 신청</h2>
              <p className="modal-description">8월 26일(수) 오후 4시 · 온라인 Zoom</p>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div style={{ background: tint, border: `1px solid ${accentBorder}`, borderRadius: '0.75rem', padding: '1.25rem 1.5rem', marginBottom: '1.75rem', fontSize: '0.875rem', color: '#444', lineHeight: '1.7' }}>
                <p style={{ margin: '0 0 0.75rem' }}><strong>라이프·패션 브랜드 — 버는 돈, 남기는 돈, 쥐는 돈</strong>에 신청해 주셔서 감사합니다.</p>
                <p style={{ margin: 0 }}>이 웨비나는 라이프·패션 브랜드의 대표와 재무 담당자를 위한 자리입니다. 리포트를 아직 받지 않으셨다면 신청과 함께 보내드립니다.</p>
              </div>
              {submitError && <div className="form-error">{submitError}</div>}
              <div className="form-group">
                <label htmlFor="name" className="form-label">이름 <span className="required">*</span></label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-input" placeholder="홍길동" required />
              </div>
              <div className="form-group">
                <label htmlFor="companyName" className="form-label">브랜드·회사명 <span className="required">*</span></label>
                <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className="form-input" placeholder="브랜드명 또는 법인명을 입력해 주세요" required />
              </div>
              <div className="form-group">
                <label htmlFor="position" className="form-label">직함 <span className="required">*</span></label>
                <input type="text" id="position" name="position" value={formData.position} onChange={handleChange} className="form-input" placeholder="대표, CFO, 재무팀장 등" required />
              </div>
              <div className="form-group">
                <label htmlFor="annualRevenue" className="form-label">연매출 <span className="required">*</span></label>
                <select id="annualRevenue" name="annualRevenue" value={formData.annualRevenue} onChange={handleChange} className="form-input" required>
                  <option value="">선택해 주세요</option>
                  <option value="30억 미만">30억 미만</option>
                  <option value="30억 ~ 100억">30억 ~ 100억</option>
                  <option value="100억 ~ 300억">100억 ~ 300억</option>
                  <option value="300억 ~ 1,000억">300억 ~ 1,000억</option>
                  <option value="1,000억 이상">1,000억 이상</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">회사 이메일 <span className="required">*</span></label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="contact@company.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="form-label">연락처 <span className="required">*</span></label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="form-input" placeholder="010-1234-5678" required />
              </div>
              <div className="form-group">
                <label htmlFor="question" className="form-label">사전 질문</label>
                <textarea id="question" name="question" value={formData.question} onChange={handleChange} className="form-input" placeholder="웨비나에서 다뤘으면 하는 질문을 남겨 주세요" rows={3} style={{ resize: 'vertical', fontFamily: 'inherit' }} />
              </div>
              <div className="form-group-checkbox" style={{ marginTop: '0.5rem' }}>
                <label className="checkbox-label">
                  <input type="checkbox" name="agreePrivacy" checked={formData.agreePrivacy} onChange={handleChange} className="checkbox-input" required />
                  <span className="checkbox-text">개인정보 수집·이용 및 광고성 정보 수신에 동의합니다 (필수)</span>
                </label>
              </div>
              <div style={{ position: 'relative', zIndex: 10, pointerEvents: isSubmitting ? 'none' : 'auto' }}>
                <button type="submit" disabled={isSubmitting} className="form-submit-button" style={{ background: accentColor }}>
                  {isSubmitting ? '제출 중...' : '신청하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
