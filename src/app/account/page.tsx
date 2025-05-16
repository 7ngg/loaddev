"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Account() {
  const { theme } = useTheme();

  const quickLinks = [
    {
      title: "Account Settings",
      description: "Update your personal information and preferences",
      href: "/account/settings",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      title: "Enrolled Courses",
      description: "View and manage your enrolled courses",
      href: "/account/enrolled",
      gradient: "from-indigo-500 to-violet-500"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
          Welcome to Your Account
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {quickLinks.map((link, index) => (
            <Link href={link.href} key={link.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="h-full"
              >
                <div className="bg-[var(--background-lighter)] p-6 rounded-lg border border-[var(--background-darker)] shadow hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <h2 className={`text-2xl font-semibold mb-2 bg-gradient-to-r ${link.gradient} bg-clip-text text-transparent`}>
                    {link.title}
                  </h2>
                  <p className="text-[var(--text-muted)]">
                    {link.description}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="bg-[var(--background-lighter)] p-6 rounded-lg border border-[var(--background-darker)] shadow">
          <h2 className="text-2xl font-semibold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[var(--background)] rounded-lg border border-[var(--background-darker)]">
              <p className="text-sm text-[var(--text-muted)]">Enrolled Courses</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <div className="p-4 bg-[var(--background)] rounded-lg border border-[var(--background-darker)]">
              <p className="text-sm text-[var(--text-muted)]">Completed Courses</p>
              <p className="text-2xl font-bold">1</p>
            </div>
            <div className="p-4 bg-[var(--background)] rounded-lg border border-[var(--background-darker)]">
              <p className="text-sm text-[var(--text-muted)]">In Progress</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
