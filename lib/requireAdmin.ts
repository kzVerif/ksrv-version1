import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return false
    throw new Error("UNAUTHENTICATED");
  }

  if (session.user.role !== "ADMIN") {
    return false
    throw new Error("FORBIDDEN");
  }

  return session;
}
