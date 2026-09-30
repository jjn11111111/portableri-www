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
    notes: notes || 'Phase 1 Wave A · HOST-local export · not a provider session dump',
  };
}
