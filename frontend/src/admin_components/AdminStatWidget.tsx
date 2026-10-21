import React from 'react';

const AdminStatWidget = ({ title, value, trendValue, trendText, iconClass, sparklineColor = '#22c55e' }) => {
  const isPositive = trendValue && trendValue > 0;
  
  return (
    <div className="bg-surface border border-border-main rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[140px]">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(48,16,254,0.2)]">
          <i className={`${iconClass} text-xl`} />
        </div>
        <span className="text-text-sec font-medium">{title}</span>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <div className="text-3xl font-bold font-headingA text-text-main mb-1">{value}</div>
          <div className="text-xs text-text-sec">{trendText}</div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          {trendValue && (
            <div className={`text-sm font-semibold ${isPositive ? 'text-success' : 'text-danger'}`}>
              {isPositive ? '+' : ''}{trendValue}%
            </div>
          )}
          {/* Simple Sparkline SVG for visual match */}
          <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 15C5 15 8 5 15 5C22 5 25 18 30 18C35 18 38 10 45 10C52 10 55 15 60 15" stroke={sparklineColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AdminStatWidget;
