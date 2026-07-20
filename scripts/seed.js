// Database Seeding Script for AGMRCET
// Populates all tables with rich mock data matching the application models.
require('dotenv').config();
const db = require('../src/config/db');

// Import model structures
const { departmentsData } = require('../src/models/departmentModel');

const mockFaculty = [
    { name: 'Dr. S. V. Shiragur', designation: 'Professor & Head', qualification: 'Ph.D in CSE', experience: '18 Years', researchArea: 'Wireless Networks & Distributed Systems', email: 'hod.cse@agmrcet.ac.in', image: '/images/csHod.png', department_id: 'cse' },
    { name: 'Prof. Ramesh G. B.', designation: 'Assistant Professor', qualification: 'M.Tech in CSE', experience: '12 Years', researchArea: 'Data Mining & Big Data Analytics', email: 'ramesh.gb@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80', department_id: 'cse' },
    { name: 'Prof. Geeta Patil', designation: 'Assistant Professor', qualification: 'M.Tech in Software Engineering', experience: '8 Years', researchArea: 'Internet of Things (IoT)', email: 'geeta.patil@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80', department_id: 'cse' },
    { name: 'Dr. Mahesh M. G.', designation: 'Professor & Head', qualification: 'Ph.D in Machine Learning', experience: '15 Years', researchArea: 'Deep Learning & Natural Language Processing', email: 'hod.aiml@agmrcet.ac.in', image: '/images/aimlhod.png', department_id: 'cse-aiml' },
    { name: 'Prof. Vinayak Hullur', designation: 'Assistant Professor', qualification: 'M.Tech in AI', experience: '7 Years', researchArea: 'Computer Vision & Reinforcement Learning', email: 'vinayak.h@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', department_id: 'cse-aiml' },
    { name: 'Prof. Shruti Patil', designation: 'Assistant Professor & Head', qualification: 'M.Tech in CSE', experience: '10 Years', researchArea: 'Human Computer Interaction, UI/UX Design', email: 'hod.csd@agmrcet.ac.in', image: '/images/csdHod.png', department_id: 'csd' },
    { name: 'Prof. Anand Shettar', designation: 'Assistant Professor', qualification: 'M.Des (IIT-B), M.Tech', experience: '6 Years', researchArea: 'Web Technologies & Creative Interaction Design', email: 'anand.s@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80', department_id: 'csd' },
    { name: 'Dr. Santosh R. P.', designation: 'Professor & Head', qualification: 'Ph.D in VLSI Design', experience: '17 Years', researchArea: 'Micro-electronics & VLSI Signal Processing', email: 'hod.ece@agmrcet.ac.in', image: '/images/ecHod.png', department_id: 'ece' },
    { name: 'Prof. Savitha M.', designation: 'Associate Professor', qualification: 'M.Tech in Digital Communication', experience: '11 Years', researchArea: 'Antenna Design & Wireless Transceivers', email: 'savitha.m@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80', department_id: 'ece' },
    { name: 'Prof. Kiran K.', designation: 'Associate Professor & Head', qualification: 'M.Tech, (Ph.D)', experience: '12 Years', researchArea: 'Electric Vehicle Powertrains & Battery Tech', email: 'hod.eee@agmrcet.ac.in', image: '/images/eeHod.png', department_id: 'eee' },
    { name: 'Prof. Jagadish P.', designation: 'Assistant Professor', qualification: 'M.Tech in Power Systems', experience: '9 Years', researchArea: 'Smart Grids & Renewable Micro-grids', email: 'jagadish.p@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80', department_id: 'eee' },
    { name: 'Dr. G. B. Patil', designation: 'Professor & Head', qualification: 'Ph.D in Thermal Eng.', experience: '20 Years', researchArea: 'Fluid Dynamics & Non-Conventional Bio-Fuels', email: 'hod.me@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=300&q=80', department_id: 'me' },
    { name: 'Prof. Shivanand S.', designation: 'Assistant Professor', qualification: 'M.Tech in Machine Design', experience: '11 Years', researchArea: 'CAD/CAM Analysis, Finite Element Methods', email: 'shivanand.s@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80', department_id: 'me' },
    { name: 'Prof. S. R. Patil', designation: 'Associate Professor & Head', qualification: 'M.Tech in Structural Engineering', experience: '14 Years', researchArea: 'Sustainable Construction Materials & Earthquake Eng.', email: 'hod.civil@agmrcet.ac.in', image: '/images/Civilhod.png', department_id: 'ce' },
    { name: 'Prof. Ravi Kulkarni', designation: 'Assistant Professor', qualification: 'M.Tech in Geotechnical Eng.', experience: '8 Years', researchArea: 'Soil Mechanics & Foundation Engineering', email: 'ravi.k@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80', department_id: 'ce' },
    { name: 'Dr. Vinay Kumar', designation: 'Professor & Head', qualification: 'Ph.D in Management', experience: '16 Years', researchArea: 'Financial Inclusion & Rural Consumer Behavior', email: 'hod.mba@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80', department_id: 'mba' },
    { name: 'Dr. Laxmi Joshi', designation: 'Associate Professor', qualification: 'Ph.D in HR Management', experience: '12 Years', researchArea: 'Organizational Behavior & Corporate Training', email: 'laxmi.j@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80', department_id: 'mba' },
    { name: 'Dr. Preeti Patil', designation: 'Associate Professor & Head', qualification: 'Ph.D in Computer Applications', experience: '13 Years', researchArea: 'Software Architectures & Cloud Computing', email: 'hod.mca@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80', department_id: 'mca' },
    { name: 'Prof. Satish G.', designation: 'Assistant Professor', qualification: 'MCA, M.Tech in CSE', experience: '10 Years', researchArea: 'Mobile App Development, Web Services', email: 'satish.g@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80', department_id: 'mca' }
];

