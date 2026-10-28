import React from 'react';

const AdminTabSelector = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex items-center gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-full min-h-[44px]">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const formattedCount = tab.count != null && tab.count > 999 ? (tab.count / 1000).toFixed(1) + 'k' : tab.count;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative h-full flex items-center py-3 text-[13px] font-semibold transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer active:scale-95 ${
              isActive ? 'text-primary' : 'text-text-sec hover:text-text-main'
            }`}
          >
            {tab.label} {tab.count != null && `(${formattedCount})`}
            {isActive && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-t-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default AdminTabSelector;
