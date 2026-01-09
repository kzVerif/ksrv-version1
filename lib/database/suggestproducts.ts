"use server";

import { revalidatePath } from "next/cache";
import prisma from "./conn";
import { requireUser } from "../requireUser";
import { requireAdmin } from "../requireAdmin";

export interface suggestProducts {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    image: string | null;
    detail: string | null;
    price: number;
    categoriesId: string;
    remain: number;
  };
}

export async function getAllSuggestProducts() {
  try {
    const suggests = await prisma.suggestProducts.findMany({
      include: {
        product: {
          include: {
            stocks: true, // ⬅️ ดึง stocks มาด้วย
          },
        },
      },
    });

    const plainSuggests = suggests.map((item) => {
      const availableStock = item.product.stocks.filter(
        (s) => s.status === "AVAILABLE"
      ).length;

      return {
        ...item,
        product: {
          ...item.product,
          price: Number(item.product.price),
          remain: availableStock, // ⬅️ เพิ่มสต็อกคงเหลือ
        },
      };
    });

    return plainSuggests;
  } catch (error) {
    console.log("getAllSuggestProducts Error:", error);
    return [];
  }
}

export async function addSuggestProducts(id: string) {
  try {
       const canUse =  await requireAdmin();
   if (canUse) {
    return null
   }

    await prisma.suggestProducts.create({
      data: {
        productId: id,
      },
    });
    revalidatePath("/admin/suggestproducts");
    revalidatePath("/");
  } catch (error) {
    console.log("addSuggestProducts Error: ",error);
    throw new Error("เกิดข้อผิดพลาดจากะรบบ")
    
  }
}

export async function DeleteSuggestProduct(id: string) {
  try {
       const canUse =  await requireAdmin();
   if (canUse) {
    return null
   }

    await prisma.suggestProducts.delete({
      where: {
        id: id
      }
    })
    revalidatePath("/admin/suggestproducts")
    revalidatePath("/")
  } catch (error) {
    console.log("DeleteSuggestProduc: ",error);
    throw new Error("เกิดข้อผิดพลากจากระบบ")
    
  }
}
