/** EnterFace i18n stub · v0 · English only · extend with same-origin locale JSON later */

const EN = {
  'open.ghost': 'Begin…',
  'open.hint': 'Press Enter for the Workbench · Shift+Enter for new line',
  'composer.placeholder': 'Ask a question, think aloud, paste text, or describe what you’re feeling…',
  'composer.send': 'Send',
};

/** @param {string} key @param {string} [locale] */
export function t(key, locale = 'en') {
  if (locale !== 'en') return EN[key] ?? key;
  return EN[key] ?? key;
}

/** Future: parse ?lang= from URL when locale packs ship */
export function resolveLocale() {
  try {
    const q = new URLSearchParams(location.search).get('lang');
    if (q && /^[a-z]{2}(-[A-Z]{2})?$/.test(q)) return q;
  } catch {
    /* */
  }
  return 'en';
}
