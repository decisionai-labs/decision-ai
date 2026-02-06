'use client';

import { useEffect, useRef, useState } from 'react';

interface StatItem {
    value: number;
    suffix: string;
    label: string;
}

const stats: StatItem[] = [
    { value: 100, suffix: '%', label: 'Privacy Preserved' },
    { value: 50, suffix: 'ms', label: 'Avg Response Time' },
    { value: 4, suffix: '', label: 'Tools Available' },
    { value: 0, suffix: '', label: 'Addresses Exposed' },
];

export function AnimatedStats() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="py-16 px-6 border-y border-[#E5E7EB] bg-white/50">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.label}
                            className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-2">
                                <AnimatedNumber
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    isVisible={isVisible}
                                    delay={index * 100}
                                />
                            </div>
                            <div className="text-sm text-[#6B7280]">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

interface AnimatedNumberProps {
    value: number;
    suffix: string;
    isVisible: boolean;
    delay: number;
}

function AnimatedNumber({ value, suffix, isVisible, delay }: AnimatedNumberProps) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (!isVisible) return;

        const timer = setTimeout(() => {
            const duration = 1500;
            const steps = 30;
            const increment = value / steps;
            let current = 0;
            let step = 0;

            const interval = setInterval(() => {
                step++;
                current = Math.min(Math.round(increment * step), value);
                setDisplayValue(current);

                if (step >= steps) {
                    clearInterval(interval);
                    setDisplayValue(value);
                }
            }, duration / steps);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timer);
    }, [isVisible, value, delay]);

    return (
        <span className="text-gradient">
            {displayValue}{suffix}
        </span>
    );
}
