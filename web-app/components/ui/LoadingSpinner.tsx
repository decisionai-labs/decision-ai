'use client';

export function LoadingSpinner({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-10 h-10',
    };

    return (
        <div className={`relative ${sizes[size]} ${className}`}>
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-2 border-white/10" />

            {/* Spinning gradient arc */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#14B8A6] animate-spin" />

            {/* Optional inner glow */}
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#14B8A6]/10 to-transparent" />
        </div>
    );
}

export function LoadingDots({ className = '' }: { className?: string }) {
    return (
        <div className={`flex items-center gap-1 ${className}`}>
            <div className="w-2 h-2 rounded-full bg-[#14B8A6] animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 rounded-full bg-[#14B8A6] animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 rounded-full bg-[#14B8A6] animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
    );
}

export function FullPageLoader() {
    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
            {/* Logo */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#14B8A6] to-[#0D9488] flex items-center justify-center mb-6 shadow-lg shadow-[#14B8A6]/20">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </div>

            {/* Loading spinner */}
            <LoadingSpinner size="lg" />

            {/* Text */}
            <p className="mt-6 text-sm text-zinc-400">Loading Decision AI...</p>
        </div>
    );
}
