# 🎓 CampusConnect (College Placement Management System - CPMS)

[![Spring Boot 3](https://img.shields.io/badge/Spring%20Boot-3.3.4-brightgreen.svg?logo=springboot)](https://spring.io/projects/spring-boot)
[![Java 17](https://img.shields.io/badge/Java-17%2B-orange.svg?logo=openjdk)](https://openjdk.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20%2F%20Local-47A248.svg?logo=mongodb)](https://www.mongodb.com/)
[![React 18](https://img.shields.io/badge/React-18.3.1-61DAFB.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An enterprise-grade, modern full-stack web application designed to automate, streamline, and standardize campus recruitment workflows for educational institutions, placement cells (TPO), recruiting companies, and students.

---

## 🌟 Key Features

### 👨‍🎓 Student Portal
- **Profile & Resume Management**: Complete academic profile (Roll number, CGPA, Branch, Backlogs, Graduation year) and portfolio showcase (Skills, Projects, Certifications).
- **Automated Eligibility Engine**: Real-time evaluation against company drive criteria (min CGPA, allowed departments, max backlogs).
- **1-Click Applications**: Seamless application workflow with live status tracking (`APPLIED` ➔ `SHORTLISTED` ➔ `INTERVIEW_SCHEDULED` ➔ `SELECTED` / `REJECTED`).
- **Interactive Interview Schedules**: View interview links, scheduled dates, and rounds.

### 🏢 Placement Officer (TPO) & Recruiter Portal
- **Drive Lifecycle Management**: Post and schedule recruitment drives with detailed eligibility criteria, packages (CTC), and job roles.
- **Applicant Pipeline**: Review candidates, filter applicants by criteria, download resumes, and manage recruitment stages.
- **Interview Scheduling**: Schedule multi-round interviews with meeting URLs and notify candidates.
- **Offer Letters & Decisions**: Mark final selections, generate offer letters, and send automated email confirmations.

### 🛡️ Admin & Analytics
- **Role-Based Access Control (RBAC)**: Secure access tailored for Student, Placement Officer, Recruiter, and Administrator.
- **Placement Insights**: Key metrics on total drives, candidate placement percentage, top recruiting companies, and package distributions.
- **System Audit Logs**: Track activity and application records for accountability.

---

## 🏗️ Architecture & Tech Stack

```
CampusConnect (CPMS)
├── backend/          # Java 17 + Spring Boot 3 REST API microservices
│   ├── src/main/java # Controller, Service, Model, Repository layers
│   ├── src/main/resources/application.yml # Spring Boot configuration
│   └── pom.xml       # Maven dependencies
├── frontend/         # React 18 + Vite SPA with Glassmorphic UI
│   ├── src/          # Components, Pages, State, API client
│   ├── tailwind.config.js # Custom design tokens & themes
│   └── package.json  # NPM dependencies
├── docs/             # Software architecture & API specifications
├── static/           # Static assets, styles, and uploads
└── DEPLOYMENT_GUIDE.md # Production deployment walkthrough
```

- **Backend**: Java 17+, Spring Boot 3.3.4, Spring Security, Spring Data MongoDB, JJWT 0.12.6, Spring Mail
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, Glassmorphic Design System, Canvas Confetti
- **Database**: MongoDB (Local or MongoDB Atlas Cloud)
- **Authentication**: Stateless JSON Web Tokens (JWT HMAC-SHA256)

---

## 🚀 Getting Started Locally

### Prerequisites
- **Java**: JDK 17 or higher (`java -version`)
- **Node.js**: v18 or higher (`node -v`)
- **MongoDB**: Local MongoDB instance or free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster

---

### 1. Backend Setup (Spring Boot)

1. Open a terminal in the root directory and navigate to `backend`:
   ```bash
   cd backend
   ```
2. Configure environment variables (or copy `.env.example` to `.env` in root):
   ```bash
   # On Windows (PowerShell)
   $env:MONGODB_URI="mongodb://localhost:27017/cpms"
   $env:SERVER_PORT=8088

   # On Linux / macOS (Bash)
   export MONGODB_URI="mongodb://localhost:27017/cpms"
   export SERVER_PORT=8088
   ```
3. Run the Spring Boot server using Maven:
   ```bash
   # Windows
   .\mvnw.cmd spring-boot:run

   # Linux / macOS
   ./mvnw spring-boot:run
   ```
4. Backend will start at: `http://localhost:8088`

---

### 2. Frontend Setup (React + Vite)

1. Open a new terminal and navigate to `frontend`:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser at: `http://localhost:5173`

> 💡 **Tip**: The frontend includes a top persona switcher banner allowing instant testing and demonstration across Student, TPO, and Admin roles.

---

## 🌐 Production Deployment

- **Frontend**: One-click deployment to **Vercel** with `vercel.json` routing configuration included.
- **Backend**: Containerizable via Docker or runnable as a standalone Spring Boot executable JAR on AWS, Render, Railway, or VPS.
- **Database**: Managed **MongoDB Atlas** cluster with automated indexing.

For comprehensive production deployment instructions, refer to [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).

---

## 📄 Documentation

- [System Architecture](docs/System_Architecture.md)
- [API Documentation](docs/API_Documentation.md)
- [Comprehensive Software Documentation](docs/CPMS_Comprehensive_Software_Documentation.md)
- [Deployment Guide](DEPLOYMENT_GUIDE.md)

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.