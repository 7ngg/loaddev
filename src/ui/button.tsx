import { cn } from "@/lib/utils";
import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        className,
        "w-24 h-8 shadow rounded cursor-pointer bg-gradient-to-r from-pink-500 via-putple-500 to-indigo-500 text-[var(--background)] active:scale-95 hover:opacity-90",
      )}
    >
      {children}
    </button>
  );
}
