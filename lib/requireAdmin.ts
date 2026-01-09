// requireUser.ts หรือไฟล์อื่นๆ ที่ทำงานบน Server
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";

export async function requireAdmin() {
  
  const session = await getServerSession(authOptions); 
  if (!session || session?.user.role === "ADMIN") {
    throw new Error("UNAUTHORIZED");
  } 
}