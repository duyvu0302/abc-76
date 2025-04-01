import Script from "next/script";

export default function BlogSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    headline: "Blog Xe Ghép Quảng Ngãi - Đà Nẵng",
    description:
      "Thông tin hữu ích về dịch vụ xe ghép Quảng Ngãi - Đà Nẵng, kinh nghiệm di chuyển, địa điểm du lịch và nhiều hơn nữa.",
    url: "https://xeghep76.com/blog",
    publisher: {
      "@type": "Organization",
      name: "Xe Ghép Quảng Ngãi - Đà Nẵng",
      logo: {
        "@type": "ImageObject",
        url: "https://xeghep76.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://xeghep76.com/blog",
    },
  };

  return (
    <Script id="blog-schema" type="application/ld+json">
      {JSON.stringify(schema)}
    </Script>
  );
}
