import React, { useState } from 'react';
import { X, Briefcase, CheckCircle2, Sparkles } from 'lucide-react';
import { api } from '../../services/api';

export default function PostDriveModal({ isOpen, onClose, onDriveCreated, companies = [] }) {
  const [formData, setFormData] = useState({
    companyName: 'Google Cloud',
    jobTitle: '',
    packageLpa: '18.0',
    location: 'Bengaluru / Hybrid',
    driveDate: '',
    deadline: '',
    minCgpa: '7.5',
    allowedBranches: ['CSE', 'IT', 'ECE'],
    maxBacklogs: '0',
    graduationYear: '2026',
    requiredSkills: 'Data Structures, Java, Cloud',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const branchOptions = ['CSE', 'IT', 'ECE', 'EEE', 'ME', 'Civil'];

  const toggleBranch = (branch) => {
    setFormData(prev => {
      const branches = prev.allowedBranches.includes(branch)
        ? prev.allowedBranches.filter(b => b !== branch)
        : [...prev.allowedBranches, branch];
      return { ...prev, allowedBranches: branches };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.jobTitle.trim()) {
      setError('Please provide a job title');
      return;
    }

    setLoading(true);
    try {
      const newDrive = api.createDrive(formData);
      onDriveCreated(newDrive);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create drive');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-[32px] bg-gradient-to-b from-white/[0.14] via-white/[0.06] to-white/[0.03] backdrop-blur-3xl border border-white/30 shadow-[0_30px_90px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.45),inset_0_0_0_1px_rgba(255,255,255,0.12)] overflow-hidden m-auto">
        
        {/* Subtle Ambient Radial Glow Orbs */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#ff7849]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header - Fixed Glass */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/20 bg-white/[0.04] backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#ff7849]/35 to-[#f97316]/20 text-[#ff7849] border border-[#ff7849]/40 shadow-[0_0_15px_rgba(255,120,73,0.3)]">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                Post Recruitment Drive
                <Sparkles className="w-4 h-4 text-[#ff7849]" />
              </h3>
              <p className="text-xs text-slate-300/80">
                Authorized Placement Officer Drive Publishing Portal
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Company Selector */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Company / Organization *</label>
                <select
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                >
                  <option value="Google Cloud">Google Cloud</option>
                  <option value="Microsoft">Microsoft</option>
                  <option value="Amazon">Amazon</option>
                  <option value="Goldman Sachs">Goldman Sachs</option>
                  <option value="TechCorp Labs">TechCorp Labs</option>
                  <option value="Cisco Systems">Cisco Systems</option>
                  <option value="Oracle">Oracle</option>
                </select>
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Job Designation *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SDE-1 / Cloud Engineer"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                />
              </div>

              {/* Package LPA */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Package CTC (in LPA) *</label>
                <input
                  type="number"
                  step="0.5"
                  required
                  placeholder="e.g. 18.5"
                  value={formData.packageLpa}
                  onChange={(e) => setFormData({ ...formData, packageLpa: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#ff7849]"
                />
              </div>

              {/* Work Location */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Location *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bengaluru / Hyderabad (Hybrid)"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                />
              </div>

              {/* Application Deadline */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Application Deadline *</label>
                <input
                  type="date"
                  required
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                />
              </div>

              {/* Drive Date */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Drive / Assessment Date *</label>
                <input
                  type="date"
                  required
                  value={formData.driveDate}
                  onChange={(e) => setFormData({ ...formData, driveDate: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                />
              </div>

            </div>

            {/* Eligibility Configuration Section */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/20 space-y-3.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#ff7849] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#ff7849]" /> Automated Eligibility Filters
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 text-[11px] font-medium mb-1">Minimum CGPA</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.minCgpa}
                    onChange={(e) => setFormData({ ...formData, minCgpa: e.target.value })}
                    className="w-full glass-input px-3.5 py-2 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-[11px] font-medium mb-1">Max Active Backlogs</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.maxBacklogs}
                    onChange={(e) => setFormData({ ...formData, maxBacklogs: e.target.value })}
                    className="w-full glass-input px-3.5 py-2 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-[11px] font-medium mb-1">Graduation Batch</label>
                  <input
                    type="number"
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                    className="w-full glass-input px-3.5 py-2 rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Allowed Branches */}
              <div>
                <label className="block text-slate-300 text-[11px] font-medium mb-2">Eligible Departments</label>
                <div className="flex flex-wrap gap-2">
                  {branchOptions.map(branch => (
                    <button
                      type="button"
                      key={branch}
                      onClick={() => toggleBranch(branch)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        formData.allowedBranches.includes(branch)
                          ? 'bg-gradient-to-r from-[#ff7849] to-[#f97316] text-white shadow-[0_2px_10px_rgba(249,115,22,0.4)] border border-[#ff7849]'
                          : 'bg-white/[0.06] text-slate-300 border border-white/15 hover:bg-white/[0.12] hover:text-white hover:border-white/25'
                      }`}
                    >
                      {branch}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-[11px] font-medium mb-1">Required Skills (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Java, Spring Boot, Microservices, MongoDB"
                  value={formData.requiredSkills}
                  onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
                  className="w-full glass-input px-3.5 py-2 rounded-xl text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Drive Overview & Role Description</label>
              <textarea
                rows="3"
                placeholder="Detail the technical responsibilities, round breakdown, and stipend details..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
              disabled={loading}
              className="px-6 py-2.5 rounded-2xl btn-orange-glow font-bold text-xs shadow-lg transition-all"
            >
              {loading ? 'Publishing...' : 'Publish Recruitment Drive'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
