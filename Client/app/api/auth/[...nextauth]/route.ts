import { URL_BACKEND, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from "@/config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { Profile } from '@/Ts/UserList'

interface ExtendedProfile extends Profile {
  email_verified?: boolean;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          `${URL_BACKEND}login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();

        if (user.error) throw user;

        return user;
      },
    }),
  GoogleProvider({
    clientId: GOOGLE_CLIENT_ID as string,
    clientSecret: GOOGLE_CLIENT_SECRET as string
  })
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
    async signIn({ account, profile }: { account: any; profile?: Profile }): Promise<boolean | string> {
  if (account && account.provider === "google" && profile) {
    // Verificar si profile no es undefined antes de usar sus propiedades
    const requestBody = JSON.stringify({
      email: profile.email,
      firstName: profile.given_name,
      lastName: profile.family_name,
      image: profile.picture
    });

    console.log("Contenido enviado al servidor:", requestBody);

    const res = await fetch(`${URL_BACKEND}google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: requestBody
    });

    const data = await res.json();
    console.log(data);

    if (data.error) {
      return false;
    }
  }
  return true;
}


  },
  pages: {
    signIn: "/LoginUp",
  },
});


export { handler as GET, handler as POST };