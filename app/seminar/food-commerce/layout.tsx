import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "[고위드] 푸드 브랜드 — 버는 돈, 남기는 돈, 쥐는 돈",
  description: "생존을 넘어 번영한 기업의 매출, GP, OP 그리고 현금 관리법. 7월 7일(화) 온라인 라이브 + 현장",
  openGraph: {
    title: "[고위드] 푸드 브랜드 — 버는 돈, 남기는 돈, 쥐는 돈",
    description: "생존을 넘어 번영한 기업의 매출, GP, OP 그리고 현금 관리법. 7월 7일(화) 온라인 라이브 + 현장",
    images: [
      {
        url: "/food-commerce-webinar-og.png",
        width: 1200,
        height: 630,
        alt: "푸드 브랜드 — 버는 돈, 남기는 돈, 쥐는 돈 - 고위드 라이브세션",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "[고위드] 푸드 브랜드 — 버는 돈, 남기는 돈, 쥐는 돈",
    description: "생존을 넘어 번영한 기업의 매출, GP, OP 그리고 현금 관리법. 7월 7일(화) 온라인 라이브 + 현장",
    images: ["/food-commerce-webinar-og.png"],
  },
};

export default function FoodCommerceWebinarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
