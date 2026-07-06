import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '스타트업 SaaS·AI 비용 분석 리포트 2026 무료 다운로드 | 고위드',
  description: '1,600개 스타트업 실결제 데이터 기반 — 우리 회사는 비슷한 규모, 업종에서 많이 쓰는 편일까?',
  openGraph: {
    title: '스타트업 SaaS·AI 비용 분석 리포트 2026 무료 다운로드 | 고위드',
    description: '1,600개 스타트업 실결제 데이터 분석 인사이트',
    images: ['/lead-form-ai-saas-cover.png'],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function AiSaasLeadFormLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
