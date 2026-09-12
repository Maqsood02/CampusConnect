import React, { useState } from 'react';
import {
  MapPin,
  CheckCircle2,
  Circle,
  Sparkles,
  Award,
  BookOpen,
  ArrowRight,
  Target,
  Compass,
  Zap,
  TrendingUp
} from 'lucide-react';

const TRACKS = [
  {
    id: 'sde',
    title: 'Full Stack & Core Software Engineer',
    icon: '💻',
    targetPackage: '18 - 32 LPA',
    semesters: [
      {
        sem: 'Semester 5',
        focus: 'DSA Foundations & System Architecture',
        milestones: [
          { text: 'Master Arrays, Two Pointers, and Binary Search patterns (100+ LeetCode problems)', done: true },
          { text: 'Implement REST APIs with Spring Boot / Express and relational schemas', done: true },
          { text: 'Understand Database Normalization, Indexing, and ACID transactions', done: false }
        ]
      },
      {
        sem: 'Semester 6',
        focus: 'Advanced Algorithmic Design & Full-Stack Deployments',
        milestones: [
          { text: 'Solve Tree, Graph (BFS/DFS), and Dynamic Programming standard questions', done: true },
          { text: 'Build a production full-stack SaaS with Authentication & CI/CD Pipelines', done: false },
          { text: 'Prepare for Institutional Aptitude Assessments (TCS NQT / Infosys)', done: false }
        ]
      },
      {
        sem: 'Semester 7',
        focus: 'System Design, Mock Interviews & Campus Drives',
        milestones: [
          { text: 'Study Low-Level Object-Oriented Design (Design Patterns, SOLID Principles)', done: false },
          { text: 'Participate in 5+ Peer Mock Technical & HR Interviews on AI Tutor', done: false },
          { text: 'Target Super Dream & Dream Campus Placement Recruitment Drives', done: false }
        ]
      },
      {
        sem: 'Semester 8',
        focus: 'Corporate Onboarding & Capstone Excellence',
        milestones: [
          { text: 'Complete Industrial Internship and Project Capstone', done: false },
          { text: 'Secure final Letter of Intent (LOI) and Onboarding documentation', done: false }
        ]
      }
    ]
  },
  {
    id: 'ai_data',
    title: 'Data Science & AI / ML Specialist',
    icon: '🤖',
    targetPackage: '20 - 36 LPA',
    semesters: [
      {
        sem: 'Semester 5',
        focus: 'Applied Statistics & Python Data Stack',
        milestones: [
          { text: 'Master NumPy, Pandas, Scikit-learn, and Exploratory Data Analysis', done: true },
          { text: 'Linear Algebra, Probability Theory, and Optimization algorithms', done: true },
          { text: 'Relational & NoSQL query optimization for large datasets', done: false }
        ]
      },
      {
        sem: 'Semester 6',
        focus: 'Deep Learning & Neural Network Architectures',
        milestones: [
          { text: 'Build CNNs, Transformers, and LLM fine-tuning pipelines using PyTorch', done: false },
          { text: 'Deploy models using FastAPI and Docker containerization', done: false },
          { text: 'Complete 2 Kaggle Competitions with top 15% rank', done: false }
        ]
      },
      {
        sem: 'Semester 7',
        focus: 'MLOps, Production Inference & AI Drives',
        milestones: [
          { text: 'Model monitoring, drift detection, and vector database embeddings', done: false },
          { text: 'Mock interview rounds on ML System Design (e.g. Recommendation Systems)', done: false }
        ]
      }
    ]
  },
  {
    id: 'cloud_devops',
    title: 'Cloud Architect & DevOps Engineer',
    icon: '☁️',
    targetPackage: '16 - 28 LPA',
    semesters: [
      {
        sem: 'Semester 5',
        focus: 'Linux Systems & Computer Networking',
        milestones: [
          { text: 'Deep dive into TCP/IP, DNS, HTTP/3, and Linux shell scripting', done: true },
          { text: 'Git workflows, container basics with Docker', done: true }
        ]
      },
      {
        sem: 'Semester 6',
        focus: 'Kubernetes & Infrastructure as Code (IaC)',
        milestones: [
          { text: 'Deploy multi-node microservices on Kubernetes (K8s)', done: false },
          { text: 'Automate infrastructure provisioning using Terraform & AWS CDK', done: false }
        ]
      },
      {
        sem: 'Semester 7',
        focus: 'Cloud Security, Site Reliability & Campus Selection',
        milestones: [
          { text: 'Setup Prometheus & Grafana telemetry dashboards', done: false },
          { text: 'Achieve AWS Certified Solutions Architect Associate credential', done: false }
        ]
      }
    ]
  }
];

