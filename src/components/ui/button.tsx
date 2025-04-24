import { cn } from "@/lib/utils";
import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        className,
        "w-24 h-8 outline shadow rounded cursor-pointer bg-[var(--foreground)] text-[var(--background)] active:scale-95 hover:opacity-90",
      )}
    >
      {children}
    </button>
  );
}
