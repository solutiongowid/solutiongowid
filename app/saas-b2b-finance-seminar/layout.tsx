import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "[고위드] 테크 기업의 자금 관리 공식",
  description: "B2B 소프트웨어 582곳과 AI 기업 494곳의 실제 재무 데이터로 살펴본 상반기 성장과 현금 흐름을 공개합니다. 8월 25일(화) 오후 6시, 고위드 사옥 14층.",
  openGraph: {
    title: "[고위드] 테크 기업의 자금 관리 공식",
    description: "B2B 소프트웨어 582곳과 AI 기업 494곳의 실제 재무 데이터로 살펴본 상반기 성장과 현금 흐름을 공개합니다. 8월 25일(화) 오후 6시, 고위드 사옥 14층.",
    images: [
      {
        url: "/saas-b2b-finance-seminar-thumbnail.png",
        width: 1724,
        height: 1073,
        alt: "테크 기업의 자금 관리 공식 - GOWID 세미나",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "[고위드] 테크 기업의 자금 관리 공식",
    description: "B2B 소프트웨어 582곳과 AI 기업 494곳의 실제 재무 데이터로 살펴본 상반기 성장과 현금 흐름을 공개합니다.",
    images: ["/saas-b2b-finance-seminar-thumbnail.png"],
  },
};

export default function SaasB2bFinanceSeminarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
