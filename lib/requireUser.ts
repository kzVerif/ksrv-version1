// requireUser.ts หรือไฟล์อื่นๆ ที่ทำงานบน Server
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";

export async function requireUser() {
  
  const session = await getServerSession(authOptions); 
  if (!session) {
    throw new Error("UNAUTHORIZED");
  } 
}