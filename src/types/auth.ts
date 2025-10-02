import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      isTemporary: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    isTemporary: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    isTemporary: boolean;
  }
}
