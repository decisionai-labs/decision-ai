import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

const tools = [
    {
        name: 'GetBalance',
        description: 'Query native SOL balance for any wallet',
        file: 'balance.py',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        name: 'GetTokenBalances',
        description: 'Retrieve all SPL token holdings with metadata',
        file: 'tokens.py',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        ),
    },
    {
        name: 'GetTransactions',
        description: 'Fetch recent transaction history with details',
        file: 'transactions.py',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
        ),
    },
    {
        name: 'GetNFTs',
        description: 'Discover NFT collectibles in any wallet',
        file: 'nfts.py',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
    },
];

export function Features() {
    return (
        <section id="features" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <Badge variant="muted" className="mb-4">Built for Solana</Badge>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] mb-4">
                        Privacy-Preserving Tools
                    </h2>
                    <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
                        Each tool uses sly_data to access blockchain data without exposing wallet addresses to the AI model.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 gap-6">
                    {tools.map((tool) => (
                        <Card key={tool.name} hover padding="lg" className="group">
                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#FAFAF8] border border-[#E5E7EB] flex items-center justify-center text-[#14B8A6] group-hover:bg-[#CCFBF1] group-hover:border-[#14B8A6]/20 transition-colors">
                                    {tool.icon}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-semibold text-[#1A1A1A]">
                                            {tool.name}
                                        </h3>
                                        <code className="text-xs text-[#9CA3AF] bg-[#F3F4F6] px-2 py-0.5 rounded">
                                            {tool.file}
                                        </code>
                                    </div>
                                    <p className="text-[#6B7280]">
                                        {tool.description}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Privacy highlight */}
                <div className="mt-12 p-6 bg-[#CCFBF1]/30 border border-[#14B8A6]/20 rounded-xl text-center">
                    <div className="flex items-center justify-center gap-2 text-[#0D9488] mb-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span className="font-semibold">Privacy Promise</span>
                    </div>
                    <p className="text-[#6B7280] text-sm max-w-lg mx-auto">
                        The AI language model never sees your wallet address. All sensitive data flows through sly_data,
                        a secure channel that tools can access but the AI cannot read.
                    </p>
                </div>
            </div>
        </section>
    );
}
