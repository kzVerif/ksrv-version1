import { Users } from "@/app/(admin)/admin/users/columns";
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
import { updateUser } from "@/lib/database/users";
import { PencilEdit02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { DialogDescription } from "@radix-ui/react-dialog";
import toast from "react-hot-toast";

export function EditButton({ user }: { user: Users }) {
  async function handleEdit(formData: FormData) {
    const point = Number(formData.get("points") || 0);
    const totalTopup = Number(formData.get("totalPoints")|| 0);
    toast.promise(
      updateUser({
        id: user.id,
        points: point,
        totalPoints: totalTopup,
      }),
      {
        loading: "กำลังอัพเดทผู็ใช้...",
        success: "อัพเดทสำเร็จ",
        error: "บันทึกไม่สำเร็จ กรุณาลองใหม่",
      }
    );
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
            <Label htmlFor="name">ชื่อผู้ใช้</Label>
            <Input
              id="name"
              name="name"
              defaultValue={user.username}
              disabled
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="points">พ้อยท์</Label>
            <Input
              id="points"
              name="points"
              defaultValue={user.points}
              type="number"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="totalPoints">ยอดเติมสะสม</Label>
            <Input
              id="totalPoints"
              name="totalPoints"
              defaultValue={user.totalPoints}
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
