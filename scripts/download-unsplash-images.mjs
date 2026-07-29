#!/usr/bin/env node
/**
 * Download genuine Unsplash images for the yoga-wellness-site
 * Replaces the picsum.photos placeholder images with real wellness/yoga/nature
 * photography from Unsplash per design doc §2 N7, §11, §15.5.
 *
 * Unsplash License: Free for commercial use, no attribution required
 * (though appreciated). Source URLs captured for optional public/credits.md.
 *
 * Run: node scripts/download-unsplash-images.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const assetsDir = resolve(__dirname, '../src/assets');

// Unsplash image URLs — using images.unsplash.com direct CDN URLs
// Each entry captures the Unsplash photo page URL for credit attribution
const images = [
  {
    filename: 'hero-yoga.jpg',
    // Woman doing yoga, stretching, meditating on mountain at sunrise
    url: 'https://images.unsplash.com/photo-1578262124391-1de79b7a2768?w=1920&h=1080&fit=crop&auto=format&q=80',
    unsplashPage: 'https://unsplash.com/photos/WpXJH_U1pPQ',
    photographer: 'Getty Images',
    width: 1920,
    height: 1080,
    alt: 'Woman practicing yoga at sunrise with mountain view'
  },
  {
    filename: 'about-studio.jpg',
    // Modern yoga studio with large windows and natural light
    url: 'https://images.unsplash.com/photo-1761971975973-cbb3e59263de?w=1200&h=800&fit=crop&auto=format&q=80',
    unsplashPage: 'https://unsplash.com/photos/2G2nlUR9VrU',
    photographer: 'eran design',
    width: 1200,
    height: 800,
    alt: 'Modern yoga studio with large windows and natural light'
  },
  {
    filename: 'offerings-vinyasa.jpg',
    // Woman doing yoga exercises / sun salutation
    url: 'https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=800&h=600&fit=crop&auto=format&q=80',
    unsplashPage: 'https://unsplash.com/photos/w5SgojGZooI',
    photographer: 'Unsplash',
    width: 800,
    height: 600,
    alt: 'Person practicing yoga sun salutation flow'
  },
  {
    filename: 'offerings-yin.jpg',
    // Woman doing yin yoga / restorative yoga meditation
    url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop&auto=format&q=80',
    unsplashPage: 'https://unsplash.com/photos/NTyBbu66_SI',
    photographer: 'Unsplash',
    width: 800,
    height: 600,
    alt: 'Gentle yin yoga practice on the floor'
  },
  {
    filename: 'offerings-meditation.jpg',
    // Woman meditating in a yoga pose
    url: 'https://images.unsplash.com/photo-1767611098846-05ed978b17ce?w=800&h=600&fit=crop&auto=format&q=80',
    unsplashPage: 'https://unsplash.com/photos/gnGpfxqm6XA',
    photographer: 'Margaret Young',
    width: 800,
    height: 600,
    alt: 'Woman meditating in a seated yoga pose'
  },
  {
    filename: 'schedule-class.jpg',
    // People practicing yoga in a studio class
    url: 'https://images.unsplash.com/photo-1761034114082-c2d63456a82a?w=1200&h=800&fit=crop&auto=format&q=80',
    unsplashPage: 'https://unsplash.com/photos/qY468agdO7g',
    photographer: 'Christian Harb',
    width: 1200,
    height: 800,
    alt: 'Group yoga class with instructor in studio'
  },
  {
    filename: 'pricing-membership.jpg',
    // Yoga mats and plants in a bright room
    url: 'https://images.unsplash.com/photo-1512291313931-d4291048e7b6?w=800&h=600&fit=crop&auto=format&q=80',
    unsplashPage: 'https://unsplash.com/photos/standing-yoga-mats-in-a-room-with-plants',
    photographer: 'Unsplash',
    width: 800,
    height: 600,
    alt: 'Yoga community space with mats and plants'
  },
  {
    filename: 'journal-wellness.jpg',
    // Woman practicing yoga among grass with morning mountains
    url: 'https://images.unsplash.com/photo-1540205597869-814e97c94f25?w=1200&h=800&fit=crop&auto=format&q=80',
    unsplashPage: 'https://unsplash.com/photos/s67wyyCse80',
    photographer: 'Unsplash',
    width: 1200,
    height: 800,
    alt: 'Wellness journal and tea on wooden table'
  },
  {
    filename: 'contact-studio.jpg',
    // Yoga mats and plants in a bright room (alternate)
    url: 'https://images.unsplash.com/photo-1767611104976-86ce57776dc3?w=1200&h=800&fit=crop&auto=format&q=80',
    unsplashPage: 'https://unsplash.com/photos/a-woman-lies-in-a-yoga-pose-on-a-mat-8Z8V3XRXTvk',
    photographer: 'Margaret Young',
    width: 1200,
    height: 800,
    alt: 'Yoga studio entrance with plants'
  },
  {
    filename: 'og-fallback.jpg',
    // Woman practicing yoga among grass with morning mountains
    url: 'https://images.unsplash.com/photo-1540205597869-814e97c94f25?w=1200&h=630&fit=crop&auto=format&q=80',
    unsplashPage: 'https://unsplash.com/photos/s67wyyCse80',
    photographer: 'Unsplash',
    width: 1200,
    height: 630,
    alt: 'Wellness yoga practice among morning mountains'
  }
];

async function downloadImage(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; yoga-wellness-site/1.0)',
    },
    redirect: 'follow',
  });
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

  console.log(`Downloading ${images.length} Unsplash images...\n`);

  let successCount = 0;
  let failCount = 0;
  const results = [];

  for (const img of images) {
    try {
      console.log(`  Downloading ${img.filename}...`);
      const buffer = await downloadImage(img.url);
      const outPath = resolve(assetsDir, img.filename);
      writeFileSync(outPath, Buffer.from(buffer));
      console.log(`    ✅ Saved ${img.filename} (${buffer.byteLength} bytes)`);
      results.push({ ...img, size: buffer.byteLength, status: 'ok' });
      successCount++;
    } catch (err) {
      console.error(`    ❌ Failed ${img.filename}:`, err.message);
      results.push({ ...img, status: 'failed', error: err.message });
      failCount++;
    }
  }

  // Write credits.md for optional attribution
  if (successCount > 0) {
    const creditsPath = resolve(__dirname, '../public/credits.md');
    const credits = `# Image Credits\n\nAll photography sourced from [Unsplash](https://unsplash.com) — free for commercial use under the [Unsplash License](https://unsplash.com/license).\n\n| Image | Photographer | Source |\n|-------|-------------|--------|\n${results
      .filter((r) => r.status === 'ok')
      .map((r) => `| ${r.filename} | ${r.photographer} | [Unsplash](${r.unsplashPage}) |`)
      .join('\n')}\n`;
    writeFileSync(creditsPath, credits);
    console.log(`\n  📝 Credits written to public/credits.md`);
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
