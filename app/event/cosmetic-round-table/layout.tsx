import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '[고위드] AI CFO 시대, K-뷰티의 경영 가시성 — 코스메틱 대표·CFO 라운드테이블',
  description: '마진·재고·현금흐름 실전편. 7월 9일(목) 18:00 고위드 본사 14층 | 선착순 20석 한정, 무료',
  openGraph: {
    title: '[고위드] AI CFO 시대, K-뷰티의 경영 가시성 — 코스메틱 대표·CFO 라운드테이블',
    description: '마진·재고·현금흐름 실전편. 7월 9일(목) 18:00 고위드 본사 14층 | 선착순 20석 한정, 무료',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ overflowY: 'auto', height: '100dvh' }}>
      {children}
    </div>
  );
}
