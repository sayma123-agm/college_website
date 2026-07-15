/* ==========================================================================
   AGMRCET Multi-Role ERP Portal Simulation Handler
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('erp-login-form');
    const usnInput = document.getElementById('erp-usn');
    const passwordInput = document.getElementById('erp-password');
    const loginSection = document.getElementById('erp-login-section');
    const dashboardSection = document.getElementById('erp-dashboard-section');
    const welcomeName = document.getElementById('erp-welcome-name');
    const displayUsn = document.getElementById('erp-display-usn');
    const roleBadge = document.getElementById('erp-role-badge');
    const logoutBtn = document.getElementById('erp-logout-btn');
    const errorAlert = document.getElementById('login-error-alert');

    // Role Specific Content Configurations
    const roleDetailsConfig = {
        student: {
            name: 'Prajwal Patil (CSE-VI Sem)',
            badge: 'Student Portal',
            tableTitle: 'Semester Grade Records',
            tableHtml: `
                <table class="table table-hover table-striped align-middle mb-0 text-start small">
                    <thead class="table-navy text-white fw-bold">
                        <tr>
                            <th scope="col" class="py-2">Subject Code</th>
                            <th scope="col" class="py-2">Subject Name</th>
                            <th scope="col" class="py-2 text-center">Grade</th>
                            <th scope="col" class="py-2 text-center">Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="fw-semibold text-navy">21CS51</td>
                            <td>Automata Theory & Computations</td>
                            <td class="text-center fw-bold">A</td>
                            <td class="text-center"><span class="badge bg-success text-white">Pass</span></td>
                        </tr>
                        <tr>
                            <td class="fw-semibold text-navy">21CS52</td>
                            <td>Computer Networks</td>
                            <td class="text-center fw-bold">S</td>
                            <td class="text-center"><span class="badge bg-success text-white">Pass</span></td>
                        </tr>
                        <tr>
                            <td class="fw-semibold text-navy">21CS53</td>
                            <td>Database Management Systems</td>
                            <td class="text-center fw-bold">B</td>
                            <td class="text-center"><span class="badge bg-success text-white">Pass</span></td>
                        </tr>
                    </tbody>
                </table>
            `,
            toolsHtml: `
                <div class="col-sm-6">
                    <div class="border rounded-3 p-3 d-flex align-items-center gap-3">
                        <div class="text-danger fs-3"><i class="bi bi-file-earmark-pdf-fill"></i></div>
                        <div>
                            <h6 class="fw-bold text-navy m-0" style="font-size: 13px;">VI Sem CSE Syllabus</h6>
                            <a href="#" class="btn btn-link text-primary p-0 small fw-bold text-decoration-none">Download PDF</a>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="border rounded-3 p-3 d-flex align-items-center gap-3">
                        <div class="text-danger fs-3"><i class="bi bi-file-earmark-pdf-fill"></i></div>
                        <div>
                            <h6 class="fw-bold text-navy m-0" style="font-size: 13px;">Academic Calendar</h6>
                            <a href="#" class="btn btn-link text-primary p-0 small fw-bold text-decoration-none">Download PDF</a>
                        </div>
                    </div>
                </div>
            `
        },
        faculty: {
            name: 'Dr. S. V. Shiragur (Professor & HOD)',
            badge: 'Faculty Board',
            tableTitle: 'Student Attendance Progress Tracker',
            tableHtml: `
                <table class="table table-hover table-striped align-middle mb-0 text-start small">
                    <thead class="table-navy text-white fw-bold">
                        <tr>
                            <th scope="col" class="py-2">USN</th>
                            <th scope="col" class="py-2">Student Name</th>
                            <th scope="col" class="py-2 text-center">Classes Attended</th>
                            <th scope="col" class="py-2 text-center">Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="fw-semibold text-navy">2AG22CS001</td>
                            <td>Prajwal Patil</td>
                            <td class="text-center">42 / 48</td>
                            <td class="text-center fw-bold text-success">87.5%</td>
                        </tr>
                        <tr>
                            <td class="fw-semibold text-navy">2AG22CS002</td>
                            <td>Ramesh Pujar</td>
                            <td class="text-center">36 / 48</td>
                            <td class="text-center fw-bold text-warning">75.0%</td>
                        </tr>
                        <tr>
                            <td class="fw-semibold text-navy">2AG22CS003</td>
                            <td>Savita Koti</td>
                            <td class="text-center">45 / 48</td>
                            <td class="text-center fw-bold text-success">93.7%</td>
                        </tr>
                    </tbody>
                </table>
            `,
            toolsHtml: `
                <div class="col-sm-6">
                    <div class="border rounded-3 p-3 d-flex align-items-center gap-3">
                        <div class="text-primary fs-3"><i class="bi bi-person-check-fill"></i></div>
                        <div>
                            <h6 class="fw-bold text-navy m-0" style="font-size: 13px;">Attendance Entry</h6>
                            <a href="#" class="btn btn-link text-primary p-0 small fw-bold text-decoration-none">Open Form</a>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="border rounded-3 p-3 d-flex align-items-center gap-3">
                        <div class="text-primary fs-3"><i class="bi bi-file-earmark-bar-graph-fill"></i></div>
                        <div>
                            <h6 class="fw-bold text-navy m-0" style="font-size: 13px;">Lesson Plan Status</h6>
                            <a href="#" class="btn btn-link text-primary p-0 small fw-bold text-decoration-none">Update Log</a>
                        </div>
                    </div>
                </div>
            `
        },
        principal: {
            name: 'Dr. Principal (Administration Chief)',
            badge: 'Principal Executive Console',
            tableTitle: 'End-to-End Account Creation & Monitoring Control Center',
            tableHtml: `
                <div class="p-3 border rounded-3 bg-light mb-4">
                    <h6 class="fw-bold text-navy mb-2"><i class="bi bi-person-plus-fill text-success me-1"></i>Create New Portal Account</h6>
                    <form id="principal-create-account-form" onsubmit="principalCreateAccount(event)">
                        <div class="row g-2">
                            <div class="col-sm-4">
                                <input type="text" id="new-account-name" class="form-control form-control-sm" placeholder="Full Name" required style="font-size: 11px;">
                            </div>
                            <div class="col-sm-4">
                                <input type="text" id="new-account-id" class="form-control form-control-sm" placeholder="System ID / USN" required style="font-size: 11px;">
                            </div>
                            <div class="col-sm-4">
                                <select id="new-account-role" class="form-select form-select-sm" required style="font-size: 11px;">
                                    <option value="Student">Student</option>
                                    <option value="Faculty">Faculty</option>
                                    <option value="Parent">Parent</option>
                                </select>
                            </div>
                            <div class="col-12 text-end">
                                <button type="submit" class="btn btn-sm btn-primary px-3 mt-1" style="font-size: 11px; padding: 4px 10px !important;">Provision Account</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="table-responsive rounded-3 border">
                    <table class="table table-hover table-striped align-middle mb-0 text-start small" id="principal-monitoring-table">
                        <thead class="table-navy text-white fw-bold">
                            <tr>
                                <th scope="col" style="font-size: 11px;">System ID / USN</th>
                                <th scope="col" style="font-size: 11px;">Name</th>
                                <th scope="col" style="font-size: 11px;">Role</th>
                                <th scope="col" style="font-size: 11px;">Security Status</th>
                                <th scope="col" class="text-end" style="font-size: 11px;">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="fw-bold text-navy" style="font-size: 11px;">2AG22CS001</td>
                                <td style="font-size: 11px;">Prajwal Patil</td>
                                <td style="font-size: 11px;"><span class="badge bg-success">Student</span></td>
                                <td style="font-size: 11px;"><span class="text-success"><i class="bi bi-shield-fill-check me-1"></i>Active</span></td>
                                <td class="text-end" style="font-size: 11px;"><button class="btn btn-xs btn-outline-danger border-0 py-0 px-2" onclick="this.closest('tr').remove();"><i class="bi bi-trash"></i></button></td>
                            </tr>
                            <tr>
                                <td class="fw-bold text-navy" style="font-size: 11px;">AGM-FAC-101</td>
                                <td style="font-size: 11px;">Dr. S. V. Shiragur</td>
                                <td style="font-size: 11px;"><span class="badge bg-primary">Faculty</span></td>
                                <td style="font-size: 11px;"><span class="text-success"><i class="bi bi-shield-fill-check me-1"></i>Active</span></td>
                                <td class="text-end" style="font-size: 11px;"><button class="btn btn-xs btn-outline-danger border-0 py-0 px-2" onclick="this.closest('tr').remove();"><i class="bi bi-trash"></i></button></td>
                            </tr>
                            <tr>
                                <td class="fw-bold text-navy" style="font-size: 11px;">2AG22CS001-P</td>
                                <td style="font-size: 11px;">Suresh Patil</td>
                                <td style="font-size: 11px;"><span class="badge bg-warning text-dark">Parent</span></td>
                                <td style="font-size: 11px;"><span class="text-success"><i class="bi bi-shield-fill-check me-1"></i>Active</span></td>
                                <td class="text-end" style="font-size: 11px;"><button class="btn btn-xs btn-outline-danger border-0 py-0 px-2" onclick="this.closest('tr').remove();"><i class="bi bi-trash"></i></button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `,
            toolsHtml: `
                <div class="col-sm-6">
                    <div class="border rounded-3 p-3 d-flex align-items-center gap-3">
                        <div class="text-success fs-3"><i class="bi bi-briefcase-fill"></i></div>
                        <div>
                            <h6 class="fw-bold text-navy m-0" style="font-size: 13px;">Security Audit Log</h6>
                            <a href="#" onclick="alert('No security alerts detected. System status nominal.'); return false;" class="btn btn-link text-primary p-0 small fw-bold text-decoration-none">Inspect Log</a>
                        </div>
                    </div>
                </div>
            `
        },
        parent: {
            name: 'Suresh Patil (Father of Prajwal)',
            badge: 'Parent Portal',
            tableTitle: 'Ward Performance & IA Marks Summary',
            tableHtml: `
                <table class="table table-hover table-striped align-middle mb-0 text-start small">
                    <thead class="table-navy text-white fw-bold">
                        <tr>
                            <th scope="col" class="py-2">Subject Name</th>
                            <th scope="col" class="py-2 text-center">IA-1 Score</th>
                            <th scope="col" class="py-2 text-center">IA-2 Score</th>
                            <th scope="col" class="py-2 text-center">Classes Attended</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="fw-semibold text-navy">Automata Theory</td>
                            <td class="text-center">36 / 40</td>
                            <td class="text-center">38 / 40</td>
                            <td class="text-center fw-bold text-success">88%</td>
                        </tr>
                        <tr>
                            <td class="fw-semibold text-navy">Computer Networks</td>
                            <td class="text-center">34 / 40</td>
                            <td class="text-center">35 / 40</td>
                            <td class="text-center fw-bold text-success">85%</td>
                        </tr>
                    </tbody>
                </table>
            `,
            toolsHtml: `
                <div class="col-sm-6">
                    <div class="border rounded-3 p-3 d-flex align-items-center gap-3">
                        <div class="text-warning fs-3"><i class="bi bi-chat-dots-fill"></i></div>
                        <div>
                            <h6 class="fw-bold text-navy m-0" style="font-size: 13px;">Mentor Chat Link</h6>
                            <a href="#" class="btn btn-link text-primary p-0 small fw-bold text-decoration-none">Open Chat</a>
                        </div>
                    </div>
                </div>
            `
        },
        fee: {
            name: 'Accounts & Fee Clearance Desk',
            badge: 'Fee Section Console',
            tableTitle: 'Latest Term Fee Remittances',
            tableHtml: `
                <table class="table table-hover table-striped align-middle mb-0 text-start small">
                    <thead class="table-navy text-white fw-bold">
                        <tr>
                            <th scope="col" class="py-2">Receipt ID</th>
                            <th scope="col" class="py-2">Student USN</th>
                            <th scope="col" class="py-2 text-center">Amount Paid</th>
                            <th scope="col" class="py-2 text-center">Verification Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="fw-semibold text-navy">REC-2026-908</td>
                            <td>2AG22CS001</td>
                            <td class="text-center">85,000 INR</td>
                            <td class="text-center"><span class="badge bg-success text-white">Cleared</span></td>
                        </tr>
                        <tr>
                            <td class="fw-semibold text-navy">REC-2026-909</td>
                            <td>2AG22CS014</td>
                            <td class="text-center">45,000 INR</td>
                            <td class="text-center"><span class="badge bg-warning text-white">Verifying</span></td>
                        </tr>
                    </tbody>
                </table>
            `,
            toolsHtml: `
                <div class="col-sm-6">
                    <div class="border rounded-3 p-3 d-flex align-items-center gap-3">
                        <div class="text-info fs-3"><i class="bi bi-printer-fill"></i></div>
                        <div>
                            <h6 class="fw-bold text-navy m-0" style="font-size: 13px;">Challan Generator</h6>
                            <a href="#" class="btn btn-link text-primary p-0 small fw-bold text-decoration-none">Create Receipt</a>
                        </div>
                    </div>
                </div>
            `
        },
        admin: {
            name: 'System Admin Coordinator',
            badge: 'Super Administrator Console',
            tableTitle: 'Active Concurrency & Load Metrics',
            tableHtml: `
                <table class="table table-hover table-striped align-middle mb-0 text-start small">
                    <thead class="table-navy text-white fw-bold">
                        <tr>
                            <th scope="col" class="py-2">Core Component</th>
                            <th scope="col" class="py-2">Status Metric</th>
                            <th scope="col" class="py-2 text-center">Capacity Limit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="fw-semibold text-navy">MySQL Connection Pool</td>
                            <td>12 threads active</td>
                            <td class="text-center fw-bold">150 Connections</td>
                        </tr>
                        <tr>
                            <td class="fw-semibold text-navy">Static Cache Storage</td>
                            <td>Active Gzip enabled</td>
                            <td class="text-center fw-bold">1,500 Concurrent Users</td>
                        </tr>
                        <tr>
                            <td class="fw-semibold text-navy">Memory Footprint</td>
                            <td>145 MB Heap size</td>
                            <td class="text-center fw-bold">4.0 GB Allocation Limit</td>
                        </tr>
                    </tbody>
                </table>
            `,
            toolsHtml: `
                <div class="col-sm-6">
                    <div class="border rounded-3 p-3 d-flex align-items-center gap-3">
                        <div class="text-danger fs-3"><i class="bi bi-arrow-clockwise"></i></div>
                        <div>
                            <h6 class="fw-bold text-navy m-0" style="font-size: 13px;">Flush Static Cache</h6>
                            <a href="#" onclick="alert('Static cache cleared successfully.'); return false;" class="btn btn-link text-primary p-0 small fw-bold text-decoration-none">Execute Flush</a>
                        </div>
                    </div>
                </div>
            `
        },
        broadcast: {
            name: 'Broadcasting & Emergency Communications (Hubli Division)',
            badge: 'Broadcasting Control Console',
            tableTitle: 'Active Dispatches & Public Announcements Log',
            tableHtml: `
                <div class="p-3 border rounded-3 bg-light mb-4">
                    <h6 class="fw-bold text-navy mb-2"><i class="bi bi-send-fill text-indigo me-1"></i>Dispatch Instant Bulletin / Emergency Broadcast</h6>
                    <form id="broadcast-alert-form" onsubmit="dispatchBroadcast(event)">
                        <div class="row g-2">
                            <div class="col-sm-3">
                                <select id="broadcast-channel" class="form-select form-select-sm" required style="font-size: 11px;">
                                    <option value="SMS">SMS Gateway</option>
                                    <option value="Email">Email Broadcast</option>
                                    <option value="Portal">Portal Alert Banner</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <select id="broadcast-audience" class="form-select form-select-sm" required style="font-size: 11px;">
                                    <option value="All">All Students & Parents</option>
                                    <option value="Faculty">Faculty Only</option>
                                    <option value="CSE">CSE Dept Only</option>
                                </select>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" id="broadcast-message" class="form-control form-control-sm" placeholder="Alert Message Content..." required style="font-size: 11px;">
                            </div>
                            <div class="col-12 text-end">
                                <button type="submit" class="btn btn-sm btn-indigo px-3 mt-1" style="font-size: 11px; padding: 4px 10px !important; background-color: #6366f1 !important; color: white !important; border: 0;">Send Dispatch</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="table-responsive rounded-3 border">
                    <table class="table table-hover table-striped align-middle mb-0 text-start small" id="broadcast-logs-table">
                        <thead class="table-navy text-white fw-bold">
                            <tr>
                                <th scope="col" style="font-size: 11px;">Timestamp</th>
                                <th scope="col" style="font-size: 11px;">Channel</th>
                                <th scope="col" style="font-size: 11px;">Audience</th>
                                <th scope="col" style="font-size: 11px;">Message</th>
                                <th scope="col" style="font-size: 11px;">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="font-size: 11px;">Just Now</td>
                                <td style="font-size: 11px;"><span class="badge bg-secondary">Portal Alert</span></td>
                                <td style="font-size: 11px;">All Students & Parents</td>
                                <td style="font-size: 11px;">Semester fee extension deadline set to July 25th, 2026.</td>
                                <td style="font-size: 11px;"><span class="text-success"><i class="bi bi-check-all me-1"></i>Delivered (1,850 reach)</span></td>
                            </tr>
                            <tr>
                                <td style="font-size: 11px;">2 hours ago</td>
                                <td style="font-size: 11px;"><span class="badge bg-primary">SMS Gateway</span></td>
                                <td style="font-size: 11px;">Faculty Only</td>
                                <td style="font-size: 11px;">Faculty meeting with the Principal at 3:00 PM today in boardroom.</td>
                                <td style="font-size: 11px;"><span class="text-success"><i class="bi bi-check-all me-1"></i>Delivered (125 reach)</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `,
            toolsHtml: `
                <div class="col-sm-6">
                    <div class="border rounded-3 p-3 d-flex align-items-center gap-3">
                        <div class="text-indigo fs-3" style="color: #6366f1 !important;"><i class="bi bi-broadcast-pin"></i></div>
                        <div>
                            <h6 class="fw-bold text-navy m-0" style="font-size: 13px;">Push Alert Gateway</h6>
                            <a href="#" onclick="alert('Gateway status: Online, active channels: 3'); return false;" class="btn btn-link text-primary p-0 small fw-bold text-decoration-none">Gateway Health</a>
                        </div>
                    </div>
                </div>
            `
        }
    };

    // 1. Check if user is already logged in (session persistence)
    const checkLoginState = () => {
        const token = sessionStorage.getItem('erp_token');
        const role = sessionStorage.getItem('erp_role');
        const username = sessionStorage.getItem('erp_username');

        if (token && role && username) {
            fetch('/api/auth/verify', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    showDashboard(username, role);
                } else {
                    sessionStorage.clear();
                    showLogin();
                }
            })
            .catch(() => {
                // Offline fallback
                showDashboard(username, role);
            });
        } else {
            showLogin();
        }
    };

    const showDashboard = (usn, role) => {
        if (loginSection && dashboardSection) {
            loginSection.classList.add('d-none');
            dashboardSection.classList.remove('d-none');
            
            // Look up specific configuration values
            const config = roleDetailsConfig[role] || roleDetailsConfig.student;

            if (welcomeName) welcomeName.innerText = `Welcome Back, ${config.name}`;
            if (displayUsn) displayUsn.innerText = usn.toUpperCase();
            if (roleBadge) {
                roleBadge.innerText = config.badge;
                roleBadge.className = `badge mb-2 text-uppercase ${
                    role === 'admin' ? 'bg-danger' : 
                    role === 'principal' ? 'bg-dark' : 
                    role === 'faculty' ? 'bg-primary' : 
                    role === 'fee' ? 'bg-info text-dark' : 
                    role === 'parent' ? 'bg-warning text-dark' : 
                    role === 'broadcast' ? 'bg-indigo text-white' : 'bg-success'
                }`;
            }

            // Hide all sub-widgets panels, then show active
            ['student', 'faculty', 'principal', 'parent', 'fee', 'admin', 'broadcast'].forEach(r => {
                const el = document.getElementById(`panel-${r}-widgets`);
                if (el) el.classList.add('d-none');
            });

            const activeWidgets = document.getElementById(`panel-${role}-widgets`);
            if (activeWidgets) activeWidgets.classList.remove('d-none');

            // Set table content
            const tableTitle = document.getElementById('erp-table-title');
            const tableContainer = document.getElementById('erp-table-container');
            if (tableTitle) tableTitle.innerHTML = `<i class="bi bi-file-earmark-spreadsheet-fill text-success me-2"></i>${config.tableTitle}`;
            if (tableContainer) tableContainer.innerHTML = config.tableHtml;

            // Set tool downloads content
            const toolsContainer = document.getElementById('erp-tools-container');
            if (toolsContainer) toolsContainer.innerHTML = config.toolsHtml;
            
            // Initialize Principal Doughnut Chart
            if (role === 'principal') {
                setTimeout(() => {
                    const ctx = document.getElementById('principalChart');
                    if (ctx) {
                        new Chart(ctx, {
                            type: 'doughnut',
                            data: {
                                labels: ['CSE/AIML', 'ECE/EEE', 'Civil/Mech', 'MBA/MCA'],
                                datasets: [{
                                    data: [420, 310, 180, 290],
                                    backgroundColor: ['#0B3D91', '#1565C0', '#F9A826', '#16A34A'],
                                    borderWidth: 0
                                }]
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                        labels: { boxWidth: 10, font: { size: 10 } }
                                    }
                                }
                            }
                        });
                    }
                }, 200);
            }

            // Trigger GSAP entrance animation on dashboard cards if loaded
            if (typeof gsap !== 'undefined') {
                gsap.from('#erp-dashboard-section .card', {
                    opacity: 0,
                    y: 20,
                    stagger: 0.1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        }
    };

    const showLogin = () => {
        if (loginSection && dashboardSection) {
            dashboardSection.classList.add('d-none');
            loginSection.classList.remove('d-none');
        }
    };

    // 2. Login Form Submission Handlers for all roles
    const roleForms = document.querySelectorAll('.erp-role-form');
    roleForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const role = form.getAttribute('data-role');
            const usnVal = form.querySelector('.erp-username-input').value.trim().toUpperCase();
            const passwordVal = form.querySelector('.erp-password-input').value;

            if (errorAlert) errorAlert.classList.add('d-none');

            fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: usnVal, password: passwordVal, expectedRole: role })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    sessionStorage.setItem('erp_token', data.token);
                    sessionStorage.setItem('erp_role', data.role);
                    sessionStorage.setItem('erp_username', data.username);
                    showDashboard(data.username, data.role);
                    form.reset();
                } else {
                    if (errorAlert) {
                        errorAlert.innerText = data.message || 'Authentication failed.';
                        errorAlert.classList.remove('d-none');
                        errorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            })
            .catch(err => {
                console.error(err);
                if (errorAlert) {
                    errorAlert.innerText = 'Authentication error. Please check server status.';
                    errorAlert.classList.remove('d-none');
                    errorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        });
    });

    // Register Principal Account Creation Handler
    window.principalCreateAccount = (e) => {
        e.preventDefault();
        const name = document.getElementById('new-account-name').value;
        const sysId = document.getElementById('new-account-id').value;
        const role = document.getElementById('new-account-role').value;

        const tableBody = document.getElementById('principal-monitoring-table').getElementsByTagName('tbody')[0];
        const newRow = tableBody.insertRow(0);

        let roleBadge = '';
        if (role === 'Student') roleBadge = '<span class="badge bg-success">Student</span>';
        else if (role === 'Faculty') roleBadge = '<span class="badge bg-primary">Faculty</span>';
        else roleBadge = '<span class="badge bg-warning text-dark">Parent</span>';

        newRow.innerHTML = `
            <td class="fw-bold text-navy" style="font-size: 11px;">${sysId.toUpperCase()}</td>
            <td style="font-size: 11px;">${name}</td>
            <td style="font-size: 11px;">${roleBadge}</td>
            <td style="font-size: 11px;"><span class="text-success"><i class="bi bi-shield-fill-check me-1"></i>Active</span></td>
            <td class="text-end" style="font-size: 11px;"><button class="btn btn-xs btn-outline-danger border-0 py-0 px-2" onclick="this.closest('tr').remove();"><i class="bi bi-trash"></i></button></td>
        `;

        document.getElementById('principal-create-account-form').reset();
        alert(`Account successfully provisioned for ${name} (${sysId.toUpperCase()})!`);
    };

    // Register Broadcast Dispatch Handler
    window.dispatchBroadcast = (e) => {
        e.preventDefault();
        const ch = document.getElementById('broadcast-channel').value;
        const aud = document.getElementById('broadcast-audience').value;
        const msg = document.getElementById('broadcast-message').value;

        const tableBody = document.getElementById('broadcast-logs-table').getElementsByTagName('tbody')[0];
        const newRow = tableBody.insertRow(0);

        newRow.innerHTML = `
            <td style="font-size: 11px;">Just Now</td>
            <td style="font-size: 11px;"><span class="badge bg-secondary">${ch}</span></td>
            <td style="font-size: 11px;">${aud}</td>
            <td style="font-size: 11px;">${msg}</td>
            <td style="font-size: 11px;"><span class="text-success"><i class="bi bi-check-all me-1"></i>Delivered (Active)</span></td>
        `;

        document.getElementById('broadcast-alert-form').reset();
        alert(`Broadcast dispatched successfully to ${aud} via ${ch}!`);
    };

    // 3. Logout Handler
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('erp_token');
            sessionStorage.removeItem('erp_role');
            sessionStorage.removeItem('erp_username');
            showLogin();
        });
    }

    // 4. Super Admin CMS Dashboard Action Handlers
    window.loadCmsNews = () => {
        const tableTitle = document.getElementById('erp-table-title');
        const tableContainer = document.getElementById('erp-table-container');
        if (tableTitle) tableTitle.innerHTML = `<i class="bi bi-newspaper text-primary me-2"></i>News CMS Manager`;

        const formHtml = `
            <div class="p-3 border rounded-3 bg-light mb-4 text-start">
                <h6 class="fw-bold text-navy mb-2"><i class="bi bi-plus-circle-fill text-success me-1"></i>Publish New Announcement</h6>
                <form onsubmit="submitCmsNews(event)">
                    <div class="row g-2">
                        <div class="col-sm-4">
                            <select id="cms-category" class="form-select shadow-none small rounded-2" required style="font-size: 12px; padding: 6px;">
                                <option value="circular">Circular</option>
                                <option value="admissions">Admissions</option>
                                <option value="placement">Placements</option>
                                <option value="event">Event</option>
                                <option value="achievement">Achievement</option>
                            </select>
                        </div>
                        <div class="col-sm-8">
                            <input type="text" id="cms-title" class="form-control shadow-none small rounded-2" placeholder="Announcement Title" required style="font-size: 12px; padding: 6px;">
                        </div>
                        <div class="col-12">
                            <textarea id="cms-content" class="form-control shadow-none small rounded-2" rows="2" placeholder="Announcement Content details..." required style="font-size: 12px; padding: 6px;"></textarea>
                        </div>
                        <div class="col-12 text-end">
                            <button type="submit" class="btn btn-sm btn-primary px-3" style="padding: 6px 12px !important; font-size: 12px;">Publish Bulletin</button>
                        </div>
                    </div>
                </form>
            </div>
        `;

        fetch('/api/news')
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                let rowsHtml = '';
                data.news.forEach(item => {
                    rowsHtml += `
                        <tr>
                            <td class="fw-bold"><span class="badge bg-secondary-light text-secondary border text-uppercase">${item.category}</span></td>
                            <td>
                                <div class="fw-semibold text-navy">${item.title}</div>
                                <div class="text-muted text-xs" style="font-size: 11px;">${item.content}</div>
                            </td>
                            <td class="text-muted small" style="font-size: 11px;">${item.date}</td>
                            <td class="text-end">
                                <button class="btn btn-sm btn-outline-danger py-1 px-2 border-0" onclick="deleteCmsNews(${item.id})" style="padding: 4px 8px !important;">
                                    <i class="bi bi-trash3-fill"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                });

                tableContainer.innerHTML = `
                    ${formHtml}
                    <div class="table-responsive rounded-3 border">
                        <table class="table table-hover table-striped align-middle mb-0 text-start small">
                            <thead class="table-navy text-white fw-bold">
                                <tr>
                                    <th scope="col" style="width: 15%; font-size: 12px;">Category</th>
                                    <th scope="col" style="width: 60%; font-size: 12px;">Announcement Details</th>
                                    <th scope="col" style="width: 15%; font-size: 12px;">Date</th>
                                    <th scope="col" class="text-end" style="width: 10%; font-size: 12px;">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rowsHtml || '<tr><td colspan="4" class="text-center">No bulletins active.</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                `;
            }
        });
    };

    window.submitCmsNews = (e) => {
        e.preventDefault();
        const category = document.getElementById('cms-category').value;
        const title = document.getElementById('cms-title').value;
        const content = document.getElementById('cms-content').value;

        fetch('/api/news', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category, title, content })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                loadCmsNews();
            } else {
                alert('Failed to publish news: ' + data.message);
            }
        });
    };

    window.deleteCmsNews = (id) => {
        if (!confirm('Are you sure you want to delete this news bulletin?')) return;
        fetch(`/api/news/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                loadCmsNews();
            } else {
                alert('Failed to delete news.');
            }
        });
    };

    window.loadCmsInquiries = () => {
        const tableTitle = document.getElementById('erp-table-title');
        const tableContainer = document.getElementById('erp-table-container');
        if (tableTitle) tableTitle.innerHTML = `<i class="bi bi-envelope-check text-navy me-2"></i>Admissions Inquiry Database`;

        fetch('/api/inquiries')
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                let rowsHtml = '';
                data.inquiries.forEach(item => {
                    rowsHtml += `
                        <tr>
                            <td class="fw-semibold text-navy">${item.name}</td>
                            <td>
                                <div style="font-size: 11px;"><i class="bi bi-envelope me-1"></i><a href="mailto:${item.email}" class="text-decoration-none">${item.email}</a></div>
                                <div style="font-size: 11px;"><i class="bi bi-phone me-1"></i>${item.phone}</div>
                            </td>
                            <td><span class="badge bg-primary-light text-primary border" style="font-size: 11px;">${item.course}</span></td>
                            <td><span class="text-muted text-xs" style="font-size: 11px;">${item.message}</span></td>
                        </tr>
                    `;
                });

                tableContainer.innerHTML = `
                    <div class="table-responsive rounded-3 border">
                        <table class="table table-hover table-striped align-middle mb-0 text-start small">
                            <thead class="table-navy text-white fw-bold">
                                <tr>
                                    <th scope="col" style="width: 20%; font-size: 12px;">Student Name</th>
                                    <th scope="col" style="width: 30%; font-size: 12px;">Contact Details</th>
                                    <th scope="col" style="width: 25%; font-size: 12px;">Course Interest</th>
                                    <th scope="col" style="width: 25%; font-size: 12px;">Message / Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rowsHtml || '<tr><td colspan="4" class="text-center">No inquiry submissions found.</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                `;
            }
        });
    };

    // Execute state check on load
    checkLoginState();
});
