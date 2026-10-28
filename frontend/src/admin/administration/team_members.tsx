import React, { useState } from 'react';
import TeamMemberCard from '../../admin_components/TeamMemberCard';
import TeamActivity from '../../admin_components/TeamActivity';
import ChangeUserPassword from '../../admin_components/ChangeUserPassword';
import ChangeMyPassword from '../../admin_components/ChangeMyPassword';
import AddTeamMemberModal from '../../admin_components/AddTeamMemberModal';
import { PrimaryButton } from '../../components/button/PrimaryButton';
import SearchBar from '../../components/form_components/SearchBar';
import Selector from '../../components/form_components/Selector';

const StatCard = ({ title, value, trend = undefined, iconClass, iconBg, iconColor }: { title: string, value: string, trend?: string, iconClass: string, iconBg: string, iconColor: string }) => (
  <div className="bg-transparent border border-border-main rounded-2xl py-3 px-4 flex flex-col gap-2 hover:bg-surface/50 transition-colors">
    <span className="text-[12px] font-bold text-text-sec uppercase tracking-wider leading-tight line-clamp-2">{title}</span>
    <div className="flex items-center gap-3 mt-1">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${iconBg} ${iconColor}`}>
        <i className={iconClass} />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold font-headingA text-text-main leading-none">{value}</span>
        {trend && <span className="text-xs font-bold text-green-500"><i className="ri-arrow-up-line" /> {trend}</span>}
      </div>
    </div>
  </div>
);

const TeamOverview = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [passwordModalUser, setPasswordModalUser] = useState<string | null>(null);

  return (
    <div className="p-4 pt-6 md:p-6 lg:p-8 w-full flex flex-col gap-6 min-h-screen bg-transparent">
      
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-2 mt-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center text-2xl shadow-sm shrink-0">
            <i className="ri-user-settings-line" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold font-headingA text-text-main">Team Management</h1>
            <p className="text-sm text-text-sec mt-0.5">Manage your admin team, roles, permissions and activity.</p>
          </div>
        </div>
        <PrimaryButton 
          onClick={() => setIsAddModalOpen(true)}
          className="shrink-0 font-bold px-6 py-2.5 w-full md:w-auto mt-2 md:mt-0"
        >
          + Add New Member
        </PrimaryButton>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        <StatCard title="Total Members" value="5" trend="25%" iconClass="ri-group-fill" iconBg="bg-primary/10" iconColor="text-primary" />
        <StatCard title="Active Members" value="4" iconClass="ri-user-3-fill" iconBg="bg-green-500/10" iconColor="text-green-500" />
        <StatCard title="Pending" value="1" iconClass="ri-time-line" iconBg="bg-yellow-500/10" iconColor="text-yellow-500" />
        <StatCard title="Roles" value="4" iconClass="ri-stack-fill" iconBg="bg-purple-500/10" iconColor="text-purple-500" />
        <StatCard title="Activity" value="12" iconClass="ri-line-chart-line" iconBg="bg-blue-500/10" iconColor="text-blue-500" />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col gap-8 mt-2">
          
        {/* Team Members Section */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <h2 className="text-xl font-bold text-text-main">Team Members</h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
                <div className="w-full sm:w-[280px]">
                  <SearchBar placeholder="Search members..." />
                </div>
                <div className="w-full sm:w-[150px]">
                  <Selector 
                    options={[{ label: 'All Roles', value: 'all' }]} 
                    value="all" 
                  />
                </div>
              </div>
            </div>

            {/* Grid of Member Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TeamMemberCard name="Prince Singh" role="Super Admin" joinedDate="Jul 01, 2026" isOnline={true} onChangePassword={() => setPasswordModalUser("Prince Singh")} />
              <TeamMemberCard name="Punit Sahu" role="Admin" joinedDate="Jul 05, 2026" isOnline={true} avatarUrl="" onChangePassword={() => setPasswordModalUser("Punit Sahu")} />
              <TeamMemberCard name="Shivam K." role="Moderator" joinedDate="Jul 10, 2026" isOnline={false} status="Offline" avatarUrl="" onChangePassword={() => setPasswordModalUser("Shivam K.")} />
              <TeamMemberCard name="Akram Khan" role="Tech Admin" joinedDate="Jul 03, 2026" isOnline={true} avatarUrl="" onChangePassword={() => setPasswordModalUser("Akram Khan")} />
              <TeamMemberCard name="Sneha Sharma" role="Content" joinedDate="Jul 12, 2026" isOnline={false} status="Offline" avatarUrl="" onChangePassword={() => setPasswordModalUser("Sneha Sharma")} />
              
              {/* Add New Member Box */}
              <div 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-transparent border-2 border-dashed border-border-main rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-surface/50 hover:border-primary/50 transition-colors group min-h-[200px]"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <i className="ri-add-line text-2xl font-bold" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-text-main">Add New Member</h3>
                  <p className="text-xs text-text-sec mt-1">Invite a new team member<br/>to your admin panel.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Team Activity - Now at the very bottom */}
          <div className="mt-4">
             <TeamActivity />
          </div>

      </div>

      <AddTeamMemberModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <ChangeUserPassword userName={passwordModalUser || undefined} isOpen={!!passwordModalUser} onClose={() => setPasswordModalUser(null)} />
    </div>
  );
};

export default TeamOverview;
