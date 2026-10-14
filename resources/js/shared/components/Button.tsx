import type { FC, ReactNode, CSSProperties } from "react";
export const Button: FC<{ children: ReactNode; className?: string; disabled?: boolean; variant?: "primary"|"secondary"|"danger"|"ghost"; onClick?: ()=>void; type?: "button"|"submit"|"reset"; }> = ({ children, className="", disabled=false, variant="primary", ...props }) => {
  const base="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[16px] font-extrabold text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5ff] disabled:opacity-50 disabled:cursor-not-allowed clay-btn-puff";
  const styles: Record<string,CSSProperties> = {
    primary: { background:"#00e5ff", color:"#0a0e15", border:"2.5px solid #00b8cc", boxShadow:"0 5px 0 #00b8cc,0 10px 22px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.3)", fontFamily:"'Nunito',sans-serif" },
    secondary: { background:"#162030", color:"#fff", border:"3px solid #233044", boxShadow:"0 5px 0 rgba(0,0,0,0.35),0 10px 22px rgba(0,0,0,0.25),inset 0 1px 0 rgba(255,255,255,0.08)", fontFamily:"'Nunito',sans-serif" },
    danger: { background:"#ef4444", color:"#fff", border:"2.5px solid #991b1b", boxShadow:"0 5px 0 #7f1d1d,0 10px 22px rgba(0,0,0,0.3)", fontFamily:"'Nunito',sans-serif" },
    ghost: { background:"transparent", color:"rgba(255,255,255,0.7)", border:"2px solid transparent" },
  };
  return <button className={base+" "+className} style={styles[variant]} disabled={disabled} {...(props as any)}>{children}</button>;
};
