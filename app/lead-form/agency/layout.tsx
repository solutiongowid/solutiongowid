import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '광고대행사 현금흐름 벤치마크 리포트 2026 무료 다운로드 | 고위드',
  description: '광고대행사 160개사 세금계산서·통장 실측 데이터 — 분명 흑자인데 통장은 왜 비어갈까? 매출·GP·운영비·OP·현금흐름을 읽는 순서와 벤치마크.',
  openGraph: {
    title: '광고대행사 현금흐름 벤치마크 리포트 2026 무료 다운로드 | 고위드',
    description: '광고대행사 160개사 실측 데이터로 확인한 GP마진·인건비율·현금 갭 벤치마크',
    images: ['/lead-form-agency-cover.png'],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function AgencyLeadFormLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
