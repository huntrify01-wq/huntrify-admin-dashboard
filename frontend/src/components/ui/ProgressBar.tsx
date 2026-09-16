import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  progress: number;
  color?: string; // Tailwind class or CSS variable like 'bg-success'
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, progress, color = 'bg-primary', size = 'md', showLabel = false, ...props }, ref) => {
    // Clamp progress between 0 and 100
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    const sizeClasses = {
      sm: 'h-1.5',
      md: 'h-2.5',
      lg: 'h-4',
    };

    return (
      <div className={cn("w-full flex flex-col gap-1.5", className)} ref={ref} {...props}>
        {showLabel && (
          <div className="flex items-center justify-between text-xs font-medium text-text-sec">
            <span>Progress</span>
            <span>{Math.round(clampedProgress)}%</span>
          </div>
        )}
        <div className={cn("w-full overflow-hidden rounded-full bg-surface border border-border-main/50", sizeClasses[size])}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${clampedProgress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn("h-full rounded-full", color)}
          />
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';
export default ProgressBar;
