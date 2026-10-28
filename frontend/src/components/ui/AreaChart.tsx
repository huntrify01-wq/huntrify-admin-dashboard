import React, { useState, useRef } from 'react';

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
  snapRadius?: number;
}

interface ActiveIndicator {
  x: number;
  y: number;
  isSnapped: boolean;
  snappedIndex?: number;
  tooltipTitle: string;
  tooltipValue: string;
}

const AreaChart = ({ 
  data, 
  color = '#8b5cf6', 
  height = 180, 
  yAxisLabels,
  snapRadius = 8 
}: AreaChartProps) => {
  const [indicator, setIndicator] = useState<ActiveIndicator | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const labelsY = yAxisLabels || ["20K", "15K", "10K", "5K", "0"];

  const width = 500;
  const h = height; 
  const maxVal = Math.max(...data.map(d => d.value), 20000); 
  
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = h - (d.value / maxVal) * h;
    return { x, y, data: d, index: i };
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || points.length < 2) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // Convert mouse client coordinates to SVG coordinate space [0..500, 0..height]
    const rawSvgX = ((e.clientX - rect.left) / rect.width) * width;
    const rawSvgY = ((e.clientY - rect.top) / rect.height) * h;

    const mouseSvgX = Math.max(0, Math.min(width, rawSvgX));
    const mouseSvgY = rawSvgY;

    // Identify which interval [p_i, p_{i+1}] contains mouseSvgX
    let segIndex = 0;
    for (let i = 0; i < points.length - 1; i++) {
      if (mouseSvgX >= points[i].x && mouseSvgX <= points[i + 1].x) {
        segIndex = i;
        break;
      }
      if (i === points.length - 2) segIndex = i;
    }

    const p0 = points[segIndex];
    const p1 = points[segIndex + 1];
    const segWidth = p1.x - p0.x || 1;
    const rawT = Math.max(0, Math.min(1, (mouseSvgX - p0.x) / segWidth));

    // Exact height on the cubic curve using Hermite smoothstep
    const curveY = p0.y + (p1.y - p0.y) * (3 * rawT * rawT - 2 * rawT * rawT * rawT);

    // Active condition: on or below the curve down to the base line (with comfortable 20px headroom)
    const isUnderCurve = mouseSvgY >= curveY - 20 && mouseSvgY <= h + 30;
    if (!isUnderCurve) {
      setIndicator(null);
      return;
    }

    // Check if cursor is within the magnetic snap radius of any pre-existing monthly node
    let snappedIndex: number | null = null;
    for (let i = 0; i < points.length; i++) {
      if (Math.abs(mouseSvgX - points[i].x) <= snapRadius) {
        snappedIndex = i;
        break;
      }
    }

    if (snappedIndex !== null) {
      // Snapped to node: keep indicator stationary on that exact node
      const snappedPoint = points[snappedIndex];
      setIndicator({
        x: snappedPoint.x,
        y: snappedPoint.y,
        isSnapped: true,
        snappedIndex,
        tooltipTitle: snappedPoint.data.tooltipTitle || `${snappedPoint.data.label} 2026`,
        tooltipValue: snappedPoint.data.tooltipValue || `${snappedPoint.data.value.toLocaleString()} users`,
      });
    } else {
      // Free tracing along the curve between nodes
      const userCount = Math.round(
        p0.data.value + (p1.data.value - p0.data.value) * (3 * rawT * rawT - 2 * rawT * rawT * rawT)
      );
      const day = Math.min(30, Math.max(1, Math.round(1 + rawT * 29)));
      const tooltipTitle = `${p0.data.label} ${day}, 2026`;
      const tooltipValue = `${userCount.toLocaleString()} users`;

      setIndicator({
        x: mouseSvgX,
        y: curveY,
        isSnapped: false,
        tooltipTitle,
        tooltipValue,
      });
    }
  };

  const handleMouseLeave = () => {
    setIndicator(null);
  };

  // Tooltip dynamic alignment & arrow styling to prevent edge clipping
  let tooltipTransform = 'translate(-50%, -100%)';
  let arrowStyle: React.CSSProperties = { left: '50%', transform: 'translateX(-50%) rotate(45deg)' };

  if (indicator) {
    const pctX = (indicator.x / width) * 100;
    if (pctX < 18) {
      tooltipTransform = 'translate(-12%, -100%)';
      arrowStyle = { left: '20px', transform: 'rotate(45deg)' };
    } else if (pctX > 82) {
      tooltipTransform = 'translate(-88%, -100%)';
      arrowStyle = { right: '20px', left: 'auto', transform: 'rotate(45deg)' };
    }
  }

  return (
    <div className="flex-1 relative w-full h-full min-h-[200px] flex items-end overflow-visible">
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

      {/* Interactive SVG Chart Area */}
      <div 
        ref={containerRef}
        className={`absolute inset-y-0 left-0 right-0 z-30 ml-10 mb-6 mt-4 pr-4 overflow-visible transition-colors ${
          indicator !== null ? 'cursor-pointer' : 'cursor-default'
        }`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <svg viewBox={`0 0 ${width} ${h}`} preserveAspectRatio="none" className="w-full h-full overflow-visible pointer-events-none">
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


          
          {/* Pre-existing Monthly Node Circles */}
          {points.map((p, i) => {
            const isSnappedToThis = indicator?.isSnapped && indicator.snappedIndex === i;
            return (
              <g key={i}>
                {isSnappedToThis && (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={12}
                    fill={color}
                    opacity={0.3}
                    className="animate-pulse"
                  />
                )}
                <circle 
                  cx={p.x} 
                  cy={p.y} 
                  r={isSnappedToThis ? 6.5 : 4} 
                  fill={color} 
                  stroke="#fff" 
                  strokeWidth="2" 
                  className="transition-all duration-150 drop-shadow-sm"
                />
              </g>
            );
          })}

          {/* Dynamic Tracing Circle (When moving between monthly nodes) */}
          {indicator !== null && !indicator.isSnapped && (
            <g className="transition-all duration-75">
              <circle 
                cx={indicator.x} 
                cy={indicator.y} 
                r={10} 
                fill={color} 
                opacity={0.25} 
                className="animate-pulse"
              />
              <circle 
                cx={indicator.x} 
                cy={indicator.y} 
                r={5} 
                fill={color} 
                stroke="#fff" 
                strokeWidth="2.5" 
                className="drop-shadow-md"
              />
            </g>
          )}
        </svg>

        {/* Elevated Tooltip Floating Above Chart Elements */}
        {indicator !== null && (
          <div 
            className="absolute bg-surface border border-border-main shadow-2xl rounded-xl px-3 py-2 text-xs flex flex-col items-center pointer-events-none z-50 min-w-[105px] whitespace-nowrap transition-transform duration-75 select-none" 
            style={{ 
              left: `${(indicator.x / width) * 100}%`, 
              top: `${(indicator.y / h) * 100}%`, 
              transform: tooltipTransform, 
              marginTop: '-14px' 
            }}
          >
            <span className="text-text-sec text-[11px] font-medium leading-tight mb-0.5">
              {indicator.tooltipTitle}
            </span>
            <span className="font-bold text-text-main text-sm leading-tight">
              {indicator.tooltipValue}
            </span>
            <div 
              className="absolute -bottom-1.5 w-3 h-3 bg-surface border-b border-r border-border-main"
              style={arrowStyle}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AreaChart;
