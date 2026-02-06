'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/Button';
import Link from 'next/link';

const useCases = [
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: 'Portfolio Tracking',
        description: 'Query your complete portfolio including SOL, tokens, and NFTs with natural language. All without exposing your wallet to the AI.',
        query: '"What tokens do I hold and what are they worth?"',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
        ),
        title: 'Transaction Analysis',
        description: 'Understand your transaction history in plain English. Get summaries, patterns, and insights from your on-chain activity.',
        query: '"Summarize my transactions from last week"',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        title: 'DeFi Insights',
        description: 'Monitor your DeFi positions, LP rewards, and yield farming performance across Solana protocols.',
        query: '"How are my Raydium LP positions performing?"',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        title: 'Security Monitoring',
        description: 'Check for suspicious approvals, monitor large transfers, and keep your assets secure with privacy-first alerts.',
        query: '"Do I have any risky token approvals?"',
    },
];

export function UseCases() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
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

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % useCases.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF8] via-white to-[#FAFAF8] -z-10" />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block px-4 py-1.5 text-sm font-medium text-[#14B8A6] bg-[#CCFBF1] rounded-full mb-6">
                        Use Cases
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] mb-4">
                        What Can You <span className="text-gradient">Build?</span>
                    </h2>
                    <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
                        From portfolio tracking to DeFi analytics, NeuroSan enables powerful blockchain insights without compromising privacy.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Use case cards */}
                    <div className={`space-y-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                        {useCases.map((useCase, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${activeIndex === index
                                        ? 'bg-white border-[#14B8A6]/30 shadow-lg shadow-[#14B8A6]/5'
                                        : 'bg-white/50 border-[#E5E7EB] hover:border-[#D1D5DB]'
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${activeIndex === index
                                            ? 'bg-gradient-to-br from-[#14B8A6] to-[#0D9488] text-white'
                                            : 'bg-[#F3F4F6] text-[#6B7280]'
                                        }`}>
                                        {useCase.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-semibold mb-1 transition-colors ${activeIndex === index ? 'text-[#1A1A1A]' : 'text-[#4B5563]'
                                            }`}>{useCase.title}</h3>
                                        <p className={`text-sm transition-colors ${activeIndex === index ? 'text-[#6B7280]' : 'text-[#9CA3AF]'
                                            }`}>{useCase.description}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Example query display */}
                    <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                        <div className="relative">
                            {/* Glow behind */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#14B8A6]/20 to-[#8B5CF6]/20 rounded-3xl blur-2xl" />

                            {/* Card */}
                            <div className="relative bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-xl">
                                {/* Terminal header */}
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                                    <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                                    <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                                    <span className="ml-4 text-xs text-[#9CA3AF]">NeuroSan Terminal</span>
                                </div>

                                {/* Query */}
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <span className="text-[#14B8A6] font-mono text-sm">→</span>
                                        <p className="text-[#1A1A1A] font-medium text-lg">
                                            {useCases[activeIndex].query}
                                        </p>
                                    </div>

                                    {/* Simulated response */}
                                    <div className="mt-4 p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
                                            <span className="text-xs text-[#6B7280]">Processing with sly_data...</span>
                                        </div>
                                        <div className="h-4 bg-gradient-to-r from-[#E5E7EB] to-[#F3F4F6] rounded animate-pulse" />
                                    </div>
                                </div>

                                {/* Try it button */}
                                <div className="mt-6">
                                    <Link href="/demo">
                                        <Button variant="secondary" className="w-full group">
                                            Try This Query
                                            <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
