import Script from "next/script";

interface BlogPostSchemaProps {
  title: string;
  created_at: string;
  img_url: string;
  slug: string;
  subtitle: string;
}

export default function BlogPostSchema({
  title,
  img_url,
  created_at,
  subtitle,
  slug,
}: BlogPostSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: subtitle,
    image: img_url,
    datePublished: created_at,
    publisher: {
      "@type": "Organization",
      name: "Xe Ghép Quảng Ngãi - Đà Nẵng",
      logo: {
        "@type": "ImageObject",
        url: "https://keghepxequangngai.com/home3.webp",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://keghepxequangngai.com/blog/${slug}`,
    },
  };

  return (
    <Script id="blog-post-schema" type="application/ld+json">
      {JSON.stringify(schema)}
    </Script>
  );
}
