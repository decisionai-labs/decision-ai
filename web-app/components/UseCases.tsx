'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/Button';
import Link from 'next/link';
import { PremiumSlider } from './ui/PremiumSlider';
import { LuTrendingUp, LuShieldCheck, LuWallet, LuActivity } from 'react-icons/lu';

const useCases = [
    {
        id: 'portfolio',
        icon: <LuWallet className="w-10 h-10" />,
        title: 'Portfolio Tracking',
        description: 'Query your complete portfolio including SOL, tokens, and NFTs with natural language. All without exposing your wallet to the AI.',
        content: (
            <div className="p-4 sm:p-6 bg-black/40 rounded-xl border border-white/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#14B8A6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start gap-3">
                    <span className="text-[#14B8A6] font-mono text-sm mt-1">→</span>
                    <p className="text-white font-medium text-base sm:text-lg">
                        &quot;What tokens do I hold and what are they worth?&quot;
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 'transactions',
        icon: <LuActivity className="w-10 h-10" />,
        title: 'Transaction Analysis',
        description: 'Understand your transaction history in plain English. Get summaries, patterns, and insights from your on-chain activity.',
        content: (
            <div className="p-4 sm:p-6 bg-black/40 rounded-xl border border-white/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start gap-3">
                    <span className="text-[#8B5CF6] font-mono text-sm mt-1">→</span>
                    <p className="text-white font-medium text-base sm:text-lg">
                        &quot;Summarize my transactions from last week&quot;
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 'defi',
        icon: <LuTrendingUp className="w-10 h-10" />,
        title: 'DeFi Insights',
        description: 'Monitor your DeFi positions, LP rewards, and yield farming performance across Solana protocols.',
        content: (
            <div className="p-4 sm:p-6 bg-black/40 rounded-xl border border-white/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start gap-3">
                    <span className="text-[#F59E0B] font-mono text-sm mt-1">→</span>
                    <p className="text-white font-medium text-base sm:text-lg">
                        &quot;How are my Raydium LP positions performing?&quot;
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 'security',
        icon: <LuShieldCheck className="w-10 h-10" />,
        title: 'Security Monitoring',
        description: 'Check for suspicious approvals, monitor large transfers, and keep your assets secure with privacy-first alerts.',
        content: (
            <div className="p-4 sm:p-6 bg-black/40 rounded-xl border border-white/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#EF4444]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start gap-3">
                    <span className="text-[#EF4444] font-mono text-sm mt-1">→</span>
                    <p className="text-white font-medium text-base sm:text-lg">
                        &quot;Do I have any risky token approvals?&quot;
                    </p>
                </div>
            </div>
        )
    },
];

export function UseCases() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.02] -z-10" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block px-4 py-1.5 text-sm font-medium text-[#14B8A6] bg-[#14B8A6]/10 border border-[#14B8A6]/20 rounded-full mb-6 tracking-wide uppercase">
                        Use Cases
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-semibold text-white mb-6">
                        What Can You <span className="text-gradient">Build?</span>
                    </h2>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
                        From portfolio tracking to DeFi analytics, Decision AI enables powerful blockchain insights without compromising privacy.
                    </p>
                </div>

                {/* Slider */}
                <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <PremiumSlider items={useCases} autoPlayInterval={6000} />
                </div>

                {/* Try it out CTA */}
                <div className={`mt-16 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <Link href="/demo">
                        <Button className="btn-glow group bg-white text-black hover:bg-zinc-200 px-8 py-6 rounded-full text-lg font-medium transition-all">
                            Launch Interactive Demo
                            <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
