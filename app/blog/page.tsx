import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ChevronRight, ArrowLeft } from "lucide-react";
import BlogSchema from "@/components/blog/blog-schema";
import { supabaseServer } from "@/lib/supabase/supabaseServer";
import { formatDate } from "date-fns";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog | Xe Ghép Quảng Ngãi - Đà Nẵng",
  description:
    "Thông tin hữu ích về dịch vụ xe ghép Quảng Ngãi - Đà Nẵng, kinh nghiệm di chuyển, địa điểm du lịch và nhiều hơn nữa.",
  keywords:
    "blog xe ghép, Quảng Ngãi, Đà Nẵng, kinh nghiệm di chuyển, du lịch miền Trung",
  openGraph: {
    title: "Blog | Xe Ghép Quảng Ngãi - Đà Nẵng",
    description:
      "Thông tin hữu ích về dịch vụ xe ghép Quảng Ngãi - Đà Nẵng, kinh nghiệm di chuyển, địa điểm du lịch và nhiều hơn nữa.",
    url: "https://xeghep76.com/blog",
    siteName: "Xe Ghép Quảng Ngãi - Đà Nẵng",
    locale: "vi_VN",
    type: "website",
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const pageSize = 6;

  const { data, error, count } = await supabaseServer
    .from("blogs")
    .select("id, title, created_at, subtitle, img_url, slug, position", {
      count: "exact",
    })
    .order("position", { ascending: false });

  if (error || count === null) {
    console.error("Lỗi khi lấy dữ liệu blog:", error);
    throw new Error("Failed to fetch blog data");
  }

  const featuredPost = data.slice(0, 1); // Bài nổi bật
  const blogPosts = data
    .filter((post) => post.id !== featuredPost[0]?.id)
    .slice((page - 1) * pageSize, page * pageSize); // Phân trang trên client
  const totalPages = Math.ceil((count - 1) / pageSize);
  const startPage = Math.max(1, page - Math.floor(pageSize / 2));
  const endPage = Math.min(totalPages, startPage + pageSize - 1);

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogSchema />

      {/* Header */}
      <header className="bg-gray-700 text-white py-8 xl:py-12">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/"
            className="flex items-center w-max text-yellow-400 hover:text-yellow-300"
          >
            <ArrowLeft size={16} className="mr-1" />
            Quay lại trang chủ
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 mt-4">
            Blog Xe Ghép Quảng Ngãi - Đà Nẵng
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Thông tin hữu ích về dịch vụ xe ghép, kinh nghiệm di chuyển, địa
            điểm du lịch và nhiều hơn nữa
          </p>
        </div>
      </header>

      {/* Blog Content */}
      <main className="container mx-auto px-4 py-8 xl:py-12">
        {/* Featured Post */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">
            Bài Viết Nổi Bật
          </h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              {featuredPost && featuredPost.length > 0 && (
                <>
                  <div className="md:w-1/2 relative h-64 md:h-auto">
                    {featuredPost[0].img_url.includes("https") && (
                      <Image
                        src={featuredPost[0].img_url}
                        alt={featuredPost[0].title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                  </div>
                  <div className="md:w-1/2 p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                      </div>
                      <div className="flex items-center">
                        {formatDate(featuredPost[0].created_at, "dd/MM/yyyy")}
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3">
                      <Link
                        href={`/blog/${featuredPost[0].slug}`}
                        className="hover:text-yellow-600 transition duration-200"
                      >
                        {featuredPost[0].title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {featuredPost[0].subtitle}
                    </p>
                    <Link
                      href={`/blog/${featuredPost[0].slug}`}
                      className="inline-flex items-center text-yellow-600 font-medium hover:text-yellow-700"
                    >
                      Đọc tiếp <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Recent Posts */}
        <div>
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">
            Bài Viết Gần Đây
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts &&
              blogPosts?.map((post: any) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200"
                >
                  <div className="relative h-48">
                    {post.img_url.includes("https") && (
                      <Image
                        src={post.img_url}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(post.created_at, "dd/MM/yyyy")}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-yellow-600 transition duration-200"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {post.subtitle}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-yellow-600 text-sm font-medium hover:text-yellow-700"
                    >
                      Đọc tiếp <ChevronRight size={14} className="ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
          </div>
        </div>

        {totalPages > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={page > 1 ? `/blog?page=${page - 1}` : "#"}
                  aria-disabled={page <= 1}
                />
              </PaginationItem>

              {startPage > 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {Array.from(
                { length: endPage - startPage + 1 },
                (_, i) => startPage + i
              ).map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href={`/blog?page=${pageNum}`}
                    isActive={page === pageNum}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {endPage < totalPages && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  href={page < totalPages ? `/blog?page=${page + 1}` : "#"}
                  aria-disabled={page >= totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>

      {/* Categories */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">
          Danh Mục
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "Dịch vụ xe ghép",
            "Du lịch",
            "Kinh nghiệm di chuyển",
            "Ẩm thực",
            "Lịch trình du lịch",
            "Khách sạn",
            "Địa điểm",
            "Mẹo vặt",
          ].map((category, index) => (
            <div
              key={index}
              className="bg-white text-[15px] text-nowrap p-2 md:p-4 rounded-lg shadow text-center hover:bg-yellow-50 transition duration-200"
            >
              <span className="font-medium">{category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 ">
            Cần đặt xe ghép Quảng Ngãi - Đà Nẵng?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Chúng tôi cung cấp dịch vụ xe ghép chất lượng cao, giá cả hợp lý với
            đội ngũ tài xế chuyên nghiệp
          </p>
          <a
            href="tel:0343445345"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition duration-200"
          >
            Đặt xe ngay: 0898.999.981
          </a>
        </div>
      </section>
    </div>
  );
}
