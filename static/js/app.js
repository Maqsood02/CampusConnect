/* ==============================================================================
   College Placement Management System (CPMS) - Core Application Controller
   Authentication, Tab State Routing, Role Management & Real-time Integrations
   ============================================================================== */

let userToken = localStorage.getItem('cpms_token') || null;
let currentUser = null;

// ==============================================================================
// 1. INITIALIZATION & AUTH LIFECYCLE
// ==============================================================================
document.addEventListener('DOMContentLoaded', async () => {
  // Check health & connection status
  refreshSystemHealth();

  if (userToken) {
    await fetchCurrentUser();
  } else {
    updateAuthUI();
  }

  // Load initial view
  switchTab('dashboard');

  // Periodic notifications check
  if (userToken) {
    loadNotifications();
    setInterval(loadNotifications, 30000);
  }
});

// Generic authenticated API fetch helper
async function apiFetch(url, options = {}) {
  options.headers = options.headers || {};
  if (userToken) {
    options.headers['Authorization'] = `Bearer ${userToken}`;
  }
  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(options.body);
  }
  return fetch(url, options);
}

// Fetch authenticated user profile
async function fetchCurrentUser() {
  try {
    const res = await apiFetch('/api/auth/me');
    if (res.ok) {
      currentUser = await res.json();
      updateAuthUI();
      loadNotifications();
    } else {
      logout();
    }
  } catch (err) {
    console.error('Session validation error:', err);
    logout();
  }
}

// Update Header & Nav Controls based on User Role
function updateAuthUI() {
  const loggedOutSection = document.getElementById('loggedOutSection');
  const loggedInSection = document.getElementById('loggedInSection');
  
  const menuApps = document.getElementById('menuApplications');
  const menuInterviews = document.getElementById('menuInterviews');
  const menuPortfolio = document.getElementById('menuPortfolio');
  const menuCompany = document.getElementById('menuCompany');
  const menuOfficer = document.getElementById('menuOfficer');
  const menuAdmin = document.getElementById('menuAdmin');
  const btnPostDrive = document.getElementById('btnPostDriveLauncher');
  const btnScheduleIv = document.getElementById('btnScheduleInterviewLauncher');
  const dropdownPortfolioLink = document.getElementById('profileDropdownPortfolioLink');
  const dropdownCompanyLink = document.getElementById('profileDropdownCompanyLink');

  if (currentUser && userToken) {
    if (loggedOutSection) {
      loggedOutSection.classList.add('d-none');
      loggedOutSection.classList.remove('d-flex');
    }
    if (loggedInSection) {
      loggedInSection.classList.remove('d-none');
      loggedInSection.classList.add('d-flex');
    }

    // Update Header labels
    const emailLbl = document.getElementById('headerEmailLabel');
    const roleBdg = document.getElementById('headerRoleBadge');
    const avatarImg = document.getElementById('headerProfileAvatar');

    if (emailLbl) emailLbl.textContent = currentUser.email;
    if (roleBdg) roleBdg.textContent = currentUser.role;
    
    if (avatarImg) {
      const avatarUrl = currentUser.profile_image_url || 
        `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.full_name || currentUser.company_name || currentUser.email)}&background=4f46e5&color=fff`;
      avatarImg.src = avatarUrl;
    }

    // Role-specific navigation display
    if (menuApps) menuApps.style.display = 'inline-flex';
    if (menuInterviews) menuInterviews.style.display = 'inline-flex';

    if (currentUser.role === 'Student') {
      if (menuPortfolio) menuPortfolio.style.display = 'inline-flex';
      if (dropdownPortfolioLink) dropdownPortfolioLink.style.display = 'block';
      if (menuCompany) menuCompany.style.display = 'none';
      if (dropdownCompanyLink) dropdownCompanyLink.style.display = 'none';
      if (menuOfficer) menuOfficer.style.display = 'none';
      if (menuAdmin) menuAdmin.style.display = 'none';
      if (btnPostDrive) btnPostDrive.style.display = 'none';
      if (btnScheduleIv) btnScheduleIv.style.display = 'none';
    } else if (currentUser.role === 'Company Representative') {
      if (menuPortfolio) menuPortfolio.style.display = 'none';
      if (dropdownPortfolioLink) dropdownPortfolioLink.style.display = 'none';
      if (menuCompany) menuCompany.style.display = 'inline-flex';
      if (dropdownCompanyLink) dropdownCompanyLink.style.display = 'block';
      if (menuOfficer) menuOfficer.style.display = 'none';
      if (menuAdmin) menuAdmin.style.display = 'none';
      if (btnPostDrive) btnPostDrive.style.display = 'inline-flex';
      if (btnScheduleIv) btnScheduleIv.style.display = 'inline-flex';
    } else if (currentUser.role === 'Placement Officer') {
      if (menuPortfolio) menuPortfolio.style.display = 'none';
      if (dropdownPortfolioLink) dropdownPortfolioLink.style.display = 'none';
      if (menuCompany) menuCompany.style.display = 'none';
      if (dropdownCompanyLink) dropdownCompanyLink.style.display = 'none';
      if (menuOfficer) menuOfficer.style.display = 'inline-flex';
      if (menuAdmin) menuAdmin.style.display = 'none';
      if (btnPostDrive) btnPostDrive.style.display = 'inline-flex';
      if (btnScheduleIv) btnScheduleIv.style.display = 'inline-flex';
    } else if (currentUser.role === 'Administrator') {
      if (menuPortfolio) menuPortfolio.style.display = 'none';
      if (dropdownPortfolioLink) dropdownPortfolioLink.style.display = 'none';
      if (menuCompany) menuCompany.style.display = 'none';
      if (dropdownCompanyLink) dropdownCompanyLink.style.display = 'none';
      if (menuOfficer) menuOfficer.style.display = 'inline-flex';
      if (menuAdmin) menuAdmin.style.display = 'inline-flex';
      if (btnPostDrive) btnPostDrive.style.display = 'inline-flex';
      if (btnScheduleIv) btnScheduleIv.style.display = 'inline-flex';
    } else {
      if (menuPortfolio) menuPortfolio.style.display = 'none';
      if (dropdownPortfolioLink) dropdownPortfolioLink.style.display = 'none';
      if (menuCompany) menuCompany.style.display = 'none';
      if (dropdownCompanyLink) dropdownCompanyLink.style.display = 'none';
      if (menuOfficer) menuOfficer.style.display = 'none';
      if (menuAdmin) menuAdmin.style.display = 'none';
      if (btnPostDrive) btnPostDrive.style.display = 'none';
      if (btnScheduleIv) btnScheduleIv.style.display = 'none';
    }

  } else {
    if (loggedOutSection) {
      loggedOutSection.classList.remove('d-none');
      loggedOutSection.classList.add('d-flex');
    }
    if (loggedInSection) {
      loggedInSection.classList.add('d-none');
      loggedInSection.classList.remove('d-flex');
    }

    if (menuApps) menuApps.style.display = 'none';
    if (menuInterviews) menuInterviews.style.display = 'none';
    if (menuPortfolio) menuPortfolio.style.display = 'none';
    if (menuCompany) menuCompany.style.display = 'none';
    if (menuOfficer) menuOfficer.style.display = 'none';
    if (menuAdmin) menuAdmin.style.display = 'none';
    if (btnPostDrive) btnPostDrive.style.display = 'none';
    if (btnScheduleIv) btnScheduleIv.style.display = 'none';
    if (dropdownCompanyLink) dropdownCompanyLink.style.display = 'none';
  }
}

