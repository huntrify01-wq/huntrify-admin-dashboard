import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

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
  subItems?: { key: string; label: string; href?: string; onClick?: () => void }[];
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

// ─── Windows Taskbar Timing Constants ────────────────────────────────────────
const TRIGGER_REGION_WIDTH = 18;      // 18px trigger area along left edge
const MOUSE_HOVER_TIME = 400;         // 400ms intent delay parked on the left 18px edge
const EXIT_HIDE_DELAY = 50;           // 50ms exit hide delay once cursor leaves sidebar
const COLLAPSE_GRACE_DELAY = 1500;    // 1500ms grace hold to display collapsed bar before auto-hiding
const HIDE_ANIMATION_DURATION = 2.0;  // 2.0s (2000ms) slow, smooth hide animation
const SHOW_ANIMATION_DURATION = 0.28; // 280ms snappy pop-out animation

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
  const [isAutoHidden, setIsAutoHidden] = useState(defaultCollapsed);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  const intentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideStartTimeRef = useRef(0);
  const collapseGraceUntilRef = useRef(0);
  const isHoveringEdgeRef = useRef(false);
  const isMouseInsideSidebarRef = useRef(false);

  // Sync with defaultCollapsed prop (e.g. from settings / local storage)
  useEffect(() => {
    if (defaultCollapsed !== collapsed) {
      setCollapsed(defaultCollapsed);
      if (!defaultCollapsed) {
        setIsAutoHidden(false);
        clearHideTimer();
      }
    }
  }, [defaultCollapsed]);

  const clearIntentTimer = () => {
    if (intentTimerRef.current) {
      clearTimeout(intentTimerRef.current);
      intentTimerRef.current = null;
    }
  };

  const clearHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      clearIntentTimer();
      clearHideTimer();
    };
  }, []);

  // 1. Edge Enter Handler (starts 400ms intent timer or catches immediately if mid-hiding)
  const handleEdgeEnter = useCallback(() => {
    if (!collapsed || !isAutoHidden) return;
    clearHideTimer();
    clearIntentTimer();

    // If mid-hiding (within HIDE_ANIMATION_DURATION of hide initiating): catch immediately!
    const isMidHiding = (Date.now() - hideStartTimeRef.current) < (HIDE_ANIMATION_DURATION * 1000);
    if (isMidHiding) {
      setIsAutoHidden(false);
      return;
    }

    // Otherwise, sidebar is parked: require 400ms intent delay
    isHoveringEdgeRef.current = true;
    intentTimerRef.current = setTimeout(() => {
      setIsAutoHidden(false);
      isHoveringEdgeRef.current = false;
    }, MOUSE_HOVER_TIME);
  }, [collapsed, isAutoHidden]);

  // 2. Edge Leave Handler (cancels intent if cursor pulls away before 400ms)
  const handleEdgeLeave = useCallback(() => {
    isHoveringEdgeRef.current = false;
    clearIntentTimer();
  }, []);

  // 3. Mouse entered the 72px collapsed sidebar
  const handleSidebarMouseEnter = () => {
    isMouseInsideSidebarRef.current = true;
    clearHideTimer();
    clearIntentTimer();
    if (collapsed && isAutoHidden) {
      setIsAutoHidden(false);
    }
  };

  // 4. Mouse left the 72px collapsed sidebar (50ms exit delay, protected during post-collapse grace)
  const handleSidebarMouseLeave = () => {
    isMouseInsideSidebarRef.current = false;
    if (!collapsed) return;

    // If within post-collapse grace period, preserve the remaining grace time rather than cutting to 50ms
    const remainingGrace = collapseGraceUntilRef.current - Date.now();
    if (remainingGrace > 0) {
      clearHideTimer();
      hideTimerRef.current = setTimeout(() => {
        hideStartTimeRef.current = Date.now();
        setIsAutoHidden(true);
      }, remainingGrace);
      return;
    }

    clearHideTimer();
    hideTimerRef.current = setTimeout(() => {
      hideStartTimeRef.current = Date.now();
      setIsAutoHidden(true);
    }, EXIT_HIDE_DELAY);
  };

  // Global window mousemove fallback to guarantee 18px edge detection
  useEffect(() => {
    if (!collapsed || !isAutoHidden) return;

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (e.clientX <= TRIGGER_REGION_WIDTH) {
        const isMidHiding = (Date.now() - hideStartTimeRef.current) < (HIDE_ANIMATION_DURATION * 1000);
        if (isMidHiding) {
          clearHideTimer();
          clearIntentTimer();
          setIsAutoHidden(false);
        } else if (!isHoveringEdgeRef.current) {
          handleEdgeEnter();
        }
      } else if (isHoveringEdgeRef.current && e.clientX > TRIGGER_REGION_WIDTH) {
        handleEdgeLeave();
      }
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    return () => window.removeEventListener('mousemove', handleWindowMouseMove);
  }, [collapsed, isAutoHidden, handleEdgeEnter, handleEdgeLeave]);

  const handleToggleCollapse = () => {
    setCollapsed(prev => {
      const next = !prev;
      clearIntentTimer();
      clearHideTimer();

      if (typeof window !== 'undefined') {
        const pref = next ? 'collapsed' : 'expanded';
        localStorage.setItem('huntrify-sidebar-preference', pref);
        window.dispatchEvent(new CustomEvent('huntrify-sidebar-change', { detail: pref }));
      }

      if (next) {
        // Collapsing: keep visible as collapsed 72px icon bar for 1500ms grace hold, then slowly hide over 2s
        setIsAutoHidden(false);
        collapseGraceUntilRef.current = Date.now() + COLLAPSE_GRACE_DELAY;
        hideTimerRef.current = setTimeout(() => {
          if (!isMouseInsideSidebarRef.current) {
            hideStartTimeRef.current = Date.now();
            setIsAutoHidden(true);
          }
        }, COLLAPSE_GRACE_DELAY);
      } else {
        // Expanding: un-hide and pin to layout
        setIsAutoHidden(false);
        collapseGraceUntilRef.current = 0;
      }

      return next;
    });
  };

  const toggleExpand = (key: string) => {
    setExpandedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

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
    <>
      {/* ── 1. Edge Hit-Box Sensor (18px along extreme left screen boundary) ── */}
      {collapsed && isAutoHidden && (
        <div 
          className="fixed left-0 top-0 w-[18px] h-full z-[70] cursor-pointer pointer-events-auto"
          onMouseEnter={handleEdgeEnter}
          onMouseLeave={handleEdgeLeave}
          onTouchStart={handleEdgeEnter}
          title="Edge Sensor (hover to show sidebar)"
        />
      )}

      {/* ── 2. Constant Reserved Column in Layout (Never shifts main content) ─ */}
      <div 
        className={cn(
          "h-full shrink-0 relative transition-all duration-300 z-50",
          collapsed ? "w-[72px]" : "w-[240px]"
        )}
      >
        <motion.aside
          animate={{ 
            x: (collapsed && isAutoHidden) ? -76 : 0,
            opacity: (collapsed && isAutoHidden) ? 0 : 1
          }}
          initial={{ x: 0, opacity: 1 }}
          transition={{ 
            duration: (collapsed && isAutoHidden) ? HIDE_ANIMATION_DURATION : SHOW_ANIMATION_DURATION, 
            ease: [0.32, 0.72, 0, 1] 
          }}
          onMouseEnter={handleSidebarMouseEnter}
          onMouseLeave={handleSidebarMouseLeave}
          className={cn(
            "h-full lg:h-[calc(100vh-2rem)] lg:my-4 fixed lg:absolute left-0 top-0 z-[60] overflow-visible",
            collapsed ? "w-[72px]" : "w-[240px]",
            className
          )}
        >
          <div className="relative flex flex-col w-full h-full min-w-0 lg:rounded-[20px] lg:border lg:shadow-sm border-r border-border-main overflow-hidden z-10 bg-surface/90 backdrop-blur-xl">
            {/* Absolute Background for glass effect */}
            <div className="absolute inset-0 bg-surface/70 backdrop-blur-xl -z-10" />
            
            {/* ── Logo Row ─────────────────────────────────────────────────── */}
            <div className="flex items-center h-16 px-3 border-b border-border-main shrink-0 gap-2">
              <div className="flex-1 overflow-hidden flex items-center">
                {collapsed ? (
                  <motion.div
                    key="icon"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="shrink-0 flex items-center justify-center mx-auto"
                  >
                    <img src="/logo/logo-icon.png" alt="Logo" className="w-7 h-7 object-contain" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="wordmark"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.18 }}
                    className="flex-1 overflow-hidden whitespace-nowrap min-w-0 flex items-center pl-2"
                  >
                    <img
                      src="/logo/light-logo.png"
                      alt="Huntrify"
                      className="h-8 object-contain hidden dark:block"
                    />
                    <img
                      src="/logo/dark-logo.png"
                      alt="Huntrify"
                      className="h-8 object-contain dark:hidden"
                    />
                  </motion.div>
                )}
              </div>
            </div>

            {/* ── Nav Sections ──────────────────────────────────────────────── */}
            <div 
              ref={scrollWrapperRef}
              className="flex flex-col flex-1 gap-1 py-3 px-2 overflow-y-auto overflow-x-hidden"
              onWheel={(e) => e.stopPropagation()}
            >
              <div ref={scrollContentRef} className="flex flex-col gap-2 min-h-max pb-4">
                {filteredSections.map((section, si) => (
                  <div key={si} className="flex flex-col gap-1.5">
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
                      const isParentActive = activeKey === item.key || item.subItems?.some(s => s.key === activeKey) || item.subItems?.some(s => activeKey?.startsWith(s.key));
                      const icon = isParentActive && item.activeIcon ? item.activeIcon : item.icon;
                      const isExpanded = expandedItems[item.key] || isParentActive;

                      return (
                        <div key={item.key} className="flex flex-col">
                          <button
                            type="button"
                            onClick={() => {
                              if (item.subItems) {
                                toggleExpand(item.key);
                                if (collapsed) setCollapsed(false);
                              } else {
                                onSelect?.(item.key); 
                                item.onClick?.();
                              }
                            }}
                            title={collapsed ? item.label : undefined}
                            className={cn(
                              'group relative flex items-center transition-all duration-200 ease-in-out focus:outline-none cursor-pointer',
                              collapsed ? 'w-[42px] h-[42px] justify-center p-0 mx-auto rounded-2xl' : 'gap-3 w-full rounded-xl px-3 py-2.5 text-left',
                              isParentActive && !collapsed
                                ? 'bg-primary/10 text-primary font-bold'
                                : isParentActive && collapsed
                                  ? 'text-primary bg-primary/10'
                                  : 'text-text-sec hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5 font-medium'
                            )}
                          >
                            {/* Accent line for collapsed active */}
                            {isParentActive && collapsed && (
                              <motion.div 
                                layoutId="sidebar-accent" 
                                className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[22px] bg-primary rounded-r-md" 
                                initial={{ opacity: 0, scaleY: 0 }}
                                animate={{ opacity: 1, scaleY: 1 }}
                                exit={{ opacity: 0, scaleY: 0 }}
                                transition={{ duration: 0.2 }}
                              />
                            )}

                            {/* Icon */}
                            <i className={cn(icon, 'shrink-0 text-[20px] leading-none transition-transform duration-200', isParentActive && collapsed ? 'scale-110 text-primary' : '')} />

                            {/* Label */}
                            <AnimatePresence>
                              {!collapsed && (
                                <motion.span
                                  key={`label-${item.key}`}
                                  initial={{ opacity: 0, width: 0 }}
                                  animate={{ opacity: 1, width: 'auto' }}
                                  exit={{ opacity: 0, width: 0 }}
                                  transition={{ duration: 0.18 }}
                                  className="flex-1 text-[13px] whitespace-nowrap overflow-hidden text-ellipsis"
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
                                  isParentActive && !collapsed ? 'bg-primary/30 text-primary' : 'bg-red-500 text-white',
                                  collapsed
                                    ? 'absolute top-1.5 right-1.5 min-w-[14px] h-[14px] text-[8px] px-0.5 bg-red-500 text-white'
                                    : ''
                                )}
                              >
                                {item.badge > 99 ? '99+' : item.badge}
                              </span>
                            )}
                            
                            {/* Submenu Chevron */}
                            {!collapsed && item.subItems && (
                              <i className={cn("ri-arrow-right-s-line text-[16px] text-text-sec transition-transform duration-200", isExpanded && "rotate-90")} />
                            )}
                          </button>
                          
                          {/* Sub Items */}
                          <AnimatePresence>
                            {!collapsed && item.subItems && isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="flex flex-col gap-0.5 overflow-hidden mt-1 pl-[38px] pr-2"
                              >
                                {item.subItems.map(subItem => {
                                  const isSubActive = activeKey === subItem.key;
                                  return (
                                    <button
                                      key={subItem.key}
                                      type="button"
                                      onClick={() => { onSelect?.(subItem.key); subItem.onClick?.(); }}
                                      className={cn(
                                        "flex items-center gap-2.5 w-full px-3 py-1.5 rounded-lg text-left text-[13px] transition-colors cursor-pointer",
                                        isSubActive ? "text-primary font-bold bg-primary/5" : "text-text-sec hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5"
                                      )}
                                    >
                                      <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", isSubActive ? "bg-primary" : "bg-border-main")} />
                                      <span className="truncate">{subItem.label}</span>
                                    </button>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
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
            <div className="shrink-0 border-t border-border-main p-3">
              <button
                type="button"
                className={cn(
                  'group flex items-center gap-3 w-full px-2 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left focus:outline-none cursor-pointer',
                  collapsed && 'justify-center px-0'
                )}
              >
                {/* Avatar with Sign Out Overlay */}
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden transition-all group-hover:scale-95 group-hover:opacity-30">
                    {userAvatar ? (
                      <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-primary text-sm font-bold">
                        {userName[0]?.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <i className="ri-logout-circle-r-line text-red-500 text-[18px]" title="Sign Out" />
                  </div>
                </div>

                {/* Name + subtitle */}
                <AnimatePresence>
                  {!collapsed && (
                    <motion.div
                      key="user-info"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.18 }}
                      className="flex-1 overflow-hidden min-w-0 flex items-center justify-between"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="text-[13px] font-bold text-text-main leading-tight truncate">
                          {userName}
                        </p>
                        {userSubtitle && (
                          <p className="text-[11px] font-medium text-text-sec leading-tight truncate">
                            {userSubtitle}
                          </p>
                        )}
                      </div>
                      <i className="ri-arrow-right-s-line text-[16px] text-text-sec shrink-0" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* ── Floating Collapse / Expand Toggle Button ────────────────────── */}
          <motion.button
            type="button"
            onClick={handleToggleCollapse}
            whileTap={{ scale: 0.88 }}
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            animate={{
              opacity: (collapsed && isAutoHidden) ? 0 : 1,
              scale: (collapsed && isAutoHidden) ? 0.7 : 1,
              pointerEvents: (collapsed && isAutoHidden) ? 'none' : 'auto',
            }}
            transition={{ duration: 0.2 }}
            className="absolute -right-3.5 top-8 z-50 w-7 h-7 flex items-center justify-center rounded-xl border border-border-main bg-surface/90 backdrop-blur-md text-text-sec hover:text-text-main hover:bg-border-main/50 shadow-md transition-colors focus:outline-none cursor-pointer"
          >
            <i className={cn("text-[16px]", collapsed ? "ri-arrow-right-double-line" : "ri-arrow-left-double-line")} />
          </motion.button>
        </motion.aside>
      </div>
    </>
  );
};

export default Sidebar;
