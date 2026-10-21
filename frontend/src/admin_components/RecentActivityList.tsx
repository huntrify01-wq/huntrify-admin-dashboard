import React from 'react';

const RecentActivityList = ({ activities }) => {
  return (
    <div className="bg-surface border border-border-main rounded-2xl p-6 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-text-main font-bold font-headingA text-lg">
          <i className="ri-pulse-line text-primary" />
          <h3>Recent Activity</h3>
        </div>
        <button className="text-sm font-medium text-primary hover:underline">View All</button>
      </div>

      <div className="flex flex-col gap-6">
        {activities.map((act, idx) => (
          <div key={idx} className="flex gap-4">
            <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${act.bgClass}`}>
              <i className={`${act.iconClass} text-lg`} />
            </div>
            <div className="flex flex-col pt-0.5">
              <span className="text-sm font-semibold text-text-main leading-tight">{act.title}</span>
              <span className="text-sm text-text-sec mt-0.5 leading-tight">{act.subtitle}</span>
              <span className="text-xs text-text-sec/70 mt-1">{act.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityList;
