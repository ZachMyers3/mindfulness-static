/**
 * Axe-core accessibility tests for yoga-wellness-site (item-47).
 *
 * Runs @axe-core/playwright against every public route; fails on
 * serious/critical violations and missing page-level h1s.
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

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
  '/404/',
];

test.describe('axe-core accessibility audit', () => {
  for (const route of ROUTES) {
    test(`no serious/critical axe violations on ${route}`, async ({
      page,
    }) => {
      await page.goto(route);
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2aa', 'wcag21aa', 'best-practice'])
        .analyze();

      const failingViolations = accessibilityScanResults.violations.filter(
        (v) =>
          v.impact === 'serious' ||
          v.impact === 'critical' ||
          // Every public page must expose a single h1 (axe best-practice).
          v.id === 'page-has-heading-one',
      );

      if (accessibilityScanResults.violations.length > 0) {
        console.log(
          `axe violations on ${route}:`,
          accessibilityScanResults.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            help: v.help,
            nodes: v.nodes.length,
          })),
        );
      }

      expect(failingViolations).toEqual([]);
    });
  }
});
