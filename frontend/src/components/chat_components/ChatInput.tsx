import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import AttachmentMenu from './AttachmentMenu';

export interface ChatInputProps {
  onSend: (message: string) => void;
  onAttach?: (type: string) => void;
  placeholder?: string;
  className?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  onAttach,
  placeholder = "Type a message...",
  className
}) => {
  const [message, setMessage] = useState('');
  const [isAttachOpen, setIsAttachOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close attachment menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsAttachOpen(false);
      }
    };
    if (isAttachOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAttachOpen]);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleAttachmentSelect = (type: string) => {
    setIsAttachOpen(false);
    if (onAttach) onAttach(type);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Attachment Popover */}
      {isAttachOpen && (
        <div className="absolute bottom-full left-0 mb-3">
          <AttachmentMenu onSelect={handleAttachmentSelect} />
        </div>
      )}

      {/* Input Box */}
      <div className={cn(
        "flex items-end gap-2 p-1.5 bg-surface border border-border-main rounded-2xl focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-300",
        className
      )}>
        {/* Attachment Button */}
        <button 
          onClick={() => setIsAttachOpen(!isAttachOpen)}
          className={cn(
            "shrink-0 w-9 h-9 mb-0.5 ml-0.5 flex items-center justify-center rounded-xl transition-all duration-200 focus:outline-none hover:scale-105",
            isAttachOpen ? "bg-primary text-white shadow-md" : "bg-primary/10 text-primary hover:bg-primary/20"
          )}
          title="Attach file"
        >
          <i className="ri-attachment-2 text-[18px]" />
        </button>

        {/* Input Area */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          className="flex-1 bg-transparent py-2.5 px-2 text-[14px] text-text-main placeholder:text-muted resize-none outline-none max-h-[120px] scrollbar-thin"
          style={{ minHeight: '40px' }}
        />

        {/* Action Buttons */}
        <div className="shrink-0 flex items-center gap-1.5 mb-0.5 mr-0.5">
          <button 
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-warning/10 text-warning hover:bg-warning/20 transition-all duration-200 focus:outline-none hover:scale-105"
            title="Add emoji"
          >
            <i className="ri-emotion-line text-[18px]" />
          </button>

          <button 
            onClick={handleSend}
            disabled={!message.trim()}
            className={cn(
              "w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-300 focus:outline-none",
              message.trim() 
                ? "bg-primary text-white hover:bg-primary/90 shadow-md scale-100 hover:scale-105" 
                : "bg-transparent text-muted cursor-not-allowed scale-95"
            )}
            title="Send message"
          >
            <i className="ri-send-plane-fill text-[16px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
