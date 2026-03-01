'use client';

import { useEffect, useRef, useState } from 'react';
import { FaBrain, FaBuilding, FaBolt } from 'react-icons/fa';

const team = [
    {
        name: 'NeuroSAN',
        role: 'AI Framework',
        avatar: <FaBrain />,
        github: 'https://github.com/cognizant-ai-labs/neurosan',
    },
    {
        name: 'Cognizant AI Labs',
        role: 'Foundation',
        avatar: <FaBuilding />,
        github: 'https://github.com/cognizant-ai-labs',
    },
    {
        name: 'Solana Foundation',
        role: 'Blockchain',
        avatar: <FaBolt />,
        github: 'https://github.com/solana-labs',
    },
    {
        name: 'Toly',
        role: 'Solana Creator',
        avatar: <FaBolt />,
        github: 'https://github.com/aeyakovenko',
    },
    {
        name: 'Raj',
        role: 'Solana Co-Founder',
        avatar: <FaBolt />,
        github: 'https://github.com/rajgokal',
    },
];

export function Credits() {
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

    return (
        <section ref={sectionRef} className="py-16 px-6 bg-black">
            <div className="max-w-4xl mx-auto">
                <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h3 className="text-xl font-semibold text-white mb-2">Built With Care</h3>
                    <p className="text-sm text-zinc-400">Thanks to these amazing projects and people</p>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {team.map((member, index) => (
                        <a
                            key={member.name}
                            href={member.github}
                            target="_blank"
                            className={`group flex items-center gap-3 px-5 py-3 bg-[#111111] rounded-full border border-white/10 hover:border-[#14B8A6]/30 hover:shadow-md transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <span className="text-2xl group-hover:scale-110 transition-transform">{member.avatar}</span>
                            <div>
                                <div className="font-medium text-sm text-white group-hover:text-[#14B8A6] transition-colors">
                                    {member.name}
                                </div>
                                <div className="text-xs text-zinc-500">{member.role}</div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
