import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("UNAUTHENTICATED");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }

  return session;
}
