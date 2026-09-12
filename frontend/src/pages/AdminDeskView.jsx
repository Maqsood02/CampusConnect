import React, { useState } from 'react';
import {
  ShieldAlert,
  Server,
  Users,
  Megaphone,
  FileText,
  Sparkles,
  Lock,
  Send,
  CheckCircle2
} from 'lucide-react';
import { api } from '../services/api';

export default function AdminDeskView({ students = [], officer, admin }) {
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const auditLogs = [
    { id: 'log_1', action: 'SECURITY_LOGIN_SUCCESS', user: 'officer@cpms.edu', ip: '192.168.1.104', time: '10 mins ago', level: 'INFO' },
    { id: 'log_2', action: 'RECRUITMENT_DRIVE_POSTED', user: 'officer@cpms.edu', ip: '192.168.1.104', time: '1 hour ago', level: 'NOTICE' },
    { id: 'log_3', action: 'STUDENT_ELIGIBILITY_VERIFIED', user: 'student@cpms.edu', ip: '172.16.4.12', time: '3 hours ago', level: 'INFO' },
    { id: 'log_4', action: 'CANDIDATE_SHORTLIST_CONFIRMED', user: 'officer@cpms.edu', ip: '192.168.1.104', time: '5 hours ago', level: 'INFO' },
    { id: 'log_5', action: 'SYSTEM_DB_INDEX_OPTIMIZED', user: 'admin@cpms.edu', ip: '127.0.0.1', time: 'Yesterday', level: 'SYSTEM' }
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
            Administrator Console & System Audit
            <Sparkles className="w-5 h-5 text-[#ff7849]" />
          </h2>
          <p className="text-xs text-slate-300/80 mt-1">
            Global institutional governance, database health oversight, user permissions, and university broadcast alerts.
          </p>
        </div>
      </div>

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
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300 font-heading flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" /> System Account Directory
            </h3>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white text-sm">{admin.fullName}</p>
                  <span className="text-purple-300 text-xs font-semibold">Role: Administrator • {admin.email}</span>
                </div>
                <span className="text-emerald-400 font-semibold text-xs bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Active</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white text-sm">{officer.fullName}</p>
                  <span className="text-amber-300 text-xs font-semibold">Role: Placement Officer • {officer.email}</span>
                </div>
                <span className="text-emerald-400 font-semibold text-xs bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Active</span>
              </div>

              {students.slice(0, 3).map(st => (
                <div key={st.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-sm">{st.fullName} ({st.rollNumber})</p>
                    <span className="text-cyan-300 text-xs font-semibold">Role: Student • {st.email}</span>
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
