import React from 'react';
import { cn } from '../../utils/cn';
import MainLoader from '../mainloader';

export interface OnlyIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconName?: string; 
  children?: React.ReactNode; 
  isLoading?: boolean;
  variant?: 'outline' | 'ghost' | 'filled';
  size?: 'sm' | 'md' | 'lg';
}

export const OnlyIconButton = React.forwardRef<HTMLButtonElement, OnlyIconButtonProps>(
  ({ className, iconName, children, isLoading, disabled, variant = 'outline', size = 'lg', ...props }, ref) => {
    
    const sizeClasses = {
      sm: 'w-8 h-8 rounded-md',
      md: 'w-10 h-10 rounded-lg',
      lg: 'w-[52px] h-[52px] rounded-xl' // Legacy size
    };

    const variantClasses = {
      outline: 'bg-transparent border border-border-main hover:bg-text-main/[0.04] hover:border-text-main/20',
      ghost: 'bg-transparent border-transparent hover:bg-text-main/[0.06]',
      filled: 'bg-surface border border-border-main hover:bg-border-main'
    };

    const iconSizes = {
      sm: 'text-[18px]',
      md: 'text-[20px]',
      lg: 'text-[24px]'
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(
          'inline-flex items-center justify-center shrink-0',
          sizeClasses[size],
          variantClasses[variant],
          'transition-all duration-200 active:scale-95 focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <MainLoader size={size === 'sm' ? 16 : 24} className="text-current" />
        ) : iconName ? (
          <i className={cn(iconName, iconSizes[size])} />
        ) : (
          children
        )}
      </button>
    );
  }
);

OnlyIconButton.displayName = 'OnlyIconButton';
export default OnlyIconButton;
