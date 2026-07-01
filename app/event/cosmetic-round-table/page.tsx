'use client';

import { useState, useEffect } from 'react';

export default function CosmeticRoundTablePage() {
  const [form, setForm] = useState({ company: '', name: '', title: '', phone: '', consent: false });
  const [termsOpen, setTermsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');
  const [utmParams, setUtmParams] = useState({ utm_source: '', utm_medium: '', utm_campaign: '' });

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: p.get('utm_source') || '',
      utm_medium: p.get('utm_medium') || '',
      utm_campaign: p.get('utm_campaign') || '',
    });
  }, []);

  async function send() {
    setErr('');
    if (!form.company || !form.name || !form.title || !form.phone) {
      setErr('모든 항목을 입력해 주세요.'); return;
    }
    if (!form.consent) {
      setErr('개인정보 수집·이용 동의가 필요합니다.'); return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/cosmetic-round-table-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ...utmParams }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '오류가 발생했습니다.');
      setDone(true);
      window.scrollTo(0, 0);
    } catch (e) {
      setErr(e instanceof Error ? e.message : '전송에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <style>{`
        :root{--green:#B6B3CA;--accent:#2F9E55;--accent-dk:#247A42;--bg:#F5F7F5;--line:#E5E8ED;--ink:#1B2430;--muted:#6B7480}
        *{box-sizing:border-box}
        body{margin:0;background:var(--bg);color:var(--ink);line-height:1.6}
        .crt-hero{background:var(--green);color:var(--ink);padding:26px 24px 28px;border-radius:0 0 20px 20px;text-align:center}
        .crt-logo{height:24px;width:auto;margin:0 auto 14px;display:block}
        .crt-kicker{font-size:11.5px;letter-spacing:.14em;color:var(--accent-dk);font-weight:700;margin:0 0 8px}
        .crt-hero h1{font-size:20px;line-height:1.4;margin:0 0 6px;font-weight:800}
        .crt-hero p{margin:4px 0 0;font-size:13.5px;color:var(--muted)}
        .crt-seats{display:inline-block;margin-top:14px;padding:6px 14px;background:#E2E1EE;border:1px solid #B6B3CA;color:#6B67A8;border-radius:999px;font-size:12.5px;font-weight:600}
        .crt-wrap{max-width:620px;margin:0 auto;padding:0 18px 56px}
        .crt-card{background:#fff;border:1px solid var(--line);border-radius:16px;padding:24px;margin-top:18px}
        .crt-card h2{font-size:16px;margin:0 0 14px;font-weight:700}
        .crt-info{width:100%;border-collapse:collapse;font-size:14.5px}
        .crt-info td{padding:9px 0;border-bottom:1px solid var(--line);vertical-align:top}
        .crt-info td:first-child{color:var(--muted);width:78px;white-space:nowrap}
        .crt-sess{font-size:14px;color:var(--muted);margin:4px 0 0}
        .crt-sess b{color:var(--ink)}
        .crt-label{display:block;font-size:13.5px;font-weight:600;margin:16px 0 6px}
        .crt-req{color:var(--accent)}
        .crt-input{width:100%;padding:13px 14px;border:1px solid var(--line);border-radius:10px;font-size:15px;background:#fff;outline:none;font-family:inherit}
        .crt-input:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(47,158,85,.15)}
        .crt-consent{display:flex;gap:10px;align-items:flex-start;margin-top:18px;font-size:13px;color:var(--muted)}
        .crt-consent input{margin-top:3px;accent-color:var(--accent)}
        .crt-consent a{color:var(--accent-dk);text-decoration:underline;cursor:pointer}
        .crt-terms{font-size:12.5px;color:var(--muted);background:#FAFBFC;border:1px solid var(--line);border-radius:10px;padding:14px;margin-top:10px;line-height:1.55}
        .crt-btn{width:100%;margin-top:22px;padding:16px;background:var(--accent);color:#fff;border:0;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;font-family:inherit}
        .crt-btn:hover{background:var(--accent-dk)}
        .crt-btn:disabled{opacity:.55;cursor:not-allowed}
        .crt-note{font-size:12px;color:var(--muted);text-align:center;margin-top:14px}
        .crt-err{color:#C0392B;font-size:13px;margin-top:10px}
        .crt-done{text-align:center;padding:30px 10px}
        .crt-done .ic{font-size:44px}
        .crt-done h2{margin:10px 0 6px}
      `}</style>

      <div className="crt-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="crt-logo" src="/gowid-logo-basic.png" alt="gowid" />
        <p className="crt-kicker">PRIVATE ROUNDTABLE</p>
        <h1>AI CFO 시대, K-뷰티의 경영 가시성<br />마진·재고·현금흐름 실전편</h1>
        <p>코스메틱 대표·CFO 프라이빗 라운드테이블</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/cosmetic-roundtable-banner.png"
          alt="코스메틱 라운드테이블 배너"
          style={{ width: '100%', maxWidth: '480px', margin: '16px auto 0', display: 'block', borderRadius: '14px' }}
        />
        <span className="crt-seats">선착순 20석 · 7월 15일(수) 18:00</span>
      </div>

      <div className="crt-wrap">
        {done ? (
          <div className="crt-card crt-done">
            <div className="ic">✅</div>
            <h2>신청이 완료되었습니다</h2>
            <p className="crt-sess" style={{ textAlign: 'center' }}>좌석이 확정되었습니다.</p>
            <p className="crt-note">확정 안내는 기재해 주신 연락처로 드립니다.</p>
          </div>
        ) : (
          <div className="crt-card">
            <h2>행사 정보</h2>
            <table className="crt-info">
              <tbody>
                <tr><td>일시</td><td>2026년 7월 15일(수) 18:00 ~ 20:00</td></tr>
                <tr><td>장소</td><td>고위드 본사 14층</td></tr>
                <tr><td>대상</td><td>코스메틱 업종 대표·CFO 등 의사결정권자</td></tr>
                <tr><td>규모</td><td>선착순 20석 한정 · 참가 비용 무료(다과 제공)</td></tr>
                <tr>
                  <td>프로그램</td>
                  <td>
                    <p className="crt-sess"><b>세션1.</b> AI를 의사결정에 활용하는 법 — 파이노버스랩 장종욱 대표</p>
                    <p className="crt-sess"><b>세션2.</b> 코스메틱 업종에서 활용한 고위드 우수 사례 — 고위드 문미성 팀장</p>
                    <p className="crt-sess">+ 대표님 간 자유 네트워킹</p>
                  </td>
                </tr>
              </tbody>
            </table>

            <h2 style={{ marginTop: 24 }}>참석 신청</h2>

            <label className="crt-label">회사명 <span className="crt-req">*</span></label>
            <input
              className="crt-input"
              type="text"
              value={form.company}
              onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
              autoComplete="organization"
            />

            <label className="crt-label">성함 <span className="crt-req">*</span></label>
            <input
              className="crt-input"
              type="text"
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              autoComplete="name"
            />

            <label className="crt-label">직책 <span className="crt-req">*</span></label>
            <input
              className="crt-input"
              type="text"
              value={form.title}
              onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              placeholder="예) 대표이사 / CFO / 재무팀장"
            />

            <label className="crt-label">연락처(휴대폰) <span className="crt-req">*</span></label>
            <input
              className="crt-input"
              type="tel"
              value={form.phone}
              onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
              inputMode="numeric"
              placeholder="010-0000-0000"
            />

            <div className="crt-consent">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={e => setForm(p => ({ ...p, consent: e.target.checked }))}
              />
              <span>
                (필수) 개인정보 수집·이용에 동의합니다.{' '}
                <a onClick={() => setTermsOpen(v => !v)}>[전문 보기]</a>
              </span>
            </div>
            {termsOpen && (
              <div className="crt-terms">
                · 수집 항목: 회사명, 성함, 직책, 연락처<br />
                · 수집 목적: 본 행사 참석자 확인 및 안내 연락<br />
                · 보유 기간: 행사 종료 후 3개월 내 파기<br />
                · 동의를 거부할 수 있으며, 거부 시 행사 신청이 제한됩니다.
              </div>
            )}

            <button className="crt-btn" onClick={send} disabled={submitting}>
              {submitting ? '신청 처리 중...' : '참여 신청하기'}
            </button>
            {err && <p className="crt-err">{err}</p>}
            <p className="crt-note">신청 순서대로 좌석이 확정되며, 마감 시 대기자로 안내드립니다.</p>
          </div>
        )}
      </div>
    </>
  );
}
