/**
 * Dev-only JSON list of pages/journal entries that can receive a hero image.
 */
import type { APIRoute } from 'astro';
import { listHeroTargets } from './hero-fs';

export const prerender = false;

export const GET: APIRoute = () => {
  const targets = listHeroTargets(process.cwd());
  return new Response(JSON.stringify({ targets }), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
};
