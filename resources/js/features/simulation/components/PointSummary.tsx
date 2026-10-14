import type { FC } from "react";
interface PointSummaryProps { floorPoints: number; isLastFloor: boolean; totalLevelPoints?: number; maxLevelPoints?: number; level: number; nextFloor?: number; busy?: boolean; onContinue: ()=>void; className?: string; }
export const PointSummary: FC<PointSummaryProps> = ({ floorPoints, isLastFloor, totalLevelPoints, maxLevelPoints, level, nextFloor, busy=false, onContinue, className }) => {
  const pc = floorPoints>0?"#00e5ff":floorPoints<0?"#f87171":"#8b98ab";
  const pre = floorPoints>0?"+":"";
  return (
    <div className={"fixed bottom-0 left-0 right-0 z-30 p-3 sm:p-4 "+(className||"")} style={{ height:"33%" }}>
      <div className="relative max-w-4xl mx-auto h-full p-5 flex flex-col items-center justify-center text-center" style={{ background:"#162030", border:"3px solid #233044", borderRadius:28, boxShadow:"0 18px 36px rgba(0,0,0,0.55),inset 0 1.5px 0 rgba(255,255,255,0.08)" }}>
        <p className="text-lg font-extrabold text-white" style={{ fontFamily:"'Nunito',sans-serif" }}>Poin Floor: <span style={{ color:pc }}>{pre}{floorPoints}</span></p>
        {isLastFloor && maxLevelPoints!==undefined && (totalLevelPoints!==undefined||busy) && (
          <div className="mt-3 p-4 w-full max-w-md text-center" style={{ background:"#0f1828", border:"2px solid rgba(255,255,255,0.06)", borderRadius:20, boxShadow:"inset 0 3px 10px rgba(0,0,0,0.4)" }}>
            <p style={{ fontFamily:"'Space Mono',monospace", fontSize:11, letterSpacing:"0.12em", color:"#8b98ab" }}>Total Level {level}</p>
            {totalLevelPoints!==undefined ? <p className="text-xl font-extrabold text-white mt-1">{Math.max(0,Math.min(totalLevelPoints,maxLevelPoints))} <span style={{ color:"#8b98ab", fontWeight:400, fontSize:16 }}>/ {maxLevelPoints}</span></p> : <p className="text-xl font-bold mt-1 animate-pulse" style={{ color:"#8b98ab" }}>Menghitung...</p>}
          </div>
        )}
        <div className="flex gap-3 w-full max-w-md justify-center mt-4">
          {nextFloor ? <button type="button" onClick={onContinue} disabled={busy} className="flex-1 px-6 py-3 rounded-[16px] text-sm font-extrabold disabled:opacity-60" style={{ background:"#ffd23a", color:"#1a1400", border:"2.5px solid #e6b800", boxShadow:"0 4px 0 #e6b800,0 8px 16px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.35)", fontFamily:"'Nunito',sans-serif" }}>{busy?"Menyimpan...":"Lanjut ke Floor "+nextFloor}</button>
          : <button type="button" onClick={onContinue} disabled={busy} className="flex-1 px-6 py-3 rounded-[16px] text-sm font-extrabold disabled:opacity-60" style={{ background:"#0f1828", color:"#cbd5e1", border:"2px solid rgba(255,255,255,0.07)", fontFamily:"'Nunito',sans-serif" }}>{busy?"Menyimpan...":"Selesai"}</button>}
        </div>
      </div>
    </div>
  );
};
