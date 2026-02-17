'use client';

import { useState, useRef, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';
import { generateAuthMessage, verifySignature } from '@/lib/signature';
import bs58 from 'bs58';

interface Message {
    id: string;
    role: 'user' | 'agent';
    content: string;
    timestamp: Date;
}

export function AgentChat() {
    const { publicKey, signMessage, connected } = useWallet();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authMessage, setAuthMessage] = useState('');
    const [signature, setSignature] = useState<Uint8Array | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Reset authentication when wallet disconnects
    useEffect(() => {
        if (!connected) {
            setIsAuthenticated(false);
            setSignature(null);
            setAuthMessage('');
            setMessages([]);
        }
    }, [connected]);

    const handleAuthenticate = async () => {
        if (!publicKey || !signMessage) return;

        setIsAuthenticating(true);
        try {
            const message = generateAuthMessage();
            setAuthMessage(message);

            const messageBytes = new TextEncoder().encode(message);
            const sig = await signMessage(messageBytes);

            // Verify the signature
            const verification = verifySignature(
                publicKey.toString(),
                sig,
                message
            );

            if (verification.isValid) {
                setSignature(sig);
                setIsAuthenticated(true);
                setMessages([
                    {
                        id: '1',
                        role: 'agent',
                        content: `Wallet authenticated! Your address is stored in **sly_data** and will never be visible to the AI.\\n\\nTry asking about your **balance**, **tokens**, or **transactions**.`,
                        timestamp: new Date(),
                    },
                ]);
            } else {
                alert('Signature verification failed. Please try again.');
            }
        } catch (error) {
            console.error('Authentication error:', error);
            alert('Failed to sign message. Please try again.');
        } finally {
            setIsAuthenticating(false);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading || !publicKey || !signature) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        const query = input;
        setInput('');
        setIsLoading(true);

        try {
            // Call server-side API with signature for verification
            const res = await fetch('/api/solana', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query,
                    wallet: publicKey.toString(),
                    signature: bs58.encode(signature),
                    message: authMessage,
                    useDevnet: query.toLowerCase().includes('devnet')
                }),
            });

            const data = await res.json();

            const agentMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'agent',
                content: data.response || data.error || 'No response received.',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, agentMessage]);
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'agent',
                content: 'Sorry, there was an error connecting to the server. Please try again.',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    // Not connected to wallet
    if (!connected) {
        return (
            <Card padding="none" className="max-w-md mx-auto overflow-hidden glow-border">
                <div className="p-8 text-center">
                    {/* Animated icon */}
                    <div className="relative inline-flex items-center justify-center mb-6">
                        <div className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#14B8A6]/20 to-[#0D9488]/10 animate-pulse-subtle" />
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#14B8A6] to-[#0D9488] text-white flex items-center justify-center shadow-lg">
                            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-3">Connect Your Wallet</h3>
                    <p className="text-[#6B7280] mb-8">
                        Connect your Solana wallet to prove ownership and query your blockchain data securely.
                    </p>

                    <div className="wallet-adapter-button-container">
                        <WalletMultiButton className="!bg-gradient-to-r !from-[#14B8A6] !to-[#0D9488] !text-white !font-semibold !py-3 !px-6 !rounded-xl hover:!shadow-lg !transition-all !w-full" />
                    </div>

                    <p className="text-xs text-[#9CA3AF] mt-6">
                        Supports Phantom, Solflare, Backpack, and more
                    </p>
                </div>
            </Card>
        );
    }

    // Connected but not authenticated
    if (!isAuthenticated) {
        return (
            <Card padding="none" className="max-w-md mx-auto overflow-hidden glow-border">
                <div className="p-8 text-center">
                    <div className="relative inline-flex items-center justify-center mb-6">
                        <div className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#14B8A6]/20 to-[#0D9488]/10 animate-pulse-subtle" />
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#14B8A6] to-[#0D9488] text-white flex items-center justify-center shadow-lg">
                            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-3">Verify Ownership</h3>
                    <p className="text-[#6B7280] mb-4">
                        Sign a message to prove you own this wallet. This ensures only you can query your data.
                    </p>

                    <div className="mb-6 p-3 bg-[#F3F4F6] rounded-lg">
                        <p className="text-xs font-mono text-[#6B7280]">
                            {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-8)}
                        </p>
                    </div>

                    <Button
                        onClick={handleAuthenticate}
                        className="w-full btn-glow btn-ripple mb-4"
                        disabled={isAuthenticating}
                    >
                        {isAuthenticating ? 'Waiting for signature...' : 'Sign Message'}
                    </Button>

                    <div className="wallet-adapter-button-container">
                        <WalletMultiButton className="!bg-transparent !text-[#6B7280] !text-sm !py-2 !w-full" />
                    </div>
                </div>
            </Card>
        );
    }

    // Authenticated - show chat interface
    return (
        <Card padding="none" className="max-w-2xl mx-auto overflow-hidden shadow-xl">
            {/* Header with gradient */}
            <div className="relative px-6 py-4 border-b border-[#E5E7EB] bg-gradient-to-r from-[#FAFAF8] to-white">
                {/* Decorative gradient line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#14B8A6] via-[#0D9488] to-[#14B8A6]" />

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#CCFBF1] to-[#F0FDFA] flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-[#14B8A6] animate-pulse" />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                        </div>
                        <div>
                            <p className="font-semibold text-[#1A1A1A]">Solana Agent</p>
                            <p className="text-xs text-[#14B8A6]">Authenticated via sly_data</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs font-mono bg-[#F3F4F6] px-3 py-1.5 rounded-lg text-[#6B7280]">
                            {publicKey?.toString().slice(0, 4)}...{publicKey?.toString().slice(-4)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-[#FAFAF8]/50 to-white">
                {messages.map((message, index) => (
                    <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div
                            className={`max-w-[85%] rounded-2xl px-5 py-3.5 ${message.role === 'user'
                                ? 'bg-gradient-to-br from-[#14B8A6] to-[#0D9488] text-white rounded-br-md shadow-lg shadow-[#14B8A6]/20'
                                : 'bg-white text-[#1A1A1A] rounded-bl-md shadow-md border border-[#E5E7EB]'
                                }`}
                        >
                            <div
                                className="text-sm whitespace-pre-wrap leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html: message.content
                                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
                                        .replace(/`(.*?)`/g, `<code class="${message.role === 'user' ? 'bg-white/20' : 'bg-[#F3F4F6]'} px-1.5 py-0.5 rounded text-xs font-mono">$1</code>`)
                                        .replace(/\n/g, '<br>')
                                }}
                            />
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start animate-fade-in">
                        <div className="bg-white rounded-2xl rounded-bl-md px-5 py-4 shadow-md border border-[#E5E7EB]">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#14B8A6] animate-wave-1" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#14B8A6] animate-wave-2" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#14B8A6] animate-wave-3" />
                                </div>
                                <span className="text-sm text-[#6B7280]">Querying Solana...</span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#E5E7EB] bg-white">
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
                    <Button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="btn-glow px-5"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </Button>
                </form>
                <div className="mt-3 flex flex-wrap gap-2">
                    {['What is my balance?', 'Show my tokens', 'Recent transactions'].map((suggestion) => (
                        <button
                            key={suggestion}
                            onClick={() => setInput(suggestion)}
                            className="text-xs text-[#6B7280] px-3 py-1.5 rounded-full border border-[#E5E7EB] hover:border-[#14B8A6] hover:text-[#14B8A6] transition-colors"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>
        </Card>
    );
}
