"use server";
import { Stocks } from "@/app/(admin)/admin/products/[id]/columns";
import prisma from "./conn";
import { revalidatePath } from "next/cache";
import { requireUser } from "../requireUser";
import { requireAdmin } from "../requireAdmin";

export async function getStocksByProductId(id: string) {
  try {
    await requireUser()
    const stocks = await prisma.stocks.findMany({
      where: { productId: id },
    });
    if (!stocks) {
      return [];
    }
    return stocks;
  } catch (error) {
    console.log("getStocksByProductId Error: ", error);
    return [];
  }
}

export async function updateStocksById(data: Stocks) {
  try {
   const canUse = await requireAdmin();
  if (!canUse) {
    return {
      success: false,
      message: "ไม่สำเร็จ"
    }
  }

    await prisma.stocks.update({
      where: { id: data.id },
      data: {
        detail: data.detail,
        status: data.status,
        productId: data.productId,
      },
    });
    const product = await prisma.products.findUnique({
      where: {
        id: data.productId,
      },
    });
    revalidatePath(`/admin/products/${data.productId}`);
    revalidatePath("/admin/products");
    revalidatePath("/admin/suggestproducts");
    revalidatePath(`/categories/${product?.categoriesId}`);
    revalidatePath("/products");
    revalidatePath("/");
  } catch (error) {
    console.log("editStocksById Error: ", error);
    throw new Error("เกิดข้อผิดพลากจากระบบ");
  }
}

export type UpdatedStocks = {
  detail: string;
  status: "AVAILABLE" | "SOLD";
  productId: string;
};

export async function addStocks(data: UpdatedStocks[]) {
  try {
   const canUse = await requireAdmin();
  if (!canUse) {
    return {
      success: false,
      message: "ไม่สำเร็จ"
    }
  }

    await prisma.stocks.createMany({
      data: data,
    });
    revalidatePath(`/admin/products/${data[0].productId}`);
    revalidatePath("/admin/products");
    revalidatePath("/admin/suggestproducts");
    revalidatePath(`/categories/${data[0].productId}`);
    revalidatePath("/products");
    revalidatePath("/");
  } catch (error) {
    console.log("addStocks Error: ", error);
    throw new Error("เกิดข้อผิดพลาดจากะรบบ");
  }
}

export async function deleteStock(id: string) {
  try {
   const canUse = await requireAdmin();
  if (!canUse) {
    return {
      success: false,
      message: "ไม่สำเร็จ"
    }
  }

    const stock = await prisma.stocks.delete({
      where: {
        id: id
      }
    })
    revalidatePath("/admin/products");
    revalidatePath("/admin/suggestproducts");
    revalidatePath(`/admin/products/${stock.productId}`);
    revalidatePath("/products");
    revalidatePath("/");
    return {
      status: true,
      message: ""
    }

  } catch (error) {
    console.log("deleteStock: ",error);
    return {
      status: false,
      message: "เกิดข้อผิดพลาดจากระบบ"
    }
  }
}
