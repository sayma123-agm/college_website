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
            photo: '/images/csHod.png',
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
            photo: '/images/csHod.png',
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
            photo: '/images/principal.jpg',
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
        fee: {
            name: 'Accounts & Fee Clearance Desk',
            badge: 'Fee Section Console',
            photo: '/images/tpo1.png',
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
            photo: '/images/logo.png',
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
            photo: '/images/tpo1.png',
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
        },
        hod: {
            name: 'Dr. Mahesh G. (HOD CSE)',
            badge: 'HOD Portal',
            photo: '/images/csHod.png',
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
            photo: '/images/tpo1.png',
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
        },
        tpo: {
            name: 'Prof. Placement Head (Training & Placement Cell)',
            badge: 'TPO Placement Desk',
            photo: '/images/tpo1.png',
            tableTitle: 'Active Recruitment Drives & Campus Placements 2026-27',
            tableHtml: `
                <table class="table table-hover table-striped align-middle mb-0 text-start small">
                    <thead class="table-navy text-white fw-bold">
                        <tr>
                            <th scope="col" class="py-2">Company Name</th>
                            <th scope="col" class="py-2">Job Role</th>
                            <th scope="col" class="py-2 text-center">Package (CTC)</th>
                            <th scope="col" class="py-2 text-center">Drive Date</th>
                            <th scope="col" class="py-2 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="fw-semibold text-navy">TCS Digital / Ninja</td>
                            <td>System Engineer</td>
                            <td class="text-center fw-bold text-success">7.5 - 9.0 LPA</td>
                            <td class="text-center">05-Aug-2026</td>
                            <td class="text-center"><span class="badge bg-success">Registration Open</span></td>
                        </tr>
                        <tr>
                            <td class="fw-semibold text-navy">Infosys Power Programmer</td>
                            <td>Specialist Programmer</td>
                            <td class="text-center fw-bold text-success">9.5 LPA</td>
                            <td class="text-center">12-Aug-2026</td>
                            <td class="text-center"><span class="badge bg-primary">Shortlisting</span></td>
                        </tr>
                        <tr>
                            <td class="fw-semibold text-navy">Wipro Turbo</td>
                            <td>Software Developer</td>
                            <td class="text-center fw-bold text-success">6.5 LPA</td>
                            <td class="text-center">18-Aug-2026</td>
                            <td class="text-center"><span class="badge bg-warning text-dark">Upcoming</span></td>
                        </tr>
                    </tbody>
                </table>
            `,
            toolsHtml: `
                <div class="col-sm-6">
                    <div class="border rounded-3 p-3 d-flex align-items-center gap-3">
                        <div class="text-primary fs-3"><i class="bi bi-file-earmark-spreadsheet-fill"></i></div>
                        <div>
                            <h6 class="fw-bold text-navy m-0" style="font-size: 13px;">Eligible Students Roster</h6>
                            <a href="#" onclick="alert('Exporting 2026 Batch Eligible CSE/AIML Roster Excel...'); return false;" class="btn btn-link text-primary p-0 small fw-bold text-decoration-none">Export Roster</a>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="border rounded-3 p-3 d-flex align-items-center gap-3">
                        <div class="text-success fs-3"><i class="bi bi-building-add"></i></div>
                        <div>
                            <h6 class="fw-bold text-navy m-0" style="font-size: 13px;">Post New Placement Drive</h6>
                            <a href="#" onclick="alert('Drive creation form initialized.'); return false;" class="btn btn-link text-primary p-0 small fw-bold text-decoration-none">Create Drive Notice</a>
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
        },
        broadcast: {
            usn: 'AGM-BROADCAST-701',
            pass: 'password',
            title: 'Broadcast & Emergency Alerts Desk',
            badge: 'Broadcast Desk',
            badgeClass: 'bg-indigo',
            desc: 'Dispatch emergency SMS bulletins, send campus-wide email dispatches, update public portal alert banners, and track reach metrics.'
        },
        tpo: {
            usn: 'AGM-TPO-501',
            pass: 'password',
            title: 'Training & Placement Officer Console',
            badge: 'TPO Desk',
            badgeClass: 'bg-primary',
            desc: 'Coordinate campus recruitment drives, upload company eligibility criteria, track student interview selections, and generate annual placement reports.'
        }
    };

    window.switchPortalGateway = (role) => {
        const usnInput = document.getElementById('erp-usn');
        const passwordInput = document.getElementById('erp-password');

        // Dynamically update address bar URL extension without full page reload
        if (window.history && window.history.pushState) {
            window.history.pushState({}, '', '/portal/' + role);
        }

        // Toggle active classes on gateway buttons
        document.querySelectorAll('#erp-login-section .gateway-select-btn').forEach(btn => {
            btn.classList.remove('btn-primary', 'text-white', 'shadow-sm', 'border-primary');
            btn.classList.add('btn-light', 'border');
            
            const textSpan = btn.querySelector('span');
            if (textSpan) {
                textSpan.classList.remove('text-white');
                textSpan.classList.add('text-navy');
            }
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
            
            const textSpan = activeBtn.querySelector('span');
            if (textSpan) {
                textSpan.classList.remove('text-navy');
                textSpan.classList.add('text-white');
            }
            const chevron = activeBtn.querySelector('.bi-chevron-right');
            if (chevron) {
                chevron.classList.remove('text-muted');
                chevron.classList.add('text-white-50');
            }
        }

        // Pre-fill credentials
        const preset = rolePresets[role];
        if (preset) {
            if (usnInput) usnInput.value = preset.usn;
            if (passwordInput) passwordInput.value = preset.pass;
            
            const userLabel = document.getElementById('username-label');
            if (userLabel) {
                if (role === 'student') userLabel.innerText = 'University Seat Number (USN)';
                else if (role === 'faculty') userLabel.innerText = 'Faculty ID Code';
                else if (role === 'hod') userLabel.innerText = 'HOD Code ID';
                else if (role === 'office') userLabel.innerText = 'Office Staff ID';
                else if (role === 'fee') userLabel.innerText = 'Account Office ID';
                else if (role === 'principal') userLabel.innerText = 'Principal Auth Code';
                else if (role === 'admin') userLabel.innerText = 'Super Admin Username';
                else if (role === 'broadcast') userLabel.innerText = 'Broadcaster Auth Key';
                else if (role === 'tpo') userLabel.innerText = 'TPO Officer Code';
            }

            const badge = document.getElementById('portal-selected-badge');
            if (badge) {
                badge.innerText = preset.badge;
                badge.className = `badge text-uppercase px-2.5 py-1 ${preset.badgeClass}`;
            }

            const hintText = document.getElementById('hint-text');
            if (hintText) {
                hintText.innerHTML = `Demo credentials loaded: <strong>${preset.usn}</strong> | Password: <strong>${preset.pass}</strong>`;
            }

            const infoTitle = document.getElementById('portal-info-title');
            const infoDesc = document.getElementById('portal-info-desc');
            if (infoTitle) infoTitle.innerText = preset.title;
            if (infoDesc) infoDesc.innerText = preset.desc;
        }
    };

    // Run initial gateway selection if login form exists
    if (loginForm) {
        const pathParts = window.location.pathname.split('/');
        const urlRole = pathParts[pathParts.length - 1];
        const defaultRole = ['student', 'faculty', 'hod', 'office', 'fee', 'principal', 'admin', 'broadcast', 'tpo'].includes(urlRole) ? urlRole : 'student';
        window.switchPortalGateway(defaultRole);
    }

    // 1. Check if user is already logged in (session persistence)
    const checkLoginState = () => {
        const token = sessionStorage.getItem('erp_token');
        const role = sessionStorage.getItem('erp_role');
        const username = sessionStorage.getItem('erp_username');

        if (token && role && username) {
            window.showDashboard(username, role);
        } else {
            window.showLogin();
        }
    };

    window.showDashboard = (usn, role) => {
        const loginSec = document.getElementById('erp-login-section');
        const dashSec = document.getElementById('erp-dashboard-section');
        const welcomeNameEl = document.getElementById('erp-welcome-name');
        const displayUsnEl = document.getElementById('erp-display-usn');
        const roleBadgeEl = document.getElementById('erp-role-badge');

        const brandingHeader = document.getElementById('portal-top-branding-bar');
        if (brandingHeader) brandingHeader.classList.add('d-none');

        if (loginSec) loginSec.classList.add('d-none');
        if (dashSec) dashSec.classList.remove('d-none');
        
        const config = roleDetailsConfig[role] || roleDetailsConfig.student;

        if (welcomeNameEl) welcomeNameEl.innerText = `HI... ${config.name.toUpperCase()}`;
        if (displayUsnEl) displayUsnEl.innerText = usn.toUpperCase();
        if (roleBadgeEl) roleBadgeEl.innerText = config.badge;

        const sidebarName = document.getElementById('sidebar-user-name');
        const sidebarSub = document.getElementById('sidebar-user-sub');
        const profileCardName = document.getElementById('profile-card-name');
        const profileCardUsn = document.getElementById('profile-card-usn');
        const bioFullname = document.getElementById('bio-fullname');
        
        const topAvatar = document.getElementById('erp-top-avatar');
        const sidebarPhoto = document.getElementById('sidebar-user-photo');
        const profilePhoto = document.getElementById('profile-card-photo');

        const rolePhoto = config.photo || (role === 'principal' ? '/images/principal.jpg' : '/images/csHod.png');
        if (topAvatar) topAvatar.src = rolePhoto;
        if (sidebarPhoto) sidebarPhoto.src = rolePhoto;
        if (profilePhoto) profilePhoto.src = rolePhoto;

        if (sidebarName) sidebarName.innerText = config.name;
        if (sidebarSub) sidebarSub.innerText = config.badge;
        if (profileCardName) profileCardName.innerText = config.name.toUpperCase();
        if (profileCardUsn) profileCardUsn.innerText = usn.toUpperCase();
        if (bioFullname) bioFullname.innerText = config.name;

        // Populate Role-Tailored Sidebar Navigation List
        const sidebarNav = document.getElementById('sidebar-nav-list');
        if (sidebarNav) {
            if (role === 'faculty') {
                sidebarNav.innerHTML = `
                    <a class="erp-sidebar-nav-item active" data-tab="biodata" onclick="switchSidebarTab('biodata', this)">
                        <i class="bi bi-person-badge-fill text-primary fs-6 me-1"></i> Faculty Profile & Workload
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="faculty-attendance" onclick="switchSidebarTab('faculty-attendance', this)">
                        <i class="bi bi-calendar-check-fill text-success fs-6 me-1"></i> Daily Attendance Sheet
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="faculty-marks" onclick="switchSidebarTab('faculty-marks', this)">
                        <i class="bi bi-journal-bookmark-fill text-warning fs-6 me-1"></i> Internal Assessment (IA) Marks
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="lesson-plan" onclick="switchSidebarTab('lesson-plan', this)">
                        <i class="bi bi-card-checklist text-info fs-6 me-1"></i> Lesson Plan Tracker
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="faculty-broadcast" onclick="switchSidebarTab('faculty-broadcast', this)">
                        <i class="bi bi-megaphone-fill text-danger fs-6 me-1"></i> Class Announcements
                    </a>
                `;
            } else if (role === 'hod') {
                sidebarNav.innerHTML = `
                    <a class="erp-sidebar-nav-item active" data-tab="biodata" onclick="switchSidebarTab('biodata', this)">
                        <i class="bi bi-award-fill text-primary fs-6 me-1"></i> HOD Department Overview
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="hod-electives" onclick="switchSidebarTab('hod-electives', this)">
                        <i class="bi bi-check2-square text-success fs-6 me-1"></i> Elective Approvals
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="hod-faculty" onclick="switchSidebarTab('hod-faculty', this)">
                        <i class="bi bi-people-fill text-warning fs-6 me-1"></i> Faculty Allocations
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="broadcast" onclick="switchSidebarTab('broadcast', this)">
                        <i class="bi bi-broadcast text-danger fs-6 me-1"></i> HOD Circular Dispatch
                    </a>
                `;
            } else if (role === 'principal') {
                sidebarNav.innerHTML = `
                    <a class="erp-sidebar-nav-item active" data-tab="biodata" onclick="switchSidebarTab('biodata', this)">
                        <i class="bi bi-person-workspace text-primary fs-6 me-1"></i> Executive Dashboard
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="principal-accounts" onclick="switchSidebarTab('principal-accounts', this)">
                        <i class="bi bi-person-plus-fill text-success fs-6 me-1"></i> Provision ERP Accounts
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="principal-metrics" onclick="switchSidebarTab('principal-metrics', this)">
                        <i class="bi bi-bar-chart-line-fill text-warning fs-6 me-1"></i> Enrollment Statistics
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="principal-accreditation" onclick="switchSidebarTab('principal-accreditation', this)">
                        <i class="bi bi-shield-check text-info fs-6 me-1"></i> NAAC / NBA Audit Progress
                    </a>
                `;
            } else if (role === 'admin') {
                sidebarNav.innerHTML = `
                    <a class="erp-sidebar-nav-item active" data-tab="biodata" onclick="switchSidebarTab('biodata', this)">
                        <i class="bi bi-gear-fill text-primary fs-6 me-1"></i> Admin Metrics & Server Health
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="admin-news" onclick="switchSidebarTab('admin-news', this)">
                        <i class="bi bi-newspaper text-success fs-6 me-1"></i> Website News CMS
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="admin-inquiries" onclick="switchSidebarTab('admin-inquiries', this)">
                        <i class="bi bi-envelope-paper-fill text-warning fs-6 me-1"></i> Admission Inquiries Directory
                    </a>
                `;
            } else if (role === 'broadcast') {
                sidebarNav.innerHTML = `
                    <a class="erp-sidebar-nav-item active" data-tab="biodata" onclick="switchSidebarTab('biodata', this)">
                        <i class="bi bi-broadcast text-indigo fs-6 me-1"></i> Broadcast Desk Console
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="broadcast-logs" onclick="switchSidebarTab('broadcast-logs', this)">
                        <i class="bi bi-list-check text-success fs-6 me-1"></i> Dispatch Logs & Analytics
                    </a>
                `;
            } else if (role === 'office' || role === 'fee') {
                sidebarNav.innerHTML = `
                    <a class="erp-sidebar-nav-item active" data-tab="biodata" onclick="switchSidebarTab('biodata', this)">
                        <i class="bi bi-building-fill text-success fs-6 me-1"></i> Office & Finance Registry
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="office-admissions" onclick="switchSidebarTab('office-admissions', this)">
                        <i class="bi bi-file-earmark-check-fill text-primary fs-6 me-1"></i> Admission Verification
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="office-fees" onclick="switchSidebarTab('office-fees', this)">
                        <i class="bi bi-wallet2 text-warning fs-6 me-1"></i> Fee Remittance & Challans
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="office-tickets" onclick="switchSidebarTab('office-tickets', this)">
                        <i class="bi bi-ticket-perforated-fill text-info fs-6 me-1"></i> Hall Ticket Dispatch
                    </a>
                `;
            } else if (role === 'tpo') {
                sidebarNav.innerHTML = `
                    <a class="erp-sidebar-nav-item active" data-tab="biodata" onclick="switchSidebarTab('biodata', this)">
                        <i class="bi bi-briefcase-fill text-primary fs-6 me-1"></i> TPO Placements Overview
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="tpo-drives" onclick="switchSidebarTab('tpo-drives', this)">
                        <i class="bi bi-building-add text-success fs-6 me-1"></i> Active Recruitment Drives
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="tpo-roster" onclick="switchSidebarTab('tpo-roster', this)">
                        <i class="bi bi-file-earmark-spreadsheet-fill text-warning fs-6 me-1"></i> Student Eligibility Roster
                    </a>
                `;
            } else {
                // Default Student Sidebar
                sidebarNav.innerHTML = `
                    <a class="erp-sidebar-nav-item active" data-tab="biodata" onclick="switchSidebarTab('biodata', this)">
                        <i class="bi bi-person-vcard text-primary fs-6 me-1"></i> Bio-Data / Profile
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="academic-register" onclick="switchSidebarTab('academic-register', this)">
                        <i class="bi bi-journal-check text-success fs-6 me-1"></i> Academic Register
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="academic-calendar" onclick="switchSidebarTab('academic-calendar', this)">
                        <i class="bi bi-calendar3 text-warning fs-6 me-1"></i> Academic Calendar
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="attendance" onclick="switchSidebarTab('attendance', this)">
                        <i class="bi bi-pie-chart-fill text-info fs-6 me-1"></i> Attendance Tracker
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="marks" onclick="switchSidebarTab('marks', this)">
                        <i class="bi bi-award-fill text-danger fs-6 me-1"></i> Marks & SGPA/CGPA
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="backlogs" onclick="switchSidebarTab('backlogs', this)">
                        <i class="bi bi-exclamation-triangle-fill text-danger fs-6 me-1"></i> Backlogs Tracker
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="class-assignments" onclick="switchSidebarTab('class-assignments', this)">
                        <i class="bi bi-file-earmark-text text-primary fs-6 me-1"></i> Class Assignments
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="lesson-plan" onclick="switchSidebarTab('lesson-plan', this)">
                        <i class="bi bi-card-checklist text-secondary fs-6 me-1"></i> Lesson Plan
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="library" onclick="switchSidebarTab('library', this)">
                        <i class="bi bi-book-half text-success fs-6 me-1"></i> Library & Book Search
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="project-resources" onclick="switchSidebarTab('project-resources', this)">
                        <i class="bi bi-folder-symlink text-indigo fs-6 me-1"></i> Project & E-Resources
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="outings" onclick="switchSidebarTab('outings', this)">
                        <i class="bi bi-door-open-fill text-warning fs-6 me-1"></i> Outings / Gatepass
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="counseling" onclick="switchSidebarTab('counseling', this)">
                        <i class="bi bi-people-fill text-primary fs-6 me-1"></i> Counseling Details
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="disciplinary" onclick="switchSidebarTab('disciplinary', this)">
                        <i class="bi bi-shield-check text-dark fs-6 me-1"></i> Disciplinary Record
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="complaints" onclick="switchSidebarTab('complaints', this)">
                        <i class="bi bi-chat-square-dots text-danger fs-6 me-1"></i> Complaint / Suggestion
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="timetable" onclick="switchSidebarTab('timetable', this)">
                        <i class="bi bi-clock-history text-primary fs-6 me-1"></i> Time Table
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="topics-covered" onclick="switchSidebarTab('topics-covered', this)">
                        <i class="bi bi-list-task text-secondary fs-6 me-1"></i> Topics Covered
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="resources" onclick="switchSidebarTab('resources', this)">
                        <i class="bi bi-journal-bookmark text-indigo fs-6 me-1"></i> Resources / E-Books
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="exam-schedule" onclick="switchSidebarTab('exam-schedule', this)">
                        <i class="bi bi-calendar2-week text-info fs-6 me-1"></i> Exam Schedule
                    </a>
                    <a class="erp-sidebar-nav-item" data-tab="feedback" onclick="switchSidebarTab('feedback', this)">
                        <i class="bi bi-star-fill text-warning fs-6 me-1"></i> Faculty Feedback
                    </a>
                `;
            }
        }

        if (typeof window.switchSidebarTab === 'function') {
            window.switchSidebarTab('biodata');
        }

        // Fetch Live Real-Time Announcements from Database
        fetch('/api/portal/announcements?role=' + role)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.announcements && data.announcements.length > 0) {
                    const banner = document.getElementById('erp-announcement-banner');
                    const textEl = document.getElementById('announcement-broadcast-text');
                    if (banner && textEl) {
                        const latest = data.announcements[0];
                        textEl.innerHTML = `<strong>${latest.title || 'Notice'}:</strong> ${latest.message} <em class="small text-muted">(${latest.sender_name || 'HOD Desk'})</em>`;
                        banner.classList.remove('d-none');
                    }
                }
            })
            .catch(() => {});
    };

    window.showLogin = () => {
        const loginSec = document.getElementById('erp-login-section');
        const dashSec = document.getElementById('erp-dashboard-section');
        const brandingHeader = document.getElementById('portal-top-branding-bar');
        if (brandingHeader) brandingHeader.classList.remove('d-none');
        if (dashSec) dashSec.classList.add('d-none');
        if (loginSec) loginSec.classList.remove('d-none');
    };

    // 2. Global Login Submission Handler (#erp-login-form)
    window.handlePortalLogin = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        const usnEl = document.getElementById('erp-usn');
        const pwdEl = document.getElementById('erp-password');
        const errEl = document.getElementById('login-error-alert');

        const usnVal = usnEl && usnEl.value.trim() ? usnEl.value.trim().toUpperCase() : '2AG22CS001';
        const passwordVal = pwdEl && pwdEl.value ? pwdEl.value : 'password';

        const pathParts = window.location.pathname.split('/');
        const urlRole = pathParts[pathParts.length - 1];

        let resolvedRole = ['student', 'faculty', 'hod', 'office', 'fee', 'principal', 'admin', 'broadcast', 'tpo'].includes(urlRole) ? urlRole : 'student';

        if (usnVal.startsWith('AGM-FAC-')) resolvedRole = 'faculty';
        else if (usnVal.startsWith('AGM-HOD-')) resolvedRole = 'hod';
        else if (usnVal.startsWith('AGM-OFF-')) resolvedRole = 'office';
        else if (usnVal.startsWith('AGM-PRIN-')) resolvedRole = 'principal';
        else if (usnVal.startsWith('AGM-FEE-')) resolvedRole = 'fee';
        else if (usnVal.startsWith('AGM-ADMIN-')) resolvedRole = 'admin';
        else if (usnVal.startsWith('AGM-BROADCAST-')) resolvedRole = 'broadcast';
        else if (usnVal.startsWith('AGM-TPO-')) resolvedRole = 'tpo';

        if (errEl) errEl.classList.add('d-none');

        // Dynamically update address bar URL extension to match logged in role
        if (window.history && window.history.pushState) {
            window.history.pushState({}, '', '/portal/' + resolvedRole);
        }

        // Instant UI Transition to Dashboard
        sessionStorage.setItem('erp_token', 'demo_token_' + Date.now());
        sessionStorage.setItem('erp_role', resolvedRole);
        sessionStorage.setItem('erp_username', usnVal);

        window.showDashboard(usnVal, resolvedRole);

        // Async API post for authentication verification
        fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: usnVal, password: passwordVal, expectedRole: resolvedRole })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                sessionStorage.setItem('erp_token', data.token);
                sessionStorage.setItem('erp_role', data.role);
                sessionStorage.setItem('erp_username', data.username);
                window.showDashboard(data.username, data.role);
            }
        })
        .catch(() => {});

        return false;
    };

    // Active In-Memory Session User Accounts List Fallback
    window.localUserAccountsList = window.localUserAccountsList || [
        { id: 1, username: '2AG22CS001', name: 'Prajwal Patil', role: 'student', status: 'Active' },
        { id: 2, username: 'AGM-FAC-101', name: 'Dr. S. V. Shiragur', role: 'faculty', status: 'Active' },
        { id: 3, username: 'AGM-HOD-101', name: 'Dr. S. V. Shiragur (HOD CSE)', role: 'hod', status: 'Active' },
        { id: 4, username: 'AGM-PRIN-001', name: 'Dr. Sandeep Kyatanavar (Principal)', role: 'principal', status: 'Active' },
        { id: 5, username: 'AGM-OFF-101', name: 'Academic Office Registrar', role: 'office', status: 'Active' },
        { id: 6, username: 'AGM-FEE-201', name: 'Accounts & Fee Clearance Desk', role: 'fee', status: 'Active' },
        { id: 7, username: 'AGM-ADMIN-999', name: 'System Admin Coordinator', role: 'admin', status: 'Active' }
    ];

    window.renderUserAccountsList = (list) => {
        const tbody = document.getElementById('user-accounts-tbody');
        if (!tbody) return;

        if (!list || list.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center py-3 text-muted">No registered user accounts found.</td></tr>';
            return;
        }

        tbody.innerHTML = list.map(u => {
            let roleBadge = '<span class="badge bg-secondary">User</span>';
            const r = (u.role || '').toLowerCase();
            if (r === 'student') roleBadge = '<span class="badge bg-success text-white">Student</span>';
            else if (r === 'faculty') roleBadge = '<span class="badge bg-primary text-white">Faculty</span>';
            else if (r === 'hod') roleBadge = '<span class="badge bg-info text-dark">HOD</span>';
            else if (r === 'principal') roleBadge = '<span class="badge bg-danger text-white">Principal</span>';
            else if (r === 'admin') roleBadge = '<span class="badge bg-dark text-white">Admin</span>';
            else if (r === 'office') roleBadge = '<span class="badge bg-warning text-dark">Office</span>';
            else if (r === 'fee') roleBadge = '<span class="badge bg-success text-white">Fee Section</span>';

            const statusBadge = u.status === 'Active' ? 
                '<span class="badge bg-success-light text-success border border-success-subtle"><i class="bi bi-check-circle-fill me-1"></i>Active</span>' : 
                '<span class="badge bg-danger-light text-danger border border-danger-subtle"><i class="bi bi-x-circle-fill me-1"></i>Inactive</span>';

            return `
                <tr>
                    <td class="fw-bold text-navy" style="font-size: 11.5px;">${u.username}</td>
                    <td style="font-size: 11.5px;" class="fw-semibold">${u.name}</td>
                    <td style="font-size: 11.5px;">${roleBadge}</td>
                    <td style="font-size: 11.5px;">${statusBadge}</td>
                    <td class="text-end" style="font-size: 11.5px;">
                        <button type="button" class="btn btn-xs btn-outline-warning me-1 fw-bold" onclick="toggleUserStatus('${u.id}', '${u.status}', '${u.name}', '${u.role}')" title="Toggle Active Status">
                            <i class="bi bi-arrow-repeat me-1"></i>${u.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button type="button" class="btn btn-xs btn-outline-danger fw-bold" onclick="deleteUserAccount('${u.id}', '${u.name}')" title="Delete User Account">
                            <i class="bi bi-trash me-1"></i>Delete
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    };

    // Full CRUD Operations for Principal & Admin User Provisioning
    window.loadUserAccountsTable = () => {
        const tbody = document.getElementById('user-accounts-tbody');
        if (!tbody) return;

        fetch('/api/portal/users')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.users && data.users.length > 0) {
                    window.localUserAccountsList = data.users;
                    window.renderUserAccountsList(data.users);
                } else {
                    window.renderUserAccountsList(window.localUserAccountsList);
                }
            })
            .catch(err => {
                // Fallback seamlessly to rendering active session list
                window.renderUserAccountsList(window.localUserAccountsList);
            });
    };

    window.toggleUserStatus = (id, currentStatus, name, role) => {
        const nextStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
        
        // Update local list state
        const targetUser = window.localUserAccountsList.find(u => String(u.id) === String(id));
        if (targetUser) {
            targetUser.status = nextStatus;
        }

        window.renderUserAccountsList(window.localUserAccountsList);

        fetch(`/api/portal/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, role, status: nextStatus })
        })
        .then(res => res.json())
        .then(data => {
            alert(`User status updated to ${nextStatus}!`);
        })
        .catch(err => {
            alert(`User status updated to ${nextStatus}!`);
        });
    };

    window.deleteUserAccount = (id, name) => {
        if (!confirm(`Are you sure you want to delete the user account for ${name}?`)) return;

        // Remove from local list state
        window.localUserAccountsList = window.localUserAccountsList.filter(u => String(u.id) !== String(id));
        window.renderUserAccountsList(window.localUserAccountsList);

        fetch(`/api/portal/users/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            alert(`User account for ${name} deleted successfully!`);
        })
        .catch(err => {
            alert(`User account for ${name} deleted!`);
        });
    };

    window.principalCreateAccount = (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('new-account-name');
        const sysIdInput = document.getElementById('new-account-id');
        const roleSelect = document.getElementById('new-account-role');

        const name = nameInput ? nameInput.value.trim() : '';
        const sysId = sysIdInput ? sysIdInput.value.trim().toUpperCase() : '';
        const role = roleSelect ? roleSelect.value : 'Student';

        if (!name || !sysId) {
            alert('Please enter both Full Name and System ID / USN.');
            return;
        }

        // Add to local list state immediately
        const newAccount = {
            id: Date.now(),
            username: sysId,
            name: name,
            role: role.toLowerCase(),
            status: 'Active'
        };
        window.localUserAccountsList.unshift(newAccount);
        window.renderUserAccountsList(window.localUserAccountsList);

        if (document.getElementById('principal-create-account-form')) {
            document.getElementById('principal-create-account-form').reset();
        }

        alert(`Account successfully provisioned for ${name} (${sysId}) under ${role} role!`);

        // Post new account to MySQL Database API
        fetch('/api/portal/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: sysId,
                password: 'password',
                role: role.toLowerCase(),
                name: name
            })
        }).catch(() => {});
    };

    // Register Broadcast & Announcement Dispatch Handler (Saves to MySQL DB & Interconnects Logins)
    window.dispatchBroadcast = (e) => {
        e.preventDefault();
        const ch = document.getElementById('broadcast-channel').value;
        const aud = document.getElementById('broadcast-audience').value;
        const msg = document.getElementById('broadcast-message').value;

        const tableBody = document.getElementById('broadcast-logs-table').getElementsByTagName('tbody')[0];
        if (tableBody) {
            const newRow = tableBody.insertRow(0);
            newRow.innerHTML = `
                <td style="font-size: 11px;">Just Now</td>
                <td style="font-size: 11px;"><span class="badge bg-secondary">${ch}</span></td>
                <td style="font-size: 11px;">${aud}</td>
                <td style="font-size: 11px;">${msg}</td>
                <td style="font-size: 11px;"><span class="text-success"><i class="bi bi-check-all me-1"></i>Delivered (Active)</span></td>
            `;
        }

        document.getElementById('broadcast-alert-form').reset();

        // Persist announcement to MySQL DB so all logins (Student, Faculty, Principal) see it
        fetch('/api/portal/announcements', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                senderRole: sessionStorage.getItem('erp_role') || 'broadcast',
                senderName: sessionStorage.getItem('erp_username') || 'Broadcast Officer',
                title: `${ch} Announcement for ${aud}`,
                message: msg,
                targetRole: 'all'
            })
        })
        .then(res => res.json())
        .then(data => {
            alert(`Broadcast dispatched successfully to ${aud}! Notice saved to database and live for all logins.`);
        })
        .catch(err => {
            alert(`Broadcast dispatched successfully to ${aud} via ${ch}!`);
        });
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
                        <tr class="align-middle">
                            <td class="small" style="font-size: 11px;">
                                <span class="badge bg-secondary-light text-secondary border uppercase font-semibold">${item.category}</span>
                            </td>
                            <td class="text-start">
                                <h6 class="fw-bold text-navy m-0" style="font-size: 12px;">${item.title}</h6>
                                <p class="text-muted m-0 small" style="font-size: 10px; line-height: 1.35;">${item.content.slice(0, 100)}...</p>
                            </td>
                            <td style="font-size: 11px;">${item.date}</td>
                            <td>
                                <button onclick="deleteCmsNews('${item.id}')" class="btn btn-xs btn-outline-danger px-2 py-1" style="font-size: 10px; border-radius: 4px !important;">
                                    <i class="bi bi-trash3"></i> Delete
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
                                    <th scope="col" style="width: 15%; font-size: 11px;">Category</th>
                                    <th scope="col" style="width: 55%; font-size: 11px;">Details</th>
                                    <th scope="col" style="width: 15%; font-size: 11px;">Date</th>
                                    <th scope="col" style="width: 15%; font-size: 11px;">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rowsHtml || '<tr><td colspan="4" class="text-center">No announcements published.</td></tr>'}
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
        const token = sessionStorage.getItem('erp_token');

        fetch('/api/news', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ category, title, content })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('Circular published successfully!');
                window.loadCmsNews();
            } else {
                alert('Publish failed: ' + data.message);
            }
        });
    };

    window.deleteCmsNews = (id) => {
        if (!confirm('Are you sure you want to delete this bulletin?')) return;
        const token = sessionStorage.getItem('erp_token');

        fetch(`/api/news/${id}`, {
            method: 'DELETE',
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('Circular deleted.');
                window.loadCmsNews();
            }
        });
    };

    window.loadCmsInquiries = () => {
        const tableTitle = document.getElementById('erp-table-title');
        const tableContainer = document.getElementById('erp-table-container');
        if (tableTitle) tableTitle.innerHTML = `<i class="bi bi-person-lines-fill text-primary me-2"></i>Online Inquiry Submissions`;

        fetch('/api/inquiries')
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                let rowsHtml = '';
                data.inquiries.forEach(item => {
                    rowsHtml += `
                        <tr class="align-middle">
                            <td class="fw-semibold text-navy text-start" style="font-size: 11px;">${item.name}</td>
                            <td class="text-start" style="font-size: 10px;">
                                <div><i class="bi bi-envelope-fill me-1"></i>${item.email}</div>
                                <div><i class="bi bi-telephone-fill me-1"></i>${item.phone}</div>
                            </td>
                            <td class="small font-bold" style="font-size: 11px;">
                                <span class="badge bg-secondary-light text-secondary border uppercase">${item.course.replace('ug-', '').toUpperCase()}</span>
                            </td>
                            <td class="text-start" style="font-size: 10px; line-height: 1.35;">${item.message || 'No remarks.'}</td>
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

    // Animations disabled per user request
});

// Dynamic ERP Sidebar Navigation & Multi-Tab Content Handler
window.switchSidebarTab = function(tabKey, element) {
    const items = document.querySelectorAll('.erp-sidebar-nav-item');
    items.forEach(el => el.classList.remove('active'));
    if (element) {
        element.classList.add('active');
    } else {
        const defaultItem = document.querySelector(`.erp-sidebar-nav-item[data-tab="${tabKey}"]`);
        if (defaultItem) defaultItem.classList.add('active');
    }

    const biodataTab = document.getElementById('tab-content-biodata');
    const dynamicTab = document.getElementById('tab-content-dynamic');
    const dynamicHeader = document.getElementById('dynamic-tab-header');
    const dynamicBody = document.getElementById('dynamic-tab-body');

    // On mobile screens, auto collapse sidebar on tab selection
    const sidebar = document.getElementById('erp-sidebar');
    if (sidebar) sidebar.classList.remove('show');

    const currentRole = sessionStorage.getItem('erp_role') || 'student';
    if (tabKey === 'biodata' && currentRole === 'student') {
        if (biodataTab) biodataTab.classList.remove('d-none');
        if (dynamicTab) dynamicTab.classList.add('d-none');
        return;
    }

    if (biodataTab) biodataTab.classList.add('d-none');
    if (dynamicTab) dynamicTab.classList.remove('d-none');

    // If biodata tab is clicked for a non-student role, populate roleDetailsConfig summary
    if (tabKey === 'biodata' && currentRole !== 'student') {
        const config = roleDetailsConfig[currentRole] || roleDetailsConfig.student;
        if (dynamicHeader) dynamicHeader.innerHTML = `<i class="bi bi-person-workspace text-primary me-2"></i>${config.badge.toUpperCase()} DASHBOARD`;
        if (dynamicBody) {
            dynamicBody.innerHTML = `
                <div class="card border rounded-3 p-4 bg-white shadow-xs mb-4">
                    <h6 class="fw-bold text-navy mb-3"><i class="bi bi-table me-2 text-primary"></i>${config.tableTitle}</h6>
                    ${config.tableHtml}
                </div>
                ${config.toolsHtml ? `
                <div class="row g-3">
                    ${config.toolsHtml}
                </div>` : ''}
            `;
        }
        return;
    }

    const tabContents = {
        'academic-register': {
            title: '<i class="bi bi-journal-check text-success me-2"></i>ACADEMIC REGISTER & DAILY ATTENDANCE GRID',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <!-- Official College Header Banner -->
                    <div class="text-center mb-3 p-3 bg-light border rounded-3 shadow-xs">
                        <img src="/images/logo.png" alt="AGMRCET Logo" style="width: 48px; height: 48px; object-fit: contain;">
                        <h5 class="fw-extrabold text-navy m-0 mt-1" style="font-family: 'Plus Jakarta Sans', sans-serif;">SMM MATOSHRI RASHMI DEVI CHOUDHARY RESEARCH CENTRE & AGMRCET (Code: E238)</h5>
                        <p class="small text-muted m-0" style="font-size: 11px;">(Approved by AICTE, New Delhi || Affiliated to VTU Belagavi || Accredited by NAAC)</p>
                        <h6 class="fw-bold text-navy mt-2 mb-0 tracking-wider text-uppercase border-top border-bottom py-1" style="font-size: 13px;">ACADEMIC REGISTER</h6>
                        <div class="d-flex justify-content-between align-items-center mt-2 small text-navy fw-semibold">
                            <span><strong>Roll No / USN:</strong> 2AG22CS001</span>
                            <span><strong>Student Name:</strong> PRAJWAL PATIL</span>
                            <span><strong>Semester:</strong> VI Semester CSE</span>
                        </div>
                    </div>

                    <!-- Daily Date Grid Table -->
                    <div class="table-responsive rounded-3 border mb-3">
                        <table class="table table-bordered table-hover align-middle text-center small mb-0" style="font-size: 11px;">
                            <thead class="table-navy text-white fw-bold">
                                <tr>
                                    <th>Sl.No</th>
                                    <th>Subject</th>
                                    <th>13/07</th><th>14/07</th><th>15/07</th><th>16/07</th><th>17/07</th><th>18/07</th>
                                    <th>20/07</th><th>21/07</th><th>22/07</th><th>23/07</th><th>24/07</th><th>25/07</th><th>27/07</th><th>28/07</th>
                                    <th>Atted/Held</th>
                                    <th>%</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>1</td><td class="fw-bold text-navy text-start">21CS61 (Software Engg)</td><td>P</td><td>-</td><td>P</td><td>P</td><td>P</td><td>-</td><td>P</td><td>P</td><td>A</td><td>A</td><td>P</td><td>-</td><td>P</td><td>P</td><td class="fw-bold">10/12</td><td class="fw-bold text-success">83.33%</td></tr>
                                <tr><td>2</td><td class="fw-bold text-navy text-start">21CS62 (Web Dev)</td><td>P</td><td>P</td><td>-</td><td>P</td><td>P</td><td>A</td><td>P</td><td>P</td><td>A</td><td>P</td><td>-</td><td>P</td><td>P</td><td>-</td><td class="fw-bold">9/11</td><td class="fw-bold text-success">81.81%</td></tr>
                                <tr><td>3</td><td class="fw-bold text-navy text-start">21CS63 (Machine Learning)</td><td>-</td><td>P</td><td>P</td><td>-</td><td>P</td><td>A</td><td>-</td><td>P</td><td>A</td><td>A</td><td>P</td><td>-</td><td>P</td><td>P</td><td class="fw-bold">8/11</td><td class="fw-bold text-warning">72.72%</td></tr>
                                <tr><td>4</td><td class="fw-bold text-navy text-start">21CSL66 (Web Lab)</td><td>P P P</td><td>-</td><td>-</td><td>-</td><td>-</td><td>P P P</td><td>-</td><td>-</td><td>-</td><td>-</td><td>P P P</td><td>-</td><td>-</td><td>-</td><td class="fw-bold">9/9</td><td class="fw-bold text-success">100.00%</td></tr>
                                <tr><td>5</td><td class="fw-bold text-navy text-start">21CS67 (Mini Project)</td><td>-</td><td>-</td><td>P P</td><td>P P</td><td>-</td><td>-</td><td>-</td><td>P P</td><td>-</td><td>-</td><td>-</td><td>P P</td><td>-</td><td>-</td><td class="fw-bold">8/8</td><td class="fw-bold text-success">100.00%</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Action Bar -->
                    <div class="d-flex gap-2">
                        <button class="btn btn-primary btn-sm fw-bold px-3" onclick="window.print();">Print</button>
                        <button class="btn btn-success btn-sm fw-bold px-3" onclick="alert('Exporting Academic Register Excel...');">Export</button>
                    </div>
                </div>
            `
        },
        'academic-calendar': {
            title: '<i class="bi bi-calendar3 text-warning me-2"></i>ACADEMIC CALENDAR',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <h6 class="fw-bold text-navy mb-3">VTU Belagavi Academic Term Calendar Schedule</h6>
                    <div class="table-responsive rounded-3 border mb-3">
                        <table class="table table-bordered align-middle text-start small mb-0">
                            <thead class="table-navy text-white fw-bold">
                                <tr><th>Sl.No</th><th>Start Date</th><th>End Date</th><th>Description</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>1</td><td class="fw-bold">23/06/2025</td><td class="fw-bold">05/11/2025</td><td>VTU Odd Semester Academic Term 2025-26</td></tr>
                                <tr><td>2</td><td class="fw-bold">13/07/2026</td><td class="fw-bold">14/11/2026</td><td>VTU Even Semester Academic Term 2026-27 (Scheme 2021)</td></tr>
                                <tr><td>3</td><td class="fw-bold">01/09/2026</td><td class="fw-bold">05/09/2026</td><td>CIE Internal Assessment Test 1 (IA-1)</td></tr>
                                <tr><td>4</td><td class="fw-bold">15/10/2026</td><td class="fw-bold">20/10/2026</td><td>CIE Internal Assessment Test 2 (IA-2)</td></tr>
                                <tr><td>5</td><td class="fw-bold">10/11/2026</td><td class="fw-bold">14/11/2026</td><td>VTU Semester Practical & Lab Examinations</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `
        },
        'attendance': {
            title: '<i class="bi bi-pie-chart-fill text-info me-2"></i>STUDENT ATTENDANCE REPORT',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <!-- Filters Bar -->
                    <div class="d-flex align-items-center flex-wrap gap-3 mb-3 p-2.5 bg-light border rounded-3 small">
                        <div class="form-check form-check-inline mb-0"><input class="form-check-input" type="radio" name="attFilter" id="f1"><label class="form-check-label">Monthly</label></div>
                        <div class="form-check form-check-inline mb-0"><input class="form-check-input" type="radio" name="attFilter" id="f2"><label class="form-check-label">Period</label></div>
                        <div class="form-check form-check-inline mb-0"><input class="form-check-input" type="radio" name="attFilter" id="f3" checked><label class="form-check-label fw-bold text-navy">Till now</label></div>
                        <div class="form-check form-check-inline mb-0"><input class="form-check-input" type="checkbox" id="f4"><label class="form-check-label">Exclude other subjects</label></div>
                        <button class="btn btn-sm btn-primary py-1 px-3 fw-bold" onclick="alert('Attendance report recalculated!');">Show..</button>
                    </div>

                    <!-- College Header Banner -->
                    <div class="text-center mb-3 p-3 bg-light border rounded-3 shadow-xs">
                        <img src="/images/logo.png" alt="AGMRCET Logo" style="width: 48px; height: 48px; object-fit: contain;">
                        <h5 class="fw-extrabold text-navy m-0 mt-1" style="font-family: 'Plus Jakarta Sans', sans-serif;">SMM MATOSHRI RASHMI DEVI CHOUDHARY RESEARCH CENTRE & AGMRCET (Code: E238)</h5>
                        <p class="small text-muted m-0" style="font-size: 11px;">(Approved by AICTE, New Delhi || Affiliated to VTU Belagavi || Accredited by NAAC)</p>
                        <h6 class="fw-bold text-navy mt-2 mb-0 tracking-wider text-uppercase border-top border-bottom py-1" style="font-size: 13px;">ATTENDANCE REPORT</h6>
                        <div class="d-flex justify-content-between align-items-center mt-2 small text-navy fw-semibold">
                            <span><strong>Roll No / USN:</strong> 2AG22CS001</span>
                            <span><strong>Student Name:</strong> PRAJWAL PATIL</span>
                            <span><strong>Course:</strong> B.Tech | <strong>Branch:</strong> CSE</span>
                        </div>
                    </div>

                    <!-- Attendance Summary Table -->
                    <div class="table-responsive rounded-3 border mb-3">
                        <table class="table table-bordered align-middle text-center small mb-0">
                            <thead class="table-navy text-white fw-bold">
                                <tr><th>Sl.No</th><th>Subject Name</th><th>Held</th><th>Attend</th><th>%</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>1</td><td class="text-start">21CS61 - Software Engineering & Project Management</td><td>40</td><td>36</td><td class="fw-bold text-success">90.00%</td></tr>
                                <tr><td>2</td><td class="text-start">21CS62 - Full Stack Web Development</td><td>42</td><td>38</td><td class="fw-bold text-success">90.47%</td></tr>
                                <tr><td>3</td><td class="text-start">21CS63 - Machine Learning Techniques</td><td>40</td><td>32</td><td class="fw-bold text-warning">80.00%</td></tr>
                                <tr><td>4</td><td class="text-start">21CSL66 - Web Technology Laboratory</td><td>18</td><td>16</td><td class="fw-bold text-success">88.88%</td></tr>
                                <tr><td>5</td><td class="text-start">21CS67 - Mini Project Work</td><td>12</td><td>12</td><td class="fw-bold text-success">100.00%</td></tr>
                                <tr class="table-secondary fw-bold">
                                    <td colspan="2" class="text-end">TOTAL:</td>
                                    <td>152</td>
                                    <td>134</td>
                                    <td class="text-success">88.15%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Action Bar -->
                    <div class="d-flex gap-2">
                        <button class="btn btn-primary btn-sm fw-bold px-3" onclick="window.print();">Print</button>
                        <button class="btn btn-success btn-sm fw-bold px-3" onclick="alert('Exporting Attendance Report Excel...');">Export</button>
                    </div>
                </div>
            `
        },
        'marks': {
            title: '<i class="bi bi-award-fill text-danger me-2"></i>INTERNAL MARKS & GRADE TRACKER',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <h6 class="fw-bold text-navy mb-3">Continuous Internal Evaluation (CIE - IA Marks)</h6>
                    <div class="table-responsive">
                        <table class="table table-bordered align-middle text-center small mb-0">
                            <thead class="table-navy text-white">
                                <tr><th>Subject Code</th><th>Subject Name</th><th>IA-1 (40)</th><th>IA-2 (40)</th><th>IA-3 (40)</th><th>Assignments (10)</th><th>Final CIE (50)</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>21CS61</td><td>Software Engineering</td><td>38</td><td>36</td><td>39</td><td>10</td><td class="fw-bold text-success">48 / 50</td></tr>
                                <tr><td>21CS62</td><td>Web Development</td><td>40</td><td>38</td><td>39</td><td>10</td><td class="fw-bold text-success">49 / 50</td></tr>
                                <tr><td>21CS63</td><td>Machine Learning</td><td>35</td><td>37</td><td>38</td><td>9</td><td class="fw-bold text-success">46 / 50</td></tr>
                                <tr><td>21CSL66</td><td>Web Tech Lab</td><td>--</td><td>--</td><td>--</td><td>--</td><td class="fw-bold text-success">48 / 50</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `
        },
        'backlogs': {
            title: '<i class="bi bi-exclamation-triangle-fill text-danger me-2"></i>BACKLOG TRACKER',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <div class="alert alert-success d-flex align-items-center gap-3 m-0">
                        <i class="bi bi-check-circle-fill fs-2 text-success"></i>
                        <div>
                            <h6 class="fw-bold m-0">Zero Active Backlogs!</h6>
                            <p class="small m-0 text-muted">You have cleared all subjects across previous semesters. Clean academic standing maintained.</p>
                        </div>
                    </div>
                </div>
            `
        },
        'class-assignments': {
            title: '<i class="bi bi-file-earmark-text text-primary me-2"></i>CLASS ASSIGNMENTS & HOMEWORK SUBMISSION',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <h6 class="fw-bold text-navy mb-3">Active Assignments</h6>
                    <div class="table-responsive">
                        <table class="table table-hover align-middle text-start small mb-0">
                            <thead class="table-navy text-white">
                                <tr><th>Title</th><th>Subject</th><th>Due Date</th><th>Submission Status</th><th>Action</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Assignment 1: Software Design Models</td><td>Software Engg</td><td>30-July-2026</td><td><span class="badge bg-success">Submitted</span></td><td><button class="btn btn-xs btn-outline-secondary">View File</button></td></tr>
                                <tr><td>Assignment 2: Express JS REST APIs</td><td>Web Development</td><td>05-Aug-2026</td><td><span class="badge bg-warning text-dark">Pending</span></td><td><button class="btn btn-xs btn-primary">Upload PDF</button></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `
        },
        'lesson-plan': {
            title: '<i class="bi bi-card-checklist text-secondary me-2"></i>LESSON PLAN & SYLLABUS TRACKER',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <h6 class="fw-bold text-navy mb-3">Syllabus Completion Logs</h6>
                    <div class="space-y-3">
                        <div>
                            <div class="d-flex justify-content-between small fw-bold mb-1">
                                <span>Software Engineering (21CS61)</span>
                                <span class="text-success">85% Complete</span>
                            </div>
                            <div class="progress" style="height: 8px;"><div class="progress-bar bg-success" style="width: 85%;"></div></div>
                        </div>
                        <div class="mt-3">
                            <div class="d-flex justify-content-between small fw-bold mb-1">
                                <span>Web Development (21CS62)</span>
                                <span class="text-primary">90% Complete</span>
                            </div>
                            <div class="progress" style="height: 8px;"><div class="progress-bar bg-primary" style="width: 90%;"></div></div>
                        </div>
                    </div>
                </div>
            `
        },
        'library': {
            title: '<i class="bi bi-book-half text-success me-2"></i>LIBRARY BOOKS SEARCH & ISSUED CARDS',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs mb-4">
                    <h6 class="fw-bold text-navy mb-3">Issued Books & Return Deadlines</h6>
                    <table class="table table-sm align-middle small mb-0">
                        <thead class="table-navy text-white">
                            <tr><th>Accession No</th><th>Book Title</th><th>Author</th><th>Issue Date</th><th>Due Date</th><th>Fine</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>CS-9042</td><td>Software Engineering 10th Ed</td><td>Ian Sommerville</td><td>10-July-2026</td><td>25-July-2026</td><td class="text-success">0 INR</td></tr>
                            <tr><td>CS-8812</td><td>Node.js & Express in Action</td><td>Evan Schultz</td><td>12-July-2026</td><td>27-July-2026</td><td class="text-success">0 INR</td></tr>
                        </tbody>
                    </table>
                </div>
            `
        },
        'project-resources': {
            title: '<i class="bi bi-folder-symlink text-indigo me-2"></i>PROJECT & E-LEARNING RESOURCES',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <h6 class="fw-bold text-navy mb-3">Download Question Papers & Notes</h6>
                    <div class="list-group list-group-flush small">
                        <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            <span><i class="bi bi-file-earmark-pdf text-danger me-2"></i>VTU Question Bank - VI Sem CSE (2021 Scheme)</span>
                            <span class="btn btn-xs btn-outline-primary py-0">Download</span>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            <span><i class="bi bi-file-earmark-code text-primary me-2"></i>Web Technology Lab Manual Code Repository</span>
                            <span class="btn btn-xs btn-outline-primary py-0">Download</span>
                        </a>
                    </div>
                </div>
            `
        },
        'outings': {
            title: '<i class="bi bi-door-open-fill text-warning me-2"></i>HOSTEL OUTING & GATEPASS MANAGEMENT',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h6 class="fw-bold text-navy m-0">Recent Outing Logs</h6>
                        <button class="btn btn-sm btn-warning fw-bold text-dark">+ Request Outing Pass</button>
                    </div>
                    <table class="table table-sm align-middle small mb-0 text-start">
                        <thead class="table-navy text-white">
                            <tr><th>Pass ID</th><th>Destination</th><th>Departure</th><th>Return Date</th><th>Approval Status</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>GP-4091</td><td>Hubballi City (Home Visit)</td><td>15-July-2026</td><td>17-July-2026</td><td><span class="badge bg-success">Warden Approved</span></td></tr>
                        </tbody>
                    </table>
                </div>
            `
        },
        'counseling': {
            title: '<i class="bi bi-people-fill text-primary me-2"></i>FACULTY COUNSELOR DETAILS',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <h6 class="fw-bold text-navy mb-3">Designated Academic Counselor</h6>
                    <div class="d-flex align-items-center gap-3">
                        <img src="/images/hod.jpg" class="rounded-circle border" style="width: 60px; height: 60px; object-fit: cover;">
                        <div>
                            <h6 class="fw-bold text-navy m-0">Dr. S. V. Shiragur</h6>
                            <p class="text-muted small m-0">HOD & Professor, Dept of Computer Science & Engineering</p>
                            <p class="text-muted small m-0">Contact: hod.cse@agmrcet.ac.in | Room 201 Admin Block</p>
                        </div>
                    </div>
                </div>
            `
        },
        'disciplinary': {
            title: '<i class="bi bi-shield-check text-dark me-2"></i>DISCIPLINARY RECORD & CONDUCT',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <div class="alert alert-info d-flex align-items-center gap-3 m-0">
                        <i class="bi bi-shield-fill-check fs-2 text-info"></i>
                        <div>
                            <h6 class="fw-bold m-0 text-navy">Exemplary Conduct Record</h6>
                            <p class="small m-0">No disciplinary issues or misconduct warnings have been recorded against your USN.</p>
                        </div>
                    </div>
                </div>
            `
        },
        'complaints': {
            title: '<i class="bi bi-chat-square-dots text-danger me-2"></i>COMPLAINT / SUGGESTION BOX',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <h6 class="fw-bold text-navy mb-3">Submit Grievance or Suggestion</h6>
                    <form onsubmit="event.preventDefault(); alert('Your feedback has been confidentially logged.');">
                        <div class="mb-3">
                            <label class="form-label small text-muted">Category:</label>
                            <select class="form-select form-select-sm"><option>Academic</option><option>Hostel / Mess</option><option>Library</option><option>Transport</option></select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label small text-muted">Message:</label>
                            <textarea class="form-control form-control-sm" rows="3" placeholder="Describe your suggestion..."></textarea>
                        </div>
                        <button class="btn btn-primary btn-sm fw-bold">Submit Grievance</button>
                    </form>
                </div>
            `
        },
        'exam-schedule': {
            title: '<i class="bi bi-calendar2-week text-info me-2"></i>VTU END-SEMESTER EXAM TIMETABLE',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <h6 class="fw-bold text-navy mb-3">Semester VI Theory Exam Timetable</h6>
                    <table class="table table-bordered text-center small mb-0">
                        <thead class="table-navy text-white">
                            <tr><th>Date</th><th>Subject Code</th><th>Subject Title</th><th>Timing</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>10-Aug-2026</td><td>21CS61</td><td>Software Engineering</td><td>02:00 PM - 05:00 PM</td></tr>
                            <tr><td>13-Aug-2026</td><td>21CS62</td><td>Web Development</td><td>02:00 PM - 05:00 PM</td></tr>
                            <tr><td>17-Aug-2026</td><td>21CS63</td><td>Machine Learning</td><td>02:00 PM - 05:00 PM</td></tr>
                        </tbody>
                    </table>
                </div>
            `
        },
        'feedback': {
            title: '<i class="bi bi-star-fill text-warning me-2"></i>FACULTY FEEDBACK FORM',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <h6 class="fw-bold text-navy mb-3">Anonymous Semester Faculty Feedback</h6>
                    <p class="small text-muted">Please rate teaching clarity and course coverage for current semester faculty members.</p>
                    <button class="btn btn-success btn-sm fw-bold" onclick="alert('Feedback questionnaire initialized!');">Open Feedback Questionnaire</button>
                </div>
            `
        },
        // Role-Specific Action Tabs
        'faculty-attendance': {
            title: '<i class="bi bi-calendar-check-fill text-success me-2"></i>DAILY CLASS ATTENDANCE SHEET ENTRY',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <h6 class="fw-bold text-navy mb-3"><i class="bi bi-pencil-square text-primary me-2"></i>Record Batch Student Attendance</h6>
                    <form onsubmit="event.preventDefault(); alert('Attendance sheet submitted successfully!');">
                        <div class="row g-3 mb-3">
                            <div class="col-md-4">
                                <label class="form-label small text-muted fw-bold">Subject Code & Title</label>
                                <select class="form-select form-select-sm"><option>21CS61 - Software Engineering</option><option>21CS62 - Web Development</option></select>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label small text-muted fw-bold">Date & Hour</label>
                                <input type="date" class="form-control form-control-sm" value="2026-07-28">
                            </div>
                            <div class="col-md-4">
                                <label class="form-label small text-muted fw-bold">Section / Batch</label>
                                <select class="form-select form-select-sm"><option>6th Sem - Sec A</option><option>6th Sem - Sec B</option></select>
                            </div>
                        </div>
                        <div class="table-responsive rounded-3 border mb-3">
                            <table class="table table-hover table-striped align-middle mb-0 text-start small">
                                <thead class="table-navy text-white fw-bold">
                                    <tr><th>USN</th><th>Student Name</th><th class="text-center">Status</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td>2AG22CS001</td><td>Prajwal Patil</td><td class="text-center"><input type="checkbox" checked class="form-check-input"> Present</td></tr>
                                    <tr><td>2AG22CS002</td><td>Ramesh Pujar</td><td class="text-center"><input type="checkbox" checked class="form-check-input"> Present</td></tr>
                                    <tr><td>2AG22CS003</td><td>Savita Koti</td><td class="text-center"><input type="checkbox" class="form-check-input"> Present</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <button type="submit" class="btn btn-primary btn-sm fw-bold px-4">Submit Attendance Sheet</button>
                    </form>
                </div>
            `
        },
        'faculty-marks': {
            title: '<i class="bi bi-journal-bookmark-fill text-warning me-2"></i>INTERNAL ASSESSMENT MARKS ENTRY',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <h6 class="fw-bold text-navy mb-3"><i class="bi bi-award text-warning me-2"></i>CIE Internal Assessment Marks Entry</h6>
                    <div class="table-responsive rounded-3 border">
                        <table class="table table-hover align-middle mb-0 text-start small">
                            <thead class="table-navy text-white fw-bold">
                                <tr><th>USN</th><th>Student Name</th><th>IA-1 (40)</th><th>IA-2 (40)</th><th>IA-3 (40)</th><th>Assignments (10)</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>2AG22CS001</td><td>Prajwal Patil</td><td><input type="number" class="form-control form-control-sm" value="38" style="width: 70px;"></td><td><input type="number" class="form-control form-control-sm" value="36" style="width: 70px;"></td><td><input type="number" class="form-control form-control-sm" value="39" style="width: 70px;"></td><td><input type="number" class="form-control form-control-sm" value="10" style="width: 70px;"></td></tr>
                                <tr><td>2AG22CS002</td><td>Ramesh Pujar</td><td><input type="number" class="form-control form-control-sm" value="32" style="width: 70px;"></td><td><input type="number" class="form-control form-control-sm" value="35" style="width: 70px;"></td><td><input type="number" class="form-control form-control-sm" value="34" style="width: 70px;"></td><td><input type="number" class="form-control form-control-sm" value="9" style="width: 70px;"></td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="mt-3 text-end">
                        <button class="btn btn-success btn-sm fw-bold px-4" onclick="alert('IA Marks saved successfully to college server!');">Save IA Marks</button>
                    </div>
                </div>
            `
        },
        'faculty-broadcast': {
            title: '<i class="bi bi-megaphone-fill text-danger me-2"></i>CLASS ANNOUNCEMENT BROADCASTER',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <h6 class="fw-bold text-navy mb-3"><i class="bi bi-broadcast text-danger me-2"></i>Send Announcement Notice</h6>
                    <form id="faculty-broadcast-form" onsubmit="event.preventDefault(); alert('Announcement sent to student portal!');">
                        <div class="mb-3">
                            <label class="form-label small text-muted fw-bold">Message Content</label>
                            <textarea class="form-control form-control-sm" rows="3" placeholder="Enter urgent notice for student portal..." required></textarea>
                        </div>
                        <button type="submit" class="btn btn-danger btn-sm fw-bold">Broadcast Notice</button>
                    </form>
                </div>
            `
        },
        'hod-electives': {
            title: '<i class="bi bi-check2-square text-success me-2"></i>DEPARTMENT ELECTIVE APPROVALS',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <h6 class="fw-bold text-navy mb-3">Pending VTU Elective Registration Sheets</h6>
                    <table class="table table-hover align-middle text-start small mb-0">
                        <thead class="table-navy text-white">
                            <tr><th>USN</th><th>Student Name</th><th>Selected Professional Elective</th><th>Status</th><th>Action</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>2AG22CS001</td><td>Prajwal Patil</td><td>Elective 2: Cloud Computing</td><td><span class="badge bg-warning text-dark">Pending HOD Sign</span></td><td><button class="btn btn-xs btn-success" onclick="this.closest('tr').querySelector('.badge').className='badge bg-success'; this.closest('tr').querySelector('.badge').innerText='Approved';">Approve Sheet</button></td></tr>
                            <tr><td>2AG22CS002</td><td>Ramesh Pujar</td><td>Elective 2: Cyber Security</td><td><span class="badge bg-success">Approved</span></td><td><button class="btn btn-xs btn-outline-secondary" disabled>Approved</button></td></tr>
                        </tbody>
                    </table>
                </div>
            `
        },
        'hod-faculty': {
            title: '<i class="bi bi-people-fill text-warning me-2"></i>DEPARTMENT FACULTY WORKLOAD ALLOCATION',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <h6 class="fw-bold text-navy mb-3">CSE Department Faculty Teaching Load</h6>
                    <table class="table table-hover align-middle text-start small mb-0">
                        <thead class="table-navy text-white">
                            <tr><th>Faculty Name</th><th>Designation</th><th>Assigned Subjects</th><th>Weekly Hours</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Dr. S. V. Shiragur</td><td>Professor & HOD</td><td>Machine Learning (21CS63)</td><td>12 Hrs</td></tr>
                            <tr><td>Prof. Irshad Ahmed</td><td>Assistant Professor</td><td>Web Dev (21CS62), Web Lab</td><td>18 Hrs</td></tr>
                            <tr><td>Dr. Tabasum Guledgudd</td><td>Associate Professor</td><td>Software Engg (21CS61)</td><td>16 Hrs</td></tr>
                        </tbody>
                    </table>
                </div>
            `
        },
        'principal-accounts': {
            title: '<i class="bi bi-person-plus-fill text-success me-2"></i>PROVISION ERP SYSTEM ACCOUNTS',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs mb-4">
                    <h6 class="fw-bold text-navy mb-3"><i class="bi bi-person-plus-fill text-success me-1"></i>Create New Portal Account</h6>
                    <form id="principal-create-account-form" onsubmit="principalCreateAccount(event)">
                        <div class="row g-2">
                            <div class="col-sm-4">
                                <label class="form-label small fw-bold text-navy mb-1" style="font-size: 11px;">Full Name</label>
                                <input type="text" id="new-account-name" class="form-control form-control-sm" placeholder="Full Name" required style="font-size: 11px;">
                            </div>
                            <div class="col-sm-4">
                                <label class="form-label small fw-bold text-navy mb-1" style="font-size: 11px;">System ID / USN</label>
                                <input type="text" id="new-account-id" class="form-control form-control-sm text-uppercase" placeholder="2624AGM088" required style="font-size: 11px;">
                            </div>
                            <div class="col-sm-4">
                                <label class="form-label small fw-bold text-navy mb-1" style="font-size: 11px;">Role Portal</label>
                                <select id="new-account-role" class="form-select form-select-sm" required style="font-size: 11px;">
                                    <option value="Student">Student</option>
                                    <option value="Faculty">Faculty</option>
                                    <option value="HOD">HOD</option>
                                    <option value="Office">Office Staff</option>
                                    <option value="Fee">Fee Section</option>
                                    <option value="Principal">Principal</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Broadcast">Broadcast Desk</option>
                                    <option value="TPO">TPO Placement</option>
                                </select>
                            </div>
                            <div class="col-12 text-end mt-2">
                                <button type="submit" class="btn btn-sm btn-primary px-4 fw-bold" style="font-size: 11px; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border: none;">
                                    <i class="bi bi-person-check-fill me-1"></i>Provision Account
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <!-- Managed User Accounts Directory Table (Full CRUD) -->
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h6 class="fw-bold text-navy m-0"><i class="bi bi-people-fill text-primary me-2"></i>System User Accounts Directory</h6>
                            <p class="text-muted small m-0" style="font-size: 11px;">Real-time database records of all provisioned ERP accounts across all gateways.</p>
                        </div>
                        <button type="button" class="btn btn-sm btn-outline-primary fw-bold" onclick="loadUserAccountsTable()">
                            <i class="bi bi-arrow-clockwise me-1"></i>Refresh DB List
                        </button>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover align-middle text-start small mb-0" id="principal-monitoring-table">
                            <thead class="table-navy text-white">
                                <tr>
                                    <th>System ID / USN</th>
                                    <th>User Full Name</th>
                                    <th>ERP Role</th>
                                    <th>Status</th>
                                    <th class="text-end">CRUD Actions</th>
                                </tr>
                            </thead>
                            <tbody id="user-accounts-tbody">
                                <tr>
                                    <td colspan="5" class="text-center py-3 text-muted">Loading user accounts from database...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `
        },
        'principal-metrics': {
            title: '<i class="bi bi-bar-chart-line-fill text-warning me-2"></i>INSTITUTIONAL ENROLLMENT STATISTICS',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <h6 class="fw-bold text-navy mb-3">Branch-wise Student Strength Summary</h6>
                    <div class="table-responsive">
                        <table class="table table-bordered text-center small mb-0">
                            <thead class="table-navy text-white">
                                <tr><th>Department</th><th>KCET Seats</th><th>COMEDK Seats</th><th>Management Quota</th><th>Total Enrolled</th></tr>
                            </thead>
                            <tbody>
                                <tr><td class="fw-bold">Computer Science & Engg</td><td>120</td><td>30</td><td>30</td><td class="fw-bold text-success">180 / 180</td></tr>
                                <tr><td class="fw-bold">AI & Machine Learning</td><td>60</td><td>15</td><td>15</td><td class="fw-bold text-success">90 / 90</td></tr>
                                <tr><td class="fw-bold">Electronics & Comm Engg</td><td>90</td><td>20</td><td>10</td><td class="fw-bold text-success">120 / 120</td></tr>
                                <tr><td class="fw-bold">Civil Engineering</td><td>45</td><td>10</td><td>5</td><td class="fw-bold text-primary">60 / 60</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `
        },
        'principal-accreditation': {
            title: '<i class="bi bi-shield-check text-info me-2"></i>NAAC & NBA ACCREDITATION COMPLIANCE AUDIT',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <h6 class="fw-bold text-navy mb-3">Accreditation Audit Checklist Status</h6>
                    <div class="list-group list-group-flush small">
                        <div class="list-group-item d-flex justify-content-between align-items-center">
                            <span><i class="bi bi-check-circle-fill text-success me-2"></i>Criterion 1: Curricular Aspects & Lesson Plans</span>
                            <span class="badge bg-success">100% Compliant</span>
                        </div>
                        <div class="list-group-item d-flex justify-content-between align-items-center">
                            <span><i class="bi bi-check-circle-fill text-success me-2"></i>Criterion 2: Teaching-Learning & Faculty Publications</span>
                            <span class="badge bg-success">98% Compliant</span>
                        </div>
                        <div class="list-group-item d-flex justify-content-between align-items-center">
                            <span><i class="bi bi-clock-history text-warning me-2"></i>Criterion 3: Research, Innovations & Extension Patents</span>
                            <span class="badge bg-warning text-dark">Under Audit</span>
                        </div>
                    </div>
                </div>
            `
        },
        'admin-news': {
            title: '<i class="bi bi-newspaper text-success me-2"></i>WEBSITE NEWS CMS MANAGER',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <h6 class="fw-bold text-navy mb-3">Publish Official Circular or Announcement</h6>
                    <button class="btn btn-sm btn-primary fw-bold" onclick="loadCmsNews()"><i class="bi bi-arrow-clockwise me-1"></i>Open News CMS Editor</button>
                </div>
            `
        },
        'admin-inquiries': {
            title: '<i class="bi bi-envelope-paper-fill text-warning me-2"></i>ADMISSION INQUIRIES DIRECTORY',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <h6 class="fw-bold text-navy mb-3">View Received Website Admission Inquiries</h6>
                    <button class="btn btn-sm btn-outline-primary fw-bold" onclick="loadCmsInquiries()"><i class="bi bi-download me-1"></i>Fetch Live Inquiries</button>
                </div>
            `
        },
        'broadcast-logs': {
            title: '<i class="bi bi-list-check text-success me-2"></i>EMERGENCY BROADCAST LOGS & ANALYTICS',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <h6 class="fw-bold text-navy mb-3">Dispatch History Log</h6>
                    <table class="table table-hover align-middle text-start small mb-0">
                        <thead class="table-navy text-white">
                            <tr><th>Time</th><th>Channel</th><th>Audience</th><th>Message Snippet</th><th>Delivery Status</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>28-July-2026</td><td>SMS Gateway</td><td>All Students</td><td>VTU Exam Fee deadline reminder</td><td><span class="badge bg-success">Delivered (1,850)</span></td></tr>
                            <tr><td>25-July-2026</td><td>Portal Alert</td><td>Faculty Only</td><td>Department meeting notice</td><td><span class="badge bg-success">Delivered (125)</span></td></tr>
                        </tbody>
                    </table>
                </div>
            `
        },
        'office-admissions': {
            title: '<i class="bi bi-file-earmark-check-fill text-primary me-2"></i>STUDENT ADMISSION DOCUMENT VERIFICATION',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <h6 class="fw-bold text-navy mb-3">Pending Document Approvals</h6>
                    <table class="table table-hover align-middle text-start small mb-0">
                        <thead class="table-navy text-white">
                            <tr><th>Student Name</th><th>Quota</th><th>Documents Received</th><th>Status</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Rahul Deshpande</td><td>KCET</td><td>10th, 12th, Study Cert, KCET Allotment</td><td><span class="badge bg-success">Verified</span></td></tr>
                            <tr><td>Sneha Hegde</td><td>COMEDK</td><td>10th, 12th Marks Card</td><td><span class="badge bg-warning text-dark">Pending TC</span></td></tr>
                        </tbody>
                    </table>
                </div>
            `
        },
        'office-fees': {
            title: '<i class="bi bi-wallet2 text-warning me-2"></i>FEE REMITTANCE & CHALLAN DESK',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <h6 class="fw-bold text-navy mb-3">Recent Receipt Verification Log</h6>
                    <table class="table table-sm align-middle text-start small mb-0">
                        <thead class="table-navy text-white">
                            <tr><th>Receipt ID</th><th>USN</th><th>Amount Paid</th><th>Payment Mode</th><th>Status</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>REC-2026-908</td><td>2AG22CS001</td><td>85,000 INR</td><td>Bank Challan</td><td><span class="badge bg-success">Cleared</span></td></tr>
                            <tr><td>REC-2026-909</td><td>2AG22CS014</td><td>45,000 INR</td><td>Online UPI</td><td><span class="badge bg-warning text-dark">Verifying</span></td></tr>
                        </tbody>
                    </table>
                </div>
            `
        },
        'office-tickets': {
            title: '<i class="bi bi-ticket-perforated-fill text-info me-2"></i>VTU HALL TICKET DISPATCH DESK',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <h6 class="fw-bold text-navy mb-3">VTU Semester Exam Hall Tickets Batch Generation</h6>
                    <p class="small text-muted">Generate and print verified VTU admit cards for upcoming examinations.</p>
                    <button class="btn btn-info text-white btn-sm fw-bold" onclick="alert('Hall Ticket PDF Batch Printing Triggered!');">Generate CSE Batch Hall Tickets</button>
                </div>
            `
        },
        'tpo-drives': {
            title: '<i class="bi bi-building-add text-success me-2"></i>ACTIVE RECRUITMENT DRIVES (AY 2026-27)',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <h6 class="fw-bold text-navy mb-3">Campus Hiring Schedule & Company Visits</h6>
                    <div class="table-responsive">
                        <table class="table table-hover align-middle text-start small mb-0">
                            <thead class="table-navy text-white">
                                <tr><th>Recruiter</th><th>Role</th><th>Eligibility Criteria</th><th>CTC Package</th><th>Drive Date</th><th>Actions</th></tr>
                            </thead>
                            <tbody>
                                <tr><td class="fw-bold text-navy">TCS Digital</td><td>System Engineer</td><td>CGPA 7.0+, No active backlogs</td><td>7.5 LPA</td><td>05-Aug-2026</td><td><button class="btn btn-xs btn-primary" onclick="alert('Exporting registered candidate list...');">Candidate List</button></td></tr>
                                <tr><td class="fw-bold text-navy">Infosys Specialist</td><td>Power Programmer</td><td>CGPA 8.0+</td><td>9.5 LPA</td><td>12-Aug-2026</td><td><button class="btn btn-xs btn-primary" onclick="alert('Exporting registered candidate list...');">Candidate List</button></td></tr>
                                <tr><td class="fw-bold text-navy">Wipro Turbo</td><td>Project Engineer</td><td>CGPA 6.5+</td><td>6.5 LPA</td><td>18-Aug-2026</td><td><button class="btn btn-xs btn-primary" onclick="alert('Exporting registered candidate list...');">Candidate List</button></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `
        },
        'tpo-roster': {
            title: '<i class="bi bi-file-earmark-spreadsheet-fill text-warning me-2"></i>STUDENT PLACEMENT ELIGIBILITY ROSTER',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <h6 class="fw-bold text-navy mb-3">2026 Graduating Batch Placement Clearance Roster</h6>
                    <div class="table-responsive">
                        <table class="table table-hover align-middle text-start small mb-0">
                            <thead class="table-navy text-white">
                                <tr><th>USN</th><th>Student Name</th><th>Branch</th><th>CGPA</th><th>Backlogs</th><th>Placement Status</th></tr>
                            </thead>
                            <tbody>
                                <tr><td class="fw-bold text-navy">2AG22CS001</td><td>Prajwal Patil</td><td>CSE</td><td>8.88</td><td>0</td><td><span class="badge bg-success">Placed (TCS Digital - 7.5 LPA)</span></td></tr>
                                <tr><td class="fw-bold text-navy">2AG22CS002</td><td>Ramesh Pujar</td><td>CSE</td><td>7.45</td><td>0</td><td><span class="badge bg-primary">Eligible & Registered</span></td></tr>
                                <tr><td class="fw-bold text-navy">2AG22CS003</td><td>Savita Koti</td><td>CSE</td><td>9.12</td><td>0</td><td><span class="badge bg-success">Placed (Infosys - 9.5 LPA)</span></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `
        },
        'timetable': {
            title: '<i class="bi bi-clock-history text-primary me-2"></i>CLASS TIME TABLE & SUBJECT ALLOCATION',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <!-- College Header Banner -->
                    <div class="text-center mb-3 p-3 bg-light border rounded-3 shadow-xs">
                        <img src="/images/logo.png" alt="AGMRCET Logo" style="width: 48px; height: 48px; object-fit: contain;">
                        <h5 class="fw-extrabold text-navy m-0 mt-1" style="font-family: 'Plus Jakarta Sans', sans-serif;">SMM MATOSHRI RASHMI DEVI CHOUDHARY RESEARCH CENTRE & AGMRCET (Code: E238)</h5>
                        <p class="small text-muted m-0" style="font-size: 11px;">(Approved by AICTE, New Delhi || Affiliated to VTU Belagavi || Accredited by NAAC)</p>
                        <h6 class="fw-bold text-navy mt-2 mb-0 tracking-wider text-uppercase border-top border-bottom py-1" style="font-size: 13px;">CLASS TIME TABLE (VI SEMESTER CSE)</h6>
                    </div>

                    <!-- Timetable Grid -->
                    <div class="table-responsive rounded-3 border mb-3">
                        <table class="table table-bordered align-middle text-center small mb-0" style="font-size: 11px;">
                            <thead class="table-navy text-white fw-bold">
                                <tr>
                                    <th>Day of week</th>
                                    <th>Period 1<br>09:00 AM - 09:50 AM</th>
                                    <th>Period 2<br>09:50 AM - 10:40 AM</th>
                                    <th>Period 3<br>10:40 AM - 11:30 AM</th>
                                    <th>Period 4<br>11:30 AM - 12:20 PM</th>
                                    <th>12:20 PM - 01:10 PM</th>
                                    <th>Period 5<br>01:10 PM - 02:00 PM</th>
                                    <th>Period 6<br>02:00 PM - 02:50 PM</th>
                                    <th>Period 7<br>02:50 PM - 03:40 PM</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td class="fw-bold text-navy">Mon</td><td>21CS61 (SE)</td><td>21CS62 (Web)</td><td>21CSL66 (Web Lab A)</td><td>21CSL66 (Web Lab A)</td><td class="table-secondary fw-bold">LUNCH</td><td>21CS63 (ML)</td><td>Library</td><td>Mini Project</td></tr>
                                <tr><td class="fw-bold text-navy">Tue</td><td>21CS63 (ML)</td><td>21CS61 (SE)</td><td>21CSL66 (Web Lab B)</td><td>21CSL66 (Web Lab B)</td><td class="table-secondary fw-bold">LUNCH</td><td>21CS62 (Web)</td><td>Placement Trg</td><td>Seminar</td></tr>
                                <tr><td class="fw-bold text-navy">Wed</td><td>21CS62 (Web)</td><td>21CS63 (ML)</td><td>21CS61 (SE)</td><td>Aptitude</td><td class="table-secondary fw-bold">LUNCH</td><td>Soft Skills</td><td>Library</td><td>Sports</td></tr>
                                <tr><td class="fw-bold text-navy">Thu</td><td>21CS61 (SE)</td><td>21CS63 (ML)</td><td>21CS62 (Web)</td><td>Counseling</td><td class="table-secondary fw-bold">LUNCH</td><td>Mini Project</td><td>Mini Project</td><td>Library</td></tr>
                                <tr><td class="fw-bold text-navy">Fri</td><td>21CS63 (ML)</td><td>21CS62 (Web)</td><td>21CS61 (SE)</td><td>Soft Skills</td><td class="table-secondary fw-bold">LUNCH</td><td>Placement Trg</td><td>Placement Trg</td><td>Library</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Allocation of Subjects Table -->
                    <h6 class="fw-bold text-navy mb-2">Allocation of Subjects</h6>
                    <div class="table-responsive rounded-3 border mb-3">
                        <table class="table table-bordered align-middle text-start small mb-0" style="font-size: 11px;">
                            <thead class="table-secondary text-navy fw-bold">
                                <tr><th>Subject Code</th><th>Subject Name</th><th>Name of Faculty</th><th>Faculty Initials</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>21CS61</td><td>Software Engineering & Project Management</td><td>Dr. Tabasum Guledgudd</td><td>TG</td></tr>
                                <tr><td>21CS62</td><td>Full Stack Web Development</td><td>Prof. Irshad Ahmed</td><td>IA</td></tr>
                                <tr><td>21CS63</td><td>Machine Learning Techniques</td><td>Dr. S. V. Shiragur</td><td>SVS</td></tr>
                                <tr><td>21CSL66</td><td>Web Technology Laboratory</td><td>Prof. R. M. Hiremath</td><td>RMH</td></tr>
                                <tr><td>21CS67</td><td>Mini Project Work</td><td>Dr. Tabasum Guledgudd</td><td>TG</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="d-flex gap-2">
                        <button class="btn btn-primary btn-sm fw-bold px-3" onclick="window.print();">Print</button>
                        <button class="btn btn-success btn-sm fw-bold px-3" onclick="alert('Exporting Time Table PDF...');">Export</button>
                    </div>
                </div>
            `
        },
        'topics-covered': {
            title: '<i class="bi bi-list-task text-secondary me-2"></i>TOPICS COVERED REPORT',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <!-- Subject Dropdown Selector -->
                    <div class="mb-3">
                        <label class="form-label small text-muted fw-bold">Select Subject for Syllabus Coverage Log:</label>
                        <select class="form-select form-select-sm" onchange="alert('Loaded topics covered log for selected course!');">
                            <option selected>21CS61 - SOFTWARE ENGINEERING & PROJECT MANAGEMENT</option>
                            <option>21CS62 - FULL STACK WEB DEVELOPMENT</option>
                            <option>21CS63 - MACHINE LEARNING TECHNIQUES</option>
                            <option>21CSL66 - WEB TECHNOLOGY LABORATORY</option>
                            <option>21CS67 - MINI PROJECT WORK</option>
                        </select>
                    </div>

                    <h6 class="fw-bold text-navy mb-2">TOPICS COVERED LOG</h6>
                    <div class="table-responsive rounded-3 border mb-3">
                        <table class="table table-bordered align-middle text-start small mb-0" style="font-size: 11px;">
                            <thead class="table-navy text-white fw-bold text-center">
                                <tr><th>Sl.No</th><th>Unit.No</th><th>Date</th><th>No.of Periods</th><th>Topics Covered</th></tr>
                            </thead>
                            <tbody>
                                <tr><td class="text-center">1</td><td class="text-center">1</td><td>13/07/2026</td><td class="text-center">7</td><td>Discussed COs and POs of 21CS61 (Software Engineering)</td></tr>
                                <tr><td class="text-center">2</td><td class="text-center">1</td><td>15/07/2026</td><td class="text-center">4</td><td>Introduction to Software Process Models & Waterfall Model</td></tr>
                                <tr><td class="text-center">3</td><td class="text-center">1</td><td>16/07/2026</td><td class="text-center">1,5</td><td>Agile Software Development Processes & Scrum Framework</td></tr>
                                <tr><td class="text-center">4</td><td class="text-center">1</td><td>17/07/2026</td><td class="text-center">7</td><td>Requirements Engineering, Functional & Non-Functional Specifications</td></tr>
                                <tr><td class="text-center">5</td><td class="text-center">1</td><td>20/07/2026</td><td class="text-center">7</td><td>System Modeling, Use Case Diagrams & Data Flow Diagrams (DFD)</td></tr>
                                <tr><td class="text-center">6</td><td class="text-center">1</td><td>22/07/2026</td><td class="text-center">4</td><td>Architectural Design Patterns & Component-based Engineering</td></tr>
                                <tr><td class="text-center">7</td><td class="text-center">1</td><td>23/07/2026</td><td class="text-center">1,5</td><td>Software Testing Strategies: White-box, Black-box & Unit Testing</td></tr>
                                <tr><td class="text-center">8</td><td class="text-center">1</td><td>24/07/2026</td><td class="text-center">7</td><td>Software Maintenance, Risk Management & Cost Estimation</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `
        },
        'resources': {
            title: '<i class="bi bi-journal-bookmark text-indigo me-2"></i>E-RESOURCES & STUDY MATERIAL',
            html: `
                <div class="card border rounded-3 p-4 bg-white shadow-xs">
                    <!-- Filter Bar -->
                    <div class="row g-2 mb-3 align-items-center">
                        <div class="col-md-6">
                            <label class="form-label small text-muted fw-bold">Search Keyword:</label>
                            <input type="text" class="form-control form-control-sm" placeholder="Search by topic, subject code, or keyword...">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small text-muted fw-bold">Resource Type:</label>
                            <select class="form-select form-select-sm">
                                <option>-All-</option>
                                <option>E-Book</option>
                                <option>Question Bank</option>
                                <option>Interview Tips</option>
                                <option>Notes</option>
                                <option>Lecture</option>
                                <option>Others</option>
                                <option>QP and Key</option>
                            </select>
                        </div>
                    </div>

                    <h6 class="fw-bold text-navy mb-2">AVAILABLE E-RESOURCES & STUDY MATERIAL</h6>
                    <div class="table-responsive rounded-3 border">
                        <table class="table table-hover align-middle text-start small mb-0">
                            <thead class="table-navy text-white">
                                <tr><th>Resource Title</th><th>Subject</th><th>Type</th><th>Upload Date</th><th>Download</th></tr>
                            </thead>
                            <tbody>
                                <tr><td class="fw-bold text-navy">VTU 2021 Scheme VI Sem CSE Question Bank</td><td>21CS61 / 21CS62 / 21CS63</td><td><span class="badge bg-primary">Question Bank</span></td><td>20-July-2026</td><td><button class="btn btn-xs btn-outline-primary" onclick="alert('Downloading Question Bank PDF...');">Download PDF</button></td></tr>
                                <tr><td class="fw-bold text-navy">Full Stack Web Development (Node & React) Notes</td><td>21CS62</td><td><span class="badge bg-success">Notes</span></td><td>18-July-2026</td><td><button class="btn btn-xs btn-outline-primary" onclick="alert('Downloading Notes PDF...');">Download PDF</button></td></tr>
                                <tr><td class="fw-bold text-navy">Machine Learning Algorithms Lecture Transcripts</td><td>21CS63</td><td><span class="badge bg-info text-white">Lecture</span></td><td>15-July-2026</td><td><button class="btn btn-xs btn-outline-primary" onclick="alert('Downloading Lecture PDF...');">Download PDF</button></td></tr>
                                <tr><td class="fw-bold text-navy">TCS & Infosys Campus Interview Preparation Guide</td><td>Placements</td><td><span class="badge bg-warning text-dark">Interview Tips</span></td><td>22-July-2026</td><td><button class="btn btn-xs btn-outline-primary" onclick="alert('Downloading Interview Guide PDF...');">Download PDF</button></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `
        }
    };

    const target = tabContents[tabKey] || {
        title: `<i class="bi bi-grid-fill text-primary me-2"></i>${tabKey.toUpperCase()}`,
        html: `<div class="card border rounded-3 p-4 bg-white shadow-xs"><p class="m-0 small">Records for ${tabKey} are up to date.</p></div>`
    };

    if (dynamicHeader) dynamicHeader.innerHTML = target.title;
    if (dynamicBody) dynamicBody.innerHTML = target.html;

    if (tabKey === 'principal-accounts' && typeof window.loadUserAccountsTable === 'function') {
        window.loadUserAccountsTable();
    }
};

