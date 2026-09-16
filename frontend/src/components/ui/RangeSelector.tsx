import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '../../utils/cn';

export interface RangeSelectorProps {
  min: number;
  max: number;
  step?: number;
  value?: [number, number];
  defaultValue?: [number, number];
  onChange?: (value: [number, number]) => void;
  formatLabel?: (value: number) => string;
  label?: string;
  description?: string;
  iconName?: string;
  className?: string;
}

export const RangeSelector: React.FC<RangeSelectorProps> = ({
  min,
  max,
  step = 1,
  value,
  defaultValue,
  onChange,
  formatLabel = (v) => v.toString(),
  label,
  description,
  iconName,
  className
}) => {
  const [minVal, setMinVal] = useState(value?.[0] ?? defaultValue?.[0] ?? min);
  const [maxVal, setMaxVal] = useState(value?.[1] ?? defaultValue?.[1] ?? max);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (val: number) => Math.round(((val - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (range.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);

  // Sync controlled value
  useEffect(() => {
    if (value) {
      setMinVal(value[0]);
      setMaxVal(value[1]);
    }
  }, [value]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = Math.min(Number(e.target.value), maxVal - step);
    setMinVal(newVal);
    onChange?.([newVal, maxVal]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = Math.max(Number(e.target.value), minVal + step);
    setMaxVal(newVal);
    onChange?.([minVal, newVal]);
  };

  return (
    <div className={cn("flex flex-col w-full font-sans", className)}>
      <style dangerouslySetInnerHTML={{__html: `
        .rs-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          pointer-events: auto;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--primary-color);
          border: 3px solid rgba(165, 148, 253, 0.4);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          position: relative;
          z-index: 10;
        }
        .rs-thumb:active::-webkit-slider-thumb {
          transform: scale(1.2);
          box-shadow: 0 0 0 4px rgba(48, 16, 254, 0.15);
        }
        .rs-thumb::-moz-range-thumb {
          pointer-events: auto;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--primary-color);
          border: 3px solid rgba(165, 148, 253, 0.4);
          cursor: pointer;
          transition: transform 0.15s ease;
          z-index: 10;
        }
        .rs-thumb:active::-moz-range-thumb {
          transform: scale(1.2);
        }
      `}} />

      {/* Header */}
      {(label || iconName) && (
        <div className="flex items-center gap-2 mb-1">
          {iconName && (
            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-border-main bg-surface text-text-sec shadow-sm">
              <i className={cn("text-[13px]", iconName)} />
            </div>
          )}
          {label && <h4 className="text-[15px] font-medium text-text-main tracking-tight">{label}</h4>}
        </div>
      )}
      {description && (
        <p className="text-[13px] text-text-sec mb-8 pl-8">
          {description}
        </p>
      )}

      {/* Slider Area */}
      <div className={cn("relative w-full h-8 flex items-center", (!label && !iconName && !description) ? "mt-4 mb-6" : "mb-6")}>
        <div className="relative w-full h-1.5 mx-2">
          {/* Base Track */}
          <div className="absolute left-0 right-0 h-1.5 rounded-full bg-border-main dark:bg-[#27272A]" />
          
          {/* Filled Track */}
          <div 
            ref={range} 
            className="absolute h-1.5 rounded-full bg-primary transition-all duration-75 ease-out" 
          />
          
          {/* Input Layer */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={minVal}
            onChange={handleMinChange}
            className="rs-thumb absolute -left-2 -right-2 top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none z-[3] w-[calc(100%+16px)] m-0"
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={maxVal}
            onChange={handleMaxChange}
            className="rs-thumb absolute -left-2 -right-2 top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none z-[4] w-[calc(100%+16px)] m-0"
          />
        </div>

        {/* Floating Labels */}
        <div className="absolute top-6 left-2 right-2 pointer-events-none">
          <div 
            className="absolute text-[12px] font-medium text-text-sec whitespace-nowrap transition-all duration-75 ease-out"
            style={{ 
              left: `${getPercent(minVal)}%`,
              transform: 'translateX(-50%)'
            }}
          >
            {formatLabel(minVal)}
          </div>
          <div 
            className="absolute text-[12px] font-medium text-text-sec whitespace-nowrap transition-all duration-75 ease-out"
            style={{ 
              left: `${getPercent(maxVal)}%`,
              transform: 'translateX(-50%)'
            }}
          >
            {formatLabel(maxVal)}
          </div>
        </div>
      </div>
    </div>
  );
};

RangeSelector.displayName = 'RangeSelector';
export default RangeSelector;
