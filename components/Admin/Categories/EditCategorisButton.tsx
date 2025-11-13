"use client"
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
import { DialogDescription } from "@radix-ui/react-dialog";
import toast from "react-hot-toast";
import { PencilEdit02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function  EditCategoriesButton({ category }: { category: any }) {
  async function handleEdit(formData: FormData) {
    const id = formData.get("id");
    const name = formData.get("name");
    const image = formData.get("image");

    toast.success("แก้ไขหมวดหมู่สำเร็จ");

    console.log("แก้ไขหมวดหมู่สำเร็จ:", { id, name, image });
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
          <DialogTitle className="text">แก้ไขหมวดหมู่</DialogTitle>
          <DialogDescription>
            เปลี่ยนแปลงรายละเอียดของ {category.name}
          </DialogDescription>
        </DialogHeader>

        <form action={handleEdit} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">ชื่อหมวดหมู่</Label>
            <Input id="name" name="name" defaultValue={category.name} />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="image">URL รูปภาพ</Label>
            <Input
              id="image"
              name="image"
              defaultValue={category.image}
              type="text"
            />
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
