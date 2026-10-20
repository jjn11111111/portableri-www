/**
 * EnterFace · Q&A lane handoffs · HOST allow only · no NW chat pipe.
 * Symbiote / Studio = new tab + optional moment file. Witness = clipboard packet for Cursor.
 */

import { canonOrigin, shorePath, shoreQueryTag } from './nw-shore-origin.mjs';

export const LANES = /** @type {const} */ ({
  hold: 'hold',
  symbiote: 'symbiote',
  studio: 'studio',
  witness: 'witness',
});

const SYMBIOTE_BASE = 'https://portableri.com/onboarding.html?begin=1&from=enterface';

function studioBase() {
  return `https://portableri.com/studio.html?shore=${shoreQueryTag()}&from=enterface`;
}
function localStudioBase() {
  return `http://127.0.0.1:8877/studio.html?shore=${shoreQueryTag()}&from=enterface`;
}

/** NW on localhost can hand off to LOCAL FIELD on 8877 (EnterFaceRI chessboard). */
export function isLocalNwHost() {
  return typeof location !== 'undefined' && /localhost|127\.0\.0\.1/.test(location.hostname);
}

export function localStudioUrl() {
  return localStudioBase();
}

export const OUTBOUND_HANDOFF_KEY = 'nw-outbound-handoff-v1';

/** @param {string} lane */
export function workbenchReturnUrl(lane) {
  const origin =
    typeof location !== 'undefined' &&
    (location.protocol === 'http:' || location.protocol === 'https:')
      ? location.origin
      : canonOrigin();
  const u = new URL('workbench.html', `${origin}/`);
  u.searchParams.set('handoff', '1');
  u.searchParams.set('lane', lane);
  return u.href;
}

/**
 * @param {{ lane: string, record: object, sha256: string }} payload
 */
export function recordOutboundHandoff(payload) {
  try {
    sessionStorage.setItem(
      OUTBOUND_HANDOFF_KEY,
      JSON.stringify({
        ...payload,
        at: new Date().toISOString(),
      })
    );
  } catch {
    /* private mode */
  }
}

export function readOutboundHandoff() {
  try {
    const raw = sessionStorage.getItem(OUTBOUND_HANDOFF_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** @deprecated use readOutboundHandoff */
export function consumeOutboundHandoff() {
  return readOutboundHandoff();
}

export function clearOutboundHandoff() {
  try {
    sessionStorage.removeItem(OUTBOUND_HANDOFF_KEY);
  } catch {
    /* */
  }
}

/**
 * @param {{ id?: string, sha256?: string, lane?: string }} ctx
 */
export function symbioteHandoffUrl(ctx = {}) {
  const u = new URL(SYMBIOTE_BASE);
  if (ctx.id) u.searchParams.set('moment', ctx.id);
  if (ctx.sha256) u.searchParams.set('seal', ctx.sha256.slice(0, 16));
  u.searchParams.set('return', workbenchReturnUrl(ctx.lane ?? 'symbiote'));
  return u.href;
}

/**
 * @param {{ id?: string, sha256?: string, lane?: string }} ctx
 */
export function studioHandoffUrl(ctx = {}) {
  const base = isLocalNwHost() ? localStudioBase() : studioBase();
  const u = new URL(base);
  if (ctx.id) u.searchParams.set('moment', ctx.id);
  if (ctx.sha256) u.searchParams.set('seal', ctx.sha256.slice(0, 16));
  u.searchParams.set('return', workbenchReturnUrl(ctx.lane ?? 'studio'));
  return u.href;
}

/**
 * @param {{ record: object, sha256: string, messages?: { role: string, text?: string }[] }} opts
 */
export function buildWitnessPacket(opts) {
  const { record, sha256, messages = [] } = opts;
  const excerpt = messages
    .filter((m) => m.role === 'user' || m.role === 'hold')
    .slice(-6)
    .map((m) => {
      if (m.role === 'user') return `- **HOST:** ${String(m.text ?? '').trim()}`;
      return `- **Hold:** (see moment below)`;
    })
    .join('\n');

  return `# EnterFace · Witness handoff · CurseCom / CC Supreme

Paste this into a **Cursor** thread (Witness seat). This is not web chat on NW.

## SEAT CHECK (message 1 ritual)
- Foreground: **Composer 2.5 Fast** · CC Supreme gatekeeper
- Mode: **Hearth** · head count **1** · no undeclared subagents
- Law: P ≠ K ≠ R · Individual Truth Preservation

## Moment crystal
- **id:** \`${record.id}\`
- **sha256:** \`${sha256}\`
- **capture:** ${record.capture ?? '—'}
- **shore:** ${record.shore ?? shorePath('workbench.html')}

## First form (earliest user-visible)
${record.first_form ?? ''}

## Thread excerpt
${excerpt || '—'}

## HOST intent
Continue interactive Q&A in the Witness seat. NW EnterFace lane held this moment locally; no cloud model on Send.

**AMOR · NOW:WON · handoff · yours**
`;
}

/** @param {string} lane */
export function laneHint(lane) {
  switch (lane) {
    case LANES.symbiote:
      return 'Symbiote opens in a new tab · moment file saves first · return link brings you back to complete the loop (import reply file or paste).';
    case LANES.studio:
      return 'Studio on your Mac · moment file saves first · use “Return from Studio” below to import answer — still no NW chat pipe on Send.';
    case LANES.witness:
      return 'Copies a witness packet for Cursor · CurseCom. Paste as your first message — interactive seat, not this web page.';
    default:
      return 'Send holds on this shore only — no remote LLM on this lane.';
  }
}
