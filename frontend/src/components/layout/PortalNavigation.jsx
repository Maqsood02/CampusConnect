import React, { useState, useRef, useEffect } from 'react';
import {
  LayoutGrid,
  Briefcase,
  ChevronDown,
  Sparkles,
  Layers,
  FileText,
  Globe,
  Bot,
  Brain,
  Code2,
  Calendar,
  User,
  Shield,
  ShieldAlert,
  CheckCircle2,
  FileCheck2,
  Compass,
  Zap,
  Award,
  BarChart3
} from 'lucide-react';

export default function PortalNavigation({ activeTab, onSelectTab, currentUser }) {
  const [placementsOpen, setPlacementsOpen] = useState(false);
  const [aiToolsOpen, setAiToolsOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);

  const navRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setPlacementsOpen(false);
        setAiToolsOpen(false);
        setPracticeOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (tab) => {
    onSelectTab(tab);
    setPlacementsOpen(false);
    setAiToolsOpen(false);
    setPracticeOpen(false);
  };

  const isPlacementsActive = ['placement-records', 'reports'].includes(activeTab);
  const isAiToolsActive = ['roadmap', 'resume-builder', 'job-search', 'ai-tutor'].includes(activeTab);
  const isPracticeActive = ['aptitude', 'coding-practice'].includes(activeTab);

  return (
    <nav ref={navRef} className="relative z-30 mb-8 w-full max-w-full">
      <div className="p-1.5 sm:p-2 rounded-[24px] glass-inner-card border border-white/10 shadow-lg flex flex-wrap items-center gap-1 sm:gap-1.5 text-xs overflow-visible w-full max-w-full">
        
        {/* Dashboard */}
        <button
          onClick={() => handleItemClick('dashboard')}
          className={`shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-semibold transition-all cursor-pointer ${
            activeTab === 'dashboard'
              ? 'bg-gradient-to-r from-[#ff7849] to-[#f97316] text-white shadow-md shadow-[#ff7849]/30'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Dashboard</span>
        </button>

        {/* Job Board */}
        <button
          onClick={() => handleItemClick('drives')}
          className={`shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-semibold transition-all cursor-pointer ${
            activeTab === 'drives'
              ? 'bg-gradient-to-r from-[#ff7849] to-[#f97316] text-white shadow-md shadow-[#ff7849]/30'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Job Board</span>
        </button>

        {/* PLACEMENTS DROPDOWN (Placement Records & Reports) */}
        <div className="relative shrink-0">
          <button
            id="nav-dropdown-placements"
            onClick={() => {
              setPlacementsOpen(!placementsOpen);
              setAiToolsOpen(false);
              setPracticeOpen(false);
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-semibold transition-all cursor-pointer ${
              isPlacementsActive
                ? 'bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-200 border border-amber-400/50 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Placements</span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${placementsOpen ? 'rotate-180' : ''}`} />
          </button>

          {placementsOpen && (
            <div className="absolute left-0 mt-2 w-72 rounded-[24px] glass-dropdown-menu p-2 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1.5 shadow-2xl">
              
              <button
                id="nav-item-placement-records"
                onClick={() => handleItemClick('placement-records')}
                className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left cursor-pointer ${
                  activeTab === 'placement-records' ? 'glass-dropdown-item glass-dropdown-item-active' : 'glass-dropdown-item'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl glass-icon-badge flex items-center justify-center shrink-0 text-lg">
                    🏆
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-white">Placement Records</div>
                    <div className="text-[10px] text-slate-300">Placed scholars &amp; offer letters</div>
                  </div>
                </div>
                {activeTab === 'placement-records' && (
                  <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_#ff7849] mr-1 shrink-0"></span>
                )}
              </button>

              <button
                id="nav-item-reports"
                onClick={() => handleItemClick('reports')}
                className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left cursor-pointer ${
                  activeTab === 'reports' ? 'glass-dropdown-item glass-dropdown-item-active' : 'glass-dropdown-item'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl glass-icon-badge flex items-center justify-center shrink-0 text-lg">
                    📊
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-white">Reports &amp; Analytics</div>
                    <div className="text-[10px] text-slate-300">Placement stats &amp; hiring funnel</div>
                  </div>
                </div>
                {activeTab === 'reports' && (
                  <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_#ff7849] mr-1 shrink-0"></span>
                )}
              </button>

            </div>
          )}
        </div>

        {/* AI TOOLS DROPDOWN (Matching Screenshot 2) */}
        <div className="relative shrink-0">
          <button
            onClick={() => {
              setAiToolsOpen(!aiToolsOpen);
              setPlacementsOpen(false);
              setPracticeOpen(false);
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-semibold transition-all cursor-pointer ${
              isAiToolsActive
                ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-200 border border-cyan-400/50 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Tools</span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${aiToolsOpen ? 'rotate-180' : ''}`} />
          </button>

          {aiToolsOpen && (
            <div className="absolute left-0 mt-2 w-72 rounded-[24px] glass-dropdown-menu p-2 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1.5 shadow-2xl">
              
              <button
                onClick={() => handleItemClick('roadmap')}
                className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left cursor-pointer ${
                  activeTab === 'roadmap' ? 'glass-dropdown-item glass-dropdown-item-active' : 'glass-dropdown-item'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl glass-icon-badge flex items-center justify-center shrink-0 text-lg">
                    🗺️
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-white">Personalized Roadmap</div>
                    <div className="text-[10px] text-slate-300">Target semester-wise goals</div>
                  </div>
                </div>
                {activeTab === 'roadmap' && (
                  <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_#ff7849] mr-1 shrink-0"></span>
                )}
              </button>

              <button
                onClick={() => handleItemClick('resume-builder')}
                className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left cursor-pointer ${
                  activeTab === 'resume-builder' ? 'glass-dropdown-item glass-dropdown-item-active' : 'glass-dropdown-item'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl glass-icon-badge flex items-center justify-center shrink-0 text-lg">
                    📄
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-white">Resume Builder</div>
                    <div className="text-[10px] text-slate-300">ATS optimized live preview</div>
                  </div>
                </div>
                {activeTab === 'resume-builder' && (
                  <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_#ff7849] mr-1 shrink-0"></span>
                )}
              </button>

              <button
                onClick={() => handleItemClick('job-search')}
                className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left cursor-pointer ${
                  activeTab === 'job-search' ? 'glass-dropdown-item glass-dropdown-item-active' : 'glass-dropdown-item'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl glass-icon-badge flex items-center justify-center shrink-0 text-lg">
                    🌐
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-white">Live Market Job Search</div>
                    <div className="text-[10px] text-slate-300">CTC filters &amp; 1-click apply</div>
                  </div>
                </div>
                {activeTab === 'job-search' && (
                  <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_#ff7849] mr-1 shrink-0"></span>
                )}
              </button>

              <button
                onClick={() => handleItemClick('ai-tutor')}
                className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left cursor-pointer ${
                  activeTab === 'ai-tutor' ? 'glass-dropdown-item glass-dropdown-item-active' : 'glass-dropdown-item'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl glass-icon-badge flex items-center justify-center shrink-0 text-lg">
                    🎓
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-white">AI Tutor</div>
                    <div className="text-[10px] text-slate-300">DSA &amp; HR mock coaching</div>
                  </div>
                </div>
                {activeTab === 'ai-tutor' && (
                  <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_#ff7849] mr-1 shrink-0"></span>
                )}
              </button>

            </div>
          )}
        </div>

        {/* PRACTICE DROPDOWN (Matching Screenshot 3) */}
        <div className="relative shrink-0">
          <button
            onClick={() => {
              setPracticeOpen(!practiceOpen);
              setAiToolsOpen(false);
              setPlacementsOpen(false);
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-semibold transition-all cursor-pointer ${
              isPracticeActive
                ? 'bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-200 border border-amber-400/50 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Practice</span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${practiceOpen ? 'rotate-180' : ''}`} />
          </button>

          {practiceOpen && (
            <div className="absolute left-0 mt-2 w-72 rounded-[24px] glass-dropdown-menu p-2 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1.5 shadow-2xl">
              
              <button
                onClick={() => handleItemClick('aptitude')}
                className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left cursor-pointer ${
                  activeTab === 'aptitude' ? 'glass-dropdown-item glass-dropdown-item-active' : 'glass-dropdown-item'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl glass-icon-badge flex items-center justify-center shrink-0 text-lg">
                    🧩
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-white">Aptitude Library</div>
                    <div className="text-[10px] text-slate-300">Timed company tests &amp; solutions</div>
                  </div>
                </div>
                {activeTab === 'aptitude' && (
                  <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_#ff7849] mr-1 shrink-0"></span>
                )}
              </button>

              <button
                onClick={() => handleItemClick('coding-practice')}
                className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left cursor-pointer ${
                  activeTab === 'coding-practice' ? 'glass-dropdown-item glass-dropdown-item-active' : 'glass-dropdown-item'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl glass-icon-badge flex items-center justify-center shrink-0 text-lg">
                    💻
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-white">Coding Practice</div>
                    <div className="text-[10px] text-slate-300">Auto-generated by topic &amp; priority</div>
                  </div>
                </div>
                {activeTab === 'coding-practice' && (
                  <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_#ff7849] mr-1 shrink-0"></span>
                )}
              </button>

            </div>
          )}
        </div>

        {/* Student-Only Hubs */}
        {currentUser?.role === 'Student' && (
          <>
            <button
              onClick={() => handleItemClick('applications')}
              className={`shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                activeTab === 'applications'
                  ? 'bg-gradient-to-r from-[#ff7849] to-[#f97316] text-white shadow-md shadow-[#ff7849]/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
              title="My Application Progress"
            >
              <FileCheck2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Applications</span>
            </button>

            <button
              onClick={() => handleItemClick('portfolio')}
              className={`shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                activeTab === 'portfolio'
                  ? 'bg-gradient-to-r from-[#ff7849] to-[#f97316] text-white shadow-md shadow-[#ff7849]/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
              title="My Career Portfolio"
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Portfolio</span>
            </button>
          </>
        )}

        {/* Interviews Hub (Tailored for both Student and Officer/Admin) */}
        <button
          onClick={() => handleItemClick('interviews')}
          className={`shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-semibold transition-all cursor-pointer ${
            activeTab === 'interviews'
              ? 'bg-gradient-to-r from-[#ff7849] to-[#f97316] text-white shadow-md shadow-[#ff7849]/30'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
          title={currentUser?.role === 'Student' ? 'My Scheduled Interviews' : 'Candidate Assessment & Evaluation Panels'}
        >
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>{currentUser?.role === 'Student' ? 'My Interviews' : 'Interviews Hub'}</span>
        </button>

        {/* Officer Hub */}
        {(currentUser?.role === 'Placement Officer' || currentUser?.role === 'Administrator') && (
          <button
            onClick={() => handleItemClick('officer')}
            className={`shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-semibold transition-all cursor-pointer ${
              activeTab === 'officer'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/30'
                : 'text-amber-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Officer Desk</span>
          </button>
        )}

        {/* Admin Console */}
        {currentUser?.role === 'Administrator' && (
          <button
            onClick={() => handleItemClick('admin')}
            className={`shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-semibold transition-all cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-500/30'
                : 'text-purple-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Admin Console</span>
          </button>
        )}

      </div>
    </nav>
  );
}
