-- ============================================================================
-- AGMRCET University Digital Campus ERP Database Schema v1.0
-- Complete Relational Schema with Foreign Keys & Inter-Connection Mapping Tables
-- ============================================================================

-- 1. Departments Master Table
CREATE TABLE IF NOT EXISTS departments (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    shortName VARCHAR(20) NOT NULL,
    established INT NOT NULL,
    intake INT NOT NULL,
    duration VARCHAR(30) NOT NULL,
    hodName VARCHAR(100) NOT NULL,
    hodDesignation VARCHAR(100) NOT NULL,
    hodQualification VARCHAR(100) NOT NULL,
    hodExperience VARCHAR(50) NOT NULL,
    hodMessage TEXT NOT NULL,
    hodPhoto VARCHAR(255) NOT NULL,
    statsFaculty INT NOT NULL,
    statsLabs INT NOT NULL,
    statsPlacementRate VARCHAR(20) NOT NULL,
    statsAvgPackage VARCHAR(20) NOT NULL,
    placementHighestPackage VARCHAR(20) NOT NULL,
    placementRecentOffers INT NOT NULL,
    researchAreas TEXT NOT NULL,
    topRecruiters TEXT NOT NULL
);

-- 2. Department Child Tables
CREATE TABLE IF NOT EXISTS department_labs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_id VARCHAR(50) NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS department_achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_id VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    details TEXT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS department_projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    funding VARCHAR(150) NOT NULL,
    amount VARCHAR(50) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

-- 3. Users Master Authentication & Gateway Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    department_id VARCHAR(50),
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- 4. Faculty Directory Master Table
CREATE TABLE IF NOT EXISTS faculty (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(100) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    qualification VARCHAR(100) NOT NULL,
    experience VARCHAR(50) NOT NULL,
    researchArea VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    image VARCHAR(255) NOT NULL,
    department_id VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

-- 5. Students Profile Master Table
CREATE TABLE IF NOT EXISTS students (
    usn VARCHAR(50) PRIMARY KEY,
    user_id INT,
    name VARCHAR(150) NOT NULL,
    father_name VARCHAR(150),
    mother_name VARCHAR(150),
    dob VARCHAR(30),
    gender VARCHAR(20),
    blood_group VARCHAR(10),
    phone VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    department_id VARCHAR(50),
    semester VARCHAR(20) DEFAULT 'VI Semester',
    section VARCHAR(10) DEFAULT 'A',
    quota VARCHAR(50) DEFAULT 'KCET Quota',
    rank_no VARCHAR(50) DEFAULT '24,150',
    category VARCHAR(50) DEFAULT 'OBC (Category 2A)',
    hostel_room VARCHAR(100) DEFAULT 'Room 204, Ganga Girls Hostel',
    counselor_name VARCHAR(150) DEFAULT 'Dr. S. V. Shiragur',
    cgpa DECIMAL(4,2) DEFAULT 8.88,
    fee_cleared BOOLEAN DEFAULT TRUE,
    vtu_eligible BOOLEAN DEFAULT TRUE,
    photo VARCHAR(255) DEFAULT '/images/csHod.png',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- 6. Academic Courses / Subjects Master Table
CREATE TABLE IF NOT EXISTS courses (
    code VARCHAR(30) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    department_id VARCHAR(50) NOT NULL,
    semester VARCHAR(20) NOT NULL,
    credits INT NOT NULL DEFAULT 4,
    type VARCHAR(30) DEFAULT 'Theory',
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

-- 7. Faculty-Course Allocation Inter-Connection Mapping Table
CREATE TABLE IF NOT EXISTS faculty_course_allocations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    faculty_id INT NOT NULL,
    course_code VARCHAR(30) NOT NULL,
    semester VARCHAR(20) NOT NULL,
    academic_year VARCHAR(30) DEFAULT '2026-27',
    FOREIGN KEY (faculty_id) REFERENCES faculty(id) ON DELETE CASCADE,
    FOREIGN KEY (course_code) REFERENCES courses(code) ON DELETE CASCADE
);

-- 8. Student-Course Enrollment Inter-Connection Mapping Table
CREATE TABLE IF NOT EXISTS student_course_enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_usn VARCHAR(50) NOT NULL,
    course_code VARCHAR(30) NOT NULL,
    semester VARCHAR(20) NOT NULL,
    academic_year VARCHAR(30) DEFAULT '2026-27',
    status VARCHAR(30) DEFAULT 'Enrolled',
    FOREIGN KEY (student_usn) REFERENCES students(usn) ON DELETE CASCADE,
    FOREIGN KEY (course_code) REFERENCES courses(code) ON DELETE CASCADE
);

-- 9. Student Attendance Records Table
CREATE TABLE IF NOT EXISTS student_attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_usn VARCHAR(50) NOT NULL,
    course_code VARCHAR(30) NOT NULL,
    subject_name VARCHAR(150) NOT NULL,
    total_classes INT NOT NULL DEFAULT 48,
    attended_classes INT NOT NULL DEFAULT 42,
    percentage DECIMAL(5,2) GENERATED ALWAYS AS ((attended_classes / total_classes) * 100) STORED,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_usn) REFERENCES students(usn) ON DELETE CASCADE,
    FOREIGN KEY (course_code) REFERENCES courses(code) ON DELETE CASCADE
);

