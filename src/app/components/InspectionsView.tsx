import React, { useState } from 'react';
import { 
  ClipboardList, 
  Plus, 
  Search, 
  Filter, 
  Users, 
  MapPin, 
  Calendar,
  CheckCircle2,
  Clock,
  MoreVertical,
  ChevronRight,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export function InspectionsView() {
  const [activeTab, setActiveTab] = useState('all');

  const handleStartInspection = () => {
    toast.info('Opening mobile inspection form...');
  };

  return (
    <div className="h-full flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Onsite Inspections</h2>
          <p className="text-sm text-gray-500 mt-1">Maintenance logs and structural validation records</p>
        </div>
        
        <button 
          onClick={handleStartInspection}
          className="flex items-center gap-2 px-6 py-3 bg-[#1E40AF] text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-800 transition-all"
        >
          <Plus size={18} />
          Schedule New Inspection
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden flex flex-col flex-1">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl">
            <Tab label="All Logs" active={activeTab === 'all'} onClick={() => setActiveTab('all')} />
            <Tab label="Scheduled" active={activeTab === 'scheduled'} onClick={() => setActiveTab('scheduled')} />
            <Tab label="Completed" active={activeTab === 'completed'} onClick={() => setActiveTab('completed')} />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-50 rounded-xl px-3 py-2">
              <Search size={16} className="text-gray-400 mr-2" />
              <input type="text" placeholder="Search by bridge or inspector..." className="bg-transparent border-none outline-none text-sm w-60" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="bg-gray-50/50 sticky top-0 z-10">
              <tr className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                <th className="px-8 py-4 border-b border-gray-50">Inspection ID</th>
                <th className="px-8 py-4 border-b border-gray-50">Bridge Name</th>
                <th className="px-8 py-4 border-b border-gray-50">Inspector</th>
                <th className="px-8 py-4 border-b border-gray-50">Date</th>
                <th className="px-8 py-4 border-b border-gray-50">Findings</th>
                <th className="px-8 py-4 border-b border-gray-50">Status</th>
                <th className="px-8 py-4 border-b border-gray-50 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <InspectionRow 
                id="INS-2024-001" 
                bridge="Howrah Bridge" 
                inspector="Rahul Mehta" 
                date="Oct 12, 2024" 
                findings="Nominal" 
                status="completed" 
              />
              <InspectionRow 
                id="INS-2024-002" 
                bridge="Atal Setu" 
                inspector="Sanjay Deshmukh" 
                date="Oct 14, 2024" 
                findings="Action Required" 
                status="scheduled" 
              />
              <InspectionRow 
                id="INS-2024-003" 
                bridge="Pamban Bridge" 
                inspector="Anjali Nair" 
                date="Oct 10, 2024" 
                findings="Damage Confirmed" 
                status="completed" 
              />
              {/* Add more rows */}
              {Array.from({ length: 5 }).map((_, i) => (
                <InspectionRow 
                  key={i}
                  id={`INS-2024-00${4+i}`} 
                  bridge={`Bridge NH-${10+i}`} 
                  inspector="PWD Team" 
                  date={`Oct ${15+i}, 2024`} 
                  findings="Pending" 
                  status="scheduled" 
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Tab({ label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
        active ? 'bg-white text-[#1E40AF] shadow-sm' : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {label}
    </button>
  );
}

function InspectionRow({ id, bridge, inspector, date, findings, status }: any) {
  return (
    <tr className="hover:bg-gray-50/50 transition-colors group">
      <td className="px-8 py-5">
        <span className="text-xs font-mono text-gray-400">{id}</span>
      </td>
      <td className="px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
            <MapPin size={16} />
          </div>
          <span className="text-sm font-bold text-gray-900">{bridge}</span>
        </div>
      </td>
      <td className="px-8 py-5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500 uppercase">
            {inspector.split(' ').map((n:any)=>n[0]).join('')}
          </div>
          <span className="text-xs font-medium text-gray-600">{inspector}</span>
        </div>
      </td>
      <td className="px-8 py-5">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar size={14} className="text-gray-300" />
          {date}
        </div>
      </td>
      <td className="px-8 py-5">
        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
          findings === 'Nominal' ? 'bg-emerald-50 text-emerald-700' :
          findings === 'Pending' ? 'bg-gray-100 text-gray-500' :
          'bg-red-50 text-red-700'
        }`}>
          {findings}
        </span>
      </td>
      <td className="px-8 py-5">
        <div className="flex items-center gap-2">
          {status === 'completed' ? (
            <div className="flex items-center gap-1.5 text-emerald-600">
              <CheckCircle2 size={14} />
              <span className="text-[10px] font-bold uppercase">Completed</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-amber-600">
              <Clock size={14} />
              <span className="text-[10px] font-bold uppercase">Scheduled</span>
            </div>
          )}
        </div>
      </td>
      <td className="px-8 py-5 text-right">
        <button className="p-2 hover:bg-white border border-transparent hover:border-gray-200 rounded-xl transition-all opacity-0 group-hover:opacity-100">
          <ChevronRight size={18} className="text-gray-400" />
        </button>
      </td>
    </tr>
  );
}
