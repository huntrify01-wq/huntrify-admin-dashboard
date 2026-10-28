import React, { useState, useRef, useEffect } from 'react';
import Modal from './Modal';
import SecondaryButton from '../button/SecondaryButton';
import { showToast } from './Toast';

export interface DateRangeSelectorProps {
  value?: string;
  onChange?: (val: string, customRange?: { startDate: string; endDate: string }) => void;
  options?: { label: string; value: string }[];
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

const toDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getDaysBetween = (start: string, end: string): number => {
  if (!start || !end) return 0;
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  const diff = Math.round((e - s) / (1000 * 60 * 60 * 24)) + 1;
  return diff > 0 ? diff : 0;
};

const formatRangeLabel = (start: string, end: string): string => {
  if (!start || !end) return 'Custom Range';
  const [sY, sM, sD] = start.split('-').map(Number);
  const [eY, eM, eD] = end.split('-').map(Number);
  const startDate = new Date(sY, sM - 1, sD);
  const endDate = new Date(eY, eM - 1, eD);

  const startMonth = startDate.toLocaleDateString('en-US', { month: 'short' });
  const endMonth = endDate.toLocaleDateString('en-US', { month: 'short' });

  if (sY === eY) {
    if (sM === eM && sD === eD) {
      return `${startMonth} ${sD}, ${sY}`;
    }
    return `${startMonth} ${sD} – ${endMonth} ${eD}, ${sY}`;
  }
  return `${startMonth} ${sD}, ${sY} – ${endMonth} ${eD}, ${eY}`;
};

const getPresetDates = (preset: string) => {
  const today = new Date();
  const endStr = toDateString(today);

  if (preset === '7d') {
    const d = new Date(today);
    d.setDate(d.getDate() - 6);
    return { start: toDateString(d), end: endStr };
  }
  if (preset === '14d') {
    const d = new Date(today);
    d.setDate(d.getDate() - 13);
    return { start: toDateString(d), end: endStr };
  }
  if (preset === '30d') {
    const d = new Date(today);
    d.setDate(d.getDate() - 29);
    return { start: toDateString(d), end: endStr };
  }
  if (preset === 'thisMonth') {
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    return { start: toDateString(start), end: endStr };
  }
  if (preset === 'lastMonth') {
    const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const end = new Date(today.getFullYear(), today.getMonth(), 0);
    return { start: toDateString(start), end: toDateString(end) };
  }
  if (preset === 'ytd') {
    const start = new Date(today.getFullYear(), 0, 1);
    return { start: toDateString(start), end: endStr };
  }
  return { start: endStr, end: endStr };
};

const DateRangeSelector = ({ 
  value = '30d', 
  onChange, 
  options = defaultOptions,
  showIcon = true
}: DateRangeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  // Default custom range: last 30 days up to today
  const [customRange, setCustomRange] = useState<{ startDate: string; endDate: string }>(() => {
    const today = new Date();
    const past = new Date(today);
    past.setDate(past.getDate() - 29);
    return {
      startDate: toDateString(past),
      endDate: toDateString(today),
    };
  });

  // Modal draft inputs
  const [tempStartDate, setTempStartDate] = useState(customRange.startDate);
  const [tempEndDate, setTempEndDate] = useState(customRange.endDate);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value && value !== selectedValue) {
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = selectedValue === 'custom' && customRange.startDate && customRange.endDate
    ? formatRangeLabel(customRange.startDate, customRange.endDate)
    : (options.find(opt => opt.value === selectedValue)?.label || 'Select Date Range');

  const handleSelect = (val: string) => {
    if (val === 'custom') {
      setTempStartDate(customRange.startDate);
      setTempEndDate(customRange.endDate);
      setIsCustomModalOpen(true);
      setIsOpen(false);
      return;
    }

    setSelectedValue(val);
    if (onChange) onChange(val);
    setIsOpen(false);
  };

  const handleApplyCustomRange = () => {
    if (!tempStartDate || !tempEndDate || tempStartDate > tempEndDate) return;

    const newRange = { startDate: tempStartDate, endDate: tempEndDate };
    setCustomRange(newRange);
    setSelectedValue('custom');
    if (onChange) onChange('custom', newRange);
    setIsCustomModalOpen(false);

    showToast({
      title: 'Custom Range Applied',
      description: formatRangeLabel(tempStartDate, tempEndDate),
      variant: 'info',
    });
  };

  const handlePresetClick = (presetKey: string) => {
    const { start, end } = getPresetDates(presetKey);
    setTempStartDate(start);
    setTempEndDate(end);
  };

  const isRangeValid = tempStartDate && tempEndDate && tempStartDate <= tempEndDate;
  const daysSelected = isRangeValid ? getDaysBetween(tempStartDate, tempEndDate) : 0;
  const todayStr = toDateString(new Date());

  return (
    <>
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button 
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          title={selectedLabel}
          className="flex items-center justify-between gap-1 sm:gap-2 px-2.5 sm:px-3 py-1.5 min-w-[120px] sm:min-w-[145px] max-w-[240px] rounded-xl border border-border-main text-xs sm:text-[13px] font-semibold text-text-main hover:bg-border-main/50 hover:border-text-sec/30 transition-all duration-200 cursor-pointer active:scale-95 bg-surface shadow-sm"
        >
          <div className="flex items-center gap-2 truncate">
            {showIcon && <i className="ri-calendar-2-line text-text-main text-base shrink-0" />}
            <span className="truncate">{selectedLabel}</span>
          </div>
          <i className={`ri-arrow-down-s-line text-text-sec text-base shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-full min-w-[180px] bg-surface border border-border-main rounded-xl shadow-xl z-50 overflow-hidden py-1">
            {options.map((opt) => {
              const isSelected = selectedValue === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full text-left px-4 py-2 text-[13px] font-medium transition-colors cursor-pointer flex items-center justify-between ${
                    isSelected 
                      ? 'bg-primary/10 text-primary font-bold' 
                      : 'text-text-main hover:bg-border-main/50 hover:text-text-main'
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {opt.value === 'custom' && (
                    <i className="ri-calendar-event-line text-xs opacity-60 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Custom Date Range Modal */}
      <Modal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        title="Select Custom Date Range"
        description="Choose a starting and ending date to filter metrics and analytics."
        maxWidth="md"
        footer={
          <>
            <SecondaryButton
              type="button"
              onClick={() => setIsCustomModalOpen(false)}
              className="px-4 py-2 text-xs"
            >
              Cancel
            </SecondaryButton>
            <button
              type="button"
              disabled={!isRangeValid}
              onClick={handleApplyCustomRange}
              className="inline-flex items-center justify-center gap-1.5 rounded-[var(--radius-btn)] px-5 py-2 text-xs font-semibold bg-primary hover:bg-primary/90 text-white transition-all active:scale-95 cursor-pointer shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              <i className="ri-check-line font-bold" />
              Apply Range
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-5 py-1">
          {/* Quick Presets */}
          <div>
            <span className="text-[11px] font-bold text-text-sec uppercase tracking-wider block mb-2">
              Quick Shortcuts
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'Last 7 Days', key: '7d' },
                { label: 'Last 14 Days', key: '14d' },
                { label: 'Last 30 Days', key: '30d' },
                { label: 'This Month', key: 'thisMonth' },
                { label: 'Last Month', key: 'lastMonth' },
                { label: 'Year to Date', key: 'ytd' },
              ].map((preset) => (
                <button
                  key={preset.key}
                  type="button"
                  onClick={() => handlePresetClick(preset.key)}
                  className="px-2.5 py-1 rounded-lg border border-border-main bg-bg hover:bg-border-main/50 text-xs font-medium text-text-main transition-all cursor-pointer active:scale-95"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date Pickers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-main mb-1.5 flex items-center gap-1.5">
                <i className="ri-calendar-line text-primary" /> Starting Date
              </label>
              <input
                type="date"
                value={tempStartDate}
                max={tempEndDate || todayStr}
                onChange={(e) => setTempStartDate(e.target.value)}
                className="w-full bg-bg border border-border-main rounded-xl px-3 py-2 text-xs sm:text-[13px] font-medium text-text-main focus:outline-none focus:border-primary transition-colors shadow-sm cursor-pointer dark:[color-scheme:dark]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-main mb-1.5 flex items-center gap-1.5">
                <i className="ri-calendar-check-line text-primary" /> Ending Date
              </label>
              <input
                type="date"
                value={tempEndDate}
                min={tempStartDate}
                max={todayStr}
                onChange={(e) => setTempEndDate(e.target.value)}
                className="w-full bg-bg border border-border-main rounded-xl px-3 py-2 text-xs sm:text-[13px] font-medium text-text-main focus:outline-none focus:border-primary transition-colors shadow-sm cursor-pointer dark:[color-scheme:dark]"
              />
            </div>
          </div>

          {/* Summary / Validation Feedback */}
          {isRangeValid ? (
            <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs text-primary font-medium">
              <span className="flex items-center gap-1.5 truncate">
                <i className="ri-calendar-check-fill text-sm" />
                {formatRangeLabel(tempStartDate, tempEndDate)}
              </span>
              <span className="shrink-0 font-bold text-[11px] px-2 py-0.5 rounded-full bg-primary/10">
                {daysSelected} {daysSelected === 1 ? 'day' : 'days'}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-medium">
              <i className="ri-error-warning-fill text-base shrink-0" />
              <span>Starting date must be before or equal to ending date.</span>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default DateRangeSelector;
