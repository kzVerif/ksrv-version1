"use client";

import { ViewHistoryTopupButton } from "@/components/Admin/็Historytopup/ViewHistoryTopupButton";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AdminTopupHis = {
  id: string;
  amount: number;
  reason: string;
  topupType: string;
  createdAt: Date;
  userId: string;
  user: {
    id: string;
    username: string;
    password: string;
    role: string;
    points: number;
    totalPoints: number;
  };
};

export const columns: ColumnDef<AdminTopupHis>[] = [
  {
    accessorKey: "id",
    header: "รหัสการเติมเงิน",
  },
  {
    accessorFn: (row) => row.user.username,
    header: "ผู้ใช้",
  },
  {
    accessorKey: "amount",
    header: "จำนวนเงิน",
  },
  {
    id: "topupType",
    header: "ประเภท",
    cell: ({ row }) => {
      const { topupType } = row.original;

      if (topupType === "Admin") {
        return (
          <Badge variant="destructive" className="bg-red-600 text-white">
            {topupType}
          </Badge>
        );
      }

      if (topupType === "Truemoney") {
        return (
          <Badge variant="secondary" className="bg-amber-600 text-white">
            {topupType}
          </Badge>
        );
      }

      return (
        <Badge variant="default" className="bg-blue-500 text-white">
          {topupType}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "จัดการ",
    cell: ({ row }) => {
      const topupHis = row.original;
      return (
        <div className="flex gap-2">
          <ViewHistoryTopupButton topupHis={topupHis} />
        </div>
      );
    },
  },
];
