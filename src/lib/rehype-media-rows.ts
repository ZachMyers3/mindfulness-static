/**
 * Rehype plugin: wrap an image-only paragraph + the following text
 * paragraph in `<div class="media-row">` so each pair is its own row
 * (photo left, copy right) and cannot float into the next section.
 */
type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

function elementChildren(node: HastNode): HastNode[] {
  return (node.children ?? []).filter((child) => child.type === 'element');
}

function isImageOnlyParagraph(node: HastNode): boolean {
  if (node.type !== 'element' || node.tagName !== 'p') return false;
  const elements = elementChildren(node);
  return elements.length === 1 && elements[0].tagName === 'img';
}

function isBareImage(node: HastNode): boolean {
  return node.type === 'element' && node.tagName === 'img';
}

function isImageBlock(node: HastNode): boolean {
  return isImageOnlyParagraph(node) || isBareImage(node);
}

function isTextParagraph(node: HastNode): boolean {
  return node.type === 'element' && node.tagName === 'p' && !isImageOnlyParagraph(node);
}

function asParagraph(node: HastNode): HastNode {
  if (isImageOnlyParagraph(node)) return node;
  return {
    type: 'element',
    tagName: 'p',
    properties: {},
    children: [node],
  };
}

function wrapPairs(node: HastNode): void {
  const children = node.children;
  if (!children?.length) return;

  const next: HastNode[] = [];
  for (let i = 0; i < children.length; i += 1) {
    const current = children[i];
    const following = children[i + 1];
    if (isImageBlock(current) && following && isTextParagraph(following)) {
      next.push({
        type: 'element',
        tagName: 'div',
        properties: { className: ['media-row'] },
        children: [asParagraph(current), following],
      });
      i += 1;
      continue;
    }
    next.push(current);
  }
  node.children = next;

  for (const child of next) {
    if (child.properties && Array.isArray(child.properties.className)
      && child.properties.className.includes('media-row')) {
      continue;
    }
    wrapPairs(child);
  }
}

export function rehypeMediaRows() {
  return function transformer(tree: HastNode) {
    wrapPairs(tree);
  };
}
