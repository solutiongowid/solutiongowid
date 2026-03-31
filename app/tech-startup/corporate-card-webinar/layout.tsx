import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "[고위드] 2026 법인카드 — 여기까지 왔습니다 : 테크·스타트업편",
  description: "바꿀 타이밍, 바꿀 조건, 바꾸기 전 체크리스트까지. 4월 9일(목) 오후 3시 온라인 웨비나",
  openGraph: {
    title: "[고위드] 2026 법인카드 — 여기까지 왔습니다 : 테크·스타트업편",
    description: "바꿀 타이밍, 바꿀 조건, 바꾸기 전 체크리스트까지. 4월 9일(목) 오후 3시 온라인 웨비나",
    images: [
      {
        url: "/corporate-card-webinar-og.png",
        width: 1200,
        height: 630,
        alt: "2026 법인카드 — 여기까지 왔습니다 : 테크·스타트업편 - 고위드 웨비나",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "[고위드] 2026 법인카드 — 여기까지 왔습니다 : 테크·스타트업편",
    description: "바꿀 타이밍, 바꿀 조건, 바꾸기 전 체크리스트까지. 4월 9일(목) 오후 3시 온라인 웨비나",
    images: ["/corporate-card-webinar-og.png"],
  },
};

export default function CorporateCardWebinarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
