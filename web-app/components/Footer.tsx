import Link from 'next/link';

export function Footer() {
    return (
        <footer className="py-12 px-6 border-t border-[#E5E7EB]">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo & Copyright */}
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-[#14B8A6] flex items-center justify-center">
                                <svg
                                    className="w-4 h-4 text-white"
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
                            <span className="font-semibold text-[#1A1A1A]">NeuroSan</span>
                        </Link>
                        <span className="text-sm text-[#9CA3AF]">
                            © 2025 NeuroSolanaAgents
                        </span>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6">
                        <Link
                            href="https://github.com/NeuroSolanaAgents/neurosan"
                            target="_blank"
                            className="text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                        >
                            GitHub
                        </Link>
                        <Link
                            href="https://github.com/NeuroSolanaAgents/neurosan/blob/main/README.md"
                            target="_blank"
                            className="text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                        >
                            Documentation
                        </Link>
                        <Link
                            href="https://github.com/NeuroSolanaAgents/neurosan/blob/main/LICENSE.txt"
                            target="_blank"
                            className="text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                        >
                            MIT License
                        </Link>
                    </div>

                    {/* Team link */}
                    <div className="flex items-center gap-4 text-sm">
                        <span className="text-[#9CA3AF]">From</span>
                        <Link
                            href="https://github.com/cognizant-ai-lab"
                            target="_blank"
                            className="text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                        >
                            cognizant-ai-lab
                        </Link>
                        <span className="text-[#E5E7EB]">•</span>
                        <Link
                            href="https://twitter.com/decision__ai"
                            target="_blank"
                            className="text-[#6B7280] hover:text-[#1A1A1A] transition-colors flex items-center gap-1"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            @decision__ai
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
