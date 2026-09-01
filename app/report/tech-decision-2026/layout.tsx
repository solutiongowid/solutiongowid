import type { Metadata } from 'next';

const TITLE = '테크 기업의 사건과 의사결정 리포트 2026 — GOWID';
const DESCRIPTION = '다섯 상황(매출 급락·현금 고갈·투자 유치·지원사업·매출 급등)에서 사람을 늘렸는지 줄였는지가 열여덟 달 뒤를 갈랐습니다. 국내 테크 기업 569곳, 55개월 실측.';
const OG_IMAGE = 'https://solutiongowid.com/techdecision_thumbnail.png';

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

export default function TechDecision2026ReportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
