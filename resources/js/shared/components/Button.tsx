import type { FC, ReactNode } from "react";

export const Button: FC<{
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}> = ({ children, className = "", disabled = false, variant = "primary", ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cat-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-cat-bg";

  const variantClasses: Record<string, string> = {
    primary: "bg-cat-cyan text-cat-bg hover:brightness-110 shadow-[0_0_20px_rgba(0,229,255,0.25)] hover:shadow-[0_0_28px_rgba(0,229,255,0.35)]",
    secondary: "bg-cat-card border border-cat-line text-slate-200 hover:border-cat-cyan/30 hover:bg-white/[0.03]",
    danger: "bg-red-500/90 text-white hover:bg-red-500 border border-red-500/30",
    ghost: "bg-transparent text-cat-muted hover:text-slate-200 hover:bg-white/[0.04] border border-transparent",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};