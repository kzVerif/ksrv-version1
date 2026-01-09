"use server";

import { requireAdmin } from "../requireAdmin";
import prisma from "./conn";

export async function getTopupCode() {
  let code = await prisma.topupCode.findFirst();
  if (!code) {
    await prisma.topupCode.create({
      data: {
        id: "main",
        available: false,
      },
    });
    code = await prisma.topupCode.findFirst();
  }

  if (!code) {
    return { available: false };
  }
  return code;
}

export async function updateTopupCode(data: { available: boolean }) {
      const canUse = await requireAdmin();
  if (!canUse) {
    return {
      success: false,
      message: "ไม่สำเร็จ"
    }
  }

  const updatedCode = await prisma.topupCode.update({
    where: { id: "main" },
    data: {
      available: data.available,
    },
  });
  return updatedCode;
}
