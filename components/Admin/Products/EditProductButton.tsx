"use client";
import { useState } from "react";
import { Products } from "@/app/(admin)/admin/products/columns";
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
import { updateProduct } from "@/lib/database/shop";
import { ScrollArea } from "@/components/ui/scroll-area";

export function EditProductButton({ product }: { product: Products }) {
  const [selectedCategory, setSelectedCategory] = useState(
    product.categories.id
  );

  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const id = String(formData.get("id") || "");
    const name = String(formData.get("name") || "");
    const price = Number(formData.get("price") || 0);
    const image = String(formData.get("image") || "");
    const detail = String(formData.get("detail") || "");

    if (!selectedCategory) {
      toast.error("กรุณาเลือกหมวดหมู่สินค้า");
      return;
    }

    toast.promise(
      updateProduct({
        id,
        name,
        price,
        image,
        detail,
        categoriesId: selectedCategory,
      }),
      {
        loading: "กำลังบันทึก...",
        success: "บันทึกการแก้ไขสินค้าสำเร็จ",
        error: "บันทึกไม่สำเร็จ กรุณาลองใหม่",
      }
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <HugeiconsIcon icon={PencilEdit02Icon} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>แก้ไขสินค้า</DialogTitle>
          <DialogDescription>
            เปลี่ยนแปลงรายละเอียดของสินค้าชิ้นนี้
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleEdit} className="grid gap-4">
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
              defaultValue={Math.floor(Number(product.price))} // ตัดทศนิยม
              type="number"
              step={1} // กำหนดให้เป็นจำนวนเต็ม
              min={0}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="image">URL รูปภาพ</Label>
            <Input
              id="image"
              name="image"
              defaultValue={product.image ?? ""}
              type="text"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="detail">รายละเอียด</Label>
            <ScrollArea className="h-40 rounded-md border overflow-auto ">

            <Textarea
              id="detail"
              name="detail"
              defaultValue={product.detail ?? ""}
              className="resize-none h-40 w-full p-2"
            />
            </ScrollArea>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="category">หมวดหมู่</Label>
            <Select
              defaultValue={product.categories.id}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="เลือกหมวดหมู่สินค้า" />
              </SelectTrigger>
              <SelectContent>
                {product.allCategories.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">ยกเลิก</Button>
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
