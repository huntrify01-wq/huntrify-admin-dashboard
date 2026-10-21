import React, { useState, useRef, useEffect } from 'react';

export interface DateRangeSelectorProps {
  value?: string;
  onChange?: (val: string) => void;
  options?: { label: string, value: string }[];
  showIcon?: boolean;
}

const defaultOptions = [
  { label: 'Today', value: 'today' },
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' },
  { label: 'Last 6 Months', value: '6m' },
  { label: 'This Year', value: '1y' },
  { label: 'Custom Range', value: 'custom' },
];

const DateRangeSelector = ({ 
  value = '30d', 
  onChange, 
  options = defaultOptions,
  showIcon = true
}: DateRangeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find(opt => opt.value === selectedValue)?.label || 'Select Date Range';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    setSelectedValue(val);
    if (onChange) onChange(val);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 min-w-[110px] sm:min-w-[140px] rounded-xl border border-border-main text-xs sm:text-[13px] font-semibold text-text-main hover:bg-surface-hover transition-colors bg-surface shadow-sm"
      >
        <div className="flex items-center gap-2 whitespace-nowrap">
           {showIcon && <i className="ri-calendar-2-line text-text-main text-lg shrink-0" />}
           <span className="truncate">{selectedLabel}</span>
        </div>
        <i className={`ri-arrow-down-s-line text-text-sec text-lg shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-full min-w-[160px] bg-surface border border-border-main rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="py-1">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`w-full text-left px-4 py-2 text-[13px] font-medium transition-colors ${
                  selectedValue === opt.value 
                    ? 'bg-primary/10 text-primary font-bold' 
                    : 'text-text-main hover:bg-surface-hover hover:text-text-main'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;
