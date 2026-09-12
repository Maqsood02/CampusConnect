import React from 'react';
import {
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowUp,
  ExternalLink,
  Layers,
  Database,
  Cpu
} from 'lucide-react';

export default function Footer({ onSelectTab, currentUser }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full max-w-[1440px] mx-auto mt-12 mb-8 px-4 sm:px-6">
      <div className="rounded-[32px] glass-canvas border border-white/15 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
        
        {/* Subtle Ambient Radial Glow in Footer */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ff7849]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Content Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-white/10">
          
          {/* Column 1: Brand & Core Identity */}
          <div className="space-y-5 lg:col-span-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative w-20 h-20 sm:w-22 sm:h-22 shrink-0 drop-shadow-[0_6px_20px_rgba(255,120,73,0.4)] hover:scale-105 transition-transform duration-300">
                <img
                  src="/campusconnect_logo.png"
                  alt="CampusConnect Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-black font-heading text-white tracking-wide flex items-center gap-2">
                  CampusConnect <Sparkles className="w-5 h-5 text-[#ff7849]" />
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-snug">
                  Smart College Placement Management System
                </p>
                <p className="text-[11px] font-bold text-orange-400 tracking-wider uppercase mt-1">
                  Connect Today &bull; Build Tomorrow
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Empowering university campus recruitments through automated CGPA verification, verified student profiles, real-time interview pipelines, and institutional intelligence.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Campus Services Operational</span>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="space-y-3 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab && onSelectTab('dashboard')}
                  className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-1.5"
                >
                  <span className="text-[#ff7849] font-bold">›</span> Main Dashboard
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab && onSelectTab('drives')}
                  className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-1.5"
                >
                  <span className="text-[#ff7849] font-bold">›</span> Campus Job Board
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab && onSelectTab('applications')}
                  className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-1.5"
                >
                  <span className="text-[#ff7849] font-bold">›</span> Application Tracker
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab && onSelectTab('interviews')}
                  className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-1.5"
                >
                  <span className="text-[#ff7849] font-bold">›</span> Interviews Hub
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab && onSelectTab('placement-records')}
                  className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-1.5"
                >
                  <span className="text-[#ff7849] font-bold">›</span> Placement Records
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab && onSelectTab('reports')}
                  className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-1.5"
                >
                  <span className="text-[#ff7849] font-bold">›</span> Reports &amp; Dashboards
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab && onSelectTab('portfolio')}
                  className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-1.5"
                >
                  <span className="text-[#ff7849] font-bold">›</span> Student Portfolio Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Placement Directorate Contact */}
          <div className="space-y-3 lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
              Placement Directorate
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#ff7849] shrink-0 mt-0.5" />
                <span>Central Training & Placement Cell, Tech Block C, University Campus</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:placement@university.edu" className="hover:text-white transition-colors">
                  placement@university.edu
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 (080) 2345-6789</span>
              </div>
              <div className="flex items-center gap-2.5 text-[11px] text-slate-400">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Mon – Fri: 09:00 AM – 05:30 PM IST</span>
              </div>
            </div>
          </div>

          {/* Column 4: Architecture & Accreditation */}
          <div className="space-y-3 lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
              Enterprise Stack
            </h4>
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-white font-medium">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Backend
                </span>
                <span className="text-cyan-300 font-mono text-[11px]">Java Spring Boot</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-white font-medium">
                  <Database className="w-3.5 h-3.5 text-emerald-400" /> Database
                </span>
                <span className="text-emerald-300 font-mono text-[11px]">MongoDB Atlas</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-white font-medium">
                  <Layers className="w-3.5 h-3.5 text-purple-400" /> Cloud Hosting
                </span>
                <span className="text-purple-300 font-mono text-[11px]">Vercel Edge</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>Security Clearance</span>
                <span className="text-[#ff7849] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> ISO-27001
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer */}
        <div className="relative pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© 2026 - 27 CampusConnect - Smart College Placement Management System. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Recruiter Terms
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Security Audit
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white border border-white/15 transition-all shadow-md flex items-center gap-1"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold hidden sm:inline">Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
