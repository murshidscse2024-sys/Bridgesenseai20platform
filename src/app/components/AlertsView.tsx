import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  MapPin, 
  ExternalLink,
  Filter,
  Search,
  MoreVertical
} from 'lucide-react';
import { MOCK_ALERTS } from '@/app/utils/mockData';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface AlertsViewProps {
  onBridgeClick: (id: string) => void;
}

export function AlertsView({ onBridgeClick }: AlertsViewProps) {
  const [filter, setFilter] = useState('all');

  const handleAcknowledge = (id: string) => {
    toast.success(`Alert ${id} acknowledged by Engineer Ramesh Kumar`);
  };

  return (
    <div className="h-full flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Alerts Management</h2>
          <p className="text-sm text-gray-500 mt-1">Rule-based critical infrastructure notifications</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
            <Search size={16} className="text-gray-400 mr-2" />
            <input type="text" placeholder="Search alerts..." className="bg-transparent border-none outline-none text-sm w-40" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 transition-all">
            <Filter size={16} className="text-gray-500" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        {/* Kanban Columns */}
        <AlertColumn 
          title="Critical" 
          count={MOCK_ALERTS.filter(a=>a.severity==='CRITICAL').length}
          color="bg-red-500" 
          alerts={MOCK_ALERTS.filter(a=>a.severity==='CRITICAL')}
          onAction={handleAcknowledge}
          onView={onBridgeClick}
        />
        <AlertColumn 
          title="High Priority" 
          count={MOCK_ALERTS.filter(a=>a.severity==='HIGH').length}
          color="bg-orange-500" 
          alerts={MOCK_ALERTS.filter(a=>a.severity==='HIGH')}
          onAction={handleAcknowledge}
          onView={onBridgeClick}
        />
        <AlertColumn 
          title="Medium / Resolved" 
          count={MOCK_ALERTS.filter(a=>a.severity==='MEDIUM' || a.status==='resolved').length}
          color="bg-amber-500" 
          alerts={MOCK_ALERTS.filter(a=>a.severity==='MEDIUM')}
          onAction={handleAcknowledge}
          onView={onBridgeClick}
        />
      </div>
    </div>
  );
}

function AlertColumn({ title, count, color, alerts, onAction, onView }: any) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${color}`}></div>
          <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500">{title}</h3>
        </div>
        <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{count}</span>
      </div>

      <div className="space-y-4">
        {alerts.map((alert: any) => (
          <motion.div 
            key={alert.id}
            whileHover={{ y: -2 }}
            className={`bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all ${
              alert.severity === 'CRITICAL' ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-orange-500'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-bold text-gray-900">{alert.bridgeName}</h4>
                <p className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">ID: {alert.id}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={16} />
              </button>
            </div>

            <div className="bg-gray-50 rounded-2xl p-3 mb-4">
              <p className="text-xs text-gray-600 leading-relaxed">{alert.message}</p>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg font-black ${
                  alert.shiAtTime < 40 ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                }`}>
                  {alert.shiAtTime}
                </div>
                <div>
                  <p className="text-[8px] text-gray-400 font-bold uppercase">SHI Score</p>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 font-medium">
                    <Clock size={10} />
                    {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
              
              {alert.blockchainHash && (
                <div className="text-right">
                  <p className="text-[8px] text-gray-400 font-bold uppercase">Blockchain Hash</p>
                  <a href="#" className="text-[10px] text-blue-600 font-mono hover:underline flex items-center gap-1 justify-end">
                    {alert.blockchainHash}
                    <ExternalLink size={10} />
                  </a>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => onAction(alert.id)}
                className="flex-1 bg-white border border-gray-200 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors"
              >
                Acknowledge
              </button>
              <button 
                onClick={() => onView(alert.bridgeId)}
                className="px-4 bg-[#1E40AF] text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors shadow-lg shadow-blue-100"
              >
                View
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
