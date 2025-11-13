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
import { PencilEdit02Icon, ViewIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { AdminTopupHis } from "@/app/(admin)/adminhistorytopup/columns";

export function ViewHistoryTopupButton({
  topupHis,
}: {
  topupHis: AdminTopupHis;
}) {
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
          <DialogTitle className="text">ประวัติการเติมเงิน</DialogTitle>
          <DialogDescription>ตรวจสอบประวัติการเติมเงิน</DialogDescription>
        </DialogHeader>

        <form className="grid gap-4">
          <input type="hidden" name="id" value={topupHis.id} />

          <div className="grid gap-3">
            <Label htmlFor="name">รหัสอ้างอิง</Label>
            <Input
              id="refId"
              name="refId"
              defaultValue={topupHis.refId}
              disabled
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="price">ผู้ใช้</Label>
            <Input
              id="owner"
              name="owner"
              defaultValue={topupHis.owner}
              type="string"
              disabled
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="image">ประเภท</Label>
            <Input
              id="type"
              name="type"
              defaultValue={topupHis.type}
              type="text"
              disabled
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="detail">จำนวนเงิน</Label>
            <Input
              id="amount"
              name="amount"
              defaultValue={topupHis.amount}
              disabled
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="detail">หมายเหตุ</Label>
            <Input
              id="reason"
              name="reason"
              defaultValue={topupHis.reason}
              disabled
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="detail">เวลา</Label>
            <Input
              id="reason"
              name="reason"
              defaultValue={topupHis.time}
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
