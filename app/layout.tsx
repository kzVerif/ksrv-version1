// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "KSRV | Kanghun Server And Service",
  description: "บริการให้เช่าเว็บไซต์ E-Commerce",
  icons: {
    icon: "https://img.rdcw.co.th/images/98cf018c3cb93cff9a350642fb8edb7ee1cb3e67686b1104514440a3eeb3c8bb.png", // ✅ favicon จากลิงก์ภายนอก
  },
  openGraph: {
    title: "KSRV | Kanghun Server And Service",
    description: "บริการให้เช่าเว็บไซต์ E-Commerce",
    siteName: "KSRV",
    images: [
      {
        url: "https://img.rdcw.co.th/images/a8788de04c5f464a32dc10e4527a2d12d0e92ab26cfbbf36f2831a700eac2ee6.png",
        width: 1050,
        height: 1050,
      },
    ],
    locale: "th_TH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <head>
        {/* ✅ เพิ่ม fallback favicon สำหรับ browser ที่ไม่โหลด metadata.icons */}
        <link
          rel="icon"
          href="https://img.rdcw.co.th/images/98cf018c3cb93cff9a350642fb8edb7ee1cb3e67686b1104514440a3eeb3c8bb.png"
          type="image/png"
        />
      </head>
      <body className="antialiased">
        <NextTopLoader
          color="var(--color-primary)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px var(--color-primary),0 0 5px var(--color-primary)"
          zIndex={1600}
          showAtBottom={false}
        />
        <Navbar />
        <Toaster position="bottom-center" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
