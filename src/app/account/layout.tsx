import Sidebar from "@/widgets/sidebar";
import React from "react";
import { sidebarItems } from "./items";

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen bg-[var(--background)] pt-16">
      <div className="w-64 fixed left-0 top-16 bottom-0">
        <Sidebar items={sidebarItems} />
      </div>
      <div className="flex-1 ml-64 p-8">
        {children}
      </div>
    </div>
  );
}
