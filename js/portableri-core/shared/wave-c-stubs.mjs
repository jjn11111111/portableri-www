/**
 * Wave C governance stubs — P2 · P3 · P12 on a Wave-B-ready P7 export.
 */
import { createHash } from 'node:crypto';
import { verifyExportBundleV1 } from './export-bundle.mjs';
import { verifyWaveBCloseoutV1 } from './wave-b-closeout.mjs';

export const SCHEMA_WAVE_C_GOVERNANCE = 'PortAbleRI-Wave-C-Governance-v0-stub';
export const SCHEMA_PROJECTION_MANIFEST_ENTRY = 'PortAbleRI-Projection-Manifest-Entry-v0-stub';
export const WAVE_C_COMPETENCY_IDS = Object.freeze(['P2', 'P3', 'P12']);

/** Tier A lean default · Build X P12 reference */
export const DEFAULT_TURN_BUDGET_V0 = Object.freeze({
  profile: 'tier-a-lean-default',
  max_model_calls_per_turn: 2,
  max_projection_tokens: 8192,
  note: 'Phase 1 stub — machine-protection law · not enforced by provider',
});

function stubId(kind, worldlineId) {
  const h = createHash('sha256').update(`${kind}:${worldlineId}`, 'utf8').digest('hex');
  return `${kind}-stub-${h.slice(0, 24)}`;
}

/** P2 · three IDs distinct · portal + inference are HOST stubs until live OAuth/run telemetry. */
export function buildIdentityTripleStub(worldlineId) {
  const wl = String(worldlineId);
  return {
    worldline_id: wl,
    portal_oauth_session_id: stubId('portal', wl),
    inference_run_id: stubId('inference', wl),
  };
}

/** P3 · bounded projection manifest stub — recoverable omission flagged honest. */
export function buildProjectionManifestStub(worldlineId) {
  return [
    {
      schema: SCHEMA_PROJECTION_MANIFEST_ENTRY,
      turn_index: 0,
      at: new Date().toISOString(),
      included_publish_paths: [
        'publish/2026-09-23_Portable-RI_Constitution_Individual-Truth-Preservation_v0.md',
      ],
      omitted_context_recoverable: true,
      projection_cap_tokens: DEFAULT_TURN_BUDGET_V0.max_projection_tokens,
      worldline_id: worldlineId,
    },
  ];
}

/** Attach Wave C stub block (does not mutate kernel_bootstrap). */
export function attachWaveCStubToExportBundle(bundle) {
  const v = verifyExportBundleV1(bundle);
  if (!v.ok) throw new Error(`bundle invalid: ${v.error}`);
  const wl = bundle.worldline_id;
  const next = structuredClone(bundle);
  next.wave_c_governance = {
    schema: SCHEMA_WAVE_C_GOVERNANCE,
    attached_at: new Date().toISOString(),
    competencies: [...WAVE_C_COMPETENCY_IDS],
    identity: buildIdentityTripleStub(wl),
    turn_budget_defaults: { ...DEFAULT_TURN_BUDGET_V0 },
    projection_manifest: buildProjectionManifestStub(wl),
    status: 'stub',
  };
  return next;
}

/** Wave C verify — requires Wave B closeout on same bundle. */
export function verifyWaveCStubsV1(bundle) {
  const waveB = verifyWaveBCloseoutV1(bundle);
  if (!waveB.ok) return { ...waveB, wave: 'C', error: `Wave B prerequisite: ${waveB.error}` };

  const wc = bundle.wave_c_governance;
  if (!wc || wc.schema !== SCHEMA_WAVE_C_GOVERNANCE) {
    return { ok: false, wave: 'C', error: 'missing wave_c_governance stub block' };
  }

  const missing = [];
  const id = wc.identity;
  if (!id?.worldline_id || id.worldline_id !== bundle.worldline_id) {
    missing.push('P2 worldline_id pin');
  }
  if (!id?.portal_oauth_session_id || !id?.inference_run_id) {
    missing.push('P2 portal/inference ids');
  } else if (
    id.portal_oauth_session_id === id.worldline_id ||
    id.inference_run_id === id.worldline_id ||
    id.portal_oauth_session_id === id.inference_run_id
  ) {
    missing.push('P2 three IDs must be distinct');
  }

  const tb = wc.turn_budget_defaults;
  if (!tb || typeof tb.max_model_calls_per_turn !== 'number' || tb.max_model_calls_per_turn < 1) {
    missing.push('P12 turn_budget_defaults');
  }

  const pm = wc.projection_manifest;
  if (!Array.isArray(pm) || pm.length < 1) {
    missing.push('P3 projection_manifest');
  } else {
    for (const entry of pm) {
      if (entry.schema !== SCHEMA_PROJECTION_MANIFEST_ENTRY) missing.push('P3 entry schema');
      if (entry.omitted_context_recoverable !== true) missing.push('P3 recoverable flag');
    }
  }

  if (missing.length) return { ok: false, wave: 'C', error: missing.join('; '), missing };

  return {
    ok: true,
    wave: 'C',
    competencies: [...WAVE_C_COMPETENCY_IDS],
    worldline_id: bundle.worldline_id,
    status: wc.status ?? 'stub',
  };
}
