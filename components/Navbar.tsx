"use client";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BitcoinBagIcon,
  Cancel01Icon,
  Contact01Icon,
  Home07Icon,
  LogoutSquare02Icon,
  Menu01Icon,
  MoneyReceiveSquareIcon,
  Setting07Icon,
  Settings05Icon,
  Store01Icon,
  TransactionHistoryIcon,
  UserEdit01Icon,
  UserIcon,
  UserSquareIcon,
} from "@hugeicons/core-free-icons";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [login, isLogin] = useState(true);
  const [admin, isAdmin] = useState(true);
  return (
    <nav className="bg-white shadow-md py-3 sticky top-0 z-50 border-b border-gray-100 w-full">
      <div className=" container  flex justify-between items-center">
        {/* โลโก้ */}
        <Link href={"/"}>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="https://img.rdcw.co.th/images/98cf018c3cb93cff9a350642fb8edb7ee1cb3e67686b1104514440a3eeb3c8bb.png"
              width={60}
              height={60}
              alt="KSRV Logo"
              className="rounded-full"
            />
          </div>
        </Link>

        {/* เมนูหลัก */}
        <div className="hidden md:flex items-center gap-6">
          <Link href={"/"}>
            <button className="flex items-center button-underline pb-1">
              <HugeiconsIcon icon={Home07Icon} />
              หน้าแรก
            </button>
          </Link>
          <Link href={"/categories"}>
            <button className="flex items-center button-underline pb-1">
              <HugeiconsIcon icon={Store01Icon} />
              สินค้าทั้งหมด
            </button>
          </Link>
          <Link href={"/topup"}>
            <button className="flex items-center button-underline pb-1">
              <HugeiconsIcon icon={MoneyReceiveSquareIcon} /> เติมเงิน
            </button>
          </Link>
          <button className="flex items-center button-underline pb-1">
            <HugeiconsIcon icon={Contact01Icon} />
            ติดต่อเรา
          </button>
        </div>

        {/* ปุ่มเข้าสู่ระบบ / สมัครสมาชิก */}
        {login ? (
          <div className="flex gap-2">
            {/* เมนูผู้ใช้ */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-accent transition bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    {/* <User className="w-4 h-4 text-muted-foreground" /> */}
                    <HugeiconsIcon icon={UserIcon} />
                    <span className="hidden sm:inline font-semibold tracking-wide">
                      KSRV USER
                    </span>
                  </div>

                  <div className="flex items-center gap-1 border-l pl-3">
                    <Badge className="bg-(--color-primary) text-white font-semibold px-2 py-0.5 rounded-md">
                      99฿
                    </Badge>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex items-center gap-2 text-gray-500 text-sm">
                  <HugeiconsIcon icon={Setting07Icon} />
                  จัดการบัญชีของคุณ
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                  <HugeiconsIcon icon={BitcoinBagIcon} /> ยอดเงินคงเหลือ 99฿
                </DropdownMenuItem>
                <Link href={"/changepassword"}>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <HugeiconsIcon icon={UserEdit01Icon} /> เปลี่ยนรหัสผ่าน
                  </DropdownMenuItem>
                </Link>
                <Link href={"/historybuy"}>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <HugeiconsIcon icon={TransactionHistoryIcon} />{" "}
                    ประวัติการสั่งซื้อ
                  </DropdownMenuItem>
                </Link>
                <Link href={"/historytopup"}>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <HugeiconsIcon icon={TransactionHistoryIcon} />{" "}
                    ประวัติการเติมเงิน
                  </DropdownMenuItem>
                </Link>
                {admin ? (
                  <Link href={"/dashboard"}>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <HugeiconsIcon icon={Settings05Icon} />
                      จัดการร้านค้าของคุณ
                    </DropdownMenuItem>
                  </Link>
                ) : null}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 text-red-500 focus:text-red-600">
                  <HugeiconsIcon icon={LogoutSquare02Icon} /> ออกจากระบบ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* มือถือ */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                className="md:hidden flex items-center gap-2"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? (
                  <HugeiconsIcon icon={Cancel01Icon} />
                ) : (
                  <HugeiconsIcon icon={Menu01Icon} />
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {" "}
            <Link href={"/login"}>
              <button className="btn btn-login">เข้าสู่ระบบ</button>{" "}
            </Link>
            <Link href={"/register"}>
              <button className="btn btn-register">สมัครสมาชิก</button>{" "}
            </Link>
          </div>
        )}
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-inner">
          <div className="flex flex-col items-start gap-3 px-6 py-4">
            <Link href={"/"}>
              <button className="flex items-center button-underline pb-1">
                <HugeiconsIcon icon={Home07Icon} /> หน้าแรก
              </button>
            </Link>
            <Link href={"/categories"}>
              <button className="flex items-center button-underline pb-1">
                <HugeiconsIcon icon={Store01Icon} /> สินค้าทั้งหมด
              </button>
            </Link>
            <Link href={"/topup"}>
              <button className="flex items-center button-underline pb-1">
                <HugeiconsIcon icon={MoneyReceiveSquareIcon} /> เติมเงิน
              </button>
            </Link>
            <button className="flex items-center button-underline pb-1">
              <HugeiconsIcon icon={Contact01Icon} /> ติดต่อเรา
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
