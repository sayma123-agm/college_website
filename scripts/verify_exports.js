const pagesController = require('../src/controllers/pagesController');
const departmentController = require('../src/controllers/departmentController');

const requiredPagesHandlers = [
    'renderHome', 'renderAbout', 'renderFounderMessage', 'renderPresidentMessage',
    'renderPrincipalMessage', 'renderVisionMission', 'renderGoverningCouncil',
    'renderAdmissions', 'renderPlacements', 'renderAlumni', 'renderCampusLife',
    'renderLibrary', 'renderFacilities', 'renderResearch', 'renderFaculty',
    'renderPortal', 'renderPortalRole', 'renderGallery', 'renderContact',
    'renderNews', 'renderFeedback', 'renderIQAC', 'renderNAAC', 'renderNIRF',
    'renderGrievance', 'renderNSS', 'renderIEEE', 'renderAcademics',
    'renderAcademicCalendar', 'renderCodeOfConduct', 'renderPrivacyPolicy',
    'renderTermsOfUse', 'renderSitemapPage', 'renderLearningOutcomes',
    'renderBestPractices', 'renderInstitutionalDistinctiveness', 'renderDownloads',
    'handleInquiry', 'handleLogin', 'verifyAuthToken', 'getAcademicCalendarAPI',
    'addAcademicCalendarAPI', 'deleteAcademicCalendarAPI', 'getNewsJSON',
    'addNews', 'deleteNews', 'updateNews', 'getInquiries', 'deleteInquiry',
    'getPosters', 'savePosters', 'getStudentProfileAPI', 'getAnnouncementsAPI',
    'createAnnouncementAPI', 'getAttendanceAPI', 'updateAttendanceAPI',
    'getMarksAPI', 'updateMarksAPI', 'getGatepassesAPI', 'createGatepassAPI',
    'updateGatepassStatusAPI', 'getElectivesAPI', 'createElectiveAPI',
    'approveElectiveAPI', 'getComplaintsAPI', 'createComplaintAPI',
    'getFeeRecordAPI', 'updateFeeRecordAPI', 'getUsersAPI', 'createPortalUserAPI',
    'updateUserAPI', 'deleteUserAPI', 'deleteGatepassAPI', 'deleteElectiveAPI',
    'deleteComplaintAPI', 'deleteAnnouncementAPI'
];

let missingCount = 0;
for (const handler of requiredPagesHandlers) {
    if (typeof pagesController[handler] !== 'function') {
        console.error(`MISSING HANDLER in pagesController: ${handler}`);
        missingCount++;
    }
}

if (typeof departmentController.renderDepartment !== 'function') {
    console.error('MISSING HANDLER in departmentController: renderDepartment');
    missingCount++;
}

if (missingCount === 0) {
    console.log(`✔ SUCCESS: All ${requiredPagesHandlers.length + 1} controller route handlers are verified!`);
} else {
    console.error(`FAILURE: ${missingCount} handlers are missing!`);
    process.exit(1);
}
