#!/usr/bin/env node
// Digi World static site build. Zero dependencies: `node build.mjs`.
//
// - Assembles each page in src/pages from the shared layout and partials.
// - Inlines the (small) stylesheet so pages render with no blocking requests.
// - Builds per-page <head> SEO tags and a JSON-LD @graph.
//   FAQPage JSON-LD is generated from the visible FAQ markup, so the two never drift.
// - Writes sitemap.xml and robots.txt, and copies assets and static files to dist/.

import { readFile, writeFile, mkdir, readdir, cp, rm, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Site configuration. Replace the placeholders before launch.
// ---------------------------------------------------------------------------
const CONFIG = {
  // Production URL, no trailing slash. Currently the free GitHub Pages address.
  // [PLACEHOLDER: replace with your own domain when you have one, and set BASE_PATH to ""]
  SITE_URL: "https://csm-gif.github.io/None",
  // Sub-path the site is served from ("" at a domain root; "/None" on GitHub Pages for this repo).
  BASE_PATH: "/None",
  SITE_NAME: "Digi World",
  EMAIL: "wealthop202@gmail.com",
  // [PLACEHOLDER: booking link, e.g. a scheduling page]. Until set, consultations go to the contact form.
  BOOKING_URL: "/contact/?enquiry=consultation#enquiry",
  // [PLACEHOLDER: form endpoint, e.g. a form service URL]. Empty = mailto fallback (see README).
  FORM_ENDPOINT: "",
  // [PLACEHOLDER: official social profile URLs for Organization.sameAs]
  SAME_AS: [],
};

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, "src");
const DIST = path.join(ROOT, "dist");

const read = (p) => readFile(path.join(SRC, p), "utf8");

const minifyCss = (css) =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();

const escapeAttr = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const stripTags = (html) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const replaceTokens = (s) =>
  s
    .replaceAll("{{SITE_URL}}", CONFIG.SITE_URL)
    .replaceAll("{{SITE_NAME}}", CONFIG.SITE_NAME)
    .replaceAll("{{EMAIL}}", CONFIG.EMAIL)
    .replaceAll("{{BOOKING_URL}}", CONFIG.BOOKING_URL)
    .replaceAll("{{FORM_ENDPOINT}}", CONFIG.FORM_ENDPOINT)
    .replaceAll("{{YEAR}}", String(new Date().getFullYear()));

// Prefix root-relative URLs ("/about/", url("/assets/...")) with BASE_PATH.
const withBase = (s) =>
  CONFIG.BASE_PATH
    ? s
        .replace(/((?:href|src|action)=")\/(?!\/)/g, `$1${CONFIG.BASE_PATH}/`)
        .replace(/url\("\/(?!\/)/g, `url("${CONFIG.BASE_PATH}/`)
        .replace(/("(?:src|start_url)":\s*")\/(?!\/)/g, `$1${CONFIG.BASE_PATH}/`)
    : s;

// Each page starts with <!--page { ...json... } --> followed by its <main> content.
function parsePage(raw, file) {
  const m = raw.match(/^<!--page\s*([\s\S]*?)-->\s*/);
  if (!m) throw new Error(`${file}: missing <!--page {...} --> front matter`);
  return { meta: JSON.parse(replaceTokens(m[1])), body: raw.slice(m[0].length) };
}

function extractFaq(html) {
  const re =
    /<details class="faq__item"[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>\s*<div class="faq__answer">([\s\S]*?)<\/div>\s*<\/details>/g;
  return [...html.matchAll(re)].map(([, q, a]) => ({
    "@type": "Question",
    name: stripTags(q),
    acceptedAnswer: { "@type": "Answer", text: stripTags(a) },
  }));
}

function buildJsonLd(meta, url, body) {
  const orgId = `${CONFIG.SITE_URL}/#organization`;
  const siteId = `${CONFIG.SITE_URL}/#website`;
  const graph = [
    {
      "@type": "Organization",
      "@id": orgId,
      name: CONFIG.SITE_NAME,
      url: `${CONFIG.SITE_URL}/`,
      email: `mailto:${CONFIG.EMAIL}`,
      logo: `${CONFIG.SITE_URL}/assets/img/logo-512.png`,
      description:
        "Digi World is a digital growth consultancy that helps small and mid-sized businesses grow through data-driven marketing, SEO, analytics, and conversion work.",
      ...(CONFIG.SAME_AS.length ? { sameAs: CONFIG.SAME_AS } : {}),
    },
    {
      "@type": "WebSite",
      "@id": siteId,
      url: `${CONFIG.SITE_URL}/`,
      name: CONFIG.SITE_NAME,
      inLanguage: "en",
      publisher: { "@id": orgId },
    },
    {
      "@type": meta.pageType || "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: meta.title,
      description: meta.description,
      inLanguage: "en",
      isPartOf: { "@id": siteId },
      about: { "@id": orgId },
    },
  ];
  if (meta.path !== "/") {
    const crumbs = [{ name: "Home", url: `${CONFIG.SITE_URL}/` }, ...(meta.breadcrumbs || [])];
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: c.url,
      })),
    });
  }
  graph.push(...(meta.jsonld || []));
  const faq = extractFaq(body);
  if (faq.length) graph.push({ "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: faq });
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2).replace(
    /</g,
    "\\u003c",
  );
}

