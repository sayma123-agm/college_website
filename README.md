# AGMRCET — Production Engineering College Website

Official production repository for **A.G.M. Rural College of Engineering & Technology (AGMRCET)**, Varur, Hubballi, Karnataka.

## 🚀 Technical Stack
* **Framework**: Node.js with Express.js (`v5.2.1`)
* **View Engine**: Express Handlebars (`v8.0.2`)
* **Database**: MySQL2 with in-memory dynamic model fallback for serverless Vercel execution
* **Styling**: Bootstrap 5.3.3, Tailwind CSS, FontAwesome 6, Bootstrap Icons, AOS (Animate on Scroll)
* **Deployment**: Vercel Serverless Function (`@vercel/node`)

---

## 📌 Institutional Codes & Affiliations
* **CET Code**: `E199`
* **COMEDK Code**: `E208`
* **MBA Code**: `B401`
* **MCA Code**: `C620`
* **Affiliations**: Approved by AICTE, Affiliated to VTU Belagavi, Recognized under UGC 2(f), SDM Jainmatt Trust Initiative

---

## 📂 Key Architecture Directories

```
college_website/
├── app.js                   # Express App Entry & Security Headers
├── vercel.json              # Vercel Serverless Deployment Config
├── redirects-map.json       # Legacy 301 Redirect Mapping Table
├── docs/
│   └── MIGRATION.md         # Full Audit, Migration & Cutover Documentation
├── scripts/
│   └── generate_docs.js     # PDF Document Initializer
└── src/
    ├── config/
    │   └── db.js            # MySQL Pool Connection & Failover Handler
    ├── controllers/         # Page & API Controllers
    ├── models/              # Department, Faculty, News & Portal Data Models
    ├── public/
    │   ├── docs/            # PDF Repository (MD.pdf, coe.pdf, etc.)
    │   ├── css/             # Custom Stylesheets
    │   └── images/          # Campus Assets
    ├── routes/
    │   ├── index.js         # Primary Application Routes
    │   ├── redirects.js     # Legacy 301 Redirect Middleware
    │   └── seo.js           # Dynamic Sitemap & Robots.txt Routes
    └── views/
        ├── layouts/         # Main Handlebars Layout
        ├── pages/           # Template Views
        └── partials/        # Navbar, Footer & Modals
```

---

## ⚙️ Environment Configuration (`.env.example`)

```env
PORT=3000
NODE_ENV=production
BASE_URL=https://www.agmrcet.ac.in

# Database Configuration (Optional for Vercel Serverless)
DB_HOST=localhost
DB_USER=root
DB_PASS=0000
DB_NAME=agmrcet_db

# Security & Services
JWT_SECRET=your_jwt_secret_key
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_app_password
```

---

## 🛠️ Local Development & Build Commands

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Production Start**:
   ```bash
   npm start
   ```

---

## 🔍 Validation & Quality Assurance

* **301 Legacy Redirects**: Any request to `.php` URLs (e.g., `/about.php`, `/cs.php`, `/placement.php`) automatically redirects to new clean URLs (`/about`, `/departments/cse`, `/placements`).
* **Dynamic Sitemap**: Dynamic XML sitemap accessible at `/sitemap.xml`.
* **Robots.txt**: Crawl rules accessible at `/robots.txt`.
* **Official Downloads**: Centralized repository at `/downloads` and static documents served at `/docs/*.pdf`.
