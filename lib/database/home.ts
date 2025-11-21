"use server";
import prisma from "./conn";

export async function getHomepage() {
  try {
    const setting = await prisma.settings.findFirst({
      select: {
        banner: true,
        announcement: true,
      },
    });
    const member = await prisma.users.count();
    const allStock = await prisma.stocks.count();
    const soldStock = await prisma.stocks.count({
      where: {
        status: "SOLD",
      },
    });
    const suggestCategories = await prisma.suggestCategories.findMany({
      include: {
        category: {
          include: {
            products: true,
          },
        },
      },
    });
    const suggestProducts = await prisma.suggestProducts.findMany({
      include: {
        product: {
          include: {
            stocks: {
              where: {
                status:"AVAILABLE"
              }
            },
          },
        },
      },
    });
            
    return {
      setting,
      member,
      allStock,
      soldStock,
      categories: suggestCategories,
      shop: suggestProducts,
    };
  } catch (error) {
    console.log("getHomepage Error: ", error);
    return {
      setting: {
        banner: "",
        announcement: "",
      },
      member: 0,
      allStock: 0,
      soldStock: 0,
      categories: [],
      shop: [],
    };
  }
}
