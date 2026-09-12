/* ==============================================================================
   College Placement Management System (CPMS) - Dynamic Workspaces Coordinator
   Kanban Pipelines, Drives Explorer, Interviews Hub, Portfolio & Officer Desks
   ============================================================================== */

let branchChartObj = null;
let companyChartObj = null;
let rawDrivesCache = [];
let appViewMode = 'kanban'; // 'kanban' or 'table'
let currentStudentData = null;

// ==============================================================================
// 1. DASHBOARD & ANALYTICS
// ==============================================================================
async function loadAnalytics() {
  try {
    const res = await apiFetch('/api/analytics/summary');
    if (!res.ok) return;
    const data = await res.json();

    document.getElementById('statTotalStudents').textContent = data.total_students || 0;
    document.getElementById('statTotalCompanies').textContent = data.total_companies || 0;
    document.getElementById('statPlacementPct').textContent = `${data.placement_percentage || 0}%`;
    document.getElementById('statHighestPkg').textContent = `${data.highest_package || 0} LPA`;

    renderBranchAnalytics(data.branch_stats || []);
    renderCompanyAnalytics(data.company_stats || []);
    loadQuickInterviews();
    loadPortalRegistry();
  } catch (err) {
    console.error('Failed to load analytics:', err);
  }
}

// Registry Cache
let registryStudentsCache = [];
let registryCompaniesCache = [];
let registryDrivesCache = [];

async function loadPortalRegistry() {
  try {
    const res = await apiFetch('/api/portal/registry');
    if (!res.ok) return;
    const data = await res.json();
    
    registryStudentsCache = data.students || [];
    registryCompaniesCache = data.companies || [];
    registryDrivesCache = data.drives || [];

    const countStud = document.getElementById('countRegistryStudents');
    const countComp = document.getElementById('countRegistryCompanies');
    const countDrv = document.getElementById('countRegistryDrives');
    if (countStud) countStud.textContent = registryStudentsCache.length;
    if (countComp) countComp.textContent = registryCompaniesCache.length;
    if (countDrv) countDrv.textContent = registryDrivesCache.length;

    renderRegistryStudents(registryStudentsCache);
    renderRegistryCompanies(registryCompaniesCache);
    renderRegistryDrives(registryDrivesCache);
  } catch (err) {
    console.error('Failed to load portal registry:', err);
  }
}

function renderRegistryStudents(students) {
  const tbody = document.getElementById('portalStudentsRosterBody');
  if (!tbody) return;

  if (!students || students.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted py-4">No matching registered candidates found</td></tr>';
    return;
  }

  tbody.innerHTML = students.map(s => {
    const initial = (s.full_name || 'C').charAt(0).toUpperCase();
    const semText = s.semester || '7th Semester';
    const yearText = s.graduation_year ? `Class of ${s.graduation_year}` : 'Class of 2026';
    const emailStr = s.email || 'candidate@cpms.edu';
    
    return `
      <tr>
        <td>
          <div class="d-flex align-items-center gap-2.5">
            <div class="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center fw-bold fs-xs" style="width: 34px; height: 34px; flex-shrink: 0;">
              ${escapeHtml(initial)}
            </div>
            <div>
              <div class="fw-bold text-dark fs-sm">${escapeHtml(s.full_name || 'Candidate')}</div>
              <div class="fs-xs text-muted"><i class="fa-solid fa-phone me-1"></i>${escapeHtml(s.phone || 'N/A')}</div>
            </div>
          </div>
        </td>
        <td>
          <span class="badge bg-light text-dark border font-monospace fs-xs">${escapeHtml(s.roll_number || 'N/A')}</span>
        </td>
        <td>
          <a href="mailto:${escapeHtml(emailStr)}" class="text-decoration-none text-primary fw-semibold fs-xs">
            <i class="fa-regular fa-envelope me-1"></i>${escapeHtml(emailStr)}
          </a>
        </td>
        <td>
          <span class="badge bg-indigo-subtle text-primary border border-indigo-subtle px-2 py-1">${escapeHtml(s.branch || 'CSE')}</span>
        </td>
        <td>
          <div class="fw-semibold text-dark fs-xs">${escapeHtml(yearText)}</div>
          <div class="fs-xs text-muted"><i class="fa-solid fa-graduation-cap me-1 text-primary"></i>${escapeHtml(semText)}</div>
        </td>
        <td>
          <div class="d-flex align-items-center gap-2">
            <span class="fw-bold text-success fs-sm">${s.cgpa ? parseFloat(s.cgpa).toFixed(2) : '0.00'}</span>
            <span class="badge ${s.active_backlogs > 0 ? 'bg-danger' : 'bg-success-subtle text-success'} fs-xs">${s.active_backlogs || 0} Backlogs</span>
          </div>
        </td>
        <td>
          <span class="badge-status ${(s.verification_status || 'verified').toLowerCase()}">${escapeHtml(s.verification_status || 'VERIFIED')}</span>
        </td>
      </tr>
    `;
  }).join('');
}

function filterRegistryStudents() {
  const query = (document.getElementById('searchRegistryStudents')?.value || '').toLowerCase().trim();
  const branchFilter = document.getElementById('filterRegistryBranch')?.value || '';

  const filtered = registryStudentsCache.filter(s => {
    const matchesQuery = !query || 
      (s.full_name || '').toLowerCase().includes(query) ||
      (s.roll_number || '').toLowerCase().includes(query) ||
      (s.email || '').toLowerCase().includes(query) ||
      (s.branch || '').toLowerCase().includes(query) ||
      (s.semester || '').toLowerCase().includes(query);

    const matchesBranch = !branchFilter || (s.branch || '').toUpperCase() === branchFilter.toUpperCase();
    return matchesQuery && matchesBranch;
  });

  renderRegistryStudents(filtered);
}

function renderRegistryCompanies(companies) {
  const tbody = document.getElementById('portalCompaniesBody');
  if (!tbody) return;

  if (!companies || companies.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted py-4">No registered corporate partners found</td></tr>';
    return;
  }

  tbody.innerHTML = companies.map(c => {
    const initial = (c.company_name || 'C').charAt(0).toUpperCase();
    const driveCount = c.active_drives_count || 0;
    const driveTitles = (c.drive_titles || []).join(', ') || 'Campus Recruitment Drive';

    return `
      <tr>
        <td>
          <div class="d-flex align-items-center gap-2.5">
            <div class="rounded-circle bg-info-subtle text-info d-flex align-items-center justify-content-center fw-bold fs-xs" style="width: 34px; height: 34px; flex-shrink: 0;">
              ${escapeHtml(initial)}
            </div>
            <div>
              <div class="fw-bold text-dark fs-sm">${escapeHtml(c.company_name)}</div>
              ${c.website ? `<a href="${escapeHtml(c.website)}" target="_blank" class="fs-xs text-muted text-decoration-none"><i class="fa-solid fa-arrow-up-right-from-square me-1"></i>Website</a>` : ''}
            </div>
          </div>
        </td>
        <td>
          <span class="badge bg-light text-dark border fs-xs">${escapeHtml(c.industry || 'Technology')}</span>
        </td>
        <td>
          <div class="fw-semibold text-dark fs-xs"><i class="fa-solid fa-user-tie me-1 text-muted"></i>${escapeHtml(c.contact_person || 'Lead Recruiter')}</div>
        </td>
        <td>
          <a href="mailto:${escapeHtml(c.contact_email || 'hr@company.com')}" class="text-decoration-none text-primary fw-semibold fs-xs">
            <i class="fa-regular fa-envelope me-1"></i>${escapeHtml(c.contact_email || 'N/A')}
          </a>
        </td>
        <td class="fs-xs text-muted">
          <i class="fa-solid fa-phone me-1"></i>${escapeHtml(c.phone || 'N/A')}
        </td>
        <td>
          <span class="badge bg-primary-subtle text-primary border border-primary-subtle fs-xs" title="${escapeHtml(driveTitles)}">
            <i class="fa-solid fa-briefcase me-1"></i>${driveCount} Active ${driveCount === 1 ? 'Drive' : 'Drives'}
          </span>
        </td>
        <td>
          <span class="badge-status ${(c.approval_status || 'approved').toLowerCase()}">${escapeHtml(c.approval_status || 'APPROVED')}</span>
        </td>
      </tr>
    `;
  }).join('');
}

