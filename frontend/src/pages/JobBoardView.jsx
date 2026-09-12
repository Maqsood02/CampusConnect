import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { api } from '../services/api';

export default function JobBoardView({
  drives = [],
  currentUser,
  onSelectDriveForApply,
  onOpenPostDrive
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [minCtc, setMinCtc] = useState(0);

  const branches = ['ALL', 'CSE', 'ECE', 'MECH', 'EEE'];

  const filteredDrives = drives.filter(drive => {
    const matchesSearch =
      drive.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drive.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (drive.description && drive.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesBranch =
      selectedBranch === 'ALL' ||
      (drive.criteria?.allowedBranches && drive.criteria.allowedBranches.includes(selectedBranch));

    const driveLpa = parseFloat(drive.packageLpa) || 0;
    const matchesCtc = driveLpa >= minCtc;

    return matchesSearch && matchesBranch && matchesCtc;
  });

  const maxSliderCtc = 40;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight flex items-center gap-2">
              Campus Recruitment Job Board
              <Sparkles className="w-5 h-5 text-[#ff7849]" />
            </h2>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-[#ff7849] border border-[#ff7849]/30">
              Season 2026 - 27
            </span>
          </div>
          <p className="text-xs text-slate-300/90 mt-1 flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-white">CampusConnect</span>
            <span className="text-slate-500">•</span>
            <span>Browse corporate recruitment drives, verify eligibility in real time, and submit applications.</span>
          </p>
        </div>

        {(currentUser?.role === 'Placement Officer' || currentUser?.role === 'Administrator') && (
          <button
            onClick={onOpenPostDrive}
            className="px-4 py-2.5 rounded-2xl btn-orange-glow font-bold text-xs shadow-md transition-all self-start sm:self-auto flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Post New Drive
          </button>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-[24px] glass-inner-card border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search company, job role, or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-xs placeholder:text-slate-500"
          />
        </div>

        {/* Branch Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-1">
          <span className="text-slate-400 text-xs font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#ff7849]" /> Dept:
          </span>
          {branches.map(b => (
            <button
              key={b}
              onClick={() => setSelectedBranch(b)}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
                selectedBranch === b
                  ? 'bg-gradient-to-r from-[#ff7849] to-[#f97316] text-white shadow-md shadow-[#ff7849]/30 border border-[#ff7849]/50'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Minimum CTC Slider & Quick Presets */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-slate-300 whitespace-nowrap text-xs">
              Min CTC: <strong className="text-emerald-400 font-heading">₹{minCtc} LPA</strong>
            </span>
            <input
              type="range"
              min="0"
              max={maxSliderCtc}
              step="1"
              value={minCtc}
              onInput={(e) => setMinCtc(Number(e.target.value))}
              onChange={(e) => setMinCtc(Number(e.target.value))}
              style={{
                background: `linear-gradient(to right, #ff7849 0%, #ff7849 ${(minCtc / maxSliderCtc) * 100}%, rgba(255, 255, 255, 0.15) ${(minCtc / maxSliderCtc) * 100}%, rgba(255, 255, 255, 0.15) 100%)`
              }}
              className="w-28 sm:w-36 glass-range-slider cursor-pointer"
              title={`Minimum CTC: ₹${minCtc} LPA`}
            />
          </div>

          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
            {filteredDrives.length} drives
          </span>

          {minCtc > 0 && (
            <button
              onClick={() => setMinCtc(0)}
              className="text-[10px] text-slate-400 hover:text-white underline ml-1"
              title="Reset CTC filter"
            >
              Reset
            </button>
          )}
        </div>

      </div>

      {/* Drives Grid */}
      {filteredDrives.length === 0 ? (
        <div className="p-12 text-center glass-inner-card rounded-3xl border border-white/10 space-y-3">
          <Briefcase className="w-12 h-12 text-slate-400 mx-auto" />
          <p className="text-base font-bold text-white">No recruitment drives found matching your criteria</p>
          <p className="text-xs text-slate-400">Try clearing your filters or search terms</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrives.map(drive => {
            const { eligible, reasons } = api.evaluateEligibility(currentUser, drive);

            return (
              <div
                key={drive.id}
                className="glass-inner-card p-6 rounded-[28px] flex flex-col justify-between relative overflow-hidden border border-white/10 hover:border-white/20 transition-all group shadow-xl"
              >
                <div>
                  {/* Top Bar: Company & Tier Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 p-1 flex items-center justify-center font-bold text-white text-sm shadow-md">
                        {drive.companyName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white font-heading">{drive.companyName}</h4>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#ff7849]" /> {drive.location}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/10 text-cyan-300 border border-white/15">
                      {drive.tier}
                    </span>
                  </div>

                  {/* Role Title & Description */}
                  <h3 className="text-base font-bold text-slate-100 font-heading mt-4 group-hover:text-cyan-300 transition-colors">
                    {drive.jobTitle}
                  </h3>

                  <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
                    {drive.description}
                  </p>

                  {/* Eligibility & Criteria Pills */}
                  <div className="mt-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs backdrop-blur-md">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400">Min CGPA:</span>
                      <strong className="text-white font-heading">{drive.criteria?.minCgpa || 7.0}</strong>
                    </div>

                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400">Branches:</span>
                      <span className="text-cyan-300 font-medium">
                        {(drive.criteria?.allowedBranches || []).join(', ')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400">Max Backlogs:</span>
                      <span className="text-emerald-400 font-medium">
                        {drive.criteria?.maxBacklogs ?? 0} allowed
                      </span>
                    </div>
                  </div>

                  {/* Automated Eligibility Indicator for Students */}
                  {currentUser?.role === 'Student' && (
                    <div className="mt-3">
                      {eligible ? (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Eligible to Apply</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs text-rose-400 font-semibold" title={reasons.join(' | ')}>
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span className="truncate">Ineligible: {reasons[0]}</span>
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Footer: Package & Action */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Compensation</span>
                    <span className="text-lg font-bold text-emerald-400 font-heading">
                      ₹ {drive.packageLpa} LPA
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectDriveForApply(drive)}
                    className="px-4 py-2 rounded-xl btn-orange-glow text-xs font-bold shadow-md cursor-pointer"
                  >
                    {currentUser?.role === 'Student' ? 'Apply Now' : 'Inspect Drive Details'}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
