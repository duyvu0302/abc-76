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
          <Link
            href={"https://www.facebook.com/groups/8408609139218100"}
            target="_blank"
            className="flex items-center"
          >
            <Facebook size={18} className="mr-2 text-yellow-400" />
            <span>Hội xe ghép Quảng Ngãi - Đà Nẵng</span>
          </Link>

          <div className="hidden md:block">|</div>

          <Link
            href={"https://www.facebook.com/100005682580853"}
            target="_blank"
            className="flex items-center"
          >
            <Facebook size={18} className="mr-2 text-yellow-400" />
            <span>Dũng (Mỹ)</span>
          </Link>
        </div>

        <div className="text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} - Xe ghép Quảng Ngãi Đà Nẵng. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
