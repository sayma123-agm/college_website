const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Create connection pool configuration using environment variables
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '0000',
    database: process.env.DB_NAME || 'agmrcet_db',
    waitForConnections: true,
    connectionLimit: 150,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Export pool immediately to prevent empty/partial export issues with circular dependency imports
module.exports = pool;

// Initialize database (create DB and tables/seed if they don't exist)
async function initializeDatabase() {
    const DB_NAME = dbConfig.database;
    
    // 1. Initial connection without database select to verify server status and create DB
    let adminConnection;
    try {
        adminConnection = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password
        });
    } catch (err) {
        throw new Error(`MySQL server connection failed: ${err.message}`);
    }

    await adminConnection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    await adminConnection.end();

    // 2. Connect to the database to check if tables exist
    const connection = await mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: DB_NAME,
        multipleStatements: true
    });

    try {
        // Check if departments table exists
        const [tables] = await connection.query(`SHOW TABLES LIKE 'departments'`);
        if (tables.length === 0) {
            console.log(`[DB INFO] Database "${DB_NAME}" is empty or uninitialized. Initializing schema...`);
            
            // Read and execute database.sql table creators
            const sqlPath = path.join(__dirname, '../../databases/database.sql');
            const sqlContent = fs.readFileSync(sqlPath, 'utf8');
            await connection.query(sqlContent);
            console.log('[DB INFO] Tables initialized successfully.');

            // Dynamically import models to seed default data
            const departmentModel = require('../models/departmentModel');
            const facultyModel = require('../models/facultyModel');
            const newsModel = require('../models/newsModel');

            // Seed Departments
            const departmentsData = departmentModel.departmentsData;
            const deptKeys = Object.keys(departmentsData);
            console.log(`[DB INFO] Seeding ${deptKeys.length} Departments...`);
            for (const key of deptKeys) {
                const dept = departmentsData[key];
                await connection.query(
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

                for (const lab of dept.labs) {
                    await connection.query(
                        'INSERT INTO department_labs (department_id, name, description) VALUES (?, ?, ?)',
                        [dept.id, lab.name, lab.description]
                    );
                }

                for (const ach of dept.achievements) {
                    await connection.query(
                        'INSERT INTO department_achievements (department_id, title, details) VALUES (?, ?, ?)',
                        [dept.id, ach.title, ach.details]
                    );
                }

                for (const proj of dept.research.projects) {
                    await connection.query(
                        'INSERT INTO department_projects (department_id, title, funding, amount) VALUES (?, ?, ?, ?)',
                        [dept.id, proj.title, proj.funding, proj.amount]
                    );
                }
            }

            // Seed Faculty
            const facultyData = await facultyModel.getAllFaculty();
            console.log(`[DB INFO] Seeding ${facultyData.length} Faculty Profiles...`);
            for (const fac of facultyData) {
                await connection.query(
                    `INSERT INTO faculty (
                        name, designation, qualification, experience, researchArea, email, image, department_id
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        fac.name, fac.designation, fac.qualification, fac.experience, fac.researchArea, fac.email, fac.image, fac.department
                    ]
                );
            }

            // Seed News
            const newsData = await newsModel.getAllNews();
            console.log(`[DB INFO] Seeding ${newsData.length} News items...`);
            for (const item of newsData) {
                await connection.query(
                    'INSERT INTO news (category, date, title, content) VALUES (?, ?, ?, ?)',
                    [item.category, item.date, item.title, item.content]
                );
            }
            console.log('[DB INFO] Seeding completed successfully!');
        }
    } finally {
        await connection.end();
    }
}

// Run initialization before testing pool connection
initializeDatabase()
    .then(() => pool.getConnection())
    .then(connection => {
        console.log('Database Connected Successfully! Node is running on active MySQL instance.');
        connection.release();
    })
    .catch(err => {
        console.warn('Database Connection Failed! Fallback mock data arrays will be used in development.');
        console.warn('Reason:', err.message);
    });

