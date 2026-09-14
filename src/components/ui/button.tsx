import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-bold transition-all disabled:cursor-wait disabled:opacity-60",
        variant === "primary"
          ? "bg-primary text-primary-foreground shadow-button hover:-translate-y-0.5 hover:bg-primary-strong"
          : "border border-border bg-surface text-foreground hover:bg-muted",
        className,
      )}
      {...props}
    />
  );
}