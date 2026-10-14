import type { FC, ReactNode } from "react";
export const Card: FC<{ children: ReactNode; className?: string; padding?: "none"|"sm"|"md"|"lg"; }> = ({ children, className="", padding="md" }) => {
  const pm = { none:"", sm:"p-3", md:"p-4", lg:"p-6" };
  return <div className={"clay-card "+pm[padding]+" "+className} style={{background:"#162030",border:"3px solid #233044",borderRadius:28,boxShadow:"0 18px 36px rgba(0,0,0,0.55),0 6px 14px rgba(0,0,0,0.4),inset 0 1.5px 0 rgba(255,255,255,0.08),inset 0 -3px 0 rgba(0,0,0,0.35)"}}>{children}</div>;
};
