const path = require('path');
process.chdir(path.join(__dirname, '..'));

try {
    console.log('Loading pagesController...');
    const pagesController = require('../src/controllers/pagesController');
    console.log('✔ pagesController loaded successfully.');

    console.log('Loading routes...');
    const routes = require('../src/routes/index');
    console.log('✔ routes loaded successfully.');

    console.log('Loading app...');
    // test requiring app components
    require('../src/models/newsModel');
    require('../src/models/departmentModel');
    require('../src/models/academicCalendarModel');
    console.log('✔ All models & controllers verified without syntax errors!');
} catch (err) {
    console.error('✘ VERIFICATION FAILED:', err);
    process.exit(1);
}
