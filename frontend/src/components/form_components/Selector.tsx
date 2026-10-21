import React, { useState, useRef, useEffect } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SelectOption {
  label: string;
  value: string | number;
  icon?: string; // e.g. 'ri-user-line'
}

interface SelectProps {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  className?: string;
  id?: string;
  direction?: 'up' | 'down';
}

export const Selector = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ className, label, error, id, options, placeholder = "Select an option...", value, onChange, direction = 'down' }, ref) => {
    const selectId = id || React.useId();
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<string | number | undefined>(value);
    const containerRef = useRef<HTMLDivElement>(null);

    const currentValue = value !== undefined ? value : internalValue;
    const selectedOption = options.find((opt) => opt.value === currentValue);

    // Close on click outside
    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleOutsideClick);
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const handleSelect = (val: string | number) => {
      setInternalValue(val);
      onChange?.(val);
      setIsOpen(false);
    };

    return (
      <div className="flex flex-col w-full" ref={containerRef}>
        <div className="relative w-full" ref={ref}>
          {/* Custom Trigger Button acting as the input wrapper */}
          <button
            type="button"
            id={selectId}
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'w-full h-[48px] bg-transparent outline-none border rounded-[var(--radius-input)] px-3.5 text-[14px] transition-all duration-200 cursor-pointer flex items-center justify-between',
              isOpen 
                ? 'border-primary shadow-[0_0_10px_rgba(83,58,253,0.1)]' 
                : 'border-border-main hover:border-text-main/30 hover:bg-text-main/[0.02]',
              error && 'border-error hover:border-error',
              className
            )}
          >
            <div className="flex items-center gap-2 overflow-hidden w-full">
              {selectedOption?.icon && <i className={cn(selectedOption.icon, "text-[18px] text-primary")} />}
              <span className={cn("block truncate text-[14px]", !selectedOption ? "opacity-0" : "text-text-main")}>
                {selectedOption ? selectedOption.label : placeholder}
              </span>
            </div>
            <i className={cn("ri-arrow-down-s-line text-xl text-text-sec transition-transform duration-300 ml-2", isOpen && "rotate-180")} />
          </button>
          
          {/* Floating Label */}
          {label && (
            <label 
              className={cn(
                "absolute left-3 px-1.5 bg-surface transition-all duration-200 pointer-events-none select-none rounded-full",
                (isOpen || selectedOption) 
                  ? "top-0 -translate-y-1/2 text-[11px]" 
                  : "top-1/2 -translate-y-1/2 text-[14px]",
                isOpen ? "text-primary" : "text-text-sec",
                error && "text-error"
              )}
            >
              {label}
            </label>
          )}

          {/* Dropdown Menu */}
          {isOpen && (
            <div className={cn(
              "absolute z-50 w-full bg-bg border border-border-main rounded-[var(--radius-btn)] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] max-h-60 overflow-auto py-2 animate-in fade-in duration-200",
              direction === 'up' ? "bottom-full mb-2 origin-bottom slide-in-from-bottom-2" : "top-full mt-2 origin-top slide-in-from-top-2"
            )}>
              <ul className="flex flex-col">
                {options.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      "group relative flex items-center gap-2.5 cursor-pointer select-none py-2 px-3 mx-2 rounded-md text-[14px] transition-all duration-200 active:scale-[0.98]",
                      currentValue === option.value 
                        ? "text-primary font-medium bg-primary/10" 
                        : "text-text-main hover:bg-primary/10 hover:text-primary hover:pl-4"
                    )}
                  >
                    {option.icon && (
                      <i className={cn(
                        option.icon, 
                        "text-[18px] transition-colors", 
                        currentValue === option.value 
                          ? "text-primary" 
                          : "text-text-sec group-hover:text-primary"
                      )} />
                    )}
                    <span className="flex-1 truncate">{option.label}</span>
                    
                    {currentValue === option.value && (
                      <i className="ri-check-line text-primary text-lg ml-2" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {error && <span className="text-[11px] text-error mt-1 pl-1 truncate">{error}</span>}
      </div>
    );
  }
);

Selector.displayName = 'Selector';
export default Selector;
