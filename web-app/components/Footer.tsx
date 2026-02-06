import Link from 'next/link';

export function Footer() {
    return (
        <footer className="relative py-16 px-6 border-t border-[#E5E7EB] overflow-hidden">
            {/* Gradient top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#14B8A6] to-transparent" />

            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white to-[#FAFAF8] -z-10" />

            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col gap-8">
                    {/* Top Row - Logo and main links */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* Logo & Description */}
                        <div className="flex flex-col items-center md:items-start gap-3">
                            <Link href="/" className="flex items-center gap-2.5 group">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#14B8A6] to-[#0D9488] flex items-center justify-center transition-all duration-300 group-hover:shadow-lg">
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </div>
                                <span className="font-semibold text-lg text-[#1A1A1A] group-hover:text-[#14B8A6] transition-colors">
                                    NeuroSan
                                </span>
                            </Link>
                            <p className="text-sm text-[#6B7280] text-center md:text-left max-w-xs">
                                Privacy-preserving AI for Solana blockchain
                            </p>
                        </div>

                        {/* Links */}
                        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                            {[
                                { href: 'https://github.com/NeuroSolanaAgents/neurosan', label: 'GitHub' },
                                { href: 'https://github.com/NeuroSolanaAgents/neurosan/blob/main/README.md', label: 'Documentation' },
                                { href: 'https://github.com/NeuroSolanaAgents/neurosan/blob/main/LICENSE.txt', label: 'MIT License' },
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    className="relative text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors group"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-full h-px bg-[#14B8A6] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#E5E7EB] to-transparent" />

                    {/* Bottom Row - Copyright and social */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Copyright */}
                        <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                            <span>© 2025</span>
                            <Link
                                href="https://github.com/NeuroSolanaAgents"
                                target="_blank"
                                className="hover:text-[#6B7280] transition-colors"
                            >
                                NeuroSolanaAgents
                            </Link>
                        </div>

                        {/* Team & Social */}
                        <div className="flex items-center gap-4 text-sm">
                            <span className="text-[#9CA3AF]">From</span>
                            <Link
                                href="https://github.com/cognizant-ai-lab"
                                target="_blank"
                                className="text-[#6B7280] hover:text-[#1A1A1A] transition-colors font-medium"
                            >
                                cognizant-ai-lab
                            </Link>
                            <span className="text-[#E5E7EB]">•</span>
                            <Link
                                href="https://twitter.com/decision__ai"
                                target="_blank"
                                className="text-[#6B7280] hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5 group"
                            >
                                <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                                @decision__ai
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
