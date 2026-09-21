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
      className={`bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-sm ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
};