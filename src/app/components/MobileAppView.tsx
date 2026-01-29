import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Activity as ActivityIcon, 
  BarChart2, 
  Settings as SettingsIcon,
  MapPin,
  ShieldCheck,
  Zap,
  Bell,
  Navigation,
  ChevronRight,
  Battery,
  Wifi,
  Signal,
  Map as MapIcon,
  Lock,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_BRIDGES } from '@/app/utils/mockData';
import { toast } from 'sonner';

export function MobileAppView() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isRecording, setIsRecording] = useState(false);
  const [currentBridge, setCurrentBridge] = useState<any>(null);

  // Simulate Geofencing
  useEffect(() => {
    if (activeScreen === 'home') {
      const timer = setTimeout(() => {
        const bridge = MOCK_BRIDGES[0];
        setCurrentBridge(bridge);
        toast.info(`Geofence Trigger: ${bridge.name} detected within 200m`, {
          icon: <MapPin className="text-blue-500" />
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [activeScreen]);

  const startRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      toast.success("Structural health data recorded & processed", {
        description: "Federated learning gradients uploaded anonymously."
      });
    }, 4000);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-100/50 rounded-[40px] p-8 border border-gray-200">
      <div className="mb-8 text-center">
        <h3 className="text-xl font-bold mb-2">Mobile Simulator</h3>
        <p className="text-sm text-gray-500">Crowdsourced Citizen Monitoring Application</p>
      </div>

      {/* Phone Frame */}
      <div className="relative w-[340px] h-[680px] bg-[#111827] rounded-[55px] p-3 shadow-2xl border-[6px] border-[#374151]">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#111827] rounded-b-3xl z-50"></div>
        
        {/* Screen */}
        <div className="w-full h-full bg-white rounded-[42px] overflow-hidden flex flex-col relative">
          
          {/* Status Bar */}
          <div className="h-10 flex items-center justify-between px-8 pt-2 shrink-0">
            <span className="text-xs font-bold text-gray-900">9:41</span>
            <div className="flex items-center gap-1.5">
              <Signal size={12} strokeWidth={3} />
              <Wifi size={12} strokeWidth={3} />
              <Battery size={14} strokeWidth={3} />
            </div>
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <AnimatePresence mode="wait">
              {activeScreen === 'home' && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="p-5"
                >
                  <header className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-black tracking-tight">BridgeSense</h2>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active Monitoring</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 relative">
                      <Bell size={20} />
                      <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
                    </div>
                  </header>

                  <div className="bg-blue-600 rounded-3xl p-5 text-white mb-6 relative overflow-hidden shadow-lg shadow-blue-200">
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <Navigation size={14} className="animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Real-time Location</span>
                      </div>
                      <h3 className="text-lg font-bold">Kolkata, West Bengal</h3>
                      <p className="text-xs opacity-80 mt-1">Approaching Howrah Bridge</p>
                      
                      <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                        View Nearby Map <ChevronRight size={14} />
                      </button>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
                  </div>

                  {currentBridge && (
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="bg-white border border-gray-100 rounded-3xl p-4 shadow-xl shadow-gray-100 mb-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center">
                            <MapPin className="text-emerald-600" size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 leading-none">{currentBridge.name}</h4>
                            <p className="text-[10px] text-gray-400 mt-1 font-medium">Auto-detected</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-black text-emerald-600 leading-none">{currentBridge.shi}</div>
                          <p className="text-[8px] text-gray-400 font-bold uppercase mt-1">Health Index</p>
                        </div>
                      </div>

                      <button 
                        onClick={startRecording}
                        disabled={isRecording}
                        className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 transition-all ${
                          isRecording 
                            ? 'bg-gray-100 text-gray-400' 
                            : 'bg-[#111827] text-white shadow-lg shadow-gray-200'
                        }`}
                      >
                        {isRecording ? (
                          <>
                            <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>
                            Recording Vibrations...
                          </>
                        ) : (
                          <>
                            <ActivityIcon size={18} />
                            Start Manual Scan
                          </>
                        )}
                      </button>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <FeatureCard icon={<ShieldCheck size={18} />} label="Private FL" color="text-purple-600" bg="bg-purple-50" />
                    <FeatureCard icon={<Zap size={18} />} label="Fast Sync" color="text-amber-600" bg="bg-amber-50" />
                  </div>
                </motion.div>
              )}

              {activeScreen === 'activity' && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="p-5"
                >
                  <h2 className="text-2xl font-black mb-6">Activity</h2>
                  <div className="space-y-4">
                    <HistoryItem name="Howrah Bridge" time="1 hour ago" shi={94.2} points={124} />
                    <HistoryItem name="Vidyasagar Setu" time="Yesterday" shi={78.1} points={89} />
                    <HistoryItem name="Bandra Worli" time="Oct 10, 2024" shi={98.4} points={450} />
                  </div>
                </motion.div>
              )}

              {activeScreen === 'stats' && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="p-5"
                >
                  <h2 className="text-2xl font-black mb-2">Contribution</h2>
                  <p className="text-xs text-gray-500 mb-8">You are in the top 5% of citizens!</p>
                  
                  <div className="flex flex-col items-center justify-center py-8 mb-8">
                    <div className="relative w-40 h-40 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-[12px] border-gray-100"></div>
                      <div className="absolute inset-0 rounded-full border-[12px] border-blue-600 border-r-transparent border-b-transparent -rotate-45"></div>
                      <div className="flex flex-col items-center">
                        <span className="text-4xl font-black leading-none">1,247</span>
                        <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Total Points</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-3xl flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      <Heart className="text-emerald-500 fill-emerald-500" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-900 text-sm">Lives Impacted</h4>
                      <p className="text-xs text-emerald-700 opacity-70">Estimated 1.4M commuters</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Bar */}
          <div className="h-20 bg-white border-t border-gray-100 px-6 flex items-center justify-between shrink-0 rounded-b-[42px]">
            <NavTab icon={<Home size={22} />} active={activeScreen === 'home'} onClick={() => setActiveScreen('home')} />
            <NavTab icon={<ActivityIcon size={22} />} active={activeScreen === 'activity'} onClick={() => setActiveScreen('activity')} />
            <NavTab icon={<BarChart2 size={22} />} active={activeScreen === 'stats'} onClick={() => setActiveScreen('stats')} />
            <NavTab icon={<SettingsIcon size={22} />} active={activeScreen === 'settings'} onClick={() => setActiveScreen('settings')} />
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
}

function NavTab({ icon, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`p-2 rounded-xl transition-all ${active ? 'text-blue-600 bg-blue-50' : 'text-gray-300'}`}>
      {icon}
    </button>
  );
}

function FeatureCard({ icon, label, color, bg }: any) {
  return (
    <div className={`${bg} ${color} p-4 rounded-[24px] flex flex-col items-center justify-center text-center gap-2`}>
      {icon}
      <span className="text-[10px] font-black uppercase tracking-wider">{label}</span>
    </div>
  );
}

function HistoryItem({ name, time, shi, points }: any) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-3xl border border-gray-50 hover:border-gray-100 transition-colors">
      <div className="w-10 h-10 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0">
        <MapIcon className="text-gray-400" size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm text-gray-900 truncate">{name}</h4>
        <p className="text-[10px] text-gray-400 font-medium">{time}</p>
      </div>
      <div className="text-right shrink-0">
        <div className="text-xs font-black text-gray-900">{shi}</div>
        <div className="text-[8px] font-bold text-blue-600">+{points} pts</div>
      </div>
    </div>
  );
}
