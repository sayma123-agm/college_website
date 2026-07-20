-- Database dump of agmrcet_db
-- Generated at 2026-07-17T06:03:58.192Z

SET FOREIGN_KEY_CHECKS=0;

-- Table structure for table `department_achievements`
DROP TABLE IF EXISTS `department_achievements`;
CREATE TABLE `department_achievements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department_id` varchar(50) NOT NULL,
  `title` varchar(200) NOT NULL,
  `details` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `department_achievements_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table `department_achievements`
INSERT INTO `department_achievements` (`id`, `department_id`, `title`, `details`) VALUES
(1, 'cse', 'Smart India Hackathon 2024 Winners', 'A team of 6 CSE students won the first prize of Rs 1,00,000 for their automated AI healthcare diagnostic system.'),
(2, 'cse', 'Best Department Research Award', 'Faculty members published 24 international research articles in Scopus-indexed journals this academic year.'),
(3, 'cse-aiml', 'Deep Fake Detection Patent Published', 'Dr. Mahesh M. G. and two student researchers successfully filed and published a patent for real-time video verification.'),
(4, 'csd', 'Best UI/UX Portfolio Award', 'Two students recognized by India Design Council for their innovative rural banking application prototype.'),
(5, 'ece', 'Embedded System Prototype Award', 'ECE Students won national acclaim at the Texas Instruments Innovation Challenge for their IoT-enabled landslide warning system.'),
(6, 'eee', 'Solar Powered Campus Vehicle', 'EEE department students successfully designed and fabricated a 4-seater solar-powered buggy for in-campus travel.'),
(7, 'me', 'Automotive Design Cup Runners Up', 'The AGMR Racing student club secured 2nd place in the national hybrid vehicle design competition at Formula Bharat.'),
(8, 'ce', 'Smart Village Development Survey', 'Civil engineering students designed a comprehensive water conservation and sewage treatment plan for Varur village.'),
(9, 'mba', 'Best B-Plan at National Level', 'MBA students secured first place in the national startup pitch competition at VTU Management Fest.'),
(10, 'mca', 'National App Design Hackathon 2024 Winners', 'MCA students built a local logistics-matching mobile app that won the Karnataka e-Gov Hackathon.');

-- Table structure for table `department_labs`
DROP TABLE IF EXISTS `department_labs`;
CREATE TABLE `department_labs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department_id` varchar(50) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `department_labs_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table `department_labs`
INSERT INTO `department_labs` (`id`, `department_id`, `name`, `description`) VALUES
(1, 'cse', 'Advanced Software Development Lab', 'Equipped with high-performance computing nodes, running Linux and Windows, utilized for compiler design, DBMS, and advanced data structures.'),
(2, 'cse', 'AI & Cloud Computing Lab', 'Equipped with GPU-accelerated workstations. Supports training deep learning models, natural language processing applications, and AWS/Azure cloud environments.'),
(3, 'cse', 'Computer Networks & Security Lab', 'Features hardware routers, switches, and software firewalls. Students learn network configuration, packets inspection, and cybersecurity protocols.'),
(4, 'cse-aiml', 'Machine Learning & Analytics Lab', 'Workstations with high-speed Internet and pre-configured CUDA, PyTorch, TensorFlow, and Jupyter Notebook environments.'),
(5, 'cse-aiml', 'Robotics & Computer Vision Lab', 'Features robotic arms, LiDAR sensors, microcontrollers, and high-res cameras for training real-world vision models.'),
(6, 'csd', 'UI/UX & Interactive Design Studio', 'Design lab equipped with Figma, Adobe Creative Cloud, and prototyping tools for developing web and mobile app user interfaces.'),
(7, 'csd', 'Computer Graphics & Game Development Lab', 'Workstations hosting Unity 3D, Blender, and WebGL compilers for training students in gaming and 3D visual environments.'),
(8, 'ece', 'Analog Electronics & DSP Lab', 'Contains digital storage oscilloscopes (DSOs), signal generators, and software simulators to analyze circuits and signal processing.'),
(9, 'ece', 'VLSI Design & Embedded Systems Lab', 'Computers loaded with Xilinx, Cadence, and Keil micro-vision IDEs, linked to FPGA development boards.'),
(10, 'ece', 'Advanced Communication Lab', 'Equipped with optical fiber training kits, microwave test benches, and antenna design analysis software.'),
(11, 'eee', 'Electrical Machines & Control Systems Lab', 'Features DC motors, generators, alternators, and synchronous motors, coupled with test beds and industrial panels.'),
(12, 'eee', 'Power Electronics & Simulation Lab', 'Contains digital controllers, converters, inverters, and PCs loaded with MATLAB/Simulink for power systems modeling.'),
(13, 'me', 'CAD/CAM Lab & CNC Centre', 'Equipped with SolidWorks, ANSYS, and AutoCAD software, alongside a working desktop CNC machine for prototyping.'),
(14, 'me', 'Internal Combustion Engines & Fluid Machinery Lab', 'Features multi-cylinder petrol and diesel engine test rigs with computer monitoring interfaces, and water turbines.'),
(15, 'me', 'Workshop & Machine Shop', 'Houses industrial lathes, milling machines, shaper tools, and welding shops where students fabricate project components.'),
(16, 'ce', 'Concrete & Highway Engineering Lab', 'Houses compression testing machines, aggregate impact testers, and concrete slump test apparatuses.'),
(17, 'ce', 'Geotechnical Engineering & Fluid Mechanics Lab', 'Soil direct shear testing equipment, permeability setups, and fluid flow measuring flumes.'),
(18, 'ce', 'Surveying Studio & GIS Lab', 'Equipped with total stations, digital theodolites, auto-levels, and GIS software licenses for topographic mapping.'),
(19, 'mba', 'Management Information Systems Lab', 'Computing lab configured with SAP ERP modules, SPSS software for statistical market research, and Excel models.'),
(20, 'mca', 'Full-Stack Development Lab', 'Equipped for coding with Node.js, Python, Java, and modern frontend engines. Integrated with git pipelines.');

