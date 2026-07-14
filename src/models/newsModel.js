const db = require('../config/db');
const newsData = [
    {
        id: 1,
        title: 'Admissions Open for academic year 2026-27',
        category: 'admissions',
        date: '2026-07-10',
        content: 'Applications are invited for admissions into B.E., MBA, and MCA courses for the academic year 2026-27. Candidates can submit inquiries online or visit the campus.',
        isImportant: true
    },
    {
        id: 2,
        title: 'AGMRCET Placements 2025 crosses 90% Milestone',
        category: 'placement',
        date: '2026-06-28',
        content: 'Over 120 students placed in top recruiting companies like Capgemini, TCS, Wipro, and Infosys. Highest package secured is 12 LPA for Computer Science & Engineering department.',
        isImportant: true
    },
    {
        id: 3,
        title: 'Annual Tech Fest "Agratha 2026" Scheduled in August',
        category: 'event',
        date: '2026-07-05',
        content: 'Our flagship college national-level event, Agratha 2026, is scheduled from August 12 to 14. Registration for technical papers, hackathons, and sports tournaments begins next week.',
        isImportant: false
    },
    {
        id: 4,
        title: 'VTU Semester End Exam Timetable Released',
        category: 'circular',
        date: '2026-07-12',
        content: 'The official timetable for VTU Even Semester examinations (July-August 2026) has been updated in the portal. Students can download the schedules in the portal section.',
        isImportant: true
    },
    {
        id: 5,
        title: 'Research Project Grant approved by KSCST for ECE Department',
        category: 'achievement',
        date: '2026-07-01',
        content: 'Karnataka State Council for Science and Technology (KSCST) has approved a funding grant of Rs. 45,000 for the project "Landslide and Flash-Flood Warning Network using LoRa technology" submitted by ECE students under Dr. Santosh R. P.',
        isImportant: false
    },
    {
        id: 6,
        title: 'Academic Calendar for Odd Semester 2026-27 Announced',
        category: 'circular',
        date: '2026-07-08',
        content: 'Classes for the odd semester (III, V, VII Sem B.E.) will resume from September 1, 2026. The full academic calendar is available for download in PDF format on the student portal.',
        isImportant: false
    }
];

module.exports = {
    getAllNews: async () => {
        try {
            const [rows] = await db.query('SELECT * FROM news ORDER BY id DESC');
            if (rows.length > 0) return rows;
        } catch (err) {
            console.warn('[DB WARNING] Failed to fetch news bulletins, using mock fallback.');
        }
        return newsData;
    },
    getImportantNews: async () => {
        try {
            const [rows] = await db.query('SELECT * FROM news ORDER BY id DESC LIMIT 4');
            if (rows.length > 0) return rows;
        } catch (err) {
            console.warn('[DB WARNING] Failed to fetch important news bulletins, using mock fallback.');
        }
        return newsData.filter(item => item.isImportant);
    },
    getNewsByCategory: async (cat) => {
        const catId = cat.toLowerCase();
        try {
            const [rows] = await db.query('SELECT * FROM news WHERE LOWER(category) = ? ORDER BY id DESC', [catId]);
            if (rows.length > 0) return rows;
        } catch (err) {
            console.warn(`[DB WARNING] Failed to fetch news for category "${catId}", using mock fallback.`);
        }
        return newsData.filter(item => item.category.toLowerCase() === catId);
    }
};
