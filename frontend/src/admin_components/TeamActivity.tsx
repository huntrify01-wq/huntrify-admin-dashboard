import React from 'react';

const TeamActivity = () => {
  return (
    <div className="bg-transparent border border-border-main rounded-2xl flex flex-col w-full h-[400px]">
      <div className="p-4 border-b border-border-main flex items-center justify-between">
        <h3 className="font-bold text-sm text-primary flex items-center gap-2">
          <i className="ri-team-fill" /> Team Activity
        </h3>
        <button className="text-red-500 hover:text-red-600 transition-colors text-xs font-bold flex items-center gap-1">
          <i className="ri-delete-bin-line" /> Clear Logs
        </button>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto font-mono text-[11px] leading-6 text-text-sec flex flex-col gap-3">
        <div>[17/09/2026, 04:38:54] <span className="text-primary font-bold">Punit</span> → Add User — Created user Punit (ADMIN)</div>
        <div>[15/09/2026, 14:44:28] <span className="text-primary font-bold">Shivam KansalU</span> → Edit Profile — Updated profile for user Shivam KansalU</div>
        <div>[15/09/2026, 14:44:27] <span className="text-primary font-bold">Shivam KansalU</span> → Edit Profile — Updated profile for user Shivam KansalU</div>
        <div>[15/09/2026, 14:40:50] <span className="text-primary font-bold">Shivam KansalU</span> → Change My Password — User changed their own password</div>
        <div>[15/09/2026, 14:40:24] <span className="text-primary font-bold">shivam</span> → Change Password — Updated password for user</div>
        <div>[15/09/2026, 14:39:29] <span className="text-primary font-bold">Shivam KansalU</span> → Send Email — Sent "chfchfc" to 6 recipient(s): shivam, Prince Singh, Huntrify +3 more</div>
        <div>[15/09/2026, 14:39:25] <span className="text-primary font-bold">Shivam KansalU</span> → Send Email — Sent "chfchfc" to 6 recipient(s): shivam, Prince Singh, Huntrify +3 more</div>
        <div>[15/09/2026, 14:39:22] <span className="text-primary font-bold">Shivam KansalU</span> → Send Email — Sent "chfchfc" to 6 recipient(s): shivam, Prince Singh, Huntrify +3 more</div>
      </div>
    </div>
  );
};

export default TeamActivity;
