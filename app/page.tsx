import BookingForm from "@/components/booking-form";
import PriceDisplay from "@/components/price-display";
import ServiceSection from "@/components/service-section";
import PromotionSection from "@/components/promotion-section";
import WorkProcess from "@/components/work-process";
import ReviewSection from "@/components/review-section";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { supabaseServer } from "@/lib/supabase/supabaseServer";
import { formatDate } from "date-fns/format";
import { Suspense } from "react";

export const revalidate = 60;

export default async function Home() {
  const { data, error } = await supabaseServer
    .from("blog")
    .select("*")
    .order("position", { ascending: false })
    .limit(3);

  if (error) console.error("Failed to fetch data blog");

  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <header className="bg-gray-700 text-white p-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-sm font-bold">GIÁ SIÊU RẺ</h1>
              <p className="text-xs">CHỈ TỪ 250k</p>
            </div>
            <div>
              <a
                href="tel:0343445345"
                className="flex items-center text-yellow-400"
              >
                <span className="mr-2">📞</span>
                <span className="font-bold">0963.258.123</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-700 text-white xl:py-8">
        <div className="container mx-auto px-4">
          <div className="relative">
            <div className="relative z-10 pb-4">
              <div className="text-center mb-6">
                <h1 className="text-2xl xl:pt-5 pt-3 md:text-3xl font-bold text-yellow-400 mb-2">
                  XE GHÉP
                </h1>
                <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-4">
                  QUẢNG NGÃI <span className="inline-block mx-2">⇔</span> ĐÀ
                  NẴNG
                </h2>
                <p className="text-sm md:text-base mb-1">
                  Công nghệ số xe - Giá cả hợp lý
                </p>
                <p className="text-xs md:text-sm text-gray-300">
                  Đặt xe nhanh chóng - Phục vụ tận tình - Đưa đón tận nơi
                </p>
              </div>

              <div className="flex flex-wrap justify-center text-xs gap-2 mb-6">
                <span className="bg-gray-600 px-2 py-1 rounded">
                  Đặt xe nhanh
                </span>
                <span className="bg-gray-600 px-2 py-1 rounded">
                  Xe đời mới
                </span>
                <span className="bg-gray-600 px-2 py-1 rounded">
                  Quảng Ngãi
                </span>
                <span className="bg-gray-600 px-2 py-1 rounded">Sa Kỳ</span>
                <span className="bg-gray-600 px-2 py-1 rounded">Dung Quất</span>
                <span className="bg-gray-600 px-2 py-1 rounded">Bình Sơn</span>
                <span className="bg-gray-600 px-2 py-1 rounded">Tam kỳ</span>
                <span className="bg-gray-600 px-2 py-1 rounded">Hội An</span>
                <span className="bg-gray-600 px-2 py-1 rounded">Đà Nẵng</span>
              </div>

              <div className="text-center mb-6 bg-yellow-400 md:w-64 rounded flex flex-col justify-center items-center p-4 mx-auto text-black font-bold">
                <p className="text-2xl">ĐẶT XE NGAY</p>
                <Link className="text-2xl" href={"tel:0963.258.123"}>
                  0963.258.123
                </Link>
                <p className="mt-2 text-sm">(Có Zalo)</p>
                <Image
                  alt="logo_zalo"
                  src="/zalo.png"
                  width={50}
                  height={50}
                  className="blinking-image"
                ></Image>
              </div>
              <PriceDisplay />
            </div>

            <Image
              src="/home0.webp"
              className="absolute object-cover opacity-40 rounded-[10px]"
              fill
              sizes="(max-width:678px, 100vw), 1600px"
              alt="background homepage"
              priority
            />
          </div>

          <div className="mt-8 pb-4">
            <Suspense fallback={<p>Đang tải dữ liệu...</p>}>
              <BookingForm />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Service Introduction */}
      <section className="py-4 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title mx-auto">GIỚI THIỆU DỊCH VỤ</h2>

          <ServiceSection
            title="DỊCH VỤ AN TOÀN"
            description="Đảm bảo người và phương tiện sử dụng đều được kiểm tra chất lượng, có lý lịch rõ ràng, giấy phép đúng quy định, bảo vệ tối đa quyền lợi của khách hàng."
            imageUrl="/home1.webp"
          />

          <ServiceSection
            title="THÁI ĐỘ TẬN TÂM"
            description="Đội xe và nhân viên luôn sẵn sàng phục vụ quý khách với tinh thần trách nhiệm cao, nhiệt tình, thân thiện, mang đến trải nghiệm tốt nhất cho khách hàng."
            imageUrl="/home2.webp"
          />

          <ServiceSection
            title="KINH TẾ TIẾT KIỆM"
            description="Với giá dịch vụ phù hợp với chuyến đi của quý khách, đảm bảo chi phí hợp lý nhất cho mọi người, không có phí phát sinh nào khác ngoài phí dịch vụ."
            imageUrl="/home3.webp"
          />
        </div>
      </section>

      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-title">BÀI VIẾT MỚI NHẤT</h2>
            <Link
              href="/blog"
              className="text-yellow-600 hover:text-yellow-700 font-medium flex items-center"
            >
              Xem tất cả <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data?.map((post: any) => (
              <div
                key={post.slug}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200"
              >
                <div className="relative h-48">
                  {post.img_url.includes("http") && (
                    <Image
                      src={post.img_url || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px, 100vw), 33vw"
                    />
                  )}
                </div>

                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-2">
                    {formatDate(post.created_at, "dd/MM/yyyy")}
                  </p>
                  <h3 className="text-lg font-bold mb-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-yellow-600 transition duration-200"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-yellow-600 text-sm font-medium hover:text-yellow-700"
                  >
                    Đọc tiếp <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotion Section */}
      <PromotionSection />

      {/* Work Process */}
      <WorkProcess />

      {/* Reviews */}
      <ReviewSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
