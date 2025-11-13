"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BuyProduct = {
  id: string
  name: string
  detail: string
  time: string
}

export const columns: ColumnDef<BuyProduct>[] = [
  {
    accessorKey: "id",
    header: "รหัสสินค้า",
  },
  {
    accessorKey: "name",
    header: "ชื่อสินค้า",
  },
  {
    accessorKey: "detail",
    header: "รายละเอียด",
  },
  {
    accessorKey: "time",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-bold cursor-pointer"
      >
        วันที่ {column.getIsSorted() === "asc" ? "↑" : column.getIsSorted() === "desc" ? "↓" : ""}
      </button>
    ),
  },
]