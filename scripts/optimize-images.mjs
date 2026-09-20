/**
 * Shrink camera originals under public/assets and src/assets for the web.
 * Long edge is capped at 2560px (2× a 1280px screen); JPEGs use quality 85.
 * Files are rewritten in place only when the result is smaller.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOTS = ['public/assets', 'src/assets'];
const MAX_EDGE = 2560;
const JPEG_QUALITY = 85;

function listImages(root) {
  if (!fs.existsSync(root)) return [];
  const files = [];
  for (const entry of fs.readdirSync(root, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const dir = entry.parentPath ?? entry.path;
    const file = path.join(dir, entry.name);
    if (/\.(jpe?g|png)$/i.test(file)) files.push(file);
  }
  return files;
}

async function optimize(file) {
  const original = fs.readFileSync(file);
  const meta = await sharp(original, { failOn: 'none' }).metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  if (!width || !height) return null;

  let pipeline = sharp(original, { failOn: 'none' }).rotate();
  if (Math.max(width, height) > MAX_EDGE) {
    pipeline = pipeline.resize({
      width: width >= height ? MAX_EDGE : undefined,
      height: height > width ? MAX_EDGE : undefined,
      withoutEnlargement: true,
      fit: 'inside',
    });
  }

  const format = meta.format;
  if (format === 'jpeg' || format === 'jpg') {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true });
  } else if (format === 'png') {
    pipeline = pipeline.png({ compressionLevel: 9, effort: 8 });
  } else {
    return null;
  }

  const next = await pipeline.toBuffer();
  if (next.length >= original.length * 0.97) return null;
  fs.writeFileSync(file, next);
  return {
    file,
    from: original.length,
    to: next.length,
    fromPx: `${width}x${height}`,
  };
}

const files = ROOTS.flatMap(listImages);
let saved = 0;
for (const file of files) {
  const result = await optimize(file);
  if (!result) continue;
  const mb = (n) => `${(n / 1e6).toFixed(2)}MB`;
  const pct = Math.round((1 - result.to / result.from) * 100);
  console.log(`${mb(result.from)} → ${mb(result.to)} (−${pct}%) ${result.fromPx}  ${result.file}`);
  saved += result.from - result.to;
}

console.log(`\nSaved ${(saved / 1e6).toFixed(1)}MB across ${files.length} files`);
