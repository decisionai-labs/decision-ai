'use client';

import { useEffect, useRef, useState } from 'react';
import { Card } from './ui/Card';
import { LuWallet, LuMessageSquare, LuZap } from 'react-icons/lu';

const steps = [
    {
        number: '01',
        title: 'Connect Wallet',
        description: 'Your wallet address is captured securely and stored in sly_data—never exposed to the AI.',
        icon: <LuWallet className="w-6 h-6" />,
    },
    {
        number: '02',
        title: 'Ask Anything',
        description: 'Query your balances, tokens, transactions, or NFTs using natural language.',
        icon: <LuMessageSquare className="w-6 h-6" />,
    },
    {
        number: '03',
        title: 'Get Answers',
        description: 'The AI fetches blockchain data using your sly_data—without ever seeing your address.',
        icon: <LuZap className="w-6 h-6" />,
    },
];

export function HowItWorks() {
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
        <section id="how-it-works" ref={sectionRef} className="py-24 px-6 bg-[#111111] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-mesh opacity-50" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                        How It <span className="text-gradient">Works</span>
                    </h2>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        Three simple steps to interact with Solana while keeping your wallet private.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Animated connecting line */}
                    <div className={`hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-0.5 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                        <div className={`h-full bg-gradient-to-r from-[#14B8A6] via-[#0D9488] to-[#14B8A6] transition-transform duration-1000 origin-left ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}
                            style={{ transitionDelay: '600ms' }}
                        />
                    </div>

                    {steps.map((step, index) => (
                        <div
                            key={step.number}
                            className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                            style={{ transitionDelay: `${200 + index * 150}ms` }}
                        >
                            <Card hover className="text-center h-full card-shine relative z-10">
                                {/* Number badge with gradient */}
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#14B8A6] to-[#0D9488] text-white text-lg font-bold mb-6 shadow-lg glow-teal animate-float-slow"
                                    style={{ animationDelay: `${index * 200}ms` }}>
                                    {step.number}
                                </div>

                                {/* Icon */}
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#14B8A6]/10 text-[#14B8A6] mb-4 transition-transform group-hover:scale-110">
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-semibold text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
