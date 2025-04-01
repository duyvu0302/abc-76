import AdminPostForm from "@/components/admin/admin-post-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang Quản Trị | Xe Ghép Quảng Ngãi - Đà Nẵng",
  description:
    "Trang quản trị nội dung cho dịch vụ xe ghép Quảng Ngãi - Đà Nẵng",
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Quản Lý Bài Viết
          </h1>
          <AdminPostForm />
        </div>
      </div>
    </main>
  );
}
