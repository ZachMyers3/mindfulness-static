/**
 * Rehype plugin: prefix root-absolute hrefs (and img src) with Astro `base`
 * so Markdown links like `[x](/contact/)` work on GitHub Pages project sites.
 */
type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

export function rehypeBaseLinks(base: string) {
  const prefix = base.endsWith('/') ? base.slice(0, -1) : base;

  function walk(node: HastNode): void {
    if (node.type === 'element' && node.properties) {
      const tag = node.tagName;
      if (tag === 'a' && typeof node.properties.href === 'string') {
        const href = node.properties.href;
        if (href.startsWith('/') && !href.startsWith('//')) {
          node.properties.href = `${prefix}${href}`;
        }
      }
      if (tag === 'img' && typeof node.properties.src === 'string') {
        const src = node.properties.src;
        if (src.startsWith('/') && !src.startsWith('//')) {
          node.properties.src = `${prefix}${src}`;
        }
      }
    }
    for (const child of node.children ?? []) walk(child);
  }

  return () => (tree: HastNode) => {
    walk(tree);
  };
}
