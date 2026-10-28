import React, { useState, useRef } from 'react';

export interface DonutChartData {
  name: string;
  value: string;
  percent: number | string;
  color: string;
}

interface DonutChartProps {
  data: DonutChartData[];
  total: string;
  hoveredIndex?: number | null;
  onHoverChange?: (index: number | null) => void;
}

const DonutChart = ({ data, total, hoveredIndex, onHoverChange }: DonutChartProps) => {
  const [internalHoverIndex, setInternalHoverIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeHoverIndex = hoveredIndex !== undefined ? hoveredIndex : internalHoverIndex;

  const setHover = (idx: number | null) => {
    if (onHoverChange) {
      onHoverChange(idx);
    } else {
      setInternalHoverIndex(idx);
    }
  };

  const radius = 64;
  const strokeWidth = 24;
  const hoverStrokeWidth = 30;
  const circumference = 2 * Math.PI * radius;

  const parsedData = data.map((item) => ({
    ...item,
    percentNum: typeof item.percent === 'string' ? parseFloat(item.percent) : item.percent,
  }));

  const totalPercent = parsedData.reduce((acc, s) => acc + s.percentNum, 0) || 100;

  // Build angular slice ranges for geometric circular strip hit testing
  let currentAngle = 0;
  const sliceAngleRanges = parsedData.map((slice, idx) => {
    const angleSpan = (slice.percentNum / totalPercent) * 360;
    const startAngle = currentAngle;
    currentAngle += angleSpan;
    const endAngle = idx === parsedData.length - 1 ? 360 : currentAngle;
    return {
      startAngle,
      endAngle,
    };
  });

  // Calculate SVG stroke offsets
  let currentOffset = 0;
  const slices = parsedData.map((item) => {
    const strokeLength = (item.percentNum / totalPercent) * circumference;
    const offset = currentOffset;
    currentOffset += strokeLength;
    return {
      ...item,
      strokeLength: strokeLength + 0.6,
      offset,
    };
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // Relative mouse position from center in SVG 200x200 space
    const svgX = ((e.clientX - rect.left) / rect.width) * 200;
    const svgY = ((e.clientY - rect.top) / rect.height) * 200;

    const dx = svgX - 100;
    const dy = svgY - 100;
    const r = Math.hypot(dx, dy);

    // Circular strip bounds:
    // radius = 64, strokeWidth = 24.
    // Inner boundary = 64 - 12 = 52 (49 on hover)
    // Outer boundary = 64 + 12 = 76 (79 on hover)
    const innerRadius = 50;
    const outerRadius = 80;

    // If cursor is inside the hole (< 50) or outside the strip (> 80), no part is highlighted
    if (r < innerRadius || r > outerRadius) {
      if (activeHoverIndex !== null) setHover(null);
      return;
    }

    // Cursor is on the circular strip! Determine angle clockwise from 12 o'clock
    let angle = (Math.atan2(dy, dx) * (180 / Math.PI) + 90) % 360;
    if (angle < 0) angle += 360;

    const foundIndex = sliceAngleRanges.findIndex(
      (s) => angle >= s.startAngle && angle < s.endAngle
    );

    const nextIndex = foundIndex !== -1 ? foundIndex : null;
    if (nextIndex !== activeHoverIndex) {
      setHover(nextIndex);
    }
  };

  const handleMouseLeave = () => {
    if (activeHoverIndex !== null) {
      setHover(null);
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-40 h-40 flex flex-col items-center justify-center shrink-0 select-none ${
        activeHoverIndex !== null ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90 overflow-visible drop-shadow-sm pointer-events-none">
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
          const isHovered = activeHoverIndex === i;

          return (
            <circle
              key={i}
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={isHovered ? hoverStrokeWidth : strokeWidth}
              strokeDasharray={`${slice.strokeLength} ${circumference}`}
              strokeDashoffset={-slice.offset}
              className={`transition-all duration-200 origin-center ${textColorClass} ${
                activeHoverIndex !== null && !isHovered ? 'opacity-35' : 'opacity-100'
              }`}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-200 mt-1">
        <span className={`font-bold font-headingA transition-all duration-200 transform ${
          activeHoverIndex !== null ? 'text-[22px] text-text-main scale-105' : 'text-xl text-text-main'
        }`}>
          {activeHoverIndex !== null ? data[activeHoverIndex].value : total}
        </span>
        <span className="text-[11px] text-text-sec text-center px-2 mt-0.5 max-w-[100px] leading-tight truncate">
          {activeHoverIndex !== null ? data[activeHoverIndex].name : "Total Users"}
        </span>
      </div>
    </div>
  );
};

export default DonutChart;
