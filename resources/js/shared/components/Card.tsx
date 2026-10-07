import type { FC, ReactNode } from "react";

export const Card: FC<{
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}> = ({ children, className = "", padding = "md" }) => {
  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };
  return (
    <div
      className={`bg-cat-card border border-cat-line rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
};