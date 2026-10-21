import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import MainLoader from '../mainloader';
import AnimatedCross from '../animatedicons/cross';

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
  onClear?: () => void;
  isLoading?: boolean;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(({
  className,
  value,
  onChange,
  onSearch,
  onClear,
  isLoading,
  placeholder = "Search...",
  ...props
}, ref) => {
  const hasValue = typeof value === 'string' && value.length > 0;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch && typeof value === 'string') {
      onSearch(value);
    }
    props.onKeyDown?.(e);
  };

  return (
    <div className={cn("relative flex items-center w-full", className)}>
      <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-text-sec text-lg pointer-events-none" />
      
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "w-full bg-surface border border-border-main text-text-main placeholder-text-sec text-sm rounded-xl",
          "pl-11 pr-10 py-2 h-10",
          "transition-all duration-200 ease-in-out",
          "focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-text-sec/30"
        )}
        {...props}
      />

      {/* Loading Spinner or Clear Button */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
        {isLoading ? (
          <MainLoader size={20} className="text-primary" />
        ) : hasValue ? (
          <button
            type="button"
            onClick={onClear}
            className="text-text-sec hover:text-text-main transition-colors focus:outline-none p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center"
          >
            <AnimatedCross size={16} />
          </button>
        ) : (
          <div className="flex items-center justify-center h-6 px-1.5 rounded bg-bg border border-border-main text-[10px] font-medium text-text-sec font-mono opacity-70 select-none">
            ⌘K
          </div>
        )}
      </div>
    </div>
  );
});

SearchBar.displayName = "SearchBar";

export default SearchBar;
