'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useRef } from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

// Dynamically import Spline with no SSR to prevent hydration issues
const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
    loading: () => <SplineLoader />
});

function SplineLoader() {
    return (
        <div className="w-full h-full bg-[#FFFEF9]" />
    );
}

export function Hero() {
    const heroRef = useRef<HTMLElement>(null);

    // Mouse following glow effect
    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = hero.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            hero.style.setProperty('--mouse-x', `${x}%`);
            hero.style.setProperty('--mouse-y', `${y}%`);
        };

        hero.addEventListener('mousemove', handleMouseMove);
        return () => hero.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative pt-32 pb-20 px-6 min-h-[90vh] overflow-hidden"
        >
            {/* Mouse-following glow */}
            <div
                className="absolute inset-0 z-[1] pointer-events-none opacity-60 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(20, 184, 166, 0.15), transparent 40%)`
                }}
            />

            {/* Spline 3D Background */}
            <div className="absolute inset-0 z-0">
                <Suspense fallback={<SplineLoader />}>
                    <Spline
                        scene="https://prod.spline.design/X4aSqMdICckUoXSN/scene.splinecode"
                        style={{ width: '100%', height: '100%' }}
                    />
                </Suspense>
                {/* Gradient overlay for text readability - ivory theme */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#FFFEF9]/50 via-[#FFFEF9]/30 to-[#FFFEF9]/80" />
            </div>

            {/* Floating decorative elements */}
            <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-[#14B8A6]/10 to-[#14B8A6]/5 blur-2xl animate-float-slow" />
            <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-[#8B5CF6]/10 to-[#8B5CF6]/5 blur-2xl animate-float-delayed" />
            <div className="absolute bottom-40 left-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-[#14B8A6]/10 to-[#14B8A6]/5 blur-2xl animate-float" />

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Badge with glow */}
                <div className="animate-fade-in-up stagger-1">
                    <Badge variant="accent" className="mb-6 glow-teal">
                        Privacy-First AI Agents
                    </Badge>
                </div>

                {/* Headline with animated gradient text */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1A1A1A] mb-6 animate-fade-in-up stagger-2">
                    AI That Respects Your{' '}
                    <span className="text-gradient inline-block">Privacy</span>
                </h1>

                {/* Subtitle with enhanced styling */}
                <p className="text-lg sm:text-xl text-[#6B7280] max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-3 leading-relaxed">
                    Build intelligent Solana agents that never see your wallet address.
                    Your data stays private through our{' '}
                    <code className="px-2 py-1 bg-[#14B8A6]/10 text-[#0D9488] rounded-md text-sm font-mono">
                        sly_data
                    </code>{' '}
                    architecture.
                </p>

                {/* CTAs with enhanced styling */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-4">
                    <Link href="/demo">
                        <Button size="lg" className="btn-glow btn-ripple group">
                            Try the Demo
                            <svg
                                className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </Button>
                    </Link>
                    <Link
                        href="https://github.com/NeuroSolanaAgents/neurosan"
                        target="_blank"
                    >
                        <Button variant="secondary" size="lg" className="group">
                            <svg className="mr-2 w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                            View on GitHub
                        </Button>
                    </Link>
                </div>

                {/* Enhanced scroll indicator */}
                <div className="mt-20 flex flex-col items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.6s', opacity: 0 }}>
                    <span className="text-xs text-[#9CA3AF] uppercase tracking-widest">Scroll to explore</span>
                    <div className="relative">
                        <div className="w-6 h-10 rounded-full border-2 border-[#E5E7EB] flex items-start justify-center p-1">
                            <div className="w-1.5 h-3 rounded-full bg-[#14B8A6] animate-bounce-subtle" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
