import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  className?: string;
  searchPlaceholder?: string;
  itemsPerPage?: number;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  className,
  searchPlaceholder = "Search...",
  itemsPerPage = 10
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<keyof T | string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  // Filtering
  const filteredData = data.filter(item => {
    if (!searchTerm) return true;
    return Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Sorting
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey as keyof T];
    const bVal = b[sortKey as keyof T];
    
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: keyof T | string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  return (
    <div className={cn("flex flex-col w-full bg-surface border border-border-main rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] overflow-hidden", className)}>
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-border-main gap-4">
        <div className="relative w-full sm:w-64">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-text-sec" />
          <input 
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 bg-bg border border-border-main rounded-lg text-sm text-text-main focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="text-sm text-text-sec">
          Showing {Math.min(filteredData.length, (currentPage - 1) * itemsPerPage + 1)} to {Math.min(filteredData.length, currentPage * itemsPerPage)} of {filteredData.length} entries
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-bg/50 border-b border-border-main">
              {columns.map((col, idx) => (
                <th 
                  key={String(col.key) + idx}
                  className={cn(
                    "px-4 py-3 text-xs font-semibold text-text-sec uppercase tracking-wider",
                    col.sortable ? "cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors select-none" : ""
                  )}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      <i className={cn("ri-arrow-up-line transition-transform duration-200", sortDirection === 'desc' && "rotate-180")} />
                    )}
                    {col.sortable && sortKey !== col.key && (
                      <i className="ri-expand-up-down-line opacity-30" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIdx) => (
                <tr 
                  key={rowIdx} 
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    "border-b border-border-main last:border-0 transition-colors",
                    onRowClick ? "cursor-pointer hover:bg-black/5 dark:hover:bg-white/5" : "hover:bg-black/5 dark:hover:bg-white/5"
                  )}
                >
                  {columns.map((col, colIdx) => (
                    <td key={String(col.key) + colIdx} className="px-4 py-4 text-sm text-text-main whitespace-nowrap">
                      {col.render ? col.render(row) : (row as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-text-sec text-sm">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 border-t border-border-main bg-bg/30">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm font-medium text-text-main bg-surface border border-border-main rounded-md hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={cn(
                  "w-8 h-8 flex items-center justify-center text-sm rounded-md transition-colors",
                  currentPage === i + 1 
                    ? "bg-primary text-white font-medium" 
                    : "text-text-sec hover:bg-black/5 dark:hover:bg-white/5"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm font-medium text-text-main bg-surface border border-border-main rounded-md hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default DataTable;
