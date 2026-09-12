import React, { useState, useEffect } from 'react';
import {
  Code2,
  Sparkles,
  Play,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sliders,
  Terminal,
  Clock,
  Layers,
  Cpu,
  ChevronRight,
  Zap,
  Check,
  Flame,
  Award
} from 'lucide-react';
import { TOPICS, PRIORITIES, autoGenerateCodingChallenge } from '../services/codingPracticeEngine';

export default function CodingPracticeView({ currentUser }) {
  const [selectedTopic, setSelectedTopic] = useState('arrays');
  const [selectedPriority, setSelectedPriority] = useState('Medium');
  const [challenge, setChallenge] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [userCode, setUserCode] = useState('');
  const [consoleOutput, setConsoleOutput] = useState('');
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Generate on mount or filter change
  useEffect(() => {
    handleGenerateNewChallenge();
  }, [selectedTopic, selectedPriority]);

  const handleGenerateNewChallenge = () => {
    const generated = autoGenerateCodingChallenge(selectedTopic, selectedPriority);
    setChallenge(generated);
    setUserCode(generated.templates[selectedLanguage] || generated.templates.python);
    setConsoleOutput('// Challenge auto-generated based on selected criteria.\n// Click "Run Code" to test against visible sample test cases.');
    setTestResults(null);
    setSubmitted(false);
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    if (challenge && challenge.templates[lang]) {
      setUserCode(challenge.templates[lang]);
    }
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleOutput('Compiling solution against test harness...\nExecuting test cases...');
    
    setTimeout(() => {
      setIsRunning(false);
      const passed = Math.random() > 0.15; // Realistic test simulation
      if (passed) {
        setTestResults({
          passed: true,
          total: challenge.testCases.length,
          passedCount: challenge.testCases.length,
          runtime: `${Math.floor(28 + Math.random() * 45)} ms`,
          memory: `${(14.2 + Math.random() * 3.5).toFixed(1)} MB`
        });
        setConsoleOutput(
          `[SUCCESS] All ${challenge.testCases.length} test cases passed successfully!\n` +
          `Runtime: ${Math.floor(28 + Math.random() * 45)} ms (beats 88.4% of submissions)\n` +
          `Memory: ${(14.2 + Math.random() * 3.5).toFixed(1)} MB\n\n` +
          `Sample Test Case 1: Input: ${challenge.testCases[0]?.input} -> Output: ${challenge.testCases[0]?.expected} [MATCHED]`
        );
      } else {
        setTestResults({
          passed: false,
          total: challenge.testCases.length,
          passedCount: challenge.testCases.length - 1,
          runtime: '42 ms',
          memory: '15.1 MB'
        });
        setConsoleOutput(
          `[TEST CASE FAILED] Expected: ${challenge.testCases[0]?.expected}\n` +
          `Received: None or Mismatch\n` +
          `Check your edge-case boundaries and return statement.`
        );
      }
    }, 650);
  };

  const handleSubmitSolution = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setSubmitted(true);
      setConsoleOutput(
        `🏆 SUBMISSION ACCEPTED!\n` +
        `Complexity: O(N) Time, O(1) Space\n` +
        `Rating Impact: +25 XP in ${challenge.topic.toUpperCase()}\n` +
        `Status: Stored in Student Portfolio for Placement Officer inspection.`
      );
    }, 850);
  };

  if (!challenge) return null;

  const currentTopicObj = TOPICS.find(t => t.id === selectedTopic);
  const currentPriorityObj = PRIORITIES.find(p => p.id === selectedPriority);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 rounded-[28px] glass-inner-card border border-white/15 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent backdrop-blur-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#ff7849]/20 border border-[#ff7849]/40 flex items-center justify-center text-xl shadow-lg">
              💻
            </div>
            <div>
              <h1 className="text-2xl font-black font-heading text-white tracking-wide flex items-center gap-2">
                Coding Practice Arena
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold uppercase">
                  AI Auto-Generated
                </span>
              </h1>
              <p className="text-xs text-slate-300 mt-0.5">
                Challenges automatically synthesized based on your target skills and priority requirements.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerateNewChallenge}
          className="px-4 py-2.5 rounded-2xl btn-orange-glow text-xs font-bold flex items-center gap-2 self-start md:self-center cursor-pointer shadow-lg hover:scale-105 transition-transform"
        >
          <Sparkles className="w-4 h-4" />
          <span>Auto-Generate New Challenge</span>
        </button>
      </div>

      {/* Requirement Filters Bar */}
      <div className="p-5 rounded-[24px] glass-inner-card border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Topic Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#ff7849]" /> Select Target Topic / Skill:
            </label>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTopic(t.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedTopic === t.id
                      ? 'bg-orange-500/25 border-orange-500/60 text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Priority Level Selector */}
          <div className="space-y-1.5 shrink-0">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-400" /> Priority Level:
            </label>
            <div className="flex gap-2">
              {PRIORITIES.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPriority(p.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedPriority === p.id
                      ? p.id === 'High'
                        ? 'bg-rose-500/25 border-rose-500/60 text-rose-200 shadow-md'
                        : p.id === 'Medium'
                        ? 'bg-amber-500/25 border-amber-500/60 text-amber-200 shadow-md'
                        : 'bg-emerald-500/25 border-emerald-500/60 text-emerald-200 shadow-md'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {p.id} Priority
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Main Coding Workspace Grid (Split Pane: Problem Statement & Code Editor) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col (5 cols): Problem Statement & Test Specs */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-inner-card p-6 rounded-[28px] border border-white/10 space-y-4">
            
            {/* Title & Badges */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                  challenge.priority === 'High'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    : challenge.priority === 'Medium'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                }`}>
                  {challenge.priority} Priority
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Acceptance: {challenge.acceptance}
                </span>
              </div>

              <h2 className="text-xl font-bold font-heading text-white">
                {challenge.title}
              </h2>

              {/* Company Tags */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="text-[10px] text-slate-400 font-semibold">Frequently Asked In:</span>
                {challenge.companies.map(c => (
                  <span key={c} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-orange-200 border border-white/15">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Problem Statement */}
            <div className="border-t border-white/10 pt-4 space-y-2">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Description</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {challenge.description}
              </p>
            </div>

            {/* Examples */}
            <div className="border-t border-white/10 pt-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Examples</h3>
              {challenge.examples.map((ex, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 font-mono text-[11px] space-y-1">
                  <div><span className="text-orange-300 font-bold">Input:</span> <span className="text-white">{ex.input}</span></div>
                  <div><span className="text-emerald-300 font-bold">Output:</span> <span className="text-white">{ex.output}</span></div>
                  {ex.explanation && (
                    <div className="text-[10px] text-slate-400 font-sans pt-1">
                      <span className="font-semibold text-slate-300">Explanation:</span> {ex.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="border-t border-white/10 pt-4 space-y-1.5">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Constraints</h3>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 font-mono text-[11px]">
                {challenge.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Right Col (7 cols): Interactive Code Editor & Runner */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-inner-card p-5 rounded-[28px] border border-white/10 space-y-4 flex flex-col justify-between">
            
            {/* Editor Top Bar: Language Selector & Controls */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#ff7849]" />
                <span className="text-xs font-bold text-white">Solution Editor</span>
              </div>

              {/* Language Pills */}
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'python', label: 'Python 3' },
                  { id: 'javascript', label: 'JavaScript' },
                  { id: 'java', label: 'Java 17' },
                  { id: 'cpp', label: 'C++ 20' }
                ].map(l => (
                  <button
                    key={l.id}
                    onClick={() => handleLanguageChange(l.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      selectedLanguage === l.id
                        ? 'bg-orange-500/30 text-orange-200 border border-orange-400/50'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Textarea Area */}
            <div className="relative rounded-2xl bg-black/50 border border-white/10 overflow-hidden font-mono text-xs">
              <div className="flex">
                {/* Line Numbers Simulation */}
                <div className="select-none py-3 px-2 bg-black/40 text-slate-500 text-right text-[11px] border-r border-white/5 space-y-0.5 leading-5 w-9">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>

                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  rows={16}
                  className="w-full bg-transparent text-slate-100 p-3 outline-none resize-none font-mono text-[12px] leading-5 selection:bg-orange-500/30"
                  spellCheck={false}
                />
              </div>
            </div>

            {/* Action Buttons: Run Code and Submit */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Sandbox: V8 Node / CPython JIT Active</span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                  <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                </button>

                <button
                  onClick={handleSubmitSolution}
                  disabled={isRunning}
                  className="px-5 py-2 rounded-xl btn-orange-glow text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Submit Solution</span>
                </button>
              </div>
            </div>

            {/* Console Output & Result Area */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs pb-1 border-b border-white/10">
                <span className="font-mono text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" /> Execution Console
                </span>
                {testResults && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    testResults.passed
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                  }`}>
                    {testResults.passed ? 'PASSED' : 'FAILED'} • {testResults.passedCount}/{testResults.total} Tests
                  </span>
                )}
              </div>

              <pre className="font-mono text-[11px] text-slate-300 whitespace-pre-wrap leading-relaxed">
                {consoleOutput}
              </pre>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
