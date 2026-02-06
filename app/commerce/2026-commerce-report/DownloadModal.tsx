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
    agreePrivacy: false,
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
    
    // 이미 제출 중이면 무시
    if (isSubmitting) {
      return;
    }
    
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
      setSubmitError('회사 이메일을 입력해주세요.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setSubmitError('올바른 이메일 형식을 입력해주세요.');
      return;
    }
    if (!formData.agreePrivacy) {
      setSubmitError('개인정보 수집 및 광고성 정보 수신에 동의해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 한국 시간으로 제출 일시 생성
      const now = new Date();
      const kstTime = new Date(now.getTime() + (9 * 60 * 60 * 1000)); // UTC+9
      const formattedTimestamp = kstTime.toISOString().replace('T', ' ').substring(0, 19) + ' (KST)';
      
      const response = await fetch('/api/report-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: formattedTimestamp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '제출에 실패했습니다.');
      }

      // 성공 시 성공 화면 표시
      setIsSuccess(true);
      
      // 폼 초기화
      setFormData({
        name: '',
        company: '',
        email: '',
        agreePrivacy: false,
      });

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

  const handleDownload = () => {
    window.open('https://drive.google.com/file/d/1qBB-4jR19NY-VVTd3BZ7PWsKFV7Ill6_/view?usp=sharing', '_blank');
  };

  if (!isOpen) return null;

  // 성공 화면
  if (isSuccess) {
    return (
      <div className="modal-overlay" onClick={handleClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={handleClose} aria-label="닫기">
            ✕
          </button>
          
          <div className="modal-header">
            <h2 className="modal-title">감사합니다!</h2>
            <p className="modal-description" style={{ fontSize: '1.125rem', marginTop: '1.5rem' }}>
              아래 링크에서 리포트를 다운로드 해주세요.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button 
              onClick={handleClose}
              className="form-submit-button"
              style={{ flex: 1, background: '#6b7280', padding: '0.875rem 1rem', fontSize: '0.9375rem', minHeight: '44px' }}
            >
              닫기
            </button>
            <button 
              onClick={handleDownload}
              className="form-submit-button"
              style={{ flex: 1, padding: '0.875rem 1rem', fontSize: '0.9375rem', minHeight: '44px' }}
            >
              다운로드 페이지
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 폼 화면
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
              placeholder="고위드"
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

          <div style={{ marginTop: '1.5rem' }}>
            <button 
              type="submit" 
              className="form-submit-button"
              disabled={isSubmitting}
              style={{
                position: 'relative',
                zIndex: 10,
                pointerEvents: isSubmitting ? 'none' : 'auto',
              }}
            >
              {isSubmitting ? '제출 중...' : '제출하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
