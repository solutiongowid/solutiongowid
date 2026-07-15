import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '푸드 브랜드 현금흐름 라이브세션 다시보기 무료 신청 | 고위드',
  description: '푸드 브랜드 48개사 재무 해부 — 매출·GP·OP·현금 생존 사다리 라이브세션 녹화본을 이메일로 보내드립니다',
  openGraph: {
    title: '푸드 브랜드 현금흐름 라이브세션 다시보기 무료 신청 | 고위드',
    description: '푸드 브랜드 48개사 재무 해부 — 버는 돈, 남기는 돈, 쥐는 돈',
    images: ['/lead-form-webinar-food-cover.png'],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function WebinarFoodLeadFormLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
