import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "看见，即疗愈 · OH卡知识库",
  description:
    "OH 卡知识库 · 专为 OH 卡教练与重度用户打造。探索 18 套卡牌、尝试各种牌阵、深入研究引导问题，让图像成为通往内在的桥梁。",
  keywords: "OH卡, 心灵图卡, 疗愈, 潜意识, 牌阵, 引导问题, 自我探索",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-cream-50 antialiased">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
