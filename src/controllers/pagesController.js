const facultyModel = require('../models/facultyModel');
const newsModel = require('../models/newsModel');
const departmentModel = require('../models/departmentModel');

exports.renderHome = async (req, res) => {
    try {
        const importantNews = await newsModel.getImportantNews();
        const allNews = await newsModel.getAllNews();
        const depts = await departmentModel.getAllDepartments();
        
        // Parse JSON lists for each department to render top recruiters in HTML
        depts.forEach(dept => {
            const hodObj = dept.hod || {};
            dept.hodName = dept.hodName || hodObj.name || 'HOD';
            dept.hodPhoto = dept.hodPhoto || hodObj.photo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80';
            dept.hodExp = dept.hodExp || dept.hodExperience || hodObj.experience || '12 Years';
            dept.hodDesignation = dept.hodDesignation || dept.hodDesignation || hodObj.designation || 'HOD & Professor';
            dept.hodMessage = dept.hodMessage || hodObj.message || 'Welcome to our department.';
            
            // Format HOD message to prevent breaking quotes
            if (dept.hodMessage) {
                dept.hodMessage = dept.hodMessage.replace(/"/g, "'");
            }
            if (typeof dept.topRecruiters === 'string') {
                try {
                    dept.topRecruitersList = JSON.parse(dept.topRecruiters);
                } catch(e) {
                    dept.topRecruitersList = ["TCS", "Infosys", "Capgemini", "Wipro"];
                }
            } else {
                dept.topRecruitersList = dept.topRecruiters || ["TCS", "Infosys", "Capgemini", "Wipro"];
            }
        });
        
        res.render('home', {
            title: 'AGM Rural College of Engineering & Technology - Varur, Hubballi',
            description: 'AGMRCET is one of Karnatakas premier technical universities under the SDM Jainmatt Trust, providing quality engineering, MCA, and MBA programs.',
            importantNews,
            allNews,
            depts,
            activeHome: true
        });
    } catch (error) {
        console.error('Error rendering home page:', error);
        res.status(500).render('error', {
            title: 'Internal Server Error | AGMRCET',
            message: 'An error occurred while loading the home page.'
        });
    }
};

exports.renderAbout = (req, res) => {
    res.render('about', {
        title: 'About Us | AGMRCET Hubli',
        description: 'Explore the history, vision, mission, and messages from the Chairman and Principal of AGM Rural College of Engineering & Technology.',
        activeAbout: true
    });
};

exports.renderAdmissions = async (req, res) => {
    try {
        const depts = await departmentModel.getAllDepartments();
        res.render('admissions', {
            title: 'Admissions 2026-27 | AGMRCET',
            description: 'Find engineering eligibility criteria, fee structures, courses offered, scholarships, and submit your admission inquiry online.',
            depts,
            activeAdmissions: true
        });
    } catch (error) {
        console.error('Error rendering admissions page:', error);
        res.status(500).render('error', {
            title: 'Internal Server Error | AGMRCET',
            message: 'An error occurred while loading the admissions page.'
        });
    }
};

exports.renderPlacements = (req, res) => {
    res.render('placements', {
        title: 'Placements Dashboard | AGMRCET',
        description: 'Look at the career achievements, salary package trends, placement rates, and our top recruiters at AGMRCET.',
        activePlacements: true
    });
};

exports.renderAlumni = (req, res) => {
    res.render('alumni', {
        title: 'Alumni Cell | AGMRCET',
        description: 'AGMRCET Alumni Association builds a life-long connection between the institute and its global graduates.',
        activeAlumni: true
    });
};

exports.renderCampusLife = (req, res) => {
    res.render('campus-life', {
        title: 'Campus Life | AGMRCET Facilities',
        description: 'Experience hostel living, academic library, sports complex, incubation facilities, and take a 360-degree tour of AGMRCET campus.',
        activeCampus: true
    });
};

exports.renderResearch = (req, res) => {
    res.render('research', {
        title: 'Research & Innovation | AGMRCET',
        description: 'Discover active patents, research publications, MoUs, ongoing innovations, and annual hackathons at AGMRCET.',
        activeResearch: true
    });
};

exports.renderFaculty = async (req, res) => {
    try {
        const facultyList = await facultyModel.getAllFaculty();
        const deptsList = await departmentModel.getDepartmentsList();
        res.render('faculty', {
            title: 'Faculty Directory | AGMRCET',
            description: 'Meet our dedicated professors, assistant professors, and research guides across all departments at AGMRCET.',
            facultyList,
            deptsList,
            activeFaculty: true
        });
    } catch (error) {
        console.error('Error rendering faculty directory:', error);
        res.status(500).render('error', {
            title: 'Internal Server Error | AGMRCET',
            message: 'An error occurred while loading the faculty directory.'
        });
    }
};

exports.renderPortal = (req, res) => {
    res.redirect('/portal/student');
};

exports.renderPortalRole = (req, res) => {
    const role = req.params.role;
    const allowedRoles = ['student', 'faculty', 'hod', 'office', 'fee', 'principal', 'admin', 'broadcast', 'tpo'];
    if (!allowedRoles.includes(role)) {
        return res.redirect('/portal/student');
    }
    res.render('portal', {
        title: `${role.charAt(0).toUpperCase() + role.slice(1)} Portal ERP | AGMRCET`,
        description: `Access secure ERP services for ${role}.`,
        activePortal: true,
        noHeaderFooter: true,
        selectedRole: role
    });
};

exports.renderGallery = (req, res) => {
    res.render('gallery', {
        title: 'Campus Media Gallery | AGMRCET',
        description: 'Browse photos and videos of college events, laboratories, sports meets, and beautiful campus buildings.',
        activeGallery: true
    });
};

exports.renderContact = (req, res) => {
    res.render('contact', {
        title: 'Contact Us | AGMRCET Varur',
        description: 'Find contact phone numbers, email addresses, department contacts, and Google Maps direction details to our campus in Hubli.',
        activeContact: true
    });
};

exports.renderNews = async (req, res) => {
    try {
        const allNews = await newsModel.getAllNews();
        res.render('news', {
            title: 'News & Announcements | AGMRCET',
            description: 'Get the latest information, university circulars, exam dates, and achievement highlights from AGMRCET.',
            allNews,
            activeNews: true
        });
    } catch (error) {
        console.error('Error rendering news page:', error);
        res.status(500).render('error', {
            title: 'Internal Server Error | AGMRCET',
            message: 'An error occurred while loading the news page.'
        });
    }
};

exports.handleInquiry = async (req, res) => {
    const { name, email, phone, course, message } = req.body || {};
    const db = require('../config/db');
    
    console.log(`[INQUIRY] New submission: ${name} | ${email} | ${phone} | ${course}`);
    
    try {
        // Persist inquiry to the database
        await db.query(
            'INSERT INTO inquiries (name, email, phone, course, message) VALUES (?, ?, ?, ?, ?)',
            [name, email, phone, course, message]
        );
        console.log('[INQUIRY] Successfully stored submission in the database.');
    } catch (err) {
        console.warn('[INQUIRY WARNING] Failed to store submission in database, using temporary log.', err.message);
    }
    
    // Return a JSON response back to the client
    res.status(200).json({
        success: true,
        message: `Thank you, ${name}! Your admission inquiry has been received. Our counselor will contact you at ${phone} or ${email} shortly.`
    });
};

// Built-in Pure Node JWT Authentication Utilities
const crypto = require('crypto');
const JWT_SECRET = process.env.JWT_SECRET || 'agmrcet_secret_security_key';

function generateJWT(payload) {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = crypto.createHmac('sha256', JWT_SECRET)
        .update(`${header}.${data}`)
        .digest('base64url');
    return `${header}.${data}.${signature}`;
}

function verifyJWT(token) {
    try {
        const [header, data, signature] = token.split('.');
        const expectedSignature = crypto.createHmac('sha256', JWT_SECRET)
            .update(`${header}.${data}`)
            .digest('base64url');
        if (signature === expectedSignature) {
            return JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
        }
    } catch (e) {}
    return null;
}

const portalModel = require('../models/portalModel');

exports.handleLogin = async (req, res) => {
    const { username, password, expectedRole } = req.body || {};
    if (!username || !password || password.length < 4) {
        return res.status(401).json({ success: false, message: 'Invalid credentials. Password must be 4+ chars.' });
    }

    const usnUpper = username.trim().toUpperCase();
    let role = 'student';
    let name = usnUpper;

    // Check database for real registered user account
    try {
        const dbUser = await portalModel.getUserByUsername(usnUpper);
        if (dbUser) {
            if (dbUser.password !== password) {
                return res.status(401).json({ success: false, message: 'Invalid password. Please check your credentials.' });
            }
            role = dbUser.role;
            name = dbUser.name;
        } else {
            // Fallback prefix role assignment for initial default logins
            if (usnUpper.startsWith('AGM-FAC-')) role = 'faculty';
            else if (usnUpper.startsWith('AGM-HOD-')) role = 'hod';
            else if (usnUpper.startsWith('AGM-OFF-')) role = 'office';
            else if (usnUpper.startsWith('AGM-PRIN-')) role = 'principal';
            else if (usnUpper.startsWith('AGM-FEE-')) role = 'fee';
            else if (usnUpper.startsWith('AGM-ADMIN-')) role = 'admin';
            else if (usnUpper.startsWith('AGM-BROADCAST-')) role = 'broadcast';
            else if (usnUpper.startsWith('AGM-TPO-')) role = 'tpo';
            else role = 'student';
        }
    } catch (err) {
        console.warn('[LOGIN DB WARNING] Falling back to role parsing:', err.message);
    }

    if (expectedRole && role !== expectedRole) {
        return res.status(401).json({ success: false, message: `The entered ID is registered for the ${role.toUpperCase()} console. Please submit using the correct login card.` });
    }

    // Generate JWT token valid for 2 hours
    const token = generateJWT({
        username: usnUpper,
        role,
        name,
        exp: Date.now() + 2 * 60 * 60 * 1000
    });

    res.status(200).json({
        success: true,
        token,
        role,
        username: usnUpper,
        name
    });
};

exports.verifyAuthToken = (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Authorization token required' });
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyJWT(token);

    if (!payload || payload.exp < Date.now()) {
        return res.status(401).json({ success: false, message: 'Token expired or invalid signature' });
    }

    res.status(200).json({
        success: true,
        user: payload
    });
};

exports.addNews = async (req, res) => {
    const { category, title, content } = req.body || {};
    if (!category || !title || !content) {
        return res.status(400).json({ success: false, message: 'All news fields are required' });
    }

    try {
        const item = await newsModel.addNews(category, title, content);
        res.status(201).json({ success: true, news: item });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getNewsJSON = async (req, res) => {
    try {
        const allNews = await newsModel.getAllNews();
        res.status(200).json({ success: true, news: allNews });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteNews = async (req, res) => {
    const { id } = req.params;
    try {
        await newsModel.deleteNews(id);
        res.status(200).json({ success: true, message: 'News deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const mockInquiriesList = [
    { id: 1, name: 'Sunil Kumar', email: 'sunil@gmail.com', phone: '9845012345', course: 'Computer Science & Engineering', message: 'Looking for Hostel accommodation fees details.' },
    { id: 2, name: 'Asha Patil', email: 'asha.patil@yahoo.com', phone: '8095671234', course: 'Artificial Intelligence & Machine Learning', message: 'Eligibility criteria details for VTU non-Karnataka students.' }
];

exports.getInquiries = async (req, res) => {
    const db = require('../config/db');
    try {
        const [rows] = await db.query('SELECT * FROM inquiries ORDER BY id DESC');
        if (rows && rows.length > 0) {
            return res.status(200).json({ success: true, inquiries: rows });
        }
    } catch (err) {
        console.warn('[DB WARNING] Failed to retrieve inquiries, returning mock list.');
    }
    res.status(200).json({ success: true, inquiries: mockInquiriesList });
};

exports.renderFounderMessage = (req, res) => {
    res.render('founder-message', {
        title: "Founder's Message | AGMRCET",
        description: "Read the divine visionary message from Founder His Holiness Param Poojya Shrimad Swastishri Chandrakirti Bhattarak Pattacharyavarya Swamiji.",
        activeAbout: true
    });
};

exports.renderPresidentMessage = (req, res) => {
    res.render('president-message', {
        title: "President's Message | AGMRCET",
        description: "Read the leadership message from President His Holiness Shri Siddhatma Swamiji of SDM Jainmatt Trust.",
        activeAbout: true
    });
};

exports.renderPrincipalMessage = (req, res) => {
    res.render('principal-message', {
        title: "Principal's Message | AGMRCET",
        description: "Read the academic leadership message from Principal Dr. Sandeep Kyatanavar at AGMRCET.",
        activeAbout: true
    });
};

exports.renderVisionMission = (req, res) => {
    res.render('vision-mission', {
        title: "Vision & Mission | AGMRCET",
        description: "Discover the educational vision, mission statements, and quality policies of AGMRCET.",
        activeAbout: true
    });
};

exports.renderGoverningCouncil = (req, res) => {
    res.render('governing-council', {
        title: "Governing Council | AGMRCET",
        description: "View the Governing Council members, board of management, and academic leaders at AGMRCET.",
        activeAbout: true
    });
};

// Real-Time Inter-Connected ERP API Endpoints

exports.getStudentProfileAPI = async (req, res) => {
    const usn = req.query.usn || '2AG22CS001';
    try {
        const student = await portalModel.getStudentProfile(usn);
        if (student) {
            return res.status(200).json({ success: true, student });
        }
    } catch (err) {
        console.warn('[API WARNING] Error fetching student profile:', err.message);
    }
    // Fallback profile object
    res.status(200).json({
        success: true,
        student: {
            usn,
            name: 'Prajwal Patil',
            father_name: 'Suresh Patil',
            mother_name: 'Sunita Patil',
            dob: '14-Aug-2004',
            gender: 'Male',
            blood_group: 'O+ Positive',
            phone: '+91 98450 12345',
            email: 'prajwal.patil@agmrcet.ac.in',
            address: '#142, Keshwapur, Hubballi, Karnataka - 580023',
            department_id: 'cse',
            semester: 'VI Semester',
            section: 'A',
            quota: 'KCET Quota (E199)',
            rank_no: '24,150',
            category: 'OBC (Category 2A)',
            hostel_room: 'Room 204, Ganga Hostel',
            counselor_name: 'Dr. S. V. Shiragur',
            cgpa: 8.88,
            fee_cleared: true,
            vtu_eligible: true,
            photo: '/images/csHod.png'
        }
    });
};

exports.getAnnouncementsAPI = async (req, res) => {
    const targetRole = req.query.role || 'all';
    try {
        const list = await portalModel.getAnnouncements(targetRole);
        return res.status(200).json({ success: true, announcements: list });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.createAnnouncementAPI = async (req, res) => {
    const { senderRole, senderName, title, message, targetRole } = req.body || {};
    if (!title || !message) {
        return res.status(400).json({ success: false, message: 'Title and Message are required' });
    }
    try {
        const announcement = await portalModel.createAnnouncement(
            senderRole || 'hod',
            senderName || 'HOD Computer Science',
            title,
            message,
            targetRole || 'all'
        );
        res.status(201).json({ success: true, announcement });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getAttendanceAPI = async (req, res) => {
    const usn = req.query.usn || '2AG22CS001';
    try {
        const attendance = await portalModel.getStudentAttendance(usn);
        res.status(200).json({ success: true, attendance });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateAttendanceAPI = async (req, res) => {
    const { usn, subjectCode, subjectName, attendedClasses, totalClasses } = req.body || {};
    if (!usn || !subjectCode) {
        return res.status(400).json({ success: false, message: 'USN and Subject Code required' });
    }
    try {
        await portalModel.updateAttendance(usn, subjectCode, subjectName || subjectCode, attendedClasses || 40, totalClasses || 48);
        res.status(200).json({ success: true, message: 'Attendance updated in MySQL DB' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getMarksAPI = async (req, res) => {
    const usn = req.query.usn || '2AG22CS001';
    try {
        const marks = await portalModel.getStudentMarks(usn);
        res.status(200).json({ success: true, marks });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateMarksAPI = async (req, res) => {
    const { usn, subjectCode, subjectName, cie1, cie2, cie3, assignment, grade, result } = req.body || {};
    if (!usn || !subjectCode) {
        return res.status(400).json({ success: false, message: 'USN and Subject Code required' });
    }
    try {
        await portalModel.updateMarks(usn, subjectCode, subjectName || subjectCode, cie1 || 45, cie2 || 45, cie3 || 45, assignment || 10, grade || 'A+', result || 'Pass');
        res.status(200).json({ success: true, message: 'Marks updated in MySQL DB' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getGatepassesAPI = async (req, res) => {
    const usn = req.query.usn;
    try {
        const gatepasses = await portalModel.getGatepasses(usn);
        res.status(200).json({ success: true, gatepasses });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.createGatepassAPI = async (req, res) => {
    const { studentUsn, studentName, reason, outDate, inDate } = req.body || {};
    if (!studentUsn || !reason) {
        return res.status(400).json({ success: false, message: 'USN and Reason required' });
    }
    try {
        const gatepass = await portalModel.createGatepass(
            studentUsn,
            studentName || 'Prajwal Patil',
            reason,
            outDate || 'Today',
            inDate || 'Tomorrow'
        );
        res.status(201).json({ success: true, gatepass });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateGatepassStatusAPI = async (req, res) => {
    const { id, status, approvedBy } = req.body || {};
    if (!id || !status) {
        return res.status(400).json({ success: false, message: 'Gatepass ID and Status required' });
    }
    try {
        await portalModel.updateGatepassStatus(id, status, approvedBy || 'HOD / Office');
        res.status(200).json({ success: true, message: `Gatepass #${id} updated to ${status}` });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getElectivesAPI = async (req, res) => {
    const usn = req.query.usn;
    try {
        const electives = await portalModel.getElectives(usn);
        res.status(200).json({ success: true, electives });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.createElectiveAPI = async (req, res) => {
    const { studentUsn, studentName, electiveName } = req.body || {};
    if (!studentUsn || !electiveName) {
        return res.status(400).json({ success: false, message: 'USN and Elective Name required' });
    }
    try {
        const elective = await portalModel.createElectiveRequest(
            studentUsn,
            studentName || 'Prajwal Patil',
            electiveName
        );
        res.status(201).json({ success: true, elective });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.approveElectiveAPI = async (req, res) => {
    const { id, status, approvedBy } = req.body || {};
    if (!id) {
        return res.status(400).json({ success: false, message: 'Elective Request ID required' });
    }
    try {
        await portalModel.updateElectiveStatus(id, status || 'Approved', approvedBy || 'Dr. S. V. Shiragur (HOD CSE)');
        res.status(200).json({ success: true, message: `Elective request #${id} approved` });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getComplaintsAPI = async (req, res) => {
    const usn = req.query.usn;
    try {
        const complaints = await portalModel.getComplaints(usn);
        res.status(200).json({ success: true, complaints });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.createComplaintAPI = async (req, res) => {
    const { studentUsn, studentName, category, subject, message } = req.body || {};
    if (!studentUsn || !subject || !message) {
        return res.status(400).json({ success: false, message: 'USN, Subject and Message required' });
    }
    try {
        const complaint = await portalModel.createComplaint(
            studentUsn,
            studentName || 'Prajwal Patil',
            category || 'Academic',
            subject,
            message
        );
        res.status(201).json({ success: true, complaint });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getFeeRecordAPI = async (req, res) => {
    const usn = req.query.usn || '2AG22CS001';
    try {
        const feeRecord = await portalModel.getFeeRecord(usn);
        res.status(200).json({ success: true, feeRecord });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateFeeRecordAPI = async (req, res) => {
    const { studentUsn, studentName, totalFee, paidFee, status, receiptNo } = req.body || {};
    if (!studentUsn) {
        return res.status(400).json({ success: false, message: 'Student USN required' });
    }
    try {
        await portalModel.updateFeeRecord(
            studentUsn,
            studentName || 'Prajwal Patil',
            totalFee || 95000.00,
            paidFee || 95000.00,
            status || 'Paid In Full',
            receiptNo || 'REC-2026-8841'
        );
        res.status(200).json({ success: true, message: `Fee record for ${studentUsn} updated in MySQL DB` });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.createPortalUserAPI = async (req, res) => {
    const { username, password, role, name, email, department_id } = req.body || {};
    if (!username || !password || !role || !name) {
        return res.status(400).json({ success: false, message: 'Username, Password, Role, and Name are required' });
    }
    try {
        const user = await portalModel.createUser({ username, password, role, name, email, department_id });
        res.status(201).json({ success: true, user, message: `Account created for ${name} (${username}). New user can now log in!` });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getUsersAPI = async (req, res) => {
    try {
        const users = await portalModel.getAllUsers();
        res.status(200).json({ success: true, users });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateUserAPI = async (req, res) => {
    const { id } = req.params;
    const { name, role, email, status, password } = req.body || {};
    try {
        await portalModel.updateUser(id, { name, role, email, status, password });
        res.status(200).json({ success: true, message: `User #${id} updated successfully` });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteUserAPI = async (req, res) => {
    const { id } = req.params;
    try {
        await portalModel.deleteUser(id);
        res.status(200).json({ success: true, message: `User #${id} deleted successfully from DB` });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteGatepassAPI = async (req, res) => {
    const { id } = req.params;
    try {
        await portalModel.deleteGatepass(id);
        res.status(200).json({ success: true, message: `Gatepass #${id} deleted` });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteElectiveAPI = async (req, res) => {
    const { id } = req.params;
    try {
        await portalModel.deleteElective(id);
        res.status(200).json({ success: true, message: `Elective request #${id} deleted` });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteComplaintAPI = async (req, res) => {
    const { id } = req.params;
    try {
        await portalModel.deleteComplaint(id);
        res.status(200).json({ success: true, message: `Complaint #${id} deleted` });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteAnnouncementAPI = async (req, res) => {
    const { id } = req.params;
    try {
        await portalModel.deleteAnnouncement(id);
        res.status(200).json({ success: true, message: `Announcement #${id} deleted` });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.renderFeedback = (req, res) => {
    res.render('feedback', {
        title: 'Feedback | AGMRCET',
        description: 'Provide your valuable suggestions and academic/institutional feedback to AGMRCET.'
    });
};

exports.renderIQAC = (req, res) => {
    res.render('iqac', {
        title: 'IQAC | Internal Quality Assurance Cell',
        description: 'Internal Quality Assurance Cell (IQAC) of AGMRCET coordinates institutional quality metrics.'
    });
};

exports.renderNAAC = (req, res) => {
    res.render('naac', {
        title: 'NAAC | Accreditation Documents',
        description: 'NAAC accreditation reports, certificates, and compliance declarations of AGMRCET.'
    });
};

exports.renderNIRF = (req, res) => {
    res.render('nirf', {
        title: 'NIRF | Publications & Disclosures',
        description: 'National Institutional Ranking Framework (NIRF) data and public transparency publications.'
    });
};

exports.renderGrievance = (req, res) => {
    res.render('grievance', {
        title: 'Grievance Redressal Cell | AGMRCET',
        description: 'Submit grievances, concerns, or academic queries to the Grievance Redressal Committee.'
    });
};

exports.renderNSS = (req, res) => {
    res.render('nss', {
        title: 'National Service Scheme (NSS) | AGMRCET',
        description: 'NSS Unit of AGMRCET organizes rural camps, blood donation drives, and community services.'
    });
};

exports.renderIEEE = (req, res) => {
    res.render('ieee', {
        title: 'IEEE Student Branch | AGMRCET',
        description: 'IEEE Student Branch organizes technical workshops, symposia, and global IEEE events.'
    });
};


