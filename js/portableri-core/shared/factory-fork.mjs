/**
 * P11 · Factory fork ritual — labeled thread + logged ACK; metadata on export bundle.
 */

import { normalizeMode } from './head-count-mode.mjs';

export function normalizeThreadLabel(label) {
  return String(label ?? '').trim();
}

/** Factory timeline rows require a labeled thread (separate from Hearth sprawl). */
export function validateFactoryForkRitual(entry) {
  const mode = normalizeMode(entry?.mode);
  if (mode !== 'factory') return { ok: true };

  const thread_label = normalizeThreadLabel(entry.thread_label ?? entry.factory_thread_label);
  if (!thread_label || thread_label.length < 4) {
    return {
      ok: false,
      error: 'P11: factory fork requires thread_label (min 4 chars)',
      fix: 'mode-fork --mode factory --thread-label "factory/your-task" + guest ritual + HOST ACK',
    };
  }
  return { ok: true, thread_label };
}

/** Kernel in factory mode must match last timeline label + seat_check pin. */
export function verifyFactorySessionMetadataV1(bundle) {
  const kb = bundle?.kernel_bootstrap;
  if (!kb) return { ok: false, error: 'kernel_bootstrap missing' };
  const mode = normalizeMode(kb.mode);
  if (mode !== 'factory') return { ok: true, mode };

  const timeline = bundle.head_count_timeline;
  const last = Array.isArray(timeline) && timeline.length ? timeline[timeline.length - 1] : null;
  const fromTimeline = normalizeThreadLabel(last?.thread_label ?? last?.factory_thread_label);
  const fromKernel = normalizeThreadLabel(kb.factory_thread_label);
  const fromSeat = normalizeThreadLabel(bundle.seat_check?.factory_thread_label);

  if (!fromTimeline) {
    return { ok: false, error: 'P11: factory mode without thread_label on timeline' };
  }
  if (fromKernel && fromKernel !== fromTimeline) {
    return { ok: false, error: 'P11: kernel factory_thread_label != timeline thread_label' };
  }
  if (fromSeat && fromSeat !== fromTimeline) {
    return { ok: false, error: 'P11: seat_check factory_thread_label != timeline thread_label' };
  }
  return { ok: true, mode: 'factory', thread_label: fromTimeline };
}

/** Turn gate for Factory-labeled work. */
export function validateFactoryThreadTurn({ registryThreadLabel, declaredThreadLabel, registryMode }) {
  if (normalizeMode(registryMode) !== 'factory') {
    return { ok: true, skipped: true };
  }
  const reg = normalizeThreadLabel(registryThreadLabel);
  const declared = normalizeThreadLabel(declaredThreadLabel);
  if (!declared) {
    return {
      ok: false,
      error: 'P11: factory session requires declared thread_label',
      fix: 'Match export bundle factory_thread_label or return to hearth',
    };
  }
  if (reg && declared !== reg) {
    return {
      ok: false,
      error: 'P11: thread_label mismatch',
      fix: `Registry thread "${reg}" · declared "${declared}"`,
    };
  }
  return { ok: true, thread_label: declared };
}
