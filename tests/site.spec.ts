import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('visitors can explore projects and contact the author without broken routes', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'BlinkBreak', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('BlinkBreak');
  await expect(page.getByRole('heading', { name: 'What it does' })).toBeVisible();
  await page.getByRole('navigation', { name: 'Explore more' }).getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page.getByRole('link', { name: 'muhammedrinshidvpr@gmail.com' })).toHaveAttribute('href', 'mailto:muhammedrinshidvpr@gmail.com');
});

test('dark appearance persists and system preference works', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' }); await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByLabel('Appearance').selectOption('light'); await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByLabel('Appearance').selectOption('system');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

for (const theme of ['light', 'dark'] as const) {
  test(`pages remain readable and accessible on mobile in ${theme}`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 }); await page.emulateMedia({ colorScheme: theme });
    for (const path of ['/', '/projects/', '/projects/cosmiq-sync/', '/writing/', '/guides/', '/videos/', '/about/', '/now/', '/links/', '/contact/']) {
      const response = await page.goto(path); expect(response?.status()).toBe(200);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(results.violations, `${path}: ${JSON.stringify(results.violations.map((item) => ({ id: item.id, nodes: item.nodes.map((node) => node.target) })))}`).toEqual([]);
    }
  });
}

test('draft and private direct URLs are not published', async ({ request }) => {
  for (const path of ['/writing/draft-canary/', '/videos/draft-video/', '/projects/private-project-canary/']) expect((await request.get(path)).status()).toBe(404);
});

test('empty writing archive presents useful context without search controls', async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/writing/?q=agents&language=ml');
  await expect(page.getByRole('searchbox')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'No writing published yet.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Engineering in the AI era', exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test('keyboard skip link and desktop composition are usable', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 }); await page.goto('/');
  await page.keyboard.press('Tab'); await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter'); await expect(page.locator('main')).toBeFocused();
  await page.locator('main').blur();
  await page.screenshot({ path: '.local/home-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 }); await page.screenshot({ path: '.local/home-mobile.png', fullPage: true });
  await page.getByRole('navigation', { name: 'Footer' }).getByRole('link', { name: 'Student guides' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Student guides.');
  await page.getByRole('navigation', { name: 'Footer' }).getByRole('link', { name: 'Videos', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Videos.');
});

test('profile is visible on mobile and past automation work is dated accurately', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto('/');
  await expect(page.locator('main .intro')).toContainText('Muhammed Rinshid V P');
  await expect(page.locator('.hero-context')).toContainText('Previously: n8n automation on AWS at Azmora · June–August 2026');
  await page.getByRole('link', { name: 'About me', exact: true }).click();
  await expect(page.locator('.experience-list')).toContainText('CosmIQ · Founder');
  await expect(page.locator('.experience-list')).toContainText('June–August 2026 · Past work');
  await expect(page.locator('.experience-list')).toContainText('This work ended in August 2026');
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Now', exact: true }).click();
  await expect(page.locator('.page-head time')).toHaveAttribute('datetime', '2026-10-06T00:00:00.000Z');
  await expect(page.getByRole('heading', { name: 'Building this notebook', exact: true })).toBeVisible();
});
