import Image from "next/image";
import { Phone, Calendar, Car, MapPin, CreditCard } from "lucide-react";

export default function WorkProcess() {
  const steps = [
    {
      icon: <Phone size={24} />,
      text: "Liên hệ đặt xe qua hotline hoặc website",
    },
    {
      icon: <Calendar size={24} />,
      text: "Xác nhận lịch trình và thời gian đón",
    },
    { icon: <MapPin size={24} />, text: "Xác nhận địa điểm đón và trả khách" },
    { icon: <Car size={24} />, text: "Tài xế đón khách đúng giờ và địa điểm" },
    {
      icon: <CreditCard size={24} />,
      text: "Thanh toán sau khi hoàn thành chuyến đi",
    },
  ];

  return (
    <section className="py-8 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title mx-auto text-white border-yellow-400">
          QUY TRÌNH LÀM VIỆC
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg text-center">
              <div className="bg-yellow-400 text-black rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
                {step.icon}
              </div>
              <p className="text-sm">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="relative h-80 w-full rounded-lg overflow-hidden border-4 border-yellow-400">
          <Image
            src="/home5.webp"
            alt="Xe ghép Quảng Ngãi - Đà Nẵng"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="mt-6 bg-gray-700 p-4 rounded-lg">
          <h3 className="text-center text-lg font-bold mb-3">
            XE GHÉP QUẢNG NGÃI - ĐÀ NẴNG
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <span className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center mr-2">
                1
              </span>
              <span className="text-sm">Đón tận nơi</span>
            </div>
            <div className="flex items-center">
              <span className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center mr-2">
                2
              </span>
              <span className="text-sm">Trả tận nơi</span>
            </div>
            <div className="flex items-center">
              <span className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center mr-2">
                3
              </span>
              <span className="text-sm">Giá rẻ</span>
            </div>
            <div className="flex items-center">
              <span className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center mr-2">
                4
              </span>
              <span className="text-sm">An toàn</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
