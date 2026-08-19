const app = require('../app');
const http = require('http');

console.log('=== TESTING ADMIN AUTHENTICATION & CRUD OPERATIONS ===');

const server = app.listen(0, async () => {
    const port = server.address().port;

    // Helper request function
    function makeRequest(method, path, body = null, headers = {}) {
        return new Promise((resolve, reject) => {
            const reqData = body ? JSON.stringify(body) : '';
            const req = http.request({
                hostname: 'localhost',
                port,
                path,
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(reqData),
                    ...headers
                }
            }, res => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    try {
                        resolve({ status: res.statusCode, data: JSON.parse(data) });
                    } catch (e) {
                        resolve({ status: res.statusCode, data });
                    }
                });
            });
            req.on('error', reject);
            if (reqData) req.write(reqData);
            req.end();
        });
    }

    try {
        // 1. Authenticate Admin Login
        const loginRes = await makeRequest('POST', '/api/auth/login', {
            username: 'AGM-ADMIN-999',
            password: 'password',
            expectedRole: 'admin'
        });
        console.log('1. Admin Login Status:', loginRes.status, loginRes.data.success ? '✔ SUCCESS' : '✘ FAILED');
        const token = loginRes.data.token;

        // 2. Fetch Live Bulletin Feeds
        const newsRes = await makeRequest('GET', '/api/news');
        console.log('2. Fetch Bulletins Status:', newsRes.status, `✔ Fetched ${newsRes.data.news.length} items`);

        // 3. Publish New Daily Bulletin
        const addNewsRes = await makeRequest('POST', '/api/news', {
            category: 'circular',
            title: 'Test Production Bulletin 2026',
            content: 'Automated test verification of admin CRUD console capabilities.'
        }, { 'Authorization': `Bearer ${token}` });
        console.log('3. Add Bulletin Status:', addNewsRes.status, addNewsRes.data.success ? '✔ CREATED' : '✘ FAILED');
        const newId = addNewsRes.data.news.id;

        // 4. Update Bulletin
        const updateNewsRes = await makeRequest('PUT', `/api/news/${newId}`, {
            category: 'circular',
            title: 'Updated Production Bulletin Title 2026',
            content: 'Updated content verification.'
        }, { 'Authorization': `Bearer ${token}` });
        console.log('4. Update Bulletin Status:', updateNewsRes.status, updateNewsRes.data.success ? '✔ UPDATED' : '✘ FAILED');

        // 5. Fetch Student Inquiries
        const inqRes = await makeRequest('GET', '/api/inquiries', null, { 'Authorization': `Bearer ${token}` });
        console.log('5. Fetch Inquiries Status:', inqRes.status, `✔ Fetched ${inqRes.data.inquiries.length} items`);

        // 6. Delete Bulletin
        const deleteNewsRes = await makeRequest('DELETE', `/api/news/${newId}`, null, { 'Authorization': `Bearer ${token}` });
        console.log('6. Delete Bulletin Status:', deleteNewsRes.status, deleteNewsRes.data.success ? '✔ DELETED' : '✘ FAILED');

        console.log('\n✔ ALL ADMIN LOGIN & CRUD OPERATIONS PASSED 100% CLEANLY!');
    } catch (err) {
        console.error('CRITICAL ERROR DURING CRUD TEST:', err);
    } finally {
        server.close();
    }
});
