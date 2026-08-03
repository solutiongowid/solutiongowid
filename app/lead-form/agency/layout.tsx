import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '광고대행사 현금흐름 벤치마크 리포트 2026 무료 다운로드 | 고위드',
  description: '국내 광고대행사 160개사의 결제, 계좌, 세금계산서, 재무재표 데이터를 분석했습니다. 분명 흑자인데 통장은 왜 비어갈까요.',
  openGraph: {
    title: '광고대행사 현금흐름 벤치마크 리포트 2026 무료 다운로드 | 고위드',
    description: '국내 광고대행사 160개사의 결제, 계좌, 세금계산서, 재무재표 데이터를 분석했습니다.',
    images: ['/lead-form-agency-cover.png'],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function AgencyLeadFormLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
