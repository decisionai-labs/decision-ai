'use client';

import { useEffect, useRef, useState } from 'react';

const roadmapItems = [
    {
        quarter: 'Q1 2026',
        status: 'completed',
        title: 'Foundation',
        items: [
            'Core sly_data architecture',
            'Solana RPC integration',
            'Web demo launch',
            'Open source release',
        ],
    },
    {
        quarter: 'Q2 2026',
        status: 'current',
        title: 'Expansion',
        items: [
            'TypeScript SDK release',
            'Advanced transaction parsing',
            'DeFi protocol integrations',
            'Community documentation',
        ],
    },
    {
        quarter: 'Q3 2026',
        status: 'upcoming',
        title: 'Multi-Chain',
        items: [
            'Ethereum support',
            'Cross-chain queries',
            'Portfolio aggregation',
            'Mobile SDK (React Native)',
        ],
    },
    {
        quarter: 'Q4 2026',
        status: 'planned',
        title: 'Enterprise',
        items: [
            'Enterprise deployment options',
            'Custom agent training',
            'Compliance tooling',
            'SLA guarantees',
        ],
    },
];

export function Roadmap() {
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

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'completed':
                return {
                    badge: 'bg-[#14B8A6]/10 text-[#14B8A6] border-[#14B8A6]/20',
                    dot: 'bg-[#14B8A6]',
                    line: 'bg-[#14B8A6]',
                    card: 'border-[#14B8A6]/20',
                };
            case 'current':
                return {
                    badge: 'bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20',
                    dot: 'bg-[#8B5CF6] animate-pulse',
                    line: 'bg-gradient-to-b from-[#14B8A6] to-[#8B5CF6]',
                    card: 'border-[#8B5CF6]/30 shadow-lg shadow-[#8B5CF6]/5',
                };
            case 'upcoming':
                return {
                    badge: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
                    dot: 'bg-[#F59E0B]',
                    line: 'bg-[#E5E7EB]',
                    card: 'border-white/10',
                };
            default:
                return {
                    badge: 'bg-[#6B7280]/10 text-zinc-400 border-[#6B7280]/20',
                    dot: 'bg-[#9CA3AF]',
                    line: 'bg-[#E5E7EB]',
                    card: 'border-white/10',
                };
        }
    };

    return (
        <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden bg-[#111111]">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FAFAF8] to-transparent" />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block px-4 py-1.5 text-sm font-medium text-[#14B8A6] bg-[#CCFBF1] rounded-full mb-6">
                        What's Next
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                        Product <span className="text-gradient">Roadmap</span>
                    </h2>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        Our vision for the future of privacy-preserving blockchain AI.
                    </p>
                </div>

                {/* Timeline */}
                <div className="grid md:grid-cols-4 gap-8 relative">
                    {/* Connecting line (desktop) */}
                    <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-1 bg-[#E5E7EB] rounded-full" />
                    <div
                        className={`hidden md:block absolute top-8 left-[12.5%] h-1 rounded-full bg-gradient-to-r from-[#14B8A6] to-[#8B5CF6] transition-all duration-1000 ${isVisible ? 'w-[37.5%]' : 'w-0'}`}
                        style={{ transitionDelay: '500ms' }}
                    />

                    {roadmapItems.map((item, index) => {
                        const styles = getStatusStyles(item.status);
                        return (
                            <div
                                key={item.quarter}
                                className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: `${200 + index * 150}ms` }}
                            >
                                {/* Timeline dot */}
                                <div className="hidden md:flex justify-center mb-6">
                                    <div className={`w-4 h-4 rounded-full ${styles.dot} ring-4 ring-white`} />
                                </div>

                                {/* Card */}
                                <div className={`bg-[#111111] rounded-2xl border p-6 h-full ${styles.card}`}>
                                    {/* Quarter badge */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${styles.badge}`}>
                                            {item.quarter}
                                        </span>
                                        {item.status === 'current' && (
                                            <span className="text-xs text-[#8B5CF6] font-medium">In Progress</span>
                                        )}
                                        {item.status === 'completed' && (
                                            <svg className="w-5 h-5 text-[#14B8A6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-semibold text-white mb-4">{item.title}</h3>

                                    <ul className="space-y-2">
                                        {item.items.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-start gap-2 text-sm text-zinc-400">
                                                <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${item.status === 'completed' ? 'text-[#14B8A6]' : 'text-[#D1D5DB]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className={item.status === 'completed' ? 'line-through text-zinc-500' : ''}>
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
