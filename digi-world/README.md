# Digi World website

The site is static HTML, CSS and about 9 KB of vanilla JavaScript, with no frameworks. A zero-dependency Node build (`node build.mjs`, Node 18+) assembles the pages into `dist/`. It deploys on **Netlify** (recommended, because the forms use Netlify Forms), Cloudflare Pages, or GitHub Pages.

| Document | What's in it |
|---|---|
| `docs/phase-1-strategy-and-copy.md` | Positioning, headlines, tone, sitemap, all page copy, the articles |
| `docs/phase-2-design-system.md` | The "noise into signal" concept, palette with contrast ratios, type, spacing, components and states |
| `docs/qa-report.md` | Phase 4 self-QA results, including Lighthouse scores |
| `page-weights.txt` | Per-page weight against the 150 KB budget (rewritten by every build) |

---

## File structure

```
netlify.toml                      # Netlify build settings (repo root)
digi-world/
├── build.mjs                     # build script + CONFIG (domain, GA4 ID, booking URL, public email)
├── tools/                        # wordmark generator (font outlines -> SVG)
├── src/
│   ├── partials/                 # layout (head, SEO, JSON-LD), header, footer, consent bar, icon sprite, wordmark
│   ├── pages/                    # one HTML file per page, with JSON front matter
│   │   ├── index, audit, services, process, insights, about, contact
│   │   ├── thank-you, 404, privacy, terms        (noindex)
│   │   └── case-studies                          (hidden template, noindex, not linked)
│   ├── content/insights/*.md     # the three articles (Markdown + JSON front matter)
│   ├── assets/css/site.css       # the whole design system (inlined into each page at build)
│   ├── assets/js/main.js         # menu, consent + GA4 loader, events, form validation/submission
│   ├── assets/fonts/             # IBM Plex Sans (variable) + IBM Plex Mono 500, OFL licence
│   ├── assets/img/               # logo.svg, favicon.svg, og-image.png, touch/manifest icons
│   └── static/                   # favicon.ico, site.webmanifest, _headers, .nojekyll
└── dist/                         # build output (Netlify rebuilds this itself)
```

**Adding an article:** copy a file in `src/content/insights/` and edit its front matter and body. Keep the `**Short answer:**` line and the `## Frequently asked questions` section. Rebuild, and it appears on Insights, in the sitemap, and with Article and FAQPage JSON-LD.

**Enabling Case Studies:** in `src/pages/case-studies.html`:
1. Set `"hidden": false`.
2. Replace the template with a real case study that the client has approved.
3. Add a nav link in `src/partials/header.html`. Keep the menu to 7 items or fewer.

---

## Deploy on Netlify (free)

1. **Connect the repo.** Sign in at netlify.com, then choose **Add new site → Import an existing project → GitHub → `csm-gif/None`**. Netlify reads `netlify.toml`, so the base directory, build command and publish directory are set automatically. Pick the `claude/confident-archimedes-qunid4` branch, or `main` once merged, and choose **Deploy**.
2. **Name it.** Under **Site configuration → Change site name**, choose e.g. `digi-world`, which gives `https://digi-world.netlify.app`. Canonical tags and the sitemap use Netlify's URL automatically.
3. **Turn on form emails.** See Forms below.

The free Netlify plan covers this site, including form submissions within the plan's monthly allowance.

## Forms (Netlify Forms)

Both forms (`audit` and `contact`) are already marked up for Netlify Forms, with a `netlify-honeypot` spam trap. To finish the setup:

1. **Enable form detection.** After the first deploy, go to **Forms** in the Netlify dashboard and choose **Enable form detection**, then trigger a redeploy (**Deploys → Trigger deploy**). The `audit` and `contact` forms will appear.
2. **Add the email notification.** Under **Site configuration → Notifications → Emails and webhooks → Form submission notifications → Add notification → Email notification**, enter `wealthop202@gmail.com` and choose "Any form".
3. **Test it.** Submit both forms on the live site. You should land on `/thank-you/`, the entry should appear under **Forms**, and the email should arrive. Check your spam folder the first time.

