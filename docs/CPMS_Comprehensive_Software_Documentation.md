# College Placement Management System (CPMS)
## Complete Software Requirements Specification, System Architecture & Database Design Document

---

### Executive Summary
The **College Placement Management System (CPMS)** is an end-to-end, web-based enterprise web application designed to automate, streamline, and standardize campus recruitment operations within educational institutions. The system enables students to manage academic profiles and portfolios, allows recruiting companies to publish recruitment drives with strict eligibility parameters, provides placement officers with screening and interview scheduling workflows, and offers administrators comprehensive analytical reports and security audit logs.

---

## 1. System Overview & Problem Statement

### 1.1 Problem Statement
Traditional campus placement procedures rely heavily on manual spreadsheets, paper resumes, manual CGPA verification, and informal communication channels. This manual workflow suffers from:
- Inefficient eligibility verification leading to human error or illegal applications.
- Difficulty tracking candidate progress across multi-round interviews.
- Lack of centralized placement statistics and analytical visualization.
- Data insecurity and absence of audit logging for administrative tracking.

### 1.2 System Objectives
- **Automated Screening Engine**: Validate student eligibility dynamically against minimum CGPA, allowed academic branches, active backlogs, and target graduation years.
- **Role-Based Security**: Provide customized workspaces for Administrator, Placement Officer, Student, and Company Representative roles with JWT authentication.
- **Recruitment Lifecycle Management**: Manage recruitment drive publishing, candidate shortlisting, interview slot scheduling, selection status updates, and placement record maintenance.
- **Reporting & Data Analytics**: Render dynamic KPI statistics, branch placement charts (Chart.js), hiring distribution trends, and export placement rosters in CSV format.

---

## 2. User Roles & Access Control (RBAC) Matrix

The system enforces strict Role-Based Access Control (RBAC) across API endpoints and UI tab components:

| Feature / Action | Administrator | Placement Officer | Student | Company Representative |
| :--- | :---: | :---: | :---: | :---: |
| **Manage Own Academic Profile & Portfolio** | ❌ | ❌ | ✅ | ❌ |
| **Upload PDF Resume** | ❌ | ❌ | ✅ | ❌ |
| **Apply for Eligible Recruitment Drives** | ❌ | ❌ | ✅ | ❌ |
| **Post Recruitment Drive & Eligibility Rules** | ✅ | ✅ | ❌ | ✅ (For Own Company) |
| **Verify Student Academic Profiles** | ✅ | ✅ | ❌ | ❌ |
| **Approve / Verify Recruiting Partners** | ✅ | ✅ | ❌ | ❌ |
| **Approve Recruitment Drives** | ✅ | ✅ | ❌ | ❌ |
| **Shortlist / Select / Reject Candidates** | ✅ | ✅ | ❌ | ✅ (For Own Drives) |
| **Schedule Virtual / Physical Interview Rounds**| ✅ | ✅ | ❌ | ✅ (For Own Drives) |
| **Export Placement Roster (CSV)** | ✅ | ✅ | ❌ | ❌ |
| **View Audit Logs & System Activity** | ✅ | ❌ | ❌ | ❌ |

---

## 3. Software Requirements Specification (SRS)

### 3.1 Functional Requirements

#### Module 1: User Authentication & Security
- **FR-1.1**: The system shall allow users to register with a unique email address, password, full name, and selected role.
- **FR-1.2**: Passwords shall be securely hashed using Werkzeug security (`pbkdf2:sha256` or equivalent) before storage.
- **FR-1.3**: Upon successful login, the system shall issue a signed JSON Web Token (JWT) with a 24-hour expiration.
- **FR-1.4**: All API endpoints shall validate the JWT header (`Authorization: Bearer <token>`) and enforce role permissions using the `@token_required(allowed_roles=[...])` decorator.

#### Module 2: Student Profile & Portfolio Management
- **FR-2.1**: Students shall maintain academic parameters: Roll Number, Branch (CSE, ECE, EEE, ME, IT, CE), CGPA (0.00 - 10.00), Graduation Year, and Active Backlogs count.
- **FR-2.2**: Students shall manage professional portfolio records: Technical Skills (with proficiency levels), Certifications, Academic Projects, and Internships.
- **FR-2.3**: Students shall upload official resume files in PDF format, stored securely in the uploads directory with a unique URL path.

#### Module 3: Recruitment Drive Management
- **FR-3.1**: Company Representatives, Placement Officers, and Administrators shall publish recruitment drives specifying Job Title, Job Description, Salary Package (LPA), Location, Drive Date, and Application Deadline.
- **FR-3.2**: Each drive must include an Eligibility Criteria record defining Minimum CGPA, Allowed Branches (comma-separated), Maximum Backlogs Permitted, Target Graduation Year, and Required Skills.