// ==============================================================================
// 2. TAB SWITCHING & ROUTING
// ==============================================================================
function switchTab(tabName) {
  // Permission validations
  if (tabName === 'officer') {
    if (!currentUser || !['Placement Officer', 'Administrator'].includes(currentUser.role)) {
      showToast('Access Restricted: Placement Officer clearance required.', 'danger');
      tabName = 'dashboard';
    }
  }
  if (tabName === 'admin') {
    if (!currentUser || currentUser.role !== 'Administrator') {
      showToast('Access Restricted: Administrator clearance required.', 'danger');
      tabName = 'dashboard';
    }
  }
  if (['applications', 'interviews', 'portfolio', 'company'].includes(tabName)) {
    if (!currentUser) {
      showToast('Please sign in to access this workspace.', 'info');
      const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
      loginModal.show();
      tabName = 'dashboard';
    }
  }

  // Update Nav links
  document.querySelectorAll('.nav-link-custom').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`menu${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
  if (activeBtn) activeBtn.classList.add('active');

  // Switch View Panels
  document.querySelectorAll('.tab-view-panel').forEach(panel => panel.style.display = 'none');
  const targetPanel = document.getElementById(`view${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
  if (targetPanel) targetPanel.style.display = 'block';

  // Load View Data
  if (tabName === 'dashboard') loadAnalytics();
  if (tabName === 'drives') loadDrives();
  if (tabName === 'applications') loadApplications();
  if (tabName === 'interviews') loadInterviews();
  if (tabName === 'portfolio') loadStudentPortfolio();
  if (tabName === 'company') loadCompanyWorkspace();
  if (tabName === 'officer') loadOfficerWorkspace();
  if (tabName === 'admin') loadAdminWorkspace();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==============================================================================
// 3. AUTHENTICATION HANDLERS
// ==============================================================================
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginUserEmail').value.trim();
  const password = document.getElementById('loginUserPassword').value;

  try {
    const res = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: { email, password }
    });
    const data = await res.json();

    if (res.ok) {
      userToken = data.token;
      localStorage.setItem('cpms_token', userToken);
      bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
      showToast('Welcome back! Signed in successfully.', 'success');
      await fetchCurrentUser();
      if (currentUser && currentUser.role === 'Company Representative') {
        switchTab('company');
      } else {
        switchTab('dashboard');
      }
    } else {
      showToast(data.error || 'Authentication failed', 'danger');
    }
  } catch (err) {
    showToast('Network connection error', 'danger');
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const role = document.getElementById('regUserRole').value;
  const email = document.getElementById('regUserEmail').value.trim();
  const fullName = document.getElementById('regFullName').value.trim();
  const password = document.getElementById('regPassword').value;

  const payload = { role, email, password, full_name: fullName };

  if (role === 'Student') {
    payload.roll_number = document.getElementById('regRollNumber').value.trim();
    payload.branch = document.getElementById('regBranch').value;
    payload.semester = document.getElementById('regSemester')?.value || '7th Semester';
    payload.graduation_year = parseInt(document.getElementById('regGradYear')?.value || 2026);
    payload.cgpa = parseFloat(document.getElementById('regCgpa').value || 0.0);
    payload.active_backlogs = parseInt(document.getElementById('regBacklogs').value || 0);
  } else if (role === 'Company Representative') {
    payload.company_name = document.getElementById('regCompanyName').value.trim() || fullName;
    payload.industry = document.getElementById('regIndustry').value.trim() || 'Technology';
    payload.website = document.getElementById('regCompWebsite')?.value.trim() || '';
    payload.hq_location = document.getElementById('regCompHq')?.value.trim() || 'Bengaluru, India';
    payload.contact_person = document.getElementById('regCompContactPerson')?.value.trim() || fullName;
    payload.phone = document.getElementById('regCompPhone')?.value.trim() || '';
    payload.description = document.getElementById('regCompDescription')?.value.trim() || '';
  }

  try {
    const res = await apiFetch('/api/auth/register', {
      method: 'POST',
      body: payload
    });
    const data = await res.json();

    if (res.ok) {
      userToken = data.token;
      localStorage.setItem('cpms_token', userToken);
      bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
      showToast('Registration successful! Welcome email sent to ' + email, 'success');
      await fetchCurrentUser();
      switchTab('dashboard');
    } else {
      showToast(data.error || 'Registration failed', 'danger');
    }
  } catch (err) {
    showToast('Network connection error', 'danger');
  }
}

