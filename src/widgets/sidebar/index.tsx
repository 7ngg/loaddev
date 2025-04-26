"use client";

import { cn } from "@/lib/utils";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export interface SidebarItem {
  title: string;
  href: string;
}

export interface SidebarProps {
  items: SidebarItem[];
}

export default function Sidebar(props: SidebarProps) {
  const [active, setActive] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={cn(
        "flex relative w-72 items-center",
        `transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-60"}`,
      )}
    >
      <aside
        className={cn(
          "min-h-screen w-60 bg-[var(--background-darker)] flex flex-col gap-4 justify-baseline px-4 py-32",
        )}
      >
        {props.items.map((d, i) => {
          return (
            <div
              key={i}
              onClick={() => setActive(d.title)}
              className={cn(
                `${active == d.title ? "inset-shadow-black scale-105" : ""}`,
                "w-full py-2 bg-[var(--background-lighter)] rounded-md text-center cursor-pointer font-bold ",
                "hover:scale-105 duration-150 active:scale-95 select-none",
              )}
            >
              {d.title}
            </div>
          );
        })}
      </aside>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-24 rounded-r justify-self-center bg-transparent p-4",
          "cursor-pointer hover:bg-[var(--background-darker)]",
        )}
      >
        <FontAwesomeIcon icon={isOpen ? faChevronLeft : faChevronRight} />
      </button>
    </div>
  );
}
