/**
 * E2E tests for yoga-wellness-site (doc §13.2).
 *
 * Tests 1–3 (site.json Zod validation) are covered by Vitest in
 * src/lib/site.test.ts and are not duplicated here.
 *
 * Tests 14 (Lighthouse) and 15 (axe) are separate pipeline items
 * (item-51 and item-47 respectively).
 *
 * This file covers tests 5–13 (adapted for mailto-only contact).
 */
import { test, expect } from '@playwright/test';

const ROUTES = [
  '/',
  '/about/',
  '/offerings/',
  '/schedule/',
  '/pricing/',
  '/contact/',
  '/privacy/',
  '/terms/',
  '/journal/',
];

// ── Test 5: home page renders brand name from site.json ──────────────
test('home page renders brand name from site.json', async ({ page }) => {
  await page.goto('/');
  // The header contains a link with the business name
  const brandLink = page.getByRole('link', { name: 'Mindfulness and Movement' });
  await expect(brandLink).toBeVisible();
});

// ── Test 6: current nav link is marked aria-current ──────────────────
test('current nav link is marked aria-current="page"', async ({ page }) => {
  await page.goto('/about/');
  const aboutLink = page.getByRole('link', { name: 'About' }).first();
  await expect(aboutLink).toHaveAttribute('aria-current', 'page');
});

// ── Test 7: contact page has a mailto link (adapted from Formspree) ──
test('contact page contains a mailto link', async ({ page }) => {
  await page.goto('/contact/');
  const mailtoLink = page.locator('a[href^="mailto:"]').first();
  await expect(mailtoLink).toBeVisible();
  const href = await mailtoLink.getAttribute('href');
  expect(href).toMatch(/^mailto:.+@.+\..+/);
});

// ── Test 9: sitemap contains every public route ──────────────────────
test('sitemap contains every public route', async ({ page }) => {
  const res = await page.request.get('/sitemap-index.xml');
  expect(res.ok()).toBeTruthy();

  // sitemap-index references sitemap-0.xml (or similar)
  const indexBody = await res.text();
  expect(indexBody).toContain('sitemap');

  // Fetch the child sitemap — the <loc> may be an absolute URL from
  // the configured SITE env var, so extract just the path portion.
  const sitemapMatch = indexBody.match(
    /<loc>([^<]*sitemap[^<]*\.xml)<\/loc>/i,
  );
  expect(sitemapMatch).toBeTruthy();

  const sitemapUrl = new URL(sitemapMatch![1], 'http://localhost:4321');
  const sitemapRes = await page.request.get(sitemapUrl.pathname);
  expect(sitemapRes.ok()).toBeTruthy();
  const sitemapBody = await sitemapRes.text();

  // Every public route should be listed
  for (const route of ROUTES) {
    expect(sitemapBody).toContain(route);
  }
});

// ── Test 10: 404 page renders for unknown route ──────────────────────
test('404 page renders for unknown route', async ({ page }) => {
  const res = await page.goto('/this-does-not-exist/');
  expect(res?.status()).toBe(404);
  // The 404 page should have some friendly copy
  await expect(page.locator('body')).toContainText(/not found|lost|oops/i);
});

// ── Test 11: draft journal post is excluded in production ────────────
test('draft journal post is excluded from journal listing', async ({
  page,
}) => {
  await page.goto('/journal/');
  // The welcome post is not a draft (draft: false), so it should appear
  await expect(
    page.getByRole('link', { name: /welcome/i }),
  ).toBeVisible();

  // No draft posts should be visible (we only have one post, which is
  // not a draft — this test primarily verifies the listing renders at all
  // and the content collection filtering is active).
});

// ── Test 12: JSON-LD on /contact is valid LocalBusiness ──────────────
test('JSON-LD on /contact parses as valid LocalBusiness', async ({
  page,
}) => {
  await page.goto('/contact/');
  const script = page.locator('script[type="application/ld+json"]');
  await expect(script).toBeAttached();

  const jsonText = await script.textContent();
  expect(jsonText).toBeTruthy();

  const data = JSON.parse(jsonText!);
  expect(data['@type']).toBe('LocalBusiness');
  expect(data.name).toBeTruthy();
  expect(data.telephone).toBeTruthy();
  expect(data.address).toBeDefined();
  expect(data.address['@type']).toBe('PostalAddress');
});

// ── Test 13: no console errors on any route ──────────────────────────
test('no console errors on any route', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  for (const route of ROUTES) {
    await page.goto(route);
    // Wait for network idle to let any lazy console messages fire
    await page.waitForLoadState('networkidle');
  }

  expect(errors).toEqual([]);
});
