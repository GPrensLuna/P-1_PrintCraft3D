import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    roll?: string;
  }

  interface Session {
    user: {
      id?: number | undefined;
      image?: string | undefined;
      roll?: string ;
    } & DefaultSession["user"];
  }
}