-- 10. Student Marks & CIE Grades Table
CREATE TABLE IF NOT EXISTS student_marks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_usn VARCHAR(50) NOT NULL,
    course_code VARCHAR(30) NOT NULL,
    subject_name VARCHAR(150) NOT NULL,
    cie1 INT DEFAULT 45,
    cie2 INT DEFAULT 48,
    cie3 INT DEFAULT 46,
    assignment INT DEFAULT 10,
    grade VARCHAR(5) DEFAULT 'A+',
    result VARCHAR(20) DEFAULT 'Pass',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_usn) REFERENCES students(usn) ON DELETE CASCADE,
    FOREIGN KEY (course_code) REFERENCES courses(code) ON DELETE CASCADE
);

-- 11. Elective Choice Requests Table
CREATE TABLE IF NOT EXISTS elective_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_usn VARCHAR(50) NOT NULL,
    student_name VARCHAR(150) NOT NULL,
    course_code VARCHAR(30),
    elective_name VARCHAR(255) NOT NULL,
    cie_status VARCHAR(50) DEFAULT 'Eligible',
    status VARCHAR(30) DEFAULT 'Pending',
    approved_by VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_usn) REFERENCES students(usn) ON DELETE CASCADE
);

-- 12. Outing Gatepasses Table
CREATE TABLE IF NOT EXISTS gatepasses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_usn VARCHAR(50) NOT NULL,
    student_name VARCHAR(150) NOT NULL,
    reason TEXT NOT NULL,
    out_date VARCHAR(50) NOT NULL,
    in_date VARCHAR(50) NOT NULL,
    status VARCHAR(30) DEFAULT 'Pending',
    approved_by VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_usn) REFERENCES students(usn) ON DELETE CASCADE
);

-- 13. Complaints & Grievances Table
CREATE TABLE IF NOT EXISTS complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_usn VARCHAR(50) NOT NULL,
    student_name VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'Open',
    response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_usn) REFERENCES students(usn) ON DELETE CASCADE
);

-- 14. Announcements & Circular Broadcasts Table
CREATE TABLE IF NOT EXISTS announcements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT,
    sender_role VARCHAR(50) NOT NULL,
    sender_name VARCHAR(150) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    target_role VARCHAR(50) DEFAULT 'all',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 15. Fee Ledgers Summary Table
CREATE TABLE IF NOT EXISTS fee_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_usn VARCHAR(50) NOT NULL,
    student_name VARCHAR(150) NOT NULL,
    total_fee DECIMAL(10,2) NOT NULL DEFAULT 95000.00,
    paid_fee DECIMAL(10,2) NOT NULL DEFAULT 95000.00,
    due_fee DECIMAL(10,2) GENERATED ALWAYS AS (total_fee - paid_fee) STORED,
    status VARCHAR(30) DEFAULT 'Paid In Full',
    last_receipt_no VARCHAR(100) DEFAULT 'REC-2026-8841',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_usn) REFERENCES students(usn) ON DELETE CASCADE
);

-- 16. Fee Receipts & Challan Transactions Table
CREATE TABLE IF NOT EXISTS fee_receipts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fee_record_id INT,
    student_usn VARCHAR(50) NOT NULL,
    receipt_no VARCHAR(100) NOT NULL,
    amount_paid DECIMAL(10,2) NOT NULL,
    payment_mode VARCHAR(50) DEFAULT 'Bank Challan',
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    issued_by VARCHAR(150) DEFAULT 'Accounts Desk',
    FOREIGN KEY (fee_record_id) REFERENCES fee_records(id) ON DELETE CASCADE,
    FOREIGN KEY (student_usn) REFERENCES students(usn) ON DELETE CASCADE
);

