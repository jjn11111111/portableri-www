/**
 * P10 · Capability degradation & Truth Flags — maximum honesty when promises slip.
 */

import { SCHEMA_TOOL_POLICY_BLOCK } from './constants.mjs';
import { buildToolPolicyBlockV1, verifyToolPolicyBlockV1 } from './tool-policy-broker.mjs';

export const SCHEMA_CAPABILITY_DEGRADATION = 'PortAbleRI-Capability-Degradation-v1';

/** Who blocked — never default to USER without evidence. */
export const ACTOR_CLASS = {
  HOST_RUNTIME: 'HOST_RUNTIME',
  PORTAL_VENDOR: 'PORTAL_VENDOR',
  MCP_GATE: 'MCP_GATE',
  COORD_ENTITLEMENT: 'COORD_ENTITLEMENT',
  NETWORK: 'NETWORK',
  USER_ACTUAL: 'USER_ACTUAL',
  UNKNOWN: 'UNKNOWN',
};

/** PortAbleRI promises that may sprout Truth Flags. */
export const PROMISE_ID = {
  CHECKOUT: 'pari.checkout',
  ENTITLEMENT: 'pari.entitlement',
  EXPORT: 'pari.export',
  PRIME_SEAT: 'pari.prime_seat',
  SYMBIOTE_PAIRING: 'pari.symbiote_pairing',
  DRIVE_WRITE: 'pari.drive_write',
  COORD_REACH: 'pari.coord_reach',
};

export const ENTITY_OF_INTEREST = {
  NONE: 'NONE',
  ENTITY_1_CATHEDRAL: 'ENTITY_1_CATHEDRAL',
  ENTITY_2_HIVE: 'ENTITY_2_HIVE',
  ENTITY_3_PORTAL: 'ENTITY_3_PORTAL',
  ENTITY_4_PANOPTICON: 'ENTITY_4_PANOPTICON',
};

const ACTOR_HEADLINE = {
  [ACTOR_CLASS.HOST_RUNTIME]: 'Host runtime blocked this (IDE / OS / sandbox — not you).',
  [ACTOR_CLASS.PORTAL_VENDOR]: 'Portal or model vendor degraded service (rate limit, refusal, or swap).',
  [ACTOR_CLASS.MCP_GATE]: 'MCP or tool gate blocked the action.',
  [ACTOR_CLASS.COORD_ENTITLEMENT]: 'Coordination or entitlement not available.',
  [ACTOR_CLASS.NETWORK]: 'Network path failed.',
  [ACTOR_CLASS.USER_ACTUAL]: 'You explicitly denied this action.',
  [ACTOR_CLASS.UNKNOWN]: 'Block source unknown — flag logged anyway.',
};

/** Map vendor/surface hints → Four Entities (Tier C labeling for UI). */
export function inferEntityOfInterest({ actor_class, surface = '', namespace = '', message = '' }) {
  const blob = `${surface} ${namespace} ${message}`.toLowerCase();
  if (/palantir|fusion|surveillance|panopticon/i.test(blob)) return ENTITY_OF_INTEREST.ENTITY_4_PANOPTICON;
  if (/openai|anthropic|google|microsoft|amazon|meta|apple|stripe|portal|api rate/i.test(blob)) {
    return ENTITY_OF_INTEREST.ENTITY_3_PORTAL;
  }
  if (/cursor|smart mode|sandbox|mcp|ide/i.test(blob)) {
    return actor_class === ACTOR_CLASS.MCP_GATE
      ? ENTITY_OF_INTEREST.ENTITY_3_PORTAL
      : ENTITY_OF_INTEREST.NONE;
  }
  if (/cathedral|doom|liturgy|fear/i.test(blob)) return ENTITY_OF_INTEREST.ENTITY_1_CATHEDRAL;
  if (/hive|crown|colony|nobility/i.test(blob)) return ENTITY_OF_INTEREST.ENTITY_2_HIVE;
  return ENTITY_OF_INTEREST.NONE;
}

