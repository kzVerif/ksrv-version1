"use server"
import prisma from "./conn";

export async function getAllEtcButton() {
    const etc = await prisma.etcButton.findMany();
    return etc;
}

export async function updateEtcButton(data: any) {
    const updatedEtc = await prisma.etcButton.updateMany({
        where: { id: data.id },
        data: { ...data },
    });

    return updatedEtc;
}