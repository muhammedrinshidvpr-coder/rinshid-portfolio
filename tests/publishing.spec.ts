import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('published article has working TOC, code copy, translation, and published-only series navigation', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/writing/fixture-guide/');
  await expect(page.getByText('In this entry', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Copy code' }).click();
  await expect(page.getByRole('status')).toContainText('Code copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('Fixture code copied');
  await expect(page.getByRole('navigation', { name: 'Guide series' }).getByRole('link')).toHaveAttribute('href', '/writing/fixture-next/');
  await page.getByRole('link', { name: 'മലയാളത്തിൽ വായിക്കുക →' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ml');
  await page.setViewportSize({ width: 320, height: 700 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()).violations).toEqual([]);
});

test('archive filters real content with shareable query state and clear empty results', async ({ page }) => {
  await page.goto('/writing/?language=ml&q=പഠിക്കാം');
  await expect(page.locator('[data-entry]:visible')).toHaveCount(1);
  await page.getByRole('searchbox').fill('not-a-real-word');
  await expect(page.locator('#empty-results')).toBeVisible();
  await expect(page).toHaveURL(/q=not-a-real-word/);
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.locator('[data-entry]:visible')).toHaveCount(3);
});

test('video loads third-party player only on request and transcript search works', async ({ page }) => {
  const requests: string[] = []; page.on('request', (request) => { if (/youtube|vimeo/.test(request.url())) requests.push(request.url()); });
  await page.route('https://www.youtube-nocookie.com/**', (route) => route.fulfill({ body: '<html><body>Controlled external boundary</body></html>', contentType: 'text/html' }));
  await page.goto('/videos/fixture-video/'); expect(requests).toEqual([]);
  await page.getByLabel('Find in transcript').fill('testing');
  await expect(page.locator('#transcript mark')).toHaveCount(2);
  await page.getByRole('button', { name: 'Load YouTube player' }).click();
  await expect(page.locator('iframe')).toHaveAttribute('title', 'Fixture video');
  await expect.poll(() => requests.length).toBeGreaterThan(0);
});

test('published feed and relationships include real entries but not draft canaries', async ({ request, page }) => {
  const rss = await (await request.get('/rss.xml')).text(); expect(rss).toContain('Fixture guide in English'); expect(rss).not.toContain('CANARY');
  expect((await request.get('/writing/draft-canary/')).status()).toBe(404);
  await page.goto('/projects/blinkbreak/'); await expect(page.getByRole('link', { name: 'Fixture video →' })).toBeVisible();
  await page.goto('/videos/'); await expect(page.getByRole('heading', { level: 2, name: 'Fixture video', exact: true })).toBeVisible();
});