#### Module 4: Automatic Eligibility Verification Engine
- **FR-4.1**: When a student views or applies for a recruitment drive, the system shall execute an in-memory rule engine evaluating:
  $$\text{IsEligible} = (\text{Student CGPA} \ge \text{Drive Min CGPA}) \land (\text{Student Branch} \in \text{Allowed Branches}) \land (\text{Student Backlogs} \le \text{Max Backlogs}) \land (\text{Student Grad Year} == \text{Target Grad Year})$$
- **FR-4.2**: If a student is ineligible, the system shall block the application submission and return detailed feedback reasons.

#### Module 5: Applications & Interview Workflow
- **FR-5.1**: Eligible students can submit job applications for active recruitment drives.
- **FR-5.2**: Officers and Companies can transition application statuses: `APPLIED` $\rightarrow$ `SHORTLISTED` $\rightarrow$ `SELECTED` / `REJECTED`.
- **FR-5.3**: Officers and Companies can schedule interview rounds (Round Name, Scheduled Time, Virtual Meet Link/Location) for shortlisted candidates.
- **FR-5.4**: When an application status updates to `SELECTED`, the system shall automatically insert a record into the `placements` table with package details.

#### Module 6: Reporting & Analytics
- **FR-6.1**: The system shall compute placement summary metrics: Total Candidates, Recruiting Partners Count, Active Drives Count, Placed Candidates Count, Overall Placement Percentage %, Highest Package (LPA), and Average Package (LPA).
- **FR-6.2**: The system shall generate visual charts (Chart.js) for Branch-wise Placements and Company Hiring Distribution.
- **FR-6.3**: Authorized Officers and Admins can export the placement roster as a downloadable CSV file (`/api/reports/export/csv`).

---

### 3.2 Non-Functional Requirements
- **NFR-1 (Security)**: All database queries must use parameterized SQL statements (`?` placeholders) to prevent SQL Injection attacks.
- **NFR-2 (Performance)**: API endpoint responses for drive queries and analytics calculations shall return in under 200ms for up to 10,000 candidate records.
- **NFR-3 (Reliability & Data Integrity)**: Database foreign keys shall be explicitly enforced (`PRAGMA foreign_keys = ON;`) with cascading delete rules to maintain referential integrity.
- **NFR-4 (Auditability)**: All state-modifying actions (Login, Registration, Profile Updates, Drive Posting, Applications, Status Changes, Officer Verifications) shall log user ID, action name, IP address, and timestamp to the `audit_logs` table.
- **NFR-5 (Usability & Responsiveness)**: The interface shall adopt a responsive flex/grid layout matching institutional standards across desktop, tablet, and mobile displays.

---

## 4. System Architecture Design

### 4.1 Multi-Tier Architecture Diagram
```
+-----------------------------------------------------------------------------------+
|                                  CLIENT TIER                                      |
|        Single-Page Application (HTML5, Modern CSS, ES6 JS, Chart.js)              |
+----------------------------------------v------------------------------------------+
                                         | HTTPS / REST JSON Requests
+----------------------------------------v------------------------------------------+
|                                APPLICATION TIER                                   |
|   +--------------------------+ +------------------------+ +-------------------+   |
|   | JWT Auth & RBAC Security | | Eligibility Verification| | Security Audit Log|   |
|   +------------+-------------+ +-----------+------------+ +---------+---------+   |
|                |                           |                        |             |
|   +------------v---------------------------v------------------------v---------+   |
|   |                       Flask REST API Controllers                          |   |
|   +------------------------------------+--------------------------------------+   |
+----------------------------------------v------------------------------------------+
                                         | SQLite3 / PostgreSQL SQL Driver
+----------------------------------------v------------------------------------------+
|                                  DATABASE TIER                                    |
|   Users | Students | Companies | Drives | Eligibility | Applications | Placements |   |
+-----------------------------------------------------------------------------------+
```

---

## 5. Normalized Relational Database Schema (3NF)

### 5.1 Data Dictionary (16 Schema Tables)

#### Table 1: `roles`
| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `role_id` | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique role identifier |
| `role_name` | TEXT | NOT NULL, UNIQUE | Administrator, Placement Officer, Student, Company Representative |

#### Table 2: `users`
| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `user_id` | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique user identifier |
| `email` | TEXT | NOT NULL, UNIQUE | User login email address |
| `password_hash` | TEXT | NOT NULL | Werkzeug hashed password string |
| `role_id` | INTEGER | NOT NULL, FOREIGN KEY (roles) | Role identifier |
| `is_active` | INTEGER | DEFAULT 1 | Account status flag (1=Active, 0=Deactivated) |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Account creation timestamp |

