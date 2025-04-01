import Image from "next/image";
import { Star } from "lucide-react";

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
}

export default function ReviewSection() {
  const reviews: Review[] = [
    {
      id: 1,
      name: "Chị Lan",
      location: "Bình Sơn, QN",
      rating: 5,
      comment:
        "Dịch vụ rất tốt và chuyên nghiệp. Tài xế đúng giờ và rất lịch sự. Sẽ tiếp tục sử dụng dịch vụ trong tương lai.",
      avatar: "/avt2.webp",
    },
    {
      id: 2,
      name: "Anh Sơn",
      location: "Tam Kỳ, QN",
      rating: 5,
      comment:
        "Tôi rất hài lòng với dịch vụ xe ghép. Giá cả phải chăng và đưa đón tận nơi, rất tiện lợi.",
      avatar: "/avt1.webp",
    },
    {
      id: 3,
      name: "Chị Ngọc",
      location: "Quận Thanh Khê, ĐN",
      rating: 5,
      comment:
        "Đã sử dụng dịch vụ nhiều lần, luôn đúng giờ và an toàn. Tài xế rất thân thiện và nhiệt tình hỗ trợ.",
      avatar: "/avt3.webp",
    },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title mx-auto">REVIEW CỦA KHÁCH HÀNG</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-50 p-4 rounded-lg shadow">
              <div className="flex items-center mb-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{review.name}</h4>
                  <p className="text-xs text-gray-500">{review.location}</p>
                </div>
              </div>

              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <p className="text-sm text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
