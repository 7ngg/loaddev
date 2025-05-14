"use client";

import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { navItems } from "./items";
import ModeToggle from "./mode-toggle";
import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [selected, setSelected] = useState<number | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const underlineRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected === null) {
      underlineRef.current!.style.opacity = "0";
    }

    const item = document.getElementById(`underline-pos-${selected}`);

    if (!item) return;

    const itemRect = item.getBoundingClientRect();
    const { left } = item.parentElement!.getBoundingClientRect();

    underlineRef.current!.style.transform = `translateX(${itemRect.left - left}px)`;
    underlineRef.current!.style.width = `${itemRect.width}px`;
    underlineRef.current!.style.opacity = "1";
  }, [selected]);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className="z-10 h-12 min-w-screen fixed top-0 left-0 flex items-center
      justify-between px-8 mb-2 font-bold text-xl"
    >
      <Image src="/logo.png" alt="logo" width={200} height={100} priority />

      <div
        className="relative flex gap-8 h-full"
        onMouseLeave={() => setSelected(null)}
      >
        <div
          ref={underlineRef}
          className="absolute bottom-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 transition-all duration-300 rounded-full opacity-0"
        />

        {navItems.map((item, index) => (
          <Link
            id={`underline-pos-${index}`}
            href={item.relativePath}
            key={index}
            onMouseEnter={() => setSelected(index)}
            className="h-full flex items-center px-2 text-transparent select-none
            bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="flex gap-4 items-center">
        <ModeToggle />
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => status === 'authenticated' ? setShowUserMenu(!showUserMenu) : null}
            className={cn(
              "select-none p-2 rounded-full hover:bg-[var(--background-lighter)] transition-colors",
              status === 'authenticated' && "cursor-pointer"
            )}
          >
            {status === 'authenticated' ? (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center text-white">
                {session.user?.name?.[0]?.toUpperCase() || <FontAwesomeIcon icon={faUser} />}
              </div>
            ) : (
              <Link href="/auth">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            )}
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && status === 'authenticated' && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[var(--background-lighter)] ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <Link
                  href="/account"
                  className="block px-4 py-2 text-sm hover:bg-[var(--background-darker)] transition-colors"
                  role="menuitem"
                  onClick={() => setShowUserMenu(false)}
                >
                  Account Settings
                </Link>
                <button
                  onClick={() => {
                    signOut({ callbackUrl: '/' });
                    setShowUserMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-[var(--background-darker)] transition-colors"
                  role="menuitem"
                >
                  <FontAwesomeIcon icon={faSignOut} className="mr-2" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
