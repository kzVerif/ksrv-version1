import prisma from "./conn";

export async function getExpired() {
    return prisma.expired.findFirst()
}