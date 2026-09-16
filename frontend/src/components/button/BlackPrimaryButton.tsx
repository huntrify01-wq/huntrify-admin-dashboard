import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import MainLoader from '../mainloader';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BlackPrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const BlackPrimaryButton = React.forwardRef<HTMLButtonElement, BlackPrimaryButtonProps>(
  ({ className, children, isLoading, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(
          'group relative overflow-hidden inline-flex items-center justify-center rounded-[var(--radius-btn)] px-8 py-2.5 text-[15px] font-semibold transition-all duration-300 ease-out focus:outline-none outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
          'bg-text-main text-bg border border-transparent',
          'shadow-sm hover:shadow-[0_8px_20px_rgb(0,0,0,0.15)] dark:hover:shadow-[0_8px_20px_rgb(255,255,255,0.15)] active:scale-95',
          className
        )}
        {...props}
      >
        {/* Glass Shine Effect */}
        <span className="pointer-events-none absolute inset-0 -translate-x-[150%] skew-x-[20deg] bg-gradient-to-r from-transparent via-bg/30 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-[150%] z-10" />
        
        {/* Button Content */}
        <span className="relative z-20 flex items-center justify-center gap-2">
          {isLoading && <MainLoader size={18} className="text-bg" />}
          {children}
        </span>
      </button>
    );
  }
);

BlackPrimaryButton.displayName = 'BlackPrimaryButton';
export default BlackPrimaryButton;
