import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../utils/cn';

export interface LogEntry {
  id: string | number;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
}

export interface LogViewerProps {
  logs: LogEntry[];
  height?: string;
  className?: string;
  title?: string;
  autoScroll?: boolean;
}

export const LogViewer: React.FC<LogViewerProps> = ({
  logs,
  height = "h-80",
  className,
  title = "System Logs",
  autoScroll = true
}) => {
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const handleCopy = () => {
    const text = logs.map(l => `[${l.timestamp}] [${l.level.toUpperCase()}] ${l.message}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-400';
      case 'warn': return 'text-yellow-400';
      case 'debug': return 'text-gray-500';
      case 'info':
      default: return 'text-blue-400';
    }
  };

  return (
    <div className={cn("flex flex-col bg-[#0D0D12] border border-gray-800 rounded-xl overflow-hidden shadow-xl", className)}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-[#1A1A24]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-2 text-xs font-mono text-gray-400">{title}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="text-xs font-mono text-gray-400 hover:text-white transition-colors flex items-center gap-1 focus:outline-none"
        >
          {copied ? <i className="ri-check-line text-green-400" /> : <i className="ri-file-copy-line" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Log Output Area */}
      <div 
        ref={scrollRef}
        className={cn("p-4 overflow-y-auto font-mono text-[13px] leading-relaxed", height)}
      >
        {logs.length === 0 ? (
          <div className="text-gray-500 italic">Waiting for logs...</div>
        ) : (
          <div className="flex flex-col gap-1">
            {logs.map((log) => (
              <div key={log.id} className="flex gap-3 hover:bg-white/5 px-2 py-1 rounded transition-colors break-words">
                <span className="text-gray-500 shrink-0 select-none">
                  [{log.timestamp}]
                </span>
                <span className={cn("font-semibold shrink-0 uppercase w-12", getLevelColor(log.level))}>
                  {log.level}
                </span>
                <span className="text-gray-300 whitespace-pre-wrap">
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LogViewer;
