require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Ensure document PDFs exist in public/docs
try {
    require('./scripts/generate_docs');
} catch (e) {
    console.warn('[DOCS WARNING] Document generation skipped:', e.message);
}

// Setup Handlebars View Engine
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'src/views/layouts'),
    partialsDir: [
        path.join(__dirname, 'src/views/partials'),
        path.join(__dirname, 'src/views/dashboards')
    ],
    helpers: {
        eq: (a, b) => a === b,
        json: (context) => JSON.stringify(context)
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views/pages'));

// HTTP Security Headers Middleware
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

// Middleware
app.use(require('compression')());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Legacy 301 Redirect Middleware
const redirectMiddleware = require('./src/routes/redirects');
app.use(redirectMiddleware);

// SEO Routes (/sitemap.xml, /robots.txt)
const seoRoutes = require('./src/routes/seo');
app.use('/', seoRoutes);

// Serve static assets with a max-age cache header to reduce server load
app.use(express.static(path.join(__dirname, 'src', 'public'), {
    maxAge: '1d',
    etag: true
}));

// Mount Primary Router
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

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;