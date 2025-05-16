import type { Metadata } from "next";
import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import { Nunito } from "next/font/google";
import { ThemeProvider } from "@/shared/theme-provider";
import Navbar from "@/widgets/navbar";
import { SessionProvider } from "next-auth/react";
import { auth } from "auth";

const inter = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
  title: "Load.dev",
  description: "Definetly not boot.dev",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <header>
              <Navbar />
            </header>
            <main>{children}</main>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
