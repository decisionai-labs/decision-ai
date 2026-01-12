import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className = '', hover = false, padding = 'md', children, ...props }, ref) => {
        const baseStyles = `
      bg-white rounded-xl border border-[#E5E7EB]
      transition-all duration-200 ease-out
    `;

        const hoverStyles = hover
            ? 'hover:translate-y-[-2px] hover:shadow-md cursor-pointer'
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
