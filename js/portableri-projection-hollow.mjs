/**
 * Load public projection manifest · honest hollow status for Family grafts.
 */
const MANIFEST_URL = '/.well-known/portableri-public-projections-v0.json';

export async function fetchPublicProjections() {
  const res = await fetch(MANIFEST_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`manifest ${res.status}`);
  return res.json();
}

export function statusLabel(status) {
  if (status === 'live') return 'Live';
  if (status === 'partial') return 'Partial · graft open';
  return 'Hollow';
}

export async function sha256File(file) {
  const buf = await file.arrayBuffer();
  const digest = await crypto.subtle.digest('SHA-256', buf);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function postDropBeacon(payload, coordBase) {
  const COORD = coordBase || window.PORTABLERI_COORD_URL || 'http://127.0.0.1:8787';
  const res = await fetch(`${COORD.replace(/\/$/, '')}/v1/soul-reap/drop-beacon`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `beacon ${res.status}`);
  return data;
}
