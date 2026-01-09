"use server";
import { revalidatePath } from "next/cache";
import prisma from "./conn";
import { requireUser } from "../requireUser";
import { requireAdmin } from "../requireAdmin";

export async function addSuggestCategories(id: string) {
  try {
       const canUse =  await requireAdmin();
   if (canUse) {
    return null
   }

    await prisma.suggestCategories.create({
      data: {
        categoriesId: id,
      },
    });
    revalidatePath("/admin/suggestproducts");
    revalidatePath("/");
  } catch (error) {
    console.log("addSuggestCategories Error: ", error);
    throw new Error("เกิดข้อผิดพลากจากระบบ");
  }
}

export async function getAllSuggestCategories() {
  try {
    const suggestCategories = await prisma.suggestCategories.findMany({
      include: {
        category: {
          include: {
            products: true, // 👈 ดึงสินค้าทั้งหมดในหมวดหมู่
          },
        },
      },
    });
    const plainCategories = suggestCategories.map((item) => ({
      ...item,
      amount: item.category.products.length, // 🍀 นับจำนวนสินค้า
    }));    
    return plainCategories
  } catch (error) {
    console.log("getAllSuggestCategories Error:", error);
    return [];
  }
}

export async function deleteSuggestCategories(id: string) {
  try {
       const canUse =  await requireAdmin();
   if (canUse) {
    return null
   }

    await prisma.suggestCategories.delete({
      where: { id: id },
    });
    revalidatePath("/admin/suggestproducts")
    revalidatePath("/")
  } catch (error) {
    console.log("deleteSuggestCategories Error: ", error);
    throw new Error("เกิดข้อผิดพลากจากระบบ");
  }
}
