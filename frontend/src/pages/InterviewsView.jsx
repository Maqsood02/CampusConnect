import React, { useState } from 'react';
import {
  CalendarDays,
  Clock,
  Video,
  MapPin,
  ExternalLink,
  Sparkles,
  Plus,
  Star,
  CheckCircle2,
  Users,
  Award,
  Filter,
  Check,
  X
} from 'lucide-react';
import { api } from '../services/api';

export default function InterviewsView({ interviews = [], currentUser, onOpenScheduleInterview }) {
  const [filterMode, setFilterMode] = useState('ALL');
  const [selectedInterviewForEval, setSelectedInterviewForEval] = useState(null);
  const [evalRating, setEvalRating] = useState(5);
  const [evalVerdict, setEvalVerdict] = useState('RECOMMENDED');
  const [evalNotes, setEvalNotes] = useState('');

  const isOfficerOrAdmin = currentUser?.role === 'Placement Officer' || currentUser?.role === 'Administrator';

  const filteredInterviews = interviews.filter(iv => {
    // Strict RBAC: Student only sees their own interviews
    if (currentUser?.role === 'Student') {
      const isOwn = iv.studentId === currentUser.id ||
        (iv.candidateName && currentUser.fullName && iv.candidateName.toLowerCase() === currentUser.fullName.toLowerCase());
      if (!isOwn) return false;
    }
    if (filterMode === 'ALL') return true;
    if (filterMode === 'COMPLETED') return iv.status === 'COMPLETED';
    if (filterMode === 'SCHEDULED') return iv.status === 'SCHEDULED';
    if (filterMode === 'VIRTUAL') return iv.mode === 'VIRTUAL';
    return true;
  });

  const handleOpenEvaluate = (iv) => {
    setSelectedInterviewForEval(iv);
    setEvalRating(iv.rating || 5);
    setEvalVerdict(iv.verdict || 'RECOMMENDED');
    setEvalNotes(iv.feedbackNotes || '');
  };

  const handleSubmitEvaluation = (e) => {
    e.preventDefault();
    if (!selectedInterviewForEval) return;

    api.evaluateInterview(selectedInterviewForEval.id, {
      rating: evalRating,
      verdict: evalVerdict,
      feedbackNotes: evalNotes
    });

    setSelectedInterviewForEval(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-[30px] glass-inner-card border border-white/15 bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent backdrop-blur-2xl shadow-2xl">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight flex items-center gap-2">
            {currentUser?.role === 'Student' ? 'My Scheduled Interviews & Outcomes' : 'Interviews Hub & Evaluation Panel'}
            <Sparkles className="w-5 h-5 text-[#ff7849]" />
          </h2>
          <p className="text-xs text-slate-300/80 mt-1">
            {currentUser?.role === 'Student'
              ? 'Your technical assessment rounds, virtual interview room links, and panelist feedback.'
              : 'Institutional technical assessment panels, virtual coding interview rooms, and panel evaluation outcomes.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10 text-xs">
            {['ALL', 'SCHEDULED', 'COMPLETED', 'VIRTUAL'].map(mode => (
              <button
                key={mode}
                onClick={() => setFilterMode(mode)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                  filterMode === mode
                    ? 'bg-[#ff7849] text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {isOfficerOrAdmin && (
            <button
              onClick={onOpenScheduleInterview}
              className="px-4 py-2.5 rounded-2xl btn-orange-glow font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule Round</span>
            </button>
          )}
        </div>
      </div>

      {/* Interview Cards Grid */}
      {filteredInterviews.length === 0 ? (
        <div className="p-12 text-center glass-inner-card rounded-3xl border border-white/10 space-y-3">
          <CalendarDays className="w-12 h-12 text-slate-400 mx-auto" />
          <p className="text-base font-bold text-white">No interviews in this filter</p>
          <p className="text-xs text-slate-400">Scheduled rounds and evaluation panels will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredInterviews.map(iv => {
            const isCompleted = iv.status === 'COMPLETED';

            return (
              <div
                key={iv.id}
                className="glass-inner-card p-6 rounded-[28px] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between shadow-xl space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 bg-white/10 px-3 py-1 rounded-xl border border-white/15">
                      {iv.companyName}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        iv.mode === 'VIRTUAL'
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      }`}>
                        {iv.mode || 'VIRTUAL'}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}>
                        {iv.status}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white font-heading mt-3 tracking-wide">
                    {iv.roundName}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-cyan-300 font-semibold mt-1">
                    <span>Round {iv.roundNumber}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-300 font-normal">Candidate: <strong className="text-white">{iv.candidateName}</strong></span>
                  </div>

                  {/* Date, Time & Venue */}
                  <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 text-xs backdrop-blur-md">
                    <div className="flex items-center gap-2 text-slate-200 font-medium">
                      <Clock className="w-4 h-4 text-[#ff7849]" />
                      <span className="font-semibold text-white">{new Date(iv.scheduledTime).toLocaleString()}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-300">
                      {iv.locationOrLink && iv.locationOrLink.startsWith('http') ? (
                        <Video className="w-4 h-4 text-cyan-400 shrink-0" />
                      ) : (
                        <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                      )}
                      <span className="truncate">{iv.locationOrLink}</span>
                    </div>

                    {iv.interviewerName && (
                      <div className="flex items-center gap-2 text-slate-400 text-[11px] pt-1 border-t border-white/5">
                        <Users className="w-3.5 h-3.5 text-purple-400" />
                        <span>Panel: <strong className="text-slate-200">{iv.interviewerName}</strong></span>
                      </div>
                    )}
                  </div>

                  {/* Evaluation Result if Completed */}
                  {isCompleted && iv.verdict && (
                    <div className="mt-3.5 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wide flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Verdict: {iv.verdict}
                        </span>
                        {iv.rating && (
                          <div className="flex items-center gap-0.5 text-amber-400">
                            {[...Array(iv.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400" />
                            ))}
                          </div>
                        )}
                      </div>
                      {iv.feedbackNotes && (
                        <p className="text-[11px] text-slate-300 italic">
                          &ldquo;{iv.feedbackNotes}&rdquo;
                        </p>
                      )}
                    </div>
                  )}

                  {iv.remarks && !isCompleted && (
                    <p className="text-xs text-slate-300 mt-3 italic bg-white/5 p-2.5 rounded-xl border border-white/5">
                      &ldquo;{iv.remarks}&rdquo;
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Host: Talent Acquisition Panel
                  </span>

                  <div className="flex items-center gap-2">
                    {isOfficerOrAdmin && (
                      <button
                        onClick={() => handleOpenEvaluate(iv)}
                        className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold cursor-pointer transition-colors"
                      >
                        {isCompleted ? 'Update Evaluation' : 'Evaluate Round'}
                      </button>
                    )}

                    {iv.locationOrLink && iv.locationOrLink.startsWith('http') ? (
                      <a
                        href={iv.locationOrLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl btn-orange-glow text-xs font-bold shadow-md cursor-pointer"
                      >
                        <span>Join Room</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="px-3 py-1.5 rounded-xl bg-white/10 text-xs text-slate-200 font-medium border border-white/10">
                        In-Person Hall
                      </span>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Evaluation Modal */}
      {selectedInterviewForEval && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-[32px] bg-gradient-to-b from-white/[0.16] via-white/[0.07] to-white/[0.03] backdrop-blur-3xl border border-white/30 shadow-[0_30px_90px_rgba(0,0,0,0.7),inset_0_1px_2px_0_rgba(255,255,255,0.5),inset_0_0_0_1px_rgba(255,255,255,0.12)] p-6 sm:p-7 space-y-4 overflow-hidden m-auto">
            
            {/* Glowing Ambient Radial Glow Orbs */}
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-amber-500/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-[#ff7849]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-3 border-b border-white/15 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-2xl bg-gradient-to-br from-amber-500/35 to-orange-500/20 text-amber-300 border border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-heading text-white">
                    Panel Evaluation &amp; Verdict
                  </h3>
                  <p className="text-xs text-slate-300">{selectedInterviewForEval.candidateName} • {selectedInterviewForEval.companyName}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedInterviewForEval(null)}
                className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitEvaluation} className="space-y-4 text-xs relative z-10">
              <div>
                <label className="text-slate-200 font-semibold block mb-1.5">Candidate Rating (1 to 5 Stars)</label>
                <div className="flex items-center gap-2 p-2 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEvalRating(star)}
                      className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/15 transition-all hover:scale-110 cursor-pointer"
                    >
                      <Star className={`w-5 h-5 ${star <= evalRating ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'text-slate-500'}`} />
                    </button>
                  ))}
                  <span className="font-bold text-amber-300 pl-2 text-sm font-mono">{evalRating} / 5 Stars</span>
                </div>
              </div>

              <div>
                <label className="text-slate-200 font-semibold block mb-1.5">Recommendation Verdict</label>
                <select
                  value={evalVerdict}
                  onChange={(e) => setEvalVerdict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium text-white bg-white/[0.08] hover:bg-white/[0.12] focus:bg-slate-900 border border-white/20 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all backdrop-blur-md cursor-pointer"
                >
                  <option value="RECOMMENDED" className="bg-slate-900 text-white">Recommended for Next Round</option>
                  <option value="OFFERED" className="bg-slate-900 text-emerald-300 font-bold">Direct Offer Recommendation</option>
                  <option value="NEXT_ROUND" className="bg-slate-900 text-cyan-300">Technical Round 2 Required</option>
                  <option value="REJECTED" className="bg-slate-900 text-rose-300">Did Not Meet Cutoff (Reject)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-200 font-semibold block mb-1.5">Panelist Technical &amp; Cultural Notes</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Record strengths, algorithm accuracy, system design feedback..."
                  value={evalNotes}
                  onChange={(e) => setEvalNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs text-white placeholder:text-slate-400 bg-white/[0.07] hover:bg-white/[0.1] focus:bg-white/[0.12] border border-white/20 focus:border-[#ff7849]/70 focus:outline-none focus:ring-2 focus:ring-[#ff7849]/30 transition-all backdrop-blur-md shadow-inner leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/15">
                <button
                  type="button"
                  onClick={() => setSelectedInterviewForEval(null)}
                  className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white font-semibold text-xs border border-white/15 transition-all shadow-md backdrop-blur-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff7849] via-[#f97316] to-[#ea580c] text-white font-bold text-xs shadow-[0_0_20px_rgba(255,120,73,0.5)] hover:opacity-95 cursor-pointer transition-all flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save &amp; Submit Evaluation</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
