import { SCHEMA_EXPORT_BUNDLE } from './constants.mjs';

/**
 * P7 · portable HOST artifact — verify without provider login.
 * Append-only head_count timeline stub; extend in Wave B.
 */
export function buildExportBundleV1({
  kernelBootstrap,
  trustManifestSha256,
  constitutionSha256,
  primeHistory = [],
  headCountTimeline = [],
  notes = '',
}) {
  if (!kernelBootstrap?.worldline_id) {
    throw new Error('kernelBootstrap with worldline_id required');
  }
  return {
    schema: SCHEMA_EXPORT_BUNDLE,
    created_at: new Date().toISOString(),
    worldline_id: kernelBootstrap.worldline_id,
    trust_manifest_sha256: trustManifestSha256,
    constitution_sha256: constitutionSha256,
    kernel_bootstrap: kernelBootstrap,
    prime_history: primeHistory.length
      ? primeHistory
      : [{ prime_model_id: kernelBootstrap.prime_model_id, recorded_at: kernelBootstrap.created_at }],
    head_count_timeline: headCountTimeline.length
      ? headCountTimeline
      : [
          {
            at: kernelBootstrap.created_at,
            mode: kernelBootstrap.mode,
            head_count: kernelBootstrap.head_count,
            note: 'bootstrap',
          },
        ],
    corrections: [],
    notes: notes || 'Phase 1 Wave A · HOST-local export · not a provider session dump',
  };
}

/**
 * P6 · append-only HOST correction — new file; kernel_bootstrap bytes unchanged.
 */
export function appendCorrectionToExportBundle(bundle, { authorSeat = 'HOST', body }) {
  const text = String(body ?? '').trim();
  if (!text) throw new Error('correction body required');
  const v = verifyExportBundleV1(bundle);
  if (!v.ok) throw new Error(`bundle invalid: ${v.error}`);
  const kbBefore = JSON.stringify(bundle.kernel_bootstrap);
  const next = structuredClone(bundle);
  if (!Array.isArray(next.corrections)) next.corrections = [];
  next.corrections.push({
    id: `corr-${next.corrections.length + 1}`,
    at: new Date().toISOString(),
    author_seat: authorSeat,
    body: text,
    kind: 'correction',
  });
  next.amended_at = next.corrections[next.corrections.length - 1].at;
  if (JSON.stringify(next.kernel_bootstrap) !== kbBefore) {
    throw new Error('kernel_bootstrap mutated — append rejected');
  }
  return next;
}

/** Structural P7 verify — no network; third party can re-check pins offline. */
export function verifyExportBundleV1(bundle) {
  if (!bundle || typeof bundle !== 'object') return { ok: false, error: 'missing bundle' };
  if (bundle.schema !== SCHEMA_EXPORT_BUNDLE) return { ok: false, error: 'schema mismatch' };
  const kb = bundle.kernel_bootstrap;
  if (!kb?.worldline_id) return { ok: false, error: 'kernel_bootstrap incomplete' };
  if (bundle.worldline_id !== kb.worldline_id) return { ok: false, error: 'worldline_id mismatch' };
  if (bundle.trust_manifest_sha256 !== kb.trust_manifest_sha256) {
    return { ok: false, error: 'trust_manifest_sha256 pin mismatch' };
  }
  if (bundle.constitution_sha256 !== kb.constitution_sha256) {
    return { ok: false, error: 'constitution_sha256 pin mismatch' };
  }
  if (!kb.prime_model_id) return { ok: false, error: 'prime_model_id missing' };
  if (!Array.isArray(bundle.prime_history) || bundle.prime_history.length < 1) {
    return { ok: false, error: 'prime_history empty' };
  }
  if (!Array.isArray(bundle.head_count_timeline) || bundle.head_count_timeline.length < 1) {
    return { ok: false, error: 'head_count_timeline empty' };
  }
  if (bundle.corrections != null) {
    if (!Array.isArray(bundle.corrections)) return { ok: false, error: 'corrections must be array' };
    let lastAt = '';
    for (const c of bundle.corrections) {
      if (!c?.at || !c?.body || !c?.author_seat) {
        return { ok: false, error: 'correction missing at/body/author_seat' };
      }
      if (c.at < lastAt) return { ok: false, error: 'corrections not monotonic by at' };
      lastAt = c.at;
    }
  }
  return { ok: true, worldline_id: bundle.worldline_id };
}
