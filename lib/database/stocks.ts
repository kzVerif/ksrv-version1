"use server";
import { Stocks } from "@/app/(admin)/admin/products/[id]/columns";
import prisma from "./conn";
import { revalidatePath } from "next/cache";

export async function getStocksByProductId(id: string) {
  try {
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
    await prisma.stocks.update({
      where: { id: data.id },
      data: {
        detail: data.detail,
        status: data.status,
        productId: data.productId,
      },
    });
    revalidatePath(`/admin/products/${data.productId}`);
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
    await prisma.stocks.createMany({
      data: data,
    });
    revalidatePath(`/admin/products/${data[0].productId}`);
  } catch (error) {
    console.log("addStocks Error: ", error);
    throw new Error("เกิดข้อผิดพลาดจากะรบบ");
  }
}

