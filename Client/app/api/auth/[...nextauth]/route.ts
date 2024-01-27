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
   
  async signIn({ account, profile }: { account: any; profile?: ExtendedProfile }): Promise<boolean | string> {
  // Asegurarse de que la autenticación es a través de Google
  if (account.provider === "google" && profile) {
    const requestBody = JSON.stringify({
      email: profile.email,
      firstName: profile.given_name,
      lastName: profile.family_name,
      image: profile.picture
    });

    // Hacer una petición POST a tu backend
    const res = await fetch(`${URL_BACKEND}google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: requestBody
    });

    const user = await res.json();
    
    console.log(user)

    if (user.error) {
      throw new Error(user.error); 
    }
     return (user);
  }
  
  return true; 
},
 async jwt({ token, user, account }) {
  if (account?.provider === "google" && user) {
    token.userRole = "user"; 
  }

  return { ...token, ...user };
},

async session({ session, token }) {
  session.user = token.userRole ? { ...token, ...session.user } : token;
  return session;
},


  
  },
  pages: {
    signIn: "/LoginUp",
  },
});


export { handler as GET, handler as POST };