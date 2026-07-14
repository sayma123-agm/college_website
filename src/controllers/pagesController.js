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
