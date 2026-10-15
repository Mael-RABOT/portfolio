/**
 * Generates the downloadable CV PDFs from the HTML CV (/cv/en, /cv/fr).
 *
 *   npm run cv:pdf        (also runs automatically before `vite build`)
 *
 * Prints each CV page with headless Chrome (served by a temporary Vite dev
 * server) and writes the PDFs to public/ (paths come from RESUME_PDF in
 * src/data/contact.data.ts). Fails if the French CV does not fit on one page.
 *
 * Chrome: Puppeteer's bundled Chrome is used by default. On machines where it
 * cannot run (e.g. Linux ARM servers), point PUPPETEER_EXECUTABLE_PATH at a
 * system Chromium, or let the script skip: the PDFs committed in public/ are
 * kept and the build continues. Set CV_PDF_STRICT=1 to make that a hard error.
 */
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createServer } from 'vite';
import puppeteer from 'puppeteer';

const MAX_PAGES = { en: 2, fr: 1 };

const countPages = (pdf) => (Buffer.from(pdf).toString('latin1').match(/\/Type\s*\/Page(?![s\w])/g) || []).length;

// 1. Start Chrome first: if it is unavailable there is nothing else to clean up.
let browser;
try {
  browser = await puppeteer.launch({ headless: true });
} catch (error) {
  const reason = String(error?.message || error).split('\n').find((line) => line.trim()) ?? 'unknown error';
  const message = [
    `⚠ CV PDFs not regenerated: Chrome could not start (${reason.trim()}).`,
    '  The PDFs committed in public/ are kept. To regenerate them, run `npm run cv:pdf` on a machine',
    '  where Chrome works, or set PUPPETEER_EXECUTABLE_PATH to a system Chromium.',
  ].join('\n');
  if (process.env.CV_PDF_STRICT) {
    console.error(message);
    process.exit(1);
  }
  console.warn(message);
  process.exit(0);
}

// 2. Serve the app and print each CV.
const server = await createServer({
  logLevel: 'error',
  server: { port: 0, hmr: false },
});

let failed = false;

try {
  await server.listen();
  const baseUrl = server.resolvedUrls.local[0].replace(/\/$/, '');
  const { RESUME_PDF } = await server.ssrLoadModule('/src/data/contact.data.ts');
  const page = await browser.newPage();

  for (const lang of Object.keys(MAX_PAGES)) {
    await page.goto(`${baseUrl}/cv/${lang}`, { waitUntil: 'networkidle0', timeout: 60_000 });
    await page.waitForSelector('.cv-sheet');
    await page.evaluate(() => document.fonts.ready);

    // Same margin as the `cv.pageMargin` token (also mirrored in the @page rule)
    const margin = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--cv-page-margin').trim() || '12mm'
    );

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: margin, right: margin, bottom: margin, left: margin },
    });

    const pages = countPages(pdf);
    const out = join('public', RESUME_PDF[lang].href.replace(/^\//, ''));
    await writeFile(out, pdf);
    console.log(`CV ${lang}: ${out} (${pages} page${pages > 1 ? 's' : ''})`);

    if (pages > MAX_PAGES[lang]) {
      console.error(`✖ The ${lang.toUpperCase()} CV must fit on ${MAX_PAGES[lang]} page(s) but has ${pages}: shorten src/data/cv.data.ts.`);
      failed = true;
    }
  }
} catch (error) {
  console.error(error);
  failed = true;
} finally {
  await browser.close();
  await server.close();
}

process.exit(failed ? 1 : 0);
