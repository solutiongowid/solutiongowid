'use client';

import { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';

export default function CommerceGrowthWebinarPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [utmParams, setUtmParams] = useState({ utm_source: '', utm_medium: '', utm_campaign: '' });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
    });
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    department: '',
    position: '',
    email: '',
    phone: '',
    question: '',
    serviceInterest: '',
    agreePrivacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsSuccess(false);
    setSubmitError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    if (!formData.email.trim()) { setSubmitError('회사 이메일을 입력해주세요.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { setSubmitError('올바른 이메일 형식을 입력해주세요.'); return; }
    if (!formData.phone.trim()) { setSubmitError('전화번호를 입력해주세요.'); return; }
    if (!formData.agreePrivacy) { setSubmitError('개인정보 처리방침 및 마케팅 수신 동의가 필요합니다.'); return; }

    setIsSubmitting(true);
    try {
      const now = new Date();
      const kstTime = new Date(now.getTime() + (9 * 60 * 60 * 1000));
      const formattedTimestamp = kstTime.toISOString().replace('T', ' ').substring(0, 19) + ' (KST)';

      const response = await fetch('/api/commerce-webinar-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, timestamp: formattedTimestamp, ...utmParams }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '제출에 실패했습니다.');

      setIsSuccess(true);
      setFormData({ name: '', companyName: '', department: '', position: '', email: '', phone: '', question: '', serviceInterest: '', agreePrivacy: false });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const accentColor = '#0B8059';
  const accentLight = 'rgba(11, 128, 89, 0.08)';
  const accentBorder = 'rgba(11, 128, 89, 0.18)';

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
              <button className="report-nav-button" onClick={openModal} style={{ background: accentColor, color: '#fff' }}>
                무료 웨비나 신청하기
              </button>
            </div>
          </div>
        </nav>

        {/* 히어로 섹션 */}
        <header className="report-header" style={{ background: 'linear-gradient(180deg, #f0f7f0 0%, #ffffff 100%)', padding: '8rem 0 5rem' }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <span className="badge" style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem', background: accentLight, color: accentColor, border: `1px solid ${accentBorder}` }}>3월 24일 (화) 오후 4시 | 온라인 웨비나</span>
              </div>
              <h1 className="report-h1" style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#111' }}>
                <strong>
                  다채널 커머스,<br />성장의 착시를 걷어내다
                </strong>
              </h1>
              <p className="report-subtitle" style={{ textAlign: 'center', marginBottom: '2.5rem', color: '#666', fontStyle: 'italic' }}>
                운영 구조를 해부하고,<br className="mobile-only-br" /> 현금 흐름을 재설계하다
              </p>
              <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Image
                  src="/commerce-webinar-thumbnail.png"
                  alt="다채널 커머스, 성장의 착시를 걷어내다 - GoWid x 파스토 웨비나"
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
        <section className="report-section" style={{ background: '#f7faf7', padding: '5rem 0' }}>
          <div className="report-container">
            <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
              <h2 className="report-h2" style={{ color: '#111', textAlign: 'center', marginBottom: '1.5rem' }}>행사 소개</h2>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: accentColor, lineHeight: '1.45', marginBottom: '2.5rem' }}>
                &ldquo;매출이 늘어도<br className="mobile-only-br" /> 현금은 줄어들 수 있습니다.&rdquo;
              </h2>
              <p style={{ fontSize: '1.0625rem', color: '#333', lineHeight: '1.9', marginBottom: '1.5rem' }}>
                문제는 &lsquo;성장&rsquo;이 아니라 &lsquo;구조&rsquo;입니다.
              </p>
              <p style={{ fontSize: '1.0625rem', color: '#333', lineHeight: '1.9', marginBottom: '1.5rem' }}>
                다채널 확장과 광고 효율 개선에도 불구하고,<br />
                <strong>체감 수익은 오히려 줄어든 커머스 기업이 늘고 있습니다.</strong>
              </p>
              <p style={{ fontSize: '1.0625rem', color: '#333', lineHeight: '1.9', marginBottom: '1.5rem' }}>
                ROAS는 개선됐는데 순이익은 하락하고,<br />
                채널을 확대할수록 현금 잔고는 줄어들고,<br />
                재고는 쌓이는데 팔 수 있는 현금은 부족한 구조.
              </p>
              <p style={{ fontSize: '1.0625rem', color: '#333', lineHeight: '1.9' }}>
                고위드와 파스토가 함께<br />
                <strong>&lsquo;성장처럼 보이는 구조적 착시&rsquo;를 해부하고,</strong><br />
                <strong>현금 흐름과 운영 구조를 동시에 설계하는 방법을 제시합니다.</strong>
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
                아래에 해당하신다면, 이 웨비나가 답이 됩니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '600px', margin: '0 auto' }}>
                {[
                  <>매출은 성장하는데 <strong>체감 수익이 줄어드는 느낌</strong>을<br />받고 있는 커머스 기업 대표</>,
                  <>2개 이상 채널을 운영하며 <strong>채널별 실제 수익성을 점검</strong>하고<br />싶은 경영진</>,
                  <>물동량은 늘었는데 <strong>물류 비용이 매출보다 빠르게 증가</strong>하는<br />운영 담당자</>,
                  <>광고비 선집행·선매입으로 <strong>현금 흐름이 빠듯해진</strong><br />재무 담당자</>,
                  <>하반기 성장을 위해 <strong>운영 구조와 현금 구조를 동시에 점검</strong>하고<br />싶은 실무진</>,
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: accentLight, border: `1px solid ${accentBorder}`, borderRadius: '0.75rem', padding: '1rem 1.25rem', textAlign: 'left' }}>
                    <div style={{ flexShrink: 0, width: '1.5rem', height: '1.5rem', background: accentColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg viewBox="0 0 14 14" fill="none" width="14" height="14"><path d="M3 7L6 10L11 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <p style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1.2rem)', lineHeight: '1.6', color: '#222', margin: 0 }}>{text}</p>
                  </div>
                ))}
              </div>

              <button onClick={openModal} className="report-button-primary" style={{ marginTop: '2.5rem', background: accentColor, color: '#fff', boxShadow: '0 4px 20px rgba(11, 128, 89, 0.25)' }}>
                무료 웨비나 신청하기
              </button>
            </div>
          </div>
        </section>

        {/* 발표 기업 소개 */}
        <section className="report-section" style={{ background: '#ffffff' }}>
          <div className="report-container">
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '2rem', color: '#111' }}>발표 기업 소개</h2>
              <div className="cosmetic-company-grid">
                <div style={{ background: '#f7faf7', borderRadius: '0.75rem', padding: '2rem 1.5rem', border: `1px solid ${accentBorder}` }}>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <Image src="/gowid-logo.svg" alt="GOWID" width={84} height={28} />
                  </div>
                  <p style={{ fontSize: '0.9375rem', lineHeight: '1.7', color: '#555' }}>
                    커머스 기업 전용 법인카드·자금 운영 솔루션을 제공하는 핀테크 기업입니다. 387개 커머스 기업의 실제 재무 데이터를 분석하며, 채널별 수익 구조 진단부터 현금흐름 재설계까지 — 커머스 기업이 &lsquo;성장하면서도 돈이 남는 구조&rsquo;를 만들 수 있도록 돕습니다.
                  </p>
                </div>
                <div style={{ background: '#f7faf7', borderRadius: '0.75rem', padding: '2rem 1.5rem', border: `1px solid ${accentBorder}` }}>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <Image src="/fassto-logo.png" alt="FASSTO" width={100} height={28} style={{ objectFit: 'contain' }} />
                  </div>
                  <p style={{ fontSize: '0.9375rem', lineHeight: '1.7', color: '#555' }}>
                    풀필먼트 서비스를 제공하는 물류 테크 기업입니다. 입고·보관·출고·배송·반품까지 커머스 물류 전 과정을 운영하며, 성장 구간에서 드러나는 운영 구조의 리스크를 데이터 기반으로 진단합니다. 구조가 준비된 상태에서 매출을 올려야 비용 곡선을 통제할 수 있다는 관점으로, 커머스 기업의 지속 가능한 성장을 지원합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 프로그램 안내 */}
        <section className="report-section" style={{ background: '#f7faf7' }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '3rem', color: '#111' }}>프로그램 안내</h2>

              {/* 타임테이블 - PC */}
              <div className="cosmetic-timetable-pc" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 160px', gap: '1rem', padding: '1rem 0', borderBottom: `1px solid ${accentBorder}` }}>
                  <div style={{ fontSize: '1rem', color: '#888' }}>시간</div>
                  <div style={{ fontSize: '1rem', color: '#888' }}>세션</div>
                  <div style={{ fontSize: '1rem', color: '#888' }}>연사</div>
                </div>
                {[
                  { time: '16:00 ~ 16:05', title: '오프닝', speaker: '연사 전원' },
                  {
                    time: '16:05 ~ 16:15', session: 'Session 01', title: '우리는 진짜 성장하고 있는가?', speakerName: '문미성 리드', speakerCompany: '고위드',
                    details: ['매출 증가 vs 체감 수익의 괴리', '채널 확장 이후 현금 감소 사례', '프로모션·정산 구조가 만드는 착시'],
                    highlight: '매출이 늘수록 리스크도 함께 커지고 있지는 않은가?',
                  },
                  {
                    time: '16:15 ~ 16:25', session: 'Session 02', title: "채널별 '진짜' 공헌이익 분해", speakerName: '문미성 리드', speakerCompany: '고위드',
                    details: ['채널·공급처별 매출 구조 분해', '광고비, PG, 물류, 반품, 프로모션 완전 분해', '정산 주기 차이에 따른 현금 왜곡'],
                    highlight: '흑자 채널과 현금 창출 채널은 다를 수 있다',
                  },
                  {
                    time: '16:25 ~ 16:45', session: 'Session 03', title: '성장 구간에서 드러나는 세 가지 구조적 신호', speakerName: '김영근 본부장', speakerCompany: '파스토',
                    details: ['물동량 증가 속도 대비 비용 통제 가능성', '피크 시즌에도 SLA 안정성 유지 여부', '재고 정확도가 수익 지표로 관리되는지 여부'],
                    highlight: '구조가 준비되지 않은 상태에서 매출을 올리면 비용 곡선이 더 가파르게 상승한다',
                  },
                  {
                    time: '16:45 ~ 17:00', session: 'Session 04', title: '구조를 바로 세운 다음: 현금 흐름 최적화', speakerName: '문미성 리드', speakerCompany: '고위드',
                    details: ['채널별 정산 주기 지도화', '매입·광고 선집행 구조 해부', '재고 회전일수와 현금 묶임 관계'],
                    highlight: '손익계산서는 흑자인데 통장은 적자인 기업이 생기는 이유',
                  },
                  {
                    time: '17:00 ~ 17:15', session: 'Session 05', title: '성장을 가속하는 기업은 무엇이 다른가', speakerName: '김영근 본부장', speakerCompany: '파스토',
                    details: ['운영 데이터 기반 의사결정 체계', '재고 회전과 배송 안정성의 전략적 관리', '구조를 설계한 기업 vs 감으로 확장한 기업의 차이'],
                    highlight: '하반기 성장을 위한 구조 점검 체크리스트 제시',
                  },
                  { time: '17:15 ~ 17:30', title: '실무 Q&A 및 패널토크', speaker: '연사 전원' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 160px', gap: '1rem', padding: '1.25rem 0', borderBottom: '1px solid #e0e0e0', alignItems: item.details ? 'start' : 'center' }}>
                    <div style={{ fontSize: '1.0625rem', fontWeight: '600', color: '#222' }}>{item.time}</div>
                    <div>
                      {item.session && <div style={{ fontSize: '1rem', fontWeight: '700', color: accentColor, marginBottom: '0.25rem' }}>{item.session}</div>}
                      <div style={{ fontSize: '1.0625rem', color: '#222', marginBottom: item.details ? '0.75rem' : '0' }}>{item.title}</div>
                      {item.details && (
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {item.details.map((d, j) => (
                            <li key={j} style={{ fontSize: '0.9375rem', lineHeight: '1.6', color: '#777', paddingLeft: '0.875rem', position: 'relative', marginBottom: '0.25rem' }}>
                              <span style={{ position: 'absolute', left: 0, top: '0.5rem', width: '0.3rem', height: '0.3rem', background: accentColor, borderRadius: '50%', display: 'block' }} />
                              {d}
                            </li>
                          ))}
                          {item.highlight && (
                            <li style={{ fontSize: '0.9375rem', lineHeight: '1.6', color: '#444', paddingLeft: '0.875rem', position: 'relative', fontWeight: '600' }}>
                              <span style={{ position: 'absolute', left: 0, top: '0.5rem', width: '0.3rem', height: '0.3rem', background: accentColor, borderRadius: '50%', display: 'block' }} />
                              {item.highlight}
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                    <div>
                      {item.speaker ? (
                        <div style={{ fontSize: '1.0625rem', color: '#888' }}>{item.speaker}</div>
                      ) : (
                        <>
                          <div style={{ fontSize: '1.0625rem', fontWeight: '600', color: accentColor }}>{item.speakerName}</div>
                          <div style={{ fontSize: '1rem', color: '#888' }}>{item.speakerCompany}</div>
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
                    time: '16:05 ~ 16:15', session: 'Session 01', title: '우리는 진짜 성장하고 있는가?', speakerName: '문미성 리드', speakerCompany: '고위드',
                    details: ['매출 증가 vs 체감 수익의 괴리', '채널 확장 이후 현금 감소 사례', '프로모션·정산 구조가 만드는 착시'],
                    highlight: '매출이 늘수록 리스크도 함께 커지고 있지는 않은가?',
                  },
                  {
                    time: '16:15 ~ 16:25', session: 'Session 02', title: "채널별 '진짜' 공헌이익 분해", speakerName: '문미성 리드', speakerCompany: '고위드',
                    details: ['채널·공급처별 매출 구조 분해', '광고비, PG, 물류, 반품, 프로모션 완전 분해', '정산 주기 차이에 따른 현금 왜곡'],
                    highlight: '흑자 채널과 현금 창출 채널은 다를 수 있다',
                  },
                  {
                    time: '16:25 ~ 16:45', session: 'Session 03', title: '성장 구간에서 드러나는 세 가지 구조적 신호', speakerName: '김영근 본부장', speakerCompany: '파스토',
                    details: ['물동량 증가 속도 대비 비용 통제 가능성', '피크 시즌에도 SLA 안정성 유지 여부', '재고 정확도가 수익 지표로 관리되는지 여부'],
                    highlight: '구조가 준비되지 않은 상태에서 매출을 올리면 비용 곡선이 더 가파르게 상승한다',
                  },
                  {
                    time: '16:45 ~ 17:00', session: 'Session 04', title: '구조를 바로 세운 다음: 현금 흐름 최적화', speakerName: '문미성 리드', speakerCompany: '고위드',
                    details: ['채널별 정산 주기 지도화', '매입·광고 선집행 구조 해부', '재고 회전일수와 현금 묶임 관계'],
                    highlight: '손익계산서는 흑자인데 통장은 적자인 기업이 생기는 이유',
                  },
                  {
                    time: '17:00 ~ 17:15', session: 'Session 05', title: '성장을 가속하는 기업은 무엇이 다른가', speakerName: '김영근 본부장', speakerCompany: '파스토',
                    details: ['운영 데이터 기반 의사결정 체계', '재고 회전과 배송 안정성의 전략적 관리', '구조를 설계한 기업 vs 감으로 확장한 기업의 차이'],
                    highlight: '하반기 성장을 위한 구조 점검 체크리스트 제시',
                  },
                  { time: '17:15 ~ 17:30', title: '실무 Q&A 및 패널토크', speaker: '연사 전원' },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '1.25rem 0', borderBottom: '1px solid #e0e0e0' }}>
                    <div style={{ fontSize: '0.8125rem', color: '#888', marginBottom: '0.25rem' }}>{item.time}</div>
                    {item.session && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
                        <span style={{ fontSize: '0.8125rem', fontWeight: '700', color: accentColor }}>{item.session}</span>
                        <span style={{ fontSize: '0.8125rem', color: '#888' }}><span style={{ color: accentColor, fontWeight: '600' }}>{item.speakerName}</span> · {item.speakerCompany}</span>
                      </div>
                    )}
                    <div style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#222', marginBottom: item.details ? '0.75rem' : '0' }}>{item.title}</div>
                    {item.details && (
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {item.details.map((d, j) => (
                          <li key={j} style={{ fontSize: '0.875rem', lineHeight: '1.6', color: '#777', paddingLeft: '0.75rem', position: 'relative', marginBottom: '0.2rem' }}>
                            <span style={{ position: 'absolute', left: 0, top: '0.4rem', width: '0.25rem', height: '0.25rem', background: accentColor, borderRadius: '50%', display: 'block' }} />
                            {d}
                          </li>
                        ))}
                        {item.highlight && (
                          <li style={{ fontSize: '0.875rem', lineHeight: '1.6', color: '#444', paddingLeft: '0.75rem', position: 'relative', fontWeight: '600' }}>
                            <span style={{ position: 'absolute', left: 0, top: '0.4rem', width: '0.25rem', height: '0.25rem', background: accentColor, borderRadius: '50%', display: 'block' }} />
                            {item.highlight}
                          </li>
                        )}
                      </ul>
                    )}
                    {!item.details && item.speaker && <div style={{ fontSize: '0.8125rem', color: '#888', marginTop: '0.125rem' }}>{item.speaker}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 참석자 혜택 */}
        <section className="report-section" style={{ background: '#f7faf7' }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '2rem', color: '#111' }}>참석자 혜택</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { icon: '📄', title: '커머스 벤치마크\n리포트 2026', desc: 'PDF 무료 제공' },
                  { icon: '💳', title: '고위드 법인카드\n한도 사전 조회', desc: '1:1 자금 운영 상담권' },
                  { icon: '📦', title: '파스토 물류 구조 진단\n무료 상담권', desc: '1:1 무료 상담' },
                  { icon: '📥', title: '웨비나 발표 자료\nPDF 제공', desc: '당일 참석자 대상' },
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
                { q: '웨비나는 어디서 진행되나요?', a: 'Zoom 온라인으로 진행됩니다. 신청 완료 시 이메일로 참여 링크가 발송됩니다.' },
                { q: '참여 비용이 있나요?', a: '완전 무료입니다.' },
                { q: '참석하지 못하면 녹화본을 받을 수 있나요?', a: '네, 신청하신 분들께 웨비나 종료 후 녹화본을 이메일로 발송해 드립니다.' },
                { q: '어떤 업종에 적합한 웨비나인가요?', a: '다채널 커머스 기업을 중심으로 구성했지만, 온라인 커머스 기업이라면 업종 불문하고 도움이 됩니다.' },
                { q: '사전 질문은 어떻게 활용되나요?', a: '신청 시 남겨주신 질문을 분석하여 웨비나 인트로에서 주요 관심사를 먼저 다루고, Q&A 시간에 집중 답변해 드립니다.' },
              ].map((faq, i) => (
                <div key={i} style={{ borderBottom: '1px solid #e0e0e0' }}>
                  <button
                    onClick={() => toggleFaq(i)}
                    style={{
                      width: '100%', background: 'none', border: 'none', color: '#222',
                      fontSize: '1rem', fontWeight: '600', textAlign: 'left', padding: '1.5rem 0',
                      cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      fontFamily: 'inherit', transition: 'color 0.2s',
                    }}
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
        <section className="report-section report-section-cta" style={{ background: '#f0f7f0', textAlign: 'center' }}>
          <div className="report-container">
            <div className="report-cta-content">
              <p style={{ fontSize: '1rem', color: '#888', margin: '0 0 0.5rem 0' }}>
                수익 구조 × 운영 구조,<br /> 실전 데이터로 답을 드립니다.
              </p>
              <h3 className="report-h3" style={{ color: '#111' }}>
                <strong>성장을 원하는 커머스라면,<br /> 이번 웨비나를 놓치지마세요.</strong>
              </h3>
              <button onClick={openModal} className="report-button-cta" style={{ background: accentColor, color: '#fff', boxShadow: '0 4px 20px rgba(11, 128, 89, 0.25)' }}>
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
                '웨비나 종료 후 녹화본을 신청자 전원에게 발송해 드립니다.',
                '참가자 모집은 조기 마감될 수 있습니다.',
                '실시간 Q&A 시간에 자유롭게 질문하고 연사의 답변을 받으실 수 있습니다.',
              ].map((notice, i) => (
                <p key={i} style={{ fontSize: '0.8125rem', lineHeight: '1.6', color: '#999', marginBottom: '0.375rem' }}>
                  <span>· </span>
                  {notice}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="report-footer" style={{ background: '#f7faf7', borderTop: '1px solid #e0e0e0' }}>
          <div className="report-container">
            <div className="report-footer-content">
              <div style={{ color: '#888' }}>GoWid x 파스토 &copy; 2026</div>
              <div className="report-footer-divider" style={{ color: '#ccc' }}>|</div>
              <div>
                <a
                  href="https://www.notion.so/teamgowid/2026-ver-2e98db64698e8086ac85e01f29c32587"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="report-footer-link"
                  style={{ color: '#888' }}
                >
                  개인정보 처리방침
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* 웨비나 신청 폼 모달 */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px', padding: 0 }}>
            <button className="modal-close" onClick={closeModal} aria-label="닫기">✕</button>

            {isSuccess ? (
              <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <h2 className="modal-title" style={{ marginBottom: '1.5rem' }}>신청이 완료되었습니다!</h2>
                <p className="modal-description" style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '2rem', lineHeight: '1.6' }}>
                  웨비나 안내를 이메일로 보내드리겠습니다.<br />감사합니다.
                </p>
                <button onClick={closeModal} style={{ padding: '0.875rem 2rem', fontSize: '1rem', fontWeight: '600', borderRadius: '8px', border: 'none', background: accentColor, color: '#fff', cursor: 'pointer' }}>
                  닫기
                </button>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h2 className="modal-title">무료 웨비나 신청</h2>
                  <p className="modal-description">3월 24일(화) 오후 4시 | 다채널 커머스, 성장의 착시를 걷어내다</p>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
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
                    <label htmlFor="email" className="form-label">회사 이메일 <span className="required">*</span></label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="contact@company.com" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">전화번호 <span className="required">*</span></label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="form-input" placeholder="010-1234-5678" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="question" className="form-label">궁금하신 점을 편하게 남겨주세요!</label>
                    <textarea id="question" name="question" value={formData.question} onChange={handleChange} className="form-input" placeholder="자유롭게 작성해주세요" rows={3} style={{ resize: 'vertical', fontFamily: 'inherit' }} />
                  </div>

                  <div className="form-group">
                    <label className="form-label">웨비나 이전 서비스 안내를 받아보고 싶어요</label>
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                      {['고위드', '파스토'].map((service) => (
                        <label key={service} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9375rem', color: '#333' }}>
                          <input
                            type="radio"
                            name="serviceInterest"
                            value={service}
                            checked={formData.serviceInterest === service}
                            onChange={handleChange}
                            style={{ accentColor }}
                          />
                          {service}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-group-checkbox" style={{ marginTop: '0.5rem' }}>
                    <label className="checkbox-label">
                      <input type="checkbox" name="agreePrivacy" checked={formData.agreePrivacy} onChange={handleChange} className="checkbox-input" required />
                      <span className="checkbox-text">
                        개인정보 처리방침 및 마케팅 수신에 동의합니다 (필수)
                      </span>
                    </label>
                    <p style={{ fontSize: '0.75rem', color: '#999', lineHeight: '1.5', marginTop: '0.5rem', paddingLeft: '1.625rem' }}>
                      금번 수집하는 개인정보는 웨비나 콘텐츠 준비 및 안내 용도로 사용됩니다. [개인정보보호법] 제15조 법규에 의거하여 고위드, 파스토 2개 사는 이벤트 참여자분들의 개인정보 수집 및 활용에 대한 동의를 받고 있습니다.
                    </p>
                  </div>

                  <div style={{ position: 'relative', zIndex: 10, pointerEvents: isSubmitting ? 'none' : 'auto' }}>
                    <button type="submit" disabled={isSubmitting} className="form-submit-button">
                      {isSubmitting ? '제출 중...' : '웨비나 신청하기'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
