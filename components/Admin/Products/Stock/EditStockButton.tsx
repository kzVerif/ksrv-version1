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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // 3. เพิ่ม Select สำหรับ status
import { Stocks } from "@/app/(admin)/products/[id]/columns";
import { HugeiconsIcon } from "@hugeicons/react";
import { PencilEdit02Icon } from "@hugeicons/core-free-icons";

export function EditStockButton({ stock }: { stock: Stocks }) {
  // 4. อัปเดตฟังก์ชัน handleEdit
  async function handleEdit(formData: FormData) {
    const id = formData.get("id");
    const detail = formData.get("detail");
    const status = formData.get("status"); // 5. เพิ่ม status

    toast.success("แก้ไขสต็อกสำเร็จ"); // 6. อัปเดตข้อความ
    console.log("แก้ไขสต็อก:", { id, detail, status }); // 7. อัปเดต log
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          {/* 8. อัปเดตไอคอน */}
          <HugeiconsIcon icon={PencilEdit02Icon} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {/* 9. อัปเดต Title/Description */}
          <DialogTitle className="text">แก้ไขสต็อก</DialogTitle>
          <DialogDescription>
            เปลี่ยนแปลงรายละเอียดของสต็อกชิ้นนี้
          </DialogDescription>
        </DialogHeader>

        <form action={handleEdit} className="grid gap-4">
          <input type="hidden" name="id" value={stock.id} />

          <div className="grid gap-3">
            <Label htmlFor="detail">รายละเอียด</Label>
            <Textarea
              id="detail"
              name="detail"
              defaultValue={stock.detail}
            />
          </div>

          {/* 11. เพิ่มฟิลด์สำหรับ Status */}
          <div className="grid gap-3">
            <Label htmlFor="status">สถานะ</Label>
            <Select name="status" defaultValue={stock.status}>
              <SelectTrigger id="status">
                <SelectValue placeholder="เลือกสถานะ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="พร้อมจำหน่าย">พร้อมจำหน่าย</SelectItem>
                <SelectItem value="จำหน่ายแล้ว">จำหน่ายแล้ว</SelectItem>
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