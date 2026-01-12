'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';

interface Message {
    id: string;
    role: 'user' | 'agent';
    content: string;
    timestamp: Date;
    isTyping?: boolean;
}

// Mock responses for demo
const mockResponses: Record<string, string> = {
    balance: `Your wallet has been queried securely.

**SOL Balance**: 12.847 SOL (~$2,441.93 USD)

Note: Your wallet address was passed through sly_data and never exposed to me.`,
    tokens: `Found **5 tokens** in your wallet:

| Token | Balance | Value |
|-------|---------|-------|
| USDC | 1,234.56 | $1,234.56 |
| RAY | 89.12 | $245.08 |
| BONK | 5,000,000 | $125.00 |
| JUP | 156.78 | $312.89 |
| SOL | 12.847 | $2,441.93 |

All queries made without exposing your wallet to the AI.`,
    transactions: `Here are your last 5 transactions:

1. **Received** 2.5 SOL • 2 hours ago
2. **Swapped** 100 USDC → 0.52 SOL • 5 hours ago  
3. **Sent** 1.0 SOL to 7xK...9Fb • 1 day ago
4. **Staked** 10 SOL with Marinade • 3 days ago
5. **Received** 50 USDC • 5 days ago

Your wallet address remained private throughout this query.`,
    nfts: `Found **3 NFTs** in your collection:

1. 🎨 **DeGod #4521** - DeGods Collection
2. 🐒 **SMB #892** - Solana Monkey Business  
3. 🌟 **Tensorian #156** - Tensorians

NFT metadata fetched without revealing your wallet to the AI model.`,
    default: `I can help you with:
- **Balance** - Check your SOL balance
- **Tokens** - View all SPL token holdings
- **Transactions** - See recent transaction history
- **NFTs** - Discover your NFT collection

Try asking something like "What's my balance?" or "Show my tokens".`,
};

function getResponse(query: string): string {
    const lower = query.toLowerCase();
    if (lower.includes('balance') && !lower.includes('token')) return mockResponses.balance;
    if (lower.includes('token')) return mockResponses.tokens;
    if (lower.includes('transaction') || lower.includes('history')) return mockResponses.transactions;
    if (lower.includes('nft') || lower.includes('collectible')) return mockResponses.nfts;
    return mockResponses.default;
}

export function AgentChat() {
    const [wallet, setWallet] = useState('');
    const [walletConnected, setWalletConnected] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleConnect = () => {
        if (wallet.length >= 32) {
            setWalletConnected(true);
            setMessages([
                {
                    id: '1',
                    role: 'agent',
                    content: `Wallet connected securely! Your address is now stored in **sly_data** and will never be visible to me.\n\nTry asking about your balance, tokens, transactions, or NFTs.`,
                    timestamp: new Date(),
                },
            ]);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // Simulate typing delay
        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

        const agentMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'agent',
            content: getResponse(input),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, agentMessage]);
        setIsLoading(false);
    };

    if (!walletConnected) {
        return (
            <Card padding="lg" className="max-w-md mx-auto">
                <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#CCFBF1] text-[#0D9488] flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Connect Your Wallet</h3>
                    <p className="text-sm text-[#6B7280]">
                        Enter your Solana wallet address to try the demo. It will be stored securely in sly_data.
                    </p>
                </div>

                <div className="space-y-4">
                    <Input
                        placeholder="Enter Solana wallet address..."
                        value={wallet}
                        onChange={(e) => setWallet(e.target.value)}
                        icon={
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        }
                    />
                    <Button
                        onClick={handleConnect}
                        className="w-full"
                        disabled={wallet.length < 32}
                    >
                        Connect Wallet
                    </Button>
                    <p className="text-xs text-center text-[#9CA3AF]">
                        Try: 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU
                    </p>
                </div>
            </Card>
        );
    }

    return (
        <Card padding="none" className="max-w-2xl mx-auto overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#E5E7EB] bg-[#FAFAF8]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#CCFBF1] flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-[#14B8A6]" />
                        </div>
                        <div>
                            <p className="font-medium text-[#1A1A1A] text-sm">Solana Agent</p>
                            <p className="text-xs text-[#9CA3AF]">sly_data protected</p>
                        </div>
                    </div>
                    <span className="text-xs font-mono bg-[#F3F4F6] px-2 py-1 rounded text-[#6B7280]">
                        {wallet.slice(0, 4)}...{wallet.slice(-4)}
                    </span>
                </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                        <div
                            className={`max-w-[85%] rounded-2xl px-4 py-3 ${message.role === 'user'
                                    ? 'bg-[#14B8A6] text-white rounded-br-md'
                                    : 'bg-[#F3F4F6] text-[#1A1A1A] rounded-bl-md'
                                }`}
                        >
                            <div
                                className="text-sm whitespace-pre-wrap"
                                dangerouslySetInnerHTML={{
                                    __html: message.content
                                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                        .replace(/\n/g, '<br>')
                                }}
                            />
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start animate-fade-in">
                        <div className="bg-[#F3F4F6] rounded-2xl rounded-bl-md px-4 py-3">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-[#9CA3AF] animate-pulse" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 rounded-full bg-[#9CA3AF] animate-pulse" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 rounded-full bg-[#9CA3AF] animate-pulse" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#E5E7EB]">
                <form
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex gap-3"
                >
                    <Input
                        placeholder="Ask about your balance, tokens, transactions..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1"
                    />
                    <Button type="submit" disabled={!input.trim() || isLoading}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </Button>
                </form>
            </div>
        </Card>
    );
}
