import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

// 1. Augment the JWT type
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    username: string;
    role: string;
    points: number;
    totalPoints: number;
    id: string;
  }
}

// 2. Augment the Session type
declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      id: string;
      role: string;
      points: number;
      totalPoints: number;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    username: string;
    role: string;
    points: number;
    totalPoints: number;
  }
}
