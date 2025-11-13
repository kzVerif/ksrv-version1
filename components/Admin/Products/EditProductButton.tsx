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
import { PencilEdit02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function EditProductButton({ product }: { product: Products }) {
  async function handleEdit(formData: FormData) {
    const id = formData.get("id");
    const name = formData.get("name");
    const price = formData.get("price");
    const image = formData.get("image");
    const detail = formData.get("detail");
    const category = formData.get("category");

    toast.success("แก้ไขสินค้าสำเร็จ");

    console.log("แก้ไขสินค้า:", { id, name, price, image, detail, category });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          {/* 4. เปลี่ยนไปใช้ไอคอน Pencil */}
          <HugeiconsIcon icon={PencilEdit02Icon} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text">แก้ไขสินค้า</DialogTitle>
          <DialogDescription>
            เปลี่ยนแปลงรายละเอียดของสินค้าชิ้นนี้
          </DialogDescription>
        </DialogHeader>

        <form action={handleEdit} className="grid gap-4">
          <input type="hidden" name="id" value={product.id} />

          <div className="grid gap-3">
            <Label htmlFor="name">ชื่อสินค้า</Label>
            <Input id="name" name="name" defaultValue={product.name} />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="price">ราคา</Label>
            <Input
              id="price"
              name="price"
              defaultValue={product.price}
              type="number"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="image">URL รูปภาพ</Label>
            <Input
              id="image"
              name="image"
              defaultValue={product.image}
              type="text"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="detail">รายละเอียด</Label>
            <Textarea id="detail" name="detail" defaultValue={product.detail} />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="category">หมวดหมู่</Label>

            {/* ส่งค่า category ผ่าน input hidden */}
            <input type="hidden" name="category" id="category-hidden" />

            <Select defaultValue={product.category}>
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

            <Button type="submit" className="btn-main">
              บันทึกการแก้ไข
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
