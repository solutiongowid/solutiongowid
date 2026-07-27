'use client';

import { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';

export default function TightFinanceManagement07Page() {
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
    email: '',
    phone: '',
    agreePrivacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

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
    if (!formData.email.trim()) { setSubmitError('회사 이메일을 입력해주세요.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { setSubmitError('올바른 이메일 형식을 입력해주세요.'); return; }
    if (!formData.phone.trim()) { setSubmitError('전화번호를 입력해주세요.'); return; }
    if (!formData.agreePrivacy) { setSubmitError('개인정보 처리방침 및 마케팅 수신 동의가 필요합니다.'); return; }

    setIsSubmitting(true);
    try {
      const submitData = {
        name: formData.name,
        companyName: formData.companyName,
        position: formData.position,
        email: formData.email,
        phone: formData.phone,
        agreePrivacy: formData.agreePrivacy,
        webinar_type: 'tight-finance-management-07',
        ...Object.fromEntries(Object.entries(utmParams).filter(([, v]) => v)),
      };

      const response = await fetch('/api/tight-finance-management-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '제출에 실패했습니다.');

      window.location.href = '/webinar/tight-finance-management/07/thank-you';
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const accentColor = '#5BC500';
  const accentDark = '#4a9f00';
  const accentLight = 'rgba(91, 197, 0, 0.08)';
  const accentBorder = 'rgba(91, 197, 0, 0.18)';

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
              <button
                className="report-nav-button"
                onClick={openModal}
                style={{ background: accentColor, color: '#fff', cursor: 'pointer' }}
              >
                웨비나 신청하기
              </button>
            </div>
          </div>
        </nav>

        {/* 히어로 섹션 */}
        <header className="report-header" style={{ background: 'linear-gradient(180deg, #f8fcf5 0%, #ffffff 100%)', padding: '8rem 0 5rem' }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <span className="badge" style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem', background: accentLight, color: accentDark, border: `1px solid ${accentBorder}` }}>
                  7월 29일 (수) 오후 3:00 – 4:00 | 온라인 ZOOM
                </span>
              </div>
              <h1 className="report-h1" style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#111' }}>
                <strong>
                  재무 담당자를 위한<br />타이트 파이낸스, 지출관리
                </strong>
              </h1>
              <p className="report-subtitle" style={{ textAlign: 'center', marginBottom: '2.5rem', color: '#666' }}>
                현금 기반 공헌이익 설계 방법과<br />지출관리 서비스 및 OPEN API 활용 방법
              </p>
              <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Image
                  src="/tight-finance-management-thumbnail.png"
                  alt="재무 담당자를 위한 타이트 파이낸스, 지출관리 - 고위드 웨비나"
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
        <section className="report-section" style={{ background: '#f8fcf5', padding: '5rem 0' }}>
          <div className="report-container">
            <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
              <h2 className="report-h2" style={{ color: '#111', textAlign: 'center', marginBottom: '1.5rem' }}>
                카드값은 매달 나가는데,<br />어디서 새는지는 아무도 모릅니다.
              </h2>
              <p style={{ fontSize: '1.0625rem', color: '#333', lineHeight: '1.9', marginBottom: '2rem' }}>
                품의는 올라오는데, 공헌이익 가시성이 명확히 보이지 않습니다.
              </p>
              <p style={{ fontSize: '1.0625rem', color: '#333', lineHeight: '1.9' }}>
                지출을 통제한다는 건 예산을 줄이는 게 아니라, <strong>돈이 나가는 순간을 관리하는 것</strong>입니다.<br />
                이번 세션에서는 현금 기반 공헌이익 설계 방법과, 고위드 지출관리 서비스 및 OPEN API 활용법으로<br />
                재무팀의 시간을 줄이는 노하우를 다룹니다.
              </p>
            </div>
          </div>
        </section>

        {/* 이런 고민이 있으시다면 */}
        <section className="report-section" style={{ background: '#ffffff' }}>
          <div className="report-container">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '1rem', color: '#111', wordBreak: 'keep-all' }}>이런 고민이 있으시다면 추천드립니다</h2>
              <p style={{ fontSize: '1rem', color: '#888', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                아래에 해당하신다면, 이번 웨비나가 답이 됩니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '600px', margin: '0 auto' }}>
                {[
                  <>우리 회사에 맞는 <strong>비용 관리 정책, 시스템으로 만들고</strong> 싶다</>,
                  <><strong>비용 집행을 사전에 통제할</strong> 방법이 없다</>,
                  <><strong>고정비와 변동비, 정확하게 나눠서</strong> 보고 있지 않다</>,
                  <>팀, 개인별 <strong>법인 카드 한도·발급·사용 관리</strong>에 매번 시간이 낭비되고 있다</>,
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
                style={{ marginTop: '2.5rem', background: accentColor, color: '#fff', boxShadow: '0 4px 20px rgba(91, 197, 0, 0.25)', cursor: 'pointer' }}
              >
                웨비나 신청하기
              </button>
            </div>
          </div>
        </section>

        {/* 세미나 정보 */}
        <section className="report-section" style={{ background: '#f8fcf5' }}>
          <div className="report-container">
            <div style={{ maxWidth: '640px', margin: '0 auto' }}>
              <h2 className="report-h2" style={{ textAlign: 'center', marginBottom: '2rem', color: '#111' }}>세미나 정보</h2>
              <div style={{ background: '#fff', border: `1px solid ${accentBorder}`, borderRadius: '1rem', padding: '2rem 2.25rem' }}>
                {[
                  { label: '주제', value: '재무 담당자를 위한 타이트 파이낸스, 지출관리' },
                  { label: '일시', value: '7월 29일 (수) 오후 3:00 – 4:00' },
                  { label: '형식', value: '온라인 ZOOM' },
                  { label: '참가비', value: '무료 / 재무·회계 담당자 및 스타트업 경영진 대상' },
                ].map((row, i, arr) => (
                  <div key={i} style={{ display: 'flex', gap: '1.5rem', padding: '0.875rem 0', borderBottom: i < arr.length - 1 ? '1px solid #eee' : 'none' }}>
                    <div style={{ flexShrink: 0, width: '4.5rem', fontSize: '0.9375rem', color: '#888', fontWeight: '600' }}>{row.label}</div>
                    <div style={{ fontSize: '0.9375rem', color: '#222', lineHeight: '1.6' }}>{row.value}</div>
                  </div>
                ))}
              </div>
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
                  { time: '15:00 ~ 15:25', session: '1부', title: '타이트 파이낸스', details: ['타이트 파이낸스가 무엇이고, 왜 지금 필요한가', '비용 집행 프로세스별 관리 방법 — 집행 전 · 집행 중 · 집행 후', '우리 회사의 고정비와 변동비를 확인하는 방법'] },
                  { time: '15:25 ~ 15:50', session: '2부', title: '재무팀의 시간을 줄여주는 지출관리 서비스 및 OPEN API', details: ['불필요한 시간을 줄이는 카드 발급과 한도 관리', '사내 비용 관리 정책 기반 서비스 설정', '복잡한 분석을 위한 OPEN API와 Claude 활용 방법'] },
                  { time: '15:50 ~ 16:00', title: 'Q&A' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '1rem', padding: '1.25rem 0', borderBottom: '1px solid #e0e0e0', alignItems: item.details ? 'start' : 'center' }}>
                    <div style={{ fontSize: '1.0625rem', fontWeight: '600', color: '#222' }}>{item.time}</div>
                    <div>
                      {item.session && <div style={{ fontSize: '1rem', fontWeight: '700', color: accentDark, marginBottom: '0.25rem' }}>{item.session}</div>}
                      <div style={{ fontSize: '1.0625rem', color: '#222', marginBottom: item.details ? '0.5rem' : '0' }}>{item.title}</div>
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
                  { time: '15:00 ~ 15:25', session: '1부', title: '타이트 파이낸스', details: ['타이트 파이낸스가 무엇이고, 왜 필요한가', '비용 집행 전 · 중 · 후 관리 방법', '고정비·변동비 확인 방법'] },
                  { time: '15:25 ~ 15:50', session: '2부', title: '지출관리 서비스 및 OPEN API', details: ['카드 발급과 한도 관리', '사내 비용 관리 정책 기반 서비스 설정', 'OPEN API와 Claude 활용 방법'] },
                  { time: '15:50 ~ 16:00', title: 'Q&A' },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '1.25rem 0', borderBottom: '1px solid #e0e0e0' }}>
                    <div style={{ fontSize: '0.8125rem', color: '#888', marginBottom: '0.25rem' }}>{item.time}</div>
                    {item.session && <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: accentDark, marginBottom: '0.375rem' }}>{item.session}</div>}
                    <div style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#222', marginBottom: item.details ? '0.375rem' : '0' }}>{item.title}</div>
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

        {/* 최종 CTA */}
        <section className="report-section report-section-cta" style={{ background: '#f8fcf5', textAlign: 'center' }}>
          <div className="report-container">
            <div className="report-cta-content">
              <h3 className="report-h3" style={{ color: '#111' }}>
                <strong>돈이 새는 순간을 막는 법,<br />7/29 온라인 세미나에서 확인하세요</strong>
              </h3>
              <button
                onClick={openModal}
                className="report-button-cta"
                style={{ background: accentColor, color: '#fff', boxShadow: '0 4px 20px rgba(91, 197, 0, 0.25)', cursor: 'pointer' }}
              >
                웨비나 신청하기
              </button>
            </div>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="report-footer" style={{ background: '#f8fcf5', borderTop: '1px solid #e0e0e0' }}>
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
              <h2 className="modal-title">웨비나 신청</h2>
              <p className="modal-description">7월 29일(수) 오후 3:00 – 4:00 | 온라인 ZOOM</p>
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
                <label htmlFor="position" className="form-label">직급 <span className="required">*</span></label>
                <input type="text" id="position" name="position" value={formData.position} onChange={handleChange} className="form-input" placeholder="대표, 재무팀장, 매니저 등" required />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">회사 이메일 <span className="required">*</span></label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="contact@company.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="form-label">전화번호 <span className="required">*</span></label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="form-input" placeholder="010-1234-5678" required />
              </div>
              <div className="form-group-checkbox" style={{ marginTop: '0.5rem' }}>
                <label className="checkbox-label">
                  <input type="checkbox" name="agreePrivacy" checked={formData.agreePrivacy} onChange={handleChange} className="checkbox-input" required />
                  <span className="checkbox-text">개인정보 처리방침 및 마케팅 수신에 동의합니다 (필수)</span>
                </label>
                <p style={{ fontSize: '0.75rem', color: '#999', lineHeight: '1.5', marginTop: '0.5rem', paddingLeft: '1.625rem' }}>
                  금번 수집하는 개인정보는 웨비나 참석 안내 용도로 사용됩니다. 웨비나 이후 관련 서비스 소개를 위해 연락드릴 수 있습니다.
                </p>
              </div>
              <div style={{ position: 'relative', zIndex: 10, pointerEvents: isSubmitting ? 'none' : 'auto' }}>
                <button type="submit" disabled={isSubmitting} className="form-submit-button" style={{ background: accentColor }}>
                  {isSubmitting ? '제출 중...' : '웨비나 신청하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
