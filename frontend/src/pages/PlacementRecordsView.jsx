import React, { useState, useEffect } from 'react';
import {
  Award,
  FileCheck2,
  Building2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Search,
  Filter,
  Plus,
  Sparkles,
  Calendar,
  Briefcase,
  UserCheck,
  ShieldCheck,
  AlertCircle,
  FileText,
  DollarSign,
  Download,
  Check,
  X
} from 'lucide-react';
import { api, subscribeToStore } from '../services/api';

export default function PlacementRecordsView({ currentUser }) {
  const [activeSubTab, setActiveSubTab] = useState('placed-students');
  const [placementRecords, setPlacementRecords] = useState(api.getPlacementRecords());
  const [companies, setCompanies] = useState(api.getCompanyHistories());
  const [students, setStudents] = useState(api.getStudents());
  const [drives, setDrives] = useState(api.getDrives());

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState('ALL');
  const [tierFilter, setTierFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showOfferLetterModal, setShowOfferLetterModal] = useState(false);
  const [selectedOfferRecord, setSelectedOfferRecord] = useState(null);
  const [declineReason, setDeclineReason] = useState('');
  const [showDeclinePrompt, setShowDeclinePrompt] = useState(false);

  // New Placement Form State
  const [newStudentId, setNewStudentId] = useState('');
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newPackageLpa, setNewPackageLpa] = useState('14.5');
  const [newBaseSalary, setNewBaseSalary] = useState('12.0');
  const [newBonus, setNewBonus] = useState('2.5');
  const [newJoiningDate, setNewJoiningDate] = useState('2026-07-01');
  const [newLocation, setNewLocation] = useState('Bengaluru (Hybrid)');

  useEffect(() => {
    const unsub = subscribeToStore(() => {
      setPlacementRecords(api.getPlacementRecords());
      setCompanies(api.getCompanyHistories());
      setStudents(api.getStudents());
      setDrives(api.getDrives());
    });
    return () => unsub();
  }, []);

  const isOfficerOrAdmin = currentUser?.role === 'Placement Officer' || currentUser?.role === 'Administrator';

  // Filtered records
  const filteredRecords = placementRecords.filter(rec => {
    const matchesSearch =
      rec.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = branchFilter === 'ALL' || rec.branch === branchFilter;
    const matchesTier = tierFilter === 'ALL' || rec.tier === tierFilter;
    const matchesStatus = statusFilter === 'ALL' || rec.status === statusFilter;
    return matchesSearch && matchesBranch && matchesTier && matchesStatus;
  });

  const handleCreatePlacement = (e) => {
    e.preventDefault();
    const student = students.find(s => s.id === newStudentId);
    if (!student) return;

    api.createPlacementRecord({
      studentId: student.id,
      studentName: student.fullName,
      rollNumber: student.rollNumber,
      branch: student.branch,
      cgpa: student.cgpa,
      email: student.email,
      phone: student.phone,
      companyName: newCompanyName,
      jobTitle: newJobTitle,
      packageLpa: parseFloat(newPackageLpa) || 12.0,
      baseSalary: parseFloat(newBaseSalary) || 10.0,
      joiningBonus: parseFloat(newBonus) || 0,
      workLocation: newLocation,
      joiningDate: newJoiningDate
    });

    setShowAddModal(false);
  };

  const handleOpenOfferLetter = (rec) => {
    setSelectedOfferRecord(rec);
    setShowOfferLetterModal(true);
    setShowDeclinePrompt(false);
    setDeclineReason('');
  };

  const handleStudentAcceptOffer = () => {
    if (!selectedOfferRecord) return;
    api.acceptOffer(selectedOfferRecord.id);
    setSelectedOfferRecord(prev => ({ ...prev, status: 'ACCEPTED' }));
  };

  const handleStudentDeclineOffer = () => {
    if (!selectedOfferRecord) return;
    api.declineOffer(selectedOfferRecord.id, declineReason || 'Declined by candidate');
    setSelectedOfferRecord(prev => ({ ...prev, status: 'DECLINED' }));
    setShowDeclinePrompt(false);
  };

  const handleOfficerVerifyOffer = () => {
    if (!selectedOfferRecord) return;
    api.verifyPlacementRecord(selectedOfferRecord.id, 'VERIFIED');
    setSelectedOfferRecord(prev => ({ ...prev, verificationStatus: 'VERIFIED' }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header with 100% Ultra-Glassmorphic Design */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-[30px] glass-inner-card border border-white/15 bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent backdrop-blur-2xl shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-xl shadow-lg shadow-orange-500/20">
              📜
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight flex items-center gap-2">
              Placement Records &amp; Offer Desk
              <Sparkles className="w-5 h-5 text-[#ff7849]" />
            </h2>
          </div>
          <p className="text-xs text-slate-300/90 pl-1">
            Centralized institutional repository for verified placement records, digital offer letter validations, and company recruitment histories.
          </p>
        </div>

        {isOfficerOrAdmin && (
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-2xl btn-orange-glow font-bold text-xs shadow-lg transition-all flex items-center gap-1.5 self-start md:self-center cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Record Placement Offer</span>
          </button>
        )}
      </div>

      {/* Sub-Navigation Pill Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-[22px] glass-inner-card border border-white/10 overflow-x-auto text-xs shadow-md">
        
        <button
          onClick={() => setActiveSubTab('placed-students')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'placed-students'
              ? 'bg-gradient-to-r from-[#ff7849] to-[#f97316] text-white shadow-md shadow-[#ff7849]/30 scale-105'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Placed Scholars Directory ({placementRecords.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('offer-letters')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'offer-letters'
              ? 'bg-gradient-to-r from-[#ff7849] to-[#f97316] text-white shadow-md shadow-[#ff7849]/30 scale-105'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Offer Letters &amp; Verification</span>
        </button>

        <button
          onClick={() => setActiveSubTab('company-history')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'company-history'
              ? 'bg-gradient-to-r from-[#ff7849] to-[#f97316] text-white shadow-md shadow-[#ff7849]/30 scale-105'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Company-Wise Recruitment History</span>
        </button>

      </div>

      {/* ==============================================================================
          SUB-TAB 1: PLACED SCHOLARS DIRECTORY
          ============================================================================== */}
      {activeSubTab === 'placed-students' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Controls & Filter Bar */}
          <div className="p-4 rounded-[26px] glass-inner-card border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs shadow-xl">
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search scholar, roll no, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-xs placeholder:text-slate-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
              <select
                value={branchFilter}
                onChange={(e) => setBranchFilter(e.target.value)}
                className="glass-input px-3 py-2 rounded-xl text-xs bg-slate-900"
              >
                <option value="ALL">All Branches</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="ME">ME</option>
              </select>

              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="glass-input px-3 py-2 rounded-xl text-xs bg-slate-900"
              >
                <option value="ALL">All Tiers</option>
                <option value="Super Dream">Super Dream (≥ 20 LPA)</option>
                <option value="Dream">Dream (10 - 20 LPA)</option>
                <option value="Core">Core (&lt; 10 LPA)</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="glass-input px-3 py-2 rounded-xl text-xs bg-slate-900"
              >
                <option value="ALL">All Offer Statuses</option>
                <option value="ACCEPTED">Accepted</option>
                <option value="OFFERED">Offered (Pending)</option>
                <option value="DECLINED">Declined</option>
              </select>
            </div>
          </div>

          {/* Placed Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRecords.map((rec) => (
              <div
                key={rec.id}
                className="glass-inner-card p-6 rounded-[28px] border border-white/10 hover:border-white/20 transition-all shadow-xl space-y-4 flex flex-col justify-between relative overflow-hidden"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-white/10 px-2.5 py-1 rounded-xl border border-white/10">
                      {rec.tier || 'Dream'} Tier
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      rec.status === 'ACCEPTED'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : rec.status === 'DECLINED'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}>
                      {rec.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-heading mt-3">
                    {rec.studentName}
                  </h3>
                  <div className="text-xs text-cyan-300 font-mono">
                    {rec.rollNumber} • {rec.branch} (CGPA: {rec.cgpa})
                  </div>

                  <div className="mt-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-xs backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Recruiter:</span>
                      <strong className="text-white">{rec.companyName}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Designation:</span>
                      <span className="text-slate-200">{rec.jobTitle}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-white/5">
                      <span className="text-slate-400">Package CTC:</span>
                      <strong className="text-emerald-400 font-heading text-sm">₹ {rec.packageLpa} LPA</strong>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-2.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-orange-400" /> Offered: {rec.offerDate} • Joining: {rec.joiningDate}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className={`text-[11px] font-semibold flex items-center gap-1 ${
                    rec.verificationStatus === 'VERIFIED' ? 'text-emerald-300' : 'text-amber-300'
                  }`}>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {rec.verificationStatus === 'VERIFIED' ? 'Verified Offer' : 'Pending Verification'}
                  </span>

                  <button
                    onClick={() => handleOpenOfferLetter(rec)}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-cyan-300 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>View Offer</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ==============================================================================
          SUB-TAB 2: OFFER LETTERS & VERIFICATION
          ============================================================================== */}
      {activeSubTab === 'offer-letters' && (
        <div className="space-y-6 animate-in fade-in">
          
          <div className="p-5 rounded-[26px] glass-inner-card border border-white/10 shadow-xl space-y-1">
            <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-[#ff7849]" /> Offer Letter Validation Desk
            </h3>
            <p className="text-xs text-slate-300">
              Students can digitally accept or decline corporate appointment letters, and Placement Officers verify accreditation documents.
            </p>
          </div>

          <div className="space-y-4">
            {placementRecords.map((rec) => (
              <div
                key={rec.id}
                className="glass-inner-card p-6 rounded-[28px] border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center font-bold text-white text-lg shrink-0">
                    {rec.companyName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h4 className="text-base font-bold text-white font-heading">{rec.studentName}</h4>
                      <span className="text-xs text-slate-400 font-mono">({rec.rollNumber})</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        rec.status === 'ACCEPTED'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : rec.status === 'DECLINED'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      }`}>
                        {rec.status}
                      </span>
                    </div>

                    <p className="text-xs text-cyan-300 font-semibold mt-1">
                      {rec.jobTitle} at {rec.companyName} • <span className="text-emerald-400 font-bold">₹ {rec.packageLpa} LPA CTC</span>
                    </p>

                    <p className="text-xs text-slate-300/80 mt-1.5">
                      Remarks: &ldquo;{rec.remarks}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 self-start md:self-center">
                  <button
                    onClick={() => handleOpenOfferLetter(rec)}
                    className="px-4 py-2 rounded-xl btn-orange-glow text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Review Offer Letter</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ==============================================================================
          SUB-TAB 3: COMPANY-WISE RECRUITMENT HISTORY
          ============================================================================== */}
      {activeSubTab === 'company-history' && (
        <div className="space-y-6 animate-in fade-in">
          
          <div className="p-5 rounded-[26px] glass-inner-card border border-white/10 shadow-xl space-y-1">
            <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#ff7849]" /> Corporate Recruiter History &amp; Trends
            </h3>
            <p className="text-xs text-slate-300">
              Longitudinal tracking of annual corporate visit dates, hiring volume growth, and highest package offers over recruitment cycles.
            </p>
          </div>

          <div className="space-y-6">
            {companies.map((co) => (
              <div
                key={co.companyId}
                className="glass-inner-card p-6 rounded-[30px] border border-white/10 shadow-2xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center font-bold text-lg text-white">
                      {co.companyName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                        {co.companyName}
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                          {co.tier}
                        </span>
                      </h4>
                      <p className="text-xs text-slate-400">{co.industry} • Contact: {co.primaryContact}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="text-right">
                      <span className="text-slate-400 text-[10px] block">Total Hired (All-Time)</span>
                      <strong className="text-white font-heading text-base">{co.overallHired} Scholars</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 text-[10px] block">Highest CTC Offered</span>
                      <strong className="text-cyan-300 font-heading text-base">₹ {co.highestPackageLpa} LPA</strong>
                    </div>
                  </div>
                </div>

                {/* Past Drives Timeline */}
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Recruitment Drives History
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {co.pastDrives.map((d, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white font-heading">{d.academicYear}</span>
                          <span className="text-emerald-400 font-semibold">{d.totalHired} Hired</span>
                        </div>
                        <div className="text-slate-400 text-[11px] truncate">
                          Roles: {d.roles.join(', ')}
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1 border-t border-white/5">
                          <span>Avg: ₹ {d.avgCtc} LPA</span>
                          <span className="text-cyan-300 font-bold">Max: ₹ {d.highestCtc} LPA</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* ==============================================================================
          MODAL 1: ADD PLACEMENT RECORD (OFFICER/ADMIN)
          ============================================================================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[92vh] flex flex-col rounded-[32px] bg-gradient-to-b from-white/[0.16] via-white/[0.07] to-white/[0.03] backdrop-blur-3xl border border-white/30 shadow-[0_30px_90px_rgba(0,0,0,0.7),inset_0_1px_2px_0_rgba(255,255,255,0.5),inset_0_0_0_1px_rgba(255,255,255,0.12)] overflow-hidden m-auto">
            
            {/* Subtle Ambient Radial Glow Orbs */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#ff7849]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Header - Fixed Glass */}
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/15 bg-white/[0.04] backdrop-blur-xl shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#ff7849]/35 to-[#f97316]/20 text-[#ff7849] border border-[#ff7849]/40 shadow-[0_0_18px_rgba(255,120,73,0.35)]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                    Record Student Placement Offer
                    <Sparkles className="w-4 h-4 text-[#ff7849]" />
                  </h3>
                  <p className="text-xs text-slate-300/80">
                    Institutional Placement Verification &amp; Corporate Offer Registry
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/10 cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleCreatePlacement} className="flex-1 overflow-y-auto px-6 py-5 space-y-4 text-xs">
              <div>
                <label className="text-slate-200 font-semibold block mb-1.5 flex items-center gap-1.5">
                  <span>Select Candidate Scholar</span>
                  <span className="text-[#ff7849]">*</span>
                </label>
                <select
                  required
                  value={newStudentId}
                  onChange={(e) => setNewStudentId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs font-medium text-white bg-white/[0.08] hover:bg-white/[0.12] focus:bg-slate-900 border border-white/25 focus:border-[#ff7849]/70 focus:outline-none focus:ring-2 focus:ring-[#ff7849]/30 transition-all backdrop-blur-md cursor-pointer"
                >
                  <option value="" className="bg-slate-900 text-slate-400">-- Choose candidate scholar profile --</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                      {s.fullName} ({s.rollNumber} • {s.branch}) — CGPA: {s.cgpa}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-slate-200 font-semibold block mb-1.5 flex items-center gap-1.5">
                    <span>Hiring Corporate Organization</span>
                    <span className="text-[#ff7849]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Google Cloud / Microsoft"
                    value={newCompanyName}
                    onChange={(e) => setNewCompanyName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs text-white placeholder:text-slate-400 bg-white/[0.07] hover:bg-white/[0.1] focus:bg-white/[0.12] border border-white/25 focus:border-[#ff7849]/70 focus:outline-none focus:ring-2 focus:ring-[#ff7849]/30 transition-all backdrop-blur-md shadow-inner"
                  />
                </div>
                <div>
                  <label className="text-slate-200 font-semibold block mb-1.5 flex items-center gap-1.5">
                    <span>Designation / Role Title</span>
                    <span className="text-[#ff7849]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cloud Solutions Engineer"
                    value={newJobTitle}
                    onChange={(e) => setNewJobTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs text-white placeholder:text-slate-400 bg-white/[0.07] hover:bg-white/[0.1] focus:bg-white/[0.12] border border-white/25 focus:border-[#ff7849]/70 focus:outline-none focus:ring-2 focus:ring-[#ff7849]/30 transition-all backdrop-blur-md shadow-inner"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl space-y-3">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                  Compensation Package Breakdown
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-slate-300 text-[11px] font-semibold block mb-1">Total CTC (₹ LPA) *</label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={newPackageLpa}
                      onChange={(e) => setNewPackageLpa(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl text-xs font-mono font-bold text-emerald-400 bg-white/[0.08] border border-emerald-500/30 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 transition-all backdrop-blur-md"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 text-[11px] font-semibold block mb-1">Base Component (₹ LPA)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={newBaseSalary}
                      onChange={(e) => setNewBaseSalary(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl text-xs font-mono text-cyan-300 bg-white/[0.07] border border-white/20 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition-all backdrop-blur-md"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 text-[11px] font-semibold block mb-1">Joining Bonus (₹ Lakhs)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={newBonus}
                      onChange={(e) => setNewBonus(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl text-xs font-mono text-amber-300 bg-white/[0.07] border border-white/20 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all backdrop-blur-md"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-slate-200 font-semibold block mb-1.5">Anticipated Joining Date</label>
                  <input
                    type="date"
                    value={newJoiningDate}
                    onChange={(e) => setNewJoiningDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs text-white bg-white/[0.07] hover:bg-white/[0.1] focus:bg-white/[0.12] border border-white/25 focus:border-[#ff7849]/70 focus:outline-none focus:ring-2 focus:ring-[#ff7849]/30 transition-all backdrop-blur-md"
                  />
                </div>
                <div>
                  <label className="text-slate-200 font-semibold block mb-1.5">Posting / Work Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Bengaluru / Hyderabad (Hybrid)"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs text-white placeholder:text-slate-400 bg-white/[0.07] hover:bg-white/[0.1] focus:bg-white/[0.12] border border-white/25 focus:border-[#ff7849]/70 focus:outline-none focus:ring-2 focus:ring-[#ff7849]/30 transition-all backdrop-blur-md shadow-inner"
                  />
                </div>
              </div>

              {/* Fixed Glass Bottom Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/15">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 transition-all shadow-md backdrop-blur-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#ff7849] via-[#f97316] to-[#ea580c] hover:opacity-95 transition-all shadow-[0_0_20px_rgba(255,120,73,0.5)] cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Save &amp; Verify Offer</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ==============================================================================
          MODAL 2: OFFER LETTER PREVIEW & DIGITAL ACCEPTANCE/DECLINE
          ============================================================================== */}
      {showOfferLetterModal && selectedOfferRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[92vh] flex flex-col rounded-[32px] bg-gradient-to-b from-white/[0.16] via-white/[0.07] to-white/[0.03] backdrop-blur-3xl border border-white/30 shadow-[0_30px_90px_rgba(0,0,0,0.7),inset_0_1px_2px_0_rgba(255,255,255,0.5),inset_0_0_0_1px_rgba(255,255,255,0.12)] overflow-hidden m-auto">
            
            {/* Subtle Ambient Radial Glow Orbs */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#ff7849]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/15 bg-white/[0.04] backdrop-blur-xl shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-500/35 to-teal-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_18px_rgba(52,211,153,0.35)]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                    Corporate Offer Letter Document
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  </h3>
                  <p className="text-xs text-slate-300/80">
                    Official Employment Document Clearance &amp; Verification
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowOfferLetterModal(false)}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/10 cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 text-xs">
              
              {/* Document Header Representation */}
              <div className="p-5 rounded-2xl bg-white/[0.05] border border-white/15 space-y-3.5 backdrop-blur-xl text-xs shadow-inner">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <h4 className="text-base font-bold text-white font-heading">{selectedOfferRecord.companyName}</h4>
                    <p className="text-slate-300">Institutional Employment Offer Reference</p>
                  </div>
                  <span className="text-lg font-black text-emerald-400 font-heading">
                    ₹ {selectedOfferRecord.packageLpa} LPA CTC
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-slate-300">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Candidate Name</span>
                    <strong className="text-white text-sm">{selectedOfferRecord.studentName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Roll Number / Dept</span>
                    <strong className="text-cyan-300">{selectedOfferRecord.rollNumber} ({selectedOfferRecord.branch})</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Designation</span>
                    <span className="text-slate-200">{selectedOfferRecord.jobTitle}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Reporting Location</span>
                    <span className="text-slate-200">{selectedOfferRecord.workLocation}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-[11px] text-slate-300 space-y-1.5 backdrop-blur-md">
                  <p><strong>Offer Release Date:</strong> {selectedOfferRecord.offerDate}</p>
                  <p><strong>Anticipated Joining Date:</strong> {selectedOfferRecord.joiningDate}</p>
                  <p className="text-emerald-300 break-all"><strong>Document URL:</strong> {selectedOfferRecord.offerLetterUrl}</p>
                </div>
              </div>

              {/* Status & Verification Badges */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs backdrop-blur-md">
                <span className="text-slate-300">Current Status: <strong className="text-white px-2 py-0.5 rounded-md bg-white/10 ml-1">{selectedOfferRecord.status}</strong></span>
                <span className="text-slate-300">Validation: <strong className="text-emerald-300 px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/30 ml-1">{selectedOfferRecord.verificationStatus}</strong></span>
              </div>

              {/* Actions for Students and Officers */}
              <div className="space-y-3 pt-2">
                
                {/* Candidate Decision Action (Strictly for the matching scholar only) */}
                {currentUser?.role === 'Student' && (selectedOfferRecord.studentId === currentUser.id || selectedOfferRecord.rollNumber === currentUser.rollNumber) && selectedOfferRecord.status === 'OFFERED' && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/15 via-emerald-500/15 to-transparent border border-white/15 space-y-2 text-xs backdrop-blur-xl">
                    <span className="font-bold text-white block">Candidate Decision Action</span>
                    <p className="text-slate-300 text-[11px]">
                      Confirm your digital acceptance of this corporate placement offer or decline to release the vacancy.
                    </p>
                    
                    {!showDeclinePrompt ? (
                      <div className="flex items-center gap-3 pt-1">
                        <button
                          onClick={handleStudentAcceptOffer}
                          className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-900 font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-400 transition-colors cursor-pointer shadow-lg shadow-emerald-500/30"
                        >
                          <Check className="w-4 h-4" />
                          <span>Accept Offer Letter</span>
                        </button>

                        <button
                          onClick={() => setShowDeclinePrompt(true)}
                          className="px-4 py-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold text-xs flex items-center gap-1.5 hover:bg-rose-500/30 transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                          <span>Decline Offer</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2 pt-2 animate-in fade-in">
                        <input
                          type="text"
                          placeholder="Reason for declining offer (e.g. Higher Studies, Dream Offer)"
                          value={declineReason}
                          onChange={(e) => setDeclineReason(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl text-xs text-white placeholder:text-slate-400 bg-white/[0.08] border border-white/20 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400/30 transition-all backdrop-blur-md"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleStudentDeclineOffer}
                            className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 transition-colors cursor-pointer"
                          >
                            Confirm Decline
                          </button>
                          <button
                            onClick={() => setShowDeclinePrompt(false)}
                            className="px-3 py-2 rounded-xl text-slate-400 hover:text-white text-xs"
                          >
                            Back
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Read-only notification if viewed by another student */}
                {currentUser?.role === 'Student' && selectedOfferRecord.studentId !== currentUser.id && selectedOfferRecord.rollNumber !== currentUser.rollNumber && (
                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-slate-300">
                    <span className="font-semibold text-cyan-300">Institutional Scholar Document:</span> This record is assigned to <strong className="text-white">{selectedOfferRecord.studentName}</strong>. Digital acceptance or decline actions are strictly reserved for the recipient student.
                  </div>
                )}

                {/* Officer & Administrator Verification Controls */}
                {isOfficerOrAdmin && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-transparent border border-white/15 space-y-2 text-xs backdrop-blur-xl">
                    <span className="font-bold text-white block">Placement Cell Verification Authority</span>
                    <p className="text-slate-300 text-[11px]">
                      Authenticate corporate accreditation, verify CTC compensation clauses, and validate the offer letter authenticity.
                    </p>
                    {selectedOfferRecord.verificationStatus !== 'VERIFIED' ? (
                      <button
                        onClick={handleOfficerVerifyOffer}
                        className="px-4 py-2 rounded-xl btn-orange-glow text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Verify &amp; Authenticate Offer Letter</span>
                      </button>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Officially Verified &amp; Authenticated</span>
                      </div>
                    )}
                  </div>
                )}

              </div>

            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-white/15 bg-white/[0.03] backdrop-blur-xl shrink-0">
              <a
                href={selectedOfferRecord.offerLetterUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-400/40 font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Verified PDF</span>
              </a>

              <button
                onClick={() => setShowOfferLetterModal(false)}
                className="px-5 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-xs border border-white/15 transition-colors cursor-pointer"
              >
                Close Desk
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
