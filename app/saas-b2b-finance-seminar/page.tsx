'use client';

import { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';

export default function SaasB2bFinanceSeminarPage() {
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
    domain: '',
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
    if (!formData.companyName.trim()) { setSubmitError('회사명을 입력해주세요.'); return; }
    if (!formData.position.trim()) { setSubmitError('직함을 입력해주세요.'); return; }
    if (!formData.domain) { setSubmitError('기업 분야를 선택해주세요.'); return; }
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
        domain: formData.domain,
        annualRevenue: formData.annualRevenue,
        email: formData.email,
        phone: formData.phone,
        question: formData.question,
        agreePrivacy: formData.agreePrivacy,
        webinar_type: 'saas-b2b-finance-seminar',
        ...Object.fromEntries(Object.entries(utmParams).filter(([, v]) => v)),
      };

      const response = await fetch('/api/saas-b2b-finance-seminar-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '제출에 실패했습니다.');

      window.location.href = '/saas-b2b-finance-seminar/thank-you';
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const accentColor = '#3457D5';
  const accentLight = 'rgba(52, 87, 213, 0.07)';
  const accentBorder = 'rgba(52, 87, 213, 0.18)';
  const tint = '#f5f7ff';

  return (
    <>
      <div className="report-page" style={{ background: '#ffffff', color: '#222', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
        {/* 네비게이션 */}
        <nav className="report-nav" style={{ background: 'rgba(255, 255, 255, 0.97)', borderBottom: '1px solid #e8e8e8' }}>
          <div className="report-container">
            <div className="report-nav-content">
              <a href="https://gowid.com" className="report-brand" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.125rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#111', textDecoration: 'none' }}>
                GOWID
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                  className="report-nav-button"
                  onClick={openModal}
                  style={{ background: accentColor, color: '#fff', cursor: 'pointer' }}
                >
                  참가 신청하기
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
                  8월 25일(화) 오후 6시 · 고위드 사옥 14층
                </span>
              </div>
              <h1 className="report-h1" style={{ textAlign: 'center', marginBottom: '1rem', color: '#111' }}>
                <strong>테크 기업의<br />자금 관리 공식</strong>
              </h1>
              <p style={{ textAlign: 'center', margin: '0 0 1rem', color: '#3a3a3a', fontSize: '1.4rem', fontWeight: 700, lineHeight: '1.4' }}>
                성장을 만든 숫자와 현금의 흐름을<br className="mobile-only-br" /> 함께 살펴봅니다
              </p>
              <p style={{ textAlign: 'center', margin: '0 0 1.25rem', color: '#5b6070', fontSize: '1.0625rem', lineHeight: '1.7' }}>
                B2B 소프트웨어 582곳과 AI 기업 494곳의 실제 재무 데이터로 살펴본 상반기 변화
              </p>
              <p style={{ textAlign: 'center', margin: '0 0 2.5rem', color: '#8a8fa8', fontSize: '0.9375rem', lineHeight: '1.6' }}>
                오프라인 · 정원 <b style={{ color: accentColor, fontWeight: 700 }}>30명 추첨</b> · 참가비 무료<br className="mobile-only-br" /> 신청 마감 <b style={{ color: accentColor, fontWeight: 700 }}>8월 23일(일)</b>
              </p>
              <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Image
                  src="/saas-b2b-finance-seminar-thumbnail.png"
                  alt="테크 기업의 자금 관리 공식 - GOWID 세미나"
                  width={1724}
                  height={1073}
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
              <h2 className="report-h2" style={{ color: '#111', textAlign: 'center', marginBottom: '1.5rem' }}>
                같은 성장률 뒤에서<br />현금은 전혀 다르게 움직였습니다
              </h2>
              <p style={{ fontSize: '1.0625rem', color: '#333', lineHeight: '1.9', marginBottom: '2rem' }}>
                투자 시장은 줄었고, 같은 성장에도 들어간 비용은 달랐습니다.<br />AI 기업의 서버비는 매출보다 빠르게 늘었습니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', maxWidth: '660px', margin: '0 auto 2rem', textAlign: 'left' }}>
                {[
                  <><strong>B2B 소프트웨어 투자 라운드는 2022년 294건에서 2025년 132건으로 줄었습니다.</strong> 전체 시장이 38% 감소하는 동안 B2B 소프트웨어는 55% 감소했습니다.</>,
                  <><strong>네 그룹의 성장률은 모두 20% 안팎이었습니다.</strong><br className="mobile-only-br" /> 비슷한 성장률을 만드는 데 들어간 비용은<br className="mobile-only-br" /> 매출의 41%와 83%로 갈렸습니다.</>,
                  <><strong>서버비는 1.75배, 매출은 1.28배 늘었습니다.</strong> 열에 여덟이 적자였고, 서버비는 손익계산서보다 먼저 통장에서 빠져나갔습니다.</>,
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '1.0625rem', lineHeight: '1.7', color: '#333' }}>
                    <div style={{ flexShrink: 0, width: '1.35rem', height: '1.35rem', marginTop: '0.25rem', background: accentColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.7rem', fontWeight: 700 }}>{i + 1}</div>
                    <p style={{ margin: 0 }}>{text}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '1.0625rem', color: '#333', lineHeight: '1.9' }}>
                고위드는 테크 기업의 실제 금융 데이터를 바탕으로 성장과 현금 흐름을 분석했습니다.<br />
                그 결과를 두 편의 벤치마크 리포트와 자가진단으로 공개합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 이런 분께 권합니다 */}
        <section className="report-section" style={{ background: '#ffffff' }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '1rem', color: '#111' }}>이런 분께 권합니다</h2>
              <p style={{ fontSize: '1rem', color: '#888', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                다음 중 하나라도 해당하는 대표와 재무 담당자를 위한 자리입니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '640px', margin: '0 auto' }}>
                {[
                  'B2B 소프트웨어·SaaS 기업의 대표와 재무 담당자',
                  'AI·머신러닝 제품을 개발하는 기업의 대표와 재무 담당자',
                  '다음 투자 라운드까지 남은 시간을 현금으로 관리하고 싶은 분',
                  '성장 과정에서 현금이 어떻게 움직이는지 점검하고 싶은 분',
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: accentLight, border: `1px solid ${accentBorder}`, borderRadius: '0.75rem', padding: '1rem 1.25rem', textAlign: 'left' }}>
                    <div style={{ flexShrink: 0, width: '1.5rem', height: '1.5rem', background: accentColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>✓</div>
                    <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#222', margin: 0 }}>{text}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={openModal}
                className="report-button-primary"
                style={{ marginTop: '2.5rem', background: accentColor, color: '#fff', boxShadow: '0 4px 20px rgba(52, 87, 213, 0.22)', cursor: 'pointer' }}
              >
                참가 신청하기
              </button>
            </div>
          </div>
        </section>

        {/* 세션 구성 */}
        <section className="report-section" style={{ background: '#ffffff' }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '3rem', color: '#111' }}>세션 구성</h2>

              {/* PC */}
              <div className="cosmetic-timetable-pc" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '1rem', padding: '1rem 0', borderBottom: `1px solid ${accentBorder}` }}>
                  <div style={{ fontSize: '1rem', color: '#888' }}>시간</div>
                  <div style={{ fontSize: '1rem', color: '#888' }}>세션</div>
                </div>
                {[
                  { time: '18:00 ~ 18:10', title: '오프닝 — 지금 B2B 테크가 서 있는 자리', speaker: '김항기 대표', details: ['AI로 이동한 투자와 소프트웨어 예산의 변화', '혁신성장 기업이 만들어갈 다음 노동시장'] },
                  { time: '18:10 ~ 18:30', session: '세션 1', title: '기업이란 무엇인가', speakerName: '김항기 대표', details: ['기업을 현금을 창출하는 존재로 정의하는 법', '고객과의 신뢰를 구조화하는 기업 경영의 본질', '매출·매출총이익(GP)·영업이익(OP)·현금흐름으로 돌아보는 성장'] },
                  { time: '18:30 ~ 18:50', session: '세션 2', title: '대표가 직접 보는 현금 관리', speakerName: '지윤실 재무리드', details: ['발생주의 회계와 현금 관리를 분리하는 법', '목적 없는 비용을 걷어내는 일간·주간·월간 루틴', '제품과 프로젝트별 관리회계와 경영 가시성'] },
                  { time: '18:50 ~ 19:15', session: '세션 3', title: '582곳과 494곳의 숫자', speakerName: '조인혁 사업개발', details: ['투자 지형 — 전체 시장보다 빠르게 줄어든 B2B 소프트웨어 투자', '성장의 출처 — 비슷한 성장률을 만든 서로 다른 비용 구조', '예산의 행방 — 매출보다 빠르게 늘어난 서버비', '우리 회사 숫자 — 현장에서 함께 점검하는 자가진단 5문항'] },
                  { time: '19:15 ~ 19:30', title: '질의응답', speaker: '연사 전원' },
                  { time: '19:30 ~ 20:00', title: '참석자 네트워킹', speaker: '참석자 전원' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '1rem', padding: '1.25rem 0', borderBottom: '1px solid #e0e0e0', alignItems: item.details ? 'start' : 'center' }}>
                    <div style={{ fontSize: '1.0625rem', fontWeight: '600', color: '#222' }}>{item.time}</div>
                    <div>
                      {item.session && <div style={{ fontSize: '1rem', fontWeight: '700', color: accentColor, marginBottom: '0.25rem' }}>{item.session}</div>}
                      <div style={{ fontSize: '1.0625rem', color: '#222', marginBottom: (item.details || item.speaker || item.speakerName) ? '0.25rem' : '0' }}>{item.title}</div>
                      {item.speakerName && <div style={{ fontSize: '0.875rem', color: '#888', marginBottom: '0.5rem' }}>{item.speakerName}</div>}
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
                  { time: '18:00 ~ 18:10', title: '오프닝 — 지금 B2B 테크가 서 있는 자리', speaker: '김항기 대표' },
                  { time: '18:10 ~ 18:30', session: '세션 1', title: '기업이란 무엇인가', speakerName: '김항기 대표', details: ['현금을 창출하는 존재로 정의하는 법', '매출·GP·OP·현금흐름으로 돌아보는 성장'] },
                  { time: '18:30 ~ 18:50', session: '세션 2', title: '대표가 직접 보는 현금 관리', speakerName: '지윤실 재무리드', details: ['발생주의 회계와 현금 관리 분리', '일간·주간·월간 관리 루틴'] },
                  { time: '18:50 ~ 19:15', session: '세션 3', title: '582곳과 494곳의 숫자', speakerName: '조인혁 사업개발', details: ['B2B 소프트웨어 투자 지형', '매출보다 빠르게 늘어난 서버비', '자가진단 5문항'] },
                  { time: '19:15 ~ 19:30', title: '질의응답', speaker: '연사 전원' },
                  { time: '19:30 ~ 20:00', title: '참석자 네트워킹', speaker: '참석자 전원' },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '1.25rem 0', borderBottom: '1px solid #e0e0e0' }}>
                    <div style={{ fontSize: '0.8125rem', color: '#888', marginBottom: '0.25rem' }}>{item.time}</div>
                    {item.session && <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: accentColor, marginBottom: '0.375rem' }}>{item.session}</div>}
                    <div style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#222', marginBottom: item.details ? '0.375rem' : '0' }}>{item.title}</div>
                    {item.speakerName && <div style={{ fontSize: '0.8125rem', color: '#888', marginBottom: '0.5rem' }}>{item.speakerName}</div>}
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

        {/* 참석하면 얻는 것 */}
        <section className="report-section" style={{ background: tint }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '2rem', color: '#111' }}>참석하면 얻는 것</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { ico: '01', title: 'B2B 소프트웨어 582곳의\n유지·확장률과 성장 구조', desc: '매출과 거래 데이터 기반 분석' },
                  { ico: '02', title: 'AI 기업 494곳의\n투자금 잔존율과 서버비 추이', desc: '현금 흐름과 지출 데이터 기반 분석' },
                  { ico: '03', title: '우리 회사 자가진단 5문항', desc: '우리 회사의 숫자로 현장에서 점검' },
                  { ico: '04', title: 'B2B 테크 대표 네트워킹 30분', desc: '같은 고민을 가진 참석자들과의 대화' },
                ].map((b, i) => (
                  <div key={i} style={{ background: '#fff', border: `1px solid ${accentBorder}`, borderRadius: '0.75rem', padding: '1.5rem 1.25rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 800, letterSpacing: '0.04em', color: accentColor, marginBottom: '0.75rem' }}>{b.ico}</div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#222', marginBottom: '0.375rem', lineHeight: '1.4', whiteSpace: 'pre-line' }}>{b.title}</h4>
                    <p style={{ fontSize: '0.875rem', color: '#888', margin: 0 }}>{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 개요 */}
        <section className="report-section" style={{ background: '#ffffff' }}>
          <div className="report-container">
            <div style={{ maxWidth: '640px', margin: '0 auto' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '2rem', color: '#111' }}>개요</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {[
                    { th: '일시', td: '2026년 8월 25일(화) 18:00~20:00' },
                    { th: '장소', td: '고위드 사옥 14층 대회의실 · 서울' },
                    { th: '정원', td: '30명 · 추첨', hi: true },
                    { th: '참가비', td: '무료' },
                    { th: '신청 마감', td: '2026년 8월 23일(일)' },
                  ].map((row, i) => (
                    <tr key={i}>
                      <th style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #e8e8e8', textAlign: 'left', fontSize: '1rem', width: '150px', color: '#888', fontWeight: 600 }}>{row.th}</th>
                      <td style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #e8e8e8', textAlign: 'left', fontSize: '1rem', color: row.hi ? accentColor : '#222', fontWeight: row.hi ? 700 : 400 }}>{row.td}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="report-section" style={{ background: '#ffffff' }}>
          <div className="report-container">
            <div style={{ maxWidth: '640px', margin: '0 auto' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '2rem', color: '#111' }}>자주 묻는 질문</h2>
              {[
                { q: '선착순인가요?', a: '아닙니다. 정원 30명 중 추첨으로 참석자를 확정하며, 신청하신 연락처로 결과를 개별 안내합니다.' },
                { q: '온라인으로 참여할 수 있나요?', a: '이번 행사는 오프라인으로만 진행합니다. 자가진단 실습과 네트워킹은 현장에서 진행하며 온라인으로 송출하지 않습니다.' },
                { q: '참가 비용이 있나요?', a: '참가비는 없습니다.' },
                { q: '벤치마크 리포트 두 편은 받을 수 있나요?', a: '발표 자료와 벤치마크 리포트는 광고성 정보 수신 및 제3자 제공에 동의한 참석자에게 제공합니다.' },
                { q: '우리 회사가 두 분야에 정확히 해당하지 않아도 신청할 수 있나요?', a: '신청할 수 있습니다. 세션 1과 세션 2는 업종과 관계없이 적용할 수 있는 현금 관리 원칙을 다룹니다. 신청할 때 기업 분야에서 그 외를 선택해 주세요.' },
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
                  <div style={{ maxHeight: openFaq === i ? '320px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                    <p style={{ padding: '0 0 1.5rem', fontSize: '0.9375rem', lineHeight: '1.7', color: '#666' }}>{faq.a}</p>
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
              <h3 className="report-h3" style={{ color: '#111' }}>
                <strong>손익계산서에 없는 신호를,<br />내 회사의 숫자로 확인하는 자리입니다</strong>
              </h3>
              <button
                onClick={openModal}
                className="report-button-cta"
                style={{ background: accentColor, color: '#fff', boxShadow: '0 4px 20px rgba(52, 87, 213, 0.22)', cursor: 'pointer' }}
              >
                참가 신청하기
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
                '오프라인 행사이며 고위드 사옥 14층 대회의실에서 진행합니다.',
                '정원은 30명이며 추첨 결과를 신청자에게 개별 안내합니다.',
                '참가비는 없으며 신청 마감은 2026년 8월 23일(일)입니다.',
                '발표 자료와 벤치마크 리포트는 광고성 정보 수신 및 제3자 제공에 동의한 참석자에게 제공합니다.',
              ].map((notice, i) => (
                <p key={i} style={{ fontSize: '0.8125rem', lineHeight: '1.6', color: '#999', marginBottom: '0.375rem' }}>
                  <span>· </span>{notice}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="report-footer" style={{ background: tint, borderTop: '1px solid #e0e0e0' }}>
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
              <h2 className="modal-title">참가 신청</h2>
              <p className="modal-description">8월 25일(화) 오후 6시 · 고위드 사옥 14층</p>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div style={{ background: tint, border: `1px solid ${accentBorder}`, borderRadius: '0.75rem', padding: '1.25rem 1.5rem', marginBottom: '1.75rem', fontSize: '0.875rem', color: '#444', lineHeight: '1.7' }}>
                <p style={{ margin: '0 0 0.75rem' }}><strong>테크 기업의 자금 관리 공식</strong>에 신청해 주셔서 감사합니다.</p>
                <p style={{ margin: 0 }}>이 행사는 B2B 소프트웨어·SaaS와 AI·머신러닝 기업의 대표, 재무 담당자를 위한 자리입니다. 정원 30명 중 추첨으로 참석자를 확정하며 결과는 개별 안내합니다.</p>
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
                <label htmlFor="domain" className="form-label">기업 분야 <span className="required">*</span></label>
                <select id="domain" name="domain" value={formData.domain} onChange={handleChange} className="form-input" required>
                  <option value="">선택해 주세요</option>
                  <option value="B2B 소프트웨어·SaaS">B2B 소프트웨어·SaaS</option>
                  <option value="AI·머신러닝">AI·머신러닝</option>
                  <option value="그 외">그 외</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="annualRevenue" className="form-label">연매출 <span className="required">*</span></label>
                <select id="annualRevenue" name="annualRevenue" value={formData.annualRevenue} onChange={handleChange} className="form-input" required>
                  <option value="">선택해 주세요</option>
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
                <label htmlFor="phone" className="form-label">연락처 <span className="required">*</span></label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="form-input" placeholder="010-1234-5678" required />
              </div>
              <div className="form-group">
                <label htmlFor="question" className="form-label">사전 질문</label>
                <textarea id="question" name="question" value={formData.question} onChange={handleChange} className="form-input" placeholder="세미나에서 다뤘으면 하는 질문을 남겨 주세요" rows={3} style={{ resize: 'vertical', fontFamily: 'inherit' }} />
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
