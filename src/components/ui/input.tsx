import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        "w-64 h-8 px-3 py-1 rounded outline-none shadow bg-gray-300 dark:bg-gray-500 text-black",
        className,
      )}
    />
  );
}
