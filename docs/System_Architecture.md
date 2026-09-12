# System Architecture & Technical Specifications - CPMS

## 1. Architectural Overview
The **College Placement Management System (CPMS)** is designed using a **RESTful Service Architecture** with clean isolation between the client layer (SPA Frontend) and application layer (Flask Micro-framework).

```
+-------------------------------------------------------------------------+
|                              CLIENT LAYER                               |
|        Browser Single Page App (HTML5, Modern CSS, ES6 JS, Chart.js)     |
+------------------------------------v------------------------------------+
                                     | HTTPS / JSON
+------------------------------------v------------------------------------+
|                            APPLICATION LAYER                            |
| ┌──────────────────────┐ ┌─────────────────────┐ ┌────────────────────┐ |
| │ JWT Auth & Security  │ │ Eligibility Engine  │ │ RBAC Middleware    │ |
| └──────────┬───────────┘ └──────────┬──────────┘ └─────────┬──────────┘ |
| ┌──────────▼────────────────────────▼──────────────────────▼──────────┐ |
| │                       Flask Controllers & API                       │ |
| └───────────────────────────────────┬─────────────────────────────────┘ |
+-------------------------------------v-----------------------------------+
                                      | SQLite / PostgreSQL
+-------------------------------------v-----------------------------------+
|                             DATABASE LAYER                              |
|   Users | Students | Companies | Drives | Applications | Placements     |
+-------------------------------------------------------------------------+
```

## 2. Key Modules & Subsystems

### 2.1 Security & RBAC Guard
- Implements JWT (JSON Web Tokens) with 24-hour expiration.
- Enforces strict role permission checks across:
  - `Administrator`: Full access to users, system logs, settings.
  - `Placement Officer`: Drives approval, application shortlisting, interview scheduling, analytics export.
  - `Company Representative`: Drive posting, applicant evaluation.
  - `Student`: Profile management, resume upload, eligible drive application, interview tracking.

### 2.2 Automated Eligibility Verification Subsystem
The system contains an in-memory rule engine evaluating:
$$\text{IsEligible} = (\text{CGPA} \ge \text{MinCGPA}) \land (\text{Branch} \in \text{AllowedBranches}) \land (\text{Backlogs} \le \text{MaxBacklogs}) \land (\text{GradYear} = \text{TargetYear})$$

## 3. Database Schema (3NF)
Normalized database structure minimizing redundancy across 16 tables with foreign keys and index strategies.
