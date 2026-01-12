import { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'accent' | 'muted';
}

export function Badge({
    className = '',
    variant = 'default',
    children,
    ...props
}: BadgeProps) {
    const variants = {
        default: 'bg-[#F3F4F6] text-[#6B7280]',
        accent: 'bg-[#CCFBF1] text-[#0D9488]',
        muted: 'bg-[#FAFAF8] text-[#9CA3AF] border border-[#E5E7EB]',
    };

    return (
        <span
            className={`
        inline-flex items-center px-3 py-1
        text-sm font-medium rounded-full
        ${variants[variant]}
        ${className}
      `}
            {...props}
        >
            {children}
        </span>
    );
}
