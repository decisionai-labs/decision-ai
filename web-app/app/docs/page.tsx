'use client';

import { Header } from '@/components/Header';
import Link from 'next/link';

const sections = [
    { id: 'the-problem', label: 'The Problem' },
    { id: 'why-privacy', label: 'Why Privacy Matters' },
    { id: 'our-approach', label: 'Our Approach' },
    { id: 'what-you-can-do', label: 'What You Can Do' },
    { id: 'get-started', label: 'Get Started' },
];

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-[#FAFAF8]">
            <Header />

            <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
                <div className="flex gap-12">

                    {/* Sidebar / Table of Contents */}
                    <aside className="hidden lg:block w-56 shrink-0">
                        <div className="sticky top-28">
                            <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-4">
                                On this page
                            </p>
                            <nav className="space-y-1">
                                {sections.map((section) => (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        className="block px-3 py-2 rounded-lg text-sm text-[#6B7280]
                                                   hover:text-[#1A1A1A] hover:bg-[#F3F4F6]
                                                   transition-colors duration-150"
                                    >
                                        {section.label}
                                    </a>
                                ))}
                            </nav>

                            <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
                                <Link
                                    href="https://github.com/NeuroSolanaAgents/neurosan"
                                    target="_blank"
                                    className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                    </svg>
                                    View on GitHub
                                </Link>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0 max-w-3xl">

                        {/* Page Header */}
                        <div className="mb-12">
                            <div className="flex items-center gap-2 text-sm text-[#14B8A6] font-medium mb-3">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Documentation
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4 leading-tight">
                                Privacy-Preserving AI on Solana
                            </h1>
                            <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl">
                                An educational overview of why privacy matters for blockchain AI agents, and how NeuroSan takes a fundamentally different approach.
                            </p>
                        </div>


                        {/* Section 1: The Problem */}
                        <section id="the-problem" className="mb-16 scroll-mt-28">
                            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#14B8A6]/10 text-[#14B8A6] text-sm font-bold">
                                    1
                                </span>
                                The Problem
                            </h2>

                            <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
                                <p className="text-[#4B5563] leading-relaxed mb-4">
                                    Most AI-powered blockchain tools today ask you to paste your wallet address directly into a chat prompt. This creates a fundamental privacy issue:
                                </p>
                                <ul className="space-y-3 mb-6">
                                    {[
                                        'AI providers can see, log, and store your wallet addresses',
                                        'Your holdings and transaction history become part of the AI\'s training data',
                                        'Prompt history creates a permanent, searchable record of your financial activity',
                                        'Third-party integrations may receive your data without your knowledge',
                                    ].map((item) => (
                                        <li key={item} className="flex items-start gap-3 text-[#4B5563]">
                                            <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                            </svg>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-sm text-[#6B7280] italic">
                                    In Web2, you wouldn&apos;t paste your bank account number into ChatGPT. So why is it acceptable in Web3?
                                </p>
                            </div>
                        </section>


                        {/* Section 2: Why Privacy Matters */}
                        <section id="why-privacy" className="mb-16 scroll-mt-28">
                            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#14B8A6]/10 text-[#14B8A6] text-sm font-bold">
                                    2
                                </span>
                                Why Privacy Matters
                            </h2>

                            <div className="space-y-4">
                                {[
                                    {
                                        title: 'Financial Security',
                                        description: 'When an AI service knows your wallet and its holdings, you become a target. Publicly associated wallets are more vulnerable to phishing, social engineering, and targeted attacks.',
                                        icon: (
                                            <svg className="w-5 h-5 text-[#14B8A6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        ),
                                    },
                                    {
                                        title: 'Data Sovereignty',
                                        description: 'Your on-chain activity is your data. You should be able to query and analyze it without surrendering ownership to a third-party AI provider who may use it for model training.',
                                        icon: (
                                            <svg className="w-5 h-5 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        ),
                                    },
                                    {
                                        title: 'Regulatory Compliance',
                                        description: 'As regulations evolve, the ability to interact with blockchain data privately will become increasingly important. Building privacy-first now is future-proofing your workflow.',
                                        icon: (
                                            <svg className="w-5 h-5 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                            </svg>
                                        ),
                                    },
                                ].map((card) => (
                                    <div key={card.title} className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-9 h-9 rounded-lg bg-[#FAFAF8] border border-[#E5E7EB] flex items-center justify-center">
                                                {card.icon}
                                            </div>
                                            <h3 className="font-semibold text-[#1A1A1A]">{card.title}</h3>
                                        </div>
                                        <p className="text-[#4B5563] leading-relaxed text-sm">
                                            {card.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>


                        {/* Section 3: Our Approach */}
                        <section id="our-approach" className="mb-16 scroll-mt-28">
                            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#14B8A6]/10 text-[#14B8A6] text-sm font-bold">
                                    3
                                </span>
                                Our Approach
                            </h2>

                            <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 md:p-8 shadow-sm">
                                <p className="text-[#4B5563] leading-relaxed mb-6">
                                    NeuroSan is built on a simple but powerful principle:{' '}
                                    <strong className="text-[#1A1A1A]">the AI should never need to see your sensitive data to help you.</strong>
                                </p>

                                <div className="space-y-4 mb-6">
                                    {[
                                        {
                                            label: 'Zero-Knowledge Design',
                                            detail: 'Your wallet address and private keys are never exposed to the AI model. The agent can query blockchain data on your behalf without ever learning who you are.',
                                            color: 'text-[#14B8A6]',
                                            bg: 'bg-[#F0FDFA]',
                                            border: 'border-[#14B8A6]/20',
                                        },
                                        {
                                            label: 'On-Chain, Not In-Context',
                                            detail: 'Unlike tools that embed your wallet in an AI prompt, NeuroSan keeps sensitive data out of the language model\'s context window entirely. The AI reasons about your request, not your identity.',
                                            color: 'text-[#8B5CF6]',
                                            bg: 'bg-[#F5F3FF]',
                                            border: 'border-[#8B5CF6]/20',
                                        },
                                        {
                                            label: 'Open Source & Auditable',
                                            detail: 'Every component of NeuroSan is open source. You don\'t have to trust our claims — you can verify the privacy guarantees yourself by reading the code.',
                                            color: 'text-[#F59E0B]',
                                            bg: 'bg-[#FFFBEB]',
                                            border: 'border-[#F59E0B]/20',
                                        },
                                    ].map((item) => (
                                        <div key={item.label} className={`rounded-lg ${item.bg} border ${item.border} px-5 py-4`}>
                                            <p className={`font-semibold ${item.color} mb-1`}>{item.label}</p>
                                            <p className="text-sm text-[#4B5563] leading-relaxed">{item.detail}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>


                        {/* Section 4: What You Can Do */}
                        <section id="what-you-can-do" className="mb-16 scroll-mt-28">
                            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#14B8A6]/10 text-[#14B8A6] text-sm font-bold">
                                    4
                                </span>
                                What You Can Do
                            </h2>

                            <div className="rounded-xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden">
                                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E7EB]">
                                    {[
                                        {
                                            title: 'Check Balances',
                                            description: 'Query your SOL and SPL token balances without exposing your wallet to AI.',
                                            icon: (
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            ),
                                        },
                                        {
                                            title: 'Review Transactions',
                                            description: 'Get human-readable summaries of your recent on-chain activity, privately.',
                                            icon: (
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                            ),
                                        },
                                        {
                                            title: 'Explore Tokens',
                                            description: 'Discover and analyze your token portfolio with natural language queries.',
                                            icon: (
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                </svg>
                                            ),
                                        },
                                        {
                                            title: 'Analyze NFTs',
                                            description: 'View your NFT collection and get insights — all without any data leaving your control.',
                                            icon: (
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            ),
                                        },
                                    ].map((item) => (
                                        <div key={item.title} className="p-6">
                                            <div className="w-10 h-10 rounded-lg bg-[#14B8A6]/10 text-[#14B8A6] flex items-center justify-center mb-3">
                                                {item.icon}
                                            </div>
                                            <h3 className="font-semibold text-[#1A1A1A] mb-1">{item.title}</h3>
                                            <p className="text-sm text-[#6B7280] leading-relaxed">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>


                        {/* Section 5: Get Started */}
                        <section id="get-started" className="mb-16 scroll-mt-28">
                            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#14B8A6]/10 text-[#14B8A6] text-sm font-bold">
                                    5
                                </span>
                                Get Started
                            </h2>

                            <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 md:p-8 shadow-sm">
                                <p className="text-[#4B5563] leading-relaxed mb-6">
                                    Experience the difference a privacy-first AI agent makes. No signup, no API keys, no data collection — just connect your wallet and start querying.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Link
                                        href="/demo"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                                                   bg-[#14B8A6] text-white font-medium text-sm
                                                   hover:bg-[#0D9488] transition-colors shadow-sm"
                                    >
                                        Try the Interactive Demo
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                    <Link
                                        href="https://github.com/NeuroSolanaAgents/neurosan"
                                        target="_blank"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                                                   bg-white text-[#1A1A1A] font-medium text-sm border border-[#E5E7EB]
                                                   hover:bg-[#F3F4F6] transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                        </svg>
                                        View on GitHub
                                    </Link>
                                </div>
                            </div>
                        </section>


                        {/* Bottom Navigation */}
                        <div className="mt-16 pt-8 border-t border-[#E5E7EB] flex items-center justify-between">
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Home
                            </Link>
                            <Link
                                href="/demo"
                                className="flex items-center gap-2 text-sm font-medium text-[#14B8A6] hover:text-[#0D9488] transition-colors"
                            >
                                Try the Demo
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
}
