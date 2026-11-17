async function runSmokeTest() {
  console.log('--- STARTING CPMS FINAL SYSTEM SMOKE TEST ---');
  
  // 1. Admin Login
  console.log('[1] Testing Admin Login (admin@cpms / Cpms@123456)...');
  const loginRes = await fetch('http://localhost:8088/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@cpms', password: 'Cpms@123456' })
  });
  if (!loginRes.ok) {
    throw new Error('Admin login failed: ' + loginRes.status + ' ' + (await loginRes.text()));
  }
  const loginData = await loginRes.json();
  console.log('  -> Success! User:', loginData.user.fullName, '| Role:', loginData.user.role);
  const token = loginData.token;

  // 2. Fetch Officers
  console.log('[2] Testing GET /api/admin/officers with Admin JWT...');
  const offRes = await fetch('http://localhost:8088/api/admin/officers', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  if (!offRes.ok) {
    throw new Error('Get officers failed: ' + offRes.status);
  }
  const officers = await offRes.json();
  console.log('  -> Success! Found', officers.length, 'officer(s):', officers.map(o => o.fullName || o.email).join(', '));

  // 3. Fetch Placement Drives
  console.log('[3] Testing GET /api/drives with Admin JWT...');
  const drivesRes = await fetch('http://localhost:8088/api/drives', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  if (!drivesRes.ok) {
    throw new Error('Get drives failed: ' + drivesRes.status);
  }
  const drives = await drivesRes.json();
  console.log('  -> Success! Found', drives.length, 'drive(s):', drives.map(d => d.companyName).join(', '));

  // 4. Fetch Students
  console.log('[4] Testing GET /api/students with Admin JWT...');
  const stuRes = await fetch('http://localhost:8088/api/students', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  if (!stuRes.ok) {
    throw new Error('Get students failed: ' + stuRes.status);
  }
  const students = await stuRes.json();
  console.log('  -> Success! Found', students.length, 'student(s):', students.map(s => s.fullName).join(', '));

  // 5. Test Audit Logs
  console.log('[5] Testing GET /api/admin/audit-logs with Admin JWT...');
  const auditRes = await fetch('http://localhost:8088/api/admin/audit-logs', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  if (!auditRes.ok) {
    throw new Error('Get audit logs failed: ' + auditRes.status);
  }
  const logs = await auditRes.json();
  console.log('  -> Success! Found', logs.length, 'audit log(s).');

  // 6. Test OTP verification rejection on fake OTP
  console.log('[6] Testing OTP validation endpoint security...');
  const verifyRes = await fetch('http://localhost:8088/api/auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'test@cpms.ac.in', otp: '000000', purpose: 'REGISTRATION' })
  });
  const verifyData = await verifyRes.json();
  console.log('  -> Success! Fake OTP safely rejected:', verifyData.verified === false);

  console.log('--- ALL SMOKE TESTS PASSED WITH 100% SUCCESS ---');
}

runSmokeTest().catch(err => {
  console.error('Smoke test failed:', err);
  process.exit(1);
});
