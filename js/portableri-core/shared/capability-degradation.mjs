import { SCHEMA_CAPABILITY_DEGRADATION } from './constants.mjs';

/** P10 · actor that blocked a PortAbleRI promise (not the HOST). */
export const ACTOR_CLASS = Object.freeze({
  HOST_RUNTIME: 'HOST_RUNTIME',
  PORTAL_VENDOR: 'PORTAL_VENDOR',
  MCP_GATE: 'MCP_GATE',
  COORD_ENTITLEMENT: 'COORD_ENTITLEMENT',
  NETWORK: 'NETWORK',
  USER_ACTUAL: 'USER_ACTUAL',
  UNKNOWN: 'UNKNOWN',
});

/** Which subscriber-facing promise degraded. */
export const PROMISE_ID = Object.freeze({
  CHECKOUT: 'checkout',
  EXPORT: 'export',
  SYMBIOTE_PAIRING: 'symbiote_pairing',
  TRUST_MANIFEST: 'trust_manifest',
  TOOL_POLICY: 'tool_policy',
});

export const ENTITY_OF_INTEREST = Object.freeze({
  ENTITY_1_CATHEDRAL: 'ENTITY_1_CATHEDRAL',
  ENTITY_2_HIVE: 'ENTITY_2_HIVE',
  ENTITY_3_PORTAL: 'ENTITY_3_PORTAL',
  ENTITY_4_PANOPTICON: 'ENTITY_4_PANOPTICON',
  NONE: 'NONE',
});

function severityFor(actorClass) {
  if (actorClass === ACTOR_CLASS.USER_ACTUAL) return 'info';
  if (actorClass === ACTOR_CLASS.HOST_RUNTIME) return 'warn';
  if (actorClass === ACTOR_CLASS.COORD_ENTITLEMENT) return 'block';
  return 'warn';
}

/**
 * Structured degradation record — schema PortAbleRI-Capability-Degradation-v1.
 * Policy + fix are plain language; never "user denied" when gate/policy blocked.
 */
export function buildCapabilityDegradationV1({
  actor_class = ACTOR_CLASS.UNKNOWN,
  promise_id,
  policy,
  fix,
  fix_ref,
  code,
  surface,
  entity_of_interest = ENTITY_OF_INTEREST.NONE,
  tool_policy_block,
  at,
  truth_flag_ui,
}) {
  if (!promise_id) throw new Error('promise_id required');
  const pol = String(policy ?? '').trim();
  const fx = String(fix ?? '').trim();
  if (!pol) throw new Error('policy required');
  if (!fx) throw new Error('fix required');

  const ui =
    truth_flag_ui ??
    {
      headline: pol,
      severity: severityFor(actor_class),
    };

  return {
    schema: SCHEMA_CAPABILITY_DEGRADATION,
    at: at ?? new Date().toISOString(),
    actor_class,
    promise_id,
    entity_of_interest,
    policy: pol,
    fix: fx,
    ...(fix_ref ? { fix_ref } : {}),
    ...(code ? { code } : {}),
    ...(surface ? { surface } : {}),
    ...(tool_policy_block ? { tool_policy_block } : {}),
    truth_flag_ui: ui,
  };
}

/** Mount a Truth Flag in #portableri-truth-flags (browser). */
export function sproutTruthFlag(record) {
  if (typeof document === 'undefined') return record;
  const root =
    document.getElementById('portableri-truth-flags') ??
    (() => {
      const el = document.createElement('div');
      el.id = 'portableri-truth-flags';
      el.setAttribute('aria-live', 'polite');
      document.body.prepend(el);
      return el;
    })();

  const ui = record.truth_flag_ui ?? { headline: record.policy, severity: 'warn' };
  const sev = ui.severity ?? 'warn';
  const box = document.createElement('div');
  box.className = `portableri-truth-flag portableri-truth-flag--${sev}`;
  box.setAttribute('role', 'status');
  box.innerHTML = `
    <strong class="portableri-truth-flag__headline">Truth flag · ${escapeHtml(sev)}</strong>
    <p class="portableri-truth-flag__policy">${escapeHtml(ui.headline ?? record.policy)}</p>
    <p class="portableri-truth-flag__fix"><span>Fix:</span> ${escapeHtml(record.fix)}</p>
    <p class="portableri-truth-flag__meta">${escapeHtml(record.actor_class)} · ${escapeHtml(record.promise_id)}</p>
  `;
  root.prepend(box);
  return record;
}

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
