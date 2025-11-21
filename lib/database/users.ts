"use server";
import { revalidatePath } from "next/cache";
import prisma from "./conn";
import bcrypt from "bcrypt";
import { walletTopup } from "../Topup/wallet";
import { TopupBank } from "../Topup/bank";
import { sendDiscordWebhook } from "../Discord/discord";

interface authData {
  username: string;
  password: string;
}

export async function createUser(userData: authData) {
  try {
    const hashPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.users.create({
      data: {
        username: userData.username,
        password: hashPassword,
        points: 0, // ใส่ 0 ให้ Decimal
        totalPoints: 0, // ใส่ 0 ให้ Decimal
      },
    });

    await sendDiscordWebhook({
      username: "ระบบแจ้งเตือน",
      embeds: [
        {
          title: "👤 สมาชิกใหม่!",
          description: "มีผู้ใช้ใหม่สมัครสมาชิกบนระบบของคุณ",
          color: 3900991,
          fields: [
            { name: "📛 ชื่อผู้ใช้", value: `${user.username}`, inline: true },
            { name: "🆔 User ID", value: `${user.id}`, inline: true },
            { name: "📅 วันที่", value: `${new Date()}` },
          ],
          footer: {
            text: "🚀 ระบบแจ้งเตือนสมาชิกใหม่",
          },
        },
      ],
    });

    const plainUser = {
      ...user,
      points: Number(user.points),
      totalPoints: Number(user.totalPoints),
    };

    return { success: true, user: plainUser };
  } catch (error: any) {
    if (error.code === "P2002" && error.meta?.target?.includes("username")) {
      return { success: false, message: "มีผู้ใช้นี้แล้วในระบบ" };
    }

    console.error("Create user error:", error);
    throw new Error("เกิดข้อผิดพลาดจากระบบ");
  }
}

export async function Login(userData: any) {
  try {
    const user = await prisma.users.findUnique({
      where: {
        username: userData.username,
      },
    });

    if (!user) {
      return {
        success: true,
        message: "ไม่พบผู้ใช้นี้ในระบบ",
      };
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) {
      return {
        success: true,
        message: "รหัสผ่านไม่ถูกต้อง",
      };
    }
    const plainUser = {
      ...user,
      points: Number(user.points),
      totalPoints: Number(user.totalPoints),
    };

    return {
      success: true,
      user: plainUser,
    };
  } catch (error: any) {
    console.error("Login error:", error);
    return {
      success: false,
      message: error.message || "เกิดข้อผิดพลาดจากระบบ",
    };
  }
}

export async function ChangePassword(userData: {
  userId: string; // เรามั่นใจแล้วว่ามีค่ามาจาก frontend
  oldPassword: string;
  newPassword: string;
}) {
  try {
    const user = await prisma.users.findUnique({
      where: { id: userData.userId },
    });

    if (!user) {
      throw new Error("ไม่พบผู้ใช้");
    }

    const isMatch = await bcrypt.compare(userData.oldPassword, user.password);
    if (!isMatch) {
      throw new Error("รหัสผ่านเดิมไม่ถูกต้อง");
    }

    // --- (ปรับปรุงจุดนี้) ---
    // ป้องกันการใช้รหัสเดิม (แบบที่รัดกุมกว่า)
    // โดยเทียบรหัสใหม่กับ hash ของรหัสเก่าใน DB
    const isSamePassword = await bcrypt.compare(
      userData.newPassword,
      user.password
    );
    if (isSamePassword) {
      throw new Error("รหัสผ่านใหม่ต้องไม่เหมือนรหัสผ่านเดิม");
    }
    // ---

    const hashedPassword = await bcrypt.hash(userData.newPassword, 10);

    await prisma.users.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return { success: true };
  } catch (error) {
    console.error("Change Password Error:", error);

    // --- (แก้ไขจุดนี้) ---
    // โยน error ต่อเพื่อให้ toast.promise รับได้
    if (error instanceof Error) {
      // โยน message ที่เรากำหนดเอง (เช่น "รหัสผ่านเดิมไม่ถูกต้อง")
      throw new Error(error.message);
    }

    // สำหรับ error ที่ไม่คาดคิดอื่นๆ (เช่น DB ล่ม)
    throw new Error("เกิดข้อผิดพลาดจากระบบ");
    // ---
  }
}

export async function getAllUsers() {
  try {
    const users = await prisma.users.findMany();
    if (!users) {
      return [];
    }
    const plainUsers = users.map((item) => ({
      ...item,
      points: Number(item.points),
      totalPoints: Number(item.totalPoints),
    }));
    return plainUsers;
  } catch (error) {
    console.log("getAllUsers Error: ", error);
    return [];
  }
}

