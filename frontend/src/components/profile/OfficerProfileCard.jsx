import React from 'react';
import {
  Bell,
  MoreVertical,
  PlusCircle,
  CalendarCheck,
  ShieldCheck,
  Users,
  Camera
} from 'lucide-react';

export default function OfficerProfileCard({
  officer,
  drivesCount = 5,
  applicantsCount = 45,
  onOpenPostDrive,
  onOpenScheduleInterview,
  onNavigate,
  onOpenFullProfile
}) {
  if (!officer) return null;

  return (
    <div className="space-y-4">
      
      {/* Top Profile Card matching reference */}
      <div className="glass-inner-card p-6 rounded-[28px] border border-white/10 text-center relative overflow-hidden">
        <div className="flex items-center justify-between text-slate-400">
          <button
            onClick={() => onNavigate('officer')}
            className="p-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-[#ff7849] absolute top-1 right-1" />
          </button>

          <button 
            onClick={onOpenFullProfile}
            className="p-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors"
            title="View Full Profile Options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col items-center mt-1">
          <div 
            onClick={onOpenFullProfile}
            className="w-16 h-16 rounded-full overflow-hidden p-0.5 border-2 border-amber-400/40 shadow-lg cursor-pointer hover:scale-105 transition-all relative group"
            title="Click to view full profile and upload photo"
          >
            <img
              src={officer.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(officer.fullName)}&background=f59e0b&color=fff`}
              alt={officer.fullName}
              className="w-full h-full object-cover rounded-full"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full text-white">
              <Camera className="w-4 h-4 text-amber-300" />
            </div>
          </div>

          <span className="text-[10px] text-amber-300 font-medium px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 mt-2">
            (Placement Cell Lead)
          </span>

          <h3 
            onClick={onOpenFullProfile}
            className="text-base font-bold text-white font-heading mt-1.5 tracking-wide cursor-pointer hover:text-amber-300 transition-colors"
          >
            {officer.fullName}
          </h3>

          <p className="text-xs text-slate-400">
            {officer.department || "Training & Placement Cell"}
          </p>

          <button
            onClick={onOpenFullProfile}
            className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-200 text-[11px] font-semibold transition-all hover:scale-102"
          >
            <span>View Full Profile</span>
          </button>
        </div>

        {/* 4 Quick Action Circle Icons */}
        <div className="grid grid-cols-4 gap-2 mt-5 pt-4 border-t border-white/10 text-[10px] text-slate-300">
          <button
            onClick={onOpenPostDrive}
            className="flex flex-col items-center gap-1.5 hover:text-[#ff7849] transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:border-[#ff7849]/50 flex items-center justify-center text-slate-300 group-hover:text-[#ff7849] transition-all">
              <PlusCircle className="w-3.5 h-3.5" />
            </div>
            <span>+ Drive</span>
          </button>

          <button
            onClick={onOpenScheduleInterview}
            className="flex flex-col items-center gap-1.5 hover:text-[#ff7849] transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:border-[#ff7849]/50 flex items-center justify-center text-slate-300 group-hover:text-[#ff7849] transition-all">
              <CalendarCheck className="w-3.5 h-3.5" />
            </div>
            <span>Schedule</span>
          </button>

          <button
            onClick={() => onNavigate('officer')}
            className="flex flex-col items-center gap-1.5 hover:text-[#ff7849] transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:border-[#ff7849]/50 flex items-center justify-center text-slate-300 group-hover:text-[#ff7849] transition-all">
              <Users className="w-3.5 h-3.5" />
            </div>
            <span>Pipeline</span>
          </button>

          <button
            onClick={() => onNavigate('officer')}
            className="flex flex-col items-center gap-1.5 hover:text-[#ff7849] transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:border-[#ff7849]/50 flex items-center justify-center text-slate-300 group-hover:text-[#ff7849] transition-all">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span>Verify</span>
          </button>
        </div>

      </div>

      {/* Holographic Officer Executive Badge Card */}
      <div className="glass-credit-card rounded-[24px] p-5 relative overflow-hidden shadow-2xl">
        <div className="glass-credit-card-pattern absolute inset-0 opacity-40 pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between h-44">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-black text-sm tracking-widest text-white font-heading">
                OFFICER ACCESS
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                CHIEF
              </span>
            </div>

            <div className="w-8 h-6 rounded-md bg-gradient-to-tr from-amber-400 to-yellow-200 border border-yellow-300/60 p-1 flex items-center justify-center shadow-xs">
              <div className="w-full h-full border border-amber-600/40 rounded-[2px]" />
            </div>
          </div>

          <div className="my-2">
            <span className="font-mono text-xs text-slate-300 tracking-[3px]">
              {officer.officerCode || "TPO-HQ-01"}
            </span>
          </div>

          <div className="flex items-end justify-between pt-2 border-t border-white/10">
            <div>
              <span className="text-[9px] text-slate-400 block uppercase font-medium">Pipeline Candidates</span>
              <span className="text-lg font-extrabold text-white font-heading tracking-tight">
                {applicantsCount} <span className="text-xs text-[#ff7849] font-semibold">Active</span>
              </span>
            </div>

            <div className="text-right">
              <span className="text-[9px] text-slate-400 block uppercase font-medium">Active Drives</span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {drivesCount} Live
              </span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
