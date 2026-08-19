const path = require('path');
process.chdir(path.join(__dirname, '..'));

try {
    require('./debug_server');
} catch (e) {
    console.error('SERVER DEBUG EXCEPTION:', e);
}
