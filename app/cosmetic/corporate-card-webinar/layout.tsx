import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "[고위드] 2026 법인카드 — 여기까지 왔습니다 : 코스메틱편",
  description: "바꿀 타이밍, 바꿀 조건, 바꾸기 전 체크리스트까지. 5월 20일(수) 오후 4시 온라인 웨비나",
  openGraph: {
    title: "[고위드] 2026 법인카드 — 여기까지 왔습니다 : 코스메틱편",
    description: "바꿀 타이밍, 바꿀 조건, 바꾸기 전 체크리스트까지. 5월 20일(수) 오후 4시 온라인 웨비나",
    images: [
      {
        url: "/corporate-card-webinar-cosmetic-og.png",
        width: 1200,
        height: 630,
        alt: "2026 법인카드 — 여기까지 왔습니다 : 코스메틱편 - 고위드 웨비나",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "[고위드] 2026 법인카드 — 여기까지 왔습니다 : 코스메틱편",
    description: "바꿀 타이밍, 바꿀 조건, 바꾸기 전 체크리스트까지. 5월 20일(수) 오후 4시 온라인 웨비나",
    images: ["/corporate-card-webinar-cosmetic-og.png"],
  },
};

export default function CorporateCardWebinarCosmeticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
