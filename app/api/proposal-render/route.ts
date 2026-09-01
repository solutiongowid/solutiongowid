import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { supabaseAdmin } from '@/app/lib/supabase';

// Puppeteer + 헤드리스 Chromium 렌더링은 시간이 걸리므로 넉넉히 잡는다.
export const runtime = 'nodejs';
export const maxDuration = 60;

const TEMPLATE_NAME = 'tech_software_unit_economics';
const ASSETS_DIR = path.join(process.cwd(), 'public/proposal-assets');

// gowid-proposal 스킬의 generate.py TEMPLATE_DEFAULTS.tech_software_unit_economics 값과 동일.
const DEFAULTS = {
  SELECTED: '매출은 나는데 광고비 · 인프라 비용이 먼저 나가는 구조',
  AE_NAME: '문미성',
  AE_ROLE: '고위드 인플로우 · 테크 · 소프트웨어 담당',
  AE_TITLE: '리드',
  MEETING_URL: 'https://calendar.app.google/yye21goC1ppWwyuP7',
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
function buildInlinedHtml(fields: Record<string, string>): string {
  let html = fs.readFileSync(path.join(ASSETS_DIR, 'template.html'), 'utf-8');
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

async function launchBrowser() {
  const puppeteer = await import('puppeteer-core');
  if (process.env.VERCEL) {
    const chromium = (await import('@sparticuz/chromium')).default;
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
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
    const { email, company, contactName } = body as {
      email?: string;
      company?: string;
      contactName?: string;
    };

    if (!email || !company) {
      return NextResponse.json(
        { error: 'email과 company는 필수입니다.' },
        { status: 400 }
      );
    }

    // 멱등성 — 같은 이메일로 이미 만든 제안서가 있으면 재생성하지 않고 기존 링크를 반환한다.
    // (메타 리드애즈 트리거의 중복 전달, Zapier 재시도에 대한 방어)
    const { data: existing } = await supabaseAdmin
      .from('proposal_renders')
      .select('pdf_url')
      .eq('email', email)
      .eq('template', TEMPLATE_NAME)
      .maybeSingle();

    if (existing?.pdf_url) {
      return NextResponse.json({ ok: true, pdfUrl: existing.pdf_url, cached: true });
    }

    const ae = DEFAULTS.AE_NAME;
    const fields: Record<string, string> = {
      COMPANY: company,
      COMPANY_WA: company + josa(company, '와', '과'),
      COMPANY_GA: company + josa(company, '가', '이'),
      COMPANY_EUN: company + josa(company, '는', '은'),
      COMPANY_EUL: company + josa(company, '를', '을'),
      SELECTED: DEFAULTS.SELECTED,
      AE_NAME: ae,
      AE_INITIAL: ae.charAt(0) || '고',
      AE_ROLE: DEFAULTS.AE_ROLE,
      AE_TITLE: DEFAULTS.AE_TITLE,
      MEETING_URL: DEFAULTS.MEETING_URL,
    };

    let html: string;
    try {
      html = buildInlinedHtml(fields);
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
    const storagePath = `${TEMPLATE_NAME}/${randomUUID()}.pdf`;

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
        template: TEMPLATE_NAME,
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
    // TODO(debug): 원인 파악되면 이 debug 필드는 제거한다 — 런타임 로그 조회 권한이
    // 없어서 임시로 에러 메시지를 응답에 노출해 원인을 확인 중.
    return NextResponse.json(
      {
        error: '서버 오류가 발생했습니다.',
        debug: error instanceof Error ? { message: error.message, stack: error.stack, cause: String((error as { cause?: unknown }).cause) } : String(error),
      },
      { status: 500 }
    );
  }
}