-- Table structure for table `department_projects`
DROP TABLE IF EXISTS `department_projects`;
CREATE TABLE `department_projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department_id` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `funding` varchar(150) NOT NULL,
  `amount` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `department_projects_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table `department_projects`
INSERT INTO `department_projects` (`id`, `department_id`, `title`, `funding`, `amount`) VALUES
(1, 'cse', 'Smart Traffic Management using Deep Learning', 'VTU Research Grant', 'Rs. 2,00,000'),
(2, 'cse', 'Secure Decentralized Patient Health Records', 'College Seed Funding', 'Rs. 50,000'),
(3, 'cse-aiml', 'Crop Health Identification via Drone Imagery', 'AICTE Research Promotion Scheme', 'Rs. 3,50,000'),
(4, 'csd', 'AR Interactive Anatomy Learning Tool', 'College Incubation Grant', 'Rs. 75,000'),
(5, 'ece', 'IoT-based Water Resource Level Alerting Network', 'KSCST Research Project', 'Rs. 45,000'),
(6, 'eee', 'Design of Bidirectional Converter for Solar-Battery EV', 'VTU Grant', 'Rs. 1,50,000'),
(7, 'me', 'Performance Analysis of Biodiesel Blends in CI Engine', 'KSCST Project Scheme', 'Rs. 35,000'),
(8, 'ce', 'Utilization of Agricultural Waste in Low Cost Bricks', 'College Seed Funding', 'Rs. 40,000'),
(9, 'mba', 'Feasibility Analysis of Rural E-commerce in Hubli District', 'Private Industry Consulting', 'Rs. 1,20,000'),
(10, 'mca', 'AI Chatbot for Municipal Grievance Redressal', 'Hubli Municipal Corporation Consulting', 'Rs. 1,80,000');

-- Table structure for table `departments`
DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments` (
  `id` varchar(50) NOT NULL,
  `name` varchar(150) NOT NULL,
  `shortName` varchar(20) NOT NULL,
  `established` int NOT NULL,
  `intake` int NOT NULL,
  `duration` varchar(30) NOT NULL,
  `hodName` varchar(100) NOT NULL,
  `hodDesignation` varchar(100) NOT NULL,
  `hodQualification` varchar(100) NOT NULL,
  `hodExperience` varchar(50) NOT NULL,
  `hodMessage` text NOT NULL,
  `hodPhoto` varchar(255) NOT NULL,
  `statsFaculty` int NOT NULL,
  `statsLabs` int NOT NULL,
  `statsPlacementRate` varchar(20) NOT NULL,
  `statsAvgPackage` varchar(20) NOT NULL,
  `placementHighestPackage` varchar(20) NOT NULL,
  `placementRecentOffers` int NOT NULL,
  `researchAreas` text NOT NULL,
  `topRecruiters` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table `departments`
INSERT INTO `departments` (`id`, `name`, `shortName`, `established`, `intake`, `duration`, `hodName`, `hodDesignation`, `hodQualification`, `hodExperience`, `hodMessage`, `hodPhoto`, `statsFaculty`, `statsLabs`, `statsPlacementRate`, `statsAvgPackage`, `placementHighestPackage`, `placementRecentOffers`, `researchAreas`, `topRecruiters`) VALUES
('ce', 'Civil Engineering', 'CE', 2010, 30, '4 Years', 'Prof. S. R. Patil', 'Associate Professor & Head', 'M.Tech in Structural Engineering, pursuing Ph.D', '14+ Years', 'Civil engineering shapes the landscape of our society. Our program emphasizes sustainable construction practices, structural design, GIS mapping, and soil mechanics. We combine lab work with direct site visits to create ready-to-construct engineers.', '/images/Civilhod.png', 8, 5, '80%', '4.0 LPA', '6.5 LPA', 14, '["Self-healing Concrete","Geosynthetic soil reinforcement","Rainwater Harvesting structures"]', '["L&T Infra","Sobha Developers","JSW Cement","TCS","Ultratech"]'),
('csd', 'Computer Science & Design', 'CSD', 2022, 60, '4 Years', 'Prof. Shruti Patil', 'Assistant Professor & Head', 'M.Tech in CSE, pursuing Ph.D', '10+ Years', 'The Computer Science & Design department merges technical software expertise with modern UI/UX, interaction design, and virtual media. We train students to build beautiful, highly functional interfaces and applications that satisfy both engineering and human design goals.', '/images/csdHod.png', 8, 3, '90%', '5.0 LPA', '8.4 LPA', 15, '["Human-Computer Interaction (HCI)","Virtual Reality (VR) interfaces","Augmented Reality in Education"]', '["Cognizant","Infosys","Wipro","Adobe (internships)","LTI Mindtree"]'),
('cse', 'Computer Science & Engineering', 'CSE', 2010, 120, '4 Years', 'Dr. S. V. Shiragur', 'Professor & Head', 'Ph.D in Computer Science', '18+ Years', 'Welcome to the Department of Computer Science & Engineering. Our goal is to empower students with state-of-the-art education, combining theory with hands-on development in software engineering, machine learning, and cloud computing. We foster critical thinking and practical skills to prepare graduates for top global industries.', '/images/csHod.png', 18, 6, '92%', '5.2 LPA', '12.0 LPA', 48, '["Artificial Intelligence","Blockchain & Cryptography","Internet of Things (IoT)","Cloud Architecture"]', '["TCS","Infosys","Capgemini","Wipro","Cognizant","Qspiders"]'),
('cse-aiml', 'CSE (Artificial Intelligence & Machine Learning)', 'CSE-AIML', 2021, 60, '4 Years', 'Dr. Mahesh M. G.', 'Professor & Head', 'Ph.D in Machine Learning', '15+ Years', 'Artificial Intelligence is redefining industries worldwide. In this department, we focus on cultivating cutting-edge engineering skills in neural networks, computer vision, robotics, and generative models. We look forward to guiding you through this transformative technological journey.', '/images/aimlhod.png', 10, 4, '95%', '5.8 LPA', '10.5 LPA', 22, '["Generative Adversarial Networks (GANs)","Precision Agriculture using UAVs","Medical Image Segmentation"]', '["Capgemini","IBM","Tech Mahindra","Accenture","TCS"]'),
('ece', 'Electronics & Communication Engineering', 'ECE', 2010, 60, '4 Years', 'Dr. Santosh R. P.', 'Professor & Head', 'Ph.D in VLSI Design', '17+ Years', 'Electronics is the backbone of all computing and communication systems. From microchips to satellite telemetry, we prepare our ECE students to architect the hardware systems of tomorrow through dedicated research, rigorous labs, and real-world internships.', '/images/ecHod.png', 12, 5, '88%', '4.8 LPA', '9.0 LPA', 34, '["Low-Power VLSI design","5G MIMO Networks","RF Energy Harvesting"]', '["Bosch","Infosys","KPIT Technologies","TCS","Cognizant"]'),
('eee', 'Electrical & Electronics Engineering', 'EEE', 2010, 30, '4 Years', 'Prof. Kiran K.', 'Associate Professor & Head', 'M.Tech, pursuing Ph.D', '12+ Years', 'Welcome to EEE. Our curriculum focuses on sustainable green energy, smart grid designs, power electronics, and electric vehicle systems. We bridge traditional electrical engineering concepts with modern computerized power grids.', '/images/eeHod.png', 8, 4, '85%', '4.5 LPA', '7.5 LPA', 18, '["Smart Microgrids","EV Battery Management Systems","Renewable Energy Integration"]', '["L&T","Schneider Electric","TCS","Wipro","Exide Batteries"]'),
('mba', 'Master of Business Administration', 'MBA', 2013, 60, '2 Years (PG)', 'Dr. Vinay Kumar', 'Professor & Head', 'Ph.D in Management', '16+ Years', 'Welcome to the MBA Department. We offer specializations in Finance, Marketing, and Human Resource Management. Our dynamic curriculum utilizes case studies, business simulations, and regular corporate lectures to convert students into industry-ready managers.', '/images/mbaHod.png', 8, 2, '90%', '5.5 LPA', '9.6 LPA', 42, '[\"Consumer Buying Behavior in Rural Markets\",\"FinTech adaptations\",\"Employee Retention Strategies\"]', '[\"ICICI Bank\",\"HDFC Mutual Funds\",\"Jaro Education\",\"Asian Paints\",\"Airtel\"]'),
('mca', 'Master of Computer Applications', 'MCA', 2022, 60, '2 Years (PG)', 'Dr. Preeti Patil', 'Associate Professor & Head', 'Ph.D in Computer Applications', '13+ Years', 'Our MCA course is tailored for students aiming to master software application design. With rapid progress in web services, mobile app development, and cloud databases, we provide high-intensity coding curricula and mandatory industry projects.', '/images/mcaHod.png', 7, 2, '94%', '5.4 LPA', '10.0 LPA', 38, '[\"Mobile Edge Computing\",\"Natural Language Interfaces\",\"Semantic Web\"]', '[\"Cognizant\",\"Capgemini\",\"IBM\",\"Wipro\",\"Qspiders\"]'),
('me', 'Mechanical Engineering', 'ME', 2010, 30, '4 Years', 'Dr. G. B. Patil', 'Professor & Head', 'Ph.D in Thermal Engineering', '20+ Years', 'Mechanical Engineering at AGMRCET focuses on core concepts like design, thermodynamics, material sciences, and CAD/CAM modeling, and integrates them with modern robotics, automation, and 3D printing methodologies.', '/images/meHod.png', 9, 6, '82%', '4.2 LPA', '7.0 LPA', 20, '[\"Bio-fuels & Emissions Reduction\",\"Composite Materials Analysis\",\"Computational Fluid Dynamics (CFD)\"]', '[\"Toyota Kirloskar\",\"TATA Motors\",\"Mahindra & Mahindra\",\"Quest Global\",\"Infosys\"]');

-- Table structure for table `faculty`
DROP TABLE IF EXISTS `faculty`;
CREATE TABLE `faculty` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `qualification` varchar(100) NOT NULL,
  `experience` varchar(50) NOT NULL,
  `researchArea` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `department_id` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `faculty_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table `faculty`
INSERT INTO `faculty` (`id`, `name`, `designation`, `qualification`, `experience`, `researchArea`, `email`, `image`, `department_id`) VALUES
(1, 'Dr. S. V. Shiragur', 'Professor & Head', 'Ph.D in CSE', '18 Years', 'Wireless Networks & Distributed Systems', 'hod.cse@agmrcet.ac.in', '/images/csHod.png', 'cse'),
(2, 'Prof. Ramesh G. B.', 'Assistant Professor', 'M.Tech in CSE', '12 Years', 'Data Mining & Big Data Analytics', 'ramesh.gb@agmrcet.ac.in', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80', 'cse'),
(3, 'Prof. Geeta Patil', 'Assistant Professor', 'M.Tech in Software Engineering', '8 Years', 'Internet of Things (IoT)', 'geeta.patil@agmrcet.ac.in', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80', 'cse'),
(4, 'Dr. Mahesh M. G.', 'Professor & Head', 'Ph.D in Machine Learning', '15 Years', 'Deep Learning & Natural Language Processing', 'hod.aiml@agmrcet.ac.in', '/images/aimlhod.png', 'cse-aiml'),
(5, 'Prof. Vinayak Hullur', 'Assistant Professor', 'M.Tech in AI', '7 Years', 'Computer Vision & Reinforcement Learning', 'vinayak.h@agmrcet.ac.in', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', 'cse-aiml'),
(6, 'Prof. Shruti Patil', 'Assistant Professor & Head', 'M.Tech in CSE', '10 Years', 'Human Computer Interaction, UI/UX Design', 'hod.csd@agmrcet.ac.in', '/images/csdHod.png', 'csd'),
(7, 'Prof. Anand Shettar', 'Assistant Professor', 'M.Des (IIT-B), M.Tech', '6 Years', 'Web Technologies & Creative Interaction Design', 'anand.s@agmrcet.ac.in', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80', 'csd'),
(8, 'Dr. Santosh R. P.', 'Professor & Head', 'Ph.D in VLSI Design', '17 Years', 'Micro-electronics & VLSI Signal Processing', 'hod.ece@agmrcet.ac.in', '/images/ecHod.png', 'ece'),
(9, 'Prof. Savitha M.', 'Associate Professor', 'M.Tech in Digital Communication', '11 Years', 'Antenna Design & Wireless Transceivers', 'savitha.m@agmrcet.ac.in', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80', 'ece'),
(10, 'Prof. Kiran K.', 'Associate Professor & Head', 'M.Tech, (Ph.D)', '12 Years', 'Electric Vehicle Powertrains & Battery Tech', 'hod.eee@agmrcet.ac.in', '/images/eeHod.png', 'eee'),
(11, 'Prof. Jagadish P.', 'Assistant Professor', 'M.Tech in Power Systems', '9 Years', 'Smart Grids & Renewable Micro-grids', 'jagadish.p@agmrcet.ac.in', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80', 'eee'),
(12, 'Dr. G. B. Patil', 'Professor & Head', 'Ph.D in Thermal Eng.', '20 Years', 'Fluid Dynamics & Non-Conventional Bio-Fuels', 'hod.me@agmrcet.ac.in', 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=300&q=80', 'me'),
(13, 'Prof. Shivanand S.', 'Assistant Professor', 'M.Tech in Machine Design', '11 Years', 'CAD/CAM Analysis, Finite Element Methods', 'shivanand.s@agmrcet.ac.in', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80', 'me'),
(14, 'Prof. S. R. Patil', 'Associate Professor & Head', 'M.Tech in Structural Engineering', '14 Years', 'Sustainable Construction Materials & Earthquake Eng.', 'hod.civil@agmrcet.ac.in', '/images/Civilhod.png', 'ce'),
(15, 'Prof. Ravi Kulkarni', 'Assistant Professor', 'M.Tech in Geotechnical Eng.', '8 Years', 'Soil Mechanics & Foundation Engineering', 'ravi.k@agmrcet.ac.in', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80', 'ce'),
(16, 'Dr. Vinay Kumar', 'Professor & Head', 'Ph.D in Management', '16 Years', 'Financial Inclusion & Rural Consumer Behavior', 'hod.mba@agmrcet.ac.in', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80', 'mba'),
(17, 'Dr. Laxmi Joshi', 'Associate Professor', 'Ph.D in HR Management', '12 Years', 'Organizational Behavior & Corporate Training', 'laxmi.j@agmrcet.ac.in', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80', 'mba'),
(18, 'Dr. Preeti Patil', 'Associate Professor & Head', 'Ph.D in Computer Applications', '13 Years', 'Software Architectures & Cloud Computing', 'hod.mca@agmrcet.ac.in', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80', 'mca'),
(19, 'Prof. Satish G.', 'Assistant Professor', 'MCA, M.Tech in CSE', '10 Years', 'Mobile App Development, Web Services', 'satish.g@agmrcet.ac.in', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80', 'mca');

-- Table structure for table `inquiries`
DROP TABLE IF EXISTS `inquiries`;
CREATE TABLE `inquiries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `course` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table `inquiries`
-- No data to dump

-- Table structure for table `news`
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(50) NOT NULL,
  `date` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table `news`
INSERT INTO `news` (`id`, `category`, `date`, `title`, `content`) VALUES
(1, 'admissions', '2026-07-10', 'Admissions Open for academic year 2026-27', 'Applications are invited for admissions into B.E., MBA, and MCA courses for the academic year 2026-27. Candidates can submit inquiries online or visit the campus.'),
(2, 'placement', '2026-06-28', 'AGMRCET Placements 2025 crosses 90% Milestone', 'Over 120 students placed in top recruiting companies like Capgemini, TCS, Wipro, and Infosys. Highest package secured is 12 LPA for Computer Science & Engineering department.'),
(3, 'event', '2026-07-05', 'Annual Tech Fest \"Agratha 2026\" Scheduled in August', 'Our flagship college national-level event, Agratha 2026, is scheduled from August 12 to 14. Registration for technical papers, hackathons, and sports tournaments begins next week.'),
(4, 'circular', '2026-07-12', 'VTU Semester End Exam Timetable Released', 'The official timetable for VTU Even Semester examinations (July-August 2026) has been updated in the portal. Students can download the schedules in the portal section.'),
(5, 'achievement', '2026-07-01', 'Research Project Grant approved by KSCST for ECE Department', 'Karnataka State Council for Science and Technology (KSCST) has approved a funding grant of Rs. 45,000 for the project \"Landslide and Flash-Flood Warning Network using LoRa technology\" submitted by ECE students under Dr. Santosh R. P.'),
(6, 'circular', '2026-07-08', 'Academic Calendar for Odd Semester 2026-27 Announced', 'Classes for the odd semester (III, V, VII Sem B.E.) will resume from September 1, 2026. The full academic calendar is available for download in PDF format on the student portal.');

SET FOREIGN_KEY_CHECKS=1;
