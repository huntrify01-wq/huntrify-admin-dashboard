import React from 'react';
import { cn } from './Input';

export interface CheckboxCardWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: string; // e.g., 'ri-stack-line'
  title: React.ReactNode;
  description?: React.ReactNode;
  badge?: string; // Optional top badge like "Limited time only"
  price?: React.ReactNode; // Optional price section
}

export const CheckboxCardWithIcon = React.forwardRef<HTMLInputElement, CheckboxCardWithIconProps>(
  ({ className, icon, title, description, badge, price, ...props }, ref) => {
    return (
      <label className={cn(
        "group relative flex items-center gap-4 p-4 border border-border-main rounded-xl cursor-pointer transition-all duration-200",
        "hover:border-primary/50",
        "has-[:checked]:border-primary has-[:checked]:bg-primary/[0.02] has-[:checked]:ring-1 has-[:checked]:ring-primary",
        className
      )}>
        <input type="checkbox" className="peer sr-only" ref={ref} {...props} />
        
        {/* Left Icon Block */}
        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg border border-border-main bg-surface text-text-main">
          <i className={cn(icon, "text-xl")} />
        </div>
        
        {/* Middle Content */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[15px] font-medium text-text-main">{title}</span>
            {price && <span className="text-[15px] text-text-sec">{price}</span>}
            {badge && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-border-main text-[12px] font-medium text-text-sec">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
                {badge}
              </span>
            )}
          </div>
          
          {description && (
            <div className="text-[14px] text-text-sec mt-1.5 leading-relaxed">
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

CheckboxCardWithIcon.displayName = 'CheckboxCardWithIcon';
export default CheckboxCardWithIcon;
