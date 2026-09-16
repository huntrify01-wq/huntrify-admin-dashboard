import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import Lenis from 'lenis';

// ─── Types ───────────────────────────────────────────────────────────────────

export type UserRole = 'admin' | 'recruiter' | 'jobseeker' | 'employer';

export interface SidebarNavItem {
  key: string;
  label: string;
  icon: string;
  activeIcon?: string;
  badge?: number;
  roles?: UserRole[];
  onClick?: () => void;
  href?: string;
}

export interface SidebarSection {
  title?: string;
  items: SidebarNavItem[];
}

export interface SidebarProps {
  sections: SidebarSection[];
  activeKey?: string;
  onSelect?: (key: string) => void;
  role?: UserRole;
  userName?: string;
  userAvatar?: string;
  userSubtitle?: string;
  defaultCollapsed?: boolean;
  className?: string;
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export const Sidebar: React.FC<SidebarProps> = ({
  sections,
  activeKey,
  onSelect,
  role,
  userName = 'User',
  userAvatar,
  userSubtitle,
  defaultCollapsed = false,
  className,
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollWrapperRef.current || !scrollContentRef.current) return;
    
    // Add same heavy lenis smooth scroll specifically to the sidebar
    const lenis = new Lenis({
      wrapper: scrollWrapperRef.current,
      content: scrollContentRef.current,
      lerp: 0.03, // 3x heavier
      wheelMultiplier: 1.2,
      smoothWheel: true,
      syncTouch: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Filter items by role
  const filteredSections = sections
    .map(section => ({
      ...section,
      items: section.items.filter(
        item => !item.roles || !role || item.roles.includes(role)
      ),
    }))
    .filter(s => s.items.length > 0);

  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 248 }}
      initial={{ width: collapsed ? 68 : 248 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        'relative flex flex-col h-full bg-surface border-r border-border-main overflow-hidden shrink-0',
        className
      )}
    >
      {/* ── Logo Row ─────────────────────────────────────────────────── */}
      <div className="flex items-center h-16 px-3 border-b border-border-main shrink-0 gap-2">
        {/* Logo icon — always visible */}
        <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-primary/10">
          <img src="/logo/logo-icon.png" alt="Logo" className="w-6 h-6 object-contain" />
        </div>

        {/* Full wordmark — fades out when collapsed */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              key="wordmark"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
              className="flex-1 overflow-hidden whitespace-nowrap min-w-0"
            >
              <img
                src="/logo/dark-logo.png"
                alt="Huntrify"
                className="h-5 object-contain hidden dark:block"
              />
              <img
                src="/logo/light-logo.png"
                alt="Huntrify"
                className="h-5 object-contain dark:hidden"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse toggle */}
        <motion.button
          onClick={() => setCollapsed(c => !c)}
          whileTap={{ scale: 0.88 }}
          className="ml-auto shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-text-sec hover:text-text-main hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none"
        >
          <motion.span
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="flex items-center justify-center"
          >
            <i className="ri-sidebar-unfold-line text-[18px] leading-none" />
          </motion.span>
        </motion.button>
      </div>

      {/* ── Nav Sections ──────────────────────────────────────────────── */}
      <div 
        ref={scrollWrapperRef}
        className="flex flex-col flex-1 gap-1 py-3 px-2 overflow-y-auto overflow-x-hidden"
        onWheel={(e) => e.stopPropagation()}
      >
        <div ref={scrollContentRef} className="flex flex-col gap-1 min-h-max pb-4">
          {filteredSections.map((section, si) => (
            <div key={si} className="flex flex-col gap-0.5">
              {/* Section title */}
              <AnimatePresence>
                {!collapsed && section.title && (
                  <motion.p
                    key={`title-${si}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="px-3 pt-2 pb-1 text-[10px] font-bold tracking-widest uppercase text-text-sec select-none"
                  >
                    {section.title}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Items */}
              {section.items.map(item => {
                const isActive = activeKey === item.key;
                const icon = isActive && item.activeIcon ? item.activeIcon : item.icon;

                return (
                <button
                  key={item.key}
                  onClick={() => { onSelect?.(item.key); item.onClick?.(); }}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    'group relative flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-left transition-colors duration-150 focus:outline-none',
                    isActive
                      ? 'bg-primary text-white shadow-[0_4px_12px_-2px_rgba(48,16,254,0.35)]'
                      : 'text-text-sec hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5'
                  )}
                >
                  {/* Icon */}
                  <i className={cn(icon, 'shrink-0 text-[20px] leading-none')} />

                  {/* Label */}
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        key={`label-${item.key}`}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -6 }}
                        transition={{ duration: 0.18 }}
                        className="flex-1 text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Badge */}
                  {item.badge != null && item.badge > 0 && (
                    <span
                      className={cn(
                        'shrink-0 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold flex items-center justify-center leading-none',
                        isActive ? 'bg-white/25 text-white' : 'bg-primary text-white',
                        collapsed
                          ? 'absolute top-1.5 right-1.5 min-w-[14px] h-[14px] text-[8px] px-0.5'
                          : ''
                      )}
                    >
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Divider between sections */}
            {si < filteredSections.length - 1 && (
              <div className="mx-3 mt-2 h-px bg-border-main/60" />
            )}
          </div>
        ))}
        </div>
      </div>

      {/* ── User Footer ───────────────────────────────────────────────── */}
      <div className="shrink-0 border-t border-border-main px-2 py-3">
        <div
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer',
            collapsed && 'justify-center px-2'
          )}
        >
          {/* Avatar */}
          <div className="shrink-0 w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center overflow-hidden">
            {userAvatar ? (
              <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-primary text-sm font-bold">
                {userName[0]?.toUpperCase()}
              </span>
            )}
          </div>

          {/* Name + subtitle */}
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                key="user-info"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.18 }}
                className="flex-1 overflow-hidden min-w-0"
              >
                <p className="text-sm font-semibold text-text-main leading-tight truncate">
                  {userName}
                </p>
                {userSubtitle && (
                  <p className="text-[11px] text-text-sec leading-tight truncate">
                    {userSubtitle}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Settings icon */}
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                key="settings-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="shrink-0 text-text-sec"
              >
                <i className="ri-settings-3-line text-[16px] leading-none" />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
