import { useState } from "react";
import type { FC } from "react";
import type { StoryChoice } from "@/features/simulation/types/simulation";
interface ChoicePanelProps { choices: StoryChoice[]; onSelect: (id:string)=>void; disabled?: boolean; className?: string; }

/** Fisher-Yates shuffle pada salinan array — array asli tidak dimutasi. */
function shuffleChoices<T>(choices: T[]): T[] {
  const shuffled = [...choices];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const ChoicePanel: FC<ChoicePanelProps> = ({ choices, onSelect, disabled=false, className }) => {
  // Acak sekali per mount; saat dialog ditutup lalu dibuka ulang, ChoicePanel mount ulang sehingga posisi diacak kembali.
  const [shuffledChoices] = useState(() => shuffleChoices(choices));
  return (
    <div className={"absolute left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4 "+(className||"")} style={{ bottom:"calc(33% + 16px)" }}>
      <div className="space-y-2.5">
        {shuffledChoices.map((choice)=>(
          <button key={choice.id} type="button" onClick={()=>!disabled&&onSelect(choice.id)} disabled={disabled} className="w-full px-4 py-3.5 text-left disabled:opacity-50 disabled:cursor-not-allowed transition" style={{ background:"#162030", border:"3px solid #233044", borderRadius:20, boxShadow:"0 10px 22px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.06)" }}>
            <p className="text-sm font-bold leading-relaxed text-white" style={{ fontFamily:"'Nunito',sans-serif" }}>{choice.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
