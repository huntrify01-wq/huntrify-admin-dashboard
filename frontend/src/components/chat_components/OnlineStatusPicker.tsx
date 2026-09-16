import React from 'react';
import { cn } from '../../utils/cn';

export type OnlineStatus = 'online' | 'away' | 'offline';

export interface OnlineStatusPickerProps {
  currentStatus?: OnlineStatus;
  onChange?: (status: OnlineStatus) => void;
  className?: string;
}

export const OnlineStatusPicker: React.FC<OnlineStatusPickerProps> = ({
  currentStatus = 'online',
  onChange,
  className
}) => {
  const statuses: { id: OnlineStatus; label: string; color: string }[] = [
    { id: 'online', label: 'Online', color: 'bg-success' },
    { id: 'away', label: 'Away', color: 'bg-warning' },
    { id: 'offline', label: 'Offline', color: 'bg-text-sec/50' },
  ];

  return (
    <div className={cn(
      "flex flex-col gap-1 p-2 min-w-[160px] bg-bg border border-border-main rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-50",
      className
    )}>
      {statuses.map((s) => (
        <button
          key={s.id}
          onClick={() => onChange && onChange(s.id)}
          className={cn(
            "flex items-center gap-3 px-3 py-2 w-full text-left rounded-xl text-[14px] font-medium transition-colors focus:outline-none",
            currentStatus === s.id 
              ? "bg-black/5 dark:bg-white/10 text-text-main" 
              : "text-text-main hover:bg-black/5 dark:hover:bg-white/10"
          )}
        >
          <div className={cn("w-3 h-3 rounded-full", s.color)} />
          {s.label}
        </button>
      ))}
    </div>
  );
};

export default OnlineStatusPicker;
