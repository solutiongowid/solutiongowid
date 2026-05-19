'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface LeadFormProps {
  utmParams: { utm_source: string; utm_medium: string; utm_campaign: string; utm_content: string };
}

export default function LeadForm({ utmParams }: LeadFormProps) {
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

    if (!formData.companyName.trim()) { setSubmitError('법인명을 입력해주세요.'); return; }
    if (!formData.name.trim()) { setSubmitError('이름을 입력해주세요.'); return; }
    if (!formData.position.trim()) { setSubmitError('직책을 입력해주세요.'); return; }
    if (!formData.department.trim()) { setSubmitError('부서를 입력해주세요.'); return; }
    if (!formData.email.trim()) { setSubmitError('직장 이메일 주소를 입력해주세요.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setSubmitError('올바른 이메일 형식을 입력해주세요.'); return;
    }
    if (!formData.phone.trim()) { setSubmitError('연락처를 입력해주세요.'); return; }
    if (!formData.annualRevenue) { setSubmitError('연매출 구간을 선택해주세요.'); return; }
    if (!formData.agreeMarketing) { setSubmitError('마케팅 활용 동의가 필요합니다.'); return; }

    setIsSubmitting(true);

    try {
      const now = new Date();
      const kstTime = new Date(now.getTime() + (9 * 60 * 60 * 1000));
      const formattedTimestamp = kstTime.toISOString().replace('T', ' ').substring(0, 19) + ' (KST)';

      const response = await fetch('/api/lead-form-cosmetic-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

      const query = new URLSearchParams();
      if (utmParams.utm_source) query.set('utm_source', utmParams.utm_source);
      if (utmParams.utm_medium) query.set('utm_medium', utmParams.utm_medium);
      if (utmParams.utm_campaign) query.set('utm_campaign', utmParams.utm_campaign);
      if (utmParams.utm_content) query.set('utm_content', utmParams.utm_content);
      const qs = query.toString();
      router.push(`/lead-form/cosmetic/thank-you${qs ? `?${qs}` : ''}`);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error instanceof Error ? error.message : '제출 중 오류가 발생했습니다.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lead-form-card">
      <div className="lead-form-card-header">
        <h2 className="lead-form-card-title">리포트 무료 다운로드</h2>
        <p className="lead-form-card-description">
          아래 정보를 입력하시면 제출하신 이메일로 리포트를 보내드립니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="lead-form-card-form">
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
            autoComplete="organization"
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
            autoComplete="name"
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
            autoComplete="organization-title"
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
            autoComplete="email"
            inputMode="email"
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
            autoComplete="tel"
            inputMode="tel"
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
              <a
                href="https://www.notion.so/teamgowid/2e88db64698e809cacdcd68460500c94"
                target="_blank"
                rel="noopener noreferrer"
                className="privacy-link"
                onClick={(e) => e.stopPropagation()}
              >
                마케팅 수신∙이용 동의
              </a>
              {' '}(필수)
            </span>
          </label>
        </div>

        <div style={{ position: 'relative', zIndex: 10, pointerEvents: isSubmitting ? 'none' : 'auto' }}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="form-submit-button"
          >
            {isSubmitting ? '제출 중...' : '리포트 받기'}
          </button>
        </div>
      </form>
    </div>
  );
}
