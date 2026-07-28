# Item-41 Claim Result

**Claimed:** mason-frontend @ 2026-07-27T23:13:45-04:00
**Completed:** mason-frontend @ 2026-07-27T23:14:55-04:00
**Commit:** <pending>

## Scope

Wired `JsonLd.astro` into `src/pages/contact.astro` with a `LocalBusiness` structured-data object built from `site.contact` + `site.hours` (per design-doc §15.6, item-41).

## Changes

- **`src/pages/contact.astro`**:
  - Added `import JsonLd from '../components/JsonLd.astro'`
  - Added `import { site } from '../lib/site'`
  - Constructed `localBusiness` object matching Schema.org `LocalBusiness` type with:
    - `@context`: https://schema.org
    - `@type`: LocalBusiness
    - `name`: site.business.name
    - `description`: site.business.description
    - `telephone`: site.contact.phone
    - `email`: site.contact.email
    - `address`: PostalAddress from site.contact.address
    - `openingHoursSpecification`: array of OpeningHoursSpecification from site.hours (filtered for open days)
    - `sameAs`: social URLs from site.social
  - Rendered `<JsonLd data={localBusiness} />` inside BaseLayout

## Verification

```bash
npm run build
```

- Exit code: 0
- 11 routes built successfully
- `dist/contact/index.html` contains the `<script type="application/ld+json">` with the LocalBusiness JSON-LD
- Structured data includes all required fields from site.json

## Dependencies

- Item-30: `JsonLd.astro` component (approved `[v]`)
- Item-08: `site.json` with contact/hours/social (approved `[v]`)
- Both satisfied at implementation time.