**How it works:**
- The script validates the form, then POSTs it to Netlify and redirects to `/thank-you/`.
- **If JavaScript is off:** the browser posts the form normally, and Netlify redirects to `/thank-you/`.
- **If the backend can't be reached** (for example on the GitHub Pages preview, which has no form backend): visitors see a clear message and a one-click email fallback with their message filled in, so nothing is lost.

## Analytics (GA4) and consent

- **Turning it on:** set `GA4_ID` in `build.mjs` to your real measurement ID and rebuild.
- **When it loads:** GA4 loads only after a visitor chooses **Accept analytics** in the consent bar, and never while the ID is still the placeholder. The choice is stored in the visitor's browser, and "Cookie settings" in the footer reopens the bar.
- **Tracked events:** pushed to `dataLayer` (no cookies), and sent to GA4 once consent is given:

| Event | Fires when |
|---|---|
| `audit_cta_click` | Any "Request a Website Audit" link (`data-event` attribute, with `location`) |
| `consult_click` | Any "Book a Consultation" link |
| `form_start` | First interaction with a form (`form_name`) |
| `form_submit` | Successful submission (`form_name`, `service`) |

- **In GA4:** mark `form_submit` as a key event.

## Booking

Until `BOOKING_URL` is set in `build.mjs`, every "Book a Consultation" link goes to `/contact/?type=consultation`. That pre-selects "Book a consultation" and shows a note asking for preferred times and time zone. Set the URL to your Calendly or Cal.com link and rebuild.

## International

Copy uses neutral, idiom-free English with no region-specific references. If you add translations later:
- Put each language under its own path, such as `/fr/`.
- Add `<link rel="alternate" hreflang="…">` tags for every language version, plus `x-default`, in `src/partials/layout.html`.
- Add the language versions to the sitemap.

## GitHub Pages preview

The current preview at `https://csm-gif.github.io/None/` is built with:

```
SITE_URL=https://csm-gif.github.io/None BASE_PATH=/None OUT_DIR=/tmp/pages node build.mjs
```

and published to the `gh-pages` branch. GitHub Pages can't receive form posts, so forms there show the email fallback. Use Netlify for the real launch.

---

## Placeholders to supply

On the site, each placeholder is highlighted in yellow. Run `grep -rn PLACEHOLDER src build.mjs` to find any that are left.

**Site-wide and configuration**

| # | Placeholder | Where | Notes |
|---|---|---|---|
| 1 | Production domain | `build.mjs` → `SITE_URL` | Netlify builds use the site URL automatically; set this only for a custom domain. |
| 2 | Domain email (public) | `build.mjs` → `PUBLIC_EMAIL`; Privacy §1 | Until set, no email address is shown publicly. |
| 3 | GA4 measurement ID | `build.mjs` → `GA4_ID` | Format `G-XXXXXXXXXX`. |
| 4 | Booking URL (Calendly/Cal.com) | `build.mjs` → `BOOKING_URL` | |
| 5 | Social profile URLs | `build.mjs` → `SAME_AS` | Used in Organization schema. |
| 6 | Registered business name | Footer | Only if different from "Digi World". |

**Offer and process**

| # | Placeholder | Where | Notes |
|---|---|---|---|
| 7 | Audit turnaround | Audit page (hero, FAQ, "What you receive") | e.g. 5–10 working days. |
| 8 | Report length | Audit page | e.g. 15–25 pages. |
| 9 | Walkthrough call length | Audit page | e.g. 45 minutes. |
| 10 | Audit qualifying criteria | Audit page | Or delete the line if every business qualifies. |
| 11 | NDA policy | Audit FAQ; Services FAQ (confidentiality) | |
| 12 | Response time | Audit form intro; Contact; Thank-you | e.g. 2 working days. |
| 13 | Reporting frequency | Services FAQ; Process | e.g. monthly. |
| 14 | First-30-days timings | Home; Process | Confirm or adjust. |
| 15 | Ongoing-support notice period | Services → Ways to work with us | |
| 16 | Other exclusions ("We don't…") | Home FAQ; Services FAQ and scope list | e.g. building new websites. |
| 17 | Time zone | Services FAQ | |
| 18 | Tools you use | Process → Tools | List only confirmed tools. |