async function listPages(dir, base = "") {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const rel = path.join(base, entry.name);
    if (entry.isDirectory()) out.push(...(await listPages(path.join(dir, entry.name), rel)));
    else if (entry.name.endsWith(".html")) out.push(rel);
  }
  return out;
}

const hashOf = (s) => createHash("sha256").update(s).digest("hex").slice(0, 10);

async function main() {
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  const [layout, header, footer, sprite, css, js] = await Promise.all([
    read("partials/layout.html"),
    read("partials/header.html"),
    read("partials/footer.html"),
    read("partials/icons.svg"),
    read("assets/css/site.css"),
    read("assets/js/main.js"),
  ]);
  const inlineCss = minifyCss(css);
  const jsVersion = hashOf(js);

  const pages = [];
  for (const file of await listPages(path.join(SRC, "pages"))) {
    const { meta, body } = parsePage(await read(path.join("pages", file)), file);
    const url = `${CONFIG.SITE_URL}${meta.path}`;
    const fullTitle = meta.path === "/" ? meta.title : `${meta.title} | ${CONFIG.SITE_NAME}`;

    // Mark the current nav item.
    const navHeader = header.replace(
      new RegExp(`data-nav="${meta.nav}"`, "g"),
      `data-nav="${meta.nav}" aria-current="page"`,
    );

    const html = withBase(replaceTokens(
      layout
        .replace("{{ROBOTS}}", meta.noindex ? "noindex, follow" : "index, follow, max-image-preview:large")
        .replace("{{CANONICAL}}", escapeAttr(url))
        .replaceAll("{{TITLE}}", escapeAttr(fullTitle))
        .replaceAll("{{DESCRIPTION}}", escapeAttr(meta.description))
        .replaceAll("{{URL}}", escapeAttr(url))
        .replace("{{OG_TYPE}}", meta.ogType || "website")
        .replace("{{CSS}}", inlineCss)
        .replace("{{JS_VERSION}}", jsVersion)
        .replace("{{JSONLD}}", buildJsonLd(meta, url, body))
        .replace("{{SPRITE}}", sprite)
        .replace("{{HEADER}}", navHeader)
        .replace("{{FOOTER}}", footer)
        .replace("{{CONTENT}}", body),
    ));

    const outFile = meta.path.endsWith(".html")
      ? path.join(DIST, meta.path)
      : path.join(DIST, meta.path, "index.html");
    await mkdir(path.dirname(outFile), { recursive: true });
    await writeFile(outFile, html);
    pages.push({ ...meta, url, outFile });
    if ((html.match(/<h1[\s>]/g) || []).length !== 1)
      throw new Error(`${file}: expected exactly one <h1>`);
  }

  // Assets and static files.
  await cp(path.join(SRC, "assets"), path.join(DIST, "assets"), { recursive: true });
  await rm(path.join(DIST, "assets/css"), { recursive: true, force: true }); // CSS is inlined
  await writeFile(path.join(DIST, "assets/js/main.js"), replaceTokens(js));
  for (const entry of await readdir(path.join(SRC, "static"))) {
    const from = path.join(SRC, "static", entry);
    if ((await stat(from)).isFile()) {
      const content = await readFile(from);
      const isText = /\.(txt|xml|json|webmanifest|html)$|^_headers$/.test(entry);
      await writeFile(path.join(DIST, entry), isText ? withBase(replaceTokens(content.toString("utf8"))) : content);
    }
  }

  // sitemap.xml and robots.txt
  const today = new Date().toISOString().slice(0, 10);
  const indexable = pages.filter((p) => !p.noindex).sort((a, b) => a.path.localeCompare(b.path));
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url><loc>${p.url}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`;
  await writeFile(path.join(DIST, "sitemap.xml"), sitemap);
  await writeFile(
    path.join(DIST, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${CONFIG.SITE_URL}/sitemap.xml\n`,
  );

  console.log(
    `Built ${pages.length} pages (${indexable.length} in sitemap), CSS ${(inlineCss.length / 1024).toFixed(1)} KB inlined -> ${path.relative(process.cwd(), DIST) || "dist"}/`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