#### Table 3: `students`
| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `student_id` | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique student identifier |
| `user_id` | INTEGER | NOT NULL, UNIQUE, FK (users) | User account linkage |
| `roll_number` | TEXT | NOT NULL, UNIQUE | Institutional roll number |
| `full_name` | TEXT | NOT NULL | Candidate full name |
| `branch` | TEXT | NOT NULL | Academic branch (CSE, ECE, ME, EEE, IT, CE) |
| `cgpa` | REAL | NOT NULL | Cumulative Grade Point Average (0.00 - 10.00) |
| `graduation_year` | INTEGER | NOT NULL | Target graduation year |
| `active_backlogs` | INTEGER | DEFAULT 0 | Count of active backlogs |
| `phone` | TEXT | NULLABLE | Phone contact number |
| `resume_url` | TEXT | NULLABLE | Path to uploaded PDF resume |
| `verification_status` | TEXT | DEFAULT 'PENDING' | PENDING, VERIFIED, or REJECTED |

#### Table 4: `companies`
| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `company_id` | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique company identifier |
| `user_id` | INTEGER | NOT NULL, UNIQUE, FK (users) | Corporate user account linkage |
| `company_name` | TEXT | NOT NULL | Corporate entity name |
| `website` | TEXT | NULLABLE | Corporate website URL |
| `industry` | TEXT | NULLABLE | Industry sector |
| `contact_person` | TEXT | NOT NULL | HR contact person name |
| `contact_email` | TEXT | NOT NULL | Contact email address |
| `approval_status` | TEXT | DEFAULT 'APPROVED' | PENDING, APPROVED, or REJECTED |

#### Table 5: `placement_officers`
| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `officer_id` | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique officer identifier |
| `user_id` | INTEGER | NOT NULL, UNIQUE, FK (users) | User account linkage |
| `full_name` | TEXT | NOT NULL | Officer full name |
| `department` | TEXT | NOT NULL | Department / Cell name |

#### Table 6: `skills` & Table 7: `student_skills`
- Junction table storing student technical skills (`student_id`, `skill_id`, `proficiency_level`).

#### Table 8: `certifications`, Table 9: `projects`, Table 10: `internships`
- Student portfolio tables linked to `student_id` with cascading delete rules.

#### Table 11: `recruitment_drives`
| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `drive_id` | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique drive identifier |
| `company_id` | INTEGER | NOT NULL, FK (companies) | Recruiting company linkage |
| `job_title` | TEXT | NOT NULL | Designation title |
| `job_description` | TEXT | NOT NULL | Full role summary |
| `package_lpa` | REAL | NOT NULL | Annual package offered in LPA |
| `location` | TEXT | NOT NULL | Job location |
| `drive_date` | TEXT | NOT NULL | Date of drive |
| `application_deadline` | TEXT | NOT NULL | Application deadline date |
| `status` | TEXT | DEFAULT 'APPROVED' | Drive approval status |

#### Table 12: `eligibility_criteria`
| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `criteria_id` | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique criteria identifier |
| `drive_id` | INTEGER | NOT NULL, UNIQUE, FK (drives)| Drive linkage |
| `min_cgpa` | REAL | DEFAULT 0.0 | Minimum CGPA threshold |
| `allowed_branches` | TEXT | NOT NULL | Comma-separated allowed branches |
| `max_backlogs` | INTEGER | DEFAULT 0 | Maximum backlogs allowed |
| `graduation_year` | INTEGER | NOT NULL | Target graduation year |

#### Table 13: `applications`
| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `application_id` | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique application identifier |
| `drive_id` | INTEGER | NOT NULL, FK (drives) | Target drive linkage |
| `student_id` | INTEGER | NOT NULL, FK (students) | Applying candidate linkage |
| `status` | TEXT | DEFAULT 'APPLIED' | APPLIED, SHORTLISTED, SELECTED, REJECTED |

#### Table 14: `interviews`, Table 15: `placements`, Table 16: `notifications`, Table 17: `audit_logs`
- Full tracking tables for candidate interview rounds, placement offer letters, system notifications, and security audit logs.

---

