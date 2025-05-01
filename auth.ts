import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import "next-auth/jwt";

export const { handlers, auth, signIn, signOut } = NextAuth({
  basePath: "/auth",
  providers: [Github, Google, Discord],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      if (token?.accessToken) session.accessToken = token.accessToken;

      return session;
    },
  },
});

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
