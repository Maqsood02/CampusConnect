import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Send,
  FileText,
  Eye,
  UploadCloud,
  Check,
  Sparkles,
  FileCheck
} from 'lucide-react';
import { api } from '../../services/api';
import confetti from 'canvas-confetti';

export default function ApplyModal({ isOpen, onClose, drive, student, onApplied }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Auto-Selected Resume from student profile
  const defaultResume = `${student?.fullName ? student.fullName.replace(/\s+/g, '_') : 'Alex_Mercer'}_Verified_Resume_2026.pdf`;
  const [selectedResume, setSelectedResume] = useState(defaultResume);
  const [isCustomUploaded, setIsCustomUploaded] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  if (!isOpen || !drive) return null;

  const { eligible, reasons } = api.evaluateEligibility(student, drive);

  const handleCustomResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedResume(file.name);
      setIsCustomUploaded(true);
    }
  };

  const handleApply = async () => {
    if (!eligible) return;
    setLoading(true);
    setError('');
    try {
      const app = api.applyToDrive(drive.id, { resumeName: selectedResume });
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      onApplied(app);
      onClose();
    } catch (err) {
      setError(err.message || 'Application submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[92vh] flex flex-col rounded-[32px] bg-gradient-to-b from-white/[0.14] via-white/[0.06] to-white/[0.03] backdrop-blur-3xl border border-white/30 shadow-[0_30px_90px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.45),inset_0_0_0_1px_rgba(255,255,255,0.12)] overflow-hidden m-auto">
        
        {/* Subtle Ambient Radial Glow Orbs inside Modal */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#ff7849]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header - Fixed Glass */}
        <div className="relative flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/20 shrink-0 bg-white/[0.04] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#ff7849]/35 to-[#f97316]/20 text-[#ff7849] border border-[#ff7849]/40 shadow-[0_0_15px_rgba(255,120,73,0.3)]">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-white tracking-wide">
                {student?.role === 'Student' ? 'Submit Job Application' : 'Corporate Drive Specifications & Criteria'}
              </h3>
              <p className="text-xs text-slate-300/80">
                {student?.role === 'Student' ? 'Placement Cell Automated Verification Desk' : 'Officer Inspection & Criteria Review Mode'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/10 cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="relative flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-3.5">
          {error && (
            <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold backdrop-blur-md">
              {error}
            </div>
          )}

          {/* Drive Snapshot */}
          <div className="p-4 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/20 space-y-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#ff7849] uppercase tracking-wider">
                {drive.companyName}
              </span>
              <span className="text-sm font-bold text-emerald-400 font-heading">
                ₹ {drive.packageLpa} LPA CTC
              </span>
            </div>
            <h4 className="text-base font-bold text-white font-heading">{drive.jobTitle}</h4>
            <p className="text-xs text-slate-300">{drive.location} • Drive Date: {drive.driveDate}</p>
          </div>

          {/* Automated Eligibility Evaluation Box */}
          <div>
            {eligible ? (
              <div className="p-4 rounded-2xl bg-emerald-500/[0.14] backdrop-blur-xl border border-emerald-400/40 text-xs space-y-1 shadow-[0_4px_20px_rgba(16,185,129,0.15),inset_0_1px_1px_rgba(255,255,255,0.2)]">
                <div className="flex items-center gap-2 text-emerald-300 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Eligibility Confirmed: 100% Match</span>
                </div>
                <p className="text-slate-200 text-xs leading-relaxed">
                  Your CGPA ({student?.cgpa || 9.15}), department ({student?.branch || 'CSE'}), and backlogs record ({student?.activeBacklogs ?? 0}) satisfy all criteria stipulated for this recruitment drive.
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-rose-500/[0.15] backdrop-blur-xl border border-rose-400/40 text-xs space-y-1 shadow-[0_4px_20px_rgba(244,63,94,0.15)]">
                <div className="flex items-center gap-2 text-rose-300 font-bold">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Eligibility Constraint Violation</span>
                </div>
                <ul className="list-disc list-inside text-rose-300 text-xs space-y-1">
                  {reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Auto-Selected Resume from Student Profile */}
          <div className="p-4 rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/20 space-y-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Auto-Selected Resume</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/25 text-emerald-300 border border-emerald-400/40 shadow-sm">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                {isCustomUploaded ? 'Custom Resume Attached' : 'Auto-Selected from Profile'}
              </span>
            </div>

            {/* Resume Document Box */}
            <div className="p-3 rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/25 flex items-center justify-between gap-2.5 shadow-md">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500/35 to-orange-500/30 border border-rose-400/50 flex items-center justify-center text-rose-300 font-black text-xs shrink-0 shadow-sm">
                  PDF
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                    <span className="truncate">{selectedResume}</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#ff7849] shrink-0" />
                  </p>
                  <p className="text-[10px] text-slate-300 mt-0.5 font-medium truncate">
                    {isCustomUploaded ? 'Custom uploaded document' : '2.4 MB • Verified from Student Profile • TPO Approved'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold flex items-center gap-1.5 transition-all border ${
                    isPreviewOpen 
                      ? 'bg-cyan-500/30 text-cyan-200 border-cyan-400/60 shadow-[0_0_12px_rgba(34,211,238,0.3)]' 
                      : 'bg-white/10 hover:bg-white/20 text-cyan-300 hover:text-cyan-200 border-white/20 shadow-sm'
                  }`}
                  title="Preview Resume"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isPreviewOpen ? 'Hide' : 'Preview'}</span>
                </button>

                <label className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-[11px] font-semibold flex items-center gap-1.5 transition-all border border-white/20 shadow-sm cursor-pointer" title="Upload custom resume">
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Replace</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCustomResumeUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Interactive Resume Preview Snapshot */}
            {isPreviewOpen && (
              <div className="p-3.5 rounded-xl bg-black/50 backdrop-blur-2xl border border-cyan-400/40 text-xs space-y-2 animate-in fade-in slide-in-from-top-2 duration-200 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/15 pb-1.5">
                  <span className="font-bold text-white flex items-center gap-1.5 text-[11px]">
                    <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
                    Portfolio Resume: {student?.fullName || 'Alex Mercer'}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono font-semibold">TPO Verified</span>
                </div>
                <div className="text-[11px] text-slate-200 space-y-1">
                  <p><strong className="text-white">Education:</strong> B.Tech in {student?.branch || 'CSE'} ({student?.graduationYear || 2026} Batch) • CGPA: {student?.cgpa || 9.15}/10</p>
                  <p><strong className="text-white">Technical Skills:</strong> Python, React.js, Java & Spring Boot, MongoDB, Docker, Cloud</p>
                  <p><strong className="text-white">Projects:</strong> Distributed Placement Management Portal, AI Resume Ranker</p>
                  <p><strong className="text-white">Internship:</strong> Software Engineering Intern at TechCorp Solutions (Summer 2025)</p>
                </div>
              </div>
            )}

            {/* Student Credentials Summary */}
            <div className="pt-2 border-t border-white/15 flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium">
                Applicant: <strong className="text-white">{student?.fullName || 'Alex Mercer'}</strong> ({student?.rollNumber || '2022CSE042'})
              </span>
              <span className="text-cyan-300 font-mono font-bold">CGPA: {student?.cgpa || 9.15}</span>
            </div>

          </div>
        </div>

        {/* Actions - Fixed Glass Bottom */}
        <div className="relative px-5 sm:px-6 py-4 border-t border-white/20 shrink-0 bg-white/[0.03] backdrop-blur-2xl flex items-center justify-between gap-3">
          {student?.role !== 'Student' ? (
            <span className="text-[11px] text-amber-300 italic font-medium">
              🔒 Staff Review: Student scholars can apply from their student portals.
            </span>
          ) : (
            <span className="text-[11px] text-slate-400">
              {eligible ? 'Verified eligible to submit' : 'Criteria not fulfilled'}
            </span>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-semibold transition-all border border-white/20 shadow-sm cursor-pointer"
            >
              {student?.role !== 'Student' ? 'Close Review' : 'Cancel'}
            </button>
            {student?.role === 'Student' && (
              <button
                type="button"
                disabled={!eligible || loading}
                onClick={handleApply}
                className={`px-5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
                  eligible
                    ? 'btn-orange-glow text-white shadow-[0_4px_20px_rgba(249,115,22,0.45)] hover:shadow-[0_6px_25px_rgba(249,115,22,0.65)]'
                    : 'bg-white/10 text-slate-500 border border-white/10 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Submitting...' : 'Confirm & Apply'}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
