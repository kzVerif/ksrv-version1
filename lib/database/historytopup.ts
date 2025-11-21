"use server";
import prisma from "./conn";

export async function getHistoryTopupByUserId(id: string) {
  try {
    const historytopup = await prisma.historyTopup.findMany({
      where: { userId: id },
    });

    const plainHistoryTopup = historytopup.map(item => ({
      ...item,
      amount: Number(item.amount),
    }));
    return plainHistoryTopup;
  } catch (error) {
    console.error("getHistoryTopupByUserId Error:", error);
    return [];
  }
}


export async function getAllHistoryTopup() {
  try {
    const historyTopup = await prisma.historyTopup.findMany({
      include: {
        user: true,
      }
    })
    const mapHistoryTopup = historyTopup.map((item) => {
      return {
        ...item,
        amount: Number(item.amount),
        user: {
          ...item.user,
          points: Number(item.user.points),
          totalPoints: Number(item.user.totalPoints)
        }
      }
    })

    // console.log(mapHistoryTopup);
    

    return mapHistoryTopup
  } catch (error) {
    console.error("getAllHistoryTopup Error:", error);
    return [];
  }
}

export async function getTopupForDashboard() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // เริ่มต้นวัน

    // ยอดเติมเงินวันนี้
    const todayTopup = await prisma.historyTopup.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        createdAt: {
          gte: today, // ตั้งแต่ 00:00 ของวันนี้
        },
      },
    });

    // ยอดเติมเงินสัปดาห์นี้ (เริ่มจากวันจันทร์)
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    firstDayOfMonth.setHours(0, 0, 0, 0);

    const monthlyTopup = await prisma.historyTopup.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        createdAt: {
          gte: firstDayOfMonth,
        },
      },
    });

    return {
      today: todayTopup._sum.amount || 0,
      monthly: monthlyTopup._sum.amount || 0,
    };
  } catch (error) {
    console.error("getTopupForDashboard Error:", error);
    return { today: 0, week: 0 };
  }
}

