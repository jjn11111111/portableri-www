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
  const candidates =
    url === DEFAULT_MANIFEST_URL
      ? [DEFAULT_MANIFEST_URL, '/trust/portableri-trust-manifest.json']
      : [url];
  let lastErr;
  for (const u of candidates) {
    try {
      const res = await fetch(u, { cache: 'no-store' });
      if (!res.ok) throw new Error(`manifest fetch ${res.status}`);
      return res.json();
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr ?? new Error('manifest fetch failed');
}

export function buildKernelBootstrap(opts) {
  return buildBootstrap({
    ...opts,
    randomUuid: () => crypto.randomUUID?.() ?? String(Date.now()),
  });
}

export { buildExportBundleV1, verifyExportBundleV1 } from '../shared/export-bundle.mjs';
export {
  validateHeadCountState,
  validateHeadCountTurn,
  verifyHeadCountTimelineV1,
} from '../shared/head-count-mode.mjs';
export {
  buildToolPolicyBlockV1,
  classifyToolBlockFromMessage,
  verifyToolPolicyBlockV1,
} from '../shared/tool-policy-broker.mjs';
export {
  assertPrimeDeclared,
  normalizePrimeModelId,
  validatePrimeTurn,
  verifyPrimeHistoryV1,
} from '../shared/prime-registry.mjs';

export function downloadJson(filename, obj) {
  const blob = new Blob([`${JSON.stringify(obj, null, 2)}\n`], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
