import type { FC } from "react";
interface NarrativePanelProps { panels: { text: string }[]; currentPanel: number; onNext: ()=>void; nextLabel?: string; className?: string; }
export const NarrativePanel: FC<NarrativePanelProps> = ({ panels, currentPanel, onNext, nextLabel="Lanjut", className }) => {
  if(panels.length===0||currentPanel>=panels.length) return null;
  const panel=panels[currentPanel];
  return (
    <div className={"fixed bottom-0 left-0 right-0 z-30 p-3 sm:p-4 "+(className||"")} style={{ height:"33%" }}>
      <div className="max-w-4xl mx-auto h-full p-4 flex flex-col" style={{ background:"#162030", border:"3px solid #233044", borderRadius:28, boxShadow:"0 18px 36px rgba(0,0,0,0.55),inset 0 1.5px 0 rgba(255,255,255,0.08)" }}>
        <p className="text-[15px] leading-[1.7] text-slate-200">{panel.text}</p>
        <div className="mt-auto flex items-center justify-between pt-3" style={{ borderTop:"2px solid #233044", marginTop:12, paddingTop:12 }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, letterSpacing:"0.12em", color:"#8b98ab" }}>{String(currentPanel+1).padStart(2,"0")} / {String(panels.length).padStart(2,"0")}</span>
          <button onClick={onNext} className="px-5 py-2.5 rounded-[16px] text-sm font-extrabold" style={{ background:"#00e5ff", color:"#0a0e15", border:"2.5px solid #00b8cc", boxShadow:"0 4px 0 #00b8cc,0 8px 16px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.3)", fontFamily:"'Nunito',sans-serif" }}>{nextLabel}</button>
        </div>
      </div>
    </div>
  );
};
