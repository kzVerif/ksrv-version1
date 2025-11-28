// // 1. แก้ไข Import ให้ถูกต้อง
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { DialogDescription } from "@radix-ui/react-dialog";
// import toast from "react-hot-toast";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"; // 3. เพิ่ม Select สำหรับ status
// import { Stocks } from "@/app/(admin)/admin/products/[id]/columns";
// import { HugeiconsIcon } from "@hugeicons/react";
// import { PencilEdit02Icon } from "@hugeicons/core-free-icons";
// import { updateStocksById } from "@/lib/database/stocks";

// export function EditStockButton({ stock }: { stock: Stocks }) {
//   // 4. อัปเดตฟังก์ชัน handleEdit
//   async function handleEdit(formData: FormData) {
//     const id = String(formData.get("id") || "");
//     const detail = String(formData.get("detail") || "");
//     const productId = stock.productId;

//     // แปลงค่าให้ตรงกับ union type
//     const statusRaw = formData.get("status") as string | null;
//     const status: "AVAILABLE" | "SOLD" =
//       statusRaw === "SOLD" ? "SOLD" : "AVAILABLE";

//    toast.promise(updateStocksById({ id, detail, status, productId }), {
//       loading: "กำลังบันทึก...",
//       success: "แก้ไขสต็อคสำเร็จ",
//       error: "เกิดข้อผิดพลาด",
//     });
//   }

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline" className="cursor-pointer">
//           {/* 8. อัปเดตไอคอน */}
//           <HugeiconsIcon icon={PencilEdit02Icon} />
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           {/* 9. อัปเดต Title/Description */}
//           <DialogTitle className="text">แก้ไขสต็อก</DialogTitle>
//           <DialogDescription>
//             เปลี่ยนแปลงรายละเอียดของสต็อกชิ้นนี้
//           </DialogDescription>
//         </DialogHeader>

//         <form action={handleEdit} className="grid gap-4">
//           <input type="hidden" name="id" value={stock.id} />

//           <div className="grid gap-3">
//             <Label htmlFor="detail">รายละเอียด</Label>
//             <Textarea id="detail" name="detail" defaultValue={stock.detail} />
//           </div>

//           {/* 11. เพิ่มฟิลด์สำหรับ Status */}
//           <div className="grid gap-3">
//             <Label htmlFor="status">สถานะ</Label>
//             <Select name="status" defaultValue={stock.status}>
//               <SelectTrigger id="status">
//                 <SelectValue placeholder="เลือกสถานะ" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="AVAILABLE">พร้อมจำหน่าย</SelectItem>
//                 <SelectItem value="SOLD">จำหน่ายแล้ว</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <DialogFooter>
//             <DialogClose asChild>
//               <Button variant="outline" className="cursor-pointer">
//                 ยกเลิก
//               </Button>
//             </DialogClose>

//             <Button type="submit" className="btn-main">
//               บันทึกการแก้ไข
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { useState } from "react";
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
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Stocks } from "@/app/(admin)/admin/products/[id]/columns";
import { HugeiconsIcon } from "@hugeicons/react";
import { PencilEdit02Icon } from "@hugeicons/core-free-icons";
import { updateStocksById } from "@/lib/database/stocks";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export function EditStockButton({ stock }: { stock: Stocks }) {
  const [detail, setDetail] = useState(stock.detail);
  const [status, setStatus] = useState<"AVAILABLE" | "SOLD">(stock.status);

  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    toast.promise(
      updateStocksById({
        id: stock.id,
        detail,
        status,
        productId: stock.productId,
      }),
      {
        loading: "กำลังบันทึก...",
        success: "แก้ไขสต็อคสำเร็จ",
        error: "เกิดข้อผิดพลาด",
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
          <DialogTitle>แก้ไขสต็อก</DialogTitle>
          <p className="text-sm text-muted-foreground">
            เปลี่ยนแปลงรายละเอียดของสต็อกชิ้นนี้
          </p>
        </DialogHeader>

        <form onSubmit={handleEdit} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="detail">รายละเอียด</Label>
            <ScrollArea className="h-40 max-h-40 overflow-auto rounded-md border">

            <Textarea
              id="detail"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className="resize-none h-40 w-full p-2"
              />
              </ScrollArea>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="status">สถานะ</Label>
            <Select value={status} onValueChange={(v: "AVAILABLE" | "SOLD") => setStatus(v)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="เลือกสถานะ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AVAILABLE">พร้อมจำหน่าย</SelectItem>
                <SelectItem value="SOLD">จำหน่ายแล้ว</SelectItem>
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

