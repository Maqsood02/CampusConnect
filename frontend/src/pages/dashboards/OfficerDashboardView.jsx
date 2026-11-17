import React, { useState } from 'react';
import {
  Shield,
  Briefcase,
  Users,
  Award,
  TrendingUp,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Sparkles,
  Search,
  Building2,
  Calendar,
  AlertCircle,
  ChevronRight,
  Filter,
  BarChart3
} from 'lucide-react';
import OfficerProfileCard from '../../components/profile/OfficerProfileCard';
import { api } from '../../services/api';

export default function OfficerDashboardView({
  currentUser,
  drives = [],
  applications = [],
  interviews = [],
  students = [],
  analytics,
  onNavigate,
  onOpenPostDrive,
  onOpenScheduleInterview,
  onOpenFullProfile
}) {
  const [verificationSearch, setVerificationSearch] = useState('');
  const [verificationFeedback, setVerificationFeedback] = useState(null);

  // Verification Queue (pending or unverified students)
  const pendingStudents = students.filter(s => 
    s.verificationStatus === 'PENDING' || s.verificationStatus === 'UNDER_REVIEW' || !s.verificationStatus
  );

  const filteredPending = pendingStudents.filter(s => 
    s.fullName.toLowerCase().includes(verificationSearch.toLowerCase()) ||
    s.rollNumber?.toLowerCase().includes(verificationSearch.toLowerCase()) ||
    s.branch?.toLowerCase().includes(verificationSearch.toLowerCase())
  );

  const handleApprove = (studentId) => {
    api.approveStudentVerification(studentId);
    setVerificationFeedback({ type: 'success', msg: `Student profile verified & cleared for corporate drives!` });
    setTimeout(() => setVerificationFeedback(null), 3000);
  };

  const handleReject = (studentId) => {
    api.rejectStudentVerification(studentId, 'Marksheet discrepancy detected');
    setVerificationFeedback({ type: 'error', msg: `Student profile flagged for document resubmission.` });
    setTimeout(() => setVerificationFeedback(null), 3000);
  };

  // Tier distribution calculations
  const totalDrives = drives.length || 1;
  const superDreamCount = drives.filter(d => (parseFloat(d.packageLpa) || 0) >= 20).length || 2;
  const dreamCount = drives.filter(d => (parseFloat(d.packageLpa) || 0) >= 10 && (parseFloat(d.packageLpa) || 0) < 20).length || 3;
  const coreCount = Math.max(0, totalDrives - superDreamCount - dreamCount);

  // Department placement rates
  const branchStats = [
    { branch: 'Computer Science & Engg', placed: 142, total: 150, rate: 94.6, color: '#ff7849' },
    { branch: 'Information Technology', placed: 82, total: 92, rate: 89.1, color: '#06b6d4' },
    { branch: 'Electronics & Comm.', placed: 74, total: 86, rate: 86.0, color: '#10b981' },
    { branch: 'Mechanical & Robotics', placed: 44, total: 58, rate: 75.8, color: '#8b5cf6' }
  ];

  const greetingName = (() => {
    if (!currentUser?.fullName) return 'SARAH';
    const parts = currentUser.fullName.trim().split(/\s+/);
    if (['Prof.', 'Dr.', 'Mr.', 'Ms.', 'Mrs.'].includes(parts[0]) && parts.length > 1) {
      return parts[1];
    }
    return parts[0];
  })();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
      
      {/* ==============================================================================
          LEFT 8 COLS: TPO RECRUITMENT OPERATIONS COMMAND CONSOLE
          ============================================================================== */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Dynamic CampusConnect Greeting Banner with Waving Hand (Strictly Single Line) */}
        <div className="p-3.5 sm:p-4 rounded-[26px] glass-inner-card border border-white/15 bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent backdrop-blur-2xl shadow-xl flex items-center justify-between gap-3 relative overflow-hidden">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <span className="lakshya-script-title text-base sm:text-lg md:text-xl lg:text-[22px] xl:text-[26px] font-bold tracking-wide text-[#ff7849] drop-shadow-[0_2px_10px_rgba(255,120,73,0.4)] whitespace-nowrap">
              Hello <span className="uppercase text-amber-200">{greetingName}</span>, Welcome to CampusConnect Portal
            </span>
            <span className="animate-wave-hand text-2xl sm:text-3xl shrink-0 inline-block origin-[70%_70%] select-none cursor-default drop-shadow-md">
              👋
            </span>
          </div>
        </div>

        {/* TOP ROW: TPO Header Title, Badge, Subtitle & Action Buttons */}
        <div className="space-y-1.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-2.5 flex-nowrap shrink-0">
              <h1 className="text-lg sm:text-xl lg:text-[22px] font-bold font-heading text-white tracking-tight flex items-center gap-2 whitespace-nowrap">
                TPO Operations Console
                <Sparkles className="w-4 h-4 text-[#ff7849] shrink-0" />
              </h1>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center gap-1 shrink-0 whitespace-nowrap">
                <Shield className="w-3 h-3" />
                {currentUser?.officerCode || 'TPO-HQ-01'}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
              <button
                onClick={onOpenPostDrive}
                className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#ff7849] to-orange-600 text-white text-xs font-bold shadow-lg shadow-orange-500/30 hover:scale-102 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5 shrink-0" />
                <span>Post Drive</span>
              </button>
              <button
                onClick={onOpenScheduleInterview}
                className="px-3 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 border border-white/15 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>Schedule Interview</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-300/90 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
            Officer: <strong className="text-white">{currentUser?.fullName || 'Prof. Sarah Jenkins'}</strong> &bull; Training &amp; Placement Cell &bull; Season: <strong className="text-amber-300">2026-27 Active</strong>
          </p>
        </div>

        {/* 4 TPO Operations Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {/* Metric 1 */}
          <div className="glass-inner-card p-3.5 rounded-2xl border border-white/10 space-y-1.5 hover:border-amber-400/40 transition-colors">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium text-[11px]">Active Drives</span>
              <div className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-300 flex items-center justify-center">
                <Briefcase className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-heading text-white">{drives.length}</span>
              <span className="text-[10px] text-orange-300 font-semibold">Campus Visits</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-orange-400 to-[#ff7849] h-full rounded-full w-[85%]" />
            </div>
          </div>

          {/* Metric 2 */}
          <div className="glass-inner-card p-3.5 rounded-2xl border border-white/10 space-y-1.5 hover:border-amber-400/40 transition-colors">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium text-[11px]">Placed Velocity</span>
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-heading text-white">88.4%</span>
              <span className="text-[10px] text-emerald-400 font-semibold">342 Placed</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full w-[88.4%]" />
            </div>
          </div>

          {/* Metric 3 */}
          <div className="glass-inner-card p-3.5 rounded-2xl border border-amber-500/30 bg-amber-500/[0.04] space-y-1.5 hover:border-amber-400/60 transition-colors">
            <div className="flex items-center justify-between text-xs">
              <span className="text-amber-300 font-bold text-[11px]">Needs Action</span>
              <div className="w-6 h-6 rounded-lg bg-amber-500/30 text-amber-200 flex items-center justify-center animate-pulse">
                <Users className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-heading text-amber-200">{pendingStudents.length || 3}</span>
              <span className="text-[10px] text-amber-400 font-semibold">Pending Verif.</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full rounded-full w-[60%]" />
            </div>
          </div>

          {/* Metric 4 */}
          <div className="glass-inner-card p-3.5 rounded-2xl border border-white/10 space-y-1.5 hover:border-amber-400/40 transition-colors">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium text-[11px]">Avg &amp; Max CTC</span>
              <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center">
                <Award className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-bold text-slate-400 font-heading">Avg:</span>
              <span className="text-base font-black font-heading text-white">₹18.2L</span>
              <span className="text-[10px] text-orange-300 font-mono pl-1">Max ₹32L</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="bg-purple-400 h-full rounded-full w-[78%]" />
            </div>
          </div>
        </div>

        {/* Live Student Verification Action Queue */}
        <div className="glass-inner-card p-5 sm:p-6 rounded-[28px] border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-heading text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                Student Verification Action Queue
              </h2>
              <p className="text-[11px] text-slate-400">Review student CGPA, department transcripts, and clear them for drive participation</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter student..."
                  value={verificationSearch}
                  onChange={(e) => setVerificationSearch(e.target.value)}
                  className="glass-input pl-8 pr-3 py-1.5 rounded-xl text-xs text-white w-40 sm:w-48"
                />
              </div>
            </div>
          </div>

          {verificationFeedback && (
            <div className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              verificationFeedback.type === 'success' 
                ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300' 
                : 'bg-rose-500/20 border border-rose-500/30 text-rose-300'
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{verificationFeedback.msg}</span>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-[10px] uppercase font-bold text-slate-400">
                  <th className="pb-2.5">Candidate</th>
                  <th className="pb-2.5">Roll No &amp; Branch</th>
                  <th className="pb-2.5">CGPA</th>
                  <th className="pb-2.5">Backlogs</th>
                  <th className="pb-2.5 text-right">Verification Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredPending.length > 0 ? (
                  filteredPending.slice(0, 4).map(stud => (
                    <tr key={stud.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-slate-800 border border-white/15 flex items-center justify-center font-bold text-xs text-white">
                            {stud.fullName?.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-white block">{stud.fullName}</span>
                            <span className="text-[10px] text-slate-400">{stud.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 font-mono text-cyan-300 text-[11px]">
                        {stud.rollNumber || '2026STU'} &bull; {stud.branch || 'CSE'}
                      </td>
                      <td className="py-3 font-bold text-amber-300">
                        {stud.cgpa || 8.2} / 10
                      </td>
                      <td className="py-3 text-slate-300 text-[11px]">
                        {stud.activeBacklogs !== undefined ? stud.activeBacklogs : 0}
                      </td>
                      <td className="py-3 text-right space-x-2">
                        <button
                          onClick={() => handleApprove(stud.id)}
                          className="px-3 py-1 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 font-bold text-[11px] transition-all cursor-pointer inline-flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleReject(stud.id)}
                          className="px-2.5 py-1 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-rose-300 font-bold text-[11px] transition-all cursor-pointer inline-flex items-center gap-1"
                        >
                          <XCircle className="w-3 h-3" />
                          <span>Flag</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-6 text-center text-slate-400 text-xs">
                      All candidate profiles in the current queue are verified &amp; authorized!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Salary Tier Distribution & Department Placement Velocity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Box 1: Tier Distribution */}
          <div className="glass-inner-card p-5 rounded-[26px] border border-white/10 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold font-heading text-white flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#ff7849]" />
                  Corporate Tier Breakdown
                </h3>
                <span className="text-[10px] text-slate-400">Current Season</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Classification based on CTC compensation</p>
            </div>

            <div className="space-y-2.5 pt-2">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-orange-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ff7849]" />
                    Super Dream (≥ 20 LPA)
                  </span>
                  <span className="text-white font-mono">{superDreamCount} Drives</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#ff7849] h-full rounded-full" style={{ width: `${(superDreamCount / totalDrives) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-cyan-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    Dream (10 - 20 LPA)
                  </span>
                  <span className="text-white font-mono">{dreamCount} Drives</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${(dreamCount / totalDrives) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-emerald-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Core Corporate (5 - 10 LPA)
                  </span>
                  <span className="text-white font-mono">{coreCount} Drives</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${(coreCount / totalDrives) * 100}%` }} />
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('reports')}
              className="mt-2 w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white flex items-center justify-between px-3 transition-colors cursor-pointer"
            >
              <span>View Comprehensive Hiring Funnel</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Box 2: Department Velocity */}
          <div className="glass-inner-card p-5 rounded-[26px] border border-white/10 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold font-heading text-white flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  Departmental Placement Velocity
                </h3>
                <span className="text-[10px] text-emerald-400 font-bold">Target 90%+</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Scholars placed vs total eligible per discipline</p>
            </div>

            <div className="space-y-2.5 pt-2">
              {branchStats.map((b, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-200">{b.branch}</span>
                    <span className="font-mono" style={{ color: b.color }}>{b.rate}% ({b.placed}/{b.total})</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${b.rate}%`, backgroundColor: b.color }} />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('officer')}
              className="mt-2 w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white flex items-center justify-between px-3 transition-colors cursor-pointer"
            >
              <span>Open TPO Master Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Active Campus Drives Live Monitor */}
        <div className="glass-inner-card p-5 sm:p-6 rounded-[28px] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-heading text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-orange-400" />
                Active Campus Recruitment Drives
              </h2>
              <p className="text-[11px] text-slate-400">Live operational status and applicant shortlisting control</p>
            </div>
            <button
              onClick={() => onNavigate('drives')}
              className="text-xs text-orange-300 hover:text-orange-200 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Manage All Drives</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {drives.slice(0, 3).map(drive => (
              <div key={drive.id} className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    {drive.status || 'ACTIVE'}
                  </span>
                  <span className="text-xs font-bold text-white font-mono">{drive.packageLpa}</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-snug">{drive.jobTitle}</h4>
                  <p className="text-[11px] text-slate-400">{drive.companyName}</p>
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Deadlines: <strong className="text-white">{drive.deadline || '28 Mar'}</strong></span>
                  <button
                    onClick={() => onNavigate('officer')}
                    className="text-orange-400 hover:text-orange-300 font-bold cursor-pointer"
                  >
                    Shortlist &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ==============================================================================
          RIGHT 4 COLS: TPO PROFILE CARD & QUICK TOOLS
          ============================================================================== */}
      <div className="lg:col-span-4">
        <OfficerProfileCard
          officer={currentUser}
          drivesCount={drives.length}
          applicantsCount={applications.length}
          onOpenPostDrive={onOpenPostDrive}
          onOpenScheduleInterview={onOpenScheduleInterview}
          onNavigate={onNavigate}
          onOpenFullProfile={onOpenFullProfile}
        />
      </div>

    </div>
  );
}
