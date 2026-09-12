import React, { useState, useRef } from 'react';
import {
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Building,
  Award,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Globe,
  Edit3,
  Save,
  FileText,
  QrCode,
  Lock,
  Server,
  Key,
  KeyRound,
  ShieldAlert,
  User,
  Briefcase,
  ExternalLink,
  Code,
  Camera,
  Upload,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';
import { api } from '../../services/api';

export default function FullProfileModal({ isOpen, onClose, currentUser, onUpdateProfile }) {
  if (!isOpen || !currentUser) return null;

  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'credentials' | 'idcard' | 'security' | 'edit'
  const [photoLoading, setPhotoLoading] = useState(false);
  const [photoFeedback, setPhotoFeedback] = useState('');

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

  const [formData, setFormData] = useState({
    fullName: currentUser.fullName || '',
    email: currentUser.email || '',
    phone: currentUser.phone || '+91 98765 43210',
    location: currentUser.location || 'Campus Tech Block, Hyderabad',
    department: currentUser.department || currentUser.branch || 'Computer Science & Engineering',
    bio: currentUser.bio || (currentUser.role === 'Student'
      ? 'Passionate full-stack software engineer & competitive programmer specializing in distributed systems, cloud architectures, and modern web frameworks.'
      : currentUser.role === 'Placement Officer'
      ? 'Directing institutional talent acquisition, corporate relations, and university campus placement drives with top tier product and consulting leaders.'
      : 'Super Administrator managing institutional data infrastructure, role-based access control, security policies, and MongoDB analytics.'),
    skills: currentUser.skills ? currentUser.skills.join(', ') : 'React.js, Node.js, Java Spring Boot, MongoDB, Python, AWS, Docker',
    linkedin: currentUser.linkedin || 'https://linkedin.com/in/cpms-user',
    github: currentUser.github || 'https://github.com/cpms-dev'
  });

  const [isSaved, setIsSaved] = useState(false);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setPhotoFeedback('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setPhotoFeedback('Image size exceeds 5MB limit. Please choose a smaller picture.');
      return;
    }

    setPhotoLoading(true);
    setPhotoFeedback('');

    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target.result;
      if (dataUrl) {
        onUpdateProfile({ avatarUrl: dataUrl });
        await api.updateProfilePhoto(dataUrl);
        setPhotoFeedback('Profile photo updated successfully!');
        setTimeout(() => setPhotoFeedback(''), 3500);
      }
      setPhotoLoading(false);
    };
    reader.onerror = () => {
      setPhotoFeedback('Failed to read image file.');
      setPhotoLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    if (!newPassword || newPassword.length < 6) {
      setPassError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassError('New passwords do not match. Please re-enter carefully.');
      return;
    }

    setPassLoading(true);
    try {
      const res = await api.changePassword(currentPassword, newPassword);
      if (res && res.success) {
        setPassSuccess(res.message || 'Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setPassSuccess(''), 4500);
      } else {
        setPassError(res?.message || 'Failed to update password. Please check your credentials.');
      }
    } catch (err) {
      setPassError(err.message || 'An error occurred while changing password.');
    } finally {
      setPassLoading(false);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const skillsArray = typeof formData.skills === 'string'
      ? formData.skills.split(',').map(s => s.trim()).filter(Boolean)
      : formData.skills;

    onUpdateProfile({
      fullName: formData.fullName,
      phone: formData.phone,
      location: formData.location,
      department: formData.department,
      branch: formData.department,
      bio: formData.bio,
      skills: skillsArray,
      linkedin: formData.linkedin,
      github: formData.github
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const isStudent = currentUser.role === 'Student';
  const isOfficer = currentUser.role === 'Placement Officer';
  const isAdmin = currentUser.role === 'Administrator';

  // Role accent colors
  const roleColor = isStudent ? '#38bdf8' : isOfficer ? '#f59e0b' : '#a855f7';
  const roleBorder = isStudent ? 'border-cyan-400/50' : isOfficer ? 'border-amber-400/50' : 'border-purple-400/50';
  const roleBg = isStudent ? 'bg-cyan-500/20' : isOfficer ? 'bg-amber-500/20' : 'bg-purple-500/20';
  const roleText = isStudent ? 'text-cyan-300' : isOfficer ? 'text-amber-300' : 'text-purple-300';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/45 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-[32px] bg-gradient-to-b from-white/[0.14] via-white/[0.06] to-white/[0.03] backdrop-blur-3xl border border-white/30 shadow-[0_30px_90px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.45),inset_0_0_0_1px_rgba(255,255,255,0.12)] overflow-hidden m-auto">
        
        {/* Ambient Radial Glow Orbs */}
        <div className={`absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none ${
          isStudent ? 'bg-cyan-500/20' : isOfficer ? 'bg-[#ff7849]/20' : 'bg-purple-500/25'
        }`} />
        <div className={`absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none ${
          isStudent ? 'bg-indigo-500/15' : isOfficer ? 'bg-amber-500/15' : 'bg-indigo-500/20'
        }`} />

        {/* Top Gradient Banner */}
        <div className={`h-28 sm:h-32 relative overflow-hidden shrink-0 ${
          isStudent 
            ? 'bg-gradient-to-r from-sky-600/90 via-indigo-600/90 to-purple-600/90'
            : isOfficer
            ? 'bg-gradient-to-r from-amber-600/90 via-orange-600/90 to-red-600/90'
            : 'bg-gradient-to-r from-purple-700/90 via-fuchsia-600/90 to-indigo-700/90'
        }`}>
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
          
          {/* Institutional Badge - Top Left with clean margin */}
          <div className="absolute top-4 left-5 sm:left-6 z-20 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/35 backdrop-blur-md border border-white/25 text-[11px] font-bold tracking-widest text-white uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              CPMS Institutional Digital ID & Profile
            </span>
          </div>

          {/* Close button - Top Right */}
          <div className="absolute top-4 right-5 sm:right-6 z-20">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-black/35 hover:bg-white/20 text-white backdrop-blur-md transition-colors border border-white/25 hover:border-white/40 shadow-sm"
              title="Close Profile"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Profile Identity Bar - Fixed */}
        <div className="px-6 sm:px-8 pb-1 pt-0 relative z-10 shrink-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12 sm:-mt-14 mb-3">
            
            {/* Hidden File Input for Avatar Upload */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />

            {/* Avatar & Core Title */}
            <div className="flex items-end gap-4">
              <div className="relative group">
                <div 
                  onClick={handlePhotoClick}
                  className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden p-1 bg-black/60 backdrop-blur-md border-2 ${roleBorder} shadow-2xl shrink-0 cursor-pointer relative transition-all duration-300 group-hover:scale-105 group-hover:border-[#ff7849] group-hover:shadow-[0_0_25px_rgba(255,120,73,0.5)]`}
                  title="Click to upload and update your profile photo"
                >
                  <img
                    src={currentUser.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.fullName)}&background=1e293b&color=fff`}
                    alt={currentUser.fullName}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  
                  {/* Interactive Camera Hover Overlay */}
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl text-white">
                    <Camera className="w-5 h-5 text-amber-300 animate-bounce" />
                    <span className="text-[10px] font-bold mt-1 tracking-wider uppercase text-amber-200">
                      Change Photo
                    </span>
                  </div>

                  {photoLoading && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-xl">
                      <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>

                {/* Floating Camera Button Badge */}
                <button
                  type="button"
                  onClick={handlePhotoClick}
                  className="absolute -top-1.5 -right-1.5 p-1.5 rounded-full bg-[#ff7849] hover:bg-[#f97316] text-white border border-white/40 shadow-lg backdrop-blur-md transition-all hover:scale-110 z-20 cursor-pointer"
                  title="Upload profile photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>

                {/* Role badge */}
                <span className={`absolute -bottom-1 -right-1 p-1.5 rounded-xl ${roleBg} border ${roleBorder} shadow-md backdrop-blur-md z-10`}>
                  {isStudent ? <GraduationCap className="w-3.5 h-3.5 text-cyan-300" /> : isOfficer ? <ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> : <ShieldAlert className="w-3.5 h-3.5 text-purple-300" />}
                </span>
              </div>

              <div className="pb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-wide">
                    {currentUser.fullName}
                  </h2>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${roleBg} ${roleText} border ${roleBorder} backdrop-blur-md`}>
                    {currentUser.role}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-medium mt-1">
                  {currentUser.department || currentUser.branch || "Institutional Member"}
                </p>
                <p className="text-[10px] text-amber-300/80 font-medium mt-0.5 flex items-center gap-1">
                  <Camera className="w-3 h-3" /> Click photo above to upload new image
                </p>
              </div>
            </div>

            {/* Quick Status Tag */}
            <div className="sm:self-end pb-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Active & Verified</span>
              </span>
            </div>

          </div>

          {/* Photo feedback notification */}
          {photoFeedback && (
            <div className="mt-2 mb-1 p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs font-semibold flex items-center gap-2 backdrop-blur-md animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
              <span>{photoFeedback}</span>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-white/15 pb-3 mt-4 overflow-x-auto text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'overview'
                  ? 'bg-white/20 text-white shadow-md border border-white/30 backdrop-blur-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Overview & Contact
            </button>

            <button
              onClick={() => setActiveTab('credentials')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'credentials'
                  ? 'bg-white/20 text-white shadow-md border border-white/30 backdrop-blur-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {isStudent ? 'Academic & Skills' : isOfficer ? 'Recruitment Authority' : 'Root Privileges'}
            </button>

            <button
              onClick={() => setActiveTab('idcard')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'idcard'
                  ? 'bg-white/20 text-white shadow-md border border-white/30 backdrop-blur-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Digital ID Badge
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'security'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md border border-amber-400/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-300" />
              <span>Security & Password</span>
            </button>

            <button
              onClick={() => setActiveTab('edit')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'edit'
                  ? 'btn-orange-glow text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          </div>

          {/* Success Notification */}
          {isSaved && (
            <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4" />
              <span>Profile updated successfully! All changes are synchronized live.</span>
            </div>
          )}
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-4 space-y-4">

          {/* Tab 1: Overview & Contact */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              
              {/* Bio Statement */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#ff7849]" /> Professional Statement & Bio
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {formData.bio}
                </p>
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center gap-3.5 hover:bg-white/[0.09] transition-all">
                  <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Official Email</p>
                    <p className="text-xs text-white font-mono font-medium truncate">{currentUser.email || 'user@cpms.edu'}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center gap-3.5 hover:bg-white/[0.09] transition-all">
                  <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Contact Phone</p>
                    <p className="text-xs text-white font-mono font-medium">{formData.phone}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center gap-3.5 hover:bg-white/[0.09] transition-all">
                  <div className="p-2.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Office / Campus Location</p>
                    <p className="text-xs text-white font-medium truncate">{formData.location}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center gap-3.5 hover:bg-white/[0.09] transition-all">
                  <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    <Building className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Institutional Unit</p>
                    <p className="text-xs text-white font-medium truncate">{formData.department}</p>
                  </div>
                </div>
              </div>

              {/* Social / Professional Profiles */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" /> Professional Channels
                </h4>
                <div className="flex flex-wrap gap-3 text-xs">
                  <a
                    href={formData.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-cyan-300 hover:text-white transition-all shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5 fill-current text-sky-400" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v7.6h2.79v-7.6H6.46M7.86 6.4a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.65 1.65 0 0 0 1.65-1.66A1.65 1.65 0 0 0 7.86 6.4Z" />
                    </svg>
                    <span>LinkedIn Profile</span>
                  </a>

                  <a
                    href={formData.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-slate-200 hover:text-white transition-all shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5 fill-current text-slate-300" viewBox="0 0 24 24">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
                    </svg>
                    <span>GitHub Repository</span>
                  </a>
                </div>
              </div>

            </div>
          )}

          {/* Tab 2: Credentials & Specific Details */}
          {activeTab === 'credentials' && (
            <div className="space-y-4">
              
              {isStudent && (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] text-center">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Cumulative GPA</p>
                      <p className="text-xl font-bold font-heading text-emerald-400 mt-1">{currentUser.cgpa || 9.15} / 10</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] text-center">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Grad Batch</p>
                      <p className="text-xl font-bold font-heading text-white mt-1">{currentUser.graduationYear || 2026}</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] text-center">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Backlogs</p>
                      <p className="text-xl font-bold font-heading text-cyan-400 mt-1">{currentUser.backlogs || 0} Active</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] text-center">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Roll Number</p>
                      <p className="text-sm font-bold font-mono text-amber-300 mt-1.5">{currentUser.rollNumber || '2022CSE042'}</p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Technical Skill Matrix</h4>
                    <div className="flex flex-wrap gap-2">
                      {(typeof formData.skills === 'string' ? formData.skills.split(',') : formData.skills).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold backdrop-blur-md"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {isOfficer && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] text-center">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Staff Identifier</p>
                      <p className="text-lg font-bold font-mono text-amber-300 mt-1">{currentUser.officerCode || 'TPO-HQ-01'}</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] text-center">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Designation</p>
                      <p className="text-base font-bold text-white mt-1">Placement Cell Lead</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] text-center">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Placement Clearance</p>
                      <p className="text-base font-bold text-emerald-400 mt-1">Tier-1 Authority</p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] space-y-2 text-xs">
                    <h4 className="font-bold text-slate-200 uppercase tracking-wider">Authorized Operational Powers</h4>
                    <p className="text-slate-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Authoring & publishing corporate recruitment drives</p>
                    <p className="text-slate-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Shortlisting candidates & rolling out placement offer letters</p>
                    <p className="text-slate-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Scheduling interview panels & virtual meeting rooms</p>
                    <p className="text-slate-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Verifying academic records and approving student scholar registrations</p>
                  </div>
                </>
              )}

              {isAdmin && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] text-center">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Security Level</p>
                      <p className="text-lg font-bold font-mono text-purple-300 mt-1">DEAN ROOT LVL-4</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] text-center">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">System Uptime</p>
                      <p className="text-lg font-bold text-emerald-400 mt-1">99.98% Zero Downtime</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] text-center">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Database Node</p>
                      <p className="text-sm font-bold text-cyan-300 mt-1.5">MongoDB Atlas SSL</p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] space-y-2 text-xs">
                    <h4 className="font-bold text-slate-200 uppercase tracking-wider">Root Administrative Authorities</h4>
                    <p className="text-slate-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> Role-based permission delegation and user lifecycle management</p>
                    <p className="text-slate-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> Real-time security audit trails and tamper-proof log inspection</p>
                    <p className="text-slate-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> Emergency institutional broadcast dispatching</p>
                    <p className="text-slate-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> Database backup, schema indexing, and compliance governance</p>
                  </div>
                </>
              )}

            </div>
          )}

          {/* Tab 3: Digital ID Badge */}
          {activeTab === 'idcard' && (
            <div className="py-2 flex justify-center">
              <div className="w-full max-w-md rounded-[28px] glass-credit-card p-6 border border-white/20 shadow-2xl relative overflow-hidden">
                <div className="glass-credit-card-pattern absolute inset-0 opacity-40 pointer-events-none" />

                <div className="relative z-10 space-y-5">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold tracking-widest text-[#ff7849] uppercase block">
                        College Placement Management System
                      </span>
                      <h3 className="text-sm font-black font-heading tracking-wider text-white">
                        INSTITUTIONAL CREDENTIAL
                      </h3>
                    </div>

                    <div className="w-9 h-7 rounded-md bg-gradient-to-tr from-amber-400 to-yellow-200 p-1 flex items-center justify-center shadow-md">
                      <div className="w-full h-full border border-amber-700/40 rounded-[2px]" />
                    </div>
                  </div>

                  {/* Card Mid: Photo & Details */}
                  <div className="flex items-center gap-4 pt-1">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/30 shadow-lg">
                      <img
                        src={currentUser.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.fullName)}`}
                        alt={currentUser.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-base font-bold text-white font-heading truncate">{currentUser.fullName}</p>
                      <p className="text-xs text-cyan-300 font-semibold">{currentUser.role}</p>
                      <p className="text-[11px] text-slate-300 font-mono mt-0.5">
                        {isStudent ? (currentUser.rollNumber || '2022CSE042') : isOfficer ? (currentUser.officerCode || 'TPO-HQ-01') : 'ADM-ROOT-001'}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom: Barcode & Seal */}
                  <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase block font-semibold">Valid Thru</span>
                      <span className="font-mono text-white font-bold">2026-2027</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 uppercase block font-semibold">Status</span>
                      <span className="text-emerald-400 font-bold font-mono">VERIFIED • SECURE</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Security & Password */}
          {activeTab === 'security' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                
                <div className="flex items-center gap-3.5 pb-4 border-b border-white/10 mb-5">
                  <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 shadow-inner">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white font-heading tracking-wide">
                      Update Account Password
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Ensure your account remains secure by choosing a strong, unique password.
                    </p>
                  </div>
                </div>

                {passSuccess && (
                  <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2.5 backdrop-blur-md animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{passSuccess}</span>
                  </div>
                )}

                {passError && (
                  <div className="mb-4 p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-2.5 backdrop-blur-md animate-in fade-in">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{passError}</span>
                  </div>
                )}

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-300 font-semibold mb-1.5">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPass ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current account password"
                        className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                      >
                        {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs text-slate-300 font-semibold mb-1.5">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPass ? "text" : "password"}
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Min 6 characters"
                          className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPass(!showNewPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                        >
                          {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 font-semibold mb-1.5">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPass ? "text" : "password"}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-type new password"
                          className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPass(!showConfirmPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                        >
                          {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Password Guidelines Card */}
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-300 space-y-1.5">
                    <p className="font-semibold text-white flex items-center gap-1.5 text-xs">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" /> Password Security Guidelines:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px] pl-1">
                      <li>Minimum 6 characters long</li>
                      <li>Includes alphanumeric characters or symbols</li>
                      <li>Passes instant cryptographic hash encryption</li>
                    </ul>
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="submit"
                      disabled={passLoading}
                      className="px-6 py-2.5 rounded-xl btn-orange-glow text-white font-bold text-xs shadow-lg flex items-center gap-2 hover:scale-102 transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {passLoading ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Updating...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-3.5 h-3.5" />
                          <span>Update Password</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

              </div>
            </div>
          )}

          {/* Tab 5: Edit Profile Form */}
          {activeTab === 'edit' && (
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              
              {/* Profile Photo Quick Upload Bar */}
              <div className="p-4 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div 
                    onClick={handlePhotoClick}
                    className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-md cursor-pointer hover:scale-105 transition-transform shrink-0 relative group"
                    title="Click to change photo"
                  >
                    <img
                      src={currentUser.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.fullName)}&background=1e293b&color=fff`}
                      alt={currentUser.fullName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="w-4 h-4 text-amber-300" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Profile Picture</h4>
                    <p className="text-[11px] text-slate-300">Click photo or use button to upload JPG, PNG, WEBP (Max 5MB)</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePhotoClick}
                  className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-bold flex items-center gap-1.5 transition-all self-start sm:self-auto cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Photo</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Department / Branch</label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">Campus / Office Location</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Professional Bio Statement</label>
                <textarea
                  rows="3"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Technical Skills / Keywords (comma separated)</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">LinkedIn URL</label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">GitHub / Portfolio URL</label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-white/15 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-slate-300 hover:text-white border border-white/20 font-semibold transition-all shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl btn-orange-glow text-white font-bold shadow-lg flex items-center gap-2 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Changes</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
