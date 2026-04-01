'use client';

import { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';

export default function CorporateCardWebinarPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [utmParams, setUtmParams] = useState({ utm_source: '', utm_medium: '', utm_campaign: '', utm_content: '' });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
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
    serviceInterest: [] as string[],
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

      const response = await fetch('/api/corporate-card-webinar-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, timestamp: formattedTimestamp, ...utmParams }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '제출에 실패했습니다.');

      setIsSuccess(true);
      setFormData({ name: '', companyName: '', department: '', position: '', email: '', phone: '', question: '', serviceInterest: [] as string[], agreePrivacy: false });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const accentColor = '#E07C3A';
  const accentLight = 'rgba(224, 124, 58, 0.08)';
  const accentBorder = 'rgba(224, 124, 58, 0.18)';

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
        <header className="report-header" style={{ background: 'linear-gradient(180deg, #fdf5ef 0%, #ffffff 100%)', padding: '8rem 0 5rem' }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <span className="badge" style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem', background: accentLight, color: accentColor, border: `1px solid ${accentBorder}` }}>4월 8일 (수) 오후 3시 | 온라인 웨비나</span>
              </div>
              <h1 className="report-h1" style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#111' }}>
                <strong>
                  2026 법인카드 —<br />여기까지 왔습니다<br />: 커머스편
                </strong>
              </h1>
              <p className="report-subtitle" style={{ textAlign: 'center', marginBottom: '2.5rem', color: '#666', fontStyle: 'italic' }}>
                바꿀 타이밍, 바꿀 조건,<br className="mobile-only-br" /> 바꾸기 전 체크리스트까지
              </p>
              <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Image
                  src="/corporate-card-webinar-thumbnail.png"
                  alt="2026 법인카드 — 여기까지 왔습니다 : 커머스편 - GoWid 웨비나"
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
        <section className="report-section" style={{ background: '#fef8f3', padding: '5rem 0' }}>
          <div className="report-container">
            <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
              <h2 className="report-h2" style={{ color: '#111', textAlign: 'center', marginBottom: '1.5rem' }}>진작 확인할걸</h2>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: accentColor, lineHeight: '1.45', marginBottom: '2.5rem' }}>
                &ldquo;진작 확인할걸.&rdquo;
              </h2>
              <p style={{ fontSize: '1.0625rem', color: '#333', lineHeight: '1.9', marginBottom: '1.5rem' }}>
                법인카드를 바꾸기로 결정한 커머스 대표들한테<br className="mobile-only-br" /> 나중에 물어보면,<br />
                대부분 똑같은 말을 합니다. <strong>진작 확인할걸.</strong>
              </p>
              <p style={{ fontSize: '1.0625rem', color: '#333', lineHeight: '1.9', marginBottom: '1.5rem' }}>
                빠른 사람들이었던 게 아닙니다.<br />
                정보가 더 많았던 것도 아닙니다.<br />
                <strong>한번 봐야겠다 싶었을 때, 그냥 확인했을 뿐입니다.</strong>
              </p>
              <p style={{ fontSize: '1.0625rem', color: '#333', lineHeight: '1.9', marginBottom: '1.5rem' }}>
                광고비·매입 규모, 정산 시차, 현금 공백 구간 —<br />
                어떤 조건에서 바꾸는 게 맞고,<br />
                어떤 조건에서는 지금 그대로여도 되는지.
              </p>
              <p style={{ fontSize: '1.0625rem', color: '#333', lineHeight: '1.9' }}>
                <strong>커머스 데이터 기반으로 그 기준을 40분 안에 다룹니다.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* 예고편 */}
        <section className="report-section" style={{ background: '#ffffff', padding: '5rem 0' }}>
          <div className="report-container">
            <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
              <h2 className="report-h2" style={{ color: '#111', textAlign: 'center', marginBottom: '2rem' }}>이런 이야기를 나눌거예요</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '640px', margin: '0 auto', textAlign: 'left' }}>
                {[
                  '같은 매출 규모인데 법인카드 한도가 3배 차이 나는 이유',
                  '광고비 결제일을 하루 바꿨을 뿐인데 현금 흐름이 달라진 사례',
                  '매달 정산에 이틀 쓰는 회사와 2시간 쓰는 회사의 차이',
                  '비슷한 커머스 기업들이 돈을 실제로 어디에 쓰고 있는지',
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: accentLight, border: `1px solid ${accentBorder}`, borderRadius: '0.75rem' }}>
                    <div style={{ flexShrink: 0, width: '1.5rem', height: '1.5rem', background: accentColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg viewBox="0 0 14 14" fill="none" width="14" height="14"><path d="M3 7L6 10L11 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <p style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)', lineHeight: '1.6', color: '#222', margin: 0 }}>{text}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '1.0625rem', color: '#333', marginTop: '2rem', fontWeight: '600' }}>40분 안에 다룹니다.</p>
            </div>
          </div>
        </section>

        {/* 이런 분들께 추천합니다 */}
        <section className="report-section" style={{ background: '#fef8f3' }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '1rem', color: '#111', wordBreak: 'keep-all' }}>이런 분들께 추천합니다</h2>
              <p style={{ fontSize: '1rem', color: '#888', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                아래에 해당하신다면, 이 웨비나가 답이 됩니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '600px', margin: '0 auto' }}>
                {[
                  <>광고비·매입 규모는 늘었는데 <strong>법인카드 한도는 그대로</strong>인 커머스 대표</>,
                  <>카드사에 <strong>한도 증액을 요청했다가 거절</strong>당한 경험이 있는 재무 담당자</>,
                  <>경비 정산·증빙 관리에 <strong>매달 반복적으로 시간을 쓰는</strong> 운영팀</>,
                  <>쿠팡·네이버 정산 시차와 광고비 선집행이 겹쳐 <strong>현금이 빡빡해진</strong> 경영진</>,
                  <>법인카드를 바꿀 생각은 있는데 <strong>&ldquo;지금 굳이?&rdquo;로 미뤄온</strong> 대표</>,
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: accentLight, border: `1px solid ${accentBorder}`, borderRadius: '0.75rem', padding: '1rem 1.25rem', textAlign: 'left' }}>
                    <div style={{ flexShrink: 0, width: '1.5rem', height: '1.5rem', background: accentColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg viewBox="0 0 14 14" fill="none" width="14" height="14"><path d="M3 7L6 10L11 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <p style={{ fontSize: 'clamp(0.8rem, 1.8vw, 0.95rem)', lineHeight: '1.6', color: '#222', margin: 0 }}>{text}</p>
                  </div>
                ))}
              </div>

              <button onClick={openModal} className="report-button-primary" style={{ marginTop: '2.5rem', background: accentColor, color: '#fff', boxShadow: '0 4px 20px rgba(224, 124, 58, 0.25)' }}>
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

              {/* 타임테이블 - PC */}
              <div className="cosmetic-timetable-pc" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 160px', gap: '1rem', padding: '1rem 0', borderBottom: `1px solid ${accentBorder}` }}>
                  <div style={{ fontSize: '1rem', color: '#888' }}>시간</div>
                  <div style={{ fontSize: '1rem', color: '#888' }}>세션</div>
                  <div style={{ fontSize: '1rem', color: '#888' }}>연사</div>
                </div>
                {[
                  { time: '00:00 ~ 00:03', title: '오프닝', speaker: '문미성 리드 · 고위드' },
                  {
                    time: '00:03 ~ 00:12', session: 'Session 01', title: '2026 법인카드, 여기까지 왔습니다', speakerName: '문미성 리드', speakerCompany: '고위드',
                    details: ['같은 매출 30억인데 한도가 3배 차이 나는 두 회사 — 뭐가 다른가', '한도 구조, 정산 주기, 비용 관리 도구 — 3년 사이 시장이 벌려놓은 격차', '커머스 387개사 데이터로 본 법인카드 이용 트렌드'],
                    highlight: '대부분은 "몰랐다"가 아니라 "확인을 안 했을 뿐"',
                  },
                  {
                    time: '00:12 ~ 00:22', session: 'Session 02', title: '안 바꾸는 동안, 빠지고 있는 돈', speakerName: '문미성 리드', speakerCompany: '고위드',
                    details: ['광고비 결제일 하루 차이로 현금 흐름이 달라진 실제 사례', '쿠팡·네이버 정산 시차와 카드 결제일이 어긋날 때 생기는 현금 공백', '매달 정산에 이틀 쓰는 회사 vs 2시간 쓰는 회사 — 연간 원가 환산'],
                    highlight: '비슷한 규모의 커머스 기업들은 돈을 실제로 어디에 쓰고 있는가',
                  },
                  {
                    time: '00:22 ~ 00:30', session: 'Session 03', title: '전환 타이밍 자가 진단: 체크리스트', speakerName: '문미성 리드', speakerCompany: '고위드',
                    details: ['바꿔야 할 회사의 시그널 5가지', '아직 안 바꿔도 되는 회사의 조건 — 양면 제시', '체크리스트 실시간 자가 점검'],
                    highlight: '바꾸기로 했을 때, 뭐부터 하면 되는가 — 전환 3스텝',
                  },
                  { time: '00:30 ~ 00:40', title: '실무 Q&A', speaker: '문미성 리드 · 고위드' },
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
                  { time: '00:00 ~ 00:03', title: '오프닝', speaker: '문미성 리드 · 고위드' },
                  {
                    time: '00:03 ~ 00:12', session: 'Session 01', title: '2026 법인카드, 여기까지 왔습니다', speakerName: '문미성 리드', speakerCompany: '고위드',
                    details: ['같은 매출 30억인데 한도가 3배 차이 나는 두 회사 — 뭐가 다른가', '한도 구조, 정산 주기, 비용 관리 도구 — 3년 사이 시장이 벌려놓은 격차', '커머스 387개사 데이터로 본 법인카드 이용 트렌드'],
                    highlight: '대부분은 "몰랐다"가 아니라 "확인을 안 했을 뿐"',
                  },
                  {
                    time: '00:12 ~ 00:22', session: 'Session 02', title: '안 바꾸는 동안, 빠지고 있는 돈', speakerName: '문미성 리드', speakerCompany: '고위드',
                    details: ['광고비 결제일 하루 차이로 현금 흐름이 달라진 실제 사례', '쿠팡·네이버 정산 시차와 카드 결제일이 어긋날 때 생기는 현금 공백', '매달 정산에 이틀 쓰는 회사 vs 2시간 쓰는 회사 — 연간 원가 환산'],
                    highlight: '비슷한 규모의 커머스 기업들은 돈을 실제로 어디에 쓰고 있는가',
                  },
                  {
                    time: '00:22 ~ 00:30', session: 'Session 03', title: '전환 타이밍 자가 진단: 체크리스트', speakerName: '문미성 리드', speakerCompany: '고위드',
                    details: ['바꿔야 할 회사의 시그널 5가지', '아직 안 바꿔도 되는 회사의 조건 — 양면 제시', '체크리스트 실시간 자가 점검'],
                    highlight: '바꾸기로 했을 때, 뭐부터 하면 되는가 — 전환 3스텝',
                  },
                  { time: '00:30 ~ 00:40', title: '실무 Q&A', speaker: '문미성 리드 · 고위드' },
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
        <section className="report-section" style={{ background: '#fef8f3' }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '2rem', color: '#111' }}>참석자 혜택</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { icon: '\u{1F4C4}', title: '커머스 벤치마크\n리포트 2026', desc: 'PDF 무료 제공' },
                  { icon: '\u{1F4B3}', title: '고위드 법인카드\n한도 사전 조회', desc: '신청 즉시 확인 가능' },
                  { icon: '\u{1F50D}', title: '1:1 자금 운영\n상담권', desc: '고위드 제공' },
                  { icon: '\u{1F4E5}', title: '웨비나 발표 자료\nPDF 제공', desc: '당일 참석자 대상' },
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
                { q: '어떤 업종에 적합한 웨비나인가요?', a: '커머스 기업을 중심으로 구성했지만, 광고비 선집행·재고 매입 등 현금 흐름 이슈가 있는 기업이라면 업종 불문하고 도움이 됩니다.' },
                { q: '고위드 제품 소개 웨비나인가요?', a: '법인카드 시장 변화와 전환 타이밍 판단 기준을 다루는 세션입니다. 제품 설명은 필요한 맥락에서만 최소한으로 언급됩니다.' },
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
        <section className="report-section report-section-cta" style={{ background: '#fdf5ef', textAlign: 'center' }}>
          <div className="report-container">
            <div className="report-cta-content">
              <h3 className="report-h3" style={{ color: '#111' }}>
                <strong>법인카드, 바꿀 타이밍인지,<br />40분 투자로 답을 알아가세요.</strong>
              </h3>
              <button onClick={openModal} className="report-button-cta" style={{ background: accentColor, color: '#fff', boxShadow: '0 4px 20px rgba(224, 124, 58, 0.25)' }}>
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
                '실시간 Q&A 시간에 자유롭게 질문하고 답변을 받으실 수 있습니다.',
                '참석자 혜택은 광고성 정보 수신 및 제3자 제공 동의를 한 당일 참석자에게 제공합니다.',
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
        <footer className="report-footer" style={{ background: '#fef8f3', borderTop: '1px solid #e0e0e0' }}>
          <div className="report-container">
            <div className="report-footer-content">
              <div style={{ color: '#888' }}>gowid &copy; 2026</div>
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
                  <p className="modal-description">4월 8일(수) 오후 3시 | 2026 법인카드 — 여기까지 왔습니다 : 커머스편</p>
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



                  <div className="form-group-checkbox" style={{ marginTop: '0.5rem' }}>
                    <label className="checkbox-label">
                      <input type="checkbox" name="agreePrivacy" checked={formData.agreePrivacy} onChange={handleChange} className="checkbox-input" required />
                      <span className="checkbox-text">
                        개인정보 처리방침 및 마케팅 수신에 동의합니다 (필수)
                      </span>
                    </label>
                    <p style={{ fontSize: '0.75rem', color: '#999', lineHeight: '1.5', marginTop: '0.5rem', paddingLeft: '1.625rem' }}>
                      금번 수집하는 개인정보는 웨비나 콘텐츠 준비 및 안내 용도로 사용됩니다. 웨비나 이후 관련 서비스 소개를 위해 연락드릴 수 있습니다. [개인정보보호법] 제15조 법규에 의거하여 고위드는 이벤트 참여자분들의 개인정보 수집 및 활용에 대한 동의를 받고 있습니다.
                    </p>
                  </div>

                  <div style={{ position: 'relative', zIndex: 10, pointerEvents: isSubmitting ? 'none' : 'auto' }}>
                    <button type="submit" disabled={isSubmitting} className="form-submit-button" style={{ background: accentColor }}>
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