interface updateUser {
  id: string;
  points: number;
  totalPoints: number;
  role: "ADMIN" | "USER"
}

export async function updateUser(data: updateUser) {
  try {
    await prisma.users.update({
      where: { id: data.id },
      data: {
        points: data.points,
        totalPoints: data.totalPoints,
        role: data.role
      },
    });
    revalidatePath("/admin/users");
  } catch (error) {
    console.log("updateUser Error: ", error);
    throw new Error("เกิดข้อผิดพลาดจากระบบ");
  }
}

export async function deleteUSer(id: string) {
  try {
    await prisma.users.delete({
      where: { id: id },
    });
    revalidatePath("/admin/users");
  } catch (error) {
    console.log("deleteUSer Error: ", error);
    throw new Error("เกิดข้อผิดพลากจากระบบ");
  }
}

export async function TopupByWallet(id: string | undefined, url: string) {
  const topupStatus = await walletTopup(url);
  try {
    if (!topupStatus.status || !id) {
      return {
        status: false,
        message: topupStatus.reason,
      };
      // throw new Error(topupStatus.reason);
    }

    const user = await prisma.users.update({
      where: { id: id },
      data: {
        points: {
          increment: topupStatus.amount,
        },
      },
    });

    await prisma.historyTopup.create({
      data: {
        amount: topupStatus.amount,
        topupType: "Truemoney",
        userId: id,
        reason: "เติมเงินจากระบบ",
      },
    });

    await sendDiscordWebhook({
      username: "ระบบการเงิน",
      embeds: [
        {
          title: "💰 มีรายการเติมเงิน!",
          description: "ผู้ใช้ได้ทำการเติมเงินเข้าสู่ระบบ",
          color: 2299548,
          fields: [
            { name: "👤 ผู้ใช้", value: `${user.password}`, inline: true },
            { name: "🆔 User ID", value: `${user.id}`, inline: true },
            {
              name: "💵 จำนวนเงิน",
              value: `${topupStatus.amount} ฿`,
              inline: false,
            },
            {
              name: "📺 ช่องทางการเติมเงิน",
              value: `ทรูมันนี่วอลเลท(ซองอั่งเปา)`,
              inline: false,
            },
            { name: "⏳ เวลาทำรายการ", value: `${new Date()}` },
          ],
          footer: {
            text: "💸 ระบบแจ้งเตือนการเติมเงิน",
          },
        },
      ],
    });
  } catch (error) {
    console.log("Topup Error: ", error);
    return {
      status: false,
      message: topupStatus.reason ?? "เกิดข้อผิดพลาดจากระบบ",
    };
  }
}

export async function TopupByBank(id: string | undefined, file: File) {
  const res = await TopupBank(file);

  if (!res || !id) {
    return {
      status: false,
      message: res.message,
    };
  }

  if (res.code !== "200000") {
    return {
      status: false,
      message: res.message,
    };
  }

  try {
    const user = await prisma.users.update({
      where: { id },
      data: {
        points: { increment: res.data.amount },
      },
    });

    await prisma.historyTopup.create({
      data: {
        amount: res.data.amount,
        reason: "เติมเงินจากระบบ",
        topupType: "Bank",
        userId: id,
      },
    });

    await sendDiscordWebhook({
      username: "ระบบการเงิน",
      embeds: [
        {
          title: "💰 มีรายการเติมเงิน!",
          description: "ผู้ใช้ได้ทำการเติมเงินเข้าสู่ระบบ",
          color: 2299548,
          fields: [
            { name: "👤 ผู้ใช้", value: `${user.password}`, inline: true },
            { name: "🆔 User ID", value: `${user.id}`, inline: true },
            {
              name: "💵 จำนวนเงิน",
              value: `${res.data.amount} ฿`,
              inline: false,
            },
            {
              name: "📺 ช่องทางการเติมเงิน",
              value: `ธนาคาร(เช็คสลิป)`,
              inline: false,
            },
            { name: "⏳ เวลาทำรายการ", value: `${new Date()}` },
          ],
          footer: {
            text: "💸 ระบบแจ้งเตือนการเติมเงิน",
          },
        },
      ],
    });
  } catch (error) {
    console.log("TopupByBank DB Error:", error);
    return {
      status: false,
      message: res.message ?? "เกิดข้อผิดพลาดจากระบบ",
    };
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.users.findUnique({
      where: { id: id },
    });

    const plainUser = {
      id: user?.id,
      username: user?.username,
      role: user?.role,
      points: Number(user?.points),
      totalPoints: Number(user?.totalPoints),
    };
    return plainUser;
  } catch (error) {
    console.log("getUserById: ", error);
    return {
      id: "",
      username: "",
      role: "",
      points: 0,
      totalPoints: 0,
    };
  }
}
