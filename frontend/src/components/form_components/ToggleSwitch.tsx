import React from 'react';
import { cn } from '../../utils/cn';

export interface ToggleSwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

export const ToggleSwitch = React.forwardRef<HTMLInputElement, ToggleSwitchProps>(
  ({ className, label, description, disabled, ...props }, ref) => {
    return (
      <label className={cn("flex items-start gap-3 cursor-pointer", disabled && "opacity-50 cursor-not-allowed", className)}>
        {/* Toggle Track */}
        <div className="relative inline-flex items-center mt-0.5 shrink-0">
          <input
            type="checkbox"
            className="peer sr-only"
            disabled={disabled}
            ref={ref}
            {...props}
          />
          <div className={cn(
            "w-11 h-6 bg-border-main rounded-full transition-colors duration-300 ease-in-out",
            "peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20",
            "peer-checked:bg-primary"
          )}></div>
          {/* Toggle Dot */}
          <div className={cn(
            "absolute left-[2px] top-[2px] w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            "shadow-[0_2px_4px_rgba(0,0,0,0.2)]",
            "peer-checked:translate-x-5"
          )}></div>
        </div>

        {/* Text Content */}
        {(label || description) && (
          <div className="flex flex-col">
            {label && <span className="text-[14px] font-medium text-text-main">{label}</span>}
            {description && <span className="text-[12px] text-text-sec mt-0.5">{description}</span>}
          </div>
        )}
      </label>
    );
  }
);

ToggleSwitch.displayName = 'ToggleSwitch';
export default ToggleSwitch;
