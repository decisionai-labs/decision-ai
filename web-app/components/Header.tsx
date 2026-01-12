'use client';

import Link from 'next/link';
import { Button } from './ui/Button';

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAF8]/80 backdrop-blur-sm border-b border-[#E5E7EB]">
            <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 rounded-lg bg-[#14B8A6] flex items-center justify-center">
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
                    <span className="font-semibold text-[#1A1A1A] group-hover:text-[#14B8A6] transition-colors">
                        NeuroSan
                    </span>
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="#features"
                        className="text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                    >
                        Features
                    </Link>
                    <Link
                        href="#how-it-works"
                        className="text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                    >
                        How It Works
                    </Link>
                    <Link
                        href="#tools"
                        className="text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                    >
                        Tools
                    </Link>
                    <Link
                        href="https://github.com/NeuroSolanaAgents/neurosan"
                        target="_blank"
                        className="text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                    >
                        Docs
                    </Link>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-3">
                    <Link
                        href="https://github.com/NeuroSolanaAgents/neurosan"
                        target="_blank"
                        className="hidden sm:flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                        GitHub
                    </Link>
                    <Link href="/demo">
                        <Button size="sm">Try Demo</Button>
                    </Link>
                </div>
            </nav>
        </header>
    );
}