### 5.2 SQL DDL Definition (`schema.sql`)
```sql
CREATE TABLE roles (
    role_id INTEGER PRIMARY KEY AUTOINCREMENT,
    role_name TEXT NOT NULL UNIQUE
);

CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role_id INTEGER NOT NULL,
    is_active INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

CREATE TABLE students (
    student_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    roll_number TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    branch TEXT NOT NULL,
    cgpa REAL NOT NULL CHECK (cgpa >= 0.0 AND cgpa <= 10.0),
    graduation_year INTEGER NOT NULL,
    active_backlogs INTEGER DEFAULT 0,
    phone TEXT,
    resume_url TEXT,
    verification_status TEXT DEFAULT 'PENDING',
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE companies (
    company_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    company_name TEXT NOT NULL,
    website TEXT,
    industry TEXT,
    contact_person TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    phone TEXT,
    approval_status TEXT DEFAULT 'APPROVED',
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE recruitment_drives (
    drive_id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER NOT NULL,
    job_title TEXT NOT NULL,
    job_description TEXT NOT NULL,
    package_lpa REAL NOT NULL,
    location TEXT NOT NULL,
    drive_date TEXT NOT NULL,
    application_deadline TEXT NOT NULL,
    status TEXT DEFAULT 'APPROVED',
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE
);

CREATE TABLE eligibility_criteria (
    criteria_id INTEGER PRIMARY KEY AUTOINCREMENT,
    drive_id INTEGER NOT NULL UNIQUE,
    min_cgpa REAL DEFAULT 0.0,
    allowed_branches TEXT NOT NULL,
    max_backlogs INTEGER DEFAULT 0,
    graduation_year INTEGER NOT NULL,
    required_skills TEXT,
    FOREIGN KEY (drive_id) REFERENCES recruitment_drives(drive_id) ON DELETE CASCADE
);

CREATE TABLE applications (
    application_id INTEGER PRIMARY KEY AUTOINCREMENT,
    drive_id INTEGER NOT NULL,
    student_id INTEGER NOT NULL,
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'APPLIED',
    feedback TEXT,
    UNIQUE(drive_id, student_id),
    FOREIGN KEY (drive_id) REFERENCES recruitment_drives(drive_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
);

CREATE TABLE placements (
    placement_id INTEGER PRIMARY KEY AUTOINCREMENT,
    application_id INTEGER NOT NULL UNIQUE,
    student_id INTEGER NOT NULL,
    drive_id INTEGER NOT NULL,
    package_offered REAL NOT NULL,
    placement_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES applications(application_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (drive_id) REFERENCES recruitment_drives(drive_id)
);

CREATE TABLE audit_logs (
    log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    action TEXT NOT NULL,
    ip_address TEXT,
    details TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Performance Tuning Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_students_roll ON students(roll_number);
CREATE INDEX idx_drives_company ON recruitment_drives(company_id);
CREATE INDEX idx_apps_drive_student ON applications(drive_id, student_id);
```

---

## 6. REST API Endpoint Specifications

### 6.1 Authentication Endpoints
- `POST /api/auth/register`: Create user account & profile stub (`201 Created`).
- `POST /api/auth/login`: Authenticate user credentials & issue JWT token (`200 OK`).
- `GET /api/auth/me`: Retrieve current user profile and role details (`200 OK`).

### 6.2 Student Endpoints
- `GET /api/students/profile`: Fetch student academic stats & portfolio (`200 OK`).
- `PUT /api/students/profile`: Update academic details (CGPA, Branch, Backlogs) (`200 OK`).
- `POST /api/students/skills`: Add professional skill tag (`201 Created`).
- `POST /api/students/resume`: Upload PDF resume file (`200 OK`).

### 6.3 Recruitment Drive Endpoints
- `GET /api/drives`: List recruitment drives (Computes `is_eligible` and failure reasons for Student users) (`200 OK`).
- `POST /api/drives`: Publish recruitment drive & eligibility rules (`201 Created`).

### 6.4 Application & Interview Endpoints
- `POST /api/applications/apply`: Submit drive application with automated eligibility check (`201 Created`).
- `GET /api/applications`: Fetch applications roster filtered by role (`200 OK`).
- `PUT /api/applications/<id>/status`: Update application status (`SHORTLISTED`, `SELECTED`, `REJECTED`). Auto-inserts placement record upon `SELECTED` (`200 OK`).
- `POST /api/interviews/schedule`: Schedule interview round slot (`201 Created`).

### 6.5 Analytics & Reports Endpoints
- `GET /api/analytics/summary`: Return KPI counts, placement %, branch breakdown, and company hiring stats (`200 OK`).
- `GET /api/reports/export/csv`: Stream placement roster as downloadable CSV file (`200 OK`).
- `GET /api/admin/audit-logs`: Retrieve system activity audit logs (`200 OK`).

---

## 7. Deployment & Verification Guide

### 7.1 Local Quickstart
1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Initialize and seed test database:
   ```bash
   python seed.py
   ```
3. Run automated test suite:
   ```bash
   python -m unittest discover tests
   ```
4. Start development web server:
   ```bash
   python app.py
   ```
   Access application at `http://127.0.0.1:5000`.

### 7.2 Seeded Demo Credentials

| Role | Email Address | Password |
| :--- | :--- | :--- |
| **Administrator** | `admin@cpms.edu` | `Password123!` |
| **Placement Officer** | `officer@cpms.edu` | `Password123!` |
| **Student Representative** | `student.rahul@cpms.edu` | `Password123!` |
| **Company Representative** | `hr@techcorp.com` | `Password123!` |
