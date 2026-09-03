import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { supabaseAdmin } from '@/app/lib/supabase';

// Puppeteer + 헤드리스 Chromium 렌더링은 시간이 걸리므로 넉넉히 잡는다.
export const runtime = 'nodejs';
export const maxDuration = 60;

const DEFAULT_TEMPLATE = 'tech_software_unit_economics';
const ASSETS_DIR = path.join(process.cwd(), 'public/proposal-assets');
const TEMPLATES_DIR = path.join(ASSETS_DIR, 'templates');

// gowid-proposal 스킬의 generate.py TEMPLATE_DEFAULTS 와 동일한 값을 여기서도 유지한다.
// 새 업종을 추가할 때: (1) public/proposal-assets/templates/{key}.html 을 추가하고
// (2) 여기에 항목을 하나 추가하면 끝 — Zapier의 `template` 필드에 그 key를 넣으면 바로 쓸 수 있다.
// `template`을 안 보내면(기존에 이미 붙어 있는 Zap들) DEFAULT_TEMPLATE으로 떨어진다 — 하위 호환.
const TEMPLATE_DEFAULTS: Record<
  string,
  { SELECTED: string; AE_NAME: string; AE_ROLE: string; AE_TITLE: string; MEETING_URL: string }
> = {
  tech_software_unit_economics: {
    SELECTED: '매출은 나는데 광고비 · 인프라 비용이 먼저 나가는 구조',
    AE_NAME: '문미성',
    AE_ROLE: '고위드 인플로우 · 테크 · 소프트웨어 담당',
    AE_TITLE: '리드',
    MEETING_URL: 'https://calendar.app.google/yye21goC1ppWwyuP7',
  },
  fashion: {
    SELECTED: '원단·임가공비 선지출과 납품 후 익월 정산까지 발생하는 시차 부담',
    AE_NAME: '백소연',
    AE_ROLE: '고위드 커머스 · 패션 브랜드 담당',
    AE_TITLE: '매니저',
    MEETING_URL: 'https://calendar.app.google/NrsvnAUivUxWjsFj7',
  },
  cosmetic: {
    SELECTED: 'MOQ 발주 대금과 인플루언서 · MCN 마케팅비의 동시 집행 부담',
    AE_NAME: '백소연',
    AE_ROLE: '고위드 커머스 · 뷰티 브랜드 담당',
    AE_TITLE: '매니저',
    MEETING_URL: 'https://calendar.app.google/NrsvnAUivUxWjsFj7',
  },
  agency: {
    SELECTED: '매체비는 먼저 나가고, 광고주 대금은 두 달 뒤 들어오는 구조',
    AE_NAME: '김원석',
    AE_ROLE: '고위드 인플로우 · 광고 · 마케팅 대행사 담당',
    AE_TITLE: '매니저',
    MEETING_URL: 'https://calendar.app.google/GsejCbqK3og6tGxU7',
  },
  production: {
    SELECTED: '제작비 · 인플루언서 정산은 현금으로 먼저 나가고, 광고주 대금은 뒤에 들어오는 구조',
    AE_NAME: '김원석',
    AE_ROLE: '고위드 인플로우 · 광고 · 마케팅 대행사 담당',
    AE_TITLE: '매니저',
    MEETING_URL: 'https://calendar.app.google/rQyK7yR1fCcUr8Gf8',
  },
};

/** 받침 유무로 조사를 고른다 (gowid-proposal 스킬 generate.py의 josa()와 동일 로직). */
function josa(word: string, noJong: string, hasJong: string): string {
  const w = (word || '').trim();
  if (!w) return noJong;
  const code = w.charCodeAt(w.length - 1) - 0xac00;
  const jong = code >= 0 && code <= 11171 ? code % 28 : 0;
  return jong === 0 ? noJong : hasJong;
}

