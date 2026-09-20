/**
 * Add loading="lazy" and decoding="async" to Markdown <img> tags so
 * below-the-fold photos (homepage gallery, class shots) stay off the
 * LCP critical path. Heroes live outside .prose and are unchanged.
 */
type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
};

function lazyRawHtml(value: string): string {
  return value.replace(/<img\b(?![^>]*\bloading=)/gi, '<img loading="lazy" decoding="async"');
}

export function rehypeLazyImages() {
  return function transformer(tree: HastNode) {
    function walk(node: HastNode): void {
      if (node.type === 'raw' && typeof (node as { value?: string }).value === 'string') {
        (node as { value: string }).value = lazyRawHtml((node as { value: string }).value);
      }
      if (node.type === 'element' && node.tagName === 'img' && node.properties) {
        if (node.properties.loading == null) node.properties.loading = 'lazy';
        if (node.properties.decoding == null) node.properties.decoding = 'async';
      }
      for (const child of node.children ?? []) walk(child);
    }
    walk(tree);
  };
}
