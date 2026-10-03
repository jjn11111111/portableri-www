/**
 * P4 · Prime registry — one active prime_model_id; swaps are one-for-one in prime_history.
 */

export function normalizePrimeModelId(id) {
  return String(id ?? '').trim().toLowerCase();
}

/** Refuse kernel/bootstrap paths when Prime is undeclared. */
export function assertPrimeDeclared(primeModelId) {
  const prime_model_id = normalizePrimeModelId(primeModelId);
  if (!prime_model_id) {
    return {
      ok: false,
      error: 'P4: prime_model_id undeclared',
      fix: 'Pass --prime <id> · document SEAT CHECK · or swap-prime with audit trail',
    };
  }
  return { ok: true, prime_model_id };
}

/**
 * Turn gate: foreground must match registry prime, or seat_check must document the mismatch.
 */
export function validatePrimeTurn({ registryPrimeId, foregroundPrimeId, seatCheck = null }) {
  const reg = normalizePrimeModelId(registryPrimeId);
  const declared = assertPrimeDeclared(reg);
  if (!declared.ok) return declared;

  const fg = normalizePrimeModelId(foregroundPrimeId);
  if (!fg) {
    return {
      ok: false,
      error: 'P4: foreground prime undeclared',
      fix: 'Declare foreground in SEAT CHECK before continuing',
    };
  }
  if (fg === reg) return { ok: true, prime_model_id: reg };

  if (!seatCheck || typeof seatCheck !== 'object') {
    return {
      ok: false,
      error: 'P4: prime mismatch without SEAT CHECK',
      fix: `Registry ${reg} · foreground ${fg} — run swap-prime or align seats`,
    };
  }
  const scReg = normalizePrimeModelId(seatCheck.prime_model_id);
  const scFg = normalizePrimeModelId(seatCheck.foreground_model_id);
  if (scReg !== reg) {
    return { ok: false, error: 'P4: seat_check.prime_model_id != registry prime' };
  }
  if (scFg !== fg) {
    return {
      ok: false,
      error: 'P4: seat_check does not document foreground prime',
      fix: 'Update SEAT CHECK foreground_model_id to match declared turn seat',
    };
  }
  return { ok: true, prime_model_id: reg, documented_mismatch: true };
}

/** Audit chain: monotonic times · bootstrap entry has no previous · swaps link one-for-one. */
export function verifyPrimeHistoryV1(primeHistory, currentPrimeId) {
  if (!Array.isArray(primeHistory) || primeHistory.length < 1) {
    return { ok: false, error: 'prime_history empty' };
  }
  const cur = normalizePrimeModelId(currentPrimeId);
  let chainTip = null;
  let lastAt = '';

  for (let i = 0; i < primeHistory.length; i++) {
    const e = primeHistory[i];
    if (!e?.prime_model_id || !e?.recorded_at) {
      return { ok: false, error: 'prime_history entry missing prime_model_id or recorded_at' };
    }
    if (e.recorded_at < lastAt) {
      return { ok: false, error: 'prime_history not monotonic by recorded_at' };
    }
    lastAt = e.recorded_at;

    const pid = normalizePrimeModelId(e.prime_model_id);
    if (i === 0) {
      if (e.previous_prime_model_id != null && String(e.previous_prime_model_id).trim() !== '') {
        return { ok: false, error: 'P4: bootstrap prime_history entry must omit previous_prime_model_id' };
      }
      chainTip = pid;
      continue;
    }

    const prev = normalizePrimeModelId(e.previous_prime_model_id);
    if (!prev) return { ok: false, error: 'P4: swap entry requires previous_prime_model_id' };
    if (prev !== chainTip) return { ok: false, error: 'P4: prime swap chain broken' };
    if (prev === pid) return { ok: false, error: 'P4: swap must be one-for-one (previous != new)' };
    chainTip = pid;
  }

  if (chainTip !== cur) {
    return { ok: false, error: 'P4: kernel prime_model_id != last prime_history entry' };
  }
  return { ok: true, prime_model_id: cur };
}

/**
 * Governed swap — new artifact; updates kernel_bootstrap.prime_model_id + seat_check + prime_history.
 */
export function swapPrimeInExportBundle(bundle, { newPrimeId, note = '' }) {
  const nextPrime = assertPrimeDeclared(newPrimeId);
  if (!nextPrime.ok) throw new Error(nextPrime.error);

  const kb = bundle?.kernel_bootstrap;
  if (!kb?.worldline_id) throw new Error('kernel_bootstrap required');

  const oldPrime = normalizePrimeModelId(kb.prime_model_id);
  if (!oldPrime) throw new Error('P4: registry prime missing on bundle');
  if (oldPrime === nextPrime.prime_model_id) {
    throw new Error('P4: swap rejected — new prime equals current registry prime');
  }

  const next = structuredClone(bundle);
  const at = new Date().toISOString();
  next.kernel_bootstrap = { ...next.kernel_bootstrap, prime_model_id: newPrimeId.trim() };
  if (!Array.isArray(next.prime_history)) next.prime_history = [];
  next.prime_history.push({
    prime_model_id: newPrimeId.trim(),
    previous_prime_model_id: kb.prime_model_id,
    recorded_at: at,
    kind: 'swap',
    note: String(note || '').trim() || 'P4 one-for-one prime swap',
  });
  if (next.seat_check) {
    next.seat_check = {
      ...next.seat_check,
      at,
      prime_model_id: newPrimeId.trim(),
      foreground_model_id: newPrimeId.trim(),
    };
  }
  next.amended_at = at;
  return next;
}
