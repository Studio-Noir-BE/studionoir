# Studio Noir — website frontend

The public website built from the Figma **FINAL** design (`WEBSITE.fig`), using
the project's existing **Vite + Tailwind** toolchain. Pages are authored as
**pure Twig** so they can be rendered statically for the GitHub Pages preview
*and* dropped into the Craft project later.

## Pages

| URL                     | Template                          |
| ----------------------- | --------------------------------- |
| `index.html`            | `pages/home.twig`                 |
| `diensten.html`         | `pages/diensten.twig`             |
| `diensten-detail.html`  | `pages/diensten-detail.twig`      |
| `over.html`             | `pages/over.twig`                 |
| `inzichten.html`        | `pages/inzichten.twig`            |
| `inzichten-detail.html` | `pages/inzichten-detail.twig`     |
| `contact.html`          | `pages/contact.twig`              |
| `privacy.html`          | `pages/privacy.twig`              |
| `voorwaarden.html`      | `pages/voorwaarden.twig`          |

Shared building blocks live in `_partials/` (header, footer, hero, services
grid, FAQ, CTA banner, contact card + form). Shared copy (nav, services, FAQ)
lives in `tools/site-data.php`.

## Design tokens

- **Colours** (in `tailwind.config.js`): `primary` `#EFFF10`, `secondary`
  `#202020`, plus `cream`, `sand`, `ink`, `muted`.
- **Fonts**: `Space Grotesk` (display/headings — substitute for the commercial
  "Stack Sans Notch"), `Onest` (body), `Inter` (bundled fallback). Space Grotesk
  and Onest load via Google Fonts in the document `<head>`.
- **CSS/JS entry**: `src/scss/site.scss` + `src/js/site.js` (a clean Tailwind
  entry, separate from the boilerplate `app.scss`).

## Build & preview locally

```bash
# 1. CSS + JS (outputs to web/dist-site/ with a manifest)
npx vite build --config vite.site.config.js

# 2. Twig → static HTML in docs/ (needs twig/twig: composer install in tools/)
php tools/render.php
```

Open `docs/index.html` in a browser. The renderer injects the hashed Vite assets
from the manifest and copies images into `docs/`.

## Deployment

`.github/workflows/deploy-pages.yml` runs the two steps above and publishes
`docs/` to GitHub Pages. The committed `docs/` folder can also be served
directly (Settings → Pages → *Deploy from a branch* → `/docs`).

## Notes

- The contact form is front-end only for now (`src/js/site.js`). Hook it up to
  Formie/Craft later by setting the form action + CSRF token.
- To use these templates inside Craft, render the page templates from your
  routes and swap the asset tags in `_layout.twig` for the `craft.vite` tags.
- Content is currently hard-coded / in `tools/site-data.php`; move it to CMS
  fields when wiring up the backend.
