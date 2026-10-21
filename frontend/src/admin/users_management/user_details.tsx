import React from 'react';
import UnderDevelopmentCard from '../../components/UnderDevelopmentCard';

const UserDetails = () => {
  return (
    <div className="p-4 pt-6 md:p-6 lg:p-8 w-full flex flex-col gap-6 min-h-screen bg-transparent">
      <div className="flex items-center gap-4 mb-2 mt-0">
        <div className="w-12 h-12 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center text-2xl shadow-sm">
          <i className="ri-user-settings-line" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-headingA text-text-main">User Details</h1>
          <p className="text-sm text-text-sec mt-0.5">View and edit individual user details.</p>
        </div>
      </div>
      <UnderDevelopmentCard title="User Details" />
    </div>
  );
};
export default UserDetails;
