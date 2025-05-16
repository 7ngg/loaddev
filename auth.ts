import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authenticateUser } from "@/app/auth/actions";
import type { DefaultSession } from "next-auth";
import "next-auth/jwt";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { 
          label: "Username", 
          type: "text",
          placeholder: "Your username"
        },
        password: { 
          label: "Password", 
          type: "password",
          placeholder: "Your password"
        }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        try {
          console.log("Attempting authentication for:", credentials.username);
          const result = await authenticateUser({
            username: credentials.username as string,
            password: credentials.password as string,
          });

          console.log("Auth result:", { ...result, password: '[REDACTED]' });

          if (result.error || !result.user) {
            console.log("Authentication failed:", result.error);
            return null;
          }

          // Return the user object that NextAuth expects
          return {
            id: result.user.id,
            email: result.user.email,
            name: result.user.username,
          };
        } catch (error) {
          console.error('NextAuth authorize error:', error);
          return null;
        }
      }
    }),
    Github,
    Google,
    Discord
  ],
  debug: true,
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    }
  },
});

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
  }
}
