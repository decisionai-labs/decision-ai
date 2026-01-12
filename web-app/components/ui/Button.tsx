'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center font-medium
      transition-all duration-200 ease-out
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:pointer-events-none
      active:scale-[0.98]
    `;

    const variants = {
      primary: `
        bg-[#14B8A6] text-white
        hover:bg-[#0D9488]
        focus-visible:ring-[#14B8A6]
      `,
      secondary: `
        bg-white text-[#1A1A1A] border border-[#E5E7EB]
        hover:bg-[#F3F4F6] hover:border-[#D1D5DB]
        focus-visible:ring-[#14B8A6]
      `,
      ghost: `
        text-[#6B7280]
        hover:text-[#1A1A1A] hover:bg-[#F3F4F6]
        focus-visible:ring-[#14B8A6]
      `,
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-5 py-2.5 text-base rounded-lg',
      lg: 'px-7 py-3.5 text-lg rounded-xl',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
