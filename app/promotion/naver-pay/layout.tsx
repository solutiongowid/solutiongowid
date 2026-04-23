import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "고위드 × 네이버 | 광고비 전용 고한도 법인카드",
  description: "네이버 광고비가 한도에 막히지 않도록. 커머스 매출·정산 데이터 기반 고한도 법인카드. 신청 후 5일이면 바로 쓸 수 있습니다.",
  openGraph: {
    title: "고위드 × 네이버 | 광고비 전용 고한도 법인카드",
    description: "커머스 성장 흐름에 맞는 맞춤 카드 한도. 광고비 결제가 한도에 막히지 않도록.",
  },
};

export default function NaverPayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
