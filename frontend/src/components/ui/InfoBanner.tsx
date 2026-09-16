import React from 'react';
import { cn } from '../../utils/cn';

export interface InfoBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: string;
  children: React.ReactNode;
}

export const InfoBanner = React.forwardRef<HTMLDivElement, InfoBannerProps>(
  ({ icon = 'ri-lock-2-line', children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 w-full p-2.5 pr-4 rounded-xl",
          "bg-primary/[0.04] dark:bg-primary/[0.08]",
          className
        )}
        {...props}
      >
        <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-primary/[0.1] dark:bg-primary/[0.15] text-primary dark:text-[#a594fd]">
          <i className={cn("text-[16px]", icon)} />
        </div>
        <div className="flex-1 text-[13px] text-text-sec dark:text-zinc-300">
          {children}
        </div>
      </div>
    );
  }
);

InfoBanner.displayName = 'InfoBanner';
export default InfoBanner;
