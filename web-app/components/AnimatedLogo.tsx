'use client';

export function AnimatedLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    const sizes = {
        sm: { wrapper: 'w-8 h-8', icon: 'w-4 h-4' },
        md: { wrapper: 'w-10 h-10', icon: 'w-5 h-5' },
        lg: { wrapper: 'w-14 h-14', icon: 'w-7 h-7' },
    };

    return (
        <div className={`relative ${sizes[size].wrapper}`}>
            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#14B8A6] via-[#0D9488] to-[#8B5CF6] animate-spin-slow opacity-50 blur-sm" />

            {/* Inner container */}
            <div className={`relative ${sizes[size].wrapper} rounded-xl bg-gradient-to-br from-[#14B8A6] to-[#0D9488] flex items-center justify-center shadow-lg shadow-[#14B8A6]/30`}>
                {/* Lock icon */}
                <svg
                    className={`${sizes[size].icon} text-white`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                </svg>

                {/* Pulse effect */}
                <div className="absolute inset-0 rounded-xl bg-[#111111]/20 animate-ping opacity-20" />
            </div>
        </div>
    );
}

// CSS for slow spin - add to globals.css
// @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
// .animate-spin-slow { animation: spin-slow 8s linear infinite; }
