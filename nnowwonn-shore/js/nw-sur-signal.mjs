/**
 * SUR-Signal-v1 · browser ledger (localStorage · fail-closed).
 */
import { canonicalJson } from './nw-sur-canonical.mjs';

export const SUR_SCHEMA = 'SUR-Signal-v1';

function newSignalId() {
  const r = crypto.getRandomValues(new Uint8Array(8));
  const hex = [...r].map((b) => b.toString(16).padStart(2, '0')).join('');
  return `sig_${Date.now().toString(36)}_${hex}`;
}

function payloadForHash(signal) {
  const out = { ...signal };
  delete out.sha256;
  return out;
}

async function hashSignal(signal) {
  const enc = new TextEncoder().encode(canonicalJson(payloadForHash(signal)));
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function buildSignal(input) {
  /** @type {Record<string, unknown>} */
  const draft = {
    schema: SUR_SCHEMA,
    id: input.id ?? newSignalId(),
    worldline_id: String(input.worldline_id).trim(),
    at: input.at ?? new Date().toISOString(),
    seat: input.seat,
    kind: input.kind,
    body: input.body,
  };
  if (input.hex_index !== undefined && input.hex_index !== null) draft.hex_index = input.hex_index;
  if (input.parent_signal_id) draft.parent_signal_id = input.parent_signal_id;
  if (input.clone_manifest_sha256) draft.clone_manifest_sha256 = input.clone_manifest_sha256;
  draft.sha256 = await hashSignal(draft);
  return draft;
}

function ledgerKey(worldline_id) {
  return `sur:ledger:${worldline_id}`;
}

export function readSignals(worldline_id) {
  try {
    const raw = localStorage.getItem(ledgerKey(worldline_id));
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function lastHexIndex(worldline_id) {
  const signals = readSignals(worldline_id);
  for (let i = signals.length - 1; i >= 0; i--) {
    if (typeof signals[i].hex_index === 'number') return signals[i].hex_index;
  }
  return null;
}

export async function appendSignal(input) {
  const signal = await buildSignal(input);
  const key = ledgerKey(signal.worldline_id);
  const list = readSignals(signal.worldline_id);
  list.push(signal);
  localStorage.setItem(key, JSON.stringify(list.slice(-120)));
  return signal;
}
