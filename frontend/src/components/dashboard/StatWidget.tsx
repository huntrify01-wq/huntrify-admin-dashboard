import React from 'react';
import { cn } from '../../utils/cn';

export interface StatWidgetProps {
  title: string;
  value: string | number;
  icon?: string;
  trend?: number; // e.g. 12.5 (positive) or -4.2 (negative)
  trendText?: string;
  className?: string;
}

export const StatWidget: React.FC<StatWidgetProps> = ({
  title,
  value,
  icon,
  trend,
  trendText,
  className
}) => {
  const isPositive = trend !== undefined && trend > 0;
  const isNegative = trend !== undefined && trend < 0;

  return (
    <div className={cn("flex flex-col bg-surface border border-border-main p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]", className)}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-text-sec">{title}</h3>
        {icon && (
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <i className={cn(icon, "text-xl")} />
          </div>
        )}
      </div>
      
      <div className="flex items-baseline gap-3">
        <h2 className="text-3xl font-bold font-headingA text-text-main">{value}</h2>
      </div>

      {trend !== undefined && (
        <div className="mt-4 flex items-center gap-2">
          <span className={cn(
            "flex items-center text-xs font-semibold px-2 py-1 rounded-md",
            isPositive ? "text-success bg-success/10" : "",
            isNegative ? "text-error bg-error/10" : "",
            !isPositive && !isNegative ? "text-text-sec bg-black/5 dark:bg-white/5" : ""
          )}>
            {isPositive && <i className="ri-arrow-up-line mr-1" />}
            {isNegative && <i className="ri-arrow-down-line mr-1" />}
            {!isPositive && !isNegative && <i className="ri-subtract-line mr-1" />}
            {Math.abs(trend)}%
          </span>
          {trendText && <span className="text-xs text-text-sec">{trendText}</span>}
        </div>
      )}
    </div>
  );
};

export default StatWidget;
