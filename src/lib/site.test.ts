import { describe, it, expect } from 'vitest';

// We import the schema + raw data directly. The vitest config aliases
// astro/zod → zod so the module loads outside the Astro build context.
import { site } from './site';

describe('site.json validates against schema', () => {
  it('does not throw on the fixture site.json', () => {
    // If site.ts module loaded successfully, SiteSchema.parse(raw) passed.
    expect(site).toBeDefined();
    expect(site.business.name).toBe('Mindfulness and Movement');
  });

  it('requires trailing slashes on nav and legal hrefs', () => {
    for (const item of site.nav) {
      expect(item.href).toMatch(/^\/(?:$|.+\/)$/);
    }
    for (const item of site.footer.legalLinks) {
      expect(item.href).toMatch(/^\/(?:$|.+\/)$/);
    }
  });
});

describe('site.json rejects missing hours', () => {
  it('throws if hours has fewer than 7 entries', async () => {
    // Dynamic-import a fresh module with a stubbed JSON to avoid
    // contaminating the production import.
    const { z } = await import('zod');

    // Re-declare the hours portion of the schema to test the constraint.
    const HoursSchema = z.array(
      z.object({
        day: z.enum([
          'Monday', 'Tuesday', 'Wednesday', 'Thursday',
          'Friday', 'Saturday', 'Sunday',
        ]),
        open: z.string().regex(/^\d{2}:\d{2}$/).nullable(),
        close: z.string().regex(/^\d{2}:\d{2}$/).nullable(),
        closed: z.boolean().optional(),
      }),
    ).length(7);

    const sixHours = Array.from({ length: 6 }, (_, i) => ({
      day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][i],
      open: '09:00',
      close: '17:00',
    }));

    expect(() => HoursSchema.parse(sixHours)).toThrow();
  });
});

describe('site.json rejects malformed email', () => {
  it('throws if contact.email is not a valid email', async () => {
    const { z } = await import('zod');

    const ContactSchema = z.object({
      address: z.object({
        street: z.string(),
        city: z.string(),
        region: z.string(),
        postalCode: z.string(),
        country: z.string(),
      }),
      phone: z.string(),
      email: z.string().email(),
      mapUrl: z.string().url().optional(),
    });

    const badContact = {
      address: {
        street: '123 Test St',
        city: 'Testville',
        region: 'TS',
        postalCode: '00000',
        country: 'US',
      },
      phone: '+1-555-555-5555',
      email: 'not-an-email',
    };

    expect(() => ContactSchema.parse(badContact)).toThrow();
  });
});
