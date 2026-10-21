import React from 'react';
import UnderDevelopmentCard from '../../components/UnderDevelopmentCard';

const ReportsFlags = () => {
  return (
    <div className="p-4 pt-6 md:p-6 lg:p-8 w-full flex flex-col gap-6 min-h-screen bg-transparent">
      <div className="flex items-center gap-4 mb-2 mt-0">
        <div className="w-12 h-12 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center text-2xl shadow-sm">
          <i className="ri-flag-2-line" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-headingA text-text-main">Reports & Flags</h1>
          <p className="text-sm text-text-sec mt-0.5">Manage user reports and flagged content.</p>
        </div>
      </div>
      <UnderDevelopmentCard title="Reports & Flags" />
    </div>
  );
};
export default ReportsFlags;
