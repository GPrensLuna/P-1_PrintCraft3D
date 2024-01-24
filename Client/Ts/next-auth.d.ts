// next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  /**
   * Extiende los tipos de sesión y usuario para incluir propiedades personalizadas.
   */
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      token?: string | null; 
    };
  }
}
