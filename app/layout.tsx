import { GoogleAnalytics } from "@next/third-parties/google";
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xe Ghép Quảng Ngãi - Đà Nẵng | Dịch vụ xe ghép chất lượng cao",
  description:
    "Dịch vụ xe ghép Quảng Ngãi - Đà Nẵng với giá cả hợp lý, an toàn và tiện lợi. Đặt xe ngay để được phục vụ tốt nhất.",
  keywords:
    "xe ghép, Quảng Ngãi, Đà Nẵng, kinh nghiệm di chuyển, du lịch miền Trung",
  openGraph: {
    title: " Xe Ghép Quảng Ngãi - Đà Nẵng",
    description:
      "Thông tin hữu ích về dịch vụ xe ghép Quảng Ngãi - Đà Nẵng, kinh nghiệm di chuyển, địa điểm du lịch và nhiều hơn nữa.",
    url: "https://keghepxequangngai.com/",
    siteName: "Xe Ghép Quảng Ngãi - Đà Nẵng",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <meta
          name="google-site-verification"
          content="0BYn6vtN-6WQR6yId7gxyY8AFtVe7jUuj2sb7fkV9cs"
        />
      </head>
      <body className={inter.className}>{children}</body>
      <GoogleAnalytics gaId="G-9MN9QBE27E" />
    </html>
  );
}
