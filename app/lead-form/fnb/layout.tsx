import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '외식 프랜차이즈 수익구조 리포트 무료 다운로드 | 고위드',
  description: '차액가맹금 환급 이후 외식 프랜차이즈 본사가 점검해야 할 수익구조. 345개 식품 공급 기업 34,613건 거래 데이터 분석.',
  openGraph: {
    title: '외식 프랜차이즈 수익구조 리포트 무료 다운로드 | 고위드',
    description: '차액가맹금 환급 이후 외식 프랜차이즈 본사가 점검해야 할 수익구조 — 345개 식품 공급 기업 34,613건 거래 데이터 분석',
    images: ['/lead-form-fnb-cover.png'],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function FnbLeadFormLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
