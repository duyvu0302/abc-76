export default function PriceDisplay() {
  return (
    <div className="flex justify-center gap-4 md:gap-8 text-center">
      <div className="bg-white bg-opacity-10 p-3 rounded-lg">
        <div className="text-sm text-gray-500">Từ</div>
        <div className="text-2xl font-bold text-yellow-500">1000</div>
        <div className="text-xs text-gray-500">VNĐ/km</div>
      </div>

      <div className="bg-white bg-opacity-10 p-3 rounded-lg">
        <div className="text-sm text-gray-500">Chỉ từ</div>
        <div className="text-2xl font-bold text-yellow-500">6.589</div>
        <div className="text-xs text-gray-500">VNĐ/chuyến</div>
      </div>

      <div className="bg-white bg-opacity-10 p-3 rounded-lg">
        <div className="text-sm text-gray-500">Tiết kiệm</div>
        <div className="text-2xl font-bold text-yellow-500">689</div>
        <div className="text-xs text-gray-500">VNĐ/km</div>
      </div>
    </div>
  );
}
