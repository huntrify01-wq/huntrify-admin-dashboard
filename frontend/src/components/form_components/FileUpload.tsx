import React, { useState, useRef, useCallback } from 'react';
import { cn } from '../../utils/cn';

export interface FileUploadProps {
  label?: string;
  description?: string;
  accept?: string;
  maxSizeMB?: number;
  onFileSelect?: (file: File | null) => void;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  description = "Drag & drop your file here, or click to browse",
  accept,
  maxSizeMB = 5,
  onFileSelect,
  className
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateAndSetFile = (selectedFile: File) => {
    setError(null);
    if (maxSizeMB && selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit.`);
      return;
    }
    
    // Check accept if needed, but input[accept] usually handles this on click.
    // For drag and drop, we could strictly validate mime types, but we'll skip for simplicity.
    
    setFile(selectedFile);
    if (onFileSelect) onFileSelect(selectedFile);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  }, [maxSizeMB, onFileSelect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (onFileSelect) onFileSelect(null);
  };

  return (
    <div className={cn("flex flex-col w-full font-sans", className)}>
      {label && (
        <label className="text-[13px] font-medium text-text-main mb-1.5">
          {label}
        </label>
      )}

      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center w-full px-6 py-8",
          "border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200",
          "bg-surface",
          isDragging ? "border-primary bg-primary/5" : "border-border-main hover:border-primary/50 hover:bg-surface/80",
          error && "border-error bg-error/5"
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleChange}
          accept={accept}
          className="hidden"
        />

        {!file ? (
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 mb-3 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <i className="ri-upload-cloud-2-line text-2xl" />
            </div>
            <p className="text-[14px] font-medium text-text-main mb-1">Upload a file</p>
            <p className="text-[12px] text-text-sec">{description}</p>
            {maxSizeMB && <p className="text-[11px] text-muted mt-2">Max size: {maxSizeMB}MB</p>}
          </div>
        ) : (
          <div className="flex items-center justify-between w-full max-w-sm p-3 bg-bg border border-border-main rounded-lg">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="shrink-0 w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                <i className="ri-file-line text-xl" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-medium text-text-main truncate">{file.name}</span>
                <span className="text-[11px] text-text-sec">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="shrink-0 w-10 h-10 flex items-center justify-center rounded bg-error/10 text-error hover:bg-error hover:text-white transition-colors"
            >
              <i className="ri-delete-bin-line text-lg" />
            </button>
          </div>
        )}
      </div>
      
      {error && (
        <span className="text-[11px] text-error mt-2 pl-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default FileUpload;
