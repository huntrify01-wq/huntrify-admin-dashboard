import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import MainLoader from '../mainloader';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const SecondaryButton = React.forwardRef<HTMLButtonElement, SecondaryButtonProps>(
  ({ className, children, isLoading, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] px-8 py-2.5 text-[15px] font-semibold transition-all duration-300 ease-out focus:outline-none outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
          'border border-border-main bg-surface text-text-main',
          'hover:bg-border-main hover:text-text-main shadow-sm hover:shadow-md active:scale-95',
          className
        )}
        {...props}
      >
        {isLoading && <MainLoader size={18} className="text-current" />}
        {children}
      </button>
    );
  }
);

SecondaryButton.displayName = 'SecondaryButton';
export default SecondaryButton;
