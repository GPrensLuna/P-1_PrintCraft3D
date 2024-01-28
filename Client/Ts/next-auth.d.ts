import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    roll?: string;
  }

  interface Session {
    user: {
      roll?: string | null ;
    } & DefaultSession["user"];
  }
}
