import { Users } from "@/app/(admin)/users/columns";
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
import { PencilEdit02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { DialogDescription } from "@radix-ui/react-dialog";
import toast from "react-hot-toast";

export function EditButton({user} : {user: Users}) {
  async function handleEdit(formData: FormData) {
    const name = formData.get("name");
    const point = formData.get("point");
    const totalTopup = formData.get("totalTopup");
    toast.success("แก้ไขสำเร็จ");

    // เขียน logic ตรงนี้ เช่น อัปเดต DB
    console.log("แก้ไข:", { name, point, totalTopup });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <HugeiconsIcon icon={PencilEdit02Icon} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text">แก้ไขผู้ใช้</DialogTitle>
          <DialogDescription>
            เปลี่ยนแปลงรายละเอียดของผู้ใช้รายนี้
          </DialogDescription>
        </DialogHeader>

        {/* ✅ ย้าย form มาวางตรงนี้ และใส่ action */}
        <form action={handleEdit} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name-1">ชื่อผู้ใช้</Label>
            <Input
              id="name-1"
              name="name"
              defaultValue={user.username}
              disabled
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="point">พ้อยท์</Label>
            <Input id="point" name="point" defaultValue={user.point} type="number" />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="totalTopup">ยอดเติมสะสม</Label>
            <Input
              id="totalTopup"
              name="totalTopup"
              defaultValue={user.totalTopup}
              type="number"
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
