import React from 'react';
import { cn } from './Input';

export interface CheckboxCardWithAvatarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  avatarUrl: string;
  title: React.ReactNode;
  handle?: React.ReactNode; // e.g., '@olivia'
  role?: React.ReactNode; // e.g., 'Product Manager'
}

export const CheckboxCardWithAvatar = React.forwardRef<HTMLInputElement, CheckboxCardWithAvatarProps>(
  ({ className, avatarUrl, title, handle, role, ...props }, ref) => {
    return (
      <label className={cn(
        "group relative flex items-center gap-4 p-4 border border-border-main rounded-xl cursor-pointer transition-all duration-200",
        "hover:border-primary/50",
        "has-[:checked]:border-primary has-[:checked]:bg-primary/[0.02] has-[:checked]:ring-1 has-[:checked]:ring-primary",
        className
      )}>
        <input type="checkbox" className="peer sr-only" ref={ref} {...props} />
        
        {/* Left Avatar Block */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-surface border border-border-main p-[2px]">
          {avatarUrl ? (
            <img src={avatarUrl} alt="" className="w-full h-full object-cover rounded-full" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-sec rounded-full">
              <i className="ri-user-line text-xl" />
            </div>
          )}
        </div>
        
        {/* Middle Content */}
        <div className="flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[15px] font-medium text-text-main">{title}</span>
            {handle && <span className="text-[14px] text-text-sec">{handle}</span>}
          </div>
          {role && (
            <div className="text-[14px] text-text-sec mt-0.5">
              {role}
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

CheckboxCardWithAvatar.displayName = 'CheckboxCardWithAvatar';
export default CheckboxCardWithAvatar;
