// // middleware.ts
// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   callbacks: {
//     authorized: ({ token }) => {
//       // token จะมีค่าถ้าผู้ใช้ล็อกอินอยู่
//       return !!token;
//     },
//   },
//   pages: {
//     signIn: "/login", // ระบุหน้า login ของคุณ
//     // error: "/error", // (ถ้ามี) หน้าสำหรับแสดงข้อผิดพลาด
//   },
// });

// // ระบุหน้าที่คุณต้องการ "ครอบ"
// export const config = {
//   matcher: [
//     "/changepassword", // ป้องกันหน้านี้
//     "/shop", // ป้องกันหน้านี้
//     "/historytopup", // ป้องกันหน้านี้
//     "/historybuy", // ป้องกันหน้านี้
//     "/admin/:path*", // ป้องกันทุกหน้าที่อยู่ใต้ /admin
//   ],
// };

// middleware.ts
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // ฟังก์ชันนี้จะ "ทำงาน" หลังจาก 'authorized' ด้านล่างผ่านแล้ว
  // (แปลว่า ผู้ใช้ล็อกอินแล้วแน่นอน)
  function middleware(request: NextRequestWithAuth) {
    // ดึง Role จาก token ที่เราเก็บไว้
    const userRole = request.nextauth.token?.role;

    // 1. ตรวจสอบหน้า /admin
    if (request.nextUrl.pathname.startsWith("/admin")) {
      // ถ้า Role ไม่ใช่ 'ADMIN'
      if (userRole !== "ADMIN") {
        // ส่งไปหน้า "ไม่มีสิทธิ์" หรือหน้าหลัก
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // 2. ตรวจสอบหน้าอื่นๆ (ถ้ามี)
    // if (request.nextUrl.pathname.startsWith("/staff")) {
    //   if (userRole !== "STAFF" && userRole !== "ADMIN") {
    //     return NextResponse.redirect(new URL("/unauthorized", request.url));
    //   }
    // }

    // ถ้าผ่านทุกเงื่อนไข ก็ไปต่อได้
    return NextResponse.next();
  },
  {
    // callback นี้จะ "เช็ค" ก่อนว่าล็อกอินหรือยัง
    callbacks: {
      authorized: ({ token }) => {
        // !!token คือการเช็คว่า token มีค่าหรือไม่ (ล็อกอินหรือยัง)
        return !!token;
      },
    },
    pages: {
      signIn: "/login", // ถ้า 'authorized' ไม่ผ่าน (ยังไม่ล็อกอิน) ให้ไปหน้านี้
    },
  }
);

export const config = {
  // ระบุหน้าทั้งหมดที่ "ต้องล็อกอิน" (ไม่ว่าจะ role อะไรก็ตาม)
  matcher: [
    "/changepassword", // ป้องกันหน้านี้
    "/historytopup", // ป้องกันหน้านี้
    "/historybuy", // ป้องกันหน้านี้
    "/admin/:path*", // ป้องกันทุกหน้าที่อยู่ใต้ /admin
  ],
};
