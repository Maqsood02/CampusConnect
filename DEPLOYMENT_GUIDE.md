# CPMS Deployment & Setup Guide (Java + MongoDB + React on Vercel)

This guide walks you through running the modernized **College Placement Management System (CPMS)** both locally and deploying to production.

---

## 1. Architectural Overview

- **Frontend**: React 18 + Vite with custom Glassmorphism design system, Tailwind CSS, Lucide Icons, and dynamic animations.
  - Hosted on: **Vercel**
  - Path: `frontend/`
- **Backend**: Java 17+ Spring Boot 3.3.4 REST Microservices with Spring Data MongoDB, BCrypt, and JJWT.
  - Path: `backend/`
- **Database**: **MongoDB** (Local or MongoDB Atlas cluster)
- **Role Architecture**:
  - **Student**: Profile card in dashboard, academic records, portfolio builder, automated eligibility verification, and job applications.
  - **Placement Officer**: Master placement operations (Posting recruitment drives, managing applicant pipelines, shortlisting/selecting/rejecting candidates, scheduling interview rounds, verifying scholars).
  - **Administrator**: System audit trails, user management, and broadcast alerts.

---

## 2. Running Locally

### A. Frontend (React + Vite)
1. Open PowerShell or Terminal in the project root:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. Open your browser at:
   ```
   http://localhost:5173
   ```
   *The React frontend features an interactive 1-click **Persona Switcher** banner at the top, allowing instant testing as Student, Placement Officer, or Administrator.*

---

### B. Backend (Java Spring Boot + MongoDB)
1. Ensure Java 17+ is installed (`java -version`).
2. Have MongoDB running locally at `mongodb://localhost:27017/cpms` or obtain a free MongoDB Atlas connection string.
3. If using MongoDB Atlas, set the environment variable:
   ```powershell
   $env:MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/cpms?retryWrites=true&w=majority"
   ```
4. Start the Spring Boot backend:
   ```powershell
   cd backend
   .\mvnw.cmd spring-boot:run
   ```
5. The REST APIs and health check will be live at:
   ```
   http://localhost:8080/api/health
   ```
   *The backend's `DataSeeder.java` automatically initializes demo data on first boot if the database is empty.*

---

## 3. Deploying to Vercel (Frontend)

The repository root is preconfigured with `vercel.json`:
```json
{
  "version": 2,
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Steps to Deploy to Vercel:
1. Push your repository to GitHub.
2. Log into [Vercel Dashboard](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. Leave root directory as `./` (or select `frontend`). Vercel will automatically detect `vercel.json` and build the production bundle (`dist/`).
5. (Optional) In Vercel Project Settings &gt; Environment Variables, add:
   - `VITE_API_URL`: Your deployed Java backend URL (e.g., `https://cpms-backend.up.railway.app`).
6. Click **Deploy**. Your Glassmorphic React app is live worldwide with global CDN edge caching!

---

## 4. Deploying Java Backend to the Cloud

Because Vercel is designed for Node/Edge/Frontend runtimes, long-running Java Spring Boot microservices are deployed to platforms like **Railway, Render, Fly.io, or AWS**:

### Quick Deploy on Railway or Render:
1. Create a free account on [Railway.app](https://railway.app) or [Render.com](https://render.com).
2. Connect your GitHub repository.
3. Set **Root Directory** to `backend`.
4. Add Environment Variable:
   - `MONGODB_URI`: `mongodb+srv://<user>:<password>@cluster0.mongodb.net/cpms?retryWrites=true&w=majority`
5. Railway / Render will automatically detect Maven and build:
   ```bash
   mvn clean package -DskipTests
   java -jar target/backend-2.0.0.jar
   ```
6. Copy your generated public backend URL (e.g., `https://cpms-backend.up.railway.app`) and link it to your frontend!

---

## 5. Default Demo Credentials

| Role | Email | Password | Features Accessible |
| :--- | :--- | :--- | :--- |
| **Student** | `student@cpms.edu` | `Password123!` | Student Profile Card, Job Board, 1-Click Apply, Portfolio, Interviews |
| **Placement Officer** | `officer@cpms.edu` | `Password123!` | Officer Profile Card, Post Drives, Candidate Pipeline, Schedule Interviews, Verifications |
| **Administrator** | `admin@cpms.edu` | `Password123!` | Admin Profile Card, Security Audit Trail, User Directory, Broadcast Dispatcher |
