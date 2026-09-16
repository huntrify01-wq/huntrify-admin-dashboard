import React from 'react';
import { cn } from '../../utils/cn';

export interface ChatBubbleProps {
  message: string;
  time: string;
  isSender?: boolean;
  senderName?: string;
  avatarUrl?: string;
  status?: 'sent' | 'delivered' | 'read';
  className?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  time,
  isSender = false,
  senderName,
  avatarUrl,
  status,
  className
}) => {
  return (
    <div className={cn(
      "flex w-full gap-3",
      isSender ? "justify-end" : "justify-start",
      className
    )}>
      {/* Receiver Avatar */}
      {!isSender && avatarUrl && (
        <div className="shrink-0 mt-auto">
          <img 
            src={avatarUrl} 
            alt={senderName || "User"} 
            className="w-8 h-8 rounded-full object-cover border border-border-main"
          />
        </div>
      )}

      {/* Bubble Container */}
      <div className={cn(
        "flex flex-col gap-1 max-w-[75%]",
        isSender ? "items-end" : "items-start"
      )}>
        
        {/* Sender Name (for group chats) */}
        {!isSender && senderName && (
          <span className="text-[12px] font-medium text-text-sec ml-1">
            {senderName}
          </span>
        )}

        {/* Bubble */}
        <div className={cn(
          "px-4 py-2.5 text-[14px] leading-relaxed relative group",
          isSender 
            ? "bg-primary text-white rounded-2xl rounded-br-sm" 
            : "bg-surface border border-border-main text-text-main rounded-2xl rounded-bl-sm shadow-sm"
        )}>
          {message}
        </div>

        {/* Time & Status Meta */}
        <div className={cn(
          "flex items-center gap-1 mt-0.5 text-[11px] text-text-sec px-1"
        )}>
          <span>{time}</span>
          
          {/* Read Receipts */}
          {isSender && status && (
            <span className="text-[14px] ml-1">
              {status === 'sent' && <i className="ri-check-line" />}
              {status === 'delivered' && <i className="ri-check-double-line" />}
              {status === 'read' && <i className="ri-check-double-line text-primary" />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
