import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft, ChevronRight } from "lucide-react";
import BlogPostSchema from "@/components/blog/blog-post-schema";
import { supabaseServer } from "@/lib/supabase/supabaseServer";
import { formatDate } from "date-fns";

export const revalidate = 60;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  const { data: post, error } = await supabaseServer
    .from("blog")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.log("Failed to fetch slug for generateMetadata");
  }

  return {
    title: `${post.title} | Xe Ghép Quảng Ngãi - Đà Nẵng`,
    description: post.subtitle,
    openGraph: {
      title: post.title,
      description: post.subtitle,
      url: `https://keghepxequangngai.com/blog/${post.slug}`,
      siteName: "Xe Ghép Quảng Ngãi - Đà Nẵng",
      locale: "vi_VN",
      type: "article",
      publishedTime: post.created_at,
      authors: "Xe Ghép Quảng Ngãi - Đà Nẵng",
      tags: "Xe Ghép Quảng Ngãi - Đà Nẵng",
      images: [
        {
          url: post.img_url,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export async function generateStaticParams({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const { data, error } = await supabaseServer
    .from("blog")
    .select("slug")
    .eq("slug", slug);

  if (error) throw new Error("Error");
  return data;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const { data: post, error } = await supabaseServer
    .from("blog")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw new Error("error");

  const { data: recentPosts, error: additionalError } = await supabaseServer
    .from("blog")
    .select("*")
    .neq("slug", slug) // Lọc bỏ bài viết có slug đã lấy
    .order("position", { ascending: false }) // Sắp xếp theo position (giảm dần)
    .limit(2); // Giới hạn lấy 2 bài viết

  if (additionalError) {
    console.error("Lỗi khi lấy bài viết theo position:", additionalError);
    return;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogPostSchema
        title={post.title}
        img_url={post.image}
        created_at={formatDate(post.created_at, "dd/MM/yyyy")}
        slug={post.slug}
        subtitle={post.subtitle}
      />

      {/* Header */}
      <header className="bg-gray-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/"
            className="flex items-center text-yellow-400 hover:text-yellow-300"
          >
            <ArrowLeft size={16} className="mr-1" />
            Quay lại trang chủ
          </Link>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center text-sm text-gray-300 mb-4">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {formatDate(post.created_at, "dd/MM/yyyy")}
              </div>

              <div className="flex items-center ml-3">
                <User size={14} className="mr-1" />
                Admin
              </div>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-gray-300">{post.subtitle}</p>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {post.img_url.includes("http") && (
        <div className="relative h-96 w-full max-w-3xl mx-auto">
          <Image
            src={post.img_url || "/placeholder.svg"}
            alt={post.title}
            className="object-cover"
            fill
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* Blog Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-600 hover:text-yellow-600 mb-6"
          >
            <ArrowLeft size={16} className="mr-2" /> Quay lại Blog
          </Link>

          <article className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Related Posts */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Bài Viết Liên Quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentPosts.map((item) => (
                <div
                  key={item.slug}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200"
                >
                  <div className="relative h-48">
                    {item.img_url.includes("http") && (
                      <Image
                        src={item.img_url}
                        alt="Related post"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2">
                      <Link
                        href={`/blog/${item.slug}`}
                        className="hover:text-yellow-600 transition duration-200"
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar size={14} className="mr-1" />
                      {formatDate(item.created_at, "dd/MM/yyyy")}
                      <span className="mx-2">•</span>
                      <Clock size={14} className="mr-1" />5 phút đọc
                    </div>
                    <Link
                      href={`/blog/${item.slug}`}
                      className="inline-flex items-center text-yellow-600 text-sm font-medium hover:text-yellow-700"
                    >
                      Đọc tiếp <ChevronRight size={14} className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
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
            Đặt xe ngay: 0963.258.123
          </a>
        </div>
      </section>
    </div>
  );
}
