import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '여행 OTA 현금흐름 리포트 무료 다운로드 | 고위드 × 소스라이브',
  description: '5-6월 광고비를 유지한 여행 기업의 7-8월 성수기 매출 2.27배. 50개 여행 기업 25개월 결제 데이터 × 광고비–매출 구조 분석 리포트.',
  openGraph: {
    title: '여행 OTA 현금흐름 리포트 무료 다운로드 | 고위드 × 소스라이브',
    description: '5-6월 광고비를 유지한 여행 기업의 7-8월 성수기 매출 2.27배 — 50개 여행 기업 25개월 결제 데이터 분석',
    images: ['/lead-form-travel-cover.png'],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function TravelLeadFormLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
