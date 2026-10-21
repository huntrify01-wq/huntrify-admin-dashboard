import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Scaffolded imports
import UsersOverview from '../admin/users_management/overview';
import AllUsers from '../admin/users_management/all_users';
import UserDetails from '../admin/users_management/user_details';
import VerificationKYC from '../admin/users_management/verification_kyc';
import SuspendedRestricted from '../admin/users_management/suspended_restricted';
import ReportsFlags from '../admin/users_management/reports_flags';
import UserSegments from '../admin/users_management/user_segments';
import DataExport from '../admin/users_management/data_export';

import TeamMembers from '../admin/administration/team_members';
import MySettings from '../admin/administration/my_settings';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div className="p-8">Admin Dashboard Overview</div>} />
      
      {/* Users Management */}
      <Route path="user-management/overview" element={<UsersOverview />} />
      <Route path="user-management/all" element={<AllUsers />} />
      <Route path="user-management/details/:id" element={<UserDetails />} />
      <Route path="user-management/verification" element={<VerificationKYC />} />
      <Route path="user-management/suspended" element={<SuspendedRestricted />} />
      <Route path="user-management/reports" element={<ReportsFlags />} />
      <Route path="user-management/segments" element={<UserSegments />} />
      <Route path="user-management/export" element={<DataExport />} />

      {/* Administration */}
      <Route path="administration/team" element={<TeamMembers />} />
      <Route path="administration/settings" element={<MySettings />} />
    </Routes>
  );
};
