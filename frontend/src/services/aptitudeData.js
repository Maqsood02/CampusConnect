export const INITIAL_APTITUDE_QUESTIONS = [
  {
    id: 'apt_1',
    category: 'Quantitative',
    companyTag: 'TCS NQT',
    difficulty: 'Medium',
    status: 'ACTIVE',
    question: 'A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?',
    options: [
      '65 seconds',
      '89 seconds',
      '100 seconds',
      '150 seconds'
    ],
    correctAnswer: 1, // index 1: '89 seconds'
    explanation: 'Speed of train = Length / Time = 240 / 24 = 10 m/s. Total distance to cross platform = 240 + 650 = 890 m. Time taken = 890 / 10 = 89 seconds.',
    createdBy: 'Placement Officer',
    createdAt: '2026-09-01'
  },
  {
    id: 'apt_2',
    category: 'Quantitative',
    companyTag: 'Infosys',
    difficulty: 'High',
    status: 'ACTIVE',
    question: 'A can do a piece of work in 12 days, and B can do it in 15 days. They work together for 5 days, and then B leaves. In how many more days can A finish the remaining work?',
    options: [
      '3 days',
      '4 days',
      '5 days',
      '6 days'
    ],
    correctAnswer: 0, // index 0: '3 days'
    explanation: 'Total work = LCM(12, 15) = 60 units. Efficiency of A = 5 units/day, B = 4 units/day. In 5 days together: (5+4) * 5 = 45 units. Remaining work = 60 - 45 = 15 units. Days for A = 15 / 5 = 3 days.',
    createdBy: 'Placement Officer',
    createdAt: '2026-09-02'
  },
  {
    id: 'apt_3',
    category: 'Logical',
    companyTag: 'Cognizant',
    difficulty: 'Low',
    status: 'ACTIVE',
    question: 'Pointing to a photograph of a boy, Suresh said, "He is the son of the only son of my mother." How is Suresh related to that boy?',
    options: [
      'Brother',
      'Uncle',
      'Father',
      'Cousin'
    ],
    correctAnswer: 2, // index 2: 'Father'
    explanation: 'The only son of Suresh’s mother is Suresh himself. Therefore, the boy in the photograph is Suresh’s son, meaning Suresh is his father.',
    createdBy: 'Placement Officer',
    createdAt: '2026-09-03'
  },
  {
    id: 'apt_4',
    category: 'Logical',
    companyTag: 'Wipro',
    difficulty: 'Medium',
    status: 'ACTIVE',
    question: 'Find the missing number in the series: 7, 14, 42, 168, 840, ?',
    options: [
      '3360',
      '5040',
      '4200',
      '6720'
    ],
    correctAnswer: 1, // index 1: '5040'
    explanation: '7 * 2 = 14; 14 * 3 = 42; 42 * 4 = 168; 168 * 5 = 840; 840 * 6 = 5040.',
    createdBy: 'Placement Officer',
    createdAt: '2026-09-04'
  },
  {
    id: 'apt_5',
    category: 'Verbal',
    companyTag: 'TCS NQT',
    difficulty: 'Low',
    status: 'ACTIVE',
    question: 'Choose the correct synonym for the word "PRAGMATIC":',
    options: [
      'Theoretical',
      'Realistic & Practical',
      'Pessimistic',
      'Arrogant'
    ],
    correctAnswer: 1, // 'Realistic & Practical'
    explanation: '"Pragmatic" means dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations.',
    createdBy: 'Placement Officer',
    createdAt: '2026-09-05'
  },
  {
    id: 'apt_6',
    category: 'Verbal',
    companyTag: 'Google',
    difficulty: 'High',
    status: 'ACTIVE',
    question: 'Identify the grammatically correct sentence:',
    options: [
      'Neither the manager nor the engineers was able to resolve the latency issue.',
      'Neither the manager nor the engineers were able to resolve the latency issue.',
      'Neither the manager or the engineers was able to resolve the latency issue.',
      'Neither the manager nor the engineers is able to resolved the latency issue.'
    ],
    correctAnswer: 1,
    explanation: 'When subjects are joined by "neither... nor", the verb agrees with the closer subject ("engineers" is plural, so "were" is correct).',
    createdBy: 'Placement Officer',
    createdAt: '2026-09-06'
  },
  {
    id: 'apt_7',
    category: 'Core CS',
    companyTag: 'Amazon',
    difficulty: 'High',
    status: 'ACTIVE',
    question: 'What is the worst-case time complexity of finding the median in an unsorted array of size N using Quickselect?',
    options: [
      'O(N)',
      'O(N log N)',
      'O(N^2)',
      'O(log N)'
    ],
    correctAnswer: 2, // O(N^2)
    explanation: 'While average case for Quickselect is O(N), the worst case when poor pivots are chosen repeatedly is O(N^2).',
    createdBy: 'Placement Officer',
    createdAt: '2026-09-07'
  }
];

export const APTITUDE_PRESETS = [
  {
    company: 'TCS NQT 2026',
    focus: 'Numerical, Verbal & Reasoning Foundation',
    questionsCount: 5,
    durationMinutes: 15,
    tagColor: 'orange'
  },
  {
    company: 'Infosys Springboard',
    focus: 'Mathematical Reasoning & Critical Logic',
    questionsCount: 5,
    durationMinutes: 20,
    tagColor: 'blue'
  },
  {
    company: 'Cognizant GenC Elevate',
    focus: 'Analytical Ability & Automata Fix',
    questionsCount: 5,
    durationMinutes: 15,
    tagColor: 'cyan'
  },
  {
    company: 'Product Giant Tier-1 (Google/Amazon)',
    focus: 'Advanced Algorithmic Logic & Discrete Math',
    questionsCount: 5,
    durationMinutes: 25,
    tagColor: 'purple'
  }
];
