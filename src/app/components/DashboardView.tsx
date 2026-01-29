import React from 'react';
import { 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Map as MapIcon, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldAlert,
  Calendar
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { MOCK_BRIDGES, MOCK_ALERTS } from '@/app/utils/mockData';
import { motion } from 'motion/react';

const data = [
  { name: 'Jan', value: 82 },
  { name: 'Feb', value: 83 },
  { name: 'Mar', value: 81 },
  { name: 'Apr', value: 85 },
  { name: 'May', value: 84 },
  { name: 'Jun', value: 87 },
  { name: 'Jul', value: 88 },
];

const distributionData = [
  { name: 'Healthy', value: 38, color: '#10B981' },
  { name: 'Monitor', value: 8, color: '#F59E0B' },
  { name: 'Caution', value: 3, color: '#F97316' },
  { name: 'Critical', value: 1, color: '#DC2626' },
];

interface DashboardViewProps {
  onBridgeClick: (id: string) => void;
}

export function DashboardView({ onBridgeClick }: DashboardViewProps) {
  React.useEffect(() => {
    const interval = setInterval(() => {
      toast.info("New sensor data received", {
        description: `Anonymous contribution from Bridge NH-${10 + Math.floor(Math.random() * 40)}`,
        duration: 3000,
      });
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Bridges Monitored" 
          value="500" 
          change="+12" 
          isPositive={true}
          icon={<MapIcon className="text-blue-600" size={24} />}
          color="blue"
        />
        <StatCard 
          title="Critical Alerts" 
          value="3" 
          change="-2" 
          isPositive={true}
          icon={<AlertTriangle className="text-red-600" size={24} />}
          color="red"
          pulse={true}
        />
        <StatCard 
          title="Average SHI" 
          value="87.3" 
          change="+1.2" 
          isPositive={true}
          icon={<Activity className="text-emerald-600" size={24} />}
          color="emerald"
        />
        <StatCard 
          title="Inspections Due" 
          value="12" 
          change="+3" 
          isPositive={false}
          icon={<CheckCircle2 className="text-amber-600" size={24} />}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Health Trend */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold">Network Health Index Trend</h3>
              <p className="text-sm text-gray-500">Aggregate health of all 500 bridges over time</p>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-xl">
              <button className="px-4 py-1.5 text-xs font-bold bg-white shadow-sm rounded-lg">30D</button>
              <button className="px-4 py-1.5 text-xs font-semibold text-gray-500 hover:bg-white/50 rounded-lg">90D</button>
              <button className="px-4 py-1.5 text-xs font-semibold text-gray-500 hover:bg-white/50 rounded-lg">1Y</button>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1E40AF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  domain={[70, 100]}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    padding: '12px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#1E40AF" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Health Distribution */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-2">Bridge Status Distribution</h3>
          <p className="text-sm text-gray-500 mb-8">Classification of current inventory</p>
          
          <div className="h-[250px] w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 13, fontWeight: 600, fill: '#334155' }}
                  width={80}
                />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {distributionData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Critical Alerts */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldAlert className="text-red-600" size={20} />
              <h3 className="text-lg font-bold">Priority Alerts</h3>
            </div>
            <button className="text-sm font-bold text-blue-600 hover:text-blue-800">View All Alerts</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider">
                  <th className="px-6 py-4 font-bold">Bridge Name</th>
                  <th className="px-6 py-4 font-bold">Severity</th>
                  <th className="px-6 py-4 font-bold">SHI Score</th>
                  <th className="px-6 py-4 font-bold">Time Detected</th>
                  <th className="px-6 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {MOCK_ALERTS.map((alert) => (
                  <tr key={alert.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{alert.bridgeName}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{alert.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        alert.severity === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                        alert.severity === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {alert.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${alert.shiAtTime < 40 ? 'bg-red-500' : 'bg-orange-500'}`} 
                            style={{ width: `${alert.shiAtTime}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold">{alert.shiAtTime}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => onBridgeClick(alert.bridgeId)}
                        className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                      >
                        <ArrowUpRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Inspections */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Upcoming Logs</h3>
            <Calendar className="text-gray-400" size={18} />
          </div>
          <div className="space-y-4">
            <InspectionItem 
              name="Howrah Bridge" 
              date="Tomorrow, 10:00 AM" 
              type="Routine" 
              inspector="M. Sen"
            />
            <InspectionItem 
              name="Bandra Worli" 
              date="Oct 14, 2024" 
              type="Sensor Check" 
              inspector="S. Patil"
            />
            <InspectionItem 
              name="Vidyasagar Setu" 
              date="Oct 16, 2024" 
              type="Structural" 
              inspector="A. Ghosh"
              priority="High"
            />
          </div>
          <button className="w-full mt-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm font-bold rounded-2xl transition-all">
            Open Inspection Calendar
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, isPositive, icon, color, pulse }: any) {
  const colorMap: any = {
    blue: 'bg-blue-50',
    red: 'bg-red-50',
    emerald: 'bg-emerald-50',
    amber: 'bg-amber-50',
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-2xl ${colorMap[color]} ${pulse ? 'animate-pulse' : ''}`}>
          {icon}
        </div>
        <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-lg ${isPositive ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
          {isPositive ? <TrendingUp size={12} className="mr-1" /> : <TrendingUp size={12} className="mr-1 rotate-180" />}
          {change}
        </div>
      </div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold mt-1 tracking-tight">{value}</p>
    </motion.div>
  );
}

function InspectionItem({ name, date, type, inspector, priority }: any) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl border border-gray-50 hover:border-blue-100 transition-colors cursor-pointer group">
      <div className={`w-1 h-10 rounded-full shrink-0 ${priority === 'High' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
      <div className="flex-1">
        <h4 className="text-sm font-bold group-hover:text-blue-600 transition-colors">{name}</h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] text-gray-400 font-medium">{date}</span>
          <span className="text-[10px] text-gray-300">•</span>
          <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">{type}</span>
        </div>
      </div>
      <div className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
        {inspector}
      </div>
    </div>
  );
}
