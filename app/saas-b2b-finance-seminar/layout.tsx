import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "[고위드] 테크 기업의 자금 관리 공식",
  description: "B2B 소프트웨어 582곳과 AI 기업 494곳의 실제 재무 데이터로 살펴본 상반기 성장과 현금 흐름을 공개합니다. 8월 20일(목) 오후 6시, 고위드 사옥 14층.",
  openGraph: {
    title: "[고위드] 테크 기업의 자금 관리 공식",
    description: "B2B 소프트웨어 582곳과 AI 기업 494곳의 실제 재무 데이터로 살펴본 상반기 성장과 현금 흐름을 공개합니다. 8월 20일(목) 오후 6시, 고위드 사옥 14층.",
  },
  twitter: {
    card: "summary",
    title: "[고위드] 테크 기업의 자금 관리 공식",
    description: "B2B 소프트웨어 582곳과 AI 기업 494곳의 실제 재무 데이터로 살펴본 상반기 성장과 현금 흐름을 공개합니다.",
  },
};

export default function SaasB2bFinanceSeminarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
