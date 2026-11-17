import React, { useState } from 'react';
import {
  GraduationCap,
  Lock,
  Mail,
  User,
  Building,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
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
  const [cgpa, setCgpa] = useState('8.50');
  const [gradYear, setGradYear] = useState('2026');
  const [officerCode, setOfficerCode] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const [isForgotPass, setIsForgotPass] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newResetPassword, setNewResetPassword] = useState('');
  const [resetStep, setResetStep] = useState(1);
  const [successMsg, setSuccessMsg] = useState('');

  // Email OTP Verification State for Registration
  const [registerOtp, setRegisterOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);

  const handleSendRegisterOtp = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid institutional email address to receive your OTP.');
      return;
    }
    setError('');
    setSuccessMsg('');
    setSendingOtp(true);
    try {
      const res = await api.sendOtp(email, 'REGISTRATION');
      setOtpSent(true);
      setSuccessMsg(res.message || `Verification OTP sent to ${email}. Check your inbox!`);
      setOtpCooldown(60);
      const timer = setInterval(() => {
        setOtpCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError(err.message || 'Failed to dispatch verification OTP.');
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyRegisterOtp = async () => {
    if (!registerOtp || registerOtp.trim().length < 6) {
      setError('Please enter the 6-digit verification code sent to your email.');
      return;
    }
    setError('');
    setSuccessMsg('');
    setVerifyingOtp(true);
    try {
      const res = await api.verifyOtp(email, registerOtp.trim(), 'REGISTRATION');
      if (res.verified || res.success) {
        setOtpVerified(true);
        setSuccessMsg(`✓ Email ${email} verified successfully! You may now complete account registration.`);
      } else {
        setError('Invalid or expired verification OTP. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'OTP verification failed.');
    } finally {
      setVerifyingOtp(false);
    }
  };

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
      try {
        await api.sendOtp(forgotEmail, 'PASSWORD_RESET');
        setResetStep(2);
        setSuccessMsg('Recovery verification 6-digit code sent to ' + forgotEmail + '. Check your inbox.');
      } catch (err) {
        setError(err.message || 'Failed to send recovery code.');
      } finally {
        setLoading(false);
      }
    } else {
      if (!newResetPassword || newResetPassword.length < 6) {
        setError('New password must be at least 6 characters long.');
        setLoading(false);
        return;
      }
      try {
        await api.resetPasswordWithOtp(forgotEmail, resetCode, newResetPassword);
        setSuccessMsg('Password successfully reset! You may now sign in with your new password.');
        setTimeout(() => {
          setIsForgotPass(false);
          setResetStep(1);
          setForgotEmail('');
          setResetCode('');
          setNewResetPassword('');
        }, 1800);
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

    // Require OTP verification for new registrations
    if (!otpVerified) {
      setError('Please verify your institutional email with the 6-digit OTP code before proceeding.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.register({
        fullName,
        email,
        password,
        role: 'Student',
        department,
        otp: registerOtp,
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
                    placeholder="e.g. yourname@university.edu"
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
                    placeholder="Enter 6-digit code received"
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
                className="text-slate-300 hover:text-white text-xs font-semibold underline transition-colors cursor-pointer"
              >
                &larr; Back to Sign In
              </button>
            </div>
          </form>
        ) : !isRegister ? (
          /* SIGN IN FORM (Clean, no default demo logins or credentials) */
          <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Official Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="e.g. yourname@university.edu"
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
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title={showLoginPassword ? "Hide password" : "Show password"}
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Default System Credentials Card */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
                  Default System Credentials
                </span>
                <span className="text-[10px] text-slate-400">Institutional Access</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEmail('admin@cpms');
                    setPassword('Cpms@123456');
                    setError('');
                    setSuccessMsg('Default Admin credentials filled (admin@cpms / Cpms@123456). Click "Sign In" below.');
                  }}
                  className="p-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-left transition-all cursor-pointer group"
                >
                  <div className="text-[11px] font-bold text-purple-300 group-hover:text-purple-200 flex items-center justify-between">
                    <span>👑 Admin</span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-purple-500/20 rounded font-semibold text-purple-200">Auto-fill</span>
                  </div>
                  <div className="text-[10px] text-slate-300 font-mono mt-1 truncate">admin@cpms</div>
                  <div className="text-[9px] text-slate-400 font-mono">Cpms@123456</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEmail('officer@cpms.edu');
                    setPassword('Cpms@123456');
                    setError('');
                    setSuccessMsg('Default Officer credentials filled (officer@cpms.edu / Cpms@123456). Click "Sign In" below.');
                  }}
                  className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-left transition-all cursor-pointer group"
                >
                  <div className="text-[11px] font-bold text-amber-300 group-hover:text-amber-200 flex items-center justify-between">
                    <span>🛡️ Officer</span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/20 rounded font-semibold text-amber-200">Auto-fill</span>
                  </div>
                  <div className="text-[10px] text-slate-300 font-mono mt-1 truncate">officer@cpms.edu</div>
                  <div className="text-[9px] text-slate-400 font-mono">Cpms@123456</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEmail('student@cpms.edu');
                    setPassword('Cpms@123456');
                    setError('');
                    setSuccessMsg('Default Student credentials filled (student@cpms.edu / Cpms@123456). Click "Sign In" below.');
                  }}
                  className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-left transition-all cursor-pointer group"
                >
                  <div className="text-[11px] font-bold text-cyan-300 group-hover:text-cyan-200 flex items-center justify-between">
                    <span>🎓 Student</span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-cyan-500/20 rounded font-semibold text-cyan-200">Auto-fill</span>
                  </div>
                  <div className="text-[10px] text-slate-300 font-mono mt-1 truncate">student@cpms.edu</div>
                  <div className="text-[9px] text-slate-400 font-mono">Cpms@123456</div>
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

            {/* Bottom Text Link to Register */}
            <div className="text-center pt-3 border-t border-white/10 mt-5">
              <p className="text-xs text-slate-300">
                Are you a student scholar?{' '}
                <button
                  type="button"
                  onClick={() => { setIsRegister(true); setError(''); setSuccessMsg(''); }}
                  className="text-[#ff7849] hover:text-orange-300 font-bold underline transition-colors cursor-pointer ml-1"
                >
                  Register with Email OTP
                </button>
              </p>
            </div>
          </form>
        ) : (
          /* REGISTER FORM (Student Scholar Registration with Email OTP; Officers provisioned by Admin) */
          <form onSubmit={handleRegisterSubmit} className="mt-6 space-y-3.5 text-xs">
            
            {/* Student Registration Header Banner */}
            <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center text-base shrink-0 mt-0.5">
                🎓
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-cyan-200">Student Scholar Registration</h3>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-semibold border border-cyan-500/30">
                    OTP Protected
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Verify your institutional email via live 6-digit OTP to activate your placement profile and job applications.
                </p>
              </div>
            </div>

            {/* Notice for Placement Officers */}
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2.5 text-[11px] text-amber-300/90">
              <span className="text-sm shrink-0">👔</span>
              <span>
                <strong>Placement Officers:</strong> Officer accounts are created directly by Institutional Administrators. Check your email for login credentials.
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
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-300 font-semibold">Institutional Email</label>
                  {otpVerified && (
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      OTP Verified ✓
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="name@university.edu"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (otpVerified) setOtpVerified(false);
                      if (otpSent) setOtpSent(false);
                    }}
                    className={`w-full glass-input pl-10 pr-24 py-2.5 rounded-xl text-xs text-white transition-all ${
                      otpVerified ? 'border-emerald-500/50 bg-emerald-950/10' : ''
                    }`}
                  />
                  {!otpVerified ? (
                    <button
                      type="button"
                      disabled={sendingOtp || otpCooldown > 0 || !email}
                      onClick={handleSendRegisterOtp}
                      className="absolute right-1.5 top-1.5 px-2.5 py-1.5 rounded-lg bg-[#ff7849]/20 hover:bg-[#ff7849]/30 text-[#ff7849] font-bold text-[10px] border border-[#ff7849]/40 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {sendingOtp ? 'Sending...' : otpCooldown > 0 ? `${otpCooldown}s` : 'Send OTP'}
                    </button>
                  ) : (
                    <span className="absolute right-3 top-2.5 text-emerald-400 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* OTP Entry Box when OTP is sent but not yet verified */}
            {otpSent && !otpVerified && (
              <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                    <span>🔐</span> Enter 6-Digit Email Verification Code
                  </span>
                  <span className="text-[10px] text-slate-400 truncate max-w-[180px]">
                    Sent to <span className="text-white font-mono">{email}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="e.g. 583920"
                    value={registerOtp}
                    onChange={(e) => setRegisterOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full glass-input px-3 py-2 rounded-xl text-center text-sm font-mono tracking-widest text-white border-indigo-400/40 focus:border-indigo-400"
                  />
                  <button
                    type="button"
                    disabled={verifyingOtp || registerOtp.length < 6}
                    onClick={handleVerifyRegisterOtp}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer shrink-0 disabled:opacity-50"
                  >
                    {verifyingOtp ? 'Verifying...' : 'Verify OTP'}
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400">
                  <span>Code valid for 10 minutes</span>
                  <button
                    type="button"
                    disabled={otpCooldown > 0 || sendingOtp}
                    onClick={handleSendRegisterOtp}
                    className="text-indigo-400 hover:text-indigo-300 underline cursor-pointer disabled:opacity-50"
                  >
                    {otpCooldown > 0 ? `Resend in ${otpCooldown}s` : 'Resend Code'}
                  </button>
                </div>
              </div>
            )}

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
                    placeholder="e.g. Computer Science & Engineering"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full glass-input pl-10 pr-3 py-2.5 rounded-xl text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* Student Academic Details */}
            <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10">
              <div>
                <label className="block text-slate-400 text-[10px] font-semibold mb-1">Roll Number</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2026CSE042"
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
                  required
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  className="w-full glass-input px-2.5 py-1.5 rounded-lg text-xs font-mono text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-[10px] font-semibold mb-1">Grad Year</label>
                <input
                  type="number"
                  required
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
              <span>{loading ? 'Creating Student Account...' : 'Complete Student Registration'}</span>
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
