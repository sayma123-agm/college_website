const express = require('express');
const router = express.Router();
const departmentModel = require('../models/departmentModel');

router.get('/sitemap.xml', async (req, res) => {
    const baseUrl = process.env.BASE_URL || 'https://www.agmrcet.ac.in';
    const staticPages = [
        '/',
        '/about',
        '/founder-message',
        '/president-message',
        '/principal-message',
        '/vision-mission',
        '/governing-council',
        '/admissions',
        '/placements',
        '/alumni',
        '/campus-life',
        '/library',
        '/facilities',
        '/research',
        '/faculty',
        '/gallery',
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
        '/downloads'
    ];

    let deptPages = [];
    try {
        const depts = await departmentModel.getAllDepartments();
        deptPages = depts.map(d => `/departments/${d.id}`);
    } catch (e) {
        deptPages = [
            '/departments/cse',
            '/departments/cse-aiml',
            '/departments/csd',
            '/departments/ece',
            '/departments/eee',
            '/departments/me',
            '/departments/ce',
            '/departments/bsh',
            '/departments/mba',
            '/departments/mca'
        ];
    }

    const allUrls = [...staticPages, ...deptPages];
    const currentDate = new Date().toISOString().split('T')[0];

    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${url === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${url === '/' ? '1.0' : url.startsWith('/departments') ? '0.9' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xmlContent);
});

router.get('/robots.txt', (req, res) => {
    const baseUrl = process.env.BASE_URL || 'https://www.agmrcet.ac.in';
    const robotsContent = `User-agent: *
Allow: /

Disallow: /admin/
Disallow: /api/
Disallow: /portal/

Sitemap: ${baseUrl}/sitemap.xml
`;
    res.header('Content-Type', 'text/plain');
    res.send(robotsContent);
});

module.exports = router;
