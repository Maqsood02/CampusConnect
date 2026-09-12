import React, { useState, useEffect } from 'react';
import { LogOut, ShieldCheck } from 'lucide-react';
import LeftPillDock from './components/layout/LeftPillDock';
import Footer from './components/layout/Footer';
import DashboardView from './pages/DashboardView';
import JobBoardView from './pages/JobBoardView';
import ApplicationsView from './pages/ApplicationsView';
import InterviewsView from './pages/InterviewsView';
import PortfolioView from './pages/PortfolioView';
import OfficerDeskView from './pages/OfficerDeskView';
import AdminDeskView from './pages/AdminDeskView';
import PlacementRecordsView from './pages/PlacementRecordsView';
import ReportsDashboardView from './pages/ReportsDashboardView';

import PortalNavigation from './components/layout/PortalNavigation';
import RoadmapView from './pages/RoadmapView';
import ResumeBuilderView from './pages/ResumeBuilderView';
import LiveJobSearchView from './pages/LiveJobSearchView';
import AiTutorView from './pages/AiTutorView';
import AptitudeView from './pages/AptitudeView';
import CodingPracticeView from './pages/CodingPracticeView';

import PostDriveModal from './components/modals/PostDriveModal';
import ScheduleInterviewModal from './components/modals/ScheduleInterviewModal';
import ApplyModal from './components/modals/ApplyModal';
import AuthModal from './components/modals/AuthModal';
import FullProfileModal from './components/modals/FullProfileModal';
import AuthView from './pages/AuthView';

import { api, subscribeToStore, checkBackendHealth } from './services/api';

import AccessDeniedView from './components/common/AccessDeniedView';

const ROLE_PERMISSIONS = {
  'Student': [
    'dashboard', 'drives', 'applications', 'interviews', 'portfolio', 'placement-records',
    'reports', 'roadmap', 'resume-builder', 'job-search', 'ai-tutor', 'aptitude', 'coding-practice'
  ],
  'Placement Officer': [
    'dashboard', 'drives', 'officer', 'interviews', 'placement-records',
    'reports', 'roadmap', 'resume-builder', 'job-search', 'ai-tutor', 'aptitude', 'coding-practice'
  ],
  'Administrator': [
    'dashboard', 'drives', 'officer', 'admin', 'interviews', 'placement-records',
    'reports', 'roadmap', 'resume-builder', 'job-search', 'ai-tutor', 'aptitude', 'coding-practice'
  ]
};

const TAB_REQUIRED_ROLES = {
  'officer': ['Placement Officer', 'Administrator'],
  'admin': ['Administrator'],
  'portfolio': ['Student'],
  'applications': ['Student']
};

