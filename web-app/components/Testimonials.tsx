'use client';

import { useState, useEffect, useRef } from 'react';

const testimonials = [
    {
        quote: "Finally, an AI tool that doesn't require me to compromise my wallet privacy. The sly_data architecture is brilliant.",
        author: "DeFi Developer",
        role: "Solana Ecosystem",
        avatar: "DD",
        gradient: "from-teal-400 to-emerald-500",
    },
    {
        quote: "Real-time blockchain queries without exposing my address to the model. This is exactly what Web3 needed.",
        author: "Security Researcher",
        role: "Web3 Security",
        avatar: "SR",
        gradient: "from-violet-400 to-purple-500",
    },
    {
        quote: "The multi-agent architecture is incredibly powerful. Building complex workflows has never been easier.",
        author: "Protocol Engineer",
        role: "Solana Labs",
        avatar: "PE",
        gradient: "from-pink-400 to-rose-500",
    },
    {
        quote: "Open source, privacy-first, and actually works. Decision AI sets the standard for blockchain AI tools.",
        author: "Open Source Contributor",
        role: "Cognizant AI Lab",
        avatar: "OS",
        gradient: "from-blue-400 to-cyan-500",
    },
];

export function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-[#14B8A6]/[0.03] to-white/[0.02] -z-10" />

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="text-sm text-zinc-500 uppercase tracking-widest">What Developers Say</span>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-white mt-4">
                        Trusted by the <span className="text-gradient">Community</span>
                    </h2>
                </div>

                {/* Testimonial carousel */}
                <div className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Quote marks decoration */}
                    <div className="absolute -top-8 left-0 text-[120px] font-serif text-[#14B8A6]/10 leading-none select-none">
                        &quot;
                    </div>

                    <div className="relative min-h-[200px]">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 flex flex-col items-center text-center transition-all duration-500 ${index === currentIndex
                                    ? 'opacity-100 translate-x-0'
                                    : index < currentIndex
                                        ? 'opacity-0 -translate-x-full'
                                        : 'opacity-0 translate-x-full'
                                    }`}
                            >
                                <p className="text-xl sm:text-2xl text-zinc-300 leading-relaxed mb-8 max-w-2xl">
                                    &quot;{testimonial.quote}&quot;
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-semibold shadow-lg`}>
                                        {testimonial.avatar}
                                    </div>
                                    <div className="text-left">
                                        <p className="font-semibold text-white">{testimonial.author}</p>
                                        <p className="text-sm text-zinc-400">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dots navigation */}
                    <div className="flex justify-center gap-2 mt-12">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-[#14B8A6] w-8'
                                    : 'bg-zinc-700 hover:bg-zinc-500'
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
