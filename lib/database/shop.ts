"use server";
import { revalidatePath } from "next/cache";
import prisma from "./conn";
import { sendDiscordWebhook } from "../Discord/discord";
import { requireUser } from "../requireUser";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import DOMPurify from "isomorphic-dompurify";

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
    await requireUser();
    const safe = DOMPurify.sanitize(data.detail);
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
    await requireUser();
    const safe = DOMPurify.sanitize(data.detail);
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
    await requireUser();
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
  productId: string
) {
  await requireUser();
  const session = await getServerSession(authOptions);
  if (userId !== session?.user.id) {
    return {
      status: false,
      message: "ทำไรครับเนี่ย",
    };
  }
  try {
    const user = await prisma.users.findUnique({ where: { id: userId } });
    const product = await prisma.products.findUnique({
      where: { id: productId },
    });

    if (!user || !product) {
      return {
        status: false,
        message: "ไม่พบผู้ใช้หรือสินค้าที่ระบุ",
      };
    }

    const totalPrice = Number(product.price) * quantity;

    if (totalPrice > Number(user.points)) {
      return {
        status: false,
        message: "ยอดเงินของคุณไม่เพียงพอ กรุณาเติมเงิน",
      };
    }

    // 1️⃣ ดึง stocks ที่ว่าง
    const stocks = await prisma.stocks.findMany({
      where: {
        productId: productId,
        status: "AVAILABLE",
      },
      take: quantity,
    });

    if (stocks.length < quantity) {
      return {
        status: false,
        message: "จำนวนสินค้าที่ต้องการซื้อมีไม่เพียงพอ",
      };
    }

    // 2️⃣ อัปเดต stocks เป็น SOLD
    await prisma.stocks.updateMany({
      where: { id: { in: stocks.map((s) => s.id) } },
      data: { status: "SOLD" },
    });

    // 3️⃣ สร้าง historyBuy
    await prisma.historyBuy.createMany({
      data: stocks.map((s) => ({
        userId,
        stockId: s.id,
        productId,
      })),
    });

    // 4️⃣ ลด points ของ user
    await prisma.users.update({
      where: { id: userId },
      data: { points: Number(user.points) - totalPrice },
    });

    await sendDiscordWebhook({
      username: "ระบบร้านค้า",
      embeds: [
        {
          title: "🛒 มีรายการสั่งซื้อสินค้า!",
          description: "มีผู้ใช้ทำการซื้อสินค้าในระบบ",
          color: 16312092,
          fields: [
            { name: "👤 ผู้ใช้", value: `${user.username}`, inline: true },
            { name: "🛍️ สินค้า", value: `${product.name}`, inline: true },
            { name: "🔢 จำนวน", value: `${quantity}`, inline: true },
            { name: "💵 ยอดชำระ", value: `${totalPrice} ฿` },
            { name: "⏳ เวลาทำรายการ", value: `${new Date()}` },
          ],
          footer: {
            text: "🛒 ระบบแจ้งเตือนการซื้อสินค้า",
          },
        },
      ],
    });
    revalidatePath("/admin/products");
    revalidatePath("/admin/suggestproducts");
    revalidatePath(`/categories/${product.categoriesId}`);
    revalidatePath("/products");
    revalidatePath("/");
    return {
      status: true,
    };
  } catch (error: any) {
    console.log("buyProducts Error:", error.message || error);
    return {
      status: false,
      message: "เกิดข้อผิดพลากจากระบบ",
    };
  }
}
