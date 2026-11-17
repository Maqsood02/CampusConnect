import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Server,
  Users,
  Megaphone,
  FileText,
  Sparkles,
  Lock,
  Send,
  CheckCircle2,
  UserPlus,
  X,
  Mail,
  Phone,
  Briefcase,
  Key
} from 'lucide-react';
import { api } from '../services/api';

export default function AdminDeskView({ students = [], officer, admin }) {
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  // Placement Officer Provisioning Modal State
  const [showOfficerModal, setShowOfficerModal] = useState(false);
  const [officersList, setOfficersList] = useState([]);
  const [newOfficerName, setNewOfficerName] = useState('');
  const [newOfficerEmail, setNewOfficerEmail] = useState('');
  const [newOfficerPassword, setNewOfficerPassword] = useState('Officer@123456');
  const [newOfficerDept, setNewOfficerDept] = useState('Training & Placement Cell');
  const [newOfficerCode, setNewOfficerCode] = useState('TPO-HQ-02');
  const [newOfficerPhone, setNewOfficerPhone] = useState('');
  const [provisioningLoading, setProvisioningLoading] = useState(false);
  const [provisionSuccessMsg, setProvisionSuccessMsg] = useState('');
  const [provisionErrorMsg, setProvisionErrorMsg] = useState('');

  useEffect(() => {
    loadOfficers();
  }, []);

  const loadOfficers = async () => {
    try {
      const data = await api.getOfficers();
      if (Array.isArray(data)) {
        setOfficersList(data);
      }
    } catch (_) {}
  };

  const handleCreateOfficer = async (e) => {
    e.preventDefault();
    if (!newOfficerEmail || !newOfficerName || !newOfficerPassword) {
      setProvisionErrorMsg('Name, Email, and Password are required.');
      return;
    }
    setProvisionErrorMsg('');
    setProvisionSuccessMsg('');
    setProvisioningLoading(true);

    try {
      const res = await api.createOfficer({
        fullName: newOfficerName.trim(),
        email: newOfficerEmail.trim().toLowerCase(),
        password: newOfficerPassword,
        department: newOfficerDept,
        officerCode: newOfficerCode,
        phone: newOfficerPhone
      });

      setProvisionSuccessMsg(res.message || `Placement Officer account provisioned & credentials emailed to ${newOfficerEmail}!`);
      await loadOfficers();
      setNewOfficerName('');
      setNewOfficerEmail('');
      setNewOfficerPassword('Officer@123456');
      setNewOfficerPhone('');
      setTimeout(() => {
        setShowOfficerModal(false);
        setProvisionSuccessMsg('');
      }, 2500);
    } catch (err) {
      setProvisionErrorMsg(err.message || 'Failed to provision officer account.');
    } finally {
      setProvisioningLoading(false);
    }
  };

  const auditLogs = [
    { id: 'log_1', action: 'SECURITY_LOGIN_SUCCESS', user: 'officer@cpms.edu', ip: '192.168.1.104', time: '10 mins ago', level: 'INFO' },
    { id: 'log_2', action: 'RECRUITMENT_DRIVE_POSTED', user: 'officer@cpms.edu', ip: '192.168.1.104', time: '1 hour ago', level: 'NOTICE' },
    { id: 'log_3', action: 'STUDENT_ELIGIBILITY_VERIFIED', user: 'student@cpms.edu', ip: '172.16.4.12', time: '3 hours ago', level: 'INFO' },
    { id: 'log_4', action: 'CANDIDATE_SHORTLIST_CONFIRMED', user: 'officer@cpms.edu', ip: '192.168.1.104', time: '5 hours ago', level: 'INFO' },
    { id: 'log_5', action: 'SYSTEM_DB_INDEX_OPTIMIZED', user: 'admin@cpms', ip: '127.0.0.1', time: 'Yesterday', level: 'SYSTEM' }
  ];

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) return;

    api.addNotification({
      title: `Institutional Announcement: ${broadcastTitle}`,
      message: broadcastMessage,
      type: 'broadcast'
    });

    setSentSuccess(true);
    setBroadcastTitle('');
    setBroadcastMessage('');
    setTimeout(() => setSentSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight flex items-center gap-2">
            Administrator Console &amp; System Audit
            <Sparkles className="w-5 h-5 text-[#ff7849]" />
          </h2>
          <p className="text-xs text-slate-300/80 mt-1">
            Global institutional governance, database health oversight, user permissions, and university broadcast alerts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => { setShowOfficerModal(true); setProvisionErrorMsg(''); setProvisionSuccessMsg(''); }}
          className="px-4 py-2.5 rounded-2xl btn-orange-glow text-white text-xs font-bold shadow-lg flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Provision Placement Officer</span>
        </button>
      </div>

      {/* PROVISION OFFICER MODAL */}
      {showOfficerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg glass-card p-6 sm:p-7 rounded-[32px] border border-white/20 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-heading">Provision Placement Officer Account</h3>
                  <p className="text-[11px] text-slate-400">Officer credentials will be created &amp; delivered via Gmail SMTP</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowOfficerModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {provisionSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{provisionSuccessMsg}</span>
              </div>
            )}

            {provisionErrorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{provisionErrorMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateOfficer} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Officer Full Legal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Prof. Rajesh Kumar"
                    value={newOfficerName}
                    onChange={(e) => setNewOfficerName(e.target.value)}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Official Institutional Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. tpo.rajesh@cpms.ac.in"
                    value={newOfficerEmail}
                    onChange={(e) => setNewOfficerEmail(e.target.value)}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Assigned Temporary Password</label>
                  <input
                    type="text"
                    required
                    placeholder="Min 6 characters"
                    value={newOfficerPassword}
                    onChange={(e) => setNewOfficerPassword(e.target.value)}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Officer Identification Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TPO-HQ-02"
                    value={newOfficerCode}
                    onChange={(e) => setNewOfficerCode(e.target.value)}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Department</label>
                  <input
                    type="text"
                    value={newOfficerDept}
                    onChange={(e) => setNewOfficerDept(e.target.value)}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Official Contact Phone</label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={newOfficerPhone}
                    onChange={(e) => setNewOfficerPhone(e.target.value)}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-[11px] text-amber-200/90 leading-relaxed flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Creating this account grants <strong>Level 2 - TPO Operations clearance</strong>. The system will dispatch an automated email with their login credentials from <strong>cpms.ac.in@gmail.com</strong>.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowOfficerModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={provisioningLoading}
                  className="px-5 py-2.5 rounded-xl btn-orange-glow text-white text-xs font-bold shadow-lg flex items-center gap-1.5 cursor-pointer"
                >
                  {provisioningLoading ? 'Provisioning & Emailing...' : 'Provision Officer & Send Email'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Audit Logs & User Directory */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Security Audit Trail */}
          <div className="glass-inner-card p-6 rounded-[28px] border border-white/10 space-y-4 text-xs shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300 font-heading flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#ff7849]" /> Real-Time Security Audit Trail
            </h3>

            <div className="divide-y divide-white/5 overflow-x-auto">
              {auditLogs.map(log => (
                <div key={log.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-white text-xs">{log.action}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-white/10 text-cyan-300 border border-white/10">
                        {log.level}
                      </span>
                    </div>
                    <span className="text-slate-400 text-xs">User: <strong className="text-slate-200">{log.user}</strong> • IP: {log.ip}</span>
                  </div>
                  <span className="text-slate-400 text-xs whitespace-nowrap font-mono">{log.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User Directory Preview */}
          <div className="glass-inner-card p-6 rounded-[28px] border border-white/10 space-y-4 text-xs shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300 font-heading flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" /> System Account Directory
              </h3>
              <button
                type="button"
                onClick={() => { setShowOfficerModal(true); setProvisionErrorMsg(''); setProvisionSuccessMsg(''); }}
                className="text-[11px] font-bold text-[#ff7849] hover:text-orange-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>+ Provision Officer</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {/* Administrator */}
              <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white text-sm">System Administrator</p>
                  <span className="text-purple-300 text-xs font-semibold">Role: Administrator • admin@cpms</span>
                </div>
                <span className="text-purple-300 font-bold text-xs bg-purple-500/20 px-2.5 py-0.5 rounded-full border border-purple-500/30">Master Admin</span>
              </div>

              {/* Placement Officers */}
              {officersList.length > 0 ? (
                officersList.map((off, idx) => (
                  <div key={off.id || idx} className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white text-sm">{off.fullName || 'Placement Officer'}</p>
                      <span className="text-amber-300 text-xs font-semibold">
                        Role: Placement Officer • {off.email} • Code: {off.officerCode || 'TPO-HQ-01'}
                      </span>
                    </div>
                    <span className="text-emerald-400 font-semibold text-xs bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Active TPO</span>
                  </div>
                ))
              ) : (
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-sm">{officer?.fullName || 'Prof. Sarah Jenkins'}</p>
                    <span className="text-amber-300 text-xs font-semibold">Role: Placement Officer • {officer?.email || 'officer@cpms.edu'}</span>
                  </div>
                  <span className="text-emerald-400 font-semibold text-xs bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Active TPO</span>
                </div>
              )}

              {students.slice(0, 3).map(st => (
                <div key={st.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-sm">{st.fullName} ({st.rollNumber})</p>
                    <span className="text-cyan-300 text-xs font-semibold">Role: Student Scholar • {st.email}</span>
                  </div>
                  <span className="text-emerald-400 font-semibold text-xs bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Active</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Col: Broadcast Dispatcher */}
        <div className="space-y-6">
          
          <div className="glass-inner-card p-6 rounded-[28px] border border-white/10 space-y-4 text-xs shadow-xl">
            <h4 className="text-sm font-bold font-heading text-white flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-[#ff7849]" /> University Placement Broadcast
            </h4>
            <p className="text-slate-300/80 text-xs leading-relaxed">
              Instantly push official alerts, schedule updates, or policy guidelines to all active students and placement officers.
            </p>

            {sentSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Broadcast message dispatched!</span>
              </div>
            )}

            <form onSubmit={handleSendBroadcast} className="space-y-3.5">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Announcement Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mandatory Placement Orientation"
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Message Body</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Draft your announcement message here..."
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl btn-orange-glow text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Dispatch Broadcast</span>
              </button>
            </form>
          </div>

          <div className="glass-inner-card p-6 rounded-[28px] border border-white/10 space-y-2 text-xs shadow-xl">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>MongoDB Engine Health</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed mt-1">
              Connection protocol: Spring Data MongoDB Driver. Collections indexed: users, students, companies, recruitment_drives, applications, interviews, notifications, audit_logs.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
