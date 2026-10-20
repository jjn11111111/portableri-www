/**
 * NW Workbench v0 · lasher cut + optional PortAbleRI kernel (CDN import).
 * No symbiote · no Ollama required for lasher lane.
 */

import { shorePath } from './nw-shore-origin.mjs';

const PARI_BROWSER = 'https://portableri.com/js/portableri-core/browser/index.mjs';

export function slugify(s) {
  const t = String(s ?? '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-_]/g, '')
    .slice(0, 48);
  return t || 'Present-Moment';
}

export async function sha256Hex(text) {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** @param {{ firstForm: string, slug: string, tier: string, lashTo?: string[], worldlineId?: string|null, shore?: string, attachments?: object[] }} opts */
export async function buildLasherRecordV0(opts) {
  const firstForm = String(opts.firstForm ?? '').trim();
  if (!firstForm && !(opts.attachments?.length)) throw new Error('Type a message or attach a file.');
  const capture = new Date().toISOString();
  const date = capture.slice(0, 10);
  const asciiSlug = slugify(opts.slug || firstForm);
  const formHash = firstForm
    ? (await sha256Hex(firstForm)).slice(0, 8)
    : (await sha256Hex(JSON.stringify(opts.attachments ?? []))).slice(0, 8);
  const slug =
    asciiSlug && asciiSlug !== 'Present-Moment' ? asciiSlug.slice(0, 40) : `u-${formHash}`;
  const id = `LASHER-${date}_${slug}_v0`;
  const body = {
    schema: 'PortAbleRI-Lasher-v0',
    id,
    capture,
    tier: opts.tier || 'B',
    first_form: firstForm || '(attachment-only capture)',
    attachments: opts.attachments?.length ? opts.attachments : undefined,
    lash_to: opts.lashTo?.length ? opts.lashTo : ['PortAbleRI-SO-v0', 'NW-Workbench-v0'],
    worldline_id: opts.worldlineId ?? null,
    shore: opts.shore ?? shorePath('workbench.html'),
    public: false,
    law: 'P ≠ K ≠ R · record floor stays R',
  };
  const canonical = JSON.stringify(body, null, 2);
  const sha256 = await sha256Hex(canonical);
  const filename = `${id}.json`;
  const exportText = buildMomentExportText({ record: body, sha256 });
  return { record: body, canonical, sha256, filename, exportText };
}

/** Single-file export for NW (seal + moment — no sidecar .sha256). */
export function buildMomentExportText({ record, sha256 }) {
  const envelope = {
    schema: 'NW-Moment-Export-v0',
    exported_at: new Date().toISOString(),
    content_sha256: sha256,
    moment: record,
  };
  return JSON.stringify(envelope, null, 2);
}

export function downloadText(filename, text, mime = 'application/json') {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export async function loadPariBrowser() {
  return import(PARI_BROWSER);
}
