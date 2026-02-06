'use client';

import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', icon, error, ...props }, ref) => {
        return (
            <div className="relative w-full">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    ref={ref}
                    className={`
                        w-full px-4 py-3 
                        ${icon ? 'pl-10' : ''}
                        bg-white border border-[#E5E7EB] rounded-xl
                        text-[#1A1A1A] placeholder:text-[#9CA3AF]
                        transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6]
                        hover:border-[#D1D5DB]
                        disabled:bg-[#F9FAFB] disabled:cursor-not-allowed
                        ${error ? 'border-red-400 focus:ring-red-400/30 focus:border-red-400' : ''}
                        ${className}
                    `}
                    {...props}
                />
                {error && (
                    <p className="mt-1.5 text-xs text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
