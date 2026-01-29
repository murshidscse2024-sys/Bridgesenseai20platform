import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Bell, 
  ClipboardList, 
  FileText, 
  Settings, 
  Smartphone,
  Search,
  Plus,
  Filter,
  RefreshCw,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity,
  User as UserIcon
} from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Internal Components (I'll create these files next)
import { DashboardView } from '@/app/components/DashboardView';
import { BridgesMapView } from '@/app/components/BridgesMapView';
import { AlertsView } from '@/app/components/AlertsView';
import { InspectionsView } from '@/app/components/InspectionsView';
import { ReportsView } from '@/app/components/ReportsView';
import { MobileAppView } from '@/app/components/MobileAppView';
import { BridgeDetailView } from '@/app/components/BridgeDetailView';
import { LoginView } from '@/app/components/LoginView';
import { projectId, publicAnonKey } from '/utils/supabase/info';

// Utility for Tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ViewState = 'dashboard' | 'map' | 'alerts' | 'inspections' | 'reports' | 'settings' | 'mobile' | 'bridge-detail';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [selectedBridgeId, setSelectedBridgeId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Simulation: Check local storage for auth
  useEffect(() => {
    const auth = localStorage.getItem('bridgesense_auth');
    if (auth === 'true') setIsAuthenticated(true);
    
    // Initial backend ping
    fetch('https://' + projectId + '.supabase.co/functions/v1/make-server-74ae32e5/bridges', {
      headers: { 'Authorization': `Bearer ${publicAnonKey}` }
    })
    .then(res => res.json())
    .then(data => console.log('Backend sync:', data))
    .catch(err => console.error('Backend offline:', err));
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('bridgesense_auth', 'true');
    toast.success('Welcome, Engineer Ramesh Kumar');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('bridgesense_auth');
    toast.info('Logged out successfully');
  };

  const navigateToBridge = (id: string) => {
    setSelectedBridgeId(id);
    setCurrentView('bridge-detail');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <LoginView onLogin={handleLogin} />
        <Toaster position="top-right" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F9FAFB] text-[#111827] overflow-hidden font-sans">
      <Toaster position="top-right" richColors />
      
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? '260px' : '80px' }}
        className="bg-[#1E40AF] text-white flex flex-col shadow-xl z-50 overflow-hidden"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
            <ShieldCheck className="text-[#1E40AF] w-7 h-7" />
          </div>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-xl tracking-tight whitespace-nowrap"
            >
              BridgeSense <span className="text-blue-300">AI</span>
            </motion.div>
          )}
        </div>

        <nav className="flex-1 mt-4 px-3 space-y-2">
          <NavItem 
            icon={<LayoutDashboard size={22} />} 
            label="Dashboard" 
            isActive={currentView === 'dashboard'} 
            onClick={() => setCurrentView('dashboard')} 
            collapsed={!isSidebarOpen}
          />
          <NavItem 
            icon={<MapIcon size={22} />} 
            label="Bridge Map" 
            isActive={currentView === 'map'} 
            onClick={() => setCurrentView('map')} 
            collapsed={!isSidebarOpen}
          />
          <NavItem 
            icon={<Bell size={22} />} 
            label="Alerts Center" 
            isActive={currentView === 'alerts'} 
            onClick={() => setCurrentView('alerts')} 
            badge="3"
            collapsed={!isSidebarOpen}
          />
          <NavItem 
            icon={<ClipboardList size={22} />} 
            label="Inspections" 
            isActive={currentView === 'inspections'} 
            onClick={() => setCurrentView('inspections')} 
            collapsed={!isSidebarOpen}
          />
          <NavItem 
            icon={<FileText size={22} />} 
            label="Reports" 
            isActive={currentView === 'reports'} 
            onClick={() => setCurrentView('reports')} 
            collapsed={!isSidebarOpen}
          />
          <div className="pt-4 mt-4 border-t border-blue-700/50">
            <NavItem 
              icon={<Smartphone size={22} />} 
              label="Mobile App" 
              isActive={currentView === 'mobile'} 
              onClick={() => setCurrentView('mobile')} 
              collapsed={!isSidebarOpen}
            />
          </div>
        </nav>

        <div className="p-4 border-t border-blue-700/50">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-600/20 transition-colors text-blue-100 hover:text-white"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Activity size={20} className="text-gray-500" />
            </button>
            <h1 className="text-xl font-semibold capitalize">
              {currentView.replace('-', ' ')}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-72">
              <Search size={18} className="text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search bridges, districts..." 
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>
            
            <div className="flex items-center gap-3 pr-2 border-r border-gray-200">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <Settings size={20} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none">Ramesh Kumar</p>
                <p className="text-xs text-gray-500 mt-1">Senior Engineer, PWD</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 font-bold border border-blue-200">
                RK
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {currentView === 'dashboard' && <DashboardView onBridgeClick={navigateToBridge} />}
              {currentView === 'map' && <BridgesMapView onBridgeClick={navigateToBridge} />}
              {currentView === 'alerts' && <AlertsView onBridgeClick={navigateToBridge} />}
              {currentView === 'inspections' && <InspectionsView />}
              {currentView === 'reports' && <ReportsView />}
              {currentView === 'mobile' && <MobileAppView />}
              {currentView === 'bridge-detail' && selectedBridgeId && (
                <BridgeDetailView bridgeId={selectedBridgeId} onBack={() => setCurrentView('dashboard')} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  badge?: string;
  collapsed?: boolean;
}

function NavItem({ icon, label, isActive, onClick, badge, collapsed }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 group relative",
        isActive 
          ? "bg-white text-[#1E40AF] shadow-lg" 
          : "text-blue-100 hover:bg-blue-700/50"
      )}
    >
      <span className={cn(
        "shrink-0 transition-transform duration-200 group-hover:scale-110",
        isActive ? "text-[#1E40AF]" : "text-blue-100"
      )}>
        {icon}
      </span>
      {!collapsed && (
        <span className="font-medium whitespace-nowrap">{label}</span>
      )}
      {badge && !collapsed && (
        <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
          {badge}
        </span>
      )}
      {collapsed && badge && (
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-blue-800"></span>
      )}
      {collapsed && (
        <div className="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </button>
  );
}
