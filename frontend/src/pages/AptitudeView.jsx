import React, { useState, useEffect } from 'react';
import {
  Brain,
  Timer,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Award,
  ChevronRight,
  RotateCcw,
  BookOpen,
  Filter,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { api, subscribeToStore } from '../services/api';

export default function AptitudeView({ currentUser }) {
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState('All');
  
  // Test Mode State
  const [isTestMode, setIsTestMode] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    setQuestions(api.getAptitudeQuestions());

    const unsubscribe = subscribeToStore((store) => {
      if (store.aptitudeQuestions) {
        setQuestions(store.aptitudeQuestions);
      }
    });

    return () => unsubscribe();
  }, []);

  // Timer effect when in test mode
  useEffect(() => {
    let timer;
    if (isTestMode && !testSubmitted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && !testSubmitted) {
      handleSubmitTest();
    }
    return () => clearInterval(timer);
  }, [isTestMode, testSubmitted, timeLeft]);

  const activeQuestions = questions.filter(q => q.status === 'ACTIVE');

  const filteredQuestions = activeQuestions.filter(q => {
    const matchCat = selectedCategory === 'All' || q.category === selectedCategory;
    const matchComp = selectedCompany === 'All' || q.companyTag === selectedCompany;
    return matchCat && matchComp;
  });

  const uniqueCategories = ['All', 'Quantitative', 'Logical', 'Verbal', 'Core CS'];
  const uniqueCompanies = ['All', ...new Set(activeQuestions.map(q => q.companyTag).filter(Boolean))];

  const handleStartTest = () => {
    setIsTestMode(true);
    setCurrentQIndex(0);
    setUserAnswers({});
    setTestSubmitted(false);
    setTimeLeft(filteredQuestions.length * 90); // 1.5 mins per question
  };

  const handleSelectOption = (qId, optionIdx) => {
    if (testSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitTest = () => {
    setTestSubmitted(true);
  };

  const calculateScore = () => {
    let correct = 0;
    filteredQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return {
      score: correct,
      total: filteredQuestions.length,
      percentage: filteredQuestions.length > 0 ? ((correct / filteredQuestions.length) * 100).toFixed(0) : 0
    };
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const results = testSubmitted ? calculateScore() : null;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 rounded-[28px] glass-inner-card border border-white/15 bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent backdrop-blur-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl shadow-lg">
              🧩
            </div>
            <div>
              <h1 className="text-2xl font-black font-heading text-white tracking-wide flex items-center gap-2">
                Aptitude Library & Test Center
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold uppercase">
                  Verified Bank
                </span>
              </h1>
              <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Curated and maintained by Institutional Placement Officers & TPO Staff.
              </p>
            </div>
          </div>
        </div>

        {!isTestMode ? (
          <button
            onClick={handleStartTest}
            disabled={filteredQuestions.length === 0}
            className="px-5 py-2.5 rounded-2xl btn-orange-glow text-xs font-bold flex items-center gap-2 self-start md:self-center cursor-pointer shadow-lg hover:scale-105 transition-transform"
          >
            <Timer className="w-4 h-4" />
            <span>Start Practice Test ({filteredQuestions.length} Questions)</span>
          </button>
        ) : (
          <button
            onClick={() => setIsTestMode(false)}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
          >
            &larr; Exit Test Mode
          </button>
        )}
      </div>

      {/* When In Test Mode */}
      {isTestMode ? (
        <div className="space-y-6">
          
          {/* Test Top Bar */}
          <div className="p-4 rounded-[24px] glass-inner-card border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-300">
                Question {currentQIndex + 1} of {filteredQuestions.length}
              </span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-orange-200 border border-white/15">
                {filteredQuestions[currentQIndex]?.category}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {filteredQuestions[currentQIndex]?.companyTag}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/40 border border-white/15 font-mono text-xs font-bold text-amber-300">
                <Timer className="w-3.5 h-3.5" />
                <span>{formatTime(timeLeft)}</span>
              </div>

              {!testSubmitted && (
                <button
                  onClick={handleSubmitTest}
                  className="px-4 py-1.5 rounded-xl btn-orange-glow text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Submit Test
                </button>
              )}
            </div>
          </div>

          {/* Test Results Summary Banner (if submitted) */}
          {testSubmitted && results && (
            <div className="p-6 rounded-[28px] glass-inner-card border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-2xl shadow-xl flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  <span className="text-xl font-bold font-heading text-white">Test Completed!</span>
                </div>
                <p className="text-xs text-emerald-200">
                  You scored <span className="font-bold text-white">{results.score}</span> out of <span className="font-bold text-white">{results.total}</span> ({results.percentage}% Accuracy).
                </p>
              </div>

              <button
                onClick={handleStartTest}
                className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Test
              </button>
            </div>
          )}

          {/* Active Question Card */}
          {filteredQuestions[currentQIndex] && (
            <div className="p-6 rounded-[28px] glass-inner-card border border-white/10 space-y-6">
              
              <div className="space-y-3">
                <div className="text-sm font-semibold text-slate-200 leading-relaxed">
                  {filteredQuestions[currentQIndex].question}
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredQuestions[currentQIndex].options.map((opt, oIdx) => {
                  const isSelected = userAnswers[filteredQuestions[currentQIndex].id] === oIdx;
                  const isCorrect = filteredQuestions[currentQIndex].correctAnswer === oIdx;
                  
                  let optStyle = 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white';
                  if (isSelected && !testSubmitted) {
                    optStyle = 'bg-orange-500/30 border-orange-400/60 text-white shadow-md';
                  } else if (testSubmitted) {
                    if (isCorrect) {
                      optStyle = 'bg-emerald-500/25 border-emerald-500/60 text-emerald-200';
                    } else if (isSelected && !isCorrect) {
                      optStyle = 'bg-rose-500/25 border-rose-500/60 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(filteredQuestions[currentQIndex].id, oIdx)}
                      disabled={testSubmitted}
                      className={`p-4 rounded-2xl border text-left text-xs font-medium transition-all cursor-pointer flex items-start gap-3 ${optStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation (Shown when test is submitted) */}
              {testSubmitted && (
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1.5 animate-in fade-in">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Step-by-Step Solution & Explanation:
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {filteredQuestions[currentQIndex].explanation}
                  </p>
                </div>
              )}

              {/* Question Navigation Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex(i => i - 1)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold"
                >
                  &larr; Previous
                </button>

                {/* Quick Navigation Numbers */}
                <div className="hidden sm:flex items-center gap-1.5">
                  {filteredQuestions.map((q, idx) => (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQIndex(idx)}
                      className={`w-7 h-7 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                        currentQIndex === idx
                          ? 'bg-[#ff7849] border-[#ff7849] text-white shadow-sm'
                          : userAnswers[q.id] !== undefined
                          ? 'bg-white/15 border-white/20 text-white'
                          : 'bg-white/5 border-white/10 text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  disabled={currentQIndex === filteredQuestions.length - 1}
                  onClick={() => setCurrentQIndex(i => i + 1)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold"
                >
                  Next &rarr;
                </button>
              </div>

            </div>
          )}

        </div>
      ) : (
        /* Question Bank Browser Mode */
        <div className="space-y-6">
          
          {/* Filters Bar */}
          <div className="p-5 rounded-[24px] glass-inner-card border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-[#ff7849]" /> Category:
              </span>
              {uniqueCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-orange-500/25 border-orange-500/60 text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Company Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" /> Company:
              </span>
              {uniqueCompanies.map(comp => (
                <button
                  key={comp}
                  onClick={() => setSelectedCompany(comp)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    selectedCompany === comp
                      ? 'bg-cyan-500/25 border-cyan-500/60 text-cyan-200 shadow-md'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {comp}
                </button>
              ))}
            </div>

          </div>

          {/* Questions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredQuestions.map((q, idx) => (
              <div key={q.id} className="p-5 rounded-[26px] glass-inner-card border border-white/10 space-y-3 flex flex-col justify-between hover:border-white/20 transition-all">
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-orange-200 border border-white/15">
                      {q.category}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {q.companyTag}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-white leading-relaxed">
                    <span className="text-orange-400 font-mono mr-1.5 font-bold">Q{idx + 1}.</span>
                    {q.question}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-white/5">
                  {q.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-slate-300 flex items-center gap-2"
                    >
                      <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[9px] font-bold text-slate-400">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Author: {q.createdBy}</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Solution
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
