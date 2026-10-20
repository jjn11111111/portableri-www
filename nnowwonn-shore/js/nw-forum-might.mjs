/**
 * Lane A + C · Forum ↔ Might ↔ Studio · localhost only
 */
import { shoreQueryTag } from './nw-shore-origin.mjs';

export const KAIRIS_MIGHT_URL = 'http://127.0.0.1:8799';
export const LOCAL_STUDIO = 'http://127.0.0.1:8877/studio.html';

export async function mightHealth() {
  try {
    const res = await fetch(`${KAIRIS_MIGHT_URL}/health`, { method: 'GET' });
    return res.ok;
  } catch {
    return false;
  }
}

/** @param {string} id @param {object} envelope */
export async function mightStoreMoment(id, envelope) {
  const res = await fetch(`${KAIRIS_MIGHT_URL}/v1/moment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, envelope }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? `Might store HTTP ${res.status}`);
  }
  return res.json();
}

/** @param {{ recordId: string, seal: string }} opts */
export function studioHandoffUrl(opts) {
  const u = new URL(LOCAL_STUDIO);
  u.searchParams.set('shore', shoreQueryTag());
  u.searchParams.set('from', 'forum');
  u.searchParams.set('moment', opts.recordId);
  if (opts.seal) u.searchParams.set('seal', opts.seal.slice(0, 16));
  return u.href;
}

/** Lane A · store + open Studio */
export async function openLaneAStudio(lastExport) {
  if (!lastExport?.exportText || !lastExport.recordId) throw new Error('No moment yet.');
  const envelope = JSON.parse(lastExport.exportText);
  await mightStoreMoment(lastExport.recordId, envelope);
  window.open(studioHandoffUrl({ recordId: lastExport.recordId, seal: lastExport.sha256 }), '_blank', 'noopener');
}

/** Lane C · bounded chat turn (HOST explicit only) */
export async function mightTurn(opts) {
  const res = await fetch(`${KAIRIS_MIGHT_URL}/v1/turn`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: opts.prompt, moment_id: opts.momentId }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? `Might turn HTTP ${res.status}`);
  return data;
}

/** Lane C · compression harness — one short distill per HOST click */
export async function mightCompress(opts) {
  const res = await fetch(`${KAIRIS_MIGHT_URL}/v1/compress`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: opts.text, moment_id: opts.momentId }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? `Might compress HTTP ${res.status}`);
  return data;
}
