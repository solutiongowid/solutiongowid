'use client';

import { useState, FormEvent } from 'react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    position: '',
    agreePrivacy: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    // 유효성 검사
    if (!formData.name.trim()) {
      setSubmitError('이름을 입력해주세요.');
      return;
    }
    if (!formData.company.trim()) {
      setSubmitError('회사명을 입력해주세요.');
      return;
    }
    if (!formData.email.trim()) {
      setSubmitError('이메일을 입력해주세요.');
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
    if (!formData.position.trim()) {
      setSubmitError('직책을 입력해주세요.');
      return;
    }
    if (!formData.agreePrivacy) {
      setSubmitError('개인정보 수집 및 광고성 정보 수신에 동의해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/report-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '제출에 실패했습니다.');
      }

      // 성공 시 리포트 다운로드 (임시로 알림)
      alert('감사합니다! 리포트 다운로드가 곧 시작됩니다.');
      
      // 폼 초기화 및 모달 닫기
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        position: '',
        agreePrivacy: false,
      });
      onClose();

      // TODO: 실제 PDF 다운로드 로직 추가
      // window.open('/reports/commerce-benchmark-2026.pdf', '_blank');

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error instanceof Error ? error.message : '제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="닫기">
          ✕
        </button>
        
        <div className="modal-header">
          <h2 className="modal-title">리포트 다운로드</h2>
          <p className="modal-description">
            간단한 정보를 입력하시면 무료로 리포트를 다운로드하실 수 있습니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
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
            <label htmlFor="company" className="form-label">
              회사명 <span className="required">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="form-input"
              placeholder="(주)고위드"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              회사 이메일 <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="contact@gowid.com"
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
              placeholder="예: 대표 / 재무담당 / 경영지원팀장 등"
              required
            />
          </div>

          <div className="form-group-checkbox">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreePrivacy"
                checked={formData.agreePrivacy}
                onChange={handleChange}
                className="checkbox-input"
                required
              />
              <span className="checkbox-text">
                <a 
                  href="https://www.notion.so/teamgowid/2026-ver-2e98db64698e8086ac85e01f29c32587" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="privacy-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  개인정보 수집 및 광고성 정보 수신 동의
                </a>
                <span className="required"> *</span>
              </span>
            </label>
          </div>

          {submitError && (
            <div className="form-error">{submitError}</div>
          )}

          <button 
            type="submit" 
            className="form-submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? '제출 중...' : '제출하기'}
          </button>
        </form>
      </div>
    </div>
  );
}
