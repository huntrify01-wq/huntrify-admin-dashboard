import React, { useState } from 'react';
import UserGrowthChart from '../../admin_components/UserGrowthChart';
import RecentUsersTable from '../../admin_components/RecentUsersTable';
import TopLocations from '../../admin_components/TopLocations';
import DateRangeSelector from '../../components/ui/DateRangeSelector';
import DonutChart from '../../components/ui/DonutChart';
import { PrimaryButton } from '../../components/button/PrimaryButton';

const OverviewStatCard = ({ title, value, trend, trendUp, iconClass, iconBg, iconColor }) => {
  const gradId = "grad-" + title.replace(/\s+/g, '-').toLowerCase();
  
  return (
    <div className="bg-white dark:bg-surface border border-gray-100 dark:border-border-main rounded-2xl p-5 shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between min-h-[140px] gap-4">
      {/* Top Row: Title & Value on Left, Icon on Right */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <span className="text-[15px] font-medium text-gray-500 dark:text-text-sec">{title}</span>
          <span className="text-3xl font-bold font-headingA text-gray-900 dark:text-text-main tracking-tight">{value}</span>
        </div>
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-[22px] ${iconBg} ${iconColor}`}>
          <i className={iconClass} />
        </div>
      </div>
      
      {/* Bottom Row: Trend and Chart */}
      <div className="flex items-end justify-between">
        <span className={`text-[13px] font-bold flex items-center gap-1 ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
          <i className={trendUp ? "ri-arrow-up-line" : "ri-arrow-down-line"} /> 
          {trend} vs last month
        </span>
        
        {/* Decorative Sparkline SVG matching icon color */}
        <div className={`h-8 w-[72px] ${iconColor}`}>
          <svg viewBox="0 0 100 30" className="w-full h-full" preserveAspectRatio="none">
            <path d={trendUp ? "M0,25 C15,25 15,15 30,15 C45,15 45,20 60,20 C75,20 75,5 100,5 L100,30 L0,30 Z" : "M0,5 C15,5 15,15 30,15 C45,15 45,10 60,10 C75,10 75,25 100,25 L100,30 L0,30 Z"} fill={`url(#${gradId})`} />
            <path d={trendUp ? "M0,25 C15,25 15,15 30,15 C45,15 45,20 60,20 C75,20 75,5 100,5" : "M0,5 C15,5 15,15 30,15 C45,15 45,10 60,10 C75,10 75,25 100,25"} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.25"/>
                <stop offset="100%" stopColor="currentColor" stopOpacity="0"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

// A simple reusable placeholder for the donut charts in the screenshot
const DonutChartCard = ({ title, subtitle, total, labels }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  return (
    <div className="bg-surface border border-border-main rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-lg font-bold font-headingA text-text-main">{title}</h3>
        <p className="text-[13px] text-text-sec mt-0.5">{subtitle}</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-8 mt-auto mb-auto">
        {/* Animated SVG Donut Chart */}
        <DonutChart data={labels} total={total} hoveredIndex={hoveredIdx} onHoverChange={setHoveredIdx} />
        
        <div className="flex-1 flex flex-col gap-3 w-full sm:max-w-[220px]">
          {labels.map((lbl, idx) => (
            <div 
              key={idx} 
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`flex items-center justify-between text-[13px] px-2 py-1 rounded-lg transition-all cursor-pointer ${
                hoveredIdx === idx ? 'bg-border-main/50 font-semibold' : 'hover:bg-border-main/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${lbl.color}`} />
                <span className="text-text-sec font-medium">{lbl.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-text-main font-bold">{lbl.value}</span>
                <span className="text-text-sec text-right w-10">{lbl.percent}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const UsersOverview = () => {
  const [selectedRange, setSelectedRange] = useState('30d');
  const recentUsersData = [
    { initials: 'AM', name: 'Aarav Mehta', handle: '@aaravmehta', role: 'Freelancer', plan: 'Free', verification: 'Verified', status: 'Active', joinedDate: '2 minutes ago' },
    { initials: 'SK', name: 'Simran Kaur', handle: '@simrank', role: 'Job Seeker', plan: 'Free', verification: 'Pending', status: 'Active', joinedDate: '12 minutes ago' },
    { initials: 'TS', name: 'TechNova Solutions', handle: '@technova', role: 'Agency', plan: 'Pro', verification: 'Verified', status: 'Active', joinedDate: '28 minutes ago' },
    { initials: 'RV', name: 'Rohan Verma', handle: '@rohanv', role: 'Client', plan: 'Free', verification: 'In Progress', status: 'Active', joinedDate: '1 hour ago' },
    { initials: 'KS', name: 'Kavya Sharma', handle: '@kavyasharma', role: 'Hiring Partner', plan: 'Pro', verification: 'Verified', status: 'Active', joinedDate: '2 hours ago' },
  ];

  const topLocationsData = [
    { code: 'IN', country: 'India', users: 68420, percentage: 54.6 },
    { code: 'US', country: 'United States', users: 18240, percentage: 14.5 },
    { code: 'GB', country: 'United Kingdom', users: 8120, percentage: 6.5 },
    { code: 'CA', country: 'Canada', users: 5430, percentage: 4.3 },
    { code: '🌍', country: 'Others', users: 25220, percentage: 20.1 },
  ];

  return (
    <div className="p-4 pt-6 md:p-6 lg:p-8 w-full flex flex-col gap-6 min-h-screen bg-transparent">
      
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-2 mt-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center text-2xl shadow-sm shrink-0">
            <i className="ri-dashboard-2-line" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold font-headingA text-text-main leading-none">Users Overview</h1>
          </div>
        </div>
        
        {/* Desktop Export Controls (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center gap-3 shrink-0 z-50">
          <DateRangeSelector value={selectedRange} onChange={setSelectedRange} />
          <PrimaryButton className="px-5 shadow-[0_4px_12px_-2px_rgba(48,16,254,0.35)] whitespace-nowrap">
            <div className="flex items-center justify-center gap-2">
              <i className="ri-download-cloud-2-line text-lg" /> 
              <span>Export Report</span> 
            </div>
          </PrimaryButton>
        </div>
      </div>

      {/* Top Stats Grid */}
      <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pb-2 sm:pb-0">
        <div className="w-[85vw] sm:w-auto shrink-0 snap-start"><OverviewStatCard title="Total Users" value="125,430" trend="12.5%" trendUp={true} iconClass="ri-user-3-fill" iconBg="bg-blue-500/10" iconColor="text-blue-500" /></div>
        <div className="w-[85vw] sm:w-auto shrink-0 snap-start"><OverviewStatCard title="Active Users" value="89,210" trend="8.2%" trendUp={true} iconClass="ri-checkbox-circle-fill" iconBg="bg-green-500/10" iconColor="text-green-500" /></div>
        <div className="w-[85vw] sm:w-auto shrink-0 snap-start"><OverviewStatCard title="New Users" value="12,450" trend="28.4%" trendUp={true} iconClass="ri-user-add-fill" iconBg="bg-purple-500/10" iconColor="text-purple-500" /></div>
        <div className="w-[85vw] sm:w-auto shrink-0 snap-start"><OverviewStatCard title="Verified Users" value="72,340" trend="15.6%" trendUp={true} iconClass="ri-verified-badge-fill" iconBg="bg-blue-400/10" iconColor="text-blue-400" /></div>
        
        <div className="w-[85vw] sm:w-auto shrink-0 snap-start"><OverviewStatCard title="Pending Verification" value="8,120" trend="6.1%" trendUp={false} iconClass="ri-time-fill" iconBg="bg-yellow-500/10" iconColor="text-yellow-500" /></div>
        <div className="w-[85vw] sm:w-auto shrink-0 snap-start"><OverviewStatCard title="Suspended Users" value="2,450" trend="2.3%" trendUp={true} iconClass="ri-forbid-fill" iconBg="bg-red-500/10" iconColor="text-red-500" /></div>
        <div className="w-[85vw] sm:w-auto shrink-0 snap-start"><OverviewStatCard title="Paid Users" value="18,920" trend="19.8%" trendUp={true} iconClass="ri-vip-crown-fill" iconBg="bg-yellow-600/10" iconColor="text-yellow-600" /></div>
        <div className="w-[85vw] sm:w-auto shrink-0 snap-start"><OverviewStatCard title="Users Requiring Review" value="1,230" trend="8.4%" trendUp={false} iconClass="ri-error-warning-fill" iconBg="bg-orange-500/10" iconColor="text-orange-500" /></div>
      </div>

      {/* Mobile Export Controls (Hidden on Desktop) */}
      <div className="flex lg:hidden flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 shrink-0 w-full z-50">
        <div className="w-full sm:w-auto">
          <DateRangeSelector value={selectedRange} onChange={setSelectedRange} />
        </div>
        <PrimaryButton className="w-full sm:w-auto justify-center px-5 shadow-[0_4px_12px_-2px_rgba(48,16,254,0.35)] whitespace-nowrap">
          <div className="flex items-center justify-center gap-2">
            <i className="ri-download-cloud-2-line text-lg" /> 
            <span>Export Report</span> 
          </div>
        </PrimaryButton>
      </div>

      {/* Middle Grid: Growth Chart & Roles Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <UserGrowthChart />
        </div>
        <div className="lg:col-span-4">
          <DonutChartCard 
            title="Users by Role" 
            subtitle="Distribution of users across different roles" 
            total="125,430"
            labels={[
              { name: 'Freelancers', value: '52,340', percent: '41.8', color: 'bg-primary' },
              { name: 'Job Seekers', value: '28,190', percent: '22.5', color: 'bg-blue-500' },
              { name: 'Clients', value: '18,420', percent: '14.7', color: 'bg-green-500' },
              { name: 'Agencies', value: '14,210', percent: '11.3', color: 'bg-yellow-500' },
              { name: 'Hiring Partners', value: '12,280', percent: '9.8', color: 'bg-orange-500' },
            ]}
          />
        </div>
      </div>

      {/* Verification & Plans Donuts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DonutChartCard 
          title="Verification Status" 
          subtitle="Current verification status of all users" 
          total="125,430"
          labels={[
            { name: 'Verified', value: '72,340', percent: '57.7', color: 'bg-green-500' },
            { name: 'Pending', value: '8,120', percent: '6.5', color: 'bg-yellow-500' },
            { name: 'In Progress', value: '12,450', percent: '9.9', color: 'bg-blue-500' },
            { name: 'Failed', value: '4,320', percent: '3.4', color: 'bg-red-500' },
            { name: 'Not Started', value: '28,200', percent: '22.5', color: 'bg-gray-500' },
          ]}
        />
        <DonutChartCard 
          title="User Plans" 
          subtitle="Free vs paid users" 
          total="125,430"
          labels={[
            { name: 'Free Plan', value: '106,510', percent: '84.9', color: 'bg-blue-500' },
            { name: 'Paid Plan', value: '18,920', percent: '15.1', color: 'bg-primary' },
          ]}
        />
      </div>

      {/* Bottom Grid: Recent Users & Locations */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8 flex flex-col gap-6">
          <RecentUsersTable users={recentUsersData} />
          
          {/* Quick Actions (Desktop Only) */}
          <div className="hidden xl:flex bg-surface border border-border-main rounded-2xl p-6 flex-col gap-4">
            <h3 className="font-bold text-text-main text-lg">Quick Actions</h3>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
              <button className="flex items-center justify-start gap-2 bg-black/5 dark:bg-white/5 border border-border-main px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer active:scale-95 hover:shadow-sm w-full sm:w-auto">
                <i className="ri-user-add-line text-blue-500 shrink-0" /> <span className="truncate">Add New User</span>
              </button>
              <button className="flex items-center justify-start gap-2 bg-black/5 dark:bg-white/5 border border-border-main px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer active:scale-95 hover:shadow-sm w-full sm:w-auto">
                <i className="ri-verified-badge-line text-yellow-500 shrink-0" /> <span className="truncate">Review Verifications</span>
              </button>
              <button className="flex items-center justify-start gap-2 bg-black/5 dark:bg-white/5 border border-border-main px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer active:scale-95 hover:shadow-sm w-full sm:w-auto">
                <i className="ri-forbid-line text-red-500 shrink-0" /> <span className="truncate">View Suspended Users</span>
              </button>
              <button className="flex items-center justify-start gap-2 bg-black/5 dark:bg-white/5 border border-border-main px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer active:scale-95 hover:shadow-sm w-full sm:w-auto">
                <i className="ri-group-line text-primary shrink-0" /> <span className="truncate">Manage User Segments</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="xl:col-span-4 flex flex-col gap-6">
          <TopLocations locations={topLocationsData} />
          
          {/* Growth Banner */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 sm:p-6 flex items-center justify-between gap-3 group cursor-pointer hover:bg-primary/10 transition-colors">
             <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
               <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                 <i className="ri-bar-chart-grouped-line text-xl sm:text-2xl" />
               </div>
               <div className="flex flex-col flex-1 min-w-0">
                 <h4 className="font-bold text-text-main text-sm truncate">Grow a trusted community</h4>
                 <p className="text-[11px] sm:text-xs text-text-sec mt-0.5 max-w-[200px] leading-tight line-clamp-2">Verify users, remove fraud, and keep Huntrify safe for everyone.</p>
               </div>
             </div>
             <div className="w-8 h-8 shrink-0 rounded-full border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
               <i className="ri-arrow-right-line" />
             </div>
          </div>
        </div>
      </div>

      {/* Quick Actions (Mobile Only - At Bottom) */}
      <div className="xl:hidden bg-surface border border-border-main rounded-2xl p-5 flex flex-col gap-4 mt-6">
        <h3 className="font-bold text-text-main text-lg">Quick Actions</h3>
        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-start gap-3 bg-black/5 dark:bg-white/5 border border-border-main px-4 py-3 rounded-xl text-sm font-medium hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer active:scale-98 hover:shadow-sm w-full text-left">
            <i className="ri-user-add-line text-blue-500 text-lg shrink-0" /> <span className="truncate">Add New User</span>
          </button>
          <button className="flex items-center justify-start gap-3 bg-black/5 dark:bg-white/5 border border-border-main px-4 py-3 rounded-xl text-sm font-medium hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer active:scale-98 hover:shadow-sm w-full text-left">
            <i className="ri-verified-badge-line text-yellow-500 text-lg shrink-0" /> <span className="truncate">Review Verifications</span>
          </button>
          <button className="flex items-center justify-start gap-3 bg-black/5 dark:bg-white/5 border border-border-main px-4 py-3 rounded-xl text-sm font-medium hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer active:scale-98 hover:shadow-sm w-full text-left">
            <i className="ri-forbid-line text-red-500 text-lg shrink-0" /> <span className="truncate">View Suspended Users</span>
          </button>
          <button className="flex items-center justify-start gap-3 bg-black/5 dark:bg-white/5 border border-border-main px-4 py-3 rounded-xl text-sm font-medium hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer active:scale-98 hover:shadow-sm w-full text-left">
            <i className="ri-group-line text-primary text-lg shrink-0" /> <span className="truncate">Manage User Segments</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default UsersOverview;
