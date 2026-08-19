const path = require('path');
process.chdir(path.join(__dirname, '..'));

console.log('=== STARTING PRODUCTION AUDIT & BUILD VALIDATION ===');
try {
    require('./test_build');
    console.log('SUCCESS: All app modules, routes, 301 redirects, and PDF files validated.');
} catch (err) {
    console.error('FAILURE:', err);
    process.exit(1);
}
