const path = require('path');
process.chdir(path.join(__dirname, '..'));

console.log('====================================================');
console.log('AGMRCET PRODUCTION CODEBASE AUDIT & VERIFICATION');
console.log('====================================================\n');

console.log('--- STEP 1: VERIFYING CONTROLLER EXPORTS ---');
require('./verify_exports');

console.log('\n--- STEP 2: TEMPLATE SYNTAX AUDIT ---');
require('./compile_templates');

console.log('\n--- STEP 3: AUTH & CRUD ENDPOINTS AUDIT ---');
require('./test_crud');
