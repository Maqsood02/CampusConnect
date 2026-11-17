# CampusConnect (CPMS) — Comprehensive User Manual & Operations Guide

**System Name:** CampusConnect — Smart College Placement Management System  
**Software Release:** Version 2.0.0 (Production Edition)  
**Portal Web URL:** `http://localhost:5173/`  
**API Gateway URL:** `http://localhost:8088/`  
**Technical Document Classification:** Institutional Operations & User Guide  

---

## 1. Welcome to CampusConnect

**CampusConnect** is a centralized, institutional-grade digital placement automation platform engineered to streamline campus recruitment drives, student portfolio management, automated academic eligibility verification, multi-stage interview scheduling, and enterprise governance.

### Platform User Roles
1. **Student Scholar:** Undergraduate & postgraduate students registered for institutional placement drives.
2. **Placement Officer (TPO):** Departmental coordinators and Training & Placement Cell officers managing corporate drives and interviews.
3. **Institutional Administrator:** Dean's office, registrars, and IT directors overseeing institutional placement compliance, audit logs, and officer provisioning.

---

## 2. System Access & Default Credentials

| Role | Username / Institutional Email | Default Password | Clearance Level |
| :--- | :--- | :--- | :--- |
| **System Administrator** | `admin@cpms` *(or `admin@cpms.edu`)* | `Cpms@123456` | Level 3 — Full Governance & Provisioning |
| **Placement Officer** | `officer@cpms.edu` | `Cpms@123456` | Level 2 — Drive Management & Interview Operations |
| **Student Scholar** | Registered Student Email | Created upon OTP Verification | Level 1 — Application & Portfolio Submission |

> [!TIP]
> On the Sign-In screen, the **Default System Credentials** card includes 1-click **Auto-fill** buttons for Administrator and Placement Officer accounts for instant access.

---

## 3. Student Scholar Workflow Guide

### 3.1. Account Registration via Email OTP
1. Open your web browser and navigate to the portal: `http://localhost:5173/`.
2. On the Sign In screen, click **"Register with Email OTP"** at the bottom.
3. Enter your **Full Legal Name** and your active **Institutional Email Address** (e.g., `student@university.edu`).
4. Click the **"Send OTP"** button. The system generates a cryptographic 6-digit verification code and dispatches it directly to your email inbox via Gmail SMTP.
5. Check your inbox for the email titled: `🔐 CampusConnect Verification Code`.
6. Enter the 6-digit code in the **Verification Code** input and click **"Verify OTP"**.
7. Once verified with a green badge, enter your secure Password, Department, Roll Number, CGPA, and Graduation Year.
8. Click **"Complete Student Registration"** to enter the portal immediately.

### 3.2. Student Dashboard Overview
Once signed in, the Student Dashboard presents:
- **Placement Readiness Index:** Live score based on profile completion, verified skills, and academic standing.
- **Active Campus Drives:** Corporate recruitment drives currently open for registration.
- **Application Status Tracker:** Real-time visual timeline showing current status (*Applied → Shortlisted → Technical Assessment → HR Interview → Selected*).
- **Upcoming Interviews:** Date, time, mode (Virtual/In-person), and meeting links for scheduled evaluation rounds.

### 3.3. Applying to Placement Drives
1. Navigate to the **"Placement Drives"** tab from the top navigation bar.
2. Review company profiles, job designations, compensation packages (CTC), and job locations.
3. Check the **Eligibility Indicator**:
   - **Eligible (Green Badge):** Your CGPA and branch satisfy corporate criteria. Click **"1-Click Apply"** to submit your resume and profile.
   - **Ineligible (Amber Badge):** The criteria breakdown displays why your profile does not meet minimum cutoffs.
4. Upon application submission, an automated confirmation email is dispatched to your registered address.

### 3.4. Updating Your Verified Portfolio
1. Click **"My Portfolio"** in the navigation header.
2. Add your GitHub URL, LinkedIn profile, verified technical skills, project portfolio, and certifications.
3. Upload or update your master PDF resume. This resume is automatically linked when you apply to new corporate drives.

---

## 4. Placement Officer (TPO) Operations Guide

### 4.1. Account Access & Security
Placement Officer accounts are **not publicly registerable**. They are securely provisioned exclusively by Institutional Administrators. 
1. When your account is provisioned by the Administrator, you will receive an official onboarding email titled: `👔 Welcome to CampusConnect: Placement Officer Account Provisioned`.
2. This email contains your official login email, temporary password, officer identification code, and direct login URL.
3. Navigate to `http://localhost:5173/` and sign in using your provided credentials.

### 4.2. Publishing a Corporate Recruitment Drive
1. On the Officer Portal dashboard, click **"Create Placement Drive"**.
2. Complete the drive creation form:
   - **Company Details:** Corporate Name, Industry Domain, Website URL, Recruiter Contact.
   - **Job Profile:** Role Title (e.g., *Full Stack Cloud Engineer*), Job Description, Location, and Work Mode.
   - **Compensation Package:** CTC Package (LPA), Base Salary, Performance Bonuses.
   - **Eligibility Criteria:** Minimum Cutoff CGPA, Maximum Active Backlogs, Eligible Engineering/Management Branches, and Eligible Passing Batches.
   - **Important Dates:** Application Deadline, Online Assessment Date, Interview Schedule.
