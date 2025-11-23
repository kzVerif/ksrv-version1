import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(request) {
    const userRole = request.nextauth.token?.role;
    const pathname = request.nextUrl.pathname;

    if (2<1) {
      return NextResponse.redirect(new URL("/expired", request.url));
    }

    // redirect ถ้า user ไม่ login
    if (!request.nextauth.token && pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // redirect ถ้า user login แต่เข้าหน้า login/register
    if (request.nextauth.token && (pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // ตรวจ role จาก token
    if (pathname.startsWith("/admin") && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: { authorized: ({ token }) => !!token },
    pages: { signIn: "/login" },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/login", "/changepassword", "/historytopup", "/historybuy"],
};
