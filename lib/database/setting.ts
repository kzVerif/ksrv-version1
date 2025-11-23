"use server";
import prisma from "./conn";
import { revalidatePath } from "next/cache";
import { requireUser } from "../requireUser";

export async function getShopSettings() {
  try {
    const setting = await prisma.settings.findFirst();
    return setting;
  } catch (error) {
    console.log("getShopSettings Error: ", error);
    return {
      id: "",
      primaryColor: "",
      secondaryColor: "",
      hoverColor: "",
      backgroundImage: "",
      webhookDiscord: "",
      shopName: "",
      announcement: "",
      icon: "",
      logo: "",
      detail: "",
      contact: "",
      createdAt: null,
      updatedAt: null,
      banner: ""
    };
  }
}

export async function updateShopSetting(data: any) {
  try {
    await requireUser()
    await prisma.settings.update({
      where: {
        id: data.id,
      },
      data: {
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        hoverColor: data.hoverColor,
        backgroundImage: data.backgroundImage,
        webhookDiscord: data.webhookDiscord,
        shopName: data.shopName,
        announcement: data.announcement,
        icon: data.icon,
        logo: data.logo,
        detail: data.detail,
        contact: data.contact,
        banner: data.banner
      },
    });
    revalidatePath("/")
  } catch (error) {
    console.log("updateShopSetting Error: ", error);
    return {};
  }
}

export async function getColorSetting() {
  try {
    await requireUser()
    const setting = await prisma.settings.findFirst();
    return {
      primaryColor: setting?.primaryColor,
      secondaryColor: setting?.secondaryColor,
      hoverColor: setting?.hoverColor,
    };
  } catch (error) {
    console.log("getColorSetting Error: ", error);
    return {};
  }
}
