import React, { useState } from 'react';
import Modal from '../components/ui/Modal';
import { Input } from '../components/form_components/Input';
import PhoneInput from '../components/form_components/PhoneInput';
import Selector from '../components/form_components/Selector';
import Checkbox from '../components/form_components/Checkbox';
import PrimaryButton from '../components/button/PrimaryButton';
import SecondaryButton from '../components/button/SecondaryButton';

interface AddTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTeamMemberModal: React.FC<AddTeamMemberModalProps> = ({ isOpen, onClose }) => {
  const [phone, setPhone] = useState<string | undefined>('');
  const [role, setRole] = useState<string | number>('');
  const [sendEmail, setSendEmail] = useState(true);

  const roleOptions = [
    { label: 'Super Admin', value: 'admin', icon: 'ri-shield-star-line' },
    { label: 'Editor', value: 'editor', icon: 'ri-edit-2-line' },
    { label: 'Viewer', value: 'viewer', icon: 'ri-eye-line' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Team Member"
      description="Invite a new member to your team."
      maxWidth="md"
      footer={
        <>
          <SecondaryButton onClick={onClose} className="flex-1 justify-center py-2.5">
            Cancel
          </SecondaryButton>
          <PrimaryButton className="flex-[1.5] justify-center py-2.5 shadow-md">
            <i className="ri-send-plane-line mr-2" /> Send Invitation
          </PrimaryButton>
        </>
      }
    >
      <div className="flex flex-col gap-5 pt-2">
        <Input 
          label="Full Name" 
          placeholder="Enter full name" 
          required 
        />
        
        <PhoneInput 
          label="Phone Number" 
          value={phone} 
          onChange={setPhone} 
          defaultCountry="IN" 
        />

        <Input 
          type="email" 
          label="Email Address" 
          placeholder="Enter email address" 
          required 
        />

        <Selector 
          label="Role" 
          options={roleOptions} 
          placeholder="Select a role" 
          value={role} 
          onChange={setRole} 
        />

        <div className="w-full h-[1px] bg-border-main/50 my-2"></div>

        <Checkbox 
          label="Send invitation email" 
          description="An invitation link will be sent to their email address." 
          checked={sendEmail} 
          onChange={(e: any) => setSendEmail(e.target.checked)} 
        />
      </div>
    </Modal>
  );
};

export default AddTeamMemberModal;
