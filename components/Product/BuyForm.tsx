"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { AddCircleIcon, RemoveCircleIcon } from "@hugeicons/core-free-icons";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { buyProducts } from "@/lib/database/shop";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog"; // ปรับ path ตาม project
import { getUserById } from "@/lib/database/users";
import { useUser } from "@/contexts/UserContext";

interface BuyFormProps {
  remain: number;
  productId: string;
}

export default function BuyForm({ remain, productId }: BuyFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, update } = useSession();
  const { refreshUser } = useUser();

  const handleBuy = async () => {
    if (!session) {
      toast.error("กรุณาเข้าสู่ระบบก่อน");
      return;
    }

    try {
        setIsOpen(false);
        toast.loading("กำลังสั่งซื้อสินค้า...")

        const status = await buyProducts(quantity, session.user.id, productId)
        
        if (!status?.status) {
          toast.dismiss()
          toast.error(status?.message ?? "เกิดข้อผิดพลากจากระบบ")
          return
        }
        toast.dismiss()
        toast.success("สั่งซื้อสินค้าสำเร็จ กรุณาตรวจสอบประวัติการสั่งซื้อ")

      const users = await getUserById(session.user.id)
      await update({ ...session, user: users });
      await refreshUser();      
    } catch (err) {
      console.error(err);
      setIsOpen(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 w-full sm:w-auto mb-4">
        <label
          htmlFor="quantity"
          className="text-gray-700 font-medium whitespace-nowrap"
        >
          จำนวน:
        </label>

        {/* ลดจำนวน */}
        <Button
          type="button"
          variant="outline"
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
        >
          <HugeiconsIcon icon={RemoveCircleIcon} />
        </Button>

        {/* input quantity */}
        <input
          id="quantity"
          type="number"
          min={1}
          max={remain}
          value={quantity}
          onChange={(e) =>
            setQuantity(Math.min(remain, Math.max(1, Number(e.target.value))))
          }
          className="w-20 border border-gray-300 rounded-lg p-2 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* เพิ่มจำนวน */}
        <Button
          type="button"
          variant="outline"
          onClick={() => setQuantity((prev) => Math.min(remain, prev + 1))}
        >
          <HugeiconsIcon icon={AddCircleIcon} />
        </Button>
      </div>

      {/* ปุ่มสั่งซื้อ + Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={remain <= 0 ? "destructive" : "default"}
          disabled={remain <= 0}
          className={`w-full sm:w-auto text-lg px-6 py-3 rounded-xl flex items-center justify-center gap-2 ${
            remain <= 0 ? "opacity-70 cursor-not-allowed" : "btn-main"
          }`}
        >
          <ShoppingCart size={22} />
          {remain <= 0 ? "สินค้าหมด" : "สั่งซื้อสินค้า"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>ยืนยันการสั่งซื้อ</DialogTitle>
          <DialogDescription>
            คุณต้องการซื้อสินค้า {quantity} ชิ้น ใช่หรือไม่?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          {/* ปุ่มยกเลิก: สามารถใช้ setIsOpen(false) หรือปล่อยให้ DialogTrigger (หรือ DialogClose) ทำงานตามปกติก็ได้ */}
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            ยกเลิก
          </Button>
          
          {/* ปุ่มยืนยัน: เรียก handleBuy ซึ่งจะไปสั่งปิด Dialog ข้างในนั้น */}
          <Button onClick={handleBuy}>ยืนยัน</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  );
}
