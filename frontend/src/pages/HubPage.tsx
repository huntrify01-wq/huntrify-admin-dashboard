import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/themetoggle';
import { motion } from 'framer-motion';

const DASHBOARDS = [
  {
    id: 'users',
    title: 'User Management',
    description: 'Manage all platform users, roles, verifications, and account suspensions.',
    icon: 'ri-group-line',
    color: 'text-primary',
    bg: 'bg-primary/10'
  }
];

const HubPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden flex flex-col">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 z-0">
        <div className="absolute top-[-20%] left-[10%] w-[50%] h-[50%] rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[100px]" />
      </div>

      {/* Topbar */}
      <header className="w-full h-20 flex items-center justify-between px-8 relative z-10">
        <div className="flex items-center gap-3">
          <img src="/logo/light-logo.png" alt="Huntrify" className="h-8 object-contain hidden dark:block" />
          <img src="/logo/dark-logo.png" alt="Huntrify" className="h-8 object-contain dark:hidden" />
        </div>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 -mt-10">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-4xl md:text-5xl font-headingA font-bold text-text-main mb-4 tracking-tight">
              Select a Dashboard
            </h1>
            <p className="text-text-sec text-lg">
              Choose the administrative portal you want to access. You will be prompted to sign in securely.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto w-full justify-center">
          {DASHBOARDS.map((dashboard, index) => (
            <motion.div
              key={dashboard.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => navigate('/login')}
              className="group flex flex-col items-start p-6 rounded-[24px] bg-surface/70 backdrop-blur-xl border border-border-main hover:border-primary/40 shadow-sm hover:shadow-lg transition-all text-left cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform group-hover:scale-105 ${dashboard.bg} ${dashboard.color}`}>
                <i className={dashboard.icon}></i>
              </div>
              <h3 className="text-lg font-bold text-text-main mb-1.5 group-hover:text-primary transition-colors">
                {dashboard.title}
              </h3>
              <p className="text-text-sec text-[13px] leading-relaxed flex-1">
                {dashboard.description}
              </p>
              
              <button 
                className="mt-6 w-full py-2.5 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-hover transition-all flex items-center justify-center gap-2 shadow-sm group-hover:shadow-md group-hover:-translate-y-0.5"
              >
                Access Portal <i className="ri-arrow-right-line"></i>
              </button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HubPage;
