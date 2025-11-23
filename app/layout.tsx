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
import { getExpired } from "@/lib/database/expired";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await getShopSettings();

  const defaultTitle = "KSRV | Kanghun Server And Service";
  const defaultDesc = "บริการให้เช่าเว็บไซต์ E-Commerce";
  const defaultIcon = "https://img2.pic.in.th/pic/ksrv-logo-trans.png";

  const title = setting?.shopName || defaultTitle;
  const description = setting?.detail || defaultDesc;
  const iconUrl = setting?.icon || defaultIcon;
  const logoUrl = setting?.logo || iconUrl;

  return {
    title,
    description,
    icons: {
      icon: iconUrl,
      shortcut: iconUrl,
      apple: iconUrl,
    },
    openGraph: {
      title,
      description,
      siteName: title,
      images: [
        {
          url: logoUrl,
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
}: {
  children: React.ReactNode;
}) {
  const setting = await getShopSettings();

  // ดึงวันหมดอายุจาก DB
  const expiredRecord = await getExpired();
  const now = new Date();
  let isExpired = false;

  if (expiredRecord) {
    const dateExpired = new Date(expiredRecord.timeExpire);
    if (now.getTime() > dateExpired.getTime()) {
      isExpired = true;
    }
  } else {
    // ถ้าไม่มีข้อมูลใน DB ให้ถือว่า expired
    isExpired = true;
  }

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
          {isExpired ? (
            <div className="min-h-screen flex flex-col items-center justify-center ">
              {/* ไอคอนหรือภาพ */}
              <div className="text-9xl mb-8 text-orange-400 animate-pulse">
                ⏰
              </div>

              {/* หัวข้อ */}
              <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
                เว็บไซต์หมดอายุแล้ว
              </h1>

              {/* คำอธิบาย */}
              <p className="text-center text-gray-600 mb-8 max-w-xl">
                ขณะนี้เว็บไซต์นี้หมดอายุการใช้งานแล้ว
                หากคุณต้องการเข้าถึงข้อมูลหรือบริการเพิ่มเติม
                กรุณาติดต่อผู้ดูแลระบบ
              </p>

              {/* ปุ่ม */}
              <div className="flex gap-4">
                <a
                  href="/"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition ease-in-out duration-300"
                >
                  กลับหน้าหลัก
                </a>
                <a
                  href="https://discord.gg/YhUs3vnKxG"
                  className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 transition ease-in-out duration-300"
                >
                  ติดต่อผู้ดูแล
                </a>
              </div>
            </div>
          ) : (
            <UserProvider>
              <NextTopLoader color="var(--color-primary)" />
              <Navbar setting={setting ?? null} />{" "}
              <Toaster position="bottom-center" /> {children}
            </UserProvider>
          )}
          <Footer />
        </body>
      </html>
    </CustomProviders>
  );
}
