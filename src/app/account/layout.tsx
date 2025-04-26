import Sidebar from "@/widgets/sidebar";
import React from "react";
import { sidebarItems } from "./items";

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Sidebar items={sidebarItems} />
      {children}
    </>
  );
}
