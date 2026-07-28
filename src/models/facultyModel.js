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
    { name: 'Mr. Irshad Ahmed Gorikhan', department: 'cse-aiml', designation: 'HOD & Assistant Professor', qualification: 'B.E M.Tech', experience: '12 Years', researchArea: 'Machine Learning & Big Data', email: 'hod.aiml@agmrcet.ac.in', image: '/images/aimlhod.png' },
    { name: 'Dr. Sachin Patil', department: 'cse-aiml', designation: 'Associate Professor', qualification: 'B.E M.Tech Ph.D', experience: '15 Years', researchArea: 'Deep Learning & Neural Networks', email: 'sachin.p@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mr. Tabrezkhan Pathan', department: 'cse-aiml', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '10 Years', researchArea: 'Artificial Intelligence', email: 'tabrez.p@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mrs. Harsha Aladi', department: 'cse-aiml', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '3 Years', researchArea: 'Data Science & Python', email: 'harsha.a@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mrs. Sushma S', department: 'cse-aiml', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '2 Years', researchArea: 'Computer Vision', email: 'sushma.s@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80' },

    // CSD Faculty
    { name: 'Dr. Shantabhushana B M', department: 'csd', designation: 'HOD & Associate Professor', qualification: 'B.E M.Tech Ph.D', experience: '12 Years', researchArea: 'UI/UX & Computing Techniques', email: 'hod.csd@agmrcet.ac.in', image: '/images/csdHod.png' },
    { name: 'Dr. Ramesh Koppar', department: 'csd', designation: 'Associate Professor', qualification: 'B.E M.Tech Ph.D', experience: '12 Years', researchArea: 'Computer Graphics & Interactive Systems', email: 'ramesh.k@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mr. Tanveer Khatib', department: 'csd', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '10 Years', researchArea: 'Web & Mobile Design', email: 'tanveer.k@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mrs. Nahida Quadri', department: 'csd', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '3 Years', researchArea: 'Digital Analytics & Interaction', email: 'nahida.q@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mrs. Shweta K', department: 'csd', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '3 Years', researchArea: 'Frontend Engineering', email: 'shweta.k@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80' },

    // ECE Faculty
    { name: 'Dr. Sumna Achar', department: 'ece', designation: 'HOD & Associate Professor', qualification: 'B.E M.Tech Ph.D', experience: '24 Years', researchArea: 'Communication Systems & VLSI', email: 'hod.ece@agmrcet.ac.in', image: '/images/ecHod.png' },
    { name: 'Dr. Sandeep Kyatanavar', department: 'ece', designation: 'Professor & Principal', qualification: 'B.E M.Tech Ph.D', experience: '14 Years', researchArea: 'Electronics & Academic Governance', email: 'principal@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mrs. Vineeta Gejji', department: 'ece', designation: 'Associate Professor', qualification: 'B.E M.Tech', experience: '36 Years', researchArea: 'Digital Signal Processing', email: 'vineeta.g@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' },
    { name: 'Dr. Hanumantappa H C', department: 'ece', designation: 'Associate Professor', qualification: 'B.E M.Tech Ph.D', experience: '23 Years', researchArea: 'VLSI Design & Testing', email: 'hanumantappa.h@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80' },
    { name: 'Dr. Kunjan Shinde', department: 'ece', designation: 'Associate Professor', qualification: 'B.E M.Tech Ph.D', experience: '10 Years', researchArea: 'Embedded Systems', email: 'kunjan.s@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mr. Basavaraj D. Goudar', department: 'ece', designation: 'Associate Professor', qualification: 'B.E M.Tech', experience: '24 Years', researchArea: 'Microprocessors & Control', email: 'basavaraj.g@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mrs. Ashwini Puttannavar', department: 'ece', designation: 'Assistant Professor & TPO', qualification: 'B.E M.Tech', experience: '12 Years', researchArea: 'Wireless Networks', email: 'ashwini.p@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mr. Kalmesh M. W.', department: 'ece', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '10 Years', researchArea: 'Communication Engineering', email: 'kalmesh.w@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mrs. Vinaya S. I.', department: 'ece', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '16 Years', researchArea: 'Analog Electronics', email: 'vinaya.i@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mr. Vinayak Jadhav', department: 'ece', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '11 Years', researchArea: 'Signals & Systems', email: 'vinayak.j@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80' },

    // EEE Faculty
    { name: 'Mrs. Reshma Yellapur', department: 'eee', designation: 'HOD & Assistant Professor', qualification: 'B.E M.Tech (Ph.D)', experience: '12 Years', researchArea: 'Power Electronics & Machines', email: 'hod.eee@agmrcet.ac.in', image: '/images/eeHod.png' },
    { name: 'Dr. B N Patil', department: 'eee', designation: 'Associate Professor', qualification: 'B.E M.Tech Ph.D', experience: '18 Years', researchArea: 'Power Systems & Smart Grids', email: 'bn.patil@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mr. Vinayaksingh Rajput', department: 'eee', designation: 'Associate Professor', qualification: 'B.E M.Tech', experience: '16 Years', researchArea: 'High Voltage & Protection', email: 'vinayak.r@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mrs. Manjula Rathod', department: 'eee', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '15 Years', researchArea: 'Control Systems', email: 'manjula.r@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mr. Sandeep Mudakannavar', department: 'eee', designation: 'Associate Professor', qualification: 'B.E M.Tech', experience: '9 Years', researchArea: 'Renewable Energy Integration', email: 'sandeep.m@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mr. Sanatkumar T P', department: 'eee', designation: 'Associate Professor', qualification: 'B.E M.Tech', experience: '23 Years', researchArea: 'Electric Drives', email: 'sanat.tp@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },

    // ME Faculty
    { name: 'Dr. Zaheerabbas B. Kandagal', department: 'me', designation: 'HOD & Associate Professor', qualification: 'B.E M.Tech Ph.D', experience: '16 Years', researchArea: 'Thermal Engineering & Machine Design', email: 'hod.me@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=300&q=80' },
    { name: 'Dr. Maruthi Prashanth.B.H', department: 'me', designation: 'Associate Professor', qualification: 'B.E M.Tech Ph.D', experience: '40 Years', researchArea: 'Manufacturing & Material Sciences', email: 'maruthi.p@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mr. Sarfarazali Khazi', department: 'me', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '8 Years', researchArea: 'CAD/CAM Analysis', email: 'sarfaraz.k@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mr. Harish Mudegonnavar', department: 'me', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '11 Years', researchArea: 'Turbo Machines & Fluid Dynamics', email: 'harish.m@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mr. Santosh Katarki', department: 'me', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '7 Years', researchArea: 'Production Technology', email: 'santosh.k@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80' },

    // CE Faculty
    { name: 'Dr. Nagendra', department: 'ce', designation: 'HOD & Associate Professor', qualification: 'B.E M.Tech Ph.D', experience: '10 Years', researchArea: 'Structural Engineering & Concrete Tech', email: 'hod.civil@agmrcet.ac.in', image: '/images/Civilhod.png' },
    { name: 'Dr. Ravindra Patil', department: 'ce', designation: 'Associate Professor', qualification: 'B.E M.Tech Ph.D', experience: '28 Years', researchArea: 'Geotechnical & Foundation Eng', email: 'ravindra.p@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80' },
    { name: 'Dr. Mahaboobali Nadaf', department: 'ce', designation: 'Associate Professor', qualification: 'B.E M.Tech Ph.D', experience: '9 Years', researchArea: 'Environmental Engineering & GIS', email: 'mahaboobali.n@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mr. Mohankumar K', department: 'ce', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '12 Years', researchArea: 'Highway & Surveying', email: 'mohan.k@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mrs. Shrayanka M', department: 'ce', designation: 'Assistant Professor', qualification: 'B.E M.Tech', experience: '12 Years', researchArea: 'Structural Analysis', email: 'shrayanka.m@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' },

    // BSH Faculty
    { name: 'Dr. Mahesh Bannur', department: 'bsh', designation: 'HOD & Associate Professor', qualification: 'M.Sc Ph.D', experience: '20 Years', researchArea: 'Applied Physics & Nanomaterials', email: 'hod.bsh@agmrcet.ac.in', image: '/images/bshhod.jpg' },
    { name: 'Dr. Sadiq Ali Shaikh', department: 'bsh', designation: 'Professor', qualification: 'M.A Ph.D', experience: '28 Years', researchArea: 'Professional English & Humanities', email: 'sadiq.s@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80' },
    { name: 'Dr. Satyamurthy', department: 'bsh', designation: 'Associate Professor', qualification: 'M.Sc Ph.D', experience: '20 Years', researchArea: 'Engineering Mathematics', email: 'satyamurthy@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80' },
    { name: 'Dr. Girish Ariga', department: 'bsh', designation: 'Associate Professor', qualification: 'M.Sc Ph.D', experience: '17 Years', researchArea: 'Engineering Chemistry & Polymers', email: 'girish.a@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
    { name: 'Dr. Shashidhar Gowda H', department: 'bsh', designation: 'Associate Professor', qualification: 'M.Sc Ph.D', experience: '17 Years', researchArea: 'Applied Physics & Optics', email: 'shashidhar.g@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mr. Virupaksha Patil', department: 'bsh', designation: 'Assistant Professor', qualification: 'B.Sc M.Sc', experience: '16 Years', researchArea: 'Mathematics & Differential Equations', email: 'virupaksha.p@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mrs. Pragati Mithare', department: 'bsh', designation: 'Assistant Professor', qualification: 'B.Sc M.Sc', experience: '10 Years', researchArea: 'Chemistry & Environmental Studies', email: 'pragathi.m@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },

    // MBA Faculty
    { name: 'Dr. Maheshgouda Patil', department: 'mba', designation: 'Head, Department of MBA', qualification: 'Ph.D in Management', experience: '16 Years', researchArea: 'Marketing & Strategic Management', email: 'hod.mba@agmrcet.ac.in', image: '/images/mbahod.png' },
    { name: 'Dr. Vinay Kumar', department: 'mba', designation: 'Professor', qualification: 'Ph.D in Management', experience: '16 Years', researchArea: 'Financial Inclusion & Markets', email: 'vinay.k@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80' },
    { name: 'Dr. Laxmi Joshi', department: 'mba', designation: 'Associate Professor', qualification: 'Ph.D in HR Management', experience: '12 Years', researchArea: 'Organizational Behavior', email: 'laxmi.j@agmrcet.ac.in', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' }
];

const hodImageMap = {
    'cse': '/images/csHod.png',
    'cse-aiml': '/images/aimlhod.png',
    'csd': '/images/csdHod.png',
    'ece': '/images/ecHod.png',
    'eee': '/images/eeHod.png',
    'ce': '/images/Civilhod.png',
    'bsh': '/images/bshhod.jpg',
    'mba': '/images/mbahod.png'
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
