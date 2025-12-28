import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardSquare02Icon,
  UserEdit01Icon,
  Package01Icon,
  ShoppingCart01Icon,
  MoneyReceiveSquareIcon,
  Settings02Icon,
  ThumbsUpIcon,
  TransactionHistoryIcon,
  SourceCodeIcon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "แดชบอร์ด",
    url: "/admin/dashboard",
    icon: DashboardSquare02Icon, // หน้าแรก, สรุปข้อมูล
  },
  {
    title: "จัดการผู้ใช้",
    url: "/admin/users",
    icon: UserEdit01Icon, // การจัดการผู้ใช้มักสำคัญ
  },
  {
    title: "จัดการสินค้า",
    url: "/admin/products",
    icon: ShoppingCart01Icon, // จัดการสินค้า
  },
  {
    title: "จัดการหมวดหมู่",
    url: "/admin/categories",
    icon: Package01Icon, // จัดการหมวดหมู่สินค้า, ใกล้เคียงสินค้า
  },
  {
    title: "แนะนำสินค้า",
    url: "/admin/suggestproducts",
    icon: ThumbsUpIcon, // อาจเป็นฟีเจอร์ส่งเสริมการขาย
  },
  {
    title: "ตั้งค่าการเติมเงิน",
    url: "/admin/topupsetting",
    icon: MoneyReceiveSquareIcon, // การตั้งค่าเฉพาะ
  },
  {
    title: "ตั้งค่าโค้ดเติมเงิน",
    url: "/admin/code",
    icon: SourceCodeIcon, // การตั้งค่าเฉพาะ
  },
  {
    title: "ตั้งค่าทั่วไป",
    url: "/admin/commonsetting",
    icon: Settings02Icon, // ตั้งค่าอื่นๆ
  },
  {
    title: "ตั้งค่าปุ่ม ETC",
    url: "/admin/etcbutton",
    icon: Settings02Icon, // ตั้งค่าอื่นๆ
  },
  {
    title: "ประวัติการเติมเงิน",
    url: "/admin/historytopup",
    icon: TransactionHistoryIcon, // ประวัติการเงิน
  },
  {
    title: "ประวัติการสั่งซื้อ",
    url: "/admin/historybuy",
    icon: TransactionHistoryIcon, // ประวัติการสั่งซื้อ
  },
];

export function AppSidebar({logo} : {logo: string | null}) {
  return (
    <Sidebar className="top-0 z-50 h-full">
      <SidebarContent>
        <SidebarGroup className="gap-y-4">
          <SidebarGroupLabel className="py-3 text-lg">
            <Image
              src={logo ?? "https://img5.pic.in.th/file/secure-sv1/ksrv-logo-trans.png"}
              width={32}
              height={32}
              alt="KSRV Logo"
              className="rounded-full mr-1"
            />
            จัดการร้านค้า
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-y-2">
              {items.map((item: any) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className=" text-lg">
                      <HugeiconsIcon icon={item.icon} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
