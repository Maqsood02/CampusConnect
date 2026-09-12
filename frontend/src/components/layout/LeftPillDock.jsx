import React from 'react';
import {
  LayoutGrid,
  Briefcase,
  FileText,
  Calendar,
  User,
  Shield,
  LogOut,
  Sparkles,
  Code2,
  Brain,
  Compass,
  Bot,
  Award,
  BarChart3
} from 'lucide-react';

export default function LeftPillDock({
  activeTab,
  onSelectTab,
  currentUser,
  onLogout
}) {
  return (
    <aside className="hidden lg:flex flex-col items-center py-5 px-2 rounded-[36px] glass-dock w-16 h-auto sticky top-20 self-start shadow-2xl z-30 transition-all border border-white/15">
      
      {/* Top Navigation Group */}
      <div className="flex flex-col items-center gap-2">
        
        {/* Dashboard (Active matches reference orange squircle) */}
        <button
          id="dock-tab-dashboard"
          onClick={() => onSelectTab('dashboard')}
          className={`w-10 h-10 rounded-[14px] flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'dashboard'
              ? 'bg-gradient-to-br from-[#ff7849] to-[#f97316] text-white shadow-[0_0_20px_rgba(255,120,73,0.55)] scale-105'
              : 'text-slate-400 hover:text-white hover:bg-white/10 rounded-[14px]'
          }`}
          title="Dashboard"
        >
          <LayoutGrid className="w-4.5 h-4.5" />
        </button>

        {/* Job Board */}
        <button
          id="dock-tab-drives"
          onClick={() => onSelectTab('drives')}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'drives'
              ? 'bg-[#ff7849] text-white shadow-lg shadow-[#ff7849]/40 scale-105'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          title="Job Board"
        >
          <Briefcase className="w-4.5 h-4.5" />
        </button>

        {/* Placement Records */}
        <button
          id="dock-tab-placement-records"
          onClick={() => onSelectTab('placement-records')}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'placement-records'
              ? 'bg-[#ff7849] text-white shadow-lg shadow-[#ff7849]/40 scale-105'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          title="Placement Records & Offer Letters"
        >
          <Award className="w-4.5 h-4.5" />
        </button>

        {/* Reports & Dashboards */}
        <button
          id="dock-tab-reports"
          onClick={() => onSelectTab('reports')}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'reports'
              ? 'bg-[#ff7849] text-white shadow-lg shadow-[#ff7849]/40 scale-105'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          title="Placement Reports & Analytics"
        >
          <BarChart3 className="w-4.5 h-4.5" />
        </button>

        {/* Applications (Student-Only) */}
        {currentUser?.role === 'Student' && (
          <button
            id="dock-tab-applications"
            onClick={() => onSelectTab('applications')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              activeTab === 'applications'
                ? 'bg-[#ff7849] text-white shadow-lg shadow-[#ff7849]/40 scale-105'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
            title="My Applications"
          >
            <FileText className="w-4.5 h-4.5" />
          </button>
        )}

        {/* Interviews Hub */}
        <button
          id="dock-tab-interviews"
          onClick={() => onSelectTab('interviews')}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'interviews'
              ? 'bg-[#ff7849] text-white shadow-lg shadow-[#ff7849]/40 scale-105'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          title="Interviews Hub"
        >
          <Calendar className="w-4.5 h-4.5" />
        </button>

        {/* Coding Practice */}
        <button
          id="dock-tab-coding"
          onClick={() => onSelectTab('coding-practice')}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'coding-practice'
              ? 'bg-[#ff7849] text-white shadow-lg shadow-[#ff7849]/40 scale-105'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          title="Coding Practice Arena"
        >
          <Code2 className="w-4.5 h-4.5" />
        </button>

        {/* Aptitude Library */}
        <button
          id="dock-tab-aptitude"
          onClick={() => onSelectTab('aptitude')}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'aptitude'
              ? 'bg-[#ff7849] text-white shadow-lg shadow-[#ff7849]/40 scale-105'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          title="Aptitude Library"
        >
          <Brain className="w-4.5 h-4.5" />
        </button>

        {/* Roadmap */}
        <button
          id="dock-tab-roadmap"
          onClick={() => onSelectTab('roadmap')}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'roadmap'
              ? 'bg-[#ff7849] text-white shadow-lg shadow-[#ff7849]/40 scale-105'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          title="Personalized Roadmap"
        >
          <Compass className="w-4.5 h-4.5" />
        </button>

        {/* AI Tutor */}
        <button
          id="dock-tab-ai-tutor"
          onClick={() => onSelectTab('ai-tutor')}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            activeTab === 'ai-tutor'
              ? 'bg-[#ff7849] text-white shadow-lg shadow-[#ff7849]/40 scale-105'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          title="AI Placement Tutor"
        >
          <Bot className="w-4.5 h-4.5" />
        </button>

        {/* Portfolio (for student) or Officer Desk (for officer) */}
        {currentUser?.role === 'Student' ? (
          <button
            id="dock-tab-portfolio"
            onClick={() => onSelectTab('portfolio')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              activeTab === 'portfolio'
                ? 'bg-[#ff7849] text-white shadow-lg shadow-[#ff7849]/40 scale-105'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
            title="My Portfolio"
          >
            <User className="w-4.5 h-4.5" />
          </button>
        ) : (
          <button
            id="dock-tab-officer"
            onClick={() => onSelectTab('officer')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              activeTab === 'officer'
                ? 'bg-[#ff7849] text-white shadow-lg shadow-[#ff7849]/40 scale-105'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
            title="Officer Desk"
          >
            <Shield className="w-4.5 h-4.5" />
          </button>
        )}

        {currentUser?.role === 'Administrator' && (
          <button
            id="dock-tab-admin"
            onClick={() => onSelectTab('admin')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-[#ff7849] text-white shadow-lg shadow-[#ff7849]/40 scale-105'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
            title="Admin Console"
          >
            <Shield className="w-4.5 h-4.5 text-purple-400" />
          </button>
        )}

      </div>

      {/* Subtle Divider */}
      <div className="w-7 h-[1px] bg-white/10 my-2 shrink-0" />

      {/* Bottom Sign Out (Well inside bottom margin) */}
      <button
        id="dock-tab-logout"
        onClick={onLogout}
        className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-all cursor-pointer shrink-0"
        title="Sign Out"
      >
        <LogOut className="w-4.5 h-4.5" />
      </button>

    </aside>
  );
}
