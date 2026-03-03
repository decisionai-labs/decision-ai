'use client';

import { useEffect, useRef, useState } from 'react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { LuWallet, LuCoins, LuHistory, LuImage } from 'react-icons/lu';

const tools = [
    {
        name: 'GetBalance',
        description: 'Query native SOL balance for any wallet',
        file: 'balance.py',
        icon: <LuWallet className="w-6 h-6" />,
        gradient: 'from-teal-400 to-emerald-500',
    },
    {
        name: 'GetTokenBalances',
        description: 'Retrieve all SPL token holdings with metadata',
        file: 'tokens.py',
        icon: <LuCoins className="w-6 h-6" />,
        gradient: 'from-violet-400 to-purple-500',
    },
    {
        name: 'GetTransactions',
        description: 'Fetch recent transaction history with details',
        file: 'transactions.py',
        icon: <LuHistory className="w-6 h-6" />,
        gradient: 'from-pink-400 to-rose-500',
    },
    {
        name: 'GetNFTs',
        description: 'Discover NFT collectibles in any wallet',
        file: 'nfts.py',
        icon: <LuImage className="w-6 h-6" />,
        gradient: 'from-blue-400 to-cyan-500',
    },
];

export function Features() {
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
        <section id="features" ref={sectionRef} className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <Badge variant="muted" className="mb-4">Built for Solana</Badge>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                        Privacy-Preserving <span className="text-gradient">Tools</span>
                    </h2>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        Each tool uses sly_data to access blockchain data without exposing wallet addresses to the AI model.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 gap-6">
                    {tools.map((tool, index) => (
                        <div
                            key={tool.name}
                            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            style={{ transitionDelay: `${150 + index * 100}ms` }}
                        >
                            <Card hover padding="lg" className="group glow-border card-shine h-full">
                                <div className="flex items-start gap-4">
                                    {/* Icon with gradient background */}
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        {tool.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-lg font-semibold text-white group-hover:text-[#14B8A6] transition-colors">
                                                {tool.name}
                                            </h3>
                                            <code className="text-xs text-white/50 bg-white/5 px-2 py-0.5 rounded font-mono">
                                                {tool.file}
                                            </code>
                                        </div>
                                        <p className="text-zinc-400">
                                            {tool.description}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* Privacy highlight */}
                <div className={`mt-12 p-6 bg-[#14B8A6]/5 border border-[#14B8A6]/20 rounded-2xl text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="flex items-center justify-center gap-2 text-[#14B8A6] mb-2">
                        <div className="w-8 h-8 rounded-full bg-[#14B8A6]/20 flex items-center justify-center animate-pulse-subtle">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <span className="font-semibold text-lg">Privacy Promise</span>
                    </div>
                    <p className="text-zinc-400 text-sm max-w-lg mx-auto">
                        The AI language model never sees your wallet address. All sensitive data flows through sly_data,
                        a secure channel that tools can access but the AI cannot read.
                    </p>
                </div>
            </div>
        </section>
    );
}
