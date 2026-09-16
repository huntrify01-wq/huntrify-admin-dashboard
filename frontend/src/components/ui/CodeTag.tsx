import React from 'react';
import { cn } from '../../utils/cn';

export interface CodeTagProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  iconName?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CodeTag = React.forwardRef<HTMLDivElement, CodeTagProps>(
  ({ children, iconName = 'ri-file-code-line', size = 'sm', className, ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-2 py-1 text-[11px] rounded-md',
      md: 'px-3 py-1.5 text-xs rounded-lg',
      lg: 'px-4 py-2 text-sm rounded-xl',
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center font-mono font-medium tracking-wide transition-colors",
          "text-primary dark:text-[#b3a4ff]",
          "bg-primary/[0.08] dark:bg-[#b3a4ff]/10",
          "border border-primary/[0.25] dark:border-[#b3a4ff]/20",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {iconName && (
          <i 
            className={cn(
              iconName, 
              size === 'sm' ? 'mr-1.5 text-xs' : size === 'md' ? 'mr-2 text-sm' : 'mr-2 text-base'
            )} 
          />
        )}
        {children}
      </div>
    );
  }
);

CodeTag.displayName = 'CodeTag';
export default CodeTag;
