/**
 * SUR clone bootstrap · localhost EnterFace · ?worldline=
 */
import { isLocalNwHost } from './nw-lane-handoff.mjs';
import { normalizeLattice, processHexTurn } from './nw-sur-hex-lattice.mjs';
import { appendSignal, lastHexIndex, readSignals } from './nw-sur-signal.mjs';

let cached = /** @type {null | { ready: boolean, worldline_id?: string, manifest?: object, lattice?: object, error?: string }} */ (
  null
);

export function surWorldlineFromUrl() {
  if (typeof location === 'undefined') return null;
  const wl = new URLSearchParams(location.search).get('worldline');
  return wl?.trim() || null;
}

export async function initSurLocalhost() {
  if (!isLocalNwHost()) {
    cached = { ready: false };
    return cached;
  }
  const worldline_id = surWorldlineFromUrl();
  if (!worldline_id) {
    cached = { ready: false };
    return cached;
  }
  try {
    const base = `sur/${worldline_id}`;
    const [manifest, latticeRaw] = await Promise.all([
      fetch(`${base}/CLONE-MANIFEST.json`).then((r) => {
        if (!r.ok) throw new Error(`manifest HTTP ${r.status}`);
        return r.json();
      }),
      fetch(`${base}/HEX-LATTICE-64.json`).then((r) => {
        if (!r.ok) throw new Error(`lattice HTTP ${r.status}`);
        return r.json();
      }),
    ]);
    const lattice = normalizeLattice(latticeRaw);
    cached = { ready: true, worldline_id, manifest, lattice };
    const signals = readSignals(worldline_id);
    if (signals.length === 0 && manifest?.sha256) {
      let seed = 0;
      try {
        const dna = await fetch(`${base}/DNA-ENTRY.json`).then((r) => (r.ok ? r.json() : null));
        if (typeof dna?.initial_hex_from_seed === 'number') seed = dna.initial_hex_from_seed;
      } catch {
        /* */
      }
      await appendSignal({
        worldline_id,
        seat: 'system',
        kind: 'activation',
        body: { sku: manifest.sku, seed_hex: seed, surface: 'forum.html' },
        hex_index: seed,
        clone_manifest_sha256: manifest.sha256,
      });
    }
    return cached;
  } catch (e) {
    cached = { ready: false, error: e.message };
    return cached;
  }
}

export function getSurContext() {
  return cached;
}

export function mountSurForumBadge() {
  const wl = surWorldlineFromUrl();
  if (!wl || !isLocalNwHost()) return;
  const nav = document.querySelector('.forum-chat-nav');
  if (!nav || document.getElementById('forum-sur-badge')) return;
  const span = document.createElement('span');
  span.id = 'forum-sur-badge';
  span.className = 'forum-chat-tool';
  span.title = 'SUR clone active (localhost)';
  span.textContent = `SUR ${wl.replace(/^wl_/, '').slice(0, 12)}`;
  nav.insertBefore(span, nav.querySelector('.forum-chat-spacer'));
}

export async function runSurForumSend(line) {
  const ctx = cached;
  if (!ctx?.ready || !ctx.worldline_id || !ctx.lattice || !ctx.manifest) {
    throw new Error('SUR not ready');
  }
  const worldline_id = ctx.worldline_id;
  const prevHex = lastHexIndex(worldline_id);
  const turn = await processHexTurn(ctx.lattice, {
    prevHex,
    userText: line,
    worldline_id,
  });

  const userSig = await appendSignal({
    worldline_id,
    seat: 'R',
    kind: 'user',
    body: line,
    hex_index: turn.active_hex,
    clone_manifest_sha256: ctx.manifest.sha256,
  });

  const asstSig = await appendSignal({
    worldline_id,
    seat: 'P',
    kind: 'assistant',
    body: turn.reply_text,
    hex_index: turn.active_hex,
    parent_signal_id: userSig.id,
    clone_manifest_sha256: ctx.manifest.sha256,
  });

  return { turn, userSig, asstSig };
}
