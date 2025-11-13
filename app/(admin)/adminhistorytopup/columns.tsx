"use client";

import { ViewHistoryBuyButton } from "@/components/Admin/Historybuy/ViewHistoryBuyButton";
import { DeleteHistoryTopupButton } from "@/components/Admin/็Historytopup/DeleteHistoryTopupButton";
import { ViewHistoryTopupButton } from "@/components/Admin/็Historytopup/ViewHistoryTopupButton";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AdminTopupHis = {
  id: string;
  refId: string;
  type: string;
  reason: string;
  time: string;
  owner: string;
  amount: number;
};

export const columns: ColumnDef<AdminTopupHis>[] = [
  {
    accessorKey: "refId",
    header: "รหัสอ้างอิง",
  },
  {
    accessorKey: "owner",
    header: "ผู้ใช้",
  },
  {
    accessorKey: "amount",
    header: "จำนวนเงิน",
  },
  {
    id: "type",
    header: "ประเภท",
    cell: ({ row }) => {
      const { type } = row.original;

      return type === "TrueMoney" ? (
        <Badge variant="secondary" className="bg-amber-600 text-white">
          {type}
        </Badge>
      ) : (
        <Badge variant="default" className="bg-blue-500 text-white">
          {type}
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
