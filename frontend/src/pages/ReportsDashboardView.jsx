import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  Users,
  Building2,
  PieChart,
  Download,
  Printer,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Search,
  Filter,
  Briefcase,
  ChevronRight,
  Compass,
  DollarSign
} from 'lucide-react';
import { api, subscribeToStore } from '../services/api';

export default function ReportsDashboardView({ currentUser }) {
  const [activeTab, setActiveTab] = useState('placement-stats');
  const [analyticsData, setAnalyticsData] = useState(api.getComprehensiveAnalytics());
  const [companySearch, setCompanySearch] = useState('');
  const [companyTierFilter, setCompanyTierFilter] = useState('ALL');
  const [exportSuccess, setExportSuccess] = useState(false);

  useEffect(() => {
    const unsub = subscribeToStore(() => {
      setAnalyticsData(api.getComprehensiveAnalytics());
    });
    return () => unsub();
  }, []);

  const { placementStats, branchPerformance, companyRecruitmentDetails, funnel, applicationDistribution } = analyticsData;

  const filteredCompanies = companyRecruitmentDetails.filter(co => {
    const matchSearch = co.companyName.toLowerCase().includes(companySearch.toLowerCase()) ||
                        co.topBranchRecruited.toLowerCase().includes(companySearch.toLowerCase());
    const matchTier = companyTierFilter === 'ALL' || co.tier === companyTierFilter;
    return matchSearch && matchTier;
  });

  // Export CSV Report
  const handleExportCSV = () => {
    const headers = ['Metric/Branch/Company', 'Category', 'Total/Offers', 'Avg Package (LPA)', 'Highest Package (LPA)', 'Placement Rate'];
    const rows = [
      ['Institutional Summary', 'Overall', placementStats.totalOffers, `${placementStats.averagePackageLpa} LPA`, `${placementStats.highestPackageLpa} LPA`, `${placementStats.placementPercentage}%`],
      ...branchPerformance.map(b => [b.branch, 'Branch Performance', b.placedStudents, `${b.averagePackageLpa} LPA`, `${b.highestPackageLpa} LPA`, `${b.placementRate}%`]),
      ...companyRecruitmentDetails.map(c => [c.companyName, `Tier: ${c.tier}`, c.totalOffers, `${c.averagePackageLpa} LPA`, `${c.highestPackageLpa} LPA`, 'N/A'])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CPMS_Institutional_Placement_Report_${new Date().getFullYear()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header with 100% Glassmorphism Branding */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-[30px] glass-inner-card border border-white/15 bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent backdrop-blur-2xl shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-xl shadow-lg shadow-orange-500/20">
              📊
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight flex items-center gap-2">
              Reports &amp; Placement Analytics
              <Sparkles className="w-5 h-5 text-[#ff7849]" />
            </h2>
          </div>
          <p className="text-xs text-slate-300/90 pl-1">
            Real-time institutional placement statistics, branch performance, corporate recruitment audits, and student application conversion funnels.
          </p>
        </div>

        {/* Export and Print Buttons */}
        <div className="flex items-center gap-2.5 self-start md:self-center shrink-0">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold text-xs shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
            title="Download CSV Audit Report"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>{exportSuccess ? 'Report Exported!' : 'Export CSV'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-200 border border-white/15 font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            title="Print Official Institutional Report"
          >
            <Printer className="w-4 h-4 text-slate-300" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Pill Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-[22px] glass-inner-card border border-white/10 overflow-x-auto text-xs shadow-md">
        
        <button
          onClick={() => setActiveTab('placement-stats')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'placement-stats'
              ? 'bg-gradient-to-r from-[#ff7849] to-[#f97316] text-white shadow-md shadow-[#ff7849]/30 scale-105'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Placement Statistics</span>
        </button>

        <button
          onClick={() => setActiveTab('branch-performance')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'branch-performance'
              ? 'bg-gradient-to-r from-[#ff7849] to-[#f97316] text-white shadow-md shadow-[#ff7849]/30 scale-105'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Branch-Wise Performance</span>
        </button>

        <button
          onClick={() => setActiveTab('company-details')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'company-details'
              ? 'bg-gradient-to-r from-[#ff7849] to-[#f97316] text-white shadow-md shadow-[#ff7849]/30 scale-105'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Company Recruitment Details</span>
        </button>

        <button
          onClick={() => setActiveTab('funnel-analysis')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'funnel-analysis'
              ? 'bg-gradient-to-r from-[#ff7849] to-[#f97316] text-white shadow-md shadow-[#ff7849]/30 scale-105'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Student Application Funnel</span>
        </button>

      </div>

      {/* ==============================================================================
          SUB-TAB 1: PLACEMENT STATISTICS OVERVIEW
          ============================================================================== */}
      {activeTab === 'placement-stats' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Top 4 KPI Glass Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="glass-inner-card p-5 rounded-[26px] border border-white/10 hover:border-orange-500/40 transition-all shadow-xl space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold">Overall Placement %</span>
                <span className="p-2 rounded-xl bg-orange-500/20 text-[#ff7849]">
                  <Award className="w-4 h-4" />
                </span>
              </div>
              <div className="text-3xl font-black text-white font-heading">
                {placementStats.placementPercentage}%
              </div>
              <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +4.2% higher than Batch 2025
              </p>
            </div>

            <div className="glass-inner-card p-5 rounded-[26px] border border-white/10 hover:border-cyan-500/40 transition-all shadow-xl space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold">Highest Package</span>
                <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                  <Sparkles className="w-4 h-4" />
                </span>
              </div>
              <div className="text-3xl font-black text-white font-heading">
                ₹ {placementStats.highestPackageLpa} LPA
              </div>
              <p className="text-[11px] text-cyan-300 font-medium">
                Recruiter: Microsoft SDE-1
              </p>
            </div>

            <div className="glass-inner-card p-5 rounded-[26px] border border-white/10 hover:border-emerald-500/40 transition-all shadow-xl space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold">Average Package</span>
                <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <TrendingUp className="w-4 h-4" />
                </span>
              </div>
              <div className="text-3xl font-black text-white font-heading">
                ₹ {placementStats.averagePackageLpa} LPA
              </div>
              <p className="text-[11px] text-slate-300 font-medium">
                Median CTC: ₹ {placementStats.medianPackageLpa} LPA
              </p>
            </div>

            <div className="glass-inner-card p-5 rounded-[26px] border border-white/10 hover:border-purple-500/40 transition-all shadow-xl space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold">Offers vs Registered</span>
                <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                  <Users className="w-4 h-4" />
                </span>
              </div>
              <div className="text-3xl font-black text-white font-heading">
                {placementStats.totalOffers} <span className="text-sm font-normal text-slate-400">/ {placementStats.totalRegisteredStudents}</span>
              </div>
              <p className="text-[11px] text-purple-300 font-medium">
                {placementStats.multiOfferStudents} Multi-Offer Scholars
              </p>
            </div>

          </div>

          {/* CTC Tier Distribution Breakdown (Glassmorphic Visual Bars) */}
          <div className="glass-inner-card p-6 rounded-[28px] border border-white/10 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-[#ff7849]" /> CTC Tier Segmentation
                </h3>
                <p className="text-xs text-slate-300">
                  Breakdown of corporate hiring packages across Super Dream, Dream, and Core categories.
                </p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-cyan-300 border border-white/15 font-semibold self-start sm:self-auto">
                Total Offers: {placementStats.totalOffers}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
              
              {/* Super Dream Tier */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-500/15 via-transparent to-transparent border border-orange-500/30 backdrop-blur-md space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-orange-400 uppercase tracking-wider text-[11px]">
                    Super Dream (≥ 20 LPA)
                  </span>
                  <span className="text-lg font-black text-white font-heading">
                    {placementStats.superDreamOffers}
                  </span>
                </div>
                <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#ff7849] to-[#f97316] h-full rounded-full shadow-[0_0_12px_#ff7849]"
                    style={{ width: `${(placementStats.superDreamOffers / placementStats.totalOffers) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-300">
                  Leading Recruiters: Google Cloud, Microsoft, Goldman Sachs
                </p>
              </div>

              {/* Dream Tier */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-500/15 via-transparent to-transparent border border-cyan-500/30 backdrop-blur-md space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-400 uppercase tracking-wider text-[11px]">
                    Dream (10 – 20 LPA)
                  </span>
                  <span className="text-lg font-black text-white font-heading">
                    {placementStats.dreamOffers}
                  </span>
                </div>
                <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full shadow-[0_0_12px_#06b6d4]"
                    style={{ width: `${(placementStats.dreamOffers / placementStats.totalOffers) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-300">
                  Leading Recruiters: Amazon, Cisco, Oracle, Qualcomm
                </p>
              </div>

              {/* Core Tier */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-transparent to-transparent border border-emerald-500/30 backdrop-blur-md space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
                    Core (&lt; 10 LPA)
                  </span>
                  <span className="text-lg font-black text-white font-heading">
                    {placementStats.coreOffers}
                  </span>
                </div>
                <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full shadow-[0_0_12px_#10b981]"
                    style={{ width: `${(placementStats.coreOffers / placementStats.totalOffers) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-300">
                  Leading Recruiters: TechCorp Labs, TCS, Cognizant, Infosys
                </p>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ==============================================================================
          SUB-TAB 2: BRANCH-WISE PLACEMENT PERFORMANCE
          ============================================================================== */}
      {activeTab === 'branch-performance' && (
        <div className="space-y-6 animate-in fade-in">
          
          <div className="p-5 rounded-[26px] glass-inner-card border border-white/10 shadow-xl flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#ff7849]" /> Department Placement Metrics
              </h3>
              <p className="text-xs text-slate-300/90 mt-0.5">
                Head-to-head comparison of student enrollment, placement conversion, and compensation across departments.
              </p>
            </div>
            <span className="text-xs text-amber-300 font-semibold bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
              5 Active Engineering Branches
            </span>
          </div>

          {/* Branch Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {branchPerformance.map((dept, index) => (
              <div
                key={dept.shortCode || index}
                className="glass-inner-card p-6 rounded-[28px] border border-white/10 hover:border-white/20 transition-all shadow-xl space-y-4 relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-300 bg-white/10 px-2.5 py-0.5 rounded-md border border-white/10">
                      {dept.shortCode || 'DEPT'}
                    </span>
                    <h4 className="text-base font-bold text-white font-heading mt-2">
                      {dept.branch}
                    </h4>
                  </div>
                  <span className="text-lg font-black text-emerald-400 font-heading">
                    {dept.placementRate}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-400 to-teal-400 h-full rounded-full"
                    style={{ width: `${dept.placementRate}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-slate-400 text-[10px] block">Placed / Total</span>
                    <strong className="text-white font-heading">{dept.placedStudents} / {dept.totalStudents}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-slate-400 text-[10px] block">Avg CTC</span>
                    <strong className="text-emerald-300 font-heading">₹ {dept.averagePackageLpa} LPA</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span>Highest CTC: <strong className="text-cyan-300">₹ {dept.highestPackageLpa} LPA</strong></span>
                  <span className="text-[11px] text-amber-300">Top: {dept.topRecruiter}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Comparative Table */}
          <div className="glass-inner-card rounded-[28px] border border-white/10 overflow-hidden shadow-xl p-5 space-y-3">
            <h4 className="text-sm font-bold text-white font-heading">Department Performance Audit Table</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 border-b border-white/10 text-slate-400 font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Branch / Department</th>
                    <th className="py-3 px-4">Students Enrolled</th>
                    <th className="py-3 px-4">Placed Scholars</th>
                    <th className="py-3 px-4">Placement Rate</th>
                    <th className="py-3 px-4">Average Package</th>
                    <th className="py-3 px-4">Highest Package</th>
                    <th className="py-3 px-4">Prime Corporate Partner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {branchPerformance.map((b, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-bold text-white">{b.branch}</td>
                      <td className="py-3 px-4">{b.totalStudents}</td>
                      <td className="py-3 px-4 text-emerald-300 font-semibold">{b.placedStudents}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                          {b.placementRate}%
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold font-heading text-emerald-400">₹ {b.averagePackageLpa} LPA</td>
                      <td className="py-3 px-4 font-bold font-heading text-cyan-300">₹ {b.highestPackageLpa} LPA</td>
                      <td className="py-3 px-4 text-amber-300 font-medium">{b.topRecruiter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ==============================================================================
          SUB-TAB 3: COMPANY RECRUITMENT DETAILS
          ============================================================================== */}
      {activeTab === 'company-details' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Filter Bar */}
          <div className="p-4 rounded-[26px] glass-inner-card border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs shadow-xl">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search recruiter name or branch..."
                value={companySearch}
                onChange={(e) => setCompanySearch(e.target.value)}
                className="w-full glass-input pl-10 pr-3.5 py-2.5 rounded-xl text-xs placeholder:text-slate-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-slate-400 text-xs">Filter Tier:</span>
              <select
                value={companyTierFilter}
                onChange={(e) => setCompanyTierFilter(e.target.value)}
                className="glass-input px-3 py-2 rounded-xl text-xs bg-slate-900"
              >
                <option value="ALL">All Tiers</option>
                <option value="Super Dream">Super Dream (≥ 20 LPA)</option>
                <option value="Dream">Dream (10 - 20 LPA)</option>
                <option value="Core">Core (&lt; 10 LPA)</option>
              </select>
            </div>
          </div>

          {/* Companies Directory Table */}
          <div className="glass-inner-card rounded-[28px] border border-white/10 overflow-hidden shadow-xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h4 className="text-sm font-bold text-white font-heading">
                Recruiter Details &amp; Historical Hiring Volume ({filteredCompanies.length} Partners)
              </h4>
              <span className="text-xs text-slate-400">Institutional Talent Acquisition Partners</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 border-b border-white/10 text-slate-400 font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Company Name</th>
                    <th className="py-3 px-4">Recruitment Tier</th>
                    <th className="py-3 px-4">Drives Hosted</th>
                    <th className="py-3 px-4">Offers Made</th>
                    <th className="py-3 px-4">Avg CTC Package</th>
                    <th className="py-3 px-4">Highest CTC</th>
                    <th className="py-3 px-4">Primary Discipline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {filteredCompanies.map((co, index) => (
                    <tr key={index} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white text-sm flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center font-bold text-xs">
                          {co.companyName.charAt(0)}
                        </div>
                        {co.companyName}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          co.tier === 'Super Dream'
                            ? 'bg-orange-500/20 text-orange-300 border-orange-500/30'
                            : co.tier === 'Dream'
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        }`}>
                          {co.tier}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">{co.drivesConducted} Drives</td>
                      <td className="py-3.5 px-4 font-bold text-emerald-400">{co.totalOffers} Offers</td>
                      <td className="py-3.5 px-4 font-mono font-semibold">₹ {co.averagePackageLpa} LPA</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-300">₹ {co.highestPackageLpa} LPA</td>
                      <td className="py-3.5 px-4 text-slate-300">{co.topBranchRecruited}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ==============================================================================
          SUB-TAB 4: STUDENT APPLICATION FUNNEL & CONVERSION
          ============================================================================== */}
      {activeTab === 'funnel-analysis' && (
        <div className="space-y-6 animate-in fade-in">
          
          <div className="p-5 rounded-[26px] glass-inner-card border border-white/10 shadow-xl space-y-1">
            <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#ff7849]" /> Application-to-Offer Conversion Funnel
            </h3>
            <p className="text-xs text-slate-300">
              Granular pipeline tracking showing applicant volume attrition at each recruitment milestone.
            </p>
          </div>

          {/* Visual Funnel Stepper */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
            
            {/* Step 1: Applied */}
            <div className="p-4 rounded-2xl glass-inner-card border border-white/10 space-y-2 relative overflow-hidden">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Stage 1</span>
              <h4 className="text-sm font-bold text-white font-heading">Total Applied</h4>
              <div className="text-2xl font-black text-white font-heading">{funnel.appliedCount}</div>
              <p className="text-[11px] text-slate-400">Total drive applications recorded</p>
            </div>

            {/* Step 2: Shortlisted */}
            <div className="p-4 rounded-2xl glass-inner-card border border-cyan-500/30 bg-cyan-500/5 space-y-2 relative overflow-hidden">
              <span className="text-[10px] font-bold text-cyan-400 uppercase">Stage 2 ({funnel.shortlistConversion}%)</span>
              <h4 className="text-sm font-bold text-white font-heading">Shortlisted</h4>
              <div className="text-2xl font-black text-cyan-300 font-heading">{funnel.shortlistedCount}</div>
              <p className="text-[11px] text-slate-300">Cleared criteria &amp; OA test</p>
            </div>

            {/* Step 3: Interviewed */}
            <div className="p-4 rounded-2xl glass-inner-card border border-blue-500/30 bg-blue-500/5 space-y-2 relative overflow-hidden">
              <span className="text-[10px] font-bold text-blue-400 uppercase">Stage 3 ({funnel.interviewConversion}%)</span>
              <h4 className="text-sm font-bold text-white font-heading">Interviewed</h4>
              <div className="text-2xl font-black text-blue-300 font-heading">{funnel.interviewedCount}</div>
              <p className="text-[11px] text-slate-300">Appeared in technical/HR panels</p>
            </div>

            {/* Step 4: Offered */}
            <div className="p-4 rounded-2xl glass-inner-card border border-orange-500/30 bg-orange-500/5 space-y-2 relative overflow-hidden">
              <span className="text-[10px] font-bold text-orange-400 uppercase">Stage 4 ({funnel.offerConversion}%)</span>
              <h4 className="text-sm font-bold text-white font-heading">Offers Extended</h4>
              <div className="text-2xl font-black text-orange-300 font-heading">{funnel.offeredCount}</div>
              <p className="text-[11px] text-slate-300">Official offers rolled out</p>
            </div>

            {/* Step 5: Accepted */}
            <div className="p-4 rounded-2xl glass-inner-card border border-emerald-500/30 bg-emerald-500/5 space-y-2 relative overflow-hidden">
              <span className="text-[10px] font-bold text-emerald-400 uppercase">Stage 5 ({funnel.acceptanceConversion}%)</span>
              <h4 className="text-sm font-bold text-white font-heading">Accepted &amp; Joined</h4>
              <div className="text-2xl font-black text-emerald-300 font-heading">{funnel.acceptedCount}</div>
              <p className="text-[11px] text-emerald-300 font-medium">Digital offer acceptance verified</p>
            </div>

          </div>

          {/* Application Distribution per Scholar */}
          <div className="glass-inner-card p-6 rounded-[28px] border border-white/10 shadow-xl space-y-4">
            <h4 className="text-sm font-bold font-heading text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-[#ff7849]" /> Application Frequency Distribution
            </h4>
            <p className="text-xs text-slate-300/80">
              Analysis of drive application volume per registered student candidate.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {Object.entries(applicationDistribution).map(([label, count], idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-slate-400 block text-[11px] font-medium">{label}</span>
                  <div className="text-2xl font-black text-white font-heading">{count} Students</div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-orange-400 to-amber-400 h-full rounded-full"
                      style={{ width: `${(count / 240) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
