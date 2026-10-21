import React, { useState } from 'react';
import DateRangeSelector from '../components/ui/DateRangeSelector';
import AreaChart from '../components/ui/AreaChart';

const chartData = [
  { label: 'Apr', value: 3000, tooltipTitle: 'Apr 2026', tooltipValue: '3,000 users' },
  { label: 'May', value: 6500, tooltipTitle: 'May 2026', tooltipValue: '6,500 users' },
  { label: 'Jun', value: 10000, tooltipTitle: 'Jun 2026', tooltipValue: '10,000 users' },
  { label: 'Jul', value: 10000, tooltipTitle: 'Jul 2026', tooltipValue: '10,000 users' },
  { label: 'Aug', value: 12450, tooltipTitle: 'Aug 2026', tooltipValue: '12,450 users' },
  { label: 'Sep', value: 16000, tooltipTitle: 'Sep 2026', tooltipValue: '16,000 users' },
];

const UserGrowthChart = () => {
  const [dateRange, setDateRange] = useState('6m');

  return (
    <div className="bg-surface border border-border-main rounded-2xl p-6 pb-0 shadow-sm flex flex-col h-full overflow-hidden">
      <div className="flex items-start justify-between gap-2 mb-6">
        <div className="min-w-0 pr-2 flex-1">
          <h3 className="text-base sm:text-lg font-bold font-headingA text-text-main whitespace-nowrap">User Growth</h3>
          <p className="text-[10px] sm:text-xs text-text-sec leading-tight mt-0.5">Total user registrations over time</p>
        </div>
        <DateRangeSelector 
          value={dateRange} 
          onChange={setDateRange} 
          showIcon={false} 
        />
      </div>

      <div className="flex-1 -mx-6 relative">
        <AreaChart 
          data={chartData} 
          color="#8b5cf6" 
          height={180} 
          yAxisLabels={["20K", "15K", "10K", "5K", "0"]} 
        />
      </div>
    </div>
  );
};

export default UserGrowthChart;
