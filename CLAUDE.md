# Purewater Efluentes — Project Guide

## Project overview
Brazilian B2B water treatment company (Purewater Efluentes, São Paulo). Static marketing site with ~130 product/equipment/service pages in Portuguese (pt-BR).

## Dev server
```
docker compose up
```
Runs at http://localhost:4000. Uses `jekyll/jekyll:4` with `--force_polling` (required inside Docker). Named volume `jekyll_bundle` caches gems between runs.

## Deployment
GitHub Pages on the `master` branch — push triggers auto-build. Custom domain via `CNAME` file (`www.purewaterefluentes.com.br`). No GitHub Actions; GitHub Pages native build only.

## Jekyll config gotchas
- HTML is minified via `compress.html` layout. If something looks broken, check raw source — compression can hide rendering issues.
- Plugins: `jekyll-redirect-from`, `jekyll-sitemap`. All via `github-pages` gem; no custom Ruby plugins.
- `_config.yml` references `website/_scss/` for SASS but that directory doesn't exist — CSS is pre-compiled (`website/theme.css`).

## Layouts
| Layout | Used for |
|---|---|
| `default` | General pages — navbar, jumbotron, footer, analytics |
| `contato` | Product/equipment pages — contact modal + Product JSON-LD schema |
| `page` | Simple content pages |

## Front matter conventions
| Variable | Purpose |
|---|---|
| `layout`, `title`, `subtitle`, `description`, `keywords` | Standard on all pages |
| `pageTitle` | Overrides `<title>` tag (defaults to `title`) |
| `header-style: no-jumbotrom` | Hides the jumbotron header |
| `showBreadcrumbs: false` | Hides breadcrumbs |
| `robots` | Sets robots meta (`index`, `noindex`, etc.) |

## Frontend stack
Bootstrap 3.3.7 + jQuery 1.11.3 + Font Awesome 4.5.0 — all via CDN. These are outdated but intentionally not upgraded (Bootstrap 3→5 is a breaking change, deferred). Don't suggest upgrades unless asked.

## Contact form
EmailJS handles form submission client-side (no backend required). Logic and validation in `website/js/contato.js`.

## Analytics
| ID | Purpose |
|---|---|
| `G-J4FTRBSX12` | GA4 measurement ID |
| `GTM-TSJLWNFV` | Google Tag Manager container |
| `AW-1041562649` | Google Ads conversion ID |

Conversion tracking functions live in `_includes/purewater/google-analytics.script`:
- `gtagReportConversionContactForm()`
- `gtagReportConversionEmailLink(url)`
- `gtagReportConversionWhatsapp(url)`

## SEO uplift
Ongoing work tracked in `uplift/seo-audit.md`. T13/T14 are blocked on GTM Editor access (site owner required). See session memory for current state.

## Image assets
182 images under `website/images/`, organised into `logo/`, `icon/`, `small/`, `pequeno/`. All content images use `loading="lazy"`.
