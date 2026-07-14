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
            tableTitle: 'Statutory NAAC & NBA Audit Progress',
            tableHtml: `
                <table class="table table-hover table-striped align-middle mb-0 text-start small">
                    <thead class="table-navy text-white fw-bold">
                        <tr>
                            <th scope="col" class="py-2">Department Name</th>
                            <th scope="col" class="py-2">Accreditation Status</th>
                            <th scope="col" class="py-2 text-center">SAR Submission</th>
                            <th scope="col" class="py-2 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="fw-semibold text-navy">Computer Science</td>
                            <td>NBA Accredited</td>
                            <td class="text-center">Completed</td>
                            <td class="text-center"><span class="badge bg-success text-white">Active</span></td>
                        </tr>
                        <tr>
                            <td class="fw-semibold text-navy">Electronics & Comm.</td>
                            <td>NBA Accredited</td>
                            <td class="text-center">Completed</td>
                            <td class="text-center"><span class="badge bg-success text-white">Active</span></td>
                        </tr>
                        <tr>
                            <td class="fw-semibold text-navy">Civil Engineering</td>
                            <td>NAAC Evaluation</td>
                            <td class="text-center">In Progress</td>
                            <td class="text-center"><span class="badge bg-warning text-white">Pending</span></td>
                        </tr>
                    </tbody>
                </table>
            `,
            toolsHtml: `
                <div class="col-sm-6">
                    <div class="border rounded-3 p-3 d-flex align-items-center gap-3">
                        <div class="text-success fs-3"><i class="bi bi-briefcase-fill"></i></div>
                        <div>
                            <h6 class="fw-bold text-navy m-0" style="font-size: 13px;">NIRF Submission portal</h6>
                            <a href="#" class="btn btn-link text-primary p-0 small fw-bold text-decoration-none">Inspect Sheets</a>
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
        }
    };

    // 1. Check if user is already logged in (session persistence)
    const checkLoginState = () => {
        // Did we submit from landing page?
        const landingRole = sessionStorage.getItem('erp_role');
        const landingUsername = sessionStorage.getItem('erp_username');

        if (landingRole && landingUsername) {
            showDashboard(landingUsername, landingRole);
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
                    role === 'parent' ? 'bg-warning text-dark' : 'bg-success'
                }`;
            }

            // Hide all sub-widgets panels, then show active
            ['student', 'faculty', 'principal', 'parent', 'fee', 'admin'].forEach(r => {
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

    // 2. Login Form Submission Handler
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const usnVal = usnInput.value.trim().toUpperCase();
            const passwordVal = passwordInput.value;

            // Demo logic
            let role = 'student';
            if (usnVal.startsWith('AGM-FAC-')) role = 'faculty';
            else if (usnVal.startsWith('AGM-PRIN-')) role = 'principal';
            else if (usnVal.endsWith('-P')) role = 'parent';
            else if (usnVal.startsWith('AGM-FEE-')) role = 'fee';
            else if (usnVal.startsWith('AGM-ADMIN-')) role = 'admin';

            sessionStorage.setItem('erp_role', role);
            sessionStorage.setItem('erp_username', usnVal);
            if (errorAlert) errorAlert.classList.add('d-none');
            
            showDashboard(usnVal, role);
            loginForm.reset();
        });
    }

    // 3. Logout Handler
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('erp_role');
            sessionStorage.removeItem('erp_username');
            showLogin();
        });
    }

    // Execute state check on load
    checkLoginState();
});
