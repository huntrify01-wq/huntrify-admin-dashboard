import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ThemeToggle from './components/themetoggle';
import { Sidebar } from './components/ui/Sidebar';
import { NotificationCenter } from './components/ui/NotificationCenter';
import { PublicRoutes } from './routes/PublicRoutes';
import { AdminRoutes } from './routes/AdminRoutes';
import LoginPage from './pages/login';
import HubPage from './pages/HubPage';

const NAV_SECTIONS = [
  {
    title: 'Users Management',
    items: [
      { 
        key: '/user-management/overview', 
        label: 'Users Overview', 
        icon: 'ri-dashboard-2-line', 
        activeIcon: 'ri-dashboard-2-fill', 
        href: '/user-management/overview' 
      },
      { 
        key: '/user-management/all', 
        label: 'All Users', 
        icon: 'ri-group-line', 
        activeIcon: 'ri-group-fill', 
        href: '/user-management/all',
        subItems: [
          { key: '/user-management/all/active', label: 'Active Members' },
          { key: '/user-management/all/pending', label: 'Pending Approvals' },
          { key: '/user-management/all/roles', label: 'Role Management' }
        ]
      },
      { key: '/user-management/verification', label: 'Verification & KYC', icon: 'ri-id-card-line', activeIcon: 'ri-id-card-fill', href: '/user-management/verification', badge: 12 },
      { key: '/user-management/suspended', label: 'Suspended & Restricted', icon: 'ri-user-unfollow-line', activeIcon: 'ri-user-unfollow-fill', href: '/user-management/suspended' },
      { key: '/user-management/reports', label: 'Reports & Flags', icon: 'ri-flag-2-line', activeIcon: 'ri-flag-2-fill', href: '/user-management/reports' },
      { key: '/user-management/segments', label: 'User Segments', icon: 'ri-bubble-chart-line', activeIcon: 'ri-bubble-chart-fill', href: '/user-management/segments' },
      { key: '/user-management/export', label: 'Data Export', icon: 'ri-download-cloud-line', activeIcon: 'ri-download-cloud-fill', href: '/user-management/export' },
    ],
  },
  {
    title: 'Administration',
    items: [
      { key: '/administration/team', label: 'Team Management', icon: 'ri-user-settings-line', activeIcon: 'ri-user-settings-fill', href: '/administration/team' },
      { key: '/administration/settings', label: 'Settings', icon: 'ri-settings-3-line', activeIcon: 'ri-settings-3-fill', href: '/administration/settings' },
    ]
  }
];

import { useEffect, useRef } from 'react';
import { cn } from './utils/cn';

// ── Layout wrapper (has access to useLocation) ────────────────────────────────
function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [role] = useState('admin'); // TODO: wire to auth context
  const [sidebarPref, setSidebarPref] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('huntrify-sidebar-preference') || 'expanded';
    }
    return 'expanded';
  });

  useEffect(() => {
    const handleSidebarChange = (e: any) => {
      setSidebarPref(e.detail || localStorage.getItem('huntrify-sidebar-preference') || 'expanded');
    };
    window.addEventListener('huntrify-sidebar-change', handleSidebarChange);
    return () => window.removeEventListener('huntrify-sidebar-change', handleSidebarChange);
  }, []);

  const handleNavSelect = (key) => {
    const flat = NAV_SECTIONS.flatMap(s => s.items);
    const item = flat.find(i => i.key === key);
    if (item?.href) navigate(item.href);
  };

  const isCollapsed = sidebarPref === 'collapsed';

  return (
    <div className="flex h-screen bg-bg text-text-main overflow-hidden">
      {/* ── Sidebar (Sticky/Fixed) ─────────────────────────────────── */}
      <div className="h-screen shrink-0 z-50">
        <Sidebar
          defaultCollapsed={isCollapsed}
          sections={NAV_SECTIONS}
          activeKey={location.pathname}
          onSelect={handleNavSelect}
          role={role}
          userName="Alex Johnson"
          userSubtitle="Admin"
        />
      </div>

      {/* ── Main content area ─────────────────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0 h-screen relative">
        {/* Top bar (Sticky at top, moves left into 72px blank space when collapsed) */}
        <header
          className={cn(
            "shrink-0 h-16 border-b border-border-main bg-surface/70 backdrop-blur-xl z-40 transition-all duration-300",
            isCollapsed ? "-ml-[72px] w-[calc(100%+72px)]" : "w-full"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between h-full px-4 sm:px-6 max-w-[1600px] mx-auto min-w-0 gap-2 transition-all duration-300",
              isCollapsed ? "ml-[72px] w-[calc(100%-72px)]" : "w-full"
            )}
          >
            <div className="text-base sm:text-lg font-semibold text-text-sec truncate min-w-0 flex-1">
              User Management
            </div>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <NotificationCenter />
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex flex-col flex-1 min-w-0 overflow-y-auto overflow-x-hidden relative z-0 w-full max-w-[1600px] mx-auto">
          <Routes>
            <Route path="/*" element={<AdminRoutes />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// ── App root ──────────────────────────────────────────────────────────────────
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HubPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
