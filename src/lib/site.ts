import { z } from 'astro/zod';
import raw from '../content/site.json';

/** Internal paths must match Astro's trailingSlash: 'always' config. */
const InternalHref = z
  .string()
  .regex(/^\/(?:$|.+\/)$/, 'Internal hrefs must start with / and end with /');

const SiteSchema = z.object({
  business: z.object({
    name: z.string().min(1),
    tagline: z.string(),
    description: z.string(),
  }),
  nav: z.array(z.object({ label: z.string(), href: InternalHref })),
  contact: z.object({
    address: z.object({
      street: z.string(), city: z.string(),
      region: z.string(), postalCode: z.string(), country: z.string(),
    }),
    phone: z.string(),
    email: z.string().email(),
    mapUrl: z.string().url().optional(),
  }),
  hours: z.array(z.object({
    day: z.enum(['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']),
    open: z.string().regex(/^\d{2}:\d{2}$/).nullable(),
    close: z.string().regex(/^\d{2}:\d{2}$/).nullable(),
    closed: z.boolean().optional(),
  })).length(7),
  social: z.array(z.object({ label: z.string(), href: z.string().url() })),
  announcement: z.object({
    text: z.string().optional(),
    href: z.string().url().optional(),
    enabled: z.boolean(),
  }).optional(),
  footer: z.object({
    tagline: z.string(),
    legalLinks: z.array(z.object({ label: z.string(), href: InternalHref })),
  }),
});

export const site = SiteSchema.parse(raw);  // throws at build if invalid
export type Site = typeof site;

/**
 * Formats the page title as "Page Title | Mindfulness & Movement"
 */
export function formatTitle(pageTitle: string): string {
  return `${pageTitle} | ${site.business.name}`;
}