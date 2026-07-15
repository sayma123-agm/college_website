require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

// Import existing models data to migrate
const departmentModel = require('../src/models/departmentModel');
const facultyModel = require('../src/models/facultyModel');
const newsModel = require('../src/models/newsModel');

const DB_NAME = process.env.DB_NAME || 'agmrcet_db';

async function seed() {
    console.log('Starting Database Migration & Seeding...');
    
    // 1. Initial connection without database select to verify server status and create DB
    let adminConnection;
    try {
        adminConnection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '0000'
        });
    } catch (err) {
        console.warn('\n[MIGRATION NOTICE] MySQL server is not running or credentials in .env failed.');
        console.warn('The application will run in development mode using the local mock data layers.');
        console.warn(`Error detail: ${err.message}\n`);
        process.exit(0);
    }

    console.log(`Connecting to MySQL server at ${process.env.DB_HOST || 'localhost'}...`);
    await adminConnection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME};`);
    console.log(`Database "${DB_NAME}" confirmed.`);
    await adminConnection.end();

    // 2. Open active connection pool to the database
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '0000',
        database: DB_NAME,
        multipleStatements: true
    });

    // 3. Read and execute database.sql table creators
    const sqlPath = path.join(__dirname, 'database.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('Initializing database tables...');
    await connection.query(sqlContent);
    console.log('Tables initialized successfully.');

    // 4. Seed Departments & associated child records (labs, achievements, projects)
    const departmentsData = departmentModel.departmentsData;
    const deptKeys = Object.keys(departmentsData);

    // Check if departments are already seeded
    const [existingDepts] = await connection.query('SELECT id FROM departments');
    if (existingDepts.length === 0) {
        console.log(`Seeding ${deptKeys.length} Departments...`);
        for (const key of deptKeys) {
            const dept = departmentsData[key];
            
            // Insert department row
            await connection.query(
                `INSERT INTO departments (
                    id, name, shortName, established, intake, duration, 
                    hodName, hodDesignation, hodQualification, hodExperience, hodMessage, hodPhoto,
                    statsFaculty, statsLabs, statsPlacementRate, statsAvgPackage,
                    placementHighestPackage, placementRecentOffers,
                    researchAreas, topRecruiters
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    dept.id,
                    dept.name,
                    dept.shortName,
                    dept.established,
                    dept.intake,
                    dept.duration,
                    dept.hod.name,
                    dept.hod.designation,
                    dept.hod.qualification,
                    dept.hod.experience,
                    dept.hod.message,
                    dept.hod.photo,
                    dept.stats.faculty,
                    dept.stats.labs,
                    dept.stats.placementRate,
                    dept.stats.avgPackage,
                    dept.placements.highestPackage,
                    dept.placements.recentOffers,
                    JSON.stringify(dept.research.areas),
                    JSON.stringify(dept.placements.topRecruiters)
                ]
            );

            // Insert associated labs
            for (const lab of dept.labs) {
                await connection.query(
                    'INSERT INTO department_labs (department_id, name, description) VALUES (?, ?, ?)',
                    [dept.id, lab.name, lab.description]
                );
            }

            // Insert associated achievements
            for (const ach of dept.achievements) {
                await connection.query(
                    'INSERT INTO department_achievements (department_id, title, details) VALUES (?, ?, ?)',
                    [dept.id, ach.title, ach.details]
                );
            }

            // Insert associated projects
            for (const proj of dept.research.projects) {
                await connection.query(
                    'INSERT INTO department_projects (department_id, title, funding, amount) VALUES (?, ?, ?, ?)',
                    [dept.id, proj.title, proj.funding, proj.amount]
                );
            }
        }
        console.log('Departments seeded.');
    } else {
        console.log('Departments already seeded. Skipping.');
    }

    // 5. Seed Faculty Directory
    const facultyData = await facultyModel.getAllFaculty();
    const [existingFaculty] = await connection.query('SELECT id FROM faculty');
    if (existingFaculty.length === 0) {
        console.log(`Seeding ${facultyData.length} Faculty Profiles...`);
        for (const fac of facultyData) {
            await connection.query(
                `INSERT INTO faculty (
                    name, designation, qualification, experience, researchArea, email, image, department_id
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    fac.name,
                    fac.designation,
                    fac.qualification,
                    fac.experience,
                    fac.researchArea,
                    fac.email,
                    fac.image,
                    fac.department
                ]
            );
        }
        console.log('Faculty directory seeded.');
    } else {
        console.log('Faculty already seeded. Skipping.');
    }

    // 6. Seed News Bulletins
    const newsData = await newsModel.getAllNews();
    const [existingNews] = await connection.query('SELECT id FROM news');
    if (existingNews.length === 0) {
        console.log(`Seeding ${newsData.length} News items...`);
        for (const item of newsData) {
            await connection.query(
                'INSERT INTO news (category, date, title, content) VALUES (?, ?, ?, ?)',
                [item.category, item.date, item.title, item.content]
            );
        }
        console.log('News bulletins seeded.');
    } else {
        console.log('News items already seeded. Skipping.');
    }

    // 7. Seed Default Users for ERP Portal
    const [existingUsers] = await connection.query('SELECT id FROM users');
    if (existingUsers.length === 0) {
        const defaultUsers = [
            { username: 'AGM-ADMIN-999', password: 'password', role: 'admin', name: 'System Admin Coordinator' },
            { username: '2AG22CS001', password: 'password', role: 'student', name: 'Prajwal Patil (CSE-VI Sem)' },
            { username: 'AGM-FAC-101', password: 'password', role: 'faculty', name: 'Dr. S. V. Shiragur (Professor & HOD)' },
            { username: 'AGM-PRIN-001', password: 'password', role: 'principal', name: 'Dr. Principal (Administration Chief)' },
            { username: '2AG22CS001-P', password: 'password', role: 'parent', name: 'Suresh Patil (Father of Prajwal)' },
            { username: 'AGM-FEE-201', password: 'password', role: 'fee', name: 'Accounts & Fee Clearance Desk' },
            { username: 'AGM-BROADCAST-888', password: 'password', role: 'broadcast', name: 'Broadcasting & Emergency Communications' }
        ];
        console.log(`Seeding ${defaultUsers.length} Default ERP User Accounts...`);
        for (const user of defaultUsers) {
            await connection.query(
                'INSERT INTO users (username, password, role, name) VALUES (?, ?, ?, ?)',
                [user.username, user.password, user.role, user.name]
            );
        }
        console.log('Default users seeded.');
    } else {
        console.log('User accounts already seeded. Skipping.');
    }

    await connection.end();
    console.log('Database Migration & Seeding completed successfully!');
}

seed().catch(err => {
    console.error('Error during migration seeder execution:', err);
    process.exit(1);
});
