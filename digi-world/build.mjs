#!/usr/bin/env node
// Digi World static site build. Zero dependencies: `node build.mjs` (Node 18+).
//
// - Assembles src/pages/*.html and src/content/insights/*.md with the shared layout.
// - Inlines the stylesheet; builds per-page SEO tags and a JSON-LD @graph
//   (FAQPage is generated from the visible FAQ markup, Article from article front matter).
// - Generates the "noise into signal" hero and divider graphics, the forms, sitemap.xml and robots.txt.
// - Works at a domain root (Netlify) or under a sub-path (GitHub Pages) via BASE_PATH.
//
// Environment overrides: SITE_URL, BASE_PATH, OUT_DIR. On Netlify, SITE_URL defaults to Netlify's URL.

import { readFile, writeFile, mkdir, readdir, cp, rm, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { wordmarkSvg } from "./tools/wordmark-svg.mjs";

// ---------------------------------------------------------------------------
// Site configuration. Items marked [PLACEHOLDER] are listed in README.md.
// ---------------------------------------------------------------------------
const CONFIG = {
  // [PLACEHOLDER: your production domain]. Netlify builds use the site's own URL automatically.
  SITE_URL: (process.env.SITE_URL || process.env.URL || "https://digi-world.netlify.app").replace(/\/$/, ""),
  BASE_PATH: (process.env.BASE_PATH || "").replace(/\/$/, ""),
  SITE_NAME: "Digi World",
  // Where form submissions are delivered (set in Netlify > Forms > Notifications). Not shown publicly.
  FORM_EMAIL: "wealthop202@gmail.com",
  // [PLACEHOLDER: domain email]. Leave empty to show no public email address.
  PUBLIC_EMAIL: "",
  // [PLACEHOLDER: Calendly/Cal.com URL]. Empty = "Book a Consultation" goes to the contact form.
  BOOKING_URL: "",
  // [PLACEHOLDER: GA4 measurement ID]. GA4 loads only after the visitor accepts analytics cookies,
  // and never while this is still the placeholder value.
  GA4_ID: "G-XXXXXXXXXX",
  // [PLACEHOLDER: official social profile URLs]
  SAME_AS: [],
};

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, "src");
const DIST = path.resolve(ROOT, process.env.OUT_DIR || "dist");
const read = (p) => readFile(path.join(SRC, p), "utf8");
const B = CONFIG.BASE_PATH;
const consultHref = CONFIG.BOOKING_URL || `/contact/?type=consultation#enquiry`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const minifyCss = (css) =>
  css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,>])\s*/g, "$1").replace(/;}/g, "}").trim();
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const stripTags = (h) => h.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const slug = (s) => s.toLowerCase().replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const hashOf = (s) => createHash("sha256").update(s).digest("hex").slice(0, 10);

const tokens = (s) =>
  s
    .replaceAll("{{SITE_URL}}", CONFIG.SITE_URL)
    .replaceAll("{{SITE_NAME}}", CONFIG.SITE_NAME)
    .replaceAll("{{CONSULT_URL}}", consultHref)
    .replaceAll("{{YEAR}}", String(new Date().getFullYear()));

