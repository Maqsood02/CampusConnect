import React from 'react';
import { Sparkles, UserCheck, ShieldCheck, ShieldAlert, LogOut } from 'lucide-react';

export default function PersonaSwitcher({ currentRole, onSwitchRole, isLiveBackend, onLogout }) {
  return (
    <div className="w-full bg-[#0d131f]/80 border-b border-white/10 backdrop-blur-xl py-2.5 px-4 sticky top-0 z-50 transition-all shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
        
        {/* Left: Indicator */}
        <div className="flex items-center gap-2 text-slate-200">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-orange-500/20 border border-orange-500/40 text-[#ff7849] font-bold text-[11px] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#ff7849]" />
            <span>ROLE SIMULATION</span>
          </div>
          <span className="text-slate-300 font-medium hidden md:inline text-[11px]">
            Switch roles to test role-specific dashboards & actions:
          </span>
        </div>

        {/* Right: Persona Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Student Persona */}
          <button
            id="switch-role-student"
            onClick={() => onSwitchRole('Student')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentRole === 'Student'
                ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Student (Alex)</span>
          </button>

          {/* Placement Officer Persona */}
          <button
            id="switch-role-officer"
            onClick={() => onSwitchRole('Placement Officer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentRole === 'Placement Officer'
                ? 'bg-amber-500/25 text-amber-300 border border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Placement Officer (Sarah)</span>
          </button>

          {/* Admin Persona */}
          <button
            id="switch-role-admin"
            onClick={() => onSwitchRole('Administrator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentRole === 'Administrator'
                ? 'bg-purple-500/25 text-purple-300 border border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
            <span>Administrator (Arthur)</span>
          </button>

          {/* Backend Status indicator */}
          <div className="hidden lg:flex items-center gap-2 ml-2 pl-3 border-l border-white/15 text-[11px]">
            <span className={`w-2 h-2 rounded-full ${isLiveBackend ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-cyan-400'}`} />
            <span className="text-slate-300 font-medium">
              {isLiveBackend ? 'Java API Connected' : 'Reactive Engine Active'}
            </span>
          </div>

          {/* Sign Out Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-300 hover:text-rose-100 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 transition-all ml-2"
              title="Sign Out of Session"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          )}

        </div>

      </div>
    </div>
  );
}
