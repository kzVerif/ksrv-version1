"use server";
import { revalidatePath } from "next/cache";
import prisma from "./conn";
import { sendDiscordWebhook } from "../Discord/discord";
import { requireUser } from "../requireUser";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { HTMLFilter } from "../htmlFilter";
import { subDays } from "date-fns";
import { requireAdmin } from "../requireAdmin";
// import DOMPurify from "isomorphic-dompurify";

export interface productData {
  name: string;
  image: string;
  detail: string;
  price: number;
  categoriesId: string;
}

export interface updateProduct {
  id: string;
  name: string;
  image: string;
  detail: string;
  price: number;
  categoriesId: string;
}

export async function getProductByCategory(id: string) {
  try {
    const products = await prisma.products.findMany({
      where: {
        categoriesId: id,
      },
      include: {
        stocks: {
          where: {
            status: "AVAILABLE",
          },
          select: {
            id: true,
            status: true,
          },
        },
      },
    });
    const plainProducts = products.map((item) => ({
      ...item,
      price: Number(item.price),
    }));
    return plainProducts;
  } catch (error) {
    console.log("getProductByCategory Error: ", error);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.products.findUnique({
      where: { id },
      include: {
        stocks: {
          where: { status: "AVAILABLE" },
        },
      },
    });

    if (!product) return null;

    return {
      ...product,
      price: Number(product.price),
    };
  } catch (error) {
    console.log("getProductById Error:", error);
    return null;
  }
}

export async function getAllProducts() {
  try {
    const products = await prisma.products.findMany({
      include: {
        categories: true,
        _count: {
          select: {
            stocks: {
              where: {
                status: "AVAILABLE",
              },
            },
          },
        },
      },
    });

    const categories = await prisma.categories.findMany();

    const plainProducts = products.map((item) => ({
      ...item,
      price: Number(item.price),
      remain: item._count.stocks,
      allCategories: categories, // จำนวนสต็อกคงเหลือของสินค้านั้น
    }));

    return plainProducts;
  } catch (error) {
    console.log("getAllProducts Error: ", error);
    return [];
  }
}

export async function updateProduct(data: updateProduct) {
  try {
    const canUse = await requireAdmin();
    if (!canUse) {
      return {
        success: false,
        message: "ไม่สำเร็จ",
      };
    }

    const safe = HTMLFilter(data.detail);
    data.detail = safe;
    await prisma.products.update({
      where: { id: data.id },
      data: {
        name: data.name,
        image: data.image,
        detail: data.detail,
        price: data.price,
        categoriesId: data.categoriesId,
      },
    });
    revalidatePath("/admin/products");
    revalidatePath("/admin/suggestproducts");
    revalidatePath(`/categories/${data.categoriesId}`);
    revalidatePath("/products");
    revalidatePath("/");
  } catch (error) {
    console.log("updateProduct Error: ", error);
    throw new Error("เกิดข้อผืดพลาดจากระบบ");
  }
}

export async function createProducts(data: productData) {
  try {
    const canUse = await requireAdmin();
    if (!canUse) {
      return {
        success: false,
        message: "ไม่สำเร็จ",
      };
    }

    const safe = HTMLFilter(data.detail);
    data.detail = safe;
    await prisma.products.create({
      data: {
        name: data.name,
        image: data.image,
        detail: data.detail,
        price: data.price,
        categoriesId: data.categoriesId,
      },
    });
    revalidatePath("/admin/products");
    revalidatePath("/admin/suggestproducts");
    revalidatePath(`/categories/${data.categoriesId}`);
    revalidatePath("/products");
    revalidatePath("/");
  } catch (error) {
    console.log("createProducts Error: ", error);
    throw new Error("เกิดข้อผิดพลากจากระบบ");
  }
}

export async function deleteProduct(id: string) {
  try {
    const canUse = await requireAdmin();
    if (!canUse) {
      return {
        success: false,
        message: "ไม่สำเร็จ",
      };
    }

    const product = await prisma.products.delete({
      where: { id: id },
    });
    revalidatePath("/admin/products");
    revalidatePath("/admin/suggestproducts");
    revalidatePath(`/categories/${product.categoriesId}`);
    revalidatePath("/products");
    revalidatePath("/");
  } catch (error) {
    console.log("deleteProduct Error: ", error);
    throw new Error("เกิดข้อผิดพลาดจากระบบ");
  }
}

