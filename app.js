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

// Copy custom logo, admission banner, principal, president, and founder images to public assets on startup
const fs = require('fs');
const customLogoPath = 'C:\\Users\\LENOVO\\.gemini\\antigravity\\brain\\3a7a743d-6218-4ce4-8e38-a974477b5c8f\\media__1784182761663.png';
const customBannerPath = 'C:\\Users\\LENOVO\\.gemini\\antigravity\\brain\\d3a51f2c-b048-49cd-a94a-0be80f4b1f6e\\media__1784523715907.png';
const customPrincipalPath = 'C:\\Users\\LENOVO\\.gemini\\antigravity\\brain\\d3a51f2c-b048-49cd-a94a-0be80f4b1f6e\\media__1784524385142.jpg';
const customPresidentPath = 'C:\\Users\\LENOVO\\.gemini\\antigravity\\brain\\d3a51f2c-b048-49cd-a94a-0be80f4b1f6e\\media__1784524404284.jpg';
const customFounderPath = 'C:\\Users\\LENOVO\\.gemini\\antigravity\\brain\\d3a51f2c-b048-49cd-a94a-0be80f4b1f6e\\media__1784524425328.png';

const publicImagesDir = path.join(__dirname, 'src', 'public', 'images');
const publicLogoPath = path.join(publicImagesDir, 'logo.png');
const publicBannerPath = path.join(publicImagesDir, 'admission-banner.png');
const publicPrincipalPath = path.join(publicImagesDir, 'principal.jpg');
const publicPresidentPath = path.join(publicImagesDir, 'president.jpg');
const publicFounderPath = path.join(publicImagesDir, 'founder.png');

try {
    if (!fs.existsSync(publicImagesDir)) {
        fs.mkdirSync(publicImagesDir, { recursive: true });
    }
    if (fs.existsSync(customLogoPath)) fs.copyFileSync(customLogoPath, publicLogoPath);
    if (fs.existsSync(customBannerPath)) fs.copyFileSync(customBannerPath, publicBannerPath);
    if (fs.existsSync(customPrincipalPath)) fs.copyFileSync(customPrincipalPath, publicPrincipalPath);
    if (fs.existsSync(customPresidentPath)) fs.copyFileSync(customPresidentPath, publicPresidentPath);
    if (fs.existsSync(customFounderPath)) fs.copyFileSync(customFounderPath, publicFounderPath);
} catch (err) {
    console.error('Error copying custom leadership assets:', err);
}

// Dynamic file copy & server fallback routes for leadership images
app.get('/images/admission-banner.png', (req, res, next) => {
    try {
        if (fs.existsSync(customBannerPath)) {
            if (!fs.existsSync(publicImagesDir)) fs.mkdirSync(publicImagesDir, { recursive: true });
            fs.copyFileSync(customBannerPath, publicBannerPath);
            return res.sendFile(publicBannerPath);
        } else if (fs.existsSync(publicBannerPath)) {
            return res.sendFile(publicBannerPath);
        }
    } catch(e) {}
    next();
});

app.get('/images/principal.jpg', (req, res, next) => {
    try {
        if (fs.existsSync(customPrincipalPath)) {
            if (!fs.existsSync(publicImagesDir)) fs.mkdirSync(publicImagesDir, { recursive: true });
            fs.copyFileSync(customPrincipalPath, publicPrincipalPath);
            return res.sendFile(publicPrincipalPath);
        } else if (fs.existsSync(publicPrincipalPath)) {
            return res.sendFile(publicPrincipalPath);
        }
    } catch(e) {}
    next();
});

app.get('/images/president.jpg', (req, res, next) => {
    try {
        if (fs.existsSync(customPresidentPath)) {
            if (!fs.existsSync(publicImagesDir)) fs.mkdirSync(publicImagesDir, { recursive: true });
            fs.copyFileSync(customPresidentPath, publicPresidentPath);
            return res.sendFile(publicPresidentPath);
        } else if (fs.existsSync(publicPresidentPath)) {
            return res.sendFile(publicPresidentPath);
        }
    } catch(e) {}
    next();
});

app.get('/images/founder.png', (req, res, next) => {
    try {
        if (fs.existsSync(customFounderPath)) {
            if (!fs.existsSync(publicImagesDir)) fs.mkdirSync(publicImagesDir, { recursive: true });
            fs.copyFileSync(customFounderPath, publicFounderPath);
            return res.sendFile(publicFounderPath);
        } else if (fs.existsSync(publicFounderPath)) {
            return res.sendFile(publicFounderPath);
        }
    } catch(e) {}
    next();
});

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