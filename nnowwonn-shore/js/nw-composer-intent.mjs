/**
 * Composer intent · front-cube breath before crystallization · no NW pipe
 */

/**
 * @param {HTMLTextAreaElement | null} textarea
 */
export function wireComposerIntent(textarea) {
  if (!textarea || textarea.dataset.nwIntentBound) return;
  textarea.dataset.nwIntentBound = '1';

  const emit = () => {
    const focused = document.activeElement === textarea;
    const len = textarea.value.trim().length;
    const strength = focused ? Math.min(1, len / 100) * 0.88 + 0.1 : 0;
    window.dispatchEvent(
      new CustomEvent('nw-composer-intent', {
        detail: { strength, focused, len },
      }),
    );
  };

  textarea.addEventListener('focus', emit, { passive: true });
  textarea.addEventListener('input', emit, { passive: true });
  textarea.addEventListener('blur', emit, { passive: true });
  emit();
}
