// "use client";
// import { Users } from "@/app/(admin)/admin/users/columns";
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
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";
// import { updateUser } from "@/lib/database/users";
// import { PencilEdit02Icon } from "@hugeicons/core-free-icons";
// import { HugeiconsIcon } from "@hugeicons/react";
// import { DialogDescription } from "@radix-ui/react-dialog";
// import { SelectTrigger } from "@radix-ui/react-select";
// import { useState } from "react";
// import toast from "react-hot-toast";

// export function EditButton({ user }: { user: Users }) {
//   const [selectedRole, setSelectedRole] = useState<"USER" | "ADMIN">(user.role);
//   async function handleEdit(formData: FormData) {
//     const point = Number(formData.get("points") || 0);
//     const totalTopup = Number(formData.get("totalPoints") || 0);
//     const role = selectedRole;
//     toast.promise(
//       updateUser({
//         id: user.id,
//         points: point,
//         totalPoints: totalTopup,
//         role
//       }),
//       {
//         loading: "กำลังอัพเดทผู้ใช้...",
//         success: "อัพเดทสำเร็จ",
//         error: "บันทึกไม่สำเร็จ กรุณาลองใหม่",
//       }
//     );
//   }

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline" className="cursor-pointer">
//           <HugeiconsIcon icon={PencilEdit02Icon} />
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle className="text">แก้ไขผู้ใช้</DialogTitle>
//           <DialogDescription>
//             เปลี่ยนแปลงรายละเอียดของผู้ใช้รายนี้
//           </DialogDescription>
//         </DialogHeader>

//         {/* ✅ ย้าย form มาวางตรงนี้ และใส่ action */}
//         <form action={handleEdit} className="grid gap-4">
//           <div className="grid gap-3">
//             <Label htmlFor="name">ชื่อผู้ใช้</Label>
//             <Input
//               id="name"
//               name="name"
//               defaultValue={user.username}
//               disabled
//             />
//           </div>

//           <div className="grid gap-3">
//             <Label htmlFor="points">พ้อยท์</Label>
//             <Input
//               id="points"
//               name="points"
//               defaultValue={user.points}
//               type="number"
//             />
//           </div>

//           <div className="grid gap-3">
//             <Label htmlFor="totalPoints">ยอดเติมสะสม</Label>
//             <Input
//               id="totalPoints"
//               name="totalPoints"
//               defaultValue={user.totalPoints}
//               type="number"
//             />
//           </div>

//           <div className="grid gap-3">
//             <Label htmlFor="category">ตำแหน่งของผู้ใช้</Label>
//             <Select
//               defaultValue={user.role}
//               onValueChange={(value) =>
//                 setSelectedRole(value as "USER" | "ADMIN")
//               }
//             >
//               <SelectTrigger
//                 className="
//     w-full
//     bg-gray-100
//     rounded-xl
//     p-1
//     border
//     border-gray-300
//     cursor-pointer
//     transition
//     hover:bg-gray-200
//     shadow-sm
//   "
//               >
//                 <SelectValue placeholder="เลือกตำแหน่งผู้ใช้" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="ADMIN">แอดมิน</SelectItem>
//                 <SelectItem value="USER">ผู้ใช้</SelectItem>
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
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUser } from "@/lib/database/users";
import { PencilEdit02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import toast from "react-hot-toast";

export function EditButton({ user }: { user: Users }) {
  const [selectedRole, setSelectedRole] = useState<"USER" | "ADMIN">(user.role);

  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const point = Number(formData.get("points") || 0);
    const totalTopup = Number(formData.get("totalPoints") || 0);
    const role = selectedRole;

    toast.promise(
      updateUser({
        id: user.id,
        points: point,
        totalPoints: totalTopup,
        role,
      }),
      {
        loading: "กำลังอัพเดทผู้ใช้...",
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
          <DialogTitle>แก้ไขผู้ใช้</DialogTitle>
          <DialogDescription>
            เปลี่ยนแปลงรายละเอียดของผู้ใช้รายนี้
          </DialogDescription>
        </DialogHeader>

        {/* ใช้ onSubmit แทน action (เพราะเป็น client) */}
        <form onSubmit={handleEdit} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">ชื่อผู้ใช้</Label>
            <Input id="name" defaultValue={user.username} disabled />
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

          <div className="grid gap-3">
            <Label htmlFor="role">ตำแหน่งของผู้ใช้</Label>
            <Select
              value={selectedRole}
              onValueChange={(val: "USER" | "ADMIN") => setSelectedRole(val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="เลือกตำแหน่งผู้ใช้" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">แอดมิน</SelectItem>
                <SelectItem value="USER">ผู้ใช้</SelectItem>
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
