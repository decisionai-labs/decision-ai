'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

export function Newsletter() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
            setEmail('');
        }
    };

    return (
        <section ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1F2937] to-[#1A1A1A]" />

            {/* Animated gradient overlay */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-r from-[#14B8A6]/20 via-transparent to-[#8B5CF6]/20" />
            </div>

            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Floating particles */}
            <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-[#14B8A6] animate-float opacity-60" />
            <div className="absolute top-20 right-20 w-3 h-3 rounded-full bg-[#8B5CF6] animate-float-slow opacity-40" />
            <div className="absolute bottom-10 left-1/4 w-2 h-2 rounded-full bg-[#F59E0B] animate-float-delayed opacity-50" />

            <div className="max-w-xl mx-auto relative z-10">
                <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#14B8A6] to-[#0D9488] mb-6 shadow-lg shadow-[#14B8A6]/20">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
                        Stay Updated
                    </h3>
                    <p className="text-[#9CA3AF] mb-8">
                        Get notified about new features, chain integrations, and privacy updates.
                    </p>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#14B8A6] focus:ring-[#14B8A6]/30"
                                required
                            />
                            <Button type="submit" className="btn-glow whitespace-nowrap">
                                Subscribe
                                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Button>
                        </form>
                    ) : (
                        <div className="p-4 bg-[#14B8A6]/10 border border-[#14B8A6]/20 rounded-xl">
                            <div className="flex items-center justify-center gap-2 text-[#14B8A6]">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="font-medium">You're on the list!</span>
                            </div>
                        </div>
                    )}

                    <p className="mt-4 text-xs text-[#6B7280]">
                        No spam, ever. Unsubscribe anytime.
                    </p>
                </div>
            </div>
        </section>
    );
}
