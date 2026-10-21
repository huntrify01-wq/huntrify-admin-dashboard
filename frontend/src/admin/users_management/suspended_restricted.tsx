import React, { useState } from 'react';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import PrimaryButton from '../../components/button/PrimaryButton';
import SecondaryButton from '../../components/button/SecondaryButton';
import OnlyIconButton from '../../components/button/OnlyIconButton';
import ButtonWithIcon from '../../components/button/ButtonWithIcon';
import Selector from '../../components/form_components/Selector';
import SearchBar from '../../components/form_components/SearchBar';
import AdminTabSelector from '../../admin_components/AdminTabSelector';
import AdminAdvancedFiltersModal from '../../admin_components/AdminAdvancedFiltersModal';

const StatCard = ({ title, value, subtitle, iconClass, iconBg, iconColor }) => (
  <div className="bg-surface border border-border-main rounded-2xl p-5 flex items-start gap-4 shadow-sm">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${iconBg} ${iconColor}`}>
      <i className={iconClass} />
    </div>
    <div className="flex flex-col">
      <span className="text-sm font-semibold text-text-main mb-1">{title}</span>
      <span className="text-3xl font-bold font-headingA text-text-main leading-none mb-1">{value}</span>
      <span className="text-xs text-text-sec">{subtitle}</span>
    </div>
  </div>
);

const SuspendedRestricted = () => {
  const [activeTab, setActiveTab] = useState('suspended');
  const [actionMenuId, setActionMenuId] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const suspendedData = [
    { id: 1, initials: 'AK', name: 'Akram Khan', email: 'akram@huntrify.com', role: 'Tech Admin', roleStyle: 'bg-orange-500/10 text-orange-500', status: 'Suspended', reason: 'Policy violation', dateOn: 'Jul 03, 2026', by: 'Prince Singh', until: 'Jul 17, 2026', untilSub: '(14 days)' },
    { id: 2, initials: 'RV', name: 'Rohan Verma', email: 'rohan@huntrify.com', role: 'Finance', roleStyle: 'bg-green-500/10 text-green-500', status: 'Suspended', reason: 'Inappropriate behavior', dateOn: 'Jul 08, 2026', by: 'Prince Singh', until: 'Jul 22, 2026', untilSub: '(14 days)' },
  ];

  const restrictedData = [
    { id: 3, initials: 'SS', name: 'Sneha Sharma', email: 'sneha@huntrify.com', role: 'Content', roleStyle: 'bg-purple-500/10 text-purple-500', status: 'Restricted', reason: 'Limited access\n(Content only)', dateOn: 'Jul 12, 2026', by: 'Prince Singh', until: 'Indefinite', untilSub: '' },
    { id: 4, initials: 'DT', name: 'Dev Team', email: 'dev@huntrify.com', role: 'Developer', roleStyle: 'bg-blue-500/10 text-blue-500', status: 'Restricted', reason: 'Under review', dateOn: 'Jul 04, 2026', by: 'Prince Singh', until: 'Indefinite', untilSub: '' },
  ];

  const actions = [
    { label: 'View Profile', icon: 'ri-user-line' },
    { label: 'Edit Access', icon: 'ri-shield-keyhole-line' },
    { type: 'divider' },
    { label: 'Restore Access', icon: 'ri-check-line' },
    { label: 'Remove Member', icon: 'ri-delete-bin-line', isDanger: true },
  ];

  return (
    <div className="p-4 pt-6 md:p-6 lg:p-8 w-full flex flex-col gap-6 min-h-screen bg-transparent">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-2 mt-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center text-2xl shadow-sm shrink-0">
            <i className="ri-user-unfollow-line" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold font-headingA text-text-main">Suspended & Restricted Members</h1>
            <p className="text-sm text-text-sec mt-0.5">View and manage team members who are suspended or have restricted access.</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto mt-2 md:mt-0">
          <SecondaryButton>
            <i className="ri-download-2-line mr-1.5" /> Export Log
          </SecondaryButton>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Suspended Members" value="2" subtitle="Temporarily suspended" iconClass="ri-pause-circle-fill" iconBg="bg-yellow-500/10" iconColor="text-yellow-500" />
        <StatCard title="Restricted Members" value="2" subtitle="Access restricted" iconClass="ri-forbid-fill" iconBg="bg-red-500/10" iconColor="text-red-500" />
        <StatCard title="Total" value="4" subtitle="Out of 12 members" iconClass="ri-team-fill" iconBg="bg-gray-500/10" iconColor="text-gray-500" />
      </div>

      <div className="bg-surface border border-border-main rounded-2xl shadow-sm flex flex-col overflow-hidden mt-2">
        
        {/* Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-main/50 px-6 py-4">
            <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar">
             <AdminTabSelector 
               tabs={[
                 { id: 'all', label: 'All', count: 4 },
                 { id: 'suspended', label: 'Suspended', count: 2 },
                 { id: 'restricted', label: 'Restricted', count: 2 }
               ]} 
               activeTab={activeTab} 
               onTabChange={setActiveTab} 
             />
            </div>

          <div className="flex items-center gap-3">
               <SearchBar placeholder="Search members..." />
               <Selector options={[{label: 'All Roles', value: 'all'}]} value="all" />
               <SecondaryButton onClick={() => setIsFilterOpen(true)} className="w-full sm:w-auto">
                  <i className="ri-filter-3-line mr-1.5" /> Filter
               </SecondaryButton>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap min-w-[1000px]">
            <thead>
              <tr className="border-b border-border-main/50 bg-black/5 dark:bg-white/5">
                <th className="px-6 py-4 w-10"><input type="checkbox" className="accent-primary w-4 h-4 rounded" /></th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-text-sec">Name</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-text-sec">Role</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-text-sec">Status</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-text-sec">Reason</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-text-sec">Suspended / Restricted On</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-text-sec">Restricted Until</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-text-sec text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              
              {/* Suspended Group Header */}
              {(activeTab === 'all' || activeTab === 'suspended') && (
                <>
                  <tr className="bg-black/2 dark:bg-white/2 border-b border-border-main/30">
                    <td className="px-6 py-4"></td>
                    <td colSpan={7} className="py-4">
                      <div className="flex items-center gap-3">
                        <i className="ri-pause-circle-fill text-yellow-500 text-xl" />
                        <div className="flex flex-col">
                          <span className="font-bold text-text-main text-sm">Suspended Members</span>
                          <span className="text-xs text-text-sec">These members are temporarily suspended.</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Suspended Rows */}
                  {suspendedData.map((user) => (
                    <tr key={user.id} className="border-b border-border-main/30 hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4"><input type="checkbox" className="accent-primary w-4 h-4 rounded" /></td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center font-bold text-sm shrink-0">
                            {user.name.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-text-main">{user.name}</span>
                            <span className="text-xs text-text-sec mt-0.5">{user.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${user.roleStyle}`}>{user.role}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div> {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-sec">{user.reason}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-text-main leading-tight">{user.dateOn}</span>
                          <span className="text-xs text-text-sec mt-0.5">by {user.by}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-text-main leading-tight">{user.until}</span>
                          <span className="text-xs text-text-sec mt-0.5">{user.untilSub}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="relative inline-block text-left">
                          <button 
                            onClick={() => setActionMenuId(actionMenuId === user.id ? null : user.id)}
                            className="w-8 h-8 flex items-center justify-center border border-border-main rounded-lg text-text-sec hover:text-text-main hover:bg-surface-hover transition-colors"
                          >
                            <i className="ri-more-fill text-lg" />
                          </button>
                          {actionMenuId === user.id && (
                            <div className="absolute right-0 top-full mt-2 z-[60]">
                               <AdminActionMenu isOpen={true} onClose={() => setActionMenuId(null)} actions={actions} />
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              )}

              {/* Restricted Group Header */}
              {(activeTab === 'all' || activeTab === 'restricted') && (
                <>
                  <tr className="bg-black/2 dark:bg-white/2 border-b border-border-main/30">
                    <td className="px-6 py-4"></td>
                    <td colSpan={7} className="py-4">
                      <div className="flex items-center gap-3">
                        <i className="ri-forbid-line text-red-500 text-xl font-bold" />
                        <div className="flex flex-col">
                          <span className="font-bold text-text-main text-sm">Restricted Members</span>
                          <span className="text-xs text-text-sec">These members have limited access to the admin panel.</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Restricted Rows */}
                  {restrictedData.map((user) => (
                    <tr key={user.id} className="border-b border-border-main/30 hover:bg-white/5 transition-colors group last:border-0">
                      <td className="px-6 py-4"><input type="checkbox" className="accent-primary w-4 h-4 rounded" /></td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center font-bold text-sm shrink-0">
                            {user.initials}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-text-main">{user.name}</span>
                            <span className="text-xs text-text-sec mt-0.5">{user.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${user.roleStyle}`}>{user.role}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border bg-red-500/10 text-red-500 border-red-500/20">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div> {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                         <span className="text-sm text-text-sec whitespace-pre-line leading-tight block">{user.reason}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-text-main leading-tight">{user.dateOn}</span>
                          <span className="text-xs text-text-sec mt-0.5">by {user.by}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-text-main leading-tight">{user.until}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="relative inline-block text-left">
                          <button 
                            onClick={() => setActionMenuId(actionMenuId === user.id ? null : user.id)}
                            className="w-8 h-8 flex items-center justify-center border border-border-main rounded-lg text-text-sec hover:text-text-main hover:bg-surface-hover transition-colors"
                          >
                            <i className="ri-more-fill text-lg" />
                          </button>
                          {actionMenuId === user.id && (
                            <div className="absolute right-0 top-full mt-2 z-[60]">
                               <AdminActionMenu isOpen={true} onClose={() => setActionMenuId(null)} actions={actions} />
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              )}

            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-border-main flex items-center justify-between bg-black/2 dark:bg-white/2">
          <span className="text-sm text-text-sec">Showing 1-4 of 4 members</span>
          <div className="flex items-center gap-2">
             <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border-main text-text-sec hover:text-text-main hover:bg-surface-hover"><i className="ri-arrow-left-s-line" /></button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">1</button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border-main text-text-sec hover:text-text-main hover:bg-surface-hover"><i className="ri-arrow-right-s-line" /></button>
          </div>
        </div>

      </div>

      <AdminAdvancedFiltersModal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} filterSections={[]} />
    </div>
  );
};

export default SuspendedRestricted;
