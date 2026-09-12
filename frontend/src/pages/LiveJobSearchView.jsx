import React, { useState } from 'react';
import {
  Globe,
  Briefcase,
  Search,
  Filter,
  DollarSign,
  MapPin,
  ExternalLink,
  Sparkles,
  Building,
  CheckCircle2,
  Clock,
  Send
} from 'lucide-react';

const LIVE_JOB_LISTINGS = [
  {
    id: 'job_1',
    company: 'Google',
    logoLetter: 'G',
    color: 'from-blue-600 to-red-500',
    role: 'Software Development Engineer I (Early Career 2026)',
    location: 'Bengaluru / Hyderabad',
    ctc: '₹ 28 - 34 LPA',
    type: 'Full-Time',
    posted: '2 hours ago',
    skills: ['Java', 'C++', 'Distributed Systems', 'Python'],
    description: 'Build Google Cloud core infrastructure and high-throughput data processing engines with latency targets under 5ms.'
  },
  {
    id: 'job_2',
    company: 'Microsoft',
    logoLetter: 'M',
    color: 'from-emerald-500 to-teal-600',
    role: 'Graduate Software Engineer - Azure Cloud Core',
    location: 'Hyderabad / Noida',
    ctc: '₹ 24 - 30 LPA',
    type: 'Full-Time',
    posted: '5 hours ago',
    skills: ['C#', 'Go', 'Azure', 'Kubernetes'],
    description: 'Work on hyper-scale Azure cloud control planes, virtual network telemetry, and resilience architectures.'
  },
  {
    id: 'job_3',
    company: 'Amazon',
    logoLetter: 'A',
    color: 'from-amber-500 to-orange-600',
    role: 'SDE 1 - Consumer Payments & Checkout',
    location: 'Bengaluru, India',
    ctc: '₹ 26 - 32 LPA',
    type: 'Full-Time',
    posted: '1 day ago',
    skills: ['Java', 'AWS DynamoDB', 'Microservices', 'Spring'],
    description: 'Scale payment workflows processing millions of transactions per second during Prime Day peaks.'
  },
  {
    id: 'job_4',
    company: 'Uber',
    logoLetter: 'U',
    color: 'from-slate-700 to-black',
    role: 'Backend Systems Engineer - Rider Dispatch',
    location: 'Bengaluru, India',
    ctc: '₹ 32 - 38 LPA',
    type: 'Full-Time',
    posted: '1 day ago',
    skills: ['Go', 'Kafka', 'PostgreSQL', 'Redis'],
    description: 'Develop low-latency geospatial matching algorithms matching millions of riders with nearby drivers.'
  },
  {
    id: 'job_5',
    company: 'TCS Digital',
    logoLetter: 'T',
    color: 'from-indigo-600 to-purple-600',
    role: 'System Architect Trainee (Digital Cadre)',
    location: 'Pan India (Mumbai / Pune / Chennai)',
    ctc: '₹ 9.0 - 11.5 LPA',
    type: 'Full-Time',
    posted: '2 days ago',
    skills: ['Java', 'Spring Boot', 'React', 'Cloud'],
    description: 'Lead enterprise digital transformations for international banking and airline customers.'
  },
  {
    id: 'job_6',
    company: 'Infosys Specialist Programmer',
    logoLetter: 'I',
    color: 'from-blue-500 to-indigo-700',
    role: 'Specialist Programmer (Power Programmer)',
    location: 'Bengaluru / Mysuru / Pune',
    ctc: '₹ 9.5 - 12.0 LPA',
    type: 'Full-Time',
    posted: '3 days ago',
    skills: ['Python', 'DSA', 'Docker', 'REST APIs'],
    description: 'High-performing algorithmic coding role developing specialized automation tools and internal platforms.'
  }
];

export default function LiveJobSearchView({ currentUser }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [appliedJobs, setAppliedJobs] = useState({});

  const handleApply = (jobId) => {
    setAppliedJobs(prev => ({ ...prev, [jobId]: true }));
  };

  const filteredJobs = LIVE_JOB_LISTINGS.filter(j => {
    const matchSearch = j.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        j.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        j.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchTag = selectedTag === 'All' || j.skills.includes(selectedTag);
    return matchSearch && matchTag;
  });

  const allTags = ['All', 'Java', 'Python', 'Go', 'React', 'AWS', 'Kubernetes'];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 rounded-[28px] glass-inner-card border border-white/15 bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent backdrop-blur-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-xl shadow-lg">
              🌐
            </div>
            <div>
              <h1 className="text-2xl font-black font-heading text-white tracking-wide flex items-center gap-2">
                Live Market Job Search
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold uppercase">
                  Real-Time Verified
                </span>
              </h1>
              <p className="text-xs text-slate-300 mt-0.5">
                Explore external recruitment openings and early-career campus opportunities updated continuously.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs text-emerald-300 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Aggregator Active • 142 Postings Today</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-5 rounded-[24px] glass-inner-card border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by company, role (e.g. Google, SDE, Backend) or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs"
          />
        </div>

        {/* Skill Filter Tags */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-orange-500/25 border-orange-500/60 text-white shadow-md'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.map(job => {
          const hasApplied = appliedJobs[job.id];

          return (
            <div
              key={job.id}
              className="p-6 rounded-[28px] glass-inner-card border border-white/10 space-y-4 flex flex-col justify-between hover:border-white/20 transition-all hover:scale-[1.01]"
            >
              <div className="space-y-3">
                
                {/* Company Logo & Top Bar */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${job.color} flex items-center justify-center text-white font-black text-lg shadow-md shrink-0`}>
                      {job.logoLetter}
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-white leading-tight font-heading">
                        {job.company}
                      </h2>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {job.location}
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {job.posted}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-emerald-400 font-mono px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/25 shrink-0">
                    {job.ctc}
                  </span>
                </div>

                {/* Role Title */}
                <h3 className="text-base font-bold text-white font-heading">
                  {job.role}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {job.description}
                </p>

                {/* Skill Badges */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {job.skills.map(s => (
                    <span key={s} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-cyan-200 border border-white/15">
                      {s}
                    </span>
                  ))}
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Institutional Partner Verified
                </span>

                <button
                  onClick={() => handleApply(job.id)}
                  disabled={hasApplied}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                    hasApplied
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                      : 'btn-orange-glow text-white'
                  }`}
                >
                  {hasApplied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Applied via CPMS</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>1-Click Fast Apply</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
