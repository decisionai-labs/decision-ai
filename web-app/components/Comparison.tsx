'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/Button';
import Link from 'next/link';

interface ComparisonData {
    feature: string;
    neurosan: string | boolean;
    traditional: string | boolean;
}

const comparisonData: ComparisonData[] = [
    {
        feature: 'Wallet Address Visibility',
        neurosan: 'Hidden from AI',
        traditional: 'Visible to AI',
    },
    {
        feature: 'Privacy Architecture',
        neurosan: 'sly_data isolation',
        traditional: 'No isolation',
    },
    {
        feature: 'Data Access Control',
        neurosan: 'Tool-only access',
        traditional: 'Full AI access',
    },
    {
        feature: 'Real-time Blockchain Data',
        neurosan: true,
        traditional: true,
    },
    {
        feature: 'Natural Language Queries',
        neurosan: true,
        traditional: true,
    },
    {
        feature: 'Open Source',
        neurosan: true,
        traditional: false,
    },
    {
        feature: 'Multi-Agent Support',
        neurosan: true,
        traditional: false,
    },
];

export function Comparison() {
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

    const renderValue = (value: string | boolean, isNeurosan: boolean) => {
        if (typeof value === 'boolean') {
            return value ? (
                <svg className={`w-6 h-6 ${isNeurosan ? 'text-[#14B8A6]' : 'text-[#22C55E]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            ) : (
                <svg className="w-6 h-6 text-[#EF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            );
        }
        return <span className={`text-sm font-medium ${isNeurosan ? 'text-[#14B8A6]' : 'text-[#EF4444]'}`}>{value}</span>;
    };

    return (
        <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden bg-[#FAFAF8] border-t border-[#E5E7EB]">
            {/* Background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#14B8A6]/6 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#EF4444]/4 rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block px-4 py-1.5 text-sm font-medium text-[#14B8A6] bg-[#14B8A6]/10 border border-[#14B8A6]/20 rounded-full mb-6">
                        The Difference
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] mb-4">
                        Why Choose <span className="text-gradient">NeuroSan?</span>
                    </h2>
                    <p className="text-lg text-[#6B7280]">
                        See how we compare to traditional blockchain AI tools.
                    </p>
                </div>

                {/* Comparison table */}
                <div className={`bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {/* Header row */}
                    <div className="grid grid-cols-3 border-b border-[#E5E7EB]">
                        <div className="p-4 sm:p-6 text-sm font-medium text-[#6B7280]">Feature</div>
                        <div className="p-4 sm:p-6 text-center bg-[#14B8A6]/5 border-x border-[#E5E7EB]">
                            <div className="inline-flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#14B8A6] to-[#0D9488] flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <span className="font-semibold text-[#1A1A1A]">NeuroSan</span>
                            </div>
                        </div>
                        <div className="p-4 sm:p-6 text-center">
                            <span className="font-semibold text-[#6B7280]">Traditional AI</span>
                        </div>
                    </div>

                    {/* Data rows */}
                    {comparisonData.map((row, index) => (
                        <div
                            key={row.feature}
                            className={`grid grid-cols-3 border-b border-[#E5E7EB] last:border-b-0 transition-all duration-500 hover:bg-[#F9FAFB] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                            style={{ transitionDelay: `${300 + index * 75}ms` }}
                        >
                            <div className="p-4 sm:p-6 text-sm text-[#374151]">{row.feature}</div>
                            <div className="p-4 sm:p-6 flex items-center justify-center bg-[#14B8A6]/5 border-x border-[#E5E7EB]">
                                {renderValue(row.neurosan, true)}
                            </div>
                            <div className="p-4 sm:p-6 flex items-center justify-center">
                                {renderValue(row.traditional, false)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className={`text-center mt-12 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <Link href="/demo">
                        <Button size="lg" className="btn-glow">
                            Experience the Difference
                            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
