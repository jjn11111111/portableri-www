export { canonicalJson } from '../shared/canonical.mjs';
export { newWorldlineId } from '../shared/bootstrap.mjs';
export { verifyTrustManifest } from '../shared/trust-manifest.mjs';
export * from '../shared/constants.mjs';

import { buildKernelBootstrap as buildBootstrap } from '../shared/bootstrap.mjs';
import { DEFAULT_MANIFEST_URL } from '../shared/constants.mjs';
import { verifyTrustManifest } from '../shared/trust-manifest.mjs';

export async function sha256Hex(text) {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyTrustManifestInBrowser(manifest) {
  return verifyTrustManifest(manifest, sha256Hex);
}

export async function fetchTrustManifest(url = DEFAULT_MANIFEST_URL) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`manifest fetch ${res.status}`);
  return res.json();
}

export function buildKernelBootstrap(opts) {
  return buildBootstrap({
    ...opts,
    randomUuid: () => crypto.randomUUID?.() ?? String(Date.now()),
  });
}

export function downloadJson(filename, obj) {
  const blob = new Blob([`${JSON.stringify(obj, null, 2)}\n`], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
