import React from 'react';
import AllUsers from './all_users';

const UsersManagement = () => {
  return (
    <div className="w-full min-h-screen bg-black/5 dark:bg-[#0a0a0a]">
      {/* Currently rendering the All Users page so you can see it. */}
      <AllUsers />
    </div>
  );
};

export default UsersManagement;
