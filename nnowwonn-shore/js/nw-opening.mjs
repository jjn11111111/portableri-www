/** Opening screen → Workbench handoff */
export const DRAFT_KEY = 'nw-opening-draft-v1';
/** Enter from open.html → fresh thread (not merged with old localStorage). */
export const FRESH_THREAD_KEY = 'nw-enterface-fresh-v1';

export function saveOpeningDraft(text) {
  try {
    sessionStorage.setItem(DRAFT_KEY, text);
  } catch {
    /* private mode */
  }
}

export function consumeOpeningDraft() {
  try {
    const t = sessionStorage.getItem(DRAFT_KEY);
    if (t) sessionStorage.removeItem(DRAFT_KEY);
    return t;
  } catch {
    return null;
  }
}

import { canonOrigin } from './nw-shore-origin.mjs';

export function goToWorkbench(text) {
  const t = String(text ?? '').trim();
  saveOpeningDraft(t);
  try {
    sessionStorage.setItem(FRESH_THREAD_KEY, '1');
  } catch {
    /* */
  }
  const url = new URL('workbench.html', `${canonOrigin()}/`);
  if (t) url.searchParams.set('q', t.slice(0, 2000));
  location.href = url.href;
}
