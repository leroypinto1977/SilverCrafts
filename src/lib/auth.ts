import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";

const prisma = new PrismaClient();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const config: NextAuthConfig = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Auth - authorize called with:", credentials?.email);
        try {
          const { email, password } = loginSchema.parse(credentials);

          const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
          });

          console.log(
            "Auth - user found:",
            user ? { id: user.id, email: user.email, role: user.role } : null
          );

          if (!user || !user.password) {
            console.log("Auth - no user or password");
            return null;
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);
          console.log("Auth - password valid:", isPasswordValid);

          if (!isPasswordValid) {
            console.log("Auth - invalid password");
            return null;
          }

          // Check if user is deactivated
          if (!user.isActive) {
            console.log("Auth - user inactive");
            return null;
          }

          const authUser = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            isTemporary: user.isTemporary,
          };
          console.log("Auth - returning user:", authUser);
          return authUser;
        } catch (error) {
          console.error("Auth - error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60, // 4 hours
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      console.log(
        "JWT callback - trigger:",
        trigger,
        "user:",
        user ? { id: user.id, email: user.email, role: user.role } : null
      );
      if (user) {
        token.role = user.role;
        token.isTemporary = user.isTemporary;
        console.log("JWT callback - updated token:", {
          role: token.role,
          isTemporary: token.isTemporary,
        });
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback - token:", {
        sub: token.sub,
        role: token.role,
        isTemporary: token.isTemporary,
      });
      if (token && token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role as string;
        session.user.isTemporary = token.isTemporary as boolean;
        console.log("Session callback - updated session:", {
          id: session.user.id,
          email: session.user.email,
          role: session.user.role,
          isTemporary: session.user.isTemporary,
        });
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.AUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
