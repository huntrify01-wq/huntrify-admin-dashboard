import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DottedLinesCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const DottedLinesCard = React.forwardRef<HTMLDivElement, DottedLinesCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "border-2 border-dashed border-[#52525B] dark:border-[#3F3F46] rounded-2xl bg-transparent p-6",
          "hover:border-primary hover:bg-primary/[0.02]",
          "transition-all duration-300",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DottedLinesCard.displayName = 'DottedLinesCard';
export default DottedLinesCard;
