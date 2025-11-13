// 1. แก้ไข Import ให้ถูกต้อง
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
import { Textarea } from "@/components/ui/textarea";
import { DialogDescription } from "@radix-ui/react-dialog";
import toast from "react-hot-toast";
import { Plus } from "lucide-react"; // 2. แก้ไขไอคอน

export function AddStockButton() {
  // 4. อัปเดตฟังก์ชัน handleEdit
  async function handleEdit(formData: FormData) {
    const detail = formData.get("detail");

    toast.success("เพิ่มสต็อกสำเร็จ"); // 6. อัปเดตข้อความ
    console.log("เพิ่มสต็อกสำเร็จ:", { detail }); // 7. อัปเดต log
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="cursor-pointer flex items-center gap-2 btn-main"
        >
          <Plus className="h-4 w-4" />
          <span>เพิ่มสต็อค</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {/* 9. อัปเดต Title/Description */}
          <DialogTitle className="text">เพิ่มสต็อคสินค้า</DialogTitle>
          <DialogDescription>
            ใส่รายการสต็อกของคุณทีละบรรทัด
            <br />
            ระบบจะนับ 1 บรรทัดเป็น 1ชิ้นอัตโนมัติ
          </DialogDescription>
        </DialogHeader>

        <form action={handleEdit} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="detail">รายละเอียด</Label>
            <Textarea id="detail" name="detail" />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                ยกเลิก
              </Button>
            </DialogClose>

            <Button type="submit" className="btn-main">
              เพิ่มสต้อคสินค้า
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
