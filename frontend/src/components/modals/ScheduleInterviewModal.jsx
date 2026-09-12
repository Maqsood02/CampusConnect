import React, { useState } from 'react';
import { X, CalendarCheck, Sparkles } from 'lucide-react';
import { api } from '../../services/api';

export default function ScheduleInterviewModal({
  isOpen,
  onClose,
  onInterviewScheduled,
  applications = [],
  defaultApplication = null
}) {
  const [selectedAppId, setSelectedAppId] = useState(defaultApplication ? defaultApplication.id : (applications[0]?.id || ''));
  const [roundName, setRoundName] = useState('Technical Interview Round 1');
  const [roundNumber, setRoundNumber] = useState('1');
  const [scheduledTime, setScheduledTime] = useState('');
  const [locationOrLink, setLocationOrLink] = useState('https://meet.google.com/cpms-live-interview');
  const [remarks, setRemarks] = useState('Candidate shortlisted based on online assessment performance.');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const currentApp = applications.find(a => a.id === selectedAppId) || defaultApplication || applications[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentApp) {
      setError('Please select an eligible application');
      return;
    }
    if (!scheduledTime) {
      setError('Please choose date & time');
      return;
    }

    try {
      const interview = api.scheduleInterview({
        applicationId: currentApp.id,
        driveId: currentApp.driveId,
        studentId: currentApp.studentId,
        candidateName: currentApp.studentName,
        companyName: currentApp.companyName,
        jobTitle: currentApp.jobTitle,
        roundName,
        roundNumber,
        scheduledTime,
        locationOrLink,
        remarks
      });
      onInterviewScheduled(interview);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to schedule interview');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[92vh] flex flex-col rounded-[32px] bg-gradient-to-b from-white/[0.14] via-white/[0.06] to-white/[0.03] backdrop-blur-3xl border border-white/30 shadow-[0_30px_90px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.45),inset_0_0_0_1px_rgba(255,255,255,0.12)] overflow-hidden m-auto">
        
        {/* Subtle Ambient Radial Glow Orbs */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#ff7849]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header - Fixed Glass */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/20 bg-white/[0.04] backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-cyan-500/35 to-sky-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                Schedule Interview Round
                <Sparkles className="w-4 h-4 text-[#ff7849]" />
              </h3>
              <p className="text-xs text-slate-300/80">
                Official Placement Officer Interview Dispatcher
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Container with Scrollable Body and Fixed Footer */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
          
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 text-xs">
            {error && (
              <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold backdrop-blur-md">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Candidate Application *</label>
              <select
                value={selectedAppId}
                onChange={(e) => setSelectedAppId(e.target.value)}
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
              >
                {applications.map(app => (
                  <option key={app.id} value={app.id}>
                    {app.studentName} ({app.rollNumber}) — {app.companyName} ({app.jobTitle})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Round Designation *</label>
                <input
                  type="text"
                  required
                  value={roundName}
                  onChange={(e) => setRoundName(e.target.value)}
                  placeholder="e.g. Technical System Design"
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Round Number</label>
                <select
                  value={roundNumber}
                  onChange={(e) => setRoundNumber(e.target.value)}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                >
                  <option value="1">Round 1 (Coding / Technical)</option>
                  <option value="2">Round 2 (Architecture / Deep Dive)</option>
                  <option value="3">Round 3 (Managerial / HR)</option>
                  <option value="4">Round 4 (Final Offer Rollout)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Scheduled Date & Time *</label>
              <input
                type="datetime-local"
                required
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Meeting Link or Campus Room *</label>
              <input
                type="text"
                required
                value={locationOrLink}
                onChange={(e) => setLocationOrLink(e.target.value)}
                placeholder="e.g. https://meet.google.com/xyz or Seminar Hall A"
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Preparation Instructions & Remarks</label>
              <textarea
                rows="2"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs resize-none"
              />
            </div>

          </div>

          {/* Fixed Footer */}
          <div className="px-6 py-4 border-t border-white/20 bg-white/[0.04] backdrop-blur-xl flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-slate-300 hover:text-white text-xs font-semibold border border-white/20 transition-all shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-2xl btn-orange-glow text-xs font-bold shadow-lg transition-all"
            >
              Confirm & Notify Student
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
