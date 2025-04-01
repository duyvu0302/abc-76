import { Phone, MapPin, Facebook } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-xl font-bold mb-4">
          XE GHÉP QUẢNG NGÃI - ĐÀ NẴNG 2023
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4">
          <a href="tel:0343445345" className="flex items-center">
            <Phone size={18} className="mr-2 text-yellow-400" />
            <span>0963.258.123</span>
          </a>

          <div className="hidden md:block">|</div>
          <div className="flex items-center">
            <MapPin size={18} className="mr-2 text-yellow-400" />
            <span>QUẢNG NGÃI</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4">
          <div>Liên hệ qua facebook :</div>
          <div>
            <Link
              href={"https://www.facebook.com/groups/598259069550293"}
              target="_blank"
              className="flex items-center"
            >
              <Facebook size={18} className="mr-2 text-yellow-400" />
              <span>XE KÉ, GHÉP QUAY ĐẦU ĐÀ NẴNG - QUẢNG NGÃI</span>
            </Link>
            <Link
              href={"https://www.facebook.com/groups/1168755871307794/"}
              target="_blank"
              className="flex items-center"
            >
              <Facebook size={18} className="mr-2 text-yellow-400" />
              <span>
                Xe Tiện Chuyến Quy Nhơn - Quảng Ngãi - Phú Yên - Gia Lai
              </span>
            </Link>
            <Link
              href={"https://www.facebook.com/groups/498581536421312/"}
              target="_blank"
              className="flex items-center"
            >
              <Facebook size={18} className="mr-2 text-yellow-400" />
              <span>HỘI ĐI XE KÉ QUẢNG NGÃI - ĐÀ NẴNG - QUY NHƠN</span>
            </Link>
            <Link
              href={"https://www.facebook.com/groups/1360707258483656/"}
              target="_blank"
              className="flex items-center"
            >
              <Facebook size={18} className="mr-2 text-yellow-400" />
              <span>
                Xe Ké Ghép Quảng Ngãi - Đà Nẵng - Quảng Ngãi - Xe Du Lịch
              </span>
            </Link>
            <Link
              href={"https://www.facebook.com/groups/992689509335266/"}
              target="_blank"
              className="flex items-center"
            >
              <Facebook size={18} className="mr-2 text-yellow-400" />
              <span>
                XE KÉ, GHÉP SÂN BAY ĐÀ NẴNG VỀ CẢNG SA KỲ VÀ TP QUẢNG NGÃI
              </span>
            </Link>
            <Link
              href={"https://www.facebook.com/groups/1352531415734855/"}
              target="_blank"
              className="flex items-center"
            >
              <Facebook size={18} className="mr-2 text-yellow-400" />
              <span>
                Đi Xe Ké Ghép Quảng Ngãi, Bình Sơn - Đà Nẵng & ngược lại
              </span>
            </Link>
            <Link
              href={"https://www.facebook.com/groups/935351218111613/"}
              target="_blank"
              className="flex items-center"
            >
              <Facebook size={18} className="mr-2 text-yellow-400" />
              <span>Hội Ké Ghép Xe Quảng Ngãi - Đà Nẵng - Sân Bay Chu Lai</span>
            </Link>
            <Link
              href={"https://www.facebook.com/groups/1140600247385536/"}
              target="_blank"
              className="flex items-center"
            >
              <Facebook size={18} className="mr-2 text-yellow-400" />
              <span>Xe ké ghép 4-7 chỗ Quảng Ngãi - Bình Định, Quy Nhơn</span>
            </Link>
            <Link
              href={"https://www.facebook.com/groups/441446264212449/"}
              target="_blank"
              className="flex items-center"
            >
              <Facebook size={18} className="mr-2 text-yellow-400" />
              <span>Xe Ké Quảng Ngãi - Bình Định (Quy Nhơn) - Đà Nẵng</span>
            </Link>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <div>Liên hệ qua page hỗ trợ :</div>
            <Link
              href={"https://www.facebook.com/61573566347022"}
              target="_blank"
              className="flex items-center"
            >
              <Facebook size={18} className="mr-2 text-yellow-400" />
              <span>Ké Ghép Xe Đà Nẵng Quảng Nam Quảng Ngãi </span>
            </Link>
          </div>
          <p>
            © {new Date().getFullYear()} - Xe ghép Quảng Ngãi Đà Nẵng. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
