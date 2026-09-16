import React from 'react';
import { cn } from '../../utils/cn';

export interface MessageActionsProps {
  onReply?: () => void;
  onCopy?: () => void;
  onReact?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isSender?: boolean;
  className?: string;
}

export const MessageActions: React.FC<MessageActionsProps> = ({
  onReply,
  onCopy,
  onReact,
  onEdit,
  onDelete,
  isSender = true,
  className
}) => {
  return (
    <div 
      className={cn(
        "relative flex flex-col p-1.5 min-w-[180px] bg-bg border border-border-main rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-50 animate-in fade-in zoom-in-95 duration-200",
        className
      )}
    >
      {/* Popover Arrow */}
      <div className="absolute -top-[6px] right-5 w-3 h-3 bg-bg border-t border-l border-border-main rotate-45 rounded-tl-[2px]" />

      <div className="relative z-10 flex flex-col">
        {onReply && (
          <button onClick={onReply} className="group flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg text-[13px] font-medium text-text-main hover:bg-black/5 dark:hover:bg-white/10 hover:text-primary transition-colors focus:outline-none">
            <i className="ri-reply-line text-[16px] text-text-sec group-hover:text-primary" />
            Reply
          </button>
        )}
        
        {onCopy && (
          <button onClick={onCopy} className="group flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg text-[13px] font-medium text-text-main hover:bg-black/5 dark:hover:bg-white/10 hover:text-primary transition-colors focus:outline-none">
            <i className="ri-file-copy-line text-[16px] text-text-sec group-hover:text-primary" />
            Copy Text
          </button>
        )}

        {onReact && (
          <button onClick={onReact} className="group flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg text-[13px] font-medium text-text-main hover:bg-black/5 dark:hover:bg-white/10 hover:text-primary transition-colors focus:outline-none">
            <i className="ri-emotion-line text-[16px] text-text-sec group-hover:text-primary" />
            React to Message
          </button>
        )}

        {isSender && onEdit && (
          <button onClick={onEdit} className="group flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg text-[13px] font-medium text-text-main hover:bg-black/5 dark:hover:bg-white/10 hover:text-primary transition-colors focus:outline-none">
            <i className="ri-pencil-line text-[16px] text-text-sec group-hover:text-primary" />
            Edit Message
          </button>
        )}

        {onDelete && (
          <>
            <div className="h-[1px] bg-border-main/60 my-1 mx-2" />
            <button onClick={onDelete} className="group flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg text-[13px] font-medium text-error hover:bg-error/10 transition-colors focus:outline-none">
              <i className="ri-delete-bin-line text-[16px]" />
              Delete Message
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageActions;
