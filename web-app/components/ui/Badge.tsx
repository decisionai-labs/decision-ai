interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'accent' | 'muted';
    className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
    const variants = {
        default: 'bg-white/5 text-zinc-400 border-white/10',
        accent: 'bg-gradient-to-r from-[#CCFBF1] to-[#F0FDFA] text-[#0D9488] border-[#14B8A6]/20',
        muted: 'bg-black text-zinc-400 border-white/10',
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
