'use client';

import { useState, useRef, ReactNode } from 'react';

interface TooltipProps {
    children: ReactNode;
    content: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
}

export function Tooltip({ children, content, position = 'top', delay = 200 }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
        }, delay);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(false);
    };

    const positionStyles = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    const arrowStyles = {
        top: 'top-full left-1/2 -translate-x-1/2 border-t-[#1A1A1A] border-x-transparent border-b-transparent',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[#1A1A1A] border-x-transparent border-t-transparent',
        left: 'left-full top-1/2 -translate-y-1/2 border-l-[#1A1A1A] border-y-transparent border-r-transparent',
        right: 'right-full top-1/2 -translate-y-1/2 border-r-[#1A1A1A] border-y-transparent border-l-transparent',
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            <div
                className={`absolute ${positionStyles[position]} z-50 px-3 py-2 text-sm text-white bg-[#1A1A1A] rounded-lg shadow-lg whitespace-nowrap transition-all duration-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                    }`}
            >
                {content}
                {/* Arrow */}
                <div className={`absolute w-0 h-0 border-4 ${arrowStyles[position]}`} />
            </div>
        </div>
    );
}