const MIME: Record<string, string> = {
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

function dataUri(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME[ext] || 'application/octet-stream';
  const buf = fs.readFileSync(filePath);
  return `data:${mime};base64,${buf.toString('base64')}`;
}

/** inline_html.py 와 동일한 목적 — 템플릿 HTML에 CSS·폰트·이미지를 전부 data URI로 박아
 * 파일 하나로 렌더 가능한 self-contained HTML을 만든다. */
function buildInlinedHtml(template: string, fields: Record<string, string>): string {
  let html = fs.readFileSync(path.join(TEMPLATES_DIR, `${template}.html`), 'utf-8');
  for (const [k, v] of Object.entries(fields)) {
    html = html.split(`{{${k}}}`).join(v);
  }

  const left = [...html.matchAll(/\{\{([A-Z_]+)\}\}/g)].map((m) => m[1]);
  if (left.length) {
    console.warn('proposal-render: 채워지지 않은 자리표시자', [...new Set(left)]);
  }

  let css = fs.readFileSync(path.join(ASSETS_DIR, 'deck.css'), 'utf-8');
  css = css.replace(/url\(([^)]+)\)/g, (whole, rawPath: string) => {
    const clean = rawPath.trim().replace(/^['"]|['"]$/g, '');
    if (/^(data:|https?:)/.test(clean)) return whole;
    const abs = path.join(ASSETS_DIR, clean);
    if (!fs.existsSync(abs)) return whole;
    return `url('${dataUri(abs)}')`;
  });

  html = html.replace(
    /<link rel="stylesheet" href="assets\/deck\.css">/,
    `<style>${css}</style>`
  );

  html = html.replace(/src="(assets\/[^"]+)"/g, (whole, rel: string) => {
    const abs = path.join(ASSETS_DIR, rel.replace(/^assets\//, ''));
    if (!fs.existsSync(abs)) return whole;
    return `src="${dataUri(abs)}"`;
  });

  return html;
}

// deck_to_pdf.py의 PRINT_CSS와 동일 — 1280x720 슬라이드 1장 = PDF 1페이지.
const PRINT_CSS = `
<style id="__deck2pdf__">
@media print {
  @page { size: 1280px 720px; margin: 0; }
  html, body { height:auto !important; min-height:0 !important; overflow:visible !important; }
  .deck, #deck { height:auto !important; overflow:visible !important; display:block !important; scroll-snap-type:none !important; }
  .slide {
    width:1280px !important; height:720px !important;
    min-height:720px !important; max-height:720px !important;
    overflow:hidden !important; scroll-snap-align:none !important;
    break-after:page; page-break-after:always;
    break-inside:avoid; page-break-inside:avoid;
  }
  .slide:last-child { break-after:auto; page-break-after:auto; }
  .progress, .counter, .hint { display:none !important; }
  * { -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; }
}
</style>`;

// @sparticuz/chromium(풀 패키지)은 bin/*.br 바이너리를 패키지 파일로 들고 있는데,
// Turbopack이 함수 배포 트레이싱에서 그 바이너리를 계속 빠뜨렸다
// ("input directory .../bin does not exist"). -min 패키지는 바이너리를 아예 갖고
// 있지 않고 첫 콜드스타트 때 이 pack URL에서 내려받아 /tmp에 풀어 쓴다 —
// 번들러 트레이싱 문제 자체가 없어진다. URL은 설치된 버전과 반드시 맞춰야 한다.
const CHROMIUM_PACK_URL =
  'https://github.com/Sparticuz/chromium/releases/download/v149.0.0/chromium-v149.0.0-pack.x64.tar';

async function launchBrowser() {
  const puppeteer = await import('puppeteer-core');
  if (process.env.VERCEL) {
    const chromium = (await import('@sparticuz/chromium-min')).default;
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(CHROMIUM_PACK_URL),
      headless: true,
    });
  }
  // 로컬(vercel dev / next dev)에서는 이 컴퓨터에 깔린 Chrome을 그대로 쓴다.
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].filter((p): p is string => Boolean(p));
  const executablePath = candidates.find((p) => fs.existsSync(p));
  if (!executablePath) {
    throw new Error(
      '로컬 Chrome 실행 파일을 찾지 못했습니다. CHROME_PATH 환경변수로 경로를 지정해주세요.'
    );
  }
  return puppeteer.launch({ executablePath, headless: true });
}

