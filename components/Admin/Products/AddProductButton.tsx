import { Products } from "@/app/(admin)/products/columns";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogDescription } from "@radix-ui/react-dialog";
import toast from "react-hot-toast";
// 1. เปลี่ยนมาใช้ไอคอนจาก lucide-react
import { Plus } from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function AddProductButton() {
  // 2. เปลี่ยนชื่อฟังก์ชัน
  async function handleAddProduct(formData: FormData) {
    const name = formData.get("name");
    const price = formData.get("price");
    const image = formData.get("image");
    const detail = formData.get("detail");
    const category = formData.get("category")

    // 3. เปลี่ยนข้อความ Toast
    toast.success("เพิ่มสินค้าสำเร็จ");

    // 4. เปลี่ยน Console Log
    console.log("เพิ่มสินค้า:", { name, price, image, detail, category });
    
    // ที่นี่ คุณสามารถเพิ่ม Logic การบันทึกลง Database
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* 5. อัปเดตปุ่ม Trigger */}
        <Button variant="secondary" className="cursor-pointer flex items-center gap-2 btn-main">
          <Plus className="h-4 w-4" />
          <span>เพิ่มสินค้า</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {/* 6. อัปเดต Title และ Description */}
          <DialogTitle className="text">เพิ่มสินค้าใหม่</DialogTitle>
          <DialogDescription>
            กรอกรายละเอียดเพื่อเพิ่มสินค้าใหม่ลงในระบบ
          </DialogDescription>
        </DialogHeader>

        {/* 7. อัปเดต action */}
        <form action={handleAddProduct} className="grid gap-4">
          {/* 8. ลบ hidden input "id" ที่ไม่จำเป็น */}

          <div className="grid gap-3">
            <Label htmlFor="name">ชื่อสินค้า</Label>
            {/* 9. ลบ defaultValue และเพิ่ม placeholder */}
            <Input id="name" name="name"/>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="price">ราคา</Label>
            <Input
              id="price"
              name="price"
              type="number"
              // 10. ลบ defaultValue
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="image">URL รูปภาพ</Label>
            <Input
              id="image"
              name="image"
              type="text"
              // 11. ลบ defaultValue
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="detail">รายละเอียด</Label>
            <Textarea
              id="detail"
              name="detail"
              // 12. ลบ defaultValue
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="category">หมวดหมู่</Label>

            {/* ส่งค่า category ผ่าน input hidden */}
            <input type="hidden" name="category" id="category-hidden" />

            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="เลือกหมวดหมู่สินค้า" />
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
              เพิ่มสินค้า
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}