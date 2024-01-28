import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { URL_BACKEND, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "@/config";
import { Profile } from '@/Ts/UserList';

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
        const res = await fetch(`${URL_BACKEND}login`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        if (user.error) throw new Error(user.error);

        return user;
      },
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
   async signIn({ account, profile }: { account: any; profile?: ExtendedProfile }): Promise<boolean | string> {
      if (account.provider === "google" && profile) {
        const requestBody = JSON.stringify({
          email: profile.email,
          firstName: profile.given_name,
          lastName: profile.family_name,
          image: profile.picture,
        });

        const res = await fetch(`${URL_BACKEND}google`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: requestBody,
        });

        const user = await res.json();

        if (user.error) {
          throw new Error(user.error);
        }
        return user;
      }
      return true;
    },
    // Ejemplo en tus callbacks de next-auth
async jwt({ token, user }) {
  if (user?.roll) {
    token.userRoll = user.roll;
  }
  return token;
},

async session({ session, token }) {
  if (token.userRoll) {
    if (session.user) {
      session.user.roll = typeof token.userRoll === 'string' ? token.userRoll : undefined;
    } else {
      session.user = { roll: typeof token.userRoll === 'string' ? token.userRoll : undefined };
    }
  }
  return session;
},





    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl + "/LoginUp") || url.startsWith(baseUrl + "/api/auth/signout")) {
        return baseUrl + "/Profile";
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    signIn: "/LoginUp",
  },
});

export { handler as GET, handler as POST };
