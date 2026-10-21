import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  type: 'user' | 'system' | 'report' | 'alert';
}

const DUMMY_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'New User Registered',
    description: 'Alex Johnson just created a new admin account.',
    time: '2 mins ago',
    isRead: false,
    type: 'user',
  },
  {
    id: '2',
    title: 'System Update Completed',
    description: 'v2.4.1 has been successfully deployed to production.',
    time: '1 hour ago',
    isRead: false,
    type: 'system',
  },
  {
    id: '3',
    title: 'Weekly Report Generated',
    description: 'Your marketing performance report is ready to download.',
    time: '5 hours ago',
    isRead: true,
    type: 'report',
  },
  {
    id: '4',
    title: 'High CPU Usage Detected',
    description: 'Server Node-A is experiencing unusually high load.',
    time: '1 day ago',
    isRead: true,
    type: 'alert',
  },
];

const getTypeIcon = (type: NotificationItem['type']) => {
  switch (type) {
    case 'user':
      return <i className="ri-user-add-line text-primary" />;
    case 'system':
      return <i className="ri-server-line text-blue-500" />;
    case 'report':
      return <i className="ri-file-chart-line text-green-500" />;
    case 'alert':
      return <i className="ri-error-warning-line text-red-500" />;
  }
};

const getTypeBg = (type: NotificationItem['type']) => {
  switch (type) {
    case 'user':
      return 'bg-primary/10';
    case 'system':
      return 'bg-blue-500/10';
    case 'report':
      return 'bg-green-500/10';
    case 'alert':
      return 'bg-red-500/10';
  }
};

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(DUMMY_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const Drawer = () => (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[99]"
          />
          
          {/* Side Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-full sm:w-[450px] bg-bg border-l border-border-main shadow-2xl z-[100] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border-main">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-text-main text-xl">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 text-text-sec hover:text-text-main hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none"
                >
                  <i className="ri-close-line text-lg" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto bg-surface/50">
              {notifications.length > 0 ? (
                <div className="flex flex-col p-3 gap-2">
                  {notifications.map((notification) => (
                    <button
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      className={cn(
                        "w-full flex items-start gap-3 sm:gap-4 p-3 sm:p-4 text-left transition-all rounded-2xl border hover:shadow-sm focus:outline-none",
                        !notification.isRead 
                          ? "bg-card border-primary/20 shadow-sm" 
                          : "bg-surface/50 border-transparent hover:bg-card hover:border-border-main"
                      )}
                    >
                      <div className={cn("shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl", getTypeBg(notification.type))}>
                        {getTypeIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0 pt-0.5 sm:pt-1">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className={cn("text-sm sm:text-base font-semibold truncate", !notification.isRead ? "text-text-main" : "text-text-sec")}>
                            {notification.title}
                          </p>
                          <span className="shrink-0 text-[10px] sm:text-xs font-medium text-muted whitespace-nowrap mt-0.5 sm:mt-1">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-text-sec leading-snug sm:leading-relaxed pr-2 sm:pr-4 line-clamp-2">
                          {notification.description}
                        </p>
                      </div>
                      
                      {/* Unread indicator dot */}
                      {!notification.isRead && (
                        <div className="shrink-0 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary mt-1.5 sm:mt-2"></div>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  <div className="w-20 h-20 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6">
                    <i className="ri-check-double-line text-4xl text-muted"></i>
                  </div>
                  <h4 className="text-text-main font-semibold text-lg mb-2">You're all caught up!</h4>
                  <p className="text-text-sec text-sm max-w-[250px]">
                    There are no new notifications or alerts for your account right now.
                  </p>
                </div>
              )}
            </div>
            
            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-4 sm:p-6 border-t border-border-main bg-bg flex items-center gap-3">
                <button 
                  onClick={markAllAsRead}
                  className="flex-1 py-3.5 text-xs sm:text-sm font-semibold text-center text-text-main border border-border-main rounded-xl bg-surface/50 hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none"
                >
                  Mark all as read
                </button>
                <button 
                  onClick={() => setNotifications([])}
                  className="flex-1 py-3.5 text-xs sm:text-sm font-semibold text-center text-error border border-error/20 rounded-xl bg-error/5 hover:bg-error/10 transition-colors focus:outline-none"
                >
                  Clear all
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "w-10 h-10 flex items-center justify-center rounded-xl transition-colors relative focus:outline-none",
          isOpen ? "bg-primary/10 text-primary" : "text-text-sec hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-main"
        )}
      >
        <i className={cn("text-[20px] transition-colors", isOpen ? "ri-notification-3-fill" : "ri-notification-3-line")} />
        {unreadCount > 0 && (
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-surface"></span>
        )}
      </button>

      {/* Render Drawer in Portal to avoid CSS containing block issues */}
      {createPortal(<Drawer />, document.body)}
    </>
  );
};
