import type { Metadata } from "next";
import "./globals.css";
import { BOOK_TITLE } from "@/lib/links";

const metadataBaseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(metadataBaseUrl),
  title: `${BOOK_TITLE} · 프롬프트 이지 Copy&Paste`,
  description:
    "프롬프트 입력하느라 고생하지 마세요. 바로 번호와 활용 주제로 찾아 GPT Image 2에 바로 붙여 쓰세요.",
  openGraph: {
    title: `${BOOK_TITLE} · 프롬프트 이지 Copy&Paste`,
    description:
      "프롬프트 입력하느라 고생하지 마세요, 바로 붙여서 바로 사용해보세요.",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/cover.jpeg",
        width: 640,
        height: 960,
        alt: `${BOOK_TITLE} 도서 표지`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BOOK_TITLE} · 프롬프트 이지 Copy&Paste`,
    description:
      "프롬프트 입력하느라 고생하지 마세요, 바로 붙여서 바로 사용해보세요.",
    images: ["/cover.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
