import React, { useState } from 'react';
import {
  Sparkles,
  Award,
  Briefcase,
  Send,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Brain,
  Code2,
  Bot,
  FileText,
  AlertCircle,
  ChevronRight,
  Target,
  Zap,
  ShieldCheck,
  Star
} from 'lucide-react';
import StudentProfileCard from '../../components/profile/StudentProfileCard';

export default function StudentDashboardView({
  currentUser,
  drives = [],
  applications = [],
  interviews = [],
  analytics,
  onNavigate,
  onOpenFullProfile,
  onSelectDriveForApply
}) {
  const [activeTabFilter, setActiveTabFilter] = useState('All');

  // Filter student's applications
  const studentApps = applications.filter(
    app => app.studentId === currentUser?.id || app.studentName === currentUser?.fullName
  );
  const activeAppsCount = studentApps.filter(a => a.status !== 'REJECTED').length;
  const shortlistedCount = studentApps.filter(a => a.status === 'SHORTLISTED' || a.status === 'SELECTED').length;
  
  // Student's interviews
  const studentInterviews = interviews.filter(
    iv => iv.studentId === currentUser?.id || iv.candidateName === currentUser?.fullName
  );

  // Recommended drives (eligible based on student CGPA)
  const studentCgpa = currentUser?.cgpa || 8.5;
  const recommendedDrives = drives.filter(d => (d.minCgpa || 7.0) <= studentCgpa).slice(0, 3);

  // Target companies readiness benchmark
  const targetReadiness = [
    { company: 'Google Cloud', role: 'Cloud Solution Engineer', requiredSkills: ['Java', 'Docker & Cloud', 'SQL'], matchScore: 92, status: 'Ready' },
    { company: 'Microsoft', role: 'Software Engineer', requiredSkills: ['Data Structures', 'C++', 'System Design'], matchScore: 84, status: 'Reviewing' },
    { company: 'Amazon AWS', role: 'Solutions Architect Intern', requiredSkills: ['AWS', 'Distributed Systems', 'Python'], matchScore: 78, status: 'Prep Needed' }
  ];

  const greetingName = (() => {
    if (!currentUser?.fullName) return 'SCHOLAR';
    const parts = currentUser.fullName.trim().split(/\s+/);
    if (['Prof.', 'Dr.', 'Mr.', 'Ms.', 'Mrs.'].includes(parts[0]) && parts.length > 1) {
      return parts[1];
    }
    return parts[0];
  })();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
      
      {/* ==============================================================================
          LEFT 8 COLS: STUDENT CAREER RADAR & ACTION PIPELINE
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
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white/10 text-amber-200 border border-amber-400/30 backdrop-blur-md shadow-sm whitespace-nowrap">
              Batch 2026-27
            </span>
          </div>
        </div>

        {/* TOP ROW: Student Header Title, Badge, Subtitle & Action Buttons */}
        <div className="space-y-1.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-2.5 flex-nowrap shrink-0">
              <h1 className="text-lg sm:text-xl lg:text-[22px] font-bold font-heading text-white tracking-tight flex items-center gap-2 whitespace-nowrap">
                My Career Dashboard
                <Sparkles className="w-4 h-4 text-[#ff7849] shrink-0" />
              </h1>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-1 shrink-0 whitespace-nowrap">
                <ShieldCheck className="w-3 h-3" />
                {currentUser?.verificationStatus || 'VERIFIED'}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
              <button
                onClick={() => onNavigate('drives')}
                className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#ff7849] to-[#f97316] text-white text-xs font-bold shadow-lg shadow-[#ff7849]/30 hover:scale-102 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>Explore Live Drives</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-300/90 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
            Department of <strong className="text-white">{currentUser?.department || currentUser?.branch || 'Computer Science & Engineering'}</strong> &bull; Roll: <span className="font-mono text-cyan-300">{currentUser?.rollNumber || '2022CSE042'}</span> &bull; CGPA: <strong className="text-amber-300 font-bold">{currentUser?.cgpa || '9.15'} / 10</strong>
          </p>
        </div>

        {/* 4 Student-Centric KPI Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {/* Card 1 */}
          <div className="glass-inner-card p-3.5 rounded-2xl border border-white/10 space-y-1.5 hover:border-[#ff7849]/40 transition-colors">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium text-[11px]">Active Apps</span>
              <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                <Briefcase className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-heading text-white">{activeAppsCount}</span>
              <span className="text-[10px] text-emerald-400 font-semibold">{shortlistedCount} in Review</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${Math.min(100, activeAppsCount * 25)}%` }} />
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-inner-card p-3.5 rounded-2xl border border-white/10 space-y-1.5 hover:border-[#ff7849]/40 transition-colors">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium text-[11px]">Interviews</span>
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
                <Calendar className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-heading text-white">{studentInterviews.length}</span>
              <span className="text-[10px] text-amber-300 font-semibold">Scheduled</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full rounded-full" style={{ width: `${Math.min(100, studentInterviews.length * 35)}%` }} />
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-inner-card p-3.5 rounded-2xl border border-white/10 space-y-1.5 hover:border-[#ff7849]/40 transition-colors">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium text-[11px]">Eligibility Match</span>
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <Target className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-heading text-white">96%</span>
              <span className="text-[10px] text-emerald-400 font-semibold">Tier-1 Cleared</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full w-[96%]" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="glass-inner-card p-3.5 rounded-2xl border border-white/10 space-y-1.5 hover:border-[#ff7849]/40 transition-colors">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium text-[11px]">Target CTC Peak</span>
              <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center">
                <Award className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-[#ff7849] font-heading">₹</span>
              <span className="text-xl font-black font-heading text-white">32.0 LPA</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[#ff7849] to-purple-400 h-full rounded-full w-[85%]" />
            </div>
          </div>
        </div>

        {/* Application Stage Stepper Tracker */}
        <div className="glass-inner-card p-5 sm:p-6 rounded-[28px] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-heading text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#ff7849]" />
                Live Application Pipeline
              </h2>
              <p className="text-[11px] text-slate-400">Track your progress from submission to offer verification</p>
            </div>
            <button
              onClick={() => onNavigate('applications')}
              className="text-xs text-orange-300 hover:text-orange-200 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>View All Applications</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {studentApps.length > 0 ? (
            <div className="space-y-4">
              {studentApps.slice(0, 2).map((app) => (
                <div key={app.id} className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/15 flex items-center justify-center text-sm font-bold text-white shadow-md">
                        {app.companyName?.charAt(0) || 'C'}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white leading-tight">{app.jobTitle}</h3>
                        <p className="text-xs text-slate-400">{app.companyName} &bull; <strong className="text-orange-300 font-semibold">{app.packageLpa}</strong></p>
                      </div>
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border self-start sm:self-auto ${
                      app.status === 'SELECTED'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                        : app.status === 'SHORTLISTED'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                    }`}>
                      {app.status}
                    </span>
                  </div>

                  {/* 4-Step Stepper Bar */}
                  <div className="grid grid-cols-4 gap-2 pt-2 text-[10px] text-slate-400">
                    <div className="flex flex-col gap-1 items-start">
                      <div className="flex items-center gap-1 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>1. Applied</span>
                      </div>
                      <div className="w-full h-1 rounded-full bg-emerald-400" />
                    </div>
                    <div className="flex flex-col gap-1 items-start">
                      <div className={`flex items-center gap-1 font-bold ${['SHORTLISTED', 'TECHNICAL_ROUND', 'SELECTED'].includes(app.status) ? 'text-emerald-400' : 'text-slate-400'}`}>
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>2. Shortlisted</span>
                      </div>
                      <div className={`w-full h-1 rounded-full ${['SHORTLISTED', 'TECHNICAL_ROUND', 'SELECTED'].includes(app.status) ? 'bg-emerald-400' : 'bg-white/10'}`} />
                    </div>
                    <div className="flex flex-col gap-1 items-start">
                      <div className={`flex items-center gap-1 font-bold ${['TECHNICAL_ROUND', 'SELECTED'].includes(app.status) ? 'text-emerald-400' : 'text-slate-400'}`}>
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span>3. Interview</span>
                      </div>
                      <div className={`w-full h-1 rounded-full ${['TECHNICAL_ROUND', 'SELECTED'].includes(app.status) ? 'bg-emerald-400' : 'bg-white/10'}`} />
                    </div>
                    <div className="flex flex-col gap-1 items-start">
                      <div className={`flex items-center gap-1 font-bold ${app.status === 'SELECTED' ? 'text-emerald-400' : 'text-slate-400'}`}>
                        <Award className="w-3.5 h-3.5 shrink-0" />
                        <span>4. Offer Letter</span>
                      </div>
                      <div className={`w-full h-1 rounded-full ${app.status === 'SELECTED' ? 'bg-emerald-400' : 'bg-white/10'}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-slate-400 text-xs">
              <p>No applications submitted yet. Browse recommended recruitment drives below!</p>
            </div>
          )}
        </div>

        {/* Target Company Skill Readiness Benchmark */}
        <div className="glass-inner-card p-5 sm:p-6 rounded-[28px] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-heading text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" />
                Target Company Skill Readiness Radar
              </h2>
              <p className="text-[11px] text-slate-400">Match score against institutional recruiters and missing skill gaps</p>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
              AI Powered
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {targetReadiness.map((t, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{t.company}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      t.matchScore >= 90 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40' :
                      t.matchScore >= 80 ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' :
                      'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                    }`}>
                      {t.matchScore}% Match
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">{t.role}</p>

                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
                    <div
                      className={`h-full rounded-full ${
                        t.matchScore >= 90 ? 'bg-emerald-400' :
                        t.matchScore >= 80 ? 'bg-cyan-400' : 'bg-amber-400'
                      }`}
                      style={{ width: `${t.matchScore}%` }}
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <span className="text-[10px] text-slate-400 block mb-1">Key Tech:</span>
                  <div className="flex flex-wrap gap-1">
                    {t.requiredSkills.map((sk, sIdx) => (
                      <span key={sIdx} className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/10 text-slate-300 border border-white/5">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Recruitment Drives for Student */}
        <div className="glass-inner-card p-5 sm:p-6 rounded-[28px] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-heading text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Recommended Drives for You
              </h2>
              <p className="text-[11px] text-slate-400">Curated based on your {currentUser?.cgpa || '8.5'} CGPA and {currentUser?.branch || 'CSE'} major</p>
            </div>
            <button
              onClick={() => onNavigate('drives')}
              className="text-xs text-orange-300 hover:text-orange-200 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({drives.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {recommendedDrives.map(drive => (
              <div key={drive.id} className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-orange-500/30 transition-all flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-orange-500/15 text-orange-300 border border-orange-400/30">
                      {drive.tier || 'Super Dream'}
                    </span>
                    <span className="text-xs font-bold text-white font-mono">{drive.packageLpa}</span>
                  </div>
                  <h3 className="text-xs font-bold text-white mt-2 leading-snug">{drive.jobTitle}</h3>
                  <p className="text-[11px] text-slate-400">{drive.companyName}</p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Min CGPA: <strong className="text-white">{drive.minCgpa || 7.5}</strong></span>
                  <button
                    onClick={() => onSelectDriveForApply ? onSelectDriveForApply(drive) : onNavigate('drives')}
                    className="px-2.5 py-1 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 border border-orange-400/40 text-orange-200 text-[10px] font-bold transition-all cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Preparation Launchpad */}
        <div className="glass-inner-card p-5 rounded-[26px] border border-white/10">
          <h2 className="text-sm font-bold font-heading text-white flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-[#ff7849]" />
            Career Preparation Launchpad
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <button
              onClick={() => onNavigate('aptitude')}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center gap-1.5 text-center transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Brain className="w-4 h-4" />
              </div>
              <span className="font-semibold text-white">Aptitude Tests</span>
              <span className="text-[10px] text-slate-400">120+ Verified Qs</span>
            </button>

            <button
              onClick={() => onNavigate('coding-practice')}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center gap-1.5 text-center transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-semibold text-white">Coding Arena</span>
              <span className="text-[10px] text-slate-400">DSA &amp; LeetCode</span>
            </button>

            <button
              onClick={() => onNavigate('ai-tutor')}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center gap-1.5 text-center transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bot className="w-4 h-4" />
              </div>
              <span className="font-semibold text-white">AI Mock Interview</span>
              <span className="text-[10px] text-slate-400">Real-time Coaching</span>
            </button>

            <button
              onClick={() => onNavigate('resume-builder')}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center gap-1.5 text-center transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-semibold text-white">ATS Resume</span>
              <span className="text-[10px] text-slate-400">Live PDF Export</span>
            </button>
          </div>
        </div>

      </div>

      {/* ==============================================================================
          RIGHT 4 COLS: STUDENT PROFILE CARD & CREDENTIALS
          ============================================================================== */}
      <div className="lg:col-span-4">
        <StudentProfileCard
          student={currentUser}
          onNavigate={onNavigate}
          onOpenFullProfile={onOpenFullProfile}
        />
      </div>

    </div>
  );
}
