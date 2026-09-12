import React, { useState } from 'react';
import {
  FileCheck2,
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  Calendar,
  Sparkles,
  TrendingUp,
  Building,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Check,
  FileText
} from 'lucide-react';
import { api } from '../services/api';

export default function ApplicationsView({ applications = [], currentUser }) {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedAppId, setExpandedAppId] = useState(null);

  const myApplications = currentUser?.role === 'Student'
    ? applications.filter(a => a.studentId === currentUser.id || a.rollNumber === currentUser.rollNumber)
    : applications;

  const filteredApps = myApplications.filter(app => {
    const matchesFilter = filterStatus === 'ALL' || app.status === filterStatus;
    const matchesSearch =
      app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.studentName && app.studentName.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'SELECTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
            <Award className="w-3.5 h-3.5 text-emerald-400" /> Offered / Selected 🎉
          </span>
        );
      case 'SHORTLISTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Shortlisted
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <XCircle className="w-3.5 h-3.5 text-rose-400" /> Not Selected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#ff7849]/20 text-[#ff7849] border border-[#ff7849]/30">
            <Clock className="w-3.5 h-3.5 text-[#ff7849]" /> Applied / Under Review
          </span>
        );
    }
  };

  const getStageStepNumber = (app) => {
    if (app.status === 'SELECTED') return 5;
    if (app.stage === 'HR_ROUND') return 4;
    if (app.stage === 'TECHNICAL_ROUND') return 3;
    if (app.status === 'SHORTLISTED' || app.stage === 'SHORTLISTED') return 2;
    return 1;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-[30px] glass-inner-card border border-white/15 bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent backdrop-blur-2xl shadow-2xl">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight flex items-center gap-2">
            Applications &amp; Stage Progression Tracker
            <Sparkles className="w-5 h-5 text-[#ff7849]" />
          </h2>
          <p className="text-xs text-slate-300/80 mt-1">
            Real-time status tracking across online assessments, shortlists, interview rounds, and official placement offers.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs py-1">
          {['ALL', 'APPLIED', 'SHORTLISTED', 'SELECTED', 'REJECTED'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                filterStatus === st
                  ? 'bg-gradient-to-r from-[#ff7849] to-[#f97316] text-white shadow-md shadow-[#ff7849]/30 border border-[#ff7849]/50 scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <div className="p-12 text-center glass-inner-card rounded-3xl border border-white/10 space-y-3">
          <FileCheck2 className="w-12 h-12 text-slate-400 mx-auto" />
          <p className="text-base font-bold text-white">No applications in this category</p>
          <p className="text-xs text-slate-400">Visit the Job Board to discover and apply to active corporate drives</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApps.map(app => {
            const stepNum = getStageStepNumber(app);
            const isExpanded = expandedAppId === app.id;

            return (
              <div
                key={app.id}
                className="glass-inner-card p-5 sm:p-6 rounded-[28px] border border-white/10 hover:border-white/20 transition-all shadow-xl space-y-4"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center font-bold text-white text-base shadow-md shrink-0">
                      {app.companyName.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-lg font-bold text-white font-heading tracking-wide">
                          {app.companyName}
                        </h3>
                        {getStatusBadge(app.status)}
                      </div>

                      <p className="text-sm font-semibold text-cyan-300 mt-1">
                        {app.jobTitle}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 mt-2">
                        <span className="text-emerald-400 font-bold font-heading">
                          ₹ {app.packageLpa || 15.0} LPA CTC
                        </span>
                        <span className="text-slate-500">•</span>
                        <span className="flex items-center gap-1 font-medium text-slate-300">
                          <Calendar className="w-3.5 h-3.5 text-[#ff7849]" /> Applied: {app.applicationDate}
                        </span>
                        {currentUser?.role !== 'Student' && (
                          <>
                            <span className="text-slate-500">•</span>
                            <span className="text-slate-200 font-medium">Candidate: {app.studentName} ({app.branch})</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stage Visual Stepper Gauge */}
                  <div className="w-full md:w-64 bg-white/5 p-4 rounded-2xl border border-white/10 text-xs self-stretch flex flex-col justify-center backdrop-blur-md">
                    <div className="flex justify-between text-[11px] text-slate-300 mb-2 font-medium">
                      <span>Recruitment Stage</span>
                      <span className="font-bold text-white">
                        {app.status === 'SELECTED' ? 'Stage 5/5' : `Stage ${stepNum}/5`}
                      </span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          app.status === 'SELECTED'
                            ? 'bg-gradient-to-r from-emerald-400 to-teal-400 w-full shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                            : app.status === 'SHORTLISTED' || stepNum >= 2
                            ? 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                            : app.status === 'REJECTED'
                            ? 'bg-gradient-to-r from-rose-500 to-red-600 w-full'
                            : 'bg-gradient-to-r from-[#ff7849] to-[#f97316] w-1/5 shadow-[0_0_10px_rgba(255,120,73,0.5)]'
                        }`}
                        style={{ width: `${(stepNum / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Progress Milestones Breadcrumbs */}
                <div className="grid grid-cols-5 gap-1.5 pt-2 text-[10px] text-center font-semibold">
                  <span className={`p-1.5 rounded-lg border ${stepNum >= 1 ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' : 'bg-white/5 text-slate-500 border-white/5'}`}>
                    1. Applied
                  </span>
                  <span className={`p-1.5 rounded-lg border ${stepNum >= 2 ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' : 'bg-white/5 text-slate-500 border-white/5'}`}>
                    2. Shortlist
                  </span>
                  <span className={`p-1.5 rounded-lg border ${stepNum >= 3 ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-white/5 text-slate-500 border-white/5'}`}>
                    3. Tech Round
                  </span>
                  <span className={`p-1.5 rounded-lg border ${stepNum >= 4 ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : 'bg-white/5 text-slate-500 border-white/5'}`}>
                    4. HR Round
                  </span>
                  <span className={`p-1.5 rounded-lg border ${stepNum >= 5 ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-white/5 text-slate-500 border-white/5'}`}>
                    5. Offered 🎉
                  </span>
                </div>

                {/* Feedback Note */}
                {app.feedback && (
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 backdrop-blur-md flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#ff7849] font-bold block mb-0.5">
                        Placement Cell Latest Milestone Feedback:
                      </span>
                      {app.feedback}
                    </div>

                    <button
                      onClick={() => setExpandedAppId(isExpanded ? null : app.id)}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>{isExpanded ? 'Hide History' : 'Stage History'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}

                {/* Expandable Detailed Stage History */}
                {isExpanded && app.stageHistory && app.stageHistory.length > 0 && (
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 text-xs animate-in fade-in">
                    <h5 className="font-bold text-white uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#ff7849]" /> Application Stage Milestones History
                    </h5>
                    <div className="divide-y divide-white/5">
                      {app.stageHistory.map((item, idx) => (
                        <div key={idx} className="py-2 flex items-start justify-between gap-3">
                          <div>
                            <span className="font-bold text-cyan-300 text-[11px] block">{item.stage}</span>
                            <span className="text-slate-300 text-[11px]">{item.notes}</span>
                          </div>
                          <span className="text-slate-400 text-[10px] whitespace-nowrap font-mono">{item.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Offer Action for Selected Scholars */}
                {app.status === 'SELECTED' && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 to-teal-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-bold text-emerald-300 text-sm block">🎉 Official Placement Offer Extended!</span>
                      <p className="text-slate-300 text-[11px]">
                        Review your corporate appointment terms, package breakup, and digitally confirm in the Placement Records Hub.
                      </p>
                    </div>
                    <a
                      href="#placement-records"
                      className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-900 font-bold text-xs hover:bg-emerald-400 transition-colors cursor-pointer shrink-0"
                    >
                      View in Offer Desk &rarr;
                    </a>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
