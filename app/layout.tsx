import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import { CustomProviders } from "@/components/Auth/Provider";
import { getShopSettings } from "@/lib/database/setting";
import { UserProvider } from "@/contexts/UserContext";
import ExpiredGuard from "@/components/ExpiredGuard";
export const revalidate = 0;
// export const dynamic = "force-dynamic";

import sharp from "sharp"; // ติดตั้ง: npm install sharp

async function getImageDimensions(url: string): Promise<{ width: number; height: number }> {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const metadata = await sharp(Buffer.from(buffer)).metadata();
    return {
      width: metadata.width ?? 1200,
      height: metadata.height ?? 630,
    };
  } catch {
    return { width: 1200, height: 630 }; // fallback
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const setting = await getShopSettings();

  const defaultTitle = "KSRV | Kanghun Server And Service";
  const defaultDesc = "บริการให้เช่าเว็บไซต์ E-Commerce";
  const defaultIcon = "https://img2.pic.in.th/pic/ksrv-logo-trans.png";

  const title = setting?.shopName || defaultTitle;
  const description = setting?.detail || defaultDesc;
  const iconUrl = setting?.icon || defaultIcon;
  const logoUrl = setting?.logo || iconUrl;

  // ดึงขนาดจริงของภาพ
  const { width, height } = await getImageDimensions(logoUrl);

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
          width,   // ✅ ใช้ขนาดจริง
          height,  // ✅ ใช้ขนาดจริง
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
          <ExpiredGuard>
            <UserProvider>
              <NextTopLoader color="var(--color-primary)" />
              <Navbar setting={setting ?? null} />{" "}

              <Toaster position="bottom-center" />
              {children}
              {/* <FloatingButton /> */}
            </UserProvider>
            <Footer />
          </ExpiredGuard>
        </body>
      </html>
    </CustomProviders>
  );
}
