import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const userRole = request.nextauth.token?.role;
    const pathname = request.nextUrl.pathname;

    // ------------------------------
    // 1. ถ้า user ล็อกอินแล้วห้ามเข้า /login หรือ /register
    if (request.nextauth.token && (pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL("/", request.url)); // redirect ไปหน้า homepage
    }

    // ------------------------------
    // 2. ตรวจสอบหน้า /admin
    if (pathname.startsWith("/admin")) {
      if (userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // ------------------------------
    // 3. ถ้าผ่านทุกเงื่อนไข
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // ตรวจสอบว่า logged in หรือยัง
    },
    pages: {
      signIn: "/login", // ถ้าไม่ได้ล็อกอิน จะไปหน้า login
    },
  }
);

export const config = {
  matcher: [
    "/changepassword",
    "/historytopup",
    "/historybuy",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};
