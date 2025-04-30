"use client";

import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { navItems } from "./items";
import ModeToggle from "./mode-toggle";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [selected, setSelected] = useState<number | null>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      className="z-10 h-12 min-w-screen absolute top-0 left-0 flex items-center
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
        <Link href={"/auth"} className="select-none">
          <FontAwesomeIcon icon={faUser} />
        </Link>
      </div>
    </div>
  );
}
