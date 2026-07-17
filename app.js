require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Setup Handlebars View Engine
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'src/views/layouts'),
    partialsDir: path.join(__dirname, 'src/views/partials'),
    helpers: {
        eq: (a, b) => a === b,
        json: (context) => JSON.stringify(context)
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views/pages'));

// Middleware
app.use(require('compression')());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Copy custom logo to public assets on startup
const fs = require('fs');
const customLogoPath = 'C:\\Users\\LENOVO\\.gemini\\antigravity\\brain\\3a7a743d-6218-4ce4-8e38-a974477b5c8f\\media__1784182761663.png';
const publicImagesDir = path.join(__dirname, 'src', 'public', 'images');
const publicLogoPath = path.join(publicImagesDir, 'logo.png');

try {
    if (!fs.existsSync(publicImagesDir)) {
        fs.mkdirSync(publicImagesDir, { recursive: true });
    }
    if (fs.existsSync(customLogoPath)) {
        fs.copyFileSync(customLogoPath, publicLogoPath);
        console.log('Custom logo successfully copied to public assets.');
    }
} catch (err) {
    console.error('Error copying custom logo:', err);
}

// Serve static assets with a max-age cache header to reduce server load
app.use(express.static(path.join(__dirname, 'src', 'public'), {
    maxAge: '1d',
    etag: true
}));

// Mount Router
const routes = require('./src/routes');
app.use('/', routes);

// 404 Route handler
app.use((req, res, next) => {
    res.status(404).render('error', {
        title: '404 - Page Not Found | AGMRCET',
        message: 'The page you are looking for does not exist or has been moved.'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        title: '500 - Server Error | AGMRCET',
        message: 'An internal server error occurred. Our technical team has been notified.'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});