"use client";

import { Phone } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import Loading from "@/components/loading";
const formatDate = (date: Date) =>
  format(date, "'Ngày' dd 'tháng' MM 'năm' yyyy");
const defaultData = {
  name: "",
  phone: "",
  addressTo: "",
  date: "",
  quantity: "",
  addressFrom: "",
  note: "",
};

export default function BookingForm() {
  const [data, setData] = useState(defaultData);
  const [message, setMessage] = useState("test gwri message");
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    const message = `Tên: ${data.name}\nSố điện thoại: ${data.phone}\nĐịa chỉ đi: ${data.addressFrom}\nĐịa chỉ đến: ${data.addressTo}\n${formatDate(selectedDate)}\nSố lượng khách: ${data.quantity}\nGhi chú: ${data.note}`;
    setLoading(true);

    const res = await fetch("/api/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
      }),
    });

    setLoading(false);

    if (res.ok) {
      toast.success("Đã gửi thành công");
      setMessage("");
      setData(defaultData);
    } else {
      toast.success("Gửi thất bại");
    }
  };

  const handleChangeInput = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white text-black p-4 rounded-lg shadow-md">
      <Toaster />
      {loading && <Loading />}
      <form onSubmit={(e) => handleSubmitForm(e)}>
        <input
          type="text"
          name="name"
          placeholder="Họ và tên"
          className="input-field"
          required
          onChange={(e) => handleChangeInput(e)}
          value={data.name}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Nhập số điện thoại"
          pattern="^[0-9]{10,11}$"
          className="input-field"
          required
          onChange={(e) => handleChangeInput(e)}
          value={data.phone}
        />

        <input
          type="text"
          name="addressFrom"
          placeholder="Địa chỉ đón xe"
          className="input-field"
          required
          onChange={(e) => handleChangeInput(e)}
          value={data.addressFrom}
        />
        <input
          type="text"
          name="addressTo"
          placeholder="Địa chỉ đến"
          className="input-field"
          required
          onChange={(e) => handleChangeInput(e)}
          value={data.addressTo}
        />
        <input
          type="text"
          name="quantity"
          placeholder="Số lượng khách"
          className="input-field"
          required
          onChange={(e) => handleChangeInput(e)}
          value={data.quantity}
        />
        <DatePicker
          className="input-field border-1 border-gray-300 rounded-md p-2 w-full mb-2"
          selected={selectedDate ? new Date(selectedDate) : null}
          onChange={(date: Date | null) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Chọn ngày đi"
        />
        <textarea
          name="note"
          placeholder="Ghi chú"
          className="input-field"
          onChange={(e) => handleChangeInput(e)}
          value={data.note}
          rows={3}
        ></textarea>

        <button
          type="submit"
          className="btn-primary active:bg-yellow-500 hover:cursor-pointer w-full flex justify-center items-center"
        >
          ĐẶT XE & NHẬN BÁO GIÁ
          <Phone className="ml-2" size={16} />
        </button>
      </form>
    </div>
  );
}
