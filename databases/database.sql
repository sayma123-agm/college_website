-- Database Initialization Script for AGMRCET University
-- Creates core tables mapping clean MVC layers to MySQL storage

CREATE TABLE IF NOT EXISTS departments (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    shortName VARCHAR(20) NOT NULL,
    established INT NOT NULL,
    intake INT NOT NULL,
    duration VARCHAR(30) NOT NULL,
    
    -- HOD profile details
    hodName VARCHAR(100) NOT NULL,
    hodDesignation VARCHAR(100) NOT NULL,
    hodQualification VARCHAR(100) NOT NULL,
    hodExperience VARCHAR(50) NOT NULL,
    hodMessage TEXT NOT NULL,
    hodPhoto VARCHAR(255) NOT NULL,
    
    -- Department metrics
    statsFaculty INT NOT NULL,
    statsLabs INT NOT NULL,
    statsPlacementRate VARCHAR(20) NOT NULL,
    statsAvgPackage VARCHAR(20) NOT NULL,
    
    -- Placements summary
    placementHighestPackage VARCHAR(20) NOT NULL,
    placementRecentOffers INT NOT NULL,
    
    -- Serialized text list fields (JSON or text tokens)
    researchAreas TEXT NOT NULL,
    topRecruiters TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS department_labs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_id VARCHAR(50) NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS department_achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_id VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    details TEXT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS department_projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    funding VARCHAR(150) NOT NULL,
    amount VARCHAR(50) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS faculty (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    qualification VARCHAR(100) NOT NULL,
    experience VARCHAR(50) NOT NULL,
    researchArea VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    image VARCHAR(255) NOT NULL,
    department_id VARCHAR(50) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    date VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    course VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    name VARCHAR(150) NOT NULL
);
