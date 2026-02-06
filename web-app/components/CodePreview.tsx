'use client';

import { useEffect, useRef, useState } from 'react';
import { FaBolt, FaLock, FaBook } from 'react-icons/fa';

export function CodePreview() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const [activeTab, setActiveTab] = useState<'python' | 'typescript'>('python');

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

    const pythonCode = `from neurosan import SolanaAgent

# Initialize the agent with sly_data
agent = SolanaAgent()

# Wallet address is stored securely in sly_data
# The AI model NEVER sees this value
agent.set_wallet("7xKXtg...AsU")

# Query blockchain data naturally
response = agent.ask("What is my SOL balance?")
print(response)
# Output: "Your balance is 5.24 SOL"`;

    const typescriptCode = `import { NeuroSanClient } from '@neurosan/sdk';

// Initialize the client
const client = new NeuroSanClient();

// Connect wallet - stored in sly_data
// The AI model NEVER accesses this directly
await client.setWallet("7xKXtg...AsU");

// Natural language queries
const response = await client.ask(
  "Show my recent transactions"
);
console.log(response);`;

    return (
        <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF8] via-white to-[#FAFAF8] -z-10" />

            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Code block */}
                    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-[#000]/10 border border-[#E5E7EB]">
                            {/* Code header */}
                            <div className="flex items-center justify-between px-4 py-3 bg-[#1F2937] border-b border-[#374151]">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                                        <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                                        <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                                    </div>
                                </div>
                                <div className="flex gap-1 p-1 bg-[#374151] rounded-lg">
                                    <button
                                        onClick={() => setActiveTab('python')}
                                        className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${activeTab === 'python'
                                            ? 'bg-[#1F2937] text-white'
                                            : 'text-[#9CA3AF] hover:text-white'
                                            }`}
                                    >
                                        Python
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('typescript')}
                                        className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${activeTab === 'typescript'
                                            ? 'bg-[#1F2937] text-white'
                                            : 'text-[#9CA3AF] hover:text-white'
                                            }`}
                                    >
                                        TypeScript
                                    </button>
                                </div>
                                <div className="text-xs text-[#6B7280]">example.{activeTab === 'python' ? 'py' : 'ts'}</div>
                            </div>

                            {/* Code content */}
                            <div className="p-6 bg-[#111827] overflow-x-auto">
                                <pre className="text-sm font-mono leading-relaxed">
                                    <code className="text-[#E5E7EB]">
                                        {activeTab === 'python' ? (
                                            <>
                                                <span className="text-[#C084FC]">from</span>{' '}
                                                <span className="text-[#F9A8D4]">neurosan</span>{' '}
                                                <span className="text-[#C084FC]">import</span>{' '}
                                                <span className="text-[#67E8F9]">SolanaAgent</span>
                                                {'\n\n'}
                                                <span className="text-[#6B7280]"># Initialize the agent with sly_data</span>
                                                {'\n'}
                                                <span className="text-[#E5E7EB]">agent = </span>
                                                <span className="text-[#67E8F9]">SolanaAgent</span>
                                                <span className="text-[#FDE047]">()</span>
                                                {'\n\n'}
                                                <span className="text-[#6B7280]"># Wallet address is stored securely in sly_data</span>
                                                {'\n'}
                                                <span className="text-[#6B7280]"># The AI model NEVER sees this value</span>
                                                {'\n'}
                                                <span className="text-[#E5E7EB]">agent.</span>
                                                <span className="text-[#86EFAC]">set_wallet</span>
                                                <span className="text-[#FDE047]">(</span>
                                                <span className="text-[#FCA5A5]">"7xKXtg...AsU"</span>
                                                <span className="text-[#FDE047]">)</span>
                                                {'\n\n'}
                                                <span className="text-[#6B7280]"># Query blockchain data naturally</span>
                                                {'\n'}
                                                <span className="text-[#E5E7EB]">response = agent.</span>
                                                <span className="text-[#86EFAC]">ask</span>
                                                <span className="text-[#FDE047]">(</span>
                                                <span className="text-[#FCA5A5]">"What is my SOL balance?"</span>
                                                <span className="text-[#FDE047]">)</span>
                                                {'\n'}
                                                <span className="text-[#C084FC]">print</span>
                                                <span className="text-[#FDE047]">(</span>
                                                <span className="text-[#E5E7EB]">response</span>
                                                <span className="text-[#FDE047]">)</span>
                                                {'\n'}
                                                <span className="text-[#6B7280]"># Output: "Your balance is 5.24 SOL"</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="text-[#C084FC]">import</span>{' '}
                                                <span className="text-[#FDE047]">{'{ '}</span>
                                                <span className="text-[#67E8F9]">NeuroSanClient</span>
                                                <span className="text-[#FDE047]">{' }'}</span>{' '}
                                                <span className="text-[#C084FC]">from</span>{' '}
                                                <span className="text-[#FCA5A5]">'@neurosan/sdk'</span>
                                                <span className="text-[#E5E7EB]">;</span>
                                                {'\n\n'}
                                                <span className="text-[#6B7280]">// Initialize the client</span>
                                                {'\n'}
                                                <span className="text-[#C084FC]">const</span>{' '}
                                                <span className="text-[#E5E7EB]">client = </span>
                                                <span className="text-[#C084FC]">new</span>{' '}
                                                <span className="text-[#67E8F9]">NeuroSanClient</span>
                                                <span className="text-[#FDE047]">()</span>
                                                <span className="text-[#E5E7EB]">;</span>
                                                {'\n\n'}
                                                <span className="text-[#6B7280]">// Connect wallet - stored in sly_data</span>
                                                {'\n'}
                                                <span className="text-[#6B7280]">// The AI model NEVER accesses this directly</span>
                                                {'\n'}
                                                <span className="text-[#C084FC]">await</span>{' '}
                                                <span className="text-[#E5E7EB]">client.</span>
                                                <span className="text-[#86EFAC]">setWallet</span>
                                                <span className="text-[#FDE047]">(</span>
                                                <span className="text-[#FCA5A5]">"7xKXtg...AsU"</span>
                                                <span className="text-[#FDE047]">)</span>
                                                <span className="text-[#E5E7EB]">;</span>
                                                {'\n\n'}
                                                <span className="text-[#6B7280]">// Natural language queries</span>
                                                {'\n'}
                                                <span className="text-[#C084FC]">const</span>{' '}
                                                <span className="text-[#E5E7EB]">response = </span>
                                                <span className="text-[#C084FC]">await</span>{' '}
                                                <span className="text-[#E5E7EB]">client.</span>
                                                <span className="text-[#86EFAC]">ask</span>
                                                <span className="text-[#FDE047]">(</span>
                                                {'\n  '}
                                                <span className="text-[#FCA5A5]">"Show my recent transactions"</span>
                                                {'\n'}
                                                <span className="text-[#FDE047]">)</span>
                                                <span className="text-[#E5E7EB]">;</span>
                                                {'\n'}
                                                <span className="text-[#E5E7EB]">console.</span>
                                                <span className="text-[#86EFAC]">log</span>
                                                <span className="text-[#FDE047]">(</span>
                                                <span className="text-[#E5E7EB]">response</span>
                                                <span className="text-[#FDE047]">)</span>
                                                <span className="text-[#E5E7EB]">;</span>
                                            </>
                                        )}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                        <span className="inline-block px-4 py-1.5 text-sm font-medium text-[#14B8A6] bg-[#CCFBF1] rounded-full mb-6">
                            Developer Experience
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1A1A1A] mb-6 leading-tight">
                            Simple API.<br />
                            <span className="text-gradient">Powerful Privacy.</span>
                        </h2>
                        <p className="text-lg text-[#6B7280] mb-8 leading-relaxed">
                            Get started with just a few lines of code. Our SDK handles all the complexity of
                            secure data isolation, RPC connections, and multi-agent orchestration.
                        </p>

                        <div className="space-y-4">
                            {[
                                { icon: <FaBolt />, text: 'Quick Start: npm install @neurosan/sdk' },
                                { icon: <FaLock />, text: 'Automatic sly_data isolation' },
                                { icon: <FaBook />, text: 'Comprehensive documentation and examples' },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center gap-3 p-4 bg-white rounded-xl border border-[#E5E7EB] hover:border-[#14B8A6]/30 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="text-[#4B5563] font-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
