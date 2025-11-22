// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import { CustomProviders } from "@/components/Auth/Provider";
import { getShopSettings } from "@/lib/database/setting";
import { UserProvider } from "@/contexts/UserContext";
export const revalidate = 60;
export async function generateMetadata(): Promise<Metadata> {
  // 1. ดึงข้อมูล Setting ภายในนี้เลย
  const setting = await getShopSettings();

  // 2. สร้างค่าเริ่มต้น (Fallback) เผื่อว่าดึงข้อมูลไม่สำเร็จ
  const defaultTitle = "KSRV | Kanghun Server And Service";
  const defaultDesc = "บริการให้เช่าเว็บไซต์ E-Commerce";
  const defaultIcon =
    "https://img2.pic.in.th/pic/ksrv-logo-trans.png";

  // 3. ตรวจสอบว่ามี setting หรือไม่ ถ้ามี ก็ใช้ค่าจาก DB
  const title = setting?.shopName || defaultTitle;
  const description = setting?.detail || defaultDesc;
  const iconUrl = setting?.icon || defaultIcon;
  const logoUrl = setting?.logo || iconUrl; // ใช้ logo ถ้ามี, ถ้าไม่มีก็ใช้ icon แทน

  // 4. Return Metadata ที่เป็น Dynamic
  return {
    title: title,
    description: description,
    icons: [
      {
        url: iconUrl,
        href: iconUrl,
      },
    ],
    openGraph: {
      title: title,
      description: description,
      siteName: title,
      images: [
        {
          url: logoUrl, // ใช้ logo สำหรับ Open Graph
          width: 1050,
          height: 1050,
        },
      ],
      locale: "th_TH",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const setting = await getShopSettings();

  return (
    <CustomProviders>
      <html lang="th">
        <head>
          <style>
            {`
            :root {
              --color-primary: ${setting?.primaryColor};
              --color-primary-light: ${setting?.secondaryColor};
              --color-primary-hover: ${setting?.hoverColor};
              --bg-url: url('${setting?.backgroundImage}');
            }
          `}
          </style>
        </head>
        <body className="antialiased">
          <UserProvider>
            <NextTopLoader color="var(--color-primary)" />
            <Navbar setting={setting ?? null} />{" "}
            <Toaster position="bottom-center" />
            {children}
            <Footer />
          </UserProvider>
        </body>
      </html>
    </CustomProviders>
  );
}
