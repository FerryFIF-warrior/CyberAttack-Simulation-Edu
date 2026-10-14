export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-clay-bg px-4 py-10">
            <div
                className="mt-6 w-full overflow-hidden px-6 py-5 text-slate-200 sm:max-w-md"
                style={{
                    background: '#162030',
                    border: '3px solid #233044',
                    borderRadius: 28,
                    boxShadow: '0 18px 36px rgba(0,0,0,0.55), inset 0 1.5px 0 rgba(255,255,255,0.08)',
                }}
            >
                {children}
            </div>
        </div>
    );
}