"use server";

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
  return code;
}

export async function updateTopupCode(data: { available: boolean }) {
  const updatedCode = await prisma.topupCode.update({
    where: { id: "main" },
    data: {
      available: data.available,
    },
  });
  return updatedCode;
}
