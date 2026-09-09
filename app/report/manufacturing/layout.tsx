import type { Metadata } from 'next';

const TITLE = '제조 산업 현금흐름 벤치마크 리포트 2026 — GOWID';
const DESCRIPTION = '영업흑자 기업 열 곳 중 일곱 곳이 최근 12개월 영업현금은 마이너스였습니다. 국내 하드웨어/제조 116개사의 재무제표·통장 데이터로 확인한 2026 벤치마크.';
const OG_IMAGE = 'https://solutiongowid.com/manufacturing_cover.png';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: 'article',
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'GOWID',
    images: [{ url: OG_IMAGE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function ManufacturingReportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
