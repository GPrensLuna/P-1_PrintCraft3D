import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    roll?: string;
    id?: number;
  }

  interface Session {
    user: {
      id?: number;
      roll?: string;
      image?: string | undefined;
    } & DefaultSession["user"];
  }
}
