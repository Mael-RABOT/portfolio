/**
 * Prerenders every page of the built site to static HTML, and writes the sitemap.
 *
 *   npm run prerender     (runs automatically after `vite build`)
 *
 * 1. Reads the featured projects (they get /projects/<id> pages) and writes dist/sitemap.xml,
 *    with the English and French URL of each page linked as alternates.
 * 2. Serves dist/ (vite preview), opens each page in headless Chrome and saves the rendered
 *    document as dist/<route>/index.html. Crawlers and link previews that don't run JavaScript
 *    then get the real title, meta tags and text of each page.
 *
 * Visitors with JavaScript see exactly what they saw before: the inline script in index.html
 * keeps the prerendered markup hidden and src/main.tsx replaces it with the live app.
 * The server must try `$uri/index.html` before falling back to `/index.html` (see README).
 *
 * Chrome: same rules as generate-cv.mjs. If it cannot start, prerendering is skipped (the site
 * still works as a plain SPA); set PRERENDER_STRICT=1 to make that a hard error.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { createServer, preview } from 'vite';
import puppeteer from 'puppeteer';

const DIST = 'dist';
const PAGES = ['/', '/projects', '/resume', '/contact', '/accessibility', '/legal'];
const LANGS = { en: '', fr: '/fr' };

const localized = (path, lang) => (lang === 'en' ? path : path === '/' ? LANGS.fr : `${LANGS.fr}${path}`);

// 1. Routes and sitemap (no Chrome needed)
const loader = await createServer({ logLevel: 'error', appType: 'custom', server: { middlewareMode: true, hmr: false } });
let siteUrl;
let routes;
try {
  const { LOCAL_PROJECTS } = await loader.ssrLoadModule('/src/data/projects.data.ts');
  ({ SITE_URL: siteUrl } = await loader.ssrLoadModule('/src/data/contact.data.ts'));
  routes = [...PAGES, ...LOCAL_PROJECTS.filter((p) => p.featured).map((p) => `/projects/${p.id}`)];
} finally {
  await loader.close();
}

const absolute = (path) => `${siteUrl}${path}`;
const today = new Date().toISOString().slice(0, 10);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...routes.flatMap((path) =>
    Object.keys(LANGS).map((lang) =>
      [
        '  <url>',
        `    <loc>${absolute(localized(path, lang))}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        ...Object.keys(LANGS).map(
          (alt) => `    <xhtml:link rel="alternate" hreflang="${alt}" href="${absolute(localized(path, alt))}"/>`
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute(path)}"/>`,
        '  </url>',
      ].join('\n')
    )
  ),
  '</urlset>',
  '',
].join('\n');
await writeFile(join(DIST, 'sitemap.xml'), sitemap);
console.log(`Sitemap: ${join(DIST, 'sitemap.xml')} (${routes.length * 2} URLs)`);

// 2. Prerender
let browser;
try {
  browser = await puppeteer.launch({ headless: true });
} catch (error) {
  const reason = String(error?.message || error).split('\n').find((line) => line.trim()) ?? 'unknown error';
  const message = `⚠ Pages not prerendered: Chrome could not start (${reason.trim()}). The site still works as a plain SPA.`;
  if (process.env.PRERENDER_STRICT) {
    console.error(message);
    process.exit(1);
  }
  console.warn(message);
  process.exit(0);
}

const server = await preview({ logLevel: 'error', preview: { port: 0, open: false } });
const pages = new Map();
let failed = false;

try {
  const baseUrl = server.resolvedUrls.local[0].replace(/\/$/, '');
  const page = await browser.newPage();
  // A fixed, neutral visitor: English browser, nothing saved, no animations mid-capture
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'en' });
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'language', { get: () => 'en-US' });
    Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
  });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);

  for (const path of routes) {
    for (const lang of Object.keys(LANGS)) {
      const route = localized(path, lang);
      await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle0', timeout: 60_000 });
      await page.waitForSelector('#content');
      await page.evaluate(() => document.fonts.ready);

      const html = await page.evaluate(() => {
        const root = document.documentElement;
        // final state of the scroll reveals, since no one will scroll this copy
        document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
        // MUI (emotion) inserts its rules through the CSSOM: copy them into the tags so they survive serialisation
        document.querySelectorAll('style[data-emotion]').forEach((style) => {
          const rules = style.sheet ? Array.from(style.sheet.cssRules, (rule) => rule.cssText).join('\n') : '';
          if (rules) style.textContent = rules;
          style.setAttribute('data-prerender', '');
        });
        document.getElementById('root')?.setAttribute('data-prerendered', '');
        // runtime-only state: `js` would hide the copy for visitors without JavaScript
        root.classList.remove('js');
        if (!root.classList.length) root.removeAttribute('class');
        root.removeAttribute('data-vt');
        root.style.removeProperty('background-color');
        if (!root.getAttribute('style')) root.removeAttribute('style');
        return `<!doctype html>\n${root.outerHTML}`;
      });

      const actual = new URL(page.url()).pathname.replace(/\/$/, '') || '/';
      if (actual !== route) {
        console.error(`✖ ${route} redirected to ${actual}`);
        failed = true;
        continue;
      }
      pages.set(route, html);
    }
  }
} catch (error) {
  console.error(error);
  failed = true;
} finally {
  await browser.close();
  await new Promise((resolve) => server.httpServer.close(resolve));
}

// Written after the server is closed, so every page was rendered from the original index.html
for (const [route, html] of pages) {
  const out = join(DIST, route === '/' ? '' : route, 'index.html');
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, html);
}
console.log(`Prerendered ${pages.size} pages into ${DIST}/`);

process.exit(failed ? 1 : 0);
