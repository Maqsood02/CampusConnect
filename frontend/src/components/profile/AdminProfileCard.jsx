import React from 'react';
import {
  Bell,
  MoreVertical,
  Shield,
  FileCheck,
  Activity,
  UserCheck,
  Server,
  Sparkles,
  Lock,
  ExternalLink,
  Camera
} from 'lucide-react';

export default function AdminProfileCard({ admin, onNavigate, onOpenFullProfile }) {
  if (!admin) return null;

  return (
    <div className="space-y-4">
      
      {/* Top Profile Card matching Student & Officer cards */}
      <div className="glass-inner-card p-6 rounded-[28px] border border-white/10 text-center relative overflow-hidden">
        
        {/* Top bar with Bell and More dots */}
        <div className="flex items-center justify-between text-slate-400">
          <button
            onClick={() => onNavigate('admin')}
            className="p-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors relative"
            title="System Security Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-purple-500 absolute top-1 right-1" />
          </button>

          <button
            onClick={onOpenFullProfile}
            className="p-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors"
            title="View Full Profile Options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Circular Avatar + Badge */}
        <div className="flex flex-col items-center mt-1">
          <div 
            onClick={onOpenFullProfile}
            className="relative group cursor-pointer"
            title="Click to view full profile and upload photo"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden p-0.5 border-2 border-purple-500/50 shadow-lg group-hover:scale-105 transition-all relative">
              <img
                src={admin.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(admin.fullName)}&background=a855f7&color=fff`}
                alt={admin.fullName}
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full text-white">
                <Camera className="w-4 h-4 text-purple-300" />
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 p-1 bg-purple-600 text-white rounded-full shadow-md border border-white/20">
              <Lock className="w-3 h-3" />
            </span>
          </div>

          <span className="text-[10px] text-purple-300 font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 mt-2">
            Super Administrator
          </span>

          <h3 
            onClick={onOpenFullProfile}
            className="text-base font-bold text-white font-heading mt-1.5 tracking-wide cursor-pointer hover:text-purple-300 transition-colors flex items-center gap-1.5"
          >
            {admin.fullName}
            <Sparkles className="w-3.5 h-3.5 text-[#ff7849]" />
          </h3>

          <p className="text-xs text-slate-400">
            {admin.department || "Dean Office & Institutional Affairs"}
          </p>

          <button
            onClick={onOpenFullProfile}
            className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-200 text-[11px] font-semibold transition-all hover:scale-102"
          >
            <UserCheck className="w-3 h-3 text-purple-300" />
            <span>View Full Profile</span>
            <ExternalLink className="w-2.5 h-2.5 text-purple-400" />
          </button>
        </div>

        {/* 4 Quick Action Circle Icons */}
        <div className="grid grid-cols-4 gap-2 mt-5 pt-4 border-t border-white/10 text-[10px] text-slate-300">
          <button
            onClick={() => onNavigate('admin')}
            className="flex flex-col items-center gap-1.5 hover:text-purple-300 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:border-purple-400/50 flex items-center justify-center text-slate-300 group-hover:text-purple-300 transition-all">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <span>Console</span>
          </button>

          <button
            onClick={() => onNavigate('admin')}
            className="flex flex-col items-center gap-1.5 hover:text-purple-300 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:border-purple-400/50 flex items-center justify-center text-slate-300 group-hover:text-purple-300 transition-all">
              <FileCheck className="w-3.5 h-3.5" />
            </div>
            <span>Audit</span>
          </button>

          <button
            onClick={() => onNavigate('admin')}
            className="flex flex-col items-center gap-1.5 hover:text-purple-300 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:border-purple-400/50 flex items-center justify-center text-slate-300 group-hover:text-purple-300 transition-all">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <span>Health</span>
          </button>

          <button
            onClick={onOpenFullProfile}
            className="flex flex-col items-center gap-1.5 hover:text-purple-300 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:border-purple-400/50 flex items-center justify-center text-slate-300 group-hover:text-purple-300 transition-all">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
            <span>Details</span>
          </button>
        </div>

      </div>

      {/* Holographic Super Admin Root Access Card */}
      <div className="glass-credit-card rounded-[24px] p-5 relative overflow-hidden shadow-2xl">
        <div className="glass-credit-card-pattern absolute inset-0 opacity-40 pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between h-44">
          
          {/* Card Brand Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-black text-sm tracking-widest text-white font-heading">
                ROOT ACCESS
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/25 text-purple-300 font-bold border border-purple-500/30">
                DEAN LVL-4
              </span>
            </div>

            {/* Microchip icon with contactless waves */}
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-300 rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8.5 16.5a5 5 0 0 1 0-9" />
                <path d="M12 19a9 9 0 0 1 0-14" />
              </svg>
              <div className="w-8 h-6 rounded-md bg-gradient-to-tr from-purple-400 to-amber-200 border border-purple-300/80 p-1 flex items-center justify-center shadow-md">
                <div className="w-full h-full border border-purple-600/40 rounded-[2px]" />
              </div>
            </div>
          </div>

          {/* Masked Admin Security Code */}
          <div className="my-2">
            <span className="font-mono text-xs text-purple-200 tracking-[3.5px]">
              ADM • ROOT • 2026 • 001
            </span>
          </div>

          {/* Bottom Card Row: System Uptime & Status */}
          <div className="flex items-end justify-between pt-2 border-t border-white/10">
            <div>
              <span className="text-[9px] text-slate-400 block uppercase font-medium">System Uptime</span>
              <span className="text-lg font-extrabold text-emerald-400 font-heading tracking-tight">
                99.98% <span className="text-xs text-purple-300 font-semibold">Zero Loss</span>
              </span>
            </div>

            <div className="text-right">
              <span className="text-[9px] text-slate-400 block uppercase font-medium">DB Status</span>
              <span className="text-xs font-mono font-bold text-cyan-300">
                Connected
              </span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
