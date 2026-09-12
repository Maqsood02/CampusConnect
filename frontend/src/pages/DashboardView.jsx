import React, { useState } from 'react';
import {
  TrendingUp,
  Award,
  Users,
  Briefcase,
  ChevronDown,
  DollarSign,
  Send,
  Plus,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import StudentProfileCard from '../components/profile/StudentProfileCard';
import OfficerProfileCard from '../components/profile/OfficerProfileCard';
import AdminProfileCard from '../components/profile/AdminProfileCard';

export default function DashboardView({
  currentUser,
  drives = [],
  applications = [],
  interviews = [],
  analytics,
  onNavigate,
  onOpenPostDrive,
  onOpenScheduleInterview,
  onOpenFullProfile
}) {
  const [selectedDriveFilter, setSelectedDriveFilter] = useState('All Drives');
  const [hoveredPoint, setHoveredPoint] = useState(true);

  // Filter recent applications
  const recentActivities = applications.slice(0, 2);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
      
      {/* ==============================================================================
          LEFT & CENTER COLUMN: DASHBOARD STATS, CHART & GOALS (8 COLS)
          ============================================================================== */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Dynamic CampusConnect Greeting Banner with Waving Hand (Strictly Single Line) */}
        <div className="p-3.5 sm:p-4 rounded-[26px] glass-inner-card border border-white/15 bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent backdrop-blur-2xl shadow-xl flex items-center justify-between gap-3 relative overflow-hidden">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <span className="lakshya-script-title text-lg sm:text-xl md:text-2xl lg:text-[22px] xl:text-[26px] font-bold tracking-wide text-[#ff7849] drop-shadow-[0_2px_10px_rgba(255,120,73,0.4)] whitespace-nowrap">
              Hello <span className="uppercase text-amber-200">{currentUser?.fullName ? currentUser.fullName.split(' ')[0] : 'MAQSOOD'}</span>, Welcome to CampusConnect Portal
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

        {/* TOP ROW: Header Title & Stat Pills */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight flex items-center gap-2">
                My Dashboard
                <Sparkles className="w-5 h-5 text-[#ff7849]" />
              </h1>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-[#ff7849] border border-[#ff7849]/30">
                2026 - 27
              </span>
            </div>
            <p className="text-xs text-slate-300/90 font-medium mt-1">
              CampusConnect &bull; Smart College Placement Management System
            </p>
          </div>

          {/* 3 Top Stat Pills matching reference screenshot */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            
            {/* Stat Pill 1 */}
            <div className="glass-stat-pill px-3.5 py-2 rounded-2xl flex items-center gap-2.5 text-slate-200">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[#ff7849]">
                <Award className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-medium">Highest CTC</span>
                <span className="font-bold text-white text-xs font-heading">
                  {analytics?.highestCtc || '₹ 32.0 LPA'}
                </span>
              </div>
            </div>

            {/* Stat Pill 2 */}
            <div className="glass-stat-pill px-3.5 py-2 rounded-2xl flex items-center gap-2.5 text-slate-200">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-cyan-400">
                <Briefcase className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-medium">Average Package</span>
                <span className="font-bold text-white text-xs font-heading">
                  {analytics?.averageCtc || '₹ 18.2 LPA'}
                </span>
              </div>
            </div>

            {/* Stat Pill 3 */}
            <div className="glass-stat-pill px-3.5 py-2 rounded-2xl flex items-center gap-2.5 text-slate-200">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-emerald-400">
                <Send className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-medium">Placement Rate</span>
                <span className="font-bold text-white text-xs font-heading">
                  {analytics?.placementRate || '88.4%'}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* STATISTIC CARD WITH CURVED WAVE CHART (MATCHING REFERENCE EXACTLY) */}
        <div className="glass-inner-card p-6 rounded-[28px] border border-white/10 space-y-4 relative overflow-hidden">
          
          {/* Header of Statistic */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold font-heading text-white tracking-wide">
                Statistic
              </h2>
            </div>

            {/* Dropdown pill button */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 hover:bg-white/10 transition-colors cursor-pointer">
              <span>All Recruitment Drives</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          {/* Subtitle & Chart Legend */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
            <div>
              <p className="text-sm font-semibold text-slate-200">Top Placement Contributors</p>
              <p className="text-[11px] text-slate-400">Top Half-Year Hiring and CTC Package Source</p>
            </div>

            {/* Legend Dots matching reference (Text then colored dot) */}
            <div className="flex flex-col sm:items-end gap-1 text-[11px] text-slate-300 font-medium">
              <div className="flex items-center gap-1.5 justify-end">
                <span>Super Dream</span>
                <span className="w-2 h-2 rounded-full bg-[#ff7849] inline-block" />
              </div>
              <div className="flex items-center gap-1.5 justify-end">
                <span>Dream Drives</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
              </div>
              <div className="flex items-center gap-1.5 justify-end">
                <span>Core Recruiters</span>
                <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
              </div>
            </div>
          </div>

          {/* Beautiful Curved Wave Line Chart SVG (Matching screenshot lines & tooltip) */}
          <div className="relative pt-8 pb-2">
            
            {/* Tooltip on active peak point */}
            <div className="absolute top-0 left-[27.5%] -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
              <div className="px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/25 text-[11px] font-bold text-white shadow-xl flex items-center gap-1.5">
                <span className="text-[#ff7849]">₹28.5 LPA</span>
                <span className="text-slate-400 text-[10px]">Google</span>
              </div>
              <div className="w-2 h-2 bg-black/80 rotate-45 -mt-1 border-r border-b border-white/25" />
            </div>

            <svg className="w-full h-44 overflow-visible" viewBox="0 0 600 160" preserveAspectRatio="none">
              <defs>
                {/* Orange Curve Glow Filter */}
                <filter id="orangeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#ff7849" floodOpacity="0.4" />
                </filter>
              </defs>

              {/* Grid guide horizontal lines */}
              <line x1="10" y1="35" x2="590" y2="35" stroke="rgba(255,255,255,0.06)" strokeDasharray="5 5" />
              <line x1="10" y1="80" x2="590" y2="80" stroke="rgba(255,255,255,0.06)" strokeDasharray="5 5" />
              <line x1="10" y1="125" x2="590" y2="125" stroke="rgba(255,255,255,0.06)" strokeDasharray="5 5" />

              {/* Secondary White/Silver Smooth Wave (passes under orange, peaks later around Mar/Apr) */}
              <path
                d="M 25 125 C 100 125, 170 45, 270 45 C 370 45, 430 128, 580 128"
                fill="none"
                stroke="rgba(255, 255, 255, 0.75)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Primary Glowing Orange Smooth Wave (peaks at Feb-Mar, drops to trough in Apr-May, rises to Jun) */}
              <path
                d="M 25 105 C 95 85, 125 38, 165 38 C 225 38, 300 135, 420 135 C 490 135, 540 105, 580 98"
                fill="none"
                stroke="#ff7849"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#orangeGlow)"
              />

              {/* Active Marker Dot at peak of orange curve */}
              <circle cx="165" cy="38" r="5" fill="#ffffff" stroke="#ff7849" strokeWidth="3" />
            </svg>

            {/* X-Axis Months matching reference: Jan, Feb, Mar, Apr, May, Jun */}
            <div className="flex justify-between text-slate-400 text-xs font-medium pt-3 px-2">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>

          </div>

        </div>

        {/* BOTTOM ROW: Goals, Other Savings & Last Transaction (3 COLS MATCHING REFERENCE) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Box 1: Goals with Add Goals + */}
          <div className="glass-inner-card p-5 rounded-[26px] border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-bold text-white font-heading text-base">Goals</span>
              <button
                onClick={() => onNavigate('drives')}
                className="text-slate-400 hover:text-white flex items-center gap-1 text-xs transition-colors"
              >
                Add Goals +
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Goal 1: 78% */}
              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5 space-y-2">
                <span className="text-2xl font-bold text-white font-heading block">78%</span>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#ff7849] to-[#f97316] h-full rounded-full w-[78%]" />
                </div>
                <span className="text-[11px] text-slate-400 block pt-0.5">Dream Placement Goal</span>
              </div>

              {/* Goal 2: 97% */}
              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5 space-y-2">
                <span className="text-2xl font-bold text-white font-heading block">97%</span>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#ff7849] to-[#f97316] h-full rounded-full w-[97%]" />
                </div>
                <span className="text-[11px] text-slate-400 block pt-0.5">Eligibility Rate</span>
              </div>
            </div>
          </div>

          {/* Box 2: Other Savings / Career Analytics with mini bar chart */}
          <div className="glass-inner-card p-5 rounded-[26px] border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-white font-heading text-base">Other Savings</span>
            </div>

            <div className="flex items-end justify-between mt-1">
              <div>
                <span className="text-[11px] text-slate-400 block">Business Savings</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-lg font-bold text-[#ff7849] font-heading">₹</span>
                  <span className="text-xl font-bold text-white font-heading tracking-tight">
                    439,456.23
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-cyan-300 bg-cyan-500/15 px-2 py-0.5 rounded-full border border-cyan-500/25 mt-2">
                  ↑ 83.6%
                </span>
              </div>

              {/* Mini orange bar chart matching screenshot staircase */}
              <div className="flex flex-col items-end">
                <div className="flex items-end gap-1.5 h-12">
                  <div className="w-2.5 h-4 bg-[#ff7849]/50 rounded-t-sm" />
                  <div className="w-2.5 h-7 bg-[#ff7849]/70 rounded-t-sm" />
                  <div className="w-2.5 h-10 bg-[#ff7849]/90 rounded-t-sm" />
                  <div className="w-2.5 h-12 bg-[#ff7849] rounded-t-sm shadow-[0_0_8px_rgba(255,120,73,0.5)]" />
                </div>
                <div className="flex justify-between text-[9px] text-slate-400 gap-1.5 pt-1.5 font-mono">
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                </div>
              </div>
            </div>
          </div>

          {/* Box 3: Last Transaction / Applications */}
          <div className="glass-inner-card p-5 rounded-[26px] border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-white font-heading text-base">Last Transaction</span>
            </div>

            {/* Candidate / Drive Row */}
            <div className="space-y-2 my-auto">
              <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 border border-white/15 flex items-center justify-center text-xs font-bold text-white">
                    G
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-snug">Google Cloud</p>
                    <p className="text-[10px] text-slate-400">02-03-2026 • 12:02 AM</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 font-mono">+₹28.5L</span>
              </div>
            </div>

            {/* See all transaction button (Matching reference full-width pill button) */}
            <button
              onClick={() => onNavigate(currentUser?.role === 'Student' ? 'applications' : 'placement-records')}
              className="mt-3 w-full py-2 px-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>{currentUser?.role === 'Student' ? 'View My Applications' : 'View Placement Records'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* ==============================================================================
          RIGHT COLUMN: PROFILE CARD & CREDIT/PLACEMENT CARD (4 COLS)
          ============================================================================== */}
      <div className="lg:col-span-4">
        {currentUser?.role === 'Student' && (
          <StudentProfileCard
            student={currentUser}
            onNavigate={onNavigate}
            onOpenFullProfile={onOpenFullProfile}
          />
        )}

        {currentUser?.role === 'Placement Officer' && (
          <OfficerProfileCard
            officer={currentUser}
            drivesCount={drives.length}
            applicantsCount={applications.length}
            onOpenPostDrive={onOpenPostDrive}
            onOpenScheduleInterview={onOpenScheduleInterview}
            onNavigate={onNavigate}
            onOpenFullProfile={onOpenFullProfile}
          />
        )}

        {currentUser?.role === 'Administrator' && (
          <AdminProfileCard
            admin={currentUser}
            onNavigate={onNavigate}
            onOpenFullProfile={onOpenFullProfile}
          />
        )}
      </div>

    </div>
  );
}
