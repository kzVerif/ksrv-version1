"use client"; // ✅ เพื่อให้ event ทำงานในฝั่ง client ได้

import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

interface BuyFormProps {
  remain: number; // ✅ รับค่าจำนวนสินค้าคงเหลือจากภายนอก
}

export default function BuyForm({ remain }: BuyFormProps) {
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("จำนวนที่สั่งซื้อ:", quantity);
    alert(`คุณเลือกจำนวน ${quantity} ชิ้น`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row sm:items-center gap-4"
    >
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <label
          htmlFor="quantity"
          className="text-gray-700 font-medium whitespace-nowrap"
        >
          จำนวน:
        </label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          min={1}
          max={remain}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full sm:w-24 border border-gray-300 rounded-lg p-2 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <Button
        variant={remain <= 0 ? "destructive" : "default"}
        type="submit"
        disabled={remain <= 0}
        className={`w-full sm:w-auto text-lg px-6 py-3 rounded-xl flex items-center justify-center gap-2 ${
          remain <= 0 ? "opacity-70 cursor-not-allowed" : "btn-main"
        }`}
      >
        <ShoppingCart size={22} />
        {remain <= 0 ? "สินค้าหมด" : "สั่งซื้อสินค้า"}
      </Button>
    </form>
  );
}
