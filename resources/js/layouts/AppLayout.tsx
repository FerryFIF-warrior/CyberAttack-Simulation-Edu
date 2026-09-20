import type { FC } from "react";

export const AppLayout: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    {children}
  </div>
);