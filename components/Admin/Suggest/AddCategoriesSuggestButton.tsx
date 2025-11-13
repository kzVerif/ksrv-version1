"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DialogDescription } from "@radix-ui/react-dialog";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function AddCategoriesSuggestButton() {
  // 2. เปลี่ยนชื่อฟังก์ชัน
  async function handleAddProduct(formData: FormData) {
    const category = formData.get("category");

    // 3. เปลี่ยนข้อความ Toast
    toast.success("เพิ่มสินค้าสำเร็จ");

    // 4. เปลี่ยน Console Log
    console.log("เพิ่มสินค้า:", { category });

    // ที่นี่ คุณสามารถเพิ่ม Logic การบันทึกลง Database
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* 5. อัปเดตปุ่ม Trigger */}
        <Button
          variant="secondary"
          className="cursor-pointer flex items-center gap-2 btn-main"
        >
          <Plus className="h-4 w-4" />
          <span>เพิ่มหมวดหมู่แนะนำ</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {/* 6. อัปเดต Title และ Description */}
          <DialogTitle className="text">เพิ่มหมวดหมู่แนะนำใหม่</DialogTitle>
          <DialogDescription>
            กรอกรายละเอียดเพื่อเพิ่มหมวดหมู่แนะนำใหม่ลงในระบบ
          </DialogDescription>
        </DialogHeader>

        {/* 7. อัปเดต action */}
        <form action={handleAddProduct} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="category">หมวดหมู่แนะนำ</Label>

            {/* ส่งค่า category ผ่าน input hidden */}
            <input type="hidden" name="category" id="category-hidden" />

            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="เลือกหมวดหมู่แนะนำ" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="gamepass">Game Pass</SelectItem>
                <SelectItem value="robux">Robux</SelectItem>
                <SelectItem value="topup">Top-Up</SelectItem>
                <SelectItem value="account">บัญชีเกม</SelectItem>
                <SelectItem value="other">อื่น ๆ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                ยกเลิก
              </Button>
            </DialogClose>

            {/* 13. อัปเดตข้อความปุ่ม Submit */}
            <Button type="submit" className="btn-main">
              เพิ่มหมวดหมู่แนะนำ
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
