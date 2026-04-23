'use client';

import { useState, useEffect } from 'react';

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
    font-family: 'Pretendard', -apple-system, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
    color: #1C1C1B;
    line-height: 1.6;
    overflow-x: hidden;
    background: #fff;
    padding-bottom: 72px;
}
a { text-decoration: none; color: inherit; }

:root {
    --green: #03C75A;
    --green-dark: #02A84C;
    --green-light: rgba(3,199,90,0.08);
    --dark: #0D0F1C;
    --navy: #141627;
    --text: #1C1C1B;
    --text-sub: #6B7280;
    --text-light: #9CA3AF;
    --bg: #F6F8FA;
    --bg2: #ECEEF2;
    --border: #E5E7EB;
    --red: #EF4444;
    --red-light: rgba(239,68,68,0.07);
    --shadow: 0 2px 16px rgba(0,0,0,0.07);
    --shadow-lg: 0 8px 40px rgba(0,0,0,0.12);
}

.wrap { max-width: 1060px; margin: 0 auto; padding: 0 24px; }

.eyebrow {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--green);
    margin-bottom: 12px;
}
.sec-title {
    font-size: clamp(1.55rem, 3.5vw, 2.3rem);
    font-weight: 800;
    line-height: 1.25;
    letter-spacing: -0.022em;
    margin-bottom: 12px;
}
.sec-sub {
    font-size: 1rem;
    color: var(--text-sub);
    line-height: 1.7;
}

.fu {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity 0.55s cubic-bezier(.16,1,.3,1), transform 0.55s cubic-bezier(.16,1,.3,1);
}
.fu.d1 { transition-delay: 0.07s; }
.fu.d2 { transition-delay: 0.14s; }
.fu.d3 { transition-delay: 0.21s; }
.fu.d4 { transition-delay: 0.28s; }
.fu.vis { opacity: 1; transform: none; }

