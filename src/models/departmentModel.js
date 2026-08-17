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
            name: 'Dr. Tabasum Guledgudd',
            designation: 'HOD & Associate Professor',
            qualification: 'B.E M.Tech Ph.D',
            experience: '15 Years',
            message: 'Welcome to the Department of Computer Science & Engineering at AGMRCET. Our department is committed to delivering quality technical education, promoting innovative software development, AI research, and fostering professional ethics to build industry-ready engineering professionals.',
            photo: '/images/csHod.png'
        },
        stats: {
            faculty: 18,
            labs: 6,
            placementRate: '92%',
            avgPackage: '5.2 LPA'
        },
        pos: [
            { id: 'PO1', title: 'Engineering Knowledge', description: 'Apply the knowledge of mathematics, science, engineering fundamentals, and computer science specialization to solve complex engineering problems.' },
            { id: 'PO2', title: 'Problem Analysis', description: 'Identify, formulate, review research literature, and analyze complex computer engineering problems reaching substantiated conclusions.' },
            { id: 'PO3', title: 'Design / Development of Solutions', description: 'Design solutions for complex computer engineering problems and system components or processes that meet specified public health, safety, and cultural needs.' },
            { id: 'PO4', title: 'Conduct Investigations of Complex Problems', description: 'Use research-based knowledge and methods including design of experiments, analysis and interpretation of data, and synthesis of information to provide valid conclusions.' },
            { id: 'PO5', title: 'Modern Tool Usage', description: 'Create, select, and apply appropriate techniques, resources, and modern IT tools including prediction and modeling to complex engineering activities.' },
            { id: 'PO6', title: 'The Engineer and Society', description: 'Apply reasoning informed by contextual knowledge to assess societal, health, safety, legal, and cultural issues and relevant responsibilities.' },
            { id: 'PO7', title: 'Environment and Sustainability', description: 'Understand the impact of professional computer engineering solutions in societal and environmental contexts and demonstrate knowledge of sustainable development.' },
            { id: 'PO8', title: 'Ethics', description: 'Apply ethical principles and commit to professional ethics, responsibilities, and norms of engineering practice.' },
            { id: 'PO9', title: 'Individual and Team Work', description: 'Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.' },
            { id: 'PO10', title: 'Communication', description: 'Communicate effectively on complex engineering activities with the engineering community and with society at large.' },
            { id: 'PO11', title: 'Project Management and Finance', description: 'Demonstrate knowledge and understanding of computer engineering and management principles to manage software projects.' },
            { id: 'PO12', title: 'Life-long Learning', description: 'Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.' }
        ],
        psos: [
            { id: 'PSO1', title: 'Software & System Architecture', description: 'Analyze, design, develop, and maintain high-performance software applications, web systems, and mobile solutions using modern programming paradigms.' },
            { id: 'PSO2', title: 'Data Intelligence & Cloud Computing', description: 'Apply machine learning algorithms, database management principles, cloud architectures, and network security protocols to solve real-world industrial challenges.' }
        ],
        coStatements: [
            { code: 'CS301', subject: 'Data Structures & Algorithms', co: 'Implement and analyze linear and non-linear data structures, algorithm complexity, tree traversals, and sorting/searching techniques.' },
            { code: 'CS402', subject: 'Database Management Systems', co: 'Design relational schemas, construct optimized SQL queries, and implement transaction management and concurrency protocols.' },
            { code: 'CS503', subject: 'Operating Systems Architecture', co: 'Understand process synchronization, memory management schemes, CPU scheduling algorithms, and file system architectures.' },
            { code: 'CS604', subject: 'Computer Networks & Security', co: 'Analyze network layer protocols, routing mechanisms, socket programming, and cryptographic data security protocols.' },
            { code: 'CS705', subject: 'Machine Learning & Deep Learning', co: 'Design supervised/unsupervised machine learning models, neural networks, and evaluate model performance on real dataset benchmarks.' }
        ],
        eContent: [
            { title: 'Data Structures & Algorithms Video Lectures & Notes', instructor: 'Dr. Tabasum Guledgudd', type: 'Video / PDF Courseware', link: '#' },
            { title: 'Database Systems & SQL Lab Manual E-Modules', instructor: 'Dr. Surekha Pinapati', type: 'Lab Manuals & PPTs', link: '#' },
            { title: 'Machine Learning Notebooks & Code Repositories', instructor: 'Dr. Chandru Jathar', type: 'Jupyter Notebooks', link: '#' },
            { title: 'Cloud Architecture & Web Technology Study Notes', instructor: 'Dr. Preeti Sawant', type: 'PDF Docs & Presentations', link: '#' }
        ],
        activities: [
            { title: 'National Level Hackathon - CodeSprint 2026', date: 'March 15, 2026', details: 'A 24-hour continuous coding hackathon with 200+ student teams competing in AI, Web3, and IoT software solutions.' },
            { title: 'Industrial Visit to Infosys & IT Hub', date: 'February 10, 2026', details: 'Final year CSE students visited Infosys Campus to learn enterprise Agile DevOps software pipelines.' },
            { title: 'Workshop on Cyber Security & Ethical Hacking', date: 'January 22, 2026', details: 'Hands-on technical workshop conducted by Senior Security Engineers from TCS.' }
        ],
        supportingStaff: [
            { name: 'Mr. Vinod H D', qualification: 'B.Com CCNA', designation: 'System Analyst', experience: '08 Years' },
            { name: 'Mr. Fakiresh B Asundi', qualification: 'Diploma', designation: 'Instructor', experience: '02 Years' },
            { name: 'Mr. Prasanna Jadhav', qualification: 'Diploma', designation: 'Instructor', experience: '01 Year' },
            { name: 'Mrs. Basavva Madiwalar', qualification: '-', designation: 'Helper', experience: '-' }
        ],
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
            name: 'Mr. Irshad Ahmed Gorikhan',
            designation: 'HOD & Assistant Professor',
            qualification: 'B.E M.Tech',
            experience: '12 Years',
            message: 'We are thrilled to announce the establishment of our Artificial Intelligence and Machine Learning Department at AGMRCET. In the AIML Department, we believe in learning by doing. Our state-of-the-art labs and resources provide the platform to experiment, innovate, and turn ideas into reality.',
            photo: '/images/aimlhod.png'
        },
        stats: {
            faculty: 10,
            labs: 4,
            placementRate: '95%',
            avgPackage: '5.8 LPA'
        },
        pos: [
            { id: 'PO1', title: 'Engineering Knowledge', description: 'Apply the knowledge of mathematics, science, engineering fundamentals, and AI specialization to solve complex engineering problems.' },
            { id: 'PO2', title: 'Problem Analysis', description: 'Identify, formulate, review research literature, and analyze complex AI and ML problems reaching substantiated conclusions.' },
            { id: 'PO3', title: 'Design / Development of Solutions', description: 'Design solutions for complex machine learning problems and intelligent system components.' },
            { id: 'PO4', title: 'Conduct Investigations', description: 'Use research-based knowledge and methods including design of experiments and data synthesis.' },
            { id: 'PO5', title: 'Modern Tool Usage', description: 'Create, select, and apply appropriate AI frameworks, GPUs, and IT tools.' },
            { id: 'PO6', title: 'The Engineer and Society', description: 'Apply reasoning informed by contextual knowledge to assess societal, safety, and legal issues.' },
            { id: 'PO7', title: 'Environment and Sustainability', description: 'Understand the impact of professional AI solutions in societal and environmental contexts.' },
            { id: 'PO8', title: 'Ethics', description: 'Apply ethical principles and commit to professional ethics in AI algorithms and data privacy.' },
            { id: 'PO9', title: 'Individual and Team Work', description: 'Function effectively as an individual, and as a member or leader in diverse teams.' },
            { id: 'PO10', title: 'Communication', description: 'Communicate effectively on complex engineering activities with the engineering community.' },
            { id: 'PO11', title: 'Project Management and Finance', description: 'Demonstrate knowledge and understanding of engineering and management principles.' },
            { id: 'PO12', title: 'Life-long Learning', description: 'Recognize the need for, and have the preparation to engage in independent and life-long learning.' }
        ],
        psos: [
            { id: 'PSO1', title: 'AI & Data Science Core', description: 'Ability to apply knowledge and techniques in domains such as Python, Data Structures, Database Management Systems, and Artificial Neural Networks.' },
            { id: 'PSO2', title: 'Machine Learning Engineering', description: 'Ability to analyze multidisciplinary, computationally intensive problems and develop optimized solutions using modern Machine Learning tools and techniques.' }
        ],
        coStatements: [
            { code: 'AIML301', subject: 'Principles of Python Programming', co: 'Construct Python scripts utilizing object-oriented principles, data manipulation libraries, and file IO.' },
            { code: 'AIML402', subject: 'Artificial Intelligence & Search Algorithms', co: 'Formulate state-space search strategies, heuristic evaluation functions, and knowledge representation models.' },
            { code: 'AIML503', subject: 'Machine Learning Paradigms', co: 'Develop supervised, unsupervised, and ensemble machine learning pipelines for predictive analytics.' },
            { code: 'AIML604', subject: 'Deep Learning & Computer Vision', co: 'Build convolutional and recurrent neural network architectures for image recognition and natural language processing.' }
        ],
        eContent: [
            { title: 'Big Data Analytics Courseware & Code Notebooks', instructor: 'Mr. Irshad Ahmed Gorikhan', type: 'Jupyter Notebooks', link: '#' },
            { title: 'Principles of Python Programming Study Notes', instructor: 'Dr. Sachin Patil', type: 'PDF Courseware', link: '#' },
            { title: 'Artificial Intelligence & Search Algorithms E-Book', instructor: 'Mr. Tabrezkhan Pathan', type: 'PDF / Slides', link: '#' }
        ],
        activities: [
            { title: 'AI Hackathon & Model Pitch 2026', date: 'March 20, 2026', details: '24-hour hackathon focused on Generative AI applications and computer vision prototypes.' },
            { title: 'Guest Lecture on LLMs and Deep Learning', date: 'February 12, 2026', details: 'Industry expert session on deploying PyTorch models to cloud microservices.' }
        ],
        supportingStaff: [
            { name: 'Mr. Rahul K', qualification: 'B.E', designation: 'Programmer', experience: '02 Years' },
            { name: 'Mr. Kumarswamy Hiremath', qualification: 'ITI', designation: 'Asst. Instructor', experience: '01 Year' }
        ],
        labs: [
            { name: 'Machine Learning & Analytics Lab', description: 'Workstations with high-speed Internet and pre-configured CUDA, PyTorch, TensorFlow, and Jupyter Notebook environments.' },
            { name: 'Robotics & Computer Vision Lab', description: 'Features robotic arms, LiDAR sensors, microcontrollers, and high-res cameras for training real-world vision models.' }
        ],
        achievements: [
            { title: 'Deep Fake Detection Patent Published', details: 'Faculty and student researchers successfully filed and published a patent for real-time video verification.' }
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
            name: 'Dr. Ramesh Koppar',
            designation: 'HOD & Associate Professor',
            qualification: 'B.E M.Tech Ph.D',
            experience: '12 Years',
            message: 'Welcome to the Department of Computer Science & Design. This course is designed to provide students with deep insight into Computing techniques, digital analytics, mobile application development, Animations, Virtual Reality and Augmentation.',
            photo: '/images/csdHod.png'
        },
        stats: {
            faculty: 8,
            labs: 3,
            placementRate: '90%',
            avgPackage: '5.0 LPA'
        },
        pos: [
            { id: 'PO1', title: 'Engineering Knowledge', description: 'Apply knowledge of mathematics, computer science, and design fundamentals to complex engineering problems.' },
            { id: 'PO2', title: 'Problem Analysis', description: 'Identify, formulate, and analyze complex software design and user experience problems.' },
            { id: 'PO3', title: 'Design / Development of Solutions', description: 'Design interactive computer-based solutions and digital interfaces satisfying aesthetic and functional goals.' },
            { id: 'PO4', title: 'Conduct Investigations', description: 'Use research methods to analyze user experience data, usability testing, and graphical rendering benchmarks.' },
            { id: 'PO5', title: 'Modern Tool Usage', description: 'Apply modern UI/UX suites, game engines, and graphics rendering tools.' },
            { id: 'PO6', title: 'The Engineer and Society', description: 'Assess societal, cultural, and accessibility responsibilities in digital product design.' },
            { id: 'PO7', title: 'Environment and Sustainability', description: 'Understand sustainable practices in computer graphics and energy-efficient software design.' },
            { id: 'PO8', title: 'Ethics', description: 'Apply ethical principles in intellectual property, media design, and user data protection.' },
            { id: 'PO9', title: 'Individual and Team Work', description: 'Function effectively as an individual, and as a member or leader in creative design teams.' },
            { id: 'PO10', title: 'Communication', description: 'Communicate effectively through visual prototypes, design briefs, and technical presentations.' },
            { id: 'PO11', title: 'Project Management and Finance', description: 'Demonstrate knowledge of design sprint management and agile project development.' },
            { id: 'PO12', title: 'Life-long Learning', description: 'Engage in independent learning to keep pace with evolving visual computing and AR/VR technologies.' }
        ],
        psos: [
            { id: 'PSO1', title: 'Interactive Media & UI/UX', description: 'Investigate, Device, Develop and Enhance solutions in User Experience, UI/UX prototyping, Game Design, and Mobile Web Applications.' },
            { id: 'PSO2', title: 'Visual Computing Systems', description: 'Design and Develop Interactive Computer-Based Systems with modern frontend frameworks, 3D engines, and AR/VR technologies.' }
        ],
        coStatements: [
            { code: 'CSD301', subject: 'UI/UX Design & Human Computer Interaction', co: 'Formulate wireframes, user personas, interactive prototypes, and evaluate usability heuristics.' },
            { code: 'CSD402', subject: 'Computer Graphics & Animation', co: 'Implement 2D/3D transformations, shading algorithms, ray tracing, and keyframe animations.' },
            { code: 'CSD503', subject: 'Mobile Application & Web Technologies', co: 'Develop responsive cross-platform web and mobile applications using modern JavaScript engines.' }
        ],
        eContent: [
            { title: 'UI/UX Prototyping & Figma Masterclass Notes', instructor: 'Dr. Shantabhushana B M', type: 'Design Templates & PDFs', link: '#' },
            { title: 'Unity 3D & Virtual Reality Lab Manuals', instructor: 'Mr. Tanveer Khatib', type: 'Lab Tutorials', link: '#' }
        ],
        activities: [
            { title: 'Designathon 2026 - Creative UI/UX Expo', date: 'March 10, 2026', details: 'State-level digital design competition showcasing mobile banking and healthcare app prototypes.' }
        ],
        supportingStaff: [
            { name: 'Mr. Rahul K', qualification: 'B.E', designation: 'Programmer', experience: '02 Years' },
            { name: 'Mr. Kumarswamy Hiremath', qualification: 'ITI', designation: 'Asst. Instructor', experience: '01 Year' }
        ],
        labs: [
            { name: 'UI/UX & Interactive Design Studio', description: 'Design lab equipped with Figma, Adobe Creative Cloud, and prototyping tools for developing web and mobile app user interfaces.' },
            { name: 'Computer Graphics & Game Development Lab', description: 'Workstations hosting Unity 3D, Blender, and WebGL compilers for training students in gaming and 3D visual environments.' }
        ],
        achievements: [
            { title: 'Best UI/UX Portfolio Award', details: 'Students recognized by India Design Council for their innovative rural banking application prototype.' }
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
            name: 'Dr. Sumna Achar',
            designation: 'HOD & Associate Professor',
            qualification: 'B.E M.Tech Ph.D',
            experience: '24 Years',
            message: 'The Electronics and Communication Engineering Department was established in 2010. The faculty focus on molding quality engineers capable of making great contributions for a better tomorrow with state-of-the-art laboratories and hands-on training in modern tools.',
            photo: '/images/ecHod.png'
        },
        stats: {
            faculty: 15,
            labs: 5,
            placementRate: '88%',
            avgPackage: '4.8 LPA'
        },
        pos: [
            { id: 'PO1', title: 'Engineering Knowledge', description: 'Apply knowledge of mathematics, science, and electronics engineering to solve complex communication problems.' },
            { id: 'PO2', title: 'Problem Analysis', description: 'Identify, formulate, review research literature, and analyze complex signal processing and VLSI problems.' },
            { id: 'PO3', title: 'Design / Development of Solutions', description: 'Design circuit components, embedded systems, and communication transceivers meeting specified public needs.' },
            { id: 'PO4', title: 'Conduct Investigations', description: 'Use research-based knowledge including oscilloscope measurement and circuit simulation synthesis.' },
            { id: 'PO5', title: 'Modern Tool Usage', description: 'Apply Cadence, Xilinx, MATLAB, and Keil IDE suites to modern electronic systems.' },
            { id: 'PO6', title: 'The Engineer and Society', description: 'Assess societal, health, and legal responsibilities relevant to telecommunication practice.' },
            { id: 'PO7', title: 'Environment and Sustainability', description: 'Understand sustainable low-power electronic designs and green energy communications.' },
            { id: 'PO8', title: 'Ethics', description: 'Apply ethical principles and commit to professional ethics in engineering practice.' },
            { id: 'PO9', title: 'Individual and Team Work', description: 'Function effectively as an individual, and as a member or leader in multidisciplinary teams.' },
            { id: 'PO10', title: 'Communication', description: 'Communicate effectively on complex electronics engineering activities with society at large.' },
            { id: 'PO11', title: 'Project Management and Finance', description: 'Demonstrate knowledge of embedded systems project management and financial budgeting.' },
            { id: 'PO12', title: 'Life-long Learning', description: 'Engage in independent and life-long learning in the context of rapid microelectronic change.' }
        ],
        psos: [
            { id: 'PSO1', title: 'Communication Systems Excellence', description: 'Recognize complex problems and Develop solutions in diverse fields of Communication Systems and Wireless Networks.' },
            { id: 'PSO2', title: 'VLSI & Embedded Systems', description: 'Acquire specific knowledge to promote research and career excellence in the areas of VLSI Design and Embedded Systems.' }
        ],
        coStatements: [
            { code: 'ECE301', subject: 'Digital System Design using Verilog', co: 'Synthesize combinational and sequential digital circuits using Verilog HDL and test bench benches.' },
            { code: 'ECE402', subject: 'Principles of Communication Systems', co: 'Analyze analog modulation schemes (AM, FM, PM) and noise performance in receiver circuits.' },
            { code: 'ECE503', subject: 'VLSI Design & Testing', co: 'Design CMOS logic gates, layout rules, stick diagrams, and timing analysis using EDA suites.' },
            { code: 'ECE604', subject: 'Digital Signal Processing', co: 'Compute DFT/FFT transforms, design FIR/IIR digital filters, and implement DSP processor routines.' }
        ],
        eContent: [
            { title: 'Digital System Design using Verilog E-Modules', instructor: 'Dr. Sumna Achar', type: 'PDF / Slides', link: '#' },
            { title: 'VLSI Design & Cadence Tool Lab Manual', instructor: 'Dr. Hanumantappa H C', type: 'Lab Manual', link: '#' },
            { title: 'Digital Signal Processing Lecture Series', instructor: 'Mrs. Vineeta Gejji', type: 'Video Courseware', link: '#' }
        ],
        activities: [
            { title: 'State-Level Workshop on Embedded Systems & IoT', date: 'February 15, 2026', details: 'Hands-on workshop using STM32 ARM microcontrollers and LoRa transceivers.' }
        ],
        supportingStaff: [
            { name: 'Mr. Sudhasagar', qualification: 'Diploma', designation: 'Foreman', experience: '16 Years' },
            { name: 'Mr. Shankrappa Badiger', qualification: 'Diploma', designation: 'Instructor', experience: '14 Years' },
            { name: 'Mrs. Chaitra Kulkarni', qualification: 'Diploma', designation: 'Instructor', experience: '09 Years' },
            { name: 'Mrs. Savita', qualification: 'Diploma', designation: 'Instructor', experience: '04 Years' },
            { name: 'Mr. Praveen Madnur', qualification: 'Diploma', designation: 'Instructor', experience: '04 Years' },
            { name: 'Mr. Prjawal Ramesh Hooli', qualification: 'ITI', designation: 'Asst. Instructor', experience: '03 Years' },
            { name: 'Mr. Ramesh Honnikeri', qualification: 'PUC', designation: 'Helper', experience: '6 Years' }
        ],
        labs: [
            { name: 'Analog Electronics & DSP Lab', description: 'Contains digital storage oscilloscopes (DSOs), signal generators, and software simulators to analyze circuits and signal processing.' },
            { name: 'VLSI Design & Embedded Systems Lab', description: 'Computers loaded with Xilinx, Cadence, and Keil micro-vision IDEs, linked to FPGA development boards.' },
            { name: 'Advanced Communication Lab', description: 'Equipped with optical fiber training kits, microwave test benches, and antenna design analysis software.' }
        ],
        achievements: [
            { title: 'Embedded System Prototype Award', details: 'ECE Students won national acclaim at Texas Instruments Innovation Challenge.' }
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
            name: 'Mrs. Reshma Yellapur',
            designation: 'HOD & Assistant Professor',
            qualification: 'B.E M.Tech (Ph.D)',
            experience: '12 Years',
            message: 'Greetings from the EEE department. Electrical Engineering is the mother of all electrical sciences. Our aim is to prepare students for the high-technology world by providing solid theoretical foundation with substantial hands-on laboratory experience.',
            photo: '/images/eeHod.png'
        },
        stats: {
            faculty: 9,
            labs: 4,
            placementRate: '85%',
            avgPackage: '4.5 LPA'
        },
        pos: [
            { id: 'PO1', title: 'Engineering Knowledge', description: 'Apply mathematics and electrical engineering concepts to power grid and circuit problems.' },
            { id: 'PO2', title: 'Problem Analysis', description: 'Identify and analyze electrical machines, power electronics, and high voltage network issues.' },
            { id: 'PO3', title: 'Design / Development of Solutions', description: 'Design power converter topologies, protection relay schemes, and renewable microgrids.' },
            { id: 'PO4', title: 'Conduct Investigations', description: 'Use laboratory test beds and power system simulation platforms to draw valid conclusions.' },
            { id: 'PO5', title: 'Modern Tool Usage', description: 'Apply MATLAB/Simulink, MiPower, and PSCAD suites to power network modelling.' },
            { id: 'PO6', title: 'The Engineer and Society', description: 'Assess electrical safety standards, grid compliance, and societal responsibilities.' },
            { id: 'PO7', title: 'Environment and Sustainability', description: 'Understand green energy integration, solar PV systems, and electric vehicle sustainability.' },
            { id: 'PO8', title: 'Ethics', description: 'Commit to professional electrical engineering ethics and high-voltage safety regulations.' },
            { id: 'PO9', title: 'Individual and Team Work', description: 'Function effectively in multidisciplinary electrical project teams.' },
            { id: 'PO10', title: 'Communication', description: 'Communicate technical reports and power system single-line diagrams effectively.' },
            { id: 'PO11', title: 'Project Management and Finance', description: 'Demonstrate understanding of energy auditing, tariff structures, and project management.' },
            { id: 'PO12', title: 'Life-long Learning', description: 'Recognize the need for continuous learning in smart grid and EV technology advances.' }
        ],
        psos: [
            { id: 'PSO1', title: 'Power & Energy Solutions', description: 'Provide real time solutions to complex Electrical and Electronics Engineering Problems to empower Industry and Society.' },
            { id: 'PSO2', title: 'Smart Grid & EV Research', description: 'Enhance research skills and usage of modern tools to develop sustainable solutions in renewable energy and electric vehicles.' }
        ],
        coStatements: [
            { code: 'EEE301', subject: 'Electric Circuit Analysis', co: 'Apply mesh/nodal analysis, network theorems, and transient response calculations to AC/DC circuits.' },
            { code: 'EEE402', subject: 'Transmission & Distribution Systems', co: 'Calculate line inductance/capacitance, voltage regulation, corona loss, and underground cable parameters.' },
            { code: 'EEE503', subject: 'Power Electronics & Drives', co: 'Analyze thyristor triggering, DC-DC choppers, inverters, and speed control of electric drives.' }
        ],
        eContent: [
            { title: 'Electric Circuit Analysis Video Series & Solved Problems', instructor: 'Mrs. Reshma Yellapur', type: 'Video Courseware', link: '#' },
            { title: 'Transmission & Distribution E-Notes', instructor: 'Dr. B N Patil', type: 'PDF Notes', link: '#' }
        ],
        activities: [
            { title: 'Industrial Visit to Hydro Electric Power Plant', date: 'January 25, 2026', details: 'Guided field visit for EEE students to study generation and sub-station switchgear.' }
        ],
        supportingStaff: [
            { name: 'Ms. Shruti R D', qualification: 'Foreman', designation: 'Asst. Instructor', experience: '01 Year' },
            { name: 'Ms. Shushma S H', qualification: 'Diploma', designation: 'Instructor', experience: '01 Year' },
            { name: 'Mr. Satish', qualification: 'PUC', designation: 'Electrician', experience: '01 Year' },
            { name: 'Mr. Vishwanath', qualification: 'PUC', designation: 'Electrician', experience: '01 Year' }
        ],
        labs: [
            { name: 'Electrical Machines & Control Systems Lab', description: 'Features DC motors, generators, alternators, and synchronous motors, coupled with test beds and industrial panels.' },
            { name: 'Power Electronics & Simulation Lab', description: 'Contains digital controllers, converters, inverters, and PCs loaded with MATLAB/Simulink for power systems modeling.' }
        ],
        achievements: [
            { title: 'Solar Powered Campus Vehicle', details: 'EEE department students successfully designed and fabricated a solar-powered buggy.' }
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
            name: 'Dr. Zaheerabbas B. Kandagal',
            designation: 'HOD & Associate Professor',
            qualification: 'B.E M.Tech Ph.D',
            experience: '16 Years',
            message: 'The Department of Mechanical Engineering was established in 2010. The Department has skilled faculty in Machine Design, Thermal Engineering, Manufacturing and Maintenance to provide qualitative, industry-tuned education.',
            photo: '/images/employee-avatar.jpg'
        },
        stats: {
            faculty: 9,
            labs: 6,
            placementRate: '82%',
            avgPackage: '4.2 LPA'
        },
        pos: [
            { id: 'PO1', title: 'Engineering Knowledge', description: 'Apply mathematics, thermal sciences, and mechanical fundamentals to solve complex manufacturing problems.' },
            { id: 'PO2', title: 'Problem Analysis', description: 'Analyze stress, fluid dynamics, heat transfer, and mechanical component failures.' },
            { id: 'PO3', title: 'Design / Development of Solutions', description: 'Design machine tools, engine components, and HVAC systems satisfying safety and manufacturing standards.' },
            { id: 'PO4', title: 'Conduct Investigations', description: 'Use tensile testing, CFD simulations, and engine test rigs to formulate valid engineering conclusions.' },
            { id: 'PO5', title: 'Modern Tool Usage', description: 'Apply SolidWorks, ANSYS, AutoCAD, and CNC programming tools to mechanical design.' },
            { id: 'PO6', title: 'The Engineer and Society', description: 'Assess industrial safety standards, ergonomics, and legal responsibilities in plant engineering.' },
            { id: 'PO7', title: 'Environment and Sustainability', description: 'Understand green manufacturing, alternative biofuels, and waste heat recovery systems.' },
            { id: 'PO8', title: 'Ethics', description: 'Commit to professional engineering ethics, patent integrity, and industrial norms.' },
            { id: 'PO9', title: 'Individual and Team Work', description: 'Function effectively in interdisciplinary fabrication and automotive project teams.' },
            { id: 'PO10', title: 'Communication', description: 'Communicate technical drawings, GD&T specifications, and engineering reports clearly.' },
            { id: 'PO11', title: 'Project Management and Finance', description: 'Demonstrate understanding of production planning, cost estimation, and inventory control.' },
            { id: 'PO12', title: 'Life-long Learning', description: 'Engage in continuous learning in modern robotics, 3D printing, and Industry 4.0 automation.' }
        ],
        psos: [
            { id: 'PSO1', title: 'Mechanical System Design', description: 'Ability to design and analyze mechanical components, thermal systems, and mechanisms for optimal performance.' },
            { id: 'PSO2', title: 'Manufacturing & Industrial Skills', description: 'Ability to solve real-life engineering problems with direct hands-on exposure to manufacturing industries.' }
        ],
        coStatements: [
            { code: 'ME301', subject: 'Mechanics of Materials', co: 'Calculate stress, strain, shear force, bending moments, and deflection in structural members.' },
            { code: 'ME402', subject: 'Machining Science & Metrology', co: 'Understand metal cutting principles, tool wear, CNC programming, and precision measurement instruments.' },
            { code: 'ME503', subject: 'Design of Machine Elements', co: 'Design shafts, keys, couplings, gears, fasteners, and bearings subjected to static and fatigue loads.' }
        ],
        eContent: [
            { title: 'Mechanics of Materials Solved Problem Sets', instructor: 'Dr. Zaheerabbas B. Kandagal', type: 'PDF Workbook', link: '#' },
            { title: 'CAD/CAM SolidWorks & CNC Lab Manual', instructor: 'Mr. Harish Mudegonnavar', type: 'Lab Manual', link: '#' }
        ],
        activities: [
            { title: 'National Level Technical Fest - MECHORIZON 2026', date: 'February 20, 2026', details: 'CAD modeling contest, robo-race, and paper presentation event.' }
        ],
        supportingStaff: [
            { name: 'Mr. Vinod H D', qualification: 'B.Com CCNA', designation: 'System Analyst', experience: '08 Years' },
            { name: 'Mr. Sadiq Ali Mulla', qualification: 'B.E', designation: 'Programmer', experience: '03 Years' },
            { name: 'Mr. Fakiresh B Asundi', qualification: 'Diploma', designation: 'Instructor', experience: '02 Years' },
            { name: 'Mr. Prasanna Jadhav', qualification: 'Diploma', designation: 'Instructor', experience: '01 Year' },
            { name: 'Mr. Kumarswamy Hiremath', qualification: 'ITI', designation: 'Asst. Instructor', experience: '01 Year' },
            { name: 'Mrs. Basavva Madiwalar', qualification: '-', designation: 'Helper', experience: '-' }
        ],
        labs: [
            { name: 'CAD/CAM Lab & CNC Centre', description: 'Equipped with SolidWorks, ANSYS, and AutoCAD software, alongside a working desktop CNC machine for prototyping.' },
            { name: 'Internal Combustion Engines & Fluid Machinery Lab', description: 'Features multi-cylinder petrol and diesel engine test rigs with computer monitoring interfaces, and water turbines.' },
            { name: 'Workshop & Machine Shop', description: 'Houses industrial lathes, milling machines, shaper tools, and welding shops where students fabricate project components.' }
        ],
        achievements: [
            { title: 'Automotive Design Cup Runners Up', details: 'The student club secured 2nd place in national hybrid vehicle design competition.' }
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
            name: 'Dr. Nagendra',
            designation: 'HOD & Associate Professor',
            qualification: 'B.E M.Tech Ph.D',
            experience: '10 Years',
            message: 'The Department of Civil Engineering was established in 2010. The Department strives for increasing knowledge, enhancing critical thinking, and technical analysis skills in civil infrastructure and environmental engineering.',
            photo: '/images/Civilhod.png'
        },
        stats: {
            faculty: 10,
            labs: 5,
            placementRate: '80%',
            avgPackage: '4.0 LPA'
        },
        pos: [
            { id: 'PO1', title: 'Engineering Knowledge', description: 'Apply mathematics, geology, and structural engineering to civil infrastructure problems.' },
            { id: 'PO2', title: 'Problem Analysis', description: 'Analyze soil mechanics, concrete strength, fluid flow, and structural load distributions.' },
            { id: 'PO3', title: 'Design / Development of Solutions', description: 'Design RCC structures, steel bridges, highways, water supply networks, and foundations.' },
            { id: 'PO4', title: 'Conduct Investigations', description: 'Use soil testing, concrete slump tests, and surveying data to provide valid engineering conclusions.' },
            { id: 'PO5', title: 'Modern Tool Usage', description: 'Apply STAAD.Pro, AutoCAD Civil 3D, Total Station, and GIS mapping software.' },
            { id: 'PO6', title: 'The Engineer and Society', description: 'Assess urban planning rules, building codes (IS 456), and public safety responsibilities.' },
            { id: 'PO7', title: 'Environment and Sustainability', description: 'Understand sustainable construction materials, rainwater harvesting, and environmental impact assessment.' },
            { id: 'PO8', title: 'Ethics', description: 'Commit to professional ethics, construction quality compliance, and site safety norms.' },
            { id: 'PO9', title: 'Individual and Team Work', description: 'Function effectively in site execution and survey project teams.' },
            { id: 'PO10', title: 'Communication', description: 'Communicate architectural blueprints, structural drawings, and tender documents effectively.' },
            { id: 'PO11', title: 'Project Management and Finance', description: 'Demonstrate knowledge of construction estimation, billing, and project scheduling.' },
            { id: 'PO12', title: 'Life-long Learning', description: 'Engage in continuous learning in smart city infrastructure and green building materials.' }
        ],
        psos: [
            { id: 'PSO1', title: 'Infrastructure & Structural Design', description: 'Plan, analyze, design, and execute sustainable Civil Engineering infrastructure projects considering safety, environment, and ethics.' },
            { id: 'PSO2', title: 'Surveying & Geotechnical Skill', description: 'Apply modern surveying instruments, CAD modeling tools, and soil testing techniques to solve real-world construction challenges.' }
        ],
        coStatements: [
            { code: 'CE301', subject: 'Engineering Geology', co: 'Identify rock types, geological fault structures, and assess site suitability for dam and tunnel projects.' },
            { code: 'CE402', subject: 'Analysis of Structures', co: 'Analyze determinate and indeterminate beams, frames, arches, and trusses using slope deflection and moment distribution methods.' },
            { code: 'CE503', subject: 'Design of RCC Structures', co: 'Design reinforced concrete beams, slabs, columns, and footings as per Indian Standard IS 456 codes.' }
        ],
        eContent: [
            { title: 'Design of RCC Structures Solved Code Examples', instructor: 'Dr. Nagendra', type: 'PDF Notes', link: '#' },
            { title: 'Surveying & Total Station Lab Manual', instructor: 'Mr. Mohankumar K', type: 'Lab Manual', link: '#' }
        ],
        activities: [
            { title: 'Smart Village Topographical Survey Camp', date: 'January 15, 2026', details: 'A 10-day field survey camp conducting contour mapping and road alignment for rural development.' }
        ],
        supportingStaff: [
            { name: 'Mr. R S Hadli', qualification: 'Diploma', designation: 'Instructor', experience: '30 Years' },
            { name: 'Ms. Chaitra T', qualification: 'Diploma', designation: 'Instructor', experience: '03 Years' },
            { name: 'Mr. Arun m', qualification: 'PUC', designation: 'Plumber', experience: '08 Years' },
            { name: 'Mrs. Lakshmavva', qualification: '-', designation: 'Helper', experience: '05 Years' }
        ],
        labs: [
            { name: 'Concrete & Highway Engineering Lab', description: 'Houses compression testing machines, aggregate impact testers, and concrete slump test apparatuses.' },
            { name: 'Geotechnical Engineering & Fluid Mechanics Lab', description: 'Soil direct shear testing equipment, permeability setups, and fluid flow measuring flumes.' },
            { name: 'Surveying Studio & GIS Lab', description: 'Equipped with total stations, digital theodolites, auto-levels, and GIS software licenses for topographic mapping.' }
        ],
        achievements: [
            { title: 'Smart Village Development Survey', details: 'Civil engineering students designed a water conservation plan for Varur village.' }
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
    'bsh': {
        id: 'bsh',
        name: 'Basic Science & Humanities',
        shortName: 'BSH',
        established: 2010,
        intake: 180,
        duration: '1 Year (First Year Core)',
        hod: {
            name: 'Dr. Mahesh Bannur',
            designation: 'HOD & Associate Professor',
            qualification: 'M.Sc Ph.D',
            experience: '20 Years',
            message: 'The Department of Basic Science and Humanities started from the inception of the college. Knowledge in basic science forms the base of engineering. Our objective is to provide value-based education to budding scientists and engineers.',
            photo: '/images/college_data/basic science dept/basic science hod.jpg'
        },
        stats: {
            faculty: 14,
            labs: 4,
            placementRate: '100%',
            avgPackage: '5.0 LPA'
        },
        pos: [
            { id: 'PO1', title: 'Engineering Knowledge', description: 'Apply knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.' },
            { id: 'PO2', title: 'Problem Analysis', description: 'Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions.' },
            { id: 'PO3', title: 'Design / Development of Solutions', description: 'Design solutions for complex engineering problems and design system components or processes.' },
            { id: 'PO4', title: 'Conduct Investigations', description: 'Use research-based knowledge and methods including design of experiments to provide valid conclusions.' },
            { id: 'PO5', title: 'Modern Tool Usage', description: 'Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools.' },
            { id: 'PO6', title: 'The Engineer and Society', description: 'Apply reasoning informed by contextual knowledge to assess societal, health, safety, legal, and cultural issues.' },
            { id: 'PO7', title: 'Environment and Sustainability', description: 'Understand the impact of professional engineering solutions in societal and environmental contexts.' },
            { id: 'PO8', title: 'Ethics', description: 'Apply ethical principles and commit to professional ethics and responsibilities.' },
            { id: 'PO9', title: 'Individual and Team Work', description: 'Function effectively as an individual, and as a member or leader in diverse teams.' },
            { id: 'PO10', title: 'Communication', description: 'Communicate effectively on complex engineering activities with the engineering community and society at large.' },
            { id: 'PO11', title: 'Project Management and Finance', description: 'Demonstrate knowledge and understanding of engineering and management principles.' },
            { id: 'PO12', title: 'Life-long Learning', description: 'Recognize the need for, and have the preparation to engage in independent and life-long learning.' }
        ],
        psos: [
            { id: 'PSO1', title: 'Applied Sciences Foundation', description: 'Ability to apply knowledge and techniques in Applied Physics, Engineering Chemistry, Mathematics, and Professional English Communication.' },
            { id: 'PSO2', title: 'Multidisciplinary Problem Solving', description: 'Ability to analyze fundamental scientific principles to solve multidisciplinary engineering problems.' }
        ],
        coStatements: [
            { code: 'MAT101', subject: 'Calculus & Linear Algebra', co: 'Understand differentiation, integration, matrix theory, and vector calculus applications.' },
            { code: 'PHY102', subject: 'Engineering Physics', co: 'Analyze wave optics, quantum mechanics, laser physics, and semiconductor devices.' },
            { code: 'CHE103', subject: 'Engineering Chemistry', co: 'Study electrochemistry, corrosion science, polymers, water technology, and instrumental analysis.' },
            { code: 'ENG104', subject: 'Technical English & Communication', co: 'Develop oral, written, and professional presentation skills for global corporate environments.' }
        ],
        eContent: [
            { title: 'Applied Engineering Physics E-Notes & Video Demonstrations', instructor: 'Dr. Mahesh Bannur', type: 'PDF / Video Modules', link: '#' },
            { title: 'Principles of Python Programming Courseware', instructor: 'Faculty Team', type: 'Lab Manuals', link: '#' },
            { title: 'Engineering Chemistry Laboratory Manual', instructor: 'Dr. Girish Ariga', type: 'PDF Manual', link: '#' },
            { title: 'Calculus & Differential Equations Workbook', instructor: 'Dr. Satyamurthy', type: 'PDF Practice Sets', link: '#' }
        ],
        activities: [
            { title: 'National Science Day Celebrations 2026', date: 'February 28, 2026', details: 'Exhibition of innovative first-year science models and quiz competitions.' },
            { title: 'Induction Program for First Year Students', date: 'September 10, 2025', details: 'A 2-week orientation program covering campus life, VTU academic regulations, and soft skills training.' }
        ],
        supportingStaff: [
            { name: 'Mrs. Deepa', qualification: 'B.Sc', designation: 'Instructor', experience: '02 Years' },
            { name: 'Ms. Priya', qualification: 'B.Sc', designation: 'Instructor', experience: '01 Year' }
        ],
        labs: [
            { name: 'Engineering Physics Laboratory', description: 'Equipped with spectrometers, lasers, hall effect setups, and semiconductor bandgap determination kits.' },
            { name: 'Engineering Chemistry Laboratory', description: 'Equipped with digital colorimeters, conductivity meters, pH meters, and titrimetric setups.' },
            { name: 'Language & Communication Lab', description: 'Computerized audio-visual lab for English pronunciation, listening comprehension, and interview prep.' }
        ],
        achievements: [
            { title: '100% First Year Pass Percentage in Applied Mathematics', details: 'First year students achieved exceptional results in VTU Semester Examinations.' }
        ],
        research: {
            areas: ['Crystal Growth & Materials Science', 'Thin Film Semiconductors', 'Applied Mathematics & Fluid Flow'],
            projects: [
                { title: 'Synthesis of Nano-structured Thin Films', funding: 'VTU Research Grant', amount: 'Rs. 1,00,000' }
            ]
        },
        placements: {
            topRecruiters: ['TCS', 'Infosys', 'Capgemini', 'Wipro', 'Cognizant'],
            highestPackage: '12.0 LPA',
            recentOffers: 60
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
            name: 'Mr. Irshad Ahmed Gorikhan',
            designation: 'HOD & Assistant Professor',
            qualification: 'B.E M.Tech',
            experience: '12 Years',
            message: 'Welcome to the MBA Department at AGMRCET Varur Hubli. In today’s fast-changing business environment, leaders must be agile, innovative, and socially responsible. Our MBA program is designed to prepare students to meet these challenges head-on.',
            photo: '/images/employee-avatar.jpg'
        },
        stats: {
            faculty: 8,
            labs: 2,
            placementRate: '90%',
            avgPackage: '5.5 LPA'
        },
        pos: [
            { id: 'PO1', title: 'Business Knowledge', description: 'Apply knowledge of management theories and practices to solve complex business problems.' },
            { id: 'PO2', title: 'Strategic Analysis', description: 'Foster analytical and critical thinking abilities for data-driven business decision making.' },
            { id: 'PO3', title: 'Value Based Leadership', description: 'Develop value-based leadership and team building skills essential for corporate management.' },
            { id: 'PO4', title: 'Global Business Environment', description: 'Understand global, economic, legal, and ethical aspects of business management.' },
            { id: 'PO5', title: 'Entrepreneurial Innovation', description: 'Inculcate innovation, venture planning, and entrepreneurial competencies.' },
            { id: 'PO6', title: 'Corporate Social Responsibility', description: 'Assess social responsibility, ethics, and sustainability in business operations.' },
            { id: 'PO7', title: 'Cross-Functional Integration', description: 'Integrate finance, marketing, operations, and HR strategies for organizational growth.' },
            { id: 'PO8', title: 'Business Communication', description: 'Communicate business strategies, executive summaries, and pitch presentations effectively.' },
            { id: 'PO9', title: 'Data Analytics & Digital Business', description: 'Apply digital marketing, financial modeling, and business analytics software tools.' },
            { id: 'PO10', title: 'Life-long Management Learning', description: 'Engage in continuous professional development and strategic adaptation.' }
        ],
        psos: [
            { id: 'PSO1', title: 'Strategic Strategy & Analytics', description: 'Graduates will apply advanced management concepts, analytical tools, and case-based problem-solving approaches to design effective business strategies.' },
            { id: 'PSO2', title: 'Leadership & Ethical Governance', description: 'Graduates will demonstrate leadership skills, interpersonal effectiveness, and ethical responsibility by engaging in FIELD projects, simulations, and collaborative exercises.' }
        ],
        coStatements: [
            { code: 'MBA101', subject: 'Principles of Management & Organizational Behavior', co: 'Evaluate individual and group dynamics, motivation theories, leadership models, and organizational culture.' },
            { code: 'MBA202', subject: 'Marketing Management', co: 'Formulate market segmentation, targeting, positioning strategies, and integrated marketing communication campaigns.' },
            { code: 'MBA303', subject: 'Financial Management & Corporate Accounting', co: 'Analyze capital budgeting decisions, cost of capital, working capital management, and financial statement analysis.' },
            { code: 'MBA404', subject: 'Strategic Management & Business Analytics', co: 'Conduct SWOT/PESTLE analysis, competitive intelligence modeling, and formulate corporate growth strategies.' }
        ],
        eContent: [
            { title: 'Principles of Management Case Studies & Presentation Slides', instructor: 'Dr. Maheshgouda Patil', type: 'PPT & Cases', link: '#' },
            { title: 'Business Research Methods & SPSS Analytics Workbook', instructor: 'Dr. Vinay Kumar', type: 'Data Workbook', link: '#' }
        ],
        activities: [
            { title: 'National Level Management Fest - AGROTECH 2026', date: 'March 05, 2026', details: 'Business plan pitch, mock stock market trading, and best manager competitions.' }
        ],
        supportingStaff: [
            { name: 'Mr. Rahul K', qualification: 'B.E', designation: 'Programmer', experience: '02 Years' },
            { name: 'Mr. Kumarswamy Hiremath', qualification: 'ITI', designation: 'Asst. Instructor', experience: '01 Year' }
        ],
        labs: [
            { name: 'Management Information Systems Lab', description: 'Computing lab configured with SAP ERP modules, SPSS software for statistical market research, and Excel models.' }
        ],
        achievements: [
            { title: 'Best B-Plan at National Level', details: 'MBA students secured first place in national startup pitch competition.' }
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
            photo: '/images/female-employee-avatar.jpg'
        },
        stats: {
            faculty: 7,
            labs: 2,
            placementRate: '94%',
            avgPackage: '5.4 LPA'
        },
        pos: [
            { id: 'PO1', title: 'Software Engineering Knowledge', description: 'Apply computing fundamentals and software engineering methodologies to complex software systems.' },
            { id: 'PO2', title: 'Problem Analysis', description: 'Identify, analyze, and formulate software architectural requirements.' },
            { id: 'PO3', title: 'Design / Development of Solutions', description: 'Design enterprise software applications, mobile systems, and database schemas.' },
            { id: 'PO4', title: 'Conduct Investigations', description: 'Use research-based software testing paradigms and performance benchmarks.' },
            { id: 'PO5', title: 'Modern Tool Usage', description: 'Apply modern full-stack web frameworks, cloud environments, and DevOps pipelines.' }
        ],
        psos: [
            { id: 'PSO1', title: 'Full Stack & Enterprise Software', description: 'Design, develop, and test scalable web and mobile software applications using modern tech stacks.' },
            { id: 'PSO2', title: 'Cloud & Database Architecture', description: 'Architect secure cloud-native database solutions and distributed API services.' }
        ],
        coStatements: [
            { code: 'MCA101', subject: 'Full-Stack Web Development', co: 'Build reactive user interfaces using Node.js, Express, React, and MongoDB.' },
            { code: 'MCA202', subject: 'Cloud Computing & Microservices', co: 'Deploy containerized microservices to AWS/Azure using Docker and Kubernetes.' }
        ],
        eContent: [
            { title: 'Full-Stack Web Engineering Courseware & Code Repositories', instructor: 'Dr. Preeti Patil', type: 'Code Repositories', link: '#' }
        ],
        activities: [
            { title: 'HackMCA 2026 - National Codefest', date: 'February 18, 2026', details: '36-hour hackathon focused on full-stack web and mobile application creation.' }
        ],
        supportingStaff: [
            { name: 'Mr. Rahul K', qualification: 'B.E', designation: 'Programmer', experience: '02 Years' }
        ],
        labs: [
            { name: 'Full-Stack Development Lab', description: 'Equipped for coding with Node.js, Python, Java, and modern frontend engines. Integrated with git pipelines.' }
        ],
        achievements: [
            { title: 'National App Design Hackathon 2024 Winners', details: 'MCA students built a local logistics-matching mobile app that won Karnataka e-Gov Hackathon.' }
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

const hodImageMap = {
    'cse': '/images/csHod.png',
    'cse-aiml': '/images/aimlhod.png',
    'csd': '/images/csdHod.png',
    'ece': '/images/ecHod.png',
    'eee': '/images/eeHod.png',
    'ce': '/images/Civilhod.png',
    'bsh': '/images/college_data/basic science dept/basic science hod.jpg',
    'mba': '/images/employee-avatar.jpg',
    'me': '/images/employee-avatar.jpg',
    'mca': '/images/female-employee-avatar.jpg'
};

const deptVideoMap = {
    'cse': '/videos/demo.mp4',
    'cse-aiml': '/videos/aiml.mp4',
    'aiml': '/videos/aiml.mp4',
    'csd': '/videos/demo1.mp4',
    'ece': '/videos/demo.mp4',
    'eee': '/videos/demo1.mp4',
    'me': '/videos/college.mp4',
    'ce': '/videos/college.mp4',
    'civil': '/videos/college.mp4',
    'bsh': '/videos/college.mp4',
    'mba': '/videos/college.mp4',
    'mca': '/videos/demo.mp4'
};

module.exports = {
    departmentsData,
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
        if (!id) return null;
        const deptId = id.toLowerCase().trim();
        const deptAliases = {
            'cs': 'cse',
            'computer-science': 'cse',
            'aiml': 'cse-aiml',
            'ai-ml': 'cse-aiml',
            'civil': 'ce',
            'mechanical': 'me',
            'mech': 'me',
            'electrical': 'eee',
            'electronics': 'ece'
        };
        const targetId = deptAliases[deptId] || deptId;
        let result = null;
        try {
            const [depts] = await db.query('SELECT * FROM departments WHERE LOWER(id) = ?', [targetId]);
            if (depts.length > 0) {
                const dept = depts[0];
                const [labs] = await db.query('SELECT name, description FROM department_labs WHERE LOWER(department_id) = ?', [targetId]);
                const [achievements] = await db.query('SELECT title, details FROM department_achievements WHERE LOWER(department_id) = ?', [targetId]);
                const [projects] = await db.query('SELECT title, funding, amount FROM department_projects WHERE LOWER(department_id) = ?', [targetId]);
                
                result = {
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
                        areas: typeof dept.researchAreas === 'string' ? JSON.parse(dept.researchAreas) : dept.researchAreas,
                        projects: projects
                    },
                    placements: {
                        topRecruiters: typeof dept.topRecruiters === 'string' ? JSON.parse(dept.topRecruiters) : dept.topRecruiters,
                        highestPackage: dept.placementHighestPackage,
                        recentOffers: dept.placementRecentOffers
                    }
                };
            }
        } catch (err) {
            console.warn(`[DB WARNING] Failed to fetch department "${targetId}", using mock fallback.`);
        }

        if (!result && departmentsData[targetId]) {
            result = JSON.parse(JSON.stringify(departmentsData[targetId]));
        }

const defaultDeptTabsData = {
    pos: [
        { id: 'PO1', title: 'Engineering Knowledge', description: 'Apply knowledge of mathematics, science, engineering fundamentals, and domain specialization to solve complex engineering problems.' },
        { id: 'PO2', title: 'Problem Analysis', description: 'Identify, formulate, review research literature, and analyze complex domain problems reaching substantiated conclusions.' },
        { id: 'PO3', title: 'Design/Development of Solutions', description: 'Design solutions for complex engineering problems and design system components that meet public health, safety, and societal needs.' },
        { id: 'PO4', title: 'Conduct Investigations', description: 'Use research-based knowledge and experimental methods including design of experiments to synthesize valid conclusions.' },
        { id: 'PO5', title: 'Modern Tool Usage', description: 'Create, select, and apply appropriate techniques, resources, and modern IT and engineering tools to complex activities.' },
        { id: 'PO6', title: 'The Engineer and Society', description: 'Apply reasoning informed by contextual knowledge to assess societal, health, safety, legal, and cultural responsibilities.' },
        { id: 'PO7', title: 'Environment & Sustainability', description: 'Understand professional engineering solutions in societal and environmental contexts for sustainable development.' },
        { id: 'PO8', title: 'Ethics', description: 'Apply ethical principles and commit to professional ethics, responsibilities, and norms of engineering practice.' },
        { id: 'PO9', title: 'Individual and Team Work', description: 'Function effectively as an individual, team member, or leader in diverse and multidisciplinary teams.' },
        { id: 'PO10', title: 'Communication', description: 'Communicate effectively on complex engineering activities with the engineering community and society at large.' },
        { id: 'PO11', title: 'Project Management & Finance', description: 'Demonstrate knowledge and understanding of engineering and management principles to manage domain projects.' },
        { id: 'PO12', title: 'Life-long Learning', description: 'Recognize the need for, and have the preparation and ability to engage in independent and life-long learning.' }
    ],
    psos: [
        { id: 'PSO1', title: 'Domain Technical Proficiency', description: 'Analyze, design, develop, and maintain domain-specific software applications, hardware systems, and technical architectures.' },
        { id: 'PSO2', title: 'Industry & Research Excellence', description: 'Apply modern tools, algorithmic frameworks, analytical models, and project management standards to real-world industrial problems.' }
    ],
    coStatements: [
        { code: 'CO1', subject: 'Core Theoretical Foundations', co: 'Understand fundamental concepts, mathematical models, and domain principles.' },
        { code: 'CO2', subject: 'System Design & Implementation', co: 'Construct and optimize technical schemas, software routines, or hardware circuits.' },
        { code: 'CO3', subject: 'Laboratory Practice & Tools', co: 'Demonstrate hands-on laboratory proficiency using industry-standard tools and suites.' },
        { code: 'CO4', subject: 'Capstone Project Execution', co: 'Formulate, build, and present engineering projects adhering to modern industry standards.' }
    ],
    eContent: [
        { title: 'Department Core Courseware & E-Notes', instructor: 'Senior Faculty Team', type: 'PDF / E-Book Modules', link: '#' },
        { title: 'Laboratory Worksheets & Video Demonstrations', instructor: 'Lab Instructors', type: 'Video & Lab Manuals', link: '#' },
        { title: 'Project Documentation & Code Repositories', instructor: 'Department R&D Cell', type: 'Documentation & Code', link: '#' }
    ],
    activities: [
        { title: 'Annual Departmental Technical Symposium', date: 'March 2026', details: 'State-level technical event featuring paper presentations, hackathons, and poster exhibitions.' },
        { title: 'Industrial Exposure & Field Visit', date: 'February 2026', details: 'Guided industry visit to study real-world manufacturing and software production environments.' },
        { title: 'Expert Guest Lecture Series', date: 'January 2026', details: 'Interactive technical sessions delivered by senior industry professionals and researchers.' }
    ],
    supportingStaff: [
        { name: 'Mr. Vinod H D', qualification: 'B.Com CCNA', designation: 'System Analyst', experience: '08 Years' },
        { name: 'Mr. Fakiresh B Asundi', qualification: 'Diploma', designation: 'Instructor', experience: '02 Years' },
        { name: 'Mr. Prasanna Jadhav', qualification: 'Diploma', designation: 'Instructor', experience: '01 Year' },
        { name: 'Mrs. Basavva Madiwalar', qualification: '-', designation: 'Helper', experience: '-' }
    ]
};

        if (result) {
            result.pos = result.pos || defaultDeptTabsData.pos;
            result.psos = result.psos || defaultDeptTabsData.psos;
            result.coStatements = result.coStatements || defaultDeptTabsData.coStatements;
            result.eContent = result.eContent || defaultDeptTabsData.eContent;
            result.activities = result.activities || defaultDeptTabsData.activities;
            result.supportingStaff = result.supportingStaff || defaultDeptTabsData.supportingStaff;
            result.video = deptVideoMap[targetId] || '/videos/college.mp4';

            if (hodImageMap[targetId]) {
                result.hodPhoto = hodImageMap[targetId];
                if (result.hod) result.hod.photo = hodImageMap[targetId];
            }
        }

        return result;
    },
    getAllDepartments: async () => {
        let list = [];
        try {
            const [rows] = await db.query('SELECT * FROM departments');
            if (rows.length > 0) list = rows;
        } catch (err) {
            console.warn('[DB WARNING] Failed to fetch all departments, using mock fallback.');
        }

        if (list.length === 0) {
            list = Object.values(departmentsData);
        }

        list.forEach(d => {
            const key = d.id ? d.id.toLowerCase() : '';
            d.video = deptVideoMap[key] || '/videos/college.mp4';
            if (hodImageMap[key]) {
                d.hodPhoto = hodImageMap[key];
                if (d.hod) d.hod.photo = hodImageMap[key];
            }
        });

        return list;
    },
    departmentsData
};
