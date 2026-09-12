import React, { useState } from 'react';
import {
  GraduationCap,
  Send,
  Sparkles,
  Bot,
  User,
  Lightbulb,
  Code,
  HelpCircle,
  Award,
  Clock,
  RotateCcw
} from 'lucide-react';

const INITIAL_MESSAGES = [
  {
    sender: 'ai',
    text: `Hello ${'Scholar'}! 👋 I am your AI Placement Coach and Technical Tutor.

I can help you prepare for:
1. **Data Structures & Algorithms** (Dynamic Programming, Graph traversals, Two Pointers).
2. **System Design & Distributed Architectures** (Rate limiting, Caching, Sharding).
3. **Core CS Fundamentals** (OS threading, DBMS normalization, Computer Networks).
4. **Behavioral & HR Interview Rounds** (STAR framework responses).

How would you like to prepare today? Feel free to pick a prompt below or ask your own question!`,
    timestamp: 'Just now'
  }
];

const PROMPT_SUGGESTIONS = [
  'How to explain Two-Pointer technique in an interview?',
  'Give me a mock HR interview scenario: "Tell me about a time you faced a conflict"',
  'Explain CAP theorem with real-world examples (MongoDB vs Cassandra)',
  'Walk me through Dynamic Programming memoization vs tabulation'
];

export default function AiTutorView({ currentUser }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (userText) => {
    const query = userText || inputVal;
    if (!query.trim()) return;

    const newMsg = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputVal('');
    setIsTyping(true);

    // Contextual AI Response generator
    setTimeout(() => {
      setIsTyping(false);
      let reply = '';
      const q = query.toLowerCase();

      if (q.includes('two-pointer') || q.includes('pointer')) {
        reply = `### 💡 Two-Pointer Technique Masterclass\n\n` +
          `**When to use it:**\n` +
          `- Searching pairs in a sorted array (e.g. Two Sum II, 3Sum).\n` +
          `- In-place array transformations (e.g. Move Zeroes, Remove Duplicates).\n` +
          `- Reversing strings and palindrome checking.\n\n` +
          `**Interview Tip:** Always state the space complexity benefit! While HashMap uses $O(N)$ auxiliary space, Two-Pointers operates in **$O(1)$ constant space**.\n\n` +
          `\`\`\`python\n` +
          `def two_sum_sorted(nums, target):\n` +
          `    left, right = 0, len(nums) - 1\n` +
          `    while left < right:\n` +
          `        curr_sum = nums[left] + nums[right]\n` +
          `        if curr_sum == target: return [left, right]\n` +
          `        elif curr_sum < target: left += 1\n` +
          `        else: right -= 1\n` +
          `    return []\n` +
          `\`\`\``;
      } else if (q.includes('conflict') || q.includes('hr')) {
        reply = `### 🎯 Behavioral HR Response: Handling Team Conflict\n\n` +
          `Always answer using the **STAR Method**:\n` +
          `1. **Situation:** During our semester capstone project, our team had differing opinions on whether to use SQL or NoSQL.\n` +
          `2. **Task:** As the team lead, I needed to reach a consensus without delaying our 2-week sprint deadline.\n` +
          `3. **Action:** I organized a 30-minute tech evaluation matrix comparing schema flexibility against relational query needs. We collectively agreed MongoDB was optimal for our document-heavy data.\n` +
          `4. **Result:** We completed the project 3 days ahead of schedule with 99.8% test coverage and earned the Best Capstone Award.`;
      } else if (q.includes('cap theorem') || q.includes('cap')) {
        reply = `### 🏛️ CAP Theorem Demystified\n\n` +
          `In any distributed data store, you can only guarantee **two out of three** properties:\n\n` +
          `- **Consistency (C):** Every read receives the most recent write or an error.\n` +
          `- **Availability (A):** Every non-failing node returns a response (without guarantee of latest data).\n` +
          `- **Partition Tolerance (P):** The system continues to operate despite network packet loss.\n\n` +
          `**Key Takeaway:** Since network partitions (P) are unavoidable in physical networks, real systems must choose between **CP (e.g., MongoDB, HBase)** or **AP (e.g., Cassandra, DynamoDB)**.`;
      } else {
        reply = `Excellent technical question! Here is how you should structure your answer in a placement interview:\n\n` +
          `1. **Core Concept:** Start with a crisp 1-sentence definition avoiding jargon.\n` +
          `2. **Algorithmic Complexity:** State Time and Space bounds explicitly ($O(N \\log N)$ vs $O(N)$).\n` +
          `3. **Edge Cases:** Proactively mention null pointers, single-element collections, and integer overflow.\n` +
          `4. **Implementation:** Code with clear variable names and modular helper functions.\n\n` +
          `Would you like to practice a real coding problem on this topic in the **Coding Practice Arena**?`;
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 rounded-[28px] glass-inner-card border border-white/15 bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent backdrop-blur-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-xl shadow-lg">
              🎓
            </div>
            <div>
              <h1 className="text-2xl font-black font-heading text-white tracking-wide flex items-center gap-2">
                AI Placement Tutor & Coach
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/40 font-bold uppercase">
                  GPT-4o Placement Model
                </span>
              </h1>
              <p className="text-xs text-slate-300 mt-0.5">
                Interactive interview coaching for DSA, System Design, and behavioral campus rounds.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setMessages(INITIAL_MESSAGES)}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer self-start md:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Session</span>
        </button>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-400 flex items-center gap-1 shrink-0">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Suggestions:
        </span>
        {PROMPT_SUGGESTIONS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-all shrink-0 cursor-pointer text-left"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Conversation Card */}
      <div className="p-6 rounded-[28px] glass-inner-card border border-white/10 space-y-4 flex flex-col h-[560px] justify-between">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 ${
                m.sender === 'user'
                  ? 'bg-[#ff7849] text-white shadow-md'
                  : 'bg-purple-500/20 border border-purple-500/30 text-purple-300'
              }`}>
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`p-4 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-[#ff7849] to-[#f97316] text-white rounded-tr-none shadow-md font-medium'
                  : 'bg-white/[0.06] border border-white/10 text-slate-200 rounded-tl-none space-y-2'
              }`}>
                <div className="whitespace-pre-wrap">{m.text}</div>
                <div className={`text-[9px] mt-1 ${m.sender === 'user' ? 'text-orange-200' : 'text-slate-500'} text-right`}>
                  {m.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 pl-11">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce delay-100" />
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce delay-200" />
              <span className="ml-1 text-[11px]">AI Tutor is formulating guidance...</span>
            </div>
          )}
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-2 pt-3 border-t border-white/10"
        >
          <input
            type="text"
            placeholder="Ask anything about coding, system design, or interview preparation..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 glass-input px-4 py-3 rounded-2xl text-xs text-white"
          />

          <button
            type="submit"
            disabled={!inputVal.trim() || isTyping}
            className="px-5 py-3 rounded-2xl btn-orange-glow font-bold text-xs text-white shadow-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </form>

      </div>

    </div>
  );
}
