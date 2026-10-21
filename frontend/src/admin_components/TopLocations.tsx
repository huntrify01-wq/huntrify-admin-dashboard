import React from 'react';

const TopLocations = ({ locations }: any) => {
  return (
    <div className="bg-surface border border-border-main rounded-2xl p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold font-headingA text-text-main">Top Locations</h3>
        <p className="text-[13px] text-text-sec mt-0.5">Based on user's country</p>
      </div>

      <div className="flex flex-col gap-5 mt-4">
        {locations.map((loc: any, idx: number) => {
          const displayIcon = loc.code || loc.flag;
          const isGlobe = displayIcon === '🌍';
          
          return (
            <div key={idx} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <span className={`w-6 flex items-center justify-center ${isGlobe ? 'text-[18px]' : 'text-[15px] font-bold text-text-main'}`}>
                  {displayIcon}
                </span>
                <span className="text-[14px] font-medium text-text-main">{loc.country}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-[14px] font-bold text-text-main">{loc.users.toLocaleString()}</span>
                <span className="text-[13px] text-text-sec w-10 text-right">{loc.percentage}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopLocations;
