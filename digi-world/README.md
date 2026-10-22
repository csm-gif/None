# Digi World website

A static, framework-free marketing site for Digi World, a digital growth consultancy.
It is plain HTML, CSS and about 9 KB of vanilla JS. A zero-dependency Node build assembles the pages.

```
node build.mjs          # builds src/ -> dist/ (Node 18+; no npm install needed)
npx serve dist          # or any static server, to preview locally
```

Deploy the contents of `dist/` to any static host. `dist/` is committed, so the site can be
deployed without running the build.

---

## 1. Design rationale

**Direction.** The site should feel like a quiet, well-run advisory firm, not a software product.
The aim is calm, credible and editorial, with nothing that looks like a template.

**Palette.** One restrained scheme, defined as CSS variables in `src/assets/css/site.css`:

| Token | Hex | Use | Contrast on paper |
|---|---|---|---|
| `--ink` | `#0E1A2B` | Body text, dark bands, footer | 16.4:1 |
| `--ink-2` | `#3B4656` | Secondary text | 8.9:1 |
| `--muted` | `#5A6472` | Captions, hints | 5.7:1 |
| `--paper` | `#F7F5F0` | Page background (warm off-white) | n/a |
| `--accent` | `#0B6E69` | Links, primary buttons, data marks | 5.6:1 (white on it: 6.1:1) |
| `--accent-on-ink` | `#6FD1C3` | Accent on dark sections | 9.6:1 on ink |

Deep ink reads as serious and trustworthy without the coldness of pure black. Warm paper makes
long reading comfortable. A single teal accent signals "data" and "action", and it is used
sparingly, so the eye always finds the next step. All text meets WCAG AA, and most meets AAA.

**Typography.**
- **Newsreader** (headings): a refined, editorial serif. It gives the boutique-consultancy tone and is
  readable at large sizes.
- **Inter** (body): highly legible at small sizes on screen, with neutral international character
  coverage.

Both are self-hosted variable fonts (latin subset, about 106 KB total, OFL licence) with
`font-display: swap` and preloading. The type scale is 1.25 (major third) on a 17px base. Paragraph
width is capped at 68ch (inside the 60 to 75 character target).

**Layout and motion.**
- **Spacing and grid:** an 8px spacing scale (`--s-1` to `--s-8`), a 12-column CSS grid, and 1200px
  max content width.
- **Imagery:** inline SVG line icons and simple chart and diagram motifs, with no photos.
- **Motion:** a 280ms fade/slide on scroll and hover states of 240ms or less. All motion is
  disabled under `prefers-reduced-motion`.

## 2. Folder structure

```
digi-world/
├── build.mjs                  # build script + site CONFIG (domain, email, booking URL, form endpoint)
├── src/
│   ├── partials/
│   │   ├── layout.html        # <head>: SEO/OG/Twitter tags, GA4 snippet (commented), JSON-LD
│   │   ├── header.html        # sticky header, 7-item nav, persistent audit CTA, mobile menu
│   │   ├── footer.html
│   │   └── icons.svg          # inline SVG sprite (logo + service icons)
│   ├── pages/                 # one file per page; JSON front matter + <main> content
│   │   ├── index.html         # /            Home
│   │   ├── about.html         # /about/
│   │   ├── services.html      # /services/   (8 services with anchors, FAQ)
│   │   ├── process.html       # /process/    (Our Process)
│   │   ├── case-studies.html  # /case-studies/ (template only)
│   │   ├── insights.html      # /insights/
│   │   ├── insights/article-template.html   # /insights/article-template/ (noindex)
│   │   ├── contact.html       # /contact/
│   │   ├── privacy.html, terms.html, 404.html   (noindex)
│   ├── assets/
│   │   ├── css/site.css       # the only stylesheet (inlined into every page at build)
│   │   ├── js/main.js         # menu, reveal-on-scroll, event tracking, form
│   │   ├── fonts/             # Newsreader + Inter woff2 and licences
│   │   └── img/               # favicon.svg, og-image.png, touch icons, article placeholder
│   └── static/                # copied to site root: favicon.ico, site.webmanifest, _headers
└── dist/                      # build output (deploy this)
```

