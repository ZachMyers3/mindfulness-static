/**
 * Prefix an internal path with Astro's configured `base` (see BASE_PATH / astro.config).
 * Leaves external, mailto, tel, and hash URLs unchanged.
 */
export function withBase(path: string): string {
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('#') ||
    path.startsWith('//')
  ) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${normalized}`;
}
