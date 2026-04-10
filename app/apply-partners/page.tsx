'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

type PartnerType = 'b2b' | 'vc' | 'ac' | 'finance' | '';

interface FormData {
  companyName: string;
  position: string;
  name: string;
  phone: string;
  email: string;
  usesGowid: boolean | null;
  companyWebsite: string;
  partnerType: PartnerType;
  cooperationInterests: string[];
  otherCooperation: string;
  howFound: string;
  otherHowFound: string;
}

const COOP_OPTIONS: Record<string, string[]> = {
  b2b: [
    '타깃 고객 리드 제휴',
    '공동 웨비나/세미나 운영',
    '공동 콘텐츠(리포트/뉴스레터) 제작',
    '고객사 대상 상호 추천 / 채널 내 노출',
    '기타',
  ],
  vc: [
    '포트폴리오사 대상 고위드 연계 / 추천',
    '투자 검토 기업의 검증 인사이트 공유',
    '포트폴리오사 리포트 벤치마크 데이터 제공',
    '공동 웨비나 / 세미나 운영',
    '공동 콘텐츠(리포트, 뉴스레터) 제작',
    '기타',
  ],
  ac: [
    '입주사 대상 고위드 법인카드 우선 발급',
    '입주사/배치 기업 대상 교육 워크샵 운영',
    '배치 프로그램 중 고위드 세션 운영',
    '포트폴리오사 벤치마크 데이터 제공',
    '기타',
  ],
  finance: [
    '고객사 대상 고위드 법인카드 우선 발급',
    '고위드 자동화 시스템 도입으로 회계 업무 효율화',
    '재무/세무 전문 콘텐츠 제작 협업',
    '공동 웨비나/세미나 참여',
    '기타',
  ],
};

const HOW_FOUND_OPTIONS = ['고위드 이메일', '웹 검색', '지인 추천', 'SNS', '기타'];

const PARTNER_TYPES: { value: PartnerType; label: string; desc: string }[] = [
  { value: 'b2b', label: 'B2B 서비스 기업', desc: '스타트업·중소기업 대상 서비스를 제공하는 기업' },
  { value: 'vc', label: 'VC (벤처캐피탈)', desc: '스타트업에 투자하는 벤처캐피탈' },
  { value: 'ac', label: 'AC (액셀러레이터)', desc: '스타트업 육성 및 지원 프로그램 운영' },
  { value: 'finance', label: '재무/회계 파트너', desc: '재무·세무·회계 전문 서비스 기업' },
];

