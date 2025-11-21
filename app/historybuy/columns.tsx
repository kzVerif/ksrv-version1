"use client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type BuyProduct = {
  id: string;
  productId: string;
  stockId: string;
  userId: string;
  createdAt: Date;
  product: {
    categoriesId: string;
    detail: string | null;
    id: string;
    image: string | null;
    name: string;
    price: number;
  };
  stock: {
    id: string;
    detail: string;
    status: string;
    productId: string;
  };
  user: {
    id: string;
    password: string;
    points: number;
    role: string;
    totalPoints: number;
    username: string;
  };
};

export const columns: ColumnDef<BuyProduct>[] = [
  {
    accessorKey: "id",
    header: "รหัสคำสั่งซื้อ",
  },
  {
    accessorFn: (row) => row.product.name,
    header: "ชื่อสินค้า",
  },
  {
    accessorFn: (row) => row.stock.detail,
    header: "รายละเอียด",
  },
  {
    accessorKey: "createdAt",
    header: (
      { column } // 👈 นี่คือส่วน header ที่คุณมีอยู่แล้ว
    ) => (
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
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = format(date, "dd/MM/yyyy HH:mm");
      return <div className="text-left">{formattedDate}</div>;
    },
  },
];
