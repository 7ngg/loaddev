import type { Metadata } from "next";
import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import { Nunito } from "next/font/google";
import { ThemeProvider } from "@/shared/theme-provider";
import Navbar from "@/widgets/navbar";
const inter = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
  title: "Load.dev",
  description: "Definetly not boot.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header>
            <Navbar />
          </header>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
