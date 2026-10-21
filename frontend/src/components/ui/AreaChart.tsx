import React, { useState } from 'react';

export interface DataPoint {
  label: string;
  value: number;
  tooltipTitle?: string;
  tooltipValue?: string;
}

export interface AreaChartProps {
  data: DataPoint[];
  color?: string;
  height?: number;
  yAxisLabels?: string[];
}

const AreaChart = ({ data, color = '#8b5cf6', height = 180, yAxisLabels }: AreaChartProps) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const labelsY = yAxisLabels || ["20K", "15K", "10K", "5K", "0"];

  const width = 500;
  const h = height; 
  const maxVal = Math.max(...data.map(d => d.value), 20000); 
  
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = h - (d.value / maxVal) * h;
    return { x, y, data: d };
  });

  const smoothCurve = (pts: typeof points) => {
    if (pts.length === 0) return '';
    let d = `M${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cp1x = (p0.x + p1.x) / 2;
      const cp1y = p0.y;
      const cp2x = (p0.x + p1.x) / 2;
      const cp2y = p1.y;
      d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`;
    }
    return d;
  };

  const curvePath = smoothCurve(points);
  const pathD = `${curvePath} L${width},${h} L0,${h} Z`;
  const lineD = curvePath;

  return (
    <div className="flex-1 relative w-full h-full min-h-[200px] flex items-end">
      {/* Y Axis Labels */}
      <div className="absolute inset-0 flex flex-col justify-between z-0 pb-6 pointer-events-none mt-4">
        {labelsY.map((label, idx) => (
          <div key={idx} className="w-full h-0 relative">
            <span className="absolute left-0 -top-2 text-[10px] text-text-sec font-medium">{label}</span>
          </div>
        ))}
      </div>

      {/* X Axis Labels */}
      <div className="absolute bottom-0 left-10 right-0 flex justify-between text-[10px] text-text-sec z-0 pointer-events-none pr-4">
        {data.map((d, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="font-medium">{d.label}</span>
          </div>
        ))}
      </div>

      {/* SVG Chart Area */}
      <div 
        className="absolute inset-y-0 left-0 right-0 z-10 ml-10 mb-6 mt-4 pr-4" 
        onMouseLeave={() => setHoverIndex(null)}
      >
        <svg viewBox={`0 0 ${width} ${h}`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
          {/* Grid Lines */}
          {labelsY.map((_, idx) => {
            const yLine = (idx / (labelsY.length - 1)) * h;
            return <line key={`h-${idx}`} x1="0" y1={yLine} x2={width} y2={yLine} stroke="currentColor" className="text-border-main opacity-50" strokeWidth="1" />;
          })}
          {data.map((_, idx) => {
            const xLine = (idx / (data.length - 1)) * width;
            return <line key={`v-${idx}`} x1={xLine} y1="0" x2={xLine} y2={h} stroke="currentColor" className="text-border-main opacity-50" strokeWidth="1" />;
          })}

          <defs>
            <linearGradient id="dynamicGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={color} stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d={pathD} fill="url(#dynamicGradient)" className="transition-all duration-300" />
          <path d={lineD} fill="none" stroke={color} strokeWidth="3" className="transition-all duration-300" />
          
          {points.map((p, i) => (
            <circle 
              key={i}
              cx={p.x} 
              cy={p.y} 
              r={hoverIndex === i ? 6 : 4} 
              fill={color} 
              stroke="#fff" 
              strokeWidth="2" 
              className="transition-all duration-200 cursor-pointer drop-shadow-sm"
              onMouseEnter={() => setHoverIndex(i)}
            />
          ))}
        </svg>

        {/* Tooltip */}
        {hoverIndex !== null && (
          <div 
            className="absolute bg-surface border border-border-main shadow-lg rounded-lg p-2 text-xs flex flex-col items-center pointer-events-none transition-all duration-200 z-50 min-w-[100px]" 
            style={{ 
              left: `${(hoverIndex / (data.length - 1)) * 100}%`, 
              top: `${(points[hoverIndex].y / h) * 100}%`, 
              transform: 'translate(-50%, -100%)', 
              marginTop: '-12px' 
            }}
          >
            <span className="text-text-sec mb-0.5">{points[hoverIndex].data.tooltipTitle || points[hoverIndex].data.label}</span>
            <span className="font-bold text-text-main text-sm">{points[hoverIndex].data.tooltipValue || points[hoverIndex].data.value}</span>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-surface border-b border-r border-border-main rotate-45"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AreaChart;
