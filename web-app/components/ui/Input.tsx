'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', icon, error, ...props }, ref) => {
        return (
            <div className="w-full">
                <div className="relative">
                    {icon && (
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`
              w-full px-4 py-3
              ${icon ? 'pl-11' : ''}
              bg-white border border-[#E5E7EB] rounded-lg
              text-[#1A1A1A] placeholder-[#9CA3AF]
              transition-all duration-200 ease-out
              focus:outline-none focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/20
              ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}
              ${className}
            `}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="mt-1.5 text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
