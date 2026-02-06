interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'accent' | 'muted';
    className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
    const variants = {
        default: 'bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]',
        accent: 'bg-gradient-to-r from-[#CCFBF1] to-[#F0FDFA] text-[#0D9488] border-[#14B8A6]/20',
        muted: 'bg-[#FAFAF8] text-[#6B7280] border-[#E5E7EB]',
    };

    return (
        <span
            className={`
                inline-flex items-center px-4 py-1.5
                text-sm font-medium rounded-full
                border backdrop-blur-sm
                shadow-sm
                transition-all duration-200
                hover:shadow-md
                ${variants[variant]}
                ${className}
            `}
        >
            {children}
        </span>
    );
}
