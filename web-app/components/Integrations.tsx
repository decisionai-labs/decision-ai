'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const integrations = [
    {
        name: 'Raydium',
        logo: (
            <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                <circle cx="20" cy="20" r="18" fill="#2B2D30" />
                <path d="M12 16L20 12L28 16V24L20 28L12 24V16Z" fill="#00D18B" />
            </svg>
        ),
        description: 'Query LP positions and swap history',
    },
    {
        name: 'Jupiter',
        logo: (
            <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                <circle cx="20" cy="20" r="18" fill="#000" />
                <circle cx="20" cy="20" r="12" fill="#7B61FF" />
                <circle cx="20" cy="20" r="6" fill="#fff" />
            </svg>
        ),
        description: 'Track aggregated swaps and routes',
    },
    {
        name: 'Magic Eden',
        logo: (
            <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                <circle cx="20" cy="20" r="18" fill="#E42575" />
                <rect x="14" y="14" width="12" height="12" rx="2" fill="#fff" />
            </svg>
        ),
        description: 'Monitor NFT portfolio and trades',
    },
    {
        name: 'Marinade',
        logo: (
            <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                <circle cx="20" cy="20" r="18" fill="#306896" />
                <path d="M14 26L20 14L26 26H14Z" fill="#fff" />
            </svg>
        ),
        description: 'Track liquid staking rewards',
    },
    {
        name: 'Drift',
        logo: (
            <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                <circle cx="20" cy="20" r="18" fill="#1E1E1E" />
                <path d="M12 20H28M20 12V28" stroke="#00D1FF" strokeWidth="3" />
            </svg>
        ),
        description: 'Analyze perpetual positions',
    },
    {
        name: 'Tensor',
        logo: (
            <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                <circle cx="20" cy="20" r="18" fill="#13141F" />
                <rect x="16" y="16" width="8" height="8" fill="#00FFAA" rx="1" />
            </svg>
        ),
        description: 'NFT trading analytics',
    },
];

export function Integrations() {
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
            <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FAFAF8] to-white -z-10" />

            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block px-4 py-1.5 text-sm font-medium text-[#14B8A6] bg-[#CCFBF1] rounded-full mb-6">
                        Ecosystem Ready
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] mb-4">
                        Works With Your Favorite <span className="text-gradient">Protocols</span>
                    </h2>
                    <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
                        Query data from the top Solana protocols without exposing your wallet address.
                    </p>
                </div>

                {/* Integration grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {integrations.map((integration, index) => (
                        <div
                            key={integration.name}
                            className={`group relative bg-white rounded-2xl border border-[#E5E7EB] p-6 text-center hover:border-[#14B8A6]/30 hover:shadow-lg hover:shadow-[#14B8A6]/5 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            style={{ transitionDelay: `${100 + index * 75}ms` }}
                        >
                            {/* Logo */}
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl overflow-hidden transition-transform group-hover:scale-110">
                                {integration.logo}
                            </div>

                            {/* Name */}
                            <h3 className="font-semibold text-[#1A1A1A] mb-2">{integration.name}</h3>

                            {/* Description */}
                            <p className="text-sm text-[#6B7280]">{integration.description}</p>

                            {/* Hover glow */}
                            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-[#14B8A6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                </div>

                {/* More coming */}
                <p className={`text-center mt-10 text-[#9CA3AF] transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    ...and many more coming soon. <Link href="https://github.com/NeuroSolanaAgents/neurosan" className="text-[#14B8A6] hover:underline" target="_blank">Request an integration →</Link>
                </p>
            </div>
        </section>
    );
}
