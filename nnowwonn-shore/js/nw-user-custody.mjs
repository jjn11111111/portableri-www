/**
 * R-owned filing · one individual per browser profile · no shared template
 * Two cubes · eight sub-cubes each · active slots from device custody only
 */

const LEDGER_KEY = 'nw-user-custody-ledger-v1';
const PRIMARY_KEY = 'nw-user-primary-end-v1';

/** @typedef {'U000'|'U001'|'U010'|'U011'|'U100'|'U101'|'U110'|'U111'} OctantId */

export const OCTANT_ORDER = /** @type {OctantId[]} */ ([
  'U000',
  'U001',
  'U010',
  'U011',
  'U100',
  'U101',
  'U110',
  'U111',
]);

/** Front shore · what this user has touched on the open face */
const FRONT_SLOT = {
  U000: { key: 'opening', label: 'Opening draft' },
  U001: { key: 'forum', label: 'Forum thread' },
  U010: { key: 'workbench', label: 'Workbench thread' },
  U011: { key: 'onboard', label: 'Onboard steps' },
  U100: { key: 'export', label: 'Named export' },
  U101: { key: 'summon', label: 'Face summon' },
  U110: { key: 'handoff', label: 'Outbound handoff' },
  U111: { key: 'gate', label: 'Gate read' },
};

/** Back bench · HOST-only lanes this user opened */
const BACK_SLOT = {
  U000: { key: 'might_live', label: 'Might bench' },
  U001: { key: 'moment', label: 'Stored moment' },
  U010: { key: 'compress', label: 'Muscle compress' },
  U011: { key: 'turn', label: 'Might turn' },
  U100: { key: 'studio', label: 'Studio lane' },
  U101: { key: 'crystal', label: 'Crystal line' },
  U110: { key: 'dist', label: 'Local dist' },
  U111: { key: 'reserve', label: 'Reserve slot' },
};

const FORUM_THREAD = 'nw-forum-thread-v1';
const WORKBENCH_THREAD = 'nw-workbench-thread-v1';
const ONBOARD = 'nw-onboard-progress-v1';
const OPEN_DRAFT = 'nw-opening-draft-v1';
const HANDOFF = 'nw-outbound-handoff-v1';
const FACE_SUMMON = 'enterface-face-summon-v1';

/** @returns {Record<string, { count: number, last?: string, hint?: string }>} */
function loadLedger() {
  try {
    const raw = localStorage.getItem(LEDGER_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLedger(ledger) {
  try {
    localStorage.setItem(LEDGER_KEY, JSON.stringify(ledger));
  } catch {
    /* private mode */
  }
}

/**
 * @param {'front'|'back'} side
 * @param {OctantId} octant
 * @param {{ hint?: string, bump?: number }} [opts]
 */
export function markCustodySlot(side, octant, opts = {}) {
  const ledger = loadLedger();
  const id = `${side}:${octant}`;
  const prev = ledger[id] ?? { count: 0 };
  ledger[id] = {
    count: prev.count + (opts.bump ?? 1),
    last: new Date().toISOString(),
    hint: opts.hint ?? prev.hint,
  };
  saveLedger(ledger);
  rebalancePrimaryEnd(ledger);
}

/** @param {string} sideKey @param {{ hint?: string }} [opts] */
export function markCustodyByKey(side, sideKey, opts = {}) {
  const map = side === 'front' ? FRONT_SLOT : BACK_SLOT;
  const hit = OCTANT_ORDER.find((o) => map[o].key === sideKey);
  if (hit) {
    markCustodySlot(side, hit, opts);
    notifyCustodyChanged({ side, octant: hit, key: sideKey });
  }
}

function rebalancePrimaryEnd(ledger) {
  let frontScore = 0;
  let backScore = 0;
  for (const [k, v] of Object.entries(ledger)) {
    const n = v.count ?? 0;
    if (k.startsWith('front:')) frontScore += n;
    if (k.startsWith('back:')) backScore += n;
  }
  const end = backScore > frontScore ? 'back' : 'front';
  try {
    localStorage.setItem(PRIMARY_KEY, end);
  } catch {
    /* */
  }
}

/** @returns {'front'|'back'} */
export function getPrimaryEnd() {
  try {
    const v = localStorage.getItem(PRIMARY_KEY);
    return v === 'back' ? 'back' : 'front';
  } catch {
    return 'front';
  }
}

function sessionHas(key) {
  try {
    return sessionStorage.getItem(key) != null;
  } catch {
    return false;
  }
}

function threadStats(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { count: 0, hint: '' };
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr) || !arr.length) return { count: 0, hint: '' };
    const last = arr[arr.length - 1];
    const text =
      typeof last?.text === 'string'
        ? last.text.slice(0, 40)
        : typeof last?.html === 'string'
          ? '…'
          : '';
    return { count: arr.length, hint: text };
  } catch {
    return { count: 0, hint: '' };
  }
}

