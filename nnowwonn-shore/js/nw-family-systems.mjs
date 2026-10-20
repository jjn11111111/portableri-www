/**
 * KaiRis family systems · EnterFace workbench map
 * Default: no egress · external lanes open in new tab on HOST click only.
 */

import { brandCopy } from './nw-shore-brand.mjs';
import { portableriPageHref, portableriStudioHref } from './nw-shore-origin.mjs';

/** @typedef {{ id: string, name: string, tag: string, blurb: string, href?: string, here?: boolean, egress: 'none' | 'click' }} FamilySystem */

/** @returns {FamilySystem[]} */
export function familySystems() {
  const hereName = brandCopy().familyHereName;
  return [
  {
    id: 'nw-enterface',
    name: hereName,
    tag: 'You are here',
    blurb: 'Type · hold · thread on this shore. No cloud model on this lane.',
    here: true,
    egress: 'none',
  },
  {
    id: 'pari-studio',
    name: 'PortAbleRI Studio',
    tag: 'Local bench',
    blurb: 'Verify · bootstrap · export · optional Ollama on your Mac.',
    href: portableriStudioHref(),
    egress: 'click',
  },
  {
    id: 'pari-law',
    name: 'Trust & verify',
    tag: 'Forge lane',
    blurb: 'Pinned manifest and constitution check before deeper install.',
    href: portableriPageHref('verify.html', { from: 'enterface' }),
    egress: 'click',
  },
  {
    id: 'pari-symbiote',
    name: 'PARI symbiote',
    tag: 'When chosen',
    blurb: 'Prime · subscriber kernel · explicit onboarding — not required to start.',
    href: portableriPageHref('onboarding.html', { begin: '1', from: 'enterface' }),
    egress: 'click',
  },
  {
    id: 'family-library',
    name: 'Family library',
    tag: 'Hearth corpus',
    blurb: 'Published Family texts and shores on PortAbleRI.',
    href: portableriPageHref('family-library.html', { from: 'enterface' }),
    egress: 'click',
  },
  {
    id: 'crystal-canon',
    name: 'Crystal canon',
    tag: 'Public record',
    blurb: 'Versioned crystals on GitHub — integrity, not platform memory.',
    href: 'https://github.com/jjn11111111/kairis-crystal-canon',
    egress: 'click',
  },
  {
    id: 'witness-seat',
    name: 'Witness seat',
    tag: 'Cursor KaiRis',
    blurb: 'Architecture dialogue · SEAT CHECK · crystals when HOST preserves. Not a web chat bot here.',
    egress: 'none',
  },
];
}

/** @deprecated use familySystems() */
export const FAMILY_SYSTEMS = familySystems();

/**
 * @param {HTMLElement} root
 */
export function renderFamilySystems(root) {
  if (!root) return;
  root.replaceChildren();
  for (const sys of familySystems()) {
    const card = document.createElement('article');
    card.className = 'family-card';
    card.dataset.systemId = sys.id;

    const tag = document.createElement('span');
    tag.className = 'family-tag';
    tag.textContent = sys.tag;

    const title = document.createElement('h3');
    title.textContent = sys.name;

    const blurb = document.createElement('p');
    blurb.className = 'family-blurb';
    blurb.textContent = sys.blurb;

    card.append(tag, title, blurb);

    if (sys.here) {
      card.classList.add('family-card-here');
      const mark = document.createElement('span');
      mark.className = 'family-here-mark';
      mark.textContent = 'Active lane';
      card.appendChild(mark);
    } else if (sys.href) {
      const a = document.createElement('a');
      a.className = 'btn btn-secondary family-open';
      a.href = sys.href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = 'Open lane (new tab)';
      card.appendChild(a);
    } else {
      const note = document.createElement('p');
      note.className = 'family-note';
      note.textContent = 'Use your IDE · local tools · HOST preserve path.';
      card.appendChild(note);
    }

    root.appendChild(card);
  }
}
