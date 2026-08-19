const path = require('path');
process.chdir(path.join(__dirname, '..'));

console.log('=== STEP 1: VALIDATING INLINE JS SYNTAX IN VIEWS ===');
require('./test_script_eval');

console.log('\n=== STEP 2: RUNNING APP LOADS TEST ===');
require('./verify_app_loads');

console.log('\n=== STEP 3: RUNNING COMPLETE PRODUCTION VERIFICATION SUITE ===');
require('./full_production_test');
