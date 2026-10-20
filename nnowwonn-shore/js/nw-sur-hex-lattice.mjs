/**
 * SUR hex lattice · browser (async hash fold · matches node semantics).
 */
export const LATTICE_SCHEMA = 'HEX-LATTICE-64-v1';
export const VERTEX_COUNT = 64;
export const DUI_SUM = 63;

export function assertHexIndex(index) {
  const i = Number(index);
  if (!Number.isInteger(i) || i < 0 || i > 63) throw new Error(`hex_index must be 0…63, got ${index}`);
  return i;
}

export function duiPartner(index) {
  return DUI_SUM - assertHexIndex(index);
}

export async function textToHexOffset(text) {
  const enc = new TextEncoder().encode(String(text ?? ''));
  const buf = await crypto.subtle.digest('SHA-256', enc);
  const h = new Uint8Array(buf);
  return (h[0] ^ h[1] ^ h[2] ^ h[3]) & 63;
}

export function renderTemplate(template, vars) {
  return String(template).replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? '');
}

export function normalizeLattice(raw) {
  if (!raw || typeof raw !== 'object') throw new Error('lattice must be object');
  const o = /** @type {Record<string, unknown>} */ (raw);
  if (o.schema !== LATTICE_SCHEMA) throw new Error(`schema must be ${LATTICE_SCHEMA}`);
  const defaultTpl =
    typeof o.default_reply_template === 'string'
      ? o.default_reply_template
      : '[HEX {{hex}} · dui {{partner}}] {{body}}';
  const byIndex = new Map();
  for (const item of Array.isArray(o.slots) ? o.slots : []) {
    if (!item || typeof item !== 'object') continue;
    const slot = /** @type {Record<string, unknown>} */ (item);
    const index = assertHexIndex(slot.index);
    byIndex.set(index, {
      index,
      label: String(slot.label ?? `hex-${index}`),
      reply_template: String(slot.reply_template ?? defaultTpl),
    });
  }
  const slots = [];
  for (let i = 0; i < VERTEX_COUNT; i++) {
    slots.push(
      byIndex.get(i) ?? {
        index: i,
        label: `hex-${i.toString(2).padStart(6, '0')}`,
        reply_template: defaultTpl,
      },
    );
  }
  return { slots, slots_by_index: new Map(slots.map((s) => [s.index, s])) };
}

export async function transitionHex(opts) {
  const kind = opts.kind ?? 'user';
  const prev =
    opts.prevHex === undefined || opts.prevHex === null ? 0 : assertHexIndex(opts.prevHex);
  const offset = await textToHexOffset(opts.userText);
  if (kind === 'assistant' || kind === 'system') return prev;
  if (kind === 'activation') return offset;
  return (prev + offset + 1) % VERTEX_COUNT;
}

export async function processHexTurn(lattice, opts) {
  const userText = String(opts.userText ?? '').trim();
  if (!userText) throw new Error('userText required');
  const activeHex = await transitionHex({ prevHex: opts.prevHex ?? null, userText, kind: 'user' });
  const partner = duiPartner(activeHex);
  const slot = lattice.slots_by_index.get(activeHex);
  const partnerSlot = lattice.slots_by_index.get(partner);
  const vars = {
    hex: String(activeHex),
    partner: String(partner),
    label: slot.label,
    partner_label: partnerSlot.label,
    body: userText,
    worldline_id: opts.worldline_id ?? '',
  };
  const reply_text = renderTemplate(slot.reply_template, vars).trim();
  return { active_hex: activeHex, dui_partner: partner, reply_text };
}
