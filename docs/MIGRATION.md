# AGMRCET Website Migration & Production Readiness Guide

This document details the complete migration of the original AGMRCET website (`https://www.agmrcet.ac.in/`) to the modern Express + Handlebars production stack hosted on Vercel (`https://college-website-ochre-iota.vercel.app/`).

---

## 1. Audit Summary & Content Inventory

### Legacy Institutional Details Preserved
* **CET Code**: `E199`
* **COMEDK Code**: `E208`
* **MBA Code**: `B401`
* **MCA Code**: `C620`
* **Affiliations**: Approved by AICTE, Affiliated to VTU Belagavi, Recognized under UGC 2(f)
* **Trust**: SDM Jainmatt Trust Initiative
* **Campus Address**: Navagraha Teerth, NH4-Road Varur, Hubballi, Karnataka - 581207
* **Contact Phone**: `+91 94810 87999`, `+91 94810 85999`
* **Contact Email**: `principal@agmrcet.ac.in`

---

## 2. Legacy PDF Document Migration

All legacy documents previously located under `/docs/` on the old website have been preserved under `src/public/docs/`:

| Document Name | Legacy URL Path | New Verified Path |
|---|---|---|
| Mandatory Disclosure Statement | `/docs/MD.pdf` | `/docs/MD.pdf` |
| AICTE EoA & LoA 2025-26 | `/docs/Eoa_and_Loa_25_26.pdf` | `/docs/Eoa_and_Loa_25_26.pdf` |
| Academic Calendar of Events | `/docs/coe.pdf` | `/docs/coe.pdf` |
| HR Policy & Staff Service Rules | `/docs/AGMRCET HR POLICY.pdf` | `/docs/AGMRCET HR POLICY.pdf` |
| Semester End Examination (SEE) | `/docs/SEE.pdf` | `/docs/SEE.pdf` |

---

## 3. Legacy URL 301 Redirect Mapping (`redirects-map.json`)

To preserve SEO indexation and backlink authority, all legacy `.php` requests are intercepted by `src/routes/redirects.js` and permanently redirected (HTTP 301):

```json
{
  "/index.php": "/",
  "/about.php": "/about",
  "/admission.php": "/admissions",
  "/academic.php": "/academics",
  "/placement.php": "/placements",
  "/facilities.php": "/facilities",
  "/life.php": "/campus-life",
  "/contact.php": "/contact",
  "/cs.php": "/departments/cse",
  "/aiml.php": "/departments/cse-aiml",
  "/csd.php": "/departments/csd",
  "/ce.php": "/departments/ce",
  "/ec.php": "/departments/ece",
  "/ee.php": "/departments/eee",
  "/me.php": "/departments/me",
  "/bsh.php": "/departments/bsh",
  "/mba.php": "/departments/mba",
  "/mca.php": "/departments/mca",
  "/feedback.php": "/feedback",
  "/iqac.php": "/iqac",
  "/naac.php": "/naac",
  "/nirf.php": "/nirf",
  "/grievance.php": "/grievance",
  "/nss.php": "/nss",
  "/ieee.php": "/ieee",
  "/alumni.php": "/alumni",
  "/agratha.php": "/gallery",
  "/awards.php": "/gallery",
  "/media.php": "/gallery",
  "/events.php": "/news",
  "/governing_council.php": "/governing-council",
  "/code_of_conduct.php": "/code-of-conduct",
  "/learning_outcomes.php": "/learning-outcomes",
  "/best_practices.php": "/best-practices",
  "/institutional_distinctiveness.php": "/institutional-distinctiveness"
}
```

---

## 4. Official External System Integration

The following official external systems are directly integrated via verified links in the top ribbon and footer:

1. **ERP System**: `https://agmrgroup.dhi-edu.com`
2. **Digital Library**: `https://agmrcetlibrary.wixsite.com/agmr`
3. **Virtual Labs (MoE Initiative)**: `https://www.vlab.co.in`
4. **AICTE Online Student Feedback**: `https://www.aicte-india.org/feedback/index.php`
5. **SSP Scholarship Downloads**: `https://ssp.postmatric.karnataka.gov.in/2021/downloads.aspx`
6. **Webmail Portal**: `http://agmrcet.ac.in:2095/`

---

## 5. Dynamic SEO & Accessibility Features

* **Dynamic Sitemap**: Automatically generated at `/sitemap.xml` mapping all public pages & department dynamic routes.
* **Robots.txt**: Accessible at `/robots.txt` allowing indexing of public content while disallowing `/admin/` and `/api/`.
* **Structured Data**: Schema.org `CollegeOrUniversity` JSON-LD embedded on all pages.
* **Canonical URLs**: Automatically bound to `process.env.BASE_URL`.
* **Security Headers**: `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy` enabled.

---

## 6. Vercel Deployment & Domain Cutover

### Step 1: Vercel Project Setup
Set the following environment variables in Vercel Dashboard -> Project Settings -> Environment Variables:
```env
NODE_ENV=production
BASE_URL=https://www.agmrcet.ac.in
PORT=3000
```

### Step 2: Domain DNS Configuration
To point `https://www.agmrcet.ac.in/` to Vercel:
* **CNAME Record**: `www` -> `cname.vercel-dns.com`
* **A Record** (for root `agmrcet.ac.in`): `76.76.21.21`

---

## 7. Rollback Procedure

If any critical issue arises during DNS cutover:
1. Access the domain registrar (e.g. GoDaddy / BigRock).
2. Revert `www` CNAME and `@` A records back to original hosting IP.
3. Propagation occurs within 5-15 minutes.
