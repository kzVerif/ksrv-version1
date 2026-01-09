"use server";
import { revalidatePath } from "next/cache";
import prisma from "./conn";
import { getServerSession } from "next-auth";
import { requireAdmin } from "../requireAdmin";

export interface Bank {
  id: string
  bankAccount: string
  bankName: string
  bankProvider: string
  available: boolean
}


export async function updateBankTopup(data: Bank) {
  try {
       const canUse =  await requireAdmin();
   if (canUse) {
    return null
   }

    const bank = await prisma.topupBank.findFirst();
    await prisma.topupBank.update({
      where: { id: bank?.id },
      data: {
        bankAccount: data.bankAccount,
        bankName: data.bankName,
        bankProvider: data.bankProvider,
        available: data.available,
      },
    });
    revalidatePath("/admin/commonsetting")
    revalidatePath("/topup/bank")
    return { success: true };
  } catch (error) {
    console.log("updateBankTopup Error: ", error);
    throw new Error("เกิดข้อผิดพลากจากระบบ");
  }
}

export async function getBankTopup(): Promise<Bank> {
  try {
    const bankData = await prisma.topupBank.findFirst();
    if (!bankData) {
      
      return {
        id: "",
        bankAccount: "ไม่พบการตั้งค่า",
        bankName: "ไม่พบการตั้งค่า",
        bankProvider: "ไม่พบการตั้งค่า",
        available: false,
      };
    }

    return bankData; // ตรง type Bank อยู่แล้ว
  } catch (error) {
    console.log("getBankTopup Error: ", error);

    return {
      id: "",
      bankAccount: "ไม่พบการตั้งค่า",
      bankName: "ไม่พบการตั้งค่า",
      bankProvider: "ไม่พบการตั้งค่า",
      available: false,
    };
  }
}

