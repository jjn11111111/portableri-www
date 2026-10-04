import { SCHEMA_SUBSCRIBER_AGREEMENT_ACK } from './constants.mjs';

export const DEFAULT_SSA_DOCUMENT_PATH =
  'publish/2026-10-03_PortAbleRI_Subscriber-Service-Agreement_v0.1.md';
export const DEFAULT_SSA_VERSION = 'v0.1';

export function buildSubscriberAgreementAckV1({
  documentPath = DEFAULT_SSA_DOCUMENT_PATH,
  version = DEFAULT_SSA_VERSION,
  at,
  ffPreview = true,
}) {
  return {
    schema: SCHEMA_SUBSCRIBER_AGREEMENT_ACK,
    at: at ?? new Date().toISOString(),
    document_path: documentPath,
    document_version: version,
    ff_preview: Boolean(ffPreview),
    counsel_review_required: Boolean(ffPreview),
  };
}

/** Append F&F SSA ack to an export bundle (new artifact · caller verifies). */
export function attachSubscriberAgreementAckToExportBundle(bundle, overrides = {}) {
  const next = structuredClone(bundle);
  next.subscriber_agreement_ack = buildSubscriberAgreementAckV1(overrides);
  return next;
}

export function verifySubscriberAgreementAckV1(ack) {
  if (ack == null) return { ok: true };
  if (typeof ack !== 'object') return { ok: false, error: 'subscriber_agreement_ack invalid' };
  if (ack.schema !== SCHEMA_SUBSCRIBER_AGREEMENT_ACK) {
    return { ok: false, error: 'subscriber_agreement_ack schema mismatch' };
  }
  if (!ack.at || !ack.document_path || !ack.document_version) {
    return { ok: false, error: 'subscriber_agreement_ack missing at/document_path/version' };
  }
  return { ok: true };
}
