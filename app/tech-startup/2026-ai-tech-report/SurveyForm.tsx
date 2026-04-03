'use client';

import { useState, FormEvent } from 'react';

interface SurveyFormProps {
  isOpen: boolean;
  onClose: () => void;
  utmParams?: { utm_source: string; utm_medium: string; utm_campaign: string };
}

export default function SurveyForm({ isOpen, onClose, utmParams }: SurveyFormProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    position: '',
    email: '',
    phone: '',
    agreeMarketing: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setSubmitError('');

    // 유효성 검사
    if (!formData.companyName.trim()) {
      setSubmitError('법인명을 입력해주세요.');
      return;
    }
    if (!formData.name.trim()) {
      setSubmitError('이름을 입력해주세요.');
      return;
    }
    if (!formData.position.trim()) {
      setSubmitError('직책을 입력해주세요.');
      return;
    }
    if (!formData.email.trim()) {
      setSubmitError('직장 이메일 주소를 입력해주세요.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setSubmitError('올바른 이메일 형식을 입력해주세요.');
      return;
    }
    if (!formData.phone.trim()) {
      setSubmitError('연락처를 입력해주세요.');
      return;
    }
    if (!formData.agreeMarketing) {
      setSubmitError('마케팅 활용 동의가 필요합니다.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 한국 시간으로 제출 일시 생성
      const now = new Date();
      const kstTime = new Date(now.getTime() + (9 * 60 * 60 * 1000));
      const formattedTimestamp = kstTime.toISOString().replace('T', ' ').substring(0, 19) + ' (KST)';

      const response = await fetch('/api/survey-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: formattedTimestamp,
          ...utmParams,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '제출에 실패했습니다.');
      }

      // 성공 시
      setIsSuccess(true);

      // 폼 초기화
      setFormData({
        companyName: '',
        name: '',
        position: '',
        email: '',
        phone: '',
        agreeMarketing: false,
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error instanceof Error ? error.message : '제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    window.open('https://drive.google.com/file/d/1qBB-4jR19NY-VVTd3BZ7PWsKFV7Ill6_/view?usp=sharing', '_blank');
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
          <button className="modal-close" onClick={handleClose} aria-label="닫기">
            ✕
          </button>

          <div style={{
            padding: '3rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <h2 className="modal-title" style={{ marginBottom: '1.5rem' }}>감사합니다!</h2>
            <p className="modal-description" style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              marginBottom: '3rem',
              lineHeight: '1.6'
            }}>
              제출이 완료되었습니다.<br/>
              아래 버튼을 클릭하여 리포트를 다운로드하세요.
            </p>

            <div style={{
              display: 'flex',
              gap: '1rem',
              width: '100%',
              maxWidth: '400px'
            }}>
              <button
                onClick={handleClose}
                className="success-button secondary-button"
                style={{
                  flex: 1,
                  padding: '1rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  borderRadius: '8px',
                  border: '2px solid #e5e7eb',
                  background: '#ffffff',
                  color: '#374151',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  minHeight: '52px'
                }}
              >
                닫기
              </button>
              <button
                onClick={handleDownload}
                className="success-button primary-button"
                style={{
                  flex: 1,
                  padding: '1rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #5BC500 0%, #4a9f00 100%)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  minHeight: '52px',
                  boxShadow: '0 4px 12px rgba(91, 197, 0, 0.4)'
                }}
              >
                리포트 다운로드
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="닫기">
          ✕
        </button>

        <div className="modal-header">
          <h2 className="modal-title">리포트 다운로드 신청</h2>
          <p className="modal-description">
            정보를 입력하시면 무료로 리포트를 다운로드하실 수 있습니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
        {submitError && (
          <div className="form-error">{submitError}</div>
        )}

        <div className="form-group">
          <label htmlFor="companyName" className="form-label">
            법인명 <span className="required">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="form-input"
            placeholder="회사명을 입력해주세요"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name" className="form-label">
            이름 <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            placeholder="홍길동"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="position" className="form-label">
            직책 <span className="required">*</span>
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="form-input"
            placeholder="대표이사, 마케팅 팀장 등"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            직장 이메일 주소 <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="contact@company.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            연락처 <span className="required">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
            placeholder="010-1234-5678"
            required
          />
        </div>

        <div className="form-group-checkbox">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="agreeMarketing"
              checked={formData.agreeMarketing}
              onChange={handleChange}
              className="checkbox-input"
              required
            />
            <span className="checkbox-text">
              마케팅 활용에 동의합니다 (필수)
            </span>
          </label>
        </div>

          <div style={{
            position: 'relative',
            zIndex: 10,
            pointerEvents: isSubmitting ? 'none' : 'auto'
          }}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="form-submit-button"
            >
              {isSubmitting ? '제출 중...' : '제출하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
