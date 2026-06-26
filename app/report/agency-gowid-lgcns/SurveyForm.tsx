'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface SurveyFormProps {
  isOpen: boolean;
  onClose: () => void;
  utmParams?: { utm_source: string; utm_medium: string; utm_campaign: string; utm_content: string };
}

export default function SurveyForm({ isOpen, onClose, utmParams }: SurveyFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    annualRevenue: '',
    agreeMarketing: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const type = e.target.type;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setSubmitError('');

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
    if (!formData.department.trim()) {
      setSubmitError('부서를 입력해주세요.');
      return;
    }
    if (!formData.annualRevenue) {
      setSubmitError('연매출 구간을 선택해주세요.');
      return;
    }
    if (!formData.agreeMarketing) {
      setSubmitError('마케팅 활용 동의가 필요합니다.');
      return;
    }

    setIsSubmitting(true);

    try {
      const now = new Date();
      const kstTime = new Date(now.getTime() + (9 * 60 * 60 * 1000));
      const formattedTimestamp = kstTime.toISOString().replace('T', ' ').substring(0, 19) + ' (KST)';

      const response = await fetch('/api/survey-submit-agency-gowid-lgcns', {
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

      router.push('/report/agency-gowid-lgcns/thank-you');

      setFormData({
        companyName: '',
        name: '',
        position: '',
        department: '',
        email: '',
        phone: '',
        annualRevenue: '',
        agreeMarketing: false,
      });

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
          <label htmlFor="department" className="form-label">
            부서 <span className="required">*</span>
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="form-input"
            placeholder="마케팅팀, 경영지원팀 등"
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

        <div className="form-group">
          <label htmlFor="annualRevenue" className="form-label">
            연매출 <span className="required">*</span>
          </label>
          <select
            id="annualRevenue"
            name="annualRevenue"
            value={formData.annualRevenue}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">선택해주세요</option>
            <option value="10억 미만">10억 미만</option>
            <option value="10~30억">10~30억</option>
            <option value="30~80억">30~80억</option>
            <option value="80억 이상">80억 이상</option>
          </select>
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
