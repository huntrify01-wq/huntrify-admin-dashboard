import React from 'react';
import Modal from '../components/ui/Modal';
import { Radio } from '../components/form_components/Radio';
import { Checkbox } from '../components/form_components/Checkbox';
import Selector from '../components/form_components/Selector';
import PrimaryButton from '../components/button/PrimaryButton';
import SecondaryButton from '../components/button/SecondaryButton';

const AdminExportModal = ({ isOpen, onClose }: any) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Users"
      description="Download user data based on your selected filters and fields."
      maxWidth="full"
      className="max-w-6xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-1 w-48">
              <label className="text-[10px] font-bold text-text-sec uppercase tracking-wider">Export Format</label>
              <Selector 
                options={[
                  { label: 'CSV (.csv)', value: 'csv' },
                  { label: 'Excel (.xlsx)', value: 'xlsx' },
                  { label: 'JSON (.json)', value: 'json' }
                ]}
                placeholder="CSV (.csv)"
              />
            </div>
            
            <div className="flex items-center gap-3 bg-primary/10 border border-primary/20 px-4 py-2 rounded-xl">
               <i className="ri-database-2-fill text-primary text-xl" />
               <div className="flex flex-col">
                 <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Estimated Records:</span>
                 <span className="font-bold text-text-main text-sm">12,430 <i className="ri-information-line text-text-sec font-normal" /></span>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <SecondaryButton onClick={onClose} className="px-6 py-2.5">
              Cancel
            </SecondaryButton>
            <PrimaryButton className="px-6 py-2.5 shadow-sm">
              <i className="ri-download-cloud-2-line mr-2" /> Export Users
            </PrimaryButton>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-8 pt-2">
        {/* Top Export Type Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="relative flex flex-col p-4 cursor-pointer rounded-xl border-2 border-primary bg-primary/5">
            <Radio name="exportType" defaultChecked label={<span className="font-bold text-text-main">Export Filtered Data</span>} />
            <p className="text-sm text-text-sec pl-10 -mt-1">Download only the data that matches your selected filters.</p>
          </label>
          <label className="relative flex flex-col p-4 cursor-pointer rounded-xl border-2 border-border-main hover:border-text-sec transition-colors bg-surface">
            <Radio name="exportType" label={<span className="font-bold text-text-main">Export All Users</span>} />
            <p className="text-sm text-text-sec pl-10 -mt-1">Download all users from the platform (including inactive and suspended).</p>
          </label>
          <label className="relative flex flex-col p-4 cursor-pointer rounded-xl border-2 border-border-main hover:border-text-sec transition-colors bg-surface">
            <Radio name="exportType" label={<span className="font-bold text-text-main">Export Selected Users</span>} />
            <p className="text-sm text-text-sec pl-10 -mt-1">Download data of manually selected users from the list.</p>
          </label>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Apply Filters (Preview) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-text-main">1. Apply Filters</h3>
                <p className="text-sm text-text-sec">Use filters to include only relevant users in your export.</p>
              </div>
              <button className="text-sm font-medium text-primary hover:underline cursor-pointer active:scale-95 transition-all duration-150">Clear All</button>
            </div>
            
            {/* Dummy filter grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface border border-border-main p-4 rounded-xl">
                <h4 className="font-semibold text-text-main mb-3 text-sm">User Role</h4>
                <div className="flex flex-col gap-3">
                  <Checkbox defaultChecked label="Freelancer" />
                  <Checkbox defaultChecked label="Job Seeker" />
                  <Checkbox label="Client" />
                </div>
              </div>
              <div className="bg-surface border border-border-main p-4 rounded-xl">
                <h4 className="font-semibold text-text-main mb-3 text-sm">Account Status</h4>
                <div className="flex flex-col gap-3">
                  <Checkbox defaultChecked label="Active" />
                  <Checkbox label="Inactive" />
                  <Checkbox defaultChecked label="Pending Verification" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Select Fields */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-text-main">2. Select Fields to Export</h3>
                <p className="text-sm text-text-sec">Choose the user data you want to include.</p>
              </div>
              <div className="flex gap-2">
                 <button className="text-xs font-medium text-primary hover:underline cursor-pointer active:scale-95 transition-all duration-150">Select All</button>
                 <span className="text-text-sec text-xs">|</span>
                 <button className="text-xs font-medium text-text-sec hover:text-text-main cursor-pointer active:scale-95 transition-all duration-150">Deselect All</button>
              </div>
            </div>
            
            <div className="bg-surface border border-border-main rounded-xl p-5 max-h-[400px] overflow-y-auto">
              <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                 {['User ID', 'Full Name', 'Username', 'Email', 'Phone', 'Role', 'Account Status', 'Verification Status', 'Subscription Plan', 'Join Date', 'Last Active'].map((field, i) => (
                    <Checkbox key={i} defaultChecked={i < 6 || i === 8} label={<span className="truncate block max-w-[120px]" title={field}>{field}</span>} />
                 ))}
                 {['Total Earnings', 'Total Spent', 'Wallet Balance', 'Payment Method', 'KYC Status', 'Government ID', 'Location', 'Tags', 'Notes'].map((field, i) => (
                    <Checkbox key={i + 20} label={<span className="truncate block max-w-[120px]" title={field}>{field}</span>} />
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdminExportModal;













