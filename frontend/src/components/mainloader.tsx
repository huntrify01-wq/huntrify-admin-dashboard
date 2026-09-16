import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MainLoaderProps {
  size?: number; // Adjust the size in pixels
  className?: string; // Add custom colors or positioning
}

export const MainLoader: React.FC<MainLoaderProps> = ({ size = 32, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      // Default to primary theme color, but can be overridden with className
      className={cn("text-primary", className)}
    >
      <style>
        {`
          .ios-spinner-line {
            animation: ios-spinner-fade 1.2s linear infinite;
            stroke-linecap: round;
          }
          @keyframes ios-spinner-fade {
            0% { stroke-opacity: 1; }
            100% { stroke-opacity: 0.15; }
          }
        `}
      </style>
      <g stroke="currentColor" strokeWidth="1.25" fill="none">
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="12"
            y1="3.5"
            x2="12"
            y2="7.5"
            transform={`rotate(${i * 30} 12 12)`}
            className="ios-spinner-line"
            style={{ animationDelay: `${(i * 0.1) - 1.2}s` }}
          />
        ))}
      </g>
    </svg>
  );
};

export default MainLoader;
