import React, { useState } from 'react';
import Input from '../../components/form_components/Input';
import PasswordInput from '../../components/form_components/PasswordInput';
import Selector from '../../components/form_components/Selector';
import ToggleSwitch from '../../components/form_components/ToggleSwitch';
import PhoneInput from '../../components/form_components/PhoneInput';
import PrimaryButton from '../../components/button/PrimaryButton';
import SecondaryButton from '../../components/button/SecondaryButton';
import OnlyIconButton from '../../components/button/OnlyIconButton';
import ButtonWithIcon from '../../components/button/ButtonWithIcon';
import BlackPrimaryButton from '../../components/button/BlackPrimaryButton';
import { Avatar } from '../../components/ui/Avatar';

const MySettings = () => {
  return (
    <div className="p-4 pt-6 md:p-6 lg:p-8 w-full flex flex-col gap-6 min-h-screen bg-transparent">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-2 mt-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center text-2xl shadow-sm shrink-0">
            <i className="ri-settings-3-line" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold font-headingA text-text-main">Settings</h1>
            <p className="text-sm text-text-sec mt-0.5">Manage your account and preferences.</p>
          </div>
        </div>
      </div>

      {/* Section 1: My Profile */}
      <div className="bg-surface border border-border-main rounded-2xl overflow-hidden shadow-sm">
        <div className="border-b border-border-main/50 px-6 py-4 flex flex-col gap-1">
          <div className="flex items-center gap-2 font-semibold text-text-main text-sm">
            <i className="ri-user-line text-primary text-lg mt-0.5" /> My Profile
          </div>
          <span className="text-xs text-text-sec font-normal ml-[26px]">Update your profile information.</span>
        </div>
        <div className="p-4 md:p-6 flex flex-col gap-6">
          {/* Avatar Area */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-5">
            <div className="relative">
              <Avatar src="" fallback="DP" size="lg" className="w-[72px] h-[72px]" />
              <button className="absolute bottom-0 right-0 w-6 h-6 bg-surface text-text-sec hover:text-text-main rounded-full flex items-center justify-center border border-border-main text-[12px] shadow-sm transition-colors">
                <i className="ri-camera-fill" />
              </button>
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-bold text-lg text-text-main leading-none">Prince Singh</h3>
              <div>
                 <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded font-bold">Super Admin</span>
              </div>
              <p className="text-xs text-text-sec mt-1">JPG, PNG (Max 2MB)</p>
            </div>
          </div>
          
          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-text-main">Display Name</label>
              <Input 
                value="Prince Singh" 
                className="w-full"
                onChange={() => {}}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-text-main">Email Address</label>
              <Input 
                value="prince@huntrify.com" 
                className="w-full"
                onChange={() => {}}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-text-main">Phone Number</label>
              <PhoneInput 
                value="+919876543210" 
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <PrimaryButton>
              <i className="ri-download-2-line mr-1.5" /> Save Profile
            </PrimaryButton>
          </div>
        </div>
      </div>

      {/* Section 2: Change Password */}
      <div className="bg-surface border border-border-main rounded-2xl overflow-hidden shadow-sm">
        <div className="border-b border-border-main/50 px-6 py-4 flex flex-col gap-1">
          <div className="flex items-center gap-2 font-semibold text-text-main text-sm">
            <i className="ri-lock-line text-primary text-lg mt-0.5" /> Change Password
          </div>
          <span className="text-xs text-text-sec font-normal ml-[26px]">Update your password to keep your account secure.</span>
        </div>
        <div className="p-4 md:p-6 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-text-main">Current Password</label>
              <PasswordInput placeholder="Enter current password" showStrength={false} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-text-main">New Password</label>
              <PasswordInput placeholder="Enter new password" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-text-main">Confirm Password</label>
              <PasswordInput placeholder="Confirm new password" showStrength={false} />
            </div>
          </div>

          <div className="flex items-center justify-center mt-2">
            <PrimaryButton>
              <i className="ri-download-2-line mr-1.5" /> Update Password
            </PrimaryButton>
          </div>
        </div>
      </div>

      {/* 2 Column Grid for remaining sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start mt-0">
        
        {/* Left Column */}
        <div className="flex flex-col gap-4">
            {/* Notification Settings */}
            <div className="bg-surface border border-border-main rounded-2xl p-6 shadow-sm flex flex-col gap-6">
               <div className="flex flex-col gap-1">
                 <div className="flex items-center gap-2 font-semibold text-text-main text-sm">
                   <i className="ri-notification-3-line text-primary text-lg mt-0.5" /> Notification Settings
                 </div>
                 <span className="text-xs text-text-sec font-normal ml-[26px]">Choose what notifications you want to receive.</span>
               </div>
               
               <div className="flex flex-col gap-4 mt-2">
                 <div className="flex items-center justify-between gap-4">
                    <span className="text-[13px] font-medium text-text-main leading-tight">New user registrations</span>
                    <ToggleSwitch defaultChecked />
                 </div>
                 <div className="flex items-center justify-between gap-4">
                    <span className="text-[13px] font-medium text-text-main leading-tight">KYC verification requests</span>
                    <ToggleSwitch defaultChecked />
                 </div>
                 <div className="flex items-center justify-between gap-4">
                    <span className="text-[13px] font-medium text-text-main leading-tight">Support tickets</span>
                    <ToggleSwitch defaultChecked />
                 </div>
                 <div className="flex items-center justify-between gap-4">
                    <span className="text-[13px] font-medium text-text-main leading-tight">Payment alerts</span>
                    <ToggleSwitch />
                 </div>
                 <div className="flex items-center justify-between gap-4">
                    <span className="text-[13px] font-medium text-text-main leading-tight">System alerts</span>
                    <ToggleSwitch defaultChecked />
                 </div>
                 <div className="flex items-center justify-between gap-4">
                    <span className="text-[13px] font-medium text-text-main leading-tight">Team activity</span>
                    <ToggleSwitch />
                 </div>
               </div>
            </div>

            {/* Account Security */}
            <div className="bg-surface border border-border-main rounded-2xl p-6 shadow-sm flex flex-col gap-6 mt-1">
               <div className="flex flex-col gap-1">
                 <div className="flex items-center gap-2 font-semibold text-text-main text-sm">
                   <i className="ri-shield-check-line text-primary text-lg mt-0.5" /> Account Security
                 </div>
                 <span className="text-xs text-text-sec font-normal ml-[26px]">Manage account security settings.</span>
               </div>
               
               <div className="flex flex-col gap-5 mt-2">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-main/50 pb-5">
                   <div className="flex items-start gap-3">
                     <i className="ri-shield-keyhole-line text-text-sec text-xl mt-0.5" />
                     <div className="flex flex-col gap-1">
                       <span className="text-[13px] font-bold text-text-main leading-tight">Two-Factor Authentication</span>
                       <span className="text-[11px] text-text-sec leading-tight">Add an extra layer of security to your account.</span>
                     </div>
                   </div>
                   <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto mt-2 md:mt-0">
                     <span className="text-xs text-text-sec font-medium">Not Enabled</span>
                     <SecondaryButton className="!px-4">Enable 2FA</SecondaryButton>
                   </div>
                 </div>

                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                   <div className="flex items-start gap-3">
                     <i className="ri-computer-line text-text-sec text-xl mt-0.5" />
                     <div className="flex flex-col gap-1">
                       <span className="text-[13px] font-bold text-text-main leading-tight">Active Sessions</span>
                       <span className="text-[11px] text-text-sec leading-tight">Manage your active login sessions.</span>
                     </div>
                   </div>
                   <SecondaryButton className="!px-4 shrink-0">View Sessions</SecondaryButton>
                 </div>
               </div>
            </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
            {/* Dashboard Settings */}
            <div className="bg-surface border border-border-main rounded-2xl p-6 shadow-sm flex flex-col gap-6">
               <div className="flex flex-col gap-1">
                 <div className="flex items-center gap-2 font-semibold text-text-main text-sm">
                   <i className="ri-computer-line text-primary text-lg mt-0.5" /> Dashboard Settings
                 </div>
                 <span className="text-xs text-text-sec font-normal ml-[26px]">Customize your dashboard experience.</span>
               </div>
               
               <div className="flex flex-col gap-6 mt-2">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                   <div className="flex flex-col gap-2">
                     <label className="text-xs font-bold text-text-main">Default Landing Page</label>
                     <Selector 
                       options={[
                         { label: 'Users Management', value: 'users' },
                         { label: 'Dashboard', value: 'dashboard' }
                       ]} 
                       value="users" 
                     />
                   </div>
                   <div className="flex flex-col gap-2">
                     <label className="text-xs font-bold text-text-main">Items per page</label>
                     <Selector 
                       options={[
                         { label: '10', value: '10' },
                         { label: '25', value: '25' },
                         { label: '50', value: '50' }
                       ]} 
                       value="25" 
                     />
                   </div>
                   <div className="flex flex-col gap-2">
                     <label className="text-xs font-bold text-text-main">Sidebar Preference</label>
                     <Selector 
                       options={[
                         { label: 'Expanded (Default)', value: 'expanded' },
                         { label: 'Collapsed', value: 'collapsed' }
                       ]} 
                       value="expanded" 
                     />
                   </div>
                   <div className="flex flex-col gap-2">
                     <label className="text-xs font-bold text-text-main">Theme</label>
                     <Selector 
                       options={[
                         { label: 'Dark (Default)', value: 'dark' },
                         { label: 'Light', value: 'light' },
                         { label: 'System', value: 'system' }
                       ]} 
                       value="dark" 
                     />
                   </div>
                 </div>
                 
                 <div className="flex flex-col gap-2">
                   <label className="text-xs font-bold text-text-main">Date & Time Format</label>
                   <Selector 
                     options={[{ label: 'Aug 14, 2026, 10:30 AM (GMT+5:30)', value: 'default' }]} 
                     value="default" 
                   />
                 </div>
               </div>
            </div>

            {/* Danger Zone */}
            <div className="border border-error/30 rounded-2xl overflow-hidden shadow-sm bg-surface mt-1">
              <div className="px-6 py-4 flex flex-col justify-center bg-error/5 border-b border-error/20">
                <div className="flex items-center gap-2 font-bold text-error text-[15px]">
                  <i className="ri-alert-line text-lg" /> Danger Zone
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4 bg-error/[0.02]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <span className="text-xs text-text-sec leading-tight">These actions are permanent and cannot be undone.</span>
                  <button className="flex items-center justify-center gap-2 shrink-0 text-xs text-error border border-error/30 bg-error/5 hover:bg-error/10 px-4 py-2.5 rounded-xl font-bold transition-colors w-full md:w-auto">
                     <i className="ri-logout-box-r-line text-sm" /> Sign Out from All Devices
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MySettings;
