import React, { useState } from 'react';
import Modal from '../components/ui/Modal';
import SecondaryButton from '../components/button/SecondaryButton';
import { showToast } from '../components/ui/Toast';

interface ActivityItem {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  detail: string;
}

const DEFAULT_ACTIVITIES: ActivityItem[] = [
  { id: '1', timestamp: '17/09/2026, 04:38:54', user: 'Punit', action: 'Add User', detail: 'Created user Punit (ADMIN)' },
  { id: '2', timestamp: '15/09/2026, 14:44:28', user: 'Shivam KansalU', action: 'Edit Profile', detail: 'Updated profile for user Shivam KansalU' },
  { id: '3', timestamp: '15/09/2026, 14:44:27', user: 'Shivam KansalU', action: 'Edit Profile', detail: 'Updated profile for user Shivam KansalU' },
  { id: '4', timestamp: '15/09/2026, 14:40:50', user: 'Shivam KansalU', action: 'Change My Password', detail: 'User changed their own password' },
  { id: '5', timestamp: '15/09/2026, 14:40:24', user: 'shivam', action: 'Change Password', detail: 'Updated password for user' },
  { id: '6', timestamp: '15/09/2026, 14:39:29', user: 'Shivam KansalU', action: 'Send Email', detail: 'Sent "chfchfc" to 6 recipient(s): shivam, Prince Singh, Huntrify +3 more' },
  { id: '7', timestamp: '15/09/2026, 14:39:25', user: 'Shivam KansalU', action: 'Send Email', detail: 'Sent "chfchfc" to 6 recipient(s): shivam, Prince Singh, Huntrify +3 more' },
  { id: '8', timestamp: '15/09/2026, 14:39:22', user: 'Shivam KansalU', action: 'Send Email', detail: 'Sent "chfchfc" to 6 recipient(s): shivam, Prince Singh, Huntrify +3 more' },
];

const STORAGE_KEY = 'huntrify_team_activity_logs';

const TeamActivity: React.FC = () => {
  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        try {
          return JSON.parse(saved);
        } catch {
          return DEFAULT_ACTIVITIES;
        }
      }
    }
    return DEFAULT_ACTIVITIES;
  });

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleClearLogs = () => {
    setActivities([]);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
    setIsConfirmOpen(false);
    showToast({
      title: 'Logs Cleared',
      description: 'Team activity history has been cleared successfully.',
      variant: 'success',
    });
  };

  const handleRestoreLogs = () => {
    setActivities(DEFAULT_ACTIVITIES);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ACTIVITIES));
    }
    showToast({
      title: 'Logs Restored',
      description: 'Default team activity logs have been restored.',
      variant: 'info',
    });
  };

  return (
    <>
      <div className="bg-transparent border border-border-main rounded-2xl flex flex-col w-full h-[400px]">
        <div className="p-4 border-b border-border-main flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h3 className="font-bold text-sm text-primary flex items-center gap-2">
              <i className="ri-team-fill" /> Team Activity
            </h3>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-border-main/50 text-text-sec">
              {activities.length} {activities.length === 1 ? 'entry' : 'entries'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {activities.length === 0 ? (
              <button
                type="button"
                onClick={handleRestoreLogs}
                className="text-text-sec hover:text-primary transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer active:scale-95"
              >
                <i className="ri-refresh-line" /> Restore Logs
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsConfirmOpen(true)}
                className="text-red-500 hover:text-red-600 active:scale-95 transition-all text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <i className="ri-delete-bin-line" /> Clear Logs
              </button>
            )}
          </div>
        </div>

        <div className="p-4 flex-1 overflow-y-auto font-mono text-[11px] leading-6 text-text-sec flex flex-col gap-3">
          {activities.length > 0 ? (
            activities.map((item) => (
              <div key={item.id} className="transition-colors hover:text-text-main">
                [{item.timestamp}] <span className="text-primary font-bold">{item.user}</span> → {item.action} — {item.detail}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-10 text-center font-sans">
              <div className="w-12 h-12 rounded-2xl bg-surface/80 border border-border-main/60 flex items-center justify-center text-text-sec/60 mb-3 shadow-sm">
                <i className="ri-delete-bin-7-line text-2xl" />
              </div>
              <p className="text-sm font-semibold text-text-main">No activity logs</p>
              <p className="text-xs text-text-sec mt-1 max-w-[280px]">
                Activity logs have been cleared. New administrative and team events will appear here.
              </p>
              <button
                type="button"
                onClick={handleRestoreLogs}
                className="mt-4 px-3 py-1.5 rounded-lg border border-border-main/60 bg-surface/50 hover:bg-border-main/40 text-xs font-medium text-text-sec hover:text-text-main transition-colors cursor-pointer active:scale-95 flex items-center gap-1.5"
              >
                <i className="ri-refresh-line" /> Restore Sample Logs
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Clear Activity Logs"
        description="Are you sure you want to clear all team activity logs?"
        maxWidth="sm"
        footer={
          <>
            <SecondaryButton
              type="button"
              onClick={() => setIsConfirmOpen(false)}
              className="px-4 py-2 text-xs"
            >
              Cancel
            </SecondaryButton>
            <button
              type="button"
              onClick={handleClearLogs}
              className="inline-flex items-center justify-center gap-1.5 rounded-[var(--radius-btn)] px-4 py-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              <i className="ri-delete-bin-line" />
              Clear All Logs
            </button>
          </>
        }
      >
        <p className="text-xs text-text-sec leading-relaxed">
          This will remove all <span className="font-semibold text-text-main">{activities.length}</span> recorded log entries from this panel. You can restore the default sample logs at any time using the Restore Logs button.
        </p>
      </Modal>
    </>
  );
};

export default TeamActivity;
