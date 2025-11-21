import { Login } from "@/lib/database/users";
import NextAuth, { DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface MyUser extends DefaultUser {
  username: string;
  points: number;
  totalPoints: number;
  role: string;
}

export const authOptions  = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await Login(credentials);

        if (res.success && res.user) {
          return res.user as MyUser;
        }
        throw new Error(res.message);
      },
    }),
  ],
callbacks: {
    // 1. The 'user' param is now typed as your augmented 'User'
    async jwt({ token, user }) {
      if (user) {
        // No 'as' casting needed if types are set up
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
        token.points = user.points;
        token.totalPoints = user.totalPoints;
      }
      return token;
    },

    // 2. The 'token' param is typed as your augmented 'JWT'
    //    and 'session.user' is typed as your augmented 'Session'
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.role = token.role;
      session.user.points = token.points;
      session.user.totalPoints = token.totalPoints;
      
      return session;
    },
  },
});

export { authOptions  as GET, authOptions  as POST };
