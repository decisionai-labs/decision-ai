export function Skeleton({ className = '' }: { className?: string }) {
    return (
        <div
            className={`animate-pulse bg-gradient-to-r from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] bg-[length:200%_100%] rounded-lg ${className}`}
            style={{
                animation: 'shimmer 1.5s ease-in-out infinite',
            }}
        />
    );
}

export function CardSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 space-y-4">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </div>
    );
}

export function ChatMessageSkeleton({ isAgent = true }: { isAgent?: boolean }) {
    return (
        <div className={`flex ${isAgent ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[80%] rounded-2xl px-5 py-4 ${isAgent
                    ? 'bg-white border border-[#E5E7EB]'
                    : 'bg-gradient-to-br from-[#14B8A6]/20 to-[#0D9488]/20'
                }`}>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-36" />
                    {isAgent && <Skeleton className="h-4 w-24" />}
                </div>
            </div>
        </div>
    );
}

export function StatSkeleton() {
    return (
        <div className="text-center space-y-2">
            <Skeleton className="h-10 w-24 mx-auto" />
            <Skeleton className="h-4 w-20 mx-auto" />
        </div>
    );
}

export function HeroSkeleton() {
    return (
        <div className="min-h-[90vh] flex flex-col items-center justify-center p-6 space-y-8">
            <Skeleton className="h-8 w-48 rounded-full" />
            <div className="space-y-4 text-center max-w-3xl">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-4/5 mx-auto" />
            </div>
            <Skeleton className="h-6 w-2/3" />
            <div className="flex gap-4">
                <Skeleton className="h-14 w-48 rounded-xl" />
                <Skeleton className="h-14 w-40 rounded-xl" />
            </div>
        </div>
    );
}
