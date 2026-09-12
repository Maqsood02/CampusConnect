import React, { useState } from 'react';
import {
  GraduationCap,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  FileText,
  Briefcase,
  Layers,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';

export default function PortfolioView({ student, onUpdateStudent }) {
  const [formData, setFormData] = useState({
    fullName: student?.fullName || '',
    rollNumber: student?.rollNumber || '',
    branch: student?.branch || 'CSE',
    cgpa: student?.cgpa || 9.15,
    graduationYear: student?.graduationYear || 2026,
    semester: student?.semester || '7th Semester',
    activeBacklogs: student?.activeBacklogs ?? 0,
    phone: student?.phone || '',
    skills: student?.skills || [],
    certifications: student?.certifications || [],
    projects: student?.projects || []
  });

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Intermediate');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const newSkill = {
      id: Date.now(),
      name: newSkillName.trim(),
      level: newSkillLevel
    };
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
    setNewSkillName('');
  };

  const handleRemoveSkill = (skillId) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => (s.id || s.name) !== skillId)
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updated = api.updatePortfolio(formData);
    if (onUpdateStudent && updated) onUpdateStudent(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight flex items-center gap-2">
            Student Portfolio & Academic Profile
            <Sparkles className="w-5 h-5 text-[#ff7849]" />
          </h2>
          <p className="text-xs text-slate-300/80 mt-1">
            Maintain your academic credentials, verified skills, and project portfolio visible to hiring companies.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-2xl btn-orange-glow font-bold text-xs inline-flex items-center gap-2 shadow-md self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2 font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Portfolio details successfully saved and updated in the campus placement database!</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Academic Credentials */}
          <div className="glass-inner-card p-6 rounded-[28px] border border-white/10 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#ff7849] font-heading flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Academic Records
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Roll / Registration Number</label>
                <input
                  type="text"
                  value={formData.rollNumber}
                  onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Department / Branch</label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs bg-slate-900"
                >
                  <option value="CSE">CSE (Computer Science & Engineering)</option>
                  <option value="IT">IT (Information Technology)</option>
                  <option value="ECE">ECE (Electronics & Communication)</option>
                  <option value="EEE">EEE (Electrical & Electronics)</option>
                  <option value="ME">ME (Mechanical Engineering)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cumulative GPA (CGPA)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={formData.cgpa}
                  onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) || 0 })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#ff7849]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Graduation Batch Year</label>
                <input
                  type="number"
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({ ...formData, graduationYear: parseInt(e.target.value) || 2026 })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Active Backlogs Count</label>
                <input
                  type="number"
                  min="0"
                  value={formData.activeBacklogs}
                  onChange={(e) => setFormData({ ...formData, activeBacklogs: parseInt(e.target.value) || 0 })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                />
              </div>
            </div>
          </div>

          {/* 2. Technical Skills & Proficiencies */}
          <div className="glass-inner-card p-6 rounded-[28px] border border-white/10 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300 font-heading flex items-center gap-2">
              <Layers className="w-4 h-4" /> Technical Skills & Stacks
            </h3>

            {/* Add Skill Bar */}
            <div className="flex flex-col sm:flex-row gap-2 text-xs">
              <input
                type="text"
                placeholder="Add skill (e.g. Next.js, Kubernetes, Java)..."
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                className="flex-1 glass-input px-3.5 py-2.5 rounded-xl text-xs"
              />
              <select
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value)}
                className="glass-input px-3 py-2.5 rounded-xl text-xs bg-slate-900"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2.5 rounded-xl btn-orange-glow text-xs font-semibold flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            {/* Skill Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {formData.skills.map(skill => (
                <span
                  key={skill.id || skill.name}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                >
                  <span className="font-semibold text-slate-100">{skill.name}</span>
                  <span className="text-[10px] text-cyan-300 font-medium bg-white/10 px-1.5 py-0.5 rounded border border-white/10">
                    {skill.level}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill.id || skill.name)}
                    className="text-slate-400 hover:text-rose-400 ml-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* 3. Featured Projects */}
          <div className="glass-inner-card p-6 rounded-[28px] border border-white/10 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 font-heading flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Capstone & Open Source Projects
            </h3>

            <div className="space-y-3">
              {(formData.projects || []).map((proj, idx) => (
                <div key={proj.id || idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-white font-heading">{proj.title}</h4>
                    <span className="text-cyan-300 font-mono text-[11px] font-semibold">{proj.tech}</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed mt-1">{proj.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Col: Resume Attachment & Verification Card */}
        <div className="space-y-6">
          
          <div className="glass-inner-card p-6 rounded-[28px] border border-white/10 space-y-4 text-xs shadow-xl">
            <h4 className="text-sm font-bold font-heading text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#ff7849]" /> Resume & Document Vault
            </h4>

            <div className="p-6 rounded-2xl border-2 border-dashed border-white/15 text-center space-y-3 bg-white/5">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#ff7849] mx-auto flex items-center justify-center border border-white/10 shadow-md">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-white">Alex_Mercer_Placement_Resume.pdf</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Updated: 2 days ago • Verified by Placement Cell</p>
              </div>

              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => alert('Viewing student PDF resume in secure sandbox previewer.')}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-slate-200 transition-colors border border-white/10"
                >
                  Preview PDF
                </button>
                <button
                  type="button"
                  onClick={() => alert('New resume uploaded and queued for Placement Officer verification.')}
                  className="px-3 py-1.5 rounded-xl btn-orange-glow text-xs font-bold shadow-md"
                >
                  Replace PDF
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              When applying to recruitment drives, your system-verified resume is automatically transmitted along with your eligibility token.
            </p>
          </div>

          <div className="glass-inner-card p-6 rounded-[28px] border border-emerald-500/30 space-y-3 text-xs bg-emerald-500/10 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-300 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Institutional Verification</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Your student profile is <strong className="text-emerald-300">Active &amp; Verified</strong> by Placement Officer Prof. Sarah Jenkins. All grades are locked to the official university transcript.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
