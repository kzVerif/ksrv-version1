// src/types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

// 1. Augment the JWT type
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    // Add your custom properties
    username: string;
    role: string;
    points: number;
    totalPoints: number;
    id: string; // Add id if you're storing it
  }
}

// 2. Augment the Session type
declare module "next-auth" {
  interface Session {
    user: {
      // Add your custom properties
      username: string;
      id: string;
      role: string;
      points: number;
      totalPoints: number;
    } & DefaultSession["user"]; // Keep default fields like name, email
  }

  // 3. Augment the User type (the one from 'authorize')
  // This ensures the 'user' object in the 'jwt' callback is typed correctly
  interface User extends DefaultUser {
    username: string;
    role: string;
    points: number;
    totalPoints: number;
  }
}