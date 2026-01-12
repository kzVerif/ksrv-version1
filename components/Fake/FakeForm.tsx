"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { updateFake } from "@/lib/database/fake";

export default function FakeForm({ data }: { data:  any }) {

 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const products = Number(formData.get("products") || 0);
  const members = Number(formData.get("members") || 0);
  const sell = Number(formData.get("sell") || 0);

  const updateData = {
    id: data.id,
    products,
    members,
    sell
  };

  toast.promise(
    updateFake(updateData),
    {
      loading: "กำลังบันทึก...",
      success: "บันทึกการตั้งค่าการปลอดยอมหน้าเว็ป สำเร็จ",
      error:   "บันทึกไม่สำเร็จ กรุณาลองใหม่"
    }
  );
};


  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 w-full bg-white border shadow p-4 rounded-2xl"
    >
      <h1 className="text-xl text font-semibold">
        ตั้งค่าการปลอมยอดหน้าเว็ปไซต์
      </h1>

      {/* --- member --- */}
      <div className="grid gap-3">
        <Label htmlFor="accountNumber">จำนวนผู้ใช้</Label>
        <Input
          id="members"
          name="members"
          defaultValue={data.members}
          placeholder="82"
          type="number"
        />
      </div>

      {/* --- products --- */}
      <div className="grid gap-3">
        <Label htmlFor="accountName">จำนวนสินค้าในร้านหน่วยเป็นชิ้น</Label>
        <Input
          id="products"
          name="products"
          defaultValue={data.products}
          placeholder="8"
          type="number"
        />
      </div>

      {/* --- sell --- */}
      <div className="grid gap-3">
        <Label htmlFor="accountName">ยอดขายสินค้าหน่วยเป็นชิ้น</Label>
        <Input
          id="sell"
          name="sell"
          defaultValue={data.sell}
          placeholder="9"
          type="number"
        />
      </div>


      {/* --- หมายเหตุ --- */}
      <Badge className="text-xs">
        หลังจากตั้งค่าเสร็จแล้วอย่าลืมกด "บันทึกการแก้ไข"
      </Badge>

      <Button type="submit" className="btn-main">
        บันทึกการแก้ไข
      </Button>
    </form>
  );
}
