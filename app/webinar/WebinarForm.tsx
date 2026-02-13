'use client';

import { useState, FormEvent } from 'react';

interface WebinarFormProps {
  isOpen: boolean;
  onClose: () => void;
  utmParams?: { utm_source: string; utm_medium: string; utm_campaign: string };
}

const OPEN_CHAT_LINK = 'https://open.kakao.com/o/gc91S5fi';

export default function WebinarForm({ isOpen, onClose, utmParams }: WebinarFormProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    email: '',
    phone: '',
    agreeMarketing: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    if (!formData.companyName.trim()) { setSubmitError('회사명을 입력해주세요.'); return; }
    if (!formData.name.trim()) { setSubmitError('이름을 입력해주세요.'); return; }
    if (!formData.email.trim()) { setSubmitError('이메일을 입력해주세요.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { setSubmitError('올바른 이메일 형식을 입력해주세요.'); return; }
    if (!formData.phone.trim()) { setSubmitError('연락처를 입력해주세요.'); return; }
    if (!formData.agreeMarketing) { setSubmitError('개인정보 수집 및 마케팅 활용 동의가 필요합니다.'); return; }

    setIsSubmitting(true);

    try {
      const now = new Date();
      const kstTime = new Date(now.getTime() + (9 * 60 * 60 * 1000));
      const formattedTimestamp = kstTime.toISOString().replace('T', ' ').substring(0, 19) + ' (KST)';

      const response = await fetch('/api/webinar-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, timestamp: formattedTimestamp, ...utmParams }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '제출에 실패했습니다.');

      setIsSuccess(true);
      setFormData({ companyName: '', name: '', email: '', phone: '', agreeMarketing: false });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error instanceof Error ? error.message : '제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  if (isSuccess) {
    return (
      <div className="modal-overlay" onClick={handleClose}>
        <div className="modal-content success-modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={handleClose} aria-label="닫기">✕</button>
          <div style={{ padding: '1.75rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎉</div>
            <h2 className="modal-title" style={{ marginBottom: '0.5rem', fontSize: '1.375rem' }}>웨비나 신청 완료!</h2>
            <p className="modal-description" style={{ fontSize: '0.9375rem', color: '#6b7280', marginBottom: '1.25rem', lineHeight: '1.6' }}>
              2월 26일(목) 웨비나에서 뵙겠습니다.<br />
              맞춤 시나리오 준비를 위해<br />
              <strong style={{ color: '#1a1a1a' }}>오픈채팅방에 합류해주세요.</strong>
            </p>
            <div style={{ background: '#f0fbe6', borderRadius: '12px', padding: '1rem', width: '100%', marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.8125rem', color: '#333', marginBottom: '0.375rem', lineHeight: '1.5' }}>
                오픈채팅방에서 아래 준비가 진행됩니다
              </p>
              <div style={{ fontSize: '0.8125rem', color: '#555', textAlign: 'left', lineHeight: '1.7' }}>
                ✅ 고위드 카드 신청 (한도 산출)<br />
                ✅ 한도 기반 맞춤 시나리오 준비<br />
                ✅ 웨비나 사전 인사이트 공유
              </div>
            </div>
            <div style={{ width: '100%', background: '#fff', border: '1px solid #e0e0e0', borderRadius: '10px', padding: '1rem 1.25rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.8125rem', color: '#777', marginBottom: '0.5rem' }}>오픈채팅방 링크</p>
              <a href={OPEN_CHAT_LINK} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9375rem', color: '#5BC500', fontWeight: '600', wordBreak: 'break-all' }}>
                {OPEN_CHAT_LINK}
              </a>
              <p style={{ fontSize: '0.8125rem', color: '#555', marginTop: '0.5rem' }}>
                입장 비밀번호: <strong style={{ color: '#1a1a1a' }}>0210</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="닫기">✕</button>
        <div className="modal-header">
          <h2 className="modal-title">웨비나 신청</h2>
          <p className="modal-description">
            2월 26일(목) | 성장한 18%가 가장 먼저 한 것
          </p>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          {submitError && <div className="form-error">{submitError}</div>}
          <div className="form-group">
            <label htmlFor="companyName" className="form-label">회사명 <span className="required">*</span></label>
            <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className="form-input" placeholder="회사명을 입력해주세요" required />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">이름 <span className="required">*</span></label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-input" placeholder="홍길동" required />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">이메일 <span className="required">*</span></label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="contact@company.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="form-label">연락처 <span className="required">*</span></label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="form-input" placeholder="010-1234-5678" required />
          </div>
          <div className="form-group-checkbox">
            <label className="checkbox-label">
              <input type="checkbox" name="agreeMarketing" checked={formData.agreeMarketing} onChange={handleChange} className="checkbox-input" required />
              <span className="checkbox-text">개인정보 수집 및 마케팅 활용에 동의합니다 (필수)</span>
            </label>
          </div>
          <div style={{ position: 'relative', zIndex: 10, pointerEvents: isSubmitting ? 'none' : 'auto' }}>
            <button type="submit" disabled={isSubmitting} className="form-submit-button">
              {isSubmitting ? '신청 중...' : '웨비나 신청하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
