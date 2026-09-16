import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils/cn';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  error?: string;
  maxLength?: number;
  showCount?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, description, error, className, maxLength, showCount = false, onChange, ...props }, ref) => {
    const [charCount, setCharCount] = useState(
      props.value ? String(props.value).length : (props.defaultValue ? String(props.defaultValue).length : 0)
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="flex flex-col w-full font-sans">
        {/* Label & Top Meta */}
        <div className="flex justify-between items-end mb-1.5">
          {label && (
            <label className="text-[13px] font-medium text-text-main">
              {label} {props.required && <span className="text-error">*</span>}
            </label>
          )}
          {(showCount && maxLength) && (
            <span className={cn(
              "text-[11px]",
              charCount >= maxLength ? "text-error" : "text-text-sec"
            )}>
              {charCount} / {maxLength}
            </span>
          )}
        </div>
        
        {/* Description */}
        {description && (
          <p className="text-[12px] text-text-sec mb-2">
            {description}
          </p>
        )}

        {/* Textarea Wrapper */}
        <div className="relative group">
          <textarea
            ref={ref}
            onChange={handleChange}
            maxLength={maxLength}
            className={cn(
              "w-full px-3 py-2.5 bg-surface text-text-main text-[14px]",
              "border border-border-main rounded-xl outline-none transition-all duration-300",
              "placeholder:text-muted placeholder:text-[14px]",
              "focus:border-primary focus:ring-4 focus:ring-primary/10",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "resize-y min-h-[100px]",
              error && "border-error focus:border-error focus:ring-error/10",
              className
            )}
            {...props}
          />
        </div>

        {/* Error Message */}
        {error && (
          <span className="text-[11px] text-error mt-1 pl-1 truncate">
            {error}
          </span>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
export default TextArea;
