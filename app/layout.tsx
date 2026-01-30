import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "고위드 - 법인카드로 성장하세요",
  description: "매출 후 매입, 들어올 돈과 나갈 돈의 타이밍이 맞기 시작합니다",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
