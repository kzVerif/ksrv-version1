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
import { ViewIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AdminBuyProduct } from "@/app/(admin)/adminhistorybuy/columns";

export function ViewHistoryBuyButton({
  product,
}: {
  product: AdminBuyProduct;
}) {
  // async function handleEdit(formData: FormData) {
  //   const id = formData.get("id");
  //   const name = formData.get("name");
  //   const detail = formData.get("detail");
  //   const time = formData.get("time");
  //   const owner = formData.get("owner");

  //   toast.success("แก้ไขสินค้าสำเร็จ");

  //   console.log("แก้ไขสินค้า:", { id, name, detail, owner, time });
  // }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          {/* 4. เปลี่ยนไปใช้ไอคอน Pencil */}
          <HugeiconsIcon icon={ViewIcon} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text">ประวัติการสั่งซื้อ</DialogTitle>
          <DialogDescription>ตรวจสอบประวัติการสั่งซื้อ</DialogDescription>
        </DialogHeader>

        <form className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">รหัสสินค้า</Label>

            <Input disabled name="id" value={product.id} />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="name">ชื่อสินค้า</Label>
            <Input id="name" name="name" defaultValue={product.name} disabled />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="image">ผู้ซื้อ</Label>
            <Input
              id="owner"
              name="owner"
              defaultValue={product.owner}
              type="text"
              disabled
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="detail">รายละเอียด</Label>
            <Textarea
              id="detail"
              name="detail"
              defaultValue={product.detail}
              disabled
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="time">วันที่</Label>
            <Input
              id="time"
              name="time"
              defaultValue={product.time}
              disabled
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                ปิด
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
