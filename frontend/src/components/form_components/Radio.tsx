import React from 'react';
import { cn } from './Input';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, ...props }, ref) => {
    return (
      <label className={cn("group relative flex flex-col cursor-pointer select-none", className)}>
        
        {/* Main Row: Radio + Label */}
        <div className="flex items-center gap-3">
          {/* Radio Container */}
          <div className="relative flex items-center justify-center flex-shrink-0">
            <input
              type="radio"
              className="peer sr-only"
              ref={ref}
              {...props}
            />
            {/* Custom Visual Radio */}
            <div className={cn(
              "relative flex items-center justify-center w-[20px] h-[20px] border-2 border-border-main rounded-full transition-all duration-200",
              "peer-checked:border-primary",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg"
            )}>
              {/* Inner Dot */}
              <div className="w-[10px] h-[10px] rounded-full bg-primary opacity-0 scale-50 transition-all duration-200 group-has-[:checked]:opacity-100 group-has-[:checked]:scale-100" />
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

Radio.displayName = 'Radio';
export default Radio;