.hero {
    background: linear-gradient(148deg, #09102A 0%, #0E1633 50%, #0A1A35 100%);
    color: #fff;
    padding: 90px 24px 120px;
    text-align: center;
    position: relative;
    overflow: hidden;
}
.hero::before {
    content: '';
    position: absolute;
    width: 780px; height: 780px;
    background: radial-gradient(circle, rgba(3,199,90,0.09) 0%, transparent 60%);
    top: -260px; left: 50%; transform: translateX(-50%);
    pointer-events: none;
}
.hero::after {
    content: '';
    position: absolute;
    bottom: -1px; left: 0; right: 0;
    height: 60px;
    background: #fff;
    clip-path: ellipse(52% 100% at 50% 100%);
}
.partner-badge {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(3,199,90,0.35);
    padding: 9px 22px;
    border-radius: 100px;
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--green);
    margin-bottom: 32px;
    letter-spacing: 0.05em;
}
.badge-dot { width: 6px; height: 6px; background: var(--green); border-radius: 50%; animation: blink 2.4s infinite; }
@keyframes blink { 0%,100%{opacity:1;} 50%{opacity:.3;} }
.hero h1 {
    font-size: clamp(1.9rem, 5.5vw, 3.6rem);
    font-weight: 900;
    line-height: 1.15;
    margin-bottom: 18px;
    letter-spacing: -0.026em;
}
.hero h1 .hl { color: var(--green); }
.hero-sub {
    font-size: clamp(0.95rem, 1.8vw, 1.1rem);
    color: rgba(255,255,255,0.55);
    max-width: 460px;
    margin: 0 auto 44px;
    line-height: 1.78;
}
.card-mockup {
    display: inline-block;
    width: 300px; height: 184px;
    background: linear-gradient(135deg, #1A1F4A 0%, #232A60 100%);
    border-radius: 16px;
    padding: 24px 26px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07);
    text-align: left;
    margin-bottom: 44px;
    transition: transform 0.35s ease;
}
.card-mockup:hover { transform: rotateY(-5deg) rotateX(2deg) translateY(-4px); }
.card-mockup::after {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(3,199,90,0.16) 0%, transparent 60%);
}
.cm-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 22px; }
.cm-brand { font-size: 1rem; font-weight: 900; color: var(--green); letter-spacing: 0.05em; }
.cm-chip { width: 30px; height: 23px; background: linear-gradient(135deg,#C89010,#EFC028); border-radius: 4px; }
.cm-num { font-size: 0.82rem; letter-spacing: 0.2em; color: rgba(255,255,255,0.42); margin-bottom: 12px; font-family: 'Courier New', monospace; }
.cm-holder { font-size: 0.7rem; color: rgba(255,255,255,0.35); letter-spacing: 0.08em; text-transform: uppercase; }
.cm-badge {
    position: absolute; bottom: 18px; right: 18px;
    background: var(--green); color: #fff;
    font-size: 0.58rem; font-weight: 800;
    padding: 3px 10px; border-radius: 100px;
    letter-spacing: 0.04em;
}
.btn-hero {
    display: inline-flex; align-items: center; gap: 9px;
    background: var(--green); color: #fff;
    font-size: 1rem; font-weight: 700;
    padding: 16px 38px; border-radius: 100px; border: none; cursor: pointer;
    box-shadow: 0 8px 32px rgba(3,199,90,0.45);
    transition: background .2s, transform .2s, box-shadow .2s;
}
.btn-hero:hover { background: var(--green-dark); transform: translateY(-2px); box-shadow: 0 12px 40px rgba(3,199,90,0.52); }
.arr { display: inline-block; transition: transform .2s; }
.btn-hero:hover .arr { transform: translateX(4px); }

.stats { background: #fff; padding: 40px 24px; border-bottom: 1px solid var(--border); }
.stats .wrap { display: flex; justify-content: center; gap: 48px; flex-wrap: wrap; }
.stat-item { text-align: center; }
.stat-n { font-size: 1.9rem; font-weight: 900; color: var(--text); line-height: 1; margin-bottom: 5px; letter-spacing: -0.02em; }
.stat-n em { color: var(--green); font-style: normal; }
.stat-d { font-size: 0.8rem; color: var(--text-sub); }

.proof { background: var(--bg); padding: 48px 24px; border-bottom: 1px solid var(--border); }
.proof-inner { text-align: center; }
.proof-head { font-size: 0.85rem; color: var(--text-sub); margin-bottom: 28px; font-weight: 500; }
.proof-head strong { color: var(--text); }
.logos { display: flex; justify-content: center; align-items: center; gap: 0; flex-wrap: wrap; }
.logo-item {
    padding: 10px 24px;
    font-size: 0.92rem;
    font-weight: 700;
    color: #9CA3AF;
    letter-spacing: 0.03em;
    border-right: 1px solid var(--border);
    line-height: 1;
}
.logo-item:last-child { border-right: none; }
.proof-review {
    margin-top: 32px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 14px;
    max-width: 860px;
    margin-left: auto;
    margin-right: auto;
}
.review-card { background: #fff; border: 1px solid var(--border); border-radius: 14px; padding: 20px 22px; text-align: left; }
.review-star { color: #F59E0B; font-size: 0.85rem; margin-bottom: 8px; }
.review-txt { font-size: 0.88rem; color: var(--text); line-height: 1.65; margin-bottom: 12px; }
.review-author { font-size: 0.78rem; color: var(--text-sub); font-weight: 600; }

.problem { background: #fff; padding: 88px 24px; text-align: center; }
.problem .sec-title .muted { color: var(--text-sub); font-weight: 500; }
.prob-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
    max-width: 860px;
    margin: 44px auto 0;
}
.prob-card {
    background: var(--bg);
    border-radius: 16px;
    padding: 26px 22px;
    text-align: left;
    border: 1px solid var(--border);
    border-top: 3px solid #EF4444;
    transition: box-shadow .2s, transform .2s;
}
.prob-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); }
.prob-icon { font-size: 1.7rem; margin-bottom: 12px; display: block; }
.prob-card h3 { font-size: 0.98rem; font-weight: 700; margin-bottom: 8px; }
.prob-card p { font-size: 0.85rem; color: var(--text-sub); line-height: 1.65; }
.gap-tag { display: inline-block; background: var(--red-light); color: #DC2626; font-weight: 700; padding: 1px 6px; border-radius: 4px; font-size: 0.82em; }

.bridge {
    background: var(--dark);
    color: #fff;
    padding: 84px 24px;
    text-align: center;
    position: relative;
    overflow: hidden;
}
.bridge::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 120%, rgba(3,199,90,0.08) 0%, transparent 55%);
}
.bridge .sec-title .hl { color: var(--green); }
.bridge .sec-sub { color: rgba(255,255,255,0.5); max-width: 480px; margin: 0 auto 44px; }
.timing-gap { max-width: 580px; margin: 0 auto; }
.tg-row { display: flex; align-items: stretch; gap: 0; margin-bottom: 12px; font-size: 0.85rem; }
.tg-label {
    width: 90px;
    flex-shrink: 0;
    padding: 12px 14px;
    font-weight: 700;
    font-size: 0.78rem;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    border-radius: 10px 0 0 10px;
}
.tg-label.out { background: rgba(239,68,68,0.15); color: #FCA5A5; }
.tg-label.in  { background: rgba(3,199,90,0.15); color: #6EE7A8; }
.tg-bar-wrap {
    flex: 1;
    background: rgba(255,255,255,0.04);
    border-radius: 0 10px 10px 0;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
}
.tg-fill {
    height: 100%;
    min-height: 44px;
    display: flex;
    align-items: center;
    padding: 0 14px;
    font-size: 0.8rem;
    font-weight: 600;
    position: relative;
}
.tg-fill.red { background: rgba(239,68,68,0.22); color: #FCA5A5; width: 100%; }
.tg-fill.green { background: rgba(3,199,90,0.22); color: #6EE7A8; }
.tg-gap {
    position: absolute;
    right: 0; top: 0; bottom: 0;
    background: rgba(239,68,68,0.08);
    border-left: 2px dashed rgba(239,68,68,0.4);
    display: flex;
    align-items: center;
    padding: 0 10px;
    font-size: 0.72rem;
    color: #FCA5A5;
    width: 34%;
}
.bridge-sol {
    margin-top: 28px;
    background: rgba(3,199,90,0.08);
    border: 1px solid rgba(3,199,90,0.22);
    border-radius: 14px;
    padding: 20px 22px;
    text-align: left;
    font-size: 0.92rem;
    color: rgba(255,255,255,0.85);
}
.bridge-sol strong { color: var(--green); }

.why { padding: 88px 24px; background: #fff; }
.sec-center { text-align: center; margin-bottom: 48px; }
.ben-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    max-width: 860px;
    margin: 0 auto 36px;
}
@media (max-width: 600px) { .ben-grid { grid-template-columns: 1fr; } }
.ben-card {
    background: var(--bg);
    border-radius: 18px;
    padding: 28px 24px;
    border: 1px solid var(--border);
    position: relative;
    overflow: hidden;
    transition: transform .22s, box-shadow .22s;
}
.ben-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
.ben-num { font-size: 3.5rem; font-weight: 900; color: rgba(3,199,90,0.07); position: absolute; top: 6px; right: 16px; line-height: 1; }
.ben-icon { width: 46px; height: 46px; background: var(--green-light); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; margin-bottom: 16px; }
.ben-card h3 { font-size: 1rem; font-weight: 700; margin-bottom: 8px; }
.ben-card p { font-size: 0.85rem; color: var(--text-sub); line-height: 1.65; }
.ben-val { display: inline-block; background: var(--green-light); color: #027A36; font-weight: 800; font-size: 1rem; padding: 5px 12px; border-radius: 7px; margin-top: 12px; }
.btn-outline {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 13px 30px;
    border: 2px solid var(--green);
    color: #027A36;
    font-weight: 700;
    font-size: 0.9rem;
    border-radius: 100px;
    cursor: pointer;
    background: #fff;
    transition: all .2s;
}
.btn-outline:hover { background: var(--green); color: #fff; }

.scenario { background: var(--bg); padding: 88px 24px; }
.scenario-box {
    max-width: 760px;
    margin: 44px auto 0;
    background: #fff;
    border-radius: 20px;
    border: 1px solid var(--border);
    overflow: hidden;
    box-shadow: var(--shadow);
}
.sc-tabs { display: flex; border-bottom: 1px solid var(--border); }
.sc-tab {
    flex: 1; padding: 14px; text-align: center;
    font-size: 0.88rem; font-weight: 600;
    cursor: pointer; border: none; background: none;
    color: var(--text-sub);
    border-bottom: 2.5px solid transparent;
    margin-bottom: -1px;
    transition: all .2s;
}
.sc-tab.on { color: var(--text); border-bottom-color: var(--green); background: rgba(3,199,90,0.03); }
.sc-panel { display: none; padding: 32px 28px; }
.sc-panel.on { display: block; }
.sc-intro { display: flex; align-items: center; gap: 16px; background: var(--bg); border-radius: 12px; padding: 16px 20px; margin-bottom: 24px; }
.sc-intro-ico { font-size: 1.8rem; }
.sc-intro h4 { font-size: 0.95rem; font-weight: 700; margin-bottom: 3px; }
.sc-intro p { font-size: 0.83rem; color: var(--text-sub); }
.sc-compare { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
@media (max-width: 560px) { .sc-compare { grid-template-columns: 1fr; } }
.sc-before, .sc-after { border-radius: 12px; padding: 18px 18px; }
.sc-before { background: var(--red-light); border: 1px solid rgba(239,68,68,0.18); }
.sc-after  { background: var(--green-light); border: 1px solid rgba(3,199,90,0.2); }
.sc-before h5, .sc-after h5 { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px; }
.sc-before h5 { color: #DC2626; }
.sc-after h5 { color: #027A36; }
.sc-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px; font-size: 0.83rem; }
.sc-row .sl { color: var(--text-sub); }
.sc-row .sv { font-weight: 700; }
.sc-row .sv.red { color: #DC2626; }
.sc-row .sv.grn { color: #027A36; }
.sc-sum {
    background: var(--dark);
    border-radius: 12px;
    padding: 18px 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
}
.sc-sum p { font-size: 0.85rem; color: rgba(255,255,255,0.55); }
.sc-sum strong { font-size: 1.5rem; font-weight: 900; color: var(--green); }

.timeline { background: #fff; padding: 88px 24px; }
.tl-wrap { max-width: 700px; margin: 44px auto 0; }
.tl-step { display: flex; gap: 20px; margin-bottom: 0; position: relative; }
.tl-step:not(:last-child)::before {
    content: '';
    position: absolute;
    left: 19px;
    top: 44px;
    bottom: -12px;
    width: 2px;
    background: linear-gradient(to bottom, var(--green), var(--border));
}
.tl-dot {
    width: 40px; height: 40px;
    border-radius: 50%;
    background: var(--green-light);
    border: 2px solid var(--green);
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
}
.tl-body { padding-bottom: 36px; flex: 1; }
.tl-day { font-size: 0.72rem; font-weight: 700; color: var(--green); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 3px; }
.tl-body h3 { font-size: 1rem; font-weight: 700; margin-bottom: 6px; }
.tl-body p { font-size: 0.85rem; color: var(--text-sub); line-height: 1.65; }
.tl-tag {
    display: inline-block;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 4px 10px;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--text-sub);
    margin-top: 8px;
}
.tl-tag.green { background: var(--green-light); border-color: rgba(3,199,90,0.25); color: #027A36; }

.expense { padding: 88px 24px; background: #fff; }
.exp-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    max-width: 860px;
    margin: 44px auto 0;
}
@media (max-width: 600px) { .exp-grid { grid-template-columns: 1fr; } }
.exp-card {
    background: var(--bg);
    border-radius: 14px;
    padding: 22px 20px;
    display: flex;
    align-items: flex-start;
    gap: 14px;
    border: 1px solid var(--border);
    transition: box-shadow .2s, transform .2s;
}
.exp-card:hover { box-shadow: var(--shadow); transform: translateY(-2px); }
.exp-ico {
    width: 42px; height: 42px;
    background: #fff;
    border-radius: 11px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
    box-shadow: 0 1px 6px rgba(0,0,0,0.07);
}
.exp-card h3 { font-size: 0.93rem; font-weight: 700; margin-bottom: 5px; }
.exp-card p { font-size: 0.83rem; color: var(--text-sub); line-height: 1.62; }

.faq { background: var(--bg); padding: 88px 24px; }
.faq-list { max-width: 720px; margin: 44px auto 0; }
.faq-item { background: #fff; border-radius: 14px; border: 1px solid var(--border); margin-bottom: 10px; overflow: hidden; }
.faq-q {
    width: 100%; text-align: left;
    padding: 20px 22px;
    background: none; border: none; cursor: pointer;
    font-size: 0.95rem; font-weight: 600; color: var(--text);
    display: flex; justify-content: space-between; align-items: center;
    gap: 12px;
    transition: color .2s;
}
.faq-q:hover { color: #027A36; }
.faq-arrow { font-size: 0.8rem; color: var(--text-light); flex-shrink: 0; transition: transform .25s; }
.faq-item.open .faq-arrow { transform: rotate(180deg); color: var(--green); }
.faq-a { max-height: 0; overflow: hidden; transition: max-height .35s cubic-bezier(.16,1,.3,1); }
.faq-item.open .faq-a { max-height: 300px; }
.faq-a-inner {
    padding: 16px 22px 20px;
    font-size: 0.88rem;
    color: var(--text-sub);
    line-height: 1.75;
    border-top: 1px solid var(--border);
}
.faq-a-inner strong { color: var(--text); }
.faq-a-inner .grn { color: #027A36; font-weight: 700; }

.final {
    background: linear-gradient(148deg, #09102A 0%, #0E1633 50%, #0A1A35 100%);
    padding: 100px 24px 112px;
    text-align: center;
    color: #fff;
    position: relative;
    overflow: hidden;
}
.final::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 110%, rgba(3,199,90,0.10) 0%, transparent 55%);
    pointer-events: none;
}
.final .eyebrow { color: rgba(3,199,90,0.75); }
.final .sec-title { color: #fff; }
.final .sec-title .hl { color: var(--green); }
.final .sec-sub { color: rgba(255,255,255,0.5); max-width: 440px; margin: 0 auto 40px; }
.btn-lg {
    display: inline-flex; align-items: center; gap: 11px;
    background: var(--green); color: #fff;
    font-size: 1.05rem; font-weight: 700;
    padding: 18px 48px; border-radius: 100px; border: none; cursor: pointer;
    box-shadow: 0 10px 38px rgba(3,199,90,0.44);
    transition: all .2s;
}
.btn-lg:hover { background: var(--green-dark); transform: translateY(-2px); box-shadow: 0 14px 46px rgba(3,199,90,0.52); }
.trust-row { display: flex; justify-content: center; gap: 28px; flex-wrap: wrap; margin-top: 36px; }
.trust-item { display: flex; align-items: center; gap: 6px; color: rgba(255,255,255,0.42); font-size: 0.83rem; }
.trust-item .chk { color: var(--green); font-weight: 700; }

footer {
    background: #08091A;
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 40px 24px 90px;
    color: rgba(255,255,255,0.3);
    font-size: 0.78rem;
}
.foot-top { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 18px; }
.foot-logo { font-weight: 900; font-size: 0.95rem; color: rgba(255,255,255,0.5); letter-spacing: 0.05em; }
.foot-links { display: flex; gap: 20px; }
.foot-links a { color: rgba(255,255,255,0.3); transition: color .2s; }
.foot-links a:hover { color: rgba(255,255,255,0.6); }
.foot-note { line-height: 1.85; margin-bottom: 10px; }

.floating {
    position: fixed; bottom: 0; left: 0; right: 0;
    background: rgba(8,9,26,0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    padding: 12px 24px;
    z-index: 900;
    border-top: 1px solid rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: center; gap: 20px;
    transform: translateY(100%);
    transition: transform .4s cubic-bezier(.16,1,.3,1);
}
.floating.show { transform: translateY(0); }
.fl-msg { color: rgba(255,255,255,0.6); font-size: 0.86rem; white-space: nowrap; }
.fl-msg strong { color: #fff; }
.fl-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--green); color: #fff;
    font-size: 0.9rem; font-weight: 700;
    padding: 12px 28px; border-radius: 100px; border: none; cursor: pointer;
    white-space: nowrap;
    box-shadow: 0 4px 18px rgba(3,199,90,0.38);
    transition: all .2s;
}
.fl-btn:hover { background: var(--green-dark); }

.overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(5px);
    z-index: 1000;
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    opacity: 0; pointer-events: none;
    transition: opacity .28s;
}
.overlay.open { opacity: 1; pointer-events: auto; }
.modal {
    background: #fff;
    border-radius: 22px;
    width: 100%; max-width: 560px;
    max-height: 82vh;
    overflow-y: auto;
    padding: 36px 32px 32px;
    transform: scale(0.94) translateY(14px);
    transition: transform .3s cubic-bezier(.16,1,.3,1);
}
.overlay.open .modal { transform: scale(1) translateY(0); }
.modal-hd { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.modal-hd h2 { font-size: 1.25rem; font-weight: 800; margin-bottom: 4px; }
.modal-hd p { color: var(--text-sub); font-size: 0.85rem; }
.modal-x { width: 34px; height: 34px; background: var(--bg); border: none; border-radius: 50%; cursor: pointer; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--text-sub); transition: background .2s; }
.modal-x:hover { background: var(--border); }
.modal-note { margin-top: 14px; font-size: 0.75rem; color: var(--text-light); line-height: 1.7; padding: 10px 14px; background: var(--bg); border-radius: 9px; }

.cmp-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 0.86rem; }
.cmp-table th, .cmp-table td { padding: 11px 14px; border-bottom: 1px solid var(--border); text-align: center; }
.cmp-table th { background: var(--bg); font-size: 0.78rem; font-weight: 700; color: var(--text-sub); }
.cmp-table td:first-child { text-align: left; color: var(--text-sub); font-size: 0.82rem; background: var(--bg); font-weight: 600; }
.cmp-table tr:last-child td { border-bottom: none; }
.cmp-table .hl-col { background: rgba(3,199,90,0.04); }
.cmp-grn { color: #027A36; font-weight: 700; }
.cmp-tip { background: var(--bg); border-radius: 12px; padding: 16px 18px; font-size: 0.84rem; color: var(--text-sub); line-height: 1.75; }
.cmp-tip strong { color: var(--text); }

@media (max-width: 768px) {
    .hero { padding: 72px 20px 100px; }
    .hero::after { height: 44px; }
    .card-mockup { width: 268px; height: 164px; padding: 20px 22px; }
    .floating .fl-msg { display: none; }
    .modal { padding: 26px 20px 22px; }
    .stats .wrap { gap: 24px; }
    .logo-item { padding: 8px 16px; font-size: 0.82rem; }
    .sc-panel { padding: 22px 18px; }
}
`;

const faqs = [
  {
    q: '연회비가 있나요?',
    a: (
      <>
        <span className="grn">연회비는 없습니다.</span> 고위드 카드는 발급 수수료 및 연회비 없이 사용할 수 있습니다. 캐시백 혜택 조건(전월 실적)만 충족하면 모든 혜택을 무료로 누릴 수 있습니다.
      </>
    ),
  },
  {
    q: '카드 한도는 얼마나 되나요?',
    a: (
      <>
        한도는 신청 기업의 <strong>매출 데이터, 정산 주기, 사업 규모</strong>를 종합 분석해 책정됩니다. 은행 담보 없이도 실제 비즈니스 규모에 맞는 한도를 받을 수 있으며, 성장에 따라 한도 증액도 가능합니다. 정확한 한도는 심사 후 결정됩니다.
      </>
    ),
  },
  {
    q: '개인사업자도 신청 가능한가요?',
    a: (
      <>
        고위드 카드는 <strong>법인사업자</strong>를 대상으로 합니다. 개인사업자는 현재 지원하지 않습니다. 법인 전환을 검토 중이시라면 담당자와 상담해보세요.
      </>
    ),
  },
  {
    q: '네이버 광고 외에 다른 광고 플랫폼에도 쓸 수 있나요?',
    a: (
      <>
        <span className="grn">네, 모든 광고 플랫폼에서 사용 가능합니다.</span> 메타(Facebook·Instagram), 구글, 카카오, 틱톡 등 어떤 광고 플랫폼에서도 동일하게 사용할 수 있습니다. 캐시백은 플랫폼 무관하게 전체 카드 사용액 기준으로 적립됩니다.
      </>
    ),
  },
  {
    q: '심사는 얼마나 걸리나요? 서류가 많나요?',
    a: (
      <>
        통상 <strong>2~3영업일</strong> 내 심사가 완료됩니다. 필요 서류는 사업자등록증, 법인 기본 정보 정도로 간소합니다. 담당자가 연락해 추가로 필요한 정보를 안내해드립니다.
      </>
    ),
  },
  {
    q: '캐시백은 언제, 어떻게 지급되나요?',
    a: (
      <>
        캐시백은 전월 실적 조건 충족 시 <strong>매월 청구서 할인 방식</strong>으로 지급됩니다. 카드사(신한·롯데·BC)별로 조건이 상이하므로, 혜택 상세 보기 팝업에서 카드사별 조건을 확인해주세요.
      </>
    ),
  },
  {
    q: '고위드 FUEL(페이바이카드)은 무엇인가요?',
    a: (
      <>
        고위드 FUEL은 <strong>매입대금(원자재·공급사 결제)을 카드로 후불 처리</strong>하는 서비스입니다. 제조사·공급사에 직접 카드 결제가 어려울 때도 고위드가 중간에서 처리해드립니다. 최대 53일의 신용공여 기간을 확보할 수 있어, 현금흐름 개선에 효과적입니다.
      </>
    ),
  },
];

export default function NaverPayPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSc, setActiveSc] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showFloat, setShowFloat] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('vis'); }),
      { threshold: 0.1, rootMargin: '0px 0px -36px 0px' }
    );
    document.querySelectorAll('.fu').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowFloat(window.scrollY > 320);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <style>{css}</style>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="wrap">
          <div className="fu">
            <div className="partner-badge">
              <span className="badge-dot"></span>
              GOWID × NAVER 파트너십
            </div>
          </div>
          <h1 className="fu d1">
            커머스 성장 흐름에 맞는<br />
            <span className="hl">맞춤 카드 한도</span>
          </h1>
          <p className="hero-sub fu d2">
            광고비 결제가 한도에 막히지 않도록,<br />
            성장 기회를 자금 때문에 놓치지 마세요.
          </p>
          <div className="fu d3">
            <div className="card-mockup">
              <div className="cm-top">
                <div className="cm-brand">GOWID</div>
                <div className="cm-chip"></div>
              </div>
              <div className="cm-num">•••• •••• •••• 4291</div>
              <div className="cm-holder">Corporate Card</div>
              <div className="cm-badge">NAVER Pay 제휴</div>
            </div>
          </div>
          <div className="fu d4">
            <a href="https://www.gowid.com/card-apply-lead/?utm_source=naverpay&utm_medium=paid-display&utm_campaign=naver-pay-promotion-0423&utm_content=ads-card-promo-v1" className="btn-hero">
              고위드 카드 발급하러가기 <span className="arr">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="wrap">
          <div className="stat-item fu">
            <div className="stat-n">최대 <em>87일</em></div>
            <div className="stat-d">신용 공여일</div>
          </div>
          <div className="stat-item fu d1">
            <div className="stat-n">최대 <em>2.3%</em></div>
            <div className="stat-d">캐시백</div>
          </div>
          <div className="stat-item fu d2">
            <div className="stat-n"><em>매월</em> 복원</div>
            <div className="stat-d">월 한도 자동 복원</div>
          </div>
          <div className="stat-item fu d3">
            <div className="stat-n"><em>3사</em> 제휴</div>
            <div className="stat-d">신한 · 롯데 · BC</div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="proof">
        <div className="wrap proof-inner">
          <p className="proof-head fu"><strong>이미 1,000개 이상</strong>의 커머스 기업이 고위드 카드로 광고비를 집행하고 있습니다</p>
          <div className="logos fu d1">
            <div className="logo-item">더파운더즈</div>
            <div className="logo-item">와이즐리</div>
            <div className="logo-item">데이지크</div>
            <div className="logo-item">아이리스브라이트</div>
            <div className="logo-item">포터리</div>
            <div className="logo-item">외 다수</div>
          </div>
          <div className="proof-review">
            <div className="review-card fu d1">
              <div className="review-star">★★★★★</div>
              <p className="review-txt">&quot;네이버 광고비가 매달 한도에 막혔는데, 고위드 카드로 바꾸고 나서 아무 걱정 없이 예산 집행이 가능해졌습니다. 특히 월 한도 복원이 제일 편해요.&quot;</p>
              <div className="review-author">미디어커머스 기업 CFO · 월 광고비 5,000만원</div>
            </div>
            <div className="review-card fu d2">
              <div className="review-star">★★★★★</div>
              <p className="review-txt">&quot;발급 과정이 생각보다 빠르고 쉬웠어요. 카드 받고 바로 네이버 광고주센터에 등록했는데 5분도 안 걸렸습니다. 캐시백도 매달 꼬박꼬박 들어오고요.&quot;</p>
              <div className="review-author">뷰티 D2C 브랜드 대표 · 월 광고비 2,000만원</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="problem">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <span className="eyebrow fu">PROBLEM</span>
          <h2 className="sec-title fu">
            재무는 건강한데<span className="muted">,</span><br />
            왜 매달 <strong>&#39;현금&#39;</strong>이 부족해질까요?
          </h2>
          <p className="sec-sub fu">매출은 성장 중인데 현금이 부족한 이유는 딱 하나 — <strong>지출과 수입 사이의 타이밍 갭</strong>입니다.</p>
          <div className="prob-grid">
            <div className="prob-card fu">
              <span className="prob-icon">📢</span>
              <h3>광고비 선집행</h3>
              <p>광고비는 오늘 나가지만, 정산은 <span className="gap-tag">1~2달 후</span>. 매출이 오를수록 현금 갭이 커집니다.</p>
            </div>
            <div className="prob-card fu d1">
              <span className="prob-icon">📦</span>
              <h3>매입비 선결제</h3>
              <p>원자재·재고는 선결제, 플랫폼 정산은 후불. 신제품 출시 때마다 <span className="gap-tag">현금이 묶입니다</span>.</p>
            </div>
            <div className="prob-card fu d2">
              <span className="prob-icon">📅</span>
              <h3>시즌 집중 발주</h3>
              <p>명절·블프 전 대량 발주가 필요하지만, 판매 대금은 <span className="gap-tag">시즌 후반</span>에 들어옵니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BRIDGE */}
      <section className="bridge">
        <div className="wrap" style={{ maxWidth: '680px', textAlign: 'center' }}>
          <span className="eyebrow fu">SOLUTION</span>
          <h2 className="sec-title fu">
            문제는 <span className="hl">&#39;돈&#39;이 아니라</span><br />&#39;타이밍&#39;입니다
          </h2>
          <p className="sec-sub fu">카드 한도는 이 갭을 메우는 브릿지입니다.</p>
          <div className="timing-gap fu">
            <div className="tg-row">
              <div className="tg-label out">💸 지출</div>
              <div className="tg-bar-wrap">
                <div className="tg-fill red">
                  광고비·매입비 선집행
                  <div className="tg-gap">1~2달 공백</div>
                </div>
              </div>
            </div>
            <div className="tg-row" style={{ marginTop: '8px' }}>
              <div className="tg-label in">💰 수입</div>
              <div className="tg-bar-wrap">
                <div className="tg-fill green" style={{ width: '66%' }}>플랫폼 정산 수령</div>
              </div>
            </div>
          </div>
          <div className="bridge-sol fu d1">
            💳 <strong>고위드 카드로 후불화</strong> → 정산 수령 후 상환.<br />
            현금흐름 기반 한도로, 성장할수록 한도도 함께 올라갑니다.
          </div>
        </div>
      </section>

      {/* WHY GOWID */}
      <section className="why">
        <div className="wrap">
          <div className="sec-center">
            <span className="eyebrow fu">WHY GOWID</span>
            <h2 className="sec-title fu">커머스 기업이 고위드 카드를<br />써야 하는 이유</h2>
            <p className="sec-sub fu">매입부터 광고비까지, 커머스의 모든 지출을 하나의 플랫폼에서</p>
          </div>
          <div className="ben-grid">
            <div className="ben-card fu">
              <div className="ben-num">①</div>
              <div className="ben-icon">📈</div>
              <h3>현금흐름 기반 높은 한도</h3>
              <p>매출·정산 데이터를 분석해 실제 비즈니스 규모에 맞는 한도를 책정합니다. 은행 담보 없이도 성장 단계에 맞는 한도를 받을 수 있습니다.</p>
            </div>
            <div className="ben-card fu d1">
              <div className="ben-num">②</div>
              <div className="ben-icon">🔄</div>
              <h3>월 한도 복원으로 끊김없는 운영</h3>
              <p>사용한 한도가 매월 초 자동 복원됩니다. 광고비·매입비를 끊임없이 집행하면서도 현금흐름을 안정적으로 유지할 수 있습니다.</p>
            </div>
            <div className="ben-card fu d2">
              <div className="ben-num">③</div>
              <div className="ben-icon">💰</div>
              <h3>카드 사용액 0.5% ~ 최대 2.3% 캐시백</h3>
              <p>광고비·매입비 결제 시 사용액에 따라 캐시백이 적립됩니다. 쓸수록 돌아오는 혜택으로 실질 비용을 줄이세요.</p>
              <div className="ben-val">0.5% ~ 최대 2.3%</div>
            </div>
            <div className="ben-card fu d3">
              <div className="ben-num">④</div>
              <div className="ben-icon">📅</div>
              <h3>최대 87일 정산 신용 공여일</h3>
              <p>결제일과 정산일 사이의 간격을 최대 87일까지 확보할 수 있습니다. 플랫폼 정산 주기에 맞춰 여유로운 자금 운용이 가능합니다.</p>
              <div className="ben-val">최대 87일</div>
            </div>
          </div>
          <div style={{ textAlign: 'center' }} className="fu">
            <button className="btn-outline" onClick={() => setModalOpen(true)}>
              카드 혜택 자세히 보기 (신한 · 롯데 · BC) →
            </button>
          </div>
        </div>
      </section>

      {/* BENEFIT SCENARIO */}
      <section className="scenario">
        <div className="wrap">
          <div className="sec-center">
            <span className="eyebrow fu">내 광고비로 계산하면</span>
            <h2 className="sec-title fu">고위드 카드, 실제로 얼마나 달라질까요?</h2>
            <p className="sec-sub fu">광고비 규모별 실제 혜택을 시뮬레이션해보세요</p>
          </div>
          <div className="scenario-box fu">
            <div className="sc-tabs">
              <button className={`sc-tab${activeSc === 0 ? ' on' : ''}`} onClick={() => setActiveSc(0)}>월 광고비 500만원</button>
              <button className={`sc-tab${activeSc === 1 ? ' on' : ''}`} onClick={() => setActiveSc(1)}>월 광고비 2,000만원</button>
              <button className={`sc-tab${activeSc === 2 ? ' on' : ''}`} onClick={() => setActiveSc(2)}>월 광고비 5,000만원</button>
            </div>

            <div className={`sc-panel${activeSc === 0 ? ' on' : ''}`}>
              <div className="sc-intro">
                <div className="sc-intro-ico">🛒</div>
                <div>
                  <h4>초기 성장 커머스 · 월 광고비 500만원</h4>
                  <p>스마트스토어/쿠팡 광고 집행 중, 한도 부족이 간헐적으로 발생하는 상황</p>
                </div>
              </div>
              <div className="sc-compare">
                <div className="sc-before">
                  <h5>기존 카드 사용</h5>
                  <div className="sc-row"><span className="sl">월 광고비 결제</span><span className="sv">500만원</span></div>
                  <div className="sc-row"><span className="sl">캐시백 혜택</span><span className="sv red">없음 / 미미</span></div>
                  <div className="sc-row"><span className="sl">한도 부족 위험</span><span className="sv red">높음 ↑</span></div>
                  <div className="sc-row"><span className="sl">현금 묶임 기간</span><span className="sv red">즉시</span></div>
                </div>
                <div className="sc-after">
                  <h5>고위드 카드 사용</h5>
                  <div className="sc-row"><span className="sl">월 광고비 결제</span><span className="sv">500만원</span></div>
                  <div className="sc-row"><span className="sl">월 캐시백 적립</span><span className="sv grn">최대 11.5만원</span></div>
                  <div className="sc-row"><span className="sl">한도 부족 위험</span><span className="sv grn">없음 ✓</span></div>
                  <div className="sc-row"><span className="sl">현금 여유 기간</span><span className="sv grn">최대 87일</span></div>
                </div>
              </div>
              <div className="sc-sum">
                <p>연간 예상 캐시백 절감액</p>
                <strong>최대 138만원/년</strong>
              </div>
            </div>

            <div className={`sc-panel${activeSc === 1 ? ' on' : ''}`}>
              <div className="sc-intro">
                <div className="sc-intro-ico">📊</div>
                <div>
                  <h4>성장기 커머스 · 월 광고비 2,000만원</h4>
                  <p>메타/구글/네이버 멀티채널 운영, 시즌마다 광고비 증액이 필요한 상황</p>
                </div>
              </div>
              <div className="sc-compare">
                <div className="sc-before">
                  <h5>기존 카드 사용</h5>
                  <div className="sc-row"><span className="sl">월 광고비 결제</span><span className="sv">2,000만원</span></div>
                  <div className="sc-row"><span className="sl">캐시백 혜택</span><span className="sv red">없음 / 미미</span></div>
                  <div className="sc-row"><span className="sl">한도 부족 위험</span><span className="sv red">매달 발생</span></div>
                  <div className="sc-row"><span className="sl">현금 묶임 기간</span><span className="sv red">즉시</span></div>
                </div>
                <div className="sc-after">
                  <h5>고위드 카드 사용</h5>
                  <div className="sc-row"><span className="sl">월 광고비 결제</span><span className="sv">2,000만원</span></div>
                  <div className="sc-row"><span className="sl">월 캐시백 적립</span><span className="sv grn">최대 46만원</span></div>
                  <div className="sc-row"><span className="sl">한도 부족 위험</span><span className="sv grn">없음 ✓</span></div>
                  <div className="sc-row"><span className="sl">현금 여유 기간</span><span className="sv grn">최대 87일</span></div>
                </div>
              </div>
              <div className="sc-sum">
                <p>연간 예상 캐시백 절감액</p>
                <strong>최대 552만원/년</strong>
              </div>
            </div>

            <div className={`sc-panel${activeSc === 2 ? ' on' : ''}`}>
              <div className="sc-intro">
                <div className="sc-intro-ico">🚀</div>
                <div>
                  <h4>스케일업 커머스 · 월 광고비 5,000만원</h4>
                  <p>대규모 퍼포먼스 마케팅 운영, 한도 부족이 성장 병목이 되는 상황</p>
                </div>
              </div>
              <div className="sc-compare">
                <div className="sc-before">
                  <h5>기존 카드 사용</h5>
                  <div className="sc-row"><span className="sl">월 광고비 결제</span><span className="sv">5,000만원</span></div>
                  <div className="sc-row"><span className="sl">캐시백 혜택</span><span className="sv red">없음 / 미미</span></div>
                  <div className="sc-row"><span className="sl">한도 부족 위험</span><span className="sv red">심각</span></div>
                  <div className="sc-row"><span className="sl">현금 묶임 기간</span><span className="sv red">즉시</span></div>
                </div>
                <div className="sc-after">
                  <h5>고위드 카드 사용</h5>
                  <div className="sc-row"><span className="sl">월 광고비 결제</span><span className="sv">5,000만원</span></div>
                  <div className="sc-row"><span className="sl">월 캐시백 적립</span><span className="sv grn">최대 115만원</span></div>
                  <div className="sc-row"><span className="sl">한도 부족 위험</span><span className="sv grn">없음 ✓</span></div>
                  <div className="sc-row"><span className="sl">현금 여유 기간</span><span className="sv grn">최대 87일</span></div>
                </div>
              </div>
              <div className="sc-sum">
                <p>연간 예상 캐시백 절감액</p>
                <strong>최대 1,380만원/년</strong>
              </div>
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '12px' }} className="fu">
            ※ 캐시백은 전월 실적 및 카드사 조건에 따라 다를 수 있습니다
          </p>
        </div>
      </section>

      {/* ONBOARDING TIMELINE */}
      <section className="timeline">
        <div className="wrap">
          <div className="sec-center">
            <span className="eyebrow fu">ONBOARDING</span>
            <h2 className="sec-title fu">신청부터 발급까지<br />단 5영업일</h2>
            <p className="sec-sub fu">복잡한 서류 없이, 빠르게 시작하세요</p>
          </div>
          <div className="tl-wrap">
            {[
              { icon: '📝', day: 'Step 1', title: '회원 가입', desc: '홈페이지에서 회원 가입을 진행합니다. 법인 기본 정보만 입력하면 됩니다.', tag: '5분 이내', green: false },
              { icon: '🏦', day: 'Step 2', title: '계좌 등록', desc: '법인 계좌를 연결합니다. 최근 60일 현금흐름을 자동으로 분석해 한도 산출에 활용합니다.', tag: '자동', green: false },
              { icon: '🔍', day: 'Step 3', title: '한도 심사', desc: '최근 60일 현금흐름 기반으로 자동 심사가 진행됩니다. 은행 담보 없이 빠르게 완료됩니다.', tag: '10분 이내', green: false },
              { icon: '💳', day: 'Step 4', title: '카드 발급', desc: '신한 · 롯데 · BC 중 원하는 카드사를 선택해 간편하게 신청합니다.', tag: '심사 완료 후 즉시', green: true },
              { icon: '📦', day: 'Step 5', title: '카드 수령', desc: '실물 카드가 배송됩니다. 고위드 앱에서 카드 번호를 먼저 확인할 수 있어, 도착 전에도 광고비 등록이 가능합니다.', tag: '발급 후 3~5영업일', green: true },
              { icon: '🚀', day: 'Step 6', title: '네이버 광고에 바로 등록', desc: '네이버 광고주센터에 카드 번호를 등록하면 다음 광고비 결제부터 즉시 적용됩니다.', tag: '다음 광고비부터 바로 적용', green: true },
            ].map((step, i) => (
              <div key={i} className={`tl-step fu${i > 0 ? ` d${Math.min(i, 4)}` : ''}`}>
                <div className="tl-dot">{step.icon}</div>
                <div className="tl-body">
                  <div className="tl-day">{step.day}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  <span className={`tl-tag${step.green ? ' green' : ''}`}>{step.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPENSE MANAGEMENT */}
      <section className="expense">
        <div className="wrap">
          <div className="sec-center">
            <span className="eyebrow fu">EXPENSE MANAGEMENT</span>
            <h2 className="sec-title fu">카드 한 장으로<br />지출관리까지 해결</h2>
            <p className="sec-sub fu">실시간 모니터링부터 ERP 연동까지 자동화합니다</p>
          </div>
          <div className="exp-grid">
            {[
              { icon: '🧾', title: '영수증 즉시 제출 / 승인', desc: '결제 즉시 영수증 제출 알림. 모바일에서 바로 처리해 월말 마감 부담을 없앱니다.' },
              { icon: '📊', title: '부서 · 카드 · 월별 자동 정리', desc: '모든 카드 지출이 부서별·프로젝트별로 자동 분류됩니다. 엑셀 작업 없이 한눈에 확인하세요.' },
              { icon: '🔍', title: '미제출자 / 위반 자동 탐지', desc: '정책 위반, 미제출 건을 자동으로 탐지해 알림을 보냅니다. 컴플라이언스를 자동화하세요.' },
              { icon: '🔗', title: '더존 ERP 연동 양식', desc: '더존 ERP·회계 시스템과 바로 연동되는 양식으로 내보냅니다. 여러 카드사를 하나로 통합 관리하세요.' },
            ].map((item, i) => (
              <div key={i} className={`exp-card fu${i > 0 ? ` d${i}` : ''}`}>
                <div className="exp-ico">{item.icon}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="wrap">
          <div className="sec-center">
            <span className="eyebrow fu">FAQ</span>
            <h2 className="sec-title fu">자주 묻는 질문</h2>
            <p className="sec-sub fu">신청 전 궁금한 점을 먼저 확인하세요</p>
          </div>
          <div className="faq-list fu">
            {faqs.map((item, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {item.q} <span className="faq-arrow">▼</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final" id="apply">
        <div className="wrap">
          <span className="eyebrow fu">지금 시작하세요</span>
          <h2 className="sec-title fu">
            광고비, 더 이상<br />
            <span className="hl">한도에 가로막히지 마세요</span>
          </h2>
          <p className="sec-sub fu">
            신청 5분 → 1영업일 내 연락 → 5영업일 내 사용 가능.<br />
            지금 신청하면 다음 광고비 결제부터 바로 적용됩니다.
          </p>
          <div>
            <a href="https://www.gowid.com/card-apply-lead/?utm_source=naverpay&utm_medium=paid-display&utm_campaign=naver-pay-promotion-0423&utm_content=ads-card-promo-v1" className="btn-lg">
              고위드카드 발급하러가기 <span>→</span>
            </a>
          </div>
          <div className="trust-row">
            <div className="trust-item"><span className="chk">✓</span> 연회비 없음</div>
            <div className="trust-item"><span className="chk">✓</span> 기존 카드 해지 불필요</div>
            <div className="trust-item"><span className="chk">✓</span> 최대 2.3% 캐시백</div>
            <div className="trust-item"><span className="chk">✓</span> 최대 87일 신용 공여</div>
            <div className="trust-item"><span className="chk">✓</span> ERP 자동 연동</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="foot-top">
            <div className="foot-logo">GOWID</div>
            <div className="foot-links">
              <a href="#">개인정보처리방침</a>
              <a href="#">이용약관</a>
              <a href="#">고객센터</a>
            </div>
          </div>
          <p className="foot-note">
            본 페이지는 고위드(주)와 네이버파이낸셜(주)의 파트너십 프로모션 안내 페이지입니다.<br />
            카드 혜택 및 한도는 심사 결과에 따라 다를 수 있으며, 자세한 사항은 각 카드사 약관을 확인하세요.<br />
            캐시백은 전월 실적 조건 충족 시 적용되며, 카드사별 조건이 상이할 수 있습니다.
          </p>
          <div>
            고위드(주) | 서울특별시 강남구 | 사업자등록번호: 000-00-00000 | 고객센터: 1551-9020<br />
            © 2026 GoWid Inc. All rights reserved.
          </div>
        </div>
      </footer>

      {/* FLOATING CTA */}
      <div className={`floating${showFloat ? ' show' : ''}`}>
        <span className="fl-msg"><strong>성장 기회를 자금으로 놓치지 마세요</strong> — 5분 신청, 5일이면 사용 가능</span>
        <a href="https://www.gowid.com/card-apply-lead/?utm_source=naverpay&utm_medium=paid-display&utm_campaign=naver-pay-promotion-0423&utm_content=ads-card-promo-v1" className="fl-btn">고위드카드 발급하러가기 →</a>
      </div>

      {/* MODAL */}
      <div
        className={`overlay${modalOpen ? ' open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
      >
        <div className="modal">
          <div className="modal-hd">
            <div>
              <h2>카드사별 혜택 안내</h2>
              <p>고위드 × 네이버페이 제휴 카드 혜택을 확인하세요</p>
            </div>
            <button className="modal-x" onClick={() => setModalOpen(false)}>✕</button>
          </div>
          <table className="cmp-table">
            <thead>
              <tr>
                <th>구분</th>
                <th>신한카드</th>
                <th>롯데카드</th>
                <th className="hl-col">BC카드</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>연회비</td>
                <td>면제</td>
                <td>면제</td>
                <td className="hl-col">5,000원<br /><span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>최초 1회</span></td>
              </tr>
              <tr>
                <td>결제대금일</td>
                <td>매월 15일</td>
                <td>매월 15일</td>
                <td className="hl-col"><span className="cmp-grn">매월 23일</span></td>
              </tr>
              <tr>
                <td>한도 복원</td>
                <td>D+1일</td>
                <td><span className="cmp-grn">즉시</span></td>
                <td className="hl-col">매월 1일</td>
              </tr>
              <tr>
                <td>페이백 혜택</td>
                <td>0.45%</td>
                <td>0.45%</td>
                <td className="hl-col"><span className="cmp-grn">0.50%</span></td>
              </tr>
              <tr>
                <td>해외 수수료</td>
                <td><span className="cmp-grn">1.18%</span></td>
                <td>1.2%</td>
                <td className="hl-col">1.4%</td>
              </tr>
              <tr>
                <td>라운지 혜택</td>
                <td>—</td>
                <td><span className="cmp-grn">공항 라운지<br />발레파킹</span></td>
                <td className="hl-col">—</td>
              </tr>
            </tbody>
          </table>
          <div className="cmp-tip">
            <strong>어떤 카드가 나에게 맞을까요?</strong><br />
            · 광고비가 크다면 → <strong>BC카드</strong> (23일 결제, 신용 공여일 최대)<br />
            · 출장이 잦다면 → <strong>롯데카드</strong> (공항 라운지, 발레파킹)<br />
            · 일반 결제 위주라면 → <strong>신한카드</strong> (SOL페이)<br /><br />
            여러 카드사를 동시에 쓰셔도 됩니다. 총한도 내에서 카드별 한도 조정이 자유롭습니다.
          </div>
          <div className="modal-note">※ 위 혜택은 고위드 법인카드 기준이며, 카드사 정책 변경에 따라 달라질 수 있습니다.</div>
          <a
            href="https://www.gowid.com/card-apply-lead/?utm_source=naverpay&utm_medium=paid-display&utm_campaign=naver-pay-promotion-0423&utm_content=ads-card-promo-v1"
            style={{
              display: 'block',
              textAlign: 'center',
              marginTop: '18px',
              background: 'var(--green)',
              color: '#fff',
              fontSize: '0.95rem',
              fontWeight: '700',
              padding: '14px',
              borderRadius: '100px',
              boxShadow: '0 4px 18px rgba(3,199,90,0.35)',
              transition: 'background .2s',
            }}
            onMouseOver={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#02A84C'; }}
            onMouseOut={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--green)'; }}
          >
            고위드 카드 한도 조회하기 →
          </a>
        </div>
      </div>
    </>
  );
}
