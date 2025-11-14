import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authService } from "@/services/auth.service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const response = await authService.login({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          if (response.data?.accessToken) {
            return {
              id: "1",
              name: response.data.username,
              email: credentials.email as string,
              accessToken: response.data.accessToken,
            };
          }

          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.user.name = token.name ?? undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/loginPage",
  },
  session: {
    strategy: "jwt",
  },
});
