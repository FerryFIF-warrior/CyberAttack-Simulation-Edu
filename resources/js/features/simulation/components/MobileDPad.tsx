import type { FC } from "react";
import { useEffect, useState } from "react";
interface MobileDPadProps { onMove: (d:"up"|"down"|"left"|"right")=>void; disabled?: boolean; className?: string; onInteract?: () => void; }
export const MobileDPad: FC<MobileDPadProps> = ({ onMove, disabled=false, className, onInteract }) => {
  const [isMobile,setIsMobile]=useState(false);
  useEffect(()=>{ const c=()=>setIsMobile(window.innerWidth<768); c(); window.addEventListener("resize",c); return()=>window.removeEventListener("resize",c); },[]);
  if(disabled||!isMobile) return null;
  const btn="w-12 h-12 bg-[#162030] flex items-center justify-center text-[#00e5ff] active:scale-95 active:bg-[#00e5ff] active:text-[#0a0e15] transition select-none";
  const s={ border:"3px solid #233044", boxShadow:"0 8px 18px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.06)" } as const;
  const move=(d:"up"|"down"|"left"|"right")=>onMove(d);
  const center = onInteract
    ? <button aria-label="interaksi" onClick={onInteract} className={btn} style={{...s,borderRadius:"12px",background:"#0f1828",color:"#00e5ff"}}><span className="text-[11px] font-extrabold">E</span></button>
    : <div className="w-12 h-12" />;
  return <div className={"fixed bottom-[12px] left-4 z-40 "+(className||"")} style={{ touchAction:"none" }}><div className="grid grid-cols-3 gap-1.5"><div /><button aria-label="atas" onTouchStart={e=>{e.preventDefault();move("up");}} onClick={()=>move("up")} className={btn} style={{...s,borderRadius:"16px 16px 12px 12px"}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button><div /><button aria-label="kiri" onTouchStart={e=>{e.preventDefault();move("left");}} onClick={()=>move("left")} className={btn} style={{...s,borderRadius:"16px 12px 12px 16px"}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button>{center}<button aria-label="kanan" onTouchStart={e=>{e.preventDefault();move("right");}} onClick={()=>move("right")} className={btn} style={{...s,borderRadius:"12px 16px 16px 12px"}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button><div /><button aria-label="bawah" onTouchStart={e=>{e.preventDefault();move("down");}} onClick={()=>move("down")} className={btn} style={{...s,borderRadius:"12px 12px 16px 16px"}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M19 12l-7 7-7-7"/></svg></button><div /></div></div>;
};
