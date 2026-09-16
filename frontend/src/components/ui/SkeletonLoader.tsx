import React from 'react';
import { cn } from '../../utils/cn';

export interface SkeletonLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: 'rect' | 'circle';
  animate?: boolean;
}

export const SkeletonLoader = React.forwardRef<HTMLDivElement, SkeletonLoaderProps>(
  ({ className, shape = 'rect', animate = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-border-main/70",
          animate && "animate-pulse",
          shape === 'circle' ? "rounded-full" : "rounded-lg",
          className
        )}
        {...props}
      />
    );
  }
);

SkeletonLoader.displayName = 'SkeletonLoader';
export default SkeletonLoader;