// Prefix root-relative URLs with BASE_PATH (GitHub Pages project sites live under /<repo>/).
const withBase = (s) =>
  B
    ? s
        .replace(/((?:href|src|action|data-base)=")\/(?!\/)/g, `$1${B}/`)
        .replace(/url\("\/(?!\/)/g, `url("${B}/`)
        .replace(/("(?:src|start_url)":\s*")\/(?!\/)/g, `$1${B}/`)
    : s;

// Deterministic PRNG so generated graphics are identical on every build.
function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------------------------------------------------------------------
// "Noise into signal" graphics
// ---------------------------------------------------------------------------
// Hero: scattered short marks (noise) on the left settle onto one clear rising line (signal).
function signalField({ seed = 7, w = 640, h = 440, count = 230 } = {}) {
  const r = rng(seed);
  const curve = (x) => 330 - 230 * Math.pow(Math.max(0, (x - 40) / (w - 80)), 1.6); // the signal line
  const slope = (x) => (curve(x + 1) - curve(x - 1)) / 2;
  let grid = "";
  for (let x = 40; x <= w - 40; x += 40) grid += `M${x} 40V${h - 50}`;
  for (let y = 40; y <= h - 50; y += 40) grid += `M40 ${y}H${w - 40}`;
  // Noise marks are bucketed into three opacity layers, so each layer is a single <path>.
  const layers = ["", "", ""];
  for (let i = 0; i < count; i++) {
    const x = 40 + r() * (w - 120);
    const t = (x - 40) / (w - 120); // 0 = pure noise, 1 = resolved
    const spread = 150 * Math.pow(1 - t, 1.4) + 4;
    const y = curve(x) + (r() - 0.5) * 2 * spread;
    const angle = Math.atan(slope(x)) + (r() - 0.5) * Math.PI * Math.pow(1 - t, 1.2);
    const len = 6 + r() * 10;
    const dx = (Math.cos(angle) * len) / 2, dy = (Math.sin(angle) * len) / 2;
    if (y < 30 || y > h - 60) continue;
    layers[Math.min(2, Math.floor(t * 3))] += `M${Math.round(x - dx)} ${Math.round(y - dy)}l${Math.round(2 * dx)} ${Math.round(2 * dy)}`;
  }
  const noise = layers.map((d, i) => `<path d="${d}" opacity="${[1, 0.7, 0.45][i]}"/>`).join("");
  let d = "";
  for (let x = w * 0.36; x <= w - 60; x += 6) d += `${d ? "L" : "M"}${Math.round(x)} ${Math.round(curve(x))}`;
  const ex = w - 60, ey = curve(ex);
  return `<svg class="signal-field" viewBox="0 0 ${w} ${h}" aria-hidden="true" focusable="false">
<path class="sf-grid" d="${grid}"/>
<g class="sf-noise">${noise}</g>
<path class="sf-signal" d="${d}"/>
<circle class="sf-halo" cx="${ex}" cy="${ey.toFixed(1)}" r="14"/><circle class="sf-point" cx="${ex}" cy="${ey.toFixed(1)}" r="5.5"/>
<g class="sf-label"><text x="40" y="${h - 22}">noise</text><text x="${w - 40}" y="${h - 22}" text-anchor="end">signal</text></g>
</svg>`;
}

// Section divider: jittery ticks that settle into a single flat line.
function signalRule(seed = 3) {
  const r = rng(seed);
  let ticks = "";
  for (let x = 0; x < 520; x += 8) {
    const t = x / 520;
    const amp = 10 * Math.pow(1 - t, 1.5) + 0.5;
    const y1 = 12 - r() * amp, y2 = 12 + r() * amp;
    ticks += `M${x} ${y1.toFixed(1)}V${y2.toFixed(1)}`;
  }
  return `<div class="signal-rule" aria-hidden="true"><svg viewBox="0 0 1200 24" preserveAspectRatio="none" focusable="false"><path class="sr-noise" d="${ticks}" vector-effect="non-scaling-stroke"/><path class="sr-signal" d="M520 12H1200" vector-effect="non-scaling-stroke"/></svg></div>`;
}

// ---------------------------------------------------------------------------
// Forms (Netlify Forms; see README "Forms")
// ---------------------------------------------------------------------------
const SERVICES = [
  ["audit", "Website and data audit"],
  ["digital-marketing", "Digital marketing"],
  ["ga4", "GA4 analytics and measurement"],
  ["seo", "SEO"],
  ["geo", "Generative Engine Optimization (GEO)"],
  ["aeo", "Answer Engine Optimization (AEO)"],
  ["cro", "Conversion rate optimization"],
  ["strategy", "Digital strategy consulting"],
  ["consultation", "Book a consultation"],
  ["not-sure", "Not sure yet"],
];

function formHtml(kind) {
  const isAudit = kind === "audit";
  const id = (f) => `${kind}-${f}`;
  const opts = SERVICES.filter(([v]) => !(isAudit && v === "consultation"))
    .map(([v, l]) => `<option value="${v}"${isAudit && v === "audit" ? " selected" : ""}>${l}</option>`)
    .join("");
  const err = (f) => `<p class="field__error" id="${id(f)}-error" aria-live="polite"></p>`;
  return `<form class="form" name="${kind}" method="POST" action="/thank-you/" data-netlify="true" netlify-honeypot="bot-field" data-form="${kind}" data-base="/" novalidate>
  <input type="hidden" name="form-name" value="${kind}">
  <div class="form-summary" data-form-summary tabindex="-1" role="alert" hidden><h3>Please fix the following:</h3><ul></ul></div>
  <p class="hp" aria-hidden="true"><label>Leave this empty <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
  <div class="form__row">
    <div class="field"><label for="${id("name")}">Name</label><input id="${id("name")}" name="name" type="text" autocomplete="name" required aria-describedby="${id("name")}-error">${err("name")}</div>
    <div class="field"><label for="${id("email")}">Email</label><input id="${id("email")}" name="email" type="email" autocomplete="email" spellcheck="false" required aria-describedby="${id("email")}-error">${err("email")}</div>
  </div>
  <div class="form__row">
    <div class="field"><label for="${id("company")}">Company <span class="opt">(optional)</span></label><input id="${id("company")}" name="company" type="text" autocomplete="organization"></div>
    <div class="field"><label for="${id("website")}">Website URL${isAudit ? "" : ' <span class="opt">(optional)</span>'}</label><input id="${id("website")}" name="website" type="text" inputmode="url" autocomplete="url" spellcheck="false" placeholder="www.example.com"${isAudit ? " required" : ""} aria-describedby="${id("website")}-error">${err("website")}</div>
  </div>
  <div class="field"><label for="${id("service")}">${isAudit ? "What would you most like to improve?" : "Service of interest"}</label><select id="${id("service")}" name="service" required aria-describedby="${id("service")}-error">${isAudit ? "" : '<option value="">Choose one</option>'}${opts}</select>${err("service")}</div>
  <div class="field"><label for="${id("message")}">${isAudit ? 'Anything else we should know? <span class="opt">(optional)</span>' : "Message"}</label><textarea id="${id("message")}" name="message" rows="5"${isAudit ? "" : " required"} aria-describedby="${id("message")}-hint ${id("message")}-error"></textarea><p class="field__hint" id="${id("message")}-hint">${isAudit ? "For example: your main goal, or a problem you have noticed." : "What would you like to improve? If you would like a consultation, suggest two or three times and your time zone."}</p>${err("message")}</div>
  <div class="field field--check"><input id="${id("consent")}" name="consent" type="checkbox" value="yes" required aria-describedby="${id("consent")}-error"><label for="${id("consent")}">I agree to Digi World using these details to reply to my ${isAudit ? "request" : "enquiry"}.</label>${err("consent")}</div>
  <p class="privacy-line">We use your details only to reply. We don't add you to a mailing list or share your details. Read our <a href="/privacy/">privacy policy</a>.</p>
  <div class="form-status" data-form-status role="status" tabindex="-1" hidden></div>
  <button class="btn btn--primary btn--lg" type="submit"><span data-label>${isAudit ? "Request my free audit" : "Send message"}</span><svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></button>
</form>`;
}

// ---------------------------------------------------------------------------
// Minimal Markdown for Insights articles (headings, paragraphs, lists, tables, bold, code, links)
// ---------------------------------------------------------------------------
function inline(s) {
  return esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}
function markdown(md) {
  const lines = md.replace(/\r/g, "").split("\n");
  let out = "", i = 0;
  const para = [];
  const flush = () => { if (para.length) { out += `<p>${inline(para.join(" "))}</p>\n`; para.length = 0; } };
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { flush(); i++; continue; }
    let m;
    if ((m = l.match(/^(#{2,3}) (.+)$/))) {
      flush();
      const lvl = m[1].length;
      out += `<h${lvl} id="${slug(m[2])}">${inline(m[2])}</h${lvl}>\n`;
      i++; continue;
    }
    if (/^\s*[-*] /.test(l)) {
      flush(); out += "<ul>";
      while (i < lines.length && /^\s*[-*] /.test(lines[i])) { out += `<li>${inline(lines[i].replace(/^\s*[-*] /, ""))}</li>`; i++; }
      out += "</ul>\n"; continue;
    }
    if (/^\d+\. /.test(l)) {
      flush(); out += "<ol>";
      while (i < lines.length && /^\d+\. /.test(lines[i])) { out += `<li>${inline(lines[i].replace(/^\d+\. /, ""))}</li>`; i++; }
      out += "</ol>\n"; continue;
    }
    if (l.startsWith("|")) {
      flush();
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) { rows.push(lines[i]); i++; }
      const cells = (r) => r.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const head = cells(rows[0]);
      out += `<div class="table-wrap" tabindex="0" role="region" aria-label="Comparison table (scrolls sideways on small screens)"><table><thead><tr>${head.map((c) => `<th scope="col">${inline(c)}</th>`).join("")}</tr></thead><tbody>`;
      for (const r of rows.slice(2)) out += `<tr>${cells(r).map((c, j) => (j === 0 ? `<th scope="row">${inline(c)}</th>` : `<td>${inline(c)}</td>`)).join("")}</tr>`;
      out += "</tbody></table></div>\n"; continue;
    }
    para.push(l.trim()); i++;
  }
  flush();
  return out;
}

// An article .md file: JSON front matter between <!--article ... -->, then the body.
// The body's "**Short answer:**" paragraph becomes the answer box, and the
// "## Frequently asked questions" section ("**Question?**" + answer lines) becomes an accordion.
function renderArticle(raw) {
  const m = raw.match(/^<!--article\s*([\s\S]*?)-->\s*/);
  const meta = JSON.parse(m[1]);
  let body = raw.slice(m[0].length);
  const sa = body.match(/^\*\*Short answer:\*\*\s*(.+)$/m);
  body = body.replace(sa[0], "");
  const [main, faqMd = ""] = body.split(/^## Frequently asked questions\s*$/m);
  const faqs = [...faqMd.matchAll(/\*\*(.+?)\*\*\n([\s\S]*?)(?=\n\*\*|$)/g)].map(([, q, a]) => ({ q: q.trim(), a: a.trim() }));
  const html = markdown(main);
  const toc = [...html.matchAll(/<h2 id="([^"]+)">(.*?)<\/h2>/g)].map(([, id, t]) => `<li><a href="#${id}">${t}</a></li>`).join("");
  const words = stripTags(main + faqMd).split(" ").length;
  return {
    meta,
    words,
    html: `
    <article class="article">
      <div class="container article__grid">
        <header class="article__head">
          <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/insights/">Insights</a></li><li aria-current="page">${esc(meta.short)}</li></ol></nav>
          <p class="eyebrow">${esc(meta.topic)}</p>
          <h1>${esc(meta.h1)}</h1>
          <p class="article__meta"><span>${esc(meta.author)}</span><span>Updated <time datetime="${meta.date}">${meta.dateText}</time></span><span>${Math.max(1, Math.round(words / 220))} min read</span></p>
        </header>
        <aside class="article__toc" aria-labelledby="toc-h"><h2 id="toc-h" class="label">In this guide</h2><ol>${toc}<li><a href="#faq">Frequently asked questions</a></li></ol></aside>
        <div class="article__body prose">
          <div class="answer" role="note" aria-label="Short answer"><p class="label">Short answer</p><p>${inline(sa[1])}</p></div>
          ${html}
          <h2 id="faq">Frequently asked questions</h2>
          <div class="faq">${faqs.map((f) => `<details class="faq__item"><summary>${inline(f.q)}</summary><div class="faq__answer"><p>${inline(f.a)}</p></div></details>`).join("")}</div>
          <div class="article__cta">
            <p class="label">Next step</p>
            <p>${inline(meta.cta)}</p>
            <a class="btn btn--primary" href="/audit/" data-event="audit_cta_click" data-location="article_${meta.slug}">Request a free website audit<svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a>
          </div>
        </div>
      </div>
    </article>
    {{RULE}}
    <section class="section" aria-labelledby="more-h"><div class="container"><h2 id="more-h" class="h3">More guides</h2>{{MORE_ARTICLES:${meta.slug}}}</div></section>`,
  };
}

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------
function extractFaq(html) {
  const re = /<details class="faq__item"[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>\s*<div class="faq__answer">([\s\S]*?)<\/div>\s*<\/details>/g;
  return [...html.matchAll(re)].map(([, q, a]) => ({ "@type": "Question", name: stripTags(q), acceptedAnswer: { "@type": "Answer", text: stripTags(a) } }));
}
function jsonLd(meta, url, body) {
  const orgId = `${CONFIG.SITE_URL}/#organization`, siteId = `${CONFIG.SITE_URL}/#website`;
  const graph = [
    {
      "@type": "Organization", "@id": orgId, name: CONFIG.SITE_NAME, url: `${CONFIG.SITE_URL}/`,
      logo: `${CONFIG.SITE_URL}/assets/img/logo-512.png`,
      description: "Digi World is a digital growth consultancy. We measure how a business's website performs, then recommend and deliver improvements across SEO, AI search visibility (GEO and AEO), GA4 analytics, and conversion.",
      ...(CONFIG.PUBLIC_EMAIL ? { email: CONFIG.PUBLIC_EMAIL } : {}),
      ...(CONFIG.SAME_AS.length ? { sameAs: CONFIG.SAME_AS } : {}),
    },
    { "@type": "WebSite", "@id": siteId, url: `${CONFIG.SITE_URL}/`, name: CONFIG.SITE_NAME, inLanguage: "en", publisher: { "@id": orgId } },
    { "@type": meta.pageType || "WebPage", "@id": `${url}#webpage`, url, name: meta.title, description: meta.description, inLanguage: "en", isPartOf: { "@id": siteId } },
  ];
  if (meta.path !== "/") {
    const crumbs = [{ name: "Home", url: `${CONFIG.SITE_URL}/` }, ...(meta.crumbs || [{ name: meta.crumb || meta.title, url }])];
    graph.push({ "@type": "BreadcrumbList", itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.url })) });
  }
  graph.push(...(meta.jsonld || []));
  const faq = extractFaq(body);
  if (faq.length) graph.push({ "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: faq });
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------
async function main() {
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  const [layout, header, footer, sprite, consent, css, js] = await Promise.all(
    ["partials/layout.html", "partials/header.html", "partials/footer.html", "partials/icons.svg", "partials/consent.html", "assets/css/site.css", "assets/js/main.js"].map(read),
  );
  const wordmark = wordmarkSvg(path.join(SRC, "partials/wordmark.json"), { height: 26, title: false });
  const wordmarkSymbol = wordmark.replace(/^<svg class="wordmark" viewBox="([^"]+)"[^>]*>/, '<symbol id="wordmark" viewBox="$1">').replace(/<\/svg>$/, "</symbol>");
  // The <use> references a <symbol> with its own viewBox, so the outer viewport starts at 0 0.
  const [, , wmW, wmH] = wordmark.match(/viewBox="([^"]+)"/)[1].split(" ");
  const wmViewBox = `0 0 ${wmW} ${wmH}`;
  const inlineCss = minifyCss(css);
  const jsOut = js.replace("__GA4_ID__", CONFIG.GA4_ID).replace("__FORM_EMAIL__", CONFIG.FORM_EMAIL);
  const jsVersion = hashOf(jsOut);

  // Collect pages: HTML pages plus Markdown articles.
  const pages = [];
  for (const f of (await readdir(path.join(SRC, "pages"))).filter((f) => f.endsWith(".html"))) {
    const raw = await read(`pages/${f}`);
    const m = raw.match(/^<!--page\s*([\s\S]*?)-->\s*/);
    if (!m) throw new Error(`${f}: missing <!--page {...} --> front matter`);
    pages.push({ file: f, meta: JSON.parse(tokens(m[1])), body: raw.slice(m[0].length) });
  }
  const articles = [];
  for (const f of (await readdir(path.join(SRC, "content/insights"))).filter((f) => f.endsWith(".md")).sort()) {
    const a = renderArticle(await read(`content/insights/${f}`));
    const url = `${CONFIG.SITE_URL}/insights/${a.meta.slug}/`;
    articles.push(a);
    pages.push({
      file: f, body: a.html, words: a.words,
      meta: {
        title: a.meta.title, description: a.meta.description, path: `/insights/${a.meta.slug}/`, nav: "insights", ogType: "article",
        crumbs: [{ name: "Insights", url: `${CONFIG.SITE_URL}/insights/` }, { name: a.meta.short, url }],
        jsonld: [{
          "@type": "Article", "@id": `${url}#article`, headline: a.meta.h1, description: a.meta.description,
          datePublished: a.meta.date, dateModified: a.meta.date, inLanguage: "en",
          author: { "@type": "Organization", "@id": `${CONFIG.SITE_URL}/#organization`, name: CONFIG.SITE_NAME },
          publisher: { "@id": `${CONFIG.SITE_URL}/#organization` }, mainEntityOfPage: { "@id": `${url}#webpage` },
          image: `${CONFIG.SITE_URL}/assets/img/og-image.png`, wordCount: a.words,
        }],
      },
    });
  }
  const articleCard = (a) => `<li class="card card--link post-card">
    <p class="label">${esc(a.meta.topic)} · ${Math.max(1, Math.round(a.words / 220))} min read</p>
    <h3><a href="/insights/${a.meta.slug}/">${esc(a.meta.h1)}</a></h3>
    <p>${esc(a.meta.description)}</p>
    <span class="card__more" aria-hidden="true">Read the guide<svg class="icon icon--sm"><use href="#i-arrow"/></svg></span>
  </li>`;
  const articleList = (exclude) => `<ul class="card-grid card-grid--3" role="list">${articles.filter((a) => a.meta.slug !== exclude).map(articleCard).join("")}</ul>`;

  const report = [];
  for (const { file, meta, body } of pages) {
    const url = `${CONFIG.SITE_URL}${meta.path}`;
    const fullTitle = meta.path === "/" ? meta.title : `${meta.title} | ${CONFIG.SITE_NAME}`;
    const noindex = meta.noindex || meta.hidden;
    const content = body
      .replaceAll("{{SIGNAL_FIELD}}", signalField())
      .replaceAll("{{RULE}}", signalRule())
      .replaceAll("{{FORM:audit}}", formHtml("audit"))
      .replaceAll("{{FORM:contact}}", formHtml("contact"))
      .replaceAll("{{ARTICLES}}", articleList())
      .replace(/\{\{MORE_ARTICLES:([a-z0-9-]+)\}\}/g, (_, s) => articleList(s));
    const navHeader = header.replace(new RegExp(`data-nav="${meta.nav}"`, "g"), `data-nav="${meta.nav}" aria-current="page"`);
    let html = layout
      .replace("{{ROBOTS}}", noindex ? "noindex, follow" : "index, follow, max-image-preview:large")
      .replaceAll("{{TITLE}}", esc(fullTitle))
      .replaceAll("{{DESCRIPTION}}", esc(meta.description))
      .replaceAll("{{URL}}", esc(url))
      .replace("{{OG_TYPE}}", meta.ogType || "website")
      .replace("{{CSS}}", inlineCss)
      .replace("{{JS_VERSION}}", jsVersion)
      .replace("{{JSONLD}}", jsonLd(meta, url, content))
      .replace("{{SPRITE}}", sprite.replace("<!--WORDMARK-->", wordmarkSymbol))
      .replace("{{HEADER}}", navHeader)
      .replace("{{FOOTER}}", footer)
      .replace("{{CONSENT}}", consent)
      .replaceAll("{{WORDMARK_VIEWBOX}}", wmViewBox)
      .replace("{{CONTENT}}", content);
    html = withBase(tokens(html));
    if ((html.match(/<h1[\s>]/g) || []).length !== 1) throw new Error(`${file}: expected exactly one <h1>`);
    if (/\{\{[A-Z_:a-z0-9-]+\}\}/.test(html)) throw new Error(`${file}: unreplaced token ${html.match(/\{\{[^}]+\}\}/)[0]}`);
    const out = meta.path.endsWith(".html") ? path.join(DIST, meta.path) : path.join(DIST, meta.path, "index.html");
    await mkdir(path.dirname(out), { recursive: true });
    await writeFile(out, html);
    report.push({ path: meta.path, bytes: Buffer.byteLength(html), noindex, url, meta });
  }

  // Assets and static files
  await cp(path.join(SRC, "assets"), path.join(DIST, "assets"), { recursive: true });
  await rm(path.join(DIST, "assets/css"), { recursive: true, force: true });
  await writeFile(path.join(DIST, "assets/js/main.js"), jsOut);
  for (const entry of await readdir(path.join(SRC, "static"))) {
    const from = path.join(SRC, "static", entry);
    if (!(await stat(from)).isFile()) continue;
    const buf = await readFile(from);
    const text = /\.(txt|xml|json|webmanifest|html|toml)$|^_headers$|^_redirects$/.test(entry);
    await writeFile(path.join(DIST, entry), text ? withBase(tokens(buf.toString("utf8"))) : buf);
  }

  // sitemap.xml + robots.txt
  const today = new Date().toISOString().slice(0, 10);
  const indexable = report.filter((p) => !p.noindex).sort((a, b) => a.path.localeCompare(b.path));
  await writeFile(path.join(DIST, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable.map((p) => `  <url><loc>${p.url}</loc><lastmod>${today}</lastmod></url>`).join("\n")}\n</urlset>\n`);
  await writeFile(path.join(DIST, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${CONFIG.SITE_URL}/sitemap.xml\n`);

  // Page weight report (HTML + fonts + JS; images excluded per the performance budget)
  const fontBytes = (await Promise.all((await readdir(path.join(SRC, "assets/fonts"))).filter((f) => f.endsWith(".woff2")).map((f) => stat(path.join(SRC, "assets/fonts", f))))).reduce((s, x) => s + x.size, 0);
  const jsBytes = Buffer.byteLength(jsOut);
  const lines = report.sort((a, b) => a.path.localeCompare(b.path)).map((p) => {
    const total = p.bytes + fontBytes + jsBytes;
    return `${p.path.padEnd(42)} html ${(p.bytes / 1024).toFixed(1).padStart(5)} KB  total ${(total / 1024).toFixed(1).padStart(6)} KB${total > 150 * 1024 ? "  OVER BUDGET" : ""}${p.noindex ? "  (noindex)" : ""}`;
  });
  await writeFile(path.join(ROOT, "page-weights.txt"), `Uncompressed bytes per page: HTML (CSS inlined) + fonts (${(fontBytes / 1024).toFixed(1)} KB) + JS (${(jsBytes / 1024).toFixed(1)} KB). Budget: 150 KB excluding images.\n\n${lines.join("\n")}\n`);
  console.log(`Built ${report.length} pages (${indexable.length} in sitemap) -> ${path.relative(ROOT, DIST)}/  SITE_URL=${CONFIG.SITE_URL} BASE_PATH=${B || "(root)"}`);
  if (lines.some((l) => l.includes("OVER BUDGET"))) console.warn("Warning: some pages are over the 150 KB budget (see page-weights.txt)");
}

main().catch((e) => { console.error(e); process.exit(1); });
