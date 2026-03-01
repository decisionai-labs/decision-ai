'use client';

import { CardSwap, Card } from './CardSwap';

const features = [
    {
        title: 'Privacy-First Architecture',
        description: 'Your wallet address never touches the AI model. sly_data ensures complete separation between sensitive data and language processing.',
        gradient: 'from-teal-400 via-emerald-400 to-teal-500',
        label: 'Secure',
        icon: (
            <svg className="w-10 h-10 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        ),
    },
    {
        title: 'Real-Time Blockchain Data',
        description: 'Query balances, tokens, transactions, and NFTs directly from Solana mainnet with sub-second response times.',
        gradient: 'from-violet-400 via-purple-400 to-violet-500',
        label: 'Fast',
        icon: (
            <svg className="w-10 h-10 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        title: 'Multi-Agent Intelligence',
        description: 'Powered by Cognizant\'s NeuroSAN framework - orchestrate multiple specialized AI agents working together.',
        gradient: 'from-pink-400 via-rose-400 to-pink-500',
        label: 'Smart',
        icon: (
            <svg className="w-10 h-10 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        title: 'Open Source & Extensible',
        description: 'Built on open standards with a modular architecture. Add custom tools, integrate your own data sources.',
        gradient: 'from-blue-400 via-cyan-400 to-blue-500',
        label: 'Flexible',
        icon: (
            <svg className="w-10 h-10 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
    },
];

export function FeaturesCardSwap() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Subtle background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-[#FAFAF8] to-white/50 -z-10" />

            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <div>
                        <span className="inline-block px-4 py-1.5 text-sm font-medium text-[#14B8A6] bg-[#CCFBF1] rounded-full mb-6 shadow-sm">
                            Why Decision AI
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
                            AI That Respects<br />
                            Your <span className="text-gradient">Privacy</span>
                        </h2>
                        <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                            Traditional blockchain AI tools require you to share your wallet address with language models.
                            Decision AI changes that with a revolutionary architecture that keeps your data separate.
                        </p>
                        <ul className="space-y-4">
                            {[
                                'Zero-knowledge wallet analysis',
                                'Real-time Solana RPC integration',
                                'Multi-agent orchestration'
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-3 text-[#4B5563] group">
                                    <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-[#14B8A6] to-[#0D9488] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span className="font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Card Swap Animation */}
                    <div className="flex items-center justify-center relative">
                        {/* Glow behind cards */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-[300px] h-[200px] bg-gradient-to-br from-[#14B8A6]/20 to-[#8B5CF6]/20 rounded-3xl blur-3xl animate-pulse-subtle" />
                        </div>

                        <CardSwap
                            width={400}
                            height={280}
                            cardDistance={45}
                            verticalDistance={55}
                            delay={3500}
                            pauseOnHover={true}
                            skewAmount={3}
                            easing="elastic"
                        >
                            {features.map((feature, i) => (
                                <Card key={i} className="cursor-pointer">
                                    {/* Window-style header */}
                                    <div className="flex items-center justify-between px-5 py-3 border-b border-white/20">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                                                {feature.icon}
                                            </div>
                                            <span className="text-white/80 text-sm font-medium">{feature.label}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-[#111111]/20" />
                                            <div className="w-3 h-3 rounded-full bg-[#111111]/20" />
                                            <div className="w-3 h-3 rounded-full bg-[#111111]/20" />
                                        </div>
                                    </div>
                                    {/* Card content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-white mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-white/70 text-sm leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </Card>
                            ))}
                        </CardSwap>
                    </div>
                </div>
            </div>
        </section>
    );
}
