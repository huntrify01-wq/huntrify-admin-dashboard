import React from 'react';
import { cn } from './Input';

export interface CheckboxCardProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: React.ReactNode;
  description?: React.ReactNode;
}

export const CheckboxCard = React.forwardRef<HTMLInputElement, CheckboxCardProps>(
  ({ className, title, description, ...props }, ref) => {
    return (
      <label className={cn(
        "group relative flex items-center p-4 border border-border-main rounded-xl cursor-pointer transition-all duration-200",
        "hover:border-primary/50",
        "has-[:checked]:border-primary has-[:checked]:bg-primary/[0.02] has-[:checked]:ring-1 has-[:checked]:ring-primary",
        className
      )}>
        <input type="checkbox" className="peer sr-only" ref={ref} {...props} />
        
        <div className="flex-1 mr-6">
          <div className="text-[15px] font-medium text-text-main">{title}</div>
          {description && <div className="text-[14px] text-text-sec mt-1 leading-snug">{description}</div>}
        </div>

        {/* Custom Checkbox */}
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

CheckboxCard.displayName = 'CheckboxCard';
export default CheckboxCard;
