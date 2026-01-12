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

                    {/* Solana badge */}
                    <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                        <span>Built for</span>
                        <span className="font-medium text-[#14B8A6]">Solana</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
