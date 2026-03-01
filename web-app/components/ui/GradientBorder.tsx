'use client';

import { ReactNode } from 'react';

interface GradientBorderProps {
    children: ReactNode;
    className?: string;
    borderWidth?: number;
    animated?: boolean;
}

export function GradientBorder({
    children,
    className = '',
    borderWidth = 2,
    animated = false
}: GradientBorderProps) {
    return (
        <div className={`relative p-[${borderWidth}px] rounded-2xl ${className}`}>
            {/* Gradient border */}
            <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-[#14B8A6] via-[#8B5CF6] to-[#14B8A6] ${animated ? 'bg-[length:200%_100%] animate-gradient-x' : ''}`}
                style={{
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    padding: `${borderWidth}px`,
                }}
            />

            {/* Content container */}
            <div className="relative bg-[#111111] rounded-[14px] overflow-hidden">
                {children}
            </div>
        </div>
    );
}
