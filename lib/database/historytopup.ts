"use server";
import { requireUser } from "../requireUser";
import prisma from "./conn";

export async function getHistoryTopupByUserId(id: string) {
  try {
    await requireUser()
    const historytopup = await prisma.historyTopup.findMany({
      where: { userId: id },
      orderBy: {
        createdAt: "desc",
      }
    })

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
    await requireUser()
    const historyTopup = await prisma.historyTopup.findMany({
      include: {
        user: true,
      },orderBy: {
        createdAt: "desc",
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


    return mapHistoryTopup
  } catch (error) {
    console.error("getAllHistoryTopup Error:", error);
    return [];
  }
}

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function getTopupForDashboard() {
  try {
    await requireUser();

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

    // ยอดเติมเงินวันนี้
    const todayTopup = await prisma.historyTopup.aggregate({
      _sum: { amount: true },
      where: {
        createdAt: {
          gte: startTodayTH,
          lte: endTodayTH,
        },
      },
    });

    // ยอดเติมเงินเดือนนี้
    const monthlyTopup = await prisma.historyTopup.aggregate({
      _sum: { amount: true },
      where: {
        createdAt: {
          gte: startMonthTH,
        },
      },
    });

    return {
      today: todayTopup._sum.amount || 0,
      monthly: monthlyTopup._sum.amount || 0,
    };
  } catch (error) {
    console.error("getTopupForDashboard Error:", error);
    return { today: 0, monthly: 0 };
  }
}


// export async function getTopupForDashboard() {
//   try {
//     await requireUser()
//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // เริ่มต้นวัน

//     // ยอดเติมเงินวันนี้
//     const todayTopup = await prisma.historyTopup.aggregate({
//       _sum: {
//         amount: true,
//       },
//       where: {
//         createdAt: {
//           gte: today, // ตั้งแต่ 00:00 ของวันนี้
//         },
//       },
//     });

//     // ยอดเติมเงินสัปดาห์นี้ (เริ่มจากวันจันทร์)
//     const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
//     firstDayOfMonth.setHours(0, 0, 0, 0);

//     const monthlyTopup = await prisma.historyTopup.aggregate({
//       _sum: {
//         amount: true,
//       },
//       where: {
//         createdAt: {
//           gte: firstDayOfMonth,
//         },
//       },
//     });

//     return {
//       today: todayTopup._sum.amount || 0,
//       monthly: monthlyTopup._sum.amount || 0,
//     };
//   } catch (error) {
//     console.error("getTopupForDashboard Error:", error);
//     return { today: 0, week: 0 };
//   }
// }

