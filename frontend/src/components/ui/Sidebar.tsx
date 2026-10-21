import React, { useState, useEffect, useRef } from 'react';
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

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export const Sidebar: React.FC<SidebarProps> = ({
  sections,
  activeKey,
  onSelect,
  role,
  userName = 'User',
  userAvatar,
  userSubtitle,
  defaultCollapsed = true,
  className,
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const [mobileHidden, setMobileHidden] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (key: string) => {
    setExpandedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Mobile auto-hide after 1s
  useEffect(() => {
    const checkMobile = () => window.innerWidth < 1024;
    let timeout: ReturnType<typeof setTimeout>;

    if (checkMobile() && collapsed) {
      setMobileHidden(false);
      timeout = setTimeout(() => {
        setMobileHidden(true);
      }, 1000);
    } else {
      setMobileHidden(false);
    }

    return () => clearTimeout(timeout);
  }, [collapsed]);

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
      {mobileHidden && (
        <div 
          className="fixed left-0 top-0 w-8 h-full z-50 touch-none"
          onTouchStart={() => setCollapsed(false)}
        />
      )}
      {/* Mobile backdrop overlay */}
      <AnimatePresence>
        {!collapsed && !mobileHidden && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCollapsed(true)}
            className="fixed inset-0 bg-black/50 z-[55] lg:hidden block"
          />
        )}
      </AnimatePresence>

      <motion.aside
        animate={{ width: mobileHidden ? 0 : (collapsed ? 72 : 240) }}
        initial={{ width: collapsed ? 72 : 240 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'h-full lg:h-[calc(100vh-2rem)] lg:my-4 lg:ml-4 lg:mr-2 shrink-0 lg:relative fixed left-0 top-0 z-[60]',
          className
        )}
      >
        <div className={cn(
          'relative flex flex-col w-full h-full lg:rounded-[20px] lg:border lg:shadow-sm border-r border-border-main overflow-hidden transition-all duration-300 z-10',
          mobileHidden && 'border-none'
        )}>
          {/* Absolute Background to fix WebKit backdrop-filter bug while keeping original glass color */}
          <div className="absolute inset-0 bg-surface/70 backdrop-blur-xl -z-10" />
          
      {/* ── Logo Row ─────────────────────────────────────────────────── */}
      <div className="flex items-center h-16 px-3 border-b border-border-main shrink-0 gap-2">
        {/* Logos container */}
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
                const isActive = activeKey === item.key;
                const icon = isParentActive && item.activeIcon ? item.activeIcon : item.icon;
                const isExpanded = expandedItems[item.key] || isParentActive;

                return (
                 <div key={item.key} className="flex flex-col">
                  <button
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
                      'group relative flex items-center transition-all duration-300 ease-in-out focus:outline-none',
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
                    <i className={cn(icon, 'shrink-0 text-[20px] leading-none transition-transform duration-300', isParentActive && collapsed ? 'scale-110' : '')} />

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
                              onClick={() => { onSelect?.(subItem.key); subItem.onClick?.(); }}
                              className={cn(
                                "flex items-center gap-2.5 w-full px-3 py-1.5 rounded-lg text-left text-[13px] transition-colors",
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
          className={cn(
            'group flex items-center gap-3 w-full px-2 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left focus:outline-none',
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
        </div> {/* Close inner wrapper div */}

      {/* ── Floating Collapse Toggle ────────────────────────────────────── */}
      <motion.button
        onClick={() => setCollapsed(c => !c)}
        whileTap={{ scale: 0.88 }}
        className={cn(
          "absolute -right-4 top-8 z-50 w-8 h-8 flex items-center justify-center rounded-xl border border-border-main bg-surface/90 backdrop-blur-md text-text-sec hover:text-text-main shadow-md transition-colors focus:outline-none",
          mobileHidden && "hidden"
        )}
      >
        <i className={cn("text-[18px]", collapsed ? "ri-arrow-right-double-line" : "ri-arrow-left-double-line")} />
      </motion.button>
    </motion.aside>
    </>
  );
};

export default Sidebar;
