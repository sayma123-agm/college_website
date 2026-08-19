const fs = require('fs');
const path = require('path');
const hbs = require('express-handlebars').create({
    helpers: {
        eq: (a, b) => a === b,
        json: (context) => JSON.stringify(context),
        formatDate: (dateStr) => dateStr,
        toLowerCase: (str) => (str || '').toLowerCase(),
        inc: (value) => parseInt(value) + 1
    }
});

function findHbsFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(findHbsFiles(filePath));
        } else if (file.endsWith('.hbs')) {
            results.push(filePath);
        }
    });
    return results;
}

const viewsDir = path.join(__dirname, '../src/views');
const hbsFiles = findHbsFiles(viewsDir);

console.log(`Found ${hbsFiles.length} Handlebars (.hbs) template files in ${viewsDir}`);

let errorCount = 0;
for (const file of hbsFiles) {
    const relPath = path.relative(viewsDir, file);
    try {
        const content = fs.readFileSync(file, 'utf8');
        // Compile template
        const template = hbs.handlebars.compile(content);
        // Render template with basic mock data
        template({
            title: 'Test',
            events: [],
            news: [],
            departments: [],
            facultyList: [],
            deptsList: [],
            dept: { id: 'cse', name: 'Computer Science', stats: {}, pos: [], psos: [], coStatements: [], eContent: [], activities: [], supportingStaff: [], labs: [], achievements: [], research: { areas: [], projects: [] }, placements: { topRecruiters: [] } }
        });
        console.log(`[PASS] ${relPath}`);
    } catch (err) {
        console.error(`[FAIL] ${relPath}: ${err.message}`);
        errorCount++;
    }
}

if (errorCount === 0) {
    console.log(`\n✔ ALL ${hbsFiles.length} HANDLEBARS TEMPLATES COMPILED & RENDERED WITH ZERO SYNTAX ERRORS!`);
} else {
    console.error(`\nFAILURE: ${errorCount} templates failed syntax compilation!`);
    process.exit(1);
}
