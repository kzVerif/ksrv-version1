"use server"
import { addYears } from "date-fns";
import prisma from "./conn";
import { requireAdmin } from "../requireAdmin";

export async function getAllEtcButton() {
    const etc = await prisma.etcButton.findMany();
    return etc;
}

export async function updateEtcButton(data: any) {
  const canUse = await requireAdmin();
  if (canUse) {
    return {
      success: false,
      message: "ไม่สำเร็จ"
    }
  }

    const updatedEtc = await prisma.etcButton.updateMany({
        where: { id: data.id },
        data: { ...data },
    });

    return updatedEtc;
}

export async function getEtcButtonSetting() {
    try {
        const setting = await prisma.etcButtonSetting.findFirst()
        if (!setting) {
            const newsetting = await prisma.etcButtonSetting.create({
                data:{
                    isOpen:false
                }
            })
            return newsetting
        }
        return setting
    } catch (error) {
        console.log("error getEtcButtonSetting:", error)
        return {
            id:"null",
            isOpen:false
        }
    }
}

export async function updatedEtcButtonSetting(data:any) {
   const canUse = await requireAdmin();
  if (canUse) {
    return {
      success: false,
      message: "ไม่สำเร็จ"
    }
  }

    try{
        const setting = await prisma.etcButtonSetting.update({
            where:{
                id:data.id
            },data:{
                isOpen:data.isOpen
            }

        })
    } catch(error) {
        console.log("error updateEtcButtonSetting:", error)
    }
}