const mockNews = [
    { category: 'admissions', date: '2026-07-10', title: 'Admissions Open for academic year 2026-27', content: 'Applications are invited for admissions into B.E., MBA, and MCA courses for the academic year 2026-27. Candidates can submit inquiries online or visit the campus.' },
    { category: 'placement', date: '2026-06-28', title: 'AGMRCET Placements 2025 crosses 90% Milestone', content: 'Over 120 students placed in top recruiting companies like Capgemini, TCS, Wipro, and Infosys. Highest package secured is 12 LPA for Computer Science & Engineering department.' },
    { category: 'event', date: '2026-07-05', title: 'Annual Tech Fest "Agratha 2026" Scheduled in August', content: 'Our flagship college national-level event, Agratha 2026, is scheduled from August 12 to 14. Registration for technical papers, hackathons, and sports tournaments begins next week.' },
    { category: 'circular', date: '2026-07-12', title: 'VTU Semester End Exam Timetable Released', content: 'The official timetable for VTU Even Semester examinations (July-August 2026) has been updated in the portal. Students can download the schedules in the portal section.' }
];

async function seed() {
    console.log('--- STARTING DATABASE SEED PROCESS ---');
    try {
        // 1. Clear existing tables (disable foreign key checks momentarily)
        await db.query('SET FOREIGN_KEY_CHECKS = 0');
        await db.query('TRUNCATE TABLE department_labs');
        await db.query('TRUNCATE TABLE department_achievements');
        await db.query('TRUNCATE TABLE department_projects');
        await db.query('TRUNCATE TABLE faculty');
        await db.query('TRUNCATE TABLE departments');
        await db.query('TRUNCATE TABLE news');
        await db.query('SET FOREIGN_KEY_CHECKS = 1');
        console.log('1. Cleared existing tables.');

        // 2. Insert Departments
        for (const key in departmentsData) {
            const dept = departmentsData[key];
            await db.query(
                `INSERT INTO departments (
                    id, name, shortName, established, intake, duration,
                    hodName, hodDesignation, hodQualification, hodExperience, hodMessage, hodPhoto,
                    statsFaculty, statsLabs, statsPlacementRate, statsAvgPackage,
                    placementHighestPackage, placementRecentOffers,
                    researchAreas, topRecruiters
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    dept.id, dept.name, dept.shortName, dept.established, dept.intake, dept.duration,
                    dept.hod.name, dept.hod.designation, dept.hod.qualification, dept.hod.experience, dept.hod.message, dept.hod.photo,
                    dept.stats.faculty, dept.stats.labs, dept.stats.placementRate, dept.stats.avgPackage,
                    dept.placements.highestPackage, dept.placements.recentOffers,
                    JSON.stringify(dept.research.areas), JSON.stringify(dept.placements.topRecruiters)
                ]
            );

            // 3. Insert Labs
            for (const lab of dept.labs) {
                await db.query(
                    'INSERT INTO department_labs (department_id, name, description) VALUES (?, ?, ?)',
                    [dept.id, lab.name, lab.description]
                );
            }

            // 4. Insert Achievements
            for (const ach of dept.achievements) {
                await db.query(
                    'INSERT INTO department_achievements (department_id, title, details) VALUES (?, ?, ?)',
                    [dept.id, ach.title, ach.details]
                );
            }

            // 5. Insert Projects
            for (const proj of dept.research.projects) {
                await db.query(
                    'INSERT INTO department_projects (department_id, title, funding, amount) VALUES (?, ?, ?, ?)',
                    [dept.id, proj.title, proj.funding, proj.amount]
                );
            }
        }
        console.log('2. Seeded departments, labs, achievements, and projects successfully.');

        // 6. Insert Faculty
        for (const fac of mockFaculty) {
            await db.query(
                `INSERT INTO faculty (name, designation, qualification, experience, researchArea, email, image, department_id)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    fac.name, fac.designation, fac.qualification, fac.experience,
                    fac.researchArea, fac.email, fac.image, fac.department_id
                ]
            );
        }
        console.log('3. Seeded faculty directory successfully.');

        // 7. Insert News Announcements
        for (const bulletin of mockNews) {
            await db.query(
                'INSERT INTO news (category, date, title, content) VALUES (?, ?, ?, ?)',
                [bulletin.category, bulletin.date, bulletin.title, bulletin.content]
            );
        }
        console.log('4. Seeded news announcements bulletins.');

        console.log('--- DATABASE SEEDING COMPLETED SUCCESSFULLY ---');
        process.exit(0);
    } catch (err) {
        console.error('--- SEEDING FAILED WITH ERROR ---');
        console.error(err);
        process.exit(1);
    }
}

seed();
