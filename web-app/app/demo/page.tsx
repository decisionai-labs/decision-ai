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
        <main className="min-h-screen bg-[#FAFAF8]">
            <Header />

            <section className="pt-28 pb-16 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1A1A1A] mb-6 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Home
                        </Link>

                        <Badge variant="accent" className="mb-4">Interactive Demo</Badge>

                        <h1 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] mb-4">
                            Try the Agent
                        </h1>
                        <p className="text-lg text-[#6B7280] max-w-xl mx-auto">
                            Connect your wallet and query your Solana data. Your address stays private
                            through our sly_data architecture.
                        </p>
                    </div>

                    {/* Chat Interface */}
                    <AgentChat />

                    {/* Info cards */}
                    <div className="grid md:grid-cols-2 gap-6 mt-12">
                        <div className="p-5 bg-white rounded-xl border border-[#E5E7EB]">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-[#CCFBF1] flex items-center justify-center text-[#0D9488]">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-[#1A1A1A]">Privacy Protected</h3>
                            </div>
                            <p className="text-sm text-[#6B7280]">
                                Your wallet address is stored in sly_data and never exposed to the AI language model.
                            </p>
                        </div>

                        <div className="p-5 bg-white rounded-xl border border-[#E5E7EB]">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-[#CCFBF1] flex items-center justify-center text-[#0D9488]">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-[#1A1A1A]">Demo Mode</h3>
                            </div>
                            <p className="text-sm text-[#6B7280]">
                                This is a frontend demo with mock responses. Full backend integration coming soon.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
