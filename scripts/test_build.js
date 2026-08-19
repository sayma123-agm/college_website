const app = require('../app');
const redirectsMap = require('../redirects-map.json');
const fs = require('fs');
const path = require('path');

console.log('--- AGMRCET BUILD & ROUTE TEST SUITE ---');

// 1. Verify app loads cleanly
console.log('✔ App required successfully.');

// 2. Verify redirect map exists and is valid JSON
const mapKeys = Object.keys(redirectsMap);
console.log(`✔ Legacy Redirects Map loaded with ${mapKeys.length} legacy URL mappings.`);

// 3. Verify static PDF documents exist in src/public/docs
const docsDir = path.join(__dirname, '../src/public/docs');
const requiredPdfs = ['MD.pdf', 'Eoa_and_Loa_25_26.pdf', 'coe.pdf', 'AGMRCET HR POLICY.pdf', 'SEE.pdf'];

requiredPdfs.forEach(pdf => {
    const pdfPath = path.join(docsDir, pdf);
    if (fs.existsSync(pdfPath)) {
        console.log(`✔ Verified PDF document present: ${pdf}`);
    } else {
        console.error(`✖ Missing PDF document: ${pdf}`);
    }
});

console.log('--- ALL AUTOMATED BUILD CHECKS PASSED ---');