**What the build does:**
- Inlines the CSS (25 KB raw, about 6 KB gzipped), so there are no render-blocking requests.
- Writes clean folder URLs, one per page.
- Sets the canonical URL and Open Graph/Twitter tags for each page.
- Marks the current nav item with `aria-current`.
- Builds a JSON-LD `@graph` for each page:
  - Organization, WebSite, WebPage and BreadcrumbList on every page.
  - Service ×8 on Services, HowTo on Process, and Article on the article template.
  - FAQPage on Home and Services, generated from the visible FAQ markup so the two never drift.
- Generates `sitemap.xml` (indexable pages only) and `robots.txt`.
- Fails if any page has more or fewer than one `<h1>`.

### Enquiry form: how it is wired

**Current setting: mailto fallback.** `FORM_ENDPOINT` in `build.mjs` is empty, so after inline
validation the form opens the visitor's email app with a pre-filled message to
`wealthop202@gmail.com`. A status message explains this, and the form stays on screen so nothing is
lost if no email app opens. Without JavaScript, the browser's native `mailto:` submit is used.

**To switch to a real endpoint** (recommended: mailto depends on the visitor having an email app):
1. Set `FORM_ENDPOINT` to the endpoint URL, for example a form service or your own handler.
2. Change the form's `action` in `contact.html` to the same URL.
3. Rebuild.

With an endpoint set, the form data is POSTed as `multipart/form-data` and the page shows a success
or error state. A hidden honeypot field (`company_fax`) filters simple bots.

**Pre-filling from links:**
- `?enquiry=audit` and `?enquiry=consultation` change the form heading and button label, and set a
  hidden `enquiry_type` field.
- `?service=seo` (or another service key) pre-selects the service.

### Analytics

- **GA4 snippet:** in `src/partials/layout.html`, commented out and wrapped in Consent Mode v2
  defaults (all storage denied). Nothing tracks until you add a consent tool and uncomment it.
- **Event attributes on CTAs:** `data-track` (event name), `data-cta-name` and `data-cta-location`.
  `main.js` sends these as GA4 events only when `gtag` exists.
- **Events you will see:**
  - `cta_click`, with `cta_name` set to `request_audit`, `book_consultation`, `service_enquiry` or
    `submit_enquiry`.
  - `email_click`.
  - `generate_lead` on a valid form submission, with `method` set to `mailto` or `form`.

## 3. Placeholders to fill in

Placeholders are marked `[PLACEHOLDER: ...]`. On the page they are wrapped in a yellow highlight
(`<span class="ph">`) so you can spot them; remove the span when you replace the text. Run
`grep -rn "PLACEHOLDER" src build.mjs` to find any you have missed.

**Site-wide configuration (`build.mjs` → `CONFIG`)**
- [ ] `SITE_URL`: production domain (currently `https://www.example.com`; used for canonicals, OG, sitemap and JSON-LD)
- [ ] `BOOKING_URL`: booking/scheduling link for "Book a Consultation" (currently the contact form)
- [ ] `FORM_ENDPOINT`: form-handling endpoint (currently empty, so the mailto fallback is used)
- [ ] `SAME_AS`: official social profile URLs for the Organization schema

**Head / analytics (`src/partials/layout.html`)**
- [ ] GA4 measurement ID (`G-XXXXXXXXXX`, appears twice)
- [ ] Consent banner / consent management tool (required before enabling GA4)
- [ ] X/Twitter handle (optional `twitter:site`)

**Footer**
- [ ] Registered business name and registration details, if required

**Home**
- [ ] Audit price (or "free initial audit"), turnaround time and delivery format
- [ ] Regions, time zones and other languages you support (FAQ)

**About**
- [ ] Founder name, role, and a 60 to 100 word bio (verifiable facts only)
- [ ] Optional professional photo (or keep the monogram)
- [ ] Location, year founded (optional), languages, and verifiable qualifications (or remove that line)
- [ ] Confirm the six principles reflect how you actually work, especially "You own your accounts and data"

**Services**
- [ ] Confirm each "What you get" line matches what you actually deliver (for example "90-day action plan", "monthly visibility reporting", "ongoing advisory sessions")
- [ ] Audit price / turnaround
- [ ] Pricing approach (FAQ answer)

