import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "[고위드&인덴트] 고속 성장 코스메틱 브랜드의 성공 포뮬러",
  description: "1~3월, 해봤으니 감이 왔다. 26년 전략을 해부하고, 진짜 되는 곳에 집중하자. 3월 19일(목) 오후 4시 온라인 웨비나",
  openGraph: {
    title: "[고위드&인덴트] 고속 성장 코스메틱 브랜드의 성공 포뮬러",
    description: "1~3월, 해봤으니 감이 왔다. 26년 전략을 해부하고, 진짜 되는 곳에 집중하자. 3월 19일(목) 오후 4시 온라인 웨비나",
    images: [
      {
        url: "/cosmetic-webinar-og.png",
        width: 1200,
        height: 630,
        alt: "고속 성장 코스메틱 브랜드의 성공 포뮬러 - 고위드 x 인덴트코퍼레이션 웨비나",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "[고위드&인덴트] 고속 성장 코스메틱 브랜드의 성공 포뮬러",
    description: "1~3월, 해봤으니 감이 왔다. 26년 전략을 해부하고, 진짜 되는 곳에 집중하자. 3월 19일(목) 오후 4시 온라인 웨비나",
    images: ["/cosmetic-webinar-og.png"],
  },
};

export default function CommerceWebinarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
