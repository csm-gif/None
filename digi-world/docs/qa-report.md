# Digi World — Phase 4: Self-QA report

**Date:** 22 October 2026.

**Method:** run against the built site (`dist/`), served locally, using headless Chromium (Playwright), axe-core 4.10, Lighthouse 12.2, and custom checks. All results below are **from actual runs**. Each issue found was fixed and the checks re-run.

## Summary

| Area | Result |
|---|---|
| 1. Copy | **PASS** |
| 2. Accessibility | **PASS** |
| 3. Responsive | **PASS** |
| 4. SEO | **PASS** |
| 5. Performance | **PASS** |
| 6. Forms | **PASS** (live delivery to be confirmed after the Netlify deploy) |
| 7. Links and placeholders | **PASS** |

## 1. Copy — PASS

- **Banned-word scan** of the visible text on all 15 pages found none of: unlock, supercharge, game-changing, cutting-edge, revolutionary, leverage, synergy, seamless, best-in-class, skyrocket, lorem.
- **"Guarantee"** appears only in negative statements ("We don't guarantee…").
- **No invented proof:** there are no testimonials, client names, metrics, awards, certifications, team names or years in business. The founder, tools and case-study slots are clearly marked placeholders.
- **No promises:** no claim of rankings or return on investment.
- **One primary call to action per page:** most pages lead to "Request a Website Audit". On About it is "Book a Consultation", on Contact "Send message", and on Thank-you a "While you wait" reading list.
- **Reading level** (Flesch-Kincaid, measured in Phase 1) is grade 4.4–6.7.
- **Articles:** 991–1,000 words of body text each, with no statistics.

## 2. Accessibility (WCAG 2.2 AA) — PASS

**axe-core:** zero violations on all 15 pages at 360px and 1280px, testing WCAG 2.0/2.1/2.2 A and AA plus best practices. Fixes applied during QA:
- added a missing table header ("Aspect")
- made the scrollable table region keyboard-focusable

**Lighthouse accessibility:** 100 on all 10 public pages.

**Contrast:** every text pair is listed in `phase-2-design-system.md`. The lowest is 5.1:1, for teal text on the teal tint.

**Focus and keyboard:**
- A skip link is the first item in the focus order.
- Focus moves through header, main content and footer in reading order.
- The focus ring is a 3px outline on every interactive element.
- The mobile menu has `aria-expanded`, closes with Esc, and returns focus to the menu button.
- FAQ items are native `<details>` elements, so they work with the keyboard.

**Forms:**
- Every field has a visible `<label>`.
- Errors are linked to their fields with `aria-describedby` and marked with `aria-invalid`.
- An error summary takes focus on a failed submit.
- A status region announces results.

**Headings:** exactly one H1 per page. The build fails if a page has none or more than one.

**Reduced motion:** turned on during all testing. Every animation and transition is disabled under `prefers-reduced-motion`.

**Touch targets:**
- Every stand-alone control is at least 44px tall, at 360, 768, 1280 and 1920px.
- Allowed exceptions under WCAG 2.5.8: text links inside sentences, and card titles where the whole card is the clickable area.
- Fixes applied during QA: footer links, breadcrumbs, article contents links, and the Cookie settings button.

## 3. Responsive — PASS

- **15 pages × 4 widths** (360, 768, 1280, 1920px): no horizontal scroll and no console errors.
- **Fixes applied during QA:**
  - Grid gaps were too wide for 360px, so they now scale with screen width.
  - The comparison table forced the article column wider; it now scrolls inside its own box.
  - A long inline code sample was too wide; it now wraps.
  - The header and footer wordmark was clipped by an SVG viewBox offset.
- **Browsers:** tested in Chromium. The CSS uses features supported by current Chrome, Safari, Firefox and Edge (grid, `:has()`, `clamp()`, `env()`). Where `:has()` is missing, linked cards still show the link's own focus ring.

## 4. SEO — PASS

