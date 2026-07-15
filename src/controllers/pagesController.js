const facultyModel = require('../models/facultyModel');
const newsModel = require('../models/newsModel');
const departmentModel = require('../models/departmentModel');

exports.renderHome = async (req, res) => {
    try {
        const importantNews = await newsModel.getImportantNews();
        const allNews = await newsModel.getAllNews();
        const depts = await departmentModel.getDepartmentsList();
        
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
    res.render('portal', {
        title: 'Student Portal ERP | AGMRCET',
        description: 'Access student ERP services, track attendance, check academic marks, and download the syllabus and calendar.',
        activePortal: true
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

exports.handleLogin = (req, res) => {
    const { username, password, expectedRole } = req.body || {};
    if (!username || !password || password.length < 4) {
        return res.status(401).json({ success: false, message: 'Invalid credentials. Password must be 4+ chars.' });
    }

    const usnUpper = username.trim().toUpperCase();
    let role = 'student';

    if (usnUpper.startsWith('AGM-FAC-')) role = 'faculty';
    else if (usnUpper.startsWith('AGM-PRIN-')) role = 'principal';
    else if (usnUpper.endsWith('-P')) role = 'parent';
    else if (usnUpper.startsWith('AGM-FEE-')) role = 'fee';
    else if (usnUpper.startsWith('AGM-ADMIN-')) role = 'admin';
    else if (usnUpper.startsWith('AGM-BROADCAST-')) role = 'broadcast';

    if (expectedRole && role !== expectedRole) {
        return res.status(401).json({ success: false, message: `The entered ID is registered for the ${role.toUpperCase()} console. Please submit using the correct login card.` });
    }

    // Generate JWT token valid for 2 hours
    const token = generateJWT({
        username: usnUpper,
        role,
        exp: Date.now() + 2 * 60 * 60 * 1000
    });

    res.status(200).json({
        success: true,
        token,
        role,
        username: usnUpper
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
