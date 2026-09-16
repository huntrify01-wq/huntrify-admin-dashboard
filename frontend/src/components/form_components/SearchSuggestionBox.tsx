import React from 'react';
import { cn } from '../../utils/cn';

export interface SearchSuggestion {
  id: string | number;
  label: string;
  icon?: string;
  category?: string;
}

export interface SearchSuggestionBoxProps {
  suggestions: SearchSuggestion[];
  onSelect: (suggestion: SearchSuggestion) => void;
  isLoading?: boolean;
  isVisible: boolean;
  recentSearches?: string[];
  onSelectRecent?: (query: string) => void;
  className?: string;
}

export const SearchSuggestionBox: React.FC<SearchSuggestionBoxProps> = ({
  suggestions,
  onSelect,
  isLoading,
  isVisible,
  recentSearches = [],
  onSelectRecent,
  className
}) => {
  if (!isVisible) return null;

  // Group suggestions by category
  const groupedSuggestions = suggestions.reduce((acc, curr) => {
    const cat = curr.category || 'Suggestions';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(curr);
    return acc;
  }, {} as Record<string, SearchSuggestion[]>);

  return (
    <div 
      className={cn(
        "absolute top-[calc(100%+8px)] left-0 w-full bg-surface border border-border-main rounded-xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden z-50",
        "animate-in fade-in zoom-in-95 duration-200",
        className
      )}
    >
      {isLoading ? (
        <div className="flex items-center justify-center p-8 text-text-sec">
          <i className="ri-loader-4-line animate-spin text-primary text-2xl mr-2" />
          <span className="text-sm">Searching...</span>
        </div>
      ) : suggestions.length === 0 && recentSearches.length === 0 ? (
        <div className="p-6 text-center text-sm text-text-sec">
          No results found.
        </div>
      ) : (
        <div className="max-h-[360px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-border-main" data-lenis-prevent="true">
          
          {/* Recent Searches */}
          {recentSearches.length > 0 && suggestions.length === 0 && (
            <div className="mb-2">
              <div className="px-3 py-2 text-xs font-bold tracking-wider text-text-sec uppercase">
                Recent Searches
              </div>
              {recentSearches.map((search, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectRecent?.(search)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-text-main hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <i className="ri-history-line text-text-sec" />
                    <span>{search}</span>
                  </div>
                  <i className="ri-arrow-right-up-line text-text-sec opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}

          {/* Grouped Suggestions */}
          {Object.entries(groupedSuggestions).map(([category, items]) => (
            <div key={category} className="mb-2 last:mb-0">
              <div className="px-3 py-2 text-xs font-bold tracking-wider text-text-sec uppercase">
                {category}
              </div>
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className="group w-full flex items-center justify-between px-3 py-2.5 text-sm text-text-main hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-bg border border-border-main flex items-center justify-center text-text-sec group-hover:text-primary group-hover:border-primary/30 transition-colors">
                      <i className={cn(item.icon || "ri-search-line", "text-[15px]")} />
                    </div>
                    <span className="font-medium group-hover:text-primary transition-colors">{item.label}</span>
                  </div>
                  <div className="flex items-center text-text-sec opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] mr-1">Select</span>
                    <i className="ri-corner-down-left-line text-xs" />
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchSuggestionBox;
