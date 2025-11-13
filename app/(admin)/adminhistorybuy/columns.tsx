"use client";

import { ViewHistoryBuyButton } from "@/components/Admin/Historybuy/ViewHistoryBuyButton";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AdminBuyProduct = {
  id: string;
  name: string;
  detail: string;
  time: string;
  owner: string;
};

export const columns: ColumnDef<AdminBuyProduct>[] = [
  {
    accessorKey: "id",
    header: "รหัสสินค้า",
  },
  {
    accessorKey: "name",
    header: "ชื่อสินค้า",
  },
  {
    accessorKey: "owner",
    header: "ผู้ซื้อ",
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
  {
    id: "actions",
    header: "จัดการ",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex gap-2">
          <ViewHistoryBuyButton product={product} />
          {/* 3. ใช้ product.id เพื่อความชัดเจน (แทน row.id) */}
          {/* <DeleteProductButton id={product.id} /> */}
        </div>
      );
    },
  },
];
