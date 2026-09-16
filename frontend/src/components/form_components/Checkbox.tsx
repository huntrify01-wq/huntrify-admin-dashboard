import React from 'react';
import { cn } from './Input';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, ...props }, ref) => {
    return (
      <label className={cn("group relative flex flex-col cursor-pointer select-none", className)}>
        
        {/* Main Row: Checkbox + Label */}
        <div className="flex items-center gap-3">
          {/* Checkbox Container */}
          <div className="relative flex items-center justify-center flex-shrink-0">
            <input
              type="checkbox"
              className="peer sr-only"
              ref={ref}
              {...props}
            />
            {/* Custom Visual Checkbox */}
            <div className={cn(
              "flex items-center justify-center w-[20px] h-[20px] border-2 border-border-main rounded-[6px] transition-colors",
              "peer-checked:bg-primary peer-checked:border-primary",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg"
            )}>
              <svg 
                className="w-3.5 h-3.5 text-white opacity-0 group-has-[:checked]:opacity-100 transition-opacity duration-200" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          
          {/* Label Text */}
          {label && (
            <span className="text-[14px] font-medium text-text-main">
              {label}
            </span>
          )}
        </div>
        
        {/* Description Row (Aligned with label text) */}
        {description && (
          <div className="pl-[32px] mt-0.5">
            <span className="block text-[13px] text-text-sec leading-snug">
              {description}
            </span>
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
