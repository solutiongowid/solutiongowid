import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "[고위드] 푸드 브랜드 — 버는 돈, 남기는 돈, 쥐는 돈",
  description: "생존을 넘어 번영한 기업의 매출, GP, OP 그리고 현금 관리법. 7월 8일(수) 강남구 도산대로 317 호림아트센터 14층",
  openGraph: {
    title: "[고위드] 푸드 브랜드 — 버는 돈, 남기는 돈, 쥐는 돈",
    description: "생존을 넘어 번영한 기업의 매출, GP, OP 그리고 현금 관리법. 7월 8일(수) 강남구 도산대로 317 호림아트센터 14층",
    images: [
      {
        url: "/food-finance-live-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "푸드 브랜드 — 버는 돈, 남기는 돈, 쥐는 돈 - 고위드 라이브세션",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "[고위드] 푸드 브랜드 — 버는 돈, 남기는 돈, 쥐는 돈",
    description: "생존을 넘어 번영한 기업의 매출, GP, OP 그리고 현금 관리법. 7월 8일(수) 강남구 도산대로 317 호림아트센터 14층",
    images: ["/food-finance-live-thumbnail.png"],
  },
};

export default function FoodFinanceLiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
