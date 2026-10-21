import React from 'react';
import Modal from '../components/ui/Modal';
import { PasswordInput } from '../components/form_components/PasswordInput';
import Selector from '../components/form_components/Selector';
import { PrimaryButton } from '../components/button/PrimaryButton';
import SecondaryButton from '../components/button/SecondaryButton';

interface ChangeUserPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

const ChangeUserPassword: React.FC<ChangeUserPasswordProps> = ({ isOpen, onClose, userName }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Change User Password"
      description={userName ? `Update the password for ${userName}.` : "Update the password for a team member."}
      maxWidth="sm"
      footer={
        <>
          <SecondaryButton onClick={onClose} className="flex-1 justify-center py-2.5">
            Cancel
          </SecondaryButton>
          <PrimaryButton className="flex-1 justify-center py-2.5 shadow-md">
            Update
          </PrimaryButton>
        </>
      }
    >
      <div className="flex flex-col gap-5 pt-2">
        <div className="relative">
          <label className="text-xs font-bold text-text-sec uppercase tracking-wider mb-2 block">User</label>
          <input 
            type="text" 
            value={userName || ''} 
            disabled 
            className="w-full bg-surface border border-border-main rounded-xl px-4 py-2.5 text-sm text-text-main cursor-not-allowed opacity-70" 
          />
        </div>

        <PasswordInput 
          label="Current Password"
          placeholder="Enter current password" 
        />

        <PasswordInput 
          label="New Password"
          placeholder="Enter new password" 
        />
      </div>
    </Modal>
  );
};

export default ChangeUserPassword;
