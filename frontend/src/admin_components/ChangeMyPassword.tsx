import React from 'react';
import { PasswordInput } from '../components/form_components/PasswordInput';
import PrimaryButton from '../components/button/PrimaryButton';

const ChangeMyPassword = () => {
  return (
    <div className="bg-surface border border-border-main rounded-2xl p-6 shadow-sm w-full max-w-md">
      <div className="flex items-center gap-2 mb-6">
        <i className="ri-lock-2-line text-primary text-xl font-bold" />
        <h3 className="text-lg font-bold font-headingA text-text-main">Change My Password</h3>
      </div>

      <div className="flex flex-col gap-5">
        {/* Current Password */}
        <PasswordInput 
          placeholder="Current Password" 
        />

        {/* New Password */}
        <PasswordInput 
          placeholder="New Password" 
        />

        {/* Confirm New Password */}
        <PasswordInput 
          placeholder="Confirm New Password" 
        />

        {/* Filled Button */}
        <PrimaryButton className="w-full justify-center py-3 mt-1 shadow-md">
          Update My Password
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ChangeMyPassword;
