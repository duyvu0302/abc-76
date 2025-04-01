import Image from "next/image";

export default function PromotionSection() {
  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="section-title mx-auto">CHƯƠNG TRÌNH KHUYẾN MÃI</h2>

        <div className="bg-black rounded-lg overflow-hidden shadow-lg">
          <div className="relative h-64 w-full">
            <Image
              src="/home4.webp"
              alt="Chương trình khuyến mãi"
              fill
              className="object-cover opacity-80"
              sizes="100vw"
              priority
            />
            <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black to-transparent w-full">
              <h3 className="text-[#ff8800] font-bold text-xl">
                Khuyến mãi 50%
              </h3>
              <p className="text-yellow-400 text-sm">
                Cho lần đầu khi book 3 ghế trở lên
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