function toggleRegisterFields() {
  const role = document.getElementById('regUserRole').value;
  const stuFields = document.getElementById('regStudentFields');
  const compFields = document.getElementById('regCompanyFields');

  if (role === 'Student') {
    stuFields.style.display = 'flex';
    compFields.style.display = 'none';
  } else if (role === 'Company Representative') {
    stuFields.style.display = 'none';
    compFields.style.display = 'flex';
  } else {
    stuFields.style.display = 'none';
    compFields.style.display = 'none';
  }
}

function quickFillLogin(email, pwd) {
  document.getElementById('loginUserEmail').value = email;
  document.getElementById('loginUserPassword').value = pwd;
}

function logout() {
  userToken = null;
  currentUser = null;
  localStorage.removeItem('cpms_token');
  updateAuthUI();
  showToast('You have been signed out.', 'info');
  switchTab('dashboard');
}

async function handleChangePassword(e) {
  e.preventDefault();
  const current_password = document.getElementById('pwdCurrent').value;
  const new_password = document.getElementById('pwdNew').value;

  try {
    const res = await apiFetch('/api/auth/change-password', {
      method: 'PUT',
      body: { current_password, new_password }
    });
    const data = await res.json();
    if (res.ok) {
      bootstrap.Modal.getInstance(document.getElementById('changePasswordModal')).hide();
      showToast('Security password updated successfully!', 'success');
    } else {
      showToast(data.error || 'Failed to update password', 'danger');
    }
  } catch (err) {
    showToast('Failed to update password', 'danger');
  }
}

