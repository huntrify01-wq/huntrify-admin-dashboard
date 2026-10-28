import React from 'react';
import { Avatar } from '../components/ui/Avatar';

const RecentUsersTable = ({ users }: any) => {
  return (
    <div className="bg-surface border border-border-main rounded-2xl p-6 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[17px] font-bold font-headingA text-text-main">Recent Users</h3>
        <button className="text-sm font-semibold text-primary hover:opacity-80 transition-all cursor-pointer active:scale-95">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-border-main/50">
              <th className="pb-4 text-[13px] font-medium text-text-sec px-2">User</th>
              <th className="pb-4 text-[13px] font-medium text-text-sec">Role</th>
              <th className="pb-4 text-[13px] font-medium text-text-sec">Plan</th>
              <th className="pb-4 text-[13px] font-medium text-text-sec">Verification</th>
              <th className="pb-4 text-[13px] font-medium text-text-sec text-right px-2">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any, idx: number) => (
              <tr key={idx} className="border-b border-border-main/30 last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
                <td className="py-4 px-2">
                  <div className="flex items-center gap-3">
                    <Avatar 
                      src={user.avatar}
                      fallback={user.initials || user.name.substring(0, 2).toUpperCase()} 
                      size="md" 
                      className="shrink-0 font-bold" 
                    />
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-text-main leading-tight">{user.name}</span>
                      <span className="text-[12px] text-text-sec mt-0.5">{user.handle}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-[13px] text-text-sec font-medium">{user.role}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-lg text-[12px] font-medium ${
                    user.plan === 'Pro' 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-border-main/50 text-text-sec dark:bg-white/10 dark:text-gray-300'
                  }`}>
                    {user.plan || 'Free'}
                  </span>
                </td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-lg text-[12px] font-medium ${
                    user.verification === 'Verified' ? 'bg-green-500/20 text-green-500' 
                    : user.verification === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' 
                    : 'bg-blue-500/20 text-blue-500'
                  }`}>
                    {user.verification}
                  </span>
                </td>
                <td className="py-4 text-[13px] text-text-sec font-medium text-right px-2">
                  {user.joinedTimeAgo || user.joinedDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentUsersTable;
