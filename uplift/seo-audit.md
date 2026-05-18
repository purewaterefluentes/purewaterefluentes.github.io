# SEO & Marketing Uplift Audit

Site: purewaterefluentes.com.br  
Stack: Jekyll static site, hosted on GitHub Pages  
Audit date: 2026-05-18

---

## What's already done well

- GTM installed (GTM-TSJLWNFV) — head and body tags in correct positions
- Conversion tracking on WhatsApp, email click, and contact form
- Per-page `description`, `keywords`, `robots` front matter — correct pattern
- Breadcrumbs rendered in HTML
- Open Graph tags (og:type, og:image, og:site_name)
- `robots.txt` is open (allows all crawlers) — correct for a public site

---

## Issues Found

### Critical

| Issue | File | Detail |
|---|---|---|
| Universal Analytics is dead | `_includes/purewater/google-analytics.script` | `UA-50083848-3` was shut down by Google in July 2023. Data goes nowhere. Must migrate to GA4 |
| Duplicate `gtag` function | `_includes/purewater/google-analytics.script` | `gtag` is defined twice — second definition overwrites the first, conversion tracking is unreliable |
| No XML sitemap | — | No `jekyll-sitemap` gem, no `sitemap.xml`. Google can't reliably discover all pages |
| No canonical tags | `_layouts/default.html` | `permalink: none` in `_config.yml` allows URL variants to be indexed separately, causing duplicate content penalties |

### SEO / Structured Data

| Issue | File | Detail |
|---|---|---|
| No Schema.org JSON-LD | `_layouts/default.html` | No `Organization`, `Product`, or `BreadcrumbList` structured data. Breadcrumbs exist visually but Google can't read them semantically |
| OG description uses `page.title` | `_layouts/default.html:39` | `og:description` is set to `page.title` — should be `page.description` |
| No fallback meta description | `_includes/purewater/meta-description.html` | If a page has no `description` front matter, the `<meta name="description">` tag is omitted entirely |
| Meta keywords default is too generic | `_layouts/default.html:29` | Fallback is `agua, tratamento, efluentes, piscina, insumos, quimicos` — not a ranking factor but wastes the slot |

### Performance / Technical

| Issue | File | Detail |
|---|---|---|
| Bootstrap 3.3.5 (2015) | `_layouts/default.html:30` | Very outdated. Render-blocking CSS from CDN hurts Core Web Vitals |
| jQuery 1.11.3 (2014) | `_layouts/default.html:111` | Loaded synchronously, blocks rendering |
| Font Awesome loaded at bottom of `<body>` | `_layouts/default.html:120` | Icons flash/appear late. Should be in `<head>` |
| No `loading="lazy"` on images | product/service pages | Images load eagerly — hurts LCP and initial page load time |
| No `<main>` semantic element | `_layouts/default.html:93` | Content sits in a `<div class="container">` — crawlers and screen readers prefer `<main>` |

### Marketing / Tracking

| Issue | File | Detail |
|---|---|---|
| GA direct script + GTM both running | `_includes/purewater/google-analytics.script` | Both load independently. Adding GA4 inside GTM later will double-count pageviews |
| No Consent Mode v2 | `_layouts/default.html` | Required by Google for Ads conversion modelling under LGPD. Without it, conversions are undercounted when users decline cookies |
| No XML sitemap | — | Google Ads Quality Score partially depends on crawlability |

---

## Tasks

### Critical
- [ ] **T01 — Migrate UA → GA4** — replace `UA-50083848-3` with a GA4 measurement ID in `google-analytics.script`; remove the duplicate `gtag` function definition
- [x] **T02 — Add XML sitemap** — add `jekyll-sitemap` gem to `Gemfile` and `plugins:` in `_config.yml`
- [x] **T03 — Add canonical tags** — add `<link rel="canonical" href="{{ page.url | absolute_url }}">` to `_layouts/default.html`

### SEO / Structured Data
- [x] **T04 — Fix `og:description`** — change `default.html:39` from `page.title` to `page.description`
- [x] **T05 — Add fallback meta description** — update `meta-description.html` to render a site-level fallback when `page.description` is absent
- [ ] **T06 — Add `Organization` JSON-LD schema** — inject into `default.html` `<head>` with name, URL, logo, telephone, address
- [ ] **T07 — Add `BreadcrumbList` JSON-LD schema** — generate from the same breadcrumb logic already in `breadcrumbs.html`
- [ ] **T08 — Add `Product` / `ItemPage` JSON-LD schema** — for product and equipment pages, inject schema from front matter fields

### Performance / Technical
- [ ] **T09 — Move Font Awesome to `<head>`** — move the Font Awesome `<link>` from bottom of `<body>` to `<head>` in `default.html`
- [ ] **T10 — Add `loading="lazy"` to images** — audit product and service pages for `<img>` tags missing the lazy attribute
- [ ] **T11 — Add `<main>` semantic element** — wrap the `<div class="container">` content block in `default.html` with `<main>`
- [ ] **T12 — Upgrade Bootstrap and jQuery** — evaluate moving to Bootstrap 5 and dropping jQuery dependency

### Marketing / Tracking
- [ ] **T13 — Consolidate GA into GTM** — remove the direct `gtag.js` script and manage GA4 + conversion events entirely through GTM
- [ ] **T14 — Implement Consent Mode v2** — add a CMP (e.g. CookieYes) and configure GTM Consent Mode v2 to model conversions under LGPD
