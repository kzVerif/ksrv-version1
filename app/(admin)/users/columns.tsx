"use client";

import { DeleteButton } from "@/components/Admin/Users/DeleteButton";
import { EditButton } from "@/components/Admin/Users/EditButton";
import { Button } from "@/components/ui/button";
import { Delete02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Users = {
  id: string;
  username: string;
  point: number;
  totalTopup: number;
};

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "point",
    header: "Point",
  },
  {
    accessorKey: "totalTopup",
    header: "ยอดเติมสะสม",
  },
  {
    id: "actions",
    header: "จัดการ",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex gap-2">
          <EditButton user={user} />
          <DeleteButton id={row.id}/>
          {/* <Button
            variant={"destructive"}
            onClick={() => handleDelete(user)}
            className="cursor-pointer"
          >
            <HugeiconsIcon icon={Delete02Icon} size={24} />
          </Button> */}
        </div>
      );
    },
  },
];

function handleDelete(user: Users) {
  console.log("Delete user:", user);
  // ใส่ logic ลบ เช่น confirm แล้วลบจาก data
}
