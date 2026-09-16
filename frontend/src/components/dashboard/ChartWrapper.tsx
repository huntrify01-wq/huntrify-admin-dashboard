import React from 'react';
import { cn } from '../../utils/cn';

export interface ChartWrapperProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  title,
  subtitle,
  action,
  children,
  className
}) => {
  return (
    <div className={cn("flex flex-col bg-surface border border-border-main p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]", className)}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold font-headingA text-text-main">{title}</h3>
          {subtitle && <p className="text-sm text-text-sec mt-1">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      
      {/* Chart Container */}
      <div className="relative w-full">
        {children}
      </div>
    </div>
  );
};

export default ChartWrapper;
