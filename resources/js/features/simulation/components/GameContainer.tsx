import { ReactNode, useRef, useEffect, useState, KeyboardEventHandler } from "react";
interface GameContainerProps { children: ReactNode; aspectRatio?: string; onKeyDown?: KeyboardEventHandler<HTMLDivElement>; }
export function GameContainer({ children, aspectRatio="16 / 9", onKeyDown }: GameContainerProps) {
  const ref=useRef<HTMLDivElement>(null); const [focused,setFocused]=useState(false);
  useEffect(()=>{ const el=ref.current; el?.focus(); const h=()=>el?.focus(); el?.addEventListener("click",h); return()=>el?.removeEventListener("click",h); },[]);
  return (
    <div ref={ref} tabIndex={0} className={"relative w-full max-w-[960px] mx-auto overflow-hidden focus:outline-none transition-all duration-200 "+(focused?"ring-2 ring-[#00e5ff] ring-offset-2 ring-offset-[#070b14]":"")} style={{ aspectRatio, background:"#162030", border:"3px solid #233044", borderRadius:28, boxShadow:"0 18px 36px rgba(0,0,0,0.55),0 6px 14px rgba(0,0,0,0.4),inset 0 1.5px 0 rgba(255,255,255,0.08)" }} onKeyDown={onKeyDown} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}>
      {children}
    </div>
  );
}