- **Titles and descriptions:** every page has its own `<title>` and meta description, with no duplicates.
- **Canonicals:** an absolute canonical tag on every page.
- **Social tags:** Open Graph and Twitter Card tags with a 1200×630 image.
- **JSON-LD:** parses on every page. Types by page:
  - **Every page:** Organization, WebSite, WebPage, and BreadcrumbList (except Home).
  - **Services:** Service ×8.
  - **Audit:** Service with a free Offer.
  - **Articles:** Article.
  - **FAQPage** on Home, Services, Audit and each article. It is generated from the visible FAQ text, so the two always match.
- **Sitemap and robots:** `sitemap.xml` lists the 10 public pages. Thank-you, 404, Privacy, Terms and the hidden Case Studies page are `noindex` and left out. `robots.txt` points to the sitemap.
- **Internal links:** every link resolves, with no broken links and no missing anchors. Link text is descriptive; Lighthouse flagged one "Learn more" link, now fixed.
- **Lighthouse SEO:** 100 on all 10 public pages.
- **GEO/AEO structure:**
  - question-led H2s and FAQs
  - a "Short answer" box at the top of each article
  - plain-English, one-sentence definitions of GEO and AEO

## 5. Performance — PASS

**Lighthouse mobile scores** (simulated throttling, local server):

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| / | 99 | 100 | 100 | 100 | 1.8 s | 0 | 70 ms |
| /audit/ | 99 | 100 | 100 | 100 | 1.8 s | 0 | 60 ms |
| /services/ | 100 | 100 | 100 | 100 | 1.8 s | 0 | 60 ms |
| /process/ | 100 | 100 | 100 | 100 | 1.5 s | 0 | 70 ms |
| /insights/ | 100 | 100 | 100 | 100 | 1.8 s | 0 | 50 ms |
| /insights/ga4-setup-checklist/ | 100 | 100 | 100 | 100 | 1.7 s | 0.002 | 0 ms |
| /insights/seo-geo-aeo-explained/ | 100 | 100 | 100 | 100 | 1.7 s | 0.002 | 0 ms |
| /insights/why-traffic-isnt-converting/ | 99 | 100 | 100 | 100 | 1.8 s | 0.002 | 80 ms |
| /about/ | 100 | 100 | 100 | 100 | 1.8 s | 0 | 50 ms |
| /contact/ | 99 | 100 | 100 | 100 | 1.8 s | 0 | 10 ms |

Scores on the live host will differ slightly. Re-run Lighthouse after launch (see the launch checklist).

**Page weight:**
- Every page is 113–140 KB uncompressed, including fonts and JavaScript, against a 150 KB budget. Gzip reduces this by roughly 3–4×.
- Per-page numbers are in `page-weights.txt`, which every build writes.
- One fix was needed: the hero graphic was compacted, because three pages were over budget.

**Render-blocking:** none. CSS is inlined, JavaScript is deferred, and the main font is preloaded with `font-display: swap`.

**Images:** the site uses inline SVG only, so there are no raster images to compress. Article and future images should use AVIF/WebP with `width`/`height` set and `loading="lazy"`; see the README.

## 6. Forms — PASS

Run in a browser, with all 20 checks passing:

| Check | Result |
|---|---|
| Empty submit | Error summary takes focus; each field has its own message |
| Invalid email | Inline error; it clears when corrected |
| `form_start` event | Fires on the first focus |
| Successful submit | Redirects to `/thank-you/` and fires `form_submit` |
| Submission contents | The POST carries `form-name`, the consent value and the honeypot field |
| Failed submit | Shows a clear message with an email fallback that has the message filled in |
| Honeypot filled | Nothing is sent |
| `?type=consultation` link | Pre-selects "Book a consultation" |
| Consent bar | Shows on the first visit and remembers the choice |
| "Cookie settings" | Reopens the bar |
| GA4 | Never requested while the measurement ID is the placeholder |

**Delivery path:** Netlify Forms → email notification to wealthop202@gmail.com. Set-up steps are in the README. **Not yet tested end to end**, because this environment cannot reach Netlify; it is on the launch checklist.

## 7. Links and placeholders — PASS

- No broken links and no lorem ipsum.
- Every remaining `[PLACEHOLDER]` appears in the README placeholder table, and each is highlighted in yellow on the site.
