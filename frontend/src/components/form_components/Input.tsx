import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  suffix?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, placeholder, suffix, ...props }, ref) => {
    const inputId = id || React.useId();
    
    return (
      <div className="flex flex-col w-full">
        <div className="relative w-full">
          <input
            id={inputId}
            ref={ref}
            placeholder={placeholder || label || " "}
            className={cn(
              'peer w-full h-[48px] bg-transparent outline-none border border-border-main rounded-[var(--radius-input)] px-3.5 text-[14px] text-text-main transition-colors',
              'focus:border-primary placeholder-transparent',
              'hover:border-text-main/30',
              error && 'border-error focus:border-error hover:border-error',
              suffix && 'pr-10', // Add padding for suffix
              className
            )}
            {...props}
          />
          {label && (
            <label 
              htmlFor={inputId} 
              className={cn(
                "absolute left-3 px-1.5 bg-surface transition-all duration-200 pointer-events-none select-none rounded-full",
                // Floating state (default when typing/filled)
                "top-0 -translate-y-1/2 text-[11px] text-text-sec",
                // Empty/Unfocused state (when placeholder is shown)
                "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[14px]",
                // Focused state
                "peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-[11px]",
                error ? "peer-focus:text-error text-error" : "peer-focus:text-primary"
              )}
            >
              {label}
            </label>
          )}
          {suffix && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-text-sec">
              {suffix}
            </div>
          )}
        </div>
        {error && <span className="text-[11px] text-error mt-1 pl-1 truncate">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