-- 17. TPO Placement Recruitment Drives Table
CREATE TABLE IF NOT EXISTS placement_drives (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(150) NOT NULL,
    job_role VARCHAR(150) NOT NULL,
    package_offered VARCHAR(50) NOT NULL,
    drive_date VARCHAR(50) NOT NULL,
    eligibility_cgpa DECIMAL(4,2) DEFAULT 7.00,
    status VARCHAR(30) DEFAULT 'Upcoming'
);

-- 18. Student Placement Drive Applications Mapping Table
CREATE TABLE IF NOT EXISTS placement_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    drive_id INT NOT NULL,
    student_usn VARCHAR(50) NOT NULL,
    application_status VARCHAR(50) DEFAULT 'Applied',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (drive_id) REFERENCES placement_drives(id) ON DELETE CASCADE,
    FOREIGN KEY (student_usn) REFERENCES students(usn) ON DELETE CASCADE
);

-- 19. Library Books Inventory Table
CREATE TABLE IF NOT EXISTS library_books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_title VARCHAR(255) NOT NULL,
    author VARCHAR(150) NOT NULL,
    isbn VARCHAR(50),
    category VARCHAR(100) NOT NULL,
    total_copies INT DEFAULT 10,
    available_copies INT DEFAULT 10
);

-- 20. Library Borrowings Mapping Table
CREATE TABLE IF NOT EXISTS library_borrowings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_usn VARCHAR(50) NOT NULL,
    book_id INT NOT NULL,
    issue_date VARCHAR(30) NOT NULL,
    due_date VARCHAR(30) NOT NULL,
    return_date VARCHAR(30),
    status VARCHAR(30) DEFAULT 'Issued',
    FOREIGN KEY (student_usn) REFERENCES students(usn) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES library_books(id) ON DELETE CASCADE
);

-- 21. Website News CMS Table
CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    date VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 22. Public Admission Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    course VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'New Inquiry',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- Seed Default Initial Records across All Inter-Connected Tables
-- ============================================================================

-- Seed Users
INSERT INTO users (username, password, role, name, email, status) VALUES
('2AG22CS001', 'password', 'student', 'Prajwal Patil', 'prajwal.patil@agmrcet.ac.in', 'Active'),
('AGM-FAC-101', 'password', 'faculty', 'Dr. S. V. Shiragur', 'svshiragur@agmrcet.ac.in', 'Active'),
('AGM-HOD-101', 'password', 'hod', 'Dr. S. V. Shiragur (HOD CSE)', 'hod.cse@agmrcet.ac.in', 'Active'),
('AGM-OFF-101', 'password', 'office', 'Academic Office Registrar', 'office@agmrcet.ac.in', 'Active'),
('AGM-FEE-201', 'password', 'fee', 'Accounts & Fee Clearance Desk', 'finance@agmrcet.ac.in', 'Active'),
('AGM-PRIN-001', 'password', 'principal', 'Dr. Sandeep Kyatanavar (Principal)', 'principal@agmrcet.ac.in', 'Active'),
('AGM-ADMIN-999', 'password', 'admin', 'System Admin Coordinator', 'admin@agmrcet.ac.in', 'Active'),
('AGM-BROADCAST-888', 'password', 'broadcast', 'Emergency Broadcast Officer', 'broadcast@agmrcet.ac.in', 'Active'),
('AGM-TPO-777', 'password', 'tpo', 'Training & Placement Officer', 'tpo@agmrcet.ac.in', 'Active')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Seed Student
INSERT INTO students (usn, user_id, name, father_name, mother_name, dob, gender, blood_group, phone, email, address, department_id, semester, section, quota, rank_no, category, hostel_room, counselor_name, cgpa, fee_cleared, vtu_eligible) VALUES
('2AG22CS001', 1, 'Prajwal Patil', 'Suresh Patil', 'Sunita Patil', '14-Aug-2004', 'Male', 'O+ Positive', '+91 98450 12345', 'prajwal.patil@agmrcet.ac.in', '#142, Keshwapur, Hubballi, Karnataka - 580023', 'cse', 'VI Semester', 'A', 'KCET Quota (E199)', '24,150', 'OBC (Category 2A)', 'Room 204, Ganga Hostel', 'Dr. S. V. Shiragur', 8.88, TRUE, TRUE)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Seed Courses
INSERT INTO courses (code, name, department_id, semester, credits, type) VALUES
('21CS61', 'Software Engineering & Testing', 'cse', 'VI Semester', 4, 'Theory'),
('21CS62', 'Full Stack Web Development', 'cse', 'VI Semester', 4, 'Theory'),
('21CS63', 'Machine Learning & AI', 'cse', 'VI Semester', 4, 'Elective'),
('21CS64', 'Cloud Computing & DevOps', 'cse', 'VI Semester', 3, 'Theory')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Seed Student Attendance
INSERT INTO student_attendance (student_usn, course_code, subject_name, total_classes, attended_classes) VALUES
('2AG22CS001', '21CS61', 'Software Engineering & Testing', 48, 44),
('2AG22CS001', '21CS62', 'Full Stack Web Development', 48, 46),
('2AG22CS001', '21CS63', 'Machine Learning & AI', 48, 42),
('2AG22CS001', '21CS64', 'Cloud Computing & DevOps', 48, 40)
ON DUPLICATE KEY UPDATE attended_classes=VALUES(attended_classes);

