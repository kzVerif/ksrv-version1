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
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "แดชบอร์ด",
    url: "/dashboard",
    icon: DashboardSquare02Icon, // หน้าแรก, สรุปข้อมูล
  },
  {
    title: "จัดการผู้ใช้",
    url: "/users",
    icon: UserEdit01Icon, // การจัดการผู้ใช้มักสำคัญ
  },
  {
    title: "จัดการสินค้า",
    url: "/products",
    icon: ShoppingCart01Icon, // จัดการสินค้า
  },
  {
    title: "จัดการหมวดหมู่",
    url: "/admincategories",
    icon: Package01Icon, // จัดการหมวดหมู่สินค้า, ใกล้เคียงสินค้า
  },
  {
    title: "แนะนำสินค้า",
    url: "/suggestproducts",
    icon: ThumbsUpIcon, // อาจเป็นฟีเจอร์ส่งเสริมการขาย
  },
  {
    title: "ตั้งค่าการเติมเงิน",
    url: "/topupsetting",
    icon: MoneyReceiveSquareIcon, // การตั้งค่าเฉพาะ
  },
  {
    title: "ตั้งค่าทั่วไป",
    url: "/commonsetting",
    icon: Settings02Icon, // ตั้งค่าอื่นๆ
  },
  {
    title: "ประวัติการเติมเงิน",
    url: "/adminhistorytopup",
    icon: TransactionHistoryIcon, // ประวัติการเงิน
  },
  {
    title: "ประวัติการสั่งซื้อ",
    url: "/adminhistorybuy",
    icon: TransactionHistoryIcon, // ประวัติการสั่งซื้อ
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="top-0 z-50 h-full">
      <SidebarContent>
        <SidebarGroup className="gap-y-2">
          <SidebarGroupLabel className="py-2">
            <Image
              src="https://img.rdcw.co.th/images/98cf018c3cb93cff9a350642fb8edb7ee1cb3e67686b1104514440a3eeb3c8bb.png"
              width={32}
              height={32}
              alt="KSRV Logo"
              className="rounded-full mr-1"
            />
            จัดการร้านค้า
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-y-1">
              {items.map((item: any) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
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