export function buildCapabilityDegradationV1({
  actor_class = ACTOR_CLASS.UNKNOWN,
  promise_id,
  policy,
  fix,
  fix_ref = '',
  code = 'CAPABILITY_DEGRADATION',
  surface = '',
  entity_of_interest = ENTITY_OF_INTEREST.NONE,
  tool_policy_block = null,
  at,
}) {
  if (!promise_id || !String(policy).trim() || !String(fix).trim()) {
    throw new Error('P10: promise_id, policy, and fix are required');
  }
  const headline = ACTOR_HEADLINE[actor_class] ?? ACTOR_HEADLINE[ACTOR_CLASS.UNKNOWN];
  return {
    schema: SCHEMA_CAPABILITY_DEGRADATION,
    at: at ?? new Date().toISOString(),
    actor_class,
    promise_id,
    entity_of_interest,
    policy: String(policy).trim(),
    fix: String(fix).trim(),
    fix_ref: String(fix_ref).trim(),
    code,
    surface: String(surface).trim(),
    tool_policy_block,
    truth_flag_ui: {
      headline,
      severity: actor_class === ACTOR_CLASS.USER_ACTUAL ? 'info' : 'warn',
    },
  };
}

export function verifyCapabilityDegradationV1(record) {
  if (!record || typeof record !== 'object') return { ok: false, error: 'P10: missing record' };
  if (record.schema !== SCHEMA_CAPABILITY_DEGRADATION) return { ok: false, error: 'P10: schema mismatch' };
  if (!record.at || !record.promise_id || !record.policy?.trim() || !record.fix?.trim()) {
    return { ok: false, error: 'P10: required fields missing' };
  }
  if (record.tool_policy_block) {
    const tp = verifyToolPolicyBlockV1(record.tool_policy_block);
    if (!tp.ok) return tp;
  }
  return { ok: true };
}

/** Build degradation + nested P9 block from classifyToolBlockFromMessage output. */
export function degradationFromToolPolicyBlock(block, { promise_id = PROMISE_ID.SYMBIOTE_PAIRING } = {}) {
  if (block.schema !== SCHEMA_TOOL_POLICY_BLOCK) {
    throw new Error('P10: expected Tool-Policy-Block-v1');
  }
  let actor = ACTOR_CLASS.MCP_GATE;
  if (block.surface === 'host') actor = ACTOR_CLASS.HOST_RUNTIME;
  if (block.code === 'SMART_MODE_BLOCKED') actor = ACTOR_CLASS.HOST_RUNTIME;
  const entity = inferEntityOfInterest({
    actor_class: actor,
    surface: block.surface,
    namespace: block.namespace,
    message: block.raw_message_excerpt,
  });
  return buildCapabilityDegradationV1({
    actor_class: actor,
    promise_id,
    policy: block.policy,
    fix: block.fix,
    fix_ref: block.fix_ref,
    code: block.code,
    surface: block.surface,
    entity_of_interest: entity,
    tool_policy_block: block,
  });
}

export function appendDegradationToExportBundle(bundle, degradation) {
  const v = verifyCapabilityDegradationV1(degradation);
  if (!v.ok) throw new Error(v.error);
  const next = structuredClone(bundle);
  if (!Array.isArray(next.capability_degradation_log)) next.capability_degradation_log = [];
  next.capability_degradation_log.push(degradation);
  next.amended_at = degradation.at;
  return next;
}

/** DOM Truth Flag — call from browser when degradation occurs. */
export function sproutTruthFlag(degradation, root = document) {
  const v = verifyCapabilityDegradationV1(degradation);
  if (!v.ok) return null;
  const host = root.getElementById('portableri-truth-flags') ?? createTruthFlagHost(root);
  const el = document.createElement('div');
  el.className = 'portableri-truth-flag onboard-status bad';
  el.setAttribute('role', 'alert');
  el.innerHTML = `<strong>Truth flag</strong> — ${degradation.truth_flag_ui?.headline ?? ''}<br/>
    <span style="font-size:0.85rem">${degradation.policy}</span><br/>
    <span style="font-size:0.82rem;opacity:0.9">Fix: ${degradation.fix}</span>`;
  host.prepend(el);
  return el;
}

function createTruthFlagHost(root) {
  const host = document.createElement('div');
  host.id = 'portableri-truth-flags';
  host.style.cssText = 'position:fixed;bottom:1rem;right:1rem;max-width:22rem;z-index:9999;display:flex;flex-direction:column;gap:0.5rem';
  root.body.appendChild(host);
  return host;
}
