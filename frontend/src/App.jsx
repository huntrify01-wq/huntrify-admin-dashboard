import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ThemeToggle from './components/themetoggle';
import ComponentsPage from './pages/components';
import Sidebar from './components/ui/Sidebar';

// ── Nav sections ──────────────────────────────────────────────────────────────
const NAV_SECTIONS = [
  {
    items: [
      { key: '/',              label: 'Home',          icon: 'ri-home-4-line',         activeIcon: 'ri-home-4-fill',         href: '/' },
      { key: '/messages',      label: 'Messages',      icon: 'ri-chat-3-line',          activeIcon: 'ri-chat-3-fill',         href: '/messages',      badge: 5 },
      { key: '/notifications', label: 'Notifications', icon: 'ri-notification-3-line', activeIcon: 'ri-notification-3-fill', href: '/notifications', badge: 3 },
    ],
  },
  {
    title: 'Recruitment',
    items: [
      { key: '/jobs',       label: 'Job Listings',  icon: 'ri-briefcase-line',   activeIcon: 'ri-briefcase-fill',   href: '/jobs',       roles: ['admin','recruiter','employer'] },
      { key: '/candidates', label: 'Candidates',    icon: 'ri-user-search-line', activeIcon: 'ri-user-search-fill', href: '/candidates', roles: ['admin','recruiter'] },
      { key: '/apply',      label: 'Apply to Jobs', icon: 'ri-file-add-line',    activeIcon: 'ri-file-add-fill',    href: '/apply',      roles: ['jobseeker'] },
      { key: '/resume',     label: 'My Resume',     icon: 'ri-profile-line',     activeIcon: 'ri-profile-fill',     href: '/resume',     roles: ['jobseeker'] },
      { key: '/pipeline',   label: 'Pipeline',      icon: 'ri-flow-chart',       activeIcon: 'ri-flow-chart',       href: '/pipeline',   roles: ['admin','recruiter','employer'] },
    ],
  },
  {
    title: 'Management',
    items: [
      { key: '/analytics', label: 'Analytics', icon: 'ri-bar-chart-2-line', activeIcon: 'ri-bar-chart-2-fill', href: '/analytics', roles: ['admin','recruiter','employer'] },
      { key: '/team',      label: 'Team',       icon: 'ri-team-line',        activeIcon: 'ri-team-fill',        href: '/team',       roles: ['admin','employer'] },
      { key: '/settings',  label: 'Settings',   icon: 'ri-settings-3-line',  activeIcon: 'ri-settings-3-fill',  href: '/settings' },
    ],
  },
  {
    title: 'Developer',
    items: [
      { key: '/components', label: 'Components', icon: 'ri-code-box-line', activeIcon: 'ri-code-box-fill', href: '/components' },
    ],
  },
];

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

// ── Layout wrapper (has access to useLocation) ────────────────────────────────
function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [role] = useState('admin'); // TODO: wire to auth context

  useEffect(() => {
    // Initialize Lenis globally on the window
    // lerp: 0.03 makes it 3x heavier/smoother (default is ~0.1)
    const lenis = new Lenis({
      lerp: 0.03, // Controls the "hardness" or momentum of the scroll (lower = heavier)
      wheelMultiplier: 1.2, // Boost scroll distance slightly so it doesn't feel stuck
      smoothWheel: true,
      syncTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleNavSelect = (key) => {
    const flat = NAV_SECTIONS.flatMap(s => s.items);
    const item = flat.find(i => i.key === key);
    if (item?.href) navigate(item.href);
  };

  return (
    <div className="flex min-h-screen bg-bg text-text-main">
      {/* ── Sidebar (Sticky) ────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen shrink-0 z-50">
        <Sidebar
          sections={NAV_SECTIONS}
          activeKey={location.pathname}
          onSelect={handleNavSelect}
          role={role}
          userName="Alex Johnson"
          userSubtitle="Admin"
        />
      </div>

      {/* ── Main content area ─────────────────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top bar (Sticky) */}
        <header className="sticky top-0 shrink-0 flex items-center justify-between h-16 px-6 border-b border-border-main bg-surface/80 backdrop-blur-md z-40">
          <div className="text-sm font-semibold text-text-sec capitalize">
            {location.pathname === '/' ? 'Home' : location.pathname.replace('/', '')}
          </div>
          <ThemeToggle />
        </header>

        {/* Page content */}
        <main className="flex flex-col flex-1">
          <Routes>
            <Route path="/" element={
              <div className="flex flex-col items-center justify-center p-12 text-center min-h-[calc(100vh-4rem)]">
                <i className="ri-home-4-fill text-5xl text-primary mb-4" />
                <h2 className="text-3xl font-semibold font-headingA">Welcome to Huntrify</h2>
                <p className="mt-3 text-text-sec">Select a page from the sidebar to get started.</p>
              </div>
            } />
            <Route path="/components" element={<ComponentsPage />} />
            <Route path="/admin" element={<div className="p-8">Admin Dashboard</div>} />
            {/* Placeholder routes */}
            {['/messages','/notifications','/jobs','/candidates','/apply','/resume','/pipeline','/analytics','/team','/settings'].map(path => (
              <Route key={path} path={path} element={
                <div className="flex flex-col items-center justify-center p-12 text-center text-text-sec gap-3 min-h-[calc(100vh-4rem)]">
                  <i className="ri-tools-line text-4xl text-border-main" />
                  <p className="text-sm font-medium">Page <span className="text-primary">{path}</span> — coming soon</p>
                </div>
              } />
            ))}
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
      <AppLayout />
    </Router>
  );
}

export default App;