export default function RoadmapView({ currentUser }) {
  const [activeTrack, setActiveTrack] = useState('sde');
  const [checkedItems, setCheckedItems] = useState({
    'sde-0-0': true,
    'sde-0-1': true,
    'sde-1-0': true,
    'ai_data-0-0': true,
    'ai_data-0-1': true,
    'cloud_devops-0-0': true,
    'cloud_devops-0-1': true
  });

  const currentTrack = TRACKS.find(t => t.id === activeTrack) || TRACKS[0];

  const handleToggle = (key) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Calculate readiness percentage for active track
  let totalTasks = 0;
  let completedTasks = 0;
  currentTrack.semesters.forEach((sem, sIdx) => {
    sem.milestones.forEach((_, mIdx) => {
      totalTasks++;
      if (checkedItems[`${activeTrack}-${sIdx}-${mIdx}`]) {
        completedTasks++;
      }
    });
  });

  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 rounded-[28px] glass-inner-card border border-white/15 bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent backdrop-blur-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-xl shadow-lg">
              🗺️
            </div>
            <div>
              <h1 className="text-2xl font-black font-heading text-white tracking-wide flex items-center gap-2">
                Personalized Placement Roadmap
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/40 font-bold uppercase">
                  Semester Track
                </span>
              </h1>
              <p className="text-xs text-slate-300 mt-0.5">
                Curated semester-by-semester career checkpoints aligned with top recruitment standards.
              </p>
            </div>
          </div>
        </div>

        {/* Readiness Meter */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
          <div className="text-right">
            <div className="text-[10px] text-slate-300 uppercase tracking-wider font-bold">Track Readiness</div>
            <div className="text-lg font-black font-heading text-[#ff7849]">{percentage}% Complete</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-black/40 border-2 border-[#ff7849] flex items-center justify-center font-bold text-xs text-white">
            {completedTasks}/{totalTasks}
          </div>
        </div>
      </div>

      {/* Track Tabs */}
      <div className="flex flex-wrap gap-2.5">
        {TRACKS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTrack(t.id)}
            className={`px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTrack === t.id
                ? 'bg-orange-500/25 border-orange-500/60 text-white shadow-lg scale-105'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="text-base">{t.icon}</span>
            <span>{t.title}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-orange-200">
              {t.targetPackage}
            </span>
          </button>
        ))}
      </div>

      {/* Semester Timeline Grid */}
      <div className="space-y-4">
        {currentTrack.semesters.map((sem, sIdx) => (
          <div key={sIdx} className="p-6 rounded-[28px] glass-inner-card border border-white/10 space-y-4 hover:border-white/20 transition-all">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-xl bg-orange-500/20 text-[#ff7849] font-bold text-xs border border-orange-500/30">
                  {sem.sem}
                </span>
                <h3 className="text-base font-bold text-white font-heading">
                  {sem.focus}
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                Stage {sIdx + 1} of {currentTrack.semesters.length}
              </span>
            </div>

            <div className="space-y-2.5">
              {sem.milestones.map((m, mIdx) => {
                const key = `${activeTrack}-${sIdx}-${mIdx}`;
                const isChecked = checkedItems[key];

                return (
                  <div
                    key={mIdx}
                    onClick={() => handleToggle(key)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-100'
                        : 'bg-white/[0.03] border-white/5 text-slate-300 hover:bg-white/5 hover:border-white/15'
                    }`}
                  >
                    <button className="mt-0.5 shrink-0 text-emerald-400">
                      {isChecked ? (
                        <CheckCircle2 className="w-5 h-5 fill-emerald-500/20" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-500" />
                      )}
                    </button>
                    <div className="text-xs leading-relaxed">
                      <span className={isChecked ? 'line-through opacity-80' : 'font-medium'}>
                        {m.text}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