export async function buyProducts(
  quantity: number,
  userId: string,
  productId: string,
) {
  // 1. Basic Input Validation
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return { status: false, message: "จำนวนสินค้าไม่ถูกต้อง" };
  }

  try {
    await requireUser();
    const session = await getServerSession(authOptions);

    if (!session || userId !== session.user.id) {
      return { status: false, message: "เซสชันไม่ถูกต้อง" };
    }

    // 2. ใช้ Transaction เพื่อความปลอดภัยของข้อมูล
    const result = await prisma.$transaction(async (tx) => {
      // ดึงข้อมูลผู้ใช้และสินค้าภายใน Transaction
      const user = await tx.users.findUnique({ where: { id: userId } });
      const product = await tx.products.findUnique({
        where: { id: productId },
      });

      if (!user || !product) {
        throw new Error("ไม่พบผู้ใช้หรือสินค้าที่ระบุ");
      }

      const totalPrice = Number(product.price) * quantity;

      // ตรวจสอบยอดเงิน
      if (totalPrice > Number(user.points)) {
        throw new Error("ยอดเงินของคุณไม่เพียงพอ");
      }

      // ดึง stocks และ Lock แถวไว้ (ถ้า DB รองรับ) เพื่อป้องกันการซื้อซ้ำ
      const stocks = await tx.stocks.findMany({
        where: {
          productId: productId,
          status: "AVAILABLE",
        },
        take: quantity,
      });

      if (stocks.length < quantity) {
        throw new Error("สินค้าหมดหรือมีไม่เพียงพอ");
      }

      const stockIds = stocks.map((s) => s.id);

      // เริ่มการ Update ข้อมูล
      // A: อัปเดตสถานะสต็อก
      await tx.stocks.updateMany({
        where: { id: { in: stockIds } },
        data: { status: "SOLD" },
      });

      // B: สร้างประวัติการซื้อ
      await tx.historyBuy.createMany({
        data: stockIds.map((id) => ({
          userId,
          stockId: id,
          productId,
        })),
      });

      // C: ลด Points ผู้ใช้
      const updatedUser = await tx.users.update({
        where: { id: userId },
        data: { points: { decrement: totalPrice } }, // ใช้ decrement เพื่อความแม่นยำ
      });

      // ตรวจสอบ Point อีกรอบหลังหัก (Double Check)
      if (Number(updatedUser.points) < 0) {
        throw new Error("ยอดเงินไม่เพียงพอหลังทำรายการ");
      }

      return { user, product, totalPrice };
    });

    // 3. แจ้งเตือน (ทำนอก Transaction เพื่อไม่ให้ DB รอ)
    await sendDiscordWebhook({
      username: "ระบบร้านค้า",

      embeds: [
        {
          title: "🛒 มีรายการสั่งซื้อสินค้า!",

          description: "มีผู้ใช้ทำการซื้อสินค้าในระบบ",

          color: 16312092,

          fields: [
            {
              name: "👤 ผู้ใช้",
              value: `${result.user.username}`,
              inline: true,
            },

            {
              name: "🛍️ สินค้า",
              value: `${result.product.name}`,
              inline: true,
            },

            { name: "🔢 จำนวน", value: `${quantity}`, inline: true },

            { name: "💵 ยอดชำระ", value: `${result.totalPrice} ฿` },

            { name: "⏳ เวลาทำรายการ", value: `${new Date()}` },
          ],

          footer: {
            text: "🛒 ระบบแจ้งเตือนการซื้อสินค้า",
          },
        },
      ],
    });
    // Revalidate paths...
    revalidatePath("/");
    // แนะนำให้ wrap revalidate ใน try/catch แยกหรือทำหลัง return

    return { status: true };
  } catch (error: any) {
    console.error("buyProducts Error:", error.message);
    return {
      status: false,
      message: error.message || "เกิดข้อผิดพลาดจากระบบ",
    };
  }
}
