/**
 * P5 · Head count & mode — Hearth default 1; Factory/Guest require name · task · end · ACK.
 */

export const GOVERNED_MODES = ['hearth', 'factory', 'guest'];

export function normalizeMode(mode) {
  return String(mode ?? '').trim().toLowerCase();
}

export function validateHeadCountState({ mode, headCount }) {
  const modeNorm = normalizeMode(mode);
  if (!GOVERNED_MODES.includes(modeNorm)) {
    return {
      ok: false,
      error: 'P5: invalid mode',
      fix: `Use one of: ${GOVERNED_MODES.join(', ')}`,
    };
  }
  const head_count = Number(headCount);
  if (!Number.isInteger(head_count) || head_count < 1) {
    return { ok: false, error: 'P5: head_count must be a positive integer' };
  }
  if (modeNorm === 'hearth' && head_count !== 1) {
    return {
      ok: false,
      error: 'P5: Hearth mode requires head_count 1',
      fix: 'Fork with mode-fork CLI (guest/factory + ACK) before raising head count',
    };
  }
  return { ok: true, mode: modeNorm, head_count };
}

/** Factory/Guest timeline rows must carry guest ritual fields. */
export function validateGuestFactoryAck(entry) {
  const mode = normalizeMode(entry.mode);
  if (mode === 'hearth') {
    if (entry.head_count != null && Number(entry.head_count) !== 1) {
      return { ok: false, error: 'P5: hearth timeline entry must have head_count 1' };
    }
    return { ok: true };
  }
  const guest_name = String(entry.guest_name ?? '').trim();
  const task = String(entry.task ?? '').trim();
  const end_condition = String(entry.end_condition ?? '').trim();
  const host_ack_at = String(entry.host_ack_at ?? '').trim();
  if (!guest_name || !task || !end_condition || !host_ack_at) {
    return {
      ok: false,
      error: 'P5: factory/guest entry requires guest_name, task, end_condition, host_ack_at',
      fix: 'Gatekeeper: name · task · end condition · HOST ACK',
    };
  }
  const hc = Number(entry.head_count);
  if (!Number.isInteger(hc) || hc < 1) {
    return { ok: false, error: 'P5: factory/guest entry requires head_count >= 1' };
  }
  return { ok: true };
}

/** Audit timeline must end at kernel_bootstrap mode + head_count. */
export function verifyHeadCountTimelineV1(timeline, currentMode, currentHeadCount) {
  if (!Array.isArray(timeline) || timeline.length < 1) {
    return { ok: false, error: 'head_count_timeline empty' };
  }
  let lastAt = '';

  for (let i = 0; i < timeline.length; i++) {
    const e = timeline[i];
    if (!e?.at) return { ok: false, error: 'head_count_timeline entry missing at' };
    if (e.at < lastAt) return { ok: false, error: 'head_count_timeline not monotonic by at' };
    lastAt = e.at;

    const mode = normalizeMode(e.mode ?? 'hearth');
    const head_count = e.head_count ?? (mode === 'hearth' ? 1 : NaN);
    const state = validateHeadCountState({ mode, headCount: head_count });
    if (!state.ok) return state;

    if (i === 0) {
      if (state.mode !== 'hearth' || state.head_count !== 1) {
        return { ok: false, error: 'P5: bootstrap timeline must be hearth · head_count 1' };
      }
      continue;
    }

    if (state.mode === 'hearth') {
      if (state.head_count !== 1) {
        return { ok: false, error: 'P5: return-to-hearth must set head_count 1' };
      }
    } else {
      const ritual = validateGuestFactoryAck({ ...e, mode: state.mode, head_count: state.head_count });
      if (!ritual.ok) return ritual;
    }
  }

  const cur = validateHeadCountState({ mode: currentMode, headCount: currentHeadCount });
  if (!cur.ok) return cur;
  const last = timeline[timeline.length - 1];
  const lastMode = normalizeMode(last.mode ?? 'hearth');
  const lastHc = Number(last.head_count ?? (lastMode === 'hearth' ? 1 : NaN));
  if (lastMode !== cur.mode || lastHc !== cur.head_count) {
    return { ok: false, error: 'P5: kernel mode/head_count != last timeline entry' };
  }
  return { ok: true, mode: cur.mode, head_count: cur.head_count };
}

/** Turn gate — declared mode/head_count must match bundle or documented SEAT CHECK. */
export function validateHeadCountTurn({
  registryMode,
  registryHeadCount,
  declaredMode,
  declaredHeadCount,
  seatCheck = null,
}) {
  const reg = validateHeadCountState({ mode: registryMode, headCount: registryHeadCount });
  if (!reg.ok) return reg;

  const turn = validateHeadCountState({
    mode: declaredMode ?? registryMode,
    headCount: declaredHeadCount ?? registryHeadCount,
  });
  if (!turn.ok) return turn;

  if (turn.mode === reg.mode && turn.head_count === reg.head_count) {
    return { ok: true, mode: turn.mode, head_count: turn.head_count };
  }

  if (!seatCheck || typeof seatCheck !== 'object') {
    return {
      ok: false,
      error: 'P5: mode/head_count mismatch without SEAT CHECK',
      fix: 'Run mode-fork with ACK or align seat_check to this turn',
    };
  }
  if (
    normalizeMode(seatCheck.mode) !== turn.mode ||
    Number(seatCheck.head_count) !== turn.head_count
  ) {
    return { ok: false, error: 'P5: seat_check does not document turn mode/head_count' };
  }
  return { ok: true, mode: turn.mode, head_count: turn.head_count, documented_mismatch: true };
}

/** Governed fork — new artifact; updates kernel + timeline + seat_check. */
export function appendModeForkToExportBundle(
  bundle,
  { mode, headCount, guestName = '', task = '', endCondition = '', hostAckAt = '', note = '' },
) {
  const kb = bundle?.kernel_bootstrap;
  if (!kb?.worldline_id) throw new Error('kernel_bootstrap required');

  const state = validateHeadCountState({ mode, headCount });
  if (!state.ok) throw new Error(state.error);

  const at = new Date().toISOString();
  const entry = {
    at,
    mode: state.mode,
    head_count: state.head_count,
    previous_mode: kb.mode,
    previous_head_count: kb.head_count,
    note: String(note || '').trim() || `P5 fork ${kb.mode}/${kb.head_count} → ${state.mode}/${state.head_count}`,
  };

  if (state.mode !== 'hearth') {
    entry.guest_name = String(guestName).trim();
    entry.task = String(task).trim();
    entry.end_condition = String(endCondition).trim();
    entry.host_ack_at = String(hostAckAt).trim() || at;
    const ritual = validateGuestFactoryAck(entry);
    if (!ritual.ok) throw new Error(ritual.error);
  }

  const next = structuredClone(bundle);
  next.kernel_bootstrap = {
    ...next.kernel_bootstrap,
    mode: state.mode,
    head_count: state.head_count,
  };
  if (!Array.isArray(next.head_count_timeline)) next.head_count_timeline = [];
  next.head_count_timeline.push(entry);
  if (next.seat_check) {
    next.seat_check = {
      ...next.seat_check,
      at,
      mode: state.mode,
      head_count: state.head_count,
    };
  }
  next.amended_at = at;
  return next;
}
