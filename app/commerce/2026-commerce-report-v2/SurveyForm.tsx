'use client';

import { useState, FormEvent } from 'react';

export default function SurveyForm() {
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

  if (isSuccess) {
    return (
      <div className="survey-success">
        <h3 className="survey-success-title">감사합니다!</h3>
        <p className="survey-success-description">
          제출이 완료되었습니다.<br/>
          아래 버튼을 클릭하여 리포트를 다운로드하세요.
        </p>
        <button 
          onClick={handleDownload}
          className="survey-download-button"
        >
          리포트 다운로드
        </button>
      </div>
    );
  }

  return (
    <div className="survey-form-container">
      <div className="survey-form-header">
        <h2 className="survey-form-title">리포트 다운로드 신청</h2>
        <p className="survey-form-description">
          정보를 입력하시면 무료로 리포트를 다운로드하실 수 있습니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="survey-form">
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
  );
}
