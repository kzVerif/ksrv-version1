"use server"
import prisma from "./conn";

export async function getFake() {
  const data = await prisma.fake.findFirst();
  if (!data) {
    const newData = await prisma.fake.create({
      data: {
        members: 0,
        products: 0,
        sell: 0,
      },
    });
    return newData;
  }
  return data;
}

export async function updateFake(data: any) {
  try {
    await prisma.fake.update({
      where: {
        id: data.id,
      },
      data: {
        members: data.members,
        products: data.products,
        sell: data.sell,
      },
    });
  } catch (error) {
    console.log("Error updateFake:", error);
  }
}
