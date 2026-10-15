/**
 * Generates the downloadable CV PDFs from the HTML CV (/cv/en, /cv/fr).
 *
 *   npm run cv:pdf        (also runs automatically before `vite build`)
 *
 * Starts a Vite dev server, prints each CV page with headless Chrome and writes
 * the PDFs to public/ (paths come from RESUME_PDF in src/data/contact.data.ts).
 * Fails if the French CV does not fit on a single page.
 */
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createServer } from 'vite';
import puppeteer from 'puppeteer';

const MAX_PAGES = { en: 2, fr: 1 };

const countPages = (pdf) => (Buffer.from(pdf).toString('latin1').match(/\/Type\s*\/Page(?![s\w])/g) || []).length;

const server = await createServer({
  logLevel: 'error',
  server: { port: 0, hmr: false },
});

let failed = false;
let browser;

try {
  await server.listen();
  const baseUrl = server.resolvedUrls.local[0].replace(/\/$/, '');
  const { RESUME_PDF } = await server.ssrLoadModule('/src/data/contact.data.ts');

  browser = await puppeteer.launch({ headless: true });
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
  await browser?.close();
  await server.close();
}

process.exit(failed ? 1 : 0);
