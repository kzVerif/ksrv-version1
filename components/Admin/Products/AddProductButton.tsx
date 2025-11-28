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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { createProducts } from "@/lib/database/shop";
import { useState } from "react";
import { Categories } from "@/lib/database/category";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AddProductButton({ categories }: { categories: Categories[] }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  async function handleAddProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") || "");
    const price = Number(formData.get("price") || 0);
    const image = String(formData.get("image") || "");
    const detail = String(formData.get("detail") || "");
    const categoryId = selectedCategory;

    if (!categoryId) {
      toast.error("กรุณาเลือกหมวดหมู่สินค้า");
      return;
    }

    toast.promise(
      createProducts({ name, price, image, detail, categoriesId: categoryId }),
      {
        loading: "กำลังบันทึก...",
        success: "สร้างสินค้าใหม่สำเร็จ",
        error: "บันทึกไม่สำเร็จ กรุณาลองใหม่",
      }
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="flex items-center gap-2 btn-main"
        >
          <Plus className="h-4 w-4" />
          <span>เพิ่มสินค้า</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>เพิ่มสินค้าใหม่</DialogTitle>
          <DialogDescription>
            กรอกรายละเอียดเพื่อเพิ่มสินค้าใหม่ลงในระบบ
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAddProduct} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">ชื่อสินค้า</Label>
            <Input id="name" name="name" required />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="price">ราคา</Label>
            <Input id="price" name="price" type="number" required />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="image">URL รูปภาพ</Label>
            <Input id="image" name="image" type="text" required />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="detail">รายละเอียด</Label>
             <ScrollArea className="h-40 rounded-md border">
              <Textarea
                id="detail"
                name="detail"
                required
                className="resize-none h-40 w-full p-2"
                placeholder="ใส่รายละเอียดสินค้า..."
              />
            </ScrollArea>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="category">หมวดหมู่</Label>
            <Select onValueChange={setSelectedCategory} defaultValue="">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="เลือกหมวดหมู่สินค้า" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((item) => (
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
              เพิ่มสินค้า
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