**About**

| # | Placeholder | Where | Notes |
|---|---|---|---|
| 19 | Founder photo | About | Square, at least 600×600; export as WebP/AVIF with width/height set. |
| 20 | Founder name, role, bio | About | 60–100 words, verifiable facts only. |
| 21 | Location / time zone and languages | About | |

**Legal**

| # | Placeholder | Where | Notes |
|---|---|---|---|
| 22 | Legal name, address, jurisdiction, dates | Privacy; Terms | Both pages are drafts and **need legal review**. |
| 23 | Retention period; other processors; international transfers | Privacy | |

**Hidden page**

| # | Placeholder | Where | Notes |
|---|---|---|---|
| 24 | Case-study content | Case Studies | Only when you have real, approved work. |

---

## Launch checklist

**Domain and SSL**
- [ ] DNS: in Netlify, go to **Domain management → Add a domain**, then point your domain's DNS at Netlify (Netlify DNS, or A/CNAME records as shown). Set the www or apex redirect.
- [ ] SSL: in **Domain management → HTTPS**, confirm the certificate is issued. Turn on **Force HTTPS** if it isn't already on.
- [ ] Set `SITE_URL` to the custom domain (or rely on Netlify's primary domain), rebuild, and check the canonical tags and `sitemap.xml`.

**Forms**
- [ ] Form test: submit the Audit and Contact forms on the live site. Confirm the redirect to `/thank-you/`, the entry in Netlify **Forms**, and the email at wealthop202@gmail.com.
- [ ] Spam: check that the honeypot is active (Netlify shows spam under **Forms → Spam**).

**Analytics**
- [ ] GA4 test: set `GA4_ID`, deploy, and accept analytics in a private window.
  - In GA4 **Realtime** or **DebugView**, confirm `page_view`, `audit_cta_click`, `form_start` and `form_submit` arrive.
  - Decline in another private window and confirm nothing loads.
- [ ] Mark `form_submit` as a key event in GA4. Set data retention to 14 months.

**Search**
- [ ] Search Console: add and verify the domain property, then submit `https://<domain>/sitemap.xml`. Do the same in Bing Webmaster Tools.
- [ ] Sitemap: open `/sitemap.xml` and `/robots.txt` on the live domain and check the URLs.
- [ ] 404 test: open `https://<domain>/does-not-exist` and confirm the custom 404 page appears with a 404 status.
- [ ] Share preview: check the OG image with a link preview tool (LinkedIn Post Inspector or similar).

**Final checks**
- [ ] Lighthouse: re-run on the live domain, on mobile, for Home, Audit and one article.
- [ ] Placeholders: replace all of them, or consciously leave any that are acceptable for launch, and remove their yellow highlight.
- [ ] Legal: have a legal adviser review Privacy and Terms, then remove the "Draft" notes.

## First 30 days after launch

1. **Week 1:**
   - Confirm forms and GA4 work end to end.
   - Submit the sitemap in Search Console.
   - Fill the remaining placeholders: founder, response time, tools.
2. **Week 1:** set up a domain email and replace the public-email placeholder. A domain address builds more trust than a free email service.
3. **Week 2:** run free audits for two or three friendly businesses. Ask for permission up front to anonymise the findings as a case study.
4. **Week 2:** collect real testimonials from those clients, in writing and with permission to publish. Never edit their meaning.
5. **Week 3:** publish the first case study (enable the hidden page) with measured, dated results and the data source.
6. **Week 3:** connect the booking tool and set `BOOKING_URL`.
7. **Weeks 3–4:** publish one new Insights article answering a question prospects actually asked during the audits.
8. **Week 4:**
   - Review Search Console queries and GA4 key events.
   - Note which pages bring audit requests.
   - Change one thing on the weakest page, and log the date of the change.
9. **Ongoing:** check how AI tools describe Digi World monthly, and keep the business name, description and links consistent across profiles.