function renderRegistryDrives(drives) {
  const tbody = document.getElementById('portalActiveDrivesBody');
  if (!tbody) return;

  if (!drives || drives.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted py-4">No active recruitment drives currently live</td></tr>';
    return;
  }

  tbody.innerHTML = drives.map(d => `
    <tr>
      <td>
        <div class="fw-bold text-dark fs-sm">${escapeHtml(d.job_title)}</div>
        <div class="fs-xs text-muted"><i class="fa-solid fa-location-dot me-1"></i>${escapeHtml(d.location || 'Pan India')}</div>
      </td>
      <td>
        <div class="fw-semibold text-dark fs-xs"><i class="fa-regular fa-building me-1 text-primary"></i>${escapeHtml(d.company_name)}</div>
        <div class="fs-xs text-muted">${escapeHtml(d.company_industry || 'Tech')}</div>
      </td>
      <td>
        <span class="package-badge fs-xs">₹ ${d.package_lpa} LPA</span>
      </td>
      <td>
        <div class="fs-xs fw-semibold text-dark">CGPA &ge; ${d.min_cgpa}</div>
        <div class="fs-xs text-muted">Branches: <span class="fw-bold">${escapeHtml(d.allowed_branches || 'All')}</span></div>
      </td>
      <td class="fs-xs text-muted">
        <i class="fa-regular fa-calendar-days me-1 text-primary"></i>${escapeHtml(d.drive_date)}
      </td>
      <td class="fs-xs text-danger fw-semibold">
        <i class="fa-regular fa-clock me-1"></i>${escapeHtml(d.application_deadline)}
      </td>
      <td>
        <span class="badge-status ${(d.status || 'approved').toLowerCase()}">${escapeHtml(d.status || 'APPROVED')}</span>
      </td>
      <td>
        <button class="btn btn-outline-custom btn-sm py-1 px-2 fs-xs" onclick="switchTab('drives')">
          <i class="fa-solid fa-arrow-right me-1"></i> Explore
        </button>
      </td>
    </tr>
  `).join('');
}

function renderBranchAnalytics(stats) {
  const canvas = document.getElementById('canvasBranchChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const labels = stats.length > 0 ? stats.map(s => s.branch) : ['CSE', 'ECE', 'IT', 'EEE', 'ME'];
  const counts = stats.length > 0 ? stats.map(s => s.count) : [14, 9, 7, 5, 4];

  if (branchChartObj) branchChartObj.destroy();

  branchChartObj = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Placed Candidates',
        data: counts,
        backgroundColor: 'rgba(79, 70, 229, 0.85)',
        borderColor: '#4f46e5',
        borderWidth: 1.5,
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0f172a',
          titleFont: { family: 'Outfit', weight: '700' },
          bodyFont: { family: 'Plus Jakarta Sans' },
          padding: 10,
          cornerRadius: 8
        }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { color: '#64748b', font: { family: 'Plus Jakarta Sans' } } },
        x: { grid: { display: false }, ticks: { color: '#64748b', font: { family: 'Plus Jakarta Sans', weight: '600' } } }
      }
    }
  });
}

function renderCompanyAnalytics(stats) {
  const canvas = document.getElementById('canvasCompanyChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const labels = stats.length > 0 ? stats.map(s => s.company_name) : ['TechCorp Solutions', 'Innovate AI Labs', 'GlobalSoft Systems'];
  const counts = stats.length > 0 ? stats.map(s => s.hires) : [12, 8, 5];

  if (companyChartObj) companyChartObj.destroy();

  companyChartObj = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: counts,
        backgroundColor: ['#4f46e5', '#0284c7', '#10b981', '#f59e0b', '#ec4899'],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: { color: '#334155', font: { family: 'Plus Jakarta Sans', weight: '600', size: 12 }, boxWidth: 12 }
        },
        tooltip: {
          backgroundColor: '#0f172a',
          titleFont: { family: 'Outfit', weight: '700' },
          bodyFont: { family: 'Plus Jakarta Sans' },
          padding: 10,
          cornerRadius: 8
        }
      }
    }
  });
}

async function loadQuickInterviews() {
  const tbody = document.getElementById('quickInterviewsBody');
  if (!tbody) return;
  try {
    const res = await apiFetch('/api/interviews');
    if (!res.ok) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4"><i class="fa-solid fa-lock me-1"></i> Sign in to view your scheduled interview rounds</td></tr>';
      return;
    }
    const list = await res.json();
    if (list.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4"><i class="fa-regular fa-calendar-xmark me-1"></i> No upcoming interview rounds scheduled yet</td></tr>';
      return;
    }

    tbody.innerHTML = list.slice(0, 5).map(i => `
      <tr>
        <td class="fw-bold text-dark">
          <div class="d-flex align-items-center gap-2">
            <div class="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center fw-bold fs-xs" style="width: 30px; height: 30px;">
              ${escapeHtml((i.full_name || 'C').charAt(0))}
            </div>
            <span>${escapeHtml(i.full_name || 'Candidate')}</span>
          </div>
        </td>
        <td>
          <div class="fw-bold text-dark">${escapeHtml(i.job_title)}</div>
          <div class="fs-xs text-muted"><i class="fa-regular fa-building me-1"></i>${escapeHtml(i.company_name)}</div>
        </td>
        <td><span class="badge bg-indigo-subtle text-primary border border-indigo-subtle px-2 py-1">${escapeHtml(i.round_name)}</span></td>
        <td class="fs-xs text-warning fw-semibold"><i class="fa-regular fa-clock me-1"></i> ${escapeHtml(i.scheduled_time)}</td>
        <td><span class="badge-status ${i.status.toLowerCase()}">${escapeHtml(i.status)}</span></td>
        <td>
          <a href="${escapeHtml(i.meeting_link || '#')}" target="_blank" class="meet-link-btn py-1 px-2 fs-xs">
            <i class="fa-solid fa-video me-1"></i> Join Room
          </a>
        </td>
      </tr>
    `).join('');
  } catch (err) {}
}

// ==============================================================================
// 2. RECRUITMENT DRIVES (JOB BOARD)
// ==============================================================================
async function loadDrives() {
  const container = document.getElementById('drivesRenderContainer');
  if (!container) return;
  container.innerHTML = '<div class="col-12 text-center text-muted py-5"><i class="fa-solid fa-circle-notch fa-spin me-2 text-primary"></i> Fetching active recruitment drives...</div>';

  try {
    const res = await apiFetch('/api/drives');
    if (!res.ok) return;
    rawDrivesCache = await res.json();
    applyDriveFilters();
  } catch (err) {
    container.innerHTML = '<div class="col-12 text-center text-danger py-5">Failed to load drives</div>';
  }
}

function applyDriveFilters() {
  const query = (document.getElementById('filterDriveSearch')?.value || '').toLowerCase();
  const branch = document.getElementById('filterDriveBranch')?.value || '';
  const sort = document.getElementById('filterDriveSort')?.value || 'latest';

  let filtered = [...rawDrivesCache];

  if (query) {
    filtered = filtered.filter(d => 
      (d.job_title && d.job_title.toLowerCase().includes(query)) ||
      (d.company_name && d.company_name.toLowerCase().includes(query))
    );
  }

  if (branch) {
    filtered = filtered.filter(d => {
      if (!d.allowed_branches) return true;
      return d.allowed_branches.split(',').map(b => b.trim().toUpperCase()).includes(branch.toUpperCase());
    });
  }

  if (sort === 'package_high') {
    filtered.sort((a, b) => (b.package_lpa || 0) - (a.package_lpa || 0));
  } else if (sort === 'deadline') {
    filtered.sort((a, b) => new Date(a.application_deadline || 0) - new Date(b.application_deadline || 0));
  } else {
    filtered.sort((a, b) => (b.drive_id || 0) - (a.drive_id || 0));
  }

  renderDrivesList(filtered);
}

