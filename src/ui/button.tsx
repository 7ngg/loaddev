import { cn } from "@/lib/utils";
import React from "react";
import { motion, MotionProps } from "framer-motion";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & MotionProps;

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <motion.button
      {...props}
      whileHover={{ opacity: 0.75 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        className,
        `w-24 h-8 shadow rounded cursor-pointer 
        bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
        text-[var(--foreground)]`,
      )}
    >
      {children}
    </motion.button>
  );
}
