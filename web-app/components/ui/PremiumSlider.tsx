'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, PanInfo } from 'framer-motion';

export interface SliderItem {
    id: string | number;
    title: string;
    description: string;
    icon?: React.ReactNode;
    content?: React.ReactNode;
}

interface PremiumSliderProps {
    items: SliderItem[];
    autoPlayInterval?: number;
    className?: string;
}

export function PremiumSlider({ items, autoPlayInterval = 5000, className = '' }: PremiumSliderProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % items.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    // Auto-play logic
    useEffect(() => {
        if (!autoPlayInterval) return;

        const interval = setInterval(() => {
            handleNext();
        }, autoPlayInterval);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex, autoPlayInterval, items.length]);

    const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const swipe = info.offset.x;

        if (swipe < -50) {
            handleNext();
        } else if (swipe > 50) {
            handlePrev();
        }
    };

    return (
        <div className={`relative w-full max-w-6xl mx-auto ${className}`} ref={containerRef}>
            {/* Main Slider Area */}
            <div className="overflow-hidden relative rounded-3xl p-4 sm:p-8">
                {/* Background Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#14B8A6]/5 via-transparent to-[#8B5CF6]/5 rounded-3xl blur-3xl -z-10" />

                <motion.div
                    className="flex cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    animate={{
                        x: `-${activeIndex * 100}%`,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        mass: 0.8,
                    }}
                    style={{ x }}
                >
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className="min-w-full flex-[0_0_100%] px-2 sm:px-4"
                        >
                            <div className={`
                                h-full transition-all duration-500 rounded-3xl border
                                ${activeIndex === index
                                    ? 'bg-[#111111]/80 border-[#14B8A6]/30 shadow-2xl shadow-[#14B8A6]/10'
                                    : 'bg-[#111111]/30 border-white/5 opacity-50 scale-95 hover:opacity-80'
                                }
                                backdrop-blur-xl p-8 sm:p-12
                            `}>
                                <div className="flex flex-col md:flex-row gap-8 items-center h-full">
                                    {/* Icon/Visual Side */}
                                    <div className="flex-shrink-0">
                                        <div className={`
                                            w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center transition-all duration-700
                                            ${activeIndex === index
                                                ? 'bg-gradient-to-br from-[#14B8A6] to-[#0D9488] shadow-lg shadow-[#14B8A6]/30 scale-100 text-white'
                                                : 'bg-zinc-800 text-zinc-500 scale-90'
                                            }
                                        `}>
                                            {item.icon}
                                        </div>
                                    </div>

                                    {/* Text Content Side */}
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className={`text-2xl sm:text-3xl font-semibold mb-3 transition-colors duration-500 ${activeIndex === index ? 'text-white' : 'text-zinc-400'}`}>
                                            {item.title}
                                        </h3>
                                        <p className={`text-lg transition-colors duration-500 ${activeIndex === index ? 'text-zinc-300' : 'text-zinc-600'}`}>
                                            {item.description}
                                        </p>

                                        {item.content && (
                                            <div className="mt-8 transition-opacity duration-500">
                                                {item.content}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Navigation Indicators */}
            <div className="flex justify-center items-center gap-3 mt-8">
                {items.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`transition-all duration-300 rounded-full ${activeIndex === idx
                            ? 'w-8 h-2 bg-[#14B8A6] shadow-[0_0_10px_rgba(20,184,166,0.5)]'
                            : 'w-2 h-2 bg-zinc-700 hover:bg-zinc-500'
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Optional subtle arrows (hidden on small screens) */}
            <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hidden md:flex backdrop-blur-md"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hidden md:flex backdrop-blur-md"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
        </div>
    );
}
