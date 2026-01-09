"use server";
import { revalidatePath } from "next/cache";
import prisma from "./conn";
import { requireUser } from "../requireUser";
import { requireAdmin } from "../requireAdmin";

export async function getAllCode() {
   const canUse = await requireAdmin();
  if (!canUse) {
    return[]
  }
  try {
    const codes = await prisma.code.findMany();
    const plainCodes = codes.map((code) => ({
      ...code,
      reward: Number(code.reward),
    }));
    return plainCodes;
  } catch (error) {
    console.log("getAllCode ", error);
    return [];
  }
}

export async function createCode(data: any) {
     const canUse = await requireAdmin();
  if (!canUse) {
    return {
      success: false,
      message: "ไม่สำเร็จ"
    }
  }

  try {
    await prisma.code.create({
      data: {
        name: data.name,
        key: data.key,
        maxUse: Number(data.maxUse),
        expired: data.expired,
        reward: Number(data.reward),
        canDuplicateUse: data.canDuplicateUse,
      },
    });
    revalidatePath("/admin/code");
    return {
      success: true,
      message: "สร้างโค้ดสำเร็จ",
    };
  } catch (error: any) {
    if (error.code === "P2002" && error.meta?.target?.includes("key")) {
      return { success: false, message: "มีีหัสโค้ดนี้แล้วในระบบ" };
    }
    console.log("createCode: ", error);
    return {
      success: false,
      message: "สร้างโค้ดไม่สำเร็จ",
    };
  }
}

export async function updateCode(data: any) {
     const canUse = await requireAdmin();
  if (!canUse) {
    return {
      success: false,
      message: "ไม่สำเร็จ"
    }
  }

  try {
    await prisma.code.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        key: data.key,
        maxUse: Number(data.maxUse),
        expired: data.expired,
        reward: Number(data.reward),
        canDuplicateUse: data.canDuplicateUse,
      },
    });
    revalidatePath("/admin/code");
    return {
      success: true,
      message: "อัพเดทโค้ดสำเร็จ",
    };
  } catch (error: any) {
    console.log("createCode: ", error);
    if (error.code === "P2002" && error.meta?.target?.includes("key")) {
      return { success: false, message: "มีรหัสโค้ดนี้แล้วในระบบ" };
    }
    return {
      success: true,
      message: "อัพเดทโค้ดไม่สำเร็จ",
    };
  }
}

export async function deleteCode(id: string) {
     const canUse = await requireAdmin();
  if (!canUse) {
    return {
      success: false,
      message: "ไม่สำเร็จ"
    }
  }
  try {
    await prisma.code.delete({
      where: {
        id,
      },
    });
    revalidatePath("/admin/code");
    return {
      success: true,
      message: "ลบโค้ดสำเร็จ",
    };
  } catch (error) {
    console.log("deleteCode", error);

    return {
      success: true,
      message: "ลบโค้ดไม่สำเร็จ",
    };
  }
}
