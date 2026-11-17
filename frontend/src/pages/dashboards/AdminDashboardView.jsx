import React, { useState } from 'react';
import {
  ShieldAlert,
  Server,
  Users,
  Award,
  TrendingUp,
  FileText,
  Sparkles,
  Lock,
  Send,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Download,
  Building2,
  RefreshCw,
  Globe2,
  Key,
  Database
} from 'lucide-react';
import AdminProfileCard from '../../components/profile/AdminProfileCard';
import { api } from '../../services/api';

export default function AdminDashboardView({
  currentUser,
  drives = [],
  applications = [],
  students = [],
  analytics,
  onNavigate,
  onOpenFullProfile
}) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const auditLogs = api.getAuditLogs();

  // Multi-year institutional trend data
  const multiYearTrends = [
    { year: '2024-25', placed: 310, highestCtc: '24.0 LPA', avgCtc: '14.5 LPA', nirfScore: 84.2 },
    { year: '2025-26', placed: 328, highestCtc: '28.5 LPA', avgCtc: '16.8 LPA', nirfScore: 88.6 },
    { year: '2026-27 (Current)', placed: 342, highestCtc: '32.0 LPA', avgCtc: '18.2 LPA', nirfScore: 92.4 }
  ];

  // User distribution
  const officerUser = { fullName: 'Placement Officer', email: 'officer@cpms.edu', role: 'Placement Officer', clearance: 'Level 2 - TPO Operations' };
  const adminUser = { fullName: currentUser?.fullName || 'Administrator', email: currentUser?.email || 'admin@cpms.edu', role: 'Administrator', clearance: 'Level 3 - Full Governance' };

  const handleExportCompliance = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const greetingName = (() => {
    if (!currentUser?.fullName) return 'ADMINISTRATOR';
    const parts = currentUser.fullName.trim().split(/\s+/);
    if (['Prof.', 'Dr.', 'Mr.', 'Ms.', 'Mrs.'].includes(parts[0]) && parts.length > 1) {
      return parts[1];
    }
    return parts[0];
  })();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
      
      {/* ==============================================================================
          LEFT 8 COLS: INSTITUTIONAL GOVERNANCE & SECURITY CONSOLE
          ============================================================================== */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Dynamic CampusConnect Greeting Banner with Waving Hand (Strictly Single Line) */}
        <div className="p-3.5 sm:p-4 rounded-[26px] glass-inner-card border border-white/15 bg-gradient-to-r from-orange-500/15 via-purple-600/15 to-transparent backdrop-blur-2xl shadow-xl flex items-center justify-between gap-3 relative overflow-hidden">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <span className="lakshya-script-title text-base sm:text-lg md:text-xl lg:text-[22px] xl:text-[26px] font-bold tracking-wide text-[#ff7849] drop-shadow-[0_2px_10px_rgba(255,120,73,0.4)] whitespace-nowrap">
              Hello <span className="uppercase text-amber-200">{greetingName}</span>, Welcome to CampusConnect Portal
            </span>
            <span className="animate-wave-hand text-2xl sm:text-3xl shrink-0 inline-block origin-[70%_70%] select-none cursor-default drop-shadow-md">
              👋
            </span>
          </div>
        </div>

        {/* TOP ROW: Admin Header Title, Badge, Subtitle & Action Buttons */}
        <div className="space-y-1.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-2.5 flex-nowrap shrink-0">
              <h1 className="text-lg sm:text-xl lg:text-[22px] font-bold font-heading text-white tracking-tight flex items-center gap-2 whitespace-nowrap">
                Executive Governance Console
                <Sparkles className="w-4 h-4 text-[#ff7849] shrink-0" />
              </h1>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/40 flex items-center gap-1 shrink-0 whitespace-nowrap">
                <Lock className="w-3 h-3" />
                NIRF: 92.4
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
              <button
                onClick={handleExportCompliance}
                className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-purple-600/30 hover:scale-102 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                title="Export NIRF Compliance Report"
              >
                <Download className="w-3.5 h-3.5 shrink-0" />
                <span>{downloadSuccess ? 'Report Exported!' : 'NIRF Export'}</span>
              </button>
              <button
                onClick={() => onNavigate('admin')}
                className="px-3 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 border border-white/15 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Server className="w-3.5 h-3.5 text-purple-300 shrink-0" />
                <span>Admin Desk</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-300/90 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
            Admin: <strong className="text-white">{currentUser?.fullName || 'Administrator'}</strong> &bull; Office of the Dean &amp; Registrar &bull; RBAC: <strong className="text-emerald-400">100% Enforced</strong>
          </p>
        </div>

        {/* 4 Admin Institutional KPI Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {/* Card 1 */}
          <div className="glass-inner-card p-3.5 rounded-2xl border border-white/10 space-y-1.5 hover:border-purple-400/40 transition-colors">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium text-[11px]">Scholars Pop.</span>
              <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                <Users className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-heading text-white">{students.length || 387}</span>
              <span className="text-[10px] text-cyan-300 font-semibold">Active Database</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="bg-cyan-400 h-full rounded-full w-[94%]" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-inner-card p-3.5 rounded-2xl border border-white/10 space-y-1.5 hover:border-purple-400/40 transition-colors">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium text-[11px]">Corporate MoUs</span>
              <div className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-300 flex items-center justify-center">
                <Building2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-heading text-white">48+</span>
              <span className="text-[10px] text-orange-300 font-semibold">Fortune 500</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="bg-[#ff7849] h-full rounded-full w-[88%]" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-inner-card p-3.5 rounded-2xl border border-white/10 space-y-1.5 hover:border-purple-400/40 transition-colors">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium text-[11px]">Placement Index</span>
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <Award className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-heading text-white">92.4</span>
              <span className="text-[10px] text-emerald-400 font-semibold">NIRF Tier-1</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full w-[92.4%]" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="glass-inner-card p-3.5 rounded-2xl border border-purple-500/30 bg-purple-500/[0.04] space-y-1.5 hover:border-purple-400/60 transition-colors">
            <div className="flex items-center justify-between text-xs">
              <span className="text-purple-300 font-bold text-[11px]">Security Health</span>
              <div className="w-6 h-6 rounded-lg bg-purple-500/30 text-purple-200 flex items-center justify-center">
                <Lock className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-heading text-purple-200">100%</span>
              <span className="text-[10px] text-emerald-400 font-semibold">RBAC Enforced</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-purple-400 to-indigo-400 h-full rounded-full w-full" />
            </div>
          </div>
        </div>

        {/* Real-Time Security Audit Log Stream */}
        <div className="glass-inner-card p-5 sm:p-6 rounded-[28px] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-heading text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-400" />
                Real-Time Security &amp; Audit Trail Feed
              </h2>
              <p className="text-[11px] text-slate-400">Institutional event logging for authentication, role validations, and data changes</p>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live Feed
            </span>
          </div>

          <div className="divide-y divide-white/5 overflow-x-auto">
            {auditLogs.slice(0, 5).map(log => (
              <div key={log.id} className="py-3 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white text-xs">{log.action}</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase border ${
                      log.level === 'ALERT' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
                      log.level === 'NOTICE' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                      'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                    }`}>
                      {log.level}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    User: <strong className="text-slate-200">{log.user}</strong> &bull; IP: <span className="font-mono text-cyan-300">{log.ip}</span> &bull; {log.details}
                  </p>
                </div>
                <span className="text-slate-400 text-xs whitespace-nowrap font-mono">{log.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-Year Institutional Placement Trends & NIRF Accreditation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Box 1: Multi-Year Trends */}
          <div className="glass-inner-card p-5 rounded-[26px] border border-white/10 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold font-heading text-white flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Multi-Year Institutional Trends
                </h3>
                <span className="text-[10px] text-slate-400">YoY CTC Growth</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Comparison across graduating institutional batches</p>
            </div>

            <div className="space-y-3 pt-2">
              {multiYearTrends.map((tr, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/[0.04] border border-white/5 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">{tr.year}</span>
                    <span className="text-emerald-300 font-mono font-bold">NIRF: {tr.nirfScore}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Scholars Placed: <strong className="text-slate-200">{tr.placed}</strong></span>
                    <span>Median CTC: <strong className="text-white font-mono">{tr.avgCtc}</strong></span>
                    <span>Peak: <strong className="text-[#ff7849] font-mono">{tr.highestCtc}</strong></span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('reports')}
              className="mt-2 w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white flex items-center justify-between px-3 transition-colors cursor-pointer"
            >
              <span>Explore Analytics &amp; Reports</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Box 2: Institutional Authority & RBAC Clearance Control */}
          <div className="glass-inner-card p-5 rounded-[26px] border border-white/10 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold font-heading text-white flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-purple-400" />
                  Role Authority &amp; Clearance Matrix
                </h3>
                <span className="text-[10px] text-purple-300 font-bold">Enforced</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Privilege tier segregation and access policy</p>
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/25 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-200">Administrator Tier</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 font-bold">Level 3</span>
                </div>
                <p className="text-[11px] text-slate-300">Global institutional authority, audit inspection, database controls, role management.</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-200">Placement Officer (TPO) Tier</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 font-bold">Level 2</span>
                </div>
                <p className="text-[11px] text-slate-300">Recruitment drive dispatch, candidate eligibility clearance, interview scheduling.</p>
              </div>

              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/25 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-200">Student Scholar Tier</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-bold">Level 1</span>
                </div>
                <p className="text-[11px] text-slate-300">Job board application, personalized roadmap, ATS resume compilation, practice tests.</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('admin')}
              className="mt-2 w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white flex items-center justify-between px-3 transition-colors cursor-pointer"
            >
              <span>Manage User Access in Admin Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* ==============================================================================
          RIGHT 4 COLS: ADMIN PROFILE CARD & EXECUTIVE CONTROLS
          ============================================================================== */}
      <div className="lg:col-span-4">
        <AdminProfileCard
          admin={currentUser}
          onNavigate={onNavigate}
          onOpenFullProfile={onOpenFullProfile}
        />
      </div>

    </div>
  );
}
