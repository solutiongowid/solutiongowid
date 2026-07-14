import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '라이프·패션 브랜드 벤치마크 리포트 2026 무료 다운로드 | 고위드',
  description: '라이프·패션 121개사 2년 재무 해부 — 매출 1원이 GP·OP·현금 어느 층에서 새는지 진단하는 리포트',
  openGraph: {
    title: '라이프·패션 브랜드 벤치마크 리포트 2026 무료 다운로드 | 고위드',
    description: '라이프·패션 121개사 2년 재무 해부 — 버는 돈, 남기는 돈, 쥐는 돈',
    images: ['/lead-form-fashion-cover.png'],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function FashionLeadFormLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