function resetDriveFilters() {
  if (document.getElementById('filterDriveSearch')) document.getElementById('filterDriveSearch').value = '';
  if (document.getElementById('filterDriveBranch')) document.getElementById('filterDriveBranch').value = '';
  if (document.getElementById('filterDriveSort')) document.getElementById('filterDriveSort').value = 'latest';
  applyDriveFilters();
}

function renderDrivesList(drives) {
  const container = document.getElementById('drivesRenderContainer');
  if (!container) return;

  if (drives.length === 0) {
    container.innerHTML = '<div class="col-12 text-center text-muted py-5"><i class="fa-regular fa-folder-open me-1"></i> No matching recruitment drives found</div>';
    return;
  }

  container.innerHTML = drives.map(d => {
    let eligibilityBadge = '';
    let applyBtn = '';

    if (currentUser?.role === 'Student') {
      if (d.application_status) {
        applyBtn = `<button class="btn btn-outline-custom btn-sm w-100" disabled><i class="fa-solid fa-circle-check text-success me-1"></i> Applied (${d.application_status})</button>`;
      } else if (d.is_eligible) {
        eligibilityBadge = `<span class="eligibility-pill eligible"><i class="fa-solid fa-circle-check"></i> Eligible</span>`;
        applyBtn = `<button class="btn btn-indigo-custom btn-sm w-100" onclick="applyForDrive(${d.drive_id})"><i class="fa-solid fa-paper-plane me-1"></i> Submit Application</button>`;
      } else {
        const reasons = (d.eligibility_reasons || []).join(' &bull; ');
        eligibilityBadge = `<span class="eligibility-pill ineligible" title="${escapeHtml(reasons)}"><i class="fa-solid fa-circle-xmark"></i> Ineligible</span>`;
        applyBtn = `<button class="btn btn-outline-custom btn-sm w-100" disabled title="${escapeHtml(reasons)}"><i class="fa-solid fa-ban me-1"></i> Criteria Not Met</button>`;
      }
    } else if (!currentUser) {
      applyBtn = `<button class="btn btn-outline-custom btn-sm w-100" data-bs-toggle="modal" data-bs-target="#loginModal"><i class="fa-solid fa-right-to-bracket me-1"></i> Sign In to Apply</button>`;
    } else {
      applyBtn = `<button class="btn btn-outline-custom btn-sm w-100" onclick="switchTab('applications')"><i class="fa-solid fa-users-viewfinder me-1"></i> View Applications</button>`;
    }

    return `
      <div class="col-md-6 col-lg-4">
        <div class="drive-card">
          <div class="d-flex align-items-start justify-content-between mb-3">
            <div class="d-flex align-items-center gap-3">
              <div class="drive-company-avatar">
                ${escapeHtml((d.company_name || 'C').charAt(0))}
              </div>
              <div>
                <h6 class="fw-bold m-0 text-dark">${escapeHtml(d.job_title)}</h6>
                <div class="fs-xs text-muted">${escapeHtml(d.company_name || 'Partner Company')}</div>
              </div>
            </div>
            ${eligibilityBadge}
          </div>

          <div class="d-flex align-items-center justify-content-between my-2 pb-2 border-bottom">
            <span class="package-badge">₹ ${d.package_lpa} LPA</span>
            <span class="fs-xs text-muted"><i class="fa-regular fa-calendar me-1"></i> Drive: ${escapeHtml(d.drive_date || 'TBD')}</span>
          </div>

          <p class="fs-xs text-muted my-2 flex-grow-1" style="min-height: 42px;">
            ${escapeHtml(d.job_description || 'Direct on-campus recruitment drive with technical interviews and offer letters.')}
          </p>

          <div class="bg-light p-2 rounded mb-3 fs-xs text-muted">
            <div class="d-flex justify-content-between">
              <span>Min CGPA: <strong>${d.min_cgpa || '6.0'}</strong></span>
              <span>Branches: <strong>${escapeHtml(d.allowed_branches || 'ALL')}</strong></span>
            </div>
            <div class="d-flex justify-content-between mt-1">
              <span>Backlogs: <strong>Max ${d.max_backlogs ?? 0}</strong></span>
              <span>Deadline: <strong class="text-danger">${escapeHtml(d.application_deadline || 'TBD')}</strong></span>
            </div>
          </div>

          <div>
            ${applyBtn}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

async function applyForDrive(driveId) {
  try {
    const res = await apiFetch('/api/applications', {
      method: 'POST',
      body: { drive_id: driveId }
    });
    const data = await res.json();
    if (res.ok) {
      showToast('Application submitted! Confirmation email sent to your inbox.', 'success');
      loadDrives();
    } else {
      showToast(data.error || 'Failed to submit application', 'danger');
    }
  } catch (err) {
    showToast('Application submission error', 'danger');
  }
}

async function openPostDriveModal(driveId = null) {
  const modalEl = document.getElementById('postDriveModal');
  const modalTitle = document.getElementById('postDriveModalTitle');
  const editIdInput = document.getElementById('driveEditId');
  const btnSubmit = document.getElementById('btnSubmitDrive');
  const broadcastContainer = document.getElementById('driveBroadcastContainer');

  if (driveId) {
    // Edit existing drive
    try {
      const res = await apiFetch(`/api/drives/${driveId}`);
      if (!res.ok) return;
      const d = await res.json();

      if (modalTitle) modalTitle.innerHTML = '<i class="fa-solid fa-pen-to-square text-primary me-2"></i> Edit Recruitment Drive & Criteria';
      if (editIdInput) editIdInput.value = driveId;
      if (btnSubmit) btnSubmit.innerHTML = '<i class="fa-solid fa-floppy-disk me-1"></i> Save Changes to Drive';
      if (broadcastContainer) broadcastContainer.style.display = 'none';

      document.getElementById('driveJobTitle').value = d.job_title || '';
      document.getElementById('drivePackageLpa').value = d.package_lpa || '';
      document.getElementById('driveJobType').value = d.job_type || 'Full-Time';
      document.getElementById('driveLocation').value = d.location || 'Bengaluru, India (Hybrid)';
      document.getElementById('driveDate').value = d.drive_date || '';
      document.getElementById('driveDeadline').value = d.application_deadline || '';
      document.getElementById('driveMinCgpa').value = d.min_cgpa || 7.0;
      document.getElementById('driveAllowedBranches').value = d.allowed_branches || 'CSE,ECE,IT';
      document.getElementById('driveGradYear').value = d.graduation_year || 2026;
      document.getElementById('driveMaxBacklogs').value = d.max_backlogs ?? 0;
      document.getElementById('driveSemesters').value = d.eligible_semesters || '7th Semester, 8th Semester';
      document.getElementById('driveDescription').value = d.job_description || '';
    } catch (err) {
      console.error('Failed to fetch drive for editing:', err);
    }
  } else {
    // New Drive
    if (modalTitle) modalTitle.innerHTML = '<i class="fa-solid fa-briefcase text-primary me-2"></i> Post Recruitment Drive';
    if (editIdInput) editIdInput.value = '';
    if (btnSubmit) btnSubmit.innerHTML = '<i class="fa-solid fa-upload me-1"></i> Publish Recruitment Drive';
    if (broadcastContainer) broadcastContainer.style.display = 'block';

    document.getElementById('postDriveForm').reset();
    document.getElementById('driveMinCgpa').value = 7.0;
    document.getElementById('driveAllowedBranches').value = 'CSE,ECE,IT';
    document.getElementById('driveGradYear').value = 2026;
    document.getElementById('driveMaxBacklogs').value = 0;
    document.getElementById('driveSemesters').value = '7th Semester, 8th Semester';
    document.getElementById('driveLocation').value = 'Bengaluru, India (Hybrid)';
    document.getElementById('driveJobType').value = 'Full-Time';
  }

  new bootstrap.Modal(modalEl).show();
}

async function closeCompanyDrive(driveId) {
  if (!confirm('Are you sure you want to close this recruitment drive? New applications will be disabled.')) return;
  try {
    const res = await apiFetch(`/api/drives/${driveId}`, { method: 'DELETE' });
    if (res.ok) {
      showToast('Recruitment drive has been archived & closed.', 'info');
      loadCompanyWorkspace();
      loadDrives();
    }
  } catch (err) {}
}

async function handlePostDrive(e) {
  e.preventDefault();
  const editId = document.getElementById('driveEditId')?.value;

  const payload = {
    job_title: document.getElementById('driveJobTitle').value.trim(),
    package_lpa: parseFloat(document.getElementById('drivePackageLpa').value),
    job_type: document.getElementById('driveJobType')?.value || 'Full-Time',
    location: document.getElementById('driveLocation')?.value.trim() || 'Bengaluru, India',
    drive_date: document.getElementById('driveDate').value,
    application_deadline: document.getElementById('driveDeadline').value,
    min_cgpa: parseFloat(document.getElementById('driveMinCgpa').value || 6.0),
    allowed_branches: document.getElementById('driveAllowedBranches').value.trim(),
    graduation_year: parseInt(document.getElementById('driveGradYear')?.value || 2026),
    max_backlogs: parseInt(document.getElementById('driveMaxBacklogs').value || 0),
    eligible_semesters: document.getElementById('driveSemesters')?.value.trim() || '7th Semester, 8th Semester',
    job_description: document.getElementById('driveDescription').value.trim(),
    broadcast_email: document.getElementById('driveBroadcastEmailCheckbox')?.checked || false
  };

  try {
    let res;
    if (editId) {
      res = await apiFetch(`/api/drives/${editId}`, {
        method: 'PUT',
        body: payload
      });
    } else {
      res = await apiFetch('/api/drives', {
        method: 'POST',
        body: payload
      });
    }

    const data = await res.json();
    if (res.ok) {
      bootstrap.Modal.getInstance(document.getElementById('postDriveModal')).hide();
      showToast(editId ? 'Recruitment drive & criteria updated successfully!' : 'Recruitment drive posted & announcement broadcasted!', 'success');
      loadDrives();
      if (document.getElementById('viewCompany')?.style.display !== 'none') {
        loadCompanyWorkspace();
      }
    } else {
      showToast(data.error || 'Failed to save drive', 'danger');
    }
  } catch (err) {
    showToast('Failed to save recruitment drive', 'danger');
  }
}

// ==============================================================================
// 3. APPLICATIONS & KANBAN PIPELINE
// ==============================================================================
let rawApplicationsCache = [];

function setAppViewMode(mode) {
  appViewMode = mode;
  document.getElementById('btnViewKanban').classList.toggle('active', mode === 'kanban');
  document.getElementById('btnViewTable').classList.toggle('active', mode === 'table');
  document.getElementById('kanbanViewWrapper').style.display = mode === 'kanban' ? 'block' : 'none';
  document.getElementById('tableViewWrapper').style.display = mode === 'table' ? 'block' : 'none';
}

async function loadApplications() {
  try {
    const res = await apiFetch('/api/applications');
    if (!res.ok) return;
    rawApplicationsCache = await res.json();

    renderKanbanBoard(rawApplicationsCache);
    renderApplicationsTable(rawApplicationsCache);

    // Populate schedule interview application dropdown
    const scheduleSelect = document.getElementById('scheduleAppSelect');
    if (scheduleSelect) {
      scheduleSelect.innerHTML = rawApplicationsCache.map(a => `
        <option value="${a.application_id}">${escapeHtml(a.full_name)} - ${escapeHtml(a.job_title)} (${escapeHtml(a.company_name)})</option>
      `).join('');
    }
  } catch (err) {
    console.error('Failed to load applications:', err);
  }
}

function renderKanbanBoard(apps) {
  const container = document.getElementById('kanbanBoardGrid');
  if (!container) return;

  const stages = [
    { id: 'APPLIED', title: 'Applied', color: '#4f46e5' },
    { id: 'SCREENING', title: 'Screening', color: '#0284c7' },
    { id: 'SCHEDULED', title: 'Interviewing', color: '#d97706' },
    { id: 'SELECTED', title: 'Offers / Placed', color: '#059669' },
    { id: 'REJECTED', title: 'Archived', color: '#e11d48' }
  ];

  container.innerHTML = stages.map(stage => {
    const stageApps = apps.filter(a => (a.status || 'APPLIED').toUpperCase() === stage.id);
    return `
      <div class="kanban-column">
        <div class="kanban-column-header">
          <div class="kanban-stage-title" style="color: ${stage.color};">
            <i class="fa-solid fa-circle-dot fs-xs"></i> ${stage.title}
          </div>
          <span class="kanban-count-badge">${stageApps.length}</span>
        </div>
        <div class="kanban-cards-stack">
          ${stageApps.length === 0 ? '<div class="text-center text-muted fs-xs py-4">No candidates in this stage</div>' : ''}
          ${stageApps.map(a => `
            <div class="kanban-item-card">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="fw-bold text-dark">${escapeHtml(a.full_name || 'Candidate')}</span>
                <span class="badge bg-light text-muted border fs-xs">${escapeHtml(a.roll_number || 'STU')}</span>
              </div>
              <div class="fs-xs fw-bold text-primary mb-1">${escapeHtml(a.job_title)}</div>
              <div class="fs-xs text-muted mb-2"><i class="fa-regular fa-building me-1"></i>${escapeHtml(a.company_name)} &bull; ₹${a.package_lpa || '0'} LPA</div>
              <div class="d-flex align-items-center justify-content-between pt-2 border-top">
                <span class="fs-xs text-muted">CGPA: <strong>${a.cgpa || 'N/A'}</strong> (${escapeHtml(a.branch || 'CSE')})</span>
                ${['Placement Officer', 'Company Representative', 'Administrator'].includes(currentUser?.role) ? `
                  <div class="dropdown">
                    <button class="btn btn-outline-custom btn-sm py-0 px-1 fs-xs" data-bs-toggle="dropdown">
                      Move <i class="fa-solid fa-chevron-down fs-xs"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end shadow-sm fs-xs">
                      <li><a class="dropdown-item" href="#" onclick="updateAppStatus(${a.application_id}, 'SCREENING'); return false;">Move to Screening</a></li>
                      <li><a class="dropdown-item" href="#" onclick="updateAppStatus(${a.application_id}, 'SCHEDULED'); return false;">Move to Interviewing</a></li>
                      <li><a class="dropdown-item text-success fw-bold" href="#" onclick="updateAppStatus(${a.application_id}, 'SELECTED'); return false;">Select &bull; Offer Job</a></li>
                      <li><a class="dropdown-item text-danger" href="#" onclick="updateAppStatus(${a.application_id}, 'REJECTED'); return false;">Mark Rejected</a></li>
                    </ul>
                  </div>
                ` : `
                  <span class="badge-status ${a.status.toLowerCase()}">${escapeHtml(a.status)}</span>
                `}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function renderApplicationsTable(apps) {
  const tbody = document.getElementById('applicationsTableBody');
  if (!tbody) return;

  if (apps.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted py-4">No applications registered</td></tr>';
    return;
  }

  tbody.innerHTML = apps.map(a => `
    <tr>
      <td class="font-monospace fw-bold text-muted fs-xs">#APP${String(a.application_id).padStart(4, '0')}</td>
      <td>
        <div class="fw-bold text-dark">${escapeHtml(a.full_name || 'Candidate')}</div>
        <div class="fs-xs text-muted">Roll: ${escapeHtml(a.roll_number || 'N/A')}</div>
      </td>
      <td>
        <div class="fw-semibold">${escapeHtml(a.branch || 'CSE')}</div>
        <div class="fs-xs text-muted">CGPA: ${a.cgpa || 'N/A'}</div>
      </td>
      <td>
        <div class="fw-bold text-dark">${escapeHtml(a.job_title)}</div>
        <div class="fs-xs text-muted">${escapeHtml(a.company_name)} &bull; ₹${a.package_lpa || '0'} LPA</div>
      </td>
      <td><span class="badge-status ${a.status.toLowerCase()}">${escapeHtml(a.status)}</span></td>
      <td class="fs-xs text-muted">${new Date(a.application_date).toLocaleDateString()}</td>
      <td>
        ${['Placement Officer', 'Company Representative', 'Administrator'].includes(currentUser?.role) ? `
          <div class="d-flex gap-1">
            <button class="btn btn-outline-custom btn-sm py-1 px-2 fs-xs" onclick="updateAppStatus(${a.application_id}, 'SELECTED')" title="Offer Placement">
              <i class="fa-solid fa-check text-success"></i> Select
            </button>
            <button class="btn btn-outline-custom btn-sm py-1 px-2 fs-xs" onclick="updateAppStatus(${a.application_id}, 'REJECTED')" title="Reject">
              <i class="fa-solid fa-xmark text-danger"></i>
            </button>
          </div>
        ` : `
          <span class="fs-xs text-muted">In Progress</span>
        `}
      </td>
    </tr>
  `).join('');
}

async function updateAppStatus(appId, newStatus) {
  try {
    const res = await apiFetch(`/api/applications/${appId}/status`, {
      method: 'PUT',
      body: { status: newStatus }
    });
    const data = await res.json();
    if (res.ok) {
      showToast(`Application #${appId} moved to ${newStatus}. Notification email sent to student.`, 'success');
      loadApplications();
    } else {
      showToast(data.error || 'Failed to update status', 'danger');
    }
  } catch (err) {
    showToast('Status update error', 'danger');
  }
}

// ==============================================================================
// 4. INTERVIEWS HUB
// ==============================================================================
async function loadInterviews() {
  const container = document.getElementById('interviewsRenderContainer');
  if (!container) return;
  container.innerHTML = '<div class="col-12 text-center text-muted py-5"><i class="fa-solid fa-circle-notch fa-spin me-2 text-primary"></i> Fetching scheduled interviews...</div>';

  try {
    const res = await apiFetch('/api/interviews');
    if (!res.ok) return;
    const list = await res.json();

    if (list.length === 0) {
      container.innerHTML = '<div class="col-12 text-center text-muted py-5"><i class="fa-regular fa-calendar-xmark me-1"></i> No upcoming interview rounds scheduled</div>';
      return;
    }

    container.innerHTML = list.map(i => `
      <div class="col-md-6 col-lg-4">
        <div class="interview-item-card h-100">
          <div>
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="badge bg-indigo-subtle text-primary border border-indigo-subtle px-2 py-1">${escapeHtml(i.round_name)}</span>
              <span class="badge-status ${i.status.toLowerCase()}">${escapeHtml(i.status)}</span>
            </div>
            <h5 class="fw-bold text-dark m-0 mb-1">${escapeHtml(i.full_name)}</h5>
            <div class="fs-xs text-muted mb-3">${escapeHtml(i.job_title)} &bull; <strong>${escapeHtml(i.company_name)}</strong></div>
            
            <div class="bg-light p-2.5 rounded mb-3 fs-xs text-muted">
              <div class="mb-1"><i class="fa-regular fa-clock text-warning me-1.5"></i> Slot: <strong class="text-dark">${escapeHtml(i.scheduled_time)}</strong></div>
              <div><i class="fa-solid fa-location-dot text-danger me-1.5"></i> Mode: <strong class="text-dark">${escapeHtml(i.location || 'Virtual Meeting')}</strong></div>
            </div>
          </div>

          <div class="d-flex gap-2">
            <a href="${escapeHtml(i.meeting_link || 'https://meet.google.com/cpms-interview')}" target="_blank" class="meet-link-btn flex-grow-1 text-center justify-content-center">
              <i class="fa-solid fa-video"></i> Launch Meeting Room
            </a>
          </div>
        </div>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = '<div class="col-12 text-center text-danger py-5">Error loading interview roster</div>';
  }
}

async function handleScheduleInterview(e) {
  e.preventDefault();
  const payload = {
    application_id: document.getElementById('scheduleAppSelect').value,
    round_name: document.getElementById('scheduleRoundName').value.trim(),
    scheduled_time: document.getElementById('scheduleTime').value.trim(),
    meeting_link: document.getElementById('scheduleMeetingLink').value.trim(),
    location: 'Virtual Google Meet'
  };

  try {
    const res = await apiFetch('/api/interviews', {
      method: 'POST',
      body: payload
    });
    const data = await res.json();
    if (res.ok) {
      bootstrap.Modal.getInstance(document.getElementById('scheduleInterviewModal')).hide();
      showToast('Interview scheduled! Google Meet invitation email transmitted.', 'success');
      loadInterviews();
      loadApplications();
    } else {
      showToast(data.error || 'Failed to schedule interview', 'danger');
    }
  } catch (err) {
    showToast('Failed to schedule interview', 'danger');
  }
}

// ==============================================================================
// 5. STUDENT PORTFOLIO STUDIO
// ==============================================================================
async function loadStudentPortfolio() {
  try {
    const res = await apiFetch('/api/students/profile');
    if (!res.ok) return;
    currentStudentData = await res.json();

    document.getElementById('portfolioFullName').textContent = currentStudentData.full_name || 'Alex Mercer';
    document.getElementById('portfolioRollNumber').textContent = currentStudentData.roll_number || 'STU001';
    document.getElementById('portfolioBranch').textContent = currentStudentData.branch || 'CSE';
    document.getElementById('portfolioGradYear').textContent = `${currentStudentData.semester || '7th Semester'} • Class of ${currentStudentData.graduation_year || 2026}`;
    document.getElementById('portfolioCgpa').textContent = currentStudentData.cgpa || '0.0';
    document.getElementById('portfolioBacklogs').textContent = currentStudentData.active_backlogs || '0';
    document.getElementById('portfolioVerificationStatus').textContent = currentStudentData.verification_status || 'PENDING';

    const avatarUrl = currentStudentData.profile_pic || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentStudentData.full_name || 'Student')}&background=4f46e5&color=fff`;
    document.getElementById('portfolioAvatarImg').src = avatarUrl;

    const btnResume = document.getElementById('btnViewResume');
    if (currentStudentData.resume_url) {
      btnResume.href = currentStudentData.resume_url;
      btnResume.style.display = 'inline-flex';
    } else {
      btnResume.style.display = 'none';
    }

    renderPortfolioSkills(currentStudentData.skills || []);
    renderPortfolioCerts(currentStudentData.certifications || []);
    renderPortfolioProjects(currentStudentData.projects || []);
    renderPortfolioInternships(currentStudentData.internships || []);
  } catch (err) {
    console.error('Failed to load portfolio:', err);
  }
}

function renderPortfolioSkills(skills) {
  const container = document.getElementById('portfolioSkillsContainer');
  if (!container) return;
  if (skills.length === 0) {
    container.innerHTML = '<span class="text-muted fs-xs">No technical skills added yet.</span>';
    return;
  }
  container.innerHTML = skills.map(s => `
    <span class="skill-tag-chip">
      ${escapeHtml(s.skill_name)} <span class="badge bg-light text-muted ms-1 fs-xs">${escapeHtml(s.proficiency_level || 'Intermediate')}</span>
      <span class="remove-btn" onclick="deleteStudentSkill(${s.skill_id})">&times;</span>
    </span>
  `).join('');
}

function renderPortfolioCerts(certs) {
  const container = document.getElementById('portfolioCertContainer');
  if (!container) return;
  if (certs.length === 0) {
    container.innerHTML = '<span class="text-muted fs-xs">No certifications registered yet.</span>';
    return;
  }
  container.innerHTML = certs.map(c => `
    <div class="p-2 border rounded bg-light d-flex justify-content-between align-items-center">
      <div>
        <div class="fw-bold fs-sm text-dark">${escapeHtml(c.title)}</div>
        <div class="fs-xs text-muted">${escapeHtml(c.issuing_organization)}</div>
      </div>
      <button class="btn btn-link btn-sm text-danger p-0 fs-xs" onclick="deleteStudentCert(${c.certification_id})"><i class="fa-solid fa-trash"></i></button>
    </div>
  `).join('');
}

function renderPortfolioProjects(projects) {
  const container = document.getElementById('portfolioProjectsContainer');
  if (!container) return;
  if (projects.length === 0) {
    container.innerHTML = '<span class="text-muted fs-xs">No showcase projects listed yet.</span>';
    return;
  }
  container.innerHTML = projects.map(p => `
    <div class="p-2.5 border rounded bg-light">
      <div class="d-flex justify-content-between align-items-start mb-1">
        <h6 class="fw-bold fs-sm text-dark m-0">${escapeHtml(p.title)}</h6>
        <button class="btn btn-link btn-sm text-danger p-0 fs-xs" onclick="deleteStudentProject(${p.project_id})"><i class="fa-solid fa-trash"></i></button>
      </div>
      <div class="fs-xs text-primary mb-1"><i class="fa-solid fa-code me-1"></i>${escapeHtml(p.technologies || 'Tech Stack')}</div>
      <p class="fs-xs text-muted m-0">${escapeHtml(p.description || '')}</p>
    </div>
  `).join('');
}

function renderPortfolioInternships(internships) {
  const container = document.getElementById('portfolioInternshipsContainer');
  if (!container) return;
  if (internships.length === 0) {
    container.innerHTML = '<span class="text-muted fs-xs">No internships listed yet.</span>';
    return;
  }
  container.innerHTML = internships.map(i => `
    <div class="p-2.5 border rounded bg-light">
      <div class="d-flex justify-content-between align-items-start mb-1">
        <h6 class="fw-bold fs-sm text-dark m-0">${escapeHtml(i.company_name)} - ${escapeHtml(i.role)}</h6>
        <button class="btn btn-link btn-sm text-danger p-0 fs-xs" onclick="deleteStudentInternship(${i.internship_id})"><i class="fa-solid fa-trash"></i></button>
      </div>
      <div class="fs-xs text-success mb-1"><i class="fa-regular fa-clock me-1"></i>Duration: ${i.duration_months || 3} months</div>
      <p class="fs-xs text-muted m-0">${escapeHtml(i.description || '')}</p>
    </div>
  `).join('');
}

// Portfolio Actions Handlers
async function uploadStudentResume(file) {
  if (!file) return;
  const formData = new FormData();
  formData.append('resume', file);
  try {
    const res = await apiFetch('/api/students/resume', { method: 'POST', body: formData });
    const data = await res.json();
    if (res.ok) {
      showToast('PDF Resume uploaded & linked successfully!', 'success');
      loadStudentPortfolio();
    } else {
      showToast(data.error || 'Failed to upload resume', 'danger');
    }
  } catch (err) {
    showToast('Resume upload error', 'danger');
  }
}

async function handleAddSkill(e) {
  e.preventDefault();
  const skill_name = document.getElementById('skillNameInput').value.trim();
  const proficiency_level = document.getElementById('skillProficiencyInput').value;
  try {
    const res = await apiFetch('/api/students/skills', { method: 'POST', body: { skill_name, proficiency_level } });
    if (res.ok) {
      bootstrap.Modal.getInstance(document.getElementById('addSkillModal')).hide();
      document.getElementById('skillNameInput').value = '';
      showToast('Skill added!', 'success');
      loadStudentPortfolio();
    }
  } catch (err) {}
}

async function deleteStudentSkill(id) {
  await apiFetch(`/api/students/skills/${id}`, { method: 'DELETE' });
  loadStudentPortfolio();
}

async function handleAddCert(e) {
  e.preventDefault();
  const title = document.getElementById('certTitleInput').value.trim();
  const issuing_organization = document.getElementById('certOrgInput').value.trim();
  try {
    const res = await apiFetch('/api/students/certifications', { method: 'POST', body: { title, issuing_organization } });
    if (res.ok) {
      bootstrap.Modal.getInstance(document.getElementById('addCertModal')).hide();
      document.getElementById('certTitleInput').value = '';
      document.getElementById('certOrgInput').value = '';
      showToast('Certification added!', 'success');
      loadStudentPortfolio();
    }
  } catch (err) {}
}

async function deleteStudentCert(id) {
  await apiFetch(`/api/students/certifications/${id}`, { method: 'DELETE' });
  loadStudentPortfolio();
}

async function handleAddProject(e) {
  e.preventDefault();
  const title = document.getElementById('projectTitleInput').value.trim();
  const technologies = document.getElementById('projectTechInput').value.trim();
  const description = document.getElementById('projectDescInput').value.trim();
  try {
    const res = await apiFetch('/api/students/projects', { method: 'POST', body: { title, technologies, description } });
    if (res.ok) {
      bootstrap.Modal.getInstance(document.getElementById('addProjectModal')).hide();
      showToast('Project added!', 'success');
      loadStudentPortfolio();
    }
  } catch (err) {}
}

async function deleteStudentProject(id) {
  await apiFetch(`/api/students/projects/${id}`, { method: 'DELETE' });
  loadStudentPortfolio();
}

async function handleAddInternship(e) {
  e.preventDefault();
  const company_name = document.getElementById('internCompanyInput').value.trim();
  const role = document.getElementById('internRoleInput').value.trim();
  const duration_months = parseInt(document.getElementById('internDurationInput').value || 3);
  const description = document.getElementById('internDescInput').value.trim();
  try {
    const res = await apiFetch('/api/students/internships', { method: 'POST', body: { company_name, role, duration_months, description } });
    if (res.ok) {
      bootstrap.Modal.getInstance(document.getElementById('addInternshipModal')).hide();
      showToast('Internship added!', 'success');
      loadStudentPortfolio();
    }
  } catch (err) {}
}

async function deleteStudentInternship(id) {
  await apiFetch(`/api/students/internships/${id}`, { method: 'DELETE' });
  loadStudentPortfolio();
}

function openEditProfileModal() {
  if (!currentStudentData) return;
  document.getElementById('editProfileFullName').value = currentStudentData.full_name || '';
  document.getElementById('editProfileBranch').value = currentStudentData.branch || 'CSE';
  document.getElementById('editProfileSemester').value = currentStudentData.semester || '7th Semester';
  document.getElementById('editProfileGradYear').value = currentStudentData.graduation_year || 2026;
  document.getElementById('editProfileCgpa').value = currentStudentData.cgpa || 8.0;
  document.getElementById('editProfileBacklogs').value = currentStudentData.active_backlogs || 0;
  new bootstrap.Modal(document.getElementById('editProfileModal')).show();
}

async function handleUpdateProfile(e) {
  e.preventDefault();
  const payload = {
    full_name: document.getElementById('editProfileFullName').value.trim(),
    branch: document.getElementById('editProfileBranch').value,
    semester: document.getElementById('editProfileSemester').value,
    graduation_year: parseInt(document.getElementById('editProfileGradYear').value),
    cgpa: parseFloat(document.getElementById('editProfileCgpa').value),
    active_backlogs: parseInt(document.getElementById('editProfileBacklogs').value)
  };
  try {
    const res = await apiFetch('/api/students/profile', { method: 'PUT', body: payload });
    if (res.ok) {
      bootstrap.Modal.getInstance(document.getElementById('editProfileModal')).hide();
      showToast('Academic profile updated successfully!', 'success');
      loadStudentPortfolio();
      await fetchCurrentUser();
    }
  } catch (err) {}
}

// ==============================================================================
// 5.5. COMPANY WORKSPACE & RECRUITER STUDIO
// ==============================================================================
let currentCompanyData = null;

async function loadCompanyWorkspace() {
  try {
    const res = await apiFetch('/api/company/profile');
    if (!res.ok) {
      showToast('Could not load company profile', 'danger');
      return;
    }
    const data = await res.json();
    currentCompanyData = data;

    // Profile Card Header
    const nameEl = document.getElementById('compProfileName');
    const indEl = document.getElementById('compIndustryBadge');
    const descEl = document.getElementById('compDescriptionText');
    const hqEl = document.getElementById('compHqVal');
    const webLink = document.getElementById('compWebsiteLink');
    const contactEl = document.getElementById('compContactVal');
    const emailLink = document.getElementById('compEmailLink');
    const phoneEl = document.getElementById('compPhoneVal');
    const approvalBadge = document.getElementById('compApprovalBadge');

    if (nameEl) nameEl.textContent = data.company_name || 'Recruiting Partner';
    if (indEl) indEl.textContent = data.industry || 'Technology';
    if (descEl) descEl.textContent = data.description || 'Verified campus corporate hiring partner with CPMS.';
    if (hqEl) hqEl.textContent = data.hq_location || 'Bengaluru, India';
    if (contactEl) contactEl.textContent = data.contact_person || 'HR Lead';
    if (phoneEl) phoneEl.textContent = data.phone || 'N/A';

    if (webLink) {
      if (data.website) {
        webLink.href = data.website;
        webLink.textContent = data.website.replace(/^https?:\/\//, '');
        document.getElementById('compWebsiteSpan')?.style.setProperty('display', 'inline');
      } else {
        document.getElementById('compWebsiteSpan')?.style.setProperty('display', 'none');
      }
    }

    if (emailLink) {
      const em = data.contact_email || currentUser?.email || 'hr@company.com';
      emailLink.href = `mailto:${em}`;
      emailLink.textContent = em;
    }

    if (approvalBadge) {
      const status = data.approval_status || 'APPROVED';
      approvalBadge.className = `badge bg-${status === 'APPROVED' ? 'success' : 'warning'}-subtle text-${status === 'APPROVED' ? 'success' : 'warning'} border border-${status === 'APPROVED' ? 'success' : 'warning'}-subtle px-2.5 py-1`;
      approvalBadge.innerHTML = `<i class="fa-solid fa-${status === 'APPROVED' ? 'circle-check' : 'clock'} me-1"></i> ${escapeHtml(status)} PARTNER`;
    }

    // Telemetry Cards
    const analytics = data.analytics || {};
    document.getElementById('compStatTotalDrives').textContent = analytics.total_drives || 0;
    document.getElementById('compStatTotalApplicants').textContent = analytics.total_applicants || 0;
    document.getElementById('compStatShortlisted').textContent = analytics.shortlisted || 0;
    document.getElementById('compStatSelected').textContent = analytics.selected || 0;

    // Render Company Drives Table
    renderCompanyDrivesTable(data.drives || []);
  } catch (err) {
    console.error('Failed to load company workspace:', err);
  }
}

function renderCompanyDrivesTable(drives) {
  const tbody = document.getElementById('compDrivesTableBody');
  if (!tbody) return;

  if (!drives || drives.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center text-muted py-5">
          <i class="fa-solid fa-briefcase fa-2x mb-2 d-block text-muted opacity-50"></i>
          No recruitment drives posted yet. Click <strong>"Post New Drive"</strong> to create your first campus drive with eligibility rules.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = drives.map(d => {
    const isClosed = d.status === 'CLOSED';
    const branches = d.allowed_branches || 'All Branches';
    const batch = d.graduation_year ? `Batch of ${d.graduation_year}` : 'Batch 2026';
    const sems = d.eligible_semesters || '7th, 8th Sem';
    const applicants = d.applicant_count || 0;

    return `
      <tr class="${isClosed ? 'opacity-75 bg-light' : ''}">
        <td>
          <div class="fw-bold text-dark fs-sm">${escapeHtml(d.job_title)}</div>
          <div class="fs-xs text-muted">
            <span class="badge bg-light text-muted border me-1">${escapeHtml(d.job_type || 'Full-Time')}</span>
            <i class="fa-solid fa-location-dot me-1"></i>${escapeHtml(d.location || 'On-Campus')}
          </div>
        </td>
        <td>
          <span class="package-badge fs-xs">₹ ${d.package_lpa} LPA</span>
        </td>
        <td>
          <div class="fs-xs">
            <span class="fw-semibold text-dark">CGPA &ge; ${d.min_cgpa}</span> &bull; 
            <span class="badge ${d.max_backlogs > 0 ? 'bg-danger-subtle text-danger' : 'bg-success-subtle text-success'} fs-xs">Max ${d.max_backlogs || 0} Backlogs</span>
          </div>
          <div class="fs-xs text-muted mt-1">
            <i class="fa-solid fa-code-branch me-1 text-primary"></i>${escapeHtml(branches)}
          </div>
          <div class="fs-xs text-muted">
            <i class="fa-solid fa-graduation-cap me-1 text-info"></i>${escapeHtml(batch)} (${escapeHtml(sems)})
          </div>
        </td>
        <td>
          <div class="fs-xs text-muted"><i class="fa-regular fa-calendar-days me-1 text-primary"></i> ${escapeHtml(d.drive_date || 'TBD')}</div>
          <div class="fs-xs text-danger fw-semibold mt-1"><i class="fa-regular fa-clock me-1"></i> Due: ${escapeHtml(d.application_deadline || 'TBD')}</div>
        </td>
        <td>
          <span class="badge bg-primary-subtle text-primary border border-primary-subtle fs-xs">
            <i class="fa-solid fa-users me-1"></i> ${applicants} Applicants
          </span>
        </td>
        <td>
          <span class="badge-status ${(d.status || 'pending').toLowerCase()}">${escapeHtml(d.status || 'PENDING')}</span>
        </td>
        <td>
          <div class="d-flex align-items-center gap-1.5 flex-wrap">
            <button class="btn btn-outline-custom btn-sm py-1 px-2 fs-xs" onclick="openPostDriveModal(${d.drive_id})" title="Edit Drive & Criteria">
              <i class="fa-solid fa-pen-to-square me-1"></i> Edit
            </button>
            <button class="btn btn-outline-custom btn-sm py-1 px-2 fs-xs" onclick="switchTab('applications')" title="View Candidates">
              <i class="fa-solid fa-users-viewfinder me-1"></i> Applicants
            </button>
            ${!isClosed ? `
              <button class="btn btn-outline-custom btn-sm py-1 px-2 fs-xs text-danger" onclick="closeCompanyDrive(${d.drive_id})" title="Close/Archive Drive">
                <i class="fa-solid fa-box-archive"></i>
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function openEditCompanyProfileModal() {
  if (!currentCompanyData) return;
  document.getElementById('editCompName').value = currentCompanyData.company_name || '';
  document.getElementById('editCompIndustry').value = currentCompanyData.industry || '';
  document.getElementById('editCompWebsite').value = currentCompanyData.website || '';
  document.getElementById('editCompHq').value = currentCompanyData.hq_location || '';
  document.getElementById('editCompContactPerson').value = currentCompanyData.contact_person || '';
  document.getElementById('editCompPhone').value = currentCompanyData.phone || '';
  document.getElementById('editCompDescription').value = currentCompanyData.description || '';
  new bootstrap.Modal(document.getElementById('editCompanyProfileModal')).show();
}

async function handleUpdateCompanyProfile(e) {
  e.preventDefault();
  const payload = {
    company_name: document.getElementById('editCompName').value.trim(),
    industry: document.getElementById('editCompIndustry').value.trim(),
    website: document.getElementById('editCompWebsite').value.trim(),
    hq_location: document.getElementById('editCompHq').value.trim(),
    contact_person: document.getElementById('editCompContactPerson').value.trim(),
    phone: document.getElementById('editCompPhone').value.trim(),
    description: document.getElementById('editCompDescription').value.trim()
  };

  try {
    const res = await apiFetch('/api/company/profile', {
      method: 'PUT',
      body: payload
    });
    if (res.ok) {
      bootstrap.Modal.getInstance(document.getElementById('editCompanyProfileModal')).hide();
      showToast('Corporate profile updated successfully!', 'success');
      loadCompanyWorkspace();
      await fetchCurrentUser();
    } else {
      const err = await res.json();
      showToast(err.error || 'Failed to update company profile', 'danger');
    }
  } catch (err) {
    showToast('Profile update failed', 'danger');
  }
}

// ==============================================================================
// 6. OFFICER DESK
// ==============================================================================
async function loadOfficerWorkspace() {
  loadOfficerStudents();
  loadOfficerCompanies();
  loadOfficerDrives();
}

async function loadOfficerStudents() {
  const tbody = document.getElementById('officerStudentsTableBody');
  if (!tbody) return;
  try {
    const res = await apiFetch('/api/officer/students');
    if (!res.ok) return;
    const students = await res.json();

    tbody.innerHTML = students.map(s => `
      <tr>
        <td>
          <div class="fw-bold text-dark">${escapeHtml(s.full_name || 'Candidate')}</div>
          <div class="fs-xs text-primary"><i class="fa-regular fa-envelope me-1"></i>${escapeHtml(s.email || 'student@cpms.edu')}</div>
        </td>
        <td class="fs-xs font-monospace text-muted">${escapeHtml(s.roll_number)}</td>
        <td><span class="badge bg-indigo-subtle text-primary border border-indigo-subtle px-2 py-1">${escapeHtml(s.branch)}</span></td>
        <td>
          <div class="fs-xs fw-bold text-dark">Class of ${s.graduation_year || 2026}</div>
          <div class="fs-xs text-muted">${escapeHtml(s.semester || '7th Semester')}</div>
        </td>
        <td>
          <div class="fw-bold text-primary">${s.cgpa}</div>
          <span class="badge ${s.active_backlogs > 0 ? 'bg-danger' : 'bg-success'} fs-xs">${s.active_backlogs} Backlogs</span>
        </td>
        <td>
          ${s.resume_url ? `<a href="${s.resume_url}" target="_blank" class="btn btn-outline-custom btn-sm py-0 px-2 fs-xs"><i class="fa-solid fa-file-pdf text-danger"></i> PDF</a>` : '<span class="text-muted fs-xs">None</span>'}
        </td>
        <td><span class="badge-status ${s.verification_status.toLowerCase()}">${escapeHtml(s.verification_status)}</span></td>
        <td>
          <div class="d-flex gap-1">
            <button class="btn btn-outline-custom btn-sm py-0 px-2 text-success" onclick="verifyStudent(${s.student_id}, 'VERIFIED')" title="Verify">
              <i class="fa-solid fa-check"></i>
            </button>
            <button class="btn btn-outline-custom btn-sm py-0 px-2 text-danger" onclick="verifyStudent(${s.student_id}, 'REJECTED')" title="Reject">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (err) {}
}

async function verifyStudent(id, status) {
  try {
    const res = await apiFetch(`/api/officer/students/${id}/verify`, { method: 'PUT', body: { status } });
    if (res.ok) {
      showToast(`Student #${id} verification set to ${status}`, 'success');
      loadOfficerStudents();
    }
  } catch (err) {}
}

async function loadOfficerCompanies() {
  const tbody = document.getElementById('officerCompaniesTableBody');
  if (!tbody) return;
  try {
    const res = await apiFetch('/api/officer/companies');
    if (!res.ok) return;
    const companies = await res.json();

    tbody.innerHTML = companies.map(c => `
      <tr>
        <td class="fw-bold text-dark">${escapeHtml(c.company_name)}</td>
        <td class="fs-xs">${escapeHtml(c.industry || 'Technology')}</td>
        <td>${escapeHtml(c.contact_person || 'Lead')}</td>
        <td class="fs-xs text-muted">${escapeHtml(c.contact_email || 'N/A')}</td>
        <td class="fs-xs">${escapeHtml(c.phone || 'N/A')}</td>
        <td><span class="badge-status ${c.approval_status.toLowerCase()}">${escapeHtml(c.approval_status)}</span></td>
        <td>
          <div class="d-flex gap-1">
            <button class="btn btn-outline-custom btn-sm py-0 px-2 text-success" onclick="approveCompany(${c.company_id}, 'APPROVED')" title="Approve">
              <i class="fa-solid fa-check"></i>
            </button>
            <button class="btn btn-outline-custom btn-sm py-0 px-2 text-danger" onclick="approveCompany(${c.company_id}, 'REJECTED')" title="Reject">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (err) {}
}

async function approveCompany(id, status) {
  try {
    const res = await apiFetch(`/api/officer/companies/${id}/approve`, { method: 'PUT', body: { status } });
    if (res.ok) {
      showToast(`Company approval updated to ${status}`, 'success');
      loadOfficerCompanies();
    }
  } catch (err) {}
}

async function loadOfficerDrives() {
  const tbody = document.getElementById('officerDrivesTableBody');
  if (!tbody) return;
  try {
    const res = await apiFetch('/api/officer/drives');
    if (!res.ok) return;
    const drives = await res.json();

    tbody.innerHTML = drives.map(d => `
      <tr>
        <td class="fw-bold text-dark">${escapeHtml(d.job_title)}</td>
        <td>${escapeHtml(d.company_name)}</td>
        <td class="fw-bold text-success">₹${d.package_lpa} LPA</td>
        <td class="fs-xs text-muted">${escapeHtml(d.drive_date)}</td>
        <td class="fs-xs">CGPA &ge; ${d.min_cgpa} (${escapeHtml(d.allowed_branches)})</td>
        <td><span class="badge-status ${d.status.toLowerCase()}">${escapeHtml(d.status)}</span></td>
        <td>
          <div class="d-flex gap-2">
            <button class="btn btn-indigo-custom btn-sm py-0 px-2 fs-xs" onclick="broadcastDriveEmail(${d.drive_id})" title="Broadcast Email Blast to Eligible Students">
              <i class="fa-solid fa-paper-plane me-1"></i> Email Blast
            </button>
            <button class="btn btn-outline-custom btn-sm py-0 px-2 text-success" onclick="approveDrive(${d.drive_id}, 'APPROVED')" title="Approve">
              <i class="fa-solid fa-check"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (err) {}
}

async function approveDrive(id, status) {
  try {
    const res = await apiFetch(`/api/officer/drives/${id}/approve`, { method: 'PUT', body: { status } });
    if (res.ok) {
      showToast(`Recruitment drive status set to ${status}`, 'success');
      loadOfficerDrives();
    }
  } catch (err) {}
}

async function broadcastDriveEmail(driveId) {
  try {
    showToast('Dispatching automated email broadcast...', 'info');
    const res = await apiFetch(`/api/officer/drives/${driveId}/broadcast`, { method: 'POST' });
    const data = await res.json();
    if (res.ok) {
      showToast(data.message || 'Drive announcement email blast dispatched successfully!', 'success');
    } else {
      showToast(data.error || 'Broadcast failed', 'danger');
    }
  } catch (err) {
    showToast('Broadcast error', 'danger');
  }
}

// ==============================================================================
// 7. ADMIN WORKSPACE & AUDIT TRAILS
// ==============================================================================
async function loadAdminWorkspace() {
  refreshSystemHealth();
  loadAuditLogs();
}

async function loadAuditLogs() {
  const tbody = document.getElementById('auditLogsTableBody');
  if (!tbody) return;
  try {
    const res = await apiFetch('/api/admin/audit-logs');
    if (!res.ok) return;
    const logs = await res.json();

    tbody.innerHTML = logs.map(l => `
      <tr>
        <td class="font-monospace fs-xs text-muted">#LOG${l.log_id}</td>
        <td class="fs-xs text-secondary">${new Date(l.timestamp).toLocaleString()}</td>
        <td class="fs-xs fw-bold text-dark">${escapeHtml(l.email)}</td>
        <td><span class="badge bg-light text-primary border font-monospace fs-xs">${escapeHtml(l.action)}</span></td>
        <td class="fs-xs text-muted">${escapeHtml(l.details)}</td>
      </tr>
    `).join('');
  } catch (err) {}
}
