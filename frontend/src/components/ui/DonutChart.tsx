import React, { useState } from 'react';

export interface DonutChartData {
  name: string;
  value: string;
  percent: number | string;
  color: string;
}

interface DonutChartProps {
  data: DonutChartData[];
  total: string;
}

const DonutChart = ({ data, total }: DonutChartProps) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const radius = 64;
  const strokeWidth = 24;
  const hoverStrokeWidth = 30;
  const circumference = 2 * Math.PI * radius;
  
  let currentOffset = 0;

  const slices = data.map((item) => {
    const percentNum = typeof item.percent === 'string' ? parseFloat(item.percent) : item.percent;
    // Add small offset to prevent SVG gaps
    const strokeLength = (percentNum / 100) * circumference;
    const offset = currentOffset;
    currentOffset += strokeLength;
    return {
      ...item,
      strokeLength: strokeLength + 0.7,
      offset
    };
  });

  return (
    <div className="relative w-40 h-40 flex flex-col items-center justify-center shrink-0">
      <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90 overflow-visible drop-shadow-sm">
        {slices.map((slice, i) => {
          const colorMap: Record<string, string> = {
            'bg-primary': 'text-primary',
            'bg-blue-500': 'text-blue-500',
            'bg-green-500': 'text-green-500',
            'bg-yellow-500': 'text-yellow-500',
            'bg-orange-500': 'text-orange-500',
            'bg-red-500': 'text-red-500',
            'bg-gray-500': 'text-gray-500',
          };
          const textColorClass = colorMap[slice.color] || 'text-primary';
          return (
            <circle
              key={i}
              cx="100"
              cy="100"
              r={radius}
              fill="transparent"
              stroke="currentColor"
              strokeWidth={hoverIndex === i ? hoverStrokeWidth : strokeWidth}
              strokeDasharray={`${slice.strokeLength} ${circumference}`}
              strokeDashoffset={-slice.offset}
              className={`transition-all duration-300 cursor-pointer origin-center ${textColorClass} ${hoverIndex !== null && hoverIndex !== i ? 'opacity-40' : 'opacity-100'}`}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-300 mt-1">
        <span className={`font-bold font-headingA transition-all duration-300 transform ${hoverIndex !== null ? 'text-[22px] text-text-main scale-110' : 'text-xl text-text-main'}`}>
          {hoverIndex !== null ? data[hoverIndex].value : total}
        </span>
        <span className="text-[11px] text-text-sec text-center px-2 mt-1 max-w-[100px] leading-tight">
          {hoverIndex !== null ? data[hoverIndex].name : "Total Users"}
        </span>
      </div>
    </div>
  );
};

export default DonutChart;
