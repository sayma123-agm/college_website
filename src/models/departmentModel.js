const db = require('../config/db');
const departmentsData = {
    'cse': {
        id: 'cse',
        name: 'Computer Science & Engineering',
        shortName: 'CSE',
        established: 2010,
        intake: 120,
        duration: '4 Years',
        hod: {
            name: 'Dr. S. V. Shiragur',
            designation: 'Professor & Head',
            qualification: 'Ph.D in Computer Science',
            experience: '18+ Years',
            message: 'Welcome to the Department of Computer Science & Engineering. Our goal is to empower students with state-of-the-art education, combining theory with hands-on development in software engineering, machine learning, and cloud computing. We foster critical thinking and practical skills to prepare graduates for top global industries.',
            photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
        },
        stats: {
            faculty: 18,
            labs: 6,
            placementRate: '92%',
            avgPackage: '5.2 LPA'
        },
        labs: [
            { name: 'Advanced Software Development Lab', description: 'Equipped with high-performance computing nodes, running Linux and Windows, utilized for compiler design, DBMS, and advanced data structures.' },
            { name: 'AI & Cloud Computing Lab', description: 'Equipped with GPU-accelerated workstations. Supports training deep learning models, natural language processing applications, and AWS/Azure cloud environments.' },
            { name: 'Computer Networks & Security Lab', description: 'Features hardware routers, switches, and software firewalls. Students learn network configuration, packets inspection, and cybersecurity protocols.' }
        ],
        achievements: [
            { title: 'Smart India Hackathon 2024 Winners', details: 'A team of 6 CSE students won the first prize of Rs 1,00,000 for their automated AI healthcare diagnostic system.' },
            { title: 'Best Department Research Award', details: 'Faculty members published 24 international research articles in Scopus-indexed journals this academic year.' }
        ],
        research: {
            areas: ['Artificial Intelligence', 'Blockchain & Cryptography', 'Internet of Things (IoT)', 'Cloud Architecture'],
            projects: [
                { title: 'Smart Traffic Management using Deep Learning', funding: 'VTU Research Grant', amount: 'Rs. 2,00,000' },
                { title: 'Secure Decentralized Patient Health Records', funding: 'College Seed Funding', amount: 'Rs. 50,000' }
            ]
        },
        placements: {
            topRecruiters: ['TCS', 'Infosys', 'Capgemini', 'Wipro', 'Cognizant', 'Qspiders'],
            highestPackage: '12.0 LPA',
            recentOffers: 48
        }
    },
    'cse-aiml': {
        id: 'cse-aiml',
        name: 'CSE (Artificial Intelligence & Machine Learning)',
        shortName: 'CSE-AIML',
        established: 2021,
        intake: 60,
        duration: '4 Years',
        hod: {
            name: 'Dr. Mahesh M. G.',
            designation: 'Professor & Head',
            qualification: 'Ph.D in Machine Learning',
            experience: '15+ Years',
            message: 'Artificial Intelligence is redefining industries worldwide. In this department, we focus on cultivating cutting-edge engineering skills in neural networks, computer vision, robotics, and generative models. We look forward to guiding you through this transformative technological journey.',
            photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'
        },
        stats: {
            faculty: 10,
            labs: 4,
            placementRate: '95%',
            avgPackage: '5.8 LPA'
        },
        labs: [
            { name: 'Machine Learning & Analytics Lab', description: 'Workstations with high-speed Internet and pre-configured CUDA, PyTorch, TensorFlow, and Jupyter Notebook environments.' },
            { name: 'Robotics & Computer Vision Lab', description: 'Features robotic arms, LiDAR sensors, microcontrollers, and high-res cameras for training real-world vision models.' }
        ],
        achievements: [
            { title: 'Deep Fake Detection Patent Published', details: 'Dr. Mahesh M. G. and two student researchers successfully filed and published a patent for real-time video verification.' }
        ],
        research: {
            areas: ['Generative Adversarial Networks (GANs)', 'Precision Agriculture using UAVs', 'Medical Image Segmentation'],
            projects: [
                { title: 'Crop Health Identification via Drone Imagery', funding: 'AICTE Research Promotion Scheme', amount: 'Rs. 3,50,000' }
            ]
        },
        placements: {
            topRecruiters: ['Capgemini', 'IBM', 'Tech Mahindra', 'Accenture', 'TCS'],
            highestPackage: '10.5 LPA',
            recentOffers: 22
        }
    },
    'csd': {
        id: 'csd',
        name: 'Computer Science & Design',
        shortName: 'CSD',
        established: 2022,
        intake: 60,
        duration: '4 Years',
        hod: {
            name: 'Prof. Shruti Patil',
            designation: 'Assistant Professor & Head',
            qualification: 'M.Tech in CSE, pursuing Ph.D',
            experience: '10+ Years',
            message: 'The Computer Science & Design department merges technical software expertise with modern UI/UX, interaction design, and virtual media. We train students to build beautiful, highly functional interfaces and applications that satisfy both engineering and human design goals.',
            photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80'
        },
        stats: {
            faculty: 8,
            labs: 3,
            placementRate: '90%',
            avgPackage: '5.0 LPA'
        },
        labs: [
            { name: 'UI/UX & Interactive Design Studio', description: 'Design lab equipped with Figma, Adobe Creative Cloud, and prototyping tools for developing web and mobile app user interfaces.' },
            { name: 'Computer Graphics & Game Development Lab', description: 'Workstations hosting Unity 3D, Blender, and WebGL compilers for training students in gaming and 3D visual environments.' }
        ],
        achievements: [
            { title: 'Best UI/UX Portfolio Award', details: 'Two students recognized by India Design Council for their innovative rural banking application prototype.' }
        ],
        research: {
            areas: ['Human-Computer Interaction (HCI)', 'Virtual Reality (VR) interfaces', 'Augmented Reality in Education'],
            projects: [
                { title: 'AR Interactive Anatomy Learning Tool', funding: 'College Incubation Grant', amount: 'Rs. 75,000' }
            ]
        },
        placements: {
            topRecruiters: ['Cognizant', 'Infosys', 'Wipro', 'Adobe (internships)', 'LTI Mindtree'],
            highestPackage: '8.4 LPA',
            recentOffers: 15
        }
    },
    'ece': {
        id: 'ece',
        name: 'Electronics & Communication Engineering',
        shortName: 'ECE',
        established: 2010,
        intake: 60,
        duration: '4 Years',
        hod: {
            name: 'Dr. Santosh R. P.',
            designation: 'Professor & Head',
            qualification: 'Ph.D in VLSI Design',
            experience: '17+ Years',
            message: 'Electronics is the backbone of all computing and communication systems. From microchips to satellite telemetry, we prepare our ECE students to architect the hardware systems of tomorrow through dedicated research, rigorous labs, and real-world internships.',
            photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
        },
        stats: {
            faculty: 12,
            labs: 5,
            placementRate: '88%',
            avgPackage: '4.8 LPA'
        },
        labs: [
            { name: 'Analog Electronics & DSP Lab', description: 'Contains digital storage oscilloscopes (DSOs), signal generators, and software simulators to analyze circuits and signal processing.' },
            { name: 'VLSI Design & Embedded Systems Lab', description: 'Computers loaded with Xilinx, Cadence, and Keil micro-vision IDEs, linked to FPGA development boards.' },
            { name: 'Advanced Communication Lab', description: 'Equipped with optical fiber training kits, microwave test benches, and antenna design analysis software.' }
        ],
        achievements: [
            { title: 'Embedded System Prototype Award', details: 'ECE Students won national acclaim at the Texas Instruments Innovation Challenge for their IoT-enabled landslide warning system.' }
        ],
        research: {
            areas: ['Low-Power VLSI design', '5G MIMO Networks', 'RF Energy Harvesting'],
            projects: [
                { title: 'IoT-based Water Resource Level Alerting Network', funding: 'KSCST Research Project', amount: 'Rs. 45,000' }
            ]
        },
        placements: {
            topRecruiters: ['Bosch', 'Infosys', 'KPIT Technologies', 'TCS', 'Cognizant'],
            highestPackage: '9.0 LPA',
            recentOffers: 34
        }
    },
    'eee': {
        id: 'eee',
        name: 'Electrical & Electronics Engineering',
        shortName: 'EEE',
        established: 2010,
        intake: 30,
        duration: '4 Years',
        hod: {
            name: 'Prof. Kiran K.',
            designation: 'Associate Professor & Head',
            qualification: 'M.Tech, pursuing Ph.D',
            experience: '12+ Years',
            message: 'Welcome to EEE. Our curriculum focuses on sustainable green energy, smart grid designs, power electronics, and electric vehicle systems. We bridge traditional electrical engineering concepts with modern computerized power grids.',
            photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
        },
        stats: {
            faculty: 8,
            labs: 4,
            placementRate: '85%',
            avgPackage: '4.5 LPA'
        },
        labs: [
            { name: 'Electrical Machines & Control Systems Lab', description: 'Features DC motors, generators, alternators, and synchronous motors, coupled with test beds and industrial panels.' },
            { name: 'Power Electronics & Simulation Lab', description: 'Contains digital controllers, converters, inverters, and PCs loaded with MATLAB/Simulink for power systems modeling.' }
        ],
        achievements: [
            { title: 'Solar Powered Campus Vehicle', details: 'EEE department students successfully designed and fabricated a 4-seater solar-powered buggy for in-campus travel.' }
        ],
        research: {
            areas: ['Smart Microgrids', 'EV Battery Management Systems', 'Renewable Energy Integration'],
            projects: [
                { title: 'Design of Bidirectional Converter for Solar-Battery EV', funding: 'VTU Grant', amount: 'Rs. 1,50,000' }
            ]
        },
        placements: {
            topRecruiters: ['L&T', 'Schneider Electric', 'TCS', 'Wipro', 'Exide Batteries'],
            highestPackage: '7.5 LPA',
            recentOffers: 18
        }
    },
    'me': {
        id: 'me',
        name: 'Mechanical Engineering',
        shortName: 'ME',
        established: 2010,
        intake: 30,
        duration: '4 Years',
        hod: {
            name: 'Dr. G. B. Patil',
            designation: 'Professor & Head',
            qualification: 'Ph.D in Thermal Engineering',
            experience: '20+ Years',
            message: 'Mechanical Engineering at AGMRCET focuses on core concepts like design, thermodynamics, material sciences, and CAD/CAM modeling, and integrates them with modern robotics, automation, and 3D printing methodologies.',
            photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
        },
        stats: {
            faculty: 9,
            labs: 6,
            placementRate: '82%',
            avgPackage: '4.2 LPA'
        },
        labs: [
            { name: 'CAD/CAM Lab & CNC Centre', description: 'Equipped with SolidWorks, ANSYS, and AutoCAD software, alongside a working desktop CNC machine for prototyping.' },
            { name: 'Internal Combustion Engines & Fluid Machinery Lab', description: 'Features multi-cylinder petrol and diesel engine test rigs with computer monitoring interfaces, and water turbines.' },
            { name: 'Workshop & Machine Shop', description: 'Houses industrial lathes, milling machines, shaper tools, and welding shops where students fabricate project components.' }
        ],
        achievements: [
            { title: 'Automotive Design Cup Runners Up', details: 'The AGMR Racing student club secured 2nd place in the national hybrid vehicle design competition at Formula Bharat.' }
        ],
        research: {
            areas: ['Bio-fuels & Emissions Reduction', 'Composite Materials Analysis', 'Computational Fluid Dynamics (CFD)'],
            projects: [
                { title: 'Performance Analysis of Biodiesel Blends in CI Engine', funding: 'KSCST Project Scheme', amount: 'Rs. 35,000' }
            ]
        },
        placements: {
            topRecruiters: ['Toyota Kirloskar', 'TATA Motors', 'Mahindra & Mahindra', 'Quest Global', 'Infosys'],
            highestPackage: '7.0 LPA',
            recentOffers: 20
        }
    },
    'ce': {
        id: 'ce',
        name: 'Civil Engineering',
        shortName: 'CE',
        established: 2010,
        intake: 30,
        duration: '4 Years',
        hod: {
            name: 'Prof. S. R. Patil',
            designation: 'Associate Professor & Head',
            qualification: 'M.Tech in Structural Engineering, pursuing Ph.D',
            experience: '14+ Years',
            message: 'Civil engineering shapes the landscape of our society. Our program emphasizes sustainable construction practices, structural design, GIS mapping, and soil mechanics. We combine lab work with direct site visits to create ready-to-construct engineers.',
            photo: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=300&q=80'
        },
        stats: {
            faculty: 8,
            labs: 5,
            placementRate: '80%',
            avgPackage: '4.0 LPA'
        },
        labs: [
            { name: 'Concrete & Highway Engineering Lab', description: 'Houses compression testing machines, aggregate impact testers, and concrete slump test apparatuses.' },
            { name: 'Geotechnical Engineering & Fluid Mechanics Lab', description: 'Soil direct shear testing equipment, permeability setups, and fluid flow measuring flumes.' },
            { name: 'Surveying Studio & GIS Lab', description: 'Equipped with total stations, digital theodolites, auto-levels, and GIS software licenses for topographic mapping.' }
        ],
        achievements: [
            { title: 'Smart Village Development Survey', details: 'Civil engineering students designed a comprehensive water conservation and sewage treatment plan for Varur village.' }
        ],
        research: {
            areas: ['Self-healing Concrete', 'Geosynthetic soil reinforcement', 'Rainwater Harvesting structures'],
            projects: [
                { title: 'Utilization of Agricultural Waste in Low Cost Bricks', funding: 'College Seed Funding', amount: 'Rs. 40,000' }
            ]
        },
        placements: {
            topRecruiters: ['L&T Infra', 'Sobha Developers', 'JSW Cement', 'TCS', 'Ultratech'],
            highestPackage: '6.5 LPA',
            recentOffers: 14
        }
    },
    'mba': {
        id: 'mba',
        name: 'Master of Business Administration',
        shortName: 'MBA',
        established: 2013,
        intake: 60,
        duration: '2 Years (PG)',
        hod: {
            name: 'Dr. Vinay Kumar',
            designation: 'Professor & Head',
            qualification: 'Ph.D in Management',
            experience: '16+ Years',
            message: 'Welcome to the MBA Department. We offer specializations in Finance, Marketing, and Human Resource Management. Our dynamic curriculum utilizes case studies, business simulations, and regular corporate lectures to convert students into industry-ready managers.',
            photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80'
        },
        stats: {
            faculty: 8,
            labs: 2,
            placementRate: '90%',
            avgPackage: '5.5 LPA'
        },
        labs: [
            { name: 'Management Information Systems Lab', description: 'Computing lab configured with SAP ERP modules, SPSS software for statistical market research, and Excel models.' }
        ],
        achievements: [
            { title: 'Best B-Plan at National Level', details: 'MBA students secured first place in the national startup pitch competition at VTU Management Fest.' }
        ],
        research: {
            areas: ['Consumer Buying Behavior in Rural Markets', 'FinTech adaptations', 'Employee Retention Strategies'],
            projects: [
                { title: 'Feasibility Analysis of Rural E-commerce in Hubli District', funding: 'Private Industry Consulting', amount: 'Rs. 1,20,000' }
            ]
        },
        placements: {
            topRecruiters: ['ICICI Bank', 'HDFC Mutual Funds', 'Jaro Education', 'Asian Paints', 'Airtel'],
            highestPackage: '9.6 LPA',
            recentOffers: 42
        }
    },
    'mca': {
        id: 'mca',
        name: 'Master of Computer Applications',
        shortName: 'MCA',
        established: 2022,
        intake: 60,
        duration: '2 Years (PG)',
        hod: {
            name: 'Dr. Preeti Patil',
            designation: 'Associate Professor & Head',
            qualification: 'Ph.D in Computer Applications',
            experience: '13+ Years',
            message: 'Our MCA course is tailored for students aiming to master software application design. With rapid progress in web services, mobile app development, and cloud databases, we provide high-intensity coding curricula and mandatory industry projects.',
            photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
        },
        stats: {
            faculty: 7,
            labs: 2,
            placementRate: '94%',
            avgPackage: '5.4 LPA'
        },
        labs: [
            { name: 'Full-Stack Development Lab', description: 'Equipped for coding with Node.js, Python, Java, and modern frontend engines. Integrated with git pipelines.' }
        ],
        achievements: [
            { title: 'National App Design Hackathon 2024 Winners', details: 'MCA students built a local logistics-matching mobile app that won the Karnataka e-Gov Hackathon.' }
        ],
        research: {
            areas: ['Mobile Edge Computing', 'Natural Language Interfaces', 'Semantic Web'],
            projects: [
                { title: 'AI Chatbot for Municipal Grievance Redressal', funding: 'Hubli Municipal Corporation Consulting', amount: 'Rs. 1,80,000' }
            ]
        },
        placements: {
            topRecruiters: ['Cognizant', 'Capgemini', 'IBM', 'Wipro', 'Qspiders'],
            highestPackage: '10.0 LPA',
            recentOffers: 38
        }
    }
};

