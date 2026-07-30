#!/usr/bin/env node
/**
 * Generate og-default.jpg for the yoga-wellness-site
 * 1200×630, sage gradient background, brand name + tagline
 */

import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outPath = resolve(__dirname, '../public/og-default.jpg');

// Brand constants
const BRAND_NAME = 'Mindfulness and Movement';
const TAGLINE = 'Movement, breath, rest.';
const PRIMARY = '#3a7268'; // sage-600
const PRIMARY_DARK = '#2d5a50'; // sage-700
const WHITE = '#fffdf8'; // cream-50
const CREAM_100 = '#fbf7ef';

// Canvas
const W = 1200;
const H = 630;

// SVG overlay with text
const svgOverlay = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <!-- Subtle decorative elements -->
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${PRIMARY}" />
      <stop offset="50%" style="stop-color:${PRIMARY_DARK}" />
      <stop offset="100%" style="stop-color:#1e3a33" />
    </linearGradient>
  </defs>
  
  <!-- Background gradient -->
  <rect width="${W}" height="${H}" fill="url(#bgGrad)" />
  
  <!-- Subtle noise/pattern overlay for texture -->
  <g opacity="0.03">
    <circle cx="150" cy="150" r="100" fill="${WHITE}" />
    <circle cx="1050" cy="480" r="180" fill="${WHITE}" />
    <circle cx="600" cy="315" r="300" fill="${WHITE}" />
  </g>
  
  <!-- Brand name -->
  <text
    x="${W / 2}"
    y="${H / 2 - 30}"
    text-anchor="middle"
    dominant-baseline="middle"
    font-family="Georgia, Cambria, 'Times New Roman', serif"
    font-size="64"
    font-weight="400"
    fill="${WHITE}"
    letter-spacing="1.5"
  >
    ${BRAND_NAME}
  </text>
  
  <!-- Tagline -->
  <text
    x="${W / 2}"
    y="${H / 2 + 55}"
    text-anchor="middle"
    dominant-baseline="middle"
    font-family="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif"
    font-size="28"
    font-weight="300"
    fill="${CREAM_100}"
    letter-spacing="2"
    text-transform="uppercase"
  >
    ${TAGLINE}
  </text>
</svg>
`;

async function main() {
  try {
    // Create base image (solid color) then composite SVG
    const base = sharp({
      create: {
        width: W,
        height: H,
        channels: 3,
        background: PRIMARY
      }
    })
      .jpeg({ quality: 90, mozjpeg: true });

    // Composite the SVG overlay
    const svgBuffer = Buffer.from(svgOverlay);
    await base
      .composite([{
        input: svgBuffer,
        blend: 'over'
      }])
      .toFile(outPath);

    console.log(`✅ Generated ${outPath} (${W}×${H})`);
    
    // Quick verify
    const meta = await sharp(outPath).metadata();
    console.log(`   Format: ${meta.format}, Size: ${meta.width}×${meta.height}, Channels: ${meta.channels}`);
  } catch (err) {
    console.error('❌ Failed to generate OG image:', err);
    process.exit(1);
  }
}

main();