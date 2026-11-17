import React, { useState } from 'react';
import { X, GraduationCap, Lock, Mail } from 'lucide-react';
import { api } from '../../services/api';

export default function AuthModal({ isOpen, onClose, onAuthenticated }) {
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPass, setIsForgotPass] = useState(false);
  const [resetStep, setResetStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newResetPassword, setNewResetPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [branch, setBranch] = useState('CSE');
  const [cgpa, setCgpa] = useState('8.5');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);
    try {
      if (isRegister) {
        const res = await api.register({
          fullName,
          email,
          password,
          role: 'Student',
          department: branch,
          cgpa: parseFloat(cgpa) || 8.0,
          rollNumber: 'SCHOLAR-' + Math.floor(1000 + Math.random() * 9000),
          graduationYear: 2026,
        });
        onAuthenticated(res.user || { fullName, email, role: 'Student', department: branch, cgpa: parseFloat(cgpa) || 8.0 });
        onClose();
      } else {
        const res = await api.login(email, password);
        onAuthenticated(res.user);
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (resetStep === 1) {
        if (!forgotEmail) throw new Error('Please enter your institutional email');
        await new Promise(r => setTimeout(r, 600));
        setSuccessMsg(`Recovery code sent to ${forgotEmail}`);
        setResetStep(2);
      } else {
        if (!resetCode || !newResetPassword) throw new Error('Please enter code and new password');
        await api.resetPassword(forgotEmail, resetCode, newResetPassword);
        setSuccessMsg('Password updated successfully! You may now sign in.');
        setTimeout(() => {
          setIsForgotPass(false);
          setResetStep(1);
          setPassword(newResetPassword);
          setEmail(forgotEmail);
        }, 1200);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-[#0b1329] border border-slate-700/80 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_40px_rgba(255,120,73,0.12)] overflow-hidden m-auto p-6 md:p-8 ring-1 ring-white/10">
        
        {/* Subtle Ambient Radial Glow Orbs */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#ff7849]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/10 z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center pb-5 border-b border-white/15 relative z-10">
          <div className="relative w-20 h-20 sm:w-22 sm:h-22 mx-auto mb-3 drop-shadow-[0_8px_22px_rgba(255,120,73,0.45)] hover:scale-105 transition-transform duration-300">
            <img
              src="/campusconnect_logo.png"
              alt="CampusConnect Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-2xl font-black font-heading text-white tracking-wide">
            {isForgotPass ? 'Password Recovery' : isRegister ? 'Student Registration' : 'Welcome to CampusConnect'}
          </h3>
          <p className="text-xs text-orange-200/90 mt-1 font-medium">
            Smart College Placement Management System
          </p>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold backdrop-blur-md relative z-10">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mt-4 p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-md relative z-10">
            {successMsg}
          </div>
        )}

        {/* FORGOT PASSWORD FORM */}
        {isForgotPass ? (
          <form onSubmit={handleForgotSubmit} className="mt-5 space-y-4 text-xs relative z-10">
            {resetStep === 1 ? (
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Registered Institutional Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. yourname@university.edu"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-xs"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  We'll send a 6-digit recovery code to reset your password.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">6-Digit Verification Code</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter 6-digit code"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">New Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Min 6 characters"
                    value={newResetPassword}
                    onChange={(e) => setNewResetPassword(e.target.value)}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl btn-orange-glow font-bold text-xs shadow-md mt-2 cursor-pointer"
            >
              {loading ? 'Processing...' : resetStep === 1 ? 'Send Recovery Code' : 'Reset Password'}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => { setIsForgotPass(false); setResetStep(1); setError(''); setSuccessMsg(''); }}
                className="text-slate-300 hover:text-white text-xs font-semibold underline cursor-pointer"
              >
                &larr; Back to Sign In
              </button>
            </div>
          </form>
        ) : (
          /* FORM (Sign In or Register) */
          <form onSubmit={handleLoginSubmit} className="mt-5 space-y-4 text-xs relative z-10">
            
            {isRegister && (
              <>
                <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center text-sm">🎓</span>
                    <div>
                      <div className="text-xs font-bold text-white">Student Scholar Account</div>
                      <div className="text-[10px] text-orange-200/80">Placement portal student account registration</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                    Active
                  </span>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jane Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Branch</label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full glass-input px-3 py-2 rounded-xl text-xs"
                    >
                      <option value="CSE">CSE</option>
                      <option value="IT">IT</option>
                      <option value="ECE">ECE</option>
                      <option value="EEE">EEE</option>
                      <option value="ME">ME</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">CGPA</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="8.5"
                      value={cgpa}
                      onChange={(e) => setCgpa(e.target.value)}
                      className="w-full glass-input px-3 py-2 rounded-xl text-xs"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Institutional Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="e.g. yourname@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-xs"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-slate-300 font-semibold">Password</label>
                {!isRegister && (
                  <button
                    type="button"
                    onClick={() => { setIsForgotPass(true); setError(''); setSuccessMsg(''); setForgotEmail(email); }}
                    className="text-[#ff7849] hover:text-orange-300 font-semibold text-[11px] cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl btn-orange-glow font-bold text-xs shadow-md mt-2 cursor-pointer"
            >
              {loading ? 'Processing...' : (isRegister ? 'Register Student Scholar' : 'Sign In to Portal')}
            </button>

          </form>
        )}

        {/* Bottom Switch Links */}
        {!isForgotPass && (
          <div className="mt-5 text-center text-xs text-slate-300 pt-3 border-t border-white/10 relative z-10">
            {isRegister ? (
              <p>
                Already have an institutional account?{' '}
                <button
                  type="button"
                  onClick={() => { setIsRegister(false); setError(''); }}
                  className="text-[#ff7849] hover:text-orange-300 font-bold underline cursor-pointer ml-1"
                >
                  Sign In
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setIsRegister(true); setError(''); }}
                  className="text-[#ff7849] hover:text-orange-300 font-bold underline cursor-pointer ml-1"
                >
                  Create New Account
                </button>
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
