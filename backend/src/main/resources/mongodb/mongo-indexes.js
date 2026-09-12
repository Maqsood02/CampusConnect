/**
 * CPMS MongoDB Index Definitions
 * Ensures high-performance queries across students, drives, applications, and notifications.
 */

const dbName = "cpms";
const cpmsDb = db.getSiblingDB(dbName);

print(`[MongoDB Indexes] Applying indexes to '${dbName}'...`);

// Users
cpmsDb.users.createIndex({ email: 1 }, { unique: true, name: "idx_users_email_unique" });
cpmsDb.users.createIndex({ role: 1 }, { name: "idx_users_role" });

// Students
cpmsDb.students.createIndex({ userId: 1 }, { name: "idx_students_user_id" });
cpmsDb.students.createIndex({ rollNumber: 1 }, { unique: true, sparse: true, name: "idx_students_roll_unique" });
cpmsDb.students.createIndex({ branch: 1, cgpa: -1 }, { name: "idx_students_branch_cgpa" });
cpmsDb.students.createIndex({ verificationStatus: 1 }, { name: "idx_students_verification" });

// Placement Officers
cpmsDb.placement_officers.createIndex({ userId: 1 }, { name: "idx_officers_user_id" });
cpmsDb.placement_officers.createIndex({ email: 1 }, { name: "idx_officers_email" });

// Recruitment Drives
cpmsDb.recruitment_drives.createIndex({ status: 1 }, { name: "idx_drives_status" });
cpmsDb.recruitment_drives.createIndex({ companyName: 1 }, { name: "idx_drives_company" });
cpmsDb.recruitment_drives.createIndex({ deadline: 1 }, { name: "idx_drives_deadline" });
cpmsDb.recruitment_drives.createIndex({ "criteria.minCgpa": 1 }, { name: "idx_drives_min_cgpa" });

// Applications
cpmsDb.applications.createIndex({ studentId: 1, driveId: 1 }, { unique: true, name: "idx_applications_student_drive_unique" });
cpmsDb.applications.createIndex({ status: 1 }, { name: "idx_applications_status" });
cpmsDb.applications.createIndex({ studentId: 1, appliedAt: -1 }, { name: "idx_applications_student_applied" });

// Interviews
cpmsDb.interviews.createIndex({ studentId: 1 }, { name: "idx_interviews_student" });
cpmsDb.interviews.createIndex({ applicationId: 1 }, { name: "idx_interviews_app" });
cpmsDb.interviews.createIndex({ scheduledTime: 1 }, { name: "idx_interviews_time" });

// Notifications
cpmsDb.notifications.createIndex({ userId: 1, createdAt: -1 }, { name: "idx_notifications_user_created" });
cpmsDb.notifications.createIndex({ read: 1 }, { name: "idx_notifications_read" });

// Audit Logs
cpmsDb.audit_logs.createIndex({ timestamp: -1 }, { name: "idx_audit_logs_timestamp" });

print("[MongoDB Indexes] All collection indexes configured successfully.");
