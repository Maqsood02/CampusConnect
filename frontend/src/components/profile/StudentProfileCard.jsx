import React from 'react';
import {
  Bell,
  MoreVertical,
  Briefcase,
  FileText,
  Award,
  Send,
  Cpu,
  Sparkles,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  Camera
} from 'lucide-react';

export default function StudentProfileCard({ student, onNavigate, onOpenFullProfile }) {
  if (!student) return null;

  return (
    <div className="space-y-4">
      
      {/* Top Profile Card matching reference */}
      <div className="glass-inner-card p-6 rounded-[28px] border border-white/10 text-center relative overflow-hidden">
        {/* Top bar with Bell and More dots */}
        <div className="flex items-center justify-between text-slate-400">
          <button
            onClick={() => onNavigate('applications')}
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

        {/* Circular Avatar + Badge */}
        <div className="flex flex-col items-center mt-1">
          <div 
            onClick={onOpenFullProfile}
            className="relative cursor-pointer hover:scale-105 transition-all group"
            title="Click to view full profile and upload photo"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden p-0.5 border-2 border-cyan-400/40 shadow-lg relative">
              <img
                src={student.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.fullName)}&background=ff7849&color=fff`}
                alt={student.fullName}
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full text-white">
                <Camera className="w-4 h-4 text-cyan-300" />
              </div>
            </div>
          </div>

          <span className="text-[10px] text-cyan-300 font-medium px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mt-2">
            (Verified Scholar)
          </span>

          <h3 
            onClick={onOpenFullProfile}
            className="text-base font-bold text-white font-heading mt-1.5 tracking-wide cursor-pointer hover:text-cyan-300 transition-colors"
          >
            {student.fullName}
          </h3>

          <p className="text-xs text-slate-400">
            {student.branch} • {student.graduationYear} Batch
          </p>

          <button
            onClick={onOpenFullProfile}
            className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-200 text-[11px] font-semibold transition-all hover:scale-102"
          >
            <span>View Full Profile</span>
          </button>
        </div>

        {/* 4 Quick Action Circle Icons from Reference */}
        <div className="grid grid-cols-4 gap-2 mt-5 pt-4 border-t border-white/10 text-[10px] text-slate-300">
          <button
            onClick={() => onNavigate('portfolio')}
            className="flex flex-col items-center gap-1.5 hover:text-[#ff7849] transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:border-[#ff7849]/50 flex items-center justify-center text-slate-300 group-hover:text-[#ff7849] transition-all">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <span>Portfolio</span>
          </button>

          <button
            onClick={() => onNavigate('applications')}
            className="flex flex-col items-center gap-1.5 hover:text-[#ff7849] transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:border-[#ff7849]/50 flex items-center justify-center text-slate-300 group-hover:text-[#ff7849] transition-all">
              <Briefcase className="w-3.5 h-3.5" />
            </div>
            <span>Applied</span>
          </button>

          <button
            onClick={() => onNavigate('interviews')}
            className="flex flex-col items-center gap-1.5 hover:text-[#ff7849] transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:border-[#ff7849]/50 flex items-center justify-center text-slate-300 group-hover:text-[#ff7849] transition-all">
              <Award className="w-3.5 h-3.5" />
            </div>
            <span>Interviews</span>
          </button>

          <button
            onClick={() => onNavigate('drives')}
            className="flex flex-col items-center gap-1.5 hover:text-[#ff7849] transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:border-[#ff7849]/50 flex items-center justify-center text-slate-300 group-hover:text-[#ff7849] transition-all">
              <Send className="w-3.5 h-3.5" />
            </div>
            <span>Explore</span>
          </button>
        </div>

      </div>

      {/* Holographic Placement Smart Card (Matching VISA card from reference) */}
      <div className="glass-credit-card rounded-[24px] p-5 relative overflow-hidden shadow-2xl">
        <div className="glass-credit-card-pattern absolute inset-0 opacity-40 pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between h-44">
          
          {/* Card Brand Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-black text-sm tracking-widest text-white font-heading">
                VISA
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-cyan-300 font-bold border border-white/10">
                ELITE
              </span>
            </div>

            {/* Microchip icon with contactless waves */}
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-400 rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8.5 16.5a5 5 0 0 1 0-9" />
                <path d="M12 19a9 9 0 0 1 0-14" />
              </svg>
              <div className="w-8 h-6 rounded-md bg-gradient-to-tr from-amber-400 to-yellow-200 border border-yellow-300/80 p-1 flex items-center justify-center shadow-md">
                <div className="w-full h-full border border-amber-600/40 rounded-[2px]" />
              </div>
            </div>
          </div>

          {/* Masked Roll / Card Number */}
          <div className="my-2">
            <span className="font-mono text-xs text-slate-300 tracking-[3.5px]">
              {student.rollNumber || '2022 • CSE • 0042'}
            </span>
          </div>

          {/* Bottom Card Row: Balance/CGPA & Expiry */}
          <div className="flex items-end justify-between pt-2 border-t border-white/10">
            <div>
              <span className="text-[9px] text-slate-400 block uppercase font-medium">Cumulative GPA</span>
              <span className="text-lg font-extrabold text-white font-heading tracking-tight">
                {student.cgpa || 9.15} <span className="text-xs text-[#ff7849] font-semibold">/ 10.0</span>
              </span>
            </div>

            <div className="text-right">
              <span className="text-[9px] text-slate-400 block uppercase font-medium">Grad Batch</span>
              <span className="text-xs font-mono font-bold text-slate-200">
                07/{String(student.graduationYear || 2026).slice(-2)}
              </span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