/** Scan device · merge live reads into view (does not persist scan-only hits) */
export function scanDeviceCustody() {
  const forum = threadStats(FORUM_THREAD);
  const bench = threadStats(WORKBENCH_THREAD);
  let onboard = false;
  try {
    const o = JSON.parse(localStorage.getItem(ONBOARD) || '{}');
    onboard = !!(o.verify || o.lasher || o.export);
  } catch {
    /* */
  }

  /** @type {Map<OctantId, { active: boolean, hint: string }>} */
  const front = new Map(OCTANT_ORDER.map((o) => [o, { active: false, hint: '' }]));
  /** @type {Map<OctantId, { active: boolean, hint: string }>} */
  const back = new Map(OCTANT_ORDER.map((o) => [o, { active: false, hint: '' }]));

  const ledger = loadLedger();

  for (const o of OCTANT_ORDER) {
    const f = ledger[`front:${o}`];
    if (f?.count) {
      front.get(o).active = true;
      if (f.hint) front.get(o).hint = f.hint;
    }
    const b = ledger[`back:${o}`];
    if (b?.count) {
      back.get(o).active = true;
      if (b.hint) back.get(o).hint = b.hint;
    }
  }

  if (sessionHas(OPEN_DRAFT) || sessionStorage.getItem('nw-enterface-fresh-v1')) {
    front.get('U000').active = true;
  }
  if (forum.count) {
    front.get('U001').active = true;
    front.get('U001').hint = forum.hint || `${forum.count} lines`;
  }
  if (bench.count) {
    front.get('U010').active = true;
    front.get('U010').hint = bench.hint || `${bench.count} lines`;
  }
  if (onboard) front.get('U011').active = true;
  if (sessionHas(FACE_SUMMON)) front.get('U101').active = true;
  if (sessionHas(HANDOFF)) front.get('U110').active = true;

  return { front, back, primaryEnd: getPrimaryEnd(), ledgerEmpty: !Object.keys(ledger).length };
}

/**
 * @returns {{ front: { id: OctantId, label: string, hint: string }[], back: { id: OctantId, label: string, hint: string }[], primaryEnd: 'front'|'back', facet: string }}
 */
export function getUserFilingExclusive() {
  const { front, back, primaryEnd } = scanDeviceCustody();

  /** @param {Map<OctantId, { active: boolean, hint: string }>} m @param {typeof FRONT_SLOT} slots */
  function rows(m, slots) {
    return OCTANT_ORDER.filter((o) => m.get(o).active).map((o) => ({
      id: o,
      label: slots[o].label,
      hint: m.get(o).hint || '',
    }));
  }

  const forum = localStorage.getItem(FORUM_THREAD) || '';
  const facet = simpleFacet(forum);

  return {
    front: rows(front, FRONT_SLOT),
    back: rows(back, BACK_SLOT),
    primaryEnd,
    facet,
  };
}

/**
 * Progress-weighted slots for canvas · pulse from recent mark custody
 * @returns {{
 *   frontSlots: { active: boolean, level: number, pulse: number }[],
 *   backSlots: { active: boolean, level: number, pulse: number }[],
 *   primaryEnd: 'front'|'back',
 *   frontProgress: number,
 *   backProgress: number,
 * }}
 */
export function getUserCubeState() {
  const { front, back, primaryEnd } = scanDeviceCustody();
  const ledger = loadLedger();
  const now = Date.now();

  /** @param {'front'|'back'} side @param {Map<OctantId, { active: boolean }>} live */
  function slots(side, live) {
    return OCTANT_ORDER.map((o) => {
      const entry = ledger[`${side}:${o}`];
      const count = entry?.count ?? 0;
      let level = count ? Math.min(1, count / 3) : 0;
      if (live.get(o).active && level < 0.4) level = 0.4;
      const lastMs = entry?.last ? Date.parse(entry.last) : 0;
      const age = lastMs ? now - lastMs : 99999;
      const pulse = age < 5000 ? (1 - age / 5000) ** 1.6 : 0;
      return { active: live.get(o).active || count > 0, level, pulse };
    });
  }

  const frontSlots = slots('front', front);
  const backSlots = slots('back', back);
  const sum = (arr) => arr.reduce((s, x) => s + x.level, 0) / 8;

  return {
    frontSlots,
    backSlots,
    primaryEnd,
    frontProgress: sum(frontSlots),
    backProgress: sum(backSlots),
  };
}

/** @deprecated use getUserCubeState */
export function getUserCubeMasks() {
  const s = getUserCubeState();
  return {
    frontMask: s.frontSlots.map((x) => x.active),
    backMask: s.backSlots.map((x) => x.active),
    primaryEnd: s.primaryEnd,
  };
}

function simpleFacet(forumRaw) {
  let h = 2166136261;
  const s = forumRaw + (localStorage.getItem(WORKBENCH_THREAD) || '');
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).slice(0, 8).padStart(8, '0');
}

/** Call on load · idempotent */
export function syncCustodyFromDevice() {
  const forum = threadStats(FORUM_THREAD);
  if (forum.count) markCustodyByKey('front', 'forum', { hint: forum.hint || `${forum.count} lines` });
  const bench = threadStats(WORKBENCH_THREAD);
  if (bench.count) markCustodyByKey('front', 'workbench', { hint: bench.hint || `${bench.count} lines` });
}

/** @param {{ side?: string, octant?: string, key?: string }} [detail] */
export function notifyCustodyChanged(detail) {
  try {
    window.dispatchEvent(new CustomEvent('nw-custody-changed', { detail: detail ?? {} }));
  } catch {
    /* */
  }
}
