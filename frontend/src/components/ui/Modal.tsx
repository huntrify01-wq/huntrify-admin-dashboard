import React, { useEffect } from 'react';
import { cn } from '../../utils/cn';
import AnimatedCross from '../animatedicons/cross';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import OnlyIconButton from '../button/OnlyIconButton';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  className,
  maxWidth = 'md'
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-[95vw]'
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className={cn(
              "relative w-full bg-surface rounded-2xl shadow-2xl border border-border-main overflow-hidden flex flex-col max-h-[90vh]",
              maxWidthClasses[maxWidth],
              className
            )}
          >
            {/* Header */}
            {(title || description) && (
              <div className="px-6 py-5 border-b border-border-main">
                <div className="flex items-start justify-between">
                  <div>
                    {title && <h3 className="text-lg font-semibold text-text-main">{title}</h3>}
                    {description && <p className="mt-1 text-sm text-text-sec">{description}</p>}
                  </div>
                  <OnlyIconButton 
                    onClick={onClose} 
                    variant="ghost" 
                    size="sm" 
                    className="rounded-full text-text-sec hover:text-text-main" 
                  >
                    <AnimatedCross size={18} />
                  </OnlyIconButton>
                </div>
              </div>
            )}

            {/* Body */}
            <div className="px-6 py-5 overflow-y-auto flex-1" data-lenis-prevent="true">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="px-6 py-4 border-t border-border-main bg-bg/50 flex items-center justify-end gap-3">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(modalContent, document.body);
};

export default Modal;
