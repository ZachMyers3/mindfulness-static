/**
 * Dev-only endpoint: write a cropped JPEG and set heroImage on a Markdown page.
 */
import type { APIRoute } from 'astro';
import { applyHero, type ApplyHeroInput } from './hero-fs';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json()) as Partial<ApplyHeroInput>;
    if (!body.collection || !body.slug || !body.imageBase64) {
      return new Response(JSON.stringify({ error: 'collection, slug, and imageBase64 are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const result = applyHero(process.cwd(), {
      collection: body.collection,
      slug: body.slug,
      imageBase64: body.imageBase64,
      heroAlt: body.heroAlt ?? '',
    });
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Apply failed';
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
