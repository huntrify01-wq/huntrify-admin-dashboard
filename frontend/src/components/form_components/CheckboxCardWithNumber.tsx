import React from 'react';
import { cn } from './Input';

export interface CheckboxCardWithNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  number: string | number; // e.g., '1' or 1
  title: React.ReactNode;
  description?: React.ReactNode;
}

export const CheckboxCardWithNumber = React.forwardRef<HTMLInputElement, CheckboxCardWithNumberProps>(
  ({ className, number, title, description, ...props }, ref) => {
    return (
      <label className={cn(
        "group relative flex items-center gap-4 p-4 border border-border-main rounded-xl cursor-pointer transition-all duration-200",
        "hover:border-primary/50",
        "has-[:checked]:border-primary has-[:checked]:bg-primary/[0.02] has-[:checked]:ring-1 has-[:checked]:ring-primary",
        className
      )}>
        <input type="checkbox" className="peer sr-only" ref={ref} {...props} />
        
        {/* Left Number Block */}
        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg border border-border-main bg-surface text-[20px] font-headingA font-bold text-text-main">
          {number}
        </div>
        
        {/* Middle Content */}
        <div className="flex-1">
          <div className="text-[15px] font-medium text-text-main">{title}</div>
          {description && (
            <div className="text-[14px] text-text-sec mt-1 leading-snug">
              {description}
            </div>
          )}
        </div>

        {/* Custom Checkbox on the right */}
        <div className={cn(
          "flex-shrink-0 flex items-center justify-center w-[20px] h-[20px] border-2 border-border-main rounded-[6px] transition-colors",
          "peer-checked:bg-primary peer-checked:border-primary"
        )}>
          <svg className="w-3.5 h-3.5 text-white opacity-0 group-has-[:checked]:opacity-100 transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </label>
    );
  }
);

CheckboxCardWithNumber.displayName = 'CheckboxCardWithNumber';
export default CheckboxCardWithNumber;
