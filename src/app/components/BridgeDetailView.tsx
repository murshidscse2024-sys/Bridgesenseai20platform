import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Users, 
  Zap, 
  Calendar,
  ChevronDown,
  Info,
  ExternalLink,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { MOCK_BRIDGES } from '@/app/utils/mockData';
import { motion } from 'motion/react';
import { toast } from 'sonner';

const historyData = [
  { date: 'Sep 25', shi: 92 },
  { date: 'Sep 26', shi: 91 },
  { date: 'Sep 27', shi: 88 },
  { date: 'Sep 28', shi: 85 },
  { date: 'Sep 29', shi: 79 },
  { date: 'Sep 30', shi: 72 },
  { date: 'Oct 01', shi: 65 },
  { date: 'Oct 02', shi: 58 },
  { date: 'Oct 03', shi: 44 },
  { date: 'Oct 04', shi: 33 },
];

interface BridgeDetailViewProps {
  bridgeId: string;
  onBack: () => void;
}

export function BridgeDetailView({ bridgeId, onBack }: BridgeDetailViewProps) {
  const bridge = MOCK_BRIDGES.find(b => b.id === bridgeId) || MOCK_BRIDGES[0];
  const [activeTab, setActiveTab] = useState('overview');

  const handleDownloadReport = () => {
    toast.promise(new Promise(resolve => setTimeout(resolve, 2000)), {
      loading: 'Generating ISO 9001:2015 Compliance Report...',
      success: 'Report downloaded successfully',
      error: 'Failed to generate report'
    });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{bridge.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500 font-medium">{bridge.district}, {bridge.state}</span>
              <span className="text-gray-300">•</span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">ID: {bridge.id}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => toast.info('Link copied to clipboard')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50"
          >
            <Share2 size={16} className="text-gray-500" />
            Share
          </button>
          <button 
            onClick={handleDownloadReport}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1E40AF] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-800 transition-all"
          >
            <Download size={16} />
            Download ISO Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <TabItem label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
        <TabItem label="Health History" active={activeTab === 'history'} onClick={() => setActiveTab('history')} />
        <TabItem label="Inspections" active={activeTab === 'inspections'} onClick={() => setActiveTab('inspections')} />
        <TabItem label="Sensor Metrics" active={activeTab === 'sensors'} onClick={() => setActiveTab('sensors')} />
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main SHI Gauge Card */}
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <h3 className="text-lg font-bold mb-8">Structural Health Index</h3>
            
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* SVG Gauge */}
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="110"
                  fill="none"
                  stroke="#F1F5F9"
                  strokeWidth="24"
                  strokeLinecap="round"
                />
                <motion.circle
                  initial={{ strokeDasharray: "0 690" }}
                  animate={{ strokeDasharray: `${(bridge.shi / 100) * 690} 690` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  cx="128"
                  cy="128"
                  r="110"
                  fill="none"
                  stroke={bridge.shi < 40 ? '#DC2626' : bridge.shi < 70 ? '#F59E0B' : '#10B981'}
                  strokeWidth="24"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-black tracking-tighter">{bridge.shi.toFixed(1)}</span>
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">out of 100</span>
              </div>
            </div>

            <div className={`mt-8 px-6 py-2 rounded-2xl font-bold flex items-center gap-2 ${
              bridge.status === 'healthy' ? 'bg-emerald-50 text-emerald-700' :
              bridge.status === 'critical' ? 'bg-red-50 text-red-700' : 'bg-orange-50 text-orange-700'
            }`}>
              {bridge.status === 'healthy' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              Status: {bridge.status.toUpperCase()}
            </div>

            <p className="mt-6 text-sm text-gray-500 leading-relaxed">
              Based on the last <span className="font-bold text-gray-800">{bridge.contributionCount.toLocaleString()}</span> sensor contributions. 
              Data confidence: <span className="font-bold text-gray-800">{(bridge.confidence * 100).toFixed(0)}%</span>
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <MetricCard 
              label="Natural Frequency" 
              value={`${bridge.frequency} Hz`} 
              baseline={`${bridge.baselineFrequency} Hz`}
              status={bridge.frequency < bridge.baselineFrequency ? 'warning' : 'good'}
              icon={<Zap className="text-blue-600" size={20} />}
            />
            <MetricCard 
              label="Peak Amplitude" 
              value={`${bridge.amplitude} g`} 
              baseline={`${bridge.baselineAmplitude} g`}
              status={bridge.amplitude > bridge.baselineAmplitude * 2 ? 'danger' : 'good'}
              icon={<Activity className="text-purple-600" size={20} />}
            />
            <MetricCard 
              label="Last Active Monitoring" 
              value={new Date(bridge.lastUpdated).toLocaleTimeString()} 
              subValue={new Date(bridge.lastUpdated).toLocaleDateString()}
              icon={<Clock className="text-emerald-600" size={20} />}
            />
            <MetricCard 
              label="Crowdsourcing Volume" 
              value={bridge.contributionCount.toLocaleString()} 
              subValue="Contributing Smartphones"
              icon={<Users className="text-orange-600" size={20} />}
            />

            {/* AI Insight Card */}
            <div className="md:col-span-2 bg-[#F0F4FF] p-6 rounded-[24px] border border-blue-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck className="text-blue-600" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-blue-900 mb-1">BridgeSense AI Verdict</h4>
                <p className="text-sm text-blue-800 leading-relaxed opacity-80">
                  {bridge.shi < 40 
                    ? "Severe structural integrity compromise detected. Resonance frequency shift of 2.1Hz suggests possible support settlement or bearing failure. Emergency onsite inspection is mandated within 24 hours."
                    : "Structural integrity remains within nominal limits. Periodic vibration patterns are consistent with baseline models. No immediate action required beyond routine monitoring."}
                </p>
                <button className="mt-3 text-sm font-bold text-blue-600 flex items-center gap-1 hover:underline">
                  View Full ML Analysis <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold">10-Day Health Degradation</h3>
              <p className="text-sm text-gray-500">Analysis of SHI score decline leading to current status</p>
            </div>
            <button className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900">
              Export History <Download size={16} />
            </button>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historyData}>
                <defs>
                  <linearGradient id="colorShi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DC2626" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#DC2626" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748B' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="shi" 
                  stroke="#DC2626" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorShi)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'inspections' && (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Inspection History</h3>
              <p className="text-sm text-gray-500">Official logs from onsite bridge engineers</p>
            </div>
            <button className="bg-white border border-gray-200 px-6 py-3 rounded-2xl text-sm font-bold shadow-sm hover:bg-gray-50 flex items-center gap-2">
              <FileText size={18} className="text-gray-400" />
              Log New Inspection
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <InspectionLogItem 
              inspector="Manoj Tiwari" 
              date="Sep 12, 2024" 
              findings="Surface cracks detected on Pier 4. Structural integrity appears stable."
              status="Routine"
            />
            <InspectionLogItem 
              inspector="Sanjay Kumar" 
              date="Aug 15, 2024" 
              findings="No significant anomalies found during routine maintenance check."
              status="Annual"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function TabItem({ label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-8 py-4 text-sm font-bold transition-all relative ${
        active ? 'text-[#1E40AF]' : 'text-gray-400 hover:text-gray-700'
      }`}
    >
      {label}
      {active && (
        <motion.div 
          layoutId="tab-underline"
          className="absolute bottom-0 left-0 right-0 h-1 bg-[#1E40AF] rounded-t-full"
        />
      )}
    </button>
  );
}

function MetricCard({ label, value, baseline, subValue, status, icon }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-gray-50 rounded-2xl">{icon}</div>
        {status && (
          <div className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
            status === 'good' ? 'bg-emerald-100 text-emerald-700' : 
            status === 'warning' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
          }`}>
            {status}
          </div>
        )}
      </div>
      <h4 className="text-gray-500 text-xs font-bold uppercase tracking-wider">{label}</h4>
      <div className="flex items-end gap-2 mt-1">
        <span className="text-2xl font-black">{value}</span>
        {baseline && <span className="text-[10px] text-gray-400 font-bold pb-1">/ Baseline: {baseline}</span>}
        {subValue && <span className="text-[10px] text-gray-400 font-bold pb-1">{subValue}</span>}
      </div>
    </div>
  );
}

function InspectionLogItem({ inspector, date, findings, status }: any) {
  return (
    <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex items-start gap-4">
      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0">
        <Users className="text-gray-400" size={24} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-gray-900">{inspector}</h4>
          <span className="text-xs text-gray-400 font-medium">{date}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{findings}</p>
        <div className="flex items-center gap-3 mt-4">
          <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md uppercase tracking-wider">{status}</span>
          <button className="text-[10px] font-bold text-blue-600 hover:underline">View Attachment</button>
          <button className="text-[10px] font-bold text-blue-600 hover:underline">Verify Signature</button>
        </div>
      </div>
    </div>
  );
}
