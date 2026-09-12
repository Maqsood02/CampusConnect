// Comprehensive initial mock data matching MongoDB document schemas

export const INITIAL_STUDENTS = [
  {
    id: "stud_1",
    userId: "usr_stud_1",
    rollNumber: "2022CSE042",
    fullName: "Alex Mercer",
    email: "student@cpms.edu",
    branch: "CSE",
    cgpa: 9.15,
    graduationYear: 2026,
    semester: "7th Semester",
    activeBacklogs: 0,
    phone: "+91 98123 45678",
    verificationStatus: "VERIFIED",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    skills: [
      { id: 1, name: "Python", level: "Advanced" },
      { id: 2, name: "React.js", level: "Intermediate" },
      { id: 3, name: "MongoDB & SQL", level: "Advanced" },
      { id: 4, name: "Docker & Cloud", level: "Intermediate" },
      { id: 5, name: "Data Structures", level: "Advanced" }
    ],
    certifications: [
      { id: 1, title: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", date: "2025-06-15" },
      { id: 2, title: "Meta Front-End Developer Professional", issuer: "Coursera / Meta", date: "2024-11-20" }
    ],
    projects: [
      { id: 1, title: "Distributed Placement Management Portal", tech: "Java Spring Boot, MongoDB, React", desc: "Automated recruitment orchestration system with real-time eligibility evaluation engine." },
      { id: 2, title: "AI Resume Ranker & Parser", tech: "Python, FastAPI, NLP", desc: "Semantic parsing and candidate-job matching algorithm with 94% precision." }
    ],
    internships: [
      { id: 1, company: "TechCorp Solutions", role: "Software Engineering Intern", duration: "3 Months (Summer 2025)", desc: "Engineered scalable REST microservices and database query optimizations." }
    ]
  },
  {
    id: "stud_2",
    userId: "usr_stud_2",
    rollNumber: "2022CSE101",
    fullName: "Rahul Kumar",
    email: "rahul.kumar@cpms.edu",
    branch: "CSE",
    cgpa: 8.85,
    graduationYear: 2026,
    semester: "7th Semester",
    activeBacklogs: 0,
    phone: "+91 98111 22334",
    verificationStatus: "VERIFIED",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    skills: [
      { id: 6, name: "Java & Spring Boot", level: "Advanced" },
      { id: 7, name: "Microservices", level: "Intermediate" }
    ],
    certifications: [],
    projects: [],
    internships: []
  },
  {
    id: "stud_3",
    userId: "usr_stud_3",
    rollNumber: "2022ECE205",
    fullName: "Ananya Sen",
    email: "ananya.sen@cpms.edu",
    branch: "ECE",
    cgpa: 8.40,
    graduationYear: 2026,
    semester: "7th Semester",
    activeBacklogs: 0,
    phone: "+91 98222 33445",
    verificationStatus: "VERIFIED",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    skills: [
      { id: 8, name: "Embedded Systems", level: "Advanced" },
      { id: 9, name: "C++", level: "Advanced" }
    ],
    certifications: [],
    projects: [],
    internships: []
  },
  {
    id: "stud_4",
    userId: "usr_stud_4",
    rollNumber: "2023EEE515",
    fullName: "Rohan Sharma",
    email: "rohan.sharma@cpms.edu",
    branch: "EEE",
    cgpa: 7.80,
    graduationYear: 2027,
    semester: "5th Semester",
    activeBacklogs: 0,
    phone: "+91 98555 66778",
    verificationStatus: "PENDING",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    skills: [
      { id: 10, name: "IoT & Microcontrollers", level: "Intermediate" }
    ],
    certifications: [],
    projects: [],
    internships: []
  }
];

export const INITIAL_OFFICER = {
  id: "off_1",
  userId: "usr_off_1",
  fullName: "Prof. Sarah Jenkins",
  email: "officer@cpms.edu",
  department: "Training & Placement Cell",
  phone: "+91 98765 43210",
  officerCode: "TPO-HQ-01",
  avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
};

export const INITIAL_ADMIN = {
  id: "adm_1",
  userId: "usr_adm_1",
  fullName: "Dr. Arthur Vance",
  email: "admin@cpms.edu",
  role: "Administrator",
  department: "Dean Office & Institutional Affairs",
  avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
};

export const INITIAL_COMPANIES = [
  { id: "comp_1", name: "Google Cloud", industry: "Cloud & AI", logo: "https://www.google.com/favicon.ico", tier: "Dream", website: "https://careers.google.com" },
  { id: "comp_2", name: "Microsoft", industry: "Enterprise Software", logo: "https://www.microsoft.com/favicon.ico", tier: "Super Dream", website: "https://careers.microsoft.com" },
  { id: "comp_3", name: "Amazon", industry: "E-Commerce & AWS", logo: "https://www.amazon.com/favicon.ico", tier: "Dream", website: "https://amazon.jobs" },
  { id: "comp_4", name: "Goldman Sachs", industry: "Fintech & Banking", logo: "https://www.goldmansachs.com/favicon.ico", tier: "Super Dream", website: "https://goldmansachs.com/careers" },
  { id: "comp_5", name: "TechCorp Labs", industry: "SaaS Solutions", logo: "https://ui-avatars.com/api/?name=Tech+Corp&background=6366f1&color=fff", tier: "Core", website: "https://techcorp.io" }
];

export const INITIAL_DRIVES = [
  {
    id: "drv_1",
    companyName: "Google Cloud",
    companyId: "comp_1",
    jobTitle: "Cloud Solutions Engineer",
    packageLpa: 28.5,
    location: "Bengaluru / Hyderabad (Hybrid)",
    driveDate: "2026-09-24",
    deadline: "2026-09-20",
    status: "OPEN",
    tier: "Super Dream",
    description: "Design resilient cloud infrastructure and developer tooling on Google Cloud Platform. Requires solid grasp of algorithms, networking, and distributed systems.",
    criteria: {
      minCgpa: 8.5,
      allowedBranches: ["CSE", "IT", "ECE"],
      maxBacklogs: 0,
      graduationYear: 2026,
      requiredSkills: ["Python or Java", "Cloud Architecture", "Networks"]
    }
  },
  {
    id: "drv_2",
    companyName: "Microsoft",
    companyId: "comp_2",
    jobTitle: "Software Development Engineer (SDE-1)",
    packageLpa: 32.0,
    location: "Hyderabad / Noida",
    driveDate: "2026-09-28",
    deadline: "2026-09-22",
    status: "OPEN",
    tier: "Super Dream",
    description: "Core engineering on Azure, Teams, and AI copilot services. Hands-on coding in modern C++, C#, Java or TypeScript.",
    criteria: {
      minCgpa: 8.0,
      allowedBranches: ["CSE", "IT"],
      maxBacklogs: 0,
      graduationYear: 2026,
      requiredSkills: ["Data Structures", "OOP", "System Design"]
    }
  },
  {
    id: "drv_3",
    companyName: "Amazon",
    companyId: "comp_3",
    jobTitle: "Associate Software Engineer",
    packageLpa: 24.0,
    location: "Bengaluru / Chennai",
    driveDate: "2026-10-02",
    deadline: "2026-09-26",
    status: "OPEN",
    tier: "Dream",
    description: "Building ultra-high-throughput fulfillment and commerce APIs. Fast-paced innovation with strong testing and operational metrics.",
    criteria: {
      minCgpa: 7.5,
      allowedBranches: ["CSE", "IT", "ECE", "EEE"],
      maxBacklogs: 0,
      graduationYear: 2026,
      requiredSkills: ["Java or C++", "Algorithms", "Databases"]
    }
  },
  {
    id: "drv_4",
    companyName: "Goldman Sachs",
    companyId: "comp_4",
    jobTitle: "Quantitative Technology Analyst",
    packageLpa: 26.0,
    location: "Bengaluru",
    driveDate: "2026-10-05",
    deadline: "2026-09-29",
    status: "OPEN",
    tier: "Super Dream",
    description: "High-frequency algorithmic trading platforms and financial risk management software. Strong mathematical and CS foundation required.",
    criteria: {
      minCgpa: 8.5,
      allowedBranches: ["CSE", "IT", "ECE"],
      maxBacklogs: 0,
      graduationYear: 2026,
      requiredSkills: ["Python", "C++", "Statistics"]
    }
  },
  {
    id: "drv_5",
    companyName: "TechCorp Labs",
    companyId: "comp_5",
    jobTitle: "Full-Stack Software Engineer",
    packageLpa: 14.5,
    location: "Pune / Remote",
    driveDate: "2026-09-18",
    deadline: "2026-09-15",
    status: "OPEN",
    tier: "Core",
    description: "Full-stack development utilizing React, Spring Boot microservices, and MongoDB. Modern CI/CD and automated test coverage.",
    criteria: {
      minCgpa: 7.0,
      allowedBranches: ["CSE", "IT", "ECE", "EEE", "ME"],
      maxBacklogs: 1,
      graduationYear: 2026,
      requiredSkills: ["JavaScript/TypeScript", "React or Angular", "REST APIs"]
    }
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: "app_1",
    driveId: "drv_5",
    studentId: "stud_1",
    studentName: "Alex Mercer",
    rollNumber: "2022CSE042",
    branch: "CSE",
    cgpa: 9.15,
    jobTitle: "Full-Stack Software Engineer",
    companyName: "TechCorp Labs",
    packageLpa: 14.5,
    applicationDate: "2026-09-02",
    status: "SELECTED",
    stage: "SELECTED",
    feedback: "Exceptional system design and full-stack coding demonstration in technical rounds.",
    stageHistory: [
      { stage: "APPLIED", timestamp: "2026-09-02 10:15 AM", notes: "Application submitted and eligibility verified." },
      { stage: "SHORTLISTED", timestamp: "2026-09-03 02:30 PM", notes: "Online coding test passed with 100% test cases." },
      { stage: "TECHNICAL_ROUND", timestamp: "2026-09-04 11:00 AM", notes: "Cleared Technical Round 1 & System Design." },
      { stage: "HR_ROUND", timestamp: "2026-09-05 11:00 AM", notes: "HR cultural fit and CTC discussion completed." },
      { stage: "SELECTED", timestamp: "2026-09-05 04:30 PM", notes: "Official Placement Offer rolled out: 14.5 LPA CTC." }
    ]
  },
  {
    id: "app_2",
    driveId: "drv_1",
    studentId: "stud_1",
    studentName: "Alex Mercer",
    rollNumber: "2022CSE042",
    branch: "CSE",
    cgpa: 9.15,
    jobTitle: "Cloud Solutions Engineer",
    companyName: "Google Cloud",
    packageLpa: 28.5,
    applicationDate: "2026-09-04",
    status: "SHORTLISTED",
    stage: "TECHNICAL_ROUND",
    feedback: "Online assessment cleared with 100 percentile score. Round 1 technical interview scheduled.",
    stageHistory: [
      { stage: "APPLIED", timestamp: "2026-09-04 09:30 AM", notes: "Verified against criteria: CGPA 9.15, zero backlogs." },
      { stage: "SHORTLISTED", timestamp: "2026-09-06 05:00 PM", notes: "Shortlisted based on aptitude & coding metrics." },
      { stage: "TECHNICAL_ROUND", timestamp: "2026-09-08 03:00 PM", notes: "Technical System Design Round scheduled." }
    ]
  },
  {
    id: "app_3",
    driveId: "drv_2",
    studentId: "stud_1",
    studentName: "Alex Mercer",
    rollNumber: "2022CSE042",
    branch: "CSE",
    cgpa: 9.15,
    jobTitle: "Software Development Engineer (SDE-1)",
    companyName: "Microsoft",
    packageLpa: 32.0,
    applicationDate: "2026-09-05",
    status: "APPLIED",
    stage: "APPLIED",
    feedback: "Application submitted and verified against eligibility criteria.",
    stageHistory: [
      { stage: "APPLIED", timestamp: "2026-09-05 11:45 AM", notes: "Application recorded. Awaiting OA cutoff." }
    ]
  },
  {
    id: "app_4",
    driveId: "drv_1",
    studentId: "stud_2",
    studentName: "Rahul Kumar",
    rollNumber: "2022CSE101",
    branch: "CSE",
    cgpa: 8.85,
    jobTitle: "Cloud Solutions Engineer",
    companyName: "Google Cloud",
    packageLpa: 28.5,
    applicationDate: "2026-09-03",
    status: "SELECTED",
    stage: "SELECTED",
    feedback: "Super Dream offer extended following stellar Distributed Systems & Kubernetes evaluation.",
    stageHistory: [
      { stage: "APPLIED", timestamp: "2026-09-03 10:00 AM", notes: "Application verified." },
      { stage: "SHORTLISTED", timestamp: "2026-09-04 01:00 PM", notes: "Coding assessment cleared." },
      { stage: "TECHNICAL_ROUND", timestamp: "2026-09-05 02:30 PM", notes: "Cleared Technical Round 1." },
      { stage: "HR_ROUND", timestamp: "2026-09-06 10:00 AM", notes: "HR Round cleared." },
      { stage: "SELECTED", timestamp: "2026-09-06 06:00 PM", notes: "Official 28.5 LPA offer letter extended." }
    ]
  },
  {
    id: "app_5",
    driveId: "drv_3",
    studentId: "stud_3",
    studentName: "Ananya Sen",
    rollNumber: "2022ECE205",
    branch: "ECE",
    cgpa: 8.40,
    jobTitle: "Associate Software Engineer",
    companyName: "Amazon",
    packageLpa: 24.0,
    applicationDate: "2026-09-06",
    status: "SHORTLISTED",
    stage: "TECHNICAL_ROUND",
    feedback: "Cleared Amazon Online Assessment. Technical Round 1 scheduled.",
    stageHistory: [
      { stage: "APPLIED", timestamp: "2026-09-06 02:00 PM", notes: "Application verified against criteria." },
      { stage: "SHORTLISTED", timestamp: "2026-09-08 04:00 PM", notes: "Online coding test cleared." }
    ]
  },
  {
    id: "app_6",
    driveId: "drv_5",
    studentId: "stud_4",
    studentName: "Rohan Sharma",
    rollNumber: "2023EEE515",
    branch: "EEE",
    cgpa: 7.80,
    jobTitle: "Full-Stack Software Engineer",
    companyName: "TechCorp Labs",
    packageLpa: 14.5,
    applicationDate: "2026-09-07",
    status: "APPLIED",
    stage: "APPLIED",
    feedback: "Under review by corporate recruiting team.",
    stageHistory: [
      { stage: "APPLIED", timestamp: "2026-09-07 09:15 AM", notes: "Application received." }
    ]
  }
];

export const INITIAL_INTERVIEWS = [
  {
    id: "iv_1",
    applicationId: "app_2",
    driveId: "drv_1",
    studentId: "stud_1",
    candidateName: "Alex Mercer",
    companyName: "Google Cloud",
    jobTitle: "Cloud Solutions Engineer",
    roundName: "Technical System Design Round",
    roundNumber: 1,
    scheduledTime: "2026-09-12T14:30:00",
    locationOrLink: "https://meet.google.com/cpms-interview-gcloud",
    mode: "VIRTUAL",
    interviewerName: "Google Cloud Architecture Panel",
    status: "SCHEDULED",
    rating: null,
    verdict: null,
    feedbackNotes: null,
    remarks: "Prepare distributed system case studies and cloud networking basics."
  },
  {
    id: "iv_2",
    applicationId: "app_1",
    driveId: "drv_5",
    studentId: "stud_1",
    candidateName: "Alex Mercer",
    companyName: "TechCorp Labs",
    jobTitle: "Full-Stack Software Engineer",
    roundName: "Final HR & Offer Discussion",
    roundNumber: 3,
    scheduledTime: "2026-09-05T11:00:00",
    locationOrLink: "Conference Room B, Placement HQ",
    mode: "IN_PERSON",
    interviewerName: "Director of Talent Acquisition",
    status: "COMPLETED",
    rating: 5,
    verdict: "OFFERED",
    feedbackNotes: "Outstanding proficiency in React, Spring Boot, and cloud deployment pipelines. Strong culture alignment.",
    remarks: "Offer Letter rolled out: 14.5 LPA CTC + Joining Bonus."
  },
  {
    id: "iv_3",
    applicationId: "app_4",
    driveId: "drv_1",
    studentId: "stud_2",
    candidateName: "Rahul Kumar",
    companyName: "Google Cloud",
    jobTitle: "Cloud Solutions Engineer",
    roundName: "Deep Tech & Systems Round",
    roundNumber: 2,
    scheduledTime: "2026-09-05T15:00:00",
    locationOrLink: "https://meet.google.com/cpms-interview-rahul",
    mode: "VIRTUAL",
    interviewerName: "Google Staff Infrastructure Engineer",
    status: "COMPLETED",
    rating: 5,
    verdict: "RECOMMENDED",
    feedbackNotes: "Flawless answers in concurrent programming, memory management, and microservice resilience.",
    remarks: "Recommended directly for final institutional offer."
  },
  {
    id: "iv_4",
    applicationId: "app_5",
    driveId: "drv_3",
    studentId: "stud_3",
    candidateName: "Ananya Sen",
    companyName: "Amazon",
    jobTitle: "Associate Software Engineer",
    roundName: "Data Structures & Algorithms Round",
    roundNumber: 1,
    scheduledTime: "2026-09-14T10:30:00",
    locationOrLink: "https://chime.aws/cpms-amazon-interview",
    mode: "VIRTUAL",
    interviewerName: "AWS SDE-3 Bar Raiser",
    status: "SCHEDULED",
    rating: null,
    verdict: null,
    feedbackNotes: null,
    remarks: "Revise graph algorithms, dynamic programming, and OOP paradigms."
  }
];

export const INITIAL_PLACEMENT_RECORDS = [
  {
    id: "plc_1",
    studentId: "stud_1",
    studentName: "Alex Mercer",
    rollNumber: "2022CSE042",
    branch: "CSE",
    cgpa: 9.15,
    email: "student@cpms.edu",
    phone: "+91 98123 45678",
    companyId: "comp_5",
    companyName: "TechCorp Labs",
    driveId: "drv_5",
    jobTitle: "Full-Stack Software Engineer",
    packageLpa: 14.5,
    baseSalary: 12.0,
    joiningBonus: 2.5,
    tier: "Core",
    workLocation: "Bengaluru (Hybrid)",
    offerDate: "2026-09-05",
    joiningDate: "2026-07-01",
    offerLetterUrl: "https://cpms.edu/docs/offers/alex_mercer_techcorp_offer.pdf",
    status: "ACCEPTED",
    verificationStatus: "VERIFIED",
    verifiedBy: "Prof. Sarah Jenkins",
    remarks: "Student digitally accepted offer letter. Verified by TPO."
  },
  {
    id: "plc_2",
    studentId: "stud_2",
    studentName: "Rahul Kumar",
    rollNumber: "2022CSE101",
    branch: "CSE",
    cgpa: 8.85,
    email: "rahul.kumar@cpms.edu",
    phone: "+91 98111 22334",
    companyId: "comp_1",
    companyName: "Google Cloud",
    driveId: "drv_1",
    jobTitle: "Cloud Solutions Engineer",
    packageLpa: 28.5,
    baseSalary: 22.0,
    joiningBonus: 6.5,
    tier: "Super Dream",
    workLocation: "Hyderabad",
    offerDate: "2026-09-06",
    joiningDate: "2026-08-01",
    offerLetterUrl: "https://cpms.edu/docs/offers/rahul_kumar_google_offer.pdf",
    status: "OFFERED",
    verificationStatus: "VERIFIED",
    verifiedBy: "Prof. Sarah Jenkins",
    remarks: "Super Dream corporate offer extended. Awaiting student decision."
  },
  {
    id: "plc_3",
    studentId: "stud_3",
    studentName: "Ananya Sen",
    rollNumber: "2022ECE205",
    branch: "ECE",
    cgpa: 8.40,
    email: "ananya.sen@cpms.edu",
    phone: "+91 98222 33445",
    companyId: "comp_4",
    companyName: "Goldman Sachs",
    driveId: "drv_4",
    jobTitle: "Quantitative Technology Analyst",
    packageLpa: 26.0,
    baseSalary: 20.0,
    joiningBonus: 6.0,
    tier: "Super Dream",
    workLocation: "Bengaluru",
    offerDate: "2026-08-28",
    joiningDate: "2026-07-15",
    offerLetterUrl: "https://cpms.edu/docs/offers/ananya_sen_goldman_offer.pdf",
    status: "ACCEPTED",
    verificationStatus: "VERIFIED",
    verifiedBy: "Prof. Sarah Jenkins",
    remarks: "Accepted Super Dream financial technology role."
  }
];

export const INITIAL_COMPANY_HISTORIES = [
  {
    companyId: "comp_1",
    companyName: "Google Cloud",
    tier: "Super Dream",
    industry: "Cloud & Artificial Intelligence",
    logo: "https://www.google.com/favicon.ico",
    headquarters: "Mountain View, CA / Bengaluru, India",
    primaryContact: "Campus Talent Acquisition (apac-campus@google.com)",
    pastDrives: [
      { academicYear: "2026-27", driveDate: "2026-09-24", roles: ["Cloud Solutions Engineer"], totalHired: 12, highestCtc: 28.5, avgCtc: 28.5 },
      { academicYear: "2025-26", driveDate: "2025-09-20", roles: ["Cloud Architect Associate", "DevOps Engineer"], totalHired: 14, highestCtc: 26.0, avgCtc: 24.5 },
      { academicYear: "2024-25", driveDate: "2024-10-02", roles: ["Software Engineer - Cloud"], totalHired: 10, highestCtc: 25.0, avgCtc: 23.0 }
    ],
    overallHired: 36,
    avgPackageLpa: 25.3,
    highestPackageLpa: 28.5
  },
  {
    companyId: "comp_2",
    companyName: "Microsoft",
    tier: "Super Dream",
    industry: "Enterprise Software & Cloud",
    logo: "https://www.microsoft.com/favicon.ico",
    headquarters: "Redmond, WA / Hyderabad, India",
    primaryContact: "University Relations (university-india@microsoft.com)",
    pastDrives: [
      { academicYear: "2026-27", driveDate: "2026-09-28", roles: ["SDE-1 (Azure & AI Copilot)"], totalHired: 15, highestCtc: 32.0, avgCtc: 30.5 },
      { academicYear: "2025-26", driveDate: "2025-09-25", roles: ["SDE-1", "Product Support Engineer"], totalHired: 16, highestCtc: 29.5, avgCtc: 28.0 },
      { academicYear: "2024-25", driveDate: "2024-09-30", roles: ["Associate Software Engineer"], totalHired: 11, highestCtc: 28.0, avgCtc: 26.5 }
    ],
    overallHired: 42,
    avgPackageLpa: 28.3,
    highestPackageLpa: 32.0
  },
  {
    companyId: "comp_3",
    companyName: "Amazon",
    tier: "Dream",
    industry: "E-Commerce & AWS Cloud",
    logo: "https://www.amazon.com/favicon.ico",
    headquarters: "Seattle, WA / Bengaluru, India",
    primaryContact: "Amazon Campus Recruiting (in-campus@amazon.com)",
    pastDrives: [
      { academicYear: "2026-27", driveDate: "2026-10-02", roles: ["Associate Software Engineer", "Support Engg"], totalHired: 20, highestCtc: 24.0, avgCtc: 21.0 },
      { academicYear: "2025-26", driveDate: "2025-10-05", roles: ["SDE Intern + FTE"], totalHired: 22, highestCtc: 22.5, avgCtc: 19.5 },
      { academicYear: "2024-25", driveDate: "2024-10-10", roles: ["SDE-1"], totalHired: 16, highestCtc: 20.0, avgCtc: 18.0 }
    ],
    overallHired: 58,
    avgPackageLpa: 19.5,
    highestPackageLpa: 24.0
  },
  {
    companyId: "comp_4",
    companyName: "Goldman Sachs",
    tier: "Super Dream",
    industry: "Fintech & Quantitative Finance",
    logo: "https://www.goldmansachs.com/favicon.ico",
    headquarters: "New York, NY / Bengaluru, India",
    primaryContact: "Campus Talent (gs-campus-india@gs.com)",
    pastDrives: [
      { academicYear: "2026-27", driveDate: "2026-10-05", roles: ["Quantitative Technology Analyst"], totalHired: 8, highestCtc: 26.0, avgCtc: 24.5 },
      { academicYear: "2025-26", driveDate: "2025-10-01", roles: ["Operations & Tech Analyst"], totalHired: 9, highestCtc: 24.0, avgCtc: 22.0 },
      { academicYear: "2024-25", driveDate: "2024-10-04", roles: ["Analyst"], totalHired: 7, highestCtc: 22.5, avgCtc: 21.0 }
    ],
    overallHired: 24,
    avgPackageLpa: 22.5,
    highestPackageLpa: 26.0
  },
  {
    companyId: "comp_5",
    companyName: "TechCorp Labs",
    tier: "Core",
    industry: "SaaS & Full-Stack Solutions",
    logo: "https://ui-avatars.com/api/?name=Tech+Corp&background=6366f1&color=fff",
    headquarters: "Pune / Hyderabad, India",
    primaryContact: "HR Recruitment (hiring@techcorp.io)",
    pastDrives: [
      { academicYear: "2026-27", driveDate: "2026-09-18", roles: ["Full-Stack Software Engineer"], totalHired: 30, highestCtc: 14.5, avgCtc: 12.0 },
      { academicYear: "2025-26", driveDate: "2025-09-12", roles: ["Backend Microservices Dev"], totalHired: 28, highestCtc: 13.0, avgCtc: 11.5 },
      { academicYear: "2024-25", driveDate: "2024-09-15", roles: ["Junior Software Engineer"], totalHired: 27, highestCtc: 12.0, avgCtc: 10.5 }
    ],
    overallHired: 85,
    avgPackageLpa: 11.3,
    highestPackageLpa: 14.5
  }
];

export const INITIAL_BRANCH_PERFORMANCE = [
  {
    branch: "Computer Science & Engineering (CSE)",
    shortCode: "CSE",
    totalStudents: 180,
    placedStudents: 174,
    placementRate: 96.6,
    averagePackageLpa: 21.8,
    highestPackageLpa: 32.0,
    topRecruiter: "Microsoft",
    dreamCount: 82,
    superDreamCount: 76,
    coreCount: 16
  },
  {
    branch: "Information Technology (IT)",
    shortCode: "IT",
    totalStudents: 120,
    placedStudents: 112,
    placementRate: 93.3,
    averagePackageLpa: 18.5,
    highestPackageLpa: 28.5,
    topRecruiter: "Google Cloud",
    dreamCount: 52,
    superDreamCount: 38,
    coreCount: 22
  },
  {
    branch: "Electronics & Communication (ECE)",
    shortCode: "ECE",
    totalStudents: 100,
    placedStudents: 88,
    placementRate: 88.0,
    averagePackageLpa: 15.2,
    highestPackageLpa: 26.0,
    topRecruiter: "Goldman Sachs",
    dreamCount: 40,
    superDreamCount: 22,
    coreCount: 26
  },
  {
    branch: "Electrical & Electronics (EEE)",
    shortCode: "EEE",
    totalStudents: 60,
    placedStudents: 48,
    placementRate: 80.0,
    averagePackageLpa: 12.8,
    highestPackageLpa: 24.0,
    topRecruiter: "Amazon",
    dreamCount: 20,
    superDreamCount: 10,
    coreCount: 18
  },
  {
    branch: "Mechanical Engineering (ME)",
    shortCode: "ME",
    totalStudents: 60,
    placedStudents: 42,
    placementRate: 70.0,
    averagePackageLpa: 9.6,
    highestPackageLpa: 16.0,
    topRecruiter: "TechCorp Labs",
    dreamCount: 14,
    superDreamCount: 4,
    coreCount: 24
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif_1",
    title: "Interview Scheduled: Google Cloud",
    message: "Technical System Design Round is scheduled for Alex Mercer on 12th Sep at 02:30 PM.",
    time: "10 mins ago",
    isRead: false,
    type: "interview"
  },
  {
    id: "notif_2",
    title: "New Recruitment Drive Live",
    message: "Microsoft SDE-1 Drive (32 LPA) is now accepting applications. Deadline: 22nd Sep.",
    time: "2 hours ago",
    isRead: false,
    type: "drive"
  },
  {
    id: "notif_3",
    title: "Profile Verified Successfully",
    message: "Placement Officer Sarah Jenkins verified your academic credentials and CGPA.",
    time: "1 day ago",
    isRead: true,
    type: "verification"
  }
];

