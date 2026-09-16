import React, { useEffect } from 'react';
import { cn } from '../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import OnlyIconButton from '../button/OnlyIconButton';
import AnimatedCross from '../animatedicons/cross';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  side?: 'left' | 'right';
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  side = 'right',
  className
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const slideVariants = {
    hidden: { x: side === 'right' ? '100%' : '-100%' },
    visible: { x: 0 },
    exit: { x: side === 'right' ? '100%' : '-100%' }
  };

  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Panel */}
          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className={cn(
              "absolute top-0 bottom-0 flex flex-col w-full max-w-md bg-surface shadow-2xl border-x border-border-main",
              side === 'right' ? 'right-0' : 'left-0',
              className
            )}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-border-main flex items-start justify-between bg-surface">
              <div>
                {title && <h3 className="text-lg font-semibold text-text-main">{title}</h3>}
                {description && <p className="mt-1 text-sm text-text-sec">{description}</p>}
              </div>
              <OnlyIconButton 
                onClick={onClose} 
                variant="ghost" 
                size="sm" 
                className="-mr-2 rounded-full text-text-sec hover:text-text-main" 
              >
                <AnimatedCross size={18} />
              </OnlyIconButton>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6" data-lenis-prevent="true">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="px-6 py-4 border-t border-border-main bg-bg/50">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(drawerContent, document.body);
};

export default Drawer;
