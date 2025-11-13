"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TopupHis = {
  id: string;
  refId: string;
  type: string;
  status: string;
  reason: string;
  time: string;
  amount: number;
};

export const columns: ColumnDef<TopupHis>[] = [
  {
    accessorKey: "refId",
    header: "รหัสอ้างอิง",
  },
  {
    accessorKey: "amount",
    header: "จำนวนเงิน",
  },
  {
    accessorKey: "reason",
    header: "หมายเหตุ",
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
    accessorKey: "time",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-bold cursor-pointer"
      >
        วันที่{" "}
        {column.getIsSorted() === "asc"
          ? "↑"
          : column.getIsSorted() === "desc"
          ? "↓"
          : ""}
      </button>
    ),
  },
];
