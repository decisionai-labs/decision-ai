import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className = '', hover = false, padding = 'md', children, ...props }, ref) => {
        const baseStyles = `
      bg-white rounded-2xl border border-[#E5E7EB]
      transition-all duration-300 ease-out
      backdrop-blur-sm
    `;

        const hoverStyles = hover
            ? 'hover:translate-y-[-4px] hover:shadow-xl hover:border-[#14B8A6]/20 cursor-pointer'
            : '';

        const paddings = {
            none: '',
            sm: 'p-4',
            md: 'p-6',
            lg: 'p-8',
        };

        return (
            <div
                ref={ref}
                className={`${baseStyles} ${hoverStyles} ${paddings[padding]} ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';
