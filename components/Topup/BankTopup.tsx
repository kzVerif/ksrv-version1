"use client";
import React, { useState } from "react";
import {
  Image as ImageIcon,
} from "lucide-react";
import toast from "react-hot-toast";

export default function BankTopup() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"success" | "fail" | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setStatus(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setStatus("fail");
      toast.error("กรุณาแนบสลิปมาด้วย")
      return;
    } 
    toast.success("เติมเงินสำเร็จ")

    // จำลองตรวจสอบสลิป
    setTimeout(() => {
      setStatus("success");
    }, 1000);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-5">
      {/* ✅ Header */}
      <div className="flex gap-2 mb-4">
        <h1 className="text-xl text-left font-bold text-gray-800">
          เติมเงินผ่าน ธนาคาร
        </h1>
      </div>

      {/* ✅ ข้อมูลบัญชี */}
      <div className="text-box rounded-xl p-4 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
          <div>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">ธนาคาร:</span> กสิกรไทย (KBank)
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">เลขบัญชี:</span>{" "}
              <span className="text font-bold">123-4-56789-0</span>
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">ชื่อบัญชี:</span> นายคังหุ่น
              แซ่การูน
            </p>
          </div>
        </div>
      </div>

      {/* ✅ ฟอร์มอัปโหลดสลิป */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-5 cursor-pointer hover:border-blue-400 transition">
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center space-y-2"
          >
            <ImageIcon className="text-gray-400" size={40} />
            <span className="text-gray-600 text-sm font-medium">
              {file ? "เปลี่ยนรูปสลิป" : "คลิกเพื่อเลือกหรือวางรูปสลิปที่นี่"}
            </span>
            <span className="text-xs text-gray-400">
              รองรับไฟล์ .jpg .png .jpeg
            </span>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* ✅ แสดง Preview */}

        <button
          type="submit"
          className="w-full btn-main font-medium py-2.5 rounded-lg shadow-md transition-all"
        >
          ตรวจสอบสลิป
        </button>
      </form>
    </div>
  );
}
