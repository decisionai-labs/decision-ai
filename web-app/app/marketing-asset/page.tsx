'use client';

export default function MarketingAsset() {
    return (
        <div className="min-h-screen bg-[#000000] flex items-center justify-center p-20 font-sans antialiased text-white selection:bg-[#14B8A6]/30">
            {/* The actual marketing "Tile" to be screenshotted */}
            <div className="relative w-full max-w-[1200px] aspect-[1200/630] bg-[#111111] overflow-hidden rounded-none shadow-2xl border border-white/[0.05]">

                {/* Subtle Grid Background */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
                        backgroundSize: '48px 48px',
                        backgroundPosition: '-1px -1px'
                    }}
                />

                {/* Abstract Ambient Glows */}
                <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-[#14B8A6]/[0.03] rounded-full blur-[120px]" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-[#8B5CF6]/[0.03] rounded-full blur-[120px]" />

                <div className="relative h-full flex flex-col justify-between p-16 z-10">

                    {/* Header: Project Brand & Tagline */}
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#14B8A6] to-[#0D9488] flex items-center justify-center shadow-[0_0_20px_rgba(20,184,166,0.2)]">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" />
                                        <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor" fillOpacity="0.5" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold tracking-tight text-white/90">Decision AI</span>
                            </div>
                            <h1 className="text-6xl font-medium tracking-tight text-white mb-6 leading-[1.1] max-w-2xl">
                                Identity Neutral <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14B8A6] to-[#8B5CF6]">AI Infrastructure.</span>
                            </h1>
                        </div>

                        {/* Technical Label (Top Right) */}
                        <div className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md">
                            <p className="text-sm font-mono text-zinc-400">ARCH: ZK_SLY_DATA_V1</p>
                        </div>
                    </div>

                    {/* Central Diagram: The "Utility" Explanation */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-16 mt-8">
                        <div className="relative">

                            {/* Connection Lines */}
                            <svg className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 overflow-visible" viewBox="0 0 100 2" preserveAspectRatio="none">
                                <line x1="0" y1="1" x2="100" y2="1" stroke="white" strokeOpacity="0.1" strokeWidth="2" strokeDasharray="4 4" />
                                {/* Animated Data Packets (Simulated via CSS/framer-motion for screenshotting perfect states) */}
                                <circle cx="25" cy="1" r="3" fill="#14B8A6" className="animate-pulse" style={{ filter: 'drop-shadow(0 0 8px #14B8A6)' }} />
                                <circle cx="75" cy="1" r="3" fill="#8B5CF6" className="animate-pulse" style={{ filter: 'drop-shadow(0 0 8px #8B5CF6)' }} />
                            </svg>

                            <div className="flex justify-between items-center relative z-10">

                                {/* Node 1: User Wallet */}
                                <div className="flex flex-col items-center">
                                    <div className="w-24 h-24 mb-6 rounded-2xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center shadow-2xl relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <svg className="w-10 h-10 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-white mb-2">User Wallet</h3>
                                    <p className="text-sm text-zinc-500 font-mono text-center">0x...a4F2</p>
                                </div>

                                {/* Node 2: sly_data Core (The Innovation) */}
                                <div className="flex flex-col items-center">
                                    <div className="w-32 h-32 mb-6 rounded-[2rem] bg-[#000000] border-2 border-[#14B8A6]/30 flex items-center justify-center relative shadow-[0_0_40px_rgba(20,184,166,0.15)] overflow-hidden">
                                        <div className="absolute inset-0 bg-[#14B8A6]/10" />
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.2)_0%,transparent_70%)]" />
                                        <span className="font-mono font-bold text-lg text-[#14B8A6] relative z-10 tracking-widest">
                                            sly_data
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-medium text-white mb-2">Encrypted Channel</h3>
                                    <p className="text-sm text-zinc-500 text-center max-w-[200px]">
                                        Wallet isolated from LLM context window.
                                    </p>
                                </div>

                                {/* Node 3: AI Tooling */}
                                <div className="flex flex-col items-center">
                                    <div className="w-24 h-24 mb-6 rounded-2xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center shadow-2xl relative overflow-hidden">
                                        <svg className="w-10 h-10 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-white mb-2">Solana Tools</h3>
                                    <p className="text-sm text-zinc-500 text-center max-w-[160px]">
                                        Secure RPC execution.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Footer: Value Proposition & URL */}
                    <div className="flex justify-between items-end border-t border-white/10 pt-8 mt-auto">
                        <div className="max-w-xl">
                            <h4 className="text-xl font-medium text-white mb-3">Architected for Professional Trust.</h4>
                            <p className="text-base text-zinc-400 leading-relaxed">
                                Most AI agents force you to leak your wallet address into prompt context.
                                Decision AI utilizes a zero-knowledge intermediate channel (<code className="text-[#14B8A6] font-mono mx-1">sly_data</code>)
                                ensuring the LLM never sees your identity.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-500 font-mono text-sm uppercase tracking-widest">
                            neurosan.ai <span className="w-1 h-1 rounded-full bg-zinc-700 mx-2" /> 2026
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
