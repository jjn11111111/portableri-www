/**
 * EnterFaceRI · Face Summon · blur → crystalline clarity on entry.
 * Local governance metaphor — not credential login (www stays no-login).
 */
import { markCustodyByKey } from './nw-user-custody.mjs';

const FALLBACK_MS = 2400;

/**
 * @param {{ mode?: 'opening' | 'hearth' }} [opts]
 */
export function runEnterFaceSummon(opts = {}) {
  const mode = opts.mode ?? 'opening';
  if (typeof document === 'undefined') return;

  document.body.dataset.faceSummon = mode;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('enterface-summon-done');
    return;
  }

  const layer = document.querySelector('.enterface-face-layer');
  if (!layer) {
    document.body.classList.add('enterface-summon-done');
    return;
  }

  const veil = document.createElement('div');
  veil.className = 'enterface-face-veil';
  veil.setAttribute('aria-hidden', 'true');
  document.body.prepend(veil);

  document.body.classList.add('enterface-summon-active');

  const finish = () => {
    document.body.classList.remove('enterface-summon-active', 'enterface-summon-reveal');
    document.body.classList.add('enterface-summon-done');
    veil.remove();
    try {
      sessionStorage.setItem('enterface-face-summon-v1', '1');
    } catch {
      /* */
    }
    markCustodyByKey('front', 'summon');
  };

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.add('enterface-summon-reveal');
      veil.classList.add('enterface-face-veil-out');
    });
  });

  layer.addEventListener(
    'animationend',
    (e) => {
      if (e.animationName === 'enterface-clarity-face') finish();
    },
    { once: true },
  );
  window.setTimeout(finish, FALLBACK_MS);
}
