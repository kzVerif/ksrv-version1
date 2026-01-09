"use client";

import { DeleteButton } from "@/components/Admin/Users/DeleteButton";
import { EditButton } from "@/components/Admin/Users/EditButton";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Users = {
  id: string;
  username: string;
  points: number;
  totalPoints: number;
  role: "USER" | "ADMIN";
};

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "points",
    header: "Point",
  },
  {
    accessorKey: "totalPoints",
    header: "ยอดเติมสะสม",
  },
  {
    accessorKey: "role",
    header: "ยศ",
    cell: ({ row }) => {
      const user = row.original;
      const role = user.role === "ADMIN" ? "แอดมิน" : "ผู้ใช้";
      return (
        <div className="flex gap-2">
          <p>{role}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "จัดการ",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex gap-2">
          <EditButton user={user} />
          <DeleteButton id={user.id} />
        </div>
      );
    },
  },
];
