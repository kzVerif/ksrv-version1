"use server"
import { requireAdmin } from "../requireAdmin";
import prisma from "./conn";
export interface Wallet {
  id: string;
  feeAvailable: boolean;
  available: boolean;
  phone: string;
}
export async function getWalletTopup() {
  try {
    const wallet = await prisma.topupTruemoney.findFirst();
    if (!wallet) {
      return {
        id: "",
        phone: "ยังไม่ได้ตั้งค่า",
        feeAvailable: false,
        available: false,
      };
    }
    return wallet;
  } catch (error) {
    console.log("getWalletTopup Error: ", error);
    return {
      id: "",
      phone: "ยังไม่ได้ตั้งค่า",
      feeAvailable: false,
      available: false,
    };
  }
}

export async function updateWalletTopup(data: Wallet) {
  try {
       const canUse =  await requireAdmin();
   if (canUse) {
    return null
   }

    const wallet = await getWalletTopup();
    if (wallet.id === "") {
      throw new Error("ไม่พบการตั้งค่า");
    }
    const updated = await prisma.topupTruemoney.update({
      where: { id: wallet.id },
      data: {
        feeAvailable: data.feeAvailable,
        available: data.available,
        phone: data.phone,
      },
    });
    return updated;
  } catch (error) {
    console.log("updateWakketTopup Error: ", error);
    throw new Error("เกิดข้อผืดพลากจากระบบ");
  }
}
