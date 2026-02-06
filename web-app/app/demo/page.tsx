import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AgentChat } from '@/components/AgentChat';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

export const metadata = {
    title: 'Demo | NeuroSan',
    description: 'Try the privacy-preserving Solana agent demo. Query your wallet without exposing your address to AI.',
};

export default function DemoPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-[#FAFAF8] via-white to-[#FAFAF8]">
            <Header />

            <section className="pt-28 pb-20 px-6 relative">
                {/* Background decorations */}
                <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#14B8A6]/10 to-transparent blur-3xl" />
                <div className="absolute top-40 right-10 w-60 h-60 rounded-full bg-gradient-to-br from-[#8B5CF6]/10 to-transparent blur-3xl" />

                <div className="max-w-4xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#14B8A6] mb-6 transition-colors group"
                        >
                            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Home
                        </Link>

                        <Badge variant="accent" className="mb-4 glow-teal">Interactive Demo</Badge>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1A1A1A] mb-4">
                            Try the <span className="text-gradient">Agent</span>
                        </h1>
                        <p className="text-lg text-[#6B7280] max-w-xl mx-auto leading-relaxed">
                            Connect your wallet and query your Solana data. Your address stays private
                            through our{' '}
                            <code className="px-2 py-0.5 bg-[#14B8A6]/10 text-[#0D9488] rounded text-sm font-mono">
                                sly_data
                            </code>{' '}
                            architecture.
                        </p>
                    </div>

                    {/* Chat Interface */}
                    <AgentChat />

                    {/* Info cards */}
                    <div className="grid md:grid-cols-2 gap-6 mt-12">
                        <div className="p-6 bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#14B8A6]/30 hover:shadow-lg transition-all duration-300 card-shine group">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#CCFBF1] to-[#F0FDFA] flex items-center justify-center text-[#0D9488] group-hover:scale-110 transition-transform">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-[#1A1A1A] text-lg">Privacy Protected</h3>
                            </div>
                            <p className="text-[#6B7280] leading-relaxed">
                                Your wallet address is stored in sly_data and never exposed to the AI language model.
                                The AI only sees the data, not the source.
                            </p>
                        </div>

                        <div className="p-6 bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#14B8A6]/30 hover:shadow-lg transition-all duration-300 card-shine group">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#CCFBF1] to-[#F0FDFA] flex items-center justify-center text-[#0D9488] group-hover:scale-110 transition-transform">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-[#1A1A1A] text-lg">Live Data</h3>
                            </div>
                            <p className="text-[#6B7280] leading-relaxed">
                                Queries real Solana blockchain data via RPC. Get up-to-date balances, tokens,
                                and transaction history in real-time.
                            </p>
                        </div>
                    </div>

                    {/* Supported queries */}
                    <div className="mt-12 p-6 bg-gradient-to-r from-[#F3F4F6] to-[#FAFAF8] rounded-2xl border border-[#E5E7EB]">
                        <h3 className="font-semibold text-[#1A1A1A] mb-4 text-center">Example Queries</h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            {[
                                'What is my SOL balance?',
                                'Show all my tokens',
                                'Get my recent transactions',
                                'Do I have any NFTs?',
                                'Query devnet balance',
                            ].map((query) => (
                                <span
                                    key={query}
                                    className="px-4 py-2 bg-white rounded-full text-sm text-[#6B7280] border border-[#E5E7EB] hover:border-[#14B8A6]/30 hover:text-[#14B8A6] transition-colors cursor-default"
                                >
                                    {query}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
