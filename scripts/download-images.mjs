#!/usr/bin/env node
/**
 * Download placeholder images for the yoga-wellness-site
 * Uses picsum.photos for free placeholder images with wellness/nature themes
 * Saves to src/assets/
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetsDir = resolve(__dirname, '../src/assets');

const images = [
  {
    filename: 'hero-yoga.jpg',
    url: 'https://picsum.photos/seed/yoga-wellness-hero/1920/1080',
    width: 1920,
    height: 1080,
    alt: 'Person practicing yoga in a sunlit studio'
  },
  {
    filename: 'about-studio.jpg',
    url: 'https://picsum.photos/seed/yoga-studio-space/1200/800',
    width: 1200,
    height: 800,
    alt: 'Peaceful yoga studio interior with natural light'
  },
  {
    filename: 'offerings-vinyasa.jpg',
    url: 'https://picsum.photos/seed/vinyasa-flow/800/600',
    width: 800,
    height: 600,
    alt: 'Vinyasa flow yoga class in progress'
  },
  {
    filename: 'offerings-yin.jpg',
    url: 'https://picsum.photos/seed/yin-yoga/800/600',
    width: 800,
    height: 600,
    alt: 'Gentle yin yoga practice'
  },
  {
    filename: 'offerings-meditation.jpg',
    url: 'https://picsum.photos/seed/meditation-practice/800/600',
    width: 800,
    height: 600,
    alt: 'Guided meditation session'
  },
  {
    filename: 'schedule-class.jpg',
    url: 'https://picsum.photos/seed/schedule-class/1200/800',
    width: 1200,
    height: 800,
    alt: 'Group yoga class with instructor'
  },
  {
    filename: 'pricing-membership.jpg',
    url: 'https://picsum.photos/seed/pricing-membership/800/600',
    width: 800,
    height: 600,
    alt: 'Yoga community gathering'
  },
  {
    filename: 'journal-wellness.jpg',
    url: 'https://picsum.photos/seed/journal-wellness/1200/800',
    width: 1200,
    height: 800,
    alt: 'Wellness journal and tea on wooden table'
  },
  {
    filename: 'contact-studio.jpg',
    url: 'https://picsum.photos/seed/contact-studio/1200/800',
    width: 1200,
    height: 800,
    alt: 'Yoga studio entrance with plants'
  },
  {
    filename: 'og-fallback.jpg',
    url: 'https://picsum.photos/seed/og-fallback/1200/630',
    width: 1200,
    height: 630,
    alt: 'Mindfulness and Movement brand'
  }
];

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return await response.arrayBuffer();
}

async function main() {
  if (!existsSync(assetsDir)) {
    mkdirSync(assetsDir, { recursive: true });
    console.log(`Created directory: ${assetsDir}`);
  }

  console.log(`Downloading ${images.length} placeholder images...\n`);

  let successCount = 0;
  let failCount = 0;

  for (const img of images) {
    try {
      console.log(`  Downloading ${img.filename}...`);
      const buffer = await downloadImage(img.url);
      const outPath = resolve(assetsDir, img.filename);
      writeFileSync(outPath, Buffer.from(buffer));
      console.log(`    ✅ Saved ${img.filename} (${buffer.length} bytes)`);
      successCount++;
    } catch (err) {
      console.error(`    ❌ Failed ${img.filename}:`, err.message);
      failCount++;
    }
  }

  console.log(`\n--- Summary ---`);
  console.log(`Successful: ${successCount}`);
  console.log(`Failed: ${failCount}`);

  if (successCount > 0) {
    console.log(`\nImages saved to: ${assetsDir}`);
  }

  process.exit(failCount > 0 ? 1 : 0);
}

main();