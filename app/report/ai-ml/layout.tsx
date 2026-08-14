import type { Metadata } from 'next';

const TITLE = 'AI 머신러닝 기업 벤치마크 리포트 2026 — GOWID';
const DESCRIPTION = '누적 투자금이 큰 회사일수록 통장에 남은 비율이 낮았습니다. 국내 AI·ML 기업 494곳의 통장과 세금계산서로 직접 센 2026 벤치마크.';
const OG_IMAGE = 'https://solutiongowid.com/aiml_og_thumbnail.jpg';

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

export default function AiMlReportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
