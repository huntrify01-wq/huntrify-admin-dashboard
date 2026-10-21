import React from 'react';

const TeamActivityRow = ({ 
  initials = "PS", 
  name = "Punit Sahu", 
  actionText = "Updated user permissions for Shivam", 
  timeAgo = "2 minutes ago" 
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border-main/50 hover:bg-surface-hover transition-colors group">
      <div className="flex items-center gap-4">
        {/* Soft rounded icon box with initials */}
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
          {initials}
        </div>
        
        <div className="flex flex-col">
          <span className="font-bold text-text-main text-sm">{name}</span>
          <span className="text-xs text-text-sec mt-0.5">{actionText}</span>
        </div>
      </div>
      
      <div className="text-xs font-medium text-text-sec whitespace-nowrap">
        {timeAgo}
      </div>
    </div>
  );
};

export default TeamActivityRow;
