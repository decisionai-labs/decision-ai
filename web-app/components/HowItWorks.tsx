import { Card } from './ui/Card';

const steps = [
    {
        number: '01',
        title: 'Connect Wallet',
        description: 'Your wallet address is captured securely and stored in sly_data—never exposed to the AI.',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
        ),
    },
    {
        number: '02',
        title: 'Ask Anything',
        description: 'Query your balances, tokens, transactions, or NFTs using natural language.',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        ),
    },
    {
        number: '03',
        title: 'Get Answers',
        description: 'The AI fetches blockchain data using your sly_data—without ever seeing your address.',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] mb-4">
                        How It Works
                    </h2>
                    <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
                        Three simple steps to interact with Solana while keeping your wallet private.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={step.number} className="relative">
                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-12 left-[calc(50%+60px)] w-[calc(100%-120px)] h-px bg-[#E5E7EB]" />
                            )}

                            <Card hover className="text-center h-full">
                                {/* Number badge */}
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FAFAF8] border border-[#E5E7EB] text-[#14B8A6] text-sm font-semibold mb-6">
                                    {step.number}
                                </div>

                                {/* Icon */}
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#CCFBF1] text-[#0D9488] mb-4">
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-[#6B7280] leading-relaxed">
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
