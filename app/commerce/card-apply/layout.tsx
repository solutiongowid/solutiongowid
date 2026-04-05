import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "고위드 법인카드 | 안 바꾸는 이유, 다 맞는 말입니다",
  description: "법인카드, 안 바꾸는 이유가 있으시죠? 고위드가 그 이유를 하나씩 풀어드립니다. 페이백, 한도, 발급까지.",
  openGraph: {
    title: "고위드 법인카드 | 안 바꾸는 이유, 다 맞는 말입니다",
    description: "법인카드, 안 바꾸는 이유가 있으시죠? 고위드가 그 이유를 하나씩 풀어드립니다.",
  },
  twitter: {
    card: "summary_large_image",
    title: "고위드 법인카드 | 안 바꾸는 이유, 다 맞는 말입니다",
    description: "법인카드, 안 바꾸는 이유가 있으시죠? 고위드가 그 이유를 하나씩 풀어드립니다.",
  },
};

export default function CardApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
