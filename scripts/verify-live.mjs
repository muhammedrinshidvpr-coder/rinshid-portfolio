import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const origin = process.argv[2] || 'https://rinshid-portfolio.vercel.app';
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const route of ['/', '/projects/', '/projects/blinkbreak/', '/projects/cosmiq-sync/', '/projects/pragathi-keam-portal/', '/writing/', '/guides/', '/videos/', '/about/', '/now/', '/links/', '/contact/']) {
    const response = await page.goto(`${origin}${route}`);
    assert.equal(response.status(), 200, route);
    assert.equal(await page.locator('h1').count(), 1, `${route}: one primary heading`);
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `${origin}${route}`);
    assert(!/CANARY|fixture-guide|fixture-video/.test(await page.content()), route);
  }
  for (const route of ['/rss.xml', '/sitemap-index.xml', '/sitemap-0.xml', '/robots.txt']) assert.equal((await context.request.get(`${origin}${route}`)).status(), 200, route);
  for (const route of ['/writing/draft-canary/', '/videos/draft-video/', '/projects/private-project-canary/', '/writing/fixture-guide/', '/.local/discovery.md', '/src/content/writing/draft-canary.md']) assert.equal((await context.request.get(`${origin}${route}`)).status(), 404, route);
  const legacy = await context.request.get(`${origin}/Rinshid_CV.html`); assert.equal(new URL(legacy.url()).pathname, '/about/');
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto(origin);
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await page.getByLabel('Appearance').selectOption('dark'); await page.reload();
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Projects', exact: true }).click();
  assert.equal(new URL(page.url()).pathname, '/projects/');
  assert.deepEqual(errors, []);
  console.log(`Live verification passed: ${origin}. Public routes/feeds/canonicals, private/draft 404s, CV redirect, mobile navigation and theme persistence.`);
} finally { await browser.close(); }
