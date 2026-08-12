import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "[고위드] 라이프·패션 브랜드 — 버는 돈, 남기는 돈, 쥐는 돈",
  description: "매출도 늘고 마진도 좋아졌는데 절반이 넘는 브랜드가 적자입니다. 라이프·패션 브랜드 121사의 재무제표와 160사의 은행 입출금 42개월로 확인한 기록. 8월 26일(수) 오후 4시, 온라인 Zoom.",
  openGraph: {
    title: "[고위드] 라이프·패션 브랜드 — 버는 돈, 남기는 돈, 쥐는 돈",
    description: "매출도 늘고 마진도 좋아졌는데 절반이 넘는 브랜드가 적자입니다. 라이프·패션 브랜드 121사의 재무제표와 160사의 은행 입출금 42개월로 확인한 기록. 8월 26일(수) 오후 4시, 온라인 Zoom.",
    images: [
      {
        url: "/fashion-finance-webinar-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "라이프·패션 브랜드 웨비나 - GOWID",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "[고위드] 라이프·패션 브랜드 — 버는 돈, 남기는 돈, 쥐는 돈",
    description: "매출도 늘고 마진도 좋아졌는데 절반이 넘는 브랜드가 적자입니다. 121사의 재무제표와 160사의 42개월 현금흐름으로 확인한 기록.",
    images: ["/fashion-finance-webinar-thumbnail.png"],
  },
};

export default function FashionFinanceSeminarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
