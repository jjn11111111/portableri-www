/**
 * POST OFFICE gate · coordination token · offline SHA-256 fallback · no plaintext in repo
 */

import { sha256Hex } from './nw-sha256.mjs';

/** @type {import('./post-office-access-v0.json')} */
let accessDocCache = null;

async function loadAccessDoc() {
  if (accessDocCache) return accessDocCache;
  const res = await fetch(new URL('./post-office-access-v0.json', import.meta.url));
  accessDocCache = await res.json();
  return accessDocCache;
}

export const SESSION_TOKEN_KEY = 'kairis_post_office_token_v1';
export const SESSION_ACE_KEY = 'kairis_post_office_ace_v1';
export const SESSION_EXP_KEY = 'kairis_post_office_exp_v1';
export const SESSION_SEAT_KEY = 'kairis_post_office_seat_v1';

const COORD = typeof window !== 'undefined' && window.PORTABLERI_COORD_URL
  ? window.PORTABLERI_COORD_URL
  : 'http://127.0.0.1:8787';

/** @returns {boolean} */
export function isSessionValid() {
  const exp = Number(sessionStorage.getItem(SESSION_EXP_KEY) || 0);
  const token = sessionStorage.getItem(SESSION_TOKEN_KEY);
  if (!token || !exp) return false;
  return Math.floor(Date.now() / 1000) < exp;
}

/** @returns {{ ace: string, scopes: string[], seatId: string|null } | null} */
export function getSessionAce() {
  if (!isSessionValid()) return null;
  const ace = sessionStorage.getItem(SESSION_ACE_KEY) || 'post-office-host';
  const seatId = sessionStorage.getItem(SESSION_SEAT_KEY);
  if (ace === 'post-office-host') return { ace, scopes: ['*'], seatId };
  return { ace, scopes: ['directory:read', 'mail:read', 'tasks:read', 'zero:compose:self'], seatId };
}

/** @param {string} scope */
export function sessionCan(scope) {
  const s = getSessionAce();
  if (!s) return false;
  if (s.scopes.includes('*')) return true;
  return s.scopes.some((sc) => sc === scope || sc.endsWith(':*') && scope.startsWith(sc.slice(0, -1)));
}

function persistSession({ token, ace, exp, seatId = '' }) {
  sessionStorage.setItem(SESSION_TOKEN_KEY, token);
  sessionStorage.setItem(SESSION_ACE_KEY, ace);
  sessionStorage.setItem(SESSION_EXP_KEY, String(exp));
  if (seatId) sessionStorage.setItem(SESSION_SEAT_KEY, seatId);
  else sessionStorage.removeItem(SESSION_SEAT_KEY);
}

/** @param {{ gateCode: string, visitorLabel?: string, seatId?: string }} opts */
export async function unlockPostOffice(opts) {
  const gate_code = String(opts.gateCode ?? '').trim();
  if (!gate_code) return { ok: false, error: 'gate_code_required' };

  try {
    const res = await fetch(`${COORD}/v1/post-office/gate-exchange`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gate_code,
        visitor_label: opts.visitorLabel ?? '',
        seat_id: opts.seatId ?? '',
      }),
    });
    const data = await res.json();
    if (res.ok && data.token) {
      persistSession({
        token: data.token,
        ace: data.ace || 'post-office-host',
        exp: data.exp,
        seatId: opts.seatId ?? '',
      });
      await postOfficeBeacon('gate_success');
      return { ok: true, via: 'coord', ace: data.ace };
    }
    if (res.status !== 503 && res.status !== 0) {
      return { ok: false, error: data.error || 'gate_denied' };
    }
  } catch {
    /* fall through to offline hash */
  }

  const accessDoc = await loadAccessDoc();
  const hash = await sha256Hex(gate_code);
  const hostHash = accessDoc.gate_sha256;
  const stewardHash = accessDoc.steward_gate_sha256;
  const ttl = accessDoc.session_ttl_sec ?? 28800;
  const now = Math.floor(Date.now() / 1000);

  if (hostHash && hash === hostHash) {
    persistSession({
      token: `offline-host-${now}`,
      ace: 'post-office-host',
      exp: now + ttl,
      seatId: opts.seatId ?? '',
    });
    return { ok: true, via: 'offline-hash', ace: 'post-office-host' };
  }
  if (stewardHash && hash === stewardHash) {
    persistSession({
      token: `offline-steward-${now}`,
      ace: 'post-office-steward',
      exp: now + ttl,
      seatId: opts.seatId ?? '',
    });
    return { ok: true, via: 'offline-hash', ace: 'post-office-steward' };
  }

  if (!hostHash && !stewardHash) {
    return {
      ok: false,
      error: 'gate_unconfigured',
      fix: 'Start coordination with PORTABLERI_POST_OFFICE_GATE_SECRET or run set-post-office-gate-hash.mjs',
    };
  }
  return { ok: false, error: 'gate_denied' };
}

export function lockPostOffice() {
  sessionStorage.removeItem(SESSION_TOKEN_KEY);
  sessionStorage.removeItem(SESSION_ACE_KEY);
  sessionStorage.removeItem(SESSION_EXP_KEY);
  sessionStorage.removeItem(SESSION_SEAT_KEY);
}

/** @param {string} event */
export async function postOfficeBeacon(event) {
  const token = sessionStorage.getItem(SESSION_TOKEN_KEY);
  if (!token || token.startsWith('offline-')) return;
  try {
    await fetch(`${COORD}/v1/post-office/access-beacon`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, event }),
    });
  } catch {
    /* coordination offline */
  }
}

/**
 * @param {{ onUnlock: () => void, onLock?: () => void }} hooks
 */
export function mountPostOfficeGate(hooks) {
  const gateShell = document.getElementById('post-office-gate');
  const appShell = document.getElementById('post-office-app');
  const form = document.getElementById('post-office-gate-form');
  const status = document.getElementById('post-office-gate-status');
  const lockBtn = document.getElementById('post-office-lock');

  function showApp() {
    if (gateShell) gateShell.hidden = true;
    if (appShell) appShell.hidden = false;
    hooks.onUnlock();
    postOfficeBeacon('page_view');
  }

  function showGate() {
    if (gateShell) gateShell.hidden = false;
    if (appShell) appShell.hidden = true;
    hooks.onLock?.();
  }

  if (isSessionValid()) showApp();
  else showGate();

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (status) status.textContent = 'Verifying…';
    const gateCode = /** @type {HTMLInputElement} */ (document.getElementById('post-office-gate-code')).value;
    const visitorLabel = /** @type {HTMLInputElement} */ (document.getElementById('post-office-visitor')).value;
    const seatId = /** @type {HTMLInputElement} */ (document.getElementById('post-office-seat-id')).value;
    const result = await unlockPostOffice({ gateCode, visitorLabel, seatId });
    if (!result.ok) {
      if (status) {
        status.textContent = result.fix ? `${result.error} · ${result.fix}` : result.error || 'Denied';
      }
      return;
    }
    /** @type {HTMLInputElement} */ (document.getElementById('post-office-gate-code')).value = '';
    if (status) status.textContent = `Unlocked · ${result.ace} · ${result.via}`;
    showApp();
  });

  lockBtn?.addEventListener('click', () => {
    lockPostOffice();
    showGate();
    if (status) status.textContent = '';
  });
}
