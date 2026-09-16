import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import MainLoader from '../mainloader';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonWithIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  iconName: string; // e.g., 'ri-arrow-right-line'
  iconPosition?: 'left' | 'right';
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export const ButtonWithIcon = React.forwardRef<HTMLButtonElement, ButtonWithIconProps>(
  ({ className, children, iconName, iconPosition = 'left', variant = 'primary', isLoading, disabled, ...props }, ref) => {
    const isPrimary = variant === 'primary';

    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(
          'group relative overflow-hidden inline-flex items-center justify-center rounded-[var(--radius-btn)] px-8 py-2.5 text-[15px] font-semibold transition-all duration-300 ease-out focus:outline-none outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
          isPrimary
            ? 'bg-primary text-white hover:bg-primary-hover border border-transparent shadow-sm hover:shadow-md active:scale-95'
            : 'border border-text-main bg-transparent text-text-main hover:bg-text-main hover:text-bg shadow-sm hover:shadow-md active:scale-95',
          className
        )}
        {...props}
      >
        {/* Glass Shine Effect (only applied to primary variant) */}
        {isPrimary && (
          <span className="pointer-events-none absolute inset-0 -translate-x-[150%] skew-x-[20deg] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-[150%] z-10" />
        )}

        {/* Content & Icons */}
        <span className="relative z-20 flex items-center justify-center gap-2">
          {iconPosition === 'left' && (
            isLoading ? <MainLoader size={18} className="text-current" /> : <i className={cn(iconName, 'text-lg leading-none font-normal')} />
          )}
          {children}
          {iconPosition === 'right' && (
            isLoading ? <MainLoader size={18} className="text-current" /> : <i className={cn(iconName, 'text-lg leading-none font-normal')} />
          )}
        </span>
      </button>
    );
  }
);

ButtonWithIcon.displayName = 'ButtonWithIcon';
export default ButtonWithIcon;