-- Seed Student Marks
INSERT INTO student_marks (student_usn, course_code, subject_name, cie1, cie2, cie3, assignment, grade, result) VALUES
('2AG22CS001', '21CS61', 'Software Engineering & Testing', 48, 47, 49, 10, 'S', 'Pass'),
('2AG22CS001', '21CS62', 'Full Stack Web Development', 50, 48, 50, 10, 'S', 'Pass'),
('2AG22CS001', '21CS63', 'Machine Learning & AI', 44, 45, 46, 9, 'A', 'Pass'),
('2AG22CS001', '21CS64', 'Cloud Computing & DevOps', 42, 43, 45, 9, 'A', 'Pass')
ON DUPLICATE KEY UPDATE grade=VALUES(grade);

-- Seed Announcements
INSERT INTO announcements (sender_role, sender_name, title, message, target_role) VALUES
('hod', 'Dr. S. V. Shiragur (HOD CSE)', 'VTU Elective Registration Notice', 'Please submit your VTU elective registration sheets by Friday before 4:00 PM.', 'all'),
('principal', 'Dr. Sandeep Kyatanavar', 'Mid-Term CIE Examination Timetable Released', 'The Mid-Term CIE Examinations for VI Semester will commence from Monday.', 'all')
ON DUPLICATE KEY UPDATE message=VALUES(message);

-- Seed Elective Request
INSERT INTO elective_requests (student_usn, student_name, course_code, elective_name, cie_status, status, approved_by) VALUES
('2AG22CS001', 'Prajwal Patil', '21CS63', 'Machine Learning (21CS63)', 'Eligible', 'Approved', 'Dr. S. V. Shiragur (HOD CSE)')
ON DUPLICATE KEY UPDATE status=VALUES(status);

-- Seed Fee Record
INSERT INTO fee_records (student_usn, student_name, total_fee, paid_fee, status, last_receipt_no) VALUES
('2AG22CS001', 'Prajwal Patil', 95000.00, 95000.00, 'Paid In Full', 'REC-2026-8841')
ON DUPLICATE KEY UPDATE status=VALUES(status);

-- Seed Placement Drives
INSERT INTO placement_drives (company_name, job_role, package_offered, drive_date, eligibility_cgpa, status) VALUES
('TCS Tata Consultancy Services', 'Software Engineer', '7.5 LPA', '15-Aug-2026', 6.50, 'Upcoming'),
('Infosys Technologies', 'Systems Engineer', '6.8 LPA', '22-Aug-2026', 6.50, 'Upcoming'),
('Capgemini India', 'Analyst Software Engineer', '7.0 LPA', '01-Sep-2026', 6.00, 'Upcoming')
ON DUPLICATE KEY UPDATE package_offered=VALUES(package_offered);

-- Seed Library Books
INSERT INTO library_books (book_title, author, isbn, category, total_copies, available_copies) VALUES
('Software Engineering: A Practitioner Approach', 'Roger S. Pressman', '978-0078017223', 'Computer Science', 15, 12),
('Full Stack Development with Node & React', 'Ethan Brown', '978-1491953020', 'Computer Science', 10, 8),
('Pattern Recognition and Machine Learning', 'Christopher M. Bishop', '978-0387310732', 'Artificial Intelligence', 8, 5)
ON DUPLICATE KEY UPDATE total_copies=VALUES(total_copies);
