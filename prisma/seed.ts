import bcrypt from "bcrypt";

// // สร้างฟังก์ชัน async เพื่อให้เราใช้ await ได้
// const createHash = async () => {
//   try {
//     const password = "123456";
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     console.log(hashedPassword);

//   } catch (error) {
//     console.error("Error hashing password:", error);
//   }
// };

// // เรียกใช้ฟังก์ชัน
// createHash();

import prisma from "../lib/database/conn"; // ปรับ path ตามโปรเจกต์

async function main() {
  console.log("Seeding database...");

  // ---------------------------- Expired ----------------------------
  const now = new Date();
  const nextMonth = new Date(now);
  nextMonth.setMonth(nextMonth.getMonth() + 1); // บวก 1 เดือน

  await prisma.expired.upsert({
    where: { id: "default-expired" },
    update: { timeExpire: nextMonth },
    create: { id: "default-expired", timeExpire: nextMonth },
  });

  // ---------------------------- Settings ----------------------------
  await prisma.settings.upsert({
    where: { id: "default-settings" },
    update: {
      primaryColor: "#003285",
      secondaryColor: "#2A629A",
      hoverColor: "#FF7F3E",
      backgroundImage: "https://example.com/bg.png",
      shopName: "KSRV | Kanghun Server And Service",
      announcement: "ยินดีต้อนรับสู่ KSRV",
      icon: "https://img2.pic.in.th/pic/ksrv-logo-trans.png",
      logo: "https://img2.pic.in.th/pic/ksrv-logo-trans.png",
      detail: "บริการให้เช่าเว็บไซต์ E-Commerce",
      contact: "contact@ksrv.com",
      banner: "https://example.com/banner.png",
    },
    create: {
      id: "default-settings",
      primaryColor: "#003285",
      secondaryColor: "#2A629A",
      hoverColor: "#FF7F3E",
      backgroundImage: "https://example.com/bg.png",
      shopName: "KSRV | Kanghun Server And Service",
      announcement: "ยินดีต้อนรับสู่ KSRV",
      icon: "https://img2.pic.in.th/pic/ksrv-logo-trans.png",
      logo: "https://img2.pic.in.th/pic/ksrv-logo-trans.png",
      detail: "บริการให้เช่าเว็บไซต์ E-Commerce",
      contact: "contact@ksrv.com",
      banner: "https://example.com/banner.png",
    },
  });

  // ---------------------------- TopupTruemoney ----------------------------
  await prisma.topupTruemoney.upsert({
    where: { id: "default-truemoney" },
    update: {
      phone: "0991234567",
      available: true,
      feeAvailable: true,
    },
    create: {
      id: "default-truemoney",
      phone: "0991234567",
      available: true,
      feeAvailable: true,
    },
  });

  // ---------------------------- TopupBank ----------------------------
  await prisma.topupBank.upsert({
    where: { id: "default-bank" },
    update: {
      bankAccount: "123-4-56789-0",
      bankName: "KSRV Bank",
      bankProvider: "ธนาคารกรุงเทพ",
      available: true,
    },
    create: {
      id: "default-bank",
      bankAccount: "123-4-56789-0",
      bankName: "KSRV Bank",
      bankProvider: "ธนาคารกรุงเทพ",
      available: true,
    },
  });

  console.log("Seed completed!");
}

// ---------------------------- Admin ----------------------------
const password = await bcrypt.hash("admin", 10);
await prisma.users.upsert({
  where: { id: "default-admin" },
  update: {
    username: "admin",
    password: password,
    points: 0,
    totalPoints: 0,
    role: "ADMIN",
  },
  create: {
    id: "default-admin",
    username: "admin",
    password: password,
    points: 0,
    totalPoints: 0,
    role: "ADMIN",
  },
});

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
