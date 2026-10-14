import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-md border-[#233044] bg-[#0f1828] text-slate-200 shadow-sm placeholder:text-slate-500 focus:border-[#00e5ff] focus:ring-[#00e5ff] ' +
                className
            }
            ref={localRef}
        />
    );
});