async function renderPdf(html: string): Promise<Buffer> {
  const withPrintCss = html.includes('</head>')
    ? html.replace('</head>', PRINT_CSS + '</head>')
    : PRINT_CSS + html;

  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();
    // 폰트·이미지·CSS를 전부 data URI로 인라인했으므로 네트워크 요청이 없다 — 'load'면 충분하다.
    await page.setContent(withPrintCss, { waitUntil: 'load' });
    const pdf = await page.pdf({
      width: '1280px',
      height: '720px',
      printBackground: true,
      margin: { top: '0px', bottom: '0px', left: '0px', right: '0px' },
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, company, contactName, template: templateRaw } = body as {
      email?: string;
      company?: string;
      contactName?: string;
      template?: string;
    };

    if (!email || !company) {
      return NextResponse.json(
        { error: 'email과 company는 필수입니다.' },
        { status: 400 }
      );
    }

    // template을 안 보내면(기존 Zap들) 기존 테크 템플릿으로 떨어진다 — 하위 호환.
    const template = templateRaw || DEFAULT_TEMPLATE;
    const templateDefaults = TEMPLATE_DEFAULTS[template];
    if (!templateDefaults) {
      return NextResponse.json(
        {
          error: `알 수 없는 template 입니다: "${template}"`,
          available: Object.keys(TEMPLATE_DEFAULTS),
        },
        { status: 400 }
      );
    }
    if (!fs.existsSync(path.join(TEMPLATES_DIR, `${template}.html`))) {
      return NextResponse.json(
        { error: `template "${template}"의 HTML 파일을 찾지 못했습니다.` },
        { status: 500 }
      );
    }

    // 멱등성 — 같은 이메일 + 같은 템플릿으로 이미 만든 제안서가 있으면 재생성하지 않고
    // 기존 링크를 반환한다. (메타 리드애즈 트리거의 중복 전달, Zapier 재시도에 대한 방어)
    const { data: existing } = await supabaseAdmin
      .from('proposal_renders')
      .select('pdf_url')
      .eq('email', email)
      .eq('template', template)
      .maybeSingle();

    if (existing?.pdf_url) {
      return NextResponse.json({ ok: true, pdfUrl: existing.pdf_url, cached: true });
    }

    const ae = templateDefaults.AE_NAME;
    const fields: Record<string, string> = {
      COMPANY: company,
      COMPANY_WA: company + josa(company, '와', '과'),
      COMPANY_GA: company + josa(company, '가', '이'),
      COMPANY_EUN: company + josa(company, '는', '은'),
      COMPANY_EUL: company + josa(company, '를', '을'),
      SELECTED: templateDefaults.SELECTED,
      AE_NAME: ae,
      AE_INITIAL: ae.charAt(0) || '고',
      AE_ROLE: templateDefaults.AE_ROLE,
      AE_TITLE: templateDefaults.AE_TITLE,
      MEETING_URL: templateDefaults.MEETING_URL,
    };

    let html: string;
    try {
      html = buildInlinedHtml(template, fields);
    } catch (e) {
      throw new Error(`[stage:build-html] ${e instanceof Error ? e.message : String(e)}`, { cause: e });
    }

    let pdfBuffer: Buffer;
    try {
      pdfBuffer = await renderPdf(html);
    } catch (e) {
      throw new Error(`[stage:render-pdf] ${e instanceof Error ? e.message : String(e)}`, { cause: e });
    }

    // Supabase Storage 키는 한글 등 비-ASCII 문자가 든 경로를 거부한다(Invalid key) —
    // 기업명은 storage 경로가 아니라 tracking 테이블 컬럼에만 사람이 읽는 값으로 남긴다.
    const storagePath = `${template}/${randomUUID()}.pdf`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from('proposals')
      .upload(storagePath, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: false,
      });

    if (uploadError) {
      console.error('proposal-render: Storage upload error:', uploadError);
      return NextResponse.json(
        { error: 'PDF 업로드 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from('proposals')
      .getPublicUrl(storagePath);
    const pdfUrl = publicUrlData.publicUrl;

    const { error: insertError } = await supabaseAdmin.from('proposal_renders').insert([
      {
        email,
        company,
        contact_name: contactName || null,
        template,
        pdf_url: pdfUrl,
      },
    ]);
    if (insertError) {
      // 기록 실패해도 PDF 자체는 이미 만들어졌으니 응답은 계속 내려준다 — 링크가 핵심이다.
      console.error('proposal-render: tracking insert error:', insertError);
    }

    return NextResponse.json({ ok: true, pdfUrl });
  } catch (error) {
    console.error('Error in proposal-render API:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
