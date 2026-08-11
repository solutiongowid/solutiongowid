'use client';

import { useState, useEffect, FormEvent, Fragment } from 'react';
import Image from 'next/image';

export default function FnbFinanceWebinarPage() {
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
    businessType: '',
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
    if (!formData.position.trim()) { setSubmitError('직급을 입력해주세요.'); return; }
    if (!formData.annualRevenue) { setSubmitError('연매출을 선택해주세요.'); return; }
    if (!formData.businessType) { setSubmitError('사업 형태를 선택해주세요.'); return; }
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
        businessType: formData.businessType,
        email: formData.email,
        phone: formData.phone,
        question: formData.question,
        agreePrivacy: formData.agreePrivacy,
        webinar_type: 'fnb-finance-webinar',
        ...Object.fromEntries(Object.entries(utmParams).filter(([, v]) => v)),
      };

      const response = await fetch('/api/fnb-finance-webinar-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '제출에 실패했습니다.');

      window.location.href = '/event/fnb-finance-webinar/thank-you';
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const accentColor = '#FF6B35';
  const accentLight = 'rgba(255, 107, 53, 0.08)';
  const accentBorder = 'rgba(255, 107, 53, 0.18)';

  const chains = [
    {
      label: '푸드커머스',
      nodes: [
        { text: '원물 · OEM 매입', tag: '돈이 먼저 나감', variant: 'out' },
        { text: '제조 · 입고' },
        { text: '컬리 · 쿠팡 · 백화점 판매' },
        { text: '수수료 차감 후 정산', tag: '돈이 나중에 들어옴', variant: 'in' },
      ],
      note: <>입점이 늘수록 매입은 앞당겨지고, 정산은 <strong style={{ color: accentColor }}>40~60일 뒤</strong>에 들어옵니다.</>,
    },
    {
      label: '프랜차이즈 본부',
      nodes: [
        { text: '원물 매입', tag: '돈이 먼저 나감', variant: 'out' },
        { text: '제조공장' },
        { text: '3PL 물류 입고' },
        { text: '가맹점 발주' },
        { text: '수수료 차감 후 정산', tag: '돈이 나중에 들어옴', variant: 'in' },
      ],
      note: <>매입 대금은 <strong style={{ color: accentColor }}>본사가 먼저</strong> 결제하고, 가맹점 발주분은 물류를 거쳐 <strong style={{ color: accentColor }}>나중에</strong> 돌아옵니다.</>,
    },
  ];

  return (
    <>
      <div className="report-page" style={{ background: '#ffffff', color: '#222', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
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
                  무료 웨비나 신청하기
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
                  8월 19일 (수) 오후 4시~5시 30분 | 온라인 Zoom 라이브
                </span>
              </div>
              <h1 className="report-h1" style={{ textAlign: 'center', marginBottom: '1rem', color: '#111' }}>
                <strong>F&amp;B 브랜드의<br />현금 공백</strong>
              </h1>
              <p className="report-subtitle" style={{ textAlign: 'center', marginBottom: '2.5rem', color: '#3a3a3a' }}>
                그리고, 먼저 메운 브랜드들의 이야기
              </p>
              <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Image
                  src="/fnb-finance-webinar-thumbnail.png"
                  alt="F&B 브랜드의 현금 공백 - GOWID 웨비나"
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
        <section className="report-section" style={{ background: '#fff8f4' }}>
          <div className="report-container">
            <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
              <h2 className="report-h2" style={{ color: '#111', textAlign: 'center', marginBottom: '1.5rem' }}>
                매입은 먼저, 정산은 나중입니다
              </h2>
              <p style={{ fontSize: '1.0625rem', color: '#333', lineHeight: '1.9', marginBottom: '2rem' }}>
                푸드커머스 브랜드와 프랜차이즈 본부는 같은 자리에서 돈이 묶입니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', maxWidth: '640px', margin: '0 auto 2rem', textAlign: 'left' }}>
                {[
                  <><strong>회수보다 지출이 먼저 옵니다.</strong> 대형 유통 정산은 40~60일인데, 원부재료와 OEM 발주는 선결제입니다. 이번 정산이 들어오기 전에 다음 매입일이 돌아옵니다.</>,
                  <><strong>가장 많이 사야 할 때 현금이 가장 얇습니다.</strong> 명절·기획전에는 평소의 3~5배를 미리 확보해야 합니다. 연매출의 8~12%가 한 달에 나갑니다.</>,
                  <><strong>결제 수단이 막혀 있기도 합니다.</strong> 산지·경매·원물 공급사, 식자재·집기 거래처는 현금과 송금만 받습니다. 카드 한도가 있어도 못 쓰는 자리입니다.</>,
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '1rem 1.25rem', background: accentLight, border: `1px solid ${accentBorder}`, borderRadius: '0.75rem' }}>
                    <div style={{ flexShrink: 0, width: '1.35rem', height: '1.35rem', marginTop: '0.25rem', background: accentColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.7rem', fontWeight: 700 }}>{i + 1}</div>
                    <p style={{ fontSize: '1.0625rem', lineHeight: '1.7', color: '#333', margin: 0 }}>{text}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '1.0625rem', color: '#333', lineHeight: '1.9' }}>
                매출이 커질수록 이 구간도 같이 길어집니다.<br />
                우리 회사가 며칠이나 묶여 있는지 재는 법부터, 같은 자리를 먼저 메운 브랜드들이 무엇을 바꿨는지 짚어드립니다.
              </p>
            </div>
          </div>
        </section>

        {/* 자금이 묶이는 구간 도식 */}
        <section className="report-section" style={{ background: '#ffffff' }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="report-h2" style={{ color: '#111', textAlign: 'center', marginBottom: '2.5rem' }}>
                프랜차이즈 &amp; 푸드 마켓, 돈이 묶이는 자리는 같습니다
              </h2>

              {chains.map((chain, ci) => (
                <div key={ci} style={{ marginBottom: '1.5rem', border: `1px solid ${accentBorder}`, borderRadius: '1rem', background: '#fff', padding: '1.5rem' }}>
                  <span style={{ display: 'inline-block', marginBottom: '1rem', borderRadius: '9999px', background: accentLight, padding: '0.375rem 0.875rem', fontSize: '0.875rem', fontWeight: 700, color: accentColor }}>
                    {chain.label}
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', gap: '0.5rem' }}>
                    {chain.nodes.map((node, ni) => (
                      <Fragment key={ni}>
                        {ni > 0 && <span style={{ display: 'flex', alignItems: 'center', color: '#ccc', fontSize: '1.125rem', flexShrink: 0 }}>→</span>}
                        <span
                          style={{
                            display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.25rem',
                            flex: '1 1 auto', minWidth: '8.5rem', borderRadius: '0.625rem', padding: '0.75rem 0.875rem',
                            fontSize: '0.9375rem', fontWeight: 600, textAlign: 'center', lineHeight: '1.45',
                            border: node.variant ? `1px solid ${accentColor}` : '1px solid #e6e6e6',
                            background: node.variant === 'out' ? accentColor : node.variant === 'in' ? '#fff' : '#fafafa',
                            color: node.variant === 'out' ? '#fff' : node.variant === 'in' ? accentColor : '#444',
                          }}
                        >
                          {node.text}
                          {node.tag && <em style={{ fontStyle: 'normal', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.02em', color: node.variant === 'out' ? 'rgba(255,255,255,.85)' : accentColor }}>{node.tag}</em>}
                        </span>
                      </Fragment>
                    ))}
                  </div>
                  <p style={{ margin: '1rem 0 0', borderTop: `1px dashed ${accentBorder}`, paddingTop: '0.875rem', fontSize: '0.9375rem', lineHeight: '1.6', color: '#777' }}>{chain.note}</p>
                </div>
              ))}

              <p style={{ margin: '1.5rem 0 0', textAlign: 'center', fontSize: '1.0625rem', lineHeight: '1.8', color: '#333' }}>
                파는 곳이 대형 유통이냐 가맹점이냐만 다를 뿐,<br />
                <strong>돈이 묶이는 구간은 똑같이 매입과 정산 사이</strong>입니다.
              </p>
            </div>
          </div>
        </section>

        {/* 이런 분들께 추천합니다 */}
        <section className="report-section" style={{ background: '#fff8f4' }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '1rem', color: '#111' }}>이런 분들께 추천합니다</h2>
              <p style={{ fontSize: '1rem', color: '#888', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                아래 한 자리라도 해당하신다면, 90분이 아깝지 않으실 겁니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '640px', margin: '0 auto' }}>
                {[
                  <>대형 유통에 입점했는데 <strong>정산이 두 달 뒤에</strong> 들어오는 푸드커머스 브랜드</>,
                  <>원물 매입은 먼저 하고, <strong>가맹점·물류 정산은 나중에</strong> 들어오는 프랜차이즈 본부</>,
                  <>명절·기획전 비축에 <strong>현금이 한 번에 빠지는</strong> 식품 제조·유통 브랜드</>,
                  <><strong>매입과 정산의 시차 때문에</strong> 매월 자금 스케줄로 고민이 있는 재무 담당</>,
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: accentLight, border: `1px solid ${accentBorder}`, borderRadius: '0.75rem', padding: '1.125rem 1.375rem', textAlign: 'left' }}>
                    <div style={{ flexShrink: 0, width: '1.5rem', height: '1.5rem', background: accentColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>✓</div>
                    <p style={{ fontSize: '1.05rem', lineHeight: '1.65', color: '#222', margin: 0 }}>{text}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={openModal}
                className="report-button-primary"
                style={{ marginTop: '2.5rem', background: accentColor, color: '#fff', boxShadow: '0 4px 20px rgba(255, 107, 53, 0.25)', cursor: 'pointer' }}
              >
                무료 웨비나 신청하기
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
                  { time: '16:00 ~ 16:05', title: '오프닝 — 돈이 나가는 날과 들어오는 날', speaker: '문미성 · 고위드' },
                  { time: '16:05 ~ 16:50', session: '1부', title: '버는 돈에서 쥐는 돈까지, 그리고 현금을 지키는 법', speakerName: '문미성', speakerCompany: '고위드', details: ['매출 → GP → OP → 현금, 네 칸을 내려오며 돈이 새는 자리', '영업흑자인데 통장이 마르는 이유', '얼마를 남겨야 버티는지 — 공헌이익률로 기준선 정하기', '확장은 여윳돈 안에서만 — 잉여현금흐름으로 판단하기', '매일 · 매주 · 매월 현금 관리 루틴', '자본의 세 가지 구분 — 에쿼티 · 대출 · 잉여현금흐름', '변동비는 카드로 조달하고, 현금은 기준선 지키는 데 씁니다', '결제부터 납부까지 최대 53일 — 결제일을 단가 협상 카드로 쓰는 법', '그리고 카드를 안 받는 거래처는 어떻게 넘는가'] },
                  { time: '16:50 ~ 17:20', session: '2부', title: '데이터로 본 푸드·프랜차이즈의 자금 구간', speakerName: '김병권', speakerCompany: '고위드', details: ['매입에서 정산까지 — 우리 회사가 며칠 묶여 있는지 재는 법', '재고와 정산에 묶이는 돈은 매출의 16~18%', '원물 매입 → 제조공장 → 3PL → 가맹점 정산, 본사 돈이 지나는 길', '명절·성수기 평시 대비 3~5배, 연매출의 8~12%', '먼저 메운 브랜드들 — 원물 매입 · 플랫폼 정산 · 물류 정산 · 시즌 비축', '지금 바꿔야 하는 회사, 아직 그대로여도 되는 회사'] },
                  { time: '17:20 ~ 17:30', title: 'Q&A · 클로징', speaker: '연사 전원' },
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
                  { time: '16:00 ~ 16:05', title: '오프닝 — 돈이 나가는 날과 들어오는 날', speaker: '문미성 · 고위드' },
                  { time: '16:05 ~ 16:50', session: '1부', title: '버는 돈에서 쥐는 돈까지, 그리고 현금을 지키는 법', speakerName: '문미성', speakerCompany: '고위드', details: ['매출→GP→OP→현금, 돈이 새는 자리', '공헌이익률로 기준선 정하기', '결제부터 납부까지 최대 53일'] },
                  { time: '16:50 ~ 17:20', session: '2부', title: '데이터로 본 푸드·프랜차이즈의 자금 구간', speakerName: '김병권', speakerCompany: '고위드', details: ['며칠 묶여 있는지 재는 법', '재고·정산에 묶이는 돈 16~18%', '먼저 메운 브랜드들의 대응'] },
                  { time: '17:20 ~ 17:30', title: 'Q&A · 클로징', speaker: '연사 전원' },
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
                  { icon: '🧮', title: '현금 공백 자가진단 양식', desc: '세 공백 중 어디서 묶이는지 직접 확인' },
                  { icon: '🤝', title: '한도 사전 조회\n+ 1:1 자금운영 상담', desc: '신청 즉시 확인, 상담권 제공' },
                  { icon: '📄', title: '발표 자료 PDF 제공', desc: '당일 참석자 대상' },
                  { icon: '🎥', title: '녹화본 다시보기', desc: '신청자 전원 이메일 발송' },
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
                { q: '진행 방식이 어떻게 되나요?', a: '온라인 Zoom 라이브로 진행합니다. 신청 완료 시 이메일로 접속 링크를 안내드립니다.' },
                { q: '참여 비용이 있나요?', a: '네, 참가비는 없습니다.' },
                { q: '참석하지 못하면 녹화본을 받을 수 있나요?', a: '네, 종료 후 신청자 전원에게 녹화본을 이메일로 발송해 드립니다.' },
                { q: '푸드커머스와 프랜차이즈를 같이 다루던데, 우리 회사에 맞나요?', a: '두 업종은 돈이 묶이는 자리가 같습니다. 원물이나 완제품을 먼저 매입하고, 파는 곳(대형 유통 또는 가맹점)에서 수수료를 뗀 정산이 나중에 들어오는 구조가 동일합니다. 세션을 업종이 아니라 매입에서 정산까지의 구간으로 나눠 구성했고, 각 구간마다 푸드와 프랜차이즈 사례를 함께 다룹니다.' },
                { q: '사전 질문은 어떻게 활용되나요?', a: '신청 시 남겨주신 질문을 본론과 Q&A 시간에 우선 다뤄드립니다.' },
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
                  <div style={{ maxHeight: openFaq === i ? '400px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                    <p style={{ padding: '0 0 1.5rem', fontSize: '0.9375rem', lineHeight: '1.75', color: '#666' }}>{faq.a}</p>
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
                <strong>매입과 정산 사이, 우리 회사는 며칠이나 묶여 있을까요?</strong>
              </h3>
              <button
                onClick={openModal}
                className="report-button-cta"
                style={{ background: accentColor, color: '#fff', boxShadow: '0 4px 20px rgba(255, 107, 53, 0.25)', cursor: 'pointer' }}
              >
                무료 웨비나 신청하기
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
                '본 행사는 온라인(Zoom)에서 진행되며, 참가 확정자분들께 접속 링크를 안내드립니다.',
                '참가비가 없는 무료 행사입니다.',
                '녹화본은 웨비나 종료 후 신청자 전원에게 이메일로 발송해 드립니다.',
                '발표 자료와 한도 사전 조회·1:1 자금운영 상담은 당일 참석자를 대상으로 제공합니다.',
                '참가자 모집은 조기 마감될 수 있습니다.',
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
              <h2 className="modal-title">무료 웨비나 신청</h2>
              <p className="modal-description">8월 19일(수) 오후 4시~5시 30분 · 온라인 Zoom</p>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div style={{ background: '#fff8f4', border: `1px solid ${accentBorder}`, borderRadius: '0.75rem', padding: '1.25rem 1.5rem', marginBottom: '1.75rem', fontSize: '0.875rem', color: '#444', lineHeight: '1.75' }}>
                <p style={{ margin: '0 0 0.75rem' }}>안녕하세요,<br /><strong>F&amp;B 브랜드의 현금 공백</strong> 웨비나에 관심을 가져주셔서 감사드립니다.</p>
                <p style={{ margin: '0 0 0.75rem' }}>본 행사는 <strong>푸드커머스 브랜드와 프랜차이즈 본부의 대표, 재무 운영 담당</strong> 분들을 위한 자리입니다.</p>
                <p style={{ margin: 0, fontWeight: '600', color: accentColor }}>신청자 전원에게 녹화본을 보내드립니다.</p>
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
                <label htmlFor="department" className="form-label">부서</label>
                <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} className="form-input" placeholder="경영기획팀, 재무팀 등" />
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
                <label htmlFor="businessType" className="form-label">사업 형태 <span className="required">*</span></label>
                <select id="businessType" name="businessType" value={formData.businessType} onChange={handleChange} className="form-input" required>
                  <option value="">선택해주세요</option>
                  <option value="푸드커머스 (식품 제조·유통·D2C)">푸드커머스 (식품 제조·유통·D2C)</option>
                  <option value="외식 브랜드 (직영 운영)">외식 브랜드 (직영 운영)</option>
                  <option value="프랜차이즈 본부 (가맹사업)">프랜차이즈 본부 (가맹사업)</option>
                  <option value="기타">기타</option>
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
                <label htmlFor="question" className="form-label">사전 질문</label>
                <textarea id="question" name="question" value={formData.question} onChange={handleChange} className="form-input" placeholder="자유롭게 작성해주세요" rows={3} style={{ resize: 'vertical', fontFamily: 'inherit' }} />
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
