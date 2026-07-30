import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'B2B 소프트웨어 벤치마크 리포트 2026 무료 다운로드 | 고위드',
  description: '국내 B2B 소프트웨어 582개사 2년 실측 분석 — 성장률은 비슷해도 유지율은 왜 2배 갈리는지 진단하는 리포트',
  openGraph: {
    title: 'B2B 소프트웨어 벤치마크 리포트 2026 무료 다운로드 | 고위드',
    description: '582개사의 매출 구조를 거래처 단위로 2년간 추적했습니다. 갈린 것은 그 성장에 든 비용과 그 성장이 온 자리였습니다.',
    images: ['/lead-form-b2b-saas-cover.png'],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function B2bSaasLeadFormLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
