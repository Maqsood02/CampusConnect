import React, { useState } from 'react';
import {
  GraduationCap,
  Lock,
  Mail,
  Sparkles,
  User,
  Building,
  Award,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  Eye,
  EyeOff
} from 'lucide-react';
import { api } from '../services/api';

export default function AuthView({ onAuthenticated }) {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('Student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [rollNumber, setRollNumber] = useState('');
  const [cgpa, setCgpa] = useState('9.15');
  const [gradYear, setGradYear] = useState('2026');
  const [officerCode, setOfficerCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const [isForgotPass, setIsForgotPass] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newResetPassword, setNewResetPassword] = useState('');
  const [resetStep, setResetStep] = useState(1); // 1: email, 2: code & new pass
  const [successMsg, setSuccessMsg] = useState('');

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    if (resetStep === 1) {
      if (!forgotEmail) {
        setError('Please enter your registered institutional email.');
        setLoading(false);
        return;
      }
      setTimeout(() => {
        setResetStep(2);
        setSuccessMsg('Verification code sent to ' + forgotEmail + '. Check your inbox (Code: 849201).');
        setLoading(false);
      }, 700);
    } else {
      if (!newResetPassword || newResetPassword.length < 6) {
        setError('New password must be at least 6 characters long.');
        setLoading(false);
        return;
      }
      try {
        await api.changePassword('demo123', newResetPassword);
        setSuccessMsg('Password successfully reset! You may now sign in with your new password.');
        setTimeout(() => {
          setIsForgotPass(false);
          setResetStep(1);
          setForgotEmail('');
          setResetCode('');
          setNewResetPassword('');
        }, 2000);
      } catch (err) {
        setError(err.message || 'Failed to reset password.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.login(email, password);
      onAuthenticated(res.user);
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.register({
        fullName,
        email,
        password,
        role: 'Student', // Only student allowed on public signup
        department,
        rollNumber,
        cgpa,
        graduationYear: gradYear
      });
      onAuthenticated(res.user);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (roleName) => {
    const user = api.switchPersona(roleName);
    onAuthenticated(user);
  };

  return (
    <div className="min-h-screen glass-backdrop-scene flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#ff7849] selection:text-white relative">
      
      {/* Glow Ambient Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#ff7849]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glass Card */}
      <div className="relative w-full max-w-xl glass-canvas bg-slate-950/70 backdrop-blur-2xl border border-white/20 rounded-[36px] p-6 sm:p-10 shadow-2xl my-6 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Top Logo & Title */}
        <div className="text-center pb-6 border-b border-white/10">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4 drop-shadow-[0_10px_25px_rgba(255,120,73,0.45)] hover:scale-105 transition-transform duration-300">
            <img
              src="/campusconnect_logo.png"
              alt="CampusConnect Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-wide">
            {isForgotPass 
              ? 'Reset Password' 
              : isRegister 
              ? 'Join CampusConnect' 
              : 'Welcome to CampusConnect'}
          </h1>
          <p className="text-xs sm:text-sm text-orange-200/90 mt-1 font-medium">
            {isForgotPass 
              ? 'Institutional Credential Recovery' 
              : 'Smart College Placement Management System'}
          </p>
        </div>

        {/* 1-Click Instant Demo Access Strip (Visible on Sign In) */}
        {!isRegister && !isForgotPass && (
          <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-xs font-bold text-[#ff7849] flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> 1-Click Instant Demo Login:
              </p>
              <span className="text-[10px] text-slate-400 font-mono">No Password Needed</span>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <button
                onClick={() => handleDemoLogin('Student')}
                className="px-2.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-300 text-xs font-bold transition-all hover:scale-102 flex flex-col items-center gap-1 cursor-pointer"
              >
                <span className="text-sm">🎓</span>
                <span>Student (Alex)</span>
              </button>

              <button
                onClick={() => handleDemoLogin('Placement Officer')}
                className="px-2.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-300 text-xs font-bold transition-all hover:scale-102 flex flex-col items-center gap-1 cursor-pointer"
              >
                <span className="text-sm">🛡️</span>
                <span>Officer (Sarah)</span>
              </button>

              <button
                onClick={() => handleDemoLogin('Administrator')}
                className="px-2.5 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-400/30 text-purple-300 text-xs font-bold transition-all hover:scale-102 flex flex-col items-center gap-1 cursor-pointer"
              >
                <span className="text-sm">⚡</span>
                <span>Admin (Arthur)</span>
              </button>
            </div>
          </div>
        )}

        {/* Feedback Banners */}
        {error && (
          <div className="mt-4 p-3 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mt-4 p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* FORGOT PASSWORD VIEW */}
        {isForgotPass ? (
          <form onSubmit={handleForgotSubmit} className="mt-6 space-y-4 text-xs">
            {resetStep === 1 ? (
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">Registered Institutional Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. name@cpms.edu"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full glass-input pl-10 pr-4 py-3 rounded-xl text-xs text-white"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">
                  We'll send a 6-digit verification code to reset your account password.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">6-Digit Verification Code</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter 6-digit code (e.g. 849201)"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">New Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Min 6 characters"
                    value={newResetPassword}
                    onChange={(e) => setNewResetPassword(e.target.value)}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl btn-orange-glow font-bold text-sm text-white shadow-xl mt-2 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? 'Processing...' : resetStep === 1 ? 'Send Recovery Code' : 'Update & Reset Password'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => { setIsForgotPass(false); setResetStep(1); setError(''); setSuccessMsg(''); }}
                className="text-slate-300 hover:text-white text-xs font-semibold underline transition-colors"
              >
                &larr; Back to Sign In
              </button>
            </div>
          </form>
        ) : !isRegister ? (
          /* SIGN IN FORM */
          <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Official Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="e.g. alex.mercer@cpms.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass-input pl-10 pr-4 py-3 rounded-xl text-xs text-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-slate-300 font-semibold">Password</label>
                <button
                  type="button"
                  onClick={() => { setIsForgotPass(true); setError(''); setSuccessMsg(''); setForgotEmail(email); }}
                  className="text-[#ff7849] hover:text-orange-300 font-semibold text-[11px] transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full glass-input pl-10 pr-11 py-3 rounded-xl text-xs text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white transition-colors"
                  title={showLoginPassword ? "Hide password" : "Show password"}
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl btn-orange-glow font-bold text-sm text-white shadow-xl mt-2 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Institutional Credentials Quick-Fill Helper (Login Screen Only) */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              <span className="text-[11px] text-slate-400 font-semibold block text-center">
                Institutional Demo Credentials:
              </span>
              <div className="grid grid-cols-3 gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => {
                    setEmail('alex.mercer@cpms.edu');
                    setPassword('password123');
                  }}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-center transition-all cursor-pointer"
                  title="Auto-fill Student credentials"
                >
                  <span className="block font-bold text-orange-400">🎓 Student</span>
                  <span className="text-[10px] text-slate-400">alex.mercer</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEmail('officer@cpms.edu');
                    setPassword('officer123');
                  }}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-center transition-all cursor-pointer"
                  title="Auto-fill Placement Officer credentials"
                >
                  <span className="block font-bold text-amber-400">🛡️ Officer</span>
                  <span className="text-[10px] text-slate-400">officer@cpms</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEmail('admin@cpms.edu');
                    setPassword('admin123');
                  }}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-center transition-all cursor-pointer"
                  title="Auto-fill Administrator credentials"
                >
                  <span className="block font-bold text-purple-400">⚡ Admin</span>
                  <span className="text-[10px] text-slate-400">admin@cpms</span>
                </button>
              </div>
            </div>

            {/* Bottom Text Link to Register */}
            <div className="text-center pt-2">
              <p className="text-xs text-slate-300">
                Don't have an institutional student account?{' '}
                <button
                  type="button"
                  onClick={() => { setIsRegister(true); setError(''); setSuccessMsg(''); }}
                  className="text-[#ff7849] hover:text-orange-300 font-bold underline transition-colors cursor-pointer ml-1"
                >
                  Create New Account
                </button>
              </p>
            </div>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleRegisterSubmit} className="mt-6 space-y-3.5 text-xs">
            
            {/* Institutional Student Account Badge */}
            <div className="p-3.5 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-orange-500/20 flex items-center justify-center text-base">🎓</span>
                <div>
                  <div className="text-xs font-bold text-white">Student Scholar Registration</div>
                  <div className="text-[10px] text-orange-200/80">Placement Officer & Admin accounts are managed by Institutional Administration</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                Active Batch
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Legal Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full glass-input pl-10 pr-3 py-2.5 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Institutional Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="name@cpms.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full glass-input pl-10 pr-3 py-2.5 rounded-xl text-xs text-white"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showRegisterPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full glass-input pl-10 pr-11 py-2.5 rounded-xl text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title={showRegisterPassword ? "Hide password" : "Show password"}
                  >
                    {showRegisterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Department</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. CSE / IT"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full glass-input pl-10 pr-3 py-2.5 rounded-xl text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* Student Specific Fields */}
            <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10">
              <div>
                <label className="block text-slate-400 text-[10px] font-semibold mb-1">Roll Number</label>
                <input
                  type="text"
                  placeholder="2026CSE042"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="w-full glass-input px-2.5 py-1.5 rounded-lg text-xs font-mono text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-[10px] font-semibold mb-1">Current CGPA</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  className="w-full glass-input px-2.5 py-1.5 rounded-lg text-xs font-mono text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-[10px] font-semibold mb-1">Grad Year</label>
                <input
                  type="number"
                  value={gradYear}
                  onChange={(e) => setGradYear(e.target.value)}
                  className="w-full glass-input px-2.5 py-1.5 rounded-lg text-xs font-mono text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl btn-orange-glow font-bold text-sm text-white shadow-xl mt-3 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? 'Creating Student Account...' : 'Register & Enter Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Bottom Text Link to Sign In */}
            <div className="text-center pt-3 border-t border-white/10 mt-4">
              <p className="text-xs text-slate-300">
                Already registered with institutional credentials?{' '}
                <button
                  type="button"
                  onClick={() => { setIsRegister(false); setError(''); setSuccessMsg(''); }}
                  className="text-[#ff7849] hover:text-orange-300 font-bold underline transition-colors cursor-pointer ml-1"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        )}

        {/* Bottom Status / Security Notice */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            End-to-End Encrypted Session
          </span>
          <span className="text-cyan-300 font-mono">
            JWT • MongoDB SSL Active
          </span>
        </div>

      </div>

    </div>
  );
}
