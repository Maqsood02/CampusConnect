import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Briefcase,
  Users,
  CalendarCheck,
  CheckCircle2,
  PlusCircle,
  Sparkles,
  Search,
  Plus,
  Trash2,
  BookOpen,
  Wand2,
  ToggleLeft,
  ToggleRight,
  Check,
  Brain,
  X
} from 'lucide-react';
import { api, subscribeToStore } from '../services/api';

export default function OfficerDeskView({
  drives = [],
  applications = [],
  interviews = [],
  students = [],
  onOpenPostDrive,
  onOpenScheduleInterview,
  onUpdateAppStatus,
  onVerifyStudent
}) {
  const [activeSubTab, setActiveSubTab] = useState('pipeline');
  const [selectedDriveFilter, setSelectedDriveFilter] = useState('ALL');
  const [searchStudent, setSearchStudent] = useState('');

  // Aptitude Management States
  const [aptitudeQuestions, setAptitudeQuestions] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [autoGenCompany, setAutoGenCompany] = useState('TCS NQT 2026');
  const [autoGenDifficulty, setAutoGenDifficulty] = useState('Medium');
  const [autoGenCount, setAutoGenCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genSuccessMsg, setGenSuccessMsg] = useState('');

  // Upload Form State
  const [uploadCategory, setUploadCategory] = useState('Quantitative');
  const [uploadCompany, setUploadCompany] = useState('Campus General');
  const [uploadDifficulty, setUploadDifficulty] = useState('Medium');
  const [uploadQuestion, setUploadQuestion] = useState('');
  const [uploadOptions, setUploadOptions] = useState(['', '', '', '']);
  const [uploadCorrect, setUploadCorrect] = useState(0);
  const [uploadExplanation, setUploadExplanation] = useState('');

  useEffect(() => {
    setAptitudeQuestions(api.getAptitudeQuestions());
    const unsub = subscribeToStore((s) => {
      if (s.aptitudeQuestions) setAptitudeQuestions(s.aptitudeQuestions);
    });
    return () => unsub();
  }, []);

  const handleManualUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadQuestion.trim()) return;

    api.addAptitudeQuestion({
      category: uploadCategory,
      companyTag: uploadCompany,
      difficulty: uploadDifficulty,
      question: uploadQuestion,
      options: uploadOptions,
      correctAnswer: uploadCorrect,
      explanation: uploadExplanation
    });

    setShowUploadModal(false);
    setUploadQuestion('');
    setUploadOptions(['', '', '', '']);
    setUploadExplanation('');
  };

  const handleTriggerAutoGen = () => {
    setIsGenerating(true);
    setGenSuccessMsg('');

    setTimeout(() => {
      api.autoGenerateAptitudeTestSuite({
        company: autoGenCompany,
        count: autoGenCount,
        difficulty: autoGenDifficulty
      });
      setIsGenerating(false);
      setGenSuccessMsg(`Successfully synthesized and published ${autoGenCount} questions for ${autoGenCompany}!`);
      setTimeout(() => setGenSuccessMsg(''), 4000);
    }, 600);
  };

  // Candidate Shortlisting States
  const [selectedShortlistDrive, setSelectedShortlistDrive] = useState(drives[0]?.id || 'ALL');
  const [selectedCandidateIds, setSelectedCandidateIds] = useState([]);
  const [shortlistSuccessMsg, setShortlistSuccessMsg] = useState('');

  const checkEligibility = (app, drive) => {
    if (!drive || !drive.criteria) return { isEligible: true, reasons: [] };
    const reasons = [];
    const crit = drive.criteria;

    if (crit.minCgpa && app.cgpa < crit.minCgpa) {
      reasons.push(`CGPA ${app.cgpa} < Min ${crit.minCgpa}`);
    }
    if (crit.allowedBranches && crit.allowedBranches.length > 0 && !crit.allowedBranches.includes(app.branch)) {
      reasons.push(`Branch ${app.branch} not in [${crit.allowedBranches.join(', ')}]`);
    }

    return {
      isEligible: reasons.length === 0,
      reasons
    };
  };

  const handleBulkShortlistAll = () => {
    const targetDrive = drives.find(d => d.id === selectedShortlistDrive);
    const driveApps = applications.filter(a => selectedShortlistDrive === 'ALL' || a.driveId === selectedShortlistDrive);
    const eligibleApps = driveApps.filter(a => {
      const drive = drives.find(d => d.id === a.driveId) || targetDrive;
      return checkEligibility(a, drive).isEligible && a.status === 'APPLIED';
    });

    if (eligibleApps.length === 0) {
      setShortlistSuccessMsg('No unshortlisted eligible candidates found for this drive.');
      setTimeout(() => setShortlistSuccessMsg(''), 3500);
      return;
    }

    api.bulkShortlistCandidates(selectedShortlistDrive, eligibleApps.map(a => a.id));
    setShortlistSuccessMsg(`Successfully batch-shortlisted ${eligibleApps.length} eligible candidates!`);
    setTimeout(() => setShortlistSuccessMsg(''), 4000);
  };

  const handleBulkShortlistSelected = () => {
    if (selectedCandidateIds.length === 0) return;
    api.bulkShortlistCandidates(selectedShortlistDrive, selectedCandidateIds);
    setShortlistSuccessMsg(`Successfully shortlisted ${selectedCandidateIds.length} selected candidates!`);
    setSelectedCandidateIds([]);
    setTimeout(() => setShortlistSuccessMsg(''), 4000);
  };

  const handleAdvanceStage = (appId, stage, note = '') => {
    api.advanceApplicationStage(appId, stage, note);
  };

  const filteredCandidates = applications.filter(app => {
    const matchesDrive = selectedDriveFilter === 'ALL' || app.driveId === selectedDriveFilter;
    const matchesName =
      app.studentName.toLowerCase().includes(searchStudent.toLowerCase()) ||
      app.companyName.toLowerCase().includes(searchStudent.toLowerCase()) ||
      app.rollNumber.toLowerCase().includes(searchStudent.toLowerCase());
    return matchesDrive && matchesName;
  });

  const pendingStudents = students.filter(s => s.verificationStatus === 'PENDING');

  const currentShortlistDrive = drives.find(d => d.id === selectedShortlistDrive) || drives[0];
  const shortlistCandidates = applications.filter(a => selectedShortlistDrive === 'ALL' || a.driveId === selectedShortlistDrive);


  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight flex items-center gap-2">
            Placement Officer Command Center
            <Sparkles className="w-5 h-5 text-[#ff7849]" />
          </h2>
          <p className="text-xs text-slate-300/80 mt-1">
            Master orchestration hub: manage corporate recruitment drives, evaluate candidate pipelines, schedule interview panels, and verify scholars.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={onOpenPostDrive}
            className="px-4 py-2.5 rounded-2xl btn-orange-glow font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" /> Post Job Drive
          </button>
          <button
            onClick={onOpenScheduleInterview}
            className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 text-xs font-semibold transition-colors"
          >
            Schedule Interview
          </button>
        </div>
      </div>

      {/* Subtabs Bar */}
      <div className="flex items-center gap-2 p-1.5 rounded-[22px] glass-inner-card border border-white/10 overflow-x-auto text-xs shadow-md">
        
        <button
          onClick={() => setActiveSubTab('pipeline')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'pipeline'
              ? 'bg-gradient-to-r from-[#ff7849] to-[#f97316] text-white shadow-md shadow-[#ff7849]/30'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Candidate Pipeline ({applications.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('shortlisting')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'shortlisting'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
              : 'text-cyan-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>Candidate Shortlisting Desk</span>
        </button>

        <button
          onClick={() => setActiveSubTab('drives')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'drives'
              ? 'bg-gradient-to-r from-[#ff7849] to-[#f97316] text-white shadow-md shadow-[#ff7849]/30'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Active Drives ({drives.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('interviews')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'interviews'
              ? 'bg-gradient-to-r from-[#ff7849] to-[#f97316] text-white shadow-md shadow-[#ff7849]/30'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Interview Panels ({interviews.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('verifications')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'verifications'
              ? 'bg-gradient-to-r from-[#ff7849] to-[#f97316] text-white shadow-md shadow-[#ff7849]/30'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Student Verifications ({pendingStudents.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('aptitude-mgmt')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'aptitude-mgmt'
              ? 'bg-gradient-to-r from-[#ff7849] to-[#f97316] text-white shadow-md shadow-[#ff7849]/30'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Aptitude &amp; Practice Manager</span>
        </button>

      </div>

      {/* ==============================================================================
          TAB 1: CANDIDATE APPLICATION PIPELINE
          ============================================================================== */}
      {activeSubTab === 'pipeline' && (
        <div className="space-y-4">
          
          {/* Controls Bar */}
          <div className="p-4 rounded-[24px] glass-inner-card border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search candidate name or roll number..."
                value={searchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
                className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-xs placeholder:text-slate-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-slate-400 text-xs whitespace-nowrap">Filter by Drive:</span>
              <select
                value={selectedDriveFilter}
                onChange={(e) => setSelectedDriveFilter(e.target.value)}
                className="glass-input px-3.5 py-2 rounded-xl text-xs bg-slate-900"
              >
                <option value="ALL">All Recruitment Drives</option>
                {drives.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.companyName} — {d.jobTitle}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Candidates Table */}
          <div className="glass-inner-card rounded-[28px] border border-white/10 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 border-b border-white/10 text-slate-400 font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="py-3.5 px-5">Candidate</th>
                    <th className="py-3.5 px-5">Recruitment Drive</th>
                    <th className="py-3.5 px-5">Academic Status</th>
                    <th className="py-3.5 px-5">Current Stage</th>
                    <th className="py-3.5 px-5 text-right">Officer Decisions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {filteredCandidates.map(cand => (
                    <tr key={cand.id} className="hover:bg-white/5 transition-colors">
                      
                      <td className="py-4 px-5">
                        <div className="font-bold text-white text-sm">{cand.studentName}</div>
                        <span className="text-cyan-300 font-mono text-xs">{cand.rollNumber}</span>
                      </td>

                      <td className="py-4 px-5">
                        <div className="font-semibold text-slate-100">{cand.companyName}</div>
                        <span className="text-slate-400 text-xs">{cand.jobTitle} (<span className="text-emerald-400 font-bold">₹{cand.packageLpa} LPA</span>)</span>
                      </td>

                      <td className="py-4 px-5">
                        <div className="text-slate-200 font-medium">Branch: {cand.branch}</div>
                        <span className="text-emerald-400 font-mono text-xs font-bold">CGPA: {cand.cgpa}</span>
                      </td>

                      <td className="py-4 px-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
                          cand.status === 'SELECTED'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : cand.status === 'SHORTLISTED'
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                            : cand.status === 'REJECTED'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-[#ff7849]/20 text-[#ff7849] border border-[#ff7849]/30'
                        }`}>
                          {cand.status}
                        </span>
                      </td>

                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          
                          {cand.status !== 'SHORTLISTED' && (
                            <button
                              onClick={() => onUpdateAppStatus(cand.id, 'SHORTLISTED', 'Candidate shortlisted by Placement Officer.')}
                              className="px-3 py-1.5 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-xs font-semibold hover:bg-cyan-500/25 transition-colors"
                            >
                              Shortlist
                            </button>
                          )}

                          {cand.status !== 'SELECTED' && (
                            <button
                              onClick={() => onUpdateAppStatus(cand.id, 'SELECTED', 'Candidate selected! Official Placement Offer Rolled Out.')}
                              className="px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-500/25 transition-colors"
                            >
                              Select / Offer
                            </button>
                          )}

                          {cand.status !== 'REJECTED' && (
                            <button
                              onClick={() => onUpdateAppStatus(cand.id, 'REJECTED', 'Application archived following round review.')}
                              className="px-3 py-1.5 rounded-xl bg-rose-500/15 text-rose-300 border border-rose-500/30 text-xs font-semibold hover:bg-rose-500/25 transition-colors"
                            >
                              Reject
                            </button>
                          )}

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ==============================================================================
          TAB: CANDIDATE SHORTLISTING DESK
          ============================================================================== */}
      {activeSubTab === 'shortlisting' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Header & Drive Selection Card */}
          <div className="p-6 rounded-[28px] glass-inner-card border border-cyan-500/30 bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-transparent backdrop-blur-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-xl shadow-lg">
                  ⚡
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                    Candidate Shortlisting &amp; Eligibility Desk
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold uppercase">
                      Automated Rules Engine
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300/90 mt-0.5">
                    Automated academic filtering against drive criteria with 1-click batch shortlisting and stage advancements.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto self-start md:self-center">
              <span className="text-slate-400 text-xs whitespace-nowrap font-medium">Select Drive:</span>
              <select
                value={selectedShortlistDrive}
                onChange={(e) => {
                  setSelectedShortlistDrive(e.target.value);
                  setSelectedCandidateIds([]);
                }}
                className="glass-input px-3.5 py-2 rounded-xl text-xs bg-slate-900 border border-cyan-400/40 font-semibold text-white"
              >
                {drives.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.companyName} — {d.jobTitle} (₹{d.packageLpa} LPA)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Drive Criteria Summary Banner */}
          {currentShortlistDrive && (
            <div className="p-5 rounded-[26px] glass-inner-card border border-white/10 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-bold text-[#ff7849] uppercase tracking-wider">
                  Active Criteria Profile: {currentShortlistDrive.companyName} ({currentShortlistDrive.jobTitle})
                </span>
                <span className="text-xs text-slate-400">
                  Drive Date: <strong className="text-white">{currentShortlistDrive.driveDate}</strong>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 text-[10px] block">Minimum CGPA</span>
                  <strong className="text-white font-mono font-bold">{currentShortlistDrive.criteria?.minCgpa || 7.0}</strong>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 text-[10px] block">Allowed Disciplines</span>
                  <strong className="text-cyan-300 truncate block">{currentShortlistDrive.criteria?.allowedBranches?.join(', ') || 'All Branches'}</strong>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 text-[10px] block">Max Backlogs Allowed</span>
                  <strong className="text-emerald-400 font-mono font-bold">{currentShortlistDrive.criteria?.maxBacklogs ?? 0} Backlogs</strong>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 text-[10px] block">Graduation Batch</span>
                  <strong className="text-amber-300 font-mono font-bold">{currentShortlistDrive.criteria?.graduationYear || 2026} Batch</strong>
                </div>
              </div>
            </div>
          )}

          {/* Action & Metric Bar */}
          <div className="p-4 rounded-[26px] glass-inner-card border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs shadow-xl">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-slate-300 font-medium">
                Applicants: <strong className="text-white font-bold">{shortlistCandidates.length}</strong>
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-medium">
                Eligible: <strong className="text-emerald-300 font-bold">{shortlistCandidates.filter(a => checkEligibility(a, currentShortlistDrive).isEligible).length}</strong>
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-cyan-400 font-medium">
                Shortlisted: <strong className="text-cyan-300 font-bold">{shortlistCandidates.filter(a => a.status === 'SHORTLISTED' || a.status === 'SELECTED').length}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleBulkShortlistSelected}
                disabled={selectedCandidateIds.length === 0}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 font-semibold text-xs disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                Shortlist Selected ({selectedCandidateIds.length})
              </button>

              <button
                onClick={handleBulkShortlistAll}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/30 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Shortlist All Eligible Candidates</span>
              </button>
            </div>
          </div>

          {shortlistSuccessMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{shortlistSuccessMsg}</span>
            </div>
          )}

          {/* Shortlisting Table */}
          <div className="glass-inner-card rounded-[28px] border border-white/10 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 border-b border-white/10 text-slate-400 font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4 w-10">
                      <input
                        type="checkbox"
                        checked={selectedCandidateIds.length > 0 && selectedCandidateIds.length === shortlistCandidates.length}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCandidateIds(shortlistCandidates.map(c => c.id));
                          } else {
                            setSelectedCandidateIds([]);
                          }
                        }}
                        className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                      />
                    </th>
                    <th className="py-3 px-4">Candidate Profile</th>
                    <th className="py-3 px-4">Academics &amp; Branch</th>
                    <th className="py-3 px-4">Eligibility Audit</th>
                    <th className="py-3 px-4">Current Stage</th>
                    <th className="py-3 px-4 text-right">Shortlist Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {shortlistCandidates.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        No candidate applications found for this recruitment drive.
                      </td>
                    </tr>
                  ) : (
                    shortlistCandidates.map(cand => {
                      const evalResult = checkEligibility(cand, currentShortlistDrive);
                      const isSelected = selectedCandidateIds.includes(cand.id);

                      return (
                        <tr key={cand.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-4 px-4">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {
                                setSelectedCandidateIds(prev =>
                                  prev.includes(cand.id) ? prev.filter(id => id !== cand.id) : [...prev, cand.id]
                                );
                              }}
                              className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                            />
                          </td>

                          <td className="py-4 px-4">
                            <div className="font-bold text-white text-sm">{cand.studentName}</div>
                            <span className="text-cyan-300 font-mono text-xs">{cand.rollNumber}</span>
                          </td>

                          <td className="py-4 px-4">
                            <div className="text-slate-200 font-medium">Branch: <strong className="text-white">{cand.branch}</strong></div>
                            <span className="text-emerald-400 font-mono text-xs font-bold">CGPA: {cand.cgpa}</span>
                          </td>

                          <td className="py-4 px-4">
                            {evalResult.isEligible ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-[10px]">
                                <Check className="w-3 h-3 text-emerald-400" /> Meets Criteria
                              </span>
                            ) : (
                              <div>
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold text-[10px]">
                                  <X className="w-3 h-3 text-rose-400" /> Criteria Unmet
                                </span>
                                <span className="text-[10px] text-slate-400 block mt-0.5">
                                  {evalResult.reasons.join(', ')}
                                </span>
                              </div>
                            )}
                          </td>

                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              cand.status === 'SELECTED'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : cand.status === 'SHORTLISTED'
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                : cand.status === 'REJECTED'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : 'bg-[#ff7849]/20 text-[#ff7849] border border-[#ff7849]/30'
                            }`}>
                              {cand.stage || cand.status}
                            </span>
                          </td>

                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {cand.status !== 'SHORTLISTED' && cand.status !== 'SELECTED' && (
                                <button
                                  onClick={() => onUpdateAppStatus(cand.id, 'SHORTLISTED', 'Shortlisted by Placement Officer.')}
                                  className="px-3 py-1.5 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-xs font-semibold hover:bg-cyan-500/25 transition-colors cursor-pointer"
                                >
                                  Shortlist
                                </button>
                              )}

                              {cand.status === 'SHORTLISTED' && (
                                <span className="px-2.5 py-1 text-xs font-semibold text-emerald-300">
                                  Shortlisted ✓
                                </span>
                              )}

                              <button
                                onClick={() => handleAdvanceStage(cand.id, 'TECHNICAL_ROUND', 'Advanced to Technical Interview Round')}
                                className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                              >
                                Advance Stage
                              </button>
                            </div>
                          </td>

                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ==============================================================================
          TAB 2: ACTIVE DRIVES MANAGEMENT
          ============================================================================== */}
      {activeSubTab === 'drives' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {drives.map(drive => (
            <div key={drive.id} className="glass-inner-card p-6 rounded-[28px] border border-white/10 space-y-3 shadow-xl">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-[#ff7849] uppercase tracking-wider">{drive.companyName}</span>
                  <h3 className="text-lg font-bold text-white font-heading mt-1">{drive.jobTitle}</h3>
                </div>
                <span className="text-lg font-bold text-emerald-400 font-heading">
                  ₹ {drive.packageLpa} LPA
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{drive.description}</p>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-1.5 backdrop-blur-md">
                <div><strong className="text-white">Criteria:</strong> Min CGPA {drive.criteria?.minCgpa} • {drive.criteria?.allowedBranches?.join(', ')}</div>
                <div><strong className="text-white">Timeline:</strong> Drive on {drive.driveDate} • Deadline: {drive.deadline}</div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-white/10">
                <span className="text-xs text-slate-400">Status: <strong className="text-emerald-400">{drive.status}</strong></span>
                <button
                  onClick={() => {
                    setSelectedDriveFilter(drive.id);
                    setActiveSubTab('pipeline');
                  }}
                  className="text-xs text-cyan-300 hover:text-cyan-200 font-semibold"
                >
                  View Drive Applicants &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ==============================================================================
          TAB 3: INTERVIEW PANELS
          ============================================================================== */}
      {activeSubTab === 'interviews' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interviews.map(iv => (
            <div key={iv.id} className="glass-inner-card p-6 rounded-[28px] border border-white/10 space-y-3 text-xs shadow-xl">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-white font-heading text-base">{iv.companyName}</h4>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {iv.status}
                </span>
              </div>
              <p className="text-cyan-300 font-semibold text-sm">{iv.roundName} (Round {iv.roundNumber})</p>
              <p className="text-slate-300">Candidate: <strong className="text-white">{iv.candidateName}</strong></p>
              <p className="text-slate-400">Scheduled: {new Date(iv.scheduledTime).toLocaleString()}</p>
              <p className="text-[#ff7849] truncate font-medium">Venue/Link: {iv.locationOrLink}</p>
            </div>
          ))}
        </div>
      )}

      {/* ==============================================================================
          TAB 4: STUDENT VERIFICATION QUEUE
          ============================================================================== */}
      {activeSubTab === 'verifications' && (
        <div className="glass-inner-card p-6 rounded-[28px] border border-white/10 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#ff7849] font-heading flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Academic Profile Verification Desk
          </h3>
          <p className="text-xs text-slate-300/80">
            Verify newly registered students before they can apply for active corporate drives.
          </p>

          <div className="space-y-3">
            {students.map(st => (
              <div
                key={st.id}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs backdrop-blur-md"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-white text-sm">{st.fullName}</span>
                    <span className="font-mono text-cyan-300 font-semibold text-xs">{st.rollNumber}</span>
                  </div>
                  <div className="text-slate-300 mt-1">
                    {st.branch} Department • {st.graduationYear} Batch • CGPA: <strong className="text-emerald-400">{st.cgpa}</strong> • Backlogs: {st.activeBacklogs}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {st.verificationStatus === 'VERIFIED' ? (
                    <span className="inline-flex items-center gap-1 text-emerald-300 font-bold text-xs bg-emerald-500/20 px-3 py-1.5 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Scholar
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => onVerifyStudent(st.id, 'VERIFIED')}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold hover:bg-emerald-500/30 transition-colors"
                      >
                        Approve &amp; Verify
                      </button>
                      <button
                        onClick={() => onVerifyStudent(st.id, 'REJECTED')}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold hover:bg-rose-500/30 transition-colors"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==============================================================================
          TAB 5: APTITUDE & PRACTICE MANAGEMENT (MAINTAINED BY PLACEMENT OFFICER)
          ============================================================================== */}
      {activeSubTab === 'aptitude-mgmt' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Top Info & Action Bar */}
          <div className="p-6 rounded-[28px] glass-inner-card border border-white/15 bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent backdrop-blur-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-xl shadow-lg">
                  🎯
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                    Aptitude Library & Practice Maintenance
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/40 font-bold uppercase">
                      TPO Curation Desk
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300/90 mt-0.5">
                    Upload custom institutional test questions or trigger automatic generation for company-specific hiring patterns.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 self-start md:self-center">
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2.5 rounded-2xl btn-orange-glow font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Custom Question</span>
              </button>
            </div>
          </div>

          {/* 1-Click Auto-Generate Suite Panel */}
          <div className="p-6 rounded-[28px] glass-inner-card border border-amber-500/30 bg-amber-500/5 backdrop-blur-2xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold text-white font-heading">
                  Set Auto-Generate Practice Test Suite
                </h4>
              </div>
              <span className="text-[11px] text-amber-200/80 font-mono">
                AI Test Engine Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-slate-300 text-[11px] font-semibold block mb-1">Company / Drive Pattern</label>
                <select
                  value={autoGenCompany}
                  onChange={(e) => setAutoGenCompany(e.target.value)}
                  className="w-full glass-input px-3 py-2 rounded-xl text-xs bg-slate-900"
                >
                  <option value="TCS NQT 2026">TCS NQT 2026</option>
                  <option value="Infosys Springboard">Infosys Springboard</option>
                  <option value="Cognizant GenC Elevate">Cognizant GenC Elevate</option>
                  <option value="Wipro Elite NLTH">Wipro Elite NLTH</option>
                  <option value="Tier-1 Product Giants">Tier-1 Product Giants (Google/Amazon)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 text-[11px] font-semibold block mb-1">Difficulty Distribution</label>
                <select
                  value={autoGenDifficulty}
                  onChange={(e) => setAutoGenDifficulty(e.target.value)}
                  className="w-full glass-input px-3 py-2 rounded-xl text-xs bg-slate-900"
                >
                  <option value="Low">Low (Foundation & Accuracy)</option>
                  <option value="Medium">Medium (Core Standard)</option>
                  <option value="High">High (Speed & Tricky Edge Cases)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 text-[11px] font-semibold block mb-1">Number of Questions</label>
                <select
                  value={autoGenCount}
                  onChange={(e) => setAutoGenCount(parseInt(e.target.value, 10))}
                  className="w-full glass-input px-3 py-2 rounded-xl text-xs bg-slate-900"
                >
                  <option value="5">5 Questions Test Set</option>
                  <option value="10">10 Questions Test Set</option>
                  <option value="15">15 Questions Comprehensive Drive</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <span className="text-[11px] text-slate-400">
                Questions will be synthesized, verified, and published immediately to Student Aptitude Library.
              </span>

              <button
                onClick={handleTriggerAutoGen}
                disabled={isGenerating}
                className="px-5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{isGenerating ? 'Synthesizing...' : 'Generate & Publish Test Suite'}</span>
              </button>
            </div>

            {genSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4" /> {genSuccessMsg}
              </div>
            )}
          </div>

          {/* Curated Question Bank Table */}
          <div className="glass-inner-card rounded-[28px] border border-white/10 overflow-hidden shadow-xl space-y-3 p-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h4 className="text-sm font-bold text-white font-heading">
                Institutional Question Bank ({aptitudeQuestions.length} Questions)
              </h4>
              <span className="text-xs text-slate-400">
                Maintained &amp; Curated by Placement Office
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 border-b border-white/10 text-slate-400 font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Category / Pattern</th>
                    <th className="py-3 px-4">Question Statement</th>
                    <th className="py-3 px-4">Difficulty</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {aptitudeQuestions.map(q => (
                    <tr key={q.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-bold text-white">{q.category}</div>
                        <span className="text-[10px] text-cyan-300 font-mono">{q.companyTag}</span>
                      </td>
                      <td className="py-3 px-4 max-w-md">
                        <p className="line-clamp-2 text-slate-300">{q.question}</p>
                        <span className="text-[10px] text-slate-500">Correct Option: {String.fromCharCode(65 + q.correctAnswer)}</span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          q.difficulty === 'High'
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                            : q.difficulty === 'Medium'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        }`}>
                          {q.difficulty}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          q.status === 'ACTIVE'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-white/10 text-slate-400'
                        }`}>
                          {q.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => api.toggleAptitudeQuestionStatus(q.id)}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="Toggle Active/Draft"
                          >
                            {q.status === 'ACTIVE' ? <ToggleRight className="w-4 h-4 text-emerald-400" /> : <ToggleLeft className="w-4 h-4 text-slate-400" />}
                          </button>
                          <button
                            onClick={() => api.deleteAptitudeQuestion(q.id)}
                            className="p-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 transition-colors cursor-pointer"
                            title="Delete Question"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Manual Question Upload Modal */}
          {showUploadModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xl animate-in fade-in duration-200">
              <div className="relative w-full max-w-lg max-h-[92vh] flex flex-col rounded-[32px] bg-gradient-to-b from-white/[0.16] via-white/[0.07] to-white/[0.03] backdrop-blur-3xl border border-white/30 shadow-[0_30px_90px_rgba(0,0,0,0.7),inset_0_1px_2px_0_rgba(255,255,255,0.5),inset_0_0_0_1px_rgba(255,255,255,0.12)] overflow-hidden m-auto">
                
                {/* Glowing Ambient Radial Orbs */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#ff7849]/25 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/15 bg-white/[0.04] backdrop-blur-xl shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#ff7849]/35 to-[#f97316]/20 text-[#ff7849] border border-[#ff7849]/40 shadow-[0_0_16px_rgba(255,120,73,0.35)]">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                        Upload Aptitude Question
                        <Sparkles className="w-4 h-4 text-[#ff7849]" />
                      </h3>
                      <p className="text-xs text-slate-300/80">
                        Placement Cell Test Bank Question Curation
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/10 cursor-pointer"
                    title="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleManualUploadSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-slate-200 font-semibold block mb-1">Category</label>
                      <select
                        value={uploadCategory}
                        onChange={(e) => setUploadCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl text-xs font-medium text-white bg-white/[0.08] hover:bg-white/[0.12] focus:bg-slate-900 border border-white/20 focus:border-[#ff7849]/70 focus:outline-none focus:ring-2 focus:ring-[#ff7849]/30 transition-all backdrop-blur-md cursor-pointer"
                      >
                        <option value="Quantitative" className="bg-slate-900 text-white">Quantitative</option>
                        <option value="Logical" className="bg-slate-900 text-white">Logical Reasoning</option>
                        <option value="Verbal" className="bg-slate-900 text-white">Verbal Ability</option>
                        <option value="Core CS" className="bg-slate-900 text-white">Core Computer Science</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-200 font-semibold block mb-1">Company Tag</label>
                      <input
                        type="text"
                        placeholder="e.g. TCS NQT / Google"
                        value={uploadCompany}
                        onChange={(e) => setUploadCompany(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl text-xs text-white placeholder:text-slate-400 bg-white/[0.07] hover:bg-white/[0.1] focus:bg-white/[0.12] border border-white/20 focus:border-[#ff7849]/70 focus:outline-none focus:ring-2 focus:ring-[#ff7849]/30 transition-all backdrop-blur-md shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="text-slate-200 font-semibold block mb-1">Difficulty</label>
                      <select
                        value={uploadDifficulty}
                        onChange={(e) => setUploadDifficulty(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl text-xs font-medium text-white bg-white/[0.08] hover:bg-white/[0.12] focus:bg-slate-900 border border-white/20 focus:border-[#ff7849]/70 focus:outline-none focus:ring-2 focus:ring-[#ff7849]/30 transition-all backdrop-blur-md cursor-pointer"
                      >
                        <option value="Low" className="bg-slate-900 text-white">Low</option>
                        <option value="Medium" className="bg-slate-900 text-white">Medium</option>
                        <option value="High" className="bg-slate-900 text-white">High</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-200 font-semibold block mb-1">Question Statement</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Enter the full question description..."
                      value={uploadQuestion}
                      onChange={(e) => setUploadQuestion(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs text-white placeholder:text-slate-400 bg-white/[0.07] hover:bg-white/[0.1] focus:bg-white/[0.12] border border-white/20 focus:border-[#ff7849]/70 focus:outline-none focus:ring-2 focus:ring-[#ff7849]/30 transition-all backdrop-blur-md shadow-inner leading-relaxed"
                    />
                  </div>

                  <div className="space-y-2 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                    <label className="text-slate-200 font-semibold block text-[11px] uppercase tracking-wider text-amber-300">
                      Options &amp; Correct Answer Selection
                    </label>
                    {uploadOptions.map((opt, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="correctOption"
                          checked={uploadCorrect === i}
                          onChange={() => setUploadCorrect(i)}
                          className="w-4 h-4 accent-[#ff7849] cursor-pointer"
                        />
                        <span className="w-6 text-center text-amber-300 font-bold font-mono">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <input
                          type="text"
                          required
                          placeholder={`Option ${String.fromCharCode(65 + i)}`}
                          value={opt}
                          onChange={(e) => {
                            const newOpts = [...uploadOptions];
                            newOpts[i] = e.target.value;
                            setUploadOptions(newOpts);
                          }}
                          className="w-full px-3 py-2 rounded-xl text-xs text-white placeholder:text-slate-400 bg-white/[0.06] hover:bg-white/[0.09] focus:bg-white/[0.12] border border-white/20 focus:border-[#ff7849]/70 focus:outline-none focus:ring-2 focus:ring-[#ff7849]/30 transition-all backdrop-blur-md shadow-inner"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="text-slate-200 font-semibold block mb-1">Step-by-Step Explanation</label>
                    <textarea
                      rows={2}
                      placeholder="Detailed mathematical or logical derivation..."
                      value={uploadExplanation}
                      onChange={(e) => setUploadExplanation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs text-white placeholder:text-slate-400 bg-white/[0.07] hover:bg-white/[0.1] focus:bg-white/[0.12] border border-white/20 focus:border-[#ff7849]/70 focus:outline-none focus:ring-2 focus:ring-[#ff7849]/30 transition-all backdrop-blur-md shadow-inner leading-relaxed"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/15">
                    <button
                      type="button"
                      onClick={() => setShowUploadModal(false)}
                      className="px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white font-semibold text-xs border border-white/15 transition-all shadow-md backdrop-blur-md cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ff7849] via-[#f97316] to-[#ea580c] text-white font-bold text-xs shadow-[0_0_20px_rgba(255,120,73,0.5)] hover:opacity-95 cursor-pointer transition-all flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Save &amp; Publish Question</span>
                    </button>
                  </div>
                </form>

              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
