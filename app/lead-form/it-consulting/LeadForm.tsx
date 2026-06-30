'use client';

import { useState, FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface LeadFormProps {
  utmParams: { utm_source: string; utm_medium: string; utm_campaign: string; utm_content: string };
}

type Service = 'Google Workspace' | 'Microsoft 365' | '';

export default function LeadForm({ utmParams }: LeadFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Page 1
  const [service, setService] = useState<Service>('');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');

  // Page 2 - Google
  const [gEdition, setGEdition] = useState('');
  const [gPlan, setGPlan] = useState('');
  const [gCount, setGCount] = useState('');
  const [gFile, setGFile] = useState('');
  const [gFileName, setGFileName] = useState('');
  const [gNote, setGNote] = useState('');
  const gFileRef = useRef<HTMLInputElement>(null);

  // Page 2 - Microsoft
  const [mEdition, setMEdition] = useState('');
  const [mPlan, setMPlan] = useState('');
  const [mCount, setMCount] = useState('');
  const [mTeams, setMTeams] = useState('');
  const [mCopilot, setMCopilot] = useState('');
  const [mFile, setMFile] = useState('');
  const [mFileName, setMFileName] = useState('');
  const [mNote, setMNote] = useState('');
  const mFileRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    setData: (v: string) => void,
    setName: (v: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setError('파일 크기는 최대 10MB까지 가능합니다.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setData(reader.result as string);
      setName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    inputRef: React.RefObject<HTMLInputElement | null>,
    setData: (v: string) => void,
    setName: (v: string) => void
  ) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setError('파일 크기는 최대 10MB까지 가능합니다.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setData(reader.result as string);
      setName(file.name);
    };
    reader.readAsDataURL(file);
    if (inputRef.current) {
      const dt = new DataTransfer();
      dt.items.add(file);
      inputRef.current.files = dt.files;
    }
  };

  const goToStep2 = () => {
    setError('');
    if (!service) { setError('서비스를 선택해주세요.'); return; }
    if (!companyName.trim()) { setError('법인명을 입력해주세요.'); return; }
    if (!contactName.trim()) { setError('담당자명을 입력해주세요.'); return; }
    if (!email.trim()) { setError('이메일 주소를 입력해주세요.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('올바른 이메일 형식을 입력해주세요.'); return; }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError('');

    if (service === 'Google Workspace') {
      if (!gEdition) { setError('라이선스 버전을 선택해주세요.'); return; }
      if (!gPlan) { setError('요금제를 선택해주세요.'); return; }
      if (!gCount) { setError('사용자 수를 입력해주세요.'); return; }
    } else {
      if (!mEdition) { setError('라이선스 버전을 선택해주세요.'); return; }
      if (!mPlan) { setError('요금제를 선택해주세요.'); return; }
      if (!mCount) { setError('사용자 수를 입력해주세요.'); return; }
      if (!mTeams) { setError('Teams 포함 여부를 선택해주세요.'); return; }
      if (!mCopilot) { setError('Copilot 포함 여부를 선택해주세요.'); return; }
    }

    setIsSubmitting(true);

    try {
      const now = new Date();
      const kstTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);
      const timestamp = kstTime.toISOString().replace('T', ' ').substring(0, 19) + ' (KST)';

      const payload = {
        service,
        companyName,
        contactName,
        email,
        gEdition, gPlan, gCount, gFile, gFileName, gNote,
        mEdition, mPlan, mCount, mTeams, mCopilot, mFile, mFileName, mNote,
        timestamp,
        ...utmParams,
      };

      const response = await fetch('/api/lead-form-it-consulting-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '제출에 실패했습니다.');

      const qs = new URLSearchParams();
      if (utmParams.utm_source) qs.set('utm_source', utmParams.utm_source);
      if (utmParams.utm_medium) qs.set('utm_medium', utmParams.utm_medium);
      if (utmParams.utm_campaign) qs.set('utm_campaign', utmParams.utm_campaign);
      if (utmParams.utm_content) qs.set('utm_content', utmParams.utm_content);
      const qStr = qs.toString();
      router.push(`/lead-form/it-consulting/thank-you${qStr ? `?${qStr}` : ''}`);
    } catch (err) {
      console.error('Submit error:', err);
      setError(err instanceof Error ? err.message : '제출 중 오류가 발생했습니다.');
      setIsSubmitting(false);
    }
  };

  const RadioList = ({
    name,
    options,
    value,
    onChange,
  }: {
    name: string;
    options: string[];
    value: string;
    onChange: (v: string) => void;
  }) => (
    <div className="it-radio-list">
      {options.map((opt) => (
        <label key={opt} className={`it-radio-item${value === opt ? ' selected' : ''}`}>
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="it-radio-input"
          />
          <span className="it-radio-dot" />
          {opt}
        </label>
      ))}
    </div>
  );

  const UploadArea = ({
    fileRef,
    fileName,
    onFileChange,
    onDrop,
  }: {
    fileRef: React.RefObject<HTMLInputElement | null>;
    fileName: string;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  }) => (
    <div
      className="it-upload-area"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      onClick={() => fileRef.current?.click()}
    >
      <input
        ref={fileRef}
        type="file"
        accept="image/*,.pdf"
        onChange={onFileChange}
        style={{ display: 'none' }}
      />
      <div className="it-upload-icon">📎</div>
      <div className="it-upload-text">
        파일을 끌어다 놓거나 <span className="it-upload-link">클릭해서 선택</span>
      </div>
      <div className="it-upload-hint">이미지, PDF · 최대 10MB</div>
      {fileName && <div className="it-upload-selected">{fileName}</div>}
    </div>
  );

  return (
    <div className="it-form-wrap">
      {step === 1 && (
        <div className="lead-form-card">
          <div className="lead-form-card-header">
            <h2 className="lead-form-card-title">IT 지출 최적화 견적 상담</h2>
            <p className="lead-form-card-description">결제처 변경만으로 즉시 비용 절감</p>
          </div>

          <div className="it-intro-box">
            <p>
              협업툴은 매달 꾸준히 나가는 고정비지만, 한 번 설정해두면 요금제를 다시 들여다보지
              않게 됩니다. 고위드는 고객사의 반복 지출을 지켜드리기 위해, 결제처만 고위드로
              바꾸면 이용 금액을 <strong style={{ color: '#00A852' }}>확정적으로 절감</strong>시켜드립니다.
            </p>
            <p style={{ marginTop: '10px' }}>
              기존 계정, 메일주소, 드라이브 등 설정 데이터는 그대로 유지되며,{' '}
              <strong style={{ color: '#00A852' }}>전환 리스크는 0%</strong>입니다.
            </p>
            <div className="it-intro-divider" />
            <p className="it-intro-cta">
              아래 정보를 남겨주시면 담당자가 회사 기준 예상 절감액과 확정 견적서를 안내드립니다.
              검토·문의에 드는 비용은 없습니다.
            </p>
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="lead-form-card-form">
            <div className="form-group">
              <label className="form-label">
                원하시는 서비스를 선택해주세요 <span className="required">*</span>
              </label>
              <div className="it-service-grid">
                {(['Google Workspace', 'Microsoft 365'] as const).map((svc) => (
                  <button
                    key={svc}
                    type="button"
                    className={`it-service-btn${service === svc ? ' selected' : ''}`}
                    onClick={() => setService(svc)}
                  >
                    <span>{svc === 'Google Workspace' ? 'Google\nWorkspace' : 'Microsoft\n365'}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="companyName" className="form-label">
                법인명 <span className="required">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="form-input"
                placeholder="예) 주식회사 고위드"
                autoComplete="organization"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactName" className="form-label">
                담당자명 <span className="required">*</span>
              </label>
              <input
                type="text"
                id="contactName"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="form-input"
                placeholder="예) 홍길동"
                autoComplete="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                견적서 받을 이메일 주소 <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="example@company.com"
                autoComplete="email"
                inputMode="email"
              />
            </div>

            <button type="button" onClick={goToStep2} className="form-submit-button">
              다음 단계 →
            </button>

            <p className="it-form-footer-note">입력하신 정보는 견적 안내 외 목적으로 사용되지 않습니다.</p>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="lead-form-card">
          <button
            type="button"
            onClick={() => { setStep(1); setError(''); }}
            className="it-back-btn"
          >
            ← 이전으로
          </button>

          <div className="lead-form-card-header" style={{ marginTop: '12px' }}>
            <h2 className="lead-form-card-title">{service}</h2>
            <p className="lead-form-card-description">
              상세 정보를 알려주시면 더 정확한 견적을 드릴 수 있습니다.
            </p>
          </div>

          {error && <div className="form-error">{error}</div>}

          <form onSubmit={handleSubmit} className="lead-form-card-form">
            {service === 'Google Workspace' && (
              <>
                <div className="form-group">
                  <label className="form-label">
                    사용 중인 라이선스 버전(에디션) <span className="required">*</span>
                  </label>
                  <RadioList
                    name="gEdition"
                    options={['Business Starter', 'Business Standard', 'Business Plus', 'Enterprise', '잘 모름']}
                    value={gEdition}
                    onChange={setGEdition}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    요금제 (결제 주기·약정) <span className="required">*</span>
                  </label>
                  <RadioList
                    name="gPlan"
                    options={['Flexible (월 약정)', 'Annual (연 약정)', '잘 모름']}
                    value={gPlan}
                    onChange={setGPlan}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="gCount" className="form-label">
                    라이선스(사용자) 수 <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    id="gCount"
                    value={gCount}
                    onChange={(e) => setGCount(e.target.value)}
                    className="form-input"
                    placeholder="현재 사용 중인 좌석 수 (숫자 입력)"
                    min="1"
                    inputMode="numeric"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Admin 화면 캡처 첨부 <span className="it-opt">(선택)</span>
                  </label>
                  <UploadArea
                    fileRef={gFileRef}
                    fileName={gFileName}
                    onFileChange={(e) => handleFile(e, setGFile, setGFileName)}
                    onDrop={(e) => handleDrop(e, gFileRef, setGFile, setGFileName)}
                  />
                  <p className="it-field-hint">버전·요금제·인원을 모를 때 admin 화면 캡처로 대체할 수 있습니다.</p>
                </div>

                <div className="form-group">
                  <label htmlFor="gNote" className="form-label">
                    추가 문의·요청사항 <span className="it-opt">(선택)</span>
                  </label>
                  <textarea
                    id="gNote"
                    value={gNote}
                    onChange={(e) => setGNote(e.target.value)}
                    className="form-input it-textarea"
                    placeholder={'현재 결제처·약정 상황 등 자유롭게 기재해주세요.\n확인이 어려운 경우 \'확인 어려움\' 메모도 가능합니다.'}
                  />
                </div>
              </>
            )}

            {service === 'Microsoft 365' && (
              <>
                <div className="form-group">
                  <label className="form-label">
                    사용 중인 라이선스 버전 <span className="required">*</span>
                  </label>
                  <RadioList
                    name="mEdition"
                    options={['Business Basic', 'Business Standard', 'Business Premium', 'Apps for Business', 'Enterprise', '잘 모름']}
                    value={mEdition}
                    onChange={setMEdition}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    요금제 (결제 주기·약정) <span className="required">*</span>
                  </label>
                  <RadioList
                    name="mPlan"
                    options={['연간요금제 연청구', '연간요금제 월청구', '월간요금제 월청구', '잘 모름']}
                    value={mPlan}
                    onChange={setMPlan}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mCount" className="form-label">
                    라이선스(사용자) 수 <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    id="mCount"
                    value={mCount}
                    onChange={(e) => setMCount(e.target.value)}
                    className="form-input"
                    placeholder="현재 사용 중인 좌석 수 (숫자 입력)"
                    min="1"
                    inputMode="numeric"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Teams (화상회의·채팅) <span className="required">*</span>
                  </label>
                  <div className="it-radio-list it-radio-row">
                    {['포함', '미포함'].map((opt) => (
                      <label key={opt} className={`it-radio-item grow${mTeams === opt ? ' selected' : ''}`}>
                        <input
                          type="radio"
                          name="mTeams"
                          value={opt}
                          checked={mTeams === opt}
                          onChange={() => setMTeams(opt)}
                          className="it-radio-input"
                        />
                        <span className="it-radio-dot" />
                        {opt === '포함' ? '✅ 포함' : '➖ 미포함'}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Copilot (AI 어시스턴트) <span className="required">*</span>
                  </label>
                  <div className="it-radio-list it-radio-row">
                    {['포함', '미포함'].map((opt) => (
                      <label key={opt} className={`it-radio-item grow${mCopilot === opt ? ' selected' : ''}`}>
                        <input
                          type="radio"
                          name="mCopilot"
                          value={opt}
                          checked={mCopilot === opt}
                          onChange={() => setMCopilot(opt)}
                          className="it-radio-input"
                        />
                        <span className="it-radio-dot" />
                        {opt === '포함' ? '✅ 포함' : '➖ 미포함'}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Admin 화면 캡처 첨부 <span className="it-opt">(선택)</span>
                  </label>
                  <UploadArea
                    fileRef={mFileRef}
                    fileName={mFileName}
                    onFileChange={(e) => handleFile(e, setMFile, setMFileName)}
                    onDrop={(e) => handleDrop(e, mFileRef, setMFile, setMFileName)}
                  />
                  <p className="it-field-hint">버전·요금제·인원을 모를 때 admin 화면 캡처로 대체할 수 있습니다.</p>
                </div>

                <div className="form-group">
                  <label htmlFor="mNote" className="form-label">
                    추가 문의·요청사항 <span className="it-opt">(선택)</span>
                  </label>
                  <textarea
                    id="mNote"
                    value={mNote}
                    onChange={(e) => setMNote(e.target.value)}
                    className="form-input it-textarea"
                    placeholder={'현재 결제처·약정 상황 등 자유롭게 기재해주세요.\n확인이 어려운 경우 \'확인 어려움\' 메모도 가능합니다.'}
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="form-submit-button"
              style={{ pointerEvents: isSubmitting ? 'none' : 'auto' }}
            >
              {isSubmitting ? '제출 중...' : '견적 상담 신청하기 →'}
            </button>

            <p className="it-form-footer-note">입력하신 정보는 견적 안내 외 목적으로 사용되지 않습니다.</p>
          </form>
        </div>
      )}
    </div>
  );
}