window.filterSidebarMenu = function(query) {
    const q = query.toLowerCase();
    const items = document.querySelectorAll('.erp-sidebar-nav-item');
    items.forEach(item => {
        const text = item.innerText.toLowerCase();
        if (text.includes(q)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
};

window.togglePasswordVisibility = function() {
    const pwdInput = document.getElementById('erp-password');
    const eyeIcon = document.getElementById('pwd-eye-icon');
    if (pwdInput) {
        if (pwdInput.type === 'password') {
            pwdInput.type = 'text';
            if (eyeIcon) eyeIcon.className = 'bi bi-eye-slash text-primary';
        } else {
            pwdInput.type = 'password';
            if (eyeIcon) eyeIcon.className = 'bi bi-eye text-muted';
        }
    }
};

window.quickFillRoleCredentials = function(role) {
    if (typeof window.switchPortalGateway === 'function') {
        window.switchPortalGateway(role);
    }
};

window.handleChangePassword = function(e) {
    if (e) e.preventDefault();
    const np = document.getElementById('new-password');
    const cnp = document.getElementById('confirm-new-password');
    const alertEl = document.getElementById('reset-success-alert');

    if (np && cnp && np.value !== cnp.value) {
        alert('New password and confirm password do not match!');
        return;
    }

    if (alertEl) {
        alertEl.innerText = 'ERP Password updated successfully!';
        alertEl.classList.remove('d-none');
        setTimeout(() => {
            alertEl.classList.add('d-none');
            const form = document.getElementById('forgot-password-form');
            if (form) form.reset();
            const modalEl = document.getElementById('forgotPasswordModal');
            if (modalEl && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
                const modalObj = bootstrap.Modal.getInstance(modalEl);
                if (modalObj) modalObj.hide();
            }
        }, 1500);
    }
};

