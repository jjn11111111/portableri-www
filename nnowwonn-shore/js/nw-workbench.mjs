/**
 * NW Workbench v0 · lasher cut + optional PortAbleRI kernel (CDN import).
 * No symbiote · no Ollama required for lasher lane.
 */

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

/** @param {{ firstForm: string, slug: string, tier: string, lashTo?: string[], worldlineId?: string|null, shore?: string }} opts */
export async function buildLasherRecordV0(opts) {
  const firstForm = String(opts.firstForm ?? '').trim();
  if (!firstForm) throw new Error('Present-moment text required.');
  const capture = new Date().toISOString();
  const date = capture.slice(0, 10);
  const slug = slugify(opts.slug);
  const id = `LASHER-${date}_${slug}_v0`;
  const body = {
    schema: 'PortAbleRI-Lasher-v0',
    id,
    capture,
    tier: opts.tier || 'B',
    first_form: firstForm,
    lash_to: opts.lashTo?.length ? opts.lashTo : ['PortAbleRI-SO-v0', 'NW-Workbench-v0'],
    worldline_id: opts.worldlineId ?? null,
    shore: opts.shore ?? 'nnowwonn.com/workbench.html',
    public: false,
    law: 'P ≠ K ≠ R · record floor stays R',
  };
  const canonical = JSON.stringify(body, null, 2);
  const sha256 = await sha256Hex(canonical);
  return { record: body, canonical, sha256, filename: `${id}.json` };
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
