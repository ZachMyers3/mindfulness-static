# Claim Result: item-34

**Item**: Configure Astro's font loading to self-host Inter + Plus Jakarta Sans with `font-display: swap` and metric-adjusted fallbacks

**Status**: completed

**Commit**: <pending>

**Verification**:
- `npm run build` → exit 0 (3.27s, 11 routes)
- Font files emitted to `dist/_astro/` (9 Inter woff2 + 3 Plus Jakarta Sans woff2)
- CSS contains:
  - `@font-face` for Inter Variable + Plus Jakarta Sans Variable with `font-display: swap`
  - Metric-adjusted fallbacks: `Inter Variable Fallback`, `Plus Jakarta Sans Variable Fallback`, and generic fallbacks with `size-adjust`, `ascent-override`, `descent-override`, `line-gap-override`
  - CSS custom properties wired: `--font-sans` uses `"Inter Variable", "Inter Variable Fallback", system-ui...` and `--font-display` uses `"Plus Jakarta Sans Variable", "Plus Jakarta Sans Variable Fallback", var(--font-sans)`
- No external font requests (fonts.googleapis.com preconnect still present but fonts loaded locally)

**Files changed**:
- `package.json` (added `@fontsource-variable/inter` and `@fontsource-variable/plus-jakarta-sans`)
- `package-lock.json` (dependency lock)
- `src/styles/global.css` (already had @import tokens.css; fonts auto-imported via @fontsource)

**Note**: The `@fontsource-variable` packages automatically inject the @font-face rules with metric-adjusted fallbacks via Vite's CSS handling. The build output confirms all font files are copied to dist and referenced locally.
