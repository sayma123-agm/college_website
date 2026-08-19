const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pagesController');
const departmentController = require('../controllers/departmentController');

// Page Routes
router.get('/', pagesController.renderHome);
router.get('/about', pagesController.renderAbout);
router.get('/founder-message', pagesController.renderFounderMessage);
router.get('/president-message', pagesController.renderPresidentMessage);
router.get('/principal-message', pagesController.renderPrincipalMessage);
router.get('/vision-mission', pagesController.renderVisionMission);
router.get('/governing-council', pagesController.renderGoverningCouncil);
router.get('/admissions', pagesController.renderAdmissions);
router.get('/placements', pagesController.renderPlacements);
router.get('/alumni', pagesController.renderAlumni);
router.get('/campus-life', pagesController.renderCampusLife);
router.get('/library', pagesController.renderLibrary);
router.get('/facilities', pagesController.renderFacilities);
router.get('/research', pagesController.renderResearch);
router.get('/faculty', pagesController.renderFaculty);
router.get('/portal', pagesController.renderPortal);
router.get('/portal/:role', pagesController.renderPortalRole);
router.get('/admin/login', (req, res) => {
    res.render('admin-login', { title: 'Advertisement Login | AGMRCET' });
});
router.get('/admin/dashboard', (req, res) => {
    res.render('admin-dashboard', { layout: false, title: 'Media Admin Dashboard | AGMRCET' });
});
router.get('/gallery', pagesController.renderGallery);
router.get('/contact', pagesController.renderContact);
router.get('/news', pagesController.renderNews);
router.get('/feedback', pagesController.renderFeedback);
router.get('/iqac', pagesController.renderIQAC);
router.get('/naac', pagesController.renderNAAC);
router.get('/nirf', pagesController.renderNIRF);
router.get('/grievance', pagesController.renderGrievance);
router.get('/nss', pagesController.renderNSS);
router.get('/ieee', pagesController.renderIEEE);
router.get('/academics', pagesController.renderAcademics);
router.get('/code-of-conduct', pagesController.renderCodeOfConduct);
router.get('/learning-outcomes', pagesController.renderLearningOutcomes);
router.get('/best-practices', pagesController.renderBestPractices);
router.get('/institutional-distinctiveness', pagesController.renderInstitutionalDistinctiveness);
router.get('/downloads', pagesController.renderDownloads);

// Dynamic Department Routes
router.get('/departments/:dept', departmentController.renderDepartment);

// API Endpoints
router.post('/api/inquiry', pagesController.handleInquiry);
router.post('/api/auth/login', pagesController.handleLogin);
router.get('/api/auth/verify', pagesController.verifyAuthToken);
router.get('/api/news', pagesController.getNewsJSON);
router.post('/api/news', pagesController.addNews);
router.delete('/api/news/:id', pagesController.deleteNews);
router.put('/api/news/:id', pagesController.updateNews);
router.get('/api/inquiries', pagesController.getInquiries);
router.delete('/api/inquiries/:id', pagesController.deleteInquiry);
router.get('/api/posters', pagesController.getPosters);
router.post('/api/posters', pagesController.savePosters);

// Real-Time Inter-Connected ERP Endpoints
router.get('/api/portal/profile', pagesController.getStudentProfileAPI);
router.get('/api/portal/announcements', pagesController.getAnnouncementsAPI);
router.post('/api/portal/announcements', pagesController.createAnnouncementAPI);
router.get('/api/portal/attendance', pagesController.getAttendanceAPI);
router.post('/api/portal/attendance', pagesController.updateAttendanceAPI);
router.get('/api/portal/marks', pagesController.getMarksAPI);
router.post('/api/portal/marks', pagesController.updateMarksAPI);
router.get('/api/portal/gatepasses', pagesController.getGatepassesAPI);
router.post('/api/portal/gatepasses', pagesController.createGatepassAPI);
router.patch('/api/portal/gatepasses', pagesController.updateGatepassStatusAPI);
router.get('/api/portal/electives', pagesController.getElectivesAPI);
router.post('/api/portal/electives', pagesController.createElectiveAPI);
router.patch('/api/portal/electives', pagesController.approveElectiveAPI);
router.get('/api/portal/complaints', pagesController.getComplaintsAPI);
router.post('/api/portal/complaints', pagesController.createComplaintAPI);
router.get('/api/portal/fees', pagesController.getFeeRecordAPI);
router.post('/api/portal/fees', pagesController.updateFeeRecordAPI);
router.get('/api/portal/users', pagesController.getUsersAPI);
router.post('/api/portal/users', pagesController.createPortalUserAPI);
router.put('/api/portal/users/:id', pagesController.updateUserAPI);
router.delete('/api/portal/users/:id', pagesController.deleteUserAPI);

router.delete('/api/portal/gatepasses/:id', pagesController.deleteGatepassAPI);
router.delete('/api/portal/electives/:id', pagesController.deleteElectiveAPI);
router.delete('/api/portal/complaints/:id', pagesController.deleteComplaintAPI);
router.delete('/api/portal/announcements/:id', pagesController.deleteAnnouncementAPI);

module.exports = router;
