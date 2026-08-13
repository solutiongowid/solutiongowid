import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "[고위드] 광고대행, 재무를 읽는 순서",
  description: "광고대행사 160개사의 세금계산서와 통장에서 확인한 기록. 매출·GP·운영비·OP·현금을 읽는 순서를 90분에 다룹니다. 8월 25일(화) 오후 4시 온라인 Zoom.",
  openGraph: {
    title: "[고위드] 광고대행, 재무를 읽는 순서",
    description: "광고대행사 160개사의 세금계산서와 통장에서 확인한 기록. 매출·GP·운영비·OP·현금을 읽는 순서를 90분에 다룹니다. 8월 25일(화) 오후 4시 온라인 Zoom.",
    images: [
      {
        url: "/agency-finance-webinar-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "광고대행, 재무를 읽는 순서 - GOWID 웨비나",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "[고위드] 광고대행, 재무를 읽는 순서",
    description: "광고대행사 160개사의 세금계산서와 통장에서 확인한 기록. 매출·GP·운영비·OP·현금을 읽는 순서를 90분에 다룹니다.",
    images: ["/agency-finance-webinar-thumbnail.png"],
  },
};

export default function AgencyFinanceWebinarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
