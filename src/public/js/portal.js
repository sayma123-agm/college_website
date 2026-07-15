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

    let principalChartInstance = null;
    let feeChartInstance = null;

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
        },
        hod: {
            name: 'Dr. Mahesh G. (HOD CSE)',
            badge: 'HOD Portal',
            tableTitle: 'Department Faculty Allocation',
            tableHtml: `
                <table class="table table-hover table-striped align-middle mb-0 text-start small">
                    <thead class="table-navy text-white fw-bold">
                        <tr>
                            <th scope="col" class="py-2">Faculty Name</th>
                            <th scope="col" class="py-2">Designation</th>
                            <th scope="col" class="py-2 text-center">Allocated Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="fw-semibold text-navy">Dr. Mahesh G.</td>
                            <td>Professor & HOD</td>
                            <td class="text-center fw-bold">12 Hrs</td>
                        </tr>
                        <tr>
                            <td class="fw-semibold text-navy">Prof. R. S. Patil</td>
                            <td>Assistant Professor</td>
                            <td class="text-center fw-bold">18 Hrs</td>
                        </tr>
                        <tr>
                            <td class="fw-semibold text-navy">Prof. Sneha K.</td>
                            <td>Assistant Professor</td>
                            <td class="text-center fw-bold">16 Hrs</td>
                        </tr>
                    </tbody>
                </table>
            `,
            toolsHtml: `
                <div class="col-sm-6">
                    <div class="border rounded-3 p-3 d-flex align-items-center gap-3">
                        <div class="text-primary fs-3"><i class="bi bi-file-earmark-check"></i></div>
                        <div>
                            <h6 class="fw-bold text-navy m-0" style="font-size: 13px;">Approve Electives</h6>
                            <a href="#" onclick="alert('All elective registrations approved.'); return false;" class="btn btn-link text-primary p-0 small fw-bold text-decoration-none">Approve All</a>
                        </div>
                    </div>
                </div>
            `
        },
        office: {
            name: 'Shree Shivanand (Office Registrar)',
            badge: 'Office Section',
            tableTitle: 'Pending Admissions Verification',
            tableHtml: `
                <table class="table table-hover table-striped align-middle mb-0 text-start small">
                    <thead class="table-navy text-white fw-bold">
                        <tr>
                            <th scope="col" class="py-2">Student Name</th>
                            <th scope="col" class="py-2">Quota</th>
                            <th scope="col" class="py-2 text-center">Document Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="fw-semibold text-navy">Rahul Deshpande</td>
                            <td>KCET</td>
                            <td class="text-center"><span class="badge bg-success">Verified</span></td>
                        </tr>
                        <tr>
                            <td class="fw-semibold text-navy">Sneha Hegde</td>
                            <td>COMEDK</td>
                            <td class="text-center"><span class="badge bg-warning text-dark">Pending</span></td>
                        </tr>
                        <tr>
                            <td class="fw-semibold text-navy">Kiran Kumar</td>
                            <td>Management</td>
                            <td class="text-center"><span class="badge bg-success">Verified</span></td>
                        </tr>
                    </tbody>
                </table>
            `,
            toolsHtml: `
                <div class="col-sm-6">
                    <div class="border rounded-3 p-3 d-flex align-items-center gap-3">
                        <div class="text-primary fs-3"><i class="bi bi-file-text"></i></div>
                        <div>
                            <h6 class="fw-bold text-navy m-0" style="font-size: 13px;">Print Hall Tickets</h6>
                            <a href="#" onclick="alert('CSE Hall Tickets printing started.'); return false;" class="btn btn-link text-primary p-0 small fw-bold text-decoration-none">Print Logs</a>
                        </div>
                    </div>
                </div>
            `
        }
    };

    // Demo credential presets for gateway selection in the portal directory
    const rolePresets = {
        student: {
            usn: '2AG22CS001',
            pass: 'password',
            title: 'Student Portal ERP',
            badge: 'Student',
            badgeClass: 'bg-primary',
            desc: 'Access your semester grade records, track attendance in real-time, view current CGPA progression, download syllabus guidelines, and access academic calendars.'
        },
        faculty: {
            usn: 'AGM-FAC-101',
            pass: 'password',
            title: 'Faculty Board Console',
            badge: 'Faculty',
            badgeClass: 'bg-primary',
            desc: 'Configure lesson plans, update student attendance records, input internal assessment scores, and track daily session schedules.'
        },
        hod: {
            usn: 'AGM-HOD-105',
            pass: 'password',
            title: 'HOD Department Console',
            badge: 'HOD',
            badgeClass: 'bg-primary',
            desc: 'Approve elective registration forms, coordinate department lesson reviews, broadcast HOD notices to student portal pages, and manage department faculty allocations.'
        },
        office: {
            usn: 'AGM-OFF-301',
            pass: 'password',
            title: 'Office Section Registry',
            badge: 'Office',
            badgeClass: 'bg-success',
            desc: 'Process new student registrations, manage physical archives database, print hall tickets, verify scholarship applications, and dispatch documents to VTU.'
        },
        fee: {
            usn: 'AGM-FEE-201',
            pass: 'password',
            title: 'Accounts & Fee Clearance Desk',
            badge: 'Fee Section',
            badgeClass: 'bg-success',
            desc: 'Process term remittances, issue challans and receipts, verify scholarship statuses, and issue exam clearances.'
        },
        principal: {
            usn: 'AGM-PRIN-001',
            pass: 'password',
            title: 'Principal Chief Executive Console',
            badge: 'Principal',
            badgeClass: 'bg-dark',
            desc: 'Oversee institutional metrics, view department-wise enrollment statistics, and run audits on NAAC/NBA accreditation progress.'
        },
        admin: {
            usn: 'AGM-ADMIN-999',
            pass: 'password',
            title: 'Super Administrator Console',
            badge: 'Admin Section',
            badgeClass: 'bg-dark',
            desc: 'Monitor server threads, clear static cache storage, adjust connection limits, and manage global website configurations.'
        }
    };

    const switchPortalGateway = (role) => {
        // Toggle active classes on gateway buttons
        document.querySelectorAll('#erp-login-section .gateway-select-btn').forEach(btn => {
            btn.classList.remove('btn-primary', 'text-white', 'shadow-sm', 'border-primary');
            btn.classList.add('btn-light', 'border');
            
            // Revert inner spans to text-navy
            const textSpan = btn.querySelector('span');
            if (textSpan) {
                textSpan.classList.remove('text-white');
                textSpan.classList.add('text-navy');
            }
            // Revert chevron color
            const chevron = btn.querySelector('.bi-chevron-right');
            if (chevron) {
                chevron.classList.remove('text-white-50');
                chevron.classList.add('text-muted');
            }
        });

        const activeBtn = document.querySelector(`#erp-login-section .gateway-select-btn[data-role="${role}"]`);
        if (activeBtn) {
            activeBtn.classList.remove('btn-light', 'border');
            activeBtn.classList.add('btn-primary', 'text-white', 'shadow-sm', 'border-primary');
            
            // Highlight text span inside button
            const textSpan = activeBtn.querySelector('span');
            if (textSpan) {
                textSpan.classList.remove('text-navy');
                textSpan.classList.add('text-white');
            }
            // Highlight chevron
            const chevron = activeBtn.querySelector('.bi-chevron-right');
            if (chevron) {
                chevron.classList.remove('text-muted');
                chevron.classList.add('text-white-50');
            }
        }

        // Pre-fill credentials
        const preset = rolePresets[role];
        if (preset) {
            if (usnInput) {
                usnInput.value = preset.usn;
            }
            if (passwordInput) {
                passwordInput.value = preset.pass;
            }
            
            // Update labels based on role type
            const userLabel = document.getElementById('username-label');
            if (userLabel) {
                if (role === 'student') userLabel.innerText = 'University Seat Number (USN)';
                else if (role === 'faculty') userLabel.innerText = 'Faculty ID Code';
                else if (role === 'hod') userLabel.innerText = 'HOD Code ID';
                else if (role === 'office') userLabel.innerText = 'Office Staff ID';
                else if (role === 'fee') userLabel.innerText = 'Account Office ID';
                else if (role === 'principal') userLabel.innerText = 'Principal Auth Code';
                else if (role === 'admin') userLabel.innerText = 'Super Admin Username';
            }

            // Update badge
            const badge = document.getElementById('portal-selected-badge');
            if (badge) {
                badge.innerText = preset.badge;
                badge.className = `badge text-uppercase px-2.5 py-1 ${preset.badgeClass}`;
            }

            // Update hint text
            const hintText = document.getElementById('hint-text');
            if (hintText) {
                hintText.innerHTML = `Demo credentials loaded: <strong>${preset.usn}</strong> | Password: <strong>${preset.pass}</strong>`;
            }

            // Update info display
            const infoTitle = document.getElementById('portal-info-title');
            const infoDesc = document.getElementById('portal-info-desc');
            if (infoTitle) infoTitle.innerText = preset.title;
            if (infoDesc) infoDesc.innerText = preset.desc;

            // Trigger GSAP authorization card update animation
            if (typeof gsap !== 'undefined') {
                gsap.fromTo('#portal-auth-card', 
                    { x: 15, opacity: 0.8, scale: 0.99 }, 
                    { x: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.2)' }
                );
            }
        }
    };

    // Attach click listeners to gateway buttons
    document.querySelectorAll('#erp-login-section .gateway-select-btn').forEach(btn => {
        // Standard href navigation will trigger page reload, loading new route
    });

    // Run initial gateway selection if login form exists
    if (loginForm) {
        const pathParts = window.location.pathname.split('/');
        const urlRole = pathParts[pathParts.length - 1];
        const defaultRole = ['faculty', 'hod', 'office', 'fee', 'principal', 'admin'].includes(urlRole) ? urlRole : 'faculty';
        switchPortalGateway(defaultRole);
    }

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
                    role === 'faculty' || role === 'hod' ? 'bg-primary' : 
                    role === 'fee' || role === 'office' ? 'bg-info text-dark' : 
                    role === 'parent' ? 'bg-warning text-dark' : 'bg-success'
                }`;
            }

            // Hide all sub-widgets panels, then show active
            ['student', 'faculty', 'hod', 'principal', 'parent', 'fee', 'office', 'admin'].forEach(r => {
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
            
            // Show dynamic notice broadcast banner to student
            const announcementBanner = document.getElementById('erp-announcement-banner');
            const announcementText = document.getElementById('announcement-broadcast-text');
            if (role === 'student') {
                const storedAnnouncement = sessionStorage.getItem('active_announcement');
                if (storedAnnouncement && announcementBanner && announcementText) {
                    announcementText.innerText = storedAnnouncement;
                    announcementBanner.classList.remove('d-none');
                } else if (announcementBanner) {
                    // Fallback default message
                    announcementText.innerText = "Please submit your VTU elective registration sheets by Friday.";
                    announcementBanner.classList.remove('d-none');
                }
            } else {
                if (announcementBanner) announcementBanner.classList.add('d-none');
            }

            // Initialize dynamic charts for Principal and Fee Section panels
            if (role === 'principal' && typeof Chart !== 'undefined') {
                const ctx = document.getElementById('principalChart');
                if (ctx) {
                    if (principalChartInstance) principalChartInstance.destroy();
                    principalChartInstance = new Chart(ctx, {
                        type: 'doughnut',
                        data: {
                            labels: ['CSE & IT', 'ECE & EEE', 'Mechanical', 'Civil', 'PG (MBA/MCA)'],
                            datasets: [{
                                data: [650, 320, 150, 120, 280],
                                backgroundColor: ['#0f2b5c', '#0088cc', '#d4af37', '#6c757d', '#10b981'],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                    labels: { font: { size: 10 }, boxWidth: 10 }
                                }
                            }
                        }
                    });
                }
            }

            if (role === 'fee' && typeof Chart !== 'undefined') {
                const ctx = document.getElementById('feeChart');
                if (ctx) {
                    if (feeChartInstance) feeChartInstance.destroy();
                    feeChartInstance = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: ['April', 'May', 'June', 'July (Est)'],
                            datasets: [{
                                label: 'Collected (INR Millions)',
                                data: [2.1, 3.4, 1.8, 1.1],
                                backgroundColor: '#10b981',
                                borderRadius: 4
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false }
                            },
                            scales: {
                                y: { beginAtZero: true, grid: { display: false } },
                                x: { grid: { display: false } }
                            }
                        }
                    });
                }
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

    // 2. Login Form Submission Handler
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const usnVal = usnInput.value.trim().toUpperCase();
            const passwordVal = passwordInput.value;

            // Demo logic
            let role = 'student';
            if (usnVal.startsWith('AGM-FAC-')) role = 'faculty';
            else if (usnVal.startsWith('AGM-HOD-')) role = 'hod';
            else if (usnVal.startsWith('AGM-OFF-')) role = 'office';
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

    // ==========================================
    // V2 Dashboards Interactive Controllers
    // ==========================================

    // A. Grade Predictor Math
    const updateGradePrediction = () => {
        const iaEl = document.getElementById('pred-slider-ia');
        const cgpaEl = document.getElementById('pred-slider-cgpa');
        if (!iaEl || !cgpaEl) return;

        const ia = parseInt(iaEl.value, 10);
        const cgpa = parseFloat(cgpaEl.value);
        
        document.getElementById('pred-val-ia').innerText = ia;
        document.getElementById('pred-val-cgpa').innerText = cgpa.toFixed(1);
        
        // Target: cgpa * 10 (e.g. 8.5 cgpa -> 85 marks target)
        const targetMark = cgpa * 10;
        const neededScaled = targetMark - ia;
        
        // exam out of 100 counts for 60% of mark. Scale: (neededScaled / 60) * 100
        let neededExam = Math.ceil((neededScaled / 60) * 100);
        if (neededExam < 35) neededExam = 35; // passing grade threshold
        if (neededExam > 100) neededExam = 100; // capped
        
        const reqLabel = document.getElementById('pred-val-required');
        if (reqLabel) {
            reqLabel.innerText = neededExam;
            if (neededExam >= 85) {
                reqLabel.className = 'text-danger font-extrabold';
            } else if (neededExam >= 60) {
                reqLabel.className = 'text-warning font-extrabold';
            } else {
                reqLabel.className = 'text-success font-extrabold';
            }
        }
    };

    const iaSlider = document.getElementById('pred-slider-ia');
    const cgpaSlider = document.getElementById('pred-slider-cgpa');
    if (iaSlider) iaSlider.addEventListener('input', updateGradePrediction);
    if (cgpaSlider) cgpaSlider.addEventListener('input', updateGradePrediction);

    // B. Faculty Notice Broadcaster
    const broadcastForm = document.getElementById('faculty-broadcast-form');
    if (broadcastForm) {
        broadcastForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const textInput = document.getElementById('broadcast-message-input');
            const alertSuccess = document.getElementById('broadcast-success-alert');
            
            if (textInput && textInput.value.trim()) {
                sessionStorage.setItem('active_announcement', textInput.value.trim());
                if (alertSuccess) {
                    alertSuccess.classList.remove('d-none');
                    setTimeout(() => alertSuccess.classList.add('d-none'), 2000);
                }
                broadcastForm.reset();
            }
        });
    }

    // C. Parent Consultant Scheduler
    const parentScheduleForm = document.getElementById('parent-schedule-form');
    if (parentScheduleForm) {
        parentScheduleForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const alertSuccess = document.getElementById('scheduler-success-alert');
            if (alertSuccess) {
                alertSuccess.classList.remove('d-none');
                setTimeout(() => alertSuccess.classList.add('d-none'), 2000);
            }
            parentScheduleForm.reset();
        });
    }

    // D. HOD Notice Broadcaster
    const hodBroadcastForm = document.getElementById('hod-broadcast-form');
    if (hodBroadcastForm) {
        hodBroadcastForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const textInput = document.getElementById('hod-broadcast-message-input');
            const alertSuccess = document.getElementById('hod-broadcast-success-alert');
            
            if (textInput && textInput.value.trim()) {
                sessionStorage.setItem('active_announcement', "HOD Notice: " + textInput.value.trim());
                if (alertSuccess) {
                    alertSuccess.classList.remove('d-none');
                    setTimeout(() => alertSuccess.classList.add('d-none'), 2000);
                }
                hodBroadcastForm.reset();
            }
        });
    }

    // E. Forgot Password Form Submit
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const resetSuccessAlert = document.getElementById('reset-success-alert');
            if (resetSuccessAlert) {
                resetSuccessAlert.classList.remove('d-none');
                setTimeout(() => {
                    resetSuccessAlert.classList.add('d-none');
                    const modalEl = document.getElementById('forgotPasswordModal');
                    const modal = bootstrap.Modal.getInstance(modalEl);
                    if (modal) modal.hide();
                }, 2200);
            }
            forgotPasswordForm.reset();
        });
    }

    // Execute state check on load
    checkLoginState();

    // ==========================================
    // V2 Advanced Interactive Animation Frameworks
    // ==========================================

    // 1. Interactive Constellation Nodes Particle Canvas
    const canvas = document.getElementById('portal-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;
        
        window.addEventListener('resize', () => {
            if (canvas) {
                width = canvas.width = canvas.offsetWidth;
                height = canvas.height = canvas.offsetHeight;
            }
        });

        const particles = [];
        const particleCount = 45;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.7,
                vy: (Math.random() - 0.5) * 0.7,
                radius: Math.random() * 2 + 1
            });
        }

        const animateParticles = () => {
            if (!document.getElementById('portal-particles')) return; // exit loop if navigated away
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'rgba(15, 43, 92, 0.08)';
            ctx.strokeStyle = 'rgba(15, 43, 92, 0.04)';
            
            for (let i = 0; i < particleCount; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();

                for (let j = i + 1; j < particleCount; j++) {
                    const p2 = particles[j];
                    const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        };
        animateParticles();
    }

    // 2. 3D Perspective Card Tilt Physics
    const tiltCards = document.querySelectorAll('#erp-login-section .card, #portal-auth-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = -(y - centerY) / 20; // 3D tilt sensitivity
            const rotateY = (x - centerX) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            card.style.transition = 'none';
            card.style.boxShadow = '0 20px 40px rgba(15, 43, 92, 0.12)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
            card.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
            card.style.boxShadow = '';
        });
    });
});
