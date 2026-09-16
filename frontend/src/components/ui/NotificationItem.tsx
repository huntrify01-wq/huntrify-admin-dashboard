import React from 'react';
import { cn } from '../../utils/cn';

export type NotificationVariant = 'primary' | 'success' | 'warning' | 'error' | 'info';

export interface NotificationItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  time: string;
  iconName: string;
  variant?: NotificationVariant;
  isUnread?: boolean;
  showChevron?: boolean;
  onClick?: () => void;
}

export const NotificationItem = React.forwardRef<HTMLDivElement, NotificationItemProps>(
  (
    {
      title,
      subtitle,
      time,
      iconName,
      variant = 'primary',
      isUnread = false,
      showChevron = false,
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    // Map variants to background colors for the icon container
    const variantStyles = {
      primary: 'bg-primary text-white',
      success: 'bg-success text-white',
      warning: 'bg-warning text-white',
      error: 'bg-error text-white',
      info: 'bg-[#3b82f6] text-white', // Standard blue if distinct from primary
    };

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          "group flex items-center gap-3.5 p-3 rounded-xl transition-all duration-200",
          onClick ? "cursor-pointer hover:bg-border-main/20 dark:hover:bg-surface/60" : "",
          className
        )}
        {...props}
      >
        {/* Icon Container */}
        <div 
          className={cn(
            "shrink-0 w-10 h-10 rounded-lg flex items-center justify-center shadow-sm",
            variantStyles[variant]
          )}
        >
          <i className={cn("text-[18px]", iconName)} />
        </div>

        {/* Text Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <span className={cn(
            "text-[14px] font-medium truncate transition-colors",
            isUnread ? "text-text-main" : "text-text-main/80"
          )}>
            {title}
          </span>
          {subtitle && (
            <span className="text-[12px] text-text-sec mt-0.5 truncate">
              {subtitle}
            </span>
          )}
        </div>

        {/* Right Section (Time, Unread Dot, Chevron) */}
        <div className="shrink-0 flex items-center gap-3">
          <span className="text-[12px] text-text-sec">
            {time}
          </span>
          
          {(isUnread || showChevron) && (
            <div className="flex items-center gap-2">
              {isUnread && (
                <div className="w-2 h-2 rounded-full bg-primary" />
              )}
              {showChevron && (
                <i className="ri-arrow-right-s-line text-[18px] text-text-sec group-hover:text-text-main transition-colors" />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

NotificationItem.displayName = 'NotificationItem';
export default NotificationItem;
