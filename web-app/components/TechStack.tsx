'use client';

import { useRef, useEffect, useState } from 'react';

const techStack = [
    {
        name: 'Solana',
        logo: (
            <svg className="w-8 h-8" viewBox="0 0 128 128" fill="none">
                <defs>
                    <linearGradient id="solana-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00FFA3" />
                        <stop offset="50%" stopColor="#03E1FF" />
                        <stop offset="100%" stopColor="#DC1FFF" />
                    </linearGradient>
                </defs>
                <path d="M23.6 94.5l17.4-17.4c0.8-0.8 1.9-1.3 3-1.3h75.3c1.9 0 2.8 2.3 1.5 3.6l-17.4 17.4c-0.8 0.8-1.9 1.3-3 1.3H24.6c-1.9 0-2.8-2.3-1.5-3.6h0.5z" fill="url(#solana-gradient)" />
                <path d="M23.6 33.5l17.4 17.4c0.8 0.8 1.9 1.3 3 1.3h75.3c1.9 0 2.8-2.3 1.5-3.6l-17.4-17.4c-0.8-0.8-1.9-1.3-3-1.3H24.6c-1.9 0-2.8 2.3-1.5 3.6h0.5z" fill="url(#solana-gradient)" />
                <path d="M120.3 64l-17.4-17.4c-0.8-0.8-1.9-1.3-3-1.3H24.6c-1.9 0-2.8 2.3-1.5 3.6l17.4 17.4c0.8 0.8 1.9 1.3 3 1.3h75.3c1.9 0 2.8-2.3 1.5-3.6h-0.5z" fill="url(#solana-gradient)" />
            </svg>
        ),
    },
    {
        name: 'Python',
        logo: (
            <svg className="w-8 h-8" viewBox="0 0 128 128">
                <linearGradient id="python-gradient-a" x1="55.549" x2="55.549" y1="127.9" y2=".9" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#387eb8" />
                    <stop offset="1" stopColor="#366994" />
                </linearGradient>
                <linearGradient id="python-gradient-b" x1="72.45" x2="72.45" y1="127.9" y2=".9" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ffe052" />
                    <stop offset="1" stopColor="#ffc331" />
                </linearGradient>
                <path fill="url(#python-gradient-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" />
                <path fill="url(#python-gradient-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" />
            </svg>
        ),
    },
    {
        name: 'NeuroSAN',
        logo: (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#14B8A6] to-[#0D9488] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </div>
        ),
    },
    {
        name: 'OpenAI',
        logo: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zM3.6559 19.1339a4.4714 4.4714 0 0 1-.5447-3.0368l.1419.0855 4.7783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 21.9067a4.5002 4.5002 0 0 1-6.0841-2.7728zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0L3.887 13.8511a4.5002 4.5002 0 0 1-1.5462-6.9555zm16.9218 3.9363l-5.8428-3.3685 2.0201-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7903a4.4992 4.4992 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4021-.6848v-.0002zm2.0107-3.0231l-.1419-.0855-4.7783-2.7582a.7712.7712 0 0 0-.7806 0L9.7085 9.22V6.8876a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7903a4.4992 4.4992 0 0 1 6.6802 4.66zM8.6434 12.0132l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V5.2111a4.5002 4.5002 0 0 1 7.3757-3.4537l-.1419.0804L8.5475 4.5752a.7948.7948 0 0 0-.3927.6813v6.7568-.0001zm1.0957-2.3654l2.6027-1.5017 2.6027 1.5017v3.0034l-2.6027 1.5017-2.6027-1.5017z" />
            </svg>
        ),
    },
    {
        name: 'TypeScript',
        logo: (
            <svg className="w-8 h-8" viewBox="0 0 128 128">
                <path fill="#007acc" d="M2 63.91v62.5h125v-125H2zm100.73-5.01v11.16h-21.16v60.65H66.44V70.06H45.28V58.9h57.45z" />
                <path fill="#fff" d="M97.51 50.05v8.15h-19.3v60.05H65.99V58.2H45.9v-8.15h51.61z" />
            </svg>
        ),
    },
    {
        name: 'Next.js',
        logo: (
            <svg className="w-8 h-8" viewBox="0 0 180 180" fill="none">
                <mask id="nextjs-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                    <circle cx="90" cy="90" r="90" fill="white" />
                </mask>
                <g mask="url(#nextjs-mask)">
                    <circle cx="90" cy="90" r="90" fill="black" />
                    <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#nextjs-grad-0)" />
                    <rect x="115" y="54" width="12" height="72" fill="url(#nextjs-grad-1)" />
                </g>
                <defs>
                    <linearGradient id="nextjs-grad-0" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="nextjs-grad-1" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        ),
    },
];

export function TechStack() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

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
        <section ref={sectionRef} className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
                <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <span className="text-sm text-[#9CA3AF] uppercase tracking-widest">Built With</span>
                </div>

                {/* Tech logos */}
                <div className={`flex flex-wrap justify-center items-center gap-8 md:gap-16 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    {techStack.map((tech, index) => (
                        <div
                            key={tech.name}
                            className={`flex flex-col items-center gap-2 group transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                            style={{ transitionDelay: `${200 + index * 100}ms` }}
                        >
                            <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] group-hover:border-[#14B8A6]/30 group-hover:shadow-lg transition-all duration-300 card-lift">
                                <div className="grayscale group-hover:grayscale-0 transition-all duration-300">
                                    {tech.logo}
                                </div>
                            </div>
                            <span className="text-xs text-[#9CA3AF] group-hover:text-[#6B7280] transition-colors">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
