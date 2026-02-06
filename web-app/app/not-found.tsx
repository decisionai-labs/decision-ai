import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata = {
    title: '404 - Page Not Found | NeuroSan',
    description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            {/* Floating blobs */}
            <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-gradient-to-br from-[#14B8A6]/10 to-transparent blur-3xl animate-float-slow" />
            <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-[#8B5CF6]/10 to-transparent blur-3xl animate-float-delayed" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#F59E0B]/5 to-transparent blur-3xl" />

            <div className="relative z-10 text-center max-w-lg">
                {/* 404 number with gradient */}
                <div className="relative mb-8">
                    <span className="text-[180px] sm:text-[220px] font-bold text-gradient leading-none select-none">
                        404
                    </span>
                    {/* Glitch effect layers */}
                    <span className="absolute inset-0 text-[180px] sm:text-[220px] font-bold text-[#14B8A6]/20 leading-none select-none animate-pulse" style={{ transform: 'translate(4px, 4px)' }}>
                        404
                    </span>
                </div>

                {/* Message */}
                <h1 className="text-2xl sm:text-3xl font-semibold text-[#1A1A1A] mb-4">
                    Page Not Found
                </h1>
                <p className="text-lg text-[#6B7280] mb-8 leading-relaxed">
                    The page you're looking for doesn't exist or has been moved.
                    Let's get you back on track.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/">
                        <Button size="lg" className="btn-glow group">
                            <svg className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Back to Home
                        </Button>
                    </Link>
                    <Link href="/demo">
                        <Button variant="secondary" size="lg">
                            Try the Demo
                        </Button>
                    </Link>
                </div>

                {/* Fun fact */}
                <div className="mt-12 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-[#E5E7EB] inline-block">
                    <p className="text-sm text-[#6B7280]">
                        <span className="text-[#14B8A6]">Fun fact:</span> Even our 404 page protects your privacy
                    </p>
                </div>
            </div>
        </main>
    );
}
