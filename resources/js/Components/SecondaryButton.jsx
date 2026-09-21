export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center rounded-lg border border-cat-line bg-cat-card px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-200 transition duration-150 ease-in-out hover:border-cat-cyan/40 focus:outline-none focus:ring-2 focus:ring-cat-cyan/50 focus:ring-offset-2 focus:ring-offset-cat-bg disabled:opacity-25 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
