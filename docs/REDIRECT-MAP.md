# AGMRCET — Legacy 301 URL Redirect Mapping Documentation

To preserve search engine rank, indexation, and backlinks from the legacy PHP website (`https://www.agmrcet.ac.in/`), the application uses an Express redirect middleware ([`src/routes/redirects.js`](file:///d:/Project/college_website/src/routes/redirects.js)) paired with a JSON mapping table ([`redirects-map.json`](file:///d:/Project/college_website/redirects-map.json)).

---

## 1. Technical Execution
When any HTTP request arrives ending in `.php` or matching a legacy URL path, the middleware intercepts the request before static assets or dynamic page controllers process it and returns a `301 Permanent Redirect` pointing to the corresponding clean URL.

```js
const redirectsMap = require('../../redirects-map.json');

module.exports = function redirectMiddleware(req, res, next) {
    const path = req.path.toLowerCase();
    if (redirectsMap[path]) {
        return res.redirect(301, redirectsMap[path]);
    }
    if (path.endsWith('.php')) {
        const cleanPath = path.slice(0, -4);
        if (cleanPath === '/index') return res.redirect(301, '/');
        return res.redirect(301, cleanPath);
    }
    next();
};
```

---

## 2. Complete Mapping Inventory

| Legacy `.php` Path | Target Clean Path | Redirect Type | Status |
|---|---|---|---|
| `/index.php` | `/` | 301 Permanent | Active |
| `/about.php` | `/about` | 301 Permanent | Active |
| `/admission.php` | `/admissions` | 301 Permanent | Active |
| `/academic.php` | `/academics` | 301 Permanent | Active |
| `/placement.php` | `/placements` | 301 Permanent | Active |
| `/facilities.php` | `/facilities` | 301 Permanent | Active |
| `/life.php` | `/campus-life` | 301 Permanent | Active |
| `/contact.php` | `/contact` | 301 Permanent | Active |
| `/cs.php` | `/departments/cse` | 301 Permanent | Active |
| `/aiml.php` | `/departments/cse-aiml` | 301 Permanent | Active |
| `/csd.php` | `/departments/csd` | 301 Permanent | Active |
| `/ce.php` | `/departments/ce` | 301 Permanent | Active |
| `/ec.php` | `/departments/ece` | 301 Permanent | Active |
| `/ee.php` | `/departments/eee` | 301 Permanent | Active |
| `/me.php` | `/departments/me` | 301 Permanent | Active |
| `/bsh.php` | `/departments/bsh` | 301 Permanent | Active |
| `/mba.php` | `/departments/mba` | 301 Permanent | Active |
| `/mca.php` | `/departments/mca` | 301 Permanent | Active |
| `/feedback.php` | `/feedback` | 301 Permanent | Active |
| `/iqac.php` | `/iqac` | 301 Permanent | Active |
| `/naac.php` | `/naac` | 301 Permanent | Active |
| `/nirf.php` | `/nirf` | 301 Permanent | Active |
| `/grievance.php` | `/grievance` | 301 Permanent | Active |
| `/nss.php` | `/nss` | 301 Permanent | Active |
| `/ieee.php` | `/ieee` | 301 Permanent | Active |
| `/alumni.php` | `/alumni` | 301 Permanent | Active |
| `/agratha.php` | `/gallery` | 301 Permanent | Active |
| `/awards.php` | `/gallery` | 301 Permanent | Active |
| `/media.php` | `/gallery` | 301 Permanent | Active |
| `/events.php` | `/news` | 301 Permanent | Active |
| `/governing_council.php` | `/governing-council` | 301 Permanent | Active |
| `/code_of_conduct.php` | `/code-of-conduct` | 301 Permanent | Active |
| `/learning_outcomes.php` | `/learning-outcomes` | 301 Permanent | Active |
| `/best_practices.php` | `/best-practices` | 301 Permanent | Active |
| `/institutional_distinctiveness.php` | `/institutional-distinctiveness` | 301 Permanent | Active |
| `/privacy_policy.php` | `/about` | 301 Permanent | Active |
| `/grevi.php` | `/feedback` | 301 Permanent | Active |
| `/adv.php` | `/news` | 301 Permanent | Active |
| `/acadfaci.php` | `/facilities` | 301 Permanent | Active |
| `/itfaci.php` | `/facilities` | 301 Permanent | Active |
| `/library.php` | `/library` | 301 Permanent | Active |
| `/hostel.php` | `/facilities` | 301 Permanent | Active |
| `/hostels.php` | `/facilities` | 301 Permanent | Active |
