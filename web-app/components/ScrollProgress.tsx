'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = (scrollTop / docHeight) * 100;
            setProgress(scrollProgress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-transparent">
            <div
                className="h-full bg-gradient-to-r from-[#14B8A6] via-[#0D9488] to-[#8B5CF6] transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
            />
            {/* Glow effect at the end */}
            <div
                className="absolute top-0 h-1 w-8 bg-gradient-to-r from-transparent to-[#14B8A6] blur-sm"
                style={{ left: `calc(${progress}% - 16px)` }}
            />
        </div>
    );
}
