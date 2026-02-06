'use client';

import { useEffect, useRef, useState } from 'react';

export function SecurityShowcase() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden bg-white border-t border-[#E5E7EB]">
            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Glow effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#14B8A6]/8 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B5CF6]/8 rounded-full blur-3xl" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                        <span className="inline-block px-4 py-1.5 text-sm font-medium text-[#14B8A6] bg-[#14B8A6]/10 rounded-full mb-6 border border-[#14B8A6]/20">
                            Zero-Knowledge Privacy
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1A1A1A] mb-6 leading-tight">
                            Your Wallet.<br />
                            <span className="text-gradient">Your Privacy.</span>
                        </h2>
                        <p className="text-lg text-[#6B7280] mb-8 leading-relaxed">
                            Traditional AI tools see everything you share with them. NeuroSan's sly_data
                            architecture creates a secure channel that tools can access, but the AI model cannot read.
                        </p>

                        {/* Security features */}
                        <div className="space-y-4">
                            {[
                                {
                                    title: 'Address Isolation',
                                    desc: 'Wallet addresses stored in encrypted sly_data channel'
                                },
                                {
                                    title: 'Tool-Only Access',
                                    desc: 'Only authorized tools can access sensitive data'
                                },
                                {
                                    title: 'Audit Trail',
                                    desc: 'Every data access is logged and verifiable'
                                },
                            ].map((feature, index) => (
                                <div
                                    key={feature.title}
                                    className={`flex items-start gap-4 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                                >
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#14B8A6]/15 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-[#14B8A6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#1A1A1A]">{feature.title}</h4>
                                        <p className="text-sm text-[#6B7280]">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Visual diagram */}
                    <div className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                        <div className="relative p-8 bg-gradient-to-br from-[#F8FFFE] to-[#F0F4FF] rounded-3xl border border-[#E5E7EB] shadow-sm">
                            {/* Animated connection lines */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" fill="none">
                                <path
                                    d="M 100 80 Q 200 80 200 150 Q 200 220 300 220"
                                    stroke="url(#gradient-line)"
                                    strokeWidth="2"
                                    strokeDasharray="8 4"
                                    className="animate-pulse-subtle"
                                />
                                <path
                                    d="M 100 220 Q 150 220 150 150 Q 150 80 200 80"
                                    stroke="#D1D5DB"
                                    strokeWidth="2"
                                    strokeDasharray="8 4"
                                    opacity="0.4"
                                />
                                <defs>
                                    <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#14B8A6" />
                                        <stop offset="100%" stopColor="#8B5CF6" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Nodes */}
                            <div className="relative z-10 flex flex-col gap-16">
                                {/* Top row */}
                                <div className="flex justify-between items-start">
                                    <div className="text-center">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#14B8A6] to-[#0D9488] flex items-center justify-center mb-3 shadow-lg shadow-[#14B8A6]/20">
                                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                        </div>
                                        <p className="text-xs text-[#6B7280] font-medium">Your Wallet</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center mb-3 shadow-lg shadow-[#8B5CF6]/20 animate-float-slow">
                                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <p className="text-xs text-[#6B7280] font-medium">AI Agent</p>
                                    </div>
                                </div>

                                {/* Middle - sly_data */}
                                <div className="flex justify-center">
                                    <div className="text-center">
                                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-white to-[#F0FDFA] border-2 border-[#14B8A6]/40 flex items-center justify-center mb-3 shadow-md glow-pulse-teal">
                                            <div className="text-center">
                                                <svg className="w-10 h-10 text-[#14B8A6] mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                                <span className="text-xs font-mono text-[#14B8A6]">sly_data</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom row */}
                                <div className="flex justify-between items-end">
                                    <div className="text-center">
                                        <div className="w-16 h-16 rounded-2xl bg-[#F3F4F6] flex items-center justify-center mb-3 border border-[#E5E7EB]">
                                            <svg className="w-8 h-8 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                            </svg>
                                        </div>
                                        <p className="text-xs text-[#6B7280] font-medium">Tools</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-16 h-16 rounded-2xl bg-[#F3F4F6] flex items-center justify-center mb-3 border border-[#E5E7EB]">
                                            <svg className="w-8 h-8 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <p className="text-xs text-[#6B7280] font-medium">Solana RPC</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
