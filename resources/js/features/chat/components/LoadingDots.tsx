export function LoadingDots({ label = "Menyusun jawaban" }: { label?: string }) {
    return (
        <div className="flex items-center gap-2 text-[12px] font-bold text-[#8b98ab]" role="status">
            <span className="inline-flex items-center gap-1 rounded-full px-3 py-2" style={{ background: "#0f1828", border: "2px solid rgba(255,255,255,0.06)" }}>
                {[0, 1, 2].map((index) => (
                    <span
                        key={index}
                        className="h-1.5 w-1.5 rounded-full animate-bounce"
                        style={{ background: "#00e5ff", animationDelay: `${index * 120}ms` }}
                    />
                ))}
            </span>
            <span>{label}...</span>
        </div>
    );
}
