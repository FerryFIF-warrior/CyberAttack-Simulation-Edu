import type { FC } from "react";
import { useEffect, useState } from "react";
interface MobileDPadProps { onMove: (d: "up"|"down"|"left"|"right")=>void; disabled?: boolean; className?: string; }
export const MobileDPad: FC<MobileDPadProps> = ({ onMove, disabled=false, className }) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check(); window.addEventListener("resize", check); return () => window.removeEventListener("resize", check);
  }, []);
  if (disabled || !isMobile) return null;
  const btn = "w-12 h-12 sm:w-14 sm:h-14 bg-cat-card border border-cat-line rounded-xl flex items-center justify-center text-cat-cyan shadow-[0_4px_16px_rgba(0,0,0,0.4)] active:scale-95 active:bg-cat-cyan active:text-cat-bg transition select-none";
  return (
    <div className={`fixed bottom-[12px] left-4 z-40 ${className||""}`} style={{ touchAction:"none" }}>
      <div className="grid grid-cols-3 gap-1.5">
        <div /><button aria-label="atas" onTouchStart={e=>{e.preventDefault(); onMove("up");}} onClick={()=>onMove("up")} className={`${btn} rounded-t-xl`}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg></button><div />
        <button aria-label="kiri" onTouchStart={e=>{e.preventDefault(); onMove("left");}} onClick={()=>onMove("left")} className={`${btn} rounded-l-xl`}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg></button><div className="w-12 h-12" /><button aria-label="kanan" onTouchStart={e=>{e.preventDefault(); onMove("right");}} onClick={()=>onMove("right")} className={`${btn} rounded-r-xl`}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg></button>
        <div /><button aria-label="bawah" onTouchStart={e=>{e.preventDefault(); onMove("down");}} onClick={()=>onMove("down")} className={`${btn} rounded-b-xl`}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg></button><div />
      </div>
    </div>
  );
};
