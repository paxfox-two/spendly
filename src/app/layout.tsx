import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "한달정산 | 캡처가계부",
  description: "스크린샷 한 장으로 끝내는 똑똑한 가계부",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
