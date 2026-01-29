import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Search, 
  Filter, 
  Calendar,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export function ReportsView() {
  const [reportType, setReportType] = useState('compliance');

  const handleGenerate = () => {
    toast.promise(new Promise(resolve => setTimeout(resolve, 2500)), {
      loading: 'Compiling ISO 9001:2015 dataset and blockchain proofs...',
      success: 'Audit report generated successfully',
      error: 'Generation failed'
    });
  };

  return (
    <div className="h-full flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Compliance Reports</h2>
          <p className="text-sm text-gray-500 mt-1">Audit trails and legal documentation for bridge safety</p>
        </div>
        
        <button 
          onClick={handleGenerate}
          className="flex items-center gap-2 px-6 py-3 bg-[#1E40AF] text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-800 transition-all"
        >
          <Zap size={18} />
          Generate New Audit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Templates Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Report Templates</h3>
          <TemplateCard 
            title="Individual Bridge ISO" 
            desc="Complete structural health audit for single asset" 
            active={reportType === 'bridge'} 
            onClick={() => setReportType('bridge')} 
          />
          <TemplateCard 
            title="District Monthly" 
            desc="Aggregated safety metrics for all bridges in district" 
            active={reportType === 'district'} 
            onClick={() => setReportType('district')} 
          />
          <TemplateCard 
            title="Compliance Audit" 
            desc="Regulatory checklist and blockchain verification" 
            active={reportType === 'compliance'} 
            onClick={() => setReportType('compliance')} 
          />
        </div>

        {/* Recent Reports List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between">
            <h3 className="text-lg font-bold">Generated Archives</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-gray-50 rounded-xl px-3 py-2">
                <Search size={16} className="text-gray-400 mr-2" />
                <input type="text" placeholder="Search archives..." className="bg-transparent border-none outline-none text-sm w-40" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <ReportItem 
              name="Q3 Network Compliance Audit" 
              date="Oct 01, 2024" 
              type="Network Audit" 
              size="4.2 MB" 
              blockchain={true} 
            />
            <ReportItem 
              name="Atal Setu Critical Failure Analysis" 
              date="Sep 28, 2024" 
              type="Asset Detail" 
              size="1.8 MB" 
              blockchain={true} 
            />
            <ReportItem 
              name="Maharashtra State Monthly Summary" 
              date="Sep 01, 2024" 
              type="Monthly Overview" 
              size="12.5 MB" 
              blockchain={false} 
            />
            <ReportItem 
              name="Pamban Bridge Structural Assessment" 
              date="Aug 15, 2024" 
              type="Asset Detail" 
              size="3.1 MB" 
              blockchain={true} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateCard({ title, desc, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full text-left p-5 rounded-3xl border transition-all ${
        active 
          ? 'bg-white border-blue-500 shadow-lg shadow-blue-50' 
          : 'bg-transparent border-gray-100 hover:border-gray-200'
      }`}
    >
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 ${
        active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
      }`}>
        <FileText size={20} />
      </div>
      <h4 className={`font-bold text-sm mb-1 ${active ? 'text-gray-900' : 'text-gray-600'}`}>{title}</h4>
      <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
    </button>
  );
}

function ReportItem({ name, date, type, size, blockchain }: any) {
  return (
    <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all">
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
          <FileText size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{name}</h4>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
            <span className="flex items-center gap-1"><Calendar size={12} /> {date}</span>
            <span>•</span>
            <span className="font-bold text-blue-600/70 uppercase tracking-widest">{type}</span>
            <span>•</span>
            <span>{size}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {blockchain && (
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
            <ShieldCheck size={12} />
            Verified
          </div>
        )}
        <button className="p-2.5 bg-gray-50 text-gray-500 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all">
          <Download size={18} />
        </button>
        <button className="p-2.5 bg-gray-50 text-gray-500 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all">
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
