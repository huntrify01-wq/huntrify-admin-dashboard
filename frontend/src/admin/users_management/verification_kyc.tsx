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
import AdminExportModal from '../../admin_components/AdminExportModal';
import AddTeamMemberModal from '../../admin_components/AddTeamMemberModal'; // Reusing for "Add New User"
import AdminAdvancedFiltersModal from '../../admin_components/AdminAdvancedFiltersModal'; // Reusing for Filter

const StatCard = ({ title, value, subtitle, trend, iconClass, iconBg, iconColor }) => (
  <div className="bg-surface border border-border-main rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${iconBg} ${iconColor}`}>
      <i className={iconClass} />
    </div>
    <div className="flex flex-col">
      <span className="text-sm font-semibold text-text-sec mb-1">{title}</span>
      <div className="flex items-end gap-3 mb-1">
        <span className="text-3xl font-bold font-headingA text-text-main leading-none">{value}</span>
        {trend && <span className={`text-sm font-bold ${trend.startsWith('+') ? 'text-green-500' : trend.startsWith('-') ? 'text-red-500' : 'text-primary'}`}>{trend}</span>}
      </div>
      <span className="text-xs text-text-sec">{subtitle}</span>
    </div>
  </div>
);

const VerificationKyc = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [actionMenuId, setActionMenuId] = useState(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const tableData = [
    { id: 1, initials: 'RS', name: 'Rahul Sharma', email: 'rahulsharma@gmail.com', type: 'Freelancer', typeStyle: 'bg-blue-500/10 text-blue-500', status: 'Verified', progress: 100, submitDate: 'Aug 12, 2026', submitTime: '10:24 AM', updateDate: 'Aug 12, 2026', updateTime: '10:30 AM' },
    { id: 2, initials: 'PV', name: 'Priya Verma', email: 'priya@creativehub.in', type: 'Agency', typeStyle: 'bg-purple-500/10 text-purple-500', status: 'Pending', progress: 60, submitDate: 'Aug 14, 2026', submitTime: '02:15 PM', updateDate: 'Aug 14, 2026', updateTime: '04:20 PM' },
    { id: 3, initials: 'AK', name: 'Aman Khan', email: 'aman.khan@gmail.com', type: 'Freelancer', typeStyle: 'bg-blue-500/10 text-blue-500', status: 'Verified', progress: 100, submitDate: 'Aug 10, 2026', submitTime: '11:05 AM', updateDate: 'Aug 10, 2026', updateTime: '11:10 AM' },
    { id: 4, initials: 'RS', name: 'Rohit Singh', email: 'rohit.singh@gmail.com', type: 'Business', typeStyle: 'bg-indigo-500/10 text-indigo-500', status: 'Rejected', progress: 40, submitDate: 'Aug 09, 2026', submitTime: '01:22 PM', updateDate: 'Aug 11, 2026', updateTime: '09:14 AM' },
    { id: 5, initials: 'SG', name: 'Sneha Gupta', email: 'sneha@marketers.in', type: 'Freelancer', typeStyle: 'bg-blue-500/10 text-blue-500', status: 'Pending', progress: 70, submitDate: 'Aug 13, 2026', submitTime: '03:18 PM', updateDate: 'Aug 14, 2026', updateTime: '10:11 AM' },
    { id: 6, initials: 'KM', name: 'Kavya Mehta', email: 'kavya.mehta@gmail.com', type: 'Agency', typeStyle: 'bg-purple-500/10 text-purple-500', status: 'Verified', progress: 100, submitDate: 'Aug 08, 2026', submitTime: '09:40 AM', updateDate: 'Aug 08, 2026', updateTime: '09:50 AM' },
    { id: 7, initials: 'DT', name: 'Dev Team', email: 'dev@huntrify.com', type: 'Internal', typeStyle: 'bg-gray-500/10 text-gray-500', status: 'Verified', progress: 100, submitDate: 'Aug 05, 2026', submitTime: '12:30 PM', updateDate: 'Aug 05, 2026', updateTime: '12:45 PM' },
    { id: 8, initials: 'RV', name: 'Rohan Verma', email: 'rohan@growthlab.in', type: 'Business', typeStyle: 'bg-indigo-500/10 text-indigo-500', status: 'Pending', progress: 50, submitDate: 'Aug 13, 2026', submitTime: '05:12 PM', updateDate: 'Aug 14, 2026', updateTime: '01:05 PM' },
  ];

  const actions = [
    { label: 'View User', icon: 'ri-eye-line' },
    { label: 'View Verification Status', icon: 'ri-shield-check-line' },
    { label: 'View Verification History', icon: 'ri-history-line' },
    { label: 'Open in Security & Verification', icon: 'ri-shield-keyhole-line' },
    { type: 'divider' },
    { label: 'Reject Verification', icon: 'ri-close-circle-line', isDanger: true },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Verified': return { badge: 'bg-green-500/10 text-green-500 border-green-500/20', icon: 'ri-user-follow-fill', bar: 'bg-green-500' };
      case 'Pending': return { badge: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20', icon: 'ri-time-fill', bar: 'bg-yellow-500' };
      case 'Rejected': return { badge: 'bg-red-500/10 text-red-500 border-red-500/20', icon: 'ri-user-unfollow-fill', bar: 'bg-red-500' };
      default: return { badge: 'bg-white/5 text-text-sec border-white/10', icon: 'ri-question-fill', bar: 'bg-text-sec' };
    }
  };

  return (
    <div className="p-4 pt-6 md:p-6 lg:p-8 w-full flex flex-col gap-6 min-h-screen bg-transparent">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-2 mt-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center text-2xl shadow-sm shrink-0">
            <i className="ri-id-card-line" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold font-headingA text-text-main">Verification & KYC</h1>
            <p className="text-sm text-text-sec mt-0.5">View and manage user verification status, KYC details, and document submissions.</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto mt-2 md:mt-0">
          <SecondaryButton onClick={() => setIsExportOpen(true)} className="w-full sm:w-auto">
            <i className="ri-download-2-line mr-1.5" /> Export
          </SecondaryButton>
          <PrimaryButton onClick={() => setIsAddUserOpen(true)} className="w-full sm:w-auto">
            <i className="ri-add-line mr-1.5" /> Add New User
          </PrimaryButton>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="1,284" trend="+12%" subtitle="All users on platform" iconClass="ri-user-3-fill" iconBg="bg-primary/10" iconColor="text-primary" />
        <StatCard title="Verified Users" value="892" trend="70%" subtitle="Completed verification" iconClass="ri-shield-check-fill" iconBg="bg-green-500/10" iconColor="text-green-500" />
        <StatCard title="Pending Verification" value="256" trend="20%" subtitle="Awaiting review" iconClass="ri-time-fill" iconBg="bg-yellow-500/10" iconColor="text-yellow-500" />
        <StatCard title="Rejected / Incomplete" value="136" trend="10%" subtitle="Verification failed or rejected" iconClass="ri-close-circle-fill" iconBg="bg-red-500/10" iconColor="text-red-500" />
      </div>

      {/* Main Content Area */}
      <div className="bg-surface border border-border-main rounded-2xl shadow-sm flex flex-col overflow-hidden">
        
        {/* Tabs & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-main/50 px-6 py-4">
          <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar">
             <AdminTabSelector 
               tabs={[
                 { id: 'all', label: 'All', count: 1284 },
                 { id: 'verified', label: 'Verified', count: 892 },
                 { id: 'pending', label: 'Pending', count: 256 },
                 { id: 'rejected', label: 'Rejected', count: 136 }
               ]} 
               activeTab={activeTab} 
               onTabChange={setActiveTab} 
             />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto mt-2 md:mt-0">
             <div className="w-full sm:w-[320px] md:w-[340px]">
                <SearchBar placeholder="Search by name, email, phone..." />
             </div>
             <SecondaryButton onClick={() => setIsFilterOpen(true)} className="w-full sm:w-auto">
                <i className="ri-filter-3-line mr-1.5" /> Filter
             </SecondaryButton>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap min-w-[1100px]">
            <thead>
              <tr className="border-b border-border-main/50 bg-black/5 dark:bg-white/5">

                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-text-sec">User</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-text-sec">User Type</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-text-sec">Verification Status</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-text-sec">Verification Completion</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-text-sec">Submitted On</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-text-sec">Last Updated</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-text-sec text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((user) => {
                const statusStyle = getStatusStyle(user.status);
                return (
                  <tr key={user.id} className="border-b border-border-main/30 hover:bg-white/5 transition-colors group">

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
                      <span className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg ${user.typeStyle}`}>{user.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border ${statusStyle.badge}`}>
                        <i className={statusStyle.icon} /> {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 w-48">
                      <div className="flex flex-col gap-1.5 w-full">
                        <span className="text-xs text-text-main font-medium">{user.progress}%</span>
                        <div className="w-full h-1.5 bg-border-main rounded-full overflow-hidden">
                          <div className={`h-full ${statusStyle.bar} rounded-full`} style={{ width: `${user.progress}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-text-main leading-tight">{user.submitDate}</span>
                        <span className="text-xs text-text-sec mt-0.5">{user.submitTime}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-text-main leading-tight">{user.updateDate}</span>
                        <span className="text-xs text-text-sec mt-0.5">{user.updateTime}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 relative">
                        <SecondaryButton className="!px-3 !py-1.5 !text-xs text-primary hover:text-primary border-primary/20 hover:bg-primary/5" onClick={() => {}}>
                          Review
                        </SecondaryButton>
                        <OnlyIconButton 
                          variant="outline" size="md"
                          onClick={() => setActionMenuId(actionMenuId === user.id ? null : user.id)}
                        >
                          <i className="ri-more-fill" />
                        </OnlyIconButton>
                        
                        {actionMenuId === user.id && (
                          <div className="absolute right-0 top-full mt-2 z-[60] w-56 bg-surface border border-border-main rounded-2xl shadow-xl py-2 flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
                            {actions.map((action: any, index: number) => {
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
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-border-main flex items-center justify-between bg-black/2 dark:bg-white/2">
          <span className="text-sm text-text-sec">Showing 1-8 of 1,284 users</span>
          <div className="flex items-center gap-1">
             <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border-main text-text-sec hover:text-text-main hover:bg-border-main/50 cursor-pointer active:scale-95 transition-all duration-150"><i className="ri-arrow-left-s-line" /></button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm cursor-pointer active:scale-95 transition-all duration-150">1</button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-border-main/50 text-text-main font-medium text-sm cursor-pointer active:scale-95 transition-all duration-150">2</button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-border-main/50 text-text-main font-medium text-sm cursor-pointer active:scale-95 transition-all duration-150">3</button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-border-main/50 text-text-main font-medium text-sm cursor-pointer active:scale-95 transition-all duration-150">4</button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-border-main/50 text-text-main font-medium text-sm cursor-pointer active:scale-95 transition-all duration-150">5</button>
             <span className="px-1 text-text-sec">...</span>
             <button className="w-10 h-8 flex items-center justify-center rounded-lg hover:bg-border-main/50 text-text-main font-medium text-sm cursor-pointer active:scale-95 transition-all duration-150">161</button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border-main text-text-sec hover:text-text-main hover:bg-border-main/50 cursor-pointer active:scale-95 transition-all duration-150"><i className="ri-arrow-right-s-line" /></button>
          </div>
        </div>

      </div>

      <AdminExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
      <AddTeamMemberModal isOpen={isAddUserOpen} onClose={() => setIsAddUserOpen(false)} />
      {/* Assuming we just use AdminAdvancedFiltersModal as a placeholder for the filter */}
      <AdminAdvancedFiltersModal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} filterSections={[]} />

    </div>
  );
};

export default VerificationKyc;
