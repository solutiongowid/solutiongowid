import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '푸드 브랜드 벤치마크 리포트 2026 무료 다운로드 | 고위드',
  description: '식품 119개사 2년 재무 해부 — 매출 1원이 GP·OP·현금 어느 칸에서 새는지 진단하는 리포트',
  openGraph: {
    title: '푸드 브랜드 벤치마크 리포트 2026 무료 다운로드 | 고위드',
    description: '식품 119개사 2년 재무 해부 — 버는 돈, 남기는 돈, 쥐는 돈',
    images: ['/lead-form-food-cover.png'],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function FoodLeadFormLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
