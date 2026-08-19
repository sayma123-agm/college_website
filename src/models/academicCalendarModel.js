const db = require('../config/db');

// In-memory initial data for Academic Calendar events (daily updateable model)
let academicEventsData = [
    {
        id: 1,
        title: 'Commencement of Classes - B.E. ODD Semesters (3rd, 5th, 7th Sem)',
        category: 'Classes',
        targetAudience: 'UG Engineering',
        startDate: '2026-09-01',
        endDate: '2026-09-01',
        status: 'Upcoming',
        description: 'First working day and orientation for 2nd, 3rd, and 4th year B.E. students according to VTU notifications.',
        document: '/docs/coe.pdf'
    },
    {
        id: 2,
        title: 'First Internal Assessment (IA-1) Examination',
        category: 'IA Test',
        targetAudience: 'All B.E. & MBA/MCA',
        startDate: '2026-10-15',
        endDate: '2026-10-17',
        status: 'Scheduled',
        description: 'First internal assessment test for all undergraduate and postgraduate courses.',
        document: ''
    },
    {
        id: 3,
        title: 'Kannada Rajyotsava Holiday',
        category: 'Holiday',
        targetAudience: 'General',
        startDate: '2026-11-01',
        endDate: '2026-11-01',
        status: 'Holiday',
        description: 'General holiday on account of Karnataka Rajyotsava.',
        document: ''
    },
    {
        id: 4,
        title: 'Second Internal Assessment (IA-2) & Lab Evaluations',
        category: 'IA Test',
        targetAudience: 'All B.E.',
        startDate: '2026-11-20',
        endDate: '2026-11-23',
        status: 'Scheduled',
        description: 'Second internal assessment test and practical project lab submissions.',
        document: ''
    },
    {
        id: 5,
        title: 'VTU Practical Examinations & Viva-Voce',
        category: 'Examinations',
        targetAudience: 'UG & PG',
        startDate: '2026-12-10',
        endDate: '2026-12-18',
        status: 'Scheduled',
        description: 'University practical lab examinations conducted with external examiners.',
        document: '/docs/SEE.pdf'
    },
    {
        id: 6,
        title: 'VTU Semester End Theory Examinations (SEE)',
        category: 'Examinations',
        targetAudience: 'UG & PG',
        startDate: '2026-12-22',
        endDate: '2027-01-15',
        status: 'Scheduled',
        description: 'VTU Theory Examinations for ODD Semester courses.',
        document: '/docs/SEE.pdf'
    }
];

let isTableInitialized = false;

async function initCalendarTable() {
    if (isTableInitialized) return;
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS academic_calendar (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                category VARCHAR(100) NOT NULL,
                targetAudience VARCHAR(100) DEFAULT 'All Students',
                startDate VARCHAR(50) NOT NULL,
                endDate VARCHAR(50) NOT NULL,
                status VARCHAR(50) DEFAULT 'Scheduled',
                description TEXT,
                document VARCHAR(255) DEFAULT '',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        const [rows] = await db.query('SELECT COUNT(*) as cnt FROM academic_calendar');
        if (rows && rows[0] && rows[0].cnt === 0) {
            for (const ev of academicEventsData) {
                await db.query(
                    'INSERT INTO academic_calendar (title, category, targetAudience, startDate, endDate, status, description, document) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [ev.title, ev.category, ev.targetAudience, ev.startDate, ev.endDate, ev.status, ev.description, ev.document]
                );
            }
        }
        isTableInitialized = true;
    } catch (err) {
        // Fallback to in-memory array if db query fails
    }
}

// Auto init on boot
initCalendarTable().catch(() => {});

module.exports = {
    getAllEvents: async () => {
        try {
            await initCalendarTable();
            const [rows] = await db.query('SELECT * FROM academic_calendar ORDER BY startDate ASC');
            if (rows && rows.length > 0) return rows;
        } catch (err) {
            // Database offline/serverless fallback
        }
        return academicEventsData;
    },
    addEvent: async (eventData) => {
        const newId = Date.now();
        const newEvent = {
            id: newId,
            title: eventData.title || '',
            category: eventData.category || 'IA Test',
            targetAudience: eventData.targetAudience || 'All Students',
            startDate: eventData.startDate || new Date().toISOString().slice(0, 10),
            endDate: eventData.endDate || eventData.startDate || new Date().toISOString().slice(0, 10),
            status: eventData.status || 'Scheduled',
            description: eventData.description || '',
            document: eventData.document || ''
        };
        try {
            await initCalendarTable();
            const [result] = await db.query(
                'INSERT INTO academic_calendar (title, category, targetAudience, startDate, endDate, status, description, document) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [newEvent.title, newEvent.category, newEvent.targetAudience, newEvent.startDate, newEvent.endDate, newEvent.status, newEvent.description, newEvent.document]
            );
            if (result && result.insertId) {
                newEvent.id = result.insertId;
            }
        } catch (e) {
            academicEventsData.push(newEvent);
        }
        return newEvent;
    },
    deleteEvent: async (id) => {
        try {
            await initCalendarTable();
            await db.query('DELETE FROM academic_calendar WHERE id = ?', [id]);
        } catch (e) {
            academicEventsData = academicEventsData.filter(item => item.id != id);
        }
        return true;
    }
};
