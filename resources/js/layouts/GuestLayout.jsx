export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-cat-bg px-4 py-10">
            <div className="mt-6 w-full overflow-hidden rounded-2xl border border-cat-line bg-cat-card px-6 py-4 text-slate-300 shadow-lg sm:max-w-md">
                {children}
            </div>
        </div>
    );
}