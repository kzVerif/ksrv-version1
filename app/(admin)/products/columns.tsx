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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: string;
  name: string;
  price: number;
  image: string;
  detail: string;
  stock: number;
  sold: number;
  category: string
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "name",
    header: "ชื่อสินค้า",
  },
  {
    accessorKey: "price",
    header: "ราคา",
  },
  {
    accessorKey: "stock",
    header: "คงเหลือ",
  },
  {
    accessorKey: "category",
    header: "หมวดหมู่",
  },
  {
    id: "actions",
    header: "จัดการ",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex gap-2">
          <EditProductButton product={product} />
          {/* 3. ใช้ product.id เพื่อความชัดเจน (แทน row.id) */}
          <Link href={`/products/${product.id}`}>
            <Button variant="outline" className="cursor-pointer">
              {" "}
              {/* 4. เปลี่ยนไปใช้ไอคอน Package */}
              <HugeiconsIcon icon={PackageReceive01Icon} />
            </Button>
          </Link>
          <DeleteProductButton id={product.id} />
        </div>
      );
    },
  },
];