const express = require('express');
const app = require('../app');
const http = require('http');

console.log('=== STARTING DEBUG ROUTE TEST ===');

const server = app.listen(0, async () => {
    const port = server.address().port;
    console.log(`Debug server listening on port ${port}`);

    const routesToTest = [
        '/',
        '/about',
        '/academics',
        '/academic-calendar',
        '/admissions',
        '/placements',
        '/alumni',
        '/campus-life',
        '/library',
        '/facilities',
        '/research',
        '/faculty',
        '/contact',
        '/news',
        '/feedback',
        '/iqac',
        '/naac',
        '/nirf',
        '/grievance',
        '/nss',
        '/ieee',
        '/code-of-conduct',
        '/learning-outcomes',
        '/best-practices',
        '/institutional-distinctiveness',
        '/downloads',
        '/departments/cse',
        '/departments/ece',
        '/departments/eee',
        '/departments/me',
        '/departments/ce',
        '/departments/cse-aiml',
        '/departments/csd',
        '/departments/bsh',
        '/departments/mba',
        '/departments/mca',
        '/sitemap.xml',
        '/robots.txt',
        '/docs/MD.pdf',
        '/docs/coe.pdf'
    ];

    let passedCount = 0;
    let failedCount = 0;

    for (const route of routesToTest) {
        await new Promise((resolve) => {
            http.get(`http://localhost:${port}${route}`, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    if (res.statusCode >= 200 && res.statusCode < 400) {
                        console.log(`[PASS] ${route} -> Status ${res.statusCode}`);
                        passedCount++;
                    } else {
                        console.error(`[FAIL] ${route} -> Status ${res.statusCode}`);
                        console.error(`Body snippet: ${data.substring(0, 300)}`);
                        failedCount++;
                    }
                    resolve();
                });
            }).on('error', (err) => {
                console.error(`[ERROR] ${route} -> ${err.message}`);
                failedCount++;
                resolve();
            });
        });
    }

    console.log(`\n=== SUMMARY ===`);
    console.log(`Passed: ${passedCount} | Failed: ${failedCount}`);
    server.close();
    process.exit(failedCount > 0 ? 1 : 0);
});
