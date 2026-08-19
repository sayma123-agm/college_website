const fs = require('fs');
const path = require('path');

const hbsContent = fs.readFileSync(path.join(__dirname, '../src/views/pages/admin-dashboard.hbs'), 'utf8');

// Extract script blocks
const scriptMatches = hbsContent.match(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi);

console.log(`Found ${scriptMatches ? scriptMatches.length : 0} script tags in admin-dashboard.hbs`);

if (scriptMatches) {
    scriptMatches.forEach((scriptTag, idx) => {
        // Strip out opening and closing script tags
        const js = scriptTag.replace(/<script[\s\S]*?>/i, '').replace(/<\/script>/i, '');
        if (!js.trim()) {
            console.log(`Script ${idx + 1}: External src script (empty body).`);
            return;
        }

        try {
            // Test parsing via Function constructor
            new Function(js);
            console.log(`✔ Script ${idx + 1} (${js.length} chars): 100% VALID JAVASCRIPT SYNTAX!`);
        } catch (err) {
            console.error(`✘ Script ${idx + 1} SYNTAX ERROR:`, err.message);
            process.exit(1);
        }
    });
}
