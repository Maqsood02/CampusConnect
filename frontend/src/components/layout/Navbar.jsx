import React, { useState } from 'react';
import {
  GraduationCap,
  LayoutDashboard,
  Briefcase,
  FileCheck2,
  CalendarDays,
  UserCircle2,
  ShieldCheck,
  ShieldAlert,
  Bell,
  LogOut,
  LogIn,
  Menu,
  X,
  Check
} from 'lucide-react';

export default function Navbar({
  activeTab,
  onSelectTab,
  currentUser,
  notifications = [],
  onMarkNotificationsRead,
  onOpenAuthModal,
  onLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleTabClick = (tab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-9 z-40 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/90 px-4 lg:px-8 py-3 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3.5 cursor-pointer group" onClick={() => handleTabClick('dashboard')}>
          <div className="relative w-15 h-15 sm:w-17 sm:h-17 shrink-0 drop-shadow-[0_4px_16px_rgba(255,120,73,0.35)] group-hover:scale-105 group-hover:drop-shadow-[0_6px_20px_rgba(255,120,73,0.5)] transition-all duration-300">
            <img
              src="/campusconnect_logo.png"
              alt="CampusConnect Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black font-heading tracking-wide text-slate-900 flex items-center gap-1.5 leading-none">
              CampusConnect
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200 font-bold uppercase tracking-wider">
                Smart
              </span>
            </span>
            <span className="text-[11px] font-semibold text-slate-600 tracking-tight mt-0.5">
              Smart College Placement Management System
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
          
          {/* Universal: Dashboard */}
          <button
            onClick={() => handleTabClick('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          {/* Universal: Job Board */}
          <button
            onClick={() => handleTabClick('drives')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'drives'
                ? 'bg-sky-50 text-sky-700 border border-sky-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Job Board</span>
          </button>

          {/* Student Tabs */}
          {currentUser && currentUser.role === 'Student' && (
            <>
              <button
                onClick={() => handleTabClick('applications')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'applications'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <FileCheck2 className="w-4 h-4" />
                <span>My Applications</span>
              </button>

              <button
                onClick={() => handleTabClick('interviews')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'interviews'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <CalendarDays className="w-4 h-4" />
                <span>Interviews Hub</span>
              </button>

              <button
                onClick={() => handleTabClick('portfolio')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'portfolio'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <UserCircle2 className="w-4 h-4" />
                <span>My Portfolio</span>
              </button>
            </>
          )}

          {/* Placement Officer Tabs */}
          {currentUser && (currentUser.role === 'Placement Officer' || currentUser.role === 'Administrator') && (
            <>
              <button
                onClick={() => handleTabClick('officer')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'officer'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Officer Desk</span>
              </button>

              <button
                onClick={() => handleTabClick('interviews')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'interviews'
                    ? 'bg-sky-50 text-sky-700 border border-sky-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <CalendarDays className="w-4 h-4" />
                <span>Interviews Desk</span>
              </button>
            </>
          )}

          {/* Administrator Tabs */}
          {currentUser && currentUser.role === 'Administrator' && (
            <button
              onClick={() => handleTabClick('admin')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'admin'
                  ? 'bg-purple-50 text-purple-700 border border-purple-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-purple-600" />
              <span>Admin Console</span>
            </button>
          )}

        </nav>

        {/* Right Corner: Notifications & Profile */}
        <div className="flex items-center gap-3">
          
          {/* Notification Bell Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 shadow-xs transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200 p-4 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-indigo-600" />
                    <span className="font-heading font-bold text-sm text-slate-900">Notifications</span>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => onMarkNotificationsRead()}
                      className="text-[11px] text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" /> Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 py-1">
                  {notifications.length === 0 ? (
                    <p className="text-center py-6 text-xs text-slate-400">No new notifications</p>
                  ) : (
                    notifications.map(notif => (
                      <div key={notif.id} className={`py-3 px-2 transition-colors rounded-lg ${!notif.isRead ? 'bg-indigo-50/50' : ''}`}>
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-semibold text-slate-900">{notif.title}</p>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">{notif.time || 'recent'}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill or Sign In Button */}
          {currentUser ? (
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <div className="w-9 h-9 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-xs">
                <img
                  src={currentUser.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.fullName || currentUser.email)}&background=4f46e5&color=fff`}
                  alt={currentUser.fullName}
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </div>

              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight">
                  {currentUser.fullName}
                </span>
                <span className={`text-[10px] font-bold leading-tight ${
                  currentUser.role === 'Placement Officer'
                    ? 'text-amber-600'
                    : currentUser.role === 'Administrator'
                    ? 'text-purple-600'
                    : 'text-indigo-600'
                }`}>
                  {currentUser.role}
                </span>
              </div>

              <button
                onClick={onLogout}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl btn-glass-primary text-xs font-semibold"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-slate-200 bg-white text-slate-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-2 border-t border-slate-200 mt-3 space-y-1">
          <button
            onClick={() => handleTabClick('dashboard')}
            className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold ${
              activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </button>

          <button
            onClick={() => handleTabClick('drives')}
            className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold ${
              activeTab === 'drives' ? 'bg-sky-50 text-sky-700' : 'text-slate-700'
            }`}
          >
            <Briefcase className="w-4 h-4" /> Job Board
          </button>

          {currentUser?.role === 'Student' && (
            <>
              <button
                onClick={() => handleTabClick('applications')}
                className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700"
              >
                <FileCheck2 className="w-4 h-4" /> My Applications
              </button>
              <button
                onClick={() => handleTabClick('interviews')}
                className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700"
              >
                <CalendarDays className="w-4 h-4" /> Interviews Hub
              </button>
              <button
                onClick={() => handleTabClick('portfolio')}
                className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700"
              >
                <UserCircle2 className="w-4 h-4" /> My Portfolio
              </button>
            </>
          )}

          {(currentUser?.role === 'Placement Officer' || currentUser?.role === 'Administrator') && (
            <button
              onClick={() => handleTabClick('officer')}
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-amber-700 bg-amber-50"
            >
              <ShieldCheck className="w-4 h-4" /> Officer Desk
            </button>
          )}

          {currentUser?.role === 'Administrator' && (
            <button
              onClick={() => handleTabClick('admin')}
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-purple-700 bg-purple-50"
            >
              <ShieldAlert className="w-4 h-4" /> Admin Console
            </button>
          )}
        </div>
      )}
    </header>
  );
}
