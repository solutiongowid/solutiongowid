import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "[고위드&파스토] 다채널 커머스, 성장의 착시를 걷어내다",
  description: "운영 구조를 해부하고, 현금 흐름을 재설계하다. 3월 24일(화) 오후 4시 온라인 웨비나",
  openGraph: {
    title: "[고위드&파스토] 다채널 커머스, 성장의 착시를 걷어내다",
    description: "운영 구조를 해부하고, 현금 흐름을 재설계하다. 3월 24일(화) 오후 4시 온라인 웨비나",
    images: [
      {
        url: "/commerce-webinar-og.png",
        width: 1200,
        height: 630,
        alt: "다채널 커머스, 성장의 착시를 걷어내다 - 고위드 x 파스토 웨비나",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "[고위드&파스토] 다채널 커머스, 성장의 착시를 걷어내다",
    description: "운영 구조를 해부하고, 현금 흐름을 재설계하다. 3월 24일(화) 오후 4시 온라인 웨비나",
    images: ["/commerce-webinar-og.png"],
  },
};

export default function CommerceWebinarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
