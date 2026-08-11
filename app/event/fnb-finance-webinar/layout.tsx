import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "[고위드] F&B 브랜드의 현금 공백",
  description: "돈은 먼저 나가고 나중에 들어옵니다. 매입은 먼저, 정산은 나중 — 푸드커머스와 프랜차이즈 본부가 같은 자리에서 겪는 현금 공백, 그리고 먼저 메운 브랜드들의 이야기. 8월 19일(수) 오후 4시~5시 30분 온라인 웨비나.",
  openGraph: {
    title: "[고위드] F&B 브랜드의 현금 공백",
    description: "돈은 먼저 나가고 나중에 들어옵니다. 매입은 먼저, 정산은 나중 — 푸드커머스와 프랜차이즈 본부가 같은 자리에서 겪는 현금 공백, 그리고 먼저 메운 브랜드들의 이야기. 8월 19일(수) 오후 4시~5시 30분 온라인 웨비나.",
    images: [
      {
        url: "/fnb-finance-webinar-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "F&B 브랜드의 현금 공백 - GOWID 웨비나",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "[고위드] F&B 브랜드의 현금 공백",
    description: "돈은 먼저 나가고 나중에 들어옵니다. 매입은 먼저, 정산은 나중 — 푸드커머스와 프랜차이즈 본부가 같은 자리에서 겪는 현금 공백, 그리고 먼저 메운 브랜드들의 이야기.",
    images: ["/fnb-finance-webinar-thumbnail.png"],
  },
};

export default function FnbFinanceWebinarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
