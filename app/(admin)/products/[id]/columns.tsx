"use client";

// import { DeleteButton } from "@/components/Admin/Users/DeleteButton"; // (คอมเมนต์นี้ถูกลบไปแล้วในโค้ดของคุณ)
import { EditProductButton } from "@/components/Admin/Products/EditProductButton";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteProductButton } from "@/components/Admin/Products/DeleteProductButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// 1. ลบ import ของ @hugeicons
import { HugeiconsIcon } from "@hugeicons/react";
import { PackageReceive01Icon } from "@hugeicons/core-free-icons";
import { EditStockButton } from "@/components/Admin/Products/Stock/EditStockButton";
import { Badge } from "@/components/ui/badge";
import { DeleteStockButton } from "@/components/Admin/Products/Stock/DeleteStockButton";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Stocks = {
  id: string;
  detail: string;
  status: string;
};

export const columns: ColumnDef<Stocks>[] = [
  {
    accessorKey: "id",
    header: "รหัสสต็อคสินค้า",
  },
  {
    accessorKey: "detail",
    header: "รายละเอียด",
  },
  {
    id: "status",
    header: "สถานะ",
    cell: ({ row }) => {
      const { status } = row.original;

      return status === "จำหน่ายแล้ว" ? (
        <Badge variant="destructive">{status}</Badge>
      ) : (
        <Badge variant="default" className="bg-emerald-500 text-white">
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "จัดการ",
    cell: ({ row }) => {
      const stock = row.original;
      return (
        <div className="flex gap-2">
          <EditStockButton stock={stock} />
          <DeleteStockButton id={stock.id} />
        </div>
      );
    },
  },
];
