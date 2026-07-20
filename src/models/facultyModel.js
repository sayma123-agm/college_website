const db = require('../config/db');
const facultyData = [
    // CSE Faculty
    { name: 'Dr. Tabasum Guledgudd', department: 'cse', designation: 'HOD & Associate Professor', qualification: 'B.E M.Tech Ph.D', experience: '15 Years', researchArea: 'AI & Data Science', email: 'hod.cse@agmrcet.ac.in', image: '/images/csHod.png' },
    { name: 'Dr. Surekha Pinapati', department: 'cse', designation: 'Associate Professor', qualification: 'B.E M.Tech Ph.D', experience: '18 Years', researchArea: 'Database Systems & Analytics', email: 'surekha.p@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' },
    { name: 'Dr. Chandru Jathar', department: 'cse', designation: 'Associate Professor', qualification: 'B.E M.Tech Ph.D', experience: '16 Years', researchArea: 'Machine Learning', email: 'chandru.j@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80' },
    { name: 'Dr. Preeti Sawant', department: 'cse', designation: 'Associate Professor', qualification: 'B.E M.Tech Ph.D', experience: '16 Years', researchArea: 'Cloud Computing & Distributed Systems', email: 'preeti.s@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80' },
    { name: 'Dr. Ramachandra Ballary', department: 'cse', designation: 'Associate Professor', qualification: 'B.E M.Tech Ph.D', experience: '18 Years', researchArea: 'Network Security', email: 'ramachandra.b@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mr. Saleem Hebbal', department: 'cse', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '20 Years', researchArea: 'Software Engineering', email: 'saleem.h@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mrs. Shailaja Halli', department: 'cse', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '20 Years', researchArea: 'Computer Architecture', email: 'shailaja.h@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mrs. Shobha D Jalikoppa', department: 'cse', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '15 Years', researchArea: 'Web Technologies', email: 'shobha.j@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mr. Gurusidappa Hugar', department: 'cse', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '13 Years', researchArea: 'Algorithms & Complexity', email: 'gurusidappa.h@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mr. Tanveer Khatib', department: 'cse', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '13 Years', researchArea: 'Operating Systems', email: 'tanveer.k@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mrs. Soumya Nadakatti', department: 'cse', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '8 Years', researchArea: 'Data Science', email: 'soumya.n@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mr. Pradeep Kulkarni', department: 'cse', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '5 Years', researchArea: 'IoT & Embedded Systems', email: 'pradeep.k@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mrs. Rupali Kotangale', department: 'cse', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '5 Years', researchArea: 'Cyber Security', email: 'rupali.k@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
    { name: 'Ms. Deepti Deshpande', department: 'cse', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '5 Years', researchArea: 'Image Processing', email: 'deepti.d@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mr. Sidharth H', department: 'cse', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '2 Years', researchArea: 'Machine Learning', email: 'sidharth.h@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80' },
    { name: 'Ms. Vidya Havanagi', department: 'cse', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '3 Years', researchArea: 'Natural Language Processing', email: 'vidya.h@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mrs. Nahida Quadri', department: 'cse', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '2 Years', researchArea: 'Computer Vision', email: 'nahida.q@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mrs. Amruta Kurshapur', department: 'cse', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '1 Year', researchArea: 'Web Engineering', email: 'amruta.k@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' },
    // CSE-AIML Faculty
    {
        name: 'Dr. Mahesh M. G.',
        department: 'cse-aiml',
        designation: 'Professor & Head',
        qualification: 'Ph.D in Machine Learning',
        experience: '15 Years',
        researchArea: 'Deep Learning & Natural Language Processing',
        email: 'hod.aiml@agmrcet.ac.in',
        image: '/images/aimlhod.png'
    },
    {
        name: 'Prof. Vinayak Hullur',
        department: 'cse-aiml',
        designation: 'Assistant Professor',
        qualification: 'M.Tech in AI',
        experience: '7 Years',
        researchArea: 'Computer Vision & Reinforcement Learning',
        email: 'vinayak.h@agmrcet.ac.in',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
    },
    // CSD Faculty
    {
        name: 'Prof. Shruti Patil',
        department: 'csd',
        designation: 'Assistant Professor & Head',
        qualification: 'M.Tech in CSE',
        experience: '10 Years',
        researchArea: 'Human Computer Interaction, UI/UX Design',
        email: 'hod.csd@agmrcet.ac.in',
        image: '/images/csdHod.png'
    },
    {
        name: 'Prof. Anand Shettar',
        department: 'csd',
        designation: 'Assistant Professor',
        qualification: 'M.Des (IIT-B), M.Tech',
        experience: '6 Years',
        researchArea: 'Web Technologies & Creative Interaction Design',
        email: 'anand.s@agmrcet.ac.in',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
    },
    // ECE Faculty
    {
        name: 'Dr. Santosh R. P.',
        department: 'ece',
        designation: 'Professor & Head',
        qualification: 'Ph.D in VLSI Design',
        experience: '17 Years',
        researchArea: 'Micro-electronics & VLSI Signal Processing',
        email: 'hod.ece@agmrcet.ac.in',
        image: '/images/ecHod.png'
    },
    {
        name: 'Prof. Savitha M.',
        department: 'ece',
        designation: 'Associate Professor',
        qualification: 'M.Tech in Digital Communication',
        experience: '11 Years',
        researchArea: 'Antenna Design & Wireless Transceivers',
        email: 'savitha.m@agmrcet.ac.in',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
    },
    // EEE Faculty
    {
        name: 'Prof. Kiran K.',
        department: 'eee',
        designation: 'Associate Professor & Head',
        qualification: 'M.Tech, (Ph.D)',
        experience: '12 Years',
        researchArea: 'Electric Vehicle Powertrains & Battery Tech',
        email: 'hod.eee@agmrcet.ac.in',
        image: '/images/eeHod.png'
    },
    {
        name: 'Prof. Jagadish P.',
        department: 'eee',
        designation: 'Assistant Professor',
        qualification: 'M.Tech in Power Systems',
        experience: '9 Years',
        researchArea: 'Smart Grids & Renewable Micro-grids',
        email: 'jagadish.p@agmrcet.ac.in',
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
    },
    // ME Faculty
    {
        name: 'Dr. G. B. Patil',
        department: 'me',
        designation: 'Professor & Head',
        qualification: 'Ph.D in Thermal Eng.',
        experience: '20 Years',
        researchArea: 'Fluid Dynamics & Non-Conventional Bio-Fuels',
        email: 'hod.me@agmrcet.ac.in',
        image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'Prof. Shivanand S.',
        department: 'me',
        designation: 'Assistant Professor',
        qualification: 'M.Tech in Machine Design',
        experience: '11 Years',
        researchArea: 'CAD/CAM Analysis, Finite Element Methods',
        email: 'shivanand.s@agmrcet.ac.in',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80'
    },
    // CE Faculty
    {
        name: 'Prof. S. R. Patil',
        department: 'ce',
        designation: 'Associate Professor & Head',
        qualification: 'M.Tech in Structural Engineering',
        experience: '14 Years',
        researchArea: 'Sustainable Construction Materials & Earthquake Eng.',
        email: 'hod.civil@agmrcet.ac.in',
        image: '/images/Civilhod.png'
    },
    {
        name: 'Prof. Ravi Kulkarni',
        department: 'ce',
        designation: 'Assistant Professor',
        qualification: 'M.Tech in Geotechnical Eng.',
        experience: '8 Years',
        researchArea: 'Soil Mechanics & Foundation Engineering',
        email: 'ravi.k@agmrcet.ac.in',
        image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80'
    },
    // MBA Faculty
    {
        name: 'Dr. Vinay Kumar',
        department: 'mba',
        designation: 'Professor & Head',
        qualification: 'Ph.D in Management',
        experience: '16 Years',
        researchArea: 'Financial Inclusion & Rural Consumer Behavior',
        email: 'hod.mba@agmrcet.ac.in',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'Dr. Laxmi Joshi',
        department: 'mba',
        designation: 'Associate Professor',
        qualification: 'Ph.D in HR Management',
        experience: '12 Years',
        researchArea: 'Organizational Behavior & Corporate Training',
        email: 'laxmi.j@agmrcet.ac.in',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
    },
    // MCA Faculty
    {
        name: 'Dr. Preeti Patil',
        department: 'mca',
        designation: 'Associate Professor & Head',
        qualification: 'Ph.D in Computer Applications',
        experience: '13 Years',
        researchArea: 'Software Architectures & Cloud Computing',
        email: 'hod.mca@agmrcet.ac.in',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'Prof. Satish G.',
        department: 'mca',
        designation: 'Assistant Professor',
        qualification: 'MCA, M.Tech in CSE',
        experience: '10 Years',
        researchArea: 'Mobile App Development, Web Services',
        email: 'satish.g@agmrcet.ac.in',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80'
    }
];

const hodImageMap = {
    'cse': '/images/csHod.png',
    'cse-aiml': '/images/aimlhod.png',
    'csd': '/images/csdHod.png',
    'ece': '/images/ecHod.png',
    'eee': '/images/eeHod.png',
    'ce': '/images/Civilhod.png'
};

module.exports = {
    getAllFaculty: async () => {
        let list = [];
        try {
            const [rows] = await db.query('SELECT name, designation, qualification, experience, researchArea, email, image, department_id AS department FROM faculty');
            if (rows.length > 0) list = rows;
        } catch (err) {
            console.warn('[DB WARNING] Failed to fetch faculty list, using mock fallback.');
        }
        if (list.length === 0) list = facultyData;

        list.forEach(f => {
            const deptKey = f.department ? f.department.toLowerCase() : '';
            if (f.email && f.email.startsWith('hod.') && hodImageMap[deptKey]) {
                f.image = hodImageMap[deptKey];
            }
        });

        return list;
    },
    getFacultyByDepartment: async (dept) => {
        const deptId = dept.toLowerCase();
        let list = [];
        try {
            const [rows] = await db.query('SELECT name, designation, qualification, experience, researchArea, email, image, department_id AS department FROM faculty WHERE LOWER(department_id) = ?', [deptId]);
            if (rows.length > 0) list = rows;
        } catch (err) {
            console.warn(`[DB WARNING] Failed to fetch faculty for department "${deptId}", using mock fallback.`);
        }
        if (list.length === 0) {
            list = facultyData.filter(f => f.department.toLowerCase() === deptId);
        }

        list.forEach(f => {
            if (f.email && f.email.startsWith('hod.') && hodImageMap[deptId]) {
                f.image = hodImageMap[deptId];
            }
        });

        return list;
    }
};