async function uploadProfilePhoto(file) {
  if (!file) return;
  const formData = new FormData();
  formData.append('photo', file);

  try {
    const res = await apiFetch('/api/auth/profile-photo', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    if (res.ok) {
      showToast('Profile photo updated!', 'success');
      await fetchCurrentUser();
    } else {
      showToast(data.error || 'Photo upload failed', 'danger');
    }
  } catch (err) {
    showToast('Photo upload error', 'danger');
  }
}

// ==============================================================================
// 4. NOTIFICATIONS SYSTEM
// ==============================================================================
async function loadNotifications() {
  if (!userToken) return;
  try {
    const res = await apiFetch('/api/notifications');
    if (!res.ok) return;
    const notifs = await res.json();

    const badgeDot = document.getElementById('notifBadgeDot');
    const panel = document.getElementById('notifListPanel');
    const hasUnread = notifs.some(n => !n.is_read);

    if (badgeDot) badgeDot.style.display = hasUnread ? 'block' : 'none';

    if (notifs.length === 0) {
      panel.innerHTML = '<li class="dropdown-header text-uppercase fs-xs font-monospace fw-bold text-muted">Notifications</li><li class="text-center text-muted py-3 fs-sm">No new notifications</li>';
      return;
    }

    panel.innerHTML = `
      <li class="dropdown-header text-uppercase fs-xs font-monospace fw-bold text-muted d-flex justify-content-between align-items-center">
        <span>Notifications (${notifs.length})</span>
        <button class="btn btn-link btn-sm p-0 fs-xs text-primary" onclick="markAllNotificationsRead(); return false;">Mark all read</button>
      </li>
      ${notifs.map(n => `
        <li class="dropdown-item py-2 px-2 border-bottom ${!n.is_read ? 'bg-light font-weight-bold' : ''}" style="white-space: normal;">
          <div class="d-flex align-items-start gap-2">
            <i class="fa-solid fa-bell text-primary mt-1"></i>
            <div>
              <div class="fw-bold fs-xs text-dark">${escapeHtml(n.title)}</div>
              <div class="fs-xs text-muted">${escapeHtml(n.message)}</div>
              <div class="fs-xs text-secondary mt-1">${new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          </div>
        </li>
      `).join('')}
    `;
  } catch (err) {}
}

async function markAllNotificationsRead() {
  await apiFetch('/api/notifications/read', { method: 'PUT' });
  loadNotifications();
}

// ==============================================================================
// 5. SYSTEM HEALTH & LIVE MAIL TESTING
// ==============================================================================
async function refreshSystemHealth() {
  try {
    const res = await fetch('/api/system/health');
    if (!res.ok) return;
    const health = await res.json();

    const dbBadge = document.getElementById('headerDbBadge');
    const dbText = document.getElementById('headerDbText');
    if (dbBadge && dbText) {
      dbText.textContent = health.database.is_mock ? 'MongoDB Engine (Local)' : 'MongoDB Server (Live)';
    }

    const terminalOut = document.getElementById('dbHealthTerminalOutput');
    const colGrid = document.getElementById('dbCollectionGrid');
    if (terminalOut) {
      terminalOut.innerHTML = `
&bull; MongoDB Mode: <span class="text-success">${health.database.mode}</span>
&bull; Database Target: <span class="text-info">${health.database.database}</span>
&bull; URI Endpoint: <span class="text-warning">${health.database.uri}</span>
&bull; Gmail SMTP Server: <span class="text-success">${health.mailer.server}:${health.mailer.port}</span> (Sender: ${health.mailer.sender})
&bull; Status: <span class="text-success">ALL SYSTEMS OPERATIONAL (100% OK)</span>
      `;
    }

    if (colGrid && health.database.collections) {
      const cols = health.database.collections;
      colGrid.innerHTML = Object.keys(cols).map(k => `
        <div class="col-4">
          <div class="p-2 border rounded bg-light">
            <div class="fs-4 fw-bold text-primary">${cols[k]}</div>
            <div class="fs-xs text-muted text-capitalize">${k}</div>
          </div>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error('System health error:', err);
  }
}

async function handleSendTestEmail(e) {
  e.preventDefault();
  const recipient = document.getElementById('testMailRecipient').value.trim();
  const subject = document.getElementById('testMailSubject').value.trim();
  const message = document.getElementById('testMailMessage').value.trim();
  const btn = document.getElementById('btnSubmitTestMail');

  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin me-1"></i> Transmitting Email...';

  try {
    const res = await apiFetch('/api/mail/test', {
      method: 'POST',
      body: { recipient, subject, message }
    });
    const data = await res.json();
    if (res.ok) {
      showToast(`Test email successfully transmitted to ${recipient}!`, 'success');
    } else {
      showToast(data.error || 'Failed to dispatch test email', 'danger');
    }
  } catch (err) {
    showToast('Failed to dispatch test email', 'danger');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-paper-plane me-1"></i> Transmit Live Test Email';
  }
}

// ==============================================================================
// 6. TOAST NOTIFICATION UTILITY
// ==============================================================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const iconMap = {
    success: 'fa-circle-check text-success',
    danger: 'fa-circle-exclamation text-danger',
    warning: 'fa-triangle-exclamation text-warning',
    info: 'fa-circle-info text-info'
  };

  const toast = document.createElement('div');
  toast.className = `toast-custom toast-${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${iconMap[type] || iconMap.info} fs-5"></i>
    <div class="flex-grow-1">${escapeHtml(message)}</div>
    <button type="button" class="btn-close btn-close-sm ms-2" onclick="this.parentElement.remove()"></button>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4500);
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
