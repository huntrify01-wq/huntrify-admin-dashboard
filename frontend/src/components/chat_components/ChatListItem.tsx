import React from 'react';
import { cn } from '../../utils/cn';

export interface ChatListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  avatarUrl?: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isOnline?: boolean;
  isActive?: boolean;
}

export const ChatListItem = React.forwardRef<HTMLDivElement, ChatListItemProps>(
  (
    {
      name,
      avatarUrl,
      lastMessage,
      time,
      unreadCount = 0,
      isOnline = false,
      isActive = false,
      className,
      ...props
    },
    ref
  ) => {
    // Generate initials from name (e.g., "Sarah Jenkins" -> "SJ")
    const getInitials = (name: string) => {
      const parts = name.split(' ');
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    };

    return (
      <div
        ref={ref}
        className={cn(
          "group flex items-center gap-3.5 p-3 rounded-2xl cursor-pointer transition-all duration-200",
          isActive 
            ? "bg-primary/5 dark:bg-primary/10 border-transparent" 
            : "hover:bg-black/10 dark:hover:bg-white/10",
          className
        )}
        {...props}
      >
        {/* Avatar Container with Online Indicator */}
        <div className="relative shrink-0">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={name} 
              className="w-12 h-12 rounded-full object-cover border border-border-main"
            />
          ) : (
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-headingA font-semibold text-[16px] bg-primary/10 dark:bg-[#b3a4ff]/10 text-primary dark:text-[#b3a4ff] border border-primary/20">
              {getInitials(name)}
            </div>
          )}
          {isOnline && (
            <div className={cn(
              "absolute bottom-0 right-0 w-3.5 h-3.5 bg-success rounded-full border-2",
              isActive ? "border-bg" : "border-bg group-hover:border-surface transition-colors"
            )} />
          )}
        </div>

        {/* Text Content */}
        <div className="flex-1 flex flex-col min-w-0 py-0.5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[14px] font-semibold text-text-main truncate pr-2">
              {name}
            </span>
            <span className={cn(
              "text-[11px] shrink-0 font-medium",
              unreadCount > 0 ? "text-primary dark:text-[#b3a4ff]" : "text-text-sec"
            )}>
              {time}
            </span>
          </div>
          
          <div className="flex justify-between items-center gap-3">
            <span className={cn(
              "text-[13px] truncate",
              unreadCount > 0 ? "text-text-main font-medium" : "text-text-sec"
            )}>
              {lastMessage}
            </span>
            
            {/* Unread Badge */}
            {unreadCount > 0 && (
              <div className="shrink-0 h-5 min-w-[20px] px-1.5 bg-primary text-white text-[11px] font-semibold flex items-center justify-center rounded-full shadow-sm">
                {unreadCount > 99 ? '99+' : unreadCount}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ChatListItem.displayName = 'ChatListItem';
export default ChatListItem;
