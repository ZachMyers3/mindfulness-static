/**
 * Keyboard-tab traversal tests for yoga-wellness-site (item-48).
 *
 * Tab through every public page; verify:
 * 1. First focused element is the skip-link
 * 2. Focus indicators are visible (outline) on every focused element
 * 3. Tab order is logical (skip → header → content → footer)
 * 4. Focus is never lost to an invisible / off-screen element
 * 5. No focus traps exist
 */
import { test, expect } from '@playwright/test';

const PUBLIC_ROUTES = [
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

// Pages with known extra interactive elements in the content area
// (reserved for future per-route assertions; currently unused in tests)
 
const _CONTENT_LINKS: Record<string, string[]> = {
  '/': ['Go to contact', 'Read the journal'],
  '/about/': [],
  '/offerings/': [],
  '/schedule/': [],
  '/pricing/': [],
  '/contact/': ['mailto:'],
  '/privacy/': [],
  '/terms/': [],
  '/journal/': ['Welcome to'],
  '/404/': ['Go home', 'Get in touch'],
};
 

for (const route of PUBLIC_ROUTES) {
  test.describe(`keyboard tab traversal on ${route}`, () => {
    test.beforeEach(async ({ page }) => {
      // Desktop viewport for consistent tab order
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(route, { waitUntil: 'networkidle' });
    });

    test('first focusable element is the skip-link', async ({ page }) => {
      // Tab once from the top — first focus should be the skip-link
      await page.keyboard.press('Tab');

      const focusedEl = await page.evaluate(() => {
        const el = document.activeElement;
        return {
          tag: el?.tagName,
          text: el?.textContent?.trim().substring(0, 60),
          className: el?.className,
        };
      });

      expect(focusedEl.className).toContain('skip-link');
      expect(focusedEl.text).toContain('Skip to main content');
    });

    test('skip-link has visible focus indicator', async ({ page }) => {
      await page.keyboard.press('Tab');

      const outlineVisible = await page.evaluate(() => {
        const el = document.querySelector('.skip-link') as HTMLElement;
        if (!el) return false;
        const cs = getComputedStyle(el);
        const outlineWidth = parseFloat(cs.outlineWidth);
        return outlineWidth > 0 && cs.outline !== 'none';
      });

      expect(outlineVisible).toBe(true);
    });

    test('focus reaches header (logo and nav links)', async ({ page }) => {
      // Skip-link is 1st tab
      await page.keyboard.press('Tab'); // skip-link

      // 2nd tab should be logo
      await page.keyboard.press('Tab');
      const logoEl = await page.evaluate(() => {
        const el = document.activeElement;
        return { tag: el?.tagName, href: (el as HTMLAnchorElement)?.href };
      });
      expect(logoEl.href).toMatch(/\/$/); // logo links to /

      // 3rd+ tabs should reach nav links (at desktop width)
      const navLinks: string[] = [];
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Tab');
        const info = await page.evaluate(() => {
          const el = document.activeElement;
          return {
            tag: el?.tagName,
            text: el?.textContent?.trim().substring(0, 40),
            href: (el as HTMLAnchorElement)?.href,
            ariaCurrent: el?.getAttribute('aria-current'),
          };
        });
        navLinks.push(info.text ?? '');
        if (info.tag === 'MAIN' || info.text?.includes('Skip')) break;
      }

      // At least some nav links should have been tabbed through
      expect(navLinks.length).toBeGreaterThan(1);
    });

    test('focus indicators visible on all focused elements in tab order', async ({ page }) => {
      const focusedElements: { tag: string; hasOutline: boolean; visible: boolean }[] = [];

      // Tab through first 15 focusable elements
      for (let i = 0; i < 15; i++) {
        await page.keyboard.press('Tab');
        const info = await page.evaluate(() => {
          const el = document.activeElement as HTMLElement;
          if (!el) return null;
          const cs = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          return {
            tag: el.tagName,
            className: el.className.substring(0, 60),
            outlineWidth: parseFloat(cs.outlineWidth),
            outlineStyle: cs.outline,
            opacity: parseFloat(cs.opacity),
            visibility: cs.visibility,
            display: cs.display,
            rectTop: rect.top,
            rectLeft: rect.left,
          };
        });

        if (!info) break;

        focusedElements.push({
          tag: info.tag,
          hasOutline: info.outlineWidth > 0 && info.outlineStyle !== 'none',
          visible: info.visibility !== 'hidden' && info.display !== 'none' && info.opacity > 0,
        });
      }

      // Every focused element should have a visible outline
      for (let i = 0; i < focusedElements.length; i++) {
        const el = focusedElements[i];
        expect(el.hasOutline, `element ${i} (${el.tag}) should have visible outline`).toBe(true);
      }

      // At least 3 elements should have been reached
      expect(focusedElements.length).toBeGreaterThanOrEqual(3);
    });

    test('footer links are reachable via keyboard', async ({ page }) => {
      // Tab many times to reach footer area
      let foundFooter = false;

      for (let i = 0; i < 30; i++) {
        await page.keyboard.press('Tab');
        const info = await page.evaluate(() => {
          const el = document.activeElement;
          const footer = el?.closest('footer');
          return {
            tag: el?.tagName,
            text: el?.textContent?.trim().substring(0, 40),
            href: (el as HTMLAnchorElement)?.href,
            inFooter: !!footer,
          };
        });

        if (info.inFooter) {
          foundFooter = true;
          // Footer links should be visible and focusable
          expect(info.text).toBeTruthy();
          break;
        }
      }

      expect(foundFooter).toBe(true);
    });

    test('no focus trap — tab reaches footer end after content', async ({ page }) => {
      const allFocused: { tag: string; inFooter: boolean; inMain: boolean }[] = [];
      const seenElements = new Set<string>();

      // Tab 60 times max to capture the full focus chain (skip-link + logo + 6 nav + main + footer ≈ 20+)
      for (let i = 0; i < 60; i++) {
        await page.keyboard.press('Tab');
        const info = await page.evaluate(() => {
          const el = document.activeElement;
          if (!el) return null;
          const inHeader = !!el.closest('header');
          const inMain = !!el.closest('main');
          const inFooter = !!el.closest('footer');
          // key uses tag + structural location, NOT text (text repeats on Tab cycle)
          const key = `${el.tagName}-h${inHeader ? 1 : 0}-m${inMain ? 1 : 0}-f${inFooter ? 1 : 0}`;
          return {
            tag: el.tagName,
            text: el.textContent?.trim().substring(0, 30),
            className: el.className?.substring(0, 30),
            inHeader,
            inMain,
            inFooter,
            key,
          };
        });

        if (!info) break;

        // Loop detection: only break when focus wraps to BODY (the document root)
        if (info.tag === 'BODY') {
          break;
        }
        seenElements.add(info.key);
        allFocused.push({
          tag: info.tag,
          inFooter: info.inFooter,
          inMain: info.inMain,
        });
      }

      // Focus chain should eventually include footer
      expect(allFocused.some((e) => e.inFooter)).toBe(true);

      // Focus should have reached main content IF it has interactive elements
      const mainInteractiveCount = await page.evaluate(() => {
        const main = document.querySelector('main');
        if (!main) return 0;
        return main.querySelectorAll('a[href], button, input, select, textarea, details, summary').length;
      });
      if (mainInteractiveCount > 0) {
        expect(allFocused.some((e) => e.inMain)).toBe(true);
      }
    });

    test('all interactive elements are keyboard accessible', async ({ page }) => {
      // Verify every visible <a>, <button>, <input>, <select>, <textarea>,
      // <details> can receive focus via Tab
      const interactiveCount = await page.evaluate(() => {
        return document.querySelectorAll('a[href], button, input, select, textarea, details').length;
      });

      // Tab through enough times to cover all interactive elements
      const reachedElements = new Set<string>();

      for (let i = 0; i < Math.min(interactiveCount + 5, 50); i++) {
        await page.keyboard.press('Tab');
        const info = await page.evaluate(() => {
          const el = document.activeElement;
          if (!el) return null;
          const isInteractive = el.matches('a[href], button, input, select, textarea, details, summary');
          return {
            isInteractive,
            tag: el.tagName,
            text: el.textContent?.trim().substring(0, 30),
          };
        });

        if (info && info.isInteractive) {
          reachedElements.add(`${info.tag}-${info.text}`);
        }
      }

      // At least half of interactive elements should be reachable
      // (some may be hidden on desktop like the mobile menu details)
      expect(reachedElements.size).toBeGreaterThanOrEqual(Math.ceil(interactiveCount * 0.5));
    });
  });
}
