import React, { useState } from 'react';
import Selector from '../../components/form_components/Selector';
import { Checkbox } from '../../components/form_components/Checkbox';
import { PrimaryButton } from '../../components/button/PrimaryButton';

const DataExport = () => {
  const [activeTab, setActiveTab] = useState('new');
  const [exportType, setExportType] = useState('filtered');

  return (
    <div className="p-4 pt-6 md:p-6 lg:p-8 w-full flex flex-col gap-6 min-h-screen bg-transparent">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-2 mt-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center text-2xl shadow-sm shrink-0">
            <i className="ri-download-cloud-line" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold font-headingA text-text-main">Data Export</h1>
            <p className="text-sm text-text-sec mt-0.5">Create custom data exports and view your export history.</p>
          </div>
        </div>
        
        <div className="flex bg-surface border border-border-main rounded-xl p-1 shadow-sm shrink-0">
          <button 
            onClick={() => setActiveTab('new')}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'new' ? 'bg-primary/10 text-primary' : 'text-text-sec hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5'}`}
          >
            New Export
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'history' ? 'bg-primary/10 text-primary' : 'text-text-sec hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5'}`}
          >
            Export History
          </button>
        </div>
      </div>

      {activeTab === 'new' ? (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          
          {/* Top Export Type Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className={`relative flex flex-col p-4 cursor-pointer rounded-2xl border-2 transition-all ${exportType === 'filtered' ? 'border-primary bg-primary/5 shadow-sm' : 'border-border-main bg-surface hover:border-text-sec'}`} onClick={() => setExportType('filtered')}>
              <div className="flex items-center gap-3 mb-1.5">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${exportType === 'filtered' ? 'border-primary' : 'border-text-sec/50'}`}>
                  {exportType === 'filtered' && <div className="w-2 h-2 rounded-full bg-primary" />}
                </div>
                <span className={`font-bold text-[14px] ${exportType === 'filtered' ? 'text-primary' : 'text-text-main'}`}>Export Filtered Data</span>
              </div>
              <p className="text-[13px] text-text-sec pl-7">Download only the data that matches your selected filters. Best for targeted reports.</p>
            </label>
            <label className={`relative flex flex-col p-4 cursor-pointer rounded-2xl border-2 transition-all ${exportType === 'all' ? 'border-primary bg-primary/5 shadow-sm' : 'border-border-main bg-surface hover:border-text-sec'}`} onClick={() => setExportType('all')}>
              <div className="flex items-center gap-3 mb-1.5">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${exportType === 'all' ? 'border-primary' : 'border-text-sec/50'}`}>
                  {exportType === 'all' && <div className="w-2 h-2 rounded-full bg-primary" />}
                </div>
                <span className={`font-bold text-[14px] ${exportType === 'all' ? 'text-primary' : 'text-text-main'}`}>Export All Users</span>
              </div>
              <p className="text-[13px] text-text-sec pl-7">Download all users from the platform including inactive and suspended accounts.</p>
            </label>
            <label className={`relative flex flex-col p-4 cursor-pointer rounded-2xl border-2 transition-all ${exportType === 'segments' ? 'border-primary bg-primary/5 shadow-sm' : 'border-border-main bg-surface hover:border-text-sec'}`} onClick={() => setExportType('segments')}>
              <div className="flex items-center gap-3 mb-1.5">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${exportType === 'segments' ? 'border-primary' : 'border-text-sec/50'}`}>
                  {exportType === 'segments' && <div className="w-2 h-2 rounded-full bg-primary" />}
                </div>
                <span className={`font-bold text-[14px] ${exportType === 'segments' ? 'text-primary' : 'text-text-main'}`}>Export by Segments</span>
              </div>
              <p className="text-[13px] text-text-sec pl-7">Download users belonging to specific pre-defined cohorts or behavioral segments.</p>
            </label>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Apply Filters */}
            <div className="xl:col-span-5 bg-surface border border-border-main rounded-2xl p-6 shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-border-main/50 pb-4">
                <div>
                  <h3 className="font-bold text-text-main text-lg">1. Apply Filters</h3>
                  <p className="text-sm text-text-sec mt-1">Include only relevant users in your export.</p>
                </div>
                <button className="text-xs font-bold text-primary hover:underline bg-primary/10 px-3 py-1.5 rounded-lg">Clear All</button>
              </div>
              
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="font-bold text-text-main mb-3 text-[12px] uppercase tracking-wider">User Role</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-2">
                    <Checkbox label="Job Seeker" defaultChecked />
                    <Checkbox label="Client" defaultChecked />
                    <Checkbox label="Freelancer" />
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-text-main mb-3 text-[12px] uppercase tracking-wider">Account Status</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-2">
                    <Checkbox label="Active" defaultChecked />
                    <Checkbox label="Inactive" />
                    <Checkbox label="Pending" defaultChecked />
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-text-main mb-3 text-[12px] uppercase tracking-wider">Date Joined</h4>
                  <Selector 
                    options={[{ label: 'Last 30 Days', value: '30' }, { label: 'Last 90 Days', value: '90' }, { label: 'This Year', value: 'year' }, { label: 'All Time', value: 'all' }]} 
                    value="all" 
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Select Fields */}
            <div className="xl:col-span-7 bg-surface border border-border-main rounded-2xl p-6 shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-border-main/50 pb-4">
                <div>
                  <h3 className="font-bold text-text-main text-lg">2. Select Fields to Export</h3>
                  <p className="text-sm text-text-sec mt-1">Choose the user data columns you want to include in the exported file.</p>
                </div>
                <div className="flex gap-2">
                   <button className="text-xs font-bold text-primary hover:underline px-2 py-1">Select All</button>
                   <span className="text-border-main">|</span>
                   <button className="text-xs font-bold text-text-sec hover:text-text-main px-2 py-1">Deselect All</button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3 mt-2">
                 {[
                   'User ID', 'Full Name', 'Username', 'Email Address', 'Phone Number', 'User Role', 
                   'Account Status', 'Verification Status', 'Subscription Plan', 'Date Joined', 'Last Active',
                   'Total Earnings', 'Total Spent', 'Wallet Balance', 'Payment Method', 'KYC Status', 
                   'Government ID', 'Location (City/Country)', 'Profile Tags', 'Internal Notes', 'Referral Code'
                 ].map((field, i) => (
                    <Checkbox 
                      key={i} 
                      label={field} 
                      defaultChecked={i < 8 || i === 9 || i === 10} 
                    />
                 ))}
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="bg-surface border border-border-main p-5 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
            
            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-1 min-w-[220px]">
                <label className="text-[11px] font-bold text-text-main uppercase tracking-wider ml-1">Export Format</label>
                <Selector 
                  options={[{ label: 'CSV Format (.csv)', value: 'csv' }, { label: 'Excel Format (.xlsx)', value: 'xlsx' }, { label: 'JSON Format (.json)', value: 'json' }]} 
                  value="csv" 
                />
              </div>
              
              <div className="hidden md:flex items-center gap-3 bg-primary/5 border border-primary/20 px-4 py-2 rounded-xl ml-2">
                 <div className="w-8 h-8 bg-surface rounded-md shadow-sm flex items-center justify-center text-primary text-lg">
                    <i className="ri-database-2-fill" />
                 </div>
                 <div className="flex flex-col justify-center">
                   <span className="text-[10px] text-primary font-bold uppercase tracking-wider mb-0.5">Estimated Records</span>
                   <span className="font-bold text-text-main text-base leading-none">12,430</span>
                 </div>
              </div>
            </div>

            <PrimaryButton className="px-6 py-2.5 flex items-center gap-2 text-sm">
              <i className="ri-download-cloud-2-line text-lg" /> Generate Export
            </PrimaryButton>

          </div>
        </div>
      ) : (
        /* Export History Tab */
        <div className="bg-surface border border-border-main rounded-2xl shadow-sm overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300">
           <div className="overflow-x-auto w-full">
             <table className="w-full text-left border-collapse whitespace-nowrap min-w-[800px]">
               <thead>
                 <tr className="border-b border-border-main/50 bg-black/5 dark:bg-white/5">
                   <th className="px-6 py-4 text-xs font-bold tracking-wider text-text-sec uppercase">Export Name</th>
                   <th className="px-6 py-4 text-xs font-bold tracking-wider text-text-sec uppercase">Date Created</th>
                   <th className="px-6 py-4 text-xs font-bold tracking-wider text-text-sec uppercase">Format</th>
                   <th className="px-6 py-4 text-xs font-bold tracking-wider text-text-sec uppercase">Records</th>
                   <th className="px-6 py-4 text-xs font-bold tracking-wider text-text-sec uppercase">Generated By</th>
                   <th className="px-6 py-4 text-right"></th>
                 </tr>
               </thead>
               <tbody>
                 {[
                   { name: 'Filtered_Users_Sep2026', date: 'Sep 21, 2026 - 10:45 AM', format: 'CSV', records: '1,240', user: 'Digital Prince' },
                   { name: 'All_JobSeekers_Q3', date: 'Sep 18, 2026 - 02:15 PM', format: 'Excel', records: '8,450', user: 'System Auto' },
                   { name: 'Suspended_Accounts_Report', date: 'Sep 15, 2026 - 09:30 AM', format: 'CSV', records: '112', user: 'Akram Khan' },
                   { name: 'Full_Database_Backup', date: 'Sep 01, 2026 - 12:00 AM', format: 'JSON', records: '125,430', user: 'System Auto' }
                 ].map((row, i) => (
                   <tr key={i} className="border-b border-border-main/30 hover:bg-black/2 dark:hover:bg-white/2 transition-colors">
                     <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                         <i className={`text-xl ${row.format === 'CSV' ? 'ri-file-text-line text-blue-500' : row.format === 'Excel' ? 'ri-file-excel-line text-green-500' : 'ri-file-code-line text-purple-500'}`} />
                         <span className="font-bold text-sm text-text-main">{row.name}</span>
                       </div>
                     </td>
                     <td className="px-6 py-4 text-sm text-text-sec">{row.date}</td>
                     <td className="px-6 py-4">
                       <span className="bg-black/5 dark:bg-white/5 border border-border-main px-2 py-1 rounded-md text-xs font-bold text-text-main">{row.format}</span>
                     </td>
                     <td className="px-6 py-4 text-sm font-medium text-text-main">{row.records}</td>
                     <td className="px-6 py-4">
                       <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                           {row.user.charAt(0)}
                         </div>
                         <span className="text-sm text-text-sec">{row.user}</span>
                       </div>
                     </td>
                     <td className="px-6 py-4 text-right">
                       <button className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                         Download
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      )}

    </div>
  );
};

export default DataExport;
