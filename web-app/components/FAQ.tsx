'use client';

import { useState, useEffect, useRef } from 'react';

const faqs = [
    {
        question: 'What is sly_data and how does it protect my privacy?',
        answer: 'sly_data is our proprietary privacy architecture that creates a secure, encrypted channel for sensitive data like wallet addresses. The AI language model can never access or see this data directly - only authorized tools can read from sly_data to fetch blockchain information. This means your wallet address never appears in AI prompts or responses.',
    },
    {
        question: 'Do I need to install anything to use Decision AI?',
        answer: 'No installation required! You can use our web demo instantly by just connecting your wallet. For developers who want to integrate Decision AI into their own applications, we provide SDKs for Python and TypeScript that can be installed via pip or npm.',
    },
    {
        question: 'Which Solana data can I query?',
        answer: 'Decision AI supports querying SOL balances, SPL token holdings with metadata, transaction history, NFT collections, and more. Our tools connect directly to Solana RPC endpoints for real-time data. You can use natural language like "What\'s my balance?" or "Show my recent transactions."',
    },
    {
        question: 'Is Decision AI open source?',
        answer: 'Yes! Decision AI is fully open source under the MIT license. You can view the source code, contribute improvements, or fork it for your own projects on GitHub. We believe in transparency, especially when it comes to privacy-sensitive applications.',
    },
    {
        question: 'How is this different from other blockchain AI tools?',
        answer: 'Most blockchain AI tools require you to share your wallet address directly with the AI model. Decision AI is built from the ground up with privacy as a core principle. The sly_data architecture ensures complete separation between your sensitive data and the AI, while still enabling powerful natural language queries.',
    },
    {
        question: 'Can I use Decision AI with other blockchains?',
        answer: 'Currently, Decision AI is optimized for Solana. However, the underlying multi-agent framework is chain-agnostic. We\'re exploring support for other blockchains in future releases. Join our community to stay updated on new chain integrations.',
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
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
        <section ref={sectionRef} id="faq" className="py-24 px-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.02] -z-10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#14B8A6]/5 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#8B5CF6]/5 to-transparent rounded-full blur-3xl" />

            <div className="max-w-3xl mx-auto relative z-10">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-block px-4 py-1.5 text-sm font-medium text-[#14B8A6] bg-[#14B8A6]/10 border border-[#14B8A6]/20 rounded-full mb-6">
                        Got Questions?
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                        Frequently Asked <span className="text-gradient">Questions</span>
                    </h2>
                    <p className="text-lg text-zinc-400">
                        Everything you need to know about Decision AI and privacy-preserving AI.
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            style={{ transitionDelay: `${100 + index * 75}ms` }}
                        >
                            <div
                                className={`bg-[#111111] rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === index
                                    ? 'border-[#14B8A6]/30 shadow-lg shadow-[#14B8A6]/5'
                                    : 'border-white/10 hover:border-zinc-600'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                                >
                                    <span className={`font-semibold transition-colors ${openIndex === index ? 'text-[#14B8A6]' : 'text-white'
                                        }`}>
                                        {faq.question}
                                    </span>
                                    <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index
                                        ? 'bg-[#14B8A6] text-white rotate-180'
                                        : 'bg-zinc-800 text-zinc-400'
                                        }`}>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                                    }`}>
                                    <div className="px-6 pb-5 text-zinc-400 leading-relaxed border-t border-white/10 pt-4">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Still have questions CTA */}
                <div className={`mt-12 text-center p-8 bg-[#14B8A6]/5 rounded-2xl border border-[#14B8A6]/20 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-zinc-400 mb-4">Still have questions?</p>
                    <a
                        href="https://github.com/NeuroSolanaAgents/neurosan/discussions"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[#14B8A6] to-[#0D9488] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#14B8A6]/20 transition-all duration-300"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                        Ask on GitHub Discussions
                    </a>
                </div>
            </div>
        </section>
    );
}
