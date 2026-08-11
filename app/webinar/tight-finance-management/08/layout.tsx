import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "[고위드] 재무 담당자를 위한 타이트 파이낸스, 지출관리",
  description: "현금 기반 공헌이익 설계 방법과 지출관리 서비스 및 OPEN API 활용 방법. 8월 20일(목) 오전 11시, 온라인 ZOOM",
  openGraph: {
    title: "[고위드] 재무 담당자를 위한 타이트 파이낸스, 지출관리",
    description: "현금 기반 공헌이익 설계 방법과 지출관리 서비스 및 OPEN API 활용 방법. 8월 20일(목) 오전 11시, 온라인 ZOOM",
    images: [
      {
        url: "/tight-finance-management-08-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "재무 담당자를 위한 타이트 파이낸스, 지출관리 - 고위드 웨비나",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "[고위드] 재무 담당자를 위한 타이트 파이낸스, 지출관리",
    description: "현금 기반 공헌이익 설계 방법과 지출관리 서비스 및 OPEN API 활용 방법. 8월 20일(목) 오전 11시, 온라인 ZOOM",
    images: ["/tight-finance-management-08-thumbnail.png"],
  },
};

export default function TightFinanceManagement08Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
