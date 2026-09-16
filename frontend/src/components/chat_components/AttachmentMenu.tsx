import React from 'react';
import { cn } from '../../utils/cn';

export type AttachmentType = 'file' | 'image' | 'camera' | 'quick_reply';

export interface AttachmentMenuProps {
  onSelect: (type: AttachmentType) => void;
  className?: string;
}

export const AttachmentMenu: React.FC<AttachmentMenuProps> = ({ onSelect, className }) => {
  const menuItems: { id: AttachmentType; label: string; icon: string; bgColor: string }[] = [
    { 
      id: 'file', 
      label: 'Attach File', 
      icon: 'ri-file-3-line', 
      bgColor: 'bg-[#7c3aed]' // Purple
    },
    { 
      id: 'image', 
      label: 'Image', 
      icon: 'ri-image-line', 
      bgColor: 'bg-[#2563eb]' // Blue
    },
    { 
      id: 'camera', 
      label: 'Camera', 
      icon: 'ri-camera-line', 
      bgColor: 'bg-[#16a34a]' // Green
    },
    { 
      id: 'quick_reply', 
      label: 'Quick Replies', 
      icon: 'ri-flashlight-line', 
      bgColor: 'bg-[#f59e0b]' // Orange/Warning
    },
  ];

  return (
    <div 
      className={cn(
        "relative p-3 bg-bg border border-border-main rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-50 animate-in fade-in slide-in-from-bottom-2 duration-200",
        className
      )}
    >
      {/* Popover Arrow pointing down to the paperclip */}
      <div className="absolute -bottom-[6px] left-5 w-3 h-3 bg-bg border-b border-r border-border-main rotate-45 rounded-br-[2px]" />

      <div className="relative z-10 flex gap-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className="flex flex-col items-center justify-start w-16 gap-2 group focus:outline-none"
          >
            <div className={cn(
              "w-12 h-12 flex items-center justify-center rounded-[14px] text-white transition-transform duration-200 group-hover:-translate-y-1 group-hover:shadow-md",
              item.bgColor
            )}>
              <i className={cn(item.icon, "text-[22px]")} />
            </div>
            <span className="text-[11px] font-medium text-text-sec group-hover:text-text-main text-center leading-tight">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AttachmentMenu;
