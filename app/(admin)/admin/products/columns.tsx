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
  image: string | null;
  detail: string | null;
  price: number;
  remain: number;
  categoriesId: string;
  categories: {
    id: string;
    name: string;
    image: string | null;
  };
  allCategories: {
    id: string;
    name: string;
    image: string | null;
  }[];
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
    accessorKey: "remain",
    header: "คงเหลือ",
  },
  {
    accessorFn: (row) => row.categories.name,
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
          <Link href={`/admin/products/${product.id}`}>
            <Button variant="outline" className="cursor-pointer">
              <HugeiconsIcon icon={PackageReceive01Icon} />
            </Button>
          </Link>
          <DeleteProductButton id={product.id} />
        </div>
      );
    },
  },
];
