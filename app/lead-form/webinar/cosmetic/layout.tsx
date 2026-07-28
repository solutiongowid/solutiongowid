import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI CFO 시대, K-뷰티의 경영 가시성 라운드테이블 다시보기 무료 신청 | 고위드',
  description: '코스메틱 브랜드 178곳 재무 데이터 해부 — 마진·공헌이익·현금을 데이터·AI로 실시간으로 잇는 라운드테이블 녹화본을 이메일로 보내드립니다',
  openGraph: {
    title: 'AI CFO 시대, K-뷰티의 경영 가시성 라운드테이블 다시보기 무료 신청 | 고위드',
    description: '코스메틱 브랜드 178곳 재무 데이터 해부 — 매출은 늘어도 통장이 마르는 이유',
    images: ['/lead-form-webinar-cosmetic-cover.png'],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function WebinarCosmeticLeadFormLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