function TextField({
  label,
  value,
  placeholder,
  type = 'text',
  error,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  type?: string;
  error?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-600 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl text-[15px] text-gray-800 bg-white outline-none transition-colors ${
          error
            ? 'border-[1.5px] border-red-400'
            : 'border-[1.5px] border-gray-200 focus:border-[#5BC500]'
        }`}
        style={{ fontFamily: 'inherit' }}
      />
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}

function ApplyPartnersForm() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(0);
  const [utmParams, setUtmParams] = useState({ utm_source: '', utm_medium: '', utm_campaign: '' });
  const [data, setData] = useState<FormData>({
    companyName: '',
    position: '',
    name: '',
    phone: '',
    email: '',
    usesGowid: null,
    companyWebsite: '',
    partnerType: '',
    cooperationInterests: [],
    otherCooperation: '',
    howFound: '',
    otherHowFound: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    setUtmParams({
      utm_source: searchParams.get('utm_source') || '',
      utm_medium: searchParams.get('utm_medium') || '',
      utm_campaign: searchParams.get('utm_campaign') || '',
    });
  }, [searchParams]);

  function update<K extends keyof FormData>(field: K, value: FormData[K]) {
    setData(d => ({ ...d, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  }

  function toggleCoop(item: string) {
    setData(d => ({
      ...d,
      cooperationInterests: d.cooperationInterests.includes(item)
        ? d.cooperationInterests.filter(i => i !== item)
        : [...d.cooperationInterests, item],
    }));
    setErrors(e => ({ ...e, cooperationInterests: '' }));
  }

  function validate(p: number): boolean {
    const e: Record<string, string> = {};
    if (p === 1) {
      if (!data.companyName.trim()) e.companyName = '회사명을 입력해주세요.';
      if (!data.position.trim()) e.position = '직함을 입력해주세요.';
      if (!data.name.trim()) e.name = '이름을 입력해주세요.';
      if (!data.phone.trim()) e.phone = '전화번호를 입력해주세요.';
      if (!data.email.trim()) e.email = '이메일을 입력해주세요.';
    } else if (p === 2) {
      if (data.usesGowid === null) e.usesGowid = '고위드 사용 여부를 선택해주세요.';
      if (!data.companyWebsite.trim()) e.companyWebsite = '회사 홈페이지를 입력해주세요.';
    } else if (p === 3) {
      if (!data.partnerType) e.partnerType = '파트너 유형을 선택해주세요.';
    } else if (p === 4) {
      if (!data.cooperationInterests.length) e.cooperationInterests = '최소 1개 이상 선택해주세요.';
    } else if (p === 5) {
      if (!data.howFound) e.howFound = '유입 경로를 선택해주세요.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (validate(page)) setPage(p => p + 1);
  }

  function back() {
    setErrors({});
    setPage(p => p - 1);
  }

  async function submit() {
    if (!validate(5)) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/partner-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ...utmParams }),
      });
      if (res.ok) {
        setPage(6);
      } else {
        setSubmitError('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch {
      setSubmitError('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  }

  const coopOpts = data.partnerType ? COOP_OPTIONS[data.partnerType] : [];


  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif', background: '#fafafa' }}
    >
      {/* 진행 바 (1~5페이지) */}
      {page >= 1 && page <= 5 && (
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-3 px-5 py-4 bg-white shadow-sm">
          <button
            onClick={back}
            className="text-gray-400 text-xl leading-none p-1 hover:text-gray-600 transition-colors"
            aria-label="이전 페이지"
          >
            ←
          </button>
          <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(page / 5) * 100}%`, background: '#5BC500' }}
            />
          </div>
          <span className="text-xs text-gray-300 font-medium w-8 text-right">{page}/5</span>
        </div>
      )}

      {/* 슬라이드 트랙 */}
      <div
        className="flex h-full"
        style={{
          transform: `translateX(-${page * 100}vw)`,
          transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          willChange: 'transform',
        }}
      >
        {/* ─── PAGE 0: 랜딩 ─── */}
        <div
          className="flex-shrink-0 flex flex-col items-center justify-center px-6 overflow-y-auto"
          style={{ width: '100vw', height: '100%' }}
        >
          <div className="max-w-md w-full text-center py-12">
            <span
              className="inline-block px-4 py-1.5 text-xs font-bold rounded-full mb-8 tracking-widest"
              style={{ background: 'rgba(91,197,0,0.1)', color: '#5BC500' }}
            >
              PARTNER PROGRAM
            </span>
            <h1
              className="font-extrabold leading-tight text-gray-900 mb-5 tracking-tight"
              style={{ fontSize: 'clamp(30px, 5vw, 48px)' }}
            >
              고위드<br />파트너 프로그램
            </h1>
            <p
              className="text-gray-400 leading-relaxed mb-14"
              style={{ fontSize: 'clamp(14px, 2vw, 16px)' }}
            >
              혁신 기업을 위해 고민하는 당신에게,<br />
              고위드의 데이터와 네트워크를 드립니다
            </p>
            <button
              onClick={() => setPage(1)}
              className="inline-block px-10 py-4 text-white text-[15px] font-bold rounded-xl"
              style={{
                background: 'linear-gradient(135deg, #5BC500 0%, #4a9f00 100%)',
                boxShadow: '0 4px 20px rgba(91,197,0,0.35)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(91,197,0,0.45)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(91,197,0,0.35)';
              }}
            >
              파트너 프로그램 참여하기
            </button>
          </div>
        </div>

        {/* ─── PAGE 1: 기본 정보 ─── */}
        <div
          className="flex-shrink-0 flex flex-col items-center pt-20 pb-10 px-6 overflow-y-auto"
          style={{ width: '100vw', height: '100%' }}
        >
          <div className="max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-1">아래 정보를 입력해주세요</h2>
            <p className="text-xs text-gray-300 mb-8">* 모든 항목은 필수 입력입니다.</p>
            <TextField
              label="회사명"
              value={data.companyName}
              placeholder="회사명을 입력해주세요"
              error={errors.companyName}
              onChange={v => update('companyName', v)}
            />
            <TextField
              label="직함"
              value={data.position}
              placeholder="예: 대표, 마케팅 팀장"
              error={errors.position}
              onChange={v => update('position', v)}
            />
            <TextField
              label="이름"
              value={data.name}
              placeholder="이름을 입력해주세요"
              error={errors.name}
              onChange={v => update('name', v)}
            />
            <TextField
              label="전화번호"
              value={data.phone}
              placeholder="010-0000-0000"
              type="tel"
              error={errors.phone}
              onChange={v => update('phone', v)}
            />
            <TextField
              label="이메일"
              value={data.email}
              placeholder="example@company.com"
              type="email"
              error={errors.email}
              onChange={v => update('email', v)}
            />
            <button
              onClick={next}
              className="w-full py-3.5 rounded-xl text-white text-base font-bold mt-2 hover:opacity-90 transition-opacity"
              style={{ background: '#5BC500' }}
            >
              다음
            </button>
          </div>
        </div>

        {/* ─── PAGE 2: 고위드 사용 여부 + 홈페이지 ─── */}
        <div
          className="flex-shrink-0 flex flex-col items-center pt-20 pb-10 px-6 overflow-y-auto"
          style={{ width: '100vw', height: '100%' }}
        >
          <div className="max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-9">추가 정보를 입력해주세요</h2>

            {/* 고위드 사용 여부 */}
            <div className="mb-9">
              <p className="text-sm font-semibold text-gray-600 mb-3">
                1. 현재 고위드를 사용하고 계신가요?
              </p>
              <div className="flex gap-3">
                {([{ v: true, l: '예' }, { v: false, l: '아니오' }] as { v: boolean; l: string }[]).map(
                  ({ v, l }) => {
                    const sel = data.usesGowid === v;
                    return (
                      <button
                        key={l}
                        onClick={() => update('usesGowid', v)}
                        className="flex-1 py-3 rounded-xl text-[15px] font-semibold transition-all"
                        style={{
                          background: sel ? 'rgba(91,197,0,0.1)' : 'white',
                          color: sel ? '#4a9f00' : '#555',
                          border: sel ? '2px solid #5BC500' : '2px solid #e5e5e5',
                        }}
                      >
                        {l}
                      </button>
                    );
                  }
                )}
              </div>
              {errors.usesGowid && (
                <p className="text-xs text-red-400 mt-1.5">{errors.usesGowid}</p>
              )}
            </div>

            {/* 회사 홈페이지 */}
            <div className="mb-9">
              <label className="block text-sm font-semibold text-gray-600 mb-1.5">
                2. 회사 홈페이지를 입력해주세요.
              </label>
              <input
                type="url"
                value={data.companyWebsite}
                onChange={e => update('companyWebsite', e.target.value)}
                placeholder="https://www.example.com"
                className={`w-full px-4 py-3 rounded-xl text-[15px] text-gray-800 bg-white outline-none transition-colors ${
                  errors.companyWebsite
                    ? 'border-[1.5px] border-red-400'
                    : 'border-[1.5px] border-gray-200 focus:border-[#5BC500]'
                }`}
                style={{ fontFamily: 'inherit' }}
              />
              {errors.companyWebsite && (
                <p className="text-xs text-red-400 mt-1">{errors.companyWebsite}</p>
              )}
            </div>

            <button
              onClick={next}
              className="w-full py-3.5 rounded-xl text-white text-base font-bold hover:opacity-90 transition-opacity"
              style={{ background: '#5BC500' }}
            >
              다음
            </button>
          </div>
        </div>

        {/* ─── PAGE 3: 파트너 유형 ─── */}
        <div
          className="flex-shrink-0 flex flex-col items-center pt-20 pb-10 px-6 overflow-y-auto"
          style={{ width: '100vw', height: '100%' }}
        >
          <div className="max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              아래 선택지 중<br />가까운 유형을 선택해주세요.
            </h2>
            <p className="text-xs text-gray-300 mb-7">* 1개 선택</p>
            <div className="flex flex-col gap-3 mb-6">
              {PARTNER_TYPES.map(({ value, label, desc }) => {
                const sel = data.partnerType === value;
                return (
                  <button
                    key={value}
                    onClick={() => {
                      update('partnerType', value);
                      update('cooperationInterests', []);
                      update('otherCooperation', '');
                    }}
                    className="p-4 rounded-xl text-left transition-all"
                    style={{
                      background: sel ? 'rgba(91,197,0,0.08)' : 'white',
                      border: sel ? '2px solid #5BC500' : '2px solid #e5e5e5',
                    }}
                  >
                    <p
                      className="text-[15px] font-bold mb-0.5"
                      style={{ color: sel ? '#4a9f00' : '#1a1a1a' }}
                    >
                      {label}
                    </p>
                    <p className="text-xs text-gray-400">{desc}</p>
                  </button>
                );
              })}
            </div>
            {errors.partnerType && (
              <p className="text-xs text-red-400 mb-3">{errors.partnerType}</p>
            )}
            <button
              onClick={next}
              className="w-full py-3.5 rounded-xl text-white text-base font-bold hover:opacity-90 transition-opacity"
              style={{ background: '#5BC500' }}
            >
              다음
            </button>
          </div>
        </div>

        {/* ─── PAGE 4: 협력 유형 ─── */}
        <div
          className="flex-shrink-0 flex flex-col items-center pt-20 pb-10 px-6 overflow-y-auto"
          style={{ width: '100vw', height: '100%' }}
        >
          <div className="max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              고위드와 어떤 협력에<br />관심 있으신가요?
            </h2>
            <p className="text-xs text-gray-300 mb-7">* 복수 선택 가능</p>
            <div className="flex flex-col gap-2.5 mb-5">
              {coopOpts.map(option => {
                const sel = data.cooperationInterests.includes(option);
                return (
                  <div key={option}>
                    <button
                      onClick={() => toggleCoop(option)}
                      className="w-full px-4 py-3 rounded-xl text-left flex items-center gap-3 transition-all"
                      style={{
                        background: sel ? 'rgba(91,197,0,0.08)' : 'white',
                        border: sel ? '1.5px solid #5BC500' : '1.5px solid #e5e5e5',
                      }}
                    >
                      <span
                        className="flex items-center justify-center shrink-0 rounded-md transition-all"
                        style={{
                          width: 20,
                          height: 20,
                          background: sel ? '#5BC500' : 'white',
                          border: sel ? '2px solid #5BC500' : '2px solid #ccc',
                        }}
                      >
                        {sel && (
                          <span
                            className="text-white font-bold leading-none"
                            style={{ fontSize: 11 }}
                          >
                            ✓
                          </span>
                        )}
                      </span>
                      <span
                        className="text-sm"
                        style={{ fontWeight: sel ? 600 : 400, color: sel ? '#4a9f00' : '#333' }}
                      >
                        {option}
                      </span>
                    </button>
                    {option === '기타' && sel && (
                      <input
                        type="text"
                        value={data.otherCooperation}
                        onChange={e => update('otherCooperation', e.target.value)}
                        placeholder="어떤 협력을 원하시나요?"
                        className="w-full mt-2 px-3.5 py-2.5 border-[1.5px] border-gray-200 rounded-lg text-sm outline-none focus:border-[#5BC500] bg-white"
                        style={{ fontFamily: 'inherit' }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            {errors.cooperationInterests && (
              <p className="text-xs text-red-400 mb-3">{errors.cooperationInterests}</p>
            )}
            <button
              onClick={next}
              className="w-full py-3.5 rounded-xl text-white text-base font-bold hover:opacity-90 transition-opacity"
              style={{ background: '#5BC500' }}
            >
              다음
            </button>
          </div>
        </div>

        {/* ─── PAGE 5: 유입 경로 ─── */}
        <div
          className="flex-shrink-0 flex flex-col items-center pt-20 pb-10 px-6 overflow-y-auto"
          style={{ width: '100vw', height: '100%' }}
        >
          <div className="max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              고위드 파트너십을<br />어떻게 알게 되셨나요?
            </h2>
            <p className="text-xs text-gray-300 mb-7">* 1개 선택</p>
            <div className="flex flex-col gap-2.5 mb-5">
              {HOW_FOUND_OPTIONS.map(option => {
                const sel = data.howFound === option;
                return (
                  <div key={option}>
                    <button
                      onClick={() => {
                        update('howFound', option);
                        if (option !== '기타') update('otherHowFound', '');
                      }}
                      className="w-full px-4 py-3 rounded-xl text-left flex items-center gap-3 transition-all"
                      style={{
                        background: sel ? 'rgba(91,197,0,0.08)' : 'white',
                        border: sel ? '1.5px solid #5BC500' : '1.5px solid #e5e5e5',
                      }}
                    >
                      <span
                        className="flex items-center justify-center shrink-0 rounded-full transition-all"
                        style={{
                          width: 20,
                          height: 20,
                          background: sel ? '#5BC500' : 'white',
                          border: sel ? '2px solid #5BC500' : '2px solid #ccc',
                        }}
                      >
                        {sel && (
                          <span
                            className="rounded-full bg-white block"
                            style={{ width: 8, height: 8 }}
                          />
                        )}
                      </span>
                      <span
                        className="text-sm"
                        style={{ fontWeight: sel ? 600 : 400, color: sel ? '#4a9f00' : '#333' }}
                      >
                        {option}
                      </span>
                    </button>
                    {option === '기타' && sel && (
                      <input
                        type="text"
                        value={data.otherHowFound}
                        onChange={e => update('otherHowFound', e.target.value)}
                        placeholder="어디서 알게 되셨나요?"
                        className="w-full mt-2 px-3.5 py-2.5 border-[1.5px] border-gray-200 rounded-lg text-sm outline-none focus:border-[#5BC500] bg-white"
                        style={{ fontFamily: 'inherit' }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            {errors.howFound && (
              <p className="text-xs text-red-400 mb-3">{errors.howFound}</p>
            )}
            {submitError && (
              <p className="text-xs text-red-400 mb-3">{submitError}</p>
            )}
            <button
              onClick={submit}
              disabled={submitting}
              className="w-full py-3.5 rounded-xl text-white text-base font-bold transition-opacity"
              style={{
                background: submitting ? '#aaa' : '#5BC500',
                cursor: submitting ? 'not-allowed' : 'pointer',
              }}
            >
              {submitting ? '제출 중...' : '제출하기'}
            </button>
          </div>
        </div>

        {/* ─── PAGE 6: 완료 ─── */}
        <div
          className="flex-shrink-0 flex flex-col items-center justify-center px-6 overflow-y-auto"
          style={{ width: '100vw', height: '100%' }}
        >
          <div className="max-w-md w-full text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-7"
              style={{ background: 'rgba(91,197,0,0.12)' }}
            >
              <span style={{ fontSize: 38, color: '#5BC500', lineHeight: 1 }}>✓</span>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
              제출이 완료되셨습니다.
            </h2>
            <p className="text-base text-gray-400 leading-relaxed">
              빠른 시일 내 검토하여<br />연락드리겠습니다. :)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ApplyPartnersPage() {
  return (
    <Suspense>
      <ApplyPartnersForm />
    </Suspense>
  );
}
