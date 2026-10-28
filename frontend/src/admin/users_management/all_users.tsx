import React, { useState } from 'react';
import AdminTabSelector from '../../admin_components/AdminTabSelector';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import PrimaryButton from '../../components/button/PrimaryButton';
import SecondaryButton from '../../components/button/SecondaryButton';
import OnlyIconButton from '../../components/button/OnlyIconButton';
import ButtonWithIcon from '../../components/button/ButtonWithIcon';
import Selector from '../../components/form_components/Selector';
import SearchBar from '../../components/form_components/SearchBar';
import AdminAdvancedFiltersModal from '../../admin_components/AdminAdvancedFiltersModal';
import AdminExportModal from '../../admin_components/AdminExportModal';
import AddTeamMemberModal from '../../admin_components/AddTeamMemberModal';

const StatusBadge = ({ type, text }: any) => {
  const styles = {
    Verified: 'bg-green-500/10 text-green-500 border-green-500/20',
    Active: 'bg-green-500/10 text-green-500 border-green-500/20',
    Pro: 'bg-primary/10 text-primary border-primary/20',
    Free: 'bg-white/5 text-text-sec border-white/10',
    Pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    'In Progress': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    Failed: 'bg-red-500/10 text-red-500 border-red-500/20',
    Restricted: 'bg-red-500/10 text-red-500 border-red-500/20',
    'Not Started': 'bg-white/5 text-text-sec border-white/10',
    Inactive: 'bg-white/5 text-text-sec border-white/10',
  };
  
  // Custom Role styles based on screenshot
  const roleStyles = {
    Freelancer: 'bg-primary/20 text-primary',
    'Job Seeker': 'bg-blue-500/20 text-blue-500',
    Agency: 'bg-green-500/20 text-green-500',
    Client: 'bg-yellow-600/20 text-yellow-600',
    'Hiring Partner': 'bg-orange-500/20 text-orange-500'
  };

  const badgeStyle = roleStyles[text] || styles[type] || styles[text] || 'bg-white/5 text-text-sec border-white/10';
  
  // Determine if it needs an icon
  let icon = null;
  if (text === 'Verified' || text === 'Active') icon = 'ri-checkbox-circle-fill';
  if (text === 'Pending') icon = 'ri-time-fill';
  if (text === 'In Progress') icon = 'ri-loader-4-line';
  if (text === 'Failed' || text === 'Restricted') icon = 'ri-close-circle-fill';
  if (text === 'Not Started' || text === 'Inactive') icon = 'ri-time-line';

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border ${badgeStyle}`}>
      {icon && <i className={icon} />} {text}
    </span>
  );
};

const AllUsers = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [actionMenuId, setActionMenuId] = useState(null);

  const tabs = [
    { id: 'all', label: 'All Users', count: 125430 },
    { id: 'freelancers', label: 'Freelancers', count: 52340 },
    { id: 'job_seekers', label: 'Job Seekers', count: 28190 },
    { id: 'clients', label: 'Clients', count: 18420 },
    { id: 'agencies', label: 'Agencies', count: 14210 },
    { id: 'hiring_partners', label: 'Hiring Partners', count: 12280 },
  ];

  const tableData = [
    { id: 1, name: 'Aarav Mehta', handle: '@aaravmehta', role: 'Freelancer', plan: 'Pro', verification: 'Verified', status: 'Active', location: 'Delhi, India', locFlag: '🇮🇳', joined: 'Sep 21, 2026', joinedDays: '2 days ago', lastActive: '2 minutes ago', isOnline: true },
    { id: 2, name: 'Simran Kaur', handle: '@simrankaur', role: 'Job Seeker', plan: 'Free', verification: 'Pending', status: 'Active', location: 'Mumbai, India', locFlag: '🇮🇳', joined: 'Sep 20, 2026', joinedDays: '3 days ago', lastActive: '12 minutes ago', isOnline: true },
    { id: 3, name: 'TechNova Solutions', handle: '@technova', role: 'Agency', plan: 'Pro', verification: 'Verified', status: 'Active', location: 'Bangalore, India', locFlag: '🇮🇳', joined: 'Sep 18, 2026', joinedDays: '5 days ago', lastActive: '1 hour ago', isOnline: true },
    { id: 4, name: 'Rohan Verma', handle: '@rohanv', role: 'Client', plan: 'Free', verification: 'In Progress', status: 'Active', location: 'Pune, India', locFlag: '🇮🇳', joined: 'Sep 18, 2026', joinedDays: '5 days ago', lastActive: '2 hours ago', isOnline: true },
    { id: 5, name: 'GlobalHire Inc.', handle: '@globalhire', role: 'Hiring Partner', plan: 'Pro', verification: 'Verified', status: 'Active', location: 'New York, USA', locFlag: '🇺🇸', joined: 'Sep 15, 2026', joinedDays: '8 days ago', lastActive: '4 hours ago', isOnline: true },
    { id: 6, name: 'Kavya Sharma', handle: '@kavyasharma', role: 'Freelancer', plan: 'Free', verification: 'Failed', status: 'Restricted', location: 'Lucknow, India', locFlag: '🇮🇳', joined: 'Sep 14, 2026', joinedDays: '9 days ago', lastActive: '1 day ago', isOnline: false },
    { id: 7, name: 'Designlytics', handle: '@designlytics', role: 'Agency', plan: 'Free', verification: 'Verified', status: 'Active', location: 'London, UK', locFlag: '🇬🇧', joined: 'Sep 12, 2026', joinedDays: '11 days ago', lastActive: '1 day ago', isOnline: false },
    { id: 8, name: 'Arjun Patel', handle: '@arjunp', role: 'Job Seeker', plan: 'Free', verification: 'Not Started', status: 'Inactive', location: 'Ahmedabad, India', locFlag: '🇮🇳', joined: 'Sep 10, 2026', joinedDays: '13 days ago', lastActive: '3 days ago', isOnline: false },
    { id: 9, name: 'Sneha Reddy', handle: '@snehareddy', role: 'Client', plan: 'Pro', verification: 'Verified', status: 'Active', location: 'Hyderabad, India', locFlag: '🇮🇳', joined: 'Sep 08, 2026', joinedDays: '15 days ago', lastActive: '3 days ago', isOnline: true },
    { id: 10, name: 'PixelCraft Media', handle: '@pixelcraft', role: 'Agency', plan: 'Free', verification: 'Pending', status: 'Active', location: 'Toronto, Canada', locFlag: '🇨🇦', joined: 'Sep 05, 2026', joinedDays: '18 days ago', lastActive: '5 days ago', isOnline: true },
  ];

  // Actions for the 3-dots menu
  const userActions = [
    { label: 'View Profile', icon: 'ri-user-line' },
    { label: 'Edit Details', icon: 'ri-pencil-line' },
    { label: 'Change Password', icon: 'ri-key-2-line' },
    { label: 'Send Reset Link', icon: 'ri-mail-send-line' },
    { type: 'divider' },
    { label: 'Change Role', icon: 'ri-shield-user-line' },
    { label: 'Deactivate User', icon: 'ri-forbid-line', isDanger: true },
    { type: 'divider' },
    { label: 'View Activity Logs', icon: 'ri-file-list-3-line' },
    { label: 'Remove Member', icon: 'ri-delete-bin-line', isDanger: true },
  ];

  // Dummy filter config for the Advanced Filters Modal
  const filterSectionsConfig = [
    {
      title: "User Role", icon: "ri-user-settings-line", type: "checkbox",
      options: [
        { label: "Freelancer", value: "freelancer" },
        { label: "Job Seeker", value: "job_seeker" },
        { label: "Client", value: "client" },
        { label: "Agency", value: "agency" },
        { label: "Hiring Partner", value: "hiring_partner" }
      ]
    },
    {
      title: "Account Status", icon: "ri-checkbox-circle-line", type: "checkbox",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Suspended", value: "suspended" },
        { label: "Restricted", value: "restricted" }
      ]
    },
    {
      title: "Verification Status", icon: "ri-verified-badge-line", type: "checkbox",
      options: [
        { label: "Verified", value: "verified" },
        { label: "Pending", value: "pending" },
        { label: "Failed", value: "failed" },
        { label: "Not Started", value: "not_started" }
      ]
    },
    {
      title: "Location", icon: "ri-map-pin-line", type: "selects",
      dropdowns: [
        { label: "Country" }, { label: "State" }, { label: "City" }
      ]
    }
  ];

  return (
    <div className="p-4 pt-6 md:p-6 lg:p-8 w-full flex flex-col gap-6 min-h-screen bg-transparent">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-2 mt-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center text-2xl shadow-sm shrink-0">
            <i className="ri-group-line" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold font-headingA text-text-main">All Users</h1>
            <p className="text-sm text-text-sec mt-0.5">Manage and monitor all platform users across different roles.</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto mt-2 md:mt-0">
          <SecondaryButton onClick={() => setIsExportModalOpen(true)} className="w-full sm:w-auto">
            <i className="ri-download-2-line mr-1.5" /> Export
          </SecondaryButton>
          <PrimaryButton onClick={() => setIsAddUserOpen(true)} className="w-full sm:w-auto">
            <i className="ri-add-line mr-1.5" /> Add New User
          </PrimaryButton>
        </div>
      </div>

      {/* Tabs and Filters Bar inline */}
      <div className="bg-surface border border-border-main rounded-xl shadow-sm flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4 w-full p-4 xl:px-4 xl:py-1.5">
        
        {/* Underlined Tabs */}
        <div className="flex items-center gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-[44px]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            // Format count nicely (e.g. 125.4k instead of 125430)
            const formattedCount = tab.count > 999 ? (tab.count/1000).toFixed(1) + 'k' : tab.count;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative h-full flex items-center text-[13px] font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  isActive ? 'text-primary' : 'text-text-sec hover:text-text-main'
                }`}
              >
                {tab.id === 'all' ? 'All' : tab.label} {tab.count && `(${formattedCount})`}
                {isActive && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right side Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full xl:w-auto mt-2 xl:mt-0">
          <div className="w-full sm:w-[280px] md:w-[300px]">
            <SearchBar placeholder="Search members..." className="!py-2 !h-10 !rounded-lg !text-[13px]" />
          </div>
          
          <div className="w-full sm:w-[140px]">
            <Selector 
              options={[
                { label: 'All Roles', value: 'all' },
                { label: 'Freelancer', value: 'freelancer' },
                { label: 'Job Seeker', value: 'job_seeker' },
              ]}
              value="all"
              className="!h-10 !rounded-lg"
            />
          </div>
          
          <SecondaryButton onClick={() => setIsFilterModalOpen(true)} className="!h-10 w-full sm:w-auto">
            <i className="ri-filter-3-line mr-1.5" /> Filter
          </SecondaryButton>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      <div className="flex items-center mt-2 px-2 w-full">
         <span className="text-[14px] font-semibold text-text-main whitespace-nowrap shrink-0">0 selected</span>
         <div className="h-4 w-px bg-border-main shrink-0 mx-3 sm:mx-4"></div>
         
         {/* Scrollable Actions Area */}
         <div className="flex-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex items-center gap-2 sm:gap-3 min-w-0 opacity-60">
           <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-main bg-surface hover:bg-border-main/50 text-[12px] sm:text-[13px] font-medium text-text-main transition-colors whitespace-nowrap shrink-0 pointer-events-none">
             <i className="ri-mail-line text-sm sm:text-[15px]" /> Send Email
           </button>
           <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-main bg-surface hover:bg-border-main/50 text-[12px] sm:text-[13px] font-medium text-text-main transition-colors whitespace-nowrap shrink-0 pointer-events-none">
             <i className="ri-notification-3-line text-sm sm:text-[15px]" /> Send Notification
           </button>
           <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-[12px] sm:text-[13px] font-medium transition-colors whitespace-nowrap shrink-0 pointer-events-none">
             <i className="ri-forbid-line text-sm sm:text-[15px]" /> Suspend
           </button>
         </div>
      </div>

      {/* Massive Table */}
      <div className="bg-surface border border-border-main rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse whitespace-nowrap min-w-[1200px]">
            <thead>
              <tr className="border-b border-border-main/50 bg-black/5 dark:bg-white/5">
                <th className="px-4 py-3 w-10"><input type="checkbox" className="accent-primary w-4 h-4 rounded" /></th>
                <th className="px-4 py-3 text-xs font-semibold tracking-wider text-text-sec flex items-center gap-1 cursor-pointer hover:text-text-main">User <i className="ri-expand-up-down-line" /></th>
                <th className="px-4 py-3 text-xs font-semibold tracking-wider text-text-sec cursor-pointer hover:text-text-main">Role <i className="ri-expand-up-down-line text-[10px]" /></th>
                <th className="px-4 py-3 text-xs font-semibold tracking-wider text-text-sec cursor-pointer hover:text-text-main">Plan <i className="ri-expand-up-down-line text-[10px]" /></th>
                <th className="px-4 py-3 text-xs font-semibold tracking-wider text-text-sec cursor-pointer hover:text-text-main">Verification <i className="ri-expand-up-down-line text-[10px]" /></th>
                <th className="px-4 py-3 text-xs font-semibold tracking-wider text-text-sec cursor-pointer hover:text-text-main">Status <i className="ri-expand-up-down-line text-[10px]" /></th>
                <th className="px-4 py-3 text-xs font-semibold tracking-wider text-text-sec cursor-pointer hover:text-text-main">Location</th>
                <th className="px-4 py-3 text-xs font-semibold tracking-wider text-text-sec cursor-pointer hover:text-text-main">Joined <i className="ri-expand-up-down-line text-[10px]" /></th>
                <th className="px-4 py-3 text-xs font-semibold tracking-wider text-text-sec cursor-pointer hover:text-text-main">Last Active <i className="ri-expand-up-down-line text-[10px]" /></th>
                <th className="px-4 py-3 text-xs font-semibold tracking-wider text-text-sec text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((user) => (
                <tr key={user.id} className="border-b border-border-main/30 hover:bg-white/5 transition-colors group">
                  <td className="px-4 py-4"><input type="checkbox" className="accent-primary w-4 h-4 rounded" /></td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                          {user.name.charAt(0)}
                        </div>
                        {user.name.includes('TechNova') && <i className="ri-verified-badge-fill text-blue-500 absolute -bottom-1 -right-1 bg-surface rounded-full border border-surface text-sm" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-text-main leading-tight hover:underline cursor-pointer">{user.name}</span>
                        <span className="text-xs text-text-sec mt-0.5">{user.handle}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4"><StatusBadge type="Role" text={user.role} /></td>
                  <td className="px-4 py-4"><StatusBadge type="Plan" text={user.plan} /></td>
                  <td className="px-4 py-4"><StatusBadge type="Verification" text={user.verification} /></td>
                  <td className="px-4 py-4"><StatusBadge type="Status" text={user.status} /></td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg leading-none">{user.locFlag}</span>
                      <span className="text-sm text-text-main">{user.location}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-text-main leading-tight">{user.joined}</span>
                      <span className="text-[10px] text-text-sec mt-0.5">{user.joinedDays}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                       {user.isOnline && <div className="w-2 h-2 rounded-full bg-green-500 shrink-0"></div>}
                       <div className="flex flex-col">
                         <span className="text-sm text-text-main leading-tight">{user.lastActive}</span>
                         {user.isOnline && <span className="text-[10px] text-green-500 mt-0.5">Online</span>}
                       </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 relative">
                      <SecondaryButton className="!px-3 !py-1.5 !text-xs">
                        <i className="ri-eye-line mr-1.5" /> View
                      </SecondaryButton>
                      <OnlyIconButton 
                        variant="outline" size="md"
                        onClick={() => setActionMenuId(actionMenuId === user.id ? null : user.id)}
                      >
                        <i className="ri-more-fill" />
                      </OnlyIconButton>
                      
                      {/* Dropdown inline */}
                      {actionMenuId === user.id && (
                        <div className="absolute right-0 top-full mt-2 z-[60] w-56 bg-surface border border-border-main rounded-2xl shadow-xl py-2 flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
                          {userActions.map((action: any, index: number) => {
                            if (action.type === 'divider') return <div key={index} className="w-full h-[1px] bg-border-main my-1.5"></div>;
                            return (
                              <button
                                key={index}
                                onClick={() => setActionMenuId(null)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer hover:bg-border-main/50 ${
                                  action.isDanger ? 'text-red-500 hover:text-red-600' : 'text-text-sec hover:text-text-main'
                                }`}
                              >
                                <i className={`${action.icon} text-lg`} />
                                {action.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-border-main flex flex-col md:flex-row items-center justify-between gap-4 bg-black/2 dark:bg-white/2">
          <span className="text-xs md:text-sm text-text-sec text-center md:text-left w-full md:w-auto">Showing 1-10 of 125,430 users</span>
          <div className="flex items-center justify-center gap-1 w-full md:w-auto">
             <button className="w-7 h-7 md:w-8 md:h-8 flex shrink-0 items-center justify-center rounded-lg border border-border-main text-text-sec hover:text-text-main hover:bg-border-main/50 cursor-pointer active:scale-95 transition-all duration-150"><i className="ri-arrow-left-s-line" /></button>
             <button className="w-7 h-7 md:w-8 md:h-8 flex shrink-0 items-center justify-center rounded-lg bg-primary text-white font-bold text-xs md:text-sm cursor-pointer active:scale-95 transition-all duration-150">1</button>
             <button className="w-7 h-7 md:w-8 md:h-8 flex shrink-0 items-center justify-center rounded-lg hover:bg-border-main/50 text-text-main font-medium text-xs md:text-sm cursor-pointer active:scale-95 transition-all duration-150">2</button>
             <button className="w-7 h-7 md:w-8 md:h-8 flex shrink-0 items-center justify-center rounded-lg hover:bg-border-main/50 text-text-main font-medium text-xs md:text-sm cursor-pointer active:scale-95 transition-all duration-150">3</button>
             <button className="hidden sm:flex w-7 h-7 md:w-8 md:h-8 shrink-0 items-center justify-center rounded-lg hover:bg-border-main/50 text-text-main font-medium text-xs md:text-sm cursor-pointer active:scale-95 transition-all duration-150">4</button>
             <button className="hidden sm:flex w-7 h-7 md:w-8 md:h-8 shrink-0 items-center justify-center rounded-lg hover:bg-border-main/50 text-text-main font-medium text-xs md:text-sm cursor-pointer active:scale-95 transition-all duration-150">5</button>
             <span className="px-1 text-text-sec text-xs md:text-sm shrink-0">...</span>
             <button className="w-auto px-1.5 md:px-2 h-7 md:h-8 flex shrink-0 items-center justify-center rounded-lg hover:bg-border-main/50 text-text-main font-medium text-xs md:text-sm cursor-pointer active:scale-95 transition-all duration-150">12,543</button>
             <button className="w-7 h-7 md:w-8 md:h-8 flex shrink-0 items-center justify-center rounded-lg border border-border-main text-text-sec hover:text-text-main hover:bg-border-main/50 cursor-pointer active:scale-95 transition-all duration-150"><i className="ri-arrow-right-s-line" /></button>
          </div>
          <div className="flex items-center justify-center gap-2 w-full md:w-auto">
            <span className="text-xs md:text-sm text-text-sec shrink-0">Rows per page</span>
            <div className="w-[72px] md:w-[80px]">
              <Selector 
                options={[
                  { label: '10', value: '10' },
                  { label: '25', value: '25' },
                  { label: '50', value: '50' }
                ]}
                value="10"
                direction="up"
                className="!h-8 md:!h-9 !min-h-0 !rounded-lg !px-2.5"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modals triggered from this page */}
      <AdminAdvancedFiltersModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} filterSections={filterSectionsConfig} />
      <AdminExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
      <AddTeamMemberModal isOpen={isAddUserOpen} onClose={() => setIsAddUserOpen(false)} />

    </div>
  );
};

export default AllUsers;
