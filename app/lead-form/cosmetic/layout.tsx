import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '뷰티 성장 효율 리포트 무료 다운로드 | 고위드 × 화해',
  description: '연매출 30~80억 뷰티 브랜드를 위한 원가·광고비·공헌이익률 분석 리포트. 141개 뷰티사 재무 데이터 × 21,232개 리뷰 데이터.',
  openGraph: {
    title: '뷰티 성장 효율 리포트 무료 다운로드 | 고위드 × 화해',
    description: '연매출 30~80억 뷰티 브랜드를 위한 원가·광고비·공헌이익률 분석 리포트',
    images: ['/hwahae_cover.png'],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function CosmeticLeadFormLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
