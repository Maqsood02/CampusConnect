import React from 'react';
import StudentDashboardView from './dashboards/StudentDashboardView';
import OfficerDashboardView from './dashboards/OfficerDashboardView';
import AdminDashboardView from './dashboards/AdminDashboardView';

export default function DashboardView({
  currentUser,
  drives = [],
  applications = [],
  interviews = [],
  students = [],
  analytics,
  onNavigate,
  onOpenPostDrive,
  onOpenScheduleInterview,
  onOpenFullProfile,
  onSelectDriveForApply
}) {
  const role = currentUser?.role || 'Student';

  if (role === 'Administrator') {
    return (
      <AdminDashboardView
        currentUser={currentUser}
        drives={drives}
        applications={applications}
        students={students}
        analytics={analytics}
        onNavigate={onNavigate}
        onOpenFullProfile={onOpenFullProfile}
      />
    );
  }

  if (role === 'Placement Officer') {
    return (
      <OfficerDashboardView
        currentUser={currentUser}
        drives={drives}
        applications={applications}
        interviews={interviews}
        students={students}
        analytics={analytics}
        onNavigate={onNavigate}
        onOpenPostDrive={onOpenPostDrive}
        onOpenScheduleInterview={onOpenScheduleInterview}
        onOpenFullProfile={onOpenFullProfile}
      />
    );
  }

  // Default: Student Dashboard
  return (
    <StudentDashboardView
      currentUser={currentUser}
      drives={drives}
      applications={applications}
      interviews={interviews}
      analytics={analytics}
      onNavigate={onNavigate}
      onOpenFullProfile={onOpenFullProfile}
      onSelectDriveForApply={onSelectDriveForApply}
    />
  );
}
