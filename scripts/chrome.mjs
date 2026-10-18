/**
 * Starts headless Chrome for the build scripts (generate-cv.mjs, prerender.mjs).
 *
 * Tries, in order: PUPPETEER_EXECUTABLE_PATH or Puppeteer's bundled Chrome, then any system
 * Chromium / Chrome found at the usual Linux paths (the bundled one does not run on ARM servers).
 * When a Chrome only fails because its sandbox is unavailable (Ubuntu 23.10+ restricts the user
 * namespaces it needs), it is started again without it: it only ever opens this site, locally.
 */
import { existsSync } from 'node:fs';
import puppeteer from 'puppeteer';

const SYSTEM_CHROMES = [
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/snap/bin/chromium',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/google-chrome',
];

const isSandboxError = (error) => /sandbox/i.test(String(error?.message || error));

export async function launchChrome() {
  const executables = [undefined, ...(process.env.PUPPETEER_EXECUTABLE_PATH ? [] : SYSTEM_CHROMES.filter(existsSync))];
  let lastError;
  for (const executablePath of executables) {
    try {
      return await puppeteer.launch({ headless: true, executablePath });
    } catch (error) {
      lastError = error;
      if (!isSandboxError(error)) continue;
    }
    try {
      return await puppeteer.launch({ headless: true, executablePath, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

/** The useful part of a launch error: Puppeteer puts Chrome's own output after a generic first line. */
export function launchErrorReason(error) {
  const lines = String(error?.message || error)
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('TROUBLESHOOTING'));
  return lines.slice(0, 3).join(' / ') || 'unknown error';
}
