/**
 * Dev-only helpers for the hero crop tool: list Markdown targets and
 * write a cropped JPEG + heroImage frontmatter. Not used in production.
 */
import fs from 'node:fs';
import path from 'node:path';

export type HeroCollection = 'pages';
export type HeroPreset = 'home' | 'inner';

export interface HeroTarget {
  collection: HeroCollection;
  slug: string;
  title: string;
  heroImage?: string;
  heroAlt?: string;
  previewUrl: string;
  preset: HeroPreset;
}

export interface ApplyHeroInput {
  collection: HeroCollection;
  slug: string;
  imageBase64: string;
  heroAlt?: string;
}

export interface ApplyHeroResult {
  heroImage: string;
  previewUrl: string;
  filePath: string;
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_BYTES = 8 * 1024 * 1024;

function resolveInside(root: string, ...parts: string[]): string {
  const allowed = path.resolve(root);
  const resolved = path.resolve(root, ...parts);
  const rel = path.relative(allowed, resolved);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    throw new Error('Invalid path');
  }
  return resolved;
}

function yamlScalar(value: string): string {
  if (value === '' || /[:#{}[\],&*?|<>=!%@`'"]/.test(value) || /^\s|\s$/.test(value)) {
    return JSON.stringify(value);
  }
  return value;
}

function fieldValue(frontmatter: string, key: string): string | undefined {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, 'm'));
  if (!match) return undefined;
  const raw = match[1];
  if (
    (raw.startsWith('"') && raw.endsWith('"')) ||
    (raw.startsWith("'") && raw.endsWith("'"))
  ) {
    return raw.slice(1, -1);
  }
  return raw;
}

function splitFrontmatter(source: string): { fm: string; body: string } {
  if (!source.startsWith('---')) {
    throw new Error('Markdown file is missing frontmatter');
  }
  const nl = source.indexOf('\n');
  const rest = nl === -1 ? '' : source.slice(nl + 1);
  const close = rest.match(/\r?\n---(?:\r?\n|$)/);
  if (!close || close.index === undefined) {
    throw new Error('Markdown file has unclosed frontmatter');
  }
  return {
    fm: rest.slice(0, close.index),
    body: rest.slice(close.index + close[0].length),
  };
}

function upsertField(frontmatter: string, key: string, value: string): string {
  const line = `${key}: ${yamlScalar(value)}`;
  const re = new RegExp(`^${key}:\\s*.*$`, 'm');
  if (re.test(frontmatter)) return frontmatter.replace(re, line);
  return `${frontmatter.replace(/\s+$/, '')}\n${line}`;
}

function previewUrl(_collection: HeroCollection, slug: string): string {
  return slug === 'home' ? '/' : `/${slug}/`;
}

function presetFor(_collection: HeroCollection, _slug: string): HeroPreset {
  return 'home';
}

function listCollection(root: string, collection: HeroCollection): HeroTarget[] {
  const dir = resolveInside(root, 'src/content', collection);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
    .map((name) => {
      const slug = name.replace(/\.mdx?$/, '');
      const raw = fs.readFileSync(path.join(dir, name), 'utf8');
      const { fm } = splitFrontmatter(raw);
      return {
        collection,
        slug,
        title: fieldValue(fm, 'title') ?? slug,
        heroImage: fieldValue(fm, 'heroImage'),
        heroAlt: fieldValue(fm, 'heroAlt'),
        previewUrl: previewUrl(collection, slug),
        preset: presetFor(collection, slug),
      };
    });
}

export function listHeroTargets(root: string): HeroTarget[] {
  return [...listCollection(root, 'pages')].sort(
    (a, b) => a.title.localeCompare(b.title),
  );
}

function decodeJpeg(imageBase64: string): Buffer {
  const trimmed = imageBase64.replace(/^data:image\/jpeg;base64,/, '');
  const buffer = Buffer.from(trimmed, 'base64');
  if (buffer.length === 0 || buffer.length > MAX_BYTES) {
    throw new Error('Image is empty or too large');
  }
  if (buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    throw new Error('Expected a JPEG image');
  }
  return buffer;
}

export function applyHero(root: string, input: ApplyHeroInput): ApplyHeroResult {
  const { collection, slug } = input;
  if (collection !== 'pages') {
    throw new Error('Unknown collection');
  }
  if (!SLUG_RE.test(slug)) {
    throw new Error('Invalid slug');
  }

  const mdPath = resolveInside(root, 'src/content', collection, `${slug}.md`);
  if (!fs.existsSync(mdPath)) {
    throw new Error(`No Markdown file for ${collection}/${slug}`);
  }

  const jpeg = decodeJpeg(input.imageBase64);
  const filename = `hero-${slug}-${Date.now().toString(36)}.jpg`;
  const publicDir = resolveInside(root, 'public/assets', collection);
  fs.mkdirSync(publicDir, { recursive: true });
  const filePath = path.join(publicDir, filename);
  fs.writeFileSync(filePath, jpeg);

  const heroImage = `/assets/${collection}/${filename}`;
  const source = fs.readFileSync(mdPath, 'utf8');
  const { fm, body } = splitFrontmatter(source);
  let nextFm = upsertField(fm, 'heroImage', heroImage);
  nextFm = upsertField(nextFm, 'heroAlt', input.heroAlt ?? '');
  fs.writeFileSync(mdPath, `---\n${nextFm.replace(/\s+$/, '')}\n---\n${body}`);

  return { heroImage, previewUrl: previewUrl(collection, slug), filePath };
}
