'use client';

import { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';

export default function AgencyFinanceWebinarPage() {
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
    mediaSpend: '',
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
    if (!formData.position.trim()) { setSubmitError('직함을 입력해주세요.'); return; }
    if (!formData.mediaSpend) { setSubmitError('월 매체 집행 규모를 선택해주세요.'); return; }
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
        mediaSpend: formData.mediaSpend,
        email: formData.email,
        phone: formData.phone,
        question: formData.question,
        agreePrivacy: formData.agreePrivacy,
        webinar_type: 'agency-finance-webinar',
        ...Object.fromEntries(Object.entries(utmParams).filter(([, v]) => v)),
      };

      const response = await fetch('/api/agency-finance-webinar-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '제출에 실패했습니다.');

      window.location.href = '/event/agency-finance-webinar/thank-you';
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const accentColor = '#0E9F6E';
  const accentLight = 'rgba(14, 159, 110, 0.07)';
  const accentBorder = 'rgba(14, 159, 110, 0.20)';
  const tint = '#F5F3EC';
  const ink = '#222A33';
  const inkStrong = '#141A21';

  const program = [
    { time: '16:00 ~ 16:05', title: '오프닝', speaker: '김원석 · 고위드' },
    {
      time: '16:05 ~ 16:35', session: '1부', title: '광고대행 재무를 읽는 순서', speakerName: '문미성', speakerCompany: '고위드',
      details: [
        '기업은 고객과의 신뢰를 구조화해 현금을 만듭니다',
        '굴리는 돈 100에 남는 돈 20, 장부 1억에 통장 10억',
        '매출에서 현금까지 읽는 순서, 매일·매주·매월 루틴',
        '광고대행사의 관리회계와 경영 가시성, 그리고 AX',
      ],
    },
    {
      time: '16:35 ~ 17:15', session: '2부', title: '160개사가 남긴 기록', speakerName: '김원석', speakerCompany: '고위드',
      details: [
        '취급고가 성장한 회사의 절반은 마진을 대가로 늘렸습니다',
        '장부 매출 2,616억, 실제로 번 수수료는 475억',
        '영업이익률 4.71%, GP가 49% 꺾여도 인건비는 8%만 줄었습니다',
        '잔고는 16일치인데 입금은 40일 뒤, 그리고 한도 천장',
        '무너지기 전에 오는 신호와 자가진단 7문항',
      ],
    },
    { time: '17:15 ~ 17:30', title: '질의응답', speaker: '연사 전원' },
  ];

  return (
    <>
      <div className="report-page" style={{ background: '#ffffff', color: ink, wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
        {/* 네비게이션 */}
        <nav className="report-nav" style={{ background: 'rgba(255, 255, 255, 0.97)', borderBottom: '1px solid #e8e6de' }}>
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
                  8월 25일(화) 오후 4시 · 온라인 Zoom
                </span>
              </div>
              <h1 className="report-h1" style={{ textAlign: 'center', marginBottom: '1rem', color: inkStrong }}>
                광고대행,<br />재무를 읽는 순서
              </h1>
              <p style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', margin: '0 0 1rem', color: '#3a3f47', fontSize: '1.6rem', fontWeight: 700, lineHeight: '1.35', letterSpacing: '-0.01em', textAlign: 'left', wordBreak: 'keep-all' }}>
                <span style={{ display: 'block', width: '4px', alignSelf: 'stretch', minHeight: '1.6rem', borderRadius: '2px', background: accentColor, flexShrink: 0 }} />
                매출부터 현금까지,<br />160개사의 데이터로 알게 된 광고대행 재무 읽는 법
              </p>
              <p style={{ margin: '0 0 1.25rem', color: '#5e6670', fontSize: '1.0625rem', lineHeight: '1.7' }}>
                광고대행사 160개사의 세금계산서와 통장에서 확인한 기록
              </p>
              <p style={{ margin: '0 0 2.5rem', color: '#8d9199', fontSize: '0.9375rem', lineHeight: '1.6' }}>
                온라인 Zoom · 90분 · 참가비 무료 · <strong style={{ color: accentColor, fontWeight: 700 }}>녹화본 제공</strong>
              </p>
              <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Image
                  src="/agency-finance-webinar-thumbnail.png"
                  alt="광고대행, 재무를 읽는 순서 - GOWID 웨비나"
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
                이익은 났는데,<br />통장은 왜 비어갈까요
              </h2>
              <p style={{ fontSize: '1.0625rem', color: '#333', lineHeight: '1.9', marginBottom: '2rem' }}>
                광고대행업은 손익계산서보다 통장에서 먼저 무너집니다.<br />
                대표님의 실력이 부족해서가 아니라, 산업의 구조가 그렇게 생겼기 때문입니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', maxWidth: '660px', margin: '0 auto 2rem', textAlign: 'left' }}>
                {[
                  <>통장에 든 돈은 지출 기준 <strong>중앙값 16일치</strong>입니다. 61%가 30일치 미만으로 회사를 돌립니다.</>,
                  <>클라이언트 입금은 세금계산서를 끊고도 <strong>8~60일</strong> 뒤에 옵니다. 대형 클라이언트는 40일을 넘깁니다.</>,
                  <>매출 3억을 더 벌려면 <strong>현금 36억</strong>이 먼저 통장에 있어야 합니다. 월 취급고 30억, 갭 40일 기준입니다.</>,
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '1.0625rem', lineHeight: '1.7', color: '#333' }}>
                    <span style={{ flexShrink: 0, width: '1.35rem', height: '1.35rem', marginTop: '0.25rem', borderRadius: '50%', background: accentColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>{i + 1}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '1.0625rem', color: '#333', lineHeight: '1.9', margin: 0 }}>
                리포트에서 이 숫자들을 보셨다면, 이번에는 <strong>우리 회사에 대입하는 자리</strong>입니다.<br />
                리포트를 쓴 두 사람이 90분 동안 직접 풀어드립니다.
              </p>
            </div>
          </div>
        </section>

        {/* 이런 대표님께 권합니다 */}
        <section className="report-section" style={{ background: '#ffffff' }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '1rem', color: inkStrong }}>이런 대표님께 권합니다</h2>
              <p style={{ fontSize: '1rem', color: '#8d9199', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                하나라도 해당하신다면, 회사의 문제가 아니라 산업 구조의 문제일 가능성이 큽니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '640px', margin: '0 auto' }}>
                {[
                  '매출은 느는데 통장은 빠듯한 광고대행사 대표',
                  '취급고는 커졌는데 남는 돈이 왜 그대로인지 설명이 안 되는 대표',
                  '진짜 마진율이 몇 %인지 바로 답하기 어려운 대표',
                  '캠페인 중에 카드 한도가 막혀본 적 있는 재무 담당자',
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
                style={{ marginTop: '2.5rem', background: accentColor, color: '#fff', boxShadow: '0 4px 20px rgba(14, 159, 110, 0.22)', cursor: 'pointer' }}
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
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '1rem', padding: '1rem 0', borderBottom: `1px solid ${accentBorder}` }}>
                  <div style={{ fontSize: '1rem', color: '#8d9199' }}>시간</div>
                  <div style={{ fontSize: '1rem', color: '#8d9199' }}>세션</div>
                </div>
                {program.map((item, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '1rem', padding: '1.25rem 0', borderBottom: '1px solid #e6e3da', alignItems: item.details ? 'start' : 'center' }}>
                    <div style={{ fontSize: '1.0625rem', fontWeight: 600, color: ink }}>{item.time}</div>
                    <div>
                      {item.session && <div style={{ fontSize: '1rem', fontWeight: 700, color: accentColor, marginBottom: '0.25rem' }}>{item.session}</div>}
                      <div style={{ fontSize: '1.0625rem', color: ink, marginBottom: item.details ? '0.5rem' : 0 }}>{item.title}</div>
                      {item.speakerName && <div style={{ fontSize: '0.875rem', color: '#8d9199', marginBottom: '0.5rem' }}>{item.speakerName} · {item.speakerCompany}</div>}
                      {item.speaker && !item.speakerName && <div style={{ fontSize: '0.875rem', color: '#8d9199' }}>{item.speaker}</div>}
                      {item.details && (
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {item.details.map((d, j) => (
                            <li key={j} style={{ fontSize: '0.9375rem', lineHeight: '1.6', color: '#6f757d', paddingLeft: '0.875rem', position: 'relative', marginBottom: '0.25rem' }}>
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
                {program.map((item, i) => (
                  <div key={i} style={{ padding: '1.25rem 0', borderBottom: '1px solid #e6e3da' }}>
                    <div style={{ fontSize: '0.8125rem', color: '#8d9199', marginBottom: '0.25rem' }}>{item.time}</div>
                    {item.session && <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: accentColor, marginBottom: '0.375rem' }}>{item.session}</div>}
                    <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: ink, marginBottom: item.details ? '0.375rem' : 0 }}>{item.title}</div>
                    {item.speakerName && <div style={{ fontSize: '0.8125rem', color: '#8d9199', marginBottom: '0.5rem' }}>{item.speakerName} · {item.speakerCompany}</div>}
                    {item.speaker && !item.speakerName && <div style={{ fontSize: '0.8125rem', color: '#8d9199' }}>{item.speaker}</div>}
                    {item.details && (
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {item.details.map((d, j) => (
                          <li key={j} style={{ fontSize: '0.875rem', lineHeight: '1.6', color: '#6f757d', paddingLeft: '0.75rem', position: 'relative', marginBottom: '0.2rem' }}>
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

        {/* 참석하면 얻는 것 */}
        <section className="report-section" style={{ background: tint }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '2rem', color: inkStrong }}>참석하면 얻는 것</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { num: '01', title: '리포트를 쓴 사람에게\n직접 듣는 해석', desc: '25페이지를 90분에, 질문까지' },
                  { num: '02', title: '우리 회사 실질 GP 계산법', desc: '장부 유형별 산식과 예시' },
                  { num: '03', title: '자가진단 7문항', desc: '현장에서 우리 회사 위치 확인' },
                  { num: '04', title: '한도 사전 조회\n+ 1:1 상담', desc: '실질 GP 기준 산정' },
                ].map((b, i) => (
                  <div key={i} style={{ background: '#fff', border: `1px solid ${accentBorder}`, borderRadius: '0.75rem', padding: '1.5rem 1.25rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 800, letterSpacing: '0.04em', color: accentColor, marginBottom: '0.75rem' }}>{b.num}</div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: ink, marginBottom: '0.375rem', lineHeight: '1.4', whiteSpace: 'pre-line' }}>{b.title}</h4>
                    <p style={{ fontSize: '0.875rem', color: '#8d9199', margin: 0 }}>{b.desc}</p>
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
                { q: '리포트는 어떤 데이터로 만들었나요?', a: '고위드 결제·계좌·세금계산서 데이터와 DART 공시(FY2024)를 조합했습니다. 기간은 2024년 1월부터 2026년 6월까지이고, 기업명과 사업자번호를 제거한 뒤 그룹별 중앙값과 분위로만 집계했습니다. 10개사 미만 세그먼트는 공개하지 않습니다.' },
                { q: '리포트를 읽지 않았는데 따라갈 수 있나요?', a: '따라가실 수 있습니다. 1부에서 리포트의 전제를 처음부터 다시 짚습니다. 아직 리포트를 받지 않으셨다면 신청 시 함께 보내드리니 미리 읽어보셔도 좋습니다.' },
                { q: '규모가 작은 대행사인데 도움이 될까요?', a: '도움이 됩니다. 리포트는 취급고 규모별로 마진 곡선을 나눠 봤고, 규모가 작을수록 현금 갭의 영향을 더 크게 받습니다. 1부에서 다루는 읽는 순서는 규모와 무관하게 적용됩니다.' },
              ].map((faq, i) => (
                <div key={i} style={{ borderBottom: '1px solid #e6e3da' }}>
                  <button
                    onClick={() => toggleFaq(i)}
                    style={{ width: '100%', background: 'none', border: 'none', color: ink, fontSize: '1rem', fontWeight: 600, textAlign: 'left', padding: '1.5rem 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'inherit' }}
                  >
                    {faq.q}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginLeft: '1rem', transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      <path d="M4 6L8 10L12 6" stroke="#aaa" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div style={{ maxHeight: openFaq === i ? '400px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                    <p style={{ padding: '0 0 1.5rem', fontSize: '0.9375rem', lineHeight: '1.7', color: '#6f757d' }}>{faq.a}</p>
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
                버티는 회사와 무너지는 회사를 가른 건<br />취급고가 아니라 현금이었습니다
              </h3>
              <button
                onClick={openModal}
                className="report-button-cta"
                style={{ background: accentColor, color: '#fff', boxShadow: '0 4px 20px rgba(14, 159, 110, 0.22)', cursor: 'pointer' }}
              >
                무료 웨비나 신청하기
              </button>
            </div>
          </div>
        </section>

        {/* 유의사항 */}
        <section style={{ background: '#ffffff', padding: '3rem 0', borderTop: '1px solid #e6e3da' }}>
          <div className="report-container">
            <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'left' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#aeb2b8', marginBottom: '1rem' }}>유의사항</p>
              {[
                '온라인(Zoom)에서 진행하며, 신청자에게 접속 링크를 이메일로 안내합니다.',
                '참가비는 없습니다.',
                '웨비나 종료 후 녹화본을 신청자 전원에게 발송합니다.',
                '리포트를 아직 받지 않으신 분께는 신청과 함께 보내드립니다.',
                '발표 자료는 광고성 정보 수신 및 제3자 제공에 동의한 참석자에게 제공합니다.',
              ].map((notice, i) => (
                <p key={i} style={{ fontSize: '0.8125rem', lineHeight: '1.6', color: '#9aa0a7', marginBottom: '0.375rem' }}>
                  <span>· </span>{notice}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="report-footer" style={{ background: '#ffffff', borderTop: '1px solid #f0eee6' }}>
          <div className="report-container">
            <div className="report-footer-content">
              <div style={{ color: '#aeb2b8' }}>gowid &copy; 2026</div>
              <div className="report-footer-divider" style={{ color: '#ccc' }}>|</div>
              <div>
                <a href="https://www.notion.so/teamgowid/2026-ver-2e98db64698e8086ac85e01f29c32587" target="_blank" rel="noopener noreferrer" className="report-footer-link" style={{ color: '#aeb2b8' }}>
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
              <p className="modal-description">8월 25일(화) 오후 4시 · 온라인 Zoom</p>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div style={{ background: tint, border: `1px solid ${accentBorder}`, borderRadius: '0.75rem', padding: '1.25rem 1.5rem', marginBottom: '1.75rem', fontSize: '0.875rem', color: '#444', lineHeight: '1.75' }}>
                <p style={{ margin: '0 0 0.75rem' }}><strong>광고대행, 재무를 읽는 순서</strong>에 신청해 주셔서 감사합니다.</p>
                <p style={{ margin: 0 }}>이 웨비나는 광고대행사의 대표와 재무 담당자를 위한 자리입니다. 리포트를 아직 받지 않으셨다면 신청과 함께 보내드립니다.</p>
              </div>
              {submitError && <div className="form-error">{submitError}</div>}
              <div className="form-group">
                <label htmlFor="name" className="form-label">이름 <span className="required">*</span></label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-input" placeholder="홍길동" required />
              </div>
              <div className="form-group">
                <label htmlFor="companyName" className="form-label">회사명 <span className="required">*</span></label>
                <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className="form-input" placeholder="회사명을 입력해 주세요" required />
              </div>
              <div className="form-group">
                <label htmlFor="position" className="form-label">직함 <span className="required">*</span></label>
                <input type="text" id="position" name="position" value={formData.position} onChange={handleChange} className="form-input" placeholder="대표, CFO, 재무팀장 등" required />
              </div>
              <div className="form-group">
                <label htmlFor="mediaSpend" className="form-label">월 매체 집행 규모 <span className="required">*</span></label>
                <select id="mediaSpend" name="mediaSpend" value={formData.mediaSpend} onChange={handleChange} className="form-input" required>
                  <option value="">선택해 주세요</option>
                  <option value="5천만원 미만">5천만원 미만</option>
                  <option value="5천만원 ~ 1억원">5천만원 ~ 1억원</option>
                  <option value="1억원 ~ 3억원">1억원 ~ 3억원</option>
                  <option value="3억원 ~ 10억원">3억원 ~ 10억원</option>
                  <option value="10억원 이상">10억원 이상</option>
                  <option value="정확히 파악하기 어려움">정확히 파악하기 어려움</option>
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
                  {isSubmitting ? '제출 중...' : '신청 완료하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