3. Click **"Publish Placement Drive"**. The drive is immediately live in the system catalog.

### 4.3. Automated Student Eligibility & Notification
1. Open the created drive details.
2. Click **"Evaluate Candidate Pool"**. The engine cross-references all registered students against the drive's cutoff criteria.
3. Click **"Notify Eligible Students"**. The system dispatches personalized email invitations via Gmail SMTP to every qualifying student in the university, alerting them to apply before the deadline.

### 4.4. Reviewing Applicants & Shortlisting
1. Navigate to the **"Applicants"** tab within the drive.
2. Filter candidates by Department, CGPA rank, or verified technical skill badges.
3. Review candidate portfolios and resumes with single-click preview.
4. Change student application status:
   - Mark as **Shortlisted** for technical screening.
   - Mark as **Rejected** with constructive feedback notes.
5. Every status modification automatically triggers a real-time email notification to the candidate's registered inbox.

### 4.5. Scheduling Multi-Round Interviews
1. From the applicant list, select shortlisted candidates.
2. Click **"Schedule Interview Round"**.
3. Choose the round type: *Online Coding Assessment*, *Technical Interview*, or *HR Leadership Round*.
4. Input Date, Time, Duration, Evaluator Name, and Virtual Meeting URL (Google Meet / Zoom / Microsoft Teams).
5. Click **"Dispatch Interview Call Letters"**. Students receive calendar invitations and notification emails.

---

## 5. Institutional Administrator Governance Guide

### 5.1. Administrator Authentication
1. Navigate to `http://localhost:5173/`.
2. Click the **👑 Admin "Auto-fill"** chip under *Default System Credentials*, or type:
   - **Email:** `admin@cpms`
   - **Password:** `Cpms@123456`
3. Click **"Sign In to Portal"**. The system verifies your credentials against the backend Spring Security tier and issues an administrative JWT session.

### 5.2. Institutional Governance Dashboard
The Administrator Dashboard provides high-level organizational analytics:
- **Total Campus Placements:** Overall placement percentage across departments.
- **Highest & Average CTC:** Tier-1 corporate compensation metrics.
- **Active Corporate Recruiters:** Total active multinational and startup hiring partners.
- **Departmental Comparison:** Engineering and management placement ratios.

### 5.3. Provisioning Placement Officers
1. In the Administrator navigation bar, click **"Admin Console"**.
2. In the System Account Directory, click **"Provision Placement Officer"**.
3. In the modal dialog, enter:
   - **Officer Full Legal Name:** e.g., *Dr. Rajesh Kumar*
   - **Official Institutional Email:** e.g., *tpo.cse@cpms.ac.in*
   - **Temporary Password:** Initial secure password (minimum 6 characters).
   - **Staff / Officer ID Code:** e.g., *TPO-HQ-02*
   - **Departmental Cell:** e.g., *Training & Placement Cell — School of Engineering*
   - **Contact Phone:** Officer mobile number.
4. Click **"Provision Officer & Send Credentials"**.
5. **System Actions Executed:**
   - Account created in database with `ROLE_OFFICER`.
   - Linked `PlacementOfficer` profile initialized.
   - An immutable audit log entry recorded.
   - A secure HTML credentials email dispatched via Gmail SMTP to the officer's email address.

### 5.4. Compliance, Audit Logs & Security Monitoring
1. Scroll to the **"Institutional Audit & Security Logs"** table on the Admin Console.
2. Every significant action is tracked with:
   - **Action Name:** e.g., `OFFICER_ACCOUNT_PROVISIONED`, `STUDENT_ELIGIBILITY_VERIFIED`, `SECURITY_LOGIN_SUCCESS`.
   - **Actor:** User institutional email.
   - **Client IP Address:** Network IP.
   - **Timestamp:** High-precision execution time.
   - **Severity Level:** `INFO`, `NOTICE`, `SYSTEM`, or `WARNING`.

---

## 6. Frequently Asked Questions (FAQ) & Troubleshooting

### Q1: I am not receiving the 6-digit OTP code on my email. What should I check?
- Ensure your email address was typed correctly without leading or trailing spaces.
- Check your Gmail **Spam** or **Promotions** folder; automated system emails may occasionally land there depending on spam filter settings.
- The system enforces a 60-second cooldown between OTP requests. If needed, click **"Resend Code"** after the timer expires.

### Q2: How can a Placement Officer account be created?
- Placement Officer accounts cannot be created via the public registration screen.
- Contact your Institutional Administrator. The Administrator will provision your account through the **Admin Console** at `http://localhost:5173/` and system will email you your temporary login credentials.

### Q3: What are the default credentials to test the administrator account?
- **Username / Email:** `admin@cpms` *(or `admin@cpms.edu`)*
- **Password:** `Cpms@123456`
- Alternatively, click the **Auto-fill** chip on the sign-in screen.

### Q4: What happens if MongoDB Atlas has a network timeout or IP restriction?
- CampusConnect includes an embedded zero-downtime MongoDB engine (`mongo-java-server`).
- If Atlas is unreachable, the server automatically starts an in-memory database on port `51976` and seeds all default administrative accounts and placement records seamlessly.
