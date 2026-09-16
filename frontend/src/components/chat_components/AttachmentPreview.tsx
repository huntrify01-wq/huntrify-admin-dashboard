import React from 'react';
import { cn } from '../../utils/cn';
import AnimatedCross from '../animatedicons/cross';

export interface AttachmentPreviewProps {
  fileName: string;
  fileSize: string;
  fileType: 'pdf' | 'image' | 'doc' | 'other';
  thumbnailUrl?: string;
  progress?: number; // 0 to 100. If undefined, upload is considered complete
  onRemove: () => void;
  className?: string;
}

export const AttachmentPreview: React.FC<AttachmentPreviewProps> = ({
  fileName,
  fileSize,
  fileType,
  thumbnailUrl,
  progress,
  onRemove,
  className
}) => {
  const isUploading = progress !== undefined && progress < 100;

  // Render the icon or thumbnail based on file type
  const renderPreviewBox = () => {
    if (fileType === 'image' && thumbnailUrl) {
      return (
        <img 
          src={thumbnailUrl} 
          alt={fileName} 
          className="w-10 h-10 rounded-lg object-cover shrink-0 border border-border-main"
        />
      );
    }
    
    if (fileType === 'pdf') {
      return (
        <div className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center bg-error text-white font-bold text-[10px] tracking-wider relative overflow-hidden">
          <div className="absolute top-0 right-0 w-3 h-3 bg-white/20 rounded-bl-lg" />
          PDF
        </div>
      );
    }

    // Default Document Icon
    return (
      <div className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center bg-surface border border-border-main text-text-sec">
        <i className="ri-file-text-line text-lg" />
      </div>
    );
  };

  return (
    <div className={cn(
      "flex items-center gap-3 p-2.5 bg-surface border border-border-main rounded-2xl relative overflow-hidden group",
      className
    )}>
      {/* File Icon / Thumbnail */}
      {renderPreviewBox()}

      {/* File Info */}
      <div className="flex-1 flex flex-col min-w-0 pr-2">
        <span className="text-[14px] font-medium text-text-main truncate">
          {fileName}
        </span>
        
        {/* Subtitle & Progress */}
        <div className="flex items-center justify-between gap-3 mt-0.5">
          <span className="text-[11px] text-text-sec shrink-0 uppercase tracking-wide">
            {fileSize} &bull; {fileType}
          </span>
          
          {/* Upload Progress Bar */}
          {isUploading && (
            <div className="flex items-center gap-2 flex-1 ml-2">
              <div className="h-1 flex-1 bg-bg rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300 rounded-full" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
              <span className="text-[10px] font-medium text-text-main shrink-0 w-7 text-right">
                {progress}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Remove Button */}
        <button
          onClick={onRemove}
          className="shrink-0 w-8 h-8 flex items-center justify-center text-text-sec hover:text-error hover:bg-error/10 rounded-xl transition-colors focus:outline-none"
          title="Remove attachment"
        >
          <AnimatedCross size={18} />
        </button>
    </div>
  );
};

export default AttachmentPreview;
