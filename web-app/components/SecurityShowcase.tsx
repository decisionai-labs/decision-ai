'use client';

import { useEffect, useRef, useState, useId } from 'react';
import { motion } from 'framer-motion';

function CometBeam({ d, color, delay = 0, duration = 3 }: { d: string, color: string, delay?: number, duration?: number }) {
    const id = useId();
    return (
        <g>
            {/* Faint static background track */}
            <path d={d} stroke="rgba(255,255,255,0.03)" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Glowing comet beam */}
            <motion.path
                d={d}
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                style={{ filter: `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 20px ${color})` }}
                initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                animate={{
                    pathLength: [0, 0.25, 0.25, 0],
                    pathOffset: [0, 0, 0.75, 1],
                    opacity: [0, 1, 1, 0]
                }}
                transition={{
                    duration,
                    delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.8, 1]
                }}
            />
        </g>
    );
}

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
        <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden bg-[#111111] border-t border-white/10">
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
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
                            Your Wallet.<br />
                            <span className="text-gradient">Your Privacy.</span>
                        </h2>
                        <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                            Traditional AI tools see everything you share with them. Decision AI&apos;s sly_data
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
                                        <h4 className="font-semibold text-white">{feature.title}</h4>
                                        <p className="text-sm text-zinc-400">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`relative transition-all w-full max-w-lg mx-auto duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        {/* Hyper-modern glassmorphic container */}
                        <div className="relative p-8 md:p-12 bg-[#09090B] rounded-[2.5rem] border border-white/10 shadow-[0_0_100px_-20px_rgba(20,184,166,0.15)] group overflow-hidden">
                            {/* Dotted matrix background */}
                            <div
                                className="absolute inset-0 opacity-20 pointer-events-none"
                                style={{
                                    backgroundImage: 'radial-gradient(circle at 100% 100%, rgba(20,184,166,0.15) 0%, transparent 50%), radial-gradient(circle at 0% 0%, rgba(139,92,246,0.15) 0%, transparent 50%)'
                                }}
                            />
                            <div
                                className="absolute inset-0 opacity-[0.15] pointer-events-none"
                                style={{
                                    backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
                                    backgroundSize: '24px 24px',
                                    maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
                                    WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
                                }}
                            />

                            {/* Animated connection lines (Beams) */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 380" fill="none" preserveAspectRatio="none">
                                {/* Wallet -> sly_data (Turquoise) */}
                                <CometBeam d="M 60 80 C 140 80, 160 190, 200 190" color="#14B8A6" delay={0} duration={2.5} />

                                {/* sly_data -> AI Agent (Purple) */}
                                <CometBeam d="M 200 190 C 240 190, 260 80, 340 80" color="#8B5CF6" delay={1.25} duration={2.5} />

                                {/* Tools -> sly_data (Zinc/White) */}
                                <CometBeam d="M 60 300 C 140 300, 160 190, 200 190" color="#FFFFFF" delay={1} duration={2.5} />

                                {/* sly_data -> Solana RPC (Zinc/White) */}
                                <CometBeam d="M 200 190 C 240 190, 260 300, 340 300" color="#FFFFFF" delay={2.25} duration={2.5} />
                            </svg>

                            {/* Nodes */}
                            <div className="relative z-10 flex flex-col gap-16">
                                {/* Top row */}
                                <div className="flex justify-between items-start relative z-20 mt-4">
                                    <div className="text-center group/node relative">
                                        <div className="absolute inset-0 bg-[#14B8A6] blur-xl opacity-0 group-hover/node:opacity-20 transition-opacity duration-500 rounded-full" />
                                        <div className="relative w-[72px] h-[72px] mx-auto rounded-2xl bg-[#09090B] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center mb-4 transition-transform duration-500 group-hover/node:scale-105 group-hover/node:border-[#14B8A6]/40">
                                            <svg className="w-8 h-8 text-[#14B8A6] transition-transform duration-500 group-hover/node:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                        </div>
                                        <p className="text-[14px] text-zinc-400 font-medium tracking-wide">Your Wallet</p>
                                    </div>
                                    <div className="text-center group/node relative">
                                        <div className="absolute inset-0 bg-[#8B5CF6] blur-xl opacity-0 group-hover/node:opacity-20 transition-opacity duration-500 rounded-full" />
                                        <div className="relative w-[72px] h-[72px] mx-auto rounded-2xl bg-[#09090B] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center mb-4 transition-transform duration-500 group-hover/node:scale-105 group-hover/node:border-[#8B5CF6]/40">
                                            <svg className="w-8 h-8 text-[#8B5CF6] transition-transform duration-500 group-hover/node:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <p className="text-[14px] text-zinc-400 font-medium tracking-wide">AI Agent</p>
                                    </div>
                                </div>

                                {/* Middle - sly_data */}
                                <div className="flex justify-center relative z-20 py-4">
                                    <div className="text-center group/center relative">
                                        {/* Sweeping external glow */}
                                        <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-r from-[#14B8A6] via-[#8B5CF6] to-[#14B8A6] opacity-30 blur-xl group-hover/center:opacity-60 group-hover/center:duration-200 transition-all duration-1000 animate-gradient-xy" />

                                        <div className="relative w-32 h-32 mx-auto rounded-[2rem] bg-[#09090B] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex flex-col items-center justify-center transition-all duration-500 overflow-hidden">
                                            {/* Inner glowing pulse */}
                                            <div className="absolute inset-0 bg-[#14B8A6]/5 group-hover/center:bg-[#14B8A6]/10 transition-colors duration-500" />

                                            <div className="text-center relative z-10">
                                                <svg className="w-10 h-10 text-white mx-auto mb-3 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-transform duration-500 group-hover/center:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                                <span className="text-[14px] font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#14B8A6] to-white drop-shadow-sm">
                                                    sly_data
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom row */}
                                <div className="flex justify-between items-end relative z-20 mb-4">
                                    <div className="text-center group/node relative">
                                        <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover/node:opacity-10 transition-opacity duration-500 rounded-full" />
                                        <div className="relative w-[72px] h-[72px] mx-auto rounded-2xl bg-[#09090B] flex items-center justify-center mb-4 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-500 group-hover/node:border-white/30 group-hover/node:scale-105">
                                            <svg className="w-8 h-8 text-zinc-400 group-hover/node:text-white transition-all duration-500 group-hover/node:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                            </svg>
                                        </div>
                                        <p className="text-[14px] text-zinc-400 font-medium tracking-wide">Tools</p>
                                    </div>
                                    <div className="text-center group/node relative">
                                        <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover/node:opacity-10 transition-opacity duration-500 rounded-full" />
                                        <div className="relative w-[72px] h-[72px] mx-auto rounded-2xl bg-[#09090B] flex items-center justify-center mb-4 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-500 group-hover/node:border-white/30 group-hover/node:scale-105">
                                            <svg className="w-8 h-8 text-zinc-400 group-hover/node:text-white transition-all duration-500 group-hover/node:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <p className="text-[14px] text-zinc-400 font-medium tracking-wide">Solana RPC</p>
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