module.exports = {
    getDepartmentsList: async () => {
        try {
            const [rows] = await db.query('SELECT id, name, shortName FROM departments');
            if (rows.length > 0) return rows;
        } catch (err) {
            console.warn('[DB WARNING] Failed to fetch departments list, using mock fallback.');
        }
        return Object.keys(departmentsData).map(key => ({
            id: departmentsData[key].id,
            name: departmentsData[key].name,
            shortName: departmentsData[key].shortName
        }));
    },
    getDepartmentById: async (id) => {
        const deptId = id.toLowerCase();
        try {
            const [depts] = await db.query('SELECT * FROM departments WHERE id = ?', [deptId]);
            if (depts.length > 0) {
                const dept = depts[0];
                const [labs] = await db.query('SELECT name, description FROM department_labs WHERE department_id = ?', [deptId]);
                const [achievements] = await db.query('SELECT title, details FROM department_achievements WHERE department_id = ?', [deptId]);
                const [projects] = await db.query('SELECT title, funding, amount FROM department_projects WHERE department_id = ?', [deptId]);
                
                return {
                    id: dept.id,
                    name: dept.name,
                    shortName: dept.shortName,
                    established: dept.established,
                    intake: dept.intake,
                    duration: dept.duration,
                    hod: {
                        name: dept.hodName,
                        designation: dept.hodDesignation,
                        qualification: dept.hodQualification,
                        experience: dept.hodExperience,
                        message: dept.hodMessage,
                        photo: dept.hodPhoto
                    },
                    stats: {
                        faculty: dept.statsFaculty,
                        labs: dept.statsLabs,
                        placementRate: dept.statsPlacementRate,
                        avgPackage: dept.statsAvgPackage
                    },
                    labs: labs,
                    achievements: achievements,
                    research: {
                        areas: JSON.parse(dept.researchAreas),
                        projects: projects
                    },
                    placements: {
                        topRecruiters: JSON.parse(dept.topRecruiters),
                        highestPackage: dept.placementHighestPackage,
                        recentOffers: dept.placementRecentOffers
                    }
                };
            }
        } catch (err) {
            console.warn(`[DB WARNING] Failed to fetch department "${deptId}", using mock fallback.`);
        }
        return departmentsData[deptId] || null;
    },
    getAllDepartments: async () => {
        try {
            const [rows] = await db.query('SELECT * FROM departments');
            if (rows.length > 0) return rows;
        } catch (err) {
            console.warn('[DB WARNING] Failed to fetch all departments, using mock fallback.');
        }
        return Object.values(departmentsData);
    },
    departmentsData
};
