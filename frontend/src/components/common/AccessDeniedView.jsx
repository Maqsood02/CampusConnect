import React from 'react';
import { ShieldAlert, ArrowLeft, Lock, Sparkles, UserCheck, Shield } from 'lucide-react';

export default function AccessDeniedView({
  tabName = 'Restricted Section',
  requiredRoles = ['Placement Officer', 'Administrator'],
  currentRole = 'Student',
  onReturn
}) {
  return (
    <div className="min-h-[500px] flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl rounded-[36px] bg-gradient-to-b from-white/[0.14] via-white/[0.06] to-white/[0.03] backdrop-blur-3xl border border-white/25 shadow-[0_30px_90px_rgba(0,0,0,0.7),inset_0_1px_2px_0_rgba(255,255,255,0.4),inset_0_0_0_1px_rgba(255,255,255,0.1)] p-8 sm:p-10 space-y-6 overflow-hidden text-center relative z-10">
        
        {/* Luminous Ambient Radial Glow Orbs */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Central Glowing Shield Icon */}
        <div className="relative mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-500/30 to-amber-500/20 border border-rose-400/40 flex items-center justify-center shadow-[0_0_35px_rgba(244,63,94,0.35)] backdrop-blur-xl">
          <ShieldAlert className="w-10 h-10 text-rose-400 drop-shadow-[0_0_12px_rgba(244,63,94,0.6)]" />
          <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border border-rose-400 flex items-center justify-center text-[10px]">
            <Lock className="w-3.5 h-3.5 text-rose-400" />
          </span>
        </div>

        {/* Header & Status Code */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Lock className="w-3 h-3" />
            <span>403 &bull; Access Restricted</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
            Insufficient Role Clearance
          </h2>

          <p className="text-xs sm:text-sm text-slate-300/90 max-w-md mx-auto leading-relaxed">
            You do not possess the institutional permissions required to access the{' '}
            <strong className="text-white capitalize">{tabName.replace('-', ' ')}</strong> console.
          </p>
        </div>

        {/* Role Comparison Glass Badge Card */}
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-3 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-white/5">
            <span className="text-slate-400">Your Current Active Role:</span>
            <span className="px-2.5 py-1 rounded-xl bg-white/10 text-cyan-300 font-bold border border-white/15 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              {currentRole}
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-slate-400">Required Authorization:</span>
            <span className="px-2.5 py-1 rounded-xl bg-rose-500/15 text-rose-300 font-bold border border-rose-500/25 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-rose-400" />
              {requiredRoles.join(' or ')}
            </span>
          </div>
        </div>

        {/* Institutional Governance Notice */}
        <p className="text-[11px] text-slate-400 italic">
          CampusConnect Smart Placement governance enforces strict compartmentalization of administrative records, candidate evaluations, and university audit logs.
        </p>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={onReturn}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-[#ff7849] via-[#f97316] to-[#ea580c] text-white font-bold text-xs shadow-[0_0_25px_rgba(255,120,73,0.45)] hover:opacity-95 transition-all cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Safe Dashboard</span>
          </button>
        </div>

      </div>
    </div>
  );
}
