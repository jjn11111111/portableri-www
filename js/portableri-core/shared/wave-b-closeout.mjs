/**
 * Wave B governance closeout — P4 · P5 · P9 · P10 · P11 on a P7 export bundle.
 */
import { SCHEMA_SEAT_CHECK, SCHEMA_SUBSCRIBER_AGREEMENT_ACK } from './constants.mjs';
import { verifyExportBundleV1 } from './export-bundle.mjs';
import { verifyFactorySessionMetadataV1 } from './factory-fork.mjs';
import { verifyToolPolicyBlockV1 } from './tool-policy-broker.mjs';

export const WAVE_B_COMPETENCY_IDS = Object.freeze(['P4', 'P5', 'P9', 'P10', 'P11']);

/** Structural Wave B checklist on top of P7 verify (offline · no network). */
export function verifyWaveBCloseoutV1(bundle) {
  const base = verifyExportBundleV1(bundle);
  if (!base.ok) return { ...base, wave: 'B' };

  const missing = [];
  const kb = bundle.kernel_bootstrap ?? {};

  if (!bundle.seat_check || bundle.seat_check.schema !== SCHEMA_SEAT_CHECK) missing.push('P10 seat_check');
  if (!Array.isArray(bundle.prime_history) || bundle.prime_history.length < 1) missing.push('P4 prime_history');
  if (!Array.isArray(bundle.head_count_timeline) || bundle.head_count_timeline.length < 1) {
    missing.push('P5 head_count_timeline');
  }

  const ack = bundle.subscriber_agreement_ack;
  if (!ack || ack.schema !== SCHEMA_SUBSCRIBER_AGREEMENT_ACK) {
    missing.push('subscriber_agreement_ack (F&F preview)');
  }

  const log = bundle.tool_policy_log;
  if (!Array.isArray(log) || log.length < 1) {
    missing.push('P9 tool_policy_log (>=1 policy+fix block)');
  } else {
    for (const entry of log) {
      const tv = verifyToolPolicyBlockV1(entry);
      if (!tv.ok) missing.push(`P9 ${tv.error}`);
    }
  }

  const p11 = verifyFactorySessionMetadataV1(bundle);
  if (!p11.ok) missing.push(`P11 ${p11.error}`);
  if (kb.mode === 'factory') {
    const label = kb.factory_thread_label ?? bundle.seat_check?.factory_thread_label;
    if (!label) missing.push('P11 factory_thread_label when mode=factory');
  }

  if (missing.length) {
    return { ok: false, error: missing.join('; '), wave: 'B', missing };
  }

  return {
    ok: true,
    wave: 'B',
    competencies: [...WAVE_B_COMPETENCY_IDS],
    worldline_id: bundle.worldline_id,
  };
}
