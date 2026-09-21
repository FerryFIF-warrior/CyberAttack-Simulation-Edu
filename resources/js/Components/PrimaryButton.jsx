export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-lg bg-cat-cyan px-4 py-2 text-xs font-bold uppercase tracking-widest text-cat-bg transition duration-150 ease-in-out hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-cat-cyan/50 focus:ring-offset-2 focus:ring-offset-cat-bg active:brightness-95 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
