import React from 'react';
import { cn } from '../../utils/cn';
import AnimatedCross from '../animatedicons/cross';
import { toast as sonnerToast } from 'sonner';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string | number;
  variant?: 'info' | 'success' | 'error';
  title: string;
  description?: string;
  onClose?: () => void;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(({ 
  variant = 'info', 
  title, 
  description, 
  onClose,
  className,
  ...props
}, ref) => {
  const icons = {
    info: 'ri-information-fill text-primary',
    success: 'ri-checkbox-circle-fill text-success',
    error: 'ri-error-warning-fill text-error'
  };

  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-auto flex w-[350px] overflow-hidden rounded-xl bg-surface",
        "border border-border-main shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]",
        className
      )}
      {...props}
    >
      <div className="flex w-full p-4 gap-3 relative overflow-hidden">
        {/* Subtle Background Glow based on variant */}
        <div className={cn(
          "absolute top-0 left-0 w-1 h-full",
          variant === 'info' && "bg-primary",
          variant === 'success' && "bg-success",
          variant === 'error' && "bg-error"
        )} />

        {/* Icon */}
        <div className="shrink-0 flex items-start pt-[1px] pl-2">
          <i className={cn("text-[20px] leading-none", icons[variant])} />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-1.5 pt-[3px]">
          <h3 className="text-[14px] font-semibold text-text-main leading-none tracking-tight">
            {title}
          </h3>
          {description && (
            <p className="text-[13px] text-text-sec leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Close Button */}
        {onClose && (
          <div className="shrink-0 flex items-start">
            <button
              onClick={onClose}
              className="p-1 rounded-md text-text-sec hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none"
            >
              <AnimatedCross size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

Toast.displayName = 'Toast';

// Helper function to trigger our custom toast using Sonner
export const showToast = (props: Omit<ToastProps, 'onClose'>) => {
  sonnerToast.custom((t) => (
    <Toast 
      {...props} 
      onClose={() => sonnerToast.dismiss(t)} 
    />
  ), {
    duration: 4000,
  });
};

export default Toast;