export default function App() {
  const [store, setStore] = useState({
    currentUser: api.getCurrentUser(),
    drives: api.getDrives(),
    applications: api.getApplications(),
    interviews: api.getInterviews(),
    students: api.getStudents(),
    notifications: api.getNotifications(),
    isLiveBackend: false
  });

  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    const validTabs = [
      'dashboard', 'drives', 'placement-records', 'reports', 'applications', 'interviews', 'portfolio', 'officer', 'admin',
      'roadmap', 'resume-builder', 'job-search', 'ai-tutor', 'aptitude', 'coding-practice'
    ];
    return validTabs.includes(hash) ? hash : 'dashboard';
  });

  // Modal States
  const [isPostDriveOpen, setIsPostDriveOpen] = useState(false);
  const [isScheduleInterviewOpen, setIsScheduleInterviewOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isFullProfileOpen, setIsFullProfileOpen] = useState(false);
  const [selectedDriveForApply, setSelectedDriveForApply] = useState(null);

  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs = [
        'dashboard', 'drives', 'placement-records', 'reports', 'applications', 'interviews', 'portfolio', 'officer', 'admin',
        'roadmap', 'resume-builder', 'job-search', 'ai-tutor', 'aptitude', 'coding-practice'
      ];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHash);

    const unsubscribe = subscribeToStore((newState) => {
      setStore({
        currentUser: newState.currentUser,
        drives: newState.drives,
        applications: newState.applications,
        interviews: newState.interviews,
        students: newState.students,
        notifications: newState.notifications,
        isLiveBackend: newState.isLiveBackend
      });
    });

    checkBackendHealth();
    return () => {
      window.removeEventListener('hashchange', handleHash);
      unsubscribe();
    };
  }, []);

  const handleSelectDriveForApply = (drive) => {
    setSelectedDriveForApply(drive);
    setIsApplyOpen(true);
  };

  const analytics = api.getAnalyticsSummary();

  // If user is logged out, show dedicated Login & Register page
  if (!store.currentUser) {
    return (
      <AuthView
        onAuthenticated={(user) => {
          setStore((prev) => ({ ...prev, currentUser: user }));
        }}
      />
    );
  }

  // RBAC Permission Check
  const currentRole = store.currentUser?.role || 'Student';
  const allowedTabs = ROLE_PERMISSIONS[currentRole] || ROLE_PERMISSIONS['Student'];
  const isTabAuthorized = allowedTabs.includes(activeTab);

  return (
    <div className="min-h-screen glass-backdrop-scene text-slate-100 flex flex-col font-sans relative selection:bg-[#ff7849] selection:text-white pb-12">
      
      {/* Main Center Floating Layout matching Reference */}
      <div className="max-w-[1440px] w-full mx-auto px-3 sm:px-6 lg:px-10 py-6 sm:py-10 flex items-start gap-5">
        
        {/* Left Floating Pill Dock (Sidebar from screenshot) */}
        <LeftPillDock
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          currentUser={store.currentUser}
          onLogout={() => api.logout()}
        />

        {/* Large Floating Frosted Glass Tablet/Canvas */}
        <main className="flex-1 glass-canvas rounded-[32px] sm:rounded-[40px] p-5 sm:p-8 lg:p-10 shadow-2xl relative z-10 min-w-0">
          
          {/* Top Brand Title Bar with Prominent CampusConnect Logo & Persona Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 drop-shadow-[0_8px_24px_rgba(255,120,73,0.45)] hover:scale-105 transition-all duration-300">
                <img
                  src="/campusconnect_logo.png"
                  alt="CampusConnect Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl font-black font-heading text-white tracking-wide leading-none">
                    CampusConnect
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/40 font-bold uppercase tracking-wider">
                    Smart
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  Smart College Placement Management System
                </p>
                <p className="text-[11px] font-bold text-orange-400/90 tracking-wider uppercase">
                  Connect Today &bull; Build Tomorrow
                </p>
              </div>
            </div>

            {/* Authenticated Identity & Locked Role Clearance Badge */}
            <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-center">
              <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff7849] to-[#f97316] text-white flex items-center justify-center font-bold text-xs shadow-md">
                    {store.currentUser?.fullName ? store.currentUser.fullName.charAt(0) : 'U'}
                  </div>
                  <div className="text-left hidden sm:block">
                    <span className="text-xs font-bold text-white block leading-tight">
                      {store.currentUser?.fullName || 'Authenticated User'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      {store.currentUser?.email}
                    </span>
                  </div>
                </div>

                <span className={`text-[11px] px-2.5 py-1 rounded-xl font-bold flex items-center gap-1.5 border shadow-sm ${
                  store.currentUser?.role === 'Administrator'
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                    : store.currentUser?.role === 'Placement Officer'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{store.currentUser?.role}</span>
                </span>
              </div>

              <button
                onClick={() => api.logout()}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/10 hover:border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                title="Sign Out of Session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>

          {/* Portal Frosted Glass Navigation Bar with AI Tools & Practice Dropdowns */}
          <PortalNavigation
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            currentUser={store.currentUser}
          />
          
          {/* Strict Role Guard Check: If user does not have clearance for activeTab, show AccessDeniedView */}
          {!isTabAuthorized ? (
            <AccessDeniedView
              tabName={activeTab}
              requiredRoles={TAB_REQUIRED_ROLES[activeTab] || ['Placement Officer', 'Administrator']}
              currentRole={currentRole}
              onReturn={() => handleSelectTab('dashboard')}
            />
          ) : (
            <>
          {activeTab === 'dashboard' && (
            <DashboardView
              currentUser={store.currentUser}
              drives={store.drives}
              applications={store.applications}
              interviews={store.interviews}
              analytics={analytics}
              onNavigate={handleSelectTab}
              onOpenPostDrive={() => setIsPostDriveOpen(true)}
              onOpenScheduleInterview={() => setIsScheduleInterviewOpen(true)}
              onOpenFullProfile={() => setIsFullProfileOpen(true)}
              onSelectDriveForApply={handleSelectDriveForApply}
            />
          )}

          {activeTab === 'drives' && (
            <JobBoardView
              drives={store.drives}
              currentUser={store.currentUser}
              onSelectDriveForApply={handleSelectDriveForApply}
              onOpenPostDrive={() => setIsPostDriveOpen(true)}
            />
          )}

          {activeTab === 'placement-records' && (
            <PlacementRecordsView
              currentUser={store.currentUser}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsDashboardView
              currentUser={store.currentUser}
            />
          )}

          {activeTab === 'applications' && (
            <ApplicationsView
              applications={store.applications}
              currentUser={store.currentUser}
            />
          )}

          {activeTab === 'interviews' && (
            <InterviewsView
              interviews={store.interviews}
              currentUser={store.currentUser}
              onOpenScheduleInterview={() => setIsScheduleInterviewOpen(true)}
            />
          )}

          {activeTab === 'portfolio' && (
            <PortfolioView
              student={store.currentUser}
              onUpdateStudent={(updated) => {}}
            />
          )}

          {activeTab === 'officer' && (
            <OfficerDeskView
              drives={store.drives}
              applications={store.applications}
              interviews={store.interviews}
              students={store.students}
              onOpenPostDrive={() => setIsPostDriveOpen(true)}
              onOpenScheduleInterview={() => setIsScheduleInterviewOpen(true)}
              onUpdateAppStatus={(id, status, feedback) => api.updateApplicationStatus(id, status, feedback)}
              onVerifyStudent={(id, status) => api.verifyStudent(id, status)}
            />
          )}

          {activeTab === 'admin' && (
            <AdminDeskView
              students={store.students}
              officer={api.getCurrentUser()?.role === 'Placement Officer' ? store.currentUser : { fullName: 'Prof. Sarah Jenkins', email: 'officer@cpms.edu' }}
              admin={api.getCurrentUser()?.role === 'Administrator' ? store.currentUser : { fullName: 'Dr. Arthur Vance', email: 'admin@cpms.edu' }}
            />
          )}

          {/* AI Tools Views */}
          {activeTab === 'roadmap' && (
            <RoadmapView currentUser={store.currentUser} />
          )}

          {activeTab === 'resume-builder' && (
            <ResumeBuilderView currentUser={store.currentUser} />
          )}

          {activeTab === 'job-search' && (
            <LiveJobSearchView currentUser={store.currentUser} />
          )}

          {activeTab === 'ai-tutor' && (
            <AiTutorView currentUser={store.currentUser} />
          )}

          {/* Practice Views */}
          {activeTab === 'aptitude' && (
            <AptitudeView currentUser={store.currentUser} />
          )}

          {activeTab === 'coding-practice' && (
            <CodingPracticeView currentUser={store.currentUser} />
          )}

            </>
          )}

        </main>

      </div>

      {/* Institutional Glassmorphic Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        currentUser={store.currentUser}
      />

      {/* Modals */}
      <PostDriveModal
        isOpen={isPostDriveOpen}
        onClose={() => setIsPostDriveOpen(false)}
        onDriveCreated={(drive) => {}}
        companies={store.companies}
      />

      <ScheduleInterviewModal
        isOpen={isScheduleInterviewOpen}
        onClose={() => setIsScheduleInterviewOpen(false)}
        onInterviewScheduled={(iv) => {}}
        applications={store.applications}
      />

      <ApplyModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        drive={selectedDriveForApply}
        student={store.currentUser}
        onApplied={(app) => {}}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthenticated={(user) => {}}
      />

      <FullProfileModal
        isOpen={isFullProfileOpen}
        onClose={() => setIsFullProfileOpen(false)}
        currentUser={store.currentUser}
        onUpdateProfile={(data) => api.updateCurrentUser(data)}
      />

    </div>
  );
}
