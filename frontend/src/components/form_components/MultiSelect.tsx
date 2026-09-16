import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
import AnimatedCross from '../animatedicons/cross';

export interface Option {
  label: string;
  value: string;
}

export interface MultiSelectProps {
  label?: string;
  options: Option[];
  selected: Option[];
  onChange: (selected: Option[]) => void;
  placeholder?: string;
  className?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSelect = (option: Option) => {
    if (!selected.some(item => item.value === option.value)) {
      onChange([...selected, option]);
    }
    setQuery("");
  };

  const handleRemove = (e: React.MouseEvent, optionToRemove: Option) => {
    e.stopPropagation();
    onChange(selected.filter(item => item.value !== optionToRemove.value));
  };

  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(query.toLowerCase()) &&
    !selected.some(sel => sel.value === opt.value)
  );

  return (
    <div className={cn("flex flex-col w-full font-sans relative", className)} ref={containerRef}>
      {label && (
        <label className="text-[13px] font-medium text-text-main mb-1.5">
          {label}
        </label>
      )}

      {/* Input / Tags Area */}
      <div 
        className={cn(
          "flex flex-wrap items-center min-h-[44px] gap-2 p-2 bg-surface border rounded-xl cursor-text transition-all duration-200",
          isOpen ? "border-primary ring-4 ring-primary/10" : "border-border-main hover:border-primary/50"
        )}
        onClick={() => setIsOpen(true)}
      >
        {selected.map(item => (
          <span 
            key={item.value} 
            className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 dark:bg-[#b3a4ff]/10 text-primary dark:text-[#b3a4ff] rounded-lg text-[13px] font-medium transition-colors"
            onClick={(e) => handleRemove(e, item)}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 dark:bg-[#b3a4ff]/10 text-primary dark:text-[#b3a4ff] rounded-lg text-[13px] font-medium transition-colors cursor-pointer"
          >
            <span className="truncate max-w-[80px] sm:max-w-[120px]">{item.label}</span>
            <AnimatedCross size={14} />
          </span>
        ))}
        
        <input 
          type="text"
          className="flex-1 min-w-[120px] bg-transparent outline-none text-[14px] text-text-main placeholder:text-muted py-1"
          placeholder={selected.length === 0 ? placeholder : ""}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        
        <div className="px-2 text-muted">
          <i className={cn("ri-arrow-down-s-line transition-transform duration-200", isOpen && "rotate-180")} />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-[100%] left-0 right-0 mt-2 p-1.5 bg-card border border-border-main rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto" data-lenis-prevent="true">
          {filteredOptions.length > 0 ? (
            filteredOptions.map(option => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className="px-3 py-2 text-[14px] text-text-main hover:bg-primary/10 dark:hover:bg-[#b3a4ff]/10 hover:text-primary dark:hover:text-[#b3a4ff] rounded-lg cursor-pointer transition-colors font-medium"
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="px-3 py-4 text-center text-[13px] text-text-sec">
              No options found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
