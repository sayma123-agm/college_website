const redirectsMap = require('../../redirects-map.json');

module.exports = function redirectMiddleware(req, res, next) {
    const path = req.path.toLowerCase();
    
    // Check exact match in legacy redirect map
    if (redirectsMap[path]) {
        return res.redirect(301, redirectsMap[path]);
    }
    
    // Check if path ends with .php
    if (path.endsWith('.php')) {
        const cleanPath = path.slice(0, -4);
        if (cleanPath === '/index') return res.redirect(301, '/');
        return res.redirect(301, cleanPath);
    }
    
    next();
};
