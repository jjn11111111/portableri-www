/** NW onboarding progress · local only · R-owned */

const KEY = 'nw-onboard-progress-v1';

/** @returns {{ verify: boolean, lasher: boolean, export: boolean, dismissed: boolean }} */
export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { verify: false, lasher: false, export: false, dismissed: false };
    return { verify: false, lasher: false, export: false, dismissed: false, ...JSON.parse(raw) };
  } catch {
    return { verify: false, lasher: false, export: false, dismissed: false };
  }
}

export function saveProgress(patch) {
  const next = { ...loadProgress(), ...patch };
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode */
  }
  return next;
}

export function markStep(step) {
  if (step === 'verify') return saveProgress({ verify: true });
  if (step === 'lasher') return saveProgress({ lasher: true });
  if (step === 'export') return saveProgress({ export: true });
  return loadProgress();
}

export function dismissCoach() {
  return saveProgress({ dismissed: true });
}

export function resetProgress() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* */
  }
}