**Our Process**
- [ ] Typical durations for Audit, Strategy and Implement, and the reporting frequency

**Case Studies** (3 template cards)
- [ ] Title, client or sector, market, period, services used, challenge, approach and verified outcome. Publish only with written client permission, and remove the "Case study coming soon" badge.

**Insights**
- [ ] Publish date and one-sentence summary for each of the 3 cards; point each card at its real article URL
- [ ] For each article, copy `src/pages/insights/article-template.html` and fill in: title, meta description, topic, intro, author, date, reading time, short answer, section headings and body, figure and caption, FAQ, and the Article JSON-LD dates and author. Remove `"noindex": true`.

**Contact**
- [ ] Response time and working days (shown in the sidebar and the success message)

**Privacy policy and Terms of use**
- [ ] Full legal text, reviewed for your jurisdiction (the pages currently list what each should cover). Remove `"noindex": true` once the text is final, if you want them indexed.

## 4. Pre-launch checklist

### SEO
- [ ] `SITE_URL` set to the live domain; rebuild; check canonical tags on every page point to it
- [ ] `https://` enforced and one host version chosen (www or not), with redirects from the other
- [ ] Unique `<title>` and meta description on each page (set in each page's front matter)
- [ ] `sitemap.xml` and `robots.txt` reachable at the root; sitemap submitted in Google Search Console and Bing Webmaster Tools
- [ ] Host serves `404.html` for missing pages with a real 404 status
- [ ] JSON-LD validated in the Schema.org validator and Google Rich Results Test (Home, Services, Process)
- [ ] OG image checked with a social preview tool (LinkedIn Post Inspector and similar)
- [ ] Remove `noindex` only from pages that are ready (article copies, legal pages)

### GEO / AEO
- [ ] FAQ answers on Home and Services are accurate and stand on their own as quotable answers
- [ ] Business name, email and description are identical everywhere they appear (site, social profiles, directories)
- [ ] Add `SAME_AS` profiles so AI tools can connect your entities
- [ ] After launch, ask the main AI assistants "What is Digi World?" and record the answers as a baseline

### Accessibility (target WCAG 2.2 AA)
- [x] axe-core run on every page at 360, 768 and 1280px: no violations at build time
- [ ] Re-run axe or Lighthouse after content is filled in (new text can change contrast or heading order)
- [ ] Keyboard-only pass: skip link, menu (Esc closes it), FAQ accordions, form errors and success state
- [ ] Screen-reader spot check (VoiceOver or NVDA) of the contact form, including the error summary
- [ ] Every new image has meaningful `alt` text (or `alt=""` if decorative)
- [ ] Still one `<h1>` per page (the build enforces this)

### Performance
- [ ] Lighthouse (mobile and desktop) 95+ in all four categories on the deployed site
- [ ] Caching headers applied (`dist/_headers` for Netlify/Cloudflare Pages; replicate on other hosts)
- [ ] HTTP/2 or HTTP/3 and Brotli/gzip compression enabled on the host
- [ ] New images in AVIF/WebP, with `width`/`height`, `loading="lazy"` and `decoding="async"` (pattern in the article template)
- [ ] Do not add third-party widgets (chat, embeds, sliders) without re-testing

### Analytics and privacy
- [ ] Consent tool installed and tested; GA4 snippet uncommented with the real measurement ID
- [ ] In GA4 DebugView, confirm `cta_click`, `email_click` and `generate_lead` arrive with their parameters
- [ ] Mark `generate_lead` as a key event in GA4
- [ ] Privacy policy describes the form, email handling, analytics and retention
- [ ] Form endpoint configured (recommended) and a test enquiry received end to end
- [ ] Google Search Console verified; link it to GA4

### Content and copy
- [ ] All `[PLACEHOLDER]` items replaced (`grep -rn "PLACEHOLDER" src build.mjs` returns nothing except article-template guidance)
- [ ] No invented claims: every statement about results, clients or credentials can be evidenced
- [ ] Contact email tested (`wealthop202@gmail.com`). Consider a domain email address for credibility once the domain is live.
- [ ] Spelling, links and every CTA checked on a real phone
