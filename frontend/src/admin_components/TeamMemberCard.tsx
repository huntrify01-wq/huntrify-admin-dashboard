import React, { useState } from 'react';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';

const TeamMemberCard = ({ 
  name = "Prince Singh", 
  email = "prince@huntrify.com", 
  role = "Super Admin", 
  avatarUrl = "/logo/logo-icon.png",
  onChangePassword
}: any) => {
  const [isSuspended, setIsSuspended] = useState(false);

  return (
    <div className={`bg-transparent border ${isSuspended ? 'border-red-500/30 bg-red-500/5' : 'border-border-main'} rounded-2xl p-5 w-full transition-all hover:bg-surface/50 flex flex-col justify-between h-full min-h-[160px]`}>
      
      {/* Top Section */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Avatar 
            src={avatarUrl} 
            alt={name} 
            fallback={name.charAt(0)} 
            size="lg" 
            className="border border-border-main shrink-0" 
          />
          <div className="flex flex-col min-w-0">
            <h3 className="font-bold text-text-main text-[15px] truncate">{name}</h3>
            <span className="text-[10px] font-bold text-text-sec uppercase tracking-wider mt-0.5">{role}</span>
            <p className="text-xs text-text-sec mt-1.5 truncate">{email}</p>
          </div>
        </div>
        
        {/* Edit Button */}
        <button className="text-text-sec hover:text-primary transition-colors p-1">
          <i className="ri-pencil-line" />
        </button>
      </div>

      {/* Bottom Section */}
      <div className="mt-5 pt-4 border-t border-border-main/50 flex items-center justify-between">
        <div onClick={() => setIsSuspended(!isSuspended)} className="cursor-pointer">
          <Badge className={`${isSuspended ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-primary/10 text-primary hover:bg-primary/20'} border-none font-bold text-[11px] px-3 py-1 transition-colors`}>
            {isSuspended ? 'Suspended' : 'Active'}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={onChangePassword} className="text-primary hover:text-primary/80 transition-colors p-1.5 rounded-lg hover:bg-primary/5" title="Change Password">
            <i className="ri-key-2-line text-lg" />
          </button>
          
          <button className="text-primary hover:text-primary/80 transition-colors p-1.5 rounded-lg hover:bg-primary/5" title="Send Email">
            <i className="ri-mail-line text-lg" />
          </button>
          
          <button className="text-text-sec hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-500/10" title="Delete User">
            <i className="ri-delete-bin-line text-lg" />
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default TeamMemberCard;
