import type React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin | Xe Ghép Quảng Ngãi - Đà Nẵng",
  description: "Trang quản trị cho dịch vụ xe ghép Quảng Ngãi - Đà Nẵng",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Trang Quản Trị</h1>
          <Link
            href="/"
            className="flex items-center text-yellow-400 hover:text-yellow-300"
          >
            <ArrowLeft size={16} className="mr-1" />
            Quay lại trang chủ
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
