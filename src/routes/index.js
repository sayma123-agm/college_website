const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pagesController');
const departmentController = require('../controllers/departmentController');

// Page Routes
router.get('/', pagesController.renderHome);
router.get('/about', pagesController.renderAbout);
router.get('/admissions', pagesController.renderAdmissions);
router.get('/placements', pagesController.renderPlacements);
router.get('/campus-life', pagesController.renderCampusLife);
router.get('/research', pagesController.renderResearch);
router.get('/faculty', pagesController.renderFaculty);
router.get('/portal', pagesController.renderPortal);
router.get('/portal/:role', pagesController.renderPortalRole);
router.get('/gallery', pagesController.renderGallery);
router.get('/contact', pagesController.renderContact);
router.get('/news', pagesController.renderNews);

// Dynamic Department Routes
router.get('/departments/:dept', departmentController.renderDepartment);

// API Endpoints
router.post('/api/inquiry', pagesController.handleInquiry);
router.post('/api/auth/login', pagesController.handleLogin);
router.get('/api/auth/verify', pagesController.verifyAuthToken);
router.get('/api/news', pagesController.getNewsJSON);
router.post('/api/news', pagesController.addNews);
router.delete('/api/news/:id', pagesController.deleteNews);
router.get('/api/inquiries', pagesController.getInquiries);

module.exports = router;
