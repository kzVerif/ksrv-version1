"use server";
import { requireUser } from "../requireUser";
import prisma from "./conn";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function getHistoryBuyByUserId(id: string) {
  try {
    await requireUser()
    const historyBuy = await prisma.historyBuy.findMany({
      where: { userId: id },
      include: {
        user: true,
        stock: true,
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Convert Decimal fields to numbers
    const serializedHistory = historyBuy.map((item) => ({
      ...item,
      user: {
        ...item.user,
        points: Number(item.user.points),
        totalPoints: Number(item.user.totalPoints),
      },
      product: {
        ...item.product,
        price: Number(item.product.price),
      },
    }));

    // console.log(serializedHistory);

    return serializedHistory;
  } catch (error) {
    console.error("getHistoryBuyByUserId Error:", error);
    return [];
  }
}

export async function getAllHistoryBuy() {
  try {
    await requireUser()
    const historyBuy = await prisma.historyBuy.findMany({
      include: {
        user: true,
        product: true,
        stock: true,
      },orderBy: {
        createdAt: "desc",
      }
    });
    const mappedData = historyBuy.map((item) => {
      return {
        ...item,
        user: {
          ...item.user,
          points: Number(item.user.points),
          totalPoints: Number(item.user.totalPoints),
        },
        product: {
          ...item.product,
          price: Number(item.product.price),
        },
        stock: {
          ...item.stock,
        },
      };
    });

    // แสดงผลลัพธ์
    // console.log(mappedData);

    return mappedData;
  } catch (error) {
    console.log("getAllHistoryBuy ERROR: ", error);
    return [];
  }
}

export async function getSOLDForDashboard() {
      // === วันนี้ (เวลาไทย) ===
      const startTodayTH = dayjs()
        .tz("Asia/Bangkok")
        .startOf("day")
        .utc()
        .toDate();
  
      const endTodayTH = dayjs()
        .tz("Asia/Bangkok")
        .endOf("day")
        .utc()
        .toDate();
  
      // === ต้นเดือน (เวลาไทย) ===
      const startMonthTH = dayjs()
        .tz("Asia/Bangkok")
        .startOf("month")
        .utc()
        .toDate();
        
      const endMonthTH = dayjs()
        .tz("Asia/Bangkok")
        .endOf("month")
        .utc()
        .toDate();
  try {
    await requireUser()


    const todaySOLD = await prisma.historyBuy.aggregate({
      _count: { _all: true },
      where: {
        createdAt: { gte: startTodayTH, lte: endTodayTH },
      },
    });

    const monthlySOLD = await prisma.historyBuy.aggregate({
      _count: { _all: true },
      where: {
        createdAt: { gte: startMonthTH, lte: endMonthTH },
      },
    });

    return {
      today: todaySOLD._count._all || 0,
      monthly: monthlySOLD._count._all || 0,
    };
  } catch (error) {
    console.error("getSOLDForDashboard Error:", error);
    return { today: 0, week: 0 };
  }
}

export async function getBestSellerProducts() {
  try {
    await requireUser()
    // จัดกลุ่มตาม productId แล้วนับจำนวนการซื้อ
    const bestSellers = await prisma.historyBuy.groupBy({
      by: ["productId"],
      _count: {
        productId: true,
      },
      orderBy: {
        _count: {
          productId: "desc",
        },
      },
      take: 5, // เอาแค่ 5 อันดับ
    });

    // เอา productId ไปดึงข้อมูลสินค้าอีกที
    const products = await Promise.all(
      bestSellers.map(async (item) => {
        const product = await prisma.products.findUnique({
          where: { id: item.productId },
        });

        if (!product) return null;

        return {
          ...product,
          price: Number(product.price), // ✅ แปลง Decimal → Number
          sold: item._count.productId,
        };
      })
    );

    return products;
  } catch (error) {
    console.error("getBestSellerProducts Error:", error);
    return [];
  }
}

export async function getLast7DaysDailyRevenue() {
  try {
    await requireUser()
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6); // รวมวันนี้เป็น 7 วัน

    // ดึง historyBuy ย้อนหลัง 7 วัน พร้อมราคาสินค้า
    const records = await prisma.historyBuy.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      include: {
        product: true, // จะได้ product.price มาเลย
      },
    });

    // สร้าง object เก็บยอดขายรายวัน
    const dailyRevenue: Record<string, number> = {};

    for (let i = 0; i < 7; i++) {
      const d = new Date(sevenDaysAgo);
      d.setDate(sevenDaysAgo.getDate() + i);
      const dateStr = d.toISOString().split("T")[0];
      dailyRevenue[dateStr] = 0;
    }

    // รวมยอดขายแต่ละวัน
    records.forEach((order) => {
      const dateStr = order.createdAt.toISOString().split("T")[0];
      const price = Number(order.product.price);

      if (dailyRevenue[dateStr] !== undefined) {
        dailyRevenue[dateStr] += price;
      }
    });

    // แปลงเป็น array พร้อมใช้งาน
    const result = Object.entries(dailyRevenue).map(([date, revenue]) => ({
      date,
      revenue,
    }));

    return result;
  } catch (error) {
    console.error("getLast7DaysDailyRevenue Error:", error);
    return [];
  }
}

