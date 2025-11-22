"use server";
import { revalidatePath } from "next/cache";
import prisma from "./conn";
export interface Categories {
  id: string;
  name: string;
  image: string | null;
}

export async function getCategories() {
  try {
    const categories = await prisma.categories.findMany({
      include: {
        products: true,
      },
    });
    const plainCategories = categories.map((item) => ({
      ...item,
      products: item.products.map((p) => ({
        ...p,
        price: Number(p.price),
      })),
    }));
    // console.log(plainCategories);
    
    return plainCategories;
  } catch (error) {
    console.log("getCategories Error: ", error);
    return [];
  }
}

export async function createCategory(data: Categories) {
  try {
    const updated = await prisma.categories.create({
      data: {
        name: data.name,
        image: data.image,
      },
    });
    revalidatePath("/admin/categories");
    revalidatePath("/admin/suggestproducts");
    revalidatePath("/categories");
    revalidatePath("/");
    return updated;
  } catch (error) {
    console.log("CreateCategory Error: ", error);
    throw new Error("เกิดข้อผิดพลากจากระบบ");
  }
}

export async function deleteCategory(id: string) {
  try {
    const deleted = await prisma.categories.delete({
      where: { id: id },
    });
    revalidatePath("/admin/categories");
    revalidatePath("/admin/suggestproducts");
    revalidatePath("/categories");
    revalidatePath("/");
    return deleted;
  } catch (error) {
    console.log("deleteCategory Error: ", error);
    throw new Error("เกิดข้อผิดพลากจากระบบ");
  }
}

export async function updateCategory(data: Categories) {
  try {
    const updated = await prisma.categories.update({
      where: { id: data.id },
      data: {
        name: data.name,
        image: data.image,
      },
    });
    revalidatePath("/admin/categories");
    revalidatePath("/admin/suggestproducts");
    revalidatePath("/categories");
    revalidatePath("/");
    return updated;
  } catch (error) {
    console.log("updateCategory Error: ", error);
    throw new Error("เกิดข้อผิดพลาดจากระบบ");
  }
}

export async function getCategoriesById(id: string) {
  try {
    const category = await prisma.categories.findUnique({
      where: {
        id: id
      }
    })
    return category
  } catch (error) {
    console.log("getCategoriesById Error");
    return {
      id: "",
      name: "ไม่พบหมวดหมู่ที่ระบุ",
      image: ""
    }
    
  }
}
