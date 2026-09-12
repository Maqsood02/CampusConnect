import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Sparkles,
  CheckCircle2,
  Plus,
  Trash2,
  User,
  GraduationCap,
  Briefcase,
  Code,
  Award
} from 'lucide-react';

export default function ResumeBuilderView({ currentUser }) {
  const [resumeData, setResumeData] = useState({
    fullName: currentUser?.fullName || 'Alex Mercer',
    email: currentUser?.email || 'alex.mercer@cpms.edu',
    phone: '+91 98765 43210',
    location: 'Bengaluru, India',
    github: 'github.com/alexmercer',
    linkedin: 'linkedin.com/in/alex-mercer',
    summary: 'Proactive Computer Science student with expertise in Java, React, and scalable distributed architectures. Proven track record in building full-stack cloud applications and competitive algorithmic problem solving.',
    education: [
      {
        institution: 'CampusConnect Institute of Technology',
        degree: `B.Tech in ${currentUser?.department || currentUser?.branch || 'Computer Science and Engineering'}`,
        score: `CGPA: ${currentUser?.cgpa || 8.5}/10.0`,
        year: `2022 - ${currentUser?.graduationYear || 2026}`
      },
      {
        institution: 'Apex Senior Secondary School',
        degree: 'Class XII (CBSE) - PCM & Computer Science',
        score: 'Aggregate: 94.2%',
        year: '2022'
      }
    ],
    skills: {
      languages: 'Java, Python, C++, JavaScript, TypeScript, SQL',
      frameworks: 'React.js, Spring Boot, Node.js, Express, TailwindCSS',
      tools: 'Docker, Git, AWS (S3, EC2), MongoDB, PostgreSQL, Postman'
    },
    projects: [
      {
        title: 'Smart Campus Placement Management System (CPMS)',
        tech: 'React, Spring Boot, MongoDB Atlas, JWT, TailwindCSS',
        points: [
          'Engineered real-time placement portal handling 1,000+ simultaneous student applications and verified institutional criteria.',
          'Built automated eligibility evaluation engine calculating branch, CGPA, and backlog constraints instantly.',
          'Implemented end-to-end recruiter interviewing desk with scheduling and instant feedback loops.'
        ]
      },
      {
        title: 'Distributed In-Memory Key-Value Store with Raft Consensus',
        tech: 'Go, gRPC, Protocol Buffers, Raft',
        points: [
          'Implemented distributed state machine replication ensuring high availability during network partitions.',
          'Achieved 12,000 requests/second throughput with sub-5ms write latencies.'
        ]
      }
    ],
    certifications: [
      'AWS Certified Cloud Practitioner (2025)',
      'LeetCode 300+ Problems Solved (Top 12% in Biweekly Contests)',
      'HackerRank 5-Star Problem Solving Badge'
    ]
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 rounded-[28px] glass-inner-card border border-white/15 bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent backdrop-blur-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-xl shadow-lg">
              📄
            </div>
            <div>
              <h1 className="text-2xl font-black font-heading text-white tracking-wide flex items-center gap-2">
                ATS-Optimized Resume Builder
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold uppercase">
                  98% ATS Pass Rate
                </span>
              </h1>
              <p className="text-xs text-slate-300 mt-0.5">
                Generate high-conversion institutional resumes with live dual-pane editor and instant PDF export.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-2xl btn-orange-glow text-xs font-bold flex items-center gap-2 self-start md:self-center cursor-pointer shadow-lg hover:scale-105 transition-transform"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Export PDF</span>
        </button>
      </div>

      {/* Editor and Preview Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 Cols): Form Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-[28px] glass-inner-card border border-white/10 space-y-4 text-xs">
            <h2 className="text-sm font-bold font-heading text-white flex items-center gap-2 pb-2 border-b border-white/10">
              <User className="w-4 h-4 text-[#ff7849]" /> Personal & Contact Details
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 text-[10px] font-semibold block mb-1">Full Name</label>
                <input
                  type="text"
                  value={resumeData.fullName}
                  onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                  className="w-full glass-input px-3 py-2 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="text-slate-400 text-[10px] font-semibold block mb-1">Email</label>
                <input
                  type="email"
                  value={resumeData.email}
                  onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                  className="w-full glass-input px-3 py-2 rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 text-[10px] font-semibold block mb-1">Phone</label>
                <input
                  type="text"
                  value={resumeData.phone}
                  onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                  className="w-full glass-input px-3 py-2 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="text-slate-400 text-[10px] font-semibold block mb-1">Location</label>
                <input
                  type="text"
                  value={resumeData.location}
                  onChange={(e) => setResumeData({ ...resumeData, location: e.target.value })}
                  className="w-full glass-input px-3 py-2 rounded-xl text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 text-[10px] font-semibold block mb-1">Professional Summary</label>
              <textarea
                rows={3}
                value={resumeData.summary}
                onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                className="w-full glass-input p-3 rounded-xl text-xs leading-relaxed"
              />
            </div>

            <h2 className="text-sm font-bold font-heading text-white flex items-center gap-2 pt-3 pb-2 border-t border-b border-white/10">
              <Code className="w-4 h-4 text-cyan-400" /> Technical Skills
            </h2>

            <div className="space-y-2">
              <div>
                <label className="text-slate-400 text-[10px] font-semibold block mb-1">Languages</label>
                <input
                  type="text"
                  value={resumeData.skills.languages}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    skills: { ...resumeData.skills, languages: e.target.value }
                  })}
                  className="w-full glass-input px-3 py-2 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="text-slate-400 text-[10px] font-semibold block mb-1">Frameworks & Libraries</label>
                <input
                  type="text"
                  value={resumeData.skills.frameworks}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    skills: { ...resumeData.skills, frameworks: e.target.value }
                  })}
                  className="w-full glass-input px-3 py-2 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="text-slate-400 text-[10px] font-semibold block mb-1">Tools & Platforms</label>
                <input
                  type="text"
                  value={resumeData.skills.tools}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    skills: { ...resumeData.skills, tools: e.target.value }
                  })}
                  className="w-full glass-input px-3 py-2 rounded-xl text-xs"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Right Column (7 Cols): Real-time ATS Sheet Preview */}
        <div className="lg:col-span-7">
          <div className="bg-white text-slate-900 rounded-[28px] p-8 shadow-2xl space-y-5 print:p-0 print:shadow-none font-sans text-xs">
            
            {/* Resume Header */}
            <div className="text-center pb-4 border-b border-slate-200 space-y-1">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
                {resumeData.fullName}
              </h1>
              <div className="text-[11px] text-slate-600 flex flex-wrap items-center justify-center gap-2">
                <span>{resumeData.email}</span>
                <span>•</span>
                <span>{resumeData.phone}</span>
                <span>•</span>
                <span>{resumeData.location}</span>
                <span>•</span>
                <span className="font-semibold text-indigo-600">{resumeData.github}</span>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-1">
              <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-0.5">
                Executive Summary
              </h2>
              <p className="text-[11px] text-slate-700 leading-relaxed pt-1">
                {resumeData.summary}
              </p>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-0.5">
                Education
              </h2>
              {resumeData.education.map((edu, i) => (
                <div key={i} className="flex justify-between items-start text-[11px]">
                  <div>
                    <div className="font-bold text-slate-900">{edu.institution}</div>
                    <div className="text-slate-700">{edu.degree} &bull; <span className="font-semibold text-slate-900">{edu.score}</span></div>
                  </div>
                  <div className="text-slate-500 font-mono text-[10px]">{edu.year}</div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="space-y-1.5">
              <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-0.5">
                Technical Proficiencies
              </h2>
              <div className="text-[11px] text-slate-800 space-y-1 pt-1">
                <div><span className="font-bold">Languages:</span> {resumeData.skills.languages}</div>
                <div><span className="font-bold">Frameworks:</span> {resumeData.skills.frameworks}</div>
                <div><span className="font-bold">Developer Tools:</span> {resumeData.skills.tools}</div>
              </div>
            </div>

            {/* Projects */}
            <div className="space-y-3">
              <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-0.5">
                Selected Key Projects
              </h2>
              {resumeData.projects.map((proj, pIdx) => (
                <div key={pIdx} className="space-y-1 text-[11px]">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{proj.title}</span>
                    <span className="text-[10px] text-slate-500 font-mono italic">{proj.tech}</span>
                  </div>
                  <ul className="list-disc list-inside text-[10.5px] text-slate-700 space-y-0.5 pl-1 leading-relaxed">
                    {proj.points.map((pt, ptIdx) => (
                      <li key={ptIdx}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Certifications & Achievements */}
            <div className="space-y-1.5">
              <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-0.5">
                Certifications & Badges
              </h2>
              <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-0.5 pl-1">
                {resumeData.certifications.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